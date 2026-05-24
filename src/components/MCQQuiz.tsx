"use client";

import React, { useState } from "react";
import { Check, X, Award, RotateCcw, AlertCircle } from "lucide-react";
import confetti from "canvas-confetti";

interface MCQ {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

interface MCQQuizProps {
  questions: MCQ[];
  lessonId: string;
  isEnglish?: boolean;
}

export const MCQQuiz: React.FC<MCQQuizProps> = ({ questions, lessonId, isEnglish = false }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  if (!questions || questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl text-center">
        <AlertCircle size={28} className="text-slate-400 mb-2 animate-pulse" />
        <p className="text-sm font-medium text-slate-500">
          {isEnglish ? "No MCQ questions available for this lesson currently." : "لا توجد أسئلة MCQ متاحة لهذا الدرس حالياً."}
        </p>
      </div>
    );
  }

  const currentQuestion = questions[currentIdx];

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOpt(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentQuestion.answerIndex;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
      // Trigger confetti if score is high!
      if (score + (selectedOpt === currentQuestion.answerIndex ? 1 : 0) >= questions.length * 0.7) {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#10B981", "#3B82F6", "#F59E0B"],
        });
      }
    }
  };

  const resetQuiz = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  const finalScore = score;

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-900/60 border border-slate-150 dark:border-slate-800/80 rounded-2xl p-6 transition-all duration-300">
      {!quizFinished ? (
        <div className="flex flex-col">
          {/* Top Progress bar */}
          <div className={`flex justify-between items-center mb-4 ${isEnglish ? "flex-row" : "flex-row-reverse"}`}>
            <span className="text-xs font-bold text-slate-500">
              {isEnglish ? `Question ${currentIdx + 1} of ${questions.length}` : `السؤال ${currentIdx + 1} من ${questions.length}`}
            </span>
            <div className="w-32 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Text */}
          <h4 className={`text-base font-bold text-slate-900 dark:text-white mb-6 leading-relaxed ${isEnglish ? "text-left" : "text-right"}`}>
            {currentQuestion.question}
          </h4>

          {/* Options Grid */}
          <div className="flex flex-col gap-3 mb-6">
            {currentQuestion.options.map((option, idx) => {
              let optStyle = "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-800 dark:text-slate-200";
              if (isAnswered) {
                if (idx === currentQuestion.answerIndex) {
                  optStyle = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300 font-bold";
                } else if (selectedOpt === idx) {
                  optStyle = "border-red-500 bg-red-50 dark:bg-red-950/20 text-red-800 dark:text-red-300";
                } else {
                  optStyle = "border-slate-100 dark:border-slate-900 opacity-60 bg-white dark:bg-slate-950";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={isAnswered}
                  className={`flex items-center justify-between px-5 py-4 border text-sm font-semibold rounded-xl transition-all cursor-pointer ${
                    isEnglish ? "text-left flex-row" : "text-right flex-row-reverse"
                  } ${optStyle}`}
                >
                  <span className="flex-1">{option}</span>
                  {isAnswered && idx === currentQuestion.answerIndex && (
                    <span className={`p-1 bg-emerald-500 text-white rounded-full ${isEnglish ? "ml-2" : "mr-2"}`}>
                      <Check size={12} />
                    </span>
                  )}
                  {isAnswered && selectedOpt === idx && idx !== currentQuestion.answerIndex && (
                    <span className={`p-1 bg-red-500 text-white rounded-full ${isEnglish ? "ml-2" : "mr-2"}`}>
                      <X size={12} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Answer Explanation */}
          {isAnswered && (
            <div className={`mb-6 p-4 bg-emerald-50/50 dark:bg-slate-950/30 border border-emerald-100/50 dark:border-slate-800 rounded-xl animate-fade-in ${isEnglish ? "text-left" : "text-right"}`}>
              <div className={`flex gap-2 items-start ${isEnglish ? "flex-row" : "flex-row-reverse"}`}>
                <div className="p-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg shrink-0">
                  <AlertCircle size={16} />
                </div>
                <div className="flex-1">
                  <h5 className="text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-1">
                    {isEnglish ? "Explanation:" : "تفسير الإجابة:"}
                  </h5>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    {currentQuestion.explanation}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Next Button */}
          {isAnswered && (
            <button
              onClick={handleNext}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-emerald-600/10 hover:shadow-emerald-500/20 transition-all cursor-pointer flex justify-center items-center gap-1.5"
            >
              <span>
                {currentIdx === questions.length - 1
                  ? (isEnglish ? "Finish Quiz & View Results" : "إنهاء الاختبار وعرض النتيجة")
                  : (isEnglish ? "Next Question" : "السؤال التالي")}
              </span>
            </button>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-6 animate-fade-in">
          <div className="p-4 bg-emerald-100 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 rounded-full mb-4">
            <Award size={48} />
          </div>
          <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            {isEnglish ? "Well done! You have completed the quiz" : "أحسنت! لقد أكملت الاختبار"}
          </h4>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 max-w-sm">
            {isEnglish ? "Your lesson review score:" : "نتيجة مراجعتك للدرس:"}
          </p>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white mb-6">
            <span className="text-emerald-500">{finalScore}</span> / {questions.length}
          </div>

          <div className="flex gap-3 w-full max-w-xs justify-center">
            <button
              onClick={resetQuiz}
              className="flex-1 flex justify-center items-center gap-1.5 py-3 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors cursor-pointer bg-white dark:bg-slate-950"
            >
              <RotateCcw size={14} />
              <span>{isEnglish ? "Retake Quiz" : "إعادة الاختبار"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
