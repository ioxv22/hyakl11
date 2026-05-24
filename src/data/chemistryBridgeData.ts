import { Subject } from "./mockData";

export const chemistryBridgeSubject: Subject = {
  id: "chemistry_bridge",
  name: "الكيمياء (Bridge)",
  emoji: "🧪",
  color: "orange",
  track: "bridge",
  generalFiles: [
    { name: "كتيب مراجعة الكيمياء الشامل للفصل الثالث EOT 📂", type: "هيكل", path: "Revision booklet 11 Adv.pdf", views: 4500, dateAdded: "2026-05-24" },
    { name: "هيكل الكيمياء الوزاري للعام الدراسي 2026 📂", type: "هيكل", path: "EOT-CHE-1-T3-26_MOE.pdf", views: 2450, dateAdded: "2026-05-24" },
    { name: "شرح محمد زيادة - قناة يوتيوب كيمياء", type: "شرح", path: "https://www.youtube.com/results?search_query=محمد+زيادة+كيمياء", views: 9999, dateAdded: "2026-05-24" }
  ],
  chapters: [
    {
      id: "ch1_intro_acids_bases",
      title: "1. مقدمة في الأحماض والقواعد",
      lessons: [
        {
          id: "intro_ab_basics",
          title: "نماذج الأحماض والقواعد",
          videoIds: ["VlwHvsUqCW8", "HRO9noChqtI", "7_xLbG_eFXA"],
          summary: "الأحماض تحول ورقة تباع الشمس للأحمر وتنتج أيونات الهيدروجين (أرهينيوس)، أو تمنح بروتونات (برونستد-لوري). القواعد تحولها للأزرق وتنتج الهيدروكسيد أو تستقبل بروتونات.",
          pdfFile: { name: "ملخص الأحماض والقواعد أ. هشام الطوخي 📂", type: "شرح", path: "Acids and Bases- 12 Adv.- Mr. Hesham Eltoukhy.pdf", views: 3400, dateAdded: "2026-05-24" },
          formulas: [
            { title: "أرهينيوس (Arrhenius)", expression: "\\text{Acid} \\rightarrow H^+ + X^-", explanation: "الحمض ينتج أيون هيدروجين في المحلول المائي." },
            { title: "برونستد-لوري (Brønsted-Lowry)", expression: "\\text{HA} + H_2O \\rightleftharpoons H_3O^+ + A^-", explanation: "الحمض مانح للبروتون، والقاعدة مستقبلة للبروتون. A- هي القاعدة المرافقة للحمض HA." }
          ],
          mcq: [
            { question: "المادة التي يمكن أن تسلك سلوك الحمض والقاعدة (مثل الماء) تسمى:", options: ["مادة متعادلة", "مادة أمفوتيرية", "مادة قاعدية قوية", "مادة لويس"], answerIndex: 1, explanation: "المواد الأمفوتيرية (Amphoteric) تتفاعل كأحماض في وجود قواعد، وكقواعد في وجود أحماض." },
            { question: "حسب نموذج برونستد-لوري، القاعدة المرافقة لحمض H2SO4 هي:", options: ["SO4(2-)", "H3O+", "HSO4-", "OH-"], answerIndex: 2, explanation: "تنتج القاعدة المرافقة بعد أن يفقد الحمض بروتوناً واحداً (H+)." }
          ],
          importantQuestions: [
            { question: "ما هو حمض وقاعدة لويس؟", answer: "حمض لويس هو مادة مستقبلة لزوج من الإلكترونات. قاعدة لويس هي مادة مانحة لزوج من الإلكترونات." }
          ]
        }
      ]
    },
    {
      id: "ch2_strength",
      title: "2. قوة الأحماض والقواعد",
      lessons: [
        {
          id: "strength_basics",
          title: "ثوابت التأين Ka و Kb",
          videoIds: ["Cn4WrehtpNc", "WFCGBTEm7uw"],
          summary: "الأحماض القوية (مثل HCl) تتأين كلياً في الماء، بينما الضعيفة (مثل CH3COOH) تتأين جزئياً ولها ثابت تأين (Ka).",
          pdfFile: { name: "ملخص شرح قوة الأحماض أ. هشام الطوخي 📂", type: "شرح", path: "Acids and Bases- 12 Adv.- Mr. Hesham Eltoukhy.pdf", views: 2900, dateAdded: "2026-05-24" },
          formulas: [
            { title: "ثابت تأين الحمض", expression: "K_a = \\frac{[H^+][A^-]}{[HA]}", explanation: "كلما زادت قيمة Ka، زادت قوة الحمض الضعيف." },
            { title: "ثابت تأين القاعدة", expression: "K_b = \\frac{[BH^+][OH^-]}{[B]}", explanation: "كلما زادت قيمة Kb، زادت قوة القاعدة الضعيفة." }
          ],
          mcq: [
            { question: "أي الأحماض التالية يُعد حمضاً قوياً؟", options: ["CH3COOH", "HF", "HClO4", "H2CO3"], answerIndex: 2, explanation: "حمض البيركلوريك HClO4 هو أحد الأحماض القوية الستة المألوفة التي تتأين كلياً." },
            { question: "ما العلاقة بين قوة الحمض وقوة قاعدته المرافقة؟", options: ["علاقة طردية", "علاقة عكسية", "لا توجد علاقة", "تتساوى القوتان"], answerIndex: 1, explanation: "الحمض القوي ينتج قاعدة مرافقة ضعيفة جداً، والحمض الضعيف ينتج قاعدة مرافقة قوية نسبياً." }
          ],
          importantQuestions: [
            { question: "اكتب تعبير ثابت التأين Ka لحمض الهيدروفلوريك (HF).", answer: "Ka = [H+][F-] / [HF]" }
          ]
        }
      ]
    },
    {
      id: "ch3_ph_poh",
      title: "3. أيونات الهيدروجين والرقم الهيدروجيني",
      lessons: [
        {
          id: "ph_basics",
          title: "حسابات pH و pOH",
          videoIds: ["Rm5jX-8FHuQ", "FpuEieKxl3c", "9i-ND6dp92I", "n72E8utGVIA"],
          summary: "الرقم الهيدروجيني (pH) هو اللوغاريتم السالب لتركيز أيونات الهيدروجين. في الماء النقي عند 298K، يكون pH = 7.",
          pdfFile: { name: "تدريبات ومسائل على الرقم الهيدروجيني 📂", type: "مراجعة", path: "Revision booklet 11 Adv.pdf", views: 3200, dateAdded: "2026-05-24" },
          formulas: [
            { title: "الرقم الهيدروجيني", expression: "pH = -\\log[H^+]", explanation: "pH أقل من 7 حمضي، وأكبر من 7 قاعدي." },
            { title: "الرقم الهيدروكسيدي", expression: "pOH = -\\log[OH^-]", explanation: "" },
            { title: "ثابت تأين الماء", expression: "K_w = [H^+][OH^-] = 1.0 \\times 10^{-14}", explanation: "" },
            { title: "العلاقة بين pH و pOH", expression: "pH + pOH = 14", explanation: "في المحاليل المائية عند 25 درجة سيليزية." }
          ],
          mcq: [
            { question: "إذا كان تركيز [H+] = 1.0 × 10^-4، فما هو الـ pH؟", options: ["10", "4", "-4", "14"], answerIndex: 1, explanation: "pH = -log(10^-4) = 4." },
            { question: "محلول قيمة pOH له تساوي 2، يُعد هذا المحلول:", options: ["قاعدياً قوياً", "حمضياً قوياً", "متعادلاً", "حمضياً ضعيفاً"], answerIndex: 0, explanation: "pOH = 2 يعني أن pH = 12، وهو قاعدي قوي." }
          ],
          importantQuestions: [
            { question: "احسب تركيز [OH-] في محلول تركيز أيونات الهيدروجين فيه 1.0 × 10^-5 M.", answer: "[OH-] = Kw / [H+] = 10^-14 / 10^-5 = 1.0 × 10^-9 M" }
          ]
        }
      ]
    },
    {
      id: "ch4_neutralization",
      title: "4. التعادل والمعايرة",
      lessons: [
        {
          id: "neutralization_basics",
          title: "تفاعلات التعادل وحسابات المعايرة والاتزان",
          videoIds: ["F9IsF_B1Sys", "hkGrYFlunF8", "fC8QivssaUk"],
          summary: "التعادل هو تفاعل حمض مع قاعدة لإنتاج ملح وماء. المعايرة تُستخدم لمعرفة تركيز مجهول باستخدام محلول قياسي معلوم التركيز. الاتزان الكيميائي يحدث عندما تتساوى سرعة التفاعل الأمامي والعكسي.",
          pdfFile: { name: "ملف شرح وحل الاتزان الكيميائي أ. هشام الطوخي 📂", type: "شرح", path: "Chemical Equilibrium 12 Advanced Mr. Hesham Eltoukhy.pdf", views: 3500, dateAdded: "2026-05-24" },
          extraFiles: [
            { name: "الاتزان الكيميائي - تمارين محلولة 📂", type: "مراجعة", path: "Equilibrium Sec3 2026 11ADV SOLVED.pdf", views: 1500, dateAdded: "2026-05-24" }
          ],
          formulas: [
            { title: "معادلة المعايرة (التعادل)", expression: "M_A V_A = M_B V_B", explanation: "تُطبق عند نقطة التكافؤ لتفاعل حمض أحادي مع قاعدة أحادية." }
          ],
          mcq: [
            { question: "النقطة التي يتغير عندها لون الكاشف في عملية المعايرة تسمى:", options: ["نقطة التكافؤ", "نقطة النهاية", "نقطة التعادل", "النقطة القياسية"], answerIndex: 1, explanation: "نقطة النهاية (End point) هي النقطة التي يتغير فيها لون الكاشف كدليل على انتهاء المعايرة." },
            { question: "عند معايرة حمض قوي مع قاعدة قوية، يكون pH عند نقطة التكافؤ يساوي:", options: ["أكبر من 7", "أقل من 7", "يساوي 7 تماماً", "يساوي 14"], answerIndex: 2, explanation: "التعادل بين قوي وقوي يعطي ملحاً متعادلاً (pH = 7)." }
          ],
          importantQuestions: [
            { question: "ما هي نقطة التكافؤ (Equivalence point)؟", answer: "هي النقطة التي يتساوى عندها عدد مولات أيونات [H+] من الحمض مع عدد مولات أيونات [OH-] من القاعدة." }
          ]
        }
      ]
    }
  ]
};
