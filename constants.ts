import { Resource, WeekSchedule } from './types';

export const resourcesData: Resource[] = [
  { title: "تنفيذ الخرسانات (Concrete)", instructor: "م. وليد الجنيدي", cat: "Site", url: "https://www.youtube.com/playlist?list=PLfVgc3qLn2xb0TIY0nc3hVPTjcX4BTAiT", cssClass: "border-emerald-500", btnClass: "text-emerald-500 border-emerald-500 hover:bg-emerald-500" },
  { title: "إعداد الشوب دروينج (Setup)", instructor: "م. كريم عادل", cat: "Shop", url: "https://www.youtube.com/playlist?list=PLDHUI0BRXyH_cZcipUw1E0Mi0OkjBl4pO", cssClass: "border-blue-500", btnClass: "text-blue-500 border-blue-500 hover:bg-blue-500" },
  { title: "تفاصيل التسليح (Detailing)", instructor: "م. أحمد التريسي", cat: "Shop", url: "https://www.youtube.com/playlist?list=PLC8lXhy3op9PLXfgBC7URTA1zESby6UFp", cssClass: "border-blue-500", btnClass: "text-blue-500 border-blue-500 hover:bg-blue-500" },
  { title: "التشطيبات المعمارية (موقعي)", instructor: "منارة التنفيذ", cat: "Finishing", url: "https://www.youtube.com/playlist?list=PLYibZreE8qlJmESeLalkpwrERA-IKNfv5", cssClass: "border-amber-500", btnClass: "text-amber-500 border-amber-500 hover:bg-amber-500" },
  { title: "فنيات التشطيبات (فني)", instructor: "م. محمد بدوي", cat: "Finishing", url: "https://www.youtube.com/playlist?list=PLm1b-B0cvpOdp81E30nnC3be_GXE0pj8s", cssClass: "border-amber-500", btnClass: "text-amber-500 border-amber-500 hover:bg-amber-500" },
  { title: "المكتب الفني (Technical Office)", instructor: "م. أحمد حسن", cat: "Office", url: "https://www.youtube.com/playlist?list=PLabf5mJYBmPtfDvqma1zpdI5_6OMl2IH9", cssClass: "border-violet-500", btnClass: "text-violet-500 border-violet-500 hover:bg-violet-500" },
  { title: "Revit Structure Essentials", instructor: "م. كريم عادل", cat: "BIM", url: "https://www.youtube.com/playlist?list=PLDHUI0BRXyH9N22baH_GWyD3ZcWvlkont", cssClass: "border-pink-500", btnClass: "text-pink-500 border-pink-500 hover:bg-pink-500" }
];

