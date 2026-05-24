import { Subject } from "./mockData";

export const biologyBridgeSubject: Subject = {
  id: "biology_bridge",
  name: "الأحياء (Bridge)",
  emoji: "🧬",
  color: "green",
  track: "bridge",
  generalFiles: [
    { name: "كتيب مراجعة الأحياء الشامل للفصل الثالث EOT 📂", type: "هيكل", path: "Biology EOT 2025-2026 11ADV Term 3.pdf", views: 4200, dateAdded: "2026-05-24" },
    { name: "شرح فلك الأحياء - قناة يوتيوب (للفائدة)", type: "شرح", path: "https://www.youtube.com/@BioFalak/featured", views: 9999, dateAdded: "2026-05-24" },
    { name: "تغطية هيكل الأحياء الوزاري 11 متقدم 📂", type: "هيكل", path: "biology_coverage.pdf", views: 2450, dateAdded: "2026-05-24" },
    { name: "مراجعة شاملة وأسئلة سنوات سابقة أحياء ف3 📂", type: "مراجعة", path: "احياء_مراجعة_شاملة_اسيلة_سنوات_سابقة_ف_3_احياء.pdf", views: 3200, dateAdded: "2026-05-24" },
    { name: "أسئلة وزارية وتجميعة وحدة المناعة 📂", type: "امتحان", path: "اسيلة وزارية وحدة المناعة.pdf", views: 3400, dateAdded: "2026-05-24" }
  ],
  chapters: [
    {
      id: "ch1_infectious",
      title: "1. الأمراض المعدية (Infectious Diseases)",
      lessons: [
        {
          id: "infectious_basics",
          title: "مسببات الأمراض وانتقالها",
          videoIds: ["MjQNszeSEzI", "5yKny3SWyAo"],
          summary: "المرض المعدي هو المرض الذي ينتقل من كائن حي لآخر بواسطة مسببات الأمراض (البكتيريا، الفيروسات، الفطريات، الأوليات، الطفيليات). المستودع هو مصدر مسبب المرض. تعتمد فرضيات كوخ على عزل المسبب وتنميته وإعادته لعائل سليم.",
          pdfFile: { name: "ملخص شرح الدرس 6.1 - الأمراض المعدية ومسبباتها 📂", type: "شرح", path: "6.1 Infection disease BIO 12 11ADV(24-25) Term3.pdf", views: 2500, dateAdded: "2026-05-24" },
          extraFiles: [
            { name: "Infectious Diseases - Study File 📂", type: "مراجعة", path: "Infectious Diseases.pdf", views: 1200, dateAdded: "2026-05-24" },
            { name: "Infectious Diseases (Detailed Guide) 📂", type: "مراجعة", path: "Infectious Diseases (2).pdf", views: 980, dateAdded: "2026-05-24" }
          ],
          formulas: [
            { title: "فرضيات كوخ", expression: "Koch's Postulates", explanation: "1. عزل المسبب من المريض. 2. زراعته في مزرعة نقية. 3. حقنه في عائل سليم (يجب أن يمرض). 4. عزله مرة أخرى للتأكد." }
          ],
          mcq: [
            { question: "أي مما يلي يُعد ناقلاً حيوياً (Vector) للأمراض؟", options: ["الماء الملوث", "البعوضة", "الهواء", "الطعام الملوث"], answerIndex: 1, explanation: "النواقل الحيوية هي الكائنات الحية التي تنقل المرض، مثل البعوض والقراد." },
            { question: "المضادات الحيوية (Antibiotics) تستخدم للقضاء على:", options: ["الفيروسات فقط", "البكتيريا فقط", "الفطريات فقط", "كل مسببات الأمراض"], answerIndex: 1, explanation: "المضادات الحيوية تهاجم جدار الخلية أو العمليات الحيوية في البكتيريا ولا تؤثر على الفيروسات." }
          ],
          importantQuestions: [
            { question: "ما الفرق بين الوباء المستوطن (Endemic) والوباء العالمي (Pandemic)؟", answer: "المرض المستوطن هو الذي يتواجد باستمرار في منطقة معينة (مثل نزلات البرد). الوباء العالمي هو مرض ينتشر في مساحات واسعة وقارات متعددة." }
          ]
        }
      ]
    },
    {
      id: "ch2_immune_system",
      title: "2. جهاز المناعة (The Immune System)",
      lessons: [
        {
          id: "immunity_basics",
          title: "المناعة المتخصصة وغير المتخصصة",
          videoIds: ["9Bx95xMSdVk", "jqOl1Cm1-PQ"],
          summary: "ينقسم جهاز المناعة إلى: مناعة غير متخصصة (الجلد، المخاط، الليسوزيم، الالتهاب، البلعمة) ومناعة متخصصة تعتمد على الخلايا الليمفية (T و B). الخلايا البائية (B-cells) تنتج الأجسام المضادة، بينما التائية القاتلة (Cytotoxic T) تدمر الخلايا المصابة.",
          pdfFile: { name: "ملخص شرح وحدة جهاز المناعة بالتفصيل 📂", type: "شرح", path: "The immune system.pdf", views: 3400, dateAdded: "2026-05-24" },
          extraFiles: [
            { name: "The Immune System - Part 2 Notes 📂", type: "مراجعة", path: "The Immune System (2).pdf", views: 1540, dateAdded: "2026-05-24" },
            { name: "أسئلة وزارية وتجميعة جهاز المناعة 📂", type: "مراجعة", path: "اسيلة وزارية وحدة المناعة.pdf", views: 2400, dateAdded: "2026-05-24" }
          ],
          formulas: [
            { title: "الاستجابة المناعية الخلوية", expression: "T-Cells Activation", explanation: "تُنشط بواسطة الخلايا التائية المساعدة (Helper T) لقتل الخلايا المصابة." },
            { title: "الاستجابة المناعية الإفرازية", expression: "B-Cells -> Antibodies", explanation: "الخلايا البائية تتحول لخلايا بلازمية لإنتاج أجسام مضادة (Antibodies) ترتبط بمولدات الضد (Antigens)." }
          ],
          mcq: [
            { question: "أي الخلايا التالية تعتبر 'مصنعاً' للأجسام المضادة؟", options: ["الخلايا التائية القاتلة", "الخلايا البائية البلازمية", "خلايا الذاكرة", "البلعمية الكبيرة"], answerIndex: 1, explanation: "الخلايا البائية البلازمية هي المتخصصة بإنتاج وإفراز الأجسام المضادة." },
            { question: "المناعة التي يكتسبها الرضيع من حليب الأم تُعد مناعة:", options: ["إيجابية طبيعية", "سلبية طبيعية", "إيجابية اصطناعية", "سلبية اصطناعية"], answerIndex: 1, explanation: "مناعة سلبية طبيعية لأن الأجسام المضادة تنتقل جاهزة من الأم للجنين/الرضيع." },
            { question: "فيروس نقص المناعة المكتسبة (HIV) يستهدف بشكل رئيسي:", options: ["الخلايا البائية", "خلايا الدم الحمراء", "الخلايا التائية المساعدة", "الصفائح الدموية"], answerIndex: 2, explanation: "فيروس HIV يهاجم الخلايا التائية المساعدة (Helper T cells) مما يدمر الجهاز المناعي." }
          ],
          importantQuestions: [
            { question: "اشرح دور الخلايا البلعمية الكبيرة (Macrophage) في الاستجابة المناعية؟", answer: "تقوم بابتلاع مسببات الأمراض (البلعمة) ثم تعرض أجزاء منها (مولد الضد) على سطحها لتنشيط الخلايا التائية المساعدة." },
            { question: "ما وظيفة بروتين الإنترفيرون؟", answer: "يُفرز من الخلايا المصابة بالفيروسات ليرتبط بالخلايا المجاورة السليمة ويحفزها لإنتاج بروتينات تمنع تكاثر الفيروس." }
          ]
        }
      ]
    },
    {
      id: "ch3_non_infectious",
      title: "3. الاختلالات غير المعدية (Non-Infectious Disorders)",
      lessons: [
        {
          id: "non_infectious_basics",
          title: "الأمراض المزمنة والمناعة الذاتية",
          videoIds: ["R1MFhpcbI5s", "Vj3-pCc__Pw"],
          summary: "هي أمراض لا تسببها مسببات الأمراض ولا تنتقل بين الأشخاص. تشمل: الأمراض الوراثية (الهيموفيليا، متلازمة داون)، أمراض المناعة الذاتية (حيث يهاجم الجسم نفسه مثل الذئبة والتهاب المفاصل الروماتيزمي)، الحساسية بأنواعها، والسرطان.",
          pdfFile: { name: "ملخص شرح درس 6.3 - الاختلالات غير المعدية 📂", type: "شرح", path: "6_3_NonInfectious_disorders_BIO_12 11ADV24_25_Term3_2.pdf", views: 2900, dateAdded: "2026-05-24" },
          extraFiles: [
            { name: "Noninfectious Disorders Reference 📂", type: "مراجعة", path: "Noninfectious disorders (2).pdf", views: 1300, dateAdded: "2026-05-24" },
            { name: "Noninfectious Diseases Guide 📂", type: "مراجعة", path: "Noninfectious Diseases.pdf", views: 900, dateAdded: "2026-05-24" }
          ],
          formulas: [
            { title: "صدمة الحساسية (Anaphylactic Shock)", expression: "Allergy -> Histamine", explanation: "استجابة مفرطة لجهاز المناعة تجاه مادة غير ضارة، تؤدي لإطلاق كميات هائلة من الهستامين تسبب انخفاض ضغط الدم وتضيق المسالك التنفسية." }
          ],
          mcq: [
            { question: "مرض الذئبة الحمراء (Lupus) يُصنف ضمن أمراض:", options: ["نقص المناعة المكتسبة", "الحساسية المفرطة", "المناعة الذاتية", "الأمراض المعدية"], answerIndex: 2, explanation: "في مرض الذئبة يهاجم جهاز المناعة الأنسجة السليمة في الجسم." },
            { question: "انقسام الخلايا بشكل غير طبيعي وبدون سيطرة يؤدي إلى مرض:", options: ["السرطان", "الهيموفيليا", "تصلب الشرايين", "الربو"], answerIndex: 0, explanation: "السرطان هو اختلال في تنظيم دورة الخلية يؤدي لانقسام عشوائي." }
          ],
          importantQuestions: [
            { question: "ما الفرق بين الحساسية العادية وأمراض المناعة الذاتية? ", answer: "في الحساسية: يهاجم الجهاز المناعي مادة خارجية غير ضارة (مثل الغبار). في أمراض المناعة الذاتية: يخطئ الجهاز المناعي ويهاجم أنسجة الجسم السليمة نفسها." }
          ]
        }
      ]
    }
  ]
};
