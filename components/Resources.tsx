
import React, { useState } from 'react';
import { resourcesData } from '../constants';

const Resources: React.FC = () => {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? resourcesData : resourcesData.filter(r => r.cat === filter);

  // SVG Icons for professional look
  const Icons = {
    all: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>,
    site: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>,
    finish: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg>,
    shop: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"></path></svg>,
    office: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>,
    bim: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>,
    steel: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>,
    planb: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
  };

  const catConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
      'all': { label: 'الكل', color: 'blue', icon: Icons.all },
      'Site': { label: 'التنفيذ', color: 'emerald', icon: Icons.site },
      'Finishing': { label: 'التشطيبات', color: 'amber', icon: Icons.finish },
      'Shop': { label: 'شوب دروينج', color: 'blue', icon: Icons.shop },
      'Office': { label: 'مكتب فني', color: 'violet', icon: Icons.office },
      'BIM': { label: 'BIM & Revit', color: 'pink', icon: Icons.bim },
      'Steel': { label: 'ستيل', color: 'red', icon: Icons.steel },
      'PlanB': { label: 'مسار بديل', color: 'gray', icon: Icons.planb },
  };

  return (
    <section className="space-y-10 animate-fade-in pt-20 md:pt-28 pb-20 relative">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 px-2">
            <div>
                <h2 className="text-3xl font-black text-[--text-primary] tracking-tight mb-2">
                  المصادر المعتمدة <span className="text-blue-500">.</span>
                </h2>
                <p className="text-[--text-secondary] text-base max-w-xl leading-relaxed">
                    مكتبة رقمية منقحة بعناية. لا تشتت نفسك، ابدأ بالمصادر المحددة هنا.
                </p>
            </div>
            
            {/* Stats Pill */}
            <div className="hidden md:flex items-center gap-3 bg-[--bg-card] border border-[--glass-border] px-4 py-2 rounded-xl">
                 <div className="flex -space-x-2 space-x-reverse overflow-hidden">
                    {[1,2,3].map(i => (
                        <div key={i} className="inline-block h-6 w-6 rounded-full ring-2 ring-[--bg-deep] bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[8px] font-bold text-slate-500">
                             {i}
                        </div>
                    ))}
                 </div>
                 <span className="text-xs font-bold text-[--text-secondary]">{resourcesData.length} كورس ومصدر</span>
            </div>
        </div>

        {/* Filter Scrollable Bar - REMOVED BORDER-B */}
        <div className="sticky top-[64px] md:top-[80px] z-40 -mx-4 px-4 py-3 md:mx-0 md:px-0 bg-white/70 dark:bg-slate-900/20 backdrop-blur-xl shadow-lg transition-all duration-300">
             <div className="flex gap-2 overflow-x-auto no-scrollbar mask-linear-fade">
                {Object.keys(catConfig).map(key => {
                    const isActive = filter === key;
                    const conf = catConfig[key];
                    return (
                        <button 
                            key={key} 
                            onClick={() => setFilter(key)}
                            className={`
                                flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200
                                ${isActive 
                                    ? `bg-${conf.color}-500 text-white shadow-lg shadow-${conf.color}-500/25 scale-105` 
                                    : 'bg-[--bg-card] text-[--text-secondary] hover:bg-[--item-hover] hover:text-[--text-primary] border border-[--glass-border]'
                                }
                            `}
                        >
                            <span className={isActive ? 'text-white' : `text-${conf.color}-500`}>{conf.icon}</span>
                            <span>{conf.label}</span>
                        </button>
                    )
                })}
             </div>
        </div>

        {/* Resource Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.filter(r => r.cat !== 'PlanB').map((r, i) => {
                const conf = catConfig[r.cat] || catConfig['all'];
                return (
                    <div key={i} className={`group relative bg-[--bg-card] border border-[--glass-border] hover:border-${conf.color}-500/50 rounded-2xl overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-${conf.color}-900/10 flex flex-col`}>
                        
                        {/* Top Gradient Accent */}
                        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-${conf.color}-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity`}></div>

                        <div className="p-6 flex-1">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`w-10 h-10 rounded-xl bg-${conf.color}-500/10 text-${conf.color}-500 flex items-center justify-center border border-${conf.color}-500/20`}>
                                    {conf.icon}
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-[10px] font-bold text-[--text-secondary] uppercase tracking-wider">{r.cat}</span>
                                    <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-1.5 py-0.5 rounded border border-emerald-500/20 mt-1">Verified</span>
                                </div>
                            </div>

                            <h3 className="text-lg font-bold text-[--text-primary] mb-2 leading-snug group-hover:text-blue-500 transition-colors">
                                {r.title}
                            </h3>
                            
                            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[--glass-border]">
                                <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-600 dark:text-slate-300">
                                    {r.instructor.charAt(0)}
                                </span>
                                <span className="text-xs font-medium text-[--text-secondary]">{r.instructor}</span>
                            </div>
                        </div>

                        {/* Action Area */}
                        <div className="px-6 pb-6 pt-0">
                            <a 
                                href={r.url} 
                                target="_blank" 
                                rel="noreferrer" 
                                className={`flex items-center justify-between w-full py-3 px-4 rounded-xl text-sm font-bold bg-[--bg-deep] border border-[--glass-border] hover:bg-${conf.color}-500 hover:text-white hover:border-${conf.color}-500 transition-all group/btn`}
                            >
                                <span>ابدأ المشاهدة</span>
                                <svg className="w-4 h-4 transform group-hover/btn:translate-x-[-4px] transition-transform rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </a>
                        </div>
                    </div>
                );
            })}
        </div>
        
        {/* Empty State */}
        {filtered.length === 0 && (
            <div className="text-center py-20 opacity-50">
                <p className="text-4xl mb-4">🌪️</p>
                <p className="font-bold">لا توجد مصادر في هذا القسم حالياً</p>
            </div>
        )}

        {/* Plan B Special Card (Fixed for Both Light & Dark Modes) */}
        {(filter === 'all' || filter === 'PlanB') && (
            <div className="mt-12 group">
                 {/* Container: Transparent Gradient in Dark Mode to show grid */}
                <div className="relative p-1 rounded-2xl bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-slate-800/30 dark:via-slate-900/30 dark:to-slate-800/30 border border-blue-100 dark:border-slate-700/50 shadow-xl overflow-hidden backdrop-blur-sm">
                    
                    {/* Inner Content - Highly Transparent in Dark Mode */}
                    <div className="relative bg-white dark:bg-slate-900/20 backdrop-blur-xl rounded-xl p-8 flex flex-col md:flex-row items-center gap-8 text-center md:text-right">
                        
                        {/* Icon Circle */}
                        <div className="w-20 h-20 rounded-full bg-blue-50 dark:bg-slate-800/50 text-blue-500 dark:text-blue-400 flex items-center justify-center flex-shrink-0 shadow-inner border border-blue-100 dark:border-slate-600/50 group-hover:scale-110 transition-transform duration-300">
                           <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path></svg>
                        </div>
                        
                        <div className="flex-1">
                            {/* Text colors forced to Slate-900 for Light Mode, White for Dark */}
                            <h3 className="text-xl font-black text-slate-900 dark:text-slate-100 mb-2">مسارات مهنية بديلة (Alternative Career Paths)</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl font-medium">
                                مجال الهندسة المدنية واسع. إذا كنت تبحث عن بيئة عمل مكتبية أو تجارية، فهناك تخصصات إدارية وتحليلية مطلوبة بشدة.
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                            <div className="px-5 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 hover:border-blue-400 dark:hover:border-blue-500 transition-colors flex flex-col items-center min-w-[140px] shadow-sm">
                                 <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">المبيعات الهندسية</span>
                                 <strong className="text-slate-800 dark:text-slate-200">Sales Engineer</strong>
                            </div>
                            <div className="px-5 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 hover:border-blue-400 dark:hover:border-blue-500 transition-colors flex flex-col items-center min-w-[140px] shadow-sm">
                                 <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">حصر وتكاليف</span>
                                 <strong className="text-slate-800 dark:text-slate-200">QS Engineer</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}

    </section>
  );
};

export default Resources;
