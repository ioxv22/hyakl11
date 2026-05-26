"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Clock, RotateCcw, Award, Play, BookOpen, AlertCircle, HelpCircle } from "lucide-react";
import { MCQ } from "@/data/mockData";

interface MCQStudyHubProps {
  questions: MCQ[];
  lessonId: string;
  isEnglish: boolean;
}

export const MCQStudyHub: React.FC<MCQStudyHubProps> = ({ questions, lessonId, isEnglish }) => {
  const [mode, setMode] = useState<"select" | "quiz" | "practice" | "timed" | "simulation">("select");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  
  // Timed exam & simulation timer
  const [timeLeft, setTimeLeft] = useState(0);
  
  // Exam Simulation state
  const [simAnswers, setSimAnswers] = useState<(number | null)[]>([]);
  const [simQuestions, setSimQuestions] = useState<MCQ[]>([]);

  // Initialize/Reset states
  useEffect(() => {
    setMode("select");
    resetState();
  }, [lessonId]);

  const resetState = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setIsFinished(false);
  };

  // Timer Effect
  useEffect(() => {
    if (mode !== "timed" && mode !== "simulation") return;
    if (isFinished || timeLeft <= 0) {
      if (timeLeft <= 0 && !isFinished) {
        setIsFinished(true);
        if (mode === "simulation") {
          calculateSimulationScore();
        }
      }
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isFinished, mode]);

  const startQuizMode = () => {
    resetState();
    setMode("quiz");
  };

  const startPracticeMode = () => {
    resetState();
    setMode("practice");
  };

  const startTimedMode = () => {
    resetState();
    setTimeLeft(questions.length * 45); // 45 seconds per question
    setMode("timed");
  };

  const startSimulationMode = () => {
    resetState();
    // Shuffle questions
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setSimQuestions(shuffled);
    setSimAnswers(new Array(shuffled.length).fill(null));
    setTimeLeft(shuffled.length * 60); // 1 minute per question
    setMode("simulation");
  };

  const handleSelectQuiz = (index: number) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
    if (index === questions[currentIndex].answerIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNextQuiz = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((c) => c + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setIsFinished(true);
      saveProgress(score, questions.length, "quiz");
    }
  };

  const handleSelectPractice = (index: number) => {
    setSelectedAnswer(index);
    setShowExplanation(true);
  };

  const handleNextPractice = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((c) => c + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleSelectTimed = (index: number) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
    if (index === questions[currentIndex].answerIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNextTimed = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((c) => c + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setIsFinished(true);
      saveProgress(score, questions.length, "timed");
    }
  };

  // Exam Simulation logic
  const handleSelectSimulation = (index: number) => {
    const updated = [...simAnswers];
    updated[currentIndex] = index;
    setSimAnswers(updated);
  };

  const handleNextSimulation = () => {
    if (currentIndex < simQuestions.length - 1) {
      setCurrentIndex((c) => c + 1);
    } else {
      calculateSimulationScore();
    }
  };

  const handlePrevSimulation = () => {
    if (currentIndex > 0) {
      setCurrentIndex((c) => c - 1);
    }
  };

  const calculateSimulationScore = () => {
    let s = 0;
    simQuestions.forEach((q, idx) => {
      if (simAnswers[idx] === q.answerIndex) {
        s += 1;
      }
    });
    setScore(s);
    setIsFinished(true);
    saveProgress(s, simQuestions.length, "simulation");
  };

  const saveProgress = (finalScore: number, total: number, subMode: string) => {
    try {
      const progress = JSON.parse(localStorage.getItem("adv_progress") || "{}");
      progress[`quiz_${lessonId}_${subMode}`] = { score: finalScore, total, date: new Date().toISOString() };
      localStorage.setItem("adv_progress", JSON.stringify(progress));
    } catch (e) {
      console.error(e);
    }
  };

  if (questions.length === 0) {
    return (
      <div className="text-center p-8 text-slate-500 bg-slate-900 border border-slate-800 rounded-3xl">
        {isEnglish ? "No questions available for this lesson." : "لا توجد أسئلة متوفرة حالياً لهذا الدرس."}
      </div>
    );
  }

  // 1. Render Mode Selection Menu
  if (mode === "select") {
    return (
      <div className="bg-slate-950 border border-slate-900 rounded-3xl p-6 md:p-8 flex flex-col gap-6">
        <div className="text-center max-w-lg mx-auto flex flex-col gap-2">
          <h3 className="text-lg font-black text-white">
            {isEnglish ? "Choose MCQ Study Mode" : "اختر وضعية المذاكرة التفاعلية"}
          </h3>
          <p className="text-xs text-slate-400">
            {isEnglish 
              ? "Select how you would like to test your understanding of this lesson." 
              : "اختر الطريقة الأنسب لك لمراجعة واختبار معلوماتك لهذا الدرس."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1: Quiz Mode */}
          <button
            onClick={startQuizMode}
            className="group relative p-5 bg-slate-900 border border-slate-800 rounded-2xl hover:border-emerald-500/40 text-right hover:-translate-y-1 transition-all duration-350 cursor-pointer flex gap-4 items-center"
          >
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl group-hover:scale-105 transition-transform">
              <Play size={20} />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-black text-white group-hover:text-emerald-400 transition-colors">
                {isEnglish ? "Quiz Mode" : "وضعية الكويز (Quiz Mode)"}
              </span>
              <span className="text-[10px] text-slate-400">
                {isEnglish ? "Instant feedback & explanations after every question." : "عرض الإجابة الصحيحة والتفسير مباشرة بعد كل سؤال."}
              </span>
            </div>
          </button>

          {/* Card 2: Practice Mode */}
          <button
            onClick={startPracticeMode}
            className="group relative p-5 bg-slate-900 border border-slate-800 rounded-2xl hover:border-violet-500/40 text-right hover:-translate-y-1 transition-all duration-350 cursor-pointer flex gap-4 items-center"
          >
            <div className="p-3 bg-violet-500/10 text-violet-400 rounded-xl group-hover:scale-105 transition-transform">
              <BookOpen size={20} />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-black text-white group-hover:text-violet-400 transition-colors">
                {isEnglish ? "Practice Mode" : "وضعية التدريب (Practice Mode)"}
              </span>
              <span className="text-[10px] text-slate-400">
                {isEnglish ? "Relaxed practice. Show explanations at any time." : "تدريب حر وغير محدود بالوقت. يمكنك كشف الحل في أي وقت."}
              </span>
            </div>
          </button>

          {/* Card 3: Timed Exam */}
          <button
            onClick={startTimedMode}
            className="group relative p-5 bg-slate-900 border border-slate-800 rounded-2xl hover:border-amber-500/40 text-right hover:-translate-y-1 transition-all duration-350 cursor-pointer flex gap-4 items-center"
          >
            <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl group-hover:scale-105 transition-transform">
              <Clock size={20} />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-black text-white group-hover:text-amber-400 transition-colors">
                {isEnglish ? "Timed Exam" : "اختبار بوقت (Timed Exam)"}
              </span>
              <span className="text-[10px] text-slate-400">
                {isEnglish ? "Strict time limit to simulate quick thinking." : "عداد تنازلي للتدرب على حل الأسئلة بسرعة وبشكل فوري."}
              </span>
            </div>
          </button>

          {/* Card 4: Exam Simulation */}
          <button
            onClick={startSimulationMode}
            className="group relative p-5 bg-slate-900 border border-slate-800 rounded-2xl hover:border-blue-500/40 text-right hover:-translate-y-1 transition-all duration-350 cursor-pointer flex gap-4 items-center"
          >
            <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl group-hover:scale-105 transition-transform">
              <Award size={20} />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-black text-white group-hover:text-blue-400 transition-colors">
                {isEnglish ? "Exam Simulation" : "محاكاة الامتحان الوزاري"}
              </span>
              <span className="text-[10px] text-slate-400">
                {isEnglish ? "Shuffled questions, strict timer, check answers at the end." : "أسئلة عشوائية، عداد صارم، وإظهار النتائج كاملة بالنهاية."}
              </span>
            </div>
          </button>
        </div>
      </div>
    );
  }

  // 2. Render Results Screen
  if (isFinished) {
    const totalQ = mode === "simulation" ? simQuestions.length : questions.length;
    const pct = (score / totalQ) * 100;
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center flex flex-col items-center justify-center max-w-lg mx-auto"
      >
        <Award size={56} className={`mb-4 ${pct >= 85 ? "text-emerald-500" : pct >= 60 ? "text-amber-500" : "text-red-500"}`} />
        <h3 className="text-xl font-black text-white mb-1">
          {isEnglish ? "Result Summary" : "ملخص النتيجة النهائية"}
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          {isEnglish ? `Mode: ${mode.toUpperCase()}` : `الوضعية: ${mode === "quiz" ? "كويز سريع" : mode === "practice" ? "تدريب حر" : mode === "timed" ? "اختبار بوقت" : "محاكاة الامتحان"}`}
        </p>

        <div className="text-3xl font-black text-emerald-400 mb-6 font-mono">
          {score} / {totalQ} ({Math.round(pct)}%)
        </div>

        <div className="flex gap-2 w-full">
          <button
            onClick={resetState}
            className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-all cursor-pointer flex justify-center items-center gap-1.5"
          >
            <RotateCcw size={14} />
            <span>{isEnglish ? "Try Again" : "إعادة المحاولة"}</span>
          </button>
          <button
            onClick={() => setMode("select")}
            className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
          >
            <span>{isEnglish ? "All Modes" : "العودة للوضعيات"}</span>
          </button>
        </div>

        {/* Detailed Simulation Review */}
        {mode === "simulation" && (
          <div className="mt-8 w-full border-t border-slate-800 pt-6 text-right">
            <h4 className="text-sm font-black text-white mb-4">مراجعة نموذج الإجابات:</h4>
            <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto pr-1">
              {simQuestions.map((q, idx) => {
                const studentAns = simAnswers[idx];
                const isCorrect = studentAns === q.answerIndex;
                return (
                  <div key={idx} className="p-3 bg-slate-950 border border-slate-850 rounded-xl flex flex-col gap-1.5">
                    <span className="text-[11px] font-bold text-slate-300">س{idx + 1}: {q.question}</span>
                    <div className="text-[10px] flex flex-col gap-1">
                      <span className={isCorrect ? "text-emerald-400" : "text-red-400"}>
                        إجابتك: {studentAns !== null ? q.options[studentAns] : "لم يتم الإجابة"} {isCorrect ? "✔️" : "❌"}
                      </span>
                      {!isCorrect && (
                        <span className="text-emerald-400">الإجابة النموذجية: {q.options[q.answerIndex]}</span>
                      )}
                      {q.explanation && (
                        <span className="text-slate-500 mt-1 block">التفسير: {q.explanation}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </motion.div>
    );
  }

  // Active question pointers
  const currentQ = mode === "simulation" ? simQuestions[currentIndex] : questions[currentIndex];
  const totalQ = mode === "simulation" ? simQuestions.length : questions.length;
  
  if (!currentQ) return null;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 relative overflow-hidden">
      
      {/* Top Details Header */}
      <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
          <span className="bg-slate-800 text-white px-2.5 py-1 rounded-lg">
            {isEnglish ? `Question ${currentIndex + 1} of ${totalQ}` : `السؤال ${currentIndex + 1} من ${totalQ}`}
          </span>
          <span className="bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded">
            {isEnglish ? mode.toUpperCase() : mode === "quiz" ? "كويز" : mode === "practice" ? "تدريب حر" : mode === "timed" ? "مؤقت" : "محاكاة"}
          </span>
        </div>

        {/* Timers */}
        {(mode === "timed" || mode === "simulation") && (
          <div className={`flex items-center gap-2 text-xs font-bold px-3 py-1 rounded-lg ${timeLeft < 20 ? "bg-red-500/10 text-red-500 animate-pulse" : "bg-slate-800 text-slate-300"}`}>
            <Clock size={14} />
            <span dir="ltr">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}</span>
          </div>
        )}

        <button
          onClick={() => setMode("select")}
          className="text-[10px] text-slate-400 hover:text-white underline cursor-pointer"
        >
          {isEnglish ? "Exit Mode" : "خروج من الوضعية"}
        </button>
      </div>

      {/* Question Text */}
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col gap-6"
      >
        <h3 className="text-sm sm:text-base font-black text-white leading-relaxed" dir="auto">
          {currentQ.question}
        </h3>

        {/* Options Grid */}
        <div className="flex flex-col gap-3">
          {currentQ.options.map((opt, idx) => {
            let btnClass = "bg-slate-950 border-slate-850 text-slate-300 hover:border-emerald-500/50";
            
            if (mode === "simulation") {
              const isSelected = simAnswers[currentIndex] === idx;
              btnClass = isSelected 
                ? "bg-blue-600/15 border-blue-500 text-blue-400" 
                : "bg-slate-950 border-slate-850 text-slate-300 hover:border-blue-500/30";
            } else {
              // Quiz, Practice, Timed
              if (showExplanation) {
                if (idx === currentQ.answerIndex) {
                  btnClass = "bg-emerald-500/10 border-emerald-500 text-emerald-400";
                } else if (idx === selectedAnswer) {
                  btnClass = "bg-red-500/10 border-red-500 text-red-400";
                } else {
                  btnClass = "bg-slate-950 border-slate-850/50 text-slate-600 opacity-55";
                }
              } else {
                if (idx === selectedAnswer) {
                  btnClass = "bg-emerald-600/20 border-emerald-500 text-white";
                }
              }
            }

            return (
              <button
                key={idx}
                onClick={() => {
                  if (mode === "simulation") {
                    handleSelectSimulation(idx);
                  } else {
                    if (mode === "practice") {
                      handleSelectPractice(idx);
                    } else if (mode === "quiz") {
                      handleSelectQuiz(idx);
                    } else if (mode === "timed") {
                      handleSelectTimed(idx);
                    }
                  }
                }}
                disabled={mode !== "simulation" && showExplanation}
                className={`w-full text-right px-5 py-3.5 border rounded-xl text-xs font-black transition-all flex justify-between items-center cursor-pointer ${btnClass}`}
                dir="auto"
              >
                <span>{opt}</span>
                {mode !== "simulation" && showExplanation && idx === currentQ.answerIndex && <CheckCircle2 size={16} />}
                {mode !== "simulation" && showExplanation && idx === selectedAnswer && idx !== currentQ.answerIndex && <XCircle size={16} />}
              </button>
            );
          })}
        </div>

        {/* Practice/Quiz explanation */}
        {mode !== "simulation" && showExplanation && currentQ.explanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl"
          >
            <span className="block text-[11px] font-bold text-blue-400 mb-1">
              {isEnglish ? "Explanation:" : "التوضيح العلمي والتفسير:"}
            </span>
            <p className="text-[11px] text-slate-300 leading-relaxed" dir="auto">
              {currentQ.explanation}
            </p>
          </motion.div>
        )}

        {/* Bottom Actions Bar */}
        <div className={`flex justify-between items-center mt-4 border-t border-slate-850 pt-4`}>
          {mode === "simulation" ? (
            <>
              <button
                onClick={handlePrevSimulation}
                disabled={currentIndex === 0}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                {isEnglish ? "Back" : "السابق"}
              </button>
              <button
                onClick={handleNextSimulation}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                {currentIndex < simQuestions.length - 1 ? (isEnglish ? "Next" : "التالي") : (isEnglish ? "Submit Exam" : "إنهاء وتسليم الامتحان")}
              </button>
            </>
          ) : (
            <>
              <div>
                {mode === "practice" && !showExplanation && (
                  <button
                    onClick={() => setShowExplanation(true)}
                    className="text-xs text-violet-400 hover:text-violet-300 underline cursor-pointer"
                  >
                    {isEnglish ? "Show Answer" : "إظهار الحل مباشرة 👁️"}
                  </button>
                )}
              </div>
              <button
                onClick={mode === "practice" ? handleNextPractice : mode === "quiz" ? handleNextQuiz : handleNextTimed}
                disabled={!showExplanation}
                className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  showExplanation ? "bg-emerald-600 hover:bg-emerald-500 text-white" : "bg-slate-800 text-slate-500 cursor-not-allowed"
                }`}
              >
                {currentIndex < questions.length - 1 ? (isEnglish ? "Next Question" : "السؤال التالي") : (isEnglish ? "Finish Review" : "إنهاء المراجعة")}
              </button>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};
