import React, { useState, useEffect } from 'react';
import { View } from '../types';
import { User } from 'firebase/auth';
import { signOut, auth } from '../services/firebase';

interface NavbarProps {
  currentView: View;
  onNavigate: (view: View) => void;
  toggleTheme: () => void;
  user: User | null | undefined;
  onOpenAuth: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, toggleTheme, user, onOpenAuth }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { 
      id: 'dashboard' as View, 
      label: 'الرئيسية', 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
    },
    { 
      id: 'map' as View, 
      label: 'خارطة المهمة', 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path></svg>
    },
    { 
      id: 'resources' as View, 
      label: 'المصادر', 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
    },
    { 
      id: 'aibim' as View, 
      label: 'أدوات الذكاء', 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
    },
    { 
      id: 'mindset' as View, 
      label: 'عقلية المهندس', 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
    },
  ];

  const handleLogout = async () => {
    try { await signOut(auth); } catch (error) { console.error("Logout failed", error); }
  };

  const displayName = user ? (user.displayName || user.email?.split('@')[0] || 'مهندس') : '';

  // Adjusted logic: Stronger active state for light mode
  const getNavBtnClass = (isActive: boolean) => 
    `relative px-3 xl:px-4 py-2 rounded-xl font-bold text-sm transition-all duration-300 flex items-center gap-2 group ${
      isActive 
      ? 'text-blue-600 dark:text-blue-500 bg-blue-100 dark:bg-blue-500/10 border border-blue-200 dark:border-transparent shadow-sm shadow-blue-500/10' 
      : 'text-slate-600 dark:text-[--text-secondary] hover:text-slate-900 dark:hover:text-[--text-primary] hover:bg-slate-100 dark:hover:bg-[var(--item-hover)]'
    }`;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${scrolled ? 'glass-panel border-b-[--glass-border] shadow-2xl bg-[--glass-bg]/95 backdrop-blur-xl' : 'bg-transparent border-transparent'} h-16 md:h-20 flex items-center`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-center gap-4">
          
          {/* Logo Section */}
          <div className="flex items-center gap-3 cursor-pointer group flex-shrink-0" onClick={() => onNavigate('dashboard')}>
            <div className={`p-2 rounded-xl border transition-all duration-500 ${scrolled ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20' : 'bg-[--bg-card] border-[--glass-border] text-blue-500 group-hover:border-blue-500/50'}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
            </div>
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-black text-[--text-primary] leading-none tracking-tight group-hover:text-blue-500 transition-colors">المسار الهندسي</span>
              <span className="text-[10px] text-[--text-secondary] font-mono tracking-[0.2em] mt-1 group-hover:text-[--text-primary] transition-colors">ENGINEER OS</span>
            </div>
          </div>
          
          {/* Center Navigation - Visible on Tablet/Desktop */}
          <div className="hidden md:flex items-center gap-1 bg-white/80 dark:bg-[--bg-deep]/80 p-1.5 rounded-2xl border border-[--glass-border] shadow-inner backdrop-blur-md flex-shrink mx-2">
            {navItems.map(item => (
              <button 
                key={item.id} 
                onClick={() => onNavigate(item.id)} 
                className={getNavBtnClass(currentView === item.id)}
                title={item.label} // Tooltip for tablets since text is hidden
              >
                {item.icon}
                <span className="hidden xl:inline whitespace-nowrap">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Right Side (Theme + Auth) */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0 z-50">
             <button 
                onClick={toggleTheme} 
                className="w-10 h-10 rounded-xl flex items-center justify-center text-[--text-secondary] hover:text-yellow-400 hover:bg-[--item-hover] transition-all border border-transparent hover:border-[--glass-border] active:scale-95"
                title="تغيير المظهر"
             >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            </button>

            <div className="h-6 w-px bg-[--glass-border]"></div>

            {user ? (
               <div className="flex items-center gap-3 pl-1">
                 <div className="text-right hidden xl:block leading-tight">
                   <p className="text-[10px] text-[--text-secondary] font-bold opacity-70">مرحباً مهندس</p>
                   <p className="text-xs font-black text-[--text-primary] max-w-[100px] truncate">{displayName}</p>
                 </div>
                 <button onClick={handleLogout} className="p-2 text-red-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all" title="تسجيل الخروج">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                 </button>
               </div>
            ) : (
              <button onClick={onOpenAuth} className="text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl shadow-lg shadow-blue-600/20 transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center gap-2 whitespace-nowrap">
                <span>دخول</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path></svg>
              </button>
            )}
          </div>

          <div className="flex items-center md:hidden gap-3">
             <button onClick={toggleTheme} className="w-10 h-10 rounded-xl flex items-center justify-center text-[--text-primary] bg-[--bg-deep] border border-[--glass-border]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className={`p-2.5 rounded-xl transition-all duration-300 ${mobileMenuOpen ? 'bg-blue-600 text-white rotate-90 shadow-lg shadow-blue-600/20' : 'bg-[--bg-card] text-[--text-primary] border border-[--glass-border]'}`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 glass-panel border-x-0 border-t border-b border-[--glass-border] p-2 md:hidden shadow-2xl animate-fade-in mx-2 mt-2 rounded-2xl z-40 bg-[--bg-deep] max-h-[calc(100vh-5rem)] overflow-y-auto overscroll-contain">
          <div className="flex flex-col gap-2 p-2">
            {navItems.map(item => (
              <button 
                key={item.id} 
                onClick={() => { onNavigate(item.id); setMobileMenuOpen(false); }} 
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl font-bold text-base transition-all ${
                  currentView === item.id 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 translate-x-[-5px]' 
                  : 'text-[--text-secondary] hover:bg-[--item-hover] hover:text-[--text-primary]'
                }`}
              >
                <span className={currentView === item.id ? 'text-white' : 'text-blue-500'}>{item.icon}</span>
                {item.label}
              </button>
            ))}
            <div className="h-px bg-[--glass-border] my-2"></div>
            {user ? (
              <button onClick={handleLogout} className="w-full text-center py-4 text-red-500 font-bold bg-red-500/10 rounded-xl text-base flex items-center justify-center gap-2">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                 تسجيل الخروج
              </button>
            ) : (
              <button onClick={onOpenAuth} className="w-full text-center py-4 text-white font-bold bg-blue-600 rounded-xl shadow-lg shadow-blue-600/20 text-base flex items-center justify-center gap-2">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path></svg>
                 تسجيل الدخول
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;