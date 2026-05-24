"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Plus, Settings, Trash2, Video, FileText, CheckCircle2 } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { SUBJECTS } from "@/data/mockData";

export default function AdminPage() {
  const { customFiles, addCustomFile, studentName } = useApp();

  const [subjectInput, setSubjectInput] = useState("math");
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState<"شرح" | "مراجعة" | "امتحان" | "هيكل">("مراجعة");
  const [filePath, setFilePath] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmitFile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileName.trim() || !filePath.trim()) return;

    const newFile = {
      name: fileName.trim(),
      type: fileType,
      path: filePath.trim(),
      views: 0,
      dateAdded: new Date().toISOString().split("T")[0],
      subjectId: subjectInput,
    };

    addCustomFile(newFile);
    setSuccessMsg("تم إضافة الملف بنجاح! سيظهر الآن في الصفحة الرئيسية وصفحة المادة.");
    setFileName("");
    setFilePath("");

    setTimeout(() => {
      setSuccessMsg("");
    }, 4000);
  };

  const subjectNames: { [key: string]: string } = {
    math: "الرياضيات",
    physics: "الفيزياء",
    islamic: "التربية الإسلامية",
    english: "اللغة الإنجليزية",
    biology: "الأحياء",
    chemistry: "الكيمياء",
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Back button & title */}
      <div className="flex items-center gap-4 p-6 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 rounded-3xl text-right">
        <Link
          href="/"
          className="p-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-emerald-500/10 dark:hover:bg-emerald-500/10 text-slate-700 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 rounded-2xl transition-all"
        >
          <ArrowRight size={18} />
        </Link>
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/10 text-emerald-500 rounded-xl">
            <ShieldCheck size={22} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">لوحة تحكم المشرف 🔐</h1>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">لوحة الإدارة المخصصة لـ حمد العبدولي لإضافة المراجعات والفيديوهات</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Forms area */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* File Upload Simulator */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 rounded-3xl p-6 text-right flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="p-1.5 bg-emerald-500/10 text-emerald-500 rounded-lg">
                <FileText size={16} />
              </div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-white">إضافة ملف مراجعة أو هيكل جديد</h3>
            </div>

            {successMsg && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold rounded-xl flex items-center gap-2 animate-fade-in">
                <CheckCircle2 size={16} />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmitFile} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="flex flex-col text-right">
                  <label className="text-xs font-bold text-slate-400 mb-1">اختر المادة الدراسية:</label>
                  <select
                    value={subjectInput}
                    onChange={(e) => setSubjectInput(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500 text-xs sm:text-sm dark:text-white"
                  >
                    <option value="math">الرياضيات 📐</option>
                    <option value="physics">الفيزياء ⚡</option>
                    <option value="islamic">التربية الإسلامية 🕌</option>
                    <option value="english">إنجليزي 🇬🇧</option>
                    <option value="biology">الأحياء 🧬</option>
                    <option value="chemistry">الكيمياء 🧪</option>
                  </select>
                </div>

                <div className="flex flex-col text-right">
                  <label className="text-xs font-bold text-slate-400 mb-1">تصنيف نوع الملف:</label>
                  <select
                    value={fileType}
                    onChange={(e) => setFileType(e.target.value as any)}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500 text-xs sm:text-sm dark:text-white"
                  >
                    <option value="هيكل">هيكل وزاري</option>
                    <option value="شرح">ملخص شرح</option>
                    <option value="مراجعة">كتيب مراجعة</option>
                    <option value="امتحان">امتحان سابق</option>
                  </select>
                </div>

              </div>

              <div className="flex flex-col text-right">
                <label className="text-xs font-bold text-slate-400 mb-1">اسم الملف التعليمي (العنوان المعروض للطلاب):</label>
                <input
                  type="text"
                  required
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="مثال: مراجعة نهائية شاملة للمتجهات الحادي عشر..."
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500 text-xs sm:text-sm dark:text-white"
                />
              </div>

              <div className="flex flex-col text-right">
                <label className="text-xs font-bold text-slate-400 mb-1">اسم ملف الـ PDF (الاسم الدقيق للملف):</label>
                <input
                  type="text"
                  required
                  value={filePath}
                  onChange={(e) => setFilePath(e.target.value)}
                  placeholder="مثال: Rotational motion.pdf (يجب وضعه داخل مجلد public/files)"
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500 text-xs sm:text-sm dark:text-white font-mono"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex justify-center items-center gap-1.5 cursor-pointer mt-2"
              >
                <Plus size={14} />
                <span>إضافة الملف للمنصة فوراً</span>
              </button>
            </form>
          </div>

        </div>

        {/* Info panel */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 rounded-3xl p-5 text-right flex flex-col gap-4">
            <h3 className="text-xs font-bold text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center gap-1.5">
              <Settings size={14} className="text-emerald-500 animate-spin" />
              <span>إحصائيات الملفات المضافة</span>
            </h3>

            <div className="flex justify-between items-center text-xs font-semibold py-1.5 border-b border-slate-100 dark:border-slate-900">
              <span className="text-slate-400">إجمالي الملفات المرفوعة</span>
              <span className="text-slate-800 dark:text-white font-bold">{customFiles.length} ملفات</span>
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <span className="text-[10px] font-bold text-slate-400">آخر الملفات المضافة بواسطة لوحة التحكم:</span>
              {customFiles.length === 0 ? (
                <span className="text-[10px] text-slate-400 text-center py-4 bg-slate-50 dark:bg-slate-950/20 rounded-xl">
                  لم يتم إضافة أي ملفات بعد.
                </span>
              ) : (
                <div className="flex flex-col gap-1.5">
                  {customFiles.map((file, idx) => (
                    <div
                      key={idx}
                      className="p-2 bg-slate-50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-900 rounded-xl flex items-center justify-between text-right gap-2"
                    >
                      <div className="flex flex-col flex-1 gap-0.5">
                        <span className="text-[10px] font-bold text-slate-800 dark:text-white line-clamp-1">{file.name}</span>
                        <span className="text-[9px] text-slate-400">{subjectNames[file.subjectId]} • {file.type}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
