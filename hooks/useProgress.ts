
import { useState, useEffect, useCallback } from 'react';
import { UserProgress } from '../types';
import { auth, db, doc, setDoc, getDoc, onSnapshot } from '../services/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const STORAGE_KEY = 'civilForgeV18';
// Initialize with lastUpdated: 0 to ensure it gets overwritten by any valid server data
const DEFAULT_PROGRESS: UserProgress = { completed: [], unlocked: [1], weekIcons: {}, lastUpdated: 0, taskTimestamps: {} };

export const useProgress = () => {
  const [user] = useAuthState(auth);
  const [progress, setProgress] = useState<UserProgress>(() => {
    const local = localStorage.getItem(STORAGE_KEY);
    return local ? JSON.parse(local) : DEFAULT_PROGRESS;
  });

  // Sync with Firestore (Prioritize Newer Data)
  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const syncUser = async () => {
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        
        try {
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            const cloudData = docSnap.data() as UserProgress;
            const localData = progress;
            
            const cloudTime = cloudData.lastUpdated || 0;
            const localTime = localData.lastUpdated || 0;

            // Logic: Last Write Wins (Newer Timestamp wins)
            if (cloudTime > localTime) {
                // Cloud is newer -> Update Local
                setProgress(cloudData);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(cloudData));
            } else if (localTime > cloudTime) {
                // Local is newer -> Push to Cloud
                await setDoc(docRef, localData, { merge: true });
            } else {
                // Edge Case: Timestamps equal or both missing (Legacy Data)
                if (cloudTime === 0 && localTime === 0) {
                     const mergedCompleted = Array.from(new Set([...localData.completed, ...cloudData.completed]));
                     const mergedUnlocked = Array.from(new Set([...localData.unlocked, ...cloudData.unlocked]));
                     const mergedTimestamps = { ...(localData.taskTimestamps || {}), ...(cloudData.taskTimestamps || {}) };
                     const mergedIcons = { ...(localData.weekIcons || {}), ...(cloudData.weekIcons || {}) };
                     
                     const mergedProgress = {
                         completed: mergedCompleted,
                         unlocked: mergedUnlocked,
                         taskTimestamps: mergedTimestamps,
                         weekIcons: mergedIcons,
                         lastUpdated: Date.now()
                     };
                     setProgress(mergedProgress);
                     localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedProgress));
                     await setDoc(docRef, mergedProgress, { merge: true });
                }
            }
          } else {
            // New user on cloud: Push current local data (Timestamped)
            const dataToPush = { ...progress, lastUpdated: Date.now() };
            await setDoc(docRef, dataToPush);
            setProgress(dataToPush); // Update state to have the timestamp
            localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToPush));
          }
        } catch (error) {
          console.error("Sync error:", error);
        }

        // Real-time Listener
        unsubscribe = onSnapshot(docRef, (docSnap) => {
          if (docSnap.exists()) {
            const cloudData = docSnap.data() as UserProgress;
            
            setProgress(prev => {
              const cloudTime = cloudData.lastUpdated || 0;
              const localTime = prev.lastUpdated || 0;
              
              if (cloudTime >= localTime) {
                  localStorage.setItem(STORAGE_KEY, JSON.stringify(cloudData));
                  return cloudData;
              }
              return prev;
            });
          }
        });
      }
    };

    syncUser();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]); 

  // Core Update Function - Always stamps the time
  const updateProgress = useCallback(async (newProgress: UserProgress) => {
    const timestamp = Date.now();
    const progressWithTimestamp = { ...newProgress, lastUpdated: timestamp };
    
    // Optimistic update
    setProgress(progressWithTimestamp);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progressWithTimestamp));
    
    if (user) {
      const docRef = doc(db, 'users', user.uid);
      await setDoc(docRef, progressWithTimestamp, { merge: true });
    }
  }, [user]);

  const toggleTask = (taskId: string) => {
    const isCompleted = progress.completed.includes(taskId);
    const newCompleted = isCompleted 
      ? progress.completed.filter(id => id !== taskId)
      : [...progress.completed, taskId];
    
    // Manage timestamps
    const currentTimestamps = progress.taskTimestamps || {};
    let newTimestamps = { ...currentTimestamps };

    if (isCompleted) {
      delete newTimestamps[taskId];
    } else {
      newTimestamps[taskId] = Date.now();
    }
    
    updateProgress({ 
      ...progress, 
      completed: newCompleted, 
      taskTimestamps: newTimestamps 
    });
  };

  const unlockWeek = (weekId: number) => {
    if (!progress.unlocked.includes(weekId)) {
      updateProgress({ ...progress, unlocked: [...progress.unlocked, weekId] });
    }
  };

  const setWeekIcon = (weekId: number, icon: string) => {
    const newIcons = { ...(progress.weekIcons || {}), [weekId]: icon };
    updateProgress({ ...progress, weekIcons: newIcons });
  };

  const resetProgress = async () => {
    const resetState: UserProgress = { 
        completed: [], 
        unlocked: [1], 
        taskTimestamps: {},
        weekIcons: {},
        lastUpdated: Date.now() 
    };
    await updateProgress(resetState);
  };

  return { progress, toggleTask, unlockWeek, setWeekIcon, resetProgress, user };
};
