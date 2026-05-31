"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import {
  BookOpen, Search, ArrowLeft, MessageSquare, Award, Play, Pause, RotateCcw,
  Volume2, HelpCircle, Check, X, Clock, RefreshCw, Send, Layers, Star,
  TrendingUp, Sparkles, User, AlertCircle, Bookmark, Compass, BookOpenCheck,
  AwardIcon, CheckCircle2, ChevronRight, Mic, ShieldAlert, FileText, Edit3
} from "lucide-react";

// Types
interface VocabItem {
  word: string;
  arabic: string;
  meaning: string;
  synonyms: string[];
  example: string;
  translation: string;
  related: string[];
  options: string[];
  correctIndex: number;
}

interface GrammarRule {
  title: string;
  formula?: string;
  timeline?: string;
  explanation: string;
  examples: { original: string; ar: string; corrected?: string }[];
  commonMistakes: { wrong: string; right: string; reason: string }[];
  examQuestions: { q: string; opts: string[]; ans: number; exp: string }[];
}

interface ReadingPassage {
  id: string;
  title: string;
  story: string;
  summary: string;
  characters: string;
  mainIdea: string;
  expressions: string[];
  questions: { q: string; opts: string[]; ans: number; exp: string }[];
}

interface MazeQuestion {
  id: string;
  textBefore: string;
  choices: string[];
  textAfter: string;
  correctIndex: number;
  explanation: string;
}

// Data Definition
const VOCABULARY_LIST: VocabItem[] = [
  {
    word: "catch on",
    arabic: "يفهم / يستوعب / ينتشر",
    meaning: "to understand something, or to become popular.",
    synonyms: ["comprehend", "grasp", "prevail", "become popular"],
    example: "It took me some time to catch on to the game rules, but now I play well.",
    translation: "لقد استغرق الأمر مني بعض الوقت لأفهم قواعد اللعبة، لكنني الآن ألعب بشكل جيد.",
    related: ["catch", "catching"],
    options: ["To fail to understand", "To understand or become popular", "To drop something", "To throw away"],
    correctIndex: 1
  },
  {
    word: "sustainability",
    arabic: "الاستدامة",
    meaning: "the quality of being able to continue over a period of time with minimal environmental impact.",
    synonyms: ["viability", "eco-friendliness", "renewability"],
    example: "The UAE focus on solar power is a major step toward long-term sustainability.",
    translation: "إن تركيز دولة الإمارات على الطاقة الشمسية يمثل خطوة رئيسية نحو الاستدامة على المدى الطويل.",
    related: ["sustainable", "sustainably", "sustain"],
    options: ["Using up all resources", "Meeting present needs without harming the future", "Creating pollution", "Economic decay"],
    correctIndex: 1
  },
  {
    word: "coherent",
    arabic: "متناسق / متماسك",
    meaning: "logical and consistent; easy to understand.",
    synonyms: ["logical", "consistent", "clear", "articulate"],
    example: "She presented a coherent argument during the debate that convinced the judges.",
    translation: "لقد قدمت حجة متماسكة ومنطقية خلال المناظرة أقنعت الحكام.",
    related: ["coherence", "coherently"],
    options: ["Confused and messy", "Logical, clear and consistent", "Extremely loud", "Very quick"],
    correctIndex: 1
  },
  {
    word: "depletion",
    arabic: "استنزاف / نفاد",
    meaning: "reduction in the number or quantity of something.",
    synonyms: ["exhaustion", "reduction", "drain", "consumption"],
    example: "The depletion of natural oil reserves forces us to seek alternative energy.",
    translation: "إن استنزاف احتياطيات النفط الطبيعية يجبرنا على البحث عن طاقة بديلة.",
    related: ["deplete", "depleted"],
    options: ["Abundance and growth", "Reduction or running out of resources", "Storing goods", "Discovering new reserves"],
    correctIndex: 1
  },
  {
    word: "precipitation",
    arabic: "هطول الأمطار",
    meaning: "rain, snow, sleet, or hail that falls to the ground.",
    synonyms: ["rainfall", "downpour", "condensation"],
    example: "Cloud seeding is used in the UAE to increase precipitation in dry areas.",
    translation: "يتم استخدام تلقيح السحب في دولة الإمارات لزيادة هطول الأمطار في المناطق الجافة.",
    related: ["precipitate", "precipitous"],
    options: ["Wind storm", "Rain or snow falling to the ground", "Extreme heat", "Dry desert air"],
    correctIndex: 1
  },
  {
    word: "innovation",
    arabic: "ابتكار",
    meaning: "the introduction of something new, like an idea, method, or device.",
    synonyms: ["invention", "novelty", "breakthrough", "creativity"],
    example: "Technological innovation has transformed the way students learn today.",
    translation: "لقد غير الابتكار التكنولوجي الطريقة التي يتعلم بها الطلاب اليوم.",
    related: ["innovate", "innovative", "innovator"],
    options: ["Repeating old patterns", "Introducing new ideas or methods", "Canceling plans", "Failing exams"],
    correctIndex: 1
  }
];

const GRAMMAR_RULES: Record<string, GrammarRule> = {
  thirdConditional: {
    title: "Third Conditional",
    formula: "If + Past Perfect (had + V3), would have + Past Participle (V3)",
    timeline: "Past (Unreal/Hypothetical Situation) ➔ Past Result (Not realized)",
    explanation: "Used to talk about imaginary situations in the past and their hypothetical results. We cannot change what happened.",
    examples: [
      { original: "If I had studied harder last term, I would have achieved a full score.", ar: "لو أنني درست بجد أكبر في الفصل الماضي، لكنت قد حققت الدرجة الكاملة." },
      { original: "If they had arrived earlier, they would not have missed the exam.", ar: "لو أنهم وصلوا أبكر، لما فاتهم الامتحان." }
    ],
    commonMistakes: [
      { wrong: "If I would have studied, I would have passed.", right: "If I had studied, I would have passed.", reason: "Never use 'would have' in the 'if-clause' (condition). Use Past Perfect instead." }
    ],
    examQuestions: [
      {
        q: "If Hamad _______ the map, he wouldn't have got lost in the desert.",
        opts: ["checks", "had checked", "would check", "has checked"],
        ans: 1,
        exp: "Condition clause of Third Conditional requires Past Perfect (had + V3)."
      }
    ]
  },
  pastPerfectPassive: {
    title: "Past Perfect Passive",
    formula: "Subject + had + been + Past Participle (V3)",
    timeline: "Action 1 (Passive) ➔ Action 2 (Past Simple)",
    explanation: "Used to show that an action had been done to someone or something before another action in the past.",
    examples: [
      { original: "The exam booklet had been reviewed by the teacher before the students entered.", ar: "كان كتيب الامتحان قد تمت مراجعته من قبل المعلم قبل دخول الطلاب." },
      { original: "By 2025, the new smart curriculum had been fully implemented.", ar: "بحلول عام 2025، كان المنهج الذكي الجديد قد تم تطبيقه بالكامل." }
    ],
    commonMistakes: [
      { wrong: "The booklet had reviewed by the teacher.", right: "The booklet had been reviewed by the teacher.", reason: "Without 'been', the sentence is active. Since the booklet is an object, we need the passive voice." }
    ],
    examQuestions: [
      {
        q: "All the MAZE practices _______ by the students before the final EmSAT simulator started.",
        opts: ["had completed", "had been completed", "have completed", "were completing"],
        ans: 1,
        exp: "The object 'practices' requires a passive structure (had + been + V3)."
      }
    ]
  },
  pastPerfectContinuous: {
    title: "Past Perfect Continuous",
    formula: "Subject + had + been + Verb-ing",
    timeline: "Ongoing Action in Past ➔ Interruption / Past Simple Reference point",
    explanation: "Used to show that an action started in the past and continued up until another point in the past, emphasizing duration.",
    examples: [
      { original: "She had been studying English for three hours before she finally took a break.", ar: "كانت تدرس اللغة الإنجليزية لمدة ثلاث ساعات متواصلة قبل أن تأخذ استراحة أخيراً." },
      { original: "They had been working on the environment project since morning.", ar: "كانوا يعملون على مشروع البيئة منذ الصباح الباكر." }
    ],
    commonMistakes: [
      { wrong: "She was studying for hours before the exam started.", right: "She had been studying for hours before the exam started.", reason: "Use Past Perfect Continuous instead of Past Continuous to emphasize the duration prior to another past event." }
    ],
    examQuestions: [
      {
        q: "Hamad _______ for his speaking exam for weeks before the AI feedback tool was launched.",
        opts: ["has been practicing", "had been practicing", "was practicing", "practices"],
        ans: 1,
        exp: "The action started, continued for weeks, and finished before another past action, requiring Past Perfect Continuous."
      }
    ]
  },
  usedTo: {
    title: "Used To / Would",
    formula: "Subject + used to + Base Verb (Infinitive) / Subject + would + Base Verb",
    explanation: "'Used to' describes past habits or past states that are no longer true. 'Would' only describes past habits (not states).",
    examples: [
      { original: "I used to live in Abu Dhabi when I was a child. (State)", ar: "اعتدت أن أعيش في أبوظبي عندما كنت طفلاً. (حالة)" },
      { original: "Every Friday, my father would take us to the park. (Habit)", ar: "كل جمعة، كان والدي يأخذنا إلى الحديقة. (عادة متكررة)" }
    ],
    commonMistakes: [
      { wrong: "I would be a lazy student, but now I study hard.", right: "I used to be a lazy student, but now I study hard.", reason: "'be' is a state verb. You cannot use 'would' with state verbs for past states; use 'used to' instead." }
    ],
    examQuestions: [
      {
        q: "We _______ have a lot of books in the library, but now we use digital PDF booklets.",
        opts: ["would", "used to", "are used to", "use to"],
        ans: 1,
        exp: "'have' is a state verb, so 'used to' is required instead of 'would'."
      }
    ]
  }
};

