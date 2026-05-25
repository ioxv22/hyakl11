"use client";

import React, { useState, useMemo } from "react";
import { Search, Play, Award, HelpCircle, Layers, ArrowLeft, ArrowRight, RotateCcw, Check, X, ShieldAlert, FlaskConical, Atom } from "lucide-react";

interface Compound {
  name: string;
  englishName: string;
  formula: string;
  type: string;
  structure: string;
  description: string;
  molarMass: string;
  boilingPoint: string;
  uses: string;
}

interface ReactionStep {
  stepNum: number;
  text: string;
}

interface Reaction {
  title: string;
  englishTitle: string;
  equation: string;
  description: string;
  type: string;
  catalyst: string;
  steps: ReactionStep[];
}

interface NamingQuestion {
  structure: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export const OrganicLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"viewer" | "reactions" | "naming">("viewer");
  const [searchQuery, setSearchQuery] = useState("");

  // ─── 1. Compounds Data ──────────────────────────────────────────────────────
  const compounds: Compound[] = useMemo(() => [
    {
      name: "الميثان",
      englishName: "Methane",
      formula: "CH₄",
      type: "ألكان مشبع (Alkane)",
      structure: "     H\n     |\n H - C - H\n     |\n     H",
      description: "أبسط الهيدروكربونات العضوية على الإطلاق. غاز عديم اللون والرائحة، وهو المكون الأساسي للغاز الطبيعي بنسبة تتجاوز 90%.",
      molarMass: "16.04 g/mol",
      boilingPoint: "-161.5 °C",
      uses: "إنتاج الطاقة والطهي والتسخين المنزلي، ومادة أولية لتصنيع الهيدروجين والميثانول."
    },
    {
      name: "الإيثان",
      englishName: "Ethane",
      formula: "C₂H₆",
      type: "ألكان مشبع (Alkane)",
      structure: "     H   H\n     |   |\n H - C - C - H\n     |   |\n     H   H",
      description: "ثاني مركبات سلسلة الألكانات المشبعة. يتواجد مع الغاز الطبيعي والنفط الخام.",
      molarMass: "30.07 g/mol",
      boilingPoint: "-89 °C",
      uses: "يُستخدم بشكل أساسي كمادة تغذية وتكسير لإنتاج غاز الإيثيلين الصناعي الهام."
    },
    {
      name: "البروبان",
      englishName: "Propane",
      formula: "C₃H₈",
      type: "ألكان مشبع (Alkane)",
      structure: "     H   H   H\n     |   |   |\n H - C - C - C - H\n     |   |   |\n     H   H   H",
      description: "غاز سريع الاشتعال، يتم تسييله بسهولة تحت الضغط لتسهيل نقله وتخزينه.",
      molarMass: "44.1 g/mol",
      boilingPoint: "-42 °C",
      uses: "وقود للطهي والتدفئة وسيارات النقل (مكون رئيسي لغاز البترول المسال LPG)."
    },
    {
      name: "الإيثيلين (إيثين)",
      englishName: "Ethylene (Ethene)",
      formula: "C₂H₄",
      type: "ألكين غير مشبع (Alkene)",
      structure: "   H       H\n    \\     /\n     C = C\n    /     \\\n   H       H",
      description: "غاز غير مشبع يحتوي على رابطة تساهمية ثنائية (واحدة سيجما والأخرى باي سهلة الكسر)، مما يمنحه نشاطاً كيميائياً مرتفعاً.",
      molarMass: "28.05 g/mol",
      boilingPoint: "-103.7 °C",
      uses: "أهم مادة أولية في الصناعات البتروكيماوية لصناعة البولي إيثيلين (البلاستيك) والمطاط وإنضاج الفواكه اصطناعياً."
    },
    {
      name: "الأسيتيلين (إيثاين)",
      englishName: "Acetylene (Ethyne)",
      formula: "C₂H₂",
      type: "ألكاين غير مشبع (Alkyne)",
      structure: "   H - C ≡ C - H",
      description: "غاز غير مشبع يحتوي على رابطة تساهمية ثلاثية (واحدة سيجما ورابطتين باي)، شديد النشاط وله قابلية هائلة للاشتعال والتحلل.",
      molarMass: "26.04 g/mol",
      boilingPoint: "-84 °C (يتسامى)",
      uses: "يُحرق مع الأكسجين لإنتاج لهب الأوكسي أسيتيلين فائق الحرارة (3000°C) المستخدم في قطع ولحام المعادن."
    },
    {
      name: "البنزين العطري",
      englishName: "Benzene",
      formula: "C₆H₆",
      type: "هيدروكربون أروماتي (Aromatic)",
      structure: "      H\n      |\n      C\n    // \\\nH - C   C - H\n    |   ||\nH - C   C - H\n     \\ //\n      C\n      |\n      H\n  (حلقة رنين سداسية)",
      description: "سائل متطاير عديم اللون ذو رائحة عطرية مميزة. يتكون من حلقة سداسية مستقرة للغاية بسبب عدم تمركز إلكترونات الرابطة الثنائية (ظاهرة الرنين). مركب سام ومسرطن.",
      molarMass: "78.11 g/mol",
      boilingPoint: "80.1 °C",
      uses: "مذيب عضوي صناعي واسع الاستخدام، ومادة أساسية لتصنيع الأدوية والمبيدات والبلاستيك والنايلون."
    },
    {
      name: "الميثانول",
      englishName: "Methanol",
      formula: "CH₃OH",
      type: "كحول (Alcohol)",
      structure: "     H\n     |\n H - C - O - H\n     |\n     H",
      description: "أبسط الكحولات العضوية (كحول الخشب). سائل سام للغاية؛ بلع كميات ضئيلة منه يؤدي لتدمير العصب البصري والعمى والوفاة.",
      molarMass: "32.04 g/mol",
      boilingPoint: "64.7 °C",
      uses: "مذيب عضوي ومادة مانعة للتجمد، وقود للمحركات ولقيم أساسي لتصنيع الفورمالدهيد."
    },
    {
      name: "الإيثانول",
      englishName: "Ethanol",
      formula: "C₂H₅OH",
      type: "كحول (Alcohol)",
      structure: "     H   H\n     |   |\n H - C - C - O - H\n     |   |\n     H   H",
      description: "الكحول الطبي المألوف. سائل سريع الاشتعال قابل للامتزاج التام بالماء وتكوين روابط هيدروجينية ترفع غليانه.",
      molarMass: "46.07 g/mol",
      boilingPoint: "78.4 °C",
      uses: "التعقيم الطبي وتطهير الأيدي والجروح، ومذيب صناعي للعطور والدهانات، ووقود حيوي صديق للبيئة."
    },
    {
      name: "ثنائي ميثيل إيثر",
      englishName: "Dimethyl Ether",
      formula: "CH₃OCH₃",
      type: "إيثر (Ether)",
      structure: "     H       H\n     |       |\n H - C - O - C - H\n     |       |\n     H       H",
      description: "غاز عديم اللون شحيح القطبية، وهو أيزومر بنائي (متشكل بنائي) للكحول الإيثيلي ولكنه يختلف عنه تماماً في درجة الغليان لعدم قدرته على تكوين روابط هيدروجينية.",
      molarMass: "46.07 g/mol",
      boilingPoint: "-24 °C",
      uses: "غاز دافع في عبوات الرذاذ (أيروسول)، وبديل واعد ونظيف لوقود الديزل."
    },
    {
      name: "الأسيتون (2-بروبانون)",
      englishName: "Acetone (2-Propanone)",
      formula: "CH₃COCH₃",
      type: "كيتون (Ketone)",
      structure: "     H   O   H\n     |  ||   |\n H - C - C - C - H\n     |       |\n     H       H",
      description: "أبسط الكيتونات العضوية. سائل متطاير عديم اللون ذو رائحة مميزة ومقبولة، يمتزج تماماً بالماء ومذيب فائق الجودة للدهانات.",
      molarMass: "58.08 g/mol",
      boilingPoint: "56 °C",
      uses: "إزالة طلاء الأظافر التجميلي، تنظيف وتجفيف الأدوات الزجاجية في المعامل، ومذيب صناعي للراتنجات."
    },
    {
      name: "حمض الخليك (حمض الإيثانويك)",
      englishName: "Acetic Acid (Ethanoic Acid)",
      formula: "CH₃COOH",
      type: "حمض كربوكسيلي (Carboxylic Acid)",
      structure: "     H   O\n     |  ||\n H - C - C - O - H\n     |\n     H",
      description: "حمض ضعيف أحادي البروتون، له رائحة نفاذة وطعم حامض مميز. يُشكل المكون الرئيسي للخل المنزلي بتركيزات منخفضة (5%).",
      molarMass: "60.05 g/mol",
      boilingPoint: "118 °C",
      uses: "صناعة الخل وحفظ الأطعمة، وإنتاج بوليمرات خلات الفينيل وصناعة الألياف والمنسوجات."
    }
  ], []);

