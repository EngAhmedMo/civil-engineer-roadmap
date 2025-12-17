
import { Resource, WeekSchedule } from './types';

export const resourcesData: Resource[] = [
  // Phase 1: Site Warrior
  { title: "تنفيذ الخرسانات (Concrete Skeleton)", instructor: "م. وليد الجنيدي", cat: "Site", url: "https://www.youtube.com/playlist?list=PLfVgc3qLn2xb0TIY0nc3hVPTjcX4BTAiT", cssClass: "border-emerald-500", btnClass: "text-emerald-500 border-emerald-500 hover:bg-emerald-500" },
  
  // Phase 2: Finishing Expert
  { title: "فنيات التشطيبات (Technical Finishing)", instructor: "م. محمد بدوي", cat: "Finishing", url: "https://www.youtube.com/playlist?list=PLm1b-B0cvpOdp81E30nnC3be_GXE0pj8s", cssClass: "border-amber-500", btnClass: "text-amber-500 border-amber-500 hover:bg-amber-500" },
  { title: "التشطيبات بالموقع (Site Finishing)", instructor: "منارة التنفيذ", cat: "Finishing", url: "https://www.youtube.com/playlist?list=PLYibZreE8qlJmESeLalkpwrERA-IKNfv5", cssClass: "border-amber-500", btnClass: "text-amber-500 border-amber-500 hover:bg-amber-500" },

  // Phase 3: Shop Drawing
  { title: "الرسومات التنفيذية (Shop Drawings)", instructor: "م. أحمد التريسي", cat: "Shop", url: "https://www.youtube.com/playlist?list=PLC8lXhy3op9PLXfgBC7URTA1zESby6UFp", cssClass: "border-blue-500", btnClass: "text-blue-500 border-blue-500 hover:bg-blue-500" },

  // Phase 4: Technical Office & Management
  { title: "المكتب الفني (Technical Office)", instructor: "م. أحمد حسن", cat: "Office", url: "https://www.youtube.com/playlist?list=PLabf5mJYBmPtfDvqma1zpdI5_6OMl2IH9", cssClass: "border-violet-500", btnClass: "text-violet-500 border-violet-500 hover:bg-violet-500" },
  
  // BIM & Revit
  { title: "أساسيات الريفيت (Revit Structure)", instructor: "م. كريم عادل", cat: "BIM", url: "https://www.youtube.com/playlist?list=PLDHUI0BRXyH9N22baH_GWyD3ZcWvlkont", cssClass: "border-pink-500", btnClass: "text-pink-500 border-pink-500 hover:bg-pink-500" },
  { title: "سيفيل 3D (Civil 3D - Infrastructure)", instructor: "م. هشام فوزي", cat: "BIM", url: "https://www.youtube.com/playlist?list=PLXrNKFa4BOOnl7QVBOAOU44SKWJ0TPKkJ", cssClass: "border-cyan-500", btnClass: "text-cyan-500 border-cyan-500 hover:bg-cyan-500" },
  
  // Steel Structure
  { title: "منشآت معدنية (Steel Structures)", instructor: "م. خالد محفوظ", cat: "Steel", url: "https://www.youtube.com/watch?v=wwqU7R1gbtA&list=PLBYb75NShzcV6URqtc0OeaRlBnC-vytUx", cssClass: "border-red-500", btnClass: "text-red-500 border-red-500 hover:bg-red-500" },

  // Plan B
  { title: "مبيعات هندسية (Sales Engineer)", instructor: "دليل إرشادي", cat: "PlanB", url: "#", cssClass: "border-gray-500", btnClass: "text-gray-400 border-gray-500 hover:bg-gray-600" },
  { title: "حصر وتكاليف (QS & Cost Control)", instructor: "دليل إرشادي", cat: "PlanB", url: "#", cssClass: "border-gray-500", btnClass: "text-gray-400 border-gray-500 hover:bg-gray-600" }
];