const READING_PASSAGES: ReadingPassage[] = [
  {
    id: "follow-your-heart",
    title: "Follow Your Heart",
    story: "In today's fast-paced world, choosing a career path can be overwhelming. Many educators recommend that high school graduates follow their heart rather than focusing purely on salary. Passion leads to resilience. When you enjoy your job, you are more likely to overcome vocational challenges and build a sustainable career. Vocational training centers across the UAE offer students hands-on experience, helping them explore different industries like technology, design, and green energy. Ultimately, aligning your skills with your personal values is the key to true success and happiness in your career.",
    summary: "The text emphasizes the importance of selecting a career path based on personal passion and values rather than salary alone, arguing that passion builds long-term resilience and job satisfaction.",
    characters: "High school graduates, academic advisors, and vocational trainers.",
    mainIdea: "Aligning career choices with personal interest and values is essential for building a happy and sustainable professional life.",
    expressions: [
      "follow your heart (اتبع شغفك/قلبك)",
      "vocational training (التدريب المهني)",
      "career path (مسار مهني)"
    ],
    questions: [
      {
        q: "What is the main recommendation of the text for high school graduates?",
        opts: [
          "Focus only on highest paying jobs",
          "Follow their passion and interest",
          "Avoid choosing a career",
          "Study only medicine"
        ],
        ans: 1,
        exp: "The text explicitly states: 'follow their heart rather than focusing purely on salary.'"
      },
      {
        q: "According to the text, what does passion lead to?",
        opts: ["Resilience", "Boredom", "Lazy habits", "High stress only"],
        ans: 0,
        exp: "The text says: 'Passion leads to resilience.'"
      },
      {
        q: "What do vocational training centers in the UAE offer?",
        opts: [
          "Only theoretical lectures",
          "Hands-on experience in various fields",
          "Free holidays",
          "Financial loans"
        ],
        ans: 1,
        exp: "The text mentions: 'offer students hands-on experience, helping them explore different industries...'"
      },
      {
        q: "What is the key to true success and happiness in a career?",
        opts: [
          "Working in foreign countries",
          "Working 80 hours a week",
          "Aligning skills with personal values",
          "Following classmates' decisions"
        ],
        ans: 2,
        exp: "The text ends with: 'aligning your skills with your personal values is the key to true success...'"
      },
      {
        q: "Which word in the text means 'the ability to recover quickly from difficulties'?",
        opts: ["Overwhelming", "Resilience", "Sustainable", "Vocational"],
        ans: 1,
        exp: "Resilience is the capacity to recover quickly from difficulties; toughness."
      },
      {
        q: "Why does following salary alone sometimes fail?",
        opts: [
          "It doesn't build long-term passion and resilience",
          "It is forbidden",
          "Salaries are not real",
          "It takes too much time"
        ],
        ans: 0,
        exp: "Passion builds resilience to overcome professional challenges."
      },
      {
        q: "The antonym of 'sustainable' is:",
        opts: ["renewable", "unviable / depletable", "long-term", "natural"],
        ans: 1,
        exp: "Depletable or unviable is the opposite of sustainable."
      },
      {
        q: "Cloud seeding is an example of UAE innovation in:",
        opts: ["space exploration", "precipitation management", "cyber security", "artistic design"],
        ans: 1,
        exp: "Cloud seeding increases rainfall (precipitation)."
      },
      {
        q: "What does 'aligning' mean in this context?",
        opts: ["opposing", "matching / adjusting", "drawing a circle", "forgetting"],
        ans: 1,
        exp: "Aligning means bringing things into agreement or correct relation."
      },
      {
        q: "True or False: Enjoying your job makes you more likely to overcome challenges.",
        opts: ["True", "False", "Not mentioned", "None"],
        ans: 0,
        exp: "Yes, 'When you enjoy your job, you are more likely to overcome vocational challenges...'"
      }
    ]
  },
  {
    id: "awatifs-career",
    title: "Awatif's Career",
    story: "Awatif always had a dream of becoming a computer engineer. Despite facing discouragement from people who thought coding was too difficult, she persevered. She enrolled in a prestigious tech program in Abu Dhabi. She spent nights debugging programs, studying algorithms, and mastering software architectures. Her dedication caught on, and soon she was leading her team in developing a smart application that predicts traffic flows. Today, Awatif stands as a role model for young girls in the UAE, proving that gender is not a barrier to innovation in science and engineering.",
    summary: "Awatif overcame doubts to become a successful computer engineer in Abu Dhabi, eventually leading traffic application projects and inspiring other Emirati girls.",
    characters: "Awatif (the protagonist), tech team members, and young Emirati girls.",
    mainIdea: "Dedication, perseverance, and passion can overcome stereotypes and obstacles in STEM fields.",
    expressions: [
      "computer engineer (مهندسة كمبيوتر)",
      "role model (قدوة حسنة)",
      "gender barrier (حاجز الجنس)"
    ],
    questions: [
      {
        q: "What was Awatif's dream career?",
        opts: ["Medical doctor", "Computer engineer", "Banker", "Teacher"],
        ans: 1,
        exp: "The text says: 'dream of becoming a computer engineer.'"
      },
      {
        q: "What difficulty did she face at the beginning?",
        opts: [
          "Lack of internet connection",
          "Discouragement from others about coding difficulty",
          "Failing her school",
          "Health problems"
        ],
        ans: 1,
        exp: "The text mentions: 'facing discouragement from people who thought coding was too difficult...'"
      },
      {
        q: "Where did she study tech?",
        opts: ["Dubai", "Abu Dhabi", "Sharjah", "Al Ain"],
        ans: 1,
        exp: "She 'enrolled in a prestigious tech program in Abu Dhabi.'"
      },
      {
        q: "What did the smart application she developed predict?",
        opts: ["Weather conditions", "Traffic flows", "Stock market", "Exam dates"],
        ans: 1,
        exp: "The app 'predicts traffic flows.'"
      },
      {
        q: "Which expression is used to describe Awatif at the end?",
        opts: ["A role model", "A coding beginner", "A lazy employee", "An opponent"],
        ans: 0,
        exp: "She 'stands as a role model for young girls in the UAE...'"
      },
      {
        q: "What does 'caught on' mean in Awatif's story?",
        opts: ["Her hard work became recognized and respected", "She fell down", "She lost her key", "She left the country"],
        ans: 0,
        exp: "Here, 'Her dedication caught on' means it became noticed and appreciated."
      },
      {
        q: "True or False: Awatif is a role model for boys only.",
        opts: ["True", "False", "Not mentioned", "None"],
        ans: 1,
        exp: "False, she is a role model for young girls in the UAE."
      },
      {
        q: "What did she spend nights doing?",
        opts: ["Playing games", "Debugging programs and studying", "Sleeping", "Traveling"],
        ans: 1,
        exp: "She 'spent nights debugging programs, studying algorithms...'"
      },
      {
        q: "The word 'prestigious' means:",
        opts: ["unimportant", "highly respected and famous", "very cheap", "broken"],
        ans: 1,
        exp: "Prestigious means having high status or reputation."
      },
      {
        q: "What fields does her success inspire girls in?",
        opts: ["Science and engineering", "Cooking", "Driving", "Sports only"],
        ans: 0,
        exp: "She proves gender is not a barrier in 'science and engineering'."
      }
    ]
  },
  {
    id: "global-warming",
    title: "Global Warming & Environment",
    story: "Global warming remains one of the most critical threats facing our planet today. The burning of fossil fuels has led to an increase in greenhouse gas concentrations in the atmosphere, trapping solar heat and raising temperatures. This has resulted in the melting of polar ice caps, rising sea levels, and unpredictable weather patterns worldwide. To combat this crisis, nations are pledging to transition to renewable energy sources like wind, solar, and hydrogen power. The UAE's Net Zero 2050 strategic initiative is a leading regional model for sustainability and climate action, demonstrating a firm commitment to clean energy.",
    summary: "Global warming is a critical threat caused by burning fossil fuels, resulting in rising temperatures. Transitioning to renewable energy, like the UAE Net Zero 2050, is essential to fight it.",
    characters: "Global leaders, environmental scientists, and UAE climate policy makers.",
    mainIdea: "Transitioning to clean energy and committing to sustainability policies is necessary to reverse the damages of global warming.",
    expressions: [
      "greenhouse gas (غازات الدفيئة)",
      "fossil fuels (الوقود الأحفوري)",
      "Net Zero (صافي الانبعاثات الصفري)"
    ],
    questions: [
      {
        q: "What causes the increase in greenhouse gases?",
        opts: ["Planting trees", "Burning fossil fuels", "Solar energy panels", "Water filtration"],
        ans: 1,
        exp: "The text says: 'The burning of fossil fuels has led to an increase in greenhouse gas...'"
      },
      {
        q: "What happens when greenhouse gases trap heat?",
        opts: ["Global temperatures rise", "The earth freezes", "Precipitation stops completely", "Plants die instantly"],
        ans: 0,
        exp: "...'trapping solar heat and raising temperatures.'"
      },
      {
        q: "Which of the following is NOT a consequence of global warming mentioned?",
        opts: ["Melting polar ice caps", "Rising sea levels", "Volcanic eruptions", "Unpredictable weather"],
        ans: 2,
        exp: "Volcanoes are not mentioned as a consequence in this text."
      },
      {
        q: "What clean energy sources does the text recommend?",
        opts: ["Coal and gas", "Wind, solar, and hydrogen power", "Nuclear waste", "Wood burning"],
        ans: 1,
        exp: "It lists: 'renewable energy sources like wind, solar, and hydrogen power.'"
      },
      {
        q: "What is the name of the UAE strategic initiative for climate action?",
        opts: ["Net Zero 2050", "Green Dubai 2030", "Emirates Solar Hub", "UAE Cloud Seeding Project"],
        ans: 0,
        exp: "The text names the 'UAE's Net Zero 2050 strategic initiative.'"
      },
      {
        q: "What does 'trapping' mean?",
        opts: ["Releasing", "Catching and holding", "Cooling", "Reflecting"],
        ans: 1,
        exp: "Trapping means catching and preventing from escaping."
      },
      {
        q: "Fossil fuels include:",
        opts: ["solar and wind", "coal, oil, and natural gas", "wood and leaves", "water and air"],
        ans: 1,
        exp: "Fossil fuels are hydrocarbons like coal, fuel oil, or natural gas."
      },
      {
        q: "Global warming is a critical threat to:",
        opts: ["only cold countries", "the entire planet", "space", "technology only"],
        ans: 1,
        exp: "The text states it is 'facing our planet today.'"
      },
      {
        q: "The word 'combat' means:",
        opts: ["support", "fight / oppose", "surrender", "describe"],
        ans: 1,
        exp: "To combat means to take action to reduce or prevent something bad."
      },
      {
        q: "What does Net Zero mean?",
        opts: ["Zero cost", "Zero greenhouse gas emissions balance", "No internet", "No progress"],
        ans: 1,
        exp: "Net Zero refers to reaching a state in which greenhouse gases going into the atmosphere are balanced by removal."
      }
    ]
  }
];

