
import React, { useMemo } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine,
  Line,
  ComposedChart
} from 'recharts';
import { UserProgress } from '../types';
import { scheduleWeeks } from '../constants';

interface AnalyticsProps {
  progress: UserProgress;
  onBack: () => void;
}

const Analytics: React.FC<AnalyticsProps> = ({ progress, onBack }) => {
  // Feature C & E: History and Self-Review Analytics
  const totalWeeks = scheduleWeeks.length;
  
  // 1. Calculate weekly stats (History List)
  const weeklyStats = scheduleWeeks.map(week => {
    let total = 0;
    let completed = 0;
    week.days.forEach((d, di) => {
        d.tasks.forEach((_, ti) => {
            total++;
            if (progress.completed.includes(`w${week.id}-d${di}-t${ti}`)) completed++;
        });
    });
    return {
        id: week.id,
        title: week.title,
        taskCount: total,
        completedCount: completed,
        percentage: total === 0 ? 0 : Math.round((completed / total) * 100),
        status: progress.unlocked.includes(week.id) ? (completed === total ? 'complete' : 'active') : 'locked'
    };
  });

  // 2. Prepare Chart Data (S-Curve Logic)
  const chartData = useMemo(() => {
    let cumulativePlanned = 0;
    let cumulativeActual = 0;
    const totalProgramTasks = weeklyStats.reduce((acc, w) => acc + w.taskCount, 0);
    
    // Calculate average tasks per week for linear projection (simplified Planned Curve)
    const avgTasksPerWeek = totalProgramTasks / totalWeeks;

    return weeklyStats.map((week, index) => {
        // Planned: Simple linear accumulation (Ideal path)
        // In a real S-Curve this is sigmoid, but linear is fine for baseline
        cumulativePlanned += avgTasksPerWeek;

        // Actual: Only sum if week is unlocked or passed
        const isUnlocked = progress.unlocked.includes(week.id);
        if (isUnlocked) {
            cumulativeActual += week.completedCount;
        }

        // Velocity: Tasks completed in this specific week
        const velocity = isUnlocked ? week.completedCount : 0;

        return {
            name: `W${week.id}`,
            weekLabel: `الأسبوع ${week.id}`,
            planned: Math.min(Math.round(cumulativePlanned), totalProgramTasks),
            actual: isUnlocked ? cumulativeActual : null, // Null to stop line if not reached
            velocity: velocity,
            isCurrent: Math.max(...progress.unlocked) === week.id
        };
    });
  }, [weeklyStats, progress.unlocked]);

  const activeWeeks = weeklyStats.filter(w => w.status !== 'locked').length;
  const fullyCompletedWeeks = weeklyStats.filter(w => w.percentage === 100).length;
  const totalCompletedTasks = progress.completed.length;
  const currentWeekIndex = Math.max(...progress.unlocked) - 1;
  
  // Estimate time: Avg 2.5 hours per task (Study + Application)
  const estimatedTotalHours = totalCompletedTasks * 2.5;
  const avgHoursPerWeek = activeWeeks > 0 ? Math.round(estimatedTotalHours / activeWeeks) : 0;

  // Simple Consistency Metric
  const consistencyScore = activeWeeks > 0 ? Math.round((fullyCompletedWeeks / activeWeeks) * 100) : 100;
  
  const getConsistencyLabel = (score: number) => {
      if (score >= 80) return { label: "ممتاز (High)", color: "text-emerald-500" };
      if (score >= 50) return { label: "متوسط (Medium)", color: "text-amber-500" };
      return { label: "يحتاج تحسين (Low)", color: "text-red-500" };
  };

  const consistency = getConsistencyLabel(consistencyScore);
  const dropOffRate = activeWeeks > 0 ? Math.round(((activeWeeks - fullyCompletedWeeks) / activeWeeks) * 100) : 0;
  
  const getDropOffColor = (rate: number) => {
      if (rate <= 20) return "text-emerald-500";
      if (rate <= 50) return "text-amber-500";
      return "text-red-500";
  };
  const getDropOffBorder = (rate: number) => {
      if (rate <= 20) return "border-emerald-500";
      if (rate <= 50) return "border-amber-500";
      return "border-red-500";
  };

  // Custom Tooltip for Chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[--bg-deep]/90 backdrop-blur-md p-4 rounded-xl border border-[--glass-border] shadow-xl text-xs">
          <p className="font-bold text-[--text-primary] mb-2 text-sm">{payload[0].payload.weekLabel}</p>
          <div className="space-y-1">
            <p className="text-blue-400 flex justify-between gap-4">
                <span>المخطط (Target):</span>
                <span className="font-mono font-bold">{payload.find((p:any) => p.dataKey === 'planned')?.value} مهمة</span>
            </p>
            <p className="text-emerald-400 flex justify-between gap-4">
                <span>الفعلي (Actual):</span>
                <span className="font-mono font-bold">{payload.find((p:any) => p.dataKey === 'actual')?.value ?? '--'} مهمة</span>
            </p>
            <div className="h-px bg-white/10 my-1"></div>
            <p className="text-amber-400 flex justify-between gap-4">
                <span>السرعة (Velocity):</span>
                <span className="font-mono font-bold">{payload.find((p:any) => p.dataKey === 'velocity')?.value ?? 0} / أسبوع</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <section className="space-y-8 animate-fade-in pt-20 md:pt-24 pb-20">
        {/* Header */}
        <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 rounded-lg bg-[--glass-border] hover:bg-gray-700/50 transition">
                <svg className="w-5 h-5 text-[--text-secondary]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <div>
                <h2 className="text-2xl font-bold text-[--text-primary]">التحليل الذاتي وسجل التقدم</h2>
                <p className="text-[--text-secondary] text-sm">مراجعة هادئة للأداء بدون ضغط.</p>
            </div>
        </div>

        {/* Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            <div className="glass-panel p-5 rounded-xl border-t-4 border-emerald-500">
                <h3 className="text-xs font-bold text-[--text-secondary] uppercase mb-2">معدل الاستمرارية</h3>
                <p className={`text-xl font-bold ${consistency.color}`}>{consistency.label}</p>
                <p className="text-[10px] text-[--text-secondary] mt-1">يعتمد على نسبة إغلاق الأسابيع المفتوحة.</p>
            </div>
            
            <div className="glass-panel p-5 rounded-xl border-t-4 border-blue-500">
                <h3 className="text-xs font-bold text-[--text-secondary] uppercase mb-2">إيقاع العمل (Pace)</h3>
                <p className="text-xl font-bold text-blue-500">{activeWeeks} أسابيع نشطة</p>
                <p className="text-[10px] text-[--text-secondary] mt-1">من أصل {totalWeeks} أسابيع في الخطة.</p>
            </div>

             <div className="glass-panel p-5 rounded-xl border-t-4 border-amber-500">
                <h3 className="text-xs font-bold text-[--text-secondary] uppercase mb-2">متوسط الجهد الأسبوعي</h3>
                <p className="text-xl font-bold text-amber-500">~{avgHoursPerWeek} ساعة/أسبوع</p>
                <p className="text-[10px] text-[--text-secondary] mt-1">تقدير بناءً على المهام المنجزة (2.5س للمهمة).</p>
            </div>

            <div className="glass-panel p-5 rounded-xl border-t-4 border-purple-500">
                <h3 className="text-xs font-bold text-[--text-secondary] uppercase mb-2">التركيز الحالي (Trend)</h3>
                <p className="text-xl font-bold text-purple-500">
                    {activeWeeks <= 4 ? "تأسيس وتنفيذ" : activeWeeks <= 8 ? "تشطيبات وكهروميكانيكا" : "مكتب فني وتصميم"}
                </p>
                <p className="text-[10px] text-[--text-secondary] mt-1">بناءً على موقعك الحالي في الخارطة.</p>
            </div>

            <div className={`glass-panel p-5 rounded-xl border-t-4 ${getDropOffBorder(dropOffRate)}`}>
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xs font-bold text-[--text-secondary] uppercase">معدل التسرب (Drop-off)</h3>
                    <div className={`p-1.5 rounded-lg ${getDropOffColor(dropOffRate).replace('text-', 'bg-').replace('500', '500/10')}`}>
                        <svg className={`w-4 h-4 ${getDropOffColor(dropOffRate)}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           {dropOffRate <= 20 
                             ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /> 
                             : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                           }
                        </svg>
                    </div>
                </div>
                
                <div className="flex items-baseline gap-2 mb-1">
                    <p className={`text-2xl font-black ${getDropOffColor(dropOffRate)}`}>{dropOffRate}%</p>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${dropOffRate <= 20 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                        {dropOffRate <= 20 ? 'مسار سليم' : 'تشتت عالي'}
                    </span>
                </div>
                
                <p className="text-[10px] text-[--text-secondary] leading-relaxed">
                   نسبة الأسابيع "المفتوحة" التي لم تغلقها بنسبة 100%.
                   {dropOffRate > 20 && <span className="block mt-1 font-bold text-red-500/80">⚠️ حاول إكمال ما بدأته أولاً.</span>}
                </p>
            </div>
        </div>

        {/* Efficiency Chart (New Section) */}
        <div className="glass-panel p-6 md:p-8 rounded-2xl relative overflow-hidden">
             <div className="flex justify-between items-start mb-6">
                <div>
                   <h3 className="text-lg font-bold text-[--text-primary] flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path></svg>
                      تحليل الكفاءة (Efficiency Curve)
                   </h3>
                   <p className="text-xs text-[--text-secondary] mt-1">مقارنة بين المسار المخطط (S-Curve) والمسار الفعلي للإنجاز.</p>
                </div>
                <div className="flex items-center gap-4 text-[10px] font-bold">
                    <span className="flex items-center gap-1.5 text-[--text-secondary]">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span> مخطط
                    </span>
                    <span className="flex items-center gap-1.5 text-[--text-secondary]">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span> فعلي
                    </span>
                     <span className="flex items-center gap-1.5 text-[--text-secondary]">
                        <span className="w-2 h-2 rounded-full bg-amber-500"></span> السرعة
                    </span>
                </div>
             </div>

             <div className="h-[300px] w-full" dir="ltr">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorPlanned" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--text-secondary)" strokeOpacity={0.1} vertical={false} />
                        <XAxis 
                            dataKey="name" 
                            stroke="var(--text-secondary)" 
                            tick={{fontSize: 10}} 
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis 
                            stroke="var(--text-secondary)" 
                            tick={{fontSize: 10}} 
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--text-secondary)', strokeWidth: 1, strokeDasharray: '4 4' }} />
                        
                        {/* Reference Line for Current Week */}
                        {currentWeekIndex >= 0 && (
                            <ReferenceLine x={`W${currentWeekIndex + 1}`} stroke="var(--text-secondary)" strokeDasharray="3 3" label={{ position: 'top', value: 'الآن', fill: 'var(--text-secondary)', fontSize: 10 }} />
                        )}

                        {/* Planned Area (Background) */}
                        <Area 
                            type="monotone" 
                            dataKey="planned" 
                            stroke="#3b82f6" 
                            strokeWidth={2}
                            strokeDasharray="4 4" 
                            fillOpacity={1} 
                            fill="url(#colorPlanned)" 
                            activeDot={false}
                        />

                        {/* Actual Area (Foreground) */}
                        <Area 
                            type="monotone" 
                            dataKey="actual" 
                            stroke="#10b981" 
                            strokeWidth={3} 
                            fillOpacity={1} 
                            fill="url(#colorActual)" 
                        />
                        
                        {/* Velocity Line (Secondary Metric) */}
                        <Line 
                            type="monotone" 
                            dataKey="velocity" 
                            stroke="#f59e0b" 
                            strokeWidth={2} 
                            dot={{r: 3, fill: '#f59e0b', strokeWidth: 0}}
                            activeDot={{r: 5}}
                        />
                    </ComposedChart>
                </ResponsiveContainer>
             </div>
        </div>

        {/* History List */}
        <div className="glass-panel rounded-xl overflow-hidden">
            <div className="p-4 border-b border-[--glass-border] bg-gray-900/5 dark:bg-gray-900/20">
                <h3 className="font-bold text-[--text-primary]">سجل الأسابيع (Week Log)</h3>
            </div>
            <div className="divide-y divide-[--glass-border]">
                {weeklyStats.map((week) => (
                    <div key={week.id} className={`p-4 flex items-center justify-between transition hover:bg-gray-700/5 dark:hover:bg-gray-700/10 ${week.status === 'locked' ? 'opacity-50 grayscale' : ''}`}>
                        <div className="flex items-center gap-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border ${week.status === 'complete' ? 'bg-green-500/20 text-green-500 border-green-500' : week.status === 'active' ? 'bg-blue-500/20 text-blue-500 border-blue-500' : 'bg-gray-700/20 text-gray-500 border-gray-400'}`}>
                                {week.id}
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-[--text-primary]">{week.title}</h4>
                                <span className="text-[10px] text-[--text-secondary]">
                                    {week.status === 'locked' ? 'مغلق' : week.status === 'complete' ? 'مكتمل تماماً' : 'جاري العمل'}
                                </span>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <div className="hidden md:block w-32 bg-gray-700/10 dark:bg-gray-700/30 h-1.5 rounded-full overflow-hidden">
                                <div className={`h-full ${week.percentage === 100 ? 'bg-green-500' : 'bg-blue-500'}`} style={{ width: `${week.percentage}%` }}></div>
                            </div>
                            <span className={`text-xs font-bold w-8 text-right ${week.percentage === 100 ? 'text-green-500' : 'text-[--text-primary]'}`}>{week.percentage}%</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
};

export default Analytics;
