"use client";

import React, { useState } from "react";
import { UploadCloud, FileText, ScanText, CheckCircle2, Loader2 } from "lucide-react";

export const OCRUploader: React.FC = () => {
  const [isExtracting, setIsExtracting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsExtracting(true);
      setSuccess(false);

      // Simulate OCR processing time
      setTimeout(() => {
        setIsExtracting(false);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 5000);
      }, 4000);
    }
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl text-center">
      <div className="flex justify-center mb-6">
        <div className="p-4 bg-violet-500/10 text-violet-500 rounded-2xl">
          <ScanText size={40} />
        </div>
      </div>
      <h3 className="text-xl font-black text-white mb-2">استخراج النصوص الذكي (OCR)</h3>
      <p className="text-sm text-slate-400 mb-8 max-w-md mx-auto">
        قم برفع ملف PDF ليتم تحليله باستخدام Tesseract / Google Vision واستخراج الأسئلة والفلاش كاردز تلقائياً وإضافتها للمنصة.
      </p>

      {isExtracting ? (
        <div className="flex flex-col items-center gap-4 py-8">
          <Loader2 size={32} className="text-violet-500 animate-spin" />
          <span className="text-sm font-bold text-violet-400">جاري تحليل الملف واستخراج البيانات...</span>
        </div>
      ) : success ? (
        <div className="flex flex-col items-center gap-4 py-8">
          <CheckCircle2 size={48} className="text-emerald-500" />
          <span className="text-lg font-bold text-emerald-400">تم الاستخراج بنجاح!</span>
          <span className="text-xs text-slate-400">تمت إضافة الأسئلة والمحتوى إلى قاعدة البيانات.</span>
        </div>
      ) : (
        <label className="relative flex flex-col items-center justify-center w-full h-40 border-2 border-slate-700 border-dashed rounded-2xl hover:border-violet-500 hover:bg-violet-500/5 transition-all cursor-pointer group">
          <UploadCloud size={32} className="text-slate-500 group-hover:text-violet-500 mb-3 transition-colors" />
          <span className="text-sm font-bold text-slate-300 group-hover:text-violet-400 transition-colors">
            اضغط لاختيار ملف PDF
          </span>
          <input type="file" accept=".pdf" className="hidden" onChange={handleUpload} />
        </label>
      )}
    </div>
  );
};
