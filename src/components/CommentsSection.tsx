"use client";

import React, { useState } from "react";
import { Star, MessageSquare, Send } from "lucide-react";
import { useApp } from "@/context/AppContext";

interface CommentsSectionProps {
  itemKey: string; // unique key for this file/lesson
}

export const CommentsSection: React.FC<CommentsSectionProps> = ({ itemKey }) => {
  const { studentName, comments, addComment } = useApp();
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const itemComments = comments[itemKey] || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    addComment(itemKey, text, rating);
    setText("");
    setRating(5);
  };

  const getAverageRating = () => {
    if (itemComments.length === 0) return 0;
    const sum = itemComments.reduce((acc, c) => acc + c.rating, 0);
    return (sum / itemComments.length).toFixed(1);
  };

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-6 transition-all duration-300">
      
      {/* Average score & title */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg">
            <MessageSquare size={18} />
          </div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">التعليقات والتقييمات ({itemComments.length})</h4>
        </div>
        {itemComments.length > 0 && (
          <div className="flex items-center gap-1 bg-white dark:bg-slate-950 px-3 py-1 border border-slate-200/50 dark:border-slate-800 rounded-full">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{getAverageRating()}</span>
            <Star size={12} className="fill-amber-400 text-amber-400" />
            <span className="text-[10px] text-slate-400">تقييم عام</span>
          </div>
        )}
      </div>

      {/* Review Form */}
      <form onSubmit={handleSubmit} className="mb-6 bg-white dark:bg-slate-950/60 p-4 border border-slate-200/60 dark:border-slate-800 rounded-xl">
        <p className="text-xs text-slate-500 mb-2">تقييمك وملاحظتك تساعد الطلاب الآخرين في العثور على أفضل الملفات!</p>
        
        {/* Star rating selector */}
        <div className="flex items-center gap-1 mb-3">
          <span className="text-xs text-slate-400 ml-2">تقييمك للملف:</span>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(null)}
              className="p-0.5 text-slate-300 hover:text-amber-400 transition-colors cursor-pointer"
            >
              <Star
                size={18}
                className={`${
                  (hoverRating !== null ? star <= hoverRating : star <= rating)
                    ? "fill-amber-400 text-amber-400"
                    : ""
                }`}
              />
            </button>
          ))}
        </div>

        {/* Textbox input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={
              studentName
                ? `اكتب تعليقك يا ${studentName}...`
                : "يرجى كتابة اسمك في الصفحة الرئيسية للتعليق..."
            }
            disabled={!studentName}
            className="flex-1 px-4 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500 dark:text-white"
          />
          <button
            type="submit"
            disabled={!text.trim() || !studentName}
            className="p-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl transition-all cursor-pointer flex items-center justify-center"
          >
            <Send size={14} className="rotate-180" />
          </button>
        </div>
      </form>

      {/* Reviews List */}
      <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto pr-1">
        {itemComments.length === 0 ? (
          <div className="text-center py-6 text-slate-400 text-xs">
            لا توجد تعليقات بعد. كن أول من يعلق ويقيم هذا الملف!
          </div>
        ) : (
          itemComments.map((comment) => (
            <div
              key={comment.id}
              className="p-3.5 bg-white dark:bg-slate-950/40 border border-slate-100 dark:border-slate-900 rounded-xl"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold flex items-center justify-center">
                    {comment.studentName.slice(0, 2)}
                  </div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{comment.studentName}</span>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={10}
                      className={`${star <= comment.rating ? "fill-amber-400 text-amber-400" : "text-slate-200 dark:text-slate-800"}`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pr-1">{comment.text}</p>
              <div className="text-right mt-1.5">
                <span className="text-[9px] text-slate-400">{comment.date}</span>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
