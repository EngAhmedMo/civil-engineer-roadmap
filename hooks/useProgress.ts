import { useState, useEffect, useCallback } from 'react';
import { UserProgress } from '../types';
import { auth, db, doc, setDoc, getDoc, onSnapshot } from '../services/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const STORAGE_KEY = 'civilForgeV18';
const DEFAULT_PROGRESS: UserProgress = { completed: [], unlocked: [1] };

export const useProgress = () => {
  const [user] = useAuthState(auth);
  const [progress, setProgress] = useState<UserProgress>(() => {
    const local = localStorage.getItem(STORAGE_KEY);
    return local ? JSON.parse(local) : DEFAULT_PROGRESS;
  });

  // Sync with Firestore (Real-time & Merge)
  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const syncUser = async () => {
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        
        try {
          // 1. Check existing cloud data
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            const cloudData = docSnap.data() as UserProgress;
            
            // 2. Merge logic: Union of Local (Guest) + Cloud
            // We use the 'progress' state from the closure (current local state)
            const localCompleted = progress.completed;
            const cloudCompleted = cloudData.completed || [];
            const mergedCompleted = Array.from(new Set([...localCompleted, ...cloudCompleted]));
            
            const localUnlocked = progress.unlocked;
            const cloudUnlocked = cloudData.unlocked || [1];
            const mergedUnlocked = Array.from(new Set([...localUnlocked, ...cloudUnlocked]));
            
            // 3. If merging results in more data than what's on cloud, update cloud
            const needsUpdate = mergedCompleted.length > cloudCompleted.length || mergedUnlocked.length > cloudUnlocked.length;
            
            if (needsUpdate) {
              await setDoc(docRef, {
                completed: mergedCompleted,
                unlocked: mergedUnlocked
              }, { merge: true });
            }
          } else {
            // New user: Upload local progress as is
            await setDoc(docRef, progress);
          }
        } catch (error) {
          console.error("Sync error:", error);
        }

        // 4. Start listening for real-time updates
        unsubscribe = onSnapshot(docRef, (docSnap) => {
          if (docSnap.exists()) {
            const cloudData = docSnap.data() as UserProgress;
            setProgress(prev => {
              if (JSON.stringify(prev) === JSON.stringify(cloudData)) return prev;
              localStorage.setItem(STORAGE_KEY, JSON.stringify(cloudData));
              return cloudData;
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
  }, [user]); // Run only when authentication state changes

  // Save changes
  const updateProgress = useCallback(async (newProgress: UserProgress) => {
    // Optimistic update
    setProgress(newProgress);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
    
    if (user) {
      const docRef = doc(db, 'users', user.uid);
      await setDoc(docRef, newProgress, { merge: true });
    }
  }, [user]);

  const toggleTask = (taskId: string) => {
    const isCompleted = progress.completed.includes(taskId);
    const newCompleted = isCompleted 
      ? progress.completed.filter(id => id !== taskId)
      : [...progress.completed, taskId];
    
    updateProgress({ ...progress, completed: newCompleted });
  };

  const unlockWeek = (weekId: number) => {
    if (!progress.unlocked.includes(weekId)) {
      updateProgress({ ...progress, unlocked: [...progress.unlocked, weekId] });
    }
  };

  const resetProgress = async () => {
    updateProgress(DEFAULT_PROGRESS);
  };

  return { progress, toggleTask, unlockWeek, resetProgress, user };
};