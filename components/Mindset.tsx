import React from 'react';

const Mindset: React.FC = () => {
  return (
    <section className="space-y-8 animate-fade-in">
        <div className="glass-panel p-8 rounded-xl border-l-4 border-cyan-500">
            <h2 className="text-2xl font-bold text-[--text-primary] mb-3">عقلية المهندس <span className="text-cyan-500">(Soft Skills Deep Dive)</span></h2>
            <p className="text-[--text-secondary] text-sm leading-relaxed max-w-3xl">
                <strong className="text-[--text-primary]">تنبيه هام:</strong> الهندسة ليست مجرد معادلات ولوحات. النجاح في الموقع يعتمد 80% على إدارتك للبشر، و20% على التقنيات.
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-panel p-6 rounded-xl border border-gray-700/30 hover:border-cyan-500 transition group">
                <h3 className="text-lg font-bold text-[--text-primary] group-hover:text-cyan-500 transition mb-2">الإنتاجية والالتزام (Discipline)</h3>
                <p className="text-xs text-[--text-secondary] mb-3 font-mono">كتاب: العادات الذرية (Atomic Habits)</p>
                <div className="bg-gray-500/10 p-3 rounded border-l-2 border-cyan-500/50 mb-3">
                    <p className="text-xs text-[--text-secondary] leading-relaxed">
                        <strong className="text-cyan-500 block mb-1">الربط الهندسي:</strong>
                        الالتزام بكتابة "التقارير اليومية" المملة، ومراجعة "Checklists" السلامة، هي عادات صغيرة تراكمية.
                    </p>
                </div>
                <a href="https://www.youtube.com/results?search_query=%D9%85%D9%84%D8%AE%D8%B5+%D9%83%D8%AA%D8%A7%D8%A8+%D8%A7%D9%84%D8%B9%D8%A7%D8%AF%D8%A7%D8%AA+%D8%A7%D9%84%D8%B0%D8%B1%D9%8A%D8%A9+%D8%B9%D9%84%D9%8A+%D9%85%D8%AD%D9%85%D8%AF+%D8%B9%D9%84%D9%8A" target="_blank" rel="noreferrer" className="text-cyan-500 text-xs font-bold hover:underline">استماع للملخص &rarr;</a>
            </div>

            <div className="glass-panel p-6 rounded-xl border border-gray-700/30 hover:border-cyan-500 transition group">
                <h3 className="text-lg font-bold text-[--text-primary] group-hover:text-cyan-500 transition mb-2">القيادة وإدارة البشر (Leadership)</h3>
                <p className="text-xs text-[--text-secondary] mb-3 font-mono">كتاب: كيف تكسب الأصدقاء وتؤثر في الناس (How to Win Friends)</p>
                <div className="bg-gray-500/10 p-3 rounded border-l-2 border-cyan-500/50 mb-3">
                    <p className="text-xs text-[--text-secondary] leading-relaxed">
                        <strong className="text-cyan-500 block mb-1">الربط الهندسي:</strong>
                        فن التعامل مع الصنايعية. كيف توجه الملاحظات وإقناعهم بتنفيذها برضا.
                    </p>
                </div>
                <a href="https://www.youtube.com/results?search_query=%D9%85%D9%84%D8%AE%D8%B5+%D9%83%D8%AA%D8%A7%D8%A8+%D9%83%D9%8A%D9%81+%D8%AA%D9%83%D8%B3%D8%A8+%D8%A7%D9%84%D8%A3%D8%B5%D8%AF%D9%82%D8%A7%D8%A1+%D9%88%D8%AA%D8%A4%D8%AB%D8%B1+%D9%81%D9%8A+%D8%A7%D9%84%D9%86%D8%A7%D8%B3+%D8%B9%D9%84%D9%8A+%D9%85%D8%AD%D9%85%D8%AF+%D8%B9%D9%84%D9%8A" target="_blank" rel="noreferrer" className="text-cyan-500 text-xs font-bold hover:underline">استماع للملخص &rarr;</a>
            </div>
            
             <div className="glass-panel p-6 rounded-xl border border-gray-700/30 hover:border-cyan-500 transition group">
                    <h3 className="text-lg font-bold text-[--text-primary] group-hover:text-cyan-500 transition mb-2">إدارة الضغوط (Resilience)</h3>
                    <p className="text-xs text-[--text-secondary] mb-3 font-mono">كتاب: دع القلق وابدأ الحياة (Stop Worrying)</p>
                    <div className="bg-gray-500/10 p-3 rounded border-l-2 border-cyan-500/50 mb-3">
                        <p className="text-xs text-[--text-secondary] leading-relaxed">
                            <strong className="text-cyan-500 block mb-1">الربط الهندسي:</strong>
                            يوم "صب السقف" هو يوم حرب. الكتاب يعلمك الفصل بين "المشكلة" و"قلقك منها".
                        </p>
                    </div>
                    <a href="https://www.youtube.com/results?search_query=%D9%85%D9%84%D8%AE%D8%B5+%D9%83%D8%AA%D8%A7%D8%A8+%D8%AF%D8%B9+%D8%A7%D9%84%D9%82%D9%84%D9%82+%D9%88%D8%A7%D8%A8%D8%AF%D8%A3+%D8%A7%D9%84%D8%AD%D9%8A%D8%A7%D8%A9+%D8%B9%D9%84%D9%8A+%D9%85%D8%AD%D9%85%D8%AF+%D8%B9%D9%84%D9%8A" target="_blank" className="text-cyan-500 text-xs font-bold hover:underline">استماع للملخص &rarr;</a>
            </div>

            <div className="glass-panel p-6 rounded-xl border border-gray-700/30 hover:border-cyan-500 transition group">
                <h3 className="text-lg font-bold text-[--text-primary] group-hover:text-cyan-500 transition mb-2">فن التفاوض (Negotiation)</h3>
                <p className="text-xs text-[--text-secondary] mb-3 font-mono">كتاب: لا تساوم على الفرق أبداً (Never Split the Difference)</p>
                <div className="bg-gray-500/10 p-3 rounded border-l-2 border-cyan-500/50 mb-3">
                    <p className="text-xs text-[--text-secondary] leading-relaxed">
                        <strong className="text-cyan-500 block mb-1">الربط الهندسي:</strong>
                        ستتفاوض يومياً: مع الاستشاري لاستلام بند، ومع المقاولين على الأسعار.
                    </p>
                </div>
                <a href="https://www.youtube.com/results?search_query=%D9%85%D9%84%D8%AE%D8%B5+%D9%83%D8%AA%D8%A7%D8%A8+%D9%84%D8%A7+%D8%AA%D8%B3%D8%A7%D9%88%D9%85+%D8%B9%D9%84%D9%89+%D8%A7%D9%84%D9%81%D8%B1%D9%82+%D8%A3%D8%A8%D8%AF%D8%A7%D9%8B+%D8%B9%D9%84%D9%8A+%D9%85%D8%AD%D9%85%D8%AF+%D8%B9%D9%84%D9%8A" target="_blank" className="text-cyan-500 text-xs font-bold hover:underline">استماع للملخص &rarr;</a>
            </div>
        </div>
    </section>
  );
};

export default Mindset;