
import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Resources from './components/Resources';
import AIBIM from './components/AIBIM';
import Mindset from './components/Mindset';
import MapSchedule from './components/MapSchedule';
import AuthModal from './components/AuthModal';
import Analytics from './components/Analytics';
import DailySession from './components/DailySession';
import { View } from './types';
import { useProgress } from './hooks/useProgress';

// Define Session Types locally or import
export type SessionMode = 'understand' | 'apply' | 'review';
export interface TimerState {
  modes: {
    [key in SessionMode]: { timeLeft: number; total: number };
  };
  activeMode: SessionMode;
  isRunning: boolean;
}

const App: React.FC = () => {
  // 1. Initialize view from localStorage if available
  const [currentView, setCurrentView] = useState<View>(() => {
    const savedView = localStorage.getItem('engineer_os_view');
    const validViews: View[] = ['dashboard', 'map', 'resources', 'aibim', 'mindset', 'analytics', 'session'];
    return (savedView && validViews.includes(savedView as View)) ? (savedView as View) : 'dashboard';
  });

  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  
  // GLOBAL SESSION STATE (Persists across views and toggles)
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [sessionState, setSessionState] = useState<TimerState>({
    modes: {
      understand: { timeLeft: 45 * 60, total: 45 * 60 },
      apply: { timeLeft: 90 * 60, total: 90 * 60 },
      review: { timeLeft: 15 * 60, total: 15 * 60 }
    },
    activeMode: 'understand',
    isRunning: false
  });

  const { progress, toggleTask, unlockWeek, resetProgress, setWeekIcon, user } = useProgress();

  useEffect(() => {
    const savedTheme = localStorage.getItem('themePref') as 'dark' | 'light';
    if (savedTheme) setTheme(savedTheme);
    else setTheme('dark');
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('themePref', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('engineer_os_view', currentView);
  }, [currentView]);

  // --- GLOBAL TIMER LOGIC ---
  useEffect(() => {
    let interval: number;
    if (sessionState.isRunning) {
      interval = window.setInterval(() => {
        setSessionState(prev => {
          const currentMode = prev.activeMode;
          const time = prev.modes[currentMode].timeLeft;

          // If timer finishes
          if (time <= 0) {
            const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
            audio.play().catch(e => console.log("Audio play failed", e));
            return { ...prev, isRunning: false };
          }

          return {
            ...prev,
            modes: {
              ...prev.modes,
              [currentMode]: { ...prev.modes[currentMode], timeLeft: time - 1 }
            }
          };
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [sessionState.isRunning]);

  // Session Handlers
  const handleSessionAction = useCallback((action: 'toggle' | 'reset' | 'switchMode', payload?: any) => {
    setSessionState(prev => {
      if (action === 'toggle') {
        return { ...prev, isRunning: !prev.isRunning };
      }
      if (action === 'reset') {
        const mode = prev.activeMode;
        return {
          ...prev,
          isRunning: false,
          modes: {
            ...prev.modes,
            [mode]: { ...prev.modes[mode], timeLeft: prev.modes[mode].total }
          }
        };
      }
      if (action === 'switchMode' && payload) {
        // Switching mode does NOT reset the previous mode's timer, it just pauses it conceptually
        // and switches context to the new mode.
        // We pause the timer to prevent confusion when switching contexts, or keep it running? 
        // User asked to "keep memory". Pausing is safer for UX when switching context.
        return {
          ...prev,
          activeMode: payload as SessionMode,
          isRunning: false // Auto-pause on switch to let user prepare
        };
      }
      return prev;
    });
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard 
          progress={progress} 
          navigateToMap={() => setCurrentView('map')} 
          navigateToAnalytics={() => setCurrentView('analytics')}
          isDark={theme === 'dark'} 
          onOpenSession={() => setShowSessionModal(true)}
        />;
      case 'resources':
        return <Resources />;
      case 'aibim':
        return <AIBIM />;
      case 'mindset':
        return <Mindset />;
      case 'map':
        return <MapSchedule 
          progress={progress} 
          onToggleTask={toggleTask} 
          onUnlockWeek={unlockWeek} 
          onReset={resetProgress}
          setWeekIcon={setWeekIcon}
        />;
      case 'analytics':
        return <Analytics progress={progress} onBack={() => setCurrentView('dashboard')} />;
      default:
        return <Dashboard 
          progress={progress} 
          navigateToMap={() => setCurrentView('map')} 
          navigateToAnalytics={() => setCurrentView('analytics')}
          isDark={theme === 'dark'} 
          onOpenSession={() => setShowSessionModal(true)}
        />;
    }
  };

  return (
    <div className="min-h-screen pb-12">
      <Navbar 
        currentView={currentView} 
        onNavigate={setCurrentView} 
        toggleTheme={toggleTheme} 
        user={user}
        onOpenAuth={() => setAuthModalOpen(true)}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderView()}
      </main>
      
      {/* Global Session Modal */}
      {showSessionModal && (
        <DailySession 
          state={sessionState}
          dispatch={handleSessionAction}
          onClose={() => setShowSessionModal(false)} 
        />
      )}
      
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
};

export default App;
