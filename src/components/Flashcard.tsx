"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Rotate3D } from "lucide-react";
import { Vocabulary, ImportantQuestion } from "@/data/mockData";

interface FlashcardProps {
  items: (Vocabulary | ImportantQuestion)[];
}

export const Flashcard: React.FC<FlashcardProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (!items || items.length === 0) {
    return <div className="text-center p-8 text-slate-500">لا توجد بطاقات متاحة.</div>;
  }

  const currentItem = items[currentIndex];
  
  // Determine if it's Vocabulary or ImportantQuestion
  const frontText = 'word' in currentItem ? currentItem.word : currentItem.question;
  const backText = 'word' in currentItem 
    ? `${currentItem.translation}\n\n${currentItem.explanation}` 
    : currentItem.answer;

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    }, 150);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
      <div className="text-sm font-bold text-slate-400 mb-6 flex items-center justify-between w-full px-4">
        <span>البطاقة {currentIndex + 1} من {items.length}</span>
        <span className="flex items-center gap-1 text-emerald-500"><Rotate3D size={16} /> انقر للقلب</span>
      </div>

      {/* Card Container */}
      <div className="relative w-full h-80 cursor-pointer perspective-1000 group" onClick={() => setIsFlipped(!isFlipped)}>
        <motion.div
          className="w-full h-full relative preserve-3d transition-all duration-500"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          {/* Front */}
          <div className="absolute inset-0 backface-hidden bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-xl group-hover:border-emerald-500/50 transition-colors">
            <span className="text-3xl font-black text-white leading-relaxed" dir="auto">{frontText}</span>
          </div>

          {/* Back */}
          <div className="absolute inset-0 backface-hidden bg-emerald-900/20 border border-emerald-500/30 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-xl" style={{ transform: "rotateY(180deg)" }}>
            <span className="text-xl font-bold text-emerald-50 whitespace-pre-wrap leading-relaxed" dir="auto">{backText}</span>
          </div>
        </motion.div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6 mt-8">
        <button onClick={handleNext} className="p-4 bg-slate-800 hover:bg-emerald-600 hover:text-white text-slate-400 rounded-full transition-all">
          <ChevronRight size={24} />
        </button>
        <button onClick={handlePrev} className="p-4 bg-slate-800 hover:bg-emerald-600 hover:text-white text-slate-400 rounded-full transition-all">
          <ChevronLeft size={24} />
        </button>
      </div>
    </div>
  );
};
