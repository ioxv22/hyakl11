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
      { name: "هيكل الرياضيات 11 متقدم EOT3", type: "هيكل", path: "EOT3 11 ADV.pdf", views: 2450, dateAdded: "2026-05-18" },
      { name: "اختبار وزاري رياضيات القسم الاكتروني 21-22", type: "امتحان", path: "اختبار_وزاري_رياضيات_القسم_الاكتروني_11_متقدم_بريدج_21_22.pdf", views: 982, dateAdded: "2026-05-20" },
      { name: "الاختبار الوزاري رياضيات الاكتروني 23-24", type: "امتحان", path: "الاختبار_الوزاري_رياضيات_الاكتروني_11_متقدم_للمنهجين_لعام_2023_2.pdf", views: 1104, dateAdded: "2026-05-21" },
      { name: "تجميعة الاختبارات الوزارية السابقة", type: "مراجعة", path: "تجميعة_الاختبارات_الوزارية_السابقة_رياضيات_11_متقدم_للمنهجين_بدو.pdf", views: 765, dateAdded: "2026-05-22" },
      { name: "حلول تجميعة الاختبارات الوزارية", type: "شرح", path: "حلول_تجميعة_الاختبارات_الوزارية_السابقة_رياضيات_11_متقدم_للمنهجي.pdf", views: 549, dateAdded: "2026-05-23" }
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
            pdfFile: { name: "7.2 Vectors in the coordinate plane", type: "شرح", path: "7_2_Vectors_in_the_coordinate_plane_المتجهات_في_المستوى_الإحداثي (2).pdf", views: 654, dateAdded: "2026-05-10" },
            summary: "في هذا الدرس، نتعرف على المتجه ككمية متجهة.",
            mcq: [{ question: "Vector?", options: ["Yes", "No"], answerIndex: 0, explanation: "Vector has direction" }],
            importantQuestions: []
          },
          {
            id: "7.3",
            title: "7.3 Dot product الضرب النقطي",
            videoIds: ["76qMVEwe4Mo"],
            pdfFile: { name: "7.3 Dot product", type: "شرح", path: "7.3 Dot product الضرب النقطي (محلول) (2).pdf", views: 654, dateAdded: "2026-05-10" },
            summary: "الضرب النقطي للمتجهات.",
            mcq: [],
            importantQuestions: []
          },
          {
            id: "7.4",
            title: "7.4 Vectors in 3D المتجهات في الفضاء",
            videoIds: ["PiWsLpv6FDY"],
            pdfFile: { name: "7.4 Vectors in 3D", type: "شرح", path: "7_4_Vectors_in_3D_المتجهات_في_الفضاء_غير_محلول (2).pdf", views: 654, dateAdded: "2026-05-10" },
            summary: "المتجهات في 3 أبعاد",
            mcq: [],
            importantQuestions: []
          },
          {
            id: "7.5",
            title: "7.5 Cross Product الضرب المتجهي",
            videoIds: ["l3obJ3lH7QM"],
            pdfFile: { name: "7.5 Cross Product", type: "شرح", path: "7.5 Cross Product الضرب المتجهي (2).pdf", views: 654, dateAdded: "2026-05-10" },
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
            pdfFile: { name: "Binomial", type: "شرح", path: "9.7 Binomial theorem نظرية ذات الحدين.pdf", views: 100, dateAdded: "2026-05-24" },
            summary: "نظرية ذات الحدين",
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
      { name: "الهيكل الوزاري CHEMISTRY Bridge", type: "هيكل", path: "Coverage-EoT3-G11-ADV -P2-BRIDGE-25-26.pdf", views: 100, dateAdded: "2026-05-24" },
      { name: "Exam", type: "امتحان", path: "Exam.pdf", views: 100, dateAdded: "2026-05-24" },
      { name: "CHEADV 2021-2022", type: "امتحان", path: "CHEADV 2021-2022.pdf", views: 100, dateAdded: "2026-05-24" },
      { name: "CHEADV 2021-2022 (2)", type: "امتحان", path: "CHEADV 2021-2022 (2).pdf", views: 100, dateAdded: "2026-05-24" },
      { name: "اختبار 20-21 محلول", type: "امتحان", path: "اختبار 20-21 محلول.pdf", views: 100, dateAdded: "2026-05-24" },
      { name: "Scenario 2 Booklet", type: "مراجعة", path: "Scenario 2 Booklet.pdf", views: 100, dateAdded: "2026-05-24" },
      { name: "الاختبار الوزاري كيمياء", type: "امتحان", path: "الاختبار_الوزاري_كيمياء_11 12_متقدم_للمنهجين_لعام_2023_2024_بدون.pdf", views: 100, dateAdded: "2026-05-24" },
      { name: "حلول الاختبار الوزاري", type: "شرح", path: "حلول_الاختبار_الوزاري_كيمياء_11 12_متقدم_للمنهجين_لعام_2023_2024.pdf", views: 100, dateAdded: "2026-05-24" }
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
          },
          {
            id: "electro",
            title: "Electrochemistry",
            videoIds: [],
            summary: "الكيمياء الكهربائية",
            mcq: [],
            importantQuestions: []
          },
          {
            id: "acids",
            title: "Acids & Bases",
            videoIds: [],
            summary: "الأحماض والقواعد",
            mcq: [],
            importantQuestions: []
          },
          {
            id: "ph",
            title: "pH & Titration",
            videoIds: [],
            summary: "الرقم الهيدروجيني والمعايرة",
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
      { name: "الهيكل الوزاري PHYSICS Bridge", type: "هيكل", path: "document (8).pdf", views: 100, dateAdded: "2026-05-24" },
      { name: "الاختبار الوزاري فيزياء الاكتروني", type: "امتحان", path: "الاختبار_الوزاري_فيزياء_الاكتروني_11_متقدم_23_24_الفصل_الثاني.pdf", views: 100, dateAdded: "2026-05-24" },
      { name: "حلول الاختبار الاكتروني", type: "شرح", path: "حلول_الاختبار_الاكتروني_الوزاري_فيزياء_2023_2024_حادي_عشر_متقدم_.pdf", views: 100, dateAdded: "2026-05-24" },
      { name: "الاختبار الوزاري فيزياء ورقي", type: "امتحان", path: "الاختبار_الوزاري_فيزياء_ورقي_11_متقدم_23_24_للفصل_الثاني_.pdf", views: 100, dateAdded: "2026-05-24" },
      { name: "حلول الاختبار الورقي", type: "شرح", path: "حلول_الاختبار_الورقي_فيزياء_11_متقدم_للمنهجين_عام_2023_2024_للفص.pdf", views: 100, dateAdded: "2026-05-24" }
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
            summary: "الزخم والدفع",
            mcq: [],
            importantQuestions: []
          },
          {
            id: "collisions",
            title: "Elastic Collisions & Linear Momentum",
            videoIds: [],
            summary: "التصادمات المرنة",
            mcq: [],
            importantQuestions: []
          },
          {
            id: "circular",
            title: "Circular & Angular Motion",
            videoIds: [],
            summary: "الحركة الدائرية",
            mcq: [],
            importantQuestions: []
          },
          {
            id: "torque",
            title: "Torque & Center of Mass",
            videoIds: [],
            summary: "عزم الدوران ومركز الكتلة",
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
      { name: "الهيكل الوزاري BIOLOGY Bridge", type: "هيكل", path: "document-3 (1).pdf", views: 100, dateAdded: "2026-05-24" },
      { name: "اختبار وزاري احياء 11 متقدم بريدج", type: "امتحان", path: "اختبار_وزاري_احياء_11_متقدم_بريدج_لعام_2023_2024_بدون_الحل.pdf", views: 100, dateAdded: "2026-05-24" },
      { name: "حلول الاختبار وزاري احياء", type: "شرح", path: "حلول_الاختبار_وزاري_احياء_11_متقدم_بريدج_لعام_2023_2024.pdf", views: 100, dateAdded: "2026-05-24" },
      { name: "تجميعة اختبارات وزارية سابقة", type: "مراجعة", path: "تجميعة_اختبارات_وزارية_سابقة_احياء_11 12_متقدم_للمنهجين_عبدالمؤم.pdf", views: 100, dateAdded: "2026-05-24" },
      { name: "حلول تجميعة الاختبارات", type: "شرح", path: "حلول_تجميعة_الاختبارات_الوزارية_السابقة_احياء_11 12_متقدم_للمنهج.pdf", views: 100, dateAdded: "2026-05-24" }
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
            summary: "الجهاز المناعي والأمراض المعدية",
            mcq: [],
            importantQuestions: []
          },
          {
            id: "photosynthesis",
            title: "البناء الضوئي والتنفس الخلوي",
            videoIds: [],
            summary: "عمليات البناء الضوئي في النباتات",
            mcq: [],
            importantQuestions: []
          },
          {
            id: "ecology",
            title: "Ecology & Population Growth",
            videoIds: [],
            summary: "البيئة والنمو السكاني",
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
      { name: "Revision Booklet", type: "مراجعة", path: "Revision Booklet.pdf", views: 100, dateAdded: "2026-05-24" },
      { name: "Vocabulary Listening & Speaking", type: "مراجعة", path: "Vocabulary Listening & Speaking.pdf", views: 100, dateAdded: "2026-05-24" },
      { name: "Maze Practices", type: "مراجعة", path: "Maze Practices.pdf", views: 100, dateAdded: "2026-05-24" },
      { name: "Reading Follow your heart", type: "مراجعة", path: "Reading Follow your heart.pdf", views: 100, dateAdded: "2026-05-24" },
      { name: "General MAZE", type: "مراجعة", path: "General MAZE.pdf", views: 100, dateAdded: "2026-05-24" },
      { name: "Vocabulary lists", type: "مراجعة", path: "Vocabulary lists.pdf", views: 100, dateAdded: "2026-05-24" }
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
      { name: "اختبار المجلس الحادي عشر ف3", type: "امتحان", path: "اختبار المجلس الحادي عشر ف3.pdf", views: 100, dateAdded: "2026-05-24" },
      { name: "اسلامية 11 متقدم الفصل الثالث", type: "امتحان", path: "اسلامية_11_متقدم_الفصل_الثالث.pdf", views: 100, dateAdded: "2026-05-24" },
      { name: "امتحان الدين + الاجوبة الصحيحة", type: "امتحان", path: "امتحان الدين + الاجوبة الصحيحة.pdf", views: 100, dateAdded: "2026-05-24" }
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
            pdfFile: { name: "الإنصاف في الإسلام", type: "شرح", path: "٣٧. الإنصاف في الإسلام.pdf", views: 100, dateAdded: "2026-05-24" },
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
  }
];
