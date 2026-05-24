import { physicsBridgeSubject } from './physicsBridgeData';
import { biologyBridgeSubject } from './biologyBridgeData';
import { chemistryBridgeSubject } from './chemistryBridgeData';

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
  track?: "inspire" | "bridge";
  generalFiles?: FileItem[];
}

export const SUBJECTS: Subject[] = [
  {
    "id": "math",
    "name": "الرياضيات",
    "emoji": "📐",
    "color": "emerald",
    "generalFiles": [
      {
        "name": "هيكل الرياضيات للصف الحادي عشر متقدم 2026",
        "type": "هيكل",
        "path": "هيكل_الرياضيات_لصف_الحادي_عشر_متقدم_رفيل_فصل_الثال_260519_205502.pdf",
        "views": 1845,
        "dateAdded": "2026-05-18"
      },
      {
        "name": "امتحان سابق 11 متقدم رياضيات",
        "type": "امتحان",
        "path": "امتحان سابق 11 متقدم.pdf",
        "views": 982,
        "dateAdded": "2026-05-20"
      },
      {
        "name": "امتحان سابق رياضيات الفصل الثالث",
        "type": "امتحان",
        "path": "امتحان سابق الفصل 3.pdf",
        "views": 1104,
        "dateAdded": "2026-05-21"
      },
      {
        "name": "ماث امتحان سابق وزارية",
        "type": "امتحان",
        "path": "ماث امتحان سابق.pdf",
        "views": 765,
        "dateAdded": "2026-05-22"
      },
      {
        "name": "امتحان EOT G11 ADV",
        "type": "امتحان",
        "path": "EOT G11 ADV.pdf",
        "views": 549,
        "dateAdded": "2026-05-23"
      },
      {
        "name": "G11 EOT T3 Word File 2026",
        "type": "مراجعة",
        "path": "G11 EOT T3 WORD FILE 2026.docx",
        "views": 320,
        "dateAdded": "2026-05-24"
      }
    ],
    "chapters": [
      {
        "id": "ch7",
        "title": "Chapter 7 — Vectors (المتجهات)",
        "lessons": [
          {
            "id": "7.1",
            "title": "7.1 مقدمة في المتجهات (Introduction to Vectors)",
            "videoIds": [
              "qu7g3R6tLOE",
              "NTDNrlzz7YM",
              "Gx5TGANIhHM"
            ],
            "pdfFile": {
              "name": "7.1 Introduction to Vectors مقدمة في المتجهات",
              "type": "شرح",
              "path": "7.1 Introduction to vectors مقدمة في المتجهات.pdf",
              "views": 654,
              "dateAdded": "2026-05-10"
            },
            "summary": "في هذا الدرس، نتعرف على المتجه ككمية متجهة لها مقدار واتجاه، ونقارنها بالكميات القياسية. نتعلم كيفية رسم المتجه في الاتجاه الحقيقي واتجاه الزاوية الربيعية، بالإضافة إلى إيجاد محصلة متجهين أو أكثر باستخدام قاعدة المثلث وقاعدة متوازي الأضلاع، وتحليل المتجه إلى مركبتين متعامدتين.",
            "formulas": [
              {
                "title": "المركبة الأفقية للمتجه v",
                "expression": "vx = |v| cos θ",
                "explanation": "حيث |v| هو مقدار المتجه، و θ هي الزاوية التي يصنعها المتجه مع المحور الأفقي الموجب."
              },
              {
                "title": "المركبة الرأسية للمتجه v",
                "expression": "vy = |v| sin θ",
                "explanation": "حيث |v| هو مقدار المتجه، و θ هي الزاوية مع المحور الأفقي الموجب."
              }
            ],
            "vocabulary": [
              {
                "word": "Vector",
                "translation": "متجه",
                "explanation": "كمية لها مقدار واتجاه."
              },
              {
                "word": "Scalar",
                "translation": "كمية قياسية",
                "explanation": "كمية لها مقدار فقط مثل المسافة أو الزمن."
              },
              {
                "word": "Resultant",
                "translation": "المحصلة",
                "explanation": "المتجه الناتج عن جمع متجهين أو أكثر."
              }
            ],
            "importantQuestions": [
              {
                "question": "كيف نوجد محصلة متجهين متعامدين؟",
                "answer": "نستخدم نظرية فيثاغورس: R^2 = A^2 + B^2، ومنها R = √(A^2 + B^2)."
              },
              {
                "question": "ما هو المتجه الصفري؟",
                "answer": "هو متجه مقداره صفر وليس له اتجاه محدد، وينتج عن جمع متجهين متعاكسين متساويين في المقدار."
              }
            ],
            "mcq": [
              {
                "question": "Which of the following represents a vector quantity?",
                "options": [
                  "A velocity of 50 km/h North",
                  "A room temperature of 25°C",
                  "A bag mass of 5 kg",
                  "An exam time of 60 minutes"
                ],
                "answerIndex": 0,
                "explanation": "Velocity includes both magnitude (50 km/h) and direction (North), making it a vector quantity, whereas others are scalar quantities with magnitude only."
              },
              {
                "question": "A boat travels at 4 m/s due East, and a water current pushes it at 3 m/s due North. What is the magnitude of the boat's resultant velocity?",
                "options": [
                  "7 m/s",
                  "5 m/s",
                  "1 m/s",
                  "25 m/s"
                ],
                "answerIndex": 1,
                "explanation": "Since the directions are perpendicular (East and North), we use the Pythagorean theorem: R = √(4² + 3²) = √25 = 5 m/s."
              }
            ]
          },
          {
            "id": "7.2",
            "title": "7.2 المتجهات في المستوى الإحداثي (Vectors in Coordinate Plane)",
            "videoIds": [
              "fUs8WmmWvVI"
            ],
            "pdfFile": {
              "name": "7.2 Vectors in the coordinate plane",
              "type": "شرح",
              "path": "7_2_Vectors_in_the_coordinate_plane_المتجهات_في_المستوى_الإحداثي.pdf",
              "views": 985,
              "dateAdded": "2026-05-11"
            },
            "extraFiles": [
              {
                "name": "7.2 المتجهات في المستوى الإحداثي (نسخة إضافية)",
                "type": "شرح",
                "path": "7_2_Vectors_in_the_coordinate_plane_المتجهات_في_المستوى_الإحداثي (2).pdf",
                "views": 420,
                "dateAdded": "2026-05-11"
              }
            ],
            "summary": "يتناول هذا الدرس كتابة المتجه في الصورة المركبة ⟨a, b⟩ باستخدام نقطة البداية (x1, y1) ونقطة النهاية (x2, y2). نتعلم كيفية إيجاد طول المتجه، والعمليات على المتجهات (الجمع، الطرح، الضرب في عدد حقيقي) إحداثياً، ومتجه الوحدة، وكتابة المتجه كتركيب خطي لمتجهي الوحدة القياسيين i و j.",
            "formulas": [
              {
                "title": "الصورة المركبة للمتجه AB",
                "expression": "⟨x2 - x1, y2 - y1⟩",
                "explanation": "حيث A(x1, y1) هي نقطة البداية، و B(x2, y2) هي نقطة النهاية."
              },
              {
                "title": "طول المتجه v = ⟨a, b⟩",
                "expression": "|v| = √(a^2 + b^2)",
                "explanation": "يمثل المسافة المستقيمة من بداية المتجه إلى نهايته."
              },
              {
                "title": "متجه الوحدة u في اتجاه v",
                "expression": "u = v / |v|",
                "explanation": "هو متجه طوله 1 وله نفس اتجاه المتجه v."
              }
            ],
            "vocabulary": [],
            "importantQuestions": [
              {
                "question": "كيف نوجد زاوية اتجاه متجه ⟨a, b⟩ مع المحور الأفقي الموجب؟",
                "answer": "نستخدم العلاقة tan θ = b / a، ومنها θ = tan^-1(b/a). ويجب مراعاة الربع الذي يقع فيه المتجه لإضافة 180° أو 360° عند الضرورة."
              }
            ],
            "mcq": [
              {
                "question": "ما طول المتجه v = ⟨-6, 8⟩؟",
                "options": [
                  "2",
                  "14",
                  "10",
                  "100"
                ],
                "answerIndex": 2,
                "explanation": "الطول = √((-6)² + 8²) = √(36 + 64) = √100 = 10."
              },
              {
                "question": "إذا كان v = ⟨2, -3⟩ و w = ⟨1, 4⟩، فما حاصل 2v + w؟",
                "options": [
                  "⟨5, -2⟩",
                  "⟨3, 1⟩",
                  "⟨5, 2⟩",
                  "⟨4, -2⟩"
                ],
                "answerIndex": 0,
                "explanation": "2v = ⟨4, -6⟩. إذن 2v + w = ⟨4+1, -6+4⟩ = ⟨5, -2⟩."
              }
            ]
          },
          {
            "id": "7.3",
            "title": "7.3 الضرب الداخلي للمتجهات (Dot Product)",
            "videoIds": [
              "76qMVEwe4Mo"
            ],
            "pdfFile": {
              "name": "7.3 الضرب النقطي (محلول)",
              "type": "مراجعة",
              "path": "7.3 Dot product الضرب النقطي (محلول).pdf",
              "views": 1205,
              "dateAdded": "2026-05-12"
            },
            "extraFiles": [
              {
                "name": "7.3 الضرب النقطي (محلول) نسخة ثانية",
                "type": "مراجعة",
                "path": "7.3 Dot product الضرب النقطي (محلول) (2).pdf",
                "views": 531,
                "dateAdded": "2026-05-12"
              }
            ],
            "summary": "يتناول هذا الدرس الضرب الداخلي (العددي أو النقطي) لمتجهين في المستوى الإحداثي. ناتج الضرب الداخلي هو كمية قياسية (عدد حقيقي). يفيد الضرب الداخلي في إيجاد الزاوية بين متجهين والتحقق من تعامد المتجهات (إذا كان حاصل الضرب صفراً)، بالإضافة إلى إيجاد الشغل المبذول.",
            "formulas": [
              {
                "title": "الضرب الداخلي لمتجهين u و v",
                "expression": "u · v = u1·v1 + u2·v2",
                "explanation": "حيث u = ⟨u1, u2⟩ و v = ⟨v1, v2⟩."
              },
              {
                "title": "الزاوية بين متجهين u و v",
                "expression": "cos θ = (u · v) / (|u| · |v|)",
                "explanation": "حيث θ هي الزاوية الصغرى بين المتجهين، وتقع في الفترة [0, 180]."
              }
            ],
            "vocabulary": [
              {
                "word": "Dot Product",
                "translation": "الضرب الداخلي / النقطي",
                "explanation": "عملية ضرب متجهين ينتج عنها كمية قياسية."
              },
              {
                "word": "Orthogonal Vectors",
                "translation": "متجهات متعامدة",
                "explanation": "متجهات الزاوية بينهما 90 درجة، وحاصل ضربهما الداخلي يساوي صفراً."
              }
            ],
            "importantQuestions": [
              {
                "question": "كيف نثبت إحداثياً أن متجهين متعامدان؟",
                "answer": "نحسب u · v، فإذا كان الناتج يساوي 0، فإن المتجهين متعامدان."
              },
              {
                "question": "ما معنى الشغل فيزيائياً وعلاقته بالضرب الداخلي؟",
                "answer": "الشغل هو حاصل الضرب الداخلي لمتجه القوة في متجه الإزاحة: W = F · d = |F||d| cos θ."
              }
            ],
            "mcq": [
              {
                "question": "If u = ⟨3, 4⟩ and v = ⟨2, -1⟩, what is the dot product u · v?",
                "options": [
                  "2",
                  "14",
                  "10",
                  "11"
                ],
                "answerIndex": 0,
                "explanation": "u · v = (3)(2) + (4)(-1) = 6 - 4 = 2."
              },
              {
                "question": "Which of the following pairs of vectors are orthogonal (perpendicular)?",
                "options": [
                  "⟨2, 3⟩ and ⟨-3, 2⟩",
                  "⟨1, 2⟩ and ⟨2, 1⟩",
                  "⟨3, -4⟩ and ⟨4, 3⟩",
                  "Both A and C"
                ],
                "answerIndex": 3,
                "explanation": "Two vectors are orthogonal if their dot product is 0. For A: 2(-3) + 3(2) = 0. For C: 3(4) + (-4)(3) = 0. Thus, both A and C are orthogonal."
              }
            ]
          },
          {
            "id": "7.4",
            "title": "7.4 المتجهات في الفضاء ثلاثي الأبعاد (Vectors in 3D)",
            "videoIds": [
              "PiWsLpv6FDY"
            ],
            "pdfFile": {
              "name": "7.4 المتجهات في الفضاء (غير محلول)",
              "type": "شرح",
              "path": "7_4_Vectors_in_3D_المتجهات_في_الفضاء_غير_محلول.pdf",
              "views": 760,
              "dateAdded": "2026-05-13"
            },
            "extraFiles": [
              {
                "name": "7.4 المتجهات في الفضاء (غير محلول) (2)",
                "type": "شرح",
                "path": "7_4_Vectors_in_3D_المتجهات_في_الفضاء_غير_محلول (2).pdf",
                "views": 310,
                "dateAdded": "2026-05-13"
              },
              {
                "name": "7.4 المتجهات في الفضاء (محلول)",
                "type": "شرح",
                "path": "7_4_Vectors_in_3D_المتجهات_في_الفضاء_محلول.pdf",
                "views": 980,
                "dateAdded": "2026-05-13"
              }
            ],
            "summary": "يمتد هذا الدرس بمفهوم المتجهات إلى الفضاء ثلاثي الأبعاد، باستخدام ثلاثة محاور متعامدة (x, y, z). نتعلم كيفية تمثيل النقطة (x, y, z) في الفضاء، حساب المسافة ونقطة المنتصف بين نقطتين، إيجاد الصورة المركبة للمتجه ثلاثي الأبعاد ⟨a, b, c⟩ وطوله، وإجراء العمليات الجبرية عليه.",
            "formulas": [
              {
                "title": "المسافة بين نقطتين في الفضاء",
                "expression": "d = √((x2-x1)^2 + (y2-y1)^2 + (z2-z1)^2)",
                "explanation": "حساب البعد المستقيم بين نقطتين في المحاور الثلاثة."
              },
              {
                "title": "طول المتجه v = ⟨a, b, c⟩",
                "expression": "|v| = √(a^2 + b^2 + c^2)",
                "explanation": "طول المتجه في الفضاء ثلاثي الأبعاد."
              }
            ],
            "vocabulary": [
              {
                "word": "Three-Dimensional Space",
                "translation": "الفضاء ثلاثي الأبعاد",
                "explanation": "نظام إحداثي يتكون من ثلاثة محاور متعامدة x, y, z."
              },
              {
                "word": "Ordered Triple",
                "translation": "ثلاثية مرتبة",
                "explanation": "تمثيل النقطة في الفضاء كـ (x, y, z)."
              }
            ],
            "importantQuestions": [
              {
                "question": "أوجد نقطة منتصف القطعة المستقيمة بين (1, 4, -2) و (5, 0, 6)؟",
                "answer": "نقطة المنتصف = ((x1+x2)/2, (y1+y2)/2, (z1+z2)/2) = ((1+5)/2, (4+0)/2, (-2+6)/2) = (3, 2, 2)."
              },
              {
                "question": "كيف يكتب المتجه v = ⟨2, -3, 4⟩ كتركيب خطي لمتجهات الوحدة القياسية في الفضاء؟",
                "answer": "يكتب على الصورة: 2i - 3j + 4k، حيث i, j, k هي متجهات الوحدة القياسية في اتجاه المحاور x, y, z على التوالي."
              }
            ],
            "mcq": [
              {
                "question": "What is the magnitude of the 3D vector v = ⟨2, 3, 6⟩?",
                "options": [
                  "11",
                  "7",
                  "49",
                  "5"
                ],
                "answerIndex": 1,
                "explanation": "The magnitude in 3D is |v| = √(a² + b² + c²) = √(2² + 3² + 6²) = √(4 + 9 + 36) = √49 = 7."
              },
              {
                "question": "What is the distance between the two points A(1, 2, 3) and B(1, 2, 7) in 3D space?",
                "options": [
                  "4",
                  "16",
                  "2",
                  "10"
                ],
                "answerIndex": 0,
                "explanation": "The distance is d = √((1-1)² + (2-2)² + (7-3)²) = √(0 + 0 + 16) = 4."
              }
            ]
          },
          {
            "id": "7.5",
            "title": "7.5 الضرب التقاطعي / الاتجاهي (Cross Product)",
            "videoIds": [
              "l3obJ3lH7QM"
            ],
            "pdfFile": {
              "name": "7.5 الضرب المتجهي",
              "type": "شرح",
              "path": "7.5 Cross Product الضرب المتجهي.pdf",
              "views": 924,
              "dateAdded": "2026-05-14"
            },
            "extraFiles": [
              {
                "name": "7.5 الضرب المتجهي (2)",
                "type": "شرح",
                "path": "7.5 Cross Product الضرب المتجهي (2).pdf",
                "views": 412,
                "dateAdded": "2026-05-14"
              },
              {
                "name": "7.5 الضرب المتجهي غير محلول",
                "type": "شرح",
                "path": "7_5_Cross_Product_الضرب_المتجهي_غير_محلول.pdf",
                "views": 245,
                "dateAdded": "2026-05-14"
              }
            ],
            "summary": "الضرب التقاطعي (أو الاتجاهي) هو عملية تجرى حصرياً في الفضاء ثلاثي الأبعاد بين متجهين، والناتج هو متجه ثالث يكون عمودياً على كل من المتجهين الأصليين. يستخدم الضرب التقاطعي لإيجاد مساحة متوازي الأضلاع في الفضاء، كما يستخدم الضرب القياسي الثلاثي لإيجاد حجم متوازي السطوح.",
            "formulas": [
              {
                "title": "الضرب التقاطعي u x v",
                "expression": "u x v = |i  j  k| \n        |u1 u2 u3| \n        |v1 v2 v3|",
                "explanation": "يتم فك المحددة لإيجاد المركبات الثلاثة للمتجه الناتج."
              },
              {
                "title": "مساحة متوازي الأضلاع المكون من u و v",
                "expression": "Area = |u x v|",
                "explanation": "تساوي طول متجه حاصل الضرب التقاطعي للمتجهين المتجاورين."
              },
              {
                "title": "حجم متوازي السطوح",
                "expression": "Volume = |t · (u x v)|",
                "explanation": "يمثل القيمة المطلقة للمحدد المكون من مركبات المتجهات الثلاثة t, u, v."
              }
            ],
            "vocabulary": [
              {
                "word": "Cross Product",
                "translation": "الضرب التقاطعي / الاتجاهي",
                "explanation": "عملية ضرب متجهين في الفضاء ينتج عنها متجه عمودي عليهما."
              },
              {
                "word": "Parallelepiped",
                "translation": "متوازي السطوح",
                "explanation": "مجسم ثلاثي الأبعاد كل وجه من وجوهه متوازي أضلاع."
              }
            ],
            "importantQuestions": [
              {
                "question": "ما النتيجة الهندسية للضرب u x w؟",
                "answer": "هو متجه عمودي على المستوى الذي يحوي u و w، واتجاهه يحدد بقاعدة اليد اليمنى."
              },
              {
                "question": "هل عملية الضرب التقاطعي تبديلية؟",
                "answer": "لا، الضرب التقاطعي ليس تبديلياً، بل إن u x v = -(v x u)."
              }
            ],
            "mcq": [
              {
                "question": "The cross product of two vectors u and w, u x w, is always perpendicular to:",
                "options": [
                  "Vector u only",
                  "Vector w only",
                  "Both vectors u and w",
                  "Neither u nor w"
                ],
                "answerIndex": 2,
                "explanation": "By definition, the cross product vector is perpendicular to the plane containing both u and w, meaning it is orthogonal to both."
              },
              {
                "question": "If the magnitude of the cross product |u x v| is 15, what is the area of the triangle whose adjacent sides are vectors u and v?",
                "options": [
                  "15",
                  "7.5",
                  "30",
                  "225"
                ],
                "answerIndex": 1,
                "explanation": "The area of the parallelogram formed by u and v is |u x v| = 15. The area of the triangle is half of that: 15 / 2 = 7.5."
              }
            ]
          }
        ]
      },
      {
        "id": "ch8",
        "title": "Chapter 8 — Polar & Complex Numbers (الأعداد القطبية والمركبة)",
        "lessons": [
          {
            "id": "8.1",
            "title": "8.1 الإحداثيات القطبية (Polar Coordinates)",
            "videoIds": [
              "6-X-d0wCIJw"
            ],
            "pdfFile": {
              "name": "8.1 الاحداثيات القطبية",
              "type": "شرح",
              "path": "8.1 Polar coordinate الاحداثيات القطبية.pdf",
              "views": 875,
              "dateAdded": "2026-05-14"
            },
            "extraFiles": [
              {
                "name": "8.1 الاحداثيات القطبية غير محلول",
                "type": "شرح",
                "path": "8_1_Polar_coordinate_الاحداثيات_القطبية_غير_محلول.pdf",
                "views": 345,
                "dateAdded": "2026-05-14"
              }
            ],
            "summary": "يتناول هذا الدرس نظام الإحداثيات القطبي البديل للنظام الديكارتي، حيث يتم تحديد موضع النقطة في المستوى بالزوج المرتب (r, θ)، حيث r هي المسافة المتجهة من القطب (الأصل)، و θ هي الزاوية المتجهة المقاسة من المحور القطبي. نتعلم تمثيل النقاط القطبية والمعادلات القطبية البسيطة بيانياً.",
            "formulas": [
              {
                "title": "تمثيل النقطة (r, θ) بزاوية بديلة",
                "expression": "(r, θ + 2nπ)  أو  (-r, θ + (2n+1)π)",
                "explanation": "للنقطة القطبية عدد لا نهائي من التمثيلات بسبب دورية الزاوية، وتغيير إشارة r يعكس الاتجاه بمقدار 180 درجة (π)."
              }
            ],
            "vocabulary": [
              {
                "word": "Pole",
                "translation": "القطب",
                "explanation": "نقطة الأصل في نظام الإحداثيات القطبية."
              },
              {
                "word": "Polar Axis",
                "translation": "المحور القطبي",
                "explanation": "شعاع أفقي يمتد من القطب جهة اليمين، يشابه المحور x الموجب."
              }
            ],
            "importantQuestions": [
              {
                "question": "كيف نمثل النقطة (120° ,2-)؟",
                "answer": "نتحرك بزاوية 120 درجة عكس عقارب الساعة، وبما أن r سالبة (-2)، نتحرك بالاتجاه المعاكس تماماً (امتداد الشعاع) بمسافة وحدتين، وهو ما يعادل تمثيل النقطة (300° ,2)."
              }
            ],
            "mcq": [
              {
                "question": "Which of the following polar coordinate pairs represents the same point as P(3, 45°)?",
                "options": [
                  "(-3, 225°)",
                  "(3, -315°)",
                  "(-3, -135°)",
                  "All of the above"
                ],
                "answerIndex": 3,
                "explanation": "(-3, 45°+180°) = (-3, 225°). (3, 45°-360°) = (3, -315°). (-3, 45°-180°) = (-3, -135°). All represent the same point."
              }
            ]
          },
          {
            "id": "8.2",
            "title": "8.2 التمثيلات البيانية للمعادلات القطبية (Graphs of Polar Equations)",
            "videoIds": [
              "A2ncxjczKos",
              "zUy1qvSUQZE"
            ],
            "pdfFile": {
              "name": "8.2 Graphs of Polar Equations (English)",
              "type": "شرح",
              "path": "8.2 Graphs of polar equations (English).pdf",
              "views": 935,
              "dateAdded": "2026-05-15"
            },
            "summary": "يركز هذا الدرس على رسم المنحنيات القطبية وتحليلها، مثل الدوائر، وخطوط مستقيمة تمر بالقطب، ومنحنيات الهليون (Limacons)، ومنحنيات الوردة (Rose Curves)، والمنحنيات الحلزونية (Cardioids). نتعلم كيفية اختبار التماثل حول المحور القطبي، القطب، والمستقيم θ = π/2.",
            "formulas": [
              {
                "title": "معادلة الدائرة القطبية مركزها القطب",
                "expression": "r = a",
                "explanation": "حيث a هو نصف قطر الدائرة."
              },
              {
                "title": "معادلة الخط المستقيم القطبي المار بالقطب",
                "expression": "θ = α",
                "explanation": "حيث α هي الزاوية الثابتة التي يصنعها الخط مع المحور القطبي."
              }
            ],
            "vocabulary": [
              {
                "word": "Cardioid",
                "translation": "المنحنى القلبي",
                "explanation": "منحنى قطبي على شكل قلب، معادلته r = a(1 ± cos θ)."
              },
              {
                "word": "Rose Curve",
                "translation": "منحنى الوردة",
                "explanation": "منحنى قطبي معادلته r = a cos(nθ) أو r = a sin(nθ). عدد بتلاته n إذا كان فردياً و 2n إذا كان n زوجياً."
              }
            ],
            "importantQuestions": [
              {
                "question": "ما عدد بتلات الوردة الممثلة بالمعادلة r = 4 sin(3θ)؟",
                "answer": "بما أن معامل الزاوية n=3 (فردي)، فإن عدد البتلات يساوي n، أي 3 بتلات."
              }
            ],
            "mcq": [
              {
                "question": "What is the graphical representation of the polar equation r = 5?",
                "options": [
                  "A straight line",
                  "A circle centered at the pole with radius 5",
                  "A cardioid curve",
                  "A rose curve with 5 petals"
                ],
                "answerIndex": 1,
                "explanation": "The equation r = c represents a circle centered at the pole (origin) with radius equal to c."
              }
            ]
          },
          {
            "id": "8.3",
            "title": "8.3 التحويل بين الصور القطبية والديكارتية (Polar & Rectangular Forms)",
            "videoIds": [
              "WwQnniQ3gSo",
              "-ww6uQrJ3ak"
            ],
            "pdfFile": {
              "name": "8.3 الصور القطبية والديكارتية",
              "type": "شرح",
              "path": "8_3_Polar_and_Rectangular_Forms_الصور_القطبية_و_الديكارتية.pdf",
              "views": 1045,
              "dateAdded": "2026-05-16"
            },
            "summary": "يتعلم الطالب في هذا الدرس كيفية التحويل الجبري للنقاط والمعادلات من النظام الديكارتي (x, y) إلى النظام القطبي (r, θ) والعكس، باستخدام العلاقات المثلثية الأساسية المشتقة من مثلث قائم الزاوية في المستوى.",
            "formulas": [
              {
                "title": "التحويل من قطبي إلى ديكارتي",
                "expression": "x = r cos θ  ,  y = r sin θ",
                "explanation": "لإيجاد الإحداثيات الديكارتية مباشرة بمعرفة r و θ."
              },
              {
                "title": "التحويل من ديكارتي إلى قطبي",
                "expression": "r^2 = x^2 + y^2  ,  tan θ = y / x",
                "explanation": "حيث r = √(x^2 + y^2) مع مراعاة الربع لتحديد θ بدقة."
              }
            ],
            "vocabulary": [
              {
                "word": "Rectangular Coordinates",
                "translation": "الإحداثيات الديكارتية / المتعمدة",
                "explanation": "تحديد النقطة ببعديها الأفقي x والرأسي y."
              }
            ],
            "importantQuestions": [
              {
                "question": "حول النقطة القطبية (4, π/6) إلى ديكارتية؟",
                "answer": "الخطوات:\nx = 4 cos(π/6) = 4 (√3/2) = 2√3\ny = 4 sin(π/6) = 4 (1/2) = 2\nإذن الإحداثيات الديكارتية هي (2 ,2√3)."
              }
            ],
            "mcq": [
              {
                "question": "What is the rectangular equation equivalent to the polar equation r = 4 csc θ?",
                "options": [
                  "y = 4",
                  "x = 4",
                  "x² + y² = 16",
                  "y = 4x"
                ],
                "answerIndex": 0,
                "explanation": "Since csc θ = 1/sin θ, we get r = 4/sin θ => r sin θ = 4. Since y = r sin θ, the equation is y = 4."
              }
            ]
          },
          {
            "id": "8.5",
            "title": "8.5 الأعداد المركبة ونظرية ديموافر (Complex Numbers & DeMoivre's Theorem)",
            "videoIds": [
              "BchatcrHsik"
            ],
            "pdfFile": {
              "name": "8.5 الأعداد المركبة ونظرية ديموافر",
              "type": "شرح",
              "path": "8_5_Complex_Numbers_and_DeMoivre s_Theorem_الاعداد_المركبة_و_نظر.pdf",
              "views": 1198,
              "dateAdded": "2026-05-17"
            },
            "summary": "يتناول هذا الدرس كتابة العدد المركب z = a + bi في الصورة القطبية z = r(cos θ + i sin θ)، ويشرح كيفية ضرب وقسمة الأعداد المركبة في صورتها القطبية، واستخدام نظرية ديموافر لإيجاد القوى (الأسس) والجذور النونية للأعداد المركبة.",
            "formulas": [
              {
                "title": "الصورة القطبية للعدد المركب z",
                "expression": "z = r(cos θ + i sin θ)",
                "explanation": "حيث r = √(a^2 + b^2) هو المقياس (absolute value)، و θ = tan^-1(b/a) هي السعة (argument)."
              },
              {
                "title": "ضرب عددين مركبين قطبياً",
                "expression": "z1 · z2 = r1·r2 [cos(θ1 + θ2) + i sin(θ1 + θ2)]",
                "explanation": "نضرب المقياسين ونجمع السعتين."
              },
              {
                "title": "نظرية ديموافر (القوى)",
                "expression": "z^n = r^n (cos nθ + i sin nθ)",
                "explanation": "تسهل حساب القوى الكبيرة للأعداد المركبة."
              }
            ],
            "vocabulary": [
              {
                "word": "Modulus",
                "translation": "المقياس",
                "explanation": "طول العدد المركب في مستوى أرجاند، ويرمز له بـ r."
              },
              {
                "word": "Argument",
                "translation": "السعة",
                "explanation": "الزاوية θ التي يصنعها العدد المركب مع المحور الحقيقي الموجب."
              }
            ],
            "importantQuestions": [
              {
                "question": "أوجد الجذور التكعيبية للواحد الصحيح؟",
                "answer": "توزع الجذور بالتساوي على دائرة الوحدة بزوايا تفصل بينها 120 درجة، وهي: 1، و -1/2 + √3/2 i، و -1/2 - √3/2 i."
              }
            ],
            "mcq": [
              {
                "question": "What is the modulus of the complex number z = 3 + 4i?",
                "options": [
                  "7",
                  "5",
                  "25",
                  "1"
                ],
                "answerIndex": 1,
                "explanation": "The modulus is r = √(a² + b²) = √(3² + 4²) = √25 = 5."
              }
            ]
          }
        ]
      },
      {
        "id": "ch9",
        "title": "Chapter 9 — Sequences & Series (المتتاليات والمتسلسلات)",
        "lessons": [
          {
            "id": "9.1",
            "title": "9.1 المتتاليات كدوال (Sequences as Functions)",
            "videoIds": [
              "ghEkgLKWRaY"
            ],
            "pdfFile": {
              "name": "9.1 Sequences as functions المتتاليات كدوال",
              "type": "شرح",
              "path": "9.1 Sequences as functions المتتاليات كدوال.pdf",
              "views": 643,
              "dateAdded": "2026-05-17"
            },
            "extraFiles": [
              {
                "name": "9.1 المتتاليات كدوال غير محلول",
                "type": "شرح",
                "path": "9_1_Sequences_as_functions_المتتاليات_كدوال_غير_محلول.pdf",
                "views": 231,
                "dateAdded": "2026-05-17"
              }
            ],
            "summary": "يقدم هذا الدرس المتتاليات كدوال مجالها مجموعة الأعداد الطبيعية، ويميز بين المتتاليات المنتهية وغير المنتهية، ويوضح تصنيف المتتاليات إلى حسابية (بين حدودها فرق مشترك) وهندسية (بين حدودها نسبة مشتركة) أو غير ذلك.",
            "mcq": [
              {
                "question": "What is the next term in the arithmetic sequence: 2, 5, 8, 11, ...?",
                "options": [
                  "14",
                  "13",
                  "12",
                  "15"
                ],
                "answerIndex": 0,
                "explanation": "The sequence is arithmetic with a common difference d = 3. The next term is 11 + 3 = 14."
              }
            ],
            "importantQuestions": []
          },
          {
            "id": "9.2",
            "title": "9.2 رمز المجموع والرموز الرياضية (Sigma Notation)",
            "videoIds": [
              "qYWcS_RdnGs"
            ],
            "pdfFile": {
              "name": "9.2 Sequences, Series, and Sigma Notation",
              "type": "شرح",
              "path": "9_2_Sequences,_Series,_and_Sigma_Notation_المتتاليات_و_المتسلسلا.pdf",
              "views": 876,
              "dateAdded": "2026-05-18"
            },
            "extraFiles": [
              {
                "name": "9.2 Sequences, Series, and Sigma Notation (2)",
                "type": "شرح",
                "path": "9_2_Sequences,_Series,_and_Sigma_Notation_المتتاليات_و_المتسلسلا (2).pdf",
                "views": 421,
                "dateAdded": "2026-05-18"
              }
            ],
            "summary": "يتعلم الطالب في هذا الدرس كيفية كتابة المتسلسلات (مجموع حدود متتالية) باختصار باستخدام الحرف اليوناني سيغما (Σ)، وكيفية حساب قيمة المتسلسلة بفك هذا الرمز وتطبيق الخواص الجبرية للمجموع.",
            "formulas": [
              {
                "title": "رمز المجموع سيغما",
                "expression": "∑ (from k=1 to n) a_k",
                "explanation": "يعني جمع الحدود من الحد الأول a1 إلى الحد النوني an تعويضاً عن k."
              }
            ],
            "mcq": [
              {
                "question": "What is the value of the sum from k=1 to 4 of (2k - 1)?",
                "options": [
                  "16",
                  "8",
                  "12",
                  "15"
                ],
                "answerIndex": 0,
                "explanation": "Expanding the sum: (2(1)-1) + (2(2)-1) + (2(3)-1) + (2(4)-1) = 1 + 3 + 5 + 7 = 16."
              }
            ],
            "importantQuestions": []
          },
          {
            "id": "9.3",
            "title": "9.3 المتتاليات والمتسلسلات الحسابية (Arithmetic Sequences & Series)",
            "videoIds": [
              "mqGahBiabVk"
            ],
            "pdfFile": {
              "name": "9.3 Arithmetic Sequences and Series",
              "type": "شرح",
              "path": "9_3_Arithmetic_Sequences_and_Series_المتتاليات_و_المتسلسلات_الحس.pdf",
              "views": 981,
              "dateAdded": "2026-05-19"
            },
            "summary": "يتناول هذا الدرس بالتفصيل إيجاد الصيغة العامة للحد النوني في المتتالية الحسابية، وإيجاد الأوساط الحسابية بين حدين، وقوانين إيجاد مجموع الحدود الأولى n في متسلسلة حسابية.",
            "formulas": [
              {
                "title": "الحد النوني لمتتالية حسابية",
                "expression": "a_n = a_1 + (n - 1)d",
                "explanation": "حيث a1 هو الحد الأول، و d هو الفرق المشترك."
              },
              {
                "title": "مجموع متسلسلة حسابية منتهية",
                "expression": "S_n = (n/2)(a_1 + a_n)  أو  S_n = (n/2)[2a_1 + (n-1)d]",
                "explanation": "حيث Sn هو مجموع أول n من الحدود."
              }
            ],
            "mcq": [
              {
                "question": "An arithmetic sequence has a first term a1 = 5 and a common difference d = 3. What is its 10th term?",
                "options": [
                  "32",
                  "35",
                  "29",
                  "38"
                ],
                "answerIndex": 0,
                "explanation": "Using an = a1 + (n - 1)d, we get a10 = 5 + (10 - 1)(3) = 5 + 27 = 32."
              }
            ],
            "importantQuestions": []
          },
          {
            "id": "9.4",
            "title": "9.4 المتتاليات والمتسلسلات الهندسية (Geometric Sequences & Series)",
            "videoIds": [
              "aOh2OtMM9Vk"
            ],
            "pdfFile": {
              "name": "9.4 Geometric Sequences and Series",
              "type": "شرح",
              "path": "9_4_Geometric_Sequences_and_Series_المتتاليات_و_المتسلسلات_الهند.pdf",
              "views": 894,
              "dateAdded": "2026-05-20"
            },
            "summary": "يتناول هذا الدرس المتتالية الهندسية التي تنشأ بضرب كل حد في عدد ثابت يسمى النسبة المشتركة (الأساس r). نتعلم صيغة الحد النوني، الأوساط الهندسية، وحساب مجموع متسلسلة هندسية منتهية.",
            "formulas": [
              {
                "title": "الحد النوني لمتتالية هندسية",
                "expression": "a_n = a_1 · r^(n - 1)",
                "explanation": "حيث r هو النسبة المشتركة (الأساس)."
              },
              {
                "title": "مجموع متسلسلة هندسية منتهية",
                "expression": "S_n = a_1(1 - r^n) / (1 - r)",
                "explanation": "شرط ألا يكون r مساوياً للواحد الصحيح."
              }
            ],
            "mcq": [
              {
                "question": "What is the common ratio r for the geometric sequence: 3, 6, 12, 24, ...?",
                "options": [
                  "2",
                  "3",
                  "6",
                  "12"
                ],
                "answerIndex": 0,
                "explanation": "The common ratio r is obtained by dividing any term by the previous term: 6 / 3 = 2."
              }
            ],
            "importantQuestions": []
          },
          {
            "id": "9.5",
            "title": "9.5 المتسلسلات الهندسية اللانهائية (Infinite Geometric Series)",
            "videoIds": [
              "N27Livepj1I"
            ],
            "pdfFile": {
              "name": "9.5 Infinite Geometric Series",
              "type": "شرح",
              "path": "9_5_Infinite_Geometric_Series_المتسلسلات_الهندسية_اللانهائية.pdf",
              "views": 978,
              "dateAdded": "2026-05-21"
            },
            "summary": "يناقش هذا الدرس تقارب وتباعد المتسلسلات الهندسية اللانهائية. إذا كانت القيمة المطلقة للأساس |r| أقل من 1 فإن المتسلسلة متقاربة ولها مجموع محدد، أما إذا كانت |r| أكبر من أو تساوي 1 فإنها متباعدة وليس لها مجموع.",
            "formulas": [
              {
                "title": "مجموع متسلسلة هندسية لانهائية متقاربة",
                "expression": "S = a_1 / (1 - r)",
                "explanation": "يستخدم هذا القانون فقط عندما يكون |r| < 1 لجمع عدد لا نهائي من الحدود."
              }
            ],
            "mcq": [
              {
                "question": "Which of the following infinite geometric series is convergent?",
                "options": [
                  "3 + 6 + 12 + ...",
                  "10 + 5 + 2.5 + ...",
                  "1 - 2 + 4 - ...",
                  "5 + 10 + 20 + ..."
                ],
                "answerIndex": 1,
                "explanation": "In the second series, r = 5/10 = 0.5. Since |r| < 1, the series converges."
              }
            ],
            "importantQuestions": []
          },
          {
            "id": "9.6",
            "title": "9.6 التكرار والاستقراء الرياضي (Recursion & Iteration)",
            "videoIds": [
              "LflTbygbfc4"
            ],
            "pdfFile": {
              "name": "9.6 Recursion and Iteration التكرار والإعادة",
              "type": "شرح",
              "path": "9.6 Recursion and Iteration التكرار والإعادة.pdf",
              "views": 567,
              "dateAdded": "2026-05-22"
            },
            "summary": "يتناول هذا الدرس المتتاليات المعرفة تكرارياً، حيث يعتمد حساب كل حد جديد على الحد أو الحدود السابقة له مباشرة (مثل متتالية فيبوناتشي). كما يعرض كيفية إثبات النظريات والقوانين الرياضية باستخدام مبدأ الاستقراء الرياضي بالخطوات الثلاث.",
            "mcq": [
              {
                "question": "If a sequence is defined recursively by a1 = 3 and an = 2a_{n-1} + 1, what is the value of the second term a2?",
                "options": [
                  "7",
                  "6",
                  "8",
                  "5"
                ],
                "answerIndex": 0,
                "explanation": "a2 = 2 · a1 + 1 = 2(3) + 1 = 7."
              }
            ],
            "importantQuestions": []
          },
          {
            "id": "9.7",
            "title": "9.7 نظرية ذات الحدين (Binomial Theorem)",
            "videoIds": [],
            "pdfFile": {
              "name": "9.7 Binomial Theorem نظرية ذات الحدين",
              "type": "شرح",
              "path": "9.7 Binomial theorem  نظرية ذات الحدين.pdf",
              "views": 902,
              "dateAdded": "2026-05-23"
            },
            "summary": "يشرح هذا الدرس كيفية فك المقادير ذات الحدين المرفوعة لقوى صحيحة موجبة (x + y)^n باستخدام التوافيق (Combinations) ومثلث باسكال، بالإضافة إلى كيفية إيجاد حد معين بعينه دون الحاجة لفك المقدار بالكامل.",
            "formulas": [
              {
                "title": "مفكوك ذات الحدين (Binomial Theorem)",
                "expression": "(x + y)^n = ∑ (from k=0 to n) nCk · x^(n-k) · y^k",
                "explanation": "حيث nCk تمثل التوافيق وتساوي n! / (k!(n-k)!)."
              },
              {
                "title": "صيغة الحد رقم (r + 1)",
                "expression": "T_{r+1} = nCr · x^(n-r) · y^r",
                "explanation": "تستخدم لإيجاد حد معين مباشرة."
              }
            ],
            "mcq": [
              {
                "question": "How many terms are produced in the expansion of (x + y)⁵?",
                "options": [
                  "5",
                  "6",
                  "10",
                  "25"
                ],
                "answerIndex": 1,
                "explanation": "The number of terms in a binomial expansion is always n + 1, where n is the exponent. Thus, 5 + 1 = 6 terms."
              }
            ],
            "importantQuestions": []
          }
        ]
      }
    ],
    "track": "inspire"
  },
  {
    "id": "physics",
    "name": "الفيزياء (Inspire)",
    "emoji": "⚡",
    "color": "amber",
    "generalFiles": [
      {
        "name": "ملزمة مراجعة الفيزياء للصف الحادي عشر متقدم أول",
        "type": "مراجعة",
        "path": "صف ١١ متقدم أول ملزمة مراجعة (1).pdf",
        "views": 1202,
        "dateAdded": "2026-05-15"
      }
    ],
    "chapters": [
      {
        "id": "rotational_motion",
        "title": "الحركة الدورانية (Rotational Motion)",
        "lessons": [
          {
            "id": "rot_motion_desc",
            "title": "وصف الحركة الدورانية وقياسها",
            "videoIds": [
              "wV7jP1R2p8o"
            ],
            "pdfFile": {
              "name": "Physics Made Easy Rotational Motion",
              "type": "شرح",
              "path": "Rotational motion.pdf",
              "views": 890,
              "dateAdded": "2026-05-02"
            },
            "extraFiles": [
              {
                "name": "Rotational motion ,,,,,",
                "type": "مراجعة",
                "path": "Rotational motion ,,,,,.pdf",
                "views": 1354,
                "dateAdded": "2026-05-03"
              },
              {
                "name": "Rotational Motion (1- Describing Rotational Motion)",
                "type": "شرح",
                "path": "Rotational Motion (1- Describing Rotational Motion ).pdf",
                "views": 421,
                "dateAdded": "2026-05-04"
              },
              {
                "name": "Rotational Motion 26",
                "type": "مراجعة",
                "path": "Rotational Motion 26.pdf",
                "views": 562,
                "dateAdded": "2026-05-05"
              }
            ],
            "summary": "",
            "mcq": [
              {
                "question": "One complete revolution corresponds to how many radians?",
                "options": [
                  "π",
                  "2π",
                  "180°",
                  "360°"
                ],
                "answerIndex": 1,
                "explanation": "A full circle is 360 degrees, which is equal to 2π radians."
              }
            ],
            "importantQuestions": []
          }
        ]
      },
      {
        "id": "rotational_dynamics",
        "title": "ديناميكا الحركة الدورانية (Rotational Dynamics)",
        "lessons": [
          {
            "id": "torque",
            "title": "العزم وقصور الذات الذاتي الدوراني",
            "videoIds": [
              "dQw4w9WgXcQ"
            ],
            "pdfFile": {
              "name": "Rotational Dynamics",
              "type": "شرح",
              "path": "Rotational dynamics.pdf",
              "views": 651,
              "dateAdded": "2026-05-12"
            },
            "extraFiles": [
              {
                "name": "Part 1 Rotational Dynamics",
                "type": "شرح",
                "path": "Part 1Rotational Dynamics.pdf",
                "views": 321,
                "dateAdded": "2026-05-12"
              }
            ],
            "summary": "",
            "mcq": [
              {
                "question": "To obtain the maximum torque, the force should be applied at an angle of:",
                "options": [
                  "0°",
                  "45°",
                  "90°",
                  "185°"
                ],
                "answerIndex": 2,
                "explanation": "Torque is proportional to sin θ. Since sin 90° = 1 (the maximum value of sin), a perpendicular force of 90° yields maximum torque."
              }
            ],
            "importantQuestions": []
          }
        ]
      },
      {
        "id": "momentum",
        "title": "الزخم وحفظه (Momentum)",
        "lessons": [
          {
            "id": "momentum_lesson",
            "title": "الزخم الخطي والتصادمات",
            "videoIds": [
              "wV7jP1R2p8o"
            ],
            "pdfFile": {
              "name": "MOMENTUM",
              "type": "شرح",
              "path": "MOMENTUM.pdf",
              "views": 1104,
              "dateAdded": "2026-05-14"
            },
            "summary": "",
            "mcq": [
              {
                "question": "A body of mass 2 kg moves at a speed of 5 m/s. What is its linear momentum?",
                "options": [
                  "10 kg·m/s",
                  "2.5 kg·m/s",
                  "0.4 kg·m/s",
                  "20 kg·m/s"
                ],
                "answerIndex": 0,
                "explanation": "Momentum p = m · v = 2 kg · 5 m/s = 10 kg·m/s."
              }
            ],
            "importantQuestions": []
          }
        ]
      },
      {
        "id": "impulse",
        "title": "الدفع (Impulse)",
        "lessons": [
          {
            "id": "impulse_lesson",
            "title": "الدفع ونظرية الدفع-الزخم",
            "videoIds": [
              "f4O_jD0pCks"
            ],
            "pdfFile": {
              "name": "1-Impulse and Momentum (part 1 )",
              "type": "شرح",
              "path": "1-Impulse and Momentum (part 1 ).pdf",
              "views": 765,
              "dateAdded": "2026-05-15"
            },
            "extraFiles": [
              {
                "name": "1-Impulse and Momentum (part 2 )",
                "type": "شرح",
                "path": "1-Impulse and Momentum (part 2 ).pdf",
                "views": 320,
                "dateAdded": "2026-05-15"
              }
            ],
            "summary": "",
            "mcq": [
              {
                "question": "Why are modern cars designed with crumple zones in their front?",
                "options": [
                  "To increase collision time and reduce the impact force",
                  "To decrease collision time and increase the force",
                  "To reduce the car's weight",
                  "To improve aesthetic appearance"
                ],
                "answerIndex": 0,
                "explanation": "Increasing the collision time interval Δt reduces the average impact force F for the same change in momentum, protecting the passengers."
              }
            ],
            "importantQuestions": []
          }
        ]
      },
      {
        "id": "reflection_refraction",
        "title": "الانعكاس والانكسار (Reflection & Refraction)",
        "lessons": [
          {
            "id": "optics",
            "title": "البصريات وانكسار الضوء",
            "videoIds": [
              "dQw4w9WgXcQ"
            ],
            "pdfFile": {
              "name": "Module 16 Reflection and Refraction 10adv",
              "type": "شرح",
              "path": "Module 16 Reflection and Refraction 10adv.pdf",
              "views": 887,
              "dateAdded": "2026-05-16"
            },
            "summary": "",
            "mcq": [
              {
                "question": "When light travels from a medium with a lower refractive index (air) to a medium with a higher refractive index (glass), it bends:",
                "options": [
                  "Towards the normal",
                  "Away from the normal",
                  "Without any deviation",
                  "At an angle of 90 degrees"
                ],
                "answerIndex": 0,
                "explanation": "According to Snell's law, entering a denser medium (higher refractive index) slows down the light, bending it closer to the normal (θ2 < θ1)."
              }
            ],
            "importantQuestions": []
          }
        ]
      },
      {
        "id": "equilibrium",
        "title": "الاتزان (Equilibrium)",
        "lessons": [
          {
            "id": "equilibrium_lesson",
            "title": "شروط الاتزان الميكانيكي",
            "videoIds": [
              "wV7jP1R2p8o"
            ],
            "pdfFile": {
              "name": "Equilibrium Sec3 2026 11ADV SOLVED",
              "type": "شرح",
              "path": "Equilibrium Sec3 2026 11ADV SOLVED.pdf",
              "views": 987,
              "dateAdded": "2026-05-18"
            },
            "summary": "",
            "mcq": [
              {
                "question": "For a body to be in complete mechanical equilibrium, which condition(s) must be satisfied?",
                "options": [
                  "First condition only (net force = 0)",
                  "Second condition only (net torque = 0)",
                  "Both first and second conditions together",
                  "That it moves at the speed of light"
                ],
                "answerIndex": 2,
                "explanation": "Complete mechanical equilibrium requires both translational equilibrium (net force = 0) and rotational equilibrium (net torque = 0)."
              }
            ],
            "importantQuestions": []
          }
        ]
      }
    ],
    "track": "inspire"
  },
  {
    "id": "islamic",
    "name": "التربية الإسلامية",
    "emoji": "🕌",
    "color": "blue",
    "generalFiles": [
      {
        "name": "هيكل التربية الإسلامية للفصل الدراسي الثالث 2026",
        "type": "هيكل",
        "path": "هيكل_اختبار_الصف_الحادي_عشر_الفصل_الدراسي_الثالث_2025_2026م.pdf",
        "views": 1654,
        "dateAdded": "2026-05-18"
      },
      {
        "name": "ملخص أحكام التجويد للصف الحادي عشر",
        "type": "مراجعة",
        "path": "ملخص أحكام التجويد.pdf",
        "views": 1876,
        "dateAdded": "2026-05-19"
      },
      {
        "name": "تجميعات التربية الإسلامية 1_2_merged",
        "type": "مراجعة",
        "path": "1_2_merged.pdf",
        "views": 980,
        "dateAdded": "2026-05-20"
      },
      {
        "name": "تجميعة أسئلة إسلامية 1686833401",
        "type": "مراجعة",
        "path": "1686833401.pdf",
        "views": 421,
        "dateAdded": "2026-05-21"
      },
      {
        "name": "تجميعة أسئلة إسلامية 1748948954",
        "type": "مراجعة",
        "path": "1748948954.pdf",
        "views": 320,
        "dateAdded": "2026-05-22"
      }
    ],
    "chapters": [
      {
        "id": "lessons",
        "title": "دروس الفصل الدراسي الثالث",
        "lessons": [
          {
            "id": "lesson35",
            "title": "درس 35: رسول الله صلى الله عليه وسلم وخاتم النبيين (سورة الأحزاب)",
            "videoIds": [
              "r4VxYwi4q1c"
            ],
            "pdfFile": {
              "name": "درس 35: سورة الأحزاب",
              "type": "شرح",
              "path": "_٣٥_رسول_الله_صلى_الله_عليه_وسلم_وخاتم_النبيين_سورة_الأحزاب_.pdf",
              "views": 954,
              "dateAdded": "2026-05-02"
            },
            "summary": "",
            "mcq": [
              {
                "question": "ما دلالة قوله تعالى: {مَّا كَانَ مُحَمَّدٌ أَبَا أَحَدٍ مِّن رِّجَالِكُمْ وَلَكِن رَّسُولَ اللَّهِ وَخَاتَمَ النَّبِيِّينَ}؟",
                "options": [
                  "إلغاء التبني والتأكيد على ختم النبوة",
                  "التشجيع على التبني",
                  "إيجاب الهجرة إلى المدينة",
                  "إثبات بنوة زيد للرسول"
                ],
                "answerIndex": 0,
                "explanation": "الآية الكريمة نزلت لتلغي عادة التبني الجاهلية (بسبب قضية زيد بن حارثة) ولتؤكد أن محمداً صلى الله عليه وسلم هو رسول الله وخاتم الأنبياء."
              }
            ],
            "importantQuestions": []
          },
          {
            "id": "lesson36",
            "title": "درس 36: أحكام وآداب بيت النبوة (سورة الأحزاب)",
            "videoIds": [
              "Kuy8MvtUkYY"
            ],
            "pdfFile": {
              "name": "درس 36: أحكام وآداب بيت النبوة",
              "type": "شرح",
              "path": "_٣٦_أحكام_وآداب_بيت_النبوة_سورة_الأحزاب.pdf",
              "views": 874,
              "dateAdded": "2026-05-03"
            },
            "summary": "",
            "mcq": [
              {
                "question": "تسمى زوجات النبي صلى الله عليه وسلم بـ:",
                "options": [
                  "أمهات المؤمنين",
                  "بنات الرسول",
                  "حاضنات الرسالة",
                  "سيدات مكة"
                ],
                "answerIndex": 0,
                "explanation": "لقب زوجات النبي صلى الله عليه وسلم بنص القرآن الكريم هو أمهات المؤمنين في الحرمة والتقدير."
              }
            ],
            "importantQuestions": []
          },
          {
            "id": "lesson37",
            "title": "درس 37: الإنصاف في الإسلام",
            "videoIds": [
              "KPtV4Qwz24Y"
            ],
            "pdfFile": {
              "name": "درس 37: الإنصاف في الإسلام",
              "type": "شرح",
              "path": "٣٧.  الإنصاف في الإسلام.pdf",
              "views": 762,
              "dateAdded": "2026-05-04"
            },
            "summary": "",
            "mcq": [
              {
                "question": "معنى الإنصاف في الإسلام هو:",
                "options": [
                  "العدل وإعطاء كل ذي حق حقه دون محاباة",
                  "التغاضي عن الأخطاء دائماً",
                  "الانحياز للأقارب فقط",
                  "مساواة الصالح بالفاسد"
                ],
                "answerIndex": 0,
                "explanation": "الإنصاف هو إعطاء الحقوق والعدالة التامة وتجنب الظلم والمحاباة."
              }
            ],
            "importantQuestions": []
          },
          {
            "id": "lesson_prohibited_women",
            "title": "درس: المحرمات من النساء",
            "videoIds": [
              "-w9BxuSZK98"
            ],
            "pdfFile": {
              "name": "درس: المحرمات من النساء",
              "type": "شرح",
              "path": "41. المحرمات من النساء.pdf",
              "views": 541,
              "dateAdded": "2026-05-10"
            },
            "summary": "",
            "mcq": [
              {
                "question": "من المحرمات حرمة مؤبدة بسبب النسب:",
                "options": [
                  "الأم والأخت والبنت",
                  "زوجة الأخ",
                  "أخت الزوجة",
                  "المرأة المعتدة"
                ],
                "answerIndex": 0,
                "explanation": "الأم والأخت والبنت وبنات الأخ وبنات الأخت والعمات والخالات هن من المحرمات حرمة مؤبدة بسبب النسب."
              }
            ],
            "importantQuestions": []
          },
          {
            "id": "lesson39",
            "title": "درس 39: من معالم رحمة الرسول صلى الله عليه وسلم والبيئة والتنمية المستدامة",
            "videoIds": [
              "dhQrr9WC4Zo"
            ],
            "pdfFile": {
              "name": "درس 39: الأمن المائي والغذائي والتنمية المستدامة",
              "type": "شرح",
              "path": "الأمن المائي والغذائي والتنمية المستدامة — الإمارات.pdf",
              "views": 1324,
              "dateAdded": "2026-05-05"
            },
            "extraFiles": [
              {
                "name": "درس 39: من معالم رحمة الرسول",
                "type": "شرح",
                "path": "_٣٩_من_معالم_رحمة_الرسول_صلى_الله_عليه_وسلم.pdf",
                "views": 980,
                "dateAdded": "2026-05-05"
              }
            ],
            "summary": "",
            "mcq": [
              {
                "question": "ما حكم إهدار المياه والإسراف فيها في الإسلام؟",
                "options": [
                  "محرم ومنهي عنه شرعاً",
                  "مكروه فقط",
                  "مباح للجميع",
                  "مستحب عند الوفرة"
                ],
                "answerIndex": 0,
                "explanation": "الإسراف في المياه محرم ومنهي عنه بنصوص صريحة، والماء ملك عام وحفظه واجب ديني للمحافظة على الحياة والتنمية المستدامة."
              }
            ],
            "importantQuestions": []
          },
          {
            "id": "lesson41",
            "title": "درس 41: ضوابط اجتماعية (سورة الأحزاب)",
            "videoIds": [
              "MSYXr1F31Co"
            ],
            "pdfFile": {
              "name": "درس 41: ضوابط اجتماعية سورة الأحزاب",
              "type": "شرح",
              "path": "_٤١_ضوابط_اجتماعية_سورة_الأحزاب_.pdf",
              "views": 651,
              "dateAdded": "2026-05-06"
            },
            "summary": "",
            "mcq": [
              {
                "question": "حاربت سورة الأحزاب الشائعات في المجتمع، وتوعدت الذين يرجفون في المدينة بـ:",
                "options": [
                  "الطرد والنفي واللعن إن لم ينتهوا",
                  "الغرامة المالية",
                  "السجن المؤبد",
                  "التجاهل التام"
                ],
                "answerIndex": 0,
                "explanation": "القرآن الكريم توعد المنافقين والمرجفين بالطرد واللعن في قوله تعالى: {لَّئِن لَّمْ يَنتَهِ الْمُنَافِقُونَ وَالَّذِينَ فِي قُلُوبِهِم مَّرَضٌ وَالْمُرْجِفُونَ فِي الْمَدِينَةِ...}."
              }
            ],
            "importantQuestions": []
          },
          {
            "id": "lesson42",
            "title": "درس 42: الإنسان والأمانة (سورة الأحزاب)",
            "videoIds": [
              "c9HnQ3xaH5c"
            ],
            "pdfFile": {
              "name": "درس 42: الإنسان والأمانة سورة الأحزاب",
              "type": "شرح",
              "path": "_٤٢_الإنسان_والأمانة_سورة_الأحزاب.pdf",
              "views": 987,
              "dateAdded": "2026-05-07"
            },
            "summary": "",
            "mcq": [
              {
                "question": "ما هي الأمانة التي حملها الإنسان وأشفقت منها السماوات والأرض والجبال؟",
                "options": [
                  "التكليف وحرية الاختيار والمسؤولية",
                  "الكنوز والذهب",
                  "عمارة الأرض بالطوب",
                  "السفر عبر الفضاء"
                ],
                "answerIndex": 0,
                "explanation": "الأمانة هي عهد الله والتكليف والفرائض والمسؤولية والوعي وحرية الاختيار التي ميزت الإنسان."
              }
            ],
            "importantQuestions": []
          }
        ]
      }
    ],
    "track": "inspire"
  },
  {
    "id": "english",
    "name": "اللغة الإنجليزية (Inspire)",
    "emoji": "🇬🇧",
    "color": "indigo",
    "generalFiles": [
      {
        "name": "Grade 11 ADV English Revision Booklet",
        "type": "مراجعة",
        "path": "Revision booklet 11 Adv.pdf",
        "views": 1549,
        "dateAdded": "2026-05-18"
      },
      {
        "name": "Grade 11 ADV English General MAZE EOT",
        "type": "مراجعة",
        "path": "T3-2024-2025-G11 General MAZE.pdf",
        "views": 987,
        "dateAdded": "2026-05-19"
      },
      {
        "name": "Grade 11 ADV English Vocabulary Lists",
        "type": "مراجعة",
        "path": "Vocabulary- 11 Adv.pdf",
        "views": 1205,
        "dateAdded": "2026-05-20"
      },
      {
        "name": "Listening and Speaking Vocabulary lists",
        "type": "مراجعة",
        "path": "Words_Grade_11_ADV_ 12G_Chapter_5_Term_3_Listening_ _Speaking.pdf",
        "views": 654,
        "dateAdded": "2026-05-21"
      },
      {
        "name": "Grammar Exam Links (ملفات قواعد)",
        "type": "مراجعة",
        "path": "exam_links_grammar.pdf",
        "views": 12,
        "dateAdded": "2026-05-24"
      }
    ],
    "chapters": [
      {
        "id": "skills",
        "title": "English Term 3 Core Skills",
        "lessons": [
          {
            "id": "vocab_skill",
            "title": "Vocabulary",
            "videoIds": [
              "S5KIq_nSBqo"
            ],
            "pdfFile": {
              "name": "Grade 11 ADV English Vocabulary Lists",
              "type": "شرح",
              "path": "Vocabulary- 11 Adv.pdf",
              "views": 874,
              "dateAdded": "2026-05-02"
            },
            "summary": "This unit focuses on mastering the core academic vocabulary required for G11 ADV Term 3. It includes lexical fields related to global economics, technological innovations, ecosystems, and personal growth.",
            "vocabulary": [
              {
                "word": "Sustainability",
                "translation": "Eco-friendly",
                "explanation": "Meeting present needs without compromising future generations."
              },
              {
                "word": "Innovation",
                "translation": "Creative breakthrough",
                "explanation": "The introduction of new ideas, devices, or methods."
              },
              {
                "word": "Precipitation",
                "translation": "Rainfall/Snowfall",
                "explanation": "Rain, snow, sleet, or hail that falls to the ground."
              }
            ],
            "mcq": [
              {
                "question": "Choose the correct word: Solar power is a ______ source of energy.",
                "options": [
                  "depletable",
                  "sustainable",
                  "harmful",
                  "temporary"
                ],
                "answerIndex": 1,
                "explanation": "Solar energy is sustainable because it is renewable and doesn't run out."
              }
            ],
            "importantQuestions": []
          },
          {
            "id": "maze_skill",
            "title": "MAZE Practices",
            "videoIds": [
              "MfuoJzXflxI"
            ],
            "pdfFile": {
              "name": "English Maze Practice 1",
              "type": "مراجعة",
              "path": "English Maze Practice 1.pdf",
              "views": 984,
              "dateAdded": "2026-05-03"
            },
            "extraFiles": [
              {
                "name": "English Maze Practice 1 - Answers",
                "type": "مراجعة",
                "path": "English Maze Practice 1 - Answers.pdf",
                "views": 654,
                "dateAdded": "2026-05-03"
              },
              {
                "name": "English Maze Practice 2",
                "type": "مراجعة",
                "path": "English Maze Practice 2.pdf",
                "views": 567,
                "dateAdded": "2026-05-04"
              },
              {
                "name": "English Maze Practice 2 - Answers",
                "type": "مراجعة",
                "path": "English Maze Practice 2 - Answers (1).pdf",
                "views": 431,
                "dateAdded": "2026-05-04"
              },
              {
                "name": "English Maze Practice 3",
                "type": "مراجعة",
                "path": "English Maze Practice 3.pdf",
                "views": 671,
                "dateAdded": "2026-05-05"
              },
              {
                "name": "English Maze Practice 3 - Answers",
                "type": "مراجعة",
                "path": "English Maze Practice 3 - Answers.pdf",
                "views": 549,
                "dateAdded": "2026-05-05"
              }
            ],
            "summary": "Maze tasks test your understanding of grammar, spelling, and vocabulary in context. You read a text and choose the correct word among three choices for each blank. These practices are designed to mimic MOE standard exams.",
            "mcq": [
              {
                "question": "Complete the sentence: While she (was studying / studied / is studying) for her exam yesterday, the lights went out.",
                "options": [
                  "studied",
                  "was studying",
                  "is studying",
                  "studies"
                ],
                "answerIndex": 1,
                "explanation": "'While' is used for an ongoing action interrupted by a shorter action. Hence, Past Continuous 'was studying' is correct."
              }
            ],
            "importantQuestions": []
          },
          {
            "id": "reading_skill",
            "title": "Reading",
            "videoIds": [
              "dQw4w9WgXcQ"
            ],
            "pdfFile": {
              "name": "Reading Text: Follow Your Heart",
              "type": "شرح",
              "path": "Follow your heart Text with model answers.pdf",
              "views": 1104,
              "dateAdded": "2026-05-04"
            },
            "extraFiles": [
              {
                "name": "Reading Text: Follow Your Heart (2)",
                "type": "شرح",
                "path": "Follow your heart Text with model answers (2).pdf",
                "views": 320,
                "dateAdded": "2026-05-04"
              },
              {
                "name": "Reading Maze Exam Paper",
                "type": "امتحان",
                "path": "Reading   Maze Exam.pdf",
                "views": 764,
                "dateAdded": "2026-05-05"
              }
            ],
            "summary": "Practices reading comprehension skills including scanning for details, skimming for main ideas, inferring author's attitude, and contextual meaning of advanced words. The core text is 'Follow Your Heart' which details vocational journeys and choice.",
            "mcq": [
              {
                "question": "What does the idiom 'follow your heart' mean in a career context?",
                "options": [
                  "Do what you love and are passionate about",
                  "Apply only for the highest paying job",
                  "Let someone else choose for you",
                  "Avoid making any tough choices"
                ],
                "answerIndex": 0,
                "explanation": "Following your heart means choosing a career path based on personal passion and interest rather than purely external incentives."
              }
            ],
            "importantQuestions": []
          }
        ]
      }
    ],
    "track": "inspire"
  },
  {
    "id": "biology",
    "name": "الأحياء (Inspire)",
    "emoji": "🧬",
    "color": "teal",
    "generalFiles": [
      {
        "name": "هيكل الأحياء الرسمي للفصل الثالث 2026",
        "type": "هيكل",
        "path": "EoT3_Coverage_G11_ADV_Bio_INS_T3_ 2025-2026.pdf",
        "views": 2451,
        "dateAdded": "2026-05-19"
      },
      {
        "name": "أحياء مراجعة شاملة وأسئلة سنوات سابقة",
        "type": "مراجعة",
        "path": "احياء_مراجعة_شاملة_اسيلة_سنوات_سابقة_ف_3_احياء.pdf",
        "views": 1541,
        "dateAdded": "2026-05-20"
      },
      {
        "name": "أسئلة وزارية متميزة - وحدة المناعة",
        "type": "مراجعة",
        "path": "اسيلة وزارية وحدة المناعة.pdf",
        "views": 874,
        "dateAdded": "2026-05-21"
      }
    ],
    "chapters": [
      {
        "id": "bio_term3",
        "title": "منهج ومراجعات الأحياء الفصل الثالث",
        "lessons": [
          {
            "id": "infectious_diseases",
            "title": "الأمراض المعدية والجراثيم (Infectious Diseases)",
            "videoIds": [
              "Jx6o8H-HW1E",
              "lobHqw26i4E"
            ],
            "pdfFile": {
              "name": "Infectious Diseases Booklet",
              "type": "شرح",
              "path": "Infectious Diseases.pdf",
              "views": 654,
              "dateAdded": "2026-05-02"
            },
            "extraFiles": [
              {
                "name": "Infectious Diseases Booklet (2)",
                "type": "شرح",
                "path": "Infectious Diseases (2).pdf",
                "views": 211,
                "dateAdded": "2026-05-02"
              },
              {
                "name": "Infectious Diseases Booklet (3)",
                "type": "شرح",
                "path": "Infectious Diseases (3).pdf",
                "views": 198,
                "dateAdded": "2026-05-02"
              }
            ],
            "summary": "يركز هذا الدرس على مسببات الأمراض المعدية (الفيروسات، البكتيريا، الفطريات، الطفيليات) وكيفية انتقالها، بالإضافة إلى فرضيات كوخ الأربعة الشهيرة التي تستخدم لتحديد المسبب الرئيسي للمرض المعدي.",
            "vocabulary": [
              {
                "word": "Pathogen",
                "translation": "مسبب المرض",
                "explanation": "كائن مجهري مثل الفيروس أو البكتيريا يسبب المرض للعائل."
              }
            ],
            "mcq": [
              {
                "question": "What is the first postulate of Koch's postulates?",
                "options": [
                  "The suspected pathogen must be isolated from the host in every case",
                  "The pathogen must be grown in a pure culture",
                  "The pathogen must cause the disease when injected into a healthy host",
                  "The same pathogen must be isolated again from the newly diseased host"
                ],
                "answerIndex": 0,
                "explanation": "Koch's first postulate is that the suspected pathogen must be present in every case of the disease and isolated from the host."
              }
            ],
            "importantQuestions": []
          },
          {
            "id": "immune_system",
            "title": "جهاز المناعة والدفاع (The Immune System)",
            "videoIds": [
              "Yn0PseLE6g0",
              "vpCfqtXloOQ",
              "WepH_gX8XoU"
            ],
            "pdfFile": {
              "name": "The Immune System Booklet",
              "type": "شرح",
              "path": "The immune system.pdf",
              "views": 876,
              "dateAdded": "2026-05-03"
            },
            "extraFiles": [
              {
                "name": "The Immune System Booklet (2)",
                "type": "شرح",
                "path": "The Immune System (2).pdf",
                "views": 321,
                "dateAdded": "2026-05-03"
              }
            ],
            "summary": "يدرس هذا الدرس خطوط الدفاع في جسم الإنسان، بما في ذلك المناعة غير المتخصصة (الجلد، الإفرازات، الخلايا الأكولة) والمناعة المتخصصة (الخلايا اللمفية B التي تنتج الأجسام المضادة، والخلايا T المساعدة والقاتلة).",
            "mcq": [
              {
                "question": "Which type of lymphocytes is responsible for producing antibodies?",
                "options": [
                  "B cells",
                  "Helper T cells",
                  "Cytotoxic T cells",
                  "Macrophages"
                ],
                "answerIndex": 0,
                "explanation": "B lymphocytes (B cells) differentiate into plasma cells, which synthesize and secrete antibodies to fight specific antigens."
              }
            ],
            "importantQuestions": []
          },
          {
            "id": "noninfectious_disorders",
            "title": "الأمراض غير المعدية والاضطرابات (Noninfectious Disorders)",
            "videoIds": [
              "uXRlcUISK3k"
            ],
            "pdfFile": {
              "name": "Noninfectious Diseases Booklet",
              "type": "شرح",
              "path": "Noninfectious Diseases.pdf",
              "views": 541,
              "dateAdded": "2026-05-04"
            },
            "extraFiles": [
              {
                "name": "Noninfectious disorders Booklet (2)",
                "type": "شرح",
                "path": "Noninfectious disorders (2).pdf",
                "views": 187,
                "dateAdded": "2026-05-04"
              }
            ],
            "summary": "يتناول هذا الدرس الأمراض التي لا تسببها الجراثيم ولا تنتقل من شخص لآخر، مثل الاضطرابات الجينية (Inherited)، وأمراض التحلل (Degenerative) مثل التهاب المفاصل، وأمراض التمثيل الغذائي (Metabolic) مثل السكري، بالإضافة إلى السرطان وأسبابه.",
            "mcq": [
              {
                "question": "Type 2 diabetes is considered an example of:",
                "options": [
                  "Metabolic and nutritional diseases",
                  "Infectious diseases",
                  "Purely genetic inherited diseases",
                  "Degenerative joint disorders"
                ],
                "answerIndex": 0,
                "explanation": "Type 2 diabetes is a metabolic disorder characterized by high blood sugar and insulin resistance, often related to lifestyle factors."
              }
            ],
            "importantQuestions": []
          }
        ]
      }
    ],
    "track": "inspire"
  },
  {
    "id": "chemistry",
    "name": "الكيمياء (Inspire)",
    "emoji": "🧪",
    "color": "pink",
    "generalFiles": [
      {
        "name": "السيناريو الثاني في الكيمياء - كتيب المراجعة الشامل 11ADV",
        "type": "مراجعة",
        "path": "General Revision 11ADV_Scenario2.pdf",
        "views": 1845,
        "dateAdded": "2026-05-18"
      },
      {
        "name": "امتحان كيمياء هيكل الوزارة EOT-CHE-1-T3-26",
        "type": "امتحان",
        "path": "EOT-CHE-1-T3-26_MOE.pdf",
        "views": 1412,
        "dateAdded": "2026-05-19"
      },
      {
        "name": "ملخص تفاعلات الأكسدة والاختزال كيمياء 12-11 متقدم",
        "type": "مراجعة",
        "path": "Redox Reactions- 12 Adv.- Mr. Hesham Eltoukhy.pdf",
        "views": 980,
        "dateAdded": "2026-05-20"
      },
      {
        "name": "امتحان تدريبي كيمياء Q2 Practice 1",
        "type": "امتحان",
        "path": "practice Q2  (1).pdf",
        "views": 654,
        "dateAdded": "2026-05-21"
      },
      {
        "name": "كتيب كيمياء Scenario 2 Booklet الأصلي",
        "type": "هيكل",
        "path": "document (39).pdf",
        "views": 1105,
        "dateAdded": "2026-05-22"
      }
    ],
    "chapters": [
      {
        "id": "chem_term3",
        "title": "منهج ومراجعات الكيمياء الفصل الثالث",
        "lessons": [
          {
            "id": "equilibrium_chem",
            "title": "الاتزان الكيميائي (Chemical Equilibrium)",
            "videoIds": [
              "TdTQAx_K-kc"
            ],
            "pdfFile": {
              "name": "السيناريو الثاني كيمياء - كتيب المراجعة الشامل",
              "type": "مراجعة",
              "path": "General Revision 11ADV_Scenario2.pdf",
              "views": 985,
              "dateAdded": "2026-05-02"
            },
            "summary": "يتناول هذا الدرس حالة الاتزان الكيميائي الديناميكي حيث تتساوى سرعة التفاعل الأمامي مع سرعة التفاعل العكسي. نتعلم حساب ثابت الاتزان Keq وقاعدة لوشاتيليه وكيف تؤثر العوامل المختلفة (التركيز، الضغط، درجة الحرارة) على موضع الاتزان.",
            "formulas": [
              {
                "title": "قانون ثابت الاتزان Keq",
                "expression": "Keq = [C]^c [D]^d / [A]^a [B]^b",
                "explanation": "للتفاعل المتزن: aA + bB ⇌ cC + dD. تشتمل فقط على المواد الغازية والمحاليل المائية."
              }
            ],
            "mcq": [
              {
                "question": "According to Le Châtelier's principle, when temperature is increased in an exothermic reaction, the equilibrium shifts to the:",
                "options": [
                  "Right (towards products)",
                  "Left (towards reactants)",
                  "Does not affect equilibrium",
                  "Reaction stops completely"
                ],
                "answerIndex": 1,
                "explanation": "In an exothermic reaction, heat is released as a product. Increasing the temperature causes the equilibrium to shift to the left (towards reactants) to absorb the excess heat."
              },
              {
                "question": "Which of the following describes a system that has reached chemical equilibrium?",
                "options": [
                  "No new products are formed by the forward reaction.",
                  "The reverse reaction never occurs in the system.",
                  "The concentration of reactants in the system is exactly equal to the concentration of products.",
                  "The rate of the forward reaction equals the rate of the reverse reaction."
                ],
                "answerIndex": 3,
                "explanation": "At chemical equilibrium, the rate of the forward reaction equals the rate of the reverse reaction, and the concentrations of reactants and products remain constant (dynamic equilibrium)."
              },
              {
                "question": "Determine the value of the equilibrium constant Keq at 400 K for the following equilibrium reaction: PCl5(g) ⇌ PCl3(g) + Cl2(g) if the concentrations at equilibrium are: [PCl5] = 0.135 mol/L, [PCl3] = 0.550 mol/L, and [Cl2] = 0.550 mol/L.",
                "options": [
                  "0.303",
                  "2.24",
                  "0.446",
                  "4.07"
                ],
                "answerIndex": 1,
                "explanation": "The equilibrium constant expression is: Keq = [PCl3][Cl2] / [PCl5]. Substituting the values: Keq = (0.550 × 0.550) / 0.135 = 0.3025 / 0.135 ≈ 2.24."
              },
              {
                "question": "For the following equilibrium reaction: CO(g) + 2H2(g) ⇌ CH3OH(g) + heat, how does decreasing the temperature (cooling the system) affect the equilibrium position?",
                "options": [
                  "Equilibrium shifts to the left (reactants), and methanol production decreases.",
                  "Equilibrium shifts to the right (products), and methanol production increases.",
                  "The equilibrium position is unaffected, and concentrations do not change.",
                  "The reaction stops completely, and the equilibrium constant becomes zero."
                ],
                "answerIndex": 1,
                "explanation": "The reaction is exothermic (heat is on the product side). Cooling the system (removing heat) shifts the equilibrium position to the right (products) to compensate for the lost heat, increasing the production of methanol CH3OH and the value of Keq."
              },
              {
                "question": "In the equilibrium reaction: CO(g) + 2H2(g) ⇌ CH3OH(g) + heat, what is the effect of decreasing the volume of the reaction vessel (increasing pressure) on the equilibrium position?",
                "options": [
                  "Equilibrium shifts towards the side with more moles of gas (left).",
                  "Equilibrium shifts towards the side with fewer moles of gas (right - products).",
                  "No change occurs in the equilibrium position because the number of moles is equal.",
                  "The rate of both forward and reverse reactions decreases by half."
                ],
                "answerIndex": 1,
                "explanation": "Decreasing the volume of the vessel increases the pressure. According to Le Châtelier's principle, the system responds by shifting the equilibrium towards the side with fewer moles of gas (the right side has 1 mole of gas compared to 3 moles on the left side)."
              },
              {
                "question": "In the endothermic equilibrium reaction: Co(H2O)6^2+(aq) [pink] + 4Cl^-(aq) ⇌ CoCl4^2-(aq) [blue] + 6H2O(l), what happens to the color of the solution when the flask is placed in an ice bath (cooled)?",
                "options": [
                  "The solution deepens and turns completely dark blue.",
                  "The equilibrium shifts to the left, and the solution turns pink.",
                  "The solution loses its color and becomes completely transparent.",
                  "The color does not change because cooling has no effect on aqueous solutions."
                ],
                "answerIndex": 1,
                "explanation": "The reaction acts endothermic, meaning heat is a reactant. Upon cooling (decreasing temperature), the equilibrium shifts to the left (reactants) to replace the lost heat. Since the hexaaquacobalt(II) ion Co(H2O)6^2+ is pink, the solution turns pink."
              },
              {
                "question": "For the colored equilibrium reaction: Co(H2O)6^2+(aq) [pink] + 4Cl^-(aq) ⇌ CoCl4^2-(aq) [blue] + 6H2O(l), what visual change is expected when 10g of solid potassium chloride KCl is added and dissolved in the solution?",
                "options": [
                  "The solution turns pink due to the increase in liquid volume.",
                  "The solution turns blue because the concentration of chloride ions Cl- increases, shifting the equilibrium to the right.",
                  "Cobalt precipitates completely, forming an insoluble white precipitate.",
                  "The solution remains in the same state without any color change at all."
                ],
                "answerIndex": 1,
                "explanation": "When KCl is added and dissociates, the concentration of chloride ions Cl^- (a reactant) increases. According to Le Châtelier's principle, the equilibrium shifts to the right (products) to consume the excess chloride. Since the CoCl4^2- ion is blue, the solution turns blue."
              },
              {
                "question": "Using Le Châtelier's principle, how does the equilibrium shift in the reaction: H2CO3(aq) ⇌ H2O(l) + CO2(g) explain why soft drinks lose their carbonation and go flat when the container is left open?",
                "options": [
                  "CO2 gas escapes from the open container, shifting the equilibrium to the left to form more carbonic acid H2CO3.",
                  "CO2 gas escapes, reducing the product concentration, which shifts the equilibrium to the right to compensate, causing continuous decomposition of carbonic acid H2CO3.",
                  "The entry of outside air increases total pressure, shifting the equilibrium to the left.",
                  "Water reacts with atmospheric nitrogen to inhibit the production of carbon dioxide gas."
                ],
                "answerIndex": 1,
                "explanation": "When the container is left open, CO2 gas (a gaseous product) escapes into the atmosphere. This continuous removal of products drives the equilibrium to shift to the right to compensate, leading to the complete decomposition of H2CO3 and loss of carbonation, making the drink flat."
              }
            ],
            "importantQuestions": []
          }
        ]
      }
    ],
    "track": "inspire"
  },
  {
    "id": "arabic",
    "name": "اللغة العربية",
    "emoji": "📝",
    "color": "orange",
    "chapters": [
      {
        "id": "arabic_term3",
        "title": "دروس اللغة العربية - الفصل الثالث",
        "lessons": [
          {
            "id": "arabic_explanation",
            "title": "شرح دروس اللغة العربية للصف الحادي عشر — أ.حسن سلهب",
            "videoIds": [
              "TdTQAx_K-kc"
            ],
            "summary": "فيديو توضيحي لتفعيل بطاقة شرح دروس اللغة العربية للصف الحادي عشر مجاناً — أ.حسن سلهب",
            "mcq": [
              {
                "question": "ما نوع الأسلوب في جملة: 'ما أجمل السماء'؟",
                "options": [
                  "أسلوب تعجب",
                  "أسلوب استفهام",
                  "أسلوب نداء",
                  "أسلوب أمر"
                ],
                "answerIndex": 0,
                "explanation": "جملة 'ما أجمل السماء' هي أسلوب تعجب على وزن 'ما أفعَلَ' للتعبير عن الدهشة والإعجاب."
              },
              {
                "question": "ما إعراب كلمة 'الطالبُ' في جملة: 'جاء الطالبُ المجتهدُ'؟",
                "options": [
                  "فاعل مرفوع بالضمة",
                  "مبتدأ مرفوع بالضمة",
                  "خبر مرفوع بالضمة",
                  "مفعول به منصوب بالفتحة"
                ],
                "answerIndex": 0,
                "explanation": "'الطالبُ' هو فاعل مرفوع بالضمة الظاهرة لأنه جاء بعد الفعل 'جاء' وهو من قام بالفعل."
              },
              {
                "question": "ما الفرق بين الحال والتمييز؟",
                "options": [
                  "الحال يبين هيئة صاحبه والتمييز يبين المبهم من ذات أو نسبة",
                  "لا فرق بينهما",
                  "الحال يأتي مجروراً دائماً",
                  "التمييز يأتي جملة فعلية"
                ],
                "answerIndex": 0,
                "explanation": "الحال يبين هيئة صاحبه وقت وقوع الفعل ويكون منصوباً، أما التمييز فيبين المبهم من ذات أو نسبة ويكون منصوباً أيضاً."
              }
            ],
            "importantQuestions": []
          }
        ]
      }
    ],
    "track": "inspire"
  },
  biologyBridgeSubject,
  physicsBridgeSubject,
  chemistryBridgeSubject
];
