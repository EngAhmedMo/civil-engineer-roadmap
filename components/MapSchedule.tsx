import React from 'react';
import { UserProgress, WeekSchedule } from '../types';
import { scheduleWeeks } from '../constants';

interface MapScheduleProps {
  progress: UserProgress;
  onToggleTask: (taskId: string) => void;
  onUnlockWeek: (weekId: number) => void;
  onReset: () => void;
}

const MapSchedule: React.FC<MapScheduleProps> = ({ progress, onToggleTask, onUnlockWeek, onReset }) => {
  const handleReset = () => {
    if(window.confirm("تحذير: سيتم مسح كل التقدم والبدء من الأسبوع الأول. هل أنت متأكد؟")) {
      onReset();
    }
  };

  return (
    <section className="space-y-6 animate-fade-in">
      <div className="glass-panel p-6 rounded-xl border-l-4 border-blue-500 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-[--text-primary]">خارطة المهمة (14 أسبوع)</h2>
          <p className="text-[--text-secondary] mt-1 text-sm">نظام الساعتين: مشاهدة (Input) + تطبيق (Output).</p>
        </div>
        <button onClick={handleReset} className="text-xs text-red-400 hover:text-red-600 border border-red-500/30 px-3 py-1 rounded transition-colors">إعادة ضبط</button>
      </div>

      <div className="space-y-4">
        {scheduleWeeks.map((week) => {
          const locked = !progress.unlocked.includes(week.id);
          
          let total = 0, done = 0;
          week.days.forEach((d, di) => d.tasks.forEach((t, ti) => {
            total++;
            if (progress.completed.includes(`w${week.id}-d${di}-t${ti}`)) done++;
          }));
          const pct = total === 0 ? 0 : Math.round((done / total) * 100);
          const isFull = pct === 100;

          if (locked) {
            return (
              <div key={week.id} className="glass-panel p-6 rounded-xl border border-gray-500/20 opacity-50 pointer-events-none grayscale relative">
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="bg-gray-900/90 px-4 py-2 rounded-lg text-gray-300 font-bold flex items-center gap-2 border border-gray-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                    محتوى مغلق (أكمل الأسبوع السابق)
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[--text-secondary]">{week.title}</h3>
              </div>
            );
          }

          return (
            <div key={week.id} className={`glass-panel p-6 rounded-xl border-r-4 ${isFull ? 'border-green-500' : 'border-gray-500'} transition-all hover:shadow-lg`}>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 border-b border-gray-500/20 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-[--text-primary]">{week.title}</h3>
                  <div className="text-sm text-[--text-secondary] mt-1 flex items-center gap-2">
                    <span className="text-amber-500">⚠ المصدر:</span> {week.source}
                  </div>
                </div>
                <span className={`text-xs font-bold ${isFull ? 'text-green-500' : 'text-[--text-secondary]'} opacity-80 px-2 py-1 rounded mt-2 md:mt-0`}>{pct}%</span>
              </div>
              <div className="w-full bg-gray-500/20 h-1 rounded-full mb-6 overflow-hidden">
                <div className={`h-full ${isFull ? 'bg-green-500' : 'bg-gray-500'} transition-all duration-500`} style={{ width: `${pct}%` }}></div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {week.days.map((d, di) => (
                  <div key={di} className="mb-4 last:mb-0">
                    <h4 className="text-blue-500 text-xs font-bold uppercase mb-2 border-b border-gray-500/20 pb-1">{d.name}</h4>
                    {d.tasks.map((t, ti) => {
                      const tid = `w${week.id}-d${di}-t${ti}`;
                      const checked = progress.completed.includes(tid);
                      return (
                        <label key={ti} className="flex items-center gap-3 p-2 rounded hover:bg-gray-500/10 cursor-pointer transition">
                          <input 
                            type="checkbox" 
                            className="appearance-none bg-[--glass-border] w-5 h-5 border-2 border-[--text-secondary] rounded grid place-content-center cursor-pointer checked:bg-[--accent-site] checked:border-[--accent-site] before:content-['✓'] before:text-white before:text-xs before:scale-0 checked:before:scale-100 before:transition-transform"
                            onChange={() => onToggleTask(tid)} 
                            checked={checked} 
                          />
                          <span className={`text-sm ${checked ? 'line-through text-[--text-secondary] opacity-70' : 'text-[--text-secondary]'}`}>{t}</span>
                        </label>
                      );
                    })}
                  </div>
                ))}
              </div>
              {isFull && !progress.unlocked.includes(week.id + 1) && week.id < 14 && (
                <button onClick={() => onUnlockWeek(week.id + 1)} className="mt-4 w-full py-2 bg-green-600 hover:bg-green-500 text-white font-bold rounded shadow-lg shadow-green-500/30 transition animate-pulse">
                  فتح الأسبوع التالي 🔓
                </button>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MapSchedule;