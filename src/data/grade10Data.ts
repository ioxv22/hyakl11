import { Subject } from './mockData';

export const GRADE10_SUBJECTS: Subject[] = [
  {
    id: "g10-physics",
    name: "الفيزياء (Inspire)",
    emoji: "⚡",
    color: "blue",
    track: "inspire",
    grade: 10,
    generalFiles: [
      {
        name: "هيكل الفيزياء للصف العاشر المتقدم الفصل الثالث 2025-2026",
        type: "هيكل",
        path: "PHYSICS_INSPIRE_EN_G10_ADV_EOT_3_Exam_Coverage_EOY_2025_2026.pdf",
        views: 1450,
        dateAdded: "2026-05-18"
      },
      {
        name: "كتاب الفيزياء الصف العاشر المتقدم الطبعة 25-26",
        type: "مراجعة",
        path: "Physics Book 10A 25-26 Edition.pdf",
        views: 1205,
        dateAdded: "2026-05-19"
      }
    ],
    chapters: [
      {
        id: "g10-phy-ch16",
        title: "الوحدة 16 — انعكاس الضوء وانكساره وتداخله وحيوده",
        lessons: [
          {
            id: "16.1",
            title: "16.1 انعكاس وانكسار الضوء (Reflection and Refraction)",
            videoIds: ["DeUj301PXgk", "JWSAY_VOR_A"],
            pdfFile: {
              name: "ملف شرح انعكاس وانكسار الضوء",
              type: "شرح",
              path: "Module 16 Reflection and Refraction 10adv.pdf",
              views: 940,
              dateAdded: "2026-05-10"
            },
            extraFiles: [
              {
                name: "درس انكسار الضوء - الجزء الأول",
                type: "شرح",
                path: "lesson 3 refraction of light (part 1).pdf",
                views: 520,
                dateAdded: "2026-05-11"
              },
              {
                name: "درس انكسار الضوء - الجزء الثاني",
                type: "شرح",
                path: "lesson 3 refraction of light (part 2).pdf",
                views: 480,
                dateAdded: "2026-05-11"
              }
            ],
            summary: "في هذا الدرس، ندرس ظاهرة انعكاس الضوء وقوانينه على المرايا المستوية والكروية، بالإضافة إلى ظاهرة انكسار الضوء (Refraction) عند انتقاله بين وسطين مختلفين الكثافة الضوئية، وتطبيق قانون سنيل (Snell's Law) والزاوية الحرجة والانعكاس الداخلي الكلي.",
            formulas: [
              {
                title: "قانون سنيل للانكسار (Snell's Law)",
                expression: "n1 sin θ1 = n2 sin θ2",
                explanation: "حيث n1 و n2 هما معاملا الانكسار للوسطين، و θ1 هي زاوية السقوط و θ2 هي زاوية الانكسار."
              },
              {
                title: "الزاوية الحرجة (Critical Angle)",
                expression: "sin θc = n2 / n1",
                explanation: "حيث n1 هو وسط السقوط ذو الكثافة الأعلى و n2 وسط الانكسار الأقل كثافة."
              }
            ],
            vocabulary: [
              {
                word: "Refraction",
                translation: "انكسار الضوء",
                explanation: "انحراف مسار الضوء عند انتقاله المائل بين وسطين شفافين مختلفين في السرعة الضوئية."
              },
              {
                word: "Critical Angle",
                translation: "الزاوية الحرجة",
                explanation: "زاوية السقوط في الوسط الأكبر كثافة والتي تقابلها زاوية انكسار 90 درجة في الوسط الأقل كثافة."
              }
            ],
            importantQuestions: [
              {
                question: "ما هو سبب حدوث ظاهرة انكسار الضوء؟",
                answer: "السبب الرئيسي هو تغير سرعة الضوء عند انتقاله من وسط شفاف إلى وسط شفاف آخر مختلف في الكثافة الضوئية."
              }
            ],
            mcq: [
              {
                question: "عند انتقال شعاع ضوئي من الهواء إلى الماء مائلاً، ماذا يحدث لسرعته وزاوية انكساره؟",
                options: [
                  "تقل سرعته وينكسر مقترباً من العمود المقيم",
                  "تزداد سرعته وينكسر مبتعداً عن العمود المقيم",
                  "تظل سرعته ثابتة دون انكسار",
                  "تقل سرعته وينكسر مبتعداً عن العمود"
                ],
                answerIndex: 0,
                explanation: "بما أن معامل انكسار الماء أكبر من الهواء، فإن سرعة الضوء تقل في الماء وينحرف الشعاع مقترباً من العمود (θ2 < θ1)."
              }
            ]
          },
          {
            id: "16.2",
            title: "16.2 العدسات المحدبة والمقعرة (Convex and Concave Lenses)",
            videoIds: ["OLBwjLtz0U0", "kSZUxh8jC4o"],
            summary: "يتناول هذا الدرس دراسة العدسات الرقيقة وأنواعها (العدسات المحدبة المجمعة، والعدسات المقعرة المفرقة). نتعلم كيفية رسم مسارات الأشعة الضوئية لتحديد موضع الصورة المتكونة وصفاتها، بالإضافة إلى حل المسائل الحسابية باستخدام قانون العدسات الرقيقة وتحديد التكبير.",
            pdfFile: {
              name: "شرح وتدريبات العدسات الرقيقة المجمعة والمفرقة",
              type: "شرح",
              path: "lesson 4 convex and concave lens( part 1 ).pdf",
              views: 890,
              dateAdded: "2026-05-12"
            },
            extraFiles: [
              {
                name: "درس العدسات المحدبة والمقعرة - الجزء الثاني",
                type: "شرح",
                path: "lesson 4 convex and concave lens( part 2 ).pdf",
                views: 410,
                dateAdded: "2026-05-12"
              }
            ],
            formulas: [
              {
                title: "القانون العام للعدسات والمرايا",
                expression: "1/f = 1/do + 1/di",
                explanation: "حيث f هو البعد البؤري، do هو بعد الجسم عن العدسة، و di هو بعد الصورة عن العدسة."
              },
              {
                title: "قانون التكبير (Magnification)",
                expression: "m = hi / ho = -di / do",
                explanation: "حيث m هو التكبير، hi هو طول الصورة، و ho هو طول الجسم."
              }
            ],
            vocabulary: [
              {
                word: "Focal Length",
                translation: "البعد البؤري",
                explanation: "المسافة بين المركز البصري للعدسة والبؤرة الأصلية."
              },
              {
                word: "Real Image",
                translation: "صورة حقيقية",
                explanation: "الصورة التي تتكون من تلاقي الأشعة الضوئية المنكسرة ويمكن استقبالها على حائل."
              }
            ],
            importantQuestions: [
              {
                question: "متى تتكون صورة تقديرية مكبرة بواسطة عدسة محدبة؟",
                answer: "عندما يوضع الجسم على مسافة أقل من البعد البؤري للعدسة (do < f)، وتتكون الصورة في نفس جهة الجسم."
              }
            ],
            mcq: [
              {
                question: "عدسة محدبة بعدها البؤري 10 cm، وضع جسم على مسافة 15 cm منها. أين تتكون الصورة وما صفاتها؟",
                options: [
                  "على مسافة 30 cm، حقيقية مقلوبة مكبرة",
                  "على مسافة 30 cm، تقديرية معتدلة مكبرة",
                  "على مسافة 6 cm، حقيقية مقلوبة مصغرة",
                  "على مسافة 15 cm، حقيقية مقلوبة مساوية للجسم"
                ],
                answerIndex: 0,
                explanation: "1/di = 1/f - 1/do = 1/10 - 1/15 = 1/30، إذن di = 30 cm. بما أنها موجبة فهي حقيقية، وبما أن do يقع بين f و 2f فالصورة مقلوبة ومكبرة."
              }
            ]
          },
          {
            id: "16.3",
            title: "16.3 التداخل والحيود (Interference and Diffraction)",
            videoIds: ["YM-UsQbhzCA", "mVNome5mFKY"],
            summary: "يتناول هذا الدرس الخصائص الموجية للضوء عبر دراسة تداخل الضوء المترابط (Coherent Light) باستخدام تجربة شقي يونغ (Young's Double-Slit Experiment)، ودراسة التداخل في الأغشية الرقيقة (Thin-Film Interference)، وظاهرة حيود الضوء (Diffraction) عبر الشق المفرد ومحزوزات الحيود.",
            pdfFile: {
              name: "شرح تداخل الضوء المترابط (شقا يونغ)",
              type: "شرح",
              path: "interference (part 1 Interference of Coherent Light ).pdf",
              views: 750,
              dateAdded: "2026-05-14"
            },
            extraFiles: [
              {
                name: "شرح تداخل الأغشية الرقيقة",
                type: "شرح",
                path: "interference (part 2 thin film Interference ).pdf",
                views: 380,
                dateAdded: "2026-05-14"
              },
              {
                name: "درس الحيود ومحزوزات الحيود",
                type: "شرح",
                path: "Lesson 2 Diffraction.pdf",
                views: 590,
                dateAdded: "2026-05-15"
              }
            ],
            formulas: [
              {
                title: "تجربة شقي يونغ (موضع الهدب المضيء)",
                expression: "λ = x d / L",
                explanation: "حيث λ هو الطول الموجي، x هو المسافة بين الهدب المركزي المضيء والهدب ذي الرتبة الأولى، d المسافة بين الشقين، و L البعد عن الشاشة."
              },
              {
                title: "حيود الشق المفرد (العرض المضيء)",
                expression: "2 x1 = 2 λ L / w",
                explanation: "حيث w هو عرض الشق المفرد، و 2 x1 هو عرض الهدب المركزي المضيء."
              }
            ],
            vocabulary: [
              {
                word: "Diffraction",
                translation: "حيود الضوء",
                explanation: "انحناء الضوء حول الحواف أو نفاذه خلال الشقوق الضيقة معبراً عن خاصيته الموجية."
              },
              {
                word: "Coherent Light",
                translation: "ضوء مترابط",
                explanation: "ضوء ناتج عن تراكب موجات ضوئية لها نفس التردد والطور."
              }
            ],
            importantQuestions: [
              {
                question: "لماذا تظهر فقاعة الصابون بألوان قوس قزح في الضوء الأبيض؟",
                answer: "بسبب حدوث ظاهرة تداخل الأغشية الرقيقة (Thin-Film Interference) بين الضوء المنعكس عن السطح الخارجي والضوء المنعكس عن السطح الداخلي لغشاء الفقاعة."
              }
            ],
            mcq: [
              {
                question: "في تجربة شقي يونغ، إذا قمنا بتقليل المسافة بين الشقين (d)، ماذا يحدث للمسافة بين الأهداب المضيئة (x)؟",
                options: [
                  "تزداد المسافة بين الأهداب",
                  "تقل المسافة بين الأهداب",
                  "تظل المسافة ثابتة",
                  "تختفي الأهداب تماماً"
                ],
                answerIndex: 0,
                explanation: "العلاقة عكسية بين d و x حسب القانون x = λ L / d. وبالتالي تقليل d يؤدي لزيادة تباعد الأهداب x."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "g10-chemistry",
    name: "الكيمياء (Inspire)",
    emoji: "🧪",
    color: "emerald",
    track: "inspire",
    grade: 10,
    generalFiles: [
      {
        name: "هيكل الكيمياء للصف العاشر المتقدم الفصل الثالث 2025-2026",
        type: "هيكل",
        path: "Coverage-EoT3-G10-ADV -INSPIRE 25-26.pdf",
        views: 1510,
        dateAdded: "2026-05-18"
      },
      {
        name: "كتاب الكيمياء الصف العاشر المتقدم الطبعة 25-26",
        type: "مراجعة",
        path: "Chemistry Book 10A 25-26 Edition.pdf",
        views: 1140,
        dateAdded: "2026-05-19"
      },
      {
        name: "الامتحان المركزي الوزاري السابق لمادة الكيمياء عاشر",
        type: "امتحان",
        path: "امتحان مركزي كيمياء 10 متقدم 3.pdf",
        views: 955,
        dateAdded: "2026-05-22"
      }
    ],
    chapters: [
      {
        id: "g10-chem-ch12",
        title: "الوحدة 12 — الغازات وقوانينها",
        lessons: [
          {
            id: "12.1",
            title: "12.1 قوانين الغازات وحساباتها (The Gas Laws)",
            videoIds: [], // NO VIDEOS as per user rules!
            summary: "يتناول هذا الدرس دراسة الخصائص الفيزيائية للغازات ونظرية الحركة الجزيئية. ندرس القوانين الأساسية للغازات: قانون بويل (العلاقة بين الضغط والحجم)، قانون شارل (العلاقة بين الحجم ودرجة الحرارة)، قانون غي-لوساك (الضغط والحرارة)، والقانون الموحد للغازات وقانون الغاز المثالي.",
            pdfFile: {
              name: "ملخص قوانين الغازات وتدريباتها",
              type: "شرح",
              path: "The Gas Laws(1).pdf",
              views: 920,
              dateAdded: "2026-05-10"
            },
            extraFiles: [
              {
                name: "شرح درس الغازات المحلول كامل - د. حسناء الصمدي",
                type: "مراجعة",
                path: "Lesson_1_Gases_دكتوره_حسناء_الصمدى_pdfsolved.pdf",
                views: 730,
                dateAdded: "2026-05-11"
              },
              {
                name: "ملخص الكيمياء - الفصل الثالث غازات وحسابات",
                type: "مراجعة",
                path: "Chemistry.pdf",
                views: 610,
                dateAdded: "2026-05-12"
              }
            ],
            formulas: [
              {
                title: "قانون الغاز المثالي (Ideal Gas Law)",
                expression: "P V = n R T",
                explanation: "حيث P الضغط، V الحجم، n عدد المولات، T درجة الحرارة بالكلفن، و R ثابت الغاز المثالي."
              },
              {
                title: "قانون بويل (Boyle's Law)",
                expression: "P1 V1 = P2 V2",
                explanation: "عند ثبوت درجة الحرارة، يتناسب حجم الغاز عكسياً مع الضغط الواقع عليه."
              }
            ],
            vocabulary: [
              {
                word: "Ideal Gas",
                translation: "الغاز المثالي",
                explanation: "نموذج افتراضي لغاز يتحرك بصفة عشوائية تامة وقوى التجاذب بين جزيئاته منعدمة تماماً."
              }
            ],
            importantQuestions: [
              {
                question: "لماذا يجب تحويل درجة الحرارة إلى الكلفن دائماً عند حل مسائل الغازات؟",
                answer: "لأن مقياس كلفن هو مقياس حراري مطلق يبدأ من الصفر المطلق، ويعبر تناسب الحجم والضغط عن الطاقة الحركية الفعلية للجزيئات."
              }
            ],
            mcq: [
              {
                question: "غاز حجمه 2.0 L عند ضغط 1.0 atm. إذا تضاعف الضغط إلى 2.0 atm مع ثبوت الحرارة، فكم يصبح حجمه الجديد؟",
                options: [
                  "1.0 L",
                  "4.0 L",
                  "2.0 L",
                  "0.5 L"
                ],
                answerIndex: 0,
                explanation: "حسب قانون بويل (P1 V1 = P2 V2)، فإن تضاعف الضغط يؤدي إلى نقصان الحجم إلى النصف مباشرة: V2 = (1.0 * 2.0) / 2.0 = 1.0 L."
              }
            ]
          }
        ]
      },
      {
        id: "g10-chem-ch13",
        title: "الوحدة 13 — الحسابات الكيميائية",
        lessons: [
          {
            id: "13.1",
            title: "13.1 الحسابات وعلاقات الكتل (Stoichiometric Calculations)",
            videoIds: [],
            summary: "يتناول هذا الدرس العلاقات الكمية بين المواد المتفاعلة والناتجة في التفاعل الكيميائي الموزون. نتعلم كتابة النسب المولية وتطبيق حسابات تحويل مول-مول، مول-كتلة، وكتلة-كتلة لتحديد مقادير المواد المتفاعلة أو المتكونة بدقة.",
            pdfFile: {
              name: "شرح شامل الحسابات الكيميائية",
              type: "شرح",
              path: "Stoichiometry.pdf",
              views: 860,
              dateAdded: "2026-05-13"
            },
            extraFiles: [
              {
                name: "تدريبات الحسابات الكيميائية المحلولة - د. حسناء الصمدي",
                type: "مراجعة",
                path: "lesson_2_STOICHIOMETRIC_CALCULATIONSSolvedد_حسناء_الصمدى.pdf",
                views: 580,
                dateAdded: "2026-05-14"
              },
              {
                name: "ورقة عمل تدريبية حسابات كيميائية LMS",
                type: "مراجعة",
                path: "STOICHIOMETRY Practice sheet_ LMS.pdf",
                views: 470,
                dateAdded: "2026-05-14"
              },
              {
                name: "ملخص شرح الكيمياء الحسابية - نورا",
                type: "مراجعة",
                path: "Chemistry Lesson 2 l Nora.pdf",
                views: 512,
                dateAdded: "2026-05-15"
              }
            ],
            formulas: [
              {
                title: "تحويل الكتلة إلى عدد مولات",
                expression: "n = m / M",
                explanation: "حيث n عدد المولات، m كتلة المادة بالجرام، و M الكتلة المولية للمادة (g/mol)."
              }
            ],
            vocabulary: [
              {
                word: "Stoichiometry",
                translation: "الحسابات الكيميائية",
                explanation: "دراسة العلاقات الكمية بين المواد المتفاعلة والناتجة في التفاعل الكيميائي."
              }
            ],
            importantQuestions: [
              {
                question: "ما هي الخطوة الأساسية والأولى في أي حساب كيميائي؟",
                answer: "كتابة المعادلة الكيميائية الرمزية ووزنها بشكل صحيح للحصول على النسب المولية الصحيحة."
              }
            ],
            mcq: [
              {
                question: "حسب المعادلة الموزونة: N2 + 3H2 -> 2NH3. كم مولاً من الهيدروجين يلزم للتفاعل تماماً مع 2 مول من النيتروجين؟",
                options: [
                  "6 مول",
                  "3 مول",
                  "2 مول",
                  "4 مول"
                ],
                answerIndex: 0,
                explanation: "النسبة المولية بين H2 و N2 هي 3:1. بالتالي يلزم 2 * 3 = 6 مول من الهيدروجين."
              }
            ]
          },
          {
            id: "13.2",
            title: "13.2 المادة المحددة للتفاعل والناتج المئوي (Limiting Reactants)",
            videoIds: [],
            summary: "يتناول هذا الدرس مفهوم المادة المحددة للتفاعل (Limiting Reactant) التي تستهلك تماماً في التفاعل وتحدد كمية الناتج، والمادة الفائضة (Excess Reactant). كما ندرس كيفية حساب الناتج النظري والناتج الفعلي وحساب النسبة المئوية للمردود (Percent Yield).",
            pdfFile: {
              name: "شرح درس المادة المحددة للتفاعل والناتج المئوي",
              type: "شرح",
              path: "Lesson 3 Limiting reactants.pdf",
              views: 924,
              dateAdded: "2026-05-16"
            },
            extraFiles: [
              {
                name: "ملف مراجعة شاملة وأسئلة امتحانية كيمياء 10",
                type: "مراجعة",
                path: "1696103130.pdf",
                views: 520,
                dateAdded: "2026-05-16"
              }
            ],
            formulas: [
              {
                title: "النسبة المئوية للمردود (Percent Yield)",
                expression: "Percent Yield = (Actual / Theoretical) * 100",
                explanation: "حيث Actual هو المردود الفعلي المقاس تجريبياً، و Theoretical هو المردود النظري المحسوب رياضياً."
              }
            ],
            vocabulary: [
              {
                word: "Limiting Reactant",
                translation: "المادة المحددة للتفاعل",
                explanation: "المادة التي تستهلك تماماً وتحد من كمية المادة الناتجة في التفاعل الكيميائي."
              },
              {
                word: "Actual Yield",
                translation: "المردود الفعلي",
                explanation: "كمية المادة الناتجة فعلياً عند إجراء التفاعل الكيميائي في المختبر تجريبياً."
              }
            ],
            importantQuestions: [
              {
                question: "لماذا يكون المردود الفعلي للتفاعل الكيميائي أقل من المردود النظري دائماً؟",
                answer: "بسبب عوامل متعددة منها: عدم اكتمال التفاعل، التصاق المواد الناتجة بالأدوات والمراشح، أو حدوث تفاعلات جانبية غير مرغوبة."
              }
            ],
            mcq: [
              {
                question: "إذا كان الناتج النظري لتفاعل ما هو 50 g، والناتج الفعلي الذي تم الحصول عليه هو 40 g، فما النسبة المئوية للمردود؟",
                options: [
                  "80%",
                  "90%",
                  "50%",
                  "125%"
                ],
                answerIndex: 0,
                explanation: "المردود المئوي = (الفعلي / النظري) * 100 = (40 / 50) * 100 = 80%."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "g10-math",
    name: "الرياضيات (Reveal)",
    emoji: "📐",
    color: "violet",
    track: "inspire",
    grade: 10,
    generalFiles: [
      {
        name: "هيكل الرياضيات للصف العاشر المتقدم الفصل الثالث 2025-2026",
        type: "هيكل",
        path: "EoT3_Coverage_G10_ADV_Math_Rev_T3_ 2025-2026.pdf",
        views: 1980,
        dateAdded: "2026-05-18"
      }
    ],
    chapters: [
      {
        id: "g10-math-ch2",
        title: "الوحدة 2 — دوال كثيرات الحدود وتماثلها",
        lessons: [
          {
            id: "2.1",
            title: "2.1 الدوال كثيرات الحدود (Polynomial Functions)",
            videoIds: ["Vh7iKc1YC-M"],
            pdfFile: {
              name: "ملف شرح وتدريبات الدوال كثيرات الحدود",
              type: "شرح",
              path: "2.1 Polynomial function.pdf",
              views: 940,
              dateAdded: "2026-05-10"
            },
            extraFiles: [
              {
                name: "ملف الأعداد المركبة 1.3",
                type: "مراجعة",
                path: "1_3_Complex_Numbers.pdf",
                views: 520,
                dateAdded: "2026-05-10"
              },
              {
                name: "ملف المتباينات التربيعية 1.7",
                type: "مراجعة",
                path: "1_7_Quadratic_Inequalities.pdf",
                views: 480,
                dateAdded: "2026-05-11"
              }
            ],
            summary: "يتناول هذا الدرس تعريف دالة كثيرات الحدود وصيغتها العامة ودرجتها ومعاملها الرئيسي. نتعلم كيفية التعرف على سلوك طرفي التمثيل البياني للدالة (End Behavior) بناءً على درجة الدالة وإشارة المعامل الرئيسي.",
            vocabulary: [
              {
                word: "Polynomial",
                translation: "كثيرة الحدود",
                explanation: "تعبير جبري يتكون من حد واحد أو أكثر من الحدود الجبرية ذات الأسس الصحيحة غير السالبة."
              }
            ],
            mcq: [
              {
                question: "ما هي درجة دالة كثيرة الحدود f(x) = -3x^5 + 4x^3 - x + 7؟",
                options: [
                  "الدرجة الخامسة",
                  "الدرجة الثالثة",
                  "الدرجة السابعة",
                  "المعامل الرئيسي"
                ],
                answerIndex: 0,
                explanation: "درجة كثيرة الحدود هي أكبر أس للمتغير x في حدود الدالة، وهو في هذه الحالة 5."
              }
            ]
          },
          {
            id: "2.2",
            title: "2.2 تحليل تمثيلات دوال كثيرات الحدود (Analyzing Graphs of Polynomials)",
            videoIds: ["KkSKCQM1a-k"],
            pdfFile: {
              name: "شرح درس تحليل تمثيلات دوال كثيرات الحدود بيانيا",
              type: "شرح",
              path: "2.2 Analyzing Graphs of Polynomial Functions.pdf",
              views: 890,
              dateAdded: "2026-05-12"
            },
            summary: "يتناول هذا الدرس تحليل المنحنيات البيانية لكثيرات الحدود، وتحديد الأصفار والتقاطعات مع المحاور، وتحديد القيم العظمى والصغرى المحلية والمطلقة ومجالات التزايد والتناقص للدالة.",
            importantQuestions: [
              {
                question: "كيف نحدد عدد الأصفار الحقيقية الممكنة لدالة من تمثيلها البياني؟",
                answer: "يساوي عدد نقاط تقاطع منحنى الدالة مع المحور الأفقي x."
              }
            ],
            mcq: [
              {
                question: "إذا كان منحنى كثيرة الحدود يقطع المحور x في 3 نقاط، فكم صفراً حقيقياً للدالة؟",
                options: [
                  "3 أصفار",
                  "صفر واحد",
                  "أكثر من 3 أصفار",
                  "لا توجد أصفار"
                ],
                answerIndex: 0,
                explanation: "كل تقاطع مع المحور x يمثل حلاً حقيقياً أو صفراً حقيقياً للدالة، بالتالي 3 تقاطعات = 3 أصفار حقيقية."
              }
            ]
          },
          {
            id: "2.3",
            title: "2.3 العمليات على كثيرات الحدود (Operations with Polynomials)",
            videoIds: ["526m7DdIeWo"],
            pdfFile: {
              name: "شرح عمليات جمع وطرح وضرب كثيرات الحدود",
              type: "شرح",
              path: "2.3 Operations with Polynomials.pdf",
              views: 924,
              dateAdded: "2026-05-13"
            },
            summary: "يتعلم الطالب في هذا الدرس كيفية جمع وطرح كثيرات الحدود عبر تجميع الحدود المتشابهة، وتطبيق ضرب كثيرات الحدود رأسياً وأفقياً باستخدام التوزيع المطور وقوانين الأسس.",
            mcq: [
              {
                question: "ما حاصل ضرب (x - 2)(x + 3)؟",
                options: [
                  "x² + x - 6",
                  "x² - x - 6",
                  "x² - 5x + 6",
                  "x² + 5x - 6"
                ],
                answerIndex: 0,
                explanation: "باستخدام التوزيع: x(x) + x(3) - 2(x) - 2(3) = x² + 3x - 2x - 6 = x² + x - 6."
              }
            ]
          },
          {
            id: "2.4",
            title: "2.4 قسمة كثيرات الحدود (Dividing Polynomials)",
            videoIds: ["0R14gdq4AJE"],
            pdfFile: {
              name: "درس القسمة المطولة والقسمة التركيبية لكثيرات الحدود",
              type: "شرح",
              path: "2.4 Dividing Polynomials.pdf",
              views: 1104,
              dateAdded: "2026-05-14"
            },
            summary: "يشرح هذا الدرس طريقتي قسمة كثيرات الحدود: القسمة المطولة (Long Division) والقسمة التركيبية (Synthetic Division) السريعة والتي نستخدمها عند القسمة على معامل من الدرجة الأولى x - c.",
            importantQuestions: [
              {
                question: "متى نستخدم القسمة التركيبية كبديل للقسمة المطولة؟",
                answer: "عندما يكون المقسوم عليه ثنائية حد من الدرجة الأولى على الصورة x - c، حيث معامل x يساوي 1."
              }
            ],
            mcq: [
              {
                question: "ما ناتج قسمة (x² - 5x + 6) على (x - 2)؟",
                options: [
                  "x - 3",
                  "x + 3",
                  "x - 2",
                  "x - 1"
                ],
                answerIndex: 0,
                explanation: "بتحليل البسط: x² - 5x + 6 = (x - 2)(x - 3). بالقسمة على (x - 2) يتبقى الناتج x - 3 بدون باقٍ."
              }
            ]
          },
          {
            id: "2.5",
            title: "2.5 قوى ذات الحدين (Powers of Binomials)",
            videoIds: ["9Fy54gSZyyw"],
            pdfFile: {
              name: "درس نظرية ذات الحدين ومثلث باسكال",
              type: "شرح",
              path: "2.5 Powers of binomials.pdf",
              views: 790,
              dateAdded: "2026-05-15"
            },
            summary: "يتناول هذا الدرس فك المقدار (a + b)^n باستخدام نظرية ذات الحدين (Binomial Theorem) والتوافيق، والاعتماد على مثلث باسكال لإيجاد المعاملات بسرعة وسهولة دون فك تقليدي مكرر.",
            formulas: [
              {
                title: "نظرية ذات الحدين (Binomial Formula)",
                expression: "(a + b)^n = Σ (nCr) a^(n-r) b^r",
                explanation: "حيث nCr هي التوافيق، وتعطي معاملات كل حد من الحدود المضروبة."
              }
            ],
            mcq: [
              {
                question: "ما هو عدد حدود فك المقدار (x + y)^6؟",
                options: [
                  "7 حدود",
                  "6 حدود",
                  "5 حدود",
                  "12 حداً"
                ],
                answerIndex: 0,
                explanation: "عدد حدود مفكوك ذات الحدين يساوي دائماً الأس مضافاً إليه 1 (n + 1). إذن المفكوك للأس 6 يحتوي على 7 حدود."
              }
            ]
          }
        ]
      },
      {
        id: "g10-math-ch3",
        title: "الوحدة 3 — حل معادلات كثيرات الحدود وجذورها",
        lessons: [
          {
            id: "3.1",
            title: "3.1 حل معادلات كثيرات الحدود بيانياً (Solving Polynomials by Graphing)",
            videoIds: ["-jhmsjWg6Dc"],
            pdfFile: {
              name: "شرح حل المعادلات بيانياً وتقريب الجذور",
              type: "شرح",
              path: "3.1 Solving Polynomial Equations by Graphing.pdf",
              views: 840,
              dateAdded: "2026-05-16"
            },
            summary: "يتناول هذا الدرس مهارة إيجاد حلول معادلات كثيرات الحدود عن طريق رسمها وتحديد النقاط التي يعبر فيها المنحنى محور السينات x، وتقدير الجذور غير الصحيحة بالاعتماد على جدول القيم وتقريبها للعدد العشري الأقرب.",
            mcq: [
              {
                question: "أين تقع أصفار الدالة بيانياً؟",
                options: [
                  "عند نقاط التقاطع مع المحور x",
                  "عند نقاط التقاطع مع المحور y",
                  "عند نقطة الأصل دائماً",
                  "عند القمة العظمى"
                ],
                answerIndex: 0,
                explanation: "حلول المعادلة f(x) = 0 هي إحداثيات x للنقاط التي يقطع عندها تمثيل الدالة المحور الأفقي x."
              }
            ]
          },
          {
            id: "3.2",
            title: "3.2 حل معادلات كثيرات الحدود جبرياً (Solving Polynomials Algebraically)",
            videoIds: ["KxKG6BCbwS0", "Y1-jMzUilHI"],
            pdfFile: {
              name: "شرح حل معادلات كثيرات الحدود جبرياً بالتحليل",
              type: "شرح",
              path: "3.2 Solving Polynomial Equations Algebraically.pdf",
              views: 990,
              dateAdded: "2026-05-17"
            },
            summary: "يشرح هذا الدرس طرقاً جبرية متطورة لحل معادلات كثيرات الحدود: إخراج العامل المشترك الأكبر (GCF)، التحليل بالتجميع، تحليل الفرق بين مربعين، تحليل مجموع مكعبين والفرق بينهما، والصيغة التربيعية البديلة لكثيرات الحدود.",
            formulas: [
              {
                title: "مجموع مكعبين (Sum of Cubes)",
                expression: "a³ + b³ = (a + b)(a² - ab + b²)",
                explanation: "صيغة تحليل المقادير من الدرجة الثالثة الممثلة لمجموع مكعبين."
              },
              {
                title: "الفرق بين مكعبين (Difference of Cubes)",
                expression: "a³ - b³ = (a - b)(a² + ab + b²)",
                explanation: "تحليل الفرق بين مكعبين إلى قوسين جبريين."
              }
            ],
            mcq: [
              {
                question: "ما تحليل المقدار الجبري x³ - 8؟",
                options: [
                  "(x - 2)(x² + 2x + 4)",
                  "(x - 2)(x² - 2x + 4)",
                  "(x + 2)(x² - 2x + 4)",
                  "(x - 2)(x² + 4)"
                ],
                answerIndex: 0,
                explanation: "بما أن 8 هي مكعب العدد 2، نطبق قانون الفرق بين مكعبين: (x - 2)(x² + (x)(2) + 2²) = (x - 2)(x² + 2x + 4)."
              }
            ]
          },
          {
            id: "3.4",
            title: "3.4 نظريتا الباقي والعوامل (The Remainder and Factor Theorems)",
            videoIds: ["RMmGs6HGIp4"],
            pdfFile: {
              name: "شرح وتدريبات نظريتي الباقي والعوامل بالتفصيل",
              type: "شرح",
              path: "3.4 The Remainder theorem and Factor Theorem.pdf",
              views: 915,
              dateAdded: "2026-05-17"
            },
            summary: "يتناول هذا الدرس دراسة نظرية الباقي (Remainder Theorem) التي توضح أن باقي قسمة P(x) على x - c يساوي P(c) مباشرة باستخدام التعويض التركيبي. ودراسة نظرية العوامل (Factor Theorem) للتحقق مما إذا كان ثنائي الحد عاملاً من عوامل كثيرة الحدود.",
            formulas: [
              {
                title: "نظرية الباقي (Remainder Theorem)",
                expression: "Remainder = P(c)",
                explanation: "باقي قسمة الدالة P(x) على المقدار x - c يعادل تماماً قيمة الدالة عند النقطة c."
              }
            ],
            importantQuestions: [
              {
                question: "متى يكون المقدار x - c عاملاً من عوامل دالة كثيرة الحدود P(x)؟",
                answer: "إذا وفقط إذا كان باقي القسمة يساوي صفراً، أي أن P(c) = 0."
              }
            ],
            mcq: [
              {
                question: "إذا كان P(x) = 2x³ - x² + 5، فما باقي قسمة P(x) على x - 2؟",
                options: [
                  "17",
                  "12",
                  "5",
                  "21"
                ],
                answerIndex: 0,
                explanation: "حسب نظرية الباقي، الباقي هو P(2) = 2(2)³ - (2)² + 5 = 2(8) - 4 + 5 = 16 - 4 + 5 = 17."
              }
            ]
          },
          {
            id: "3.5",
            title: "3.5 الجذور والأصفار (Roots and Zeros)",
            videoIds: ["x8AP-J6-l4k"],
            pdfFile: {
              name: "شرح درس الجذور والأصفار ونظرية ديكارت ونظرية الأعداد المركبة",
              type: "شرح",
              path: "3.5 Roots and zeros.pdf",
              views: 1150,
              dateAdded: "2026-05-18"
            },
            summary: "يشرح هذا الدرس النظرية الأساسية في الجبر (Fundamental Theorem of Algebra) التي توضح أن كل دالة كثيرة حدود درجتها n لها بالضبط n من الجذور المركبة. كما ندرس قانون ديكارت للإشارات (Descartes' Rule of Signs) لتحديد عدد الجذور الموجبة والسالبة الممكنة، ونظرية الجذور المترافقة للأعداد المركبة.",
            vocabulary: [
              {
                word: "Fundamental Theorem of Algebra",
                translation: "النظرية الأساسية في الجبر",
                explanation: "كل دالة كثيرة حدود درجتها أكبر من الصفر لها على الأقل جذر واحد في مجموعة الأعداد المركبة."
              }
            ],
            mcq: [
              {
                question: "إذا كان 3 + 2i جذراً لمعادلة كثيرة حدود ذات معاملات حقيقية، فما هو الجذر الآخر الذي يجب أن يكون حلاً للمعادلة؟",
                options: [
                  "3 - 2i",
                  "-3 + 2i",
                  "-3 - 2i",
                  "2 + 3i"
                ],
                answerIndex: 0,
                explanation: "حسب نظرية الجذور المركبة المترافقة، فإن الأعداد المركبة تأتي دائماً في أزواج مترافقة كحلول، بالتالي مرافق 3 + 2i هو 3 - 2i."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "g10-english",
    name: "اللغة الإنجليزية (English)",
    emoji: "📚",
    color: "amber",
    track: "inspire",
    grade: 10,
    generalFiles: [
      {
        name: "مراجعة مهارات الاستماع والمحادثة للفصل الثالث إنجليزي عاشر متقدم",
        type: "مراجعة",
        path: "Grade_11_General_Grade_10_Advanced_Listening_and_Speaking_2025_2.pdf",
        views: 890,
        dateAdded: "2026-05-18"
      },
      {
        name: "مراجعة مهارات القراءة والكتابة والامتحان النهائي إنجليزي عاشر متقدم",
        type: "مراجعة",
        path: "Grade_11_General_Grade_10_Advanced_Reading_and_Writing_2025_2026.pdf",
        views: 954,
        dateAdded: "2026-05-19"
      }
    ],
    chapters: [
      {
        id: "g10-eng-ch5",
        title: "Chapter 5 & 6 — English Skills & Vocabulary Hub",
        lessons: [
          {
            id: "5.1",
            title: "5.1 Listening and Speaking Preparation (الاستماع والمحادثة)",
            videoIds: [], // NO VIDEOS as per user rules!
            summary: "This lesson covers fundamental listening and speaking strategies tailored for the Grade 10 Advanced exam. It includes listening scripts analysis, presentation tips, key speaking topics, and academic vocabulary usage in dialogue.",
            pdfFile: {
              name: "Listening and Speaking Review",
              type: "مراجعة",
              path: "Grade_11_General_Grade_10_Advanced_Listening_and_Speaking_2025_2.pdf",
              views: 640,
              dateAdded: "2026-05-10"
            },
            vocabulary: [
              {
                word: "Advocate",
                translation: "يدافع عن / يؤيد",
                explanation: "To publicly support or suggest an idea, development, or way of doing something."
              }
            ],
            mcq: [
              {
                question: "Choose the correct academic term: 'The school board decided to _______ new eco-friendly rules.'",
                options: [
                  "advocate",
                  "ignore",
                  "restrict",
                  "abolish"
                ],
                answerIndex: 0,
                explanation: "'Advocate' fits best as a positive active verb meaning to promote or support the rules."
              }
            ]
          },
          {
            id: "5.2",
            title: "5.2 Reading and Writing Practice (القراءة والكتابة)",
            videoIds: [],
            summary: "This unit focuses on reading comprehension strategies for informational and poetic texts, identifying the author's tone, main ideas, and structural devices. It also prepares students for argumentative and descriptive writing tasks with structural frameworks.",
            pdfFile: {
              name: "Reading and Writing Core Review",
              type: "مراجعة",
              path: "Grade_11_General_Grade_10_Advanced_Reading_and_Writing_2025_2026.pdf",
              views: 755,
              dateAdded: "2026-05-12"
            },
            vocabulary: [
              {
                word: "Coherence",
                translation: "التماسك / الترابط",
                explanation: "The quality of being logical, orderly, and clearly connected in writing."
              }
            ],
            mcq: [
              {
                question: "What is the primary key to achieving 'coherence' in an essay?",
                options: [
                  "Using logical transitions and connectors",
                  "Writing very long paragraphs",
                  "Avoiding punctuation marks",
                  "Repeating the exact same word repeatedly"
                ],
                answerIndex: 0,
                explanation: "Coherence is built when sentences flow logically from one to the next using proper transitions."
              }
            ]
          },
          {
            id: "5.3",
            title: "5.3 Vocabulary Chapter 5 & 6 (مفردات الوحدة الخامسة والسادسة)",
            videoIds: [],
            summary: "Detailed review of all crucial academic vocabulary lists for Chapter 5 and Chapter 6 (Term 3) as detailed in the ministry specifications for the listening, speaking, reading, and writing exams.",
            extraFiles: [
              {
                name: "Words Chapter 5 Term 3 Listening & Speaking",
                type: "مراجعة",
                path: "Words_Grade_10_ADV_11_General_Chapter_5_Term_3_Listening_ _speak.pdf",
                views: 520,
                dateAdded: "2026-05-14"
              },
              {
                name: "Words Chapter 5 Term 3 Reading & Writing",
                type: "مراجعة",
                path: "Words_Grade_10_ADV_11_General_Chapter_5_Term_3_Reading_ _Writing.pdf",
                views: 480,
                dateAdded: "2026-05-14"
              },
              {
                name: "Words Chapter 6 Term 3 Listening & Speaking",
                type: "مراجعة",
                path: "Words_Grade_10_ADV_11_General_Chapter_6_Term_3_Listening_ _speak.pdf",
                views: 390,
                dateAdded: "2026-05-15"
              },
              {
                name: "Words Chapter 6 Term 3 Reading & Writing",
                type: "مراجعة",
                path: "Words_Grade_10_ADV_11_General_Chapter_6_Term_3_Reading_ _Writing.pdf",
                views: 420,
                dateAdded: "2026-05-15"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "g10-islamic",
    name: "التربية الإسلامية",
    emoji: "🕌",
    color: "emerald",
    track: "inspire",
    grade: 10,
    generalFiles: [
      {
        name: "ملخص هيكل التربية الإسلامية للصف العاشر الفصل الثالث 2026",
        type: "هيكل",
        path: "تلخيص_هيكل_التربية_الاسلامية_WeSeniors28_2.pdf",
        views: 1840,
        dateAdded: "2026-05-18"
      },
      {
        name: "ملخص التربية الإسلامية الجديد المحدث عاشر 2026",
        type: "مراجعة",
        path: "ملخص عاشرجديد 11-06-2026.pdf",
        views: 1104,
        dateAdded: "2026-05-19"
      },
      {
        name: "الملزمة الشاملة لمراجعة وتلخيص دروس الفصل الثالث",
        type: "مراجعة",
        path: "ملزمة_شاملة_مراجعة_وتلخيص_الدروس_الصف_العاشر_مادة_التربية_الاسلا.pdf",
        views: 940,
        dateAdded: "2026-05-20"
      }
    ],
    chapters: [
      {
        id: "g10-isl-ch3",
        title: "الوحدة 3 — التربية الإسلامية والهيكل الوزاري",
        lessons: [
          {
            id: "isl.1",
            title: "isl.1 مراجعة الدروس والهيكل التفاعلي (Islamic Studies Core Review)",
            videoIds: ["6QbtXY-vYuM", "gmDKOwoPK-g"],
            pdfFile: {
              name: "ملخص هيكل التربية الإسلامية للصف العاشر",
              type: "هيكل",
              path: "تلخيص_هيكل_التربية_الاسلامية_WeSeniors28_2.pdf",
              views: 980,
              dateAdded: "2026-05-10"
            },
            extraFiles: [
              {
                name: "ملخص أوراق مراجعة هامة عاشر",
                type: "مراجعة",
                path: "اوراق_مراجعة_هامة_للفصل_الثالث_تربية_اسلامية_صف_عاشر.pdf",
                views: 520,
                dateAdded: "2026-05-10"
              },
              {
                name: "أوراق عمل مراجعة شاملة للامتحان",
                type: "مراجعة",
                path: "اوراق_عمل_مراجعة_شاملة_الصف_العاشر_مادة_التربية_الاسلامية.pdf",
                views: 480,
                dateAdded: "2026-05-11"
              },
              {
                name: "امتحان نهاية الفصل الثالث 2018 المعتمد",
                type: "امتحان",
                path: "امتحان_نهاية_الفصل_الثالث_2018_تربية_اسلامية_صف_عاشر.pdf",
                views: 340,
                dateAdded: "2026-05-12"
              }
            ],
            summary: "يتناول هذا الدرس تلخيصاً شاملاً لجميع فروع التربية الإسلامية المقررة بالهيكل الوزاري للفصل الدراسي الثالث، ويغطي الآيات القرآنية المقررة للحفظ والتفسير، والأحاديث النبوية الشريفة وعبر الأحكام الفقهية والقيم الإسلامية.",
            vocabulary: [
              {
                word: "Iman",
                translation: "الإيمان",
                explanation: "التصديق الجازم بالقلب والإقرار باللسان والعمل بالأركان."
              }
            ],
            mcq: [
              {
                question: "ما هو الحكم التجويدي في قوله تعالى 'من بعد'؟",
                options: [
                  "إقلاب",
                  "إدغام بغنة",
                  "إخفاء حقيقي",
                  "إظهار حلقي"
                ],
                answerIndex: 0,
                explanation: "حكم النون الساكنة هنا هو الإقلاب لمجيء حرف الباء بعد النون الساكنة وتتحول النون إلى ميم مخفاة بغنة."
              }
            ]
          },
          {
            id: "isl.2",
            title: "isl.2 طاعة ولي الأمر والجهاد في سبيل الله (Obedience & Jihad Rules)",
            videoIds: ["wp8zfg6Z4qI", "UlQzanpqwMw"],
            summary: "يتناول هذا الدرس تفصيلاً شرعياً للأحكام والضوابط المنظمة لطاعة أولياء الأمور وحكام المسلمين بالمعروف وأثرها في استقرار الدول، بالإضافة لدراسة أحكام الجهاد وضوابطه الشرعية الحازمة في الإسلام وربطه بسلطة الدولة المعاصرة ودور القوات المسلحة.",
            extraFiles: [
              {
                name: "ملخص درس طاعة ولي الامر",
                type: "مراجعة",
                path: "ملخص درس طاعة ولي الامر.pdf",
                views: 520,
                dateAdded: "2026-05-14"
              },
              {
                name: "الجهاد في سبيل الله - الجزء الأول",
                type: "مراجعة",
                path: "الجهاد في سبيل الله _١.pdf",
                views: 480,
                dateAdded: "2026-05-14"
              }
            ],
            importantQuestions: [
              {
                question: "ما هي شروط طاعة ولي الأمر؟",
                answer: "تكون الطاعة واجبة في غير معصية الخالق، لقوله صلى الله عليه وسلم: 'إنما الطاعة في المعروف'، وهدفها استتباب الأمن وحفظ النظام."
              }
            ],
            mcq: [
              {
                question: "ما حكم إعلان الجهاد والنفير العام في الإسلام؟",
                options: [
                  "هو من الصلاحيات الحصرية لولي الأمر (حاكم الدولة)",
                  "هو فرض عين على كل فرد بقراره الشخصي",
                  "هو أمر تطوعي اختياري",
                  "لا يشترط فيه إذن الحاكم"
                ],
                answerIndex: 0,
                explanation: "إعلان الجهاد هو مسؤولية وصلاحية حصرية لولي الأمر والقيادة العليا للدولة لحفظ دماء المسلمين وتنظيم الدفاع."
              }
            ]
          },
          {
            id: "isl.3",
            title: "isl.3 الإيمان بالغيب وموسى عليه السلام وحفظ السنة",
            videoIds: ["fZP5U9N1eR4", "QF3QjiiSz8k", "5rPnYYN-Oks"],
            summary: "يتناول هذا الدرس مفهوم الإيمان بالغيب ودلالاته وأثره في طمأنينة النفس البشرية وسلوك المؤمن، ودراسة قصص ومواقف من حياة نبي الله موسى عليه السلام وتجليات الصبر والثقة بالله، وحفظ السنة النبوية وجهود علماء الأمة المخلصين لتدوين الحديث الشريف.",
            extraFiles: [
              {
                name: "ملخص درس الايمان بالغيب",
                type: "مراجعة",
                path: "ملخص درس الايمان بالغيب.pdf",
                views: 490,
                dateAdded: "2026-05-16"
              },
              {
                name: "ملخص جهود العلماء في حفظ السنة",
                type: "مراجعة",
                path: "ملخص جهود العلماء في حفظ السنة.pdf",
                views: 530,
                dateAdded: "2026-05-16"
              },
              {
                name: "ملخص درس موسى عليه السلام",
                type: "مراجعة",
                path: "ملخص درس موسى عليه السلام.pdf",
                views: 410,
                dateAdded: "2026-05-17"
              }
            ],
            mcq: [
              {
                question: "أي مما يلي يعد من أثر الإيمان بالغيب على المسلكيات اليومية؟",
                options: [
                  "الشعور بالرقابة الذاتية ومخافة الله في السر والعلن",
                  "الكسل والاعتماد على الحظ والصدفة",
                  "السعي وراء السحر والشعوذة",
                  "الخوف من المستقبل والقلق المستمر"
                ],
                answerIndex: 0,
                explanation: "الإيمان بالغيب يورث استشعار رقابة الله والضمير اليقظ والعمل الصالح الخالص طلباً للثواب الأخروي."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "g10-arabic",
    name: "اللغة العربية",
    emoji: "✍️",
    color: "red",
    track: "inspire",
    grade: 10,
    generalFiles: [
      {
        name: "هيكل اللغة العربية للصف العاشر المتقدم الفصل الثالث 2026",
        type: "هيكل",
        path: "10-هيكل الاختبار - الفصل الثالث.pdf",
        views: 1890,
        dateAdded: "2026-05-18"
      },
      {
        name: "ملخص مادة اللغة العربية الشامل - صف 10",
        type: "مراجعة",
        path: "عربي ملخص 10 20.pdf",
        views: 940,
        dateAdded: "2026-05-19"
      }
    ],
    chapters: [
      {
        id: "g10-ara-ch1",
        title: "رواية الشيخ والبحر (The Old Man and the Sea)",
        lessons: [
          {
            id: "ara.1",
            title: "ara.1 تلخيص وتحليل رواية الشيخ والبحر",
            videoIds: [],
            pdfFile: {
              name: "ملخص رواية الشيخ والبحر كاملة",
              type: "مراجعة",
              path: "ملخص الرواية.pdf",
              views: 980,
              dateAdded: "2026-05-10"
            },
            extraFiles: [
              {
                name: "إجابات وحل أسئلة رواية الشيخ والبحر",
                type: "مراجعة",
                path: "عربي10اجابات رواية الشيخ والبحر.pdf",
                views: 520,
                dateAdded: "2026-05-11"
              },
              {
                name: "ملف تلخيص آخر الرواية وحبكتها",
                type: "مراجعة",
                path: "تلخيص_اخر_روايه_الشيخ_و_البحر.pdf",
                views: 480,
                dateAdded: "2026-05-11"
              }
            ],
            summary: "يتناول هذا القسم دراسة تفصيلية وتحليلاً أدبياً عميقاً لرواية الشيخ والبحر (للكاتب إرنست همنغواي). نركز على استخلاص الشخصيات (سانتياغو، مانولين)، الصراع (الإنسان والطبيعة)، الدلالات والرموز (السمكة، أسماك القرش، الأسود على الشاطئ)، وعوامل الإرادة والعزيمة الإنسانية وتلخيص الفصول والنهاية.",
            formulas: [
              {
                title: "شخصية سانتياغو (Santiago)",
                expression: "الصبر والصمود والإرادة القوية أمام قوى الطبيعة والقرش",
                explanation: "يمثل سانتياغو في رواية الشيخ والبحر رمزاً للإنسان المكافح الذي يواجه العقبات بكل نبل وقوة ولا يقبل الهزيمة والاستسلام."
              },
              {
                title: "رمزية سمكة المارلن (Marlin)",
                expression: "الهدف الأسمى والخصم النبيل والتحدي العظيم",
                explanation: "ترمز سمكة المارلن للأحلام والأهداف العظيمة التي يسعى الإنسان بشتى الطرق لتحقيقها بكل ما أوتي من قوة ونضال."
              },
              {
                title: "مغزى الرواية الفلسفي والوجودي",
                expression: "الإنسان قد يُدمر ولكنه لا يُهزم أبداً",
                explanation: "العبرة الكبرى هي أن النصر الحقيقي يكمن في المحاولة النبيلة والشرف والكفاح الصادق وليس فقط في النتيجة المادية."
              }
            ],
            vocabulary: [
              {
                word: "Santiago",
                translation: "سانتياغو",
                explanation: "بطل الرواية، وهو صياد كوبي عجوز، يعبر عن الصمود والإصرار أمام التحديات الصعبة."
              },
              {
                word: "Marlin",
                translation: "السمكة الكبيرة (المارلن)",
                explanation: "تمثل الخصم النبيل والعقبة الكبرى والهدف العظيم الذي ناضل سانتياغو طويلاً للظفر به."
              }
            ],
            importantQuestions: [
              {
                question: "إلى ماذا ترمز أسماك القرش في رواية الشيخ والبحر؟",
                answer: "ترمز لقوى الفناء، والمصاعب والعقبات الحياتية التي تسلب الإنسان ثمرة كفاحه ونضاله، لكنها لا تهز عزيمته."
              },
              {
                question: "ما هي العبرة الكبرى المأخوذة من كلمات الصياد سانتياغو؟",
                answer: "عبارته الشهيرة: 'الإنسان لم يُخلق للهزيمة، قد يُدمر الإنسان ولكنه لا يُهزم'."
              }
            ],
            mcq: [
              {
                question: "من هو الفتى الذي كان يساعد الصياد سانتياغو ويرعاه بإخلاص؟",
                options: [
                  "مانولين",
                  "مارتن",
                  "بيدرو",
                  "سيباستيان"
                ],
                answerIndex: 0,
                explanation: "الفتى مانولين هو الصديق الوفي للصياد سانتياغو، وكان يتعلم منه الصيد ويساعده ويهتم بطعامه ورعايته رغم منع والديه."
              }
            ]
          }
        ]
      },
      {
        id: "g10-ara-ch2",
        title: "النصوص الأدبية والبلاغة والنحو المدمج",
        lessons: [
          {
            id: "ara.2",
            title: "ara.2 النصوص الشعرية والمعلوماتية (Poetry & Analysis)",
            videoIds: [],
            pdfFile: {
              name: "ملف شرح نصوص الهيكل اللغوية",
              type: "شرح",
              path: "عربي ملخص 10 20.pdf",
              views: 790,
              dateAdded: "2026-05-13"
            },
            summary: "يركز هذا الدرس على مراجعة النصوص الشعرية المقررة بالهيكل الوزاري، استخراج الصور البيانية (المجاز، التشبيه البليغ، الاستعارة المكنية والتصريحية)، ودراسة خصائص النصوص المعلوماتية ومؤشراتها التنظيمية وكتابة الفكرة المحورية.",
            formulas: [
              {
                title: "الاستعارة المكنية (Metaphor)",
                expression: "حذف المشبه به والرمز له بصفة من صفاته اللازمة له",
                explanation: "مثل: 'سال القلم بالحق' حيث شبه القلم بماء يسيل وحذف الماء (المشبه به) ورمز له بصفة السيلان (سال)."
              },
              {
                title: "التشبيه البليغ",
                expression: "حضور طرفي التشبيه فقط (المشبه والمشبه به) وحذف بقية الأركان",
                explanation: "مثل: 'العلم نور'، يعبر عن المطابقة التامة بين الطرفين لإيصال الفكرة بأقوى صيغة تعبيرية فنية وبلاغية."
              },
              {
                title: "الاستعارة التصريحية",
                expression: "حذف المشبه والتصريح بلفظ المشبه به مباشرة في السياق",
                explanation: "مثل قوله تعالى: 'اعتصموا بحبل الله'، حيث صرح بالمشبه به (الحبل) وأراد وحذف المشبه وهو (عهد الله ودينه)."
              }
            ],
            vocabulary: [
              {
                word: "Metaphor",
                translation: "الاستعارة",
                explanation: "تشبيه بليغ حُذف أحد طرفيه (المشبه أو المشبه به) مع بقاء قرينة تدل عليه."
              }
            ],
            importantQuestions: [],
            mcq: [
              {
                question: "في عبارة 'سال القلم بالحق'، ما الصورة البيانية المتوفرة؟",
                options: [
                  "استعارة مكنية",
                  "تشبيه بليغ",
                  "استعارة تصريحية",
                  "مجاز مرسل"
                ],
                answerIndex: 0,
                explanation: "استعارة مكنية؛ حيث شبه القلم بماء يسيل، وحذف المشبه به (الماء) ودل عليه بقرينة (سال)."
              }
            ]
          },
          {
            id: "ara.3",
            title: "ara.3 النحو والضمائر (Arabic Grammar & Pronouns)",
            videoIds: [],
            summary: "مراجعة قواعد النحو المقررة بالهيكل اللغوي للصف العاشر: إعراب الضمائر المتصلة بالأسماء والأفعال والحروف، وحالات اتصالها في محلات الرفع والنصب والجر، بالإضافة للأساليب النحوية والخبر والإنشاء ومواقع الكلمات الإعرابية المطلوبة للامتحان.",
            formulas: [
              {
                title: "ضمائر الرفع المتصلة بالأفعال",
                expression: "تُ، نَا، تَ، تِ، تُما، تُم، تُنّ، و، ا، ي، ن",
                explanation: "تتصل بالأفعال وتكون مبنية في محل رفع فاعل دائماً، مثل: كتبتُ، كتبنا، كتبوا، كتبْنَ، تكتبين."
              },
              {
                title: "ضمائر النصب والجر المتصلة (ناهيك)",
                expression: "نَا المتكلمين، هاء الغائب، ياء المتكلم، كاف الخطاب",
                explanation: "تكون في محل نصب مفعول به إذا اتصلت بالأفعال، ومحل نصب اسم إن إذا اتصلت بالحروف الناسخة، وفي محل جر مضاف إليه مع الأسماء، وجر بحرف الجر مع الحروف."
              },
              {
                title: "الضمير المستتر تقديره جوازاً ووجوباً",
                expression: "هو، هي (جوازاً) • أنا، نحن، أنتَ (وجوباً)",
                explanation: "الضمائر المستترة لا تظهر في اللفظ بل تُلحظ وتُفهم من سياق الفعل وحال فاعله الإسنادي."
              }
            ],
            vocabulary: [
              {
                word: "Pronoun",
                translation: "الضمير",
                explanation: "اسم جامد مبني يحل محل الاسم الظاهر اختصاراً، ويقسم إلى منفصل ومتصل ومستتر."
              }
            ],
            importantQuestions: [
              {
                question: "ما إعراب الضمير 'الهاء' في كلمة 'كتابه'؟",
                answer: "ضمير متصل مبني في محل جر مضاف إليه؛ لأن أي ضمير يتصل بالاسم يكون دائماً مبنياً في محل جر بالإضافة."
              }
            ],
            mcq: [
              {
                question: "في جملة 'المعلمون يخلصون في عملهم'، ما موقع الواو في 'يخلصون' من الإعراب؟",
                options: [
                  "ضمير متصل مبني في محل رفع فاعل",
                  "حرف زائد لعلامة الجمع لا محل له",
                  "ضمير مبني في محل نصب مفعول به",
                  "في محل جر بالإضافة"
                ],
                answerIndex: 0,
                explanation: "واو الجماعة في الأفعال الخمسة هي ضمير متصل مبني في محل رفع فاعل."
              }
            ]
          }
        ]
      }
    ]
  }
];
