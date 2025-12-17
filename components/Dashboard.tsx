
import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip, Legend } from 'recharts';
import { UserProgress } from '../types';
import { scheduleWeeks } from '../constants';

interface DashboardProps {
  progress: UserProgress;
  navigateToMap: () => void;
  navigateToAnalytics: () => void;
  isDark: boolean;
  onOpenSession: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ progress, navigateToMap, navigateToAnalytics, isDark, onOpenSession }) => {
  
  const completedCount = progress.completed.length;
  const currentWeekId = Math.max(...progress.unlocked);
  const xp = completedCount * 50; 
  const totalTasks = scheduleWeeks.reduce((acc, w) => acc + w.days.reduce((dAcc, d) => dAcc + d.tasks.length, 0), 0);
  const percent = totalTasks === 0 ? 0 : Math.min(100, Math.round((completedCount / totalTasks) * 100));

  // Refined Professional Engineering Ranks - High Contrast for "Fresh Grad"
  const getRank = (pct: number) => {
    if (pct < 10) return { title: "مهندس حديث التخرج (Fresh Grad)", color: "text-slate-900 dark:text-white", icon: "👷" };
    if (pct < 30) return { title: "مهندس موقع (Site Engineer)", color: "text-emerald-600 dark:text-emerald-500", icon: "🏗️" };
    if (pct < 60) return { title: "مهندس أول (Senior Engineer)", color: "text-blue-600 dark:text-blue-500", icon: "📐" };
    if (pct < 90) return { title: "مدير مشروع (Project Manager)", color: "text-purple-600 dark:text-purple-500", icon: "👔" };
    return { title: "استشاري عام (General Consultant)", color: "text-amber-600 dark:text-amber-500", icon: "👑" };
  };

  const rank = getRank(percent);

  const currentWeekObj = scheduleWeeks.find(w => w.id === currentWeekId);
  let weekTotal = 0, weekCompleted = 0;
  if (currentWeekObj) {
      currentWeekObj.days.forEach((d, di) => d.tasks.forEach((_, ti) => {
          weekTotal++;
          if (progress.completed.includes(`w${currentWeekId}-d${di}-t${ti}`)) weekCompleted++;
      }));
  }
  const weekPercent = weekTotal === 0 ? 0 : Math.round((weekCompleted / weekTotal) * 100);

  let scores = { Phase1: 0, Phase2: 0, Phase3: 0, Phase4: 0 };
  let totals = { Phase1: 0, Phase2: 0, Phase3: 0, Phase4: 0 };

  scheduleWeeks.forEach(w => {
    let pKey: keyof typeof scores = w.id <= 4 ? 'Phase1' : w.id <= 8 ? 'Phase2' : w.id <= 11 ? 'Phase3' : 'Phase4';
    w.days.forEach((d, di) => d.tasks.forEach((_, ti) => {
        totals[pKey]++;
        if (progress.completed.includes(`w${w.id}-d${di}-t${ti}`)) scores[pKey]++;
    }));
  });

  const getScore = (key: keyof typeof scores) => totals[key] === 0 ? 0 : Math.round((scores[key] / totals[key]) * 100);

  // Corrected Chart Labels and Data with Bilingual text and precise positioning
  const data = [
      { subject: 'التنفيذ (Execution)', user: getScore('Phase1'), market: 80 },
      { subject: 'التشطيبات (Finishing)', user: getScore('Phase2'), market: 65 },
      { subject: 'المكتب الفني (Tech Office)', user: getScore('Phase3'), market: 50 },
      { subject: 'الإدارة (Management)', user: getScore('Phase4'), market: 30 },
  ];

  // Colors adjusted for Light Mode visibility
  const radarColors = {
      grid: isDark ? "#334155" : "#cbd5e1", // Darker grid in light mode
      text: isDark ? "#94a3b8" : "#334155", // Darker text in light mode
      userFill: "#3b82f6",
      marketStroke: isDark ? "#64748b" : "#94a3b8",
  };

  return (
    <div className="pt-20 md:pt-28 space-y-10 animate-fade-in">
      
      <div className="glass-panel p-8 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 shadow-sm border-l-4 border-blue-500 transition-all duration-300">
        <div>
           <div className="flex items-center gap-3 mb-4">
             <span className="flex h-3 w-3 relative">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
             </span>
             <span className="text-xs font-bold text-emerald-600 font-mono tracking-widest border border-emerald-500/20 px-3 py-1 rounded bg-emerald-500/5">
                ENGINEERING SYSTEM
             </span>
           </div>
           
           <h1 className="text-3xl md:text-5xl font-black text-[--text-primary] mb-3 tracking-tight">
             مركز التحكم الهندسي <span className="text-blue-600 font-mono text-2xl md:text-4xl">ECC</span>
           </h1>
           <p className="text-[--text-secondary] text-base md:text-lg font-medium max-w-2xl leading-relaxed">
             منظومة رقمية متكاملة لإدارة المسار المهني، تحليل الكفاءة الفنية، ومطابقة المهارات مع المواصفات القياسية لسوق العمل المصري.
           </p>
        </div>

        <button 
          onClick={onOpenSession} 
          className="w-full md:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold px-10 py-5 rounded-2xl shadow-lg shadow-blue-600/20 flex items-center justify-center gap-4 transition-transform hover:-translate-y-1 active:scale-95 group text-lg"
        >
          <div className="p-1.5 bg-white/20 rounded-full group-hover:rotate-90 transition-transform">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2"></path></svg>
          </div>
          جلسة عمل جديدة
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-6 md:gap-8">
        
        <div className="lg:col-span-4 space-y-6 md:space-y-8">
            <div className="glass-panel p-8 interactive flex flex-col items-center text-center relative overflow-hidden group">
                <div className="absolute top-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                <div className="w-24 h-24 rounded-3xl bg-slate-50 dark:bg-[--bg-deep] border border-slate-200 dark:border-[--glass-border] flex items-center justify-center text-5xl mb-6 shadow-inner transition-transform group-hover:scale-105">
                    {rank.icon}
                </div>
                {/* Changed label to clearer slate-700/200 */}
                <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-2">المسمى الوظيفي الحالي</h3>
                <h2 className={`text-xl md:text-2xl font-black ${rank.color} mb-8`}>{rank.title}</h2>

                {/* Fixed Background color for Dark Mode here: dark:bg-white/5 */}
                <div className="w-full space-y-6 bg-slate-50 dark:bg-white/5 p-6 rounded-2xl border border-slate-200 dark:border-[--glass-border]">
                    <div>
                        <div className="flex justify-between text-sm font-bold mb-3">
                            <span className="text-[--text-secondary]">نقاط الخبرة (XP)</span>
                            <span className="text-[--text-primary] font-mono text-base">{xp}</span>
                        </div>
                        <div className="h-3 w-full bg-[--bg-card] rounded-full overflow-hidden border border-[--glass-border]">
                            <div className="h-full bg-gradient-to-r from-amber-500 to-orange-600" style={{ width: `${Math.min(100, percent)}%` }}></div>
                        </div>
                    </div>
                    <div>
                         <div className="flex justify-between text-sm font-bold mb-3">
                            <span className="text-[--text-secondary]">نسبة الإنجاز الكلي</span>
                            <span className="text-[--text-primary] font-mono text-base">{percent}%</span>
                        </div>
                        <div className="h-3 w-full bg-[--bg-card] rounded-full overflow-hidden border border-[--glass-border]">
                            <div className="h-full bg-blue-600" style={{ width: `${percent}%` }}></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="glass-panel p-8 interactive border-l-4 border-emerald-500 hover:border-emerald-400 transition-colors">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-sm font-bold text-[--text-secondary] uppercase tracking-wider mb-2">المهمة الجارية</h3>
                    <h4 className="text-xl font-bold text-[--text-primary] line-clamp-1">{currentWeekObj?.title}</h4>
                  </div>
                  <span className="text-sm font-mono font-bold bg-emerald-500/10 text-emerald-600 px-3 py-1.5 rounded border border-emerald-500/20">
                    W{currentWeekId}
                  </span>
                </div>
                
                <div className="mb-6">
                   <div className="flex justify-between text-sm text-[--text-secondary] mb-2">
                      <span>التقدم الأسبوعي</span>
                      <span className="font-mono font-bold">{weekPercent}%</span>
                   </div>
                   <div className="h-3 w-full bg-slate-100 dark:bg-[--bg-deep] rounded-full overflow-hidden border border-slate-200 dark:border-transparent">
                      <div className="h-full bg-emerald-500 transition-all duration-700" style={{ width: `${weekPercent}%` }}></div>
                   </div>
                </div>
                
                <button onClick={navigateToMap} className="w-full py-4 text-base font-bold text-emerald-600 hover:text-white border border-emerald-500/30 hover:bg-emerald-600 rounded-xl transition-all flex items-center justify-center gap-3 active:scale-95">
                    متابعة التنفيذ <span className="text-xl">→</span>
                </button>
            </div>
        </div>

        <div className="lg:col-span-8 h-full">
            <div className="glass-panel p-6 md:p-10 h-full min-h-[500px] flex flex-col relative border-2 border-[--glass-border]">
                <div className="flex justify-between items-start mb-6">
                   <div>
                      <h3 className="text-xl font-bold text-[--text-primary] flex items-center gap-3">
                          <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                          مؤشر الكفاءة الفنية (Technical KPI)
                      </h3>
                      <p className="text-sm text-[--text-secondary] mt-2">تحليل مقارن بين مهاراتك الحالية ومتطلبات السوق</p>
                   </div>
                   <div className="text-xs bg-slate-100 dark:bg-[--bg-deep] border border-slate-200 dark:border-[--glass-border] px-4 py-3 rounded-lg text-[--text-secondary] max-w-[150px] text-center hidden md:block">
                      <strong className="block text-[--text-primary] mb-1">خط الهدف:</strong>
                      مهندس موقع (Junior)
                   </div>
                </div>

                <div className="flex-1 w-full min-h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        {/* Reduced outerRadius to 55% to prevent label overlap */}
                        <RadarChart cx="50%" cy="50%" outerRadius="55%" data={data}>
                            <PolarGrid gridType="polygon" stroke={radarColors.grid} />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: radarColors.text, fontSize: 13, fontWeight: 'bold' }} />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                            <Radar name="متطلبات السوق" dataKey="market" stroke={radarColors.marketStroke} strokeWidth={2} strokeDasharray="4 4" fill="transparent" />
                            <Radar name="مستواك الحالي" dataKey="user" stroke={radarColors.userFill} strokeWidth={3} fill={radarColors.userFill} fillOpacity={0.4} />
                            <Tooltip contentStyle={{ backgroundColor: 'var(--bg-deep)', borderColor: 'var(--glass-border)', borderRadius: '8px', fontSize: '14px', color: 'var(--text-primary)' }} itemStyle={{ color: 'var(--text-primary)' }} />
                            <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '14px', fontFamily: 'var(--font-main)' }} />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
