import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Resources from './components/Resources';
import AIBIM from './components/AIBIM';
import Mindset from './components/Mindset';
import MapSchedule from './components/MapSchedule';
import AuthModal from './components/AuthModal';
import Analytics from './components/Analytics';
import { View } from './types';
import { useProgress } from './hooks/useProgress';

// Checkpoint Answer: نعم (Yes). 
// Implementation Note: Recreated strictly in React to maintain the visual and functional contract while enabling the requested Auth features.

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  
  const { progress, toggleTask, unlockWeek, resetProgress, user } = useProgress();

  useEffect(() => {
    // Sync theme
    const savedTheme = localStorage.getItem('themePref') as 'dark' | 'light';
    if (savedTheme) setTheme(savedTheme);
    else setTheme('dark');
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('themePref', theme);
  }, [theme]);

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
        />;
      case 'resources':
        return <Resources />;
      case 'aibim':
        return <AIBIM />;
      case 'mindset':
        return <Mindset />;
      case 'map':
        return <MapSchedule progress={progress} onToggleTask={toggleTask} onUnlockWeek={unlockWeek} onReset={resetProgress} />;
      case 'analytics':
        return <Analytics progress={progress} onBack={() => setCurrentView('dashboard')} />;
      default:
        return <Dashboard 
          progress={progress} 
          navigateToMap={() => setCurrentView('map')} 
          navigateToAnalytics={() => setCurrentView('analytics')}
          isDark={theme === 'dark'} 
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
      
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
};

export default App;