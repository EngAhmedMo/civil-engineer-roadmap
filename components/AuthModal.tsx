
import React, { useState } from 'react';
import { auth, googleProvider, signInWithPopup, signInWithEmailAndPassword } from '../services/firebase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    setLoading(true); setError('');
    try { await signInWithPopup(auth, googleProvider); onClose(); } 
    catch (err) { setError("فشل تسجيل الدخول بواسطة جوجل"); } 
    finally { setLoading(false); }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError('');
    try { await signInWithEmailAndPassword(auth, email, password); onClose(); } 
    catch (err) { setError("تأكد من البريد الإلكتروني وكلمة المرور"); } 
    finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in transition-all duration-300">
      <div className="glass-panel w-full max-w-md p-0 rounded-3xl relative overflow-hidden shadow-2xl bg-[--bg-deep] border border-[--glass-border] transition-all duration-300" onClick={(e) => e.stopPropagation()}>
        
        {/* Header Branding */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 text-center relative overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-10"></div>
             <div className="relative z-10">
                 <div className="w-16 h-16 mx-auto bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 border border-white/20 shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                 </div>
                 <h2 className="text-2xl font-black text-white tracking-tight">Engineer OS</h2>
                 <p className="text-blue-100 text-sm font-medium mt-1 opacity-90">بوابة المهندس المحترف</p>
             </div>
             
             <button onClick={onClose} disabled={loading} className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all">
                ✕
             </button>
        </div>

        <div className="p-8 pt-6">
            {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 p-3 rounded-xl mb-6 text-sm font-bold text-center flex items-center gap-2 justify-center animate-pulse">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    {error}
                </div>
            )}

            <button 
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full py-3.5 mb-6 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-xl transition-all flex items-center justify-center gap-3 border border-slate-200 shadow-sm hover:shadow-md active:scale-[0.98]"
            >
            {loading ? <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div> : (
                <>
                <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                <span>المتابعة باستخدام Google</span>
                </>
            )}
            </button>

            <div className="relative mb-6 text-center">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[--glass-border]"></div></div>
                <span className="relative px-3 bg-[--bg-deep] text-[--text-secondary] text-xs font-bold uppercase tracking-wider">أو عبر البريد</span>
            </div>

            <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
                <label className="block text-[--text-secondary] text-xs font-bold mb-1.5 mr-1">البريد الإلكتروني</label>
                <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="w-full bg-[--bg-card] border border-[--glass-border] rounded-xl p-3.5 text-[--text-primary] focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all placeholder:text-[--text-secondary]/30 text-sm font-medium"
                placeholder="eng@example.com"
                />
            </div>
            <div>
                <label className="block text-[--text-secondary] text-xs font-bold mb-1.5 mr-1">كلمة المرور</label>
                <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full bg-[--bg-card] border border-[--glass-border] rounded-xl p-3.5 text-[--text-primary] focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all placeholder:text-[--text-secondary]/30 text-sm font-medium"
                placeholder="••••••••"
                />
            </div>
            <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-600/40 transform active:scale-[0.98] mt-2"
            >
                {loading ? "جاري التحقق..." : "تسجيل الدخول"}
            </button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
