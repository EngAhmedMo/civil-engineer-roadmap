
import React from 'react';

const AIBIM: React.FC = () => {
  return (
    <section className="space-y-10 animate-fade-in pt-20 md:pt-28 pb-20">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 px-2">
            <div>
                <h2 className="text-3xl font-black text-[--text-primary] tracking-tight mb-2">
                  الدليل التشغيلي للذكاء الاصطناعي <span className="text-purple-500">.</span>
                </h2>
                <p className="text-[--text-secondary] text-base max-w-2xl leading-relaxed">
                    كيفية استخدام أدوات الذكاء الاصطناعي كمهندس لرفع الإنتاجية وجودة المخرجات.
                </p>
            </div>
            <div className="hidden md:flex items-center gap-2 bg-[--bg-card] border border-[--glass-border] px-3 py-1.5 rounded-xl">
                 <span className="relative flex h-2 w-2">
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                   <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                 </span>
                 <span className="text-xs font-bold text-[--text-secondary]">AI Powered</span>
            </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Tool 1: Google NotebookLM */}
            <div className="group relative glass-panel p-0 overflow-hidden flex flex-col h-full hover:-translate-y-1 transition-transform duration-300 border-t-4 border-emerald-500">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
                
                <div className="p-6 pb-0 flex-1 relative z-10">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-2xl border border-emerald-500/20">
                            ⚡
                        </div>
                        <span className="px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest bg-[--bg-deep] border border-[--glass-border] text-[--text-secondary]">
                            Research
                        </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-[--text-primary] mb-1">Google NotebookLM</h3>
                    <p className="text-sm font-medium text-emerald-500 mb-4">مساعد المذاكرة والبحث في الأكواد</p>
                    
                    <div className="bg-[--bg-deep] p-4 rounded-xl border border-[--glass-border] mb-4">
                         <strong className="text-[10px] font-black text-[--text-secondary] uppercase block mb-2 tracking-wider">خطوات الاستخدام:</strong>
                         <p className="text-sm text-[--text-primary] leading-relaxed">
                            ارفع ملفات الـ PDF (مثل الكود المصري) واسأل: <br/>
                            <span className="text-emerald-400 font-medium">"لخص لي اشتراطات استلام الأعمدة."</span>
                         </p>
                    </div>
                </div>
                
                <div className="p-4 mt-auto border-t border-[--glass-border] bg-[--bg-card]/50">
                    <a href="https://notebooklm.google.com/" target="_blank" rel="noreferrer" className="flex items-center justify-center w-full py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm transition-colors shadow-lg shadow-emerald-500/20">
                        فتح الأداة ↗
                    </a>
                </div>
            </div>

            {/* Tool 2: ChatGPT / Claude */}
            <div className="group relative glass-panel p-0 overflow-hidden flex flex-col h-full hover:-translate-y-1 transition-transform duration-300 border-t-4 border-blue-500">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
                
                <div className="p-6 pb-0 flex-1 relative z-10">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-2xl border border-blue-500/20">
                            🤖
                        </div>
                        <span className="px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest bg-[--bg-deep] border border-[--glass-border] text-[--text-secondary]">
                            Writing
                        </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-[--text-primary] mb-1">ChatGPT / Claude</h3>
                    <p className="text-sm font-medium text-blue-500 mb-4">كتابة الإيميلات والتقارير</p>
                    
                    <div className="bg-[--bg-deep] p-4 rounded-xl border border-[--glass-border] mb-4">
                         <strong className="text-[10px] font-black text-[--text-secondary] uppercase block mb-2 tracking-wider">نصيحة (Pro Prompt):</strong>
                         <p className="text-sm text-[--text-primary] leading-relaxed">
                            حدد الدور والمهمة: <br/>
                            <span className="text-blue-400 font-medium">"بصفتك مدير مشروع، اكتب رداً رسمياً للاستشاري بخصوص..."</span>
                         </p>
                    </div>
                </div>
                
                <div className="p-4 mt-auto border-t border-[--glass-border] bg-[--bg-card]/50 grid grid-cols-2 gap-3">
                    <a href="https://chatgpt.com/" target="_blank" rel="noreferrer" className="flex items-center justify-center py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-colors">
                        ChatGPT
                    </a>
                    <a href="https://claude.ai/" target="_blank" rel="noreferrer" className="flex items-center justify-center py-2.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm transition-colors">
                        Claude
                    </a>
                </div>
            </div>

            {/* Tool 3: Excel Formula Bot */}
            <div className="group relative glass-panel p-0 overflow-hidden flex flex-col h-full hover:-translate-y-1 transition-transform duration-300 border-t-4 border-yellow-500 lg:col-span-1 md:col-span-2 lg:col-start-auto">
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
                
                <div className="p-6 pb-0 flex-1 relative z-10">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center text-2xl border border-yellow-500/20">
                            📊
                        </div>
                        <span className="px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest bg-[--bg-deep] border border-[--glass-border] text-[--text-secondary]">
                            Data
                        </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-[--text-primary] mb-1">Excel Formula Bot</h3>
                    <p className="text-sm font-medium text-yellow-500 mb-4">داخل ChatGPT: تحويل الكلام لمعادلات</p>
                    
                    <div className="bg-[--bg-deep] p-4 rounded-xl border border-[--glass-border] mb-4">
                         <strong className="text-[10px] font-black text-[--text-secondary] uppercase block mb-2 tracking-wider">مثال (Prompt):</strong>
                         <p className="text-xs font-mono text-[--text-primary] leading-relaxed break-words" dir="ltr">
                            "Write an Excel formula to SUM Column C IF Column A is 'Concrete' AND Column B date is &gt; 01/01/2025."
                         </p>
                    </div>
                </div>
                
                <div className="p-4 mt-auto border-t border-[--glass-border] bg-[--bg-card]/50">
                    <button disabled className="flex items-center justify-center w-full py-2.5 rounded-lg bg-[--bg-deep] border border-[--glass-border] text-[--text-secondary] font-bold text-sm cursor-not-allowed opacity-70">
                        متاح داخل ChatGPT
                    </button>
                </div>
            </div>

        </div>
    </section>
  );
};

export default AIBIM;
