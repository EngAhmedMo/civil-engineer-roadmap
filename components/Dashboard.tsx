import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { UserProgress } from '../types';
import { scheduleWeeks } from '../constants';

interface DashboardProps {
  progress: UserProgress;
  navigateToMap: () => void;
  navigateToAnalytics: () => void;
  isDark: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ progress, navigateToMap, navigateToAnalytics, isDark }) => {
  const completedCount = progress.completed.length;
  const currentWeek = Math.max(...progress.unlocked);
  const xp = completedCount * 25;
  const totalTasks = 112;
  const percent = Math.min(100, Math.round((completedCount / totalTasks) * 100));

  // Calculate Weekly Summary
  const currentWeekObj = scheduleWeeks.find(w => w.id === currentWeek);
  let weekTotal = 0;
  let weekCompleted = 0;
  if (currentWeekObj) {
      currentWeekObj.days.forEach((d, di) => {
          d.tasks.forEach((_, ti) => {
              weekTotal++;
              const taskId = `w${currentWeek}-d${di}-t${ti}`;
              if (progress.completed.includes(taskId)) weekCompleted++;
          });
      });
  }
  const weekPercent = weekTotal === 0 ? 0 : Math.round((weekCompleted / weekTotal) * 100);

  // Calculate Radar Data
  let scores = { Site: 10, Finishing: 10, Shop: 5, Office: 5, BIM: 5 };
  progress.completed.forEach(tid => {
      const wid = parseInt(tid.split('-')[0].replace('w', ''));
      if (wid <= 4) scores.Site += 2;
      else if (wid <= 8) scores.Finishing += 2;
      else if (wid <= 11) scores.Shop += 3;
      else if (wid === 12) scores.Office += 8;
      else scores.BIM += 6;
  });

  const data = [
      { subject: 'تنفيذ (Site)', A: 100, B: Math.min(100, scores.Site) },
      { subject: 'تشطيبات (Fin)', A: 100, B: Math.min(100, scores.Finishing) },
      { subject: 'Shop Drawing', A: 100, B: Math.min(100, scores.Shop) },
      { subject: 'مكتب فني', A: 100, B: Math.min(100, scores.Office) },
      { subject: 'BIM', A: 100, B: Math.min(100, scores.BIM) },
  ];

  const gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const textColor = isDark ? '#94a3b8' : '#475569';

  return (
    <section className="space-y-6 animate-fade-in">
      <div className="glass-panel rounded-2xl p-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[--text-primary] mb-2">مؤشر الجاهزية <span className="text-blue-500">وإغلاق الفجوة</span></h1>
            <p className="text-[--text-secondary] text-sm">تتبع تقدمك المهني مقارنة بمتطلبات سوق العمل المصري.</p>
          </div>
          <div className="flex items-center gap-3">
             <button onClick={navigateToAnalytics} className="text-xs font-bold text-[--text-secondary] hover:text-[--text-primary] border border-gray-600/30 px-3 py-1.5 rounded-lg hover:bg-gray-700/20 transition flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z"></path></svg>
                سجل التقدم والتحليل
             </button>
             <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-green-500 text-xs font-bold">نشط</span>
             </div>
          </div>
        </div>

        {/* Weekly Summary (Feature D) */}
        <div className="mb-8 p-4 bg-blue-500/5 border border-blue-500/10 rounded-xl flex items-start gap-3">
            <div className="bg-blue-500/20 p-2 rounded-lg text-blue-400 mt-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <div>
                <h4 className="text-sm font-bold text-[--text-primary] mb-1">ملخص الأسبوع {currentWeek}: {currentWeekObj?.title.split(':')[1]}</h4>
                <p className="text-xs text-[--text-secondary] leading-relaxed">
                    أنجزت <strong>{weekCompleted}</strong> من أصل <strong>{weekTotal}</strong> مهام لهذا الأسبوع ({weekPercent}%). 
                    {weekPercent === 100 ? " أداء ممتاز! أنت جاهز للانتقال للأسبوع التالي." : 
                     weekPercent > 50 ? " تقدم جيد، حافظ على هذا الإيقاع لإغلاق الأسبوع." : 
                     " بداية موفقة، ركز على المهام العملية لرفع المؤشر."}
                </p>
            </div>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="relative h-[300px] w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                <PolarGrid stroke={gridColor} />
                <PolarAngleAxis dataKey="subject" tick={{ fill: textColor, fontSize: 11, fontFamily: 'Cairo' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Target" dataKey="A" stroke="rgba(248, 113, 113, 0.5)" strokeWidth={2} fillOpacity={0} strokeDasharray="4 4" />
                <Radar name="Current" dataKey="B" stroke="#3b82f6" strokeWidth={2} fill="rgba(59, 130, 246, 0.5)" fillOpacity={0.5} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-6">
            <div className="glass-panel p-6 rounded-xl border-r-4 border-blue-500">
              <div className="flex justify-between items-end mb-3">
                <span className="text-[--text-secondary] text-xs font-bold uppercase tracking-wider">نسبة الإنجاز الكلي</span>
                <span className="text-3xl font-bold text-[--text-primary]">{percent}%</span>
              </div>
              <div className="w-full h-3 bg-gray-700/30 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-l from-blue-500 to-blue-600 transition-all duration-1000" style={{ width: `${percent}%` }}></div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="glass-panel p-4 rounded-xl text-center border-gray-700/20">
                <span className="block text-2xl font-bold text-[--text-primary] mb-1">{completedCount}</span>
                <span className="text-[10px] text-[--text-secondary]">مهمة منجزة</span>
              </div>
              <div className="glass-panel p-4 rounded-xl text-center border-gray-700/20">
                <span className="block text-2xl font-bold text-amber-500 mb-1">{xp}</span>
                <span className="text-[10px] text-[--text-secondary]">نقاط (XP)</span>
              </div>
              <div className="glass-panel p-4 rounded-xl text-center border-gray-700/20">
                <span className="block text-2xl font-bold text-green-500 mb-1">{currentWeek}</span>
                <span className="text-[10px] text-[--text-secondary]">الأسبوع الحالي</span>
              </div>
            </div>

            <button onClick={navigateToMap} className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2">
              استئناف الخطة التدريبية
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;