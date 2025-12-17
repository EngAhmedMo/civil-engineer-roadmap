
import React from 'react';

const Mindset: React.FC = () => {
  return (
    <section className="space-y-10 animate-fade-in pt-20 md:pt-28 pb-20">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 px-2">
            <div>
                <h2 className="text-3xl font-black text-[--text-primary] tracking-tight mb-2">
                  عقلية المهندس <span className="text-cyan-500">.</span>
                </h2>
                <div className="flex items-start gap-3 bg-cyan-500/5 border border-cyan-500/10 p-4 rounded-xl max-w-2xl">
                    <span className="text-2xl">🧠</span>
                    <p className="text-[--text-secondary] text-sm leading-relaxed">
                        <strong className="text-[--text-primary] block mb-1">تنبيه هام:</strong> 
                        الهندسة ليست مجرد معادلات ولوحات. النجاح في الموقع يعتمد 80% على إدارتك للبشر، و20% على المعرفة التقنية.
                    </p>
                </div>
            </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Skill 1: Discipline */}
            <div className="glass-panel p-6 relative group hover:border-cyan-500/50 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-cyan-500/10 text-cyan-500 flex items-center justify-center">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-[--text-primary] group-hover:text-cyan-500 transition-colors">الإنتاجية والالتزام (Discipline)</h3>
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] bg-[--bg-deep] border border-[--glass-border] text-[--text-secondary] mt-1">
                            <span>📚</span>
                            <span>كتاب: العادات الذرية (Atomic Habits)</span>
                        </div>
                    </div>
                </div>

                <div className="bg-[--bg-deep] p-4 rounded-xl border-r-4 border-cyan-500 mb-5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-cyan-500/5"></div>
                    <p className="text-sm text-[--text-secondary] leading-relaxed relative z-10">
                        <strong className="text-cyan-500 block mb-1 text-xs uppercase tracking-wider">الربط الهندسي:</strong>
                        الالتزام بكتابة "التقارير اليومية" المملة، ومراجعة "قوائم الفحص" (Checklists) بدقة، هي عادات صغيرة تراكمية تصنع مهندس محترف.
                    </p>
                </div>

                <a href="https://www.youtube.com/results?search_query=%D9%85%D9%84%D8%AE%D8%B5+%D9%83%D8%AA%D8%A7%D8%A8+%D8%A7%D9%84%D8%B9%D8%A7%D8%AF%D8%A7%D8%AA+%D8%A7%D9%84%D8%B0%D8%B1%D9%8A%D8%A9+%D8%B9%D9%84%D9%8A+%D9%85%D8%AD%D9%85%D8%AF+%D8%B9%D9%84%D9%8A" target="_blank" rel="noreferrer" className="flex items-center justify-between w-full p-3 rounded-lg bg-[--bg-card] border border-[--glass-border] hover:bg-cyan-500 hover:text-white hover:border-cyan-500 transition-all text-xs font-bold group/btn">
                    <span>استماع للملخص</span>
                    <span className="transform group-hover/btn:-translate-x-1 transition-transform">←</span>
                </a>
            </div>

            {/* Skill 2: Leadership */}
            <div className="glass-panel p-6 relative group hover:border-cyan-500/50 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-cyan-500/10 text-cyan-500 flex items-center justify-center">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-[--text-primary] group-hover:text-cyan-500 transition-colors">القيادة وإدارة البشر (Leadership)</h3>
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] bg-[--bg-deep] border border-[--glass-border] text-[--text-secondary] mt-1">
                            <span>📚</span>
                            <span>كتاب: كيف تكسب الأصدقاء وتؤثر في الناس</span>
                        </div>
                    </div>
                </div>

                <div className="bg-[--bg-deep] p-4 rounded-xl border-r-4 border-cyan-500 mb-5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-cyan-500/5"></div>
                    <p className="text-sm text-[--text-secondary] leading-relaxed relative z-10">
                        <strong className="text-cyan-500 block mb-1 text-xs uppercase tracking-wider">الربط الهندسي:</strong>
                        فن التعامل مع الصنايعية والمقاولين. كيف توجه الملاحظات وتنتقد الأعمال الخاطئة دون أن تخلق عدواً، وتقنعهم بالإعادة برضا.
                    </p>
                </div>

                <a href="https://www.youtube.com/results?search_query=%D9%85%D9%84%D8%AE%D8%B5+%D9%83%D8%AA%D8%A7%D8%A8+%D9%83%D9%8A%D9%81+%D8%AA%D9%83%D8%B3%D8%A8+%D8%A7%D9%84%D8%A3%D8%B5%D8%AF%D9%82%D8%A7%D8%A1+%D9%88%D8%AA%D8%A4%D8%AB%D8%B1+%D9%81%D9%8A+%D8%A7%D9%84%D9%86%D8%A7%D8%B3+%D8%B9%D9%84%D9%8A+%D9%85%D8%AD%D9%85%D8%AF+%D8%B9%D9%84%D9%8A" target="_blank" rel="noreferrer" className="flex items-center justify-between w-full p-3 rounded-lg bg-[--bg-card] border border-[--glass-border] hover:bg-cyan-500 hover:text-white hover:border-cyan-500 transition-all text-xs font-bold group/btn">
                    <span>استماع للملخص</span>
                    <span className="transform group-hover/btn:-translate-x-1 transition-transform">←</span>
                </a>
            </div>

            {/* Skill 3: Resilience */}
            <div className="glass-panel p-6 relative group hover:border-cyan-500/50 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-cyan-500/10 text-cyan-500 flex items-center justify-center">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-[--text-primary] group-hover:text-cyan-500 transition-colors">إدارة الضغوط (Resilience)</h3>
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] bg-[--bg-deep] border border-[--glass-border] text-[--text-secondary] mt-1">
                            <span>📚</span>
                            <span>كتاب: دع القلق وابدأ الحياة</span>
                        </div>
                    </div>
                </div>

                <div className="bg-[--bg-deep] p-4 rounded-xl border-r-4 border-cyan-500 mb-5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-cyan-500/5"></div>
                    <p className="text-sm text-[--text-secondary] leading-relaxed relative z-10">
                        <strong className="text-cyan-500 block mb-1 text-xs uppercase tracking-wider">الربط الهندسي:</strong>
                        يوم "صب السقف" هو يوم حرب. هذا الكتاب سيعلمك الفصل بين "المشكلة الفنية" وبين "مشاعرك تجاهها"، لتتخذ قرارات سليمة تحت الضغط.
                    </p>
                </div>

                <a href="https://www.youtube.com/results?search_query=%D9%85%D9%84%D8%AE%D8%B5+%D9%83%D8%AA%D8%A7%D8%A8+%D8%AF%D8%B9+%D8%A7%D9%84%D9%82%D9%84%D9%82+%D9%88%D8%A7%D8%A8%D8%AF%D8%A3+%D8%A7%D9%84%D8%AD%D9%8A%D8%A7%D8%A9+%D8%B9%D9%84%D9%8A+%D9%85%D8%AD%D9%85%D8%AF+%D8%B9%D9%84%D9%8A" target="_blank" rel="noreferrer" className="flex items-center justify-between w-full p-3 rounded-lg bg-[--bg-card] border border-[--glass-border] hover:bg-cyan-500 hover:text-white hover:border-cyan-500 transition-all text-xs font-bold group/btn">
                    <span>استماع للملخص</span>
                    <span className="transform group-hover/btn:-translate-x-1 transition-transform">←</span>
                </a>
            </div>

            {/* Skill 4: Negotiation */}
            <div className="glass-panel p-6 relative group hover:border-cyan-500/50 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-cyan-500/10 text-cyan-500 flex items-center justify-center">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-[--text-primary] group-hover:text-cyan-500 transition-colors">فن التفاوض (Negotiation)</h3>
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] bg-[--bg-deep] border border-[--glass-border] text-[--text-secondary] mt-1">
                            <span>📚</span>
                            <span>كتاب: لا تساوم على الفرق أبداً</span>
                        </div>
                    </div>
                </div>

                <div className="bg-[--bg-deep] p-4 rounded-xl border-r-4 border-cyan-500 mb-5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-cyan-500/5"></div>
                    <p className="text-sm text-[--text-secondary] leading-relaxed relative z-10">
                        <strong className="text-cyan-500 block mb-1 text-xs uppercase tracking-wider">الربط الهندسي:</strong>
                        ستتفاوض يومياً: مع الاستشاري لاستلام بند معقد، ومع المقاولين على أسعار المصنعيات. تعلم كيف تحصل على ما تريد دون خسارة الطرف الآخر.
                    </p>
                </div>

                <a href="https://www.youtube.com/results?search_query=%D9%85%D9%84%D8%AE%D8%B5+%D9%83%D8%AA%D8%A7%D8%A8+%D9%84%D8%A7+%D8%AA%D8%B3%D8%A7%D9%88%D9%85+%D8%B9%D9%84%D9%89+%D8%A7%D9%84%D9%81%D8%B1%D9%82+%D8%A3%D8%A8%D8%AF%D8%A7%D9%8B+%D8%B9%D9%84%D9%8A+%D9%85%D8%AD%D9%85%D8%AF+%D8%B9%D9%84%D9%8A" target="_blank" rel="noreferrer" className="flex items-center justify-between w-full p-3 rounded-lg bg-[--bg-card] border border-[--glass-border] hover:bg-cyan-500 hover:text-white hover:border-cyan-500 transition-all text-xs font-bold group/btn">
                    <span>استماع للملخص</span>
                    <span className="transform group-hover/btn:-translate-x-1 transition-transform">←</span>
                </a>
            </div>

        </div>
    </section>
  );
};

export default Mindset;
