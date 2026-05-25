"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, HelpCircle, Brain, RefreshCcw, Award, Check, X, ShieldAlert, Timer, Play, BookOpen, Layers } from "lucide-react";
import confetti from "canvas-confetti";

interface Question {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export default function AIQuizPage() {
  const [structureInput, setStructureInput] = useState("");
  const [subject, setSubject] = useState("english");
  const [numQuestions, setNumQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState("متوسط");

  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [errorMsg, setErrorMsg] = useState("");

  // Quiz taking state
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Timer state
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [timerActive, setTimerActive] = useState(false);

  const loadingQuotes = [
    "يا هلا والله! عم نحلل بنود هيكل الوزارة يلي طرشته...",
    "عم نتصل بنماذج الذكاء الاصطناعي وبنولد الأسئلة...",
    "عم نصمم خيارات ممتازة ومحاكية للاختبار النهائي...",
    "عم نراجع التفاسير الكيميائية واللغوية بالعربي عشانك...",
    "خلصنا تقريباً! عم نجهز المختبر التفاعلي والأسئلة..."
  ];

  // Rotate loading steps
  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setLoadingStep(prev => (prev + 1) % loadingQuotes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [loading]);

  // Countdown timer
  useEffect(() => {
    if (!timerActive || timeLeft <= 0) {
      if (timeLeft === 0 && !quizFinished) {
        setQuizFinished(true);
      }
      return;
    }
    const timer = setTimeout(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, timerActive, quizFinished]);

  const handleGenerateQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!structureInput.trim()) return;

    setLoading(true);
    setLoadingStep(0);
    setErrorMsg("");
    setQuizQuestions([]);

    try {
      const res = await fetch("/api/generate-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          structure: structureInput.trim(),
          subject,
          numQuestions,
          difficulty
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setQuizQuestions(data);
          // Start quiz
          setCurrentIdx(0);
          setSelectedOption(null);
          setChecked(false);
          setScore(0);
          setQuizFinished(false);
          setTimeLeft(numQuestions * 120); // 2 minutes per question
          setTimerActive(true);
        } else {
          setErrorMsg("فشل توليد الاختبار. رجاءً تأكد من كتابة هيكل واضح وحاول مرة أخرى.");
        }
      } else {
        setErrorMsg("حدث خطأ أثناء التواصل مع خوادم الذكاء الاصطناعي. يرجى المحاولة لاحقاً.");
      }
    } catch {
      setErrorMsg("خطأ في الاتصال، يرجى التحقق من جودة الإنترنت.");
    } finally {
      setLoading(false);
    }
  };

  const handleOptionClick = (idx: number) => {
    if (checked) return;
    setSelectedOption(idx);
  };