  const [selectedCompoundIdx, setSelectedCompoundIdx] = useState(0);
  const activeCompound = compounds[selectedCompoundIdx];

  const filteredCompounds = compounds.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.formula.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ─── 2. Reactions Data ──────────────────────────────────────────────────────
  const reactions: Reaction[] = useMemo(() => [
    {
      title: "هلجنة الميثان (الاستبدال)",
      englishTitle: "Chlorination of Methane (Substitution)",
      equation: "CH₄ + Cl₂  —(أشعة فوق بنفسجية UV)→  CH₃Cl + HCl",
      description: "يستبدل الكلور النشط ذرة هيدروجين في الميثان لتكوين كلوروميثان. التفاعل متسلسل ويحتاج للأشعة فوق البنفسجية لإنشاء الجذور الحرة.",
      type: "تفاعل استبدال (Substitution)",
      catalyst: "الأشعة فوق البنفسجية (UV Light) أو الحرارة المرتفعة",
      steps: [
        { stepNum: 1, text: "بدء التفاعل (Initiation): تنشطر الرابطة في جزيء الكلور Cl-Cl بشكل متجانس بواسطة الضوء لإنشاء جذرين حُرين من الكلور النشط جداً: Cl• + Cl•." },
        { stepNum: 2, text: "الانتشار (Propagation): يهاجم جذر الكلور Cl• جزيء الميثان CH4 وينزع منه هيدروجين لتكوين جذر الميثيل الحُر •CH3 وغاز حمض الهيدروكلوريك HCl." },
        { stepNum: 3, text: "الانتشار الثاني: يتفاعل جذر الميثيل •CH3 مع جزيء كلور جديد Cl2 لإنتاج كلوروميثان CH3Cl وجذر كلور حُر جديد Cl• للحفاظ على استمرارية التفاعل." },
        { stepNum: 4, text: "الإنهاء (Termination): يتوقف التفاعل عند اتحاد جذرين حُرين معاً (مثل اتحاد جذر ميثيل مع جذر كلور ليعطي كلوروميثان، أو اتحاد جذرين ميثيل ليعطي إيثان C2H6)." }
      ]
    },
    {
      title: "هدرجة الإيثيلين (الإضافة)",
      englishTitle: "Hydrogenation of Ethylene (Addition)",
      equation: "CH₂=CH₂ + H₂  —(حافز النيكل Ni / البلاتين Pt)→  CH₃-CH₃",
      description: "تفاعل إضافة يتم فيه كسر رابطة باي الضعيفة في الألكين غير المشبع وإضافة ذرتي هيدروجين لتحويله إلى ألكان مشبع كامل (إيثان).",
      type: "تفاعل إضافة (Addition)",
      catalyst: "فلز نشط مسحوق كحافز مثل النيكل (Ni) أو البلاتين (Pt) أو البالاديوم (Pd)",
      steps: [
        { stepNum: 1, text: "تدمير السطح (Adsorption): يُمتص غاز الهيدروجين H2 وجزيئات الإيثيلين CH2=CH2 على السطح المعدني للعامل الحفاز النشط." },
        { stepNum: 2, text: "التفكك: تضعف الرابطة بين ذرتي الهيدروجين H-H وتتكسر لتصبح ذرات هيدروجين حرة مرتبطة بالسطح المعدني للبلاتين." },
        { stepNum: 3, text: "الكسر والإضافة: تنكسر رابطة باي الضعيفة في الرابطة الثنائية للإيثيلين، وتتحرك ذرات الهيدروجين لترتبط بذرات الكربون ذات الإلكترونات الفردية." },
        { stepNum: 4, text: "التحرر (Desorption): تتكون روابط تساهمية أحادية جديدة ومستقرة تماماً، وينفصل جزيء الإيثان الناتج (CH3-CH3) غازياً عن السطح الحفاز." }
      ]
    },
    {
      title: "نزع الماء من الإيثانول (النزع)",
      englishTitle: "Dehydration of Ethanol (Elimination)",
      equation: "CH₃-CH₂-OH  —(حمض كبريتيك مركز H₂SO₄ / حرارة 180°C)→  CH₂=CH₂ + H₂O",
      description: "نزع جزيء ماء (مجموعة OH من كربونة وذرة H من كربونة مجاورة) لتكوين رابطة ثنائية غير مشبعة وصناعة غاز الإيثيلين.",
      type: "تفاعل نزع (Elimination)",
      catalyst: "حمض الكبريتيك المركز (H2SO4) كعامل نازع للماء وحرارة 180 درجة مئوية",
      steps: [
        { stepNum: 1, text: "البرتنة (Protonation): يمنح حمض الكبريتيك القوي بروتوناً H+ لأكسجين مجموعة الهيدروكسيل في الكحول، محولاً إياها لمجموعة مغادرة ممتازة وهي جزيء ماء ملتصق." },
        { stepNum: 2, text: "المغادرة: تنكسر الرابطة بين الكربون والأكسجين وتغادر جزيء ماء مستقر H2O تاركاً كاتيون كربون (Carbocation) مشحوناً بشحنة موجبة غير مستقرة." },
        { stepNum: 3, text: "تكوين الألكين: تسحب جزيئات الماء أو الأنيون بروتوناً H+ من ذرة الكربون المجاورة المشحونة، وتتدفق الإلكترونات لتكوين رابطة ثنائية وإنتاج الإيثين." }
      ]
    },
    {
      title: "الأسترة الكيميائية (التكثيف)",
      englishTitle: "Fischer Esterification (Condensation)",
      equation: "CH₃COOH + CH₃OH  ⇌ (وسط حمضي H⁺)  CH₃COOCH₃ + H₂O",
      description: "تفاعل تكثيف يجمع حمض كربوكسيلي مع كحول لإنتاج إستر (خلات الميثيل) ذو رائحة زكية وجزيء ماء. التفاعل عكوس ومتزن.",
      type: "تفاعل تكثيف (Condensation / Esterification)",
      catalyst: "حمض قوي مثل H2SO4 أو HCl كعامل حفاز مجفف ومسرع",
      steps: [
        { stepNum: 1, text: "تنشيط الكربونيل: ترتبط ذرة الهيدروجين H+ بأكسجين مجموعة الكربونيل C=O للحمض الكربوكسيلي، مما يجعل ذرة كربون الكربونيل أكثر قابلية للهجوم النيكليوفيلي." },
        { stepNum: 2, text: "هجوم الكحول: يهاجم زوج الإلكترونات الحُر على أكسجين كحول الميثانول كربون الكربونيل لتشكيل مركب وسيط رباعي الأوجه مشحون." },
        { stepNum: 3, text: "انتقال البروتون والمغادرة: ينتقل بروتون داخلي لإحدى مجموعات الهيدروكسيل لتتحول لمجموعة ماء مغادرة، ثم تغادر H2O لتكوين الإستر البروتوني." },
        { stepNum: 4, text: "إزالة البروتون (Deprotonation): يفقد أكسجين الكربونيل البروتون الزائد ليعود الحافز الهيدروجيني وينتج إستر خلات الميثيل ذو الرائحة العطرية الزكية." }
      ]
    }
  ], []);

