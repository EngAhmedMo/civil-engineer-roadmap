import React, { useState } from 'react';
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

  const navClass = (view: View) => 
    `relative font-bold transition-all px-4 py-2 ${currentView === view ? 'text-[--text-primary] bg-[--glass-border] rounded-lg' : 'text-[--text-secondary] hover:text-[--text-primary]'}`;

  const navItems: {id: View, label: string}[] = [
    { id: 'dashboard', label: 'الرئيسية' },
    { id: 'map', label: 'خارطة المهمة' },
    { id: 'resources', label: 'المصادر' },
    { id: 'aibim', label: 'أدوات الذكاء' },
    { id: 'mindset', label: 'عقلية المهندس' },
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const displayName = user ? (user.displayName || user.email?.split('@')[0] || 'مهندس') : '';

  return (
    <nav className="glass-panel sticky top-0 z-50 border-b border-gray-700/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600/20 p-2 rounded-lg border border-blue-500/30">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-[--text-primary] leading-none">المسار الهندسي</span>
              <span className="text-[10px] text-blue-500 font-mono tracking-wider mt-1">Engineer OS V18.0</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-2">
            {navItems.map(item => (
              <button key={item.id} onClick={() => onNavigate(item.id)} className={navClass(item.id)}>
                {item.label}
                {currentView === item.id && <span className="absolute bottom-[-2px] left-1/2 -translate-x-1/2 w-5 h-0.5 bg-[--accent-shop] rounded"></span>}
              </button>
            ))}
            
            <button onClick={toggleTheme} className="w-10 h-10 ml-4 rounded-full border border-[--text-secondary] flex items-center justify-center text-[--text-primary] hover:rotate-12 hover:bg-[--accent-shop] hover:border-[--accent-shop] hover:text-white transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
            </button>

            {/* Auth Button */}
            {user ? (
               <div className="flex items-center gap-3 mr-2">
                 <span className="text-xs text-[--text-secondary] hidden lg:inline-block">
                   مرحباً، <span className="text-[--text-primary] font-bold">{displayName}</span>
                 </span>
                 <button onClick={handleLogout} className="text-xs font-bold text-red-400 hover:text-white border border-red-500/30 hover:bg-red-500 px-3 py-1 rounded transition">
                   خروج
                 </button>
               </div>
            ) : (
              <button onClick={onOpenAuth} className="text-xs font-bold text-green-400 hover:text-white border border-green-500/30 hover:bg-green-500 px-3 py-1 rounded transition mr-2">
                دخول
              </button>
            )}
          </div>

          <div className="flex items-center md:hidden gap-3">
            <button onClick={toggleTheme} className="w-8 h-8 rounded-full border border-[--text-secondary] flex items-center justify-center text-[--text-primary]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-[--text-secondary] hover:text-[--text-primary] p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>
          </div>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-t border-gray-700/20 p-4 space-y-2">
          {navItems.map(item => (
            <button key={item.id} onClick={() => { onNavigate(item.id); setMobileMenuOpen(false); }} className="block w-full text-right px-4 py-3 text-[--text-secondary] hover:bg-gray-700/20 rounded">
              {item.label}
            </button>
          ))}
           <div className="pt-2 border-t border-gray-700/20">
             {user ? (
                <>
                  <div className="text-center text-sm text-[--text-secondary] mb-2">
                    مرحباً، <span className="text-[--text-primary] font-bold">{displayName}</span>
                  </div>
                  <button onClick={handleLogout} className="block w-full text-center py-2 text-red-400">تسجيل الخروج</button>
                </>
             ) : (
                <button onClick={onOpenAuth} className="block w-full text-center py-2 text-green-400 font-bold">تسجيل الدخول</button>
             )}
           </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;