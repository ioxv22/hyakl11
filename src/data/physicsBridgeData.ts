import { Subject } from "./mockData";

export const physicsBridgeSubject: Subject = {
  id: "physics_bridge",
  name: "الفيزياء (Bridge)",
  emoji: "⚡",
  color: "violet",
  track: "bridge",
  generalFiles: [
    { name: "شرح محمد زياد - قناة يوتيوب", type: "شرح", path: "https://www.youtube.com/c/MohamedZiad", views: 9999, dateAdded: "2026-05-24" },
    { name: "شرح فلك الأحياء - قناة يوتيوب (للفائدة)", type: "شرح", path: "https://www.youtube.com/@BioFalak/featured", views: 9999, dateAdded: "2026-05-24" },
    { name: "Rotational motion", type: "مراجعة", path: "Rotational motion.pdf", views: 1540, dateAdded: "2026-05-24" },
    { name: "Physics Made Easy Rotational motion", type: "مراجعة", path: "Physics Made Easy Rotational motion.pdf", views: 1320, dateAdded: "2026-05-24" },
    { name: "Rotational dynamics", type: "مراجعة", path: "Rotational dynamics.pdf", views: 1205, dateAdded: "2026-05-24" },
    { name: "MOMENTUM", type: "مراجعة", path: "MOMENTUM.pdf", views: 1104, dateAdded: "2026-05-24" },
    { name: "Module 16 Reflection and Refraction 10adv", type: "مراجعة", path: "Module 16 Reflection and Refraction 10adv.pdf", views: 980, dateAdded: "2026-05-24" },
    { name: "الاختبار الوزاري فيزياء الاكتروني 11 متقدم 23-24", type: "امتحان", path: "الاختبار_الوزاري_فيزياء_الاكتروني_11_متقدم_23_24_الفصل_الثاني.pdf", views: 2500, dateAdded: "2026-05-24" },
    { name: "الاختبار الوزاري الاكتروني فيزياء 11 متقدم 2022", type: "امتحان", path: "الاختبار_الوزاري_الاكتروني_فيزياء_11_متقدم_للمنهجين_لعام_2022_20.pdf", views: 2300, dateAdded: "2026-05-24" },
    { name: "حلول الاختبار الاكتروني الوزاري فيزياء 23-24", type: "مراجعة", path: "حلول_الاختبار_الاكتروني_الوزاري_فيزياء_2023_2024_حادي_عشر_متقدم_.pdf", views: 3400, dateAdded: "2026-05-24" },
    { name: "الاختبار الوزاري فيزياء ورقي 11 متقدم 23-24", type: "امتحان", path: "الاختبار_الوزاري_فيزياء_ورقي_11_متقدم_23_24_للفصل_الثاني_.pdf", views: 2100, dateAdded: "2026-05-24" },
    { name: "حلول الاختبار الورقي فيزياء 11 متقدم 23-24", type: "مراجعة", path: "حلول_الاختبار_الورقي_فيزياء_11_متقدم_للمنهجين_عام_2023_2024_للفص.pdf", views: 2900, dateAdded: "2026-05-24" }
  ],
  chapters: [
    {
      id: "ch1_momentum",
      title: "1. Momentum (الزخم)",
      lessons: [
        {
          id: "momentum_basics",
          title: "الزخم الخطي",
          videoIds: [],
          summary: "الزخم الخطي (Linear Momentum) هو مقياس لممانعة الجسم لتغيير حالته الحركية. يعتمد على كتلة الجسم وسرعته المتجهة.",
          formulas: [
            { title: "قانون الزخم الخطي", expression: "p = m \\times v", explanation: "حيث p هو الزخم، m هي الكتلة (kg)، و v هي السرعة المتجهة (m/s)." }
          ],
          mcq: [
            { question: "إذا تضاعفت سرعة جسم مع ثبات كتلته، فماذا يحدث لزخمه؟", options: ["يتضاعف", "يقل للنصف", "يتضاعف 4 مرات", "لا يتغير"], answerIndex: 0, explanation: "الزخم يتناسب طردياً مع السرعة." }
          ],
          importantQuestions: [
            { question: "جسم كتلته 5 kg يتحرك بسرعة 4 m/s. احسب زخمه الخطي.", answer: "p = m * v = 5 * 4 = 20 kg·m/s" }
          ]
        }
      ]
    },
    {
      id: "ch2_impulse",
      title: "2. Impulse (الدفع)",
      lessons: [
        {
          id: "impulse_basics",
          title: "الدفع ونظرية الدفع-الزخم",
          videoIds: [],
          summary: "الدفع هو التغير في الزخم الخطي، ويساوي القوة المحصلة مضروبة في زمن تأثيرها.",
          formulas: [
            { title: "قانون الدفع", expression: "J = F \\Delta t = \\Delta p", explanation: "حيث J هو الدفع، F هي القوة، و Δt هو زمن التأثير." }
          ],
          mcq: [
            { question: "تُصمم السيارات بهياكل قابلة للتحطم (Crumple zones) لـ:", options: ["زيادة زمن التصادم لتقليل القوة", "تقليل زمن التصادم", "تقليل الزخم", "زيادة الدفع"], answerIndex: 0, explanation: "زيادة زمن التصادم (Δt) يقلل من القوة (F) لنفس التغير في الزخم (Δp)." }
          ],
          importantQuestions: []
        }
      ]
    },
    {
      id: "ch3_elastic_collisions",
      title: "3. Elastic Collisions (التصادمات المرنة)",
      lessons: [
        {
          id: "elastic_col",
          title: "حفظ الزخم والتصادمات",
          videoIds: [],
          summary: "في التصادم المرن، يُحفظ كل من الزخم الخطي والطاقة الحركية.",
          formulas: [
            { title: "حفظ الزخم", expression: "m_1v_{1i} + m_2v_{2i} = m_1v_{1f} + m_2v_{2f}", explanation: "مجموع الزخم قبل التصادم يساوي مجموعه بعد التصادم." },
            { title: "حفظ الطاقة الحركية (للتصادم المرن)", expression: "K_{1i} + K_{2i} = K_{1f} + K_{2f}", explanation: "الطاقة الحركية محفوظة فقط في التصادمات المرنة تماماً." }
          ],
          mcq: [],
          importantQuestions: []
        }
      ]
    },
    {
      id: "ch4_linear_momentum",
      title: "4. Linear Momentum (الزخم الخطي وتطبيقاته)",
      lessons: [
        {
          id: "linear_momentum_app",
          title: "تطبيقات الزخم الخطي",
          videoIds: [],
          summary: "دراسة حركة الأنظمة المعزولة مثل الدفع الصاروخي وارتداد الأسلحة.",
          formulas: [],
          mcq: [],
          importantQuestions: []
        }
      ]
    },
    {
      id: "ch5_circular_motion",
      title: "5. Circular Motion (الحركة الدائرية)",
      lessons: [
        {
          id: "circular_motion_basics",
          title: "القوة المركزية والتسارع",
          videoIds: [],
          summary: "الجسم الذي يتحرك في مسار دائري يتعرض لقوة نحو المركز تسمى القوة المركزية.",
          formulas: [
            { title: "التسارع المركزي", expression: "a_c = \\frac{v^2}{r}", explanation: "حيث v هي السرعة المماسية، و r نصف القطر." },
            { title: "القوة المركزية", expression: "F_c = m \\frac{v^2}{r}", explanation: "قوة الجذب نحو المركز التي تبقي الجسم في مساره." }
          ],
          mcq: [],
          importantQuestions: []
        }
      ]
    },
    {
      id: "ch6_angular_motion",
      title: "6. Angular Motion (الحركة الزاوية)",
      lessons: [
        {
          id: "angular_motion_basics",
          title: "الإزاحة والسرعة الزاوية",
          videoIds: [],
          summary: "وصف الحركة باستخدام الزوايا (الراديان) بدلاً من المسافات الخطية.",
          formulas: [
            { title: "السرعة الزاوية", expression: "\\omega = \\frac{\\Delta \\theta}{\\Delta t}", explanation: "معدل تغير الإزاحة الزاوية بالنسبة للزمن." },
            { title: "العلاقة بين الخطي والزاوي", expression: "v = r \\omega", explanation: "السرعة الخطية تساوي نصف القطر مضروباً في السرعة الزاوية." }
          ],
          mcq: [],
          importantQuestions: []
        }
      ]
    },
    {
      id: "ch7_torque",
      title: "7. Torque (العزم)",
      lessons: [
        {
          id: "torque_basics",
          title: "حساب العزم",
          videoIds: [],
          summary: "العزم هو مقياس لمقدرة القوة على إحداث دوران للجسم حول محور معين.",
          formulas: [
            { title: "قانون العزم", expression: "\\tau = r F \\sin \\theta", explanation: "حيث r هو ذراع القوة، F هي القوة، و θ هي الزاوية بينهما." }
          ],
          mcq: [],
          importantQuestions: []
        }
      ]
    },
    {
      id: "ch8_center_of_mass",
      title: "8. Center of Mass (مركز الكتلة)",
      lessons: [
        {
          id: "com_basics",
          title: "حساب مركز الكتلة",
          videoIds: [],
          summary: "النقطة التي يمكن اعتبار كتلة الجسم بأكملها متركزة فيها.",
          formulas: [
            { title: "مركز الكتلة لنظام", expression: "x_{cm} = \\frac{m_1x_1 + m_2x_2 + ...}{m_1 + m_2 + ...}", explanation: "المتوسط المرجح للمسافات بناءً على الكتلة." }
          ],
          mcq: [],
          importantQuestions: []
        }
      ]
    },
    {
      id: "ch9_mechanical_energy",
      title: "9. Mechanical Energy (الطاقة الميكانيكية)",
      lessons: [
        {
          id: "mech_energy_basics",
          title: "حفظ الطاقة الميكانيكية",
          videoIds: [],
          summary: "مجموع الطاقة الحركية وطاقة الوضع في نظام معزول يبقى ثابتاً.",
          formulas: [
            { title: "الطاقة الميكانيكية", expression: "E = K + U = \\text{Constant}", explanation: "K الحركية، و U الكامنة (الوضع)." },
            { title: "الطاقة الحركية", expression: "K = \\frac{1}{2} m v^2", explanation: "" },
            { title: "طاقة الوضع الجاذبية", expression: "U = mgh", explanation: "" }
          ],
          mcq: [],
          importantQuestions: []
        }
      ]
    },
    {
      id: "ch10_work_energy",
      title: "10. Work & Energy (الشغل والطاقة)",
      lessons: [
        {
          id: "work_energy_theorem",
          title: "نظرية الشغل والطاقة",
          videoIds: [],
          summary: "الشغل المبذول على جسم يساوي التغير في طاقته الحركية.",
          formulas: [
            { title: "قانون الشغل", expression: "W = F d \\cos \\theta", explanation: "حيث F القوة، d الإزاحة، θ الزاوية بينهما." },
            { title: "قانون القدرة", expression: "P = \\frac{W}{t} = F v", explanation: "معدل بذل الشغل." }
          ],
          mcq: [],
          importantQuestions: []
        }
      ]
    },
    {
      id: "ch11_spring_force",
      title: "11. Spring Force (قوة النابض)",
      lessons: [
        {
          id: "hookes_law",
          title: "قانون هوك",
          videoIds: [],
          summary: "القوة التي يؤثر بها النابض تتناسب طردياً مع استطالته أو انضغاطه.",
          formulas: [
            { title: "قانون هوك", expression: "F = -k x", explanation: "حيث k ثابت النابض، و x الإزاحة." },
            { title: "طاقة الوضع المرنة", expression: "U_s = \\frac{1}{2} k x^2", explanation: "الطاقة المخزنة في نابض مضغوط أو مشدود." }
          ],
          mcq: [],
          importantQuestions: []
        }
      ]
    },
    {
      id: "ch12_rotational_motion",
      title: "12. Rotational Motion (الحركة الدورانية)",
      lessons: [
        {
          id: "rot_kinematics",
          title: "معادلات الحركة الدورانية",
          videoIds: [],
          summary: "وصف الحركة الدورانية بتسارع زاوي منتظم باستخدام معادلات تشابه الحركة الخطية.",
          formulas: [
            { title: "معادلة السرعة الزاوية", expression: "\\omega_f = \\omega_i + \\alpha t", explanation: "حيث α هو التسارع الزاوي." }
          ],
          mcq: [],
          importantQuestions: []
        }
      ]
    },
    {
      id: "ch13_rotational_dynamics",
      title: "13. Rotational Dynamics (ديناميكا الدوران)",
      lessons: [
        {
          id: "moment_of_inertia",
          title: "القصور الذاتي الدوراني",
          videoIds: [],
          summary: "ممانعة الجسم الدوار لتغيير حالته الدورانية.",
          formulas: [
            { title: "قانون نيوتن الثاني للدوران", expression: "\\tau_{net} = I \\alpha", explanation: "حيث I القصور الذاتي الدوراني، و α التسارع الزاوي." },
            { title: "الطاقة الحركية الدورانية", expression: "K_{rot} = \\frac{1}{2} I \\omega^2", explanation: "" }
          ],
          mcq: [],
          importantQuestions: []
        }
      ]
    },
    {
      id: "ch14_reflection_refraction",
      title: "14. Reflection & Refraction (الانعكاس والانكسار)",
      lessons: [
        {
          id: "optics_basics",
          title: "قوانين البصريات الهندسية",
          videoIds: [],
          summary: "دراسة سلوك الضوء عند انتقاله بين الأوساط المختلفة.",
          formulas: [
            { title: "قانون الانعكاس", expression: "\\theta_i = \\theta_r", explanation: "زاوية السقوط تساوي زاوية الانعكاس." },
            { title: "قانون سنيل (الانكسار)", expression: "n_1 \\sin \\theta_1 = n_2 \\sin \\theta_2", explanation: "العلاقة بين زوايا السقوط والانكسار ومعاملات الانكسار للأوساط." }
          ],
          mcq: [],
          importantQuestions: []
        }
      ]
    }
  ]
};
