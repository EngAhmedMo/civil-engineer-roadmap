import React, { useState, useMemo, useEffect } from 'react';
import { UserProgress, WeekSchedule } from '../types';
import { scheduleWeeks } from '../constants';

interface MapScheduleProps {
  progress: UserProgress;
  onToggleTask: (taskId: string) => void;
  onUnlockWeek: (weekId: number) => void;
  onReset: () => Promise<void>;
  setWeekIcon: (weekId: number, icon: string) => void;
}

const BADGE_LIBRARY = [
  "🏆", "🥇", "🥈", "🥉", "🎖️", "🏗️", "📐", "👷", "🧱", "🛠️", "🚜", "🎓", "🌟", "🔥", "💎", "🛡️", "⚔️", "🚩", "🚀", "💡"
];

const MapSchedule: React.FC<MapScheduleProps> = ({ progress, onToggleTask, onUnlockWeek, onReset, setWeekIcon }) => {
  const [gateModal, setGateModal] = useState<WeekSchedule | null>(null);
  const [badgeModal, setBadgeModal] = useState<number | null>(null);
  const [isResetting, setIsResetting] = useState(false);

  // Derive phases from data
  const phases = useMemo(() => Array.from(new Set(scheduleWeeks.map(w => w.phase))), []);
  
  // Initialize active phase based on current user progress
  const [activePhase, setActivePhase] = useState(() => {
    const maxUnlocked = Math.max(...progress.unlocked, 1);
    const currentWeek = scheduleWeeks.find(w => w.id === maxUnlocked);
    return currentWeek ? currentWeek.phase : phases[0];
  });

  // Update active phase when progress changes
  useEffect(() => {
    const maxUnlocked = Math.max(...progress.unlocked, 1);
    const currentWeek = scheduleWeeks.find(w => w.id === maxUnlocked);
    if (currentWeek) {
        setActivePhase(currentWeek.phase);
    }
  }, [progress.unlocked]);

  const handleReset = async () => {
    if(window.confirm("⚠️ تحذير نهائي: سيتم مسح جميع البيانات والبدء من الصفر. هل أنت متأكد تماماً؟")) {
        setIsResetting(true);
        try {
            await onReset();
        } catch (e) {
            console.error("Cloud reset error", e);
            alert("حدث خطأ أثناء إعادة الضبط، يرجى المحاولة مرة أخرى.");
        } finally {
            setIsResetting(false);
        }
    }
  };

  const handleUnlockRequest = (week: WeekSchedule) => {
    if (week.gateTest) setGateModal(week);
    else onUnlockWeek(week.id + 1);
  };

  const confirmUnlock = () => {
    if (gateModal) {
      onUnlockWeek(gateModal.id + 1);
      setGateModal(null);
    }
  };

  const getPhaseProgress = (phaseName: string) => {
    const phaseWeeks = scheduleWeeks.filter(w => w.phase === phaseName);
    let total = 0, completed = 0;
    phaseWeeks.forEach(w => w.days.forEach((d, di) => d.tasks.forEach((_, ti) => {
       total++;
       if (progress.completed.includes(`w${w.id}-d${di}-t${ti}`)) completed++;
    })));
    return total === 0 ? 0 : Math.round((completed / total) * 100);
  };

  const filteredWeeks = scheduleWeeks.filter(w => w.phase === activePhase);

  return (
    <div className="pt-20 md:pt-28 space-y-8 animate-fade-in relative pb-20">
      
      {/* Badge Selection Modal */}
      {badgeModal !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setBadgeModal(null)}>
            <div className="glass-panel w-full max-w-sm p-6 rounded-3xl bg-white dark:bg-[--bg-deep] border border-slate-200 dark:border-[--glass-border] animate-fade-in" onClick={e => e.stopPropagation()}>
                <h3 className="text-xl font-bold text-center mb-6 text-slate-900 dark:text-[--text-primary]">اختر وسام الأسبوع {badgeModal} 🏅</h3>
                <div className="grid grid-cols-5 gap-3">
                    {BADGE_LIBRARY.map(icon => (
                        <button 
                            key={icon} 
                            onClick={() => { setWeekIcon(badgeModal, icon); setBadgeModal(null); }}
                            className="w-12 h-12 flex items-center justify-center text-2xl rounded-xl bg-slate-100 dark:bg-[--bg-card] hover:bg-blue-100 dark:hover:bg-blue-500/20 hover:scale-110 transition-all border border-transparent hover:border-blue-500"
                        >
                            {icon}
                        </button>
                    ))}
                </div>
                <button onClick={() => setBadgeModal(null)} className="w-full mt-6 py-3 bg-slate-100 dark:bg-[--bg-card] text-slate-500 font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-[--item-hover] transition">إلغاء</button>
            </div>
        </div>
      )}

      {/* Gate Modal */}
      {gateModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-panel w-full max-w-xl p-8 md:p-10 rounded-3xl border-t-4 border-red-500 shadow-2xl animate-fade-in bg-white dark:bg-[--bg-deep]">
             <div className="flex items-center gap-4 mb-6 text-red-500">
               <div className="p-3 bg-red-50 dark:bg-red-500/10 rounded-2xl">
                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
               </div>
               <div>
                 <h2 className="text-2xl font-black">نقطة تفتيش إجبارية</h2>
                 <p className="text-sm text-red-500/80 dark:text-red-400/80">Gate Keeping Checkpoint</p>
               </div>
             </div>
             
             <h3 className="text-xl font-bold text-slate-900 dark:text-[--text-primary] mb-4 leading-snug">{gateModal.gateTest?.question}</h3>
             <div className="bg-slate-50 dark:bg-[--bg-card] p-6 rounded-2xl border border-slate-200 dark:border-[--glass-border] mb-8">
               <span className="text-xs font-bold text-slate-500 dark:text-[--text-secondary] uppercase tracking-wider block mb-2">معايير القبول:</span>
               <p className="text-base text-slate-700 dark:text-[--text-secondary] leading-relaxed">
                 {gateModal.gateTest?.criteria}
               </p>
             </div>
             
             <div className="flex items-start gap-3 bg-blue-50 dark:bg-blue-500/5 border border-blue-100 dark:border-blue-500/10 p-4 rounded-xl mb-8">
                <span className="text-xl">ℹ️</span>
                <p className="text-sm text-slate-600 dark:text-[--text-secondary]">
                   <span className="text-blue-600 dark:text-blue-500 font-bold">نصيحة:</span> راجع المصادر التعليمية لهذا الأسبوع جيداً قبل تأكيد الإنجاز. الأمانة العلمية مسؤوليتك.
                </p>
             </div>

             <div className="grid grid-cols-2 gap-4">
               <button onClick={() => setGateModal(null)} className="py-4 bg-transparent border border-slate-200 dark:border-[--glass-border] hover:bg-slate-50 dark:hover:bg-[--bg-card] text-slate-600 dark:text-[--text-secondary] font-bold rounded-xl transition">تراجع</button>
               <button onClick={confirmUnlock} className="py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-green-600/20 transition transform active:scale-95">
                 تم التنفيذ بنجاح ✓
               </button>
             </div>
          </div>
        </div>
      )}

      {/* Header Bar */}
      <div className="glass-panel p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-l-4 border-blue-500 shadow-xl bg-white dark:bg-slate-900/50">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-[--text-primary] tracking-tight mb-2">خارطة الطريق <span className="text-blue-500">.</span></h2>
          <p className="text-slate-600 dark:text-[--text-secondary] text-base md:text-lg font-medium max-w-xl">
             رحلة الـ 14 أسبوعاً المصممة هندسياً لنقلك من مستوى التخرج إلى الاحتراف الميداني.
          </p>
        </div>
        
        <button 
          onClick={handleReset} 
          disabled={isResetting}
          className={`group relative px-6 py-3 rounded-xl bg-red-50 hover:bg-red-500 dark:bg-red-500/5 dark:hover:bg-red-500 text-red-600 dark:text-red-500 hover:text-white border border-red-200 dark:border-red-500/20 hover:border-red-500 transition-all duration-300 ${isResetting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <span className="relative z-10 flex items-center gap-2 font-bold text-sm">
             {isResetting ? <span>جاري الحذف...</span> : <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                <span>إعادة ضبط النظام</span>
             </>}
          </span>
        </button>
      </div>

      {/* Phase Navigation Tabs */}
      <div className="sticky top-20 z-30 -mx-4 px-4 md:mx-0 md:px-0">
          <div className="glass-panel p-2 flex gap-2 overflow-x-auto no-scrollbar snap-x shadow-xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-[--glass-border] rounded-2xl">
            {phases.map((phase, idx) => {
                const isActive = activePhase === phase;
                const phaseProgress = getPhaseProgress(phase);
                const isComplete = phaseProgress === 100;
                
                return (
                    <button
                        key={phase}
                        onClick={() => setActivePhase(phase)}
                        className={`
                           flex-shrink-0 snap-center min-w-[150px] md:min-w-0 md:flex-1 relative overflow-hidden rounded-xl p-3 transition-all duration-300 text-right group flex flex-col justify-between min-h-[70px]
                           ${isActive 
                               ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 ring-1 ring-blue-500' 
                               : 'bg-white dark:bg-[--bg-card] hover:bg-slate-50 dark:hover:bg-[--item-hover] text-slate-500 dark:text-[--text-secondary] border border-slate-200 dark:border-transparent'
                           }
                        `}
                    >
                         <div className="flex justify-between items-start w-full mb-1">
                            <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-blue-200' : 'text-slate-400 dark:text-[--text-secondary] opacity-70'}`}>
                                المرحلة {idx + 1}
                            </span>
                            {isComplete && <span className="text-xs bg-green-500/20 text-green-500 px-1.5 py-0.5 rounded-md">✓</span>}
                        </div>

                        <div className="flex justify-between items-end w-full">
                            <h3 className={`text-sm md:text-base font-bold leading-tight ${isActive ? 'text-white' : 'text-slate-800 dark:text-[--text-primary]'}`}>
                                {phase.split(':')[1]?.trim() || phase}
                            </h3>
                            <span className={`text-[10px] font-mono font-bold ${isActive ? 'text-blue-100' : 'text-slate-400 dark:text-[--text-secondary]'}`}>{phaseProgress}%</span>
                        </div>
                        
                        {/* Tab Progress Bar */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/10">
                            <div 
                                className={`h-full ${isActive ? 'bg-white/80' : isComplete ? 'bg-green-500' : 'bg-blue-500'}`} 
                                style={{ width: `${phaseProgress}%` }}
                            ></div>
                        </div>
                    </button>
                );
            })}
          </div>
      </div>

      {/* Grid Layout for Active Phase */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 min-h-[50vh]">
        {filteredWeeks.map((week, index) => {
          const locked = !progress.unlocked.includes(week.id);
          
          let total = 0, done = 0;
          week.days.forEach((d, di) => d.tasks.forEach((t, ti) => {
            total++;
            if (progress.completed.includes(`w${week.id}-d${di}-t${ti}`)) done++;
          }));
          const pct = total === 0 ? 0 : Math.round((done / total) * 100);
          const isFull = pct === 100;
          const isNext = isFull && !progress.unlocked.includes(week.id + 1) && week.id < 14;
          const customIcon = progress.weekIcons?.[week.id];

          if (locked) {
            return (
              <div key={week.id} className="glass-panel p-0 h-full relative group overflow-hidden bg-slate-100 dark:bg-slate-900/40 border-2 border-slate-300 dark:border-slate-800 transition-all duration-300 hover:border-slate-400 dark:hover:border-slate-700">
                  {/* Pattern Background */}
                  <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] group-hover:opacity-[0.08] transition-opacity"></div>
                  
                  {/* Locked Visuals - High Contrast */}
                  <div className="flex flex-col items-center justify-center h-full text-center gap-5 py-12 px-6 relative z-10">
                      <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm ring-1 ring-slate-300 dark:ring-slate-700 text-slate-500 dark:text-slate-600 group-hover:scale-110 transition-all duration-500">
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                      </div>
                      <div>
                          <span className="text-[10px] font-black font-mono text-slate-600 dark:text-slate-500 uppercase tracking-widest block mb-1">Week {week.id}</span>
                          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-300">محتوى مغلق</h3>
                          <p className="text-xs text-slate-600 dark:text-slate-500 mt-2 max-w-[200px] mx-auto leading-relaxed">أكمل الأسابيع السابقة لفتح هذا المحتوى</p>
                      </div>
                  </div>
              </div>
            );
          }

          return (
            <div key={week.id} className={`glass-panel p-0 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-900/10 ${isFull ? 'border-emerald-500/50' : 'border-[--glass-border] dark:border-blue-500/30'} border bg-white dark:bg-[--glass-bg] flex flex-col h-full animate-fade-in group`}>
                
                {/* Card Header - Clean White in Light Mode, No Gradients */}
                <div className="relative p-6 pb-4 bg-white dark:bg-transparent border-b border-slate-200 dark:border-transparent group-hover:bg-slate-50/50 dark:group-hover:bg-white/5 transition-colors">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                             <span className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 flex items-center justify-center text-xs font-bold border border-blue-200 dark:border-blue-500/20 font-mono">
                                {week.id}
                             </span>
                             <span className={`text-[10px] font-black uppercase tracking-widest ${isFull ? 'text-emerald-700 dark:text-emerald-500' : 'text-blue-700 dark:text-blue-500'}`}>
                                {isFull ? 'COMPLETED' : 'IN PROGRESS'}
                             </span>
                        </div>
                        
                         {isFull && (
                            <button 
                                onClick={(e) => { e.stopPropagation(); setBadgeModal(week.id); }}
                                className={`w-10 h-10 -mt-2 -ml-2 rounded-full flex items-center justify-center bg-gradient-to-br from-amber-300 to-amber-500 text-white shadow-lg shadow-amber-500/30 hover:scale-110 transition-transform text-xl z-20 ${!customIcon ? 'animate-pulse-slow' : ''}`}
                                title="تغيير وسام الأسبوع"
                            >
                                {customIcon || "🏆"}
                            </button>
                         )}
                    </div>

                    <div className="mb-5">
                        <h3 className="text-2xl font-black text-slate-900 dark:text-[--text-primary] leading-tight mb-3 tracking-tight">
                            {week.title}
                        </h3>
                        
                        <div className="flex flex-col gap-3">
                            <div className="inline-flex items-center self-start gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-300 font-bold">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                {week.source}
                            </div>
                            
                            {/* NOTE DISPLAY - High Contrast */}
                            {week.note && (
                                <div className="mt-2 p-3.5 bg-amber-50 dark:bg-yellow-500/5 border border-amber-300 dark:border-yellow-500/20 rounded-xl relative overflow-hidden">
                                    <div className="absolute right-0 top-0 bottom-0 w-1 bg-amber-400 dark:bg-yellow-500"></div>
                                    <div className="flex gap-3">
                                        <div className="flex-shrink-0 mt-0.5">
                                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-400 dark:bg-yellow-500 text-white text-[10px] font-bold">💡</span>
                                        </div>
                                        <div>
                                            <h4 className="text-[10px] font-black text-amber-800 dark:text-yellow-500 uppercase tracking-wider mb-1">دليل المذاكرة</h4>
                                            <p className="text-sm font-bold text-slate-900 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                                                {week.note}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                       <div className="flex justify-between items-end">
                          <span className="text-xs font-bold text-slate-700 dark:text-slate-400 uppercase tracking-wider">معدل الإنجاز</span>
                          <span className={`text-sm font-black font-mono ${isFull ? 'text-emerald-700 dark:text-emerald-400' : 'text-blue-700 dark:text-blue-400'}`}>{pct}%</span>
                       </div>
                       
                       <div className="h-3 w-full bg-slate-200 dark:bg-black/40 rounded-full overflow-hidden border border-slate-300 dark:border-white/10 p-[1px] shadow-inner">
                          <div 
                            className={`h-full rounded-full relative overflow-hidden transition-all duration-1000 ease-out shadow-sm
                                ${isFull 
                                  ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' 
                                  : 'bg-gradient-to-r from-blue-600 to-cyan-500'
                                }`} 
                            style={{ width: `${pct}%` }}
                          >
                            <div className="absolute top-0 bottom-0 right-0 w-full bg-gradient-to-l from-white/20 to-transparent"></div>
                          </div>
                       </div>
                    </div>
                </div>

                {/* Tasks List (High Contrast) */}
                <div className="p-6 pt-4 space-y-6 flex-1 bg-white dark:bg-transparent">
                    {week.days.map((d, di) => (
                        <div key={di}>
                            <h4 className={`text-sm font-black uppercase mb-3 flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 ${d.name.includes('الجمعة') ? 'text-pink-600 dark:text-pink-400' : 'text-slate-900 dark:text-slate-500'}`}>
                                {d.name}
                            </h4>
                            <div className="space-y-2">
                                {d.tasks.map((t, ti) => {
                                    const tid = `w${week.id}-d${di}-t${ti}`;
                                    const checked = progress.completed.includes(tid);
                                    return (
                                        <label key={ti} className={`group/item flex items-start gap-3 p-3.5 rounded-xl cursor-pointer transition-all duration-200 border relative overflow-hidden ${
                                          checked 
                                          ? 'bg-slate-100 dark:bg-slate-800/40 border-transparent opacity-75 hover:opacity-100' 
                                          : 'bg-white dark:bg-[--bg-card] border-slate-200 dark:border-[--glass-border] hover:border-blue-400 dark:hover:border-blue-500/50 hover:shadow-md hover:-translate-y-0.5'
                                        }`}>
                                            <div className={`mt-0.5 w-5 h-5 rounded border-[1.5px] grid place-content-center transition-all duration-300 flex-shrink-0 z-10 ${
                                              checked 
                                              ? 'bg-emerald-500 border-emerald-500 scale-100 shadow-sm' 
                                              : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-transparent group-hover/item:border-blue-500 group-hover/item:scale-110'
                                            }`}>
                                                <input type="checkbox" className="hidden" onChange={() => onToggleTask(tid)} checked={checked} />
                                                <svg className={`w-3 h-3 text-white transition-transform duration-300 ${checked ? 'scale-100' : 'scale-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" d="M5 13l4 4L19 7"></path></svg>
                                            </div>
                                            <span className={`text-sm leading-snug transition-colors duration-300 z-10 ${
                                              checked 
                                              ? 'text-slate-500 dark:text-slate-500 line-through decoration-slate-400/50 font-medium' 
                                              : 'text-slate-900 dark:text-slate-200 font-bold'
                                            }`}>
                                                {t}
                                            </span>
                                        </label>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
                {/* Unlock Next Action */}
                {isNext && (
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800">
                        <button 
                            onClick={() => handleUnlockRequest(week)} 
                            className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition-transform active:scale-95 flex items-center justify-center gap-2 text-sm"
                        >
                            {week.gateTest ? (
                                <><span>بدء اختبار العبور</span> <span className="bg-white/20 px-1.5 py-0.5 rounded text-xs">Gate Test ⚔️</span></>
                            ) : (
                                <><span>فتح الأسبوع التالي</span> <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"></path></svg></>
                            )}
                        </button>
                    </div>
                )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MapSchedule;