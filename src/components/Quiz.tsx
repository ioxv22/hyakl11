"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Clock, RotateCcw, Award } from "lucide-react";
import { MCQ } from "@/data/mockData";

interface QuizProps {
  questions: MCQ[];
  lessonId: string;
}

export const Quiz: React.FC<QuizProps> = ({ questions, lessonId }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(questions.length * 60); // 1 minute per question

  useEffect(() => {
    if (isFinished || timeLeft <= 0) {
      if (timeLeft <= 0 && !isFinished) setIsFinished(true);
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isFinished]);

  const handleSelect = (index: number) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
    if (index === questions[currentIndex].answerIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((c) => c + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setIsFinished(true);
      // Save progress
      const progress = JSON.parse(localStorage.getItem("adv_progress") || "{}");
      progress[`quiz_${lessonId}`] = { score, total: questions.length, date: new Date().toISOString() };
      localStorage.setItem("adv_progress", JSON.stringify(progress));
    }
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setIsFinished(false);
    setTimeLeft(questions.length * 60);
  };

  if (questions.length === 0) {
    return <div className="text-center p-8 text-slate-500">لا توجد أسئلة متوفرة حالياً.</div>;
  }

  if (isFinished) {
    const percentage = (score / questions.length) * 100;
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center"
      >
        <Award size={64} className={`mx-auto mb-4 ${percentage >= 80 ? "text-emerald-500" : percentage >= 50 ? "text-amber-500" : "text-red-500"}`} />
        <h3 className="text-2xl font-black text-white mb-2">النتيجة النهائية</h3>
        <p className="text-4xl font-black text-emerald-400 mb-6">{score} / {questions.length}</p>
        <button
          onClick={restartQuiz}
          className="flex items-center gap-2 mx-auto px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-all"
        >
          <RotateCcw size={18} />
          <span>إعادة الاختبار</span>
        </button>
      </motion.div>
    );
  }

  const currentQ = questions[currentIndex];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2 text-slate-400 font-bold">
          <span className="bg-slate-800 text-white px-3 py-1 rounded-lg">السؤال {currentIndex + 1} من {questions.length}</span>
        </div>
        <div className={`flex items-center gap-2 font-bold px-3 py-1 rounded-lg ${timeLeft < 60 ? "bg-red-500/10 text-red-500" : "bg-slate-800 text-slate-300"}`}>
          <Clock size={16} />
          <span dir="ltr">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}</span>
        </div>
      </div>

      {/* Question */}
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
      >
        <h3 className="text-xl font-bold text-white mb-6 leading-relaxed" dir="auto">{currentQ.question}</h3>
        
        <div className="flex flex-col gap-3 mb-8">
          {currentQ.options.map((opt, idx) => {
            let btnClass = "bg-slate-950 border-slate-800 text-slate-300 hover:border-emerald-500";
            if (showExplanation) {
              if (idx === currentQ.answerIndex) {
                btnClass = "bg-emerald-500/10 border-emerald-500 text-emerald-400";
              } else if (idx === selectedAnswer) {
                btnClass = "bg-red-500/10 border-red-500 text-red-400";
              } else {
                btnClass = "bg-slate-950 border-slate-800 text-slate-600 opacity-50";
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={showExplanation}
                className={`w-full text-right px-6 py-4 border rounded-xl font-bold transition-all flex justify-between items-center ${btnClass}`}
                dir="auto"
              >
                <span>{opt}</span>
                {showExplanation && idx === currentQ.answerIndex && <CheckCircle2 size={20} />}
                {showExplanation && idx === selectedAnswer && idx !== currentQ.answerIndex && <XCircle size={20} />}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        <AnimatePresence>
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-8"
            >
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                <span className="block text-sm font-bold text-blue-400 mb-2">التفسير:</span>
                <p className="text-sm text-slate-300 leading-relaxed" dir="auto">{currentQ.explanation}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-end">
          <button
            onClick={handleNext}
            disabled={!showExplanation}
            className={`px-8 py-3 rounded-xl font-bold transition-all ${
              showExplanation ? "bg-emerald-600 hover:bg-emerald-500 text-white" : "bg-slate-800 text-slate-500 cursor-not-allowed"
            }`}
          >
            {currentIndex < questions.length - 1 ? "السؤال التالي" : "إنهاء الاختبار"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
