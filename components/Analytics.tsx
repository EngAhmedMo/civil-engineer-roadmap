import React from 'react';
import { UserProgress } from '../types';
import { scheduleWeeks } from '../constants';

interface AnalyticsProps {
  progress: UserProgress;
  onBack: () => void;
}

const Analytics: React.FC<AnalyticsProps> = ({ progress, onBack }) => {
  // Feature C & E: History and Self-Review Analytics
  const totalWeeks = scheduleWeeks.length;
  
  // Calculate completion per week
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
        percentage: total === 0 ? 0 : Math.round((completed / total) * 100),
        status: progress.unlocked.includes(week.id) ? (completed === total ? 'complete' : 'active') : 'locked'
    };
  });

  const activeWeeks = weeklyStats.filter(w => w.status !== 'locked').length;
  const fullyCompletedWeeks = weeklyStats.filter(w => w.percentage === 100).length;
  
  // Simple Consistency Metric (Mocked logic based on active vs completed)
  const consistencyScore = activeWeeks > 0 ? Math.round((fullyCompletedWeeks / activeWeeks) * 100) : 100;
  
  const getConsistencyLabel = (score: number) => {
      if (score >= 80) return { label: "ممتاز (High)", color: "text-emerald-500" };
      if (score >= 50) return { label: "متوسط (Medium)", color: "text-amber-500" };
      return { label: "يحتاج تحسين (Low)", color: "text-red-500" };
  };

  const consistency = getConsistencyLabel(consistencyScore);

  return (
    <section className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
            <button onClick={onBack} className="p-2 rounded-lg bg-[--glass-border] hover:bg-gray-700/50 transition">
                <svg className="w-5 h-5 text-[--text-secondary]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <div>
                <h2 className="text-2xl font-bold text-[--text-primary]">التحليل الذاتي وسجل التقدم</h2>
                <p className="text-[--text-secondary] text-sm">مراجعة هادئة للأداء بدون ضغط.</p>
            </div>
        </div>

        {/* Indicators (Feature E) */}
        <div className="grid md:grid-cols-3 gap-4">
            <div className="glass-panel p-5 rounded-xl border-t-4 border-emerald-500">
                <h3 className="text-xs font-bold text-[--text-secondary] uppercase mb-2">معدل الاستمرارية (Consistency)</h3>
                <p className={`text-xl font-bold ${consistency.color}`}>{consistency.label}</p>
                <p className="text-[10px] text-[--text-secondary] mt-1">يعتمد على نسبة إغلاق الأسابيع المفتوحة.</p>
            </div>
            
            <div className="glass-panel p-5 rounded-xl border-t-4 border-blue-500">
                <h3 className="text-xs font-bold text-[--text-secondary] uppercase mb-2">إيقاع العمل (Pace)</h3>
                <p className="text-xl font-bold text-blue-500">{activeWeeks} أسابيع نشطة</p>
                <p className="text-[10px] text-[--text-secondary] mt-1">من أصل {totalWeeks} أسابيع في الخطة.</p>
            </div>

            <div className="glass-panel p-5 rounded-xl border-t-4 border-purple-500">
                <h3 className="text-xs font-bold text-[--text-secondary] uppercase mb-2">التركيز الحالي (Trend)</h3>
                <p className="text-xl font-bold text-purple-500">
                    {activeWeeks <= 4 ? "تأسيس وتنفيذ" : activeWeeks <= 8 ? "تشطيبات وكهروميكانيكا" : "مكتب فني وتصميم"}
                </p>
                <p className="text-[10px] text-[--text-secondary] mt-1">بناءً على موقعك الحالي في الخارطة.</p>
            </div>
        </div>

        {/* History List (Feature C) */}
        <div className="glass-panel rounded-xl overflow-hidden">
            <div className="p-4 border-b border-[--glass-border] bg-gray-900/20">
                <h3 className="font-bold text-[--text-primary]">سجل الأسابيع (Week Log)</h3>
            </div>
            <div className="divide-y divide-[--glass-border]">
                {weeklyStats.map((week) => (
                    <div key={week.id} className={`p-4 flex items-center justify-between transition hover:bg-gray-700/10 ${week.status === 'locked' ? 'opacity-50 grayscale' : ''}`}>
                        <div className="flex items-center gap-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border ${week.status === 'complete' ? 'bg-green-500/20 text-green-500 border-green-500' : week.status === 'active' ? 'bg-blue-500/20 text-blue-500 border-blue-500' : 'bg-gray-700 text-gray-500 border-gray-600'}`}>
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
                            <div className="hidden md:block w-32 bg-gray-700/30 h-1.5 rounded-full overflow-hidden">
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