  const handleCheck = () => {
    if (selectedOption === null || checked) return;
    setChecked(true);
    if (selectedOption === quizQuestions[currentIdx].answerIndex) {
      setScore(prev => prev + 1);
      // Nice pop confetti for correct answer
      confetti({
        particleCount: 40,
        spread: 40,
        origin: { y: 0.8 }
      });
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setChecked(false);
    if (currentIdx < quizQuestions.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setTimerActive(false);
      setQuizFinished(true);
      // Large confetti celebration on quiz completion
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.7 }
      });
    }
  };

  const handleRestart = () => {
    setQuizQuestions([]);
    setQuizFinished(false);
    setScore(0);
    setCurrentIdx(0);
    setStructureInput("");
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const activeQuestion = quizQuestions[currentIdx];

  return (
    <div className="min-h-[85vh] py-8 px-4 flex flex-col gap-6 max-w-3xl mx-auto text-right">
      
      {/* Back Button and Title */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-5">
        <Link
          href="/"
          className="p-2.5 bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-400 rounded-2xl transition-all flex items-center gap-1.5 text-xs font-bold"
        >
          <ArrowRight size={14} />
          <span>الرئيسية</span>
        </Link>
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-2xl animate-pulse">
            <Brain size={28} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl sm:text-2xl font-black text-white">صانع الاختبارات بالذكاء الاصطناعي 🧠✨</h1>
            <p className="text-xs text-slate-400 mt-1">طرش هيكل مادتك وحوله فوراً لكويز محاكي 100% للاختبارات الوزارية!</p>
          </div>
        </div>
      </div>

      {/* ─── STATE 1: Form & Customizer ────────────────────────────────────────── */}
      {quizQuestions.length === 0 && !loading && (
        <form onSubmit={handleGenerateQuiz} className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 flex flex-col gap-6 relative overflow-hidden backdrop-blur-xl shadow-2xl">
          
          <div className="absolute top-[-100px] left-[-100px] w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

          {errorMsg && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold rounded-2xl flex items-center gap-2">
              <ShieldAlert size={16} />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Pasting Structure Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-extrabold text-slate-350 flex items-center gap-1 justify-start">
              <Sparkles size={12} className="text-emerald-500" />
              <span>طرش / الصق هيكل المادة أو المنهج الدراسي هنا:</span>
            </label>
            <textarea
              required
              rows={6}
              value={structureInput}
              onChange={(e) => setStructureInput(e.target.value)}
              placeholder="مثال لهيكل الإنجليزي:
Part 1: Reading comprehension - 2 passages with MCQ.
Part 2: Grammar - modal verbs, conditional sentences, passive voice.
Part 3: Vocabulary - unit 7 & 8 words."
              className="w-full p-4 bg-slate-950 border border-slate-800 focus:border-emerald-500 text-xs sm:text-sm text-white rounded-2xl focus:outline-none transition-all leading-relaxed placeholder:text-slate-650"
            />
          </div>

          {/* Subject & Options selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-extrabold text-slate-400">المادة الدراسية الأساسية:</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500 text-xs text-white"
              >
                <option value="english">إنجليزي (English) 🇬🇧</option>
                <option value="math">الرياضيات (Math) 📐</option>
                <option value="physics">الفيزياء (Physics) ⚡</option>
                <option value="chemistry">الكيمياء (Chemistry) 🧪</option>
                <option value="biology">الأحياء (Biology) 🧬</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-extrabold text-slate-400">عدد الأسئلة المطلوبة:</label>
              <select
                value={numQuestions}
                onChange={(e) => setNumQuestions(Number(e.target.value))}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500 text-xs text-white"
              >
                <option value={5}>5 أسئلة سريعة</option>
                <option value={10}>10 أسئلة متوسطة</option>
                <option value={15}>15 سؤالاً شاملاً</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-extrabold text-slate-400">مستوى الصعوبة المحاكي:</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500 text-xs text-white"
              >
                <option value="سهل">سهل (Easy)</option>
                <option value="متوسط">متوسط (Medium)</option>
                <option value="وزاري متقدم">وزاري متقدم (MOE Advanced)</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm rounded-2xl transition-all shadow-lg shadow-emerald-950/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles size={16} className="animate-pulse" />
            <span>توليد كويز محاكي بالذكاء الاصطناعي 🚀</span>
          </button>

        </form>
      )}

      {/* ─── STATE 2: AI Generating Loading screen ─────────────────────────────────── */}
      {loading && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 flex flex-col items-center justify-center text-center gap-6 shadow-2xl relative min-h-[300px]">
          
          {/* Animated Flask & Atoms */}
          <div className="relative w-20 h-20 flex items-center justify-center mb-2">
            <div className="absolute w-20 h-20 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
            <Brain size={40} className="text-emerald-500 animate-pulse" />
          </div>

          <h3 className="text-base sm:text-lg font-black text-white">جاري صياغة وتأمين الاختبار المحاكي... 🧠✨</h3>
          
          <div className="bg-slate-950 border border-slate-850 p-4 rounded-2xl w-full max-w-md animate-pulse">
            <p className="text-xs text-emerald-400 font-extrabold leading-relaxed">
              {loadingQuotes[loadingStep]}
            </p>
          </div>
          
          <span className="text-[10px] text-slate-500">يرجى الانتظار، تستغرق العملية حوالي 15-30 ثانية لتصميم اختبارات ذات معايير دقيقة.</span>

        </div>
      )}

      {/* ─── STATE 3: Interactive Exam taking Session ─────────────────────────────── */}
      {quizQuestions.length > 0 && !quizFinished && activeQuestion && (
        <div className="bg-slate-900 border border-slate-850 rounded-3xl p-5 sm:p-6 flex flex-col gap-6 shadow-2xl">
          
          {/* Timer and score top bar */}
          <div className="flex justify-between items-center border-b border-slate-800 pb-3.5">
            <div className="flex items-center gap-1.5 text-xs font-black text-amber-500">
              <Timer size={14} className="animate-pulse" />
              <span>الوقت المتبقي:</span>
              <span className="font-mono">{formatTime(timeLeft)}</span>
            </div>
            
            <div className="flex items-center gap-1 text-[10px] text-slate-400 font-extrabold bg-slate-950 px-3 py-1 rounded-xl border border-slate-850">
              <span>السؤال:</span>
              <span className="text-white font-mono font-black">{currentIdx + 1}</span>
              <span>من</span>
              <span className="text-white font-mono font-black">{quizQuestions.length}</span>
            </div>
          </div>

          {/* Question Text display */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] text-emerald-500 font-black">السؤال المحاكي للهيكل:</span>
            <h2 className="text-sm sm:text-base font-black text-white leading-relaxed text-justify bg-slate-950 p-5 border border-slate-850 rounded-2xl whitespace-pre-wrap select-text">
              {activeQuestion.question}
            </h2>
          </div>

          {/* Options List */}
          <div className="flex flex-col gap-3">
            {activeQuestion.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              let optStyle = "bg-slate-950 hover:bg-slate-900 border-slate-850 text-slate-300";

              if (isSelected && !checked) {
                optStyle = "bg-emerald-950/20 border-emerald-500 text-emerald-400 font-bold";
              }

              if (checked) {
                if (idx === activeQuestion.answerIndex) {
                  optStyle = "bg-emerald-950/30 border-emerald-500 text-emerald-400 font-bold";
                } else if (isSelected) {
                  optStyle = "bg-red-950/30 border-red-500 text-red-400 font-bold";
                } else {
                  optStyle = "bg-slate-950/30 border-slate-950 text-slate-700 opacity-40";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(idx)}
                  className={`w-full text-right p-4 border rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex justify-between items-center gap-4 ${optStyle}`}
                >
                  <div className="flex items-center justify-center shrink-0">
                    {checked && idx === activeQuestion.answerIndex && (
                      <div className="p-1 bg-emerald-500 text-slate-950 rounded-full">
                        <Check size={10} strokeWidth={4} />
                      </div>
                    )}
                    {checked && isSelected && idx !== activeQuestion.answerIndex && (
                      <div className="p-1 bg-red-500 text-white rounded-full">
                        <X size={10} strokeWidth={4} />
                      </div>
                    )}
                    {!checked && (
                      <div className={`w-3.5 h-3.5 border rounded-full ${isSelected ? "border-emerald-500 bg-emerald-500/20" : "border-slate-800"}`} />
                    )}
                  </div>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Action buttons footer */}
          <div className="flex justify-between items-center pt-4 border-t border-slate-800">
            {checked ? (
              <button
                onClick={handleNext}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                {currentIdx === quizQuestions.length - 1 ? "إنهاء وتقديم الاختبار" : "السؤال التالي"}
              </button>
            ) : (
              <button
                onClick={handleCheck}
                disabled={selectedOption === null}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all disabled:opacity-40 disabled:hover:bg-emerald-600 cursor-pointer"
              >
                تأكيد الإجابة
              </button>
            )}
            
            <span className="text-[10px] text-slate-500 font-extrabold">الدرجة الحالية: {score} / {quizQuestions.length}</span>
          </div>

          {/* Explanation Box */}
          {checked && (
            <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl text-right animate-fade-in">
              <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-black mb-1.5">
                <HelpCircle size={12} />
                <span>تفسير الحل العلمي والأكاديمي:</span>
              </div>
              <p className="text-[11px] text-slate-350 leading-relaxed">{activeQuestion.explanation}</p>
            </div>
          )}

        </div>
      )}

      {/* ─── STATE 4: Final Score & Evaluation ─────────────────────────────────── */}
      {quizFinished && (
        <div className="bg-slate-900 border border-slate-850 rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center text-center gap-6 shadow-2xl relative overflow-hidden animate-scale-in">
          
          <div className="absolute top-[-100px] left-[-100px] w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="p-4 bg-emerald-500/10 text-emerald-500 rounded-3xl animate-bounce">
            <Award size={48} />
          </div>

          <h2 className="text-lg sm:text-xl font-black text-white">تم إكمال الاختبار بنجاح يا بطل! 🎓🎉</h2>
          
          <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
            لقد أنهيت بنجاح محاكاة الكويز المولد بالذكاء الاصطناعي لهيكل مادتك. إليك نتائجك المسجلة:
          </p>

          <div className="grid grid-cols-2 gap-4 w-full max-w-sm my-2">
            <div className="p-4 bg-slate-950 border border-slate-850 rounded-2xl flex flex-col items-center gap-0.5">
              <span className="text-[10px] text-slate-500 font-bold">الدرجة المحققة</span>
              <span className="text-base sm:text-lg font-black text-white font-mono">{score} / {quizQuestions.length}</span>
            </div>
            <div className="p-4 bg-slate-950 border border-slate-850 rounded-2xl flex flex-col items-center gap-0.5">
              <span className="text-[10px] text-slate-500 font-bold">النسبة المئوية</span>
              <span className="text-base sm:text-lg font-black text-emerald-400 font-mono">{Math.round((score / quizQuestions.length) * 100)}%</span>
            </div>
          </div>

          <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl max-w-sm text-right">
            <span className="text-[10px] text-emerald-400 font-black">تقييم الأداء بالذكاء الاصطناعي:</span>
            <p className="text-[11px] text-slate-300 leading-relaxed mt-1">
              {score === quizQuestions.length
                ? "أداء خرافي أسطوري! إجابات مثالية تعكس استعداداً مطلقاً للامتحان الوزاري. استمر بهذا المستوى العالي يا بطل!"
                : score >= quizQuestions.length * 0.7
                ? "أداء ممتاز جداً! تمتلك فهماً متيناً لبنود الهيكل ومستعد بشكل كبير جداً للامتحان النهائي. راجع الأخطاء القليلة لتضمن الدرجة الكاملة!"
                : "أداء جيد، ولكن تحتاج لمراجعة بعض الدروس وملخصات الـ PDF المتاحة بالأكاديمية لتثبيت معلومات الهيكل أكثر وتجنب الأخطاء الوزارية."}
            </p>
          </div>

          <button
            onClick={handleRestart}
            className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-black rounded-2xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer mt-2"
          >
            <RefreshCcw size={14} />
            <span>توليد كويز جديد لهيكل آخر</span>
          </button>

        </div>
      )}

      {/* Footer Telegram Stamp */}
      <div className="text-center text-[10px] text-slate-600 flex justify-between items-center border-t border-slate-850 pt-4">
        <span>أكاديمية ADVVVV11 للامتحانات الذكية</span>
        <span className="font-semibold text-emerald-500">t.me/Advvvv11 • حمد العبدولي 2026</span>
      </div>

    </div>
  );
}
