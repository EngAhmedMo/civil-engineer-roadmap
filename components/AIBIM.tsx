import React from 'react';

const AIBIM: React.FC = () => {
  return (
    <section className="space-y-8 animate-fade-in">
        <div className="glass-panel p-8 rounded-xl border-l-4 border-purple-500">
            <h2 className="text-2xl font-bold text-[--text-primary] mb-2">الدليل التشغيلي للذكاء الاصطناعي <span className="text-violet-400">(AI Operations Manual)</span></h2>
            <p className="text-[--text-secondary] text-sm leading-relaxed">
                كيفية استخدام أدوات الذكاء الاصطناعي كمهندس لرفع الإنتاجية وجودة المخرجات.
            </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
            <div className="glass-panel p-6 rounded-xl border-t-4 border-green-500">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-[--text-primary]">1. Google NotebookLM ⚡</h3>
                    <a href="https://notebooklm.google.com/" target="_blank" rel="noreferrer" className="text-xs bg-green-500/10 border border-green-500/50 px-3 py-1 rounded text-green-500 hover:bg-green-500 hover:text-white transition">فتح الأداة</a>
                </div>
                <p className="text-sm text-[--text-secondary] mb-4 font-bold">الوظيفة: "مساعد المذاكرة والبحث في الأكواد".</p>
                <div className="bg-gray-500/10 p-3 rounded border border-gray-500/20 space-y-2">
                    <strong className="text-green-500 text-xs block">خطوات الاستخدام:</strong>
                    <p className="text-xs text-[--text-secondary]">ارفع ملفات الـ PDF (مثل الكود المصري) واسأل: <br/><span className="text-[--text-primary]">"لخص لي اشتراطات استلام الأعمدة."</span></p>
                </div>
            </div>

            <div className="glass-panel p-6 rounded-xl border-t-4 border-blue-500">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-[--text-primary]">2. ChatGPT / Claude 🤖</h3>
                    <div className="flex gap-2">
                        <a href="https://chatgpt.com/" target="_blank" rel="noreferrer" className="text-xs bg-blue-500/10 border border-blue-500/50 px-3 py-1 rounded text-blue-500 hover:bg-blue-500 hover:text-white transition">ChatGPT</a>
                        <a href="https://claude.ai/" target="_blank" rel="noreferrer" className="text-xs bg-orange-500/10 border border-orange-500/50 px-3 py-1 rounded text-orange-500 hover:bg-orange-500 hover:text-white transition">Claude</a>
                    </div>
                </div>
                <p className="text-sm text-[--text-secondary] mb-4 font-bold">الوظيفة: "كتابة الإيميلات والتقارير".</p>
                <div className="bg-gray-500/10 p-3 rounded border border-gray-500/20 space-y-2">
                    <strong className="text-blue-500 text-xs block">نصيحة (Pro Prompt):</strong>
                    <p className="text-xs text-[--text-secondary]">حدد الدور والمهمة: "بصفتك مدير مشروع، اكتب رداً رسمياً للاستشاري بخصوص..."</p>
                </div>
            </div>

            <div className="glass-panel p-6 rounded-xl border-t-4 border-yellow-500 col-span-1 lg:col-span-2">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-[--text-primary]">3. Excel Formula Bot 📊</h3>
                    <span className="text-xs text-yellow-500 border border-yellow-500/30 px-2 py-1 rounded">داخل ChatGPT</span>
                </div>
                <p className="text-sm text-[--text-secondary] mb-4 leading-relaxed">
                    استخدم ChatGPT لتحويل طلبك إلى معادلة Excel.
                </p>
                <div className="bg-gray-500/10 p-3 rounded border border-gray-500/20">
                    <strong className="text-yellow-500 text-xs block mb-2">مثال (Prompt):</strong>
                    <p className="text-xs text-[--text-secondary] font-mono">
                        "Write an Excel formula to SUM Column C IF Column A is 'Concrete' AND Column B date is &gt; 01/01/2025."
                    </p>
                </div>
            </div>
        </div>
    </section>
  );
};

export default AIBIM;