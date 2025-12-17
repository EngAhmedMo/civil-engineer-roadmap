
import React from 'react';

// Import Types Locally to avoid circular dependency issues if types.ts isn't updated
type SessionMode = 'understand' | 'apply' | 'review';

interface TimerState {
    modes: {
      [key in SessionMode]: { timeLeft: number; total: number };
    };
    activeMode: SessionMode;
    isRunning: boolean;
}

interface DailySessionProps {
    state: TimerState;
    dispatch: (action: 'toggle' | 'reset' | 'switchMode', payload?: any) => void;
    onClose: () => void;
}

const DailySession: React.FC<DailySessionProps> = ({ state, dispatch, onClose }) => {
  const { activeMode, isRunning, modes } = state;
  const timeLeft = modes[activeMode].timeLeft;
  const totalDuration = modes[activeMode].total;

  // Configuration for each mode
  const modeConfig = {
    understand: { 
        label: "فهم (Input)", 
        baseColor: "blue",
        color: "text-blue-600 dark:text-blue-400", 
        stroke: "stroke-blue-600 dark:stroke-blue-500",
        bg: "bg-blue-600 hover:bg-blue-500",
        lightBg: "bg-blue-50 dark:bg-blue-500/5",
        ring: "ring-blue-500/20",
        tabIndex: 0
    },
    apply: { 
        label: "تطبيق (Output)", 
        baseColor: "emerald",
        color: "text-emerald-600 dark:text-emerald-400", 
        stroke: "stroke-emerald-600 dark:stroke-emerald-500",
        bg: "bg-emerald-600 hover:bg-emerald-500",
        lightBg: "bg-emerald-50 dark:bg-emerald-500/5",
        ring: "ring-emerald-500/20",
        tabIndex: 1
    },
    review: { 
        label: "مراجعة (Review)", 
        baseColor: "amber",
        color: "text-amber-600 dark:text-amber-400", 
        stroke: "stroke-amber-600 dark:stroke-amber-500",
        bg: "bg-amber-600 hover:bg-amber-500",
        lightBg: "bg-amber-50 dark:bg-amber-500/5",
        ring: "ring-amber-500/20",
        tabIndex: 2
    }
  };

  const currentConfig = modeConfig[activeMode];

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Circular Progress Calculation
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - ((totalDuration - timeLeft) / totalDuration) * circumference;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-fade-in">
      
      {/* Main Card */}
      <div className="w-full max-w-md md:max-w-lg glass-panel bg-white dark:bg-[--bg-deep] rounded-3xl shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh] border border-slate-200 dark:border-[--glass-border]">
        
        {/* Header */}
        <div className="p-5 md:p-6 border-b border-slate-100 dark:border-[--glass-border] flex justify-between items-center bg-white dark:bg-[--bg-card]">
           <div>
             <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-[--text-primary] tracking-tight">جلسة عمل عميق</h2>
             <div className="flex items-center gap-2 mt-1">
                 <span className={`w-2 h-2 rounded-full ${isRunning ? 'bg-red-500 animate-pulse' : 'bg-slate-300'}`}></span>
                 <p className="text-xs text-slate-500 dark:text-[--text-secondary] font-bold">Focus Session Protocol</p>
             </div>
           </div>
           <button 
             onClick={onClose} 
             className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 hover:bg-red-100 dark:hover:bg-red-500/20 hover:text-red-600 dark:hover:text-red-400 transition-all flex items-center justify-center text-slate-400 dark:text-slate-500"
           >
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
           </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="p-6 md:p-8 flex flex-col items-center overflow-y-auto w-full bg-white dark:bg-transparent custom-scrollbar">
            
            {/* Tabbed Mode Switcher */}
            <div className="w-full bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl grid grid-cols-3 gap-0 relative mb-8 border border-slate-200 dark:border-slate-700/50 shadow-inner">
               {/* Sliding Background */}
               <div 
                  className={`absolute top-1.5 bottom-1.5 rounded-xl shadow-sm border transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] z-0
                    bg-white dark:bg-slate-700
                    ${activeMode === 'understand' ? 'border-blue-200 dark:border-blue-500/30 shadow-blue-500/10' : ''}
                    ${activeMode === 'apply' ? 'border-emerald-200 dark:border-emerald-500/30 shadow-emerald-500/10' : ''}
                    ${activeMode === 'review' ? 'border-amber-200 dark:border-amber-500/30 shadow-amber-500/10' : ''}
                  `}
                  style={{ 
                    // Width is 1/3 of the container minus padding
                    width: 'calc(33.333% - 0.25rem)',
                    // In RTL, we start from the right side
                    right: '0.375rem', 
                    // Move Left (Negative X) based on index
                    transform: `translateX(-${currentConfig.tabIndex * 100}%)`
                  }}
               >
                 {/* Indicator Line */}
                 <div className={`absolute bottom-1 left-4 right-4 h-0.5 rounded-full opacity-60 transition-colors duration-300
                    ${activeMode === 'understand' ? 'bg-blue-500' : ''}
                    ${activeMode === 'apply' ? 'bg-emerald-500' : ''}
                    ${activeMode === 'review' ? 'bg-amber-500' : ''}
                 `}></div>
               </div>

               {(Object.keys(modeConfig) as Array<keyof typeof modeConfig>).map((m) => (
                  <button
                     key={m}
                     onClick={() => dispatch('switchMode', m)}
                     className={`relative z-10 py-2.5 text-xs md:text-sm font-bold rounded-xl transition-colors duration-200 flex items-center justify-center gap-1.5 ${
                       activeMode === m 
                         ? 'text-slate-900 dark:text-white' 
                         : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                     }`}
                  >
                     <span className="truncate">{modeConfig[m].label}</span>
                  </button>
               ))}
            </div>

            {/* Timer Visual */}
            <div className={`relative w-64 h-64 sm:w-72 sm:h-72 mb-10 flex items-center justify-center rounded-full transition-all duration-500 ${currentConfig.lightBg} border-[6px] border-slate-50 dark:border-white/5 shadow-inner`}>
                <svg className="absolute inset-0 w-full h-full transform -rotate-90 p-4 drop-shadow-sm" viewBox="0 0 100 100">
                    {/* Background Track */}
                    <circle 
                        cx="50" cy="50" r={radius} 
                        stroke="currentColor" strokeWidth="4" fill="transparent" 
                        className="text-slate-200 dark:text-slate-700/50" 
                    />
                    {/* Progress Indicator */}
                    <circle 
                        cx="50" cy="50" r={radius} 
                        stroke="currentColor" strokeWidth="4" fill="transparent" 
                        strokeDasharray={circumference} 
                        strokeDashoffset={progressOffset} 
                        strokeLinecap="round"
                        className={`${currentConfig.stroke} transition-all duration-1000 ease-linear`} 
                    />
                </svg>
                
                <div className="text-center z-10 flex flex-col items-center">
                    <span className={`text-6xl sm:text-7xl font-black tabular-nums tracking-tighter ${currentConfig.color} drop-shadow-sm scale-110`}>
                        {formatTime(timeLeft)}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mt-4 border transition-all duration-300 ${isRunning ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-200 dark:border-slate-700 shadow-sm' : 'bg-transparent text-slate-400 dark:text-slate-500 border-transparent'}`}>
                        {isRunning ? 'Running' : 'Paused'}
                    </span>
                </div>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-4 gap-3 w-full max-w-xs sm:max-w-sm">
                <button 
                    onClick={() => dispatch('toggle')}
                    className={`col-span-3 py-4 rounded-2xl font-black text-white text-lg shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 group ${
                        isRunning 
                        ? 'bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600' 
                        : `${currentConfig.bg} shadow-${currentConfig.baseColor}-500/30`
                    }`}
                >
                    {isRunning ? (
                        <>
                           <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                           <span>ايقاف مؤقت</span>
                        </>
                    ) : (
                        <>
                           <svg className="w-6 h-6 group-hover:translate-x-[-2px] transition-transform rtl:rotate-180" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                           <span>ابدأ الآن</span>
                        </>
                    )}
                </button>
                
                <button 
                    onClick={() => dispatch('reset')}
                    className="col-span-1 py-4 bg-slate-100 dark:bg-[--bg-card] text-slate-500 dark:text-[--text-secondary] font-bold rounded-2xl hover:bg-slate-200 dark:hover:bg-[--item-hover] hover:text-slate-800 dark:hover:text-[--text-primary] active:scale-95 transition-all duration-200 flex items-center justify-center border border-slate-200 dark:border-[--glass-border] group"
                    title="إعادة ضبط المؤقت الحالي"
                >
                    <svg className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                </button>
            </div>

        </div>
      </div>
    </div>
  );
};

export default DailySession;