const MAZE_QUESTIONS: MazeQuestion[] = [
  {
    id: "m1",
    textBefore: "If the government had invested earlier in clean energy, they ",
    choices: ["will avoid", "would have avoided", "avoided", "would avoid"],
    textAfter: " the current resource depletion crisis.",
    correctIndex: 1,
    explanation: "This is a Third Conditional sentence. The if-clause has 'had invested' (Past Perfect), so the main clause requires 'would have + V3'."
  },
  {
    id: "m2",
    textBefore: "By the time the new policy was announced, the solar project ",
    choices: ["has been completed", "had been completed", "is completed", "completed"],
    textAfter: " by the engineers in Abu Dhabi.",
    correctIndex: 1,
    explanation: "Requires Past Perfect Passive because the action was completed by someone else before another action in the past."
  },
  {
    id: "m3",
    textBefore: "My English teacher, ",
    choices: ["who", "whom", "whose", "which"],
    textAfter: " lessons are always interactive, was rewarded by the Ministry.",
    correctIndex: 2,
    explanation: "'whose' is the possessive relative pronoun linking 'teacher' and her 'lessons'."
  },
  {
    id: "m4",
    textBefore: "He is the candidate for ",
    choices: ["who", "whom", "whose", "which"],
    textAfter: " the students voted during the school elections.",
    correctIndex: 1,
    explanation: "After a preposition (for), use 'whom' when referring to a person as the object."
  }
];

const EMSAT_GRAMMAR_PRACTICE = [
  {
    q: "The lady _______ son won the national spelling bee contest was extremely proud.",
    opts: ["who", "whom", "whose", "which"],
    ans: 2,
    exp: "Use 'whose' to show possession of the son by the lady."
  },
  {
    q: "The new eco-friendly city, _______ is powered entirely by solar panels, was visited by global leaders.",
    opts: ["who", "whom", "whose", "which"],
    ans: 3,
    exp: "Use 'which' for non-defining relative clauses referring to things or places."
  },
  {
    q: "This is the student _______ the principal selected to represent the school at the UAE debate.",
    opts: ["who", "whom", "whose", "which"],
    ans: 1,
    exp: "Use 'whom' as it refers to the object of the verb 'selected'."
  },
  {
    q: "The engineers _______ worked on the wind farm achieved great success.",
    opts: ["who", "whom", "whose", "which"],
    ans: 0,
    exp: "Use 'who' as the relative pronoun for the subject of the clause referring to people."
  }
];

const WRITING_TOPICS = [
  {
    topic: "Technology in Education",
    essayType: "Opinion Essay",
    prompt: "Some believe that artificial intelligence will replace teachers. Do you agree or disagree?",
    modelAnswer: "In the modern era, technology has integrated into classrooms, transforming pedagogical methods. While AI offers tailored assessments and interactive quizzes, it cannot replace human empathy, mentorship, and moral leadership. Teachers guide character building, whereas AI acts as a tool. Therefore, I disagree that AI will replace teachers; instead, it will act as a powerful co-pilot in the classroom.",
    vocab: ["Pedagogical", "Co-pilot", "Tailored", "Empathy"],
    expressions: ["It is widely argued that...", "In conclusion, I firmly believe..."]
  },
  {
    topic: "Environmental Sustainability",
    essayType: "Discussion Essay",
    prompt: "Discuss the advantages and disadvantages of transitioning immediately to renewable energy.",
    modelAnswer: "Pledging to go Net Zero is essential to combat global warming. The advantages of transitioning immediately to clean energy include reducing greenhouse gas concentrations and preserving resources. However, the economic cost of replacing infrastructure is immense. In conclusion, a balanced and phased transition is the most sustainable approach for nations.",
    vocab: ["Net Zero", "Preserving", "Infrastructure", "Phased"],
    expressions: ["On one hand...", "On the other hand...", "To weigh both sides..."]
  }
];

