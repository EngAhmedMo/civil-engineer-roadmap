import React, { useState } from 'react';
import { resourcesData } from '../constants';

const Resources: React.FC = () => {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? resourcesData : resourcesData.filter(r => r.cat === filter);

  const cats = [
      { id: 'all', label: 'الكل' },
      { id: 'Site', label: 'تنفيذ (Site)' },
      { id: 'Shop', label: 'شوب دروينج' },
      { id: 'Finishing', label: 'تشطيبات' },
      { id: 'Office', label: 'مكتب فني' },
      { id: 'BIM', label: 'BIM & Revit' },
  ];

  return (
    <section className="space-y-8 animate-fade-in">
        <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[--text-primary] mb-3">القائمة الذهبية <span className="text-amber-500 text-sm block md:inline md:text-xl">(Verified Assets)</span></h2>
            <p className="text-[--text-secondary] text-sm max-w-2xl mx-auto glass-panel p-3 rounded-lg">
                المصادر أدناه تم اختيارها لتكون "المرجع النهائي" (Zero-to-Hero). تغطي الجانب العملي والكود المصري.
            </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
            {cats.map(c => (
                <button 
                    key={c.id} 
                    onClick={() => setFilter(c.id)}
                    className={`px-4 py-1.5 rounded-lg border font-bold text-sm transition-all ${filter === c.id ? 'bg-[--accent-shop] text-white border-[--accent-shop]' : 'bg-[--glass-border] text-[--text-secondary] border-[--text-secondary] hover:bg-[--accent-shop] hover:text-white'}`}
                >
                    {c.label}
                </button>
            ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((r, i) => (
                <div key={i} className={`glass-panel p-5 rounded-xl border-r-4 ${r.cssClass} transition-all hover:scale-[1.01]`}>
                    <div className="flex justify-between mb-3">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[--text-secondary] opacity-80 px-2 py-1 rounded border border-gray-500/20">{r.cat}</span>
                        <div className="flex gap-1 items-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                            <span className="text-[10px] text-green-500 font-bold">Verified</span>
                        </div>
                    </div>
                    <h3 className="text-base font-bold text-[--text-primary] mb-1 leading-snug">{r.title}</h3>
                    <p className="text-xs text-[--text-secondary] mb-4 font-mono">Instructor: {r.instructor}</p>
                    <a href={r.url} target="_blank" rel="noreferrer" className={`block w-full text-center py-2 border rounded transition-all text-xs font-bold ${r.btnClass}`}>
                        الذهاب للمصدر ↗
                    </a>
                </div>
            ))}
        </div>
    </section>
  );
};

export default Resources;