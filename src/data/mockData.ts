export interface MCQ {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface Formula {
  title: string;
  expression: string;
  explanation: string;
}

export interface Vocabulary {
  word: string;
  translation: string;
  explanation: string;
}

export interface ImportantQuestion {
  question: string;
  answer: string;
}

export interface FileItem {
  name: string;
  type: "شرح" | "مراجعة" | "امتحان" | "هيكل";
  path: string;
  views: number;
  dateAdded: string;
}

export interface Lesson {
  id: string;
  title: string;
  videoIds: string[]; // YouTube IDs
  summary: string;
  pdfFile?: FileItem;
  extraFiles?: FileItem[];
  formulas?: Formula[];
  vocabulary?: Vocabulary[];
  mcq: MCQ[];
  importantQuestions: ImportantQuestion[];
}

export interface Chapter {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Subject {
  id: string;
  name: string;
  emoji: string;
  color: string; // Tailwind class prefix, e.g. "emerald", "blue", "amber"
  chapters: Chapter[];
  generalFiles?: FileItem[];
}

export const SUBJECTS: Subject[] = [
  {
    id: "math",
    name: "الرياضيات",
    emoji: "📐",
    color: "emerald",
    generalFiles: [
      { name: "هيكل الرياضيات 11 متقدم EOT3", type: "هيكل", path: "هيكل_الرياضيات_لصف_الحادي_عشر_متقدم_رفيل_فصل_الثال_260519_205502.pdf", views: 2450, dateAdded: "2026-05-18" },
      { name: "امتحان سابق 11 متقدم", type: "امتحان", path: "امتحان سابق 11 متقدم.pdf", views: 982, dateAdded: "2026-05-20" },
      { name: "امتحان سابق الفصل 3", type: "امتحان", path: "امتحان سابق الفصل 3.pdf", views: 1104, dateAdded: "2026-05-21" },
      { name: "تجميعة الاختبارات الوزارية السابقة", type: "مراجعة", path: "ماث امتحان سابق.pdf", views: 765, dateAdded: "2026-05-22" },
      { name: "EOT G11 ADV", type: "امتحان", path: "EOT G11 ADV.pdf", views: 549, dateAdded: "2026-05-23" },
      { name: "مراجعة وورد", type: "مراجعة", path: "G11 EOT T3 WORD FILE 2026.docx", views: 320, dateAdded: "2026-05-24" }
    ],
    chapters: [
      {
        id: "ch7",
        title: "Chapter 7 — Vectors (المتجهات)",
        lessons: [
          {
            id: "7.1",
            title: "7.1 Vectors in Coordinate Plane",
            videoIds: ["qu7g3R6tLOE", "NTDNrlzz7YM", "Gx5TGANIhHM"],
            pdfFile: { name: "7.1 Introduction to vectors", type: "شرح", path: "7.1 Introduction to vectors مقدمة في المتجهات.pdf", views: 654, dateAdded: "2026-05-10" },
            summary: "في هذا الدرس، نتعرف على المتجه ككمية متجهة.",
            mcq: [{ question: "Vector?", options: ["Yes", "No"], answerIndex: 0, explanation: "Vector has direction" }],
            importantQuestions: []
          },
          {
            id: "7.2",
            title: "7.2 Vectors in the coordinate plane",
            videoIds: ["fUs8WmmWvVI"],
            pdfFile: { name: "7.2 Vectors in the coordinate plane", type: "شرح", path: "7_2_Vectors_in_the_coordinate_plane_المتجهات_في_المستوى_الإحداثي (2).pdf", views: 654, dateAdded: "2026-05-10" },
            summary: "المتجهات في المستوى.",
            mcq: [],
            importantQuestions: []
          },
          {
            id: "7.3",
            title: "7.3 Dot product الضرب النقطي",
            videoIds: ["76qMVEwe4Mo"],
            pdfFile: { name: "7.3 Dot product", type: "شرح", path: "7.3 Dot product الضرب النقطي (محلول).pdf", views: 654, dateAdded: "2026-05-10" },
            summary: "الضرب النقطي للمتجهات.",
            mcq: [],
            importantQuestions: []
          },
          {
            id: "7.4",
            title: "7.4 Vectors in 3D المتجهات في الفضاء",
            videoIds: ["PiWsLpv6FDY"],
            pdfFile: { name: "7.4 Vectors in 3D", type: "شرح", path: "7_4_Vectors_in_3D_المتجهات_في_الفضاء_محلول.pdf", views: 654, dateAdded: "2026-05-10" },
            summary: "المتجهات في 3 أبعاد",
            mcq: [],
            importantQuestions: []
          },
          {
            id: "7.5",
            title: "7.5 Cross Product الضرب المتجهي",
            videoIds: ["l3obJ3lH7QM"],
            pdfFile: { name: "7.5 Cross Product", type: "شرح", path: "7.5 Cross Product الضرب المتجهي.pdf", views: 654, dateAdded: "2026-05-10" },
            summary: "الضرب المتجهي",
            mcq: [],
            importantQuestions: []
          }
        ]
      },
      {
        id: "ch8",
        title: "Chapter 8 — Polar & Complex (القطبية والمركبة)",
        lessons: [
          {
            id: "8.1",
            title: "8.1 Polar coordinate الاحداثيات القطبية",
            videoIds: ["6-X-d0wCIJw"],
            pdfFile: { name: "Polar coordinate", type: "شرح", path: "8.1 Polar coordinate الاحداثيات القطبية.pdf", views: 100, dateAdded: "2026-05-24" },
            summary: "تحويل الاحداثيات القطبية",
            mcq: [],
            importantQuestions: []
          },
          {
            id: "8.2",
            title: "8.2 Graphs of polar equations",
            videoIds: ["A2ncxjczKos", "zUy1qvSUQZE"],
            pdfFile: { name: "Graphs of polar", type: "شرح", path: "8.2 Graphs of polar equations (English).pdf", views: 100, dateAdded: "2026-05-24" },
            summary: "رسم الاحداثيات القطبية",
            mcq: [],
            importantQuestions: []
          },
          {
            id: "8.3",
            title: "8.3 Polar and Rectangular Forms",
            videoIds: ["WwQnniQ3gSo", "-ww6uQrJ3ak"],
            pdfFile: { name: "Polar and Rectangular", type: "شرح", path: "8_3_Polar_and_Rectangular_Forms_الصور_القطبية_و_الديكارتية.pdf", views: 100, dateAdded: "2026-05-24" },
            summary: "الصيغة القطبية والديكارتية",
            mcq: [],
            importantQuestions: []
          },
          {
            id: "8.5",
            title: "8.5 Complex Numbers and DeMoivre's Theorem",
            videoIds: ["BchatcrHsik"],
            pdfFile: { name: "Complex Numbers", type: "شرح", path: "8_5_Complex_Numbers_and_DeMoivre s_Theorem_الاعداد_المركبة_و_نظر.pdf", views: 100, dateAdded: "2026-05-24" },
            summary: "الاعداد المركبة ونظرية ديموافر",
            mcq: [],
            importantQuestions: []
          }
        ]
      },
      {
        id: "ch9",
        title: "Chapter 9 — Sequences & Series (المتتاليات)",
        lessons: [
          {
            id: "9.1",
            title: "9.1 Sequences as functions",
            videoIds: ["ghEkgLKWRaY"],
            pdfFile: { name: "Sequences", type: "شرح", path: "9.1 Sequences as functions المتتاليات كدوال.pdf", views: 100, dateAdded: "2026-05-24" },
            summary: "المتتاليات كدوال",
            mcq: [],
            importantQuestions: []
          },
          {
            id: "9.2",
            title: "9.2 Sequences, Series, and Sigma Notation",
            videoIds: ["qYWcS_RdnGs"],
            pdfFile: { name: "Sequences, Series", type: "شرح", path: "9_2_Sequences,_Series,_and_Sigma_Notation_المتتاليات_و_المتسلسلا (2).pdf", views: 100, dateAdded: "2026-05-24" },
            summary: "المتتاليات والمتسلسلات",
            mcq: [],
            importantQuestions: []
          },
          {
            id: "9.3",
            title: "9.3 Arithmetic Sequences and Series",
            videoIds: ["mqGahBiabVk"],
            pdfFile: { name: "Arithmetic", type: "شرح", path: "9_3_Arithmetic_Sequences_and_Series_المتتاليات_و_المتسلسلات_الحس.pdf", views: 100, dateAdded: "2026-05-24" },
            summary: "المتتاليات الحسابية",
            mcq: [],
            importantQuestions: []
          },
          {
            id: "9.4",
            title: "9.4 Geometric Sequences and Series",
            videoIds: ["aOh2OtMM9Vk"],
            pdfFile: { name: "Geometric", type: "شرح", path: "9_4_Geometric_Sequences_and_Series_المتتاليات_و_المتسلسلات_الهند.pdf", views: 100, dateAdded: "2026-05-24" },
            summary: "المتتاليات الهندسية",
            mcq: [],
            importantQuestions: []
          },
          {
            id: "9.5",
            title: "9.5 Infinite Geometric Series",
            videoIds: ["N27Livepj1I"],
            pdfFile: { name: "Infinite", type: "شرح", path: "9_5_Infinite_Geometric_Series_المتسلسلات_الهندسية_اللانهائية.pdf", views: 100, dateAdded: "2026-05-24" },
            summary: "المتتاليات الهندسية اللانهائية",
            mcq: [],
            importantQuestions: []
          },
          {
            id: "9.6",
            title: "9.6 Recursion and Iteration",
            videoIds: ["LflTbygbfc4"],
            pdfFile: { name: "Recursion", type: "شرح", path: "9.6 Recursion and Iteration التكرار والإعادة.pdf", views: 100, dateAdded: "2026-05-24" },
            summary: "التكرار",
            mcq: [],
            importantQuestions: []
          },
          {
            id: "9.7",
            title: "9.7 Binomial theorem",
            videoIds: [],
            pdfFile: { name: "Binomial", type: "شرح", path: "9.7 Binomial theorem  نظرية ذات الحدين.pdf", views: 100, dateAdded: "2026-05-24" },
            summary: "نظرية ذات الحدين",
            mcq: [],
            importantQuestions: []
          }
        ]
      }
    ]
  },
  {
    id: "islamic",
    name: "التربية الإسلامية",
    emoji: "🕌",
    color: "amber",
    generalFiles: [
      { name: "هيكل اختبار الفصل الدراسي الثالث", type: "هيكل", path: "هيكل_اختبار_الصف_الحادي_عشر_الفصل_الدراسي_الثالث_2025_2026م.pdf", views: 100, dateAdded: "2026-05-24" },
      { name: "ملخص أحكام التجويد", type: "شرح", path: "ملخص أحكام التجويد.pdf", views: 100, dateAdded: "2026-05-24" },
      { name: "تجميعة 1", type: "مراجعة", path: "1_2_merged.pdf", views: 100, dateAdded: "2026-05-24" },
      { name: "تجميعة 2", type: "مراجعة", path: "1686833401.pdf", views: 100, dateAdded: "2026-05-24" },
      { name: "تجميعة 3", type: "مراجعة", path: "1748948954.pdf", views: 100, dateAdded: "2026-05-24" },
      { name: "اختبار المجلس الحادي عشر ف3", type: "امتحان", path: "اختبار المجلس الحادي عشر ف3.pdf", views: 100, dateAdded: "2026-05-24" }
    ],
    chapters: [
      {
        id: "islamic_ch",
        title: "الدروس المقررة",
        lessons: [
          {
            id: "lesson35",
            title: "35. رسول الله صلى الله عليه وسلم وخاتم النبيين (سورة الأحزاب)",
            videoIds: [],
            pdfFile: { name: "رسول الله صلى الله عليه وسلم", type: "شرح", path: "_٣٥_رسول_الله_صلى_الله_عليه_وسلم_وخاتم_النبيين_سورة_الأحزاب_.pdf", views: 100, dateAdded: "2026-05-24" },
            summary: "شرح الآيات الكريمة من سورة الأحزاب",
            mcq: [],
            importantQuestions: []
          },
          {
            id: "lesson36",
            title: "36. أحكام وآداب بيت النبوة (سورة الأحزاب)",
            videoIds: [],
            pdfFile: { name: "أحكام وآداب بيت النبوة", type: "شرح", path: "_٣٦_أحكام_وآداب_بيت_النبوة_سورة_الأحزاب.pdf", views: 100, dateAdded: "2026-05-24" },
            summary: "شرح الآيات الكريمة من سورة الأحزاب",
            mcq: [],
            importantQuestions: []
          },
          {
            id: "lesson37",
            title: "37. الإنصاف في الإسلام",
            videoIds: [],
            pdfFile: { name: "الإنصاف في الإسلام", type: "شرح", path: "٣٧.  الإنصاف في الإسلام.pdf", views: 100, dateAdded: "2026-05-24" },
            summary: "مفهوم الإنصاف وأهميته في الإسلام",
            mcq: [],
            importantQuestions: []
          },
          {
            id: "lesson39",
            title: "39. من معالم رحمة الرسول صلى الله عليه وسلم",
            videoIds: [],
            pdfFile: { name: "من معالم رحمة الرسول", type: "شرح", path: "_٣٩_من_معالم_رحمة_الرسول_صلى_الله_عليه_وسلم.pdf", views: 100, dateAdded: "2026-05-24" },
            summary: "رحمة النبي صلى الله عليه وسلم بالخلق",
            mcq: [],
            importantQuestions: []
          },
          {
            id: "lesson41",
            title: "41. ضوابط اجتماعية (سورة الأحزاب)",
            videoIds: [],
            pdfFile: { name: "ضوابط اجتماعية", type: "شرح", path: "_٤١_ضوابط_اجتماعية_سورة_الأحزاب_.pdf", views: 100, dateAdded: "2026-05-24" },
            summary: "الضوابط الاجتماعية في سورة الأحزاب",
            mcq: [],
            importantQuestions: []
          },
          {
            id: "lesson42",
            title: "42. الإنسان والأمانة (سورة الأحزاب)",
            videoIds: [],
            pdfFile: { name: "الإنسان والأمانة", type: "شرح", path: "_٤٢_الإنسان_والأمانة_سورة_الأحزاب.pdf", views: 100, dateAdded: "2026-05-24" },
            summary: "حمل الأمانة ومسؤولية الإنسان",
            mcq: [],
            importantQuestions: []
          }
        ]
      }
    ]
  },
  {
    id: "english",
    name: "اللغة الإنجليزية",
    emoji: "🇬🇧",
    color: "blue",
    generalFiles: [
      { name: "Revision Booklet", type: "مراجعة", path: "Revision booklet 11 Adv.pdf", views: 100, dateAdded: "2026-05-24" },
      { name: "Vocabulary Listening & Speaking", type: "مراجعة", path: "Words_Grade_11_ADV_ 12G_Chapter_5_Term_3_Listening_ _Speaking.pdf", views: 100, dateAdded: "2026-05-24" },
      { name: "English Maze Practice", type: "مراجعة", path: "English Maze Practice 1.pdf", views: 100, dateAdded: "2026-05-24" },
      { name: "Follow your heart", type: "مراجعة", path: "Follow your heart Text with model answers.pdf", views: 100, dateAdded: "2026-05-24" }
    ],
    chapters: [
      {
        id: "eng_ch",
        title: "English Review",
        lessons: [
          {
            id: "eng_rev",
            title: "General Review",
            videoIds: [],
            summary: "المراجعة العامة للغة الإنجليزية",
            mcq: [],
            importantQuestions: []
          }
        ]
      }
    ]
  },
  {
    id: "biology",
    name: "الأحياء",
    emoji: "🧬",
    color: "green",
    generalFiles: [
      { name: "الهيكل الوزاري BIOLOGY Bridge", type: "هيكل", path: "EoT3_Coverage_G11_ADV_Bio_INS_T3_ 2025-2026.pdf", views: 100, dateAdded: "2026-05-24" },
      { name: "احياء مراجعة شاملة", type: "امتحان", path: "احياء_مراجعة_شاملة_اسيلة_سنوات_سابقة_ف_3_احياء.pdf", views: 100, dateAdded: "2026-05-24" },
      { name: "اسيلة وزارية وحدة المناعة", type: "مراجعة", path: "اسيلة وزارية وحدة المناعة.pdf", views: 100, dateAdded: "2026-05-24" }
    ],
    chapters: [
      {
        id: "bio_units",
        title: "وحدات الأحياء (Bridge)",
        lessons: [
          {
            id: "immunity",
            title: "المناعة والأمراض",
            videoIds: ["Jx6o8H-HW1E", "lobHqw26i4E", "Yn0PseLE6g0", "vpCfqtXloOQ", "WepH_gX8XoU", "uXRlcUISK3k"],
            pdfFile: { name: "Infectious Diseases", type: "شرح", path: "Infectious Diseases.pdf", views: 100, dateAdded: "2026-05-24" },
            summary: "الجهاز المناعي والأمراض المعدية",
            mcq: [],
            importantQuestions: []
          }
        ]
      }
    ]
  },
  {
    id: "physics",
    name: "الفيزياء",
    emoji: "⚡",
    color: "violet",
    generalFiles: [
      { name: "مراجعة 5-5-2026 (محلولة)", type: "مراجعة", path: "Revision 5-5-2026 (محلولة).pdf", views: 100, dateAdded: "2026-05-24" }
    ],
    chapters: [
      {
        id: "phys_units",
        title: "وحدات الفيزياء (Bridge)",
        lessons: [
          {
            id: "momentum",
            title: "Momentum & Impulse",
            videoIds: [],
            pdfFile: { name: "Impulse and Momentum", type: "شرح", path: "1-Impulse and Momentum (part 1 ).pdf", views: 100, dateAdded: "2026-05-24" },
            summary: "الزخم والدفع",
            mcq: [],
            importantQuestions: []
          }
        ]
      }
    ]
  },
  {
    id: "chemistry",
    name: "الكيمياء",
    emoji: "🧪",
    color: "orange",
    generalFiles: [
      { name: "EOT-CHE", type: "امتحان", path: "EOT-CHE-1-T3-26_MOE.pdf", views: 100, dateAdded: "2026-05-24" }
    ],
    chapters: [
      {
        id: "chem_units",
        title: "وحدات الكيمياء (Bridge)",
        lessons: [
          {
            id: "organic",
            title: "Organic Chemistry",
            videoIds: [],
            summary: "أساسيات الكيمياء العضوية",
            mcq: [],
            importantQuestions: []
          }
        ]
      }
    ]
  }
];