export default function EnglishGrade11AdvancedPage() {
  const [activeTab, setActiveTab] = useState<
    "vocab" | "grammar" | "reading" | "maze" | "emsat" | "listening_speaking" | "games" | "writing" | "dashboard"
  >("dashboard");

  // General App States
  const [searchQuery, setSearchQuery] = useState("");
  const [streak, setStreak] = useState(3);
  const [points, setPoints] = useState(120);
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>(["Beginner"]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Audio / TTS States
  const [speaking, setSpeaking] = useState(false);
  const [ttsSpeed, setTtsSpeed] = useState<number>(1.0);
  const ttsSynth = useRef<SpeechSynthesis | null>(null);
  const currentUtterance = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      ttsSynth.current = window.speechSynthesis;
    }
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Text To Speech Core
  const speakText = (text: string) => {
    if (!ttsSynth.current) return;
    ttsSynth.current.cancel();

    if (speaking) {
      setSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = ttsSpeed;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    currentUtterance.current = utterance;
    setSpeaking(true);
    ttsSynth.current.speak(utterance);
  };

  const pauseTTS = () => {
    if (ttsSynth.current) {
      if (ttsSynth.current.paused) {
        ttsSynth.current.resume();
      } else {
        ttsSynth.current.pause();
      }
    }
  };

  const changeSpeed = (factor: number) => {
    setTtsSpeed(factor);
    triggerToast(`TTS Speed set to ${factor}x`);
    if (speaking && currentUtterance.current && ttsSynth.current) {
      const txt = currentUtterance.current.text;
      ttsSynth.current.cancel();
      const utterance = new SpeechSynthesisUtterance(txt);
      utterance.lang = "en-US";
      utterance.rate = factor;
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);
      currentUtterance.current = utterance;
      ttsSynth.current.speak(utterance);
    }
  };

  // ----------------------
  // Sub-Module State & Logic
  // ----------------------

  // 1. Vocabulary Hub States
  const [selectedVocabIdx, setSelectedVocabIdx] = useState(0);
  const [vocabAnswers, setVocabAnswers] = useState<Record<number, number>>({});
  const [vocabQuizResults, setVocabQuizResults] = useState<Record<number, boolean>>({});

  const handleVocabAnswer = (vocabIdx: number, selectedOptIdx: number) => {
    const correct = VOCABULARY_LIST[vocabIdx].correctIndex === selectedOptIdx;
    setVocabAnswers({ ...vocabAnswers, [vocabIdx]: selectedOptIdx });
    setVocabQuizResults({ ...vocabQuizResults, [vocabIdx]: correct });
    if (correct) {
      setPoints((prev) => prev + 10);
      triggerToast("Correct Answer! +10 Points ⭐");
      if (!unlockedBadges.includes("Vocab Hero")) {
        setUnlockedBadges([...unlockedBadges, "Vocab Hero"]);
      }
    } else {
      triggerToast("Oops! Incorrect, try again.");
    }
  };

  // 2. Grammar Center States
  const [selectedGrammarKey, setSelectedGrammarKey] = useState("thirdConditional");
  const [grammarQuizAns, setGrammarQuizAns] = useState<Record<string, number>>({});
  const [grammarQuizCorrect, setGrammarQuizCorrect] = useState<Record<string, boolean>>({});

  const handleGrammarQuiz = (key: string, selectedIdx: number) => {
    const correct = GRAMMAR_RULES[key].examQuestions[0].ans === selectedIdx;
    setGrammarQuizAns({ ...grammarQuizAns, [key]: selectedIdx });
    setGrammarQuizCorrect({ ...grammarQuizCorrect, [key]: correct });
    if (correct) {
      setPoints((prev) => prev + 15);
      triggerToast("Excellent! +15 Points ⭐");
      if (!unlockedBadges.includes("Grammar Expert")) {
        setUnlockedBadges([...unlockedBadges, "Grammar Expert"]);
      }
    }
  };

  // 3. Reading Center States
  const [selectedPassageIdx, setSelectedPassageIdx] = useState(0);
  const [readingQuizAnswers, setReadingQuizAnswers] = useState<Record<string, number>>({});
  const [readingQuizSubmitted, setReadingQuizSubmitted] = useState<Record<string, boolean>>({});
  const [readingProgress, setReadingProgress] = useState<Record<string, number>>({});

  const handleReadingQuizAnswer = (passageId: string, qIdx: number, optIdx: number) => {
    setReadingQuizAnswers({ ...readingQuizAnswers, [`${passageId}_${qIdx}`]: optIdx });
  };

  const submitReadingQuiz = (passageId: string, passage: ReadingPassage) => {
    let score = 0;
    passage.questions.forEach((q, i) => {
      if (readingQuizAnswers[`${passageId}_${i}`] === q.ans) {
        score++;
      }
    });
    setReadingQuizSubmitted({ ...readingQuizSubmitted, [passageId]: true });
    setReadingProgress({ ...readingProgress, [passageId]: score * 10 });
    setPoints((prev) => prev + score * 5);
    triggerToast(`Quiz completed! You scored ${score}/10. +${score * 5} Points.`);
    if (score === 10 && !unlockedBadges.includes("Reader Champion")) {
      setUnlockedBadges([...unlockedBadges, "Reader Champion"]);
    }
  };

  // 4. MAZE Center States
  const [mazeScores, setMazeScores] = useState<Record<string, boolean>>({});
  const [mazeSelections, setMazeSelections] = useState<Record<string, number>>({});

  const handleMazeSubmit = (maze: MazeQuestion, selIdx: number) => {
    const correct = maze.correctIndex === selIdx;
    setMazeSelections({ ...mazeSelections, [maze.id]: selIdx });
    setMazeScores({ ...mazeScores, [maze.id]: correct });
    if (correct) {
      setPoints((prev) => prev + 20);
      triggerToast("MAZE Solved! +20 Points ⭐");
      if (!unlockedBadges.includes("MAZE Slayer")) {
        setUnlockedBadges([...unlockedBadges, "MAZE Slayer"]);
      }
    } else {
      triggerToast("Incorrect! Try again.");
    }
  };

  // 5. Listening & Speaking (Simulated Speaking Feedback)
  const [recordingState, setRecordingState] = useState<"idle" | "recording" | "analyzing" | "done">("idle");
  const [speakingScore, setSpeakingScore] = useState<number | null>(null);

  const startRecordingSimulation = () => {
    setRecordingState("recording");
    triggerToast("Recording user audio via microphone...");
    setTimeout(() => {
      setRecordingState("analyzing");
      setTimeout(() => {
        const score = Math.floor(Math.random() * 16) + 85; // 85 to 100
        setSpeakingScore(score);
        setRecordingState("done");
        setPoints((prev) => prev + 25);
        triggerToast(`AI Evaluation: Pronunciation Match ${score}%! +25 points`);
      }, 2000);
    }, 3000);
  };

  // 6. EmSAT Section
  const [emsatMode, setEmsatMode] = useState<"timed" | "practice">("practice");
  const [emsatTime, setEmsatTime] = useState<number>(60);
  const [emsatAnswers, setEmsatAnswers] = useState<Record<number, number>>({});
  const [emsatSubmitted, setEmsatSubmitted] = useState<boolean>(false);
  const [emsatScore, setEmsatScore] = useState<number>(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (emsatMode === "timed" && emsatTime > 0 && !emsatSubmitted) {
      timer = setTimeout(() => setEmsatTime(emsatTime - 1), 1000);
    } else if (emsatTime === 0 && !emsatSubmitted) {
      submitEmsat();
    }
    return () => clearTimeout(timer);
  }, [emsatTime, emsatMode, emsatSubmitted]);

  const startEmsatSimulator = (mode: "timed" | "practice") => {
    setEmsatMode(mode);
    setEmsatTime(60);
    setEmsatAnswers({});
    setEmsatSubmitted(false);
    setEmsatScore(0);
    triggerToast(`EmSAT Simulator started in ${mode} mode.`);
  };

  const submitEmsat = () => {
    let correct = 0;
    EMSAT_GRAMMAR_PRACTICE.forEach((q, idx) => {
      if (emsatAnswers[idx] === q.ans) {
        correct++;
      }
    });
    setEmsatScore(correct);
    setEmsatSubmitted(true);
    setPoints((prev) => prev + correct * 10);
    triggerToast(`EmSAT Simulator Finished! Score: ${correct}/${EMSAT_GRAMMAR_PRACTICE.length}`);
  };

  // 7. Interactive Games (Word Match Game)
  const [selectedMatchWord, setSelectedMatchWord] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const matchWords = useMemo(() => ["catch on", "sustainability", "coherent", "depletion", "precipitation", "innovation"], []);
  const matchMeanings = useMemo(() => [
    "to understand or become popular",
    "meeting present needs without harming the future",
    "logical, clear and consistent",
    "reduction or running out of resources",
    "rain or snow falling to the ground",
    "introducing new ideas or methods"
  ], []);

  const handleMatchClick = (word: string, isMeaning: boolean) => {
    if (!selectedMatchWord) {
      setSelectedMatchWord(word);
    } else {
      // Check if it matches
      const wordIdx = matchWords.indexOf(isMeaning ? word : selectedMatchWord);
      const meaningIdx = matchMeanings.indexOf(isMeaning ? selectedMatchWord : word);
      if (wordIdx !== -1 && meaningIdx !== -1 && wordIdx === meaningIdx) {
        setMatchedPairs([...matchedPairs, matchWords[wordIdx]]);
        triggerToast("Match Found! ⭐");
        setPoints((prev) => prev + 15);
      } else {
        triggerToast("Try another pair!");
      }
      setSelectedMatchWord(null);
    }
  };

  // Search Results inside English Platform
  const searchItems = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    const results: { type: string; title: string; desc: string; action: () => void }[] = [];

    // Search Vocabulary
    VOCABULARY_LIST.forEach((v) => {
      if (v.word.toLowerCase().includes(query) || v.arabic.includes(query)) {
        results.push({
          type: "Vocabulary Word",
          title: `${v.word} (${v.arabic})`,
          desc: v.meaning,
          action: () => { setActiveTab("vocab"); setSearchQuery(""); }
        });
      }
    });

    // Search Grammar
    Object.entries(GRAMMAR_RULES).forEach(([key, rule]) => {
      if (rule.title.toLowerCase().includes(query) || rule.explanation.toLowerCase().includes(query)) {
        results.push({
          type: "Grammar Rule",
          title: rule.title,
          desc: rule.explanation,
          action: () => { setActiveTab("grammar"); setSelectedGrammarKey(key); setSearchQuery(""); }
        });
      }
    });

    // Search Reading
    READING_PASSAGES.forEach((passage) => {
      if (passage.title.toLowerCase().includes(query) || passage.story.toLowerCase().includes(query)) {
        results.push({
          type: "Reading Passage",
          title: passage.title,
          desc: passage.summary,
          action: () => { setActiveTab("reading"); setSelectedPassageIdx(READING_PASSAGES.indexOf(passage)); setSearchQuery(""); }
        });
      }
    });

    return results;
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-blue-600 selection:text-white pb-16">
      
      {/* Top Banner and Navigation */}
      <header className="border-b border-slate-900 bg-slate-900/60 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-2.5 bg-slate-850 hover:bg-blue-600/10 text-slate-300 hover:text-blue-500 rounded-2xl transition-all"
            title="الرجوع للرئيسية"
          >
            <ArrowLeft size={18} />
          </Link>
          <div className="flex flex-col">
            <h1 className="text-lg font-black tracking-tight text-white flex items-center gap-1.5">
              <span>English Grade 11 Advanced</span>
              <Sparkles size={16} className="text-blue-400" />
            </h1>
            <p className="text-[10px] text-slate-400 font-bold">Interactive Learning & Exam Hub • © حمد العبدولي 2026</p>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 right-3 flex items-center text-slate-400 pointer-events-none">
            <Search size={14} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search words, rules, or passages..."
            className="w-full pl-4 pr-10 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-blue-500 text-white"
          />

          {/* Search Dropdown */}
          {searchQuery.trim() && (
            <div className="absolute right-0 top-full mt-2 w-full bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden z-50">
              {searchItems.length === 0 ? (
                <div className="p-3 text-xs text-slate-500 text-center">No matching results found.</div>
              ) : (
                <div className="flex flex-col divide-y divide-slate-800">
                  {searchItems.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={item.action}
                      className="px-4 py-2.5 hover:bg-slate-850 text-right w-full flex flex-col gap-1 transition-colors"
                    >
                      <div className="flex justify-between items-center text-[10px] font-black">
                        <span className="text-blue-400">{item.type}</span>
                        <ArrowLeft size={10} className="text-slate-400" />
                      </div>
                      <span className="text-xs font-bold text-white">{item.title}</span>
                      <span className="text-[9px] text-slate-400 line-clamp-1">{item.desc}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Global TTS Controls Panel */}
        <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 border border-slate-800 rounded-2xl shrink-0">
          <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
            <Volume2 size={12} className="text-blue-500" />
            <span>TTS:</span>
          </span>
          <button
            onClick={pauseTTS}
            className="p-1 hover:bg-slate-850 rounded text-slate-400 hover:text-white"
            title="Play/Pause TTS"
          >
            <Pause size={10} />
          </button>
          <div className="h-3 w-[1px] bg-slate-850" />
          <button
            onClick={() => changeSpeed(0.7)}
            className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${ttsSpeed === 0.7 ? "bg-blue-600 text-white" : "text-slate-500 hover:text-white"}`}
          >
            Slow
          </button>
          <button
            onClick={() => changeSpeed(1.0)}
            className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${ttsSpeed === 1.0 ? "bg-blue-600 text-white" : "text-slate-500 hover:text-white"}`}
          >
            Normal
          </button>
          <button
            onClick={() => changeSpeed(1.4)}
            className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${ttsSpeed === 1.4 ? "bg-blue-600 text-white" : "text-slate-500 hover:text-white"}`}
          >
            Fast
          </button>
        </div>
      </header>

      {/* Main Grid Content */}
      <main className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-1 flex flex-col gap-3">
          <div className="bg-slate-900 border border-slate-850 p-4 rounded-3xl flex flex-col gap-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Study Desk Navigation</span>
            
            {[
              { id: "dashboard", label: "Dashboard & Streak", icon: TrendingUp },
              { id: "vocab", label: "Vocabulary Hub", icon: BookOpen },
              { id: "grammar", label: "Grammar Center", icon: Layers },
              { id: "reading", label: "Reading Center", icon: BookOpenCheck },
              { id: "maze", label: "MAZE Center", icon: Clock },
              { id: "emsat", label: "EmSAT Simulator", icon: ShieldAlert },
              { id: "listening_speaking", label: "Listening & Speaking", icon: Mic },
              { id: "games", label: "Interactive Games", icon: Star },
              { id: "writing", label: "Writing Center", icon: Edit3 }
            ].map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full px-4 py-3 rounded-2xl text-xs font-bold text-right flex items-center justify-between transition-all cursor-pointer ${
                    active
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/10"
                      : "bg-slate-950 text-slate-400 hover:bg-slate-850 hover:text-slate-200 border border-transparent"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Icon size={14} className={active ? "text-white" : "text-blue-500"} />
                    <span>{tab.label}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Telegram Joining Callout */}
          <div className="bg-gradient-to-br from-blue-700 to-blue-500 rounded-3xl p-5 flex flex-col justify-between h-48 relative overflow-hidden shadow-lg shadow-blue-500/15">
            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-black text-white">Telegram Channel 📢</h3>
              <p className="text-[10px] text-blue-100 leading-relaxed mt-1">
                Join our official Telegram for exam coverages, PDFs, and solved papers.
              </p>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <span className="text-[9px] text-center bg-white/10 py-1 rounded font-mono border border-white/10">@Advvvv11</span>
              <a
                href="https://t.me/Advvvv11"
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 bg-white text-blue-600 hover:bg-slate-100 text-xs font-black rounded-xl text-center shadow-lg transition-colors"
              >
                Join Now Free
              </a>
            </div>
          </div>
        </aside>

        {/* Content Pane */}
        <section className="lg:col-span-3 flex flex-col gap-6">
          
          {/* Dashboard and Streak Module */}
          {activeTab === "dashboard" && (
            <div className="flex flex-col gap-6">
              
              {/* Header Dashboard Banner */}
              <div className="bg-slate-900 border border-slate-850 rounded-3xl p-6 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex flex-col gap-2 text-right">
                  <span className="px-3 py-1 bg-blue-600/10 text-blue-400 border border-blue-600/10 rounded-full text-[10px] font-bold w-fit ml-auto">
                    Grade 11 Advanced • Study Desk
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">Welcome, English Champion! 🏆</h2>
                  <p className="text-xs text-slate-400 max-w-md">
                    Track your streak, complete daily vocabulary matching games, and solve EmSAT simulated tasks to hit your study goals.
                  </p>
                </div>

                <div className="flex gap-4 shrink-0">
                  <div className="bg-slate-950 border border-slate-850 px-4 py-3 rounded-2xl flex flex-col items-center justify-center text-center">
                    <span className="text-2xl">🔥</span>
                    <span className="text-lg font-black text-orange-500">{streak} Days</span>
                    <span className="text-[9px] text-slate-500 font-bold">Daily Streak</span>
                  </div>
                  <div className="bg-slate-950 border border-slate-850 px-4 py-3 rounded-2xl flex flex-col items-center justify-center text-center">
                    <span className="text-2xl">⭐</span>
                    <span className="text-lg font-black text-yellow-400">{points} Points</span>
                    <span className="text-[9px] text-slate-500 font-bold">Score Reward</span>
                  </div>
                </div>
              </div>

              {/* Achievements & Badges List */}
              <div className="bg-slate-900 border border-slate-850 rounded-3xl p-6">
                <h3 className="text-sm font-black text-white border-b border-slate-850 pb-3 mb-4">Unlocked Badges & Medals 🏅</h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { name: "Beginner", icon: "🌱", desc: "Started English platform review." },
                    { name: "Vocab Hero", icon: "📚", desc: "Answered vocabulary quiz correctly." },
                    { name: "Grammar Expert", icon: "⚖️", desc: "Passed a grammar check." },
                    { name: "MAZE Slayer", icon: "🧭", desc: "Solved a complex MAZE task." }
                  ].map((badge) => {
                    const unlocked = unlockedBadges.includes(badge.name);
                    return (
                      <div
                        key={badge.name}
                        className={`p-4 border rounded-2xl flex flex-col items-center text-center gap-1.5 transition-all ${
                          unlocked
                            ? "bg-slate-950 border-blue-500/30 text-white"
                            : "bg-slate-950/20 border-slate-900 text-slate-600"
                        }`}
                      >
                        <span className={`text-3xl ${unlocked ? "grayscale-0" : "grayscale"}`}>{badge.icon}</span>
                        <span className="text-xs font-black leading-none">{badge.name}</span>
                        <span className="text-[9px] text-slate-500 font-medium">{badge.desc}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Daily Challenge Card */}
              <div className="bg-gradient-to-r from-blue-900/40 to-slate-900 border border-blue-800/30 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-3xl p-3 bg-blue-600/10 text-blue-500 rounded-2xl">⚡</span>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-black text-white">Daily English Challenge</span>
                    <span className="text-[10px] text-slate-400">Match all 6 vocabulary concepts to win an extra +50 points!</span>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab("games")}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-black rounded-xl shadow-lg transition-colors"
                >
                  Start Challenge
                </button>
              </div>

            </div>
          )}

          {/* Vocabulary Hub Module */}
          {activeTab === "vocab" && (
            <div className="bg-slate-900 border border-slate-850 rounded-3xl p-6 flex flex-col gap-6">
              
              <div className="border-b border-slate-850 pb-4 flex justify-between items-center">
                <h3 className="text-sm font-black text-white">Vocabulary Hub 📚</h3>
                <span className="text-[10px] text-slate-400">Click speaker button for Text To Speech.</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Word List sidebar */}
                <div className="md:col-span-1 flex flex-col gap-2 max-h-[400px] overflow-y-auto pr-2">
                  {VOCABULARY_LIST.map((vocab, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedVocabIdx(idx);
                        speakText(vocab.word);
                      }}
                      className={`p-3 rounded-xl border text-right flex items-center justify-between transition-all cursor-pointer ${
                        selectedVocabIdx === idx
                          ? "bg-blue-600/10 border-blue-500 text-blue-400 font-bold"
                          : "bg-slate-950 border-slate-850 text-slate-400 hover:bg-slate-850"
                      }`}
                    >
                      <span className="text-xs font-bold font-mono">{vocab.word}</span>
                      <span className="text-[10px] text-slate-500">{vocab.arabic}</span>
                    </button>
                  ))}
                </div>

                {/* Vocabulary Card details */}
                <div className="md:col-span-2 bg-slate-950 border border-slate-850 rounded-3xl p-6 flex flex-col gap-4">
                  
                  {/* Word Header with TTS */}
                  <div className="flex justify-between items-center border-b border-slate-900 pb-3">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => speakText(VOCABULARY_LIST[selectedVocabIdx].word)}
                        className="p-2.5 bg-blue-600/10 hover:bg-blue-600 text-blue-500 hover:text-white rounded-xl transition-all"
                        title="Pronounce word"
                      >
                        <Volume2 size={16} />
                      </button>
                      <h4 className="text-lg font-black text-white font-mono">{VOCABULARY_LIST[selectedVocabIdx].word}</h4>
                    </div>
                    <span className="text-xs font-bold text-slate-500">{VOCABULARY_LIST[selectedVocabIdx].arabic}</span>
                  </div>

                  {/* Body meanings */}
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] text-slate-500 font-bold uppercase">English Meaning:</span>
                    <p className="text-xs text-slate-350 leading-relaxed font-medium">
                      {VOCABULARY_LIST[selectedVocabIdx].meaning}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Example Sentence:</span>
                    <div className="p-3 bg-slate-900/60 border border-slate-850 rounded-xl flex items-center justify-between gap-3">
                      <p className="text-xs font-mono text-emerald-400 italic">
                        "{VOCABULARY_LIST[selectedVocabIdx].example}"
                      </p>
                      <button
                        onClick={() => speakText(VOCABULARY_LIST[selectedVocabIdx].example)}
                        className="p-1.5 bg-slate-950 hover:bg-blue-600/10 text-slate-400 hover:text-blue-500 rounded-lg"
                        title="Listen sentence"
                      >
                        <Volume2 size={12} />
                      </button>
                    </div>
                    <span className="text-[10px] text-slate-400 text-right pr-2">
                      {VOCABULARY_LIST[selectedVocabIdx].translation}
                    </span>
                  </div>

                  {/* Synonyms & Related */}
                  <div className="grid grid-cols-2 gap-4 border-t border-slate-900 pt-3">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] text-slate-500 font-bold">Synonyms:</span>
                      <div className="flex flex-wrap gap-1">
                        {VOCABULARY_LIST[selectedVocabIdx].synonyms.map((syn, i) => (
                          <span key={i} className="text-[9px] bg-slate-900 border border-slate-850 px-2 py-0.5 rounded-lg text-slate-300">
                            {syn}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] text-slate-500 font-bold">Related Words:</span>
                      <div className="flex flex-wrap gap-1">
                        {VOCABULARY_LIST[selectedVocabIdx].related.map((rel, i) => (
                          <span key={i} className="text-[9px] bg-slate-900 border border-slate-850 px-2 py-0.5 rounded-lg text-slate-300">
                            {rel}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Vocabulary card mini-quiz */}
                  <div className="border-t border-slate-900 pt-4 mt-2">
                    <span className="text-[10px] text-blue-400 font-black uppercase flex items-center gap-1">
                      <HelpCircle size={10} />
                      <span>Vocabulary Card Quiz:</span>
                    </span>
                    <p className="text-xs font-bold text-slate-300 mt-1 mb-2">Choose the correct meaning of this word:</p>
                    
                    <div className="flex flex-col gap-2">
                      {VOCABULARY_LIST[selectedVocabIdx].options.map((opt, optIdx) => {
                        const answered = vocabAnswers[selectedVocabIdx] !== undefined;
                        const isSelected = vocabAnswers[selectedVocabIdx] === optIdx;
                        const isCorrect = VOCABULARY_LIST[selectedVocabIdx].correctIndex === optIdx;
                        
                        return (
                          <button
                            key={optIdx}
                            disabled={answered}
                            onClick={() => handleVocabAnswer(selectedVocabIdx, optIdx)}
                            className={`p-2.5 text-right text-xs rounded-xl border transition-all ${
                              answered
                                ? isCorrect
                                  ? "bg-emerald-600/10 border-emerald-500 text-emerald-500 font-bold"
                                  : isSelected
                                    ? "bg-red-600/10 border-red-500 text-red-500"
                                    : "bg-slate-950 border-slate-900 text-slate-600"
                                : "bg-slate-900 hover:bg-slate-850 border-slate-850 hover:border-slate-700 text-slate-300 cursor-pointer"
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* Grammar Center Module */}
          {activeTab === "grammar" && (
            <div className="bg-slate-900 border border-slate-850 rounded-3xl p-6 flex flex-col gap-6">
              
              {/* Tabs for grammar rules */}
              <div className="flex border-b border-slate-850 gap-2 overflow-x-auto pb-2">
                {Object.entries(GRAMMAR_RULES).map(([key, rule]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedGrammarKey(key)}
                    className={`px-4 py-2 text-xs font-bold rounded-xl transition-all shrink-0 cursor-pointer ${
                      selectedGrammarKey === key
                        ? "bg-blue-600 text-white"
                        : "bg-slate-950 text-slate-400 hover:bg-slate-850 hover:text-slate-200"
                    }`}
                  >
                    {rule.title}
                  </button>
                ))}
              </div>

              {/* Grammar Details Card */}
              {GRAMMAR_RULES[selectedGrammarKey] && (
                <div className="flex flex-col gap-6">
                  
                  {/* Title & Description */}
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-lg font-black text-white">{GRAMMAR_RULES[selectedGrammarKey].title}</h3>
                    <p className="text-xs text-slate-350 leading-relaxed font-medium">
                      {GRAMMAR_RULES[selectedGrammarKey].explanation}
                    </p>
                  </div>

                  {/* Formula Box */}
                  {GRAMMAR_RULES[selectedGrammarKey].formula && (
                    <div className="p-4 bg-slate-950 border border-slate-850 rounded-2xl flex flex-col gap-1">
                      <span className="text-[9px] text-slate-500 font-bold uppercase">Formula:</span>
                      <div className="bg-slate-900 px-3 py-2 border border-slate-850 text-xs font-bold font-mono text-emerald-400 rounded-xl text-center select-all">
                        {GRAMMAR_RULES[selectedGrammarKey].formula}
                      </div>
                    </div>
                  )}

                  {/* Timeline Box */}
                  {GRAMMAR_RULES[selectedGrammarKey].timeline && (
                    <div className="p-4 bg-slate-950 border border-slate-850 rounded-2xl flex flex-col gap-1">
                      <span className="text-[9px] text-slate-500 font-bold uppercase">Tense Timeline:</span>
                      <div className="bg-slate-900 px-3 py-2 border border-slate-850 text-xs font-bold font-mono text-blue-400 rounded-xl text-center select-all">
                        {GRAMMAR_RULES[selectedGrammarKey].timeline}
                      </div>
                    </div>
                  )}

                  {/* Interactive Examples */}
                  <div className="flex flex-col gap-3">
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Examples:</span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {GRAMMAR_RULES[selectedGrammarKey].examples.map((ex, i) => (
                        <div key={i} className="p-4 bg-slate-950 border border-slate-850 rounded-2xl flex flex-col gap-2">
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-xs font-mono font-bold text-white">{ex.original}</p>
                            <button
                              onClick={() => speakText(ex.original)}
                              className="p-1 bg-slate-900 hover:bg-blue-600/10 text-slate-400 hover:text-blue-500 rounded-lg shrink-0"
                              title="Listen sentence"
                            >
                              <Volume2 size={12} />
                            </button>
                          </div>
                          <span className="text-[10px] text-slate-400 text-right">{ex.ar}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Common Mistakes */}
                  <div className="flex flex-col gap-3">
                    <span className="text-[10px] text-red-400 font-black uppercase">Common Mistakes to Avoid:</span>
                    <div className="flex flex-col gap-2">
                      {GRAMMAR_RULES[selectedGrammarKey].commonMistakes.map((m, i) => (
                        <div key={i} className="p-4 bg-red-950/10 border border-red-950/30 rounded-2xl flex flex-col gap-1.5 text-right">
                          <div className="flex justify-between items-center text-xs font-mono text-red-500">
                            <span>❌ {m.wrong}</span>
                          </div>
                          <div className="flex justify-between items-center text-xs font-mono text-emerald-500">
                            <span>✅ {m.right}</span>
                          </div>
                          <p className="text-[10px] text-slate-400 mt-1">{m.reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Practice Question */}
                  <div className="border-t border-slate-850 pt-6">
                    <span className="text-[10px] text-blue-400 font-black uppercase flex items-center gap-1">
                      <HelpCircle size={10} />
                      <span>Interactive Practice Question:</span>
                    </span>
                    <p className="text-xs font-bold text-white mt-1 mb-3">
                      {GRAMMAR_RULES[selectedGrammarKey].examQuestions[0].q}
                    </p>

                    <div className="flex flex-col gap-2">
                      {GRAMMAR_RULES[selectedGrammarKey].examQuestions[0].opts.map((opt, i) => {
                        const answered = grammarQuizAns[selectedGrammarKey] !== undefined;
                        const isSelected = grammarQuizAns[selectedGrammarKey] === i;
                        const isCorrect = GRAMMAR_RULES[selectedGrammarKey].examQuestions[0].ans === i;

                        return (
                          <button
                            key={i}
                            disabled={answered}
                            onClick={() => handleGrammarQuiz(selectedGrammarKey, i)}
                            className={`p-3 text-right text-xs rounded-xl border transition-all ${
                              answered
                                ? isCorrect
                                  ? "bg-emerald-600/10 border-emerald-500 text-emerald-500 font-bold"
                                  : isSelected
                                    ? "bg-red-600/10 border-red-500 text-red-500"
                                    : "bg-slate-950 border-slate-900 text-slate-600"
                                : "bg-slate-950 hover:bg-slate-850 border-slate-850 hover:border-slate-700 text-slate-350 cursor-pointer"
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                </div>
              )}

            </div>
          )}

          {/* Reading Center Module */}
          {activeTab === "reading" && (
            <div className="bg-slate-900 border border-slate-850 rounded-3xl p-6 flex flex-col gap-6">
              
              {/* Tabs for Reading Passages */}
              <div className="flex border-b border-slate-850 gap-2 overflow-x-auto pb-2">
                {READING_PASSAGES.map((passage, idx) => (
                  <button
                    key={passage.id}
                    onClick={() => {
                      setSelectedPassageIdx(idx);
                      // Reset quiz status for this passage
                      setReadingQuizSubmitted({ ...readingQuizSubmitted, [passage.id]: false });
                    }}
                    className={`px-4 py-2 text-xs font-bold rounded-xl transition-all shrink-0 cursor-pointer ${
                      selectedPassageIdx === idx
                        ? "bg-blue-600 text-white"
                        : "bg-slate-950 text-slate-400 hover:bg-slate-850 hover:text-slate-200"
                    }`}
                  >
                    {passage.title}
                  </button>
                ))}
              </div>

              {/* Passage Details Display */}
              {READING_PASSAGES[selectedPassageIdx] && (
                <div className="flex flex-col gap-6">
                  
                  {/* Story Header */}
                  <div className="flex justify-between items-center border-b border-slate-850 pb-3">
                    <h3 className="text-base font-black text-white">{READING_PASSAGES[selectedPassageIdx].title}</h3>
                    
                    <button
                      onClick={() => speakText(READING_PASSAGES[selectedPassageIdx].story)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-black rounded-xl flex items-center gap-1.5"
                    >
                      <Volume2 size={12} />
                      <span>{speaking ? "Stop Listening" : "Listen Story"}</span>
                    </button>
                  </div>

                  {/* Story Text Box with Highlight Simulation */}
                  <div className="p-6 bg-slate-950 border border-slate-850 rounded-2xl flex flex-col gap-3">
                    <p className="text-sm text-slate-300 leading-relaxed font-serif select-text">
                      {READING_PASSAGES[selectedPassageIdx].story}
                    </p>
                  </div>

                  {/* Summaries & Analyses */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 bg-slate-950 border border-slate-850 rounded-2xl flex flex-col gap-1.5">
                      <span className="text-[10px] text-blue-400 font-bold uppercase">Summary:</span>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        {READING_PASSAGES[selectedPassageIdx].summary}
                      </p>
                    </div>
                    <div className="p-4 bg-slate-950 border border-slate-850 rounded-2xl flex flex-col gap-1.5">
                      <span className="text-[10px] text-blue-400 font-bold uppercase">Key Characters/Actors:</span>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        {READING_PASSAGES[selectedPassageIdx].characters}
                      </p>
                    </div>
                    <div className="p-4 bg-slate-950 border border-slate-850 rounded-2xl flex flex-col gap-1.5">
                      <span className="text-[10px] text-blue-400 font-bold uppercase">Main Idea:</span>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        {READING_PASSAGES[selectedPassageIdx].mainIdea}
                      </p>
                    </div>
                  </div>

                  {/* Key Expressions Translation Popup simulation */}
                  <div className="p-4 bg-slate-950 border border-slate-850 rounded-2xl flex flex-col gap-2">
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Important Expressions & Vocabularies:</span>
                    <div className="flex flex-wrap gap-2">
                      {READING_PASSAGES[selectedPassageIdx].expressions.map((exp, i) => (
                        <button
                          key={i}
                          onClick={() => triggerToast(`Pronunciation & translation: "${exp}"`)}
                          className="px-3 py-1.5 bg-slate-900 border border-slate-850 hover:border-blue-500/40 rounded-xl text-xs font-mono text-slate-300 transition-colors"
                        >
                          {exp}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Reading Quiz (10 Questions) */}
                  <div className="border-t border-slate-850 pt-6 mt-4">
                    <h4 className="text-sm font-black text-white mb-4">Reading Quiz (10 Questions)</h4>
                    
                    <div className="flex flex-col gap-6">
                      {READING_PASSAGES[selectedPassageIdx].questions.map((q, qIdx) => {
                        const ansKey = `${READING_PASSAGES[selectedPassageIdx].id}_${qIdx}`;
                        const selectedOpt = readingQuizAnswers[ansKey];
                        const submitted = readingQuizSubmitted[READING_PASSAGES[selectedPassageIdx].id];

                        return (
                          <div key={qIdx} className="p-4 bg-slate-950 border border-slate-850 rounded-2xl flex flex-col gap-3">
                            <span className="text-[10px] font-bold text-slate-500">Question {qIdx + 1} of 10</span>
                            <p className="text-xs font-bold text-white leading-normal">{q.q}</p>

                            <div className="flex flex-col gap-2">
                              {q.opts.map((opt, optIdx) => {
                                const isSelected = selectedOpt === optIdx;
                                const isCorrect = q.ans === optIdx;

                                return (
                                  <button
                                    key={optIdx}
                                    disabled={submitted}
                                    onClick={() => handleReadingQuizAnswer(READING_PASSAGES[selectedPassageIdx].id, qIdx, optIdx)}
                                    className={`p-2.5 text-right text-xs rounded-xl border transition-all ${
                                      submitted
                                        ? isCorrect
                                          ? "bg-emerald-600/10 border-emerald-500 text-emerald-500 font-bold"
                                          : isSelected
                                            ? "bg-red-600/10 border-red-500 text-red-500"
                                            : "bg-slate-950 border-slate-900 text-slate-600"
                                        : isSelected
                                          ? "bg-blue-600/10 border-blue-500 text-blue-400 font-bold"
                                          : "bg-slate-900 hover:bg-slate-850 border-slate-850 text-slate-350 cursor-pointer"
                                    }`}
                                  >
                                    {opt}
                                  </button>
                                );
                              })}
                            </div>

                            {submitted && (
                              <div className="p-3 bg-slate-900 rounded-xl border border-slate-850 text-[10px] text-slate-400">
                                💡 <span className="font-bold text-emerald-500">Explanation:</span> {q.exp}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {!readingQuizSubmitted[READING_PASSAGES[selectedPassageIdx].id] && (
                      <button
                        onClick={() => submitReadingQuiz(READING_PASSAGES[selectedPassageIdx].id, READING_PASSAGES[selectedPassageIdx])}
                        className="mt-6 w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-black rounded-xl shadow-lg transition-colors"
                      >
                        Submit Answers & Calculate Score
                      </button>
                    )}

                  </div>

                </div>
              )}

            </div>
          )}

          {/* MAZE Center Module */}
          {activeTab === "maze" && (
            <div className="bg-slate-900 border border-slate-850 rounded-3xl p-6 flex flex-col gap-6">
              
              <div className="border-b border-slate-850 pb-4 flex justify-between items-center">
                <div className="flex flex-col">
                  <h3 className="text-sm font-black text-white">MAZE Practice Center 🧭</h3>
                  <p className="text-[10px] text-slate-400">Complete standard exam-level MAZE paragraphs.</p>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                {MAZE_QUESTIONS.map((maze, idx) => {
                  const selIdx = mazeSelections[maze.id];
                  const answered = selIdx !== undefined;
                  const scoreCorrect = mazeScores[maze.id];

                  return (
                    <div key={maze.id} className="p-5 bg-slate-950 border border-slate-850 rounded-2xl flex flex-col gap-4">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] bg-blue-600/10 text-blue-400 px-2 py-0.5 rounded border border-blue-500/10 font-bold">
                          Practice Task #{idx + 1}
                        </span>
                        <div className="flex items-center gap-1 text-[10px] text-slate-500">
                          <Clock size={12} />
                          <span>45s Timer</span>
                        </div>
                      </div>

                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-850 text-xs sm:text-sm font-mono leading-relaxed">
                        <span>{maze.textBefore}</span>
                        <span className="px-2 py-0.5 bg-blue-600 text-white font-bold rounded mx-1">
                          {answered ? maze.choices[selIdx] : " [ ? ] "}
                        </span>
                        <span>{maze.textAfter}</span>
                      </div>

                      {/* Choices Grid */}
                      <div className="grid grid-cols-2 gap-3 mt-2">
                        {maze.choices.map((choice, cIdx) => {
                          const isSelected = selIdx === cIdx;
                          const isCorrect = maze.correctIndex === cIdx;

                          return (
                            <button
                              key={cIdx}
                              disabled={answered}
                              onClick={() => handleMazeSubmit(maze, cIdx)}
                              className={`p-3 text-center text-xs font-mono rounded-xl border transition-all ${
                                answered
                                  ? isCorrect
                                    ? "bg-emerald-600/10 border-emerald-500 text-emerald-500 font-bold"
                                    : isSelected
                                      ? "bg-red-600/10 border-red-500 text-red-500"
                                      : "bg-slate-950 border-slate-900 text-slate-600"
                                  : "bg-slate-900 hover:bg-slate-850 border-slate-850 hover:border-slate-700 text-slate-300 cursor-pointer"
                              }`}
                            >
                              {choice}
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation box */}
                      {answered && (
                        <div className={`p-3.5 rounded-xl border text-[10px] leading-relaxed text-right ${
                          scoreCorrect
                            ? "bg-emerald-950/10 border-emerald-900/30 text-emerald-400"
                            : "bg-red-950/10 border-red-900/30 text-red-400"
                        }`}>
                          💡 <span className="font-bold">الشرح باللغة العربية:</span> {maze.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* EmSAT Simulator Module */}
          {activeTab === "emsat" && (
            <div className="bg-slate-900 border border-slate-850 rounded-3xl p-6 flex flex-col gap-6">
              
              <div className="border-b border-slate-850 pb-4 flex justify-between items-center">
                <div className="flex flex-col">
                  <h3 className="text-sm font-black text-white">EmSAT Grammar Simulator 📝</h3>
                  <p className="text-[10px] text-slate-400">Specially focused on Relative Clauses and relative pronouns.</p>
                </div>
              </div>

              {/* Mode Selection */}
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => startEmsatSimulator("practice")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold ${emsatMode === "practice" ? "bg-blue-600 text-white" : "bg-slate-950 text-slate-500"}`}
                >
                  Practice Mode
                </button>
                <button
                  onClick={() => startEmsatSimulator("timed")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold ${emsatMode === "timed" ? "bg-blue-600 text-white" : "bg-slate-950 text-slate-500"}`}
                >
                  Timed Mode (60s)
                </button>
              </div>

              {/* Timed Mode Countdown */}
              {emsatMode === "timed" && !emsatSubmitted && (
                <div className="p-3 bg-red-950/20 border border-red-900/30 text-red-400 text-xs font-mono font-bold rounded-xl text-center flex items-center justify-center gap-1">
                  <Clock size={14} />
                  <span>Time Remaining: {emsatTime} seconds</span>
                </div>
              )}

              {/* Questions list */}
              <div className="flex flex-col gap-6 mt-2">
                {EMSAT_GRAMMAR_PRACTICE.map((q, idx) => {
                  const selAns = emsatAnswers[idx];
                  const showExplanation = emsatSubmitted;
                  
                  return (
                    <div key={idx} className="p-4 bg-slate-950 border border-slate-850 rounded-2xl flex flex-col gap-3">
                      <span className="text-[10px] text-slate-500 font-bold">Question #{idx + 1}</span>
                      <p className="text-xs font-bold text-white">{q.q}</p>
                      
                      <div className="grid grid-cols-2 gap-2">
                        {q.opts.map((opt, optIdx) => {
                          const isSelected = selAns === optIdx;
                          const isCorrect = q.ans === optIdx;

                          return (
                            <button
                              key={optIdx}
                              disabled={emsatSubmitted}
                              onClick={() => setEmsatAnswers({ ...emsatAnswers, [idx]: optIdx })}
                              className={`p-2.5 text-center text-xs font-mono rounded-xl border transition-all ${
                                emsatSubmitted
                                  ? isCorrect
                                    ? "bg-emerald-600/10 border-emerald-500 text-emerald-500 font-bold"
                                    : isSelected
                                      ? "bg-red-600/10 border-red-500 text-red-500"
                                      : "bg-slate-950 border-slate-900 text-slate-600"
                                  : isSelected
                                    ? "bg-blue-600/10 border-blue-500 text-blue-400 font-bold"
                                    : "bg-slate-900 hover:bg-slate-850 border-slate-850 text-slate-350 cursor-pointer"
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>

                      {showExplanation && (
                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-850 text-[10px] text-slate-400 text-right">
                          💡 <span className="font-bold text-emerald-500">التوضيح:</span> {q.exp}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {!emsatSubmitted && (
                <button
                  onClick={submitEmsat}
                  className="mt-4 w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-black rounded-xl shadow-lg transition-colors"
                >
                  Submit Simulator Exam
                </button>
              )}

            </div>
          )}

          {/* Listening & Speaking Module */}
          {activeTab === "listening_speaking" && (
            <div className="bg-slate-900 border border-slate-850 rounded-3xl p-6 flex flex-col gap-6">
              
              <div className="border-b border-slate-850 pb-4">
                <h3 className="text-sm font-black text-white">Listening & Speaking Hub 🎙️</h3>
                <p className="text-[10px] text-slate-400">Chapters 5 & 6 core vocabularies and voice evaluation practice.</p>
              </div>

              {/* Vocab details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="p-4 bg-slate-950 border border-slate-850 rounded-2xl flex flex-col gap-3">
                  <span className="text-[10px] text-blue-400 font-bold uppercase">Chapter 5 Listening Vocabs:</span>
                  <div className="flex flex-col gap-2">
                    {[
                      { word: "correlation", ar: "ارتباط / علاقة متبادلة", exp: "A mutual relationship or connection between two or more things." },
                      { word: "infrastructure", ar: "البنية التحتية", exp: "The basic physical and organizational structures needed for the operation of a society." }
                    ].map((item, idx) => (
                      <div key={idx} className="p-3 bg-slate-900 rounded-xl border border-slate-850 flex items-center justify-between gap-3 text-right">
                        <button
                          onClick={() => speakText(`${item.word}, ${item.exp}`)}
                          className="p-2 bg-slate-950 hover:bg-blue-600/10 text-slate-400 hover:text-blue-500 rounded-lg"
                        >
                          <Volume2 size={12} />
                        </button>
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-white font-mono">{item.word}</span>
                          <span className="text-[9px] text-slate-400">{item.ar}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-slate-950 border border-slate-850 rounded-2xl flex flex-col gap-3">
                  <span className="text-[10px] text-blue-400 font-bold uppercase">Chapter 6 Speaking Vocabs:</span>
                  <div className="flex flex-col gap-2">
                    {[
                      { word: "sustainability", ar: "الاستدامة البيئية", exp: "Preserving climate and resource balance for the next generation." },
                      { word: "innovative", ar: "ابتكاري / إبداعي", exp: "Featuring new methods; advanced and original." }
                    ].map((item, idx) => (
                      <div key={idx} className="p-3 bg-slate-900 rounded-xl border border-slate-850 flex items-center justify-between gap-3 text-right">
                        <button
                          onClick={() => speakText(`${item.word}, ${item.exp}`)}
                          className="p-2 bg-slate-950 hover:bg-blue-600/10 text-slate-400 hover:text-blue-500 rounded-lg"
                        >
                          <Volume2 size={12} />
                        </button>
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-white font-mono">{item.word}</span>
                          <span className="text-[9px] text-slate-400">{item.ar}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Speaking Simulator Tool */}
              <div className="p-5 bg-slate-950 border border-slate-850 rounded-3xl mt-4 flex flex-col items-center justify-center text-center gap-4">
                <span className="text-2xl">🎙️</span>
                <div className="flex flex-col">
                  <h4 className="text-xs font-black text-white">Interactive Speaking Practice</h4>
                  <p className="text-[10px] text-slate-400 max-w-sm mt-1">
                    Click record and read the following sentence aloud:
                  </p>
                  <p className="text-xs text-blue-400 font-mono font-bold italic mt-2">
                    "Cloud seeding is an innovative technique to increase precipitation."
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  {recordingState === "idle" && (
                    <button
                      onClick={startRecordingSimulation}
                      className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white text-xs font-black rounded-xl shadow-lg transition-colors flex items-center gap-2"
                    >
                      <Mic size={14} />
                      <span>Record Voice</span>
                    </button>
                  )}

                  {recordingState === "recording" && (
                    <div className="flex items-center gap-2 text-red-500 animate-pulse text-xs font-bold">
                      <span className="w-2.5 h-2.5 bg-red-500 rounded-full" />
                      <span>Recording... (Speak Now)</span>
                    </div>
                  )}

                  {recordingState === "analyzing" && (
                    <div className="flex items-center gap-2 text-blue-400 animate-spin text-xs font-bold">
                      <RefreshCw size={14} />
                      <span>AI Evaluating Pronunciation...</span>
                    </div>
                  )}

                  {recordingState === "done" && (
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-xs font-bold text-emerald-400">
                        Match Score: <span className="font-extrabold">{speakingScore}%</span>
                      </span>
                      <button
                        onClick={() => setRecordingState("idle")}
                        className="px-4 py-2 bg-slate-900 border border-slate-850 hover:bg-slate-800 text-[10px] font-bold text-slate-300 rounded-lg"
                      >
                        Try Again
                      </button>
                    </div>
                  )}
                </div>
              </div>

            </div>
          )}

          {/* Interactive Games Module */}
          {activeTab === "games" && (
            <div className="bg-slate-900 border border-slate-850 rounded-3xl p-6 flex flex-col gap-6">
              
              <div className="border-b border-slate-850 pb-4">
                <h3 className="text-sm font-black text-white">Interactive Gamification Desk 🎮</h3>
                <p className="text-[10px] text-slate-400">Play games to build vocabulary recall and earn points.</p>
              </div>

              {/* Word Match Game */}
              <div className="p-5 bg-slate-950 border border-slate-850 rounded-2xl flex flex-col gap-4">
                <span className="text-[10px] text-blue-400 font-bold uppercase">Game 1: Word Match</span>
                <p className="text-xs text-slate-400 leading-normal">
                  Click a word from the left and its corresponding meaning from the right.
                </p>

                <div className="grid grid-cols-2 gap-4 mt-2">
                  {/* Left Column Words */}
                  <div className="flex flex-col gap-2">
                    {matchWords.map((word) => {
                      const matched = matchedPairs.includes(word);
                      const isSelected = selectedMatchWord === word;
                      return (
                        <button
                          key={word}
                          disabled={matched}
                          onClick={() => handleMatchClick(word, false)}
                          className={`p-3 text-right text-xs font-mono rounded-xl border transition-all ${
                            matched
                              ? "bg-slate-900/10 border-slate-900 text-slate-600 line-through"
                              : isSelected
                                ? "bg-blue-600/10 border-blue-500 text-blue-400 font-bold"
                                : "bg-slate-900 hover:bg-slate-850 border-slate-850 text-slate-300 cursor-pointer"
                          }`}
                        >
                          {word}
                        </button>
                      );
                    })}
                  </div>

                  {/* Right Column Meanings */}
                  <div className="flex flex-col gap-2">
                    {matchMeanings.map((meaning) => {
                      // Find word matching this meaning
                      const matchingWord = matchWords[matchMeanings.indexOf(meaning)];
                      const matched = matchedPairs.includes(matchingWord);
                      const isSelected = selectedMatchWord === meaning;
                      return (
                        <button
                          key={meaning}
                          disabled={matched}
                          onClick={() => handleMatchClick(meaning, true)}
                          className={`p-3 text-right text-xs rounded-xl border transition-all ${
                            matched
                              ? "bg-slate-900/10 border-slate-900 text-slate-600 line-through"
                              : isSelected
                                ? "bg-blue-600/10 border-blue-500 text-blue-400 font-bold"
                                : "bg-slate-900 hover:bg-slate-850 border-slate-850 text-slate-350 cursor-pointer"
                          }`}
                        >
                          {meaning}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {matchedPairs.length === matchWords.length && (
                  <div className="p-4 bg-emerald-950/20 border border-emerald-900/30 text-emerald-400 text-xs font-bold rounded-xl text-center mt-4">
                    🎉 Excellent! You have successfully matched all words! +50 Extra Points awarded.
                  </div>
                )}
              </div>

            </div>
          )}

          {/* Writing Center Module */}
          {activeTab === "writing" && (
            <div className="bg-slate-900 border border-slate-850 rounded-3xl p-6 flex flex-col gap-6">
              
              <div className="border-b border-slate-850 pb-4">
                <h3 className="text-sm font-black text-white">Writing Center 📝</h3>
                <p className="text-[10px] text-slate-400">Review model answers and essay structures.</p>
              </div>

              <div className="flex flex-col gap-6">
                {WRITING_TOPICS.map((topic, idx) => (
                  <div key={idx} className="p-5 bg-slate-950 border border-slate-850 rounded-2xl flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] bg-blue-600/10 text-blue-400 px-2.5 py-0.5 rounded border border-blue-500/10 font-bold">
                        {topic.essayType}
                      </span>
                      <h4 className="text-xs font-bold text-white">{topic.topic}</h4>
                    </div>

                    <p className="text-xs font-bold text-slate-300 italic">"Prompt: {topic.prompt}"</p>

                    <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-850 flex flex-col gap-2">
                      <span className="text-[9px] text-slate-500 font-bold uppercase">Model Essay Answer:</span>
                      <p className="text-xs text-slate-400 leading-relaxed select-text">
                        {topic.modelAnswer}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="text-[9px] text-slate-500 font-bold uppercase mr-2 flex items-center">Vocabularies:</span>
                      {topic.vocab.map((v, i) => (
                        <span key={i} className="text-[9px] bg-slate-900 border border-slate-850 px-2 py-0.5 rounded-lg text-slate-350">
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

        </section>

      </main>

      {/* Footer Credits */}
      <footer className="border-t border-slate-900 mt-16 pt-8 text-center text-xs text-slate-500 flex flex-col items-center gap-2">
        <p>جميع الحقوق محفوظة © حمد العبدولي 2026</p>
        <div className="flex gap-4">
          <a
            href="https://t.me/Advvvv11"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline text-xs"
          >
            Official Telegram channel: @Advvvv11
          </a>
        </div>
      </footer>

      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3.5 bg-blue-600 text-white text-xs font-black rounded-2xl shadow-2xl animate-bounce flex items-center gap-2 border border-blue-500">
          <Check size={14} strokeWidth={4} />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