  const [selectedReactionIdx, setSelectedReactionIdx] = useState(0);
  const [reactionStepIdx, setReactionStepIdx] = useState(0);
  const activeReaction = reactions[selectedReactionIdx];

  const filteredReactions = reactions.filter(r =>
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.englishTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ─── 3. Naming Practice Quiz Data ──────────────────────────────────────────
  const quizQuestions: NamingQuestion[] = useMemo(() => [
    {
      structure: "CH₃-CH₂-CH₂-OH",
      options: ["1-Propanol (1-بروبانول)", "2-Propanol (2-بروبانول)", "Propanal (بروبانال)", "Propanoic acid (حمض البروبانويك)"],
      answerIndex: 0,
      explanation: "يتكون المركب من سلسلة مستقيمة من 3 ذرات كربون (بروبان) وترتبط بها مجموعة هيدروكسيل (-OH) عند ذرة الكربون الطرفية رقم 1. الاسم النظامي IUPAC هو 1-بروبانول."
    },
    {
      structure: "CH₃-O-CH₃",
      options: ["Diethyl ether (ثنائي إيثيل إيثر)", "Dimethyl ether (ثنائي ميثيل إيثر)", "Ethanol (إيثانول)", "Methanoic acid (حمض الميثانويك)"],
      answerIndex: 1,
      explanation: "ترتبط ذرة الأكسجين المركزية بمجموعتي ميثيل (CH3) متطابقتين على الجانبين. وفقاً لقواعد IUPAC للتسمية الشائعة والنظامية للإيثرات، يسمى المركب ثنائي ميثيل إيثر."
    },
    {
      structure: "CH₃-CH₂-CHO",
      options: ["Propanone (بروبانون)", "1-Propanol (1-بروبانول)", "Propanal (بروبانال)", "Propanoic acid (حمض البروبانويك)"],
      answerIndex: 2,
      explanation: "سلسلة من 3 ذرات كربون تحتوي على مجموعة كربونيل طرفية (-CHO)، وهي المجموعة الوظيفية المميزة لعائلة الألدهيدات. ينتهي الاسم باللاحقة 'ال'، فيكون الاسم بروبانال."
    },
    {
      structure: "CH₃-COOH",
      options: ["Methanoic acid (حمض الميثانويك)", "Ethanoic acid (حمض الإيثانويك / الخليك)", "Propanoic acid (حمض البروبانويك)", "Ethanol (إيثانول)"],
      answerIndex: 1,
      explanation: "يحتوي هذا الحمض الكربوكسيلي على ذرتي كربون (إيثان) ومجموعة الكربوكسيل المميزة (-COOH). الاسم النظامي هو حمض الإيثانويك، والاسم الشائع والتجاري هو حمض الخليك (الأسيتيك)."
    },
    {
      structure: "CH₃-CH=CH-CH₃",
      options: ["1-Butene (1-بيوتين)", "Butane (بيوتان)", "2-Butyne (2-بيوتاين)", "2-Butene (2-بيوتين)"],
      answerIndex: 3,
      explanation: "سلسلة كربونية غير مشبعة من 4 ذرات كربون (بيوتين) تحتوي على رابطة تساهمية ثنائية تبدأ عند ذرة الكربون رقم 2. لذا الاسم النظامي هو 2-بيوتين."
    }
  ], []);

  const [currentQuizIdx, setCurrentQuizIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizChecked, setQuizChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const activeQuestion = quizQuestions[currentQuizIdx];

  const handleOptionClick = (idx: number) => {
    if (quizChecked) return;
    setSelectedOption(idx);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null || quizChecked) return;
    setQuizChecked(true);
    if (selectedOption === activeQuestion.answerIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuiz = () => {
    setSelectedOption(null);
    setQuizChecked(false);
    if (currentQuizIdx < quizQuestions.length - 1) {
      setCurrentQuizIdx(prev => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuizIdx(0);
    setSelectedOption(null);
    setQuizChecked(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 text-right flex flex-col gap-6 relative overflow-hidden transition-all duration-300">
      
      {/* Glow Effects */}
      <div className="absolute top-[-100px] left-[-100px] w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-100px] w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-2xl animate-pulse">
            <FlaskConical size={28} />
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg sm:text-xl font-black text-white">المختبر العضوي الكيميائي التفاعلي 🧪</h2>
            <p className="text-xs text-slate-400 mt-1">أدوات متطورة لعرض هياكل الهيدروكربونات، وتتبع آليات التفاعلات، وممارسة التسمية النظامية</p>
          </div>
        </div>
        
        {/* Search bar inside header */}
        <div className="relative max-w-xs w-full">
          <input
            type="text"
            placeholder="ابحث عن مركب أو تفاعل..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-10 pl-4 py-2 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500 text-xs text-white"
          />
          <Search size={14} className="absolute right-3.5 top-3 text-slate-500" />
        </div>
      </div>

      {/* Sub Tabs Navigation */}
      <div className="flex bg-slate-950 border border-slate-800/80 p-1 rounded-2xl gap-1 overflow-x-auto justify-start">
        <button
          onClick={() => { setActiveTab("viewer"); setSearchQuery(""); }}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            activeTab === "viewer" ? "bg-emerald-600 text-white shadow-lg" : "text-slate-400 hover:bg-slate-900"
          }`}
        >
          <Atom size={14} />
          <span>مستعرض هياكل المركبات</span>
        </button>

        <button
          onClick={() => { setActiveTab("reactions"); setSearchQuery(""); setReactionStepIdx(0); }}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            activeTab === "reactions" ? "bg-emerald-600 text-white shadow-lg" : "text-slate-400 hover:bg-slate-900"
          }`}
        >
          <Layers size={14} />
          <span>مشغل تفاعلات الأكسدة والتحضير</span>
        </button>

        <button
          onClick={() => { setActiveTab("naming"); handleResetQuiz(); }}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            activeTab === "naming" ? "bg-emerald-600 text-white shadow-lg" : "text-slate-400 hover:bg-slate-900"
          }`}
        >
          <Award size={14} />
          <span>ممارسة تسمية IUPAC والنماذج</span>
        </button>
      </div>

      {/* ─── TAB 1: Hydrocarbon Structure Viewer ─────────────────────────────────── */}
      {activeTab === "viewer" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Sidebar - Compound List */}
          <div className="bg-slate-950/40 border border-slate-800/60 rounded-2xl p-4 flex flex-col gap-2 max-h-[420px] overflow-y-auto custom-scrollbar">
            <h4 className="text-xs font-black text-slate-500 mb-2">قائمة المركبات العضوية ({filteredCompounds.length})</h4>
            {filteredCompounds.length === 0 ? (
              <p className="text-xs text-slate-600 text-center py-4">لا توجد نتائج مطابقة لبحثك</p>
            ) : (
              filteredCompounds.map((comp) => {
                const globalIdx = compounds.findIndex(c => c.name === comp.name);
                const isSelected = selectedCompoundIdx === globalIdx;
                return (
                  <button
                    key={comp.name}
                    onClick={() => setSelectedCompoundIdx(globalIdx)}
                    className={`w-full text-right p-3 rounded-xl transition-all cursor-pointer border flex flex-col gap-1 ${
                      isSelected
                        ? "bg-emerald-950/30 border-emerald-500 text-emerald-400 font-bold"
                        : "bg-slate-900/40 border-transparent hover:bg-slate-900 text-slate-300"
                    }`}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span className="text-xs font-mono font-bold bg-slate-950/80 px-2 py-0.5 rounded text-emerald-500">{comp.formula}</span>
                      <span className="text-xs font-black">{comp.name}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono text-left">{comp.englishName} • {comp.type}</span>
                  </button>
                );
              })
            )}
          </div>

          {/* Main Visualizer Window */}
          {activeCompound ? (
            <div className="lg:col-span-2 bg-slate-950 border border-slate-850 rounded-2xl p-5 flex flex-col gap-5 relative">
              <div className="flex justify-between items-start border-b border-slate-850 pb-3 flex-wrap gap-2">
                <span className="text-[10px] text-slate-500 font-extrabold px-2.5 py-1 bg-slate-900 rounded-lg uppercase tracking-wider">{activeCompound.type}</span>
                <div className="flex flex-col text-right">
                  <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                    <span>{activeCompound.name}</span>
                    <span className="text-xs font-mono font-bold text-slate-400">({activeCompound.formula})</span>
                  </h3>
                  <span className="text-[10px] text-slate-500 font-mono mt-0.5">{activeCompound.englishName}</span>
                </div>
              </div>

              {/* 2D Structural Lewis Representation */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] text-slate-500 font-black">الصيغة التركيبية / البنائية المفصلة (Lewis Structure):</span>
                <div className="w-full bg-slate-900/60 border border-slate-850 rounded-2xl p-6 font-mono text-xs text-emerald-400 select-all whitespace-pre flex items-center justify-center min-h-[160px] relative overflow-x-auto">
                  <div className="absolute top-2 right-3 flex items-center gap-1.5 text-[9px] text-slate-500 font-bold bg-slate-950/60 px-2 py-0.5 rounded border border-slate-800/40">
                    <Atom size={10} className="animate-spin text-emerald-500" />
                    <span>منظور ترابط تكافؤ كربون رباعي</span>
                  </div>
                  {activeCompound.structure}
                </div>
              </div>

              {/* Specifications Cards Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-900/40 border border-slate-850 rounded-xl flex flex-col gap-0.5 text-right">
                  <span className="text-[9px] text-slate-500 font-black">الكتلة المولية</span>
                  <span className="text-xs font-extrabold text-white font-mono">{activeCompound.molarMass}</span>
                </div>
                <div className="p-3 bg-slate-900/40 border border-slate-850 rounded-xl flex flex-col gap-0.5 text-right">
                  <span className="text-[9px] text-slate-500 font-black">درجة الغليان</span>
                  <span className="text-xs font-extrabold text-white font-mono">{activeCompound.boilingPoint}</span>
                </div>
              </div>

              {/* Quick Summary & Applications */}
              <div className="flex flex-col gap-1 bg-emerald-500/5 border border-emerald-500/10 p-4 rounded-xl text-right">
                <span className="text-[10px] text-emerald-400 font-extrabold">الشرح الكيميائي والتوضيح:</span>
                <p className="text-xs text-slate-200 leading-relaxed mt-0.5">{activeCompound.description}</p>
                <div className="border-t border-emerald-500/10 mt-2.5 pt-2.5 flex flex-col gap-0.5">
                  <span className="text-[10px] text-emerald-500 font-extrabold">الاستخدامات الصناعية واليومية:</span>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{activeCompound.uses}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="lg:col-span-2 bg-slate-950 border border-slate-850 rounded-2xl p-10 flex flex-col items-center justify-center text-center">
              <FlaskConical size={40} className="text-slate-600 mb-2" />
              <p className="text-xs text-slate-500">اختر مركباً عضوياً من القائمة لعرض صيغته البنائية وخصائصه الكيميائية الكاملة.</p>
            </div>
          )}
        </div>
      )}

      {/* ─── TAB 2: Organic Chemistry Reactions Viewer ───────────────────────────── */}
      {activeTab === "reactions" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start animate-fade-in">
          {/* Sidebar - Reactions list */}
          <div className="bg-slate-950/40 border border-slate-800/60 rounded-2xl p-4 flex flex-col gap-2 max-h-[420px] overflow-y-auto custom-scrollbar">
            <h4 className="text-xs font-black text-slate-500 mb-2">التفاعلات الكيميائية الهامة ({filteredReactions.length})</h4>
            {filteredReactions.map((react) => {
              const globalIdx = reactions.findIndex(r => r.title === react.title);
              const isSelected = selectedReactionIdx === globalIdx;
              return (
                <button
                  key={react.title}
                  onClick={() => { setSelectedReactionIdx(globalIdx); setReactionStepIdx(0); }}
                  className={`w-full text-right p-3 rounded-xl transition-all cursor-pointer border flex flex-col gap-1 ${
                    isSelected
                      ? "bg-emerald-950/30 border-emerald-500 text-emerald-400 font-bold"
                      : "bg-slate-900/40 border-transparent hover:bg-slate-900 text-slate-300"
                  }`}
                >
                  <span className="text-xs font-black">{react.title}</span>
                  <span className="text-[10px] text-slate-500 font-mono text-left">{react.type}</span>
                </button>
              );
            })}
          </div>

          {/* Main Reaction Player */}
          {activeReaction ? (
            <div className="lg:col-span-2 bg-slate-950 border border-slate-850 rounded-2xl p-5 flex flex-col gap-5 text-right relative">
              <div className="flex justify-between items-start border-b border-slate-850 pb-3 flex-wrap gap-2">
                <span className="text-[10px] text-slate-500 font-extrabold px-2.5 py-1 bg-slate-900 rounded-lg uppercase tracking-wider">{activeReaction.type}</span>
                <div className="flex flex-col text-right">
                  <h3 className="text-base sm:text-lg font-black text-white">{activeReaction.title}</h3>
                  <span className="text-[10px] text-slate-500 font-mono mt-0.5">{activeReaction.englishTitle}</span>
                </div>
              </div>

              {/* chemical equation display box */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] text-slate-500 font-black">المعادلة الكيميائية للتفاعل (Chemical Equation):</span>
                <div className="w-full bg-slate-900 border border-slate-850 rounded-2xl p-5 font-mono text-sm sm:text-base text-emerald-400 select-all text-center flex items-center justify-center font-bold relative">
                  {activeReaction.equation}
                </div>
              </div>

              {/* Reaction Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-slate-900/40 border border-slate-850 rounded-xl flex flex-col gap-0.5">
                  <span className="text-[9px] text-slate-500 font-black">العامل الحفاز وشروط التفاعل</span>
                  <span className="text-xs font-bold text-white">{activeReaction.catalyst}</span>
                </div>
                <div className="p-3 bg-slate-900/40 border border-slate-850 rounded-xl flex flex-col gap-0.5">
                  <span className="text-[9px] text-slate-500 font-black">طبيعة تصنيف التفاعل</span>
                  <span className="text-xs font-bold text-white">{activeReaction.type}</span>
                </div>
              </div>

              {/* Step-by-Step Mechanism Player */}
              <div className="border border-slate-850 p-4 rounded-2xl bg-slate-900/30 flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setReactionStepIdx(prev => Math.max(0, prev - 1))}
                      disabled={reactionStepIdx === 0}
                      className="p-1 bg-slate-950 hover:bg-slate-900 border border-slate-800 disabled:opacity-30 disabled:hover:bg-slate-950 rounded-lg text-slate-300 transition-colors cursor-pointer"
                    >
                      <ArrowRight size={14} />
                    </button>
                    <button
                      onClick={() => setReactionStepIdx(prev => Math.min(activeReaction.steps.length - 1, prev + 1))}
                      disabled={reactionStepIdx === activeReaction.steps.length - 1}
                      className="p-1 bg-slate-950 hover:bg-slate-900 border border-slate-800 disabled:opacity-30 disabled:hover:bg-slate-950 rounded-lg text-slate-300 transition-colors cursor-pointer"
                    >
                      <ArrowLeft size={14} />
                    </button>
                  </div>
                  <span className="text-[10px] text-slate-400 font-extrabold">آلية التفاعل خطوة بخطوة (Step {reactionStepIdx + 1} of {activeReaction.steps.length})</span>
                </div>

                {/* Active step display */}
                <div className="min-h-[100px] flex items-center gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-900 animate-fade-in">
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/10 text-emerald-400 rounded-xl text-xs font-black font-mono select-none h-10 w-10 flex items-center justify-center shrink-0">
                    {activeReaction.steps[reactionStepIdx].stepNum}
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed text-justify">{activeReaction.steps[reactionStepIdx].text}</p>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-slate-950 border border-slate-850 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 transition-all duration-300"
                    style={{ width: `${((reactionStepIdx + 1) / activeReaction.steps.length) * 100}%` }}
                  />
                </div>
              </div>

              <p className="text-xs text-slate-450 leading-relaxed bg-emerald-500/5 p-3.5 border border-emerald-500/10 rounded-xl">{activeReaction.description}</p>
            </div>
          ) : (
            <div className="lg:col-span-2 bg-slate-950 border border-slate-850 rounded-2xl p-10 flex flex-col items-center justify-center text-center">
              <FlaskConical size={40} className="text-slate-600 mb-2" />
              <p className="text-xs text-slate-500">اختر تفاعلاً كيميائياً للبدء بعرض معادلته الكيميائية وآلية حدوثه بالتفصيل.</p>
            </div>
          )}
        </div>
      )}

      {/* ─── TAB 3: IUPAC Naming Practice Quiz ──────────────────────────────────── */}
      {activeTab === "naming" && (
        <div className="max-w-xl mx-auto w-full bg-slate-950 border border-slate-850 rounded-2xl p-5 flex flex-col gap-5 text-right relative animate-fade-in">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-slate-850 pb-3">
            <div className="flex items-center gap-1.5 font-bold text-xs">
              <span className="text-slate-500">النقاط المحرزة:</span>
              <span className="text-emerald-400 font-mono font-black bg-emerald-500/10 px-2 py-0.5 rounded-lg">{score} / {quizQuestions.length}</span>
            </div>
            <h3 className="text-xs font-black text-white flex items-center gap-1.5">
              <Award size={14} className="text-emerald-500" />
              <span>اختبر مهارتك في تسمية المركبات IUPAC</span>
            </h3>
          </div>

          {!quizFinished ? (
            <div className="flex flex-col gap-5">
              {/* Chemical formula representation */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] text-slate-500 font-black">ما هو اسم الـ IUPAC الصحيح للصيغة البنائية التالية؟</span>
                <div className="w-full bg-slate-900 border border-slate-850 rounded-2xl p-6 font-mono text-sm sm:text-base text-emerald-400 text-center select-all flex items-center justify-center font-black tracking-wide min-h-[80px]">
                  {activeQuestion.structure}
                </div>
              </div>

              {/* Options Grid */}
              <div className="flex flex-col gap-2.5">
                {activeQuestion.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  let optStyle = "bg-slate-900/60 border-slate-850 text-slate-300 hover:bg-slate-900/80 hover:border-slate-800";
                  
                  if (isSelected && !quizChecked) {
                    optStyle = "bg-emerald-950/20 border-emerald-600 text-emerald-400 font-bold";
                  }
                  
                  if (quizChecked) {
                    if (idx === activeQuestion.answerIndex) {
                      optStyle = "bg-emerald-950/40 border-emerald-500 text-emerald-400 font-bold";
                    } else if (isSelected) {
                      optStyle = "bg-red-950/40 border-red-500 text-red-400 font-bold";
                    } else {
                      optStyle = "bg-slate-900/30 border-slate-900 text-slate-650 opacity-50";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleOptionClick(idx)}
                      className={`w-full text-right p-3.5 border rounded-xl text-xs font-semibold transition-all cursor-pointer flex justify-between items-center gap-3 ${optStyle}`}
                    >
                      <div className="flex items-center justify-center shrink-0">
                        {quizChecked && idx === activeQuestion.answerIndex && (
                          <div className="p-1 bg-emerald-500 text-slate-950 rounded-full">
                            <Check size={10} strokeWidth={4} />
                          </div>
                        )}
                        {quizChecked && isSelected && idx !== activeQuestion.answerIndex && (
                          <div className="p-1 bg-red-500 text-white rounded-full">
                            <X size={10} strokeWidth={4} />
                          </div>
                        )}
                        {!quizChecked && (
                          <div className={`w-3.5 h-3.5 border rounded-full ${isSelected ? "border-emerald-500 bg-emerald-500/20" : "border-slate-700"}`} />
                        )}
                      </div>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center pt-3 border-t border-slate-850">
                {quizChecked ? (
                  <button
                    onClick={handleNextQuiz}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                  >
                    {currentQuizIdx === quizQuestions.length - 1 ? "عرض النتيجة النهائية" : "السؤال التالي"}
                  </button>
                ) : (
                  <button
                    onClick={handleCheckAnswer}
                    disabled={selectedOption === null}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all disabled:opacity-40 disabled:hover:bg-emerald-600 cursor-pointer"
                  >
                    تحقق من الإجابة
                  </button>
                )}
                <span className="text-[10px] text-slate-500 font-bold">سؤال {currentQuizIdx + 1} من {quizQuestions.length}</span>
              </div>

              {/* Rich explanation box */}
              {quizChecked && (
                <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl text-right animate-fade-in">
                  <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-black mb-1">
                    <HelpCircle size={12} />
                    <span>تفسير الحل العلمي:</span>
                  </div>
                  <p className="text-[11px] text-slate-350 leading-relaxed">{activeQuestion.explanation}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center gap-4 animate-scale-in">
              <div className="p-4 bg-emerald-500/10 text-emerald-500 rounded-3xl animate-bounce">
                <Award size={44} />
              </div>
              <h3 className="text-base sm:text-lg font-black text-white">تهانينا! لقد أنهيت اختبار التسمية العضوية</h3>
              <p className="text-xs text-slate-400 max-w-xs leading-relaxed">لقد نجحت في تسمية المركبات بشكل صحيح والحصول على نتيجة متميزة ومحرزة!</p>
              
              <div className="bg-slate-900 border border-slate-850 px-6 py-3 rounded-2xl font-black text-sm my-1">
                النتيجة المحرزة: <span className="text-emerald-400 font-mono text-base">{score}</span> من <span className="font-mono text-base">{quizQuestions.length}</span>
              </div>

              <button
                onClick={handleResetQuiz}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 mt-2"
              >
                <RotateCcw size={12} />
                <span>إعادة الاختبار</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Footer copyright and telegram info */}
      <div className="border-t border-slate-850 pt-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-[9px] sm:text-[10px] text-slate-500">
        <span className="text-right">أكاديمية ADVVVV11 للمراجعات والتلخيصات العضوية</span>
        <div className="flex items-center gap-3 text-left font-semibold">
          <span className="text-emerald-500">قناة التلغرام الرسمية: t.me/Advvvv11</span>
          <span>© حمد العبدولي 2026</span>
        </div>
      </div>

    </div>
  );
};