export const scheduleWeeks: WeekSchedule[] = [
  // --- PHASE 1: THE SITE WARRIOR (وحش الموقع) ---
  { 
    id: 1, 
    phase: "المرحلة 1: وحش الموقع",
    title: "أعمال الحفر والأساسات (Earthworks)", 
    source: "Eng. Walid El-Genedy",
    note: "🎯 المطلوب: شاهد فيديوهات م. وليد الجنيدي من رقم 1 (المقدمة) إلى رقم 10 (القواعد). تغطي: الجسات، الحفر، الخنزيرة، القواعد العادية والمسلحة.",
    days: [
      { name: "Day 1", tasks: ["استكشاف التربة والجسات (Soil Investigation)"] },
      { name: "Day 2", tasks: ["أعمال الحفر والإحلال (Excavation & Replacement)"] },
      { name: "Day 3", tasks: ["الخنزيرة وتوقيع المحاور (Setting Out & Axes)"] },
      { name: "Day 4", tasks: ["القواعد العادية والمسلحة (PC & RC Footings)"] }
    ],
    gateTest: {
      question: "حساب كميات (QS Challenge)",
      criteria: "المطلوب: احسب كمية الخرسانة لقاعدة (ق1) يدويًا وقارنها بشيت الإكسل (Manual vs Excel Volume Calc)."
    }
  },
  { 
    id: 2, 
    phase: "المرحلة 1: وحش الموقع",
    title: "تـنفيـذ الأعـمـدة (Columns Execution)", 
    source: "Eng. Walid El-Genedy",
    note: "🎯 المطلوب: شاهد فيديوهات م. وليد الجنيدي من رقم 11 إلى 15. تغطي: أشاير الأعمدة، النجارة، التقويات، الحدادة، والصب.",
    days: [
      { name: "Day 1", tasks: ["أشاير الأعمدة والكانات (Column Starters & Stirrups)"] },
      { name: "Day 2", tasks: ["نجارة الأعمدة والوزنات (Formwork & Plumbness)"] },
      { name: "Day 3", tasks: ["حدادة الأعمدة والتكثيف (Reinforcement & Densification)"] },
      { name: "Day 4", tasks: ["صب واستلام الأعمدة (Pouring & Inspection)"] }
    ],
    gateTest: {
      question: "قائمة الفحص (Inspection Checklist)",
      criteria: "المطلوب: اكتب قائمة فحص (Checklist) من 5 نقاط لاستلام نجارة العمود (الوزنات، التقويات، الحطط...)."
    }
  },
  { 
    id: 3, 
    phase: "المرحلة 1: وحش الموقع",
    title: "الأسقف والكمرات (Slabs & Beams)", 
    source: "Eng. Walid El-Genedy",
    note: "🎯 المطلوب: شاهد فيديوهات م. وليد الجنيدي من رقم 16 إلى 25. تغطي: السقف الكمري (Solid)، الفلات (Flat Slab)، والكمرات.",
    days: [
      { name: "Day 1", tasks: ["السقف الكمري (Solid Slab System)"] },
      { name: "Day 2", tasks: ["نجارة الفلات سلاب (Flat Slab Formwork)"] },
      { name: "Day 3", tasks: ["حدادة الفلات والرقة السفلية (Flat Slab Rebar)"] },
      { name: "Day 4", tasks: ["الكمرات الساقطة (Drop Beams)"] }
    ],
    gateTest: {
      question: "تفاصيل التسليح (Rebar Detailing)",
      criteria: "المطلوب: ارسم كروكي لتفريد حديد الشبكة العلوية الإضافي في الفلات سلاب (Sketch Top Additional Steel Layout)."
    }
  },
  { 
    id: 4, 
    phase: "المرحلة 1: وحش الموقع",
    title: "السلالم واختبارات الجودة (Stairs & QC)", 
    source: "Eng. Walid El-Genedy",
    note: "🎯 المطلوب: شاهد فيديوهات م. وليد الجنيدي من رقم 26 إلى 30. تغطي: نجارة وحدادة السلالم، واختبارات الخرسانة (Slump/Cubes).",
    days: [
      { name: "Day 1", tasks: ["نجارة السلالم (Stairs Formwork)"] },
      { name: "Day 2", tasks: ["حدادة السلالم والمقص (Stairs Reinforcement)"] },
      { name: "Day 3", tasks: ["اختبارات الخرسانة (Concrete Quality Tests)"] },
      { name: "Day 4", tasks: ["فواصل الصب والمعالجة (Construction Joints & Curing)"] }
    ],
    gateTest: {
      question: "ضبط الجودة (QC Criteria)",
      criteria: "المطلوب: حدد معايير رفض الخرسانة في اختبار الهبوط (Define Slump Test Rejection Criteria) بالأرقام."
    }
  },

  // --- PHASE 2: THE FINISHING EXPERT (خبير التشطيبات) ---
  { 
    id: 5, 
    phase: "المرحلة 2: خبير التشطيبات",
    title: "أعمال المباني (Masonry Works)", 
    source: "Mohamed Badawy + Manarat El-Tanfeez",
    note: "🎯 المطلوب: شاهد فيديوهات بند المباني (م. محمد بدوي 1-5) + مراجعة فيديوهات 'منارة التنفيذ' لطرق الاستلام العملي.",
    days: [
      { name: "Day 1", tasks: ["أنواع الطوب والمونة (Bricks & Mortar Types)"] },
      { name: "Day 2", tasks: ["أد المباني - المدماك الأول (Setting Out Course)"] },
      { name: "Day 3", tasks: ["استلام المباني - القدة والميزان (Masonry Inspection)"] },
      { name: "Day 4", tasks: ["العتب والتشحيط (Lintels & Wedging)"] }
    ],
    gateTest: {
      question: "استلام الرأسية (Verticality Check)",
      criteria: "المطلوب: اشرح خطوات استلام رأسية الحائط بميزان الخيط (Wall Plumbness Check Steps)."
    }
  },
  { 
    id: 6, 
    phase: "المرحلة 2: خبير التشطيبات",
    title: "العزل والسباكة (Insulation & Plumbing)", 
    source: "Mohamed Badawy + Manarat El-Tanfeez",
    note: "🎯 المطلوب: بند العزل (محمد بدوي) + بند السباكة (منارة التنفيذ). التركيز على: رقبة القزازة، اختبار المياه، وكبس المواسير.",
    days: [
      { name: "Day 1", tasks: ["عزل الرطوبة - نظري (Waterproofing Theory)"] },
      { name: "Day 2", tasks: ["تنفيذ العزل والوزرة (Bitumen & Fillet Application)"] },
      { name: "Day 3", tasks: ["تأسيس السباكة والشيرب (Plumbing Fixation & Level)"] },
      { name: "Day 4", tasks: ["اختبار كبس المواسير (Pressure Test)"] }
    ],
    gateTest: {
      question: "اختبار العزل (Leakage Test)",
      criteria: "المطلوب: ما هي المدة القياسية لاختبار عزل الحمامات؟ (Standard Duration for Leakage Test)."
    }
  },
  { 
    id: 7, 
    phase: "المرحلة 2: خبير التشطيبات",
    title: "أعمال البياض والمحارة (Plastering)", 
    source: "Manarat El-Tanfeez",
    note: "🎯 المطلوب: شاهد سلسلة استلام البياض (منارة التنفيذ). ركز على: الطرطشة، البؤج، الأوتار، واستلام التربيع.",
    days: [
      { name: "Day 1", tasks: ["الطرطشة العمومية (Spatter Dash Coat)"] },
      { name: "Day 2", tasks: ["تأكيس البؤج (Dots Alignment)"] },
      { name: "Day 3", tasks: ["الأوتار وشبك السلك (Screeds & Wire Mesh)"] },
      { name: "Day 4", tasks: ["استلام المحارة - القدة واللمبة (Plaster Inspection)"] }
    ],
    gateTest: {
      question: "تقرير رفض (Rejection Report)",
      criteria: "المطلوب: اكتب صيغة طلب رفض لأعمال طرطشة غير مطابقة (Write Plaster Rejection Request - IR)."
    }
  },
  { 
    id: 8, 
    phase: "المرحلة 2: خبير التشطيبات",
    title: "الأرضيات والدهانات (Flooring & Painting)", 
    source: "Badawy + Manarat", 
    note: "🎯 المطلوب: فيديوهات الأرضيات والدهانات (محمد بدوي). تعلم: بداية الغلاقة، السقية، ومراحل المعجون.",
    days: [
      { name: "Day 1", tasks: ["تخطيط السيراميك (Ceramic Layout)"] },
      { name: "Day 2", tasks: ["تركيب السيراميك والغلاقة (Tiling & Cuts)"] },
      { name: "Day 3", tasks: ["تأسيس الدهانات (Painting Preparation)"] },
      { name: "Day 4", tasks: ["المعجون والضهارة (Putty & Finish Coat)"] }
    ],
    gateTest: {
      question: "تخطيط (Layout Sketch)",
      criteria: "المطلوب: ارسم كروكي لمكان بداية السيراميك في غرفة (Sketch Room Tiling Start Point)."
    }
  },

  // --- PHASE 3: SHOP DRAWINGS - ASD (المكتب الفني) ---
  { 
    id: 9, 
    phase: "المرحلة 3: المكتب الفني (ASD)",
    title: "إعدادات البرنامج (ASD Setup & Basics)", 
    source: "Eng. Ahmed Tresy",
    note: "🎯 المطلوب: كورس ASD م. أحمد التريسي (فيديوهات 1-4). تثبيت البرنامج، واجهته، وضبط الكود المصري.",
    days: [
      { name: "Day 1", tasks: ["واجهة البرنامج (ASD Interface)"] },
      { name: "Day 2", tasks: ["ضبط الكود والإعدادات (Job Preferences & Codes)"] },
      { name: "Day 3", tasks: ["تعريف شكل السيخ (Rebar Shape Definition)"] },
      { name: "Day 4", tasks: ["أوامر التوزيع (Rebar Distribution)"] }
    ],
    gateTest: {
      question: "إعدادات (Configuration)",
      criteria: "المطلوب: ضبط إعدادات البرنامج لتوافق الكود المصري (Configure ASD for Egyptian Code - ECP)."
    }
  },
  { 
    id: 10, 
    phase: "المرحلة 3: المكتب الفني (ASD)",
    title: "تفريد الأساسات (Substructure Detailing)", 
    source: "Eng. Ahmed Tresy",
    note: "🎯 المطلوب: كورس ASD م. أحمد التريسي (فيديوهات 5-9). تفريد القواعد المنفصلة، المشتركة، والسملات.",
    days: [
      { name: "Day 1", tasks: ["القواعد المنفصلة (Isolated Footings)"] },
      { name: "Day 2", tasks: ["القواعد المشتركة (Combined Footings)"] },
      { name: "Day 3", tasks: ["الشدادات والسملات (Strap & Tie Beams)"] },
      { name: "Day 4", tasks: ["جداول التفريد والحصر (BBS Generation)"] }
    ],
    gateTest: {
      question: "لوحة تنفيذية (Shop Drawing)",
      criteria: "المطلوب: إخراج لوحة تفريد كاملة لقاعدة مشتركة (Produce Combined Footing Shop Drawing)."
    }
  },
  { 
    id: 11, 
    phase: "المرحلة 3: المكتب الفني (ASD)",
    title: "تفريد الهيكل العلوي (Superstructure Detailing)", 
    source: "Eng. Ahmed Tresy",
    note: "🎯 المطلوب: كورس ASD م. أحمد التريسي (فيديوهات 10-15). الأعمدة، الحوائط، والكمرات المستمرة.",
    days: [
      { name: "Day 1", tasks: ["أشاير وتفاصيل الأعمدة (Column Details & Starters)"] },
      { name: "Day 2", tasks: ["الحوائط الخرسانية (Shear Walls)"] },
      { name: "Day 3", tasks: ["الكمرات المستمرة (Continuous Beams)"] },
      { name: "Day 4", tasks: ["الطباعة والإخراج (Plotting & Layout)"] }
    ],
    gateTest: {
      question: "تفريد كمرة (Beam Detailing)",
      criteria: "المطلوب: تفريد حديد كمرة مستمرة 3 بحور (Detail a 3-Span Continuous Beam)."
    }
  },

  // --- PHASE 4: CAREER STRATEGIST (الاستراتيجية والمسار) ---
  { 
    id: 12, 
    phase: "المرحلة 4: الاستراتيجية والمسار",
    title: "المكتب الفني المالي (Financials)", 
    source: "Eng. Ahmed Hassan", 
    note: "🎯 المطلوب: كورس المكتب الفني م. أحمد حسن. التركيز على فيديوهات تحليل الأسعار والمستخلصات.",
    days: [
      { name: "Day 1", tasks: ["تحليل الأسعار (Unit Price Analysis)"] },
      { name: "Day 2", tasks: ["المستخلص الجاري (Interim Payment Certificate)"] },
      { name: "Day 3", tasks: ["مستخلصات مقاولي الباطن (Subcontractor Invoices)"] },
      { name: "Day 4", tasks: ["عقود المقاولات (Construction Contracts)"] }
    ],
    gateTest: {
      question: "تحليل سعر (Cost Analysis)",
      criteria: "المطلوب: قم بعمل تحليل سعر لمتر مكعب خرسانة مسلحة (Perform Unit Price Analysis for R.C. Concrete)."
    }
  },
  { 
    id: 13, 
    phase: "المرحلة 4: الاستراتيجية والمسار",
    title: "أساسيات الريفيت (Revit Structure Basics)", 
    source: "Eng. Karim Adel", 
    note: "🎯 المطلوب: كورس Revit Structure م. كريم عادل (فيديوهات 1-8). تعلم النمذجة الأساسية وحصر الكميات.",
    days: [
      { name: "Day 1", tasks: ["المحاور والمناسيب (Grids & Levels)"] },
      { name: "Day 2", tasks: ["نمذجة الأعمدة الإنشائية (Modeling Structural Columns)"] },
      { name: "Day 3", tasks: ["نمذجة الكمرات والبلاطات (Beams & Floors Modeling)"] },
      { name: "Day 4", tasks: ["جداول الحصر والكميات (Schedules & Quantities)"] }
    ],
    gateTest: {
      question: "نمذجة 3D (Modeling)",
      criteria: "المطلوب: عمل موديل 3D بسيط لمبنى خرساني دور واحد (Model a simple 1-story Concrete Structure)."
    }
  },
  { 
    id: 14, 
    phase: "المرحلة 4: الاستراتيجية والمسار",
    title: "التخصص: بنية تحتية أو ستيل (Specialization)", 
    source: "Hisham Fawzy (Infra) / Khaled Mahfouz (Steel)",
    note: "🎯 المطلوب: اختر مسار واحد (Infra أو Steel). شاهد مقدمة المجال والبرامج المستخدمة (Civil3D أو Tekla).",
    days: [
      { name: "Day 1", tasks: ["Civil 3D: استيراد النقاط (Import Points)"] },
      { name: "Day 2", tasks: ["Civil 3D: إنشاء الأسطح (Creating Surfaces)"] },
      { name: "Day 3", tasks: ["Steel: مكونات المنشأ المعدني (Steel Components)"] },
      { name: "Day 4", tasks: ["Steel: خطوات التركيب (Erection Sequence)"] }
    ],
    gateTest: {
      question: "مشروع التخرج (Final Gate)",
      criteria: "المطلوب: إنشاء سيرة ذاتية موجهة (Targeted CV) + اجتياز محاكاة المقابلة (Pass Mock Interview)."
    }
  }
];