export const scheduleWeeks: WeekSchedule[] = [
  { id: 1, title: "أسبوع 1: الأعمال الترابية والأساسات", source: "وليد الجنيدي (قائمة الخرسانات)", days: [
      { name: "الأحد", tasks: ["أعمال الحفر والإحلال (Excavation & Replacement)", "قراءة بند الحفر في الكود"] },
      { name: "الاثنين", tasks: ["الخرسانة العادية (PC Footings)", "استلام الخنزيرة (Setting out / Axes)"] },
      { name: "الثلاثاء", tasks: ["القواعد المسلحة (RC Footings)", "تفاصيل التسليح (Rft Detailing)"] },
      { name: "الأربعاء", tasks: ["استلام القواعد (Inspection Request)", "مراجعة الـ Checklist"] }
  ]},
  { id: 2, title: "أسبوع 2: الأعمدة (Columns)", source: "وليد الجنيدي", days: [
      { name: "الأحد", tasks: ["نجارة الأعمدة (Column Formwork)", "التقوية والتجاليد (Bracing & Sheathing)"] },
      { name: "الاثنين", tasks: ["حدادة الأعمدة (Reinforcement)", "إشاير الأعمدة (Starter Bars)"] },
      { name: "الثلاثاء", tasks: ["استلام الأعمدة (Inspection)", "وزنات الرأسية (Plumbness Check)"] },
      { name: "الأربعاء", tasks: ["صب الأعمدة (Casting)", "المعالجة وفك الشدات (Curing & Stripping)"] }
  ]},
  { id: 3, title: "أسبوع 3: الأسقف (Slabs)", source: "وليد الجنيدي", days: [
      { name: "الأحد", tasks: ["الأسقف الكمرية (Solid Slabs)", "نجارة الكمرات (Beam Formwork)"] },
      { name: "الاثنين", tasks: ["الأسقف اللاكمرية (Flat Slabs)", "شبكات الحديد (Mesh Reinforcement)"] },
      { name: "الثلاثاء", tasks: ["الحديد الإضافي (Add. Rft)", "الكراسي والأوتار (Chairs & Supporters)"] },
      { name: "الأربعاء", tasks: ["استلام السقف (Slab Inspection)", "الشيرب والمناسيب (Level Benchmarks)"] }
  ]},
  { id: 4, title: "أسبوع 4: السلالم وضبط الجودة", source: "وليد الجنيدي", days: [
      { name: "الأحد", tasks: ["نجارة وحدادة السلالم (Staircase)", "رسم قطاع السلم (Section)"] },
      { name: "الاثنين", tasks: ["اختبار الهبوط (Slump Test)", "محضر الاستلام (Inspection Report)"] },
      { name: "الثلاثاء", tasks: ["مكعبات الكسر (Concrete Cubes)", "إجهاد الكسر (Crushing Strength)"] },
      { name: "الأربعاء", tasks: ["مراجعة الهيكل (Skeleton Review)", "اختبار ذاتي"] }
  ]},
  { id: 5, title: "أسبوع 5: أعمال المباني (Masonry)", source: "محمد بدوي + منارة التنفيذ", days: [
      { name: "الأحد", tasks: ["أنواع الطوب (Brick Types)", "طرق الربط (Bonding Styles)"] },
      { name: "الاثنين", tasks: ["التشحيط والعراميس (Pinning & Joints)", "حساب الكميات"] },
      { name: "الثلاثاء", tasks: ["استلام المباني (Inspection)", "السواعى والقدة (Verticality & Straightness)"] },
      { name: "الأربعاء", tasks: ["الأعتاب والفتحات (Lintels & Openings)", "الخلوصات (Tolerances)"] }
  ]},
  { id: 6, title: "أسبوع 6: العزل والسباكة", source: "محمد بدوي + منارة التنفيذ", days: [
      { name: "الأحد", tasks: ["عزل الرطوبة (Damp Proofing)", "رقبة الزجاجة (Angle Fillet)"] },
      { name: "الاثنين", tasks: ["اختبار الغمر (Ponding Test)", "طبقة الحماية (Protective Screed)"] },
      { name: "الثلاثاء", tasks: ["تأسيس السباكة (Plumbing 1st Fix)", "مواسير التغذية (Supply Pipes)"] },
      { name: "الأربعاء", tasks: ["كبس المواسير (Pressure Test)", "صرف التكييف (AC Drainage)"] }
  ]},
  { id: 7, title: "أسبوع 7: البياض والكهرباء", source: "منارة التنفيذ", days: [
      { name: "الأحد", tasks: ["الطرطشة (Spatter Dash)", "البؤج والأوتار (Dots & Screeds)"] },
      { name: "الاثنين", tasks: ["ملء البياض (Plastering)", "شبك التمدد (Wire Mesh)"] },
      { name: "الثلاثاء", tasks: ["خراطيم الكهرباء (Conduits)", "علب المفاتيح (Back Boxes)"] },
      { name: "الأربعاء", tasks: ["سحب الأسلاك (Wire Pulling)", "لوحات التوزيع"] }
  ]},
  { id: 8, title: "أسبوع 8: الأرضيات والدهانات", source: "منارة التنفيذ", days: [
      { name: "الأحد", tasks: ["السيراميك (Ceramic Tiles)", "ضبط المنسوب (Leveling)"] },
      { name: "الاثنين", tasks: ["المعجون (Putty)", "الدهانات (Painting Layers)"] },
      { name: "الثلاثاء", tasks: ["التشطيب النهائي (Finishing Coat)", "النجارة المعمارية (Joinery)"] },
      { name: "الأربعاء", tasks: ["التسليم الابتدائي (Initial Handover)", "قائمة الملاحظات (Snag List)"] }
  ]},
  { id: 9, title: "أسبوع 9: أساسيات الشوب دروينج", source: "كريم عادل + أحمد التريسي", days: [
      { name: "الأحد", tasks: ["واجهة البرنامج (Interface)", "ضبط الوحدات (Units Setup)"] },
      { name: "الاثنين", tasks: ["رسم الأسياخ (Bar Shapes)", "تفريد الكانات (Stirrups)"] },
      { name: "الثلاثاء", tasks: ["طول الرباط (Development Length)", "طول الوصلة (Lap Length)"] },
      { name: "الأربعاء", tasks: ["تجهيز اللوحات (Sheet Layout)", "الطباعة (Plotting)"] }
  ]},
  { id: 10, title: "أسبوع 10: تفريد العناصر 1", source: "أحمد التريسي", days: [
      { name: "الأحد", tasks: ["القواعد المنفصلة (Footing Detailing)", "السيخ المكسح"] },
      { name: "الاثنين", tasks: ["السملات (Ground Beams)", "رقاب الأعمدة (Column Necks)"] },
      { name: "الثلاثاء", tasks: ["تفريد الأعمدة (Column Detailing)", "تكثيف الكانات (Stirrup Zones)"] },
      { name: "الأربعاء", tasks: ["جدول التفريد (BBS)", "إخراج لوحة كاملة"] }
  ]},
  { id: 11, title: "أسبوع 11: تفريد العناصر 2", source: "أحمد التريسي", days: [
      { name: "الأحد", tasks: ["الكمرات المستمرة (Continuous Beams)", "أماكن الوقف (Cut-off Points)"] },
      { name: "الاثنين", tasks: ["البلاطات المصمتة (Solid Slab)", "الفرش والغطاء (Main/Sec Rft)"] },
      { name: "الثلاثاء", tasks: ["البلاطات المسطحة (Flat Slab)", "الحديد الإضافي (Add. Rft)"] },
      { name: "الأربعاء", tasks: ["مشروع نهائي (Final Project)", "تصدير PDF"] }
  ]},
  { id: 12, title: "أسبوع 12: المكتب الفني", source: "أحمد حسن", days: [
      { name: "الأحد", tasks: ["المقايسة (BOQ)", "التسعير (Pricing)"] },
      { name: "الاثنين", tasks: ["تحليل الأسعار (Rate Analysis)", "بند الخرسانة"] },
      { name: "الثلاثاء", tasks: ["المستخلصات (Interim Payments)", "الخصومات (Deductions)"] },
      { name: "الأربعاء", tasks: ["البرنامج الزمني (Time Schedule)", "العقود (Contracts Intro)"] }
  ]},
  { id: 13, title: "أسبوع 13: أساسيات الريفيت 1", source: "كريم عادل", days: [
      { name: "الأحد", tasks: ["المحاور والمناسيب (Grids & Levels)", "واجهة المستخدم"] },
      { name: "الاثنين", tasks: ["نمذجة الأعمدة (Structural Columns)", "تعريف القطاعات"] },
      { name: "الثلاثاء", tasks: ["نمذجة الأساسات (Structural Foundations)", "الربط (Constraints)"] },
      { name: "الأربعاء", tasks: ["أوامر التعديل (Modify Tools)", "تطبيق عملي"] }
  ]},
  { id: 14, title: "أسبوع 14: أساسيات الريفيت 2", source: "كريم عادل", days: [
      { name: "الأحد", tasks: ["البلاطات والكمرات (Slabs & Framing)", "الفتحات (Shafts)"] },
      { name: "الاثنين", tasks: ["التسليح (Rebar Modeling)", "توزيع الكانات"] },
      { name: "الثلاثاء", tasks: ["جداول الحصر (Schedules/Quantities)", "فلترة الجداول"] },
      { name: "الأربعاء", tasks: ["إخراج اللوحات (Sheets)", "النهاية (Completion)"] }
  ]}
];