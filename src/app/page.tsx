"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { BookOpen, Search, ArrowLeft, MessageSquare, Award, Play, Download, Star, Compass, CheckCircle } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { SUBJECTS } from "@/data/mockData";
import { PDFViewer } from "@/components/PDFViewer";

export default function HomePage() {
  const { studentName, setStudentName, progress, favorites } = useApp();
  const [nameInput, setNameInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activePreview, setActivePreview] = useState<{ filename: string; title: string } | null>(null);

  // Filter lessons based on search query
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const results: any[] = [];
    SUBJECTS.forEach((subject) => {
      subject.chapters.forEach((chapter) => {
        chapter.lessons.forEach((lesson) => {
          if (
            lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lesson.summary.toLowerCase().includes(searchQuery.toLowerCase())
          ) {
            results.push({
              subjectId: subject.id,
              subjectName: subject.name,
              lessonId: lesson.id,
              title: lesson.title,
            });
          }
        });
      });
    });
    return results.slice(0, 5); // top 5 matches
  }, [searchQuery]);

  // Handle registration name save
  const handleRegisterName = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) return;
    setStudentName(nameInput.trim());
  };

  // Get total progress percentage across ALL lessons
  const totalStats = useMemo(() => {
    let totalLessonsCount = 0;
    let completedLessonsCount = 0;
    let totalFilesCount = 0;

    SUBJECTS.forEach((sub) => {
      totalFilesCount += (sub.generalFiles?.length || 0);
      sub.chapters.forEach((chap) => {
        totalLessonsCount += chap.lessons.length;
        chap.lessons.forEach((les) => {
          totalFilesCount += (les.pdfFile ? 1 : 0);
          totalFilesCount += (les.extraFiles?.length || 0);
          if (progress[les.id]) {
            completedLessonsCount++;
          }
        });
      });
    });

    const percent = totalLessonsCount > 0 ? Math.round((completedLessonsCount / totalLessonsCount) * 100) : 0;
    return {
      totalLessons: totalLessonsCount,
      completedLessons: completedLessonsCount,
      percent,
      totalFiles: totalFilesCount,
    };
  }, [progress]);

  // Render recent 4 files
  const recentFiles = useMemo(() => {
    const files: any[] = [];
    SUBJECTS.forEach((sub) => {
      if (sub.generalFiles) {
        sub.generalFiles.forEach((f) => {
          files.push({ ...f, subjectName: sub.name, subjectId: sub.id });
        });
      }
      sub.chapters.forEach((chap) => {
        chap.lessons.forEach((les) => {
          if (les.pdfFile) {
            files.push({ ...les.pdfFile, subjectName: sub.name, subjectId: sub.id });
          }
          if (les.extraFiles) {
            les.extraFiles.forEach((ef) => {
              files.push({ ...ef, subjectName: sub.name, subjectId: sub.id });
            });
          }
        });
      });
    });
    return files
      .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
      .slice(0, 4);
  }, []);

  // Subject Stats (Lessons completed / Total lessons)
  const getSubjectProgress = (subId: string) => {
    const subject = SUBJECTS.find((s) => s.id === subId);
    if (!subject) return 0;
    let total = 0;
    let done = 0;
    subject.chapters.forEach((c) => {
      c.lessons.forEach((l) => {
        total++;
        if (progress[l.id]) done++;
      });
    });
    return total > 0 ? Math.round((done / total) * 100) : 0;
  };

  return (
    <div className="relative">
      
      {/* Name Request Screen Modal if not set */}
      {!studentName && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 animate-fade-in">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center text-center">
            
            {/* Ambient Background Glows */}
            <div className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-emerald-500/20 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-[-50px] left-[-50px] w-40 h-40 bg-blue-500/20 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="p-4 bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-500 rounded-2xl mb-4">
              <Award size={36} className="animate-bounce" />
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-2 leading-tight">
              أكاديمية <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400 font-mono">ADVVVV11</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed max-w-sm">
              أهلاً بك يا بطل! منصتك الأولى للمراجعات الذكية للصف الحادي عشر المتقدم للفصل الدراسي الثالث بدولة الإمارات 🇦🇪
            </p>

            <form onSubmit={handleRegisterName} className="w-full flex flex-col gap-4">
              <div className="flex flex-col text-right">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 pr-1">اكتب اسمك للبدء:</label>
                <input
                  type="text"
                  required
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="مثال: حمد العبدولي..."
                  className="w-full px-5 py-3.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:border-emerald-500 dark:text-white transition-all text-center font-bold"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-2xl shadow-lg shadow-emerald-600/15 hover:shadow-emerald-500/25 transition-all cursor-pointer flex justify-center items-center gap-1.5"
              >
                <span>دخول الأكاديمية والبدء</span>
                <ArrowLeft size={16} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Main Dashboard Hero Section */}
      <section className="mb-10 p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 rounded-3xl relative overflow-hidden shadow-sm">
        
        {/* Glow Effects */}
        <div className="absolute top-[-100px] left-[-100px] w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-100px] right-[-100px] w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8 z-10">
          <div className="flex-1 flex flex-col gap-3 text-right">
            
            <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1.5 border border-emerald-500/10 rounded-full w-fit">
              <SparklesIcon />
              <span className="text-[10px] sm:text-xs font-bold leading-none">مرحباً بك في بوابتك للدرجات الكاملة 🎓</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
              أهلاً بك يا <span className="text-emerald-500 underline decoration-wavy decoration-2 underline-offset-4">{studentName || "طالبنا المميز"}</span> 👋
            </h1>

            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
              أفضل منصة مراجعات للصف الحادي عشر ADV — هياكل، مراجعات، أسئلة وزارية، ملفات شرح، وفيديوهات منظمة بالكامل حسب الدروس للفصل الثالث 2026.
            </p>

            {/* Smart Search Bar */}
            <div className="relative mt-3 w-full max-w-lg">
              <div className="absolute inset-y-0 right-4 flex items-center text-slate-400 pointer-events-none">
                <Search size={16} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن درس أو قانون أو ملف (مثال: الضرب النقطي، المتجهات)..."
                className="w-full pl-4 pr-12 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-2xl focus:outline-none focus:border-emerald-500 dark:text-white text-xs sm:text-sm"
              />

              {/* Search Suggestions Dropdown */}
              {searchQuery.trim() && (
                <div className="absolute right-0 top-full mt-2 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden z-20 animate-slide-down">
                  {searchResults.length === 0 ? (
                    <div className="p-4 text-xs text-slate-400 text-center">لا توجد نتائج مطابقة لبحثك.</div>
                  ) : (
                    <div className="flex flex-col">
                      {searchResults.map((res, idx) => (
                        <Link
                          key={idx}
                          href={`/subjects/${res.subjectId}?lesson=${res.lessonId}`}
                          className="px-4 py-3 border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-950/30 flex items-center justify-between text-right"
                        >
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-slate-800 dark:text-white">{res.title}</span>
                            <span className="text-[9px] text-slate-400">{res.subjectName}</span>
                          </div>
                          <ArrowLeft size={12} className="text-emerald-500" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>

          {/* Quick Statistics Widget Card */}
          <div className="w-full lg:w-72 bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 flex flex-col gap-4">
            <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-2 mb-1">
              مؤشرات المراجعة والتقدم
            </h3>

            {/* Circular or Bar Progress */}
            <div className="flex flex-col">
              <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                <span className="text-slate-400">إجمالي إنهاء المنهج</span>
                <span className="text-emerald-500">{totalStats.percent}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-500"
                  style={{ width: `${totalStats.percent}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-1">
              <div className="bg-white dark:bg-slate-950 p-3 border border-slate-200/40 dark:border-slate-800 rounded-xl flex flex-col items-center">
                <span className="text-base font-extrabold text-slate-900 dark:text-white">{totalStats.totalFiles}</span>
                <span className="text-[9px] text-slate-400 font-bold">ملف تعليمي</span>
              </div>
              <div className="bg-white dark:bg-slate-950 p-3 border border-slate-200/40 dark:border-slate-800 rounded-xl flex flex-col items-center">
                <span className="text-base font-extrabold text-slate-900 dark:text-white">
                  {totalStats.completedLessons} / {totalStats.totalLessons}
                </span>
                <span className="text-[9px] text-slate-400 font-bold">درس مكتمل</span>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* Grid of 6 Subjects */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">المواد الدراسية المتوفرة</h2>
          </div>
          <span className="text-[10px] text-slate-400 font-bold">اضغط على المادة للبدء بالمراجعة الفورية</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SUBJECTS.map((sub) => {
            const percent = getSubjectProgress(sub.id);
            return (
              <Link
                key={sub.id}
                href={`/subjects/${sub.id}`}
                className="group relative bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-5 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/20 dark:hover:shadow-black/20 hover:border-emerald-500/20 dark:hover:border-emerald-500/20 transition-all duration-300 flex flex-col justify-between h-44 cursor-pointer overflow-hidden"
              >
                {/* Visual Ambient glow on hover */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 group-hover:scale-150 rounded-full blur-2xl transition-transform duration-500" />
                
                <div className="flex items-start justify-between relative z-10">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl p-2 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/60 rounded-xl group-hover:scale-105 transition-transform duration-300">
                      {sub.emoji}
                    </span>
                    <div className="flex flex-col text-right">
                      <span className="text-sm sm:text-base font-extrabold text-slate-800 dark:text-white">{sub.name}</span>
                      <span className="text-[10px] text-slate-400 font-bold">الصف 11 ADV - الفصل 3</span>
                    </div>
                  </div>
                </div>

                {/* Progress bar inside card */}
                <div className="flex flex-col gap-1.5 relative z-10 w-full">
                  <div className="flex justify-between items-center text-[10px] font-bold">
                    <span className="text-slate-400">الإنجاز</span>
                    <span className="text-emerald-500">{percent}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-950 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 transition-all duration-300"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Grid: Recent PDF Files & Telegram banner */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Added Files list */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 rounded-3xl p-6 flex flex-col">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">آخر الملفات المضافة حديثاً 📂</h3>
            <span className="text-[9px] font-bold text-slate-400">تحميل ومعاينة حقيقية</span>
          </div>

          <div className="flex flex-col gap-3">
            {recentFiles.map((file, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-900 rounded-2xl flex items-center justify-between gap-3 text-right hover:border-emerald-500/10 dark:hover:border-emerald-500/10 transition-colors"
              >
                <div className="flex-1 flex flex-col gap-0.5">
                  <span className="text-xs font-bold text-slate-800 dark:text-white line-clamp-1">{file.name}</span>
                  <div className="flex items-center gap-2 text-[9px] text-slate-400">
                    <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.5 rounded font-bold">
                      {file.type}
                    </span>
                    <span>•</span>
                    <span>{file.subjectName}</span>
                    <span>•</span>
                    <span>{file.views} مشاهدة</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setActivePreview({ filename: file.path, title: file.name })}
                    className="p-2 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 hover:text-emerald-500 dark:hover:text-emerald-400 rounded-xl text-[10px] font-bold cursor-pointer flex items-center gap-1"
                  >
                    <span>معاينة</span>
                  </button>
                  <a
                    href={`/files/${file.path}`}
                    download={file.path}
                    className="p-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Download size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Telegram High-Conversion Joining Card */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-500 text-white rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden shadow-lg shadow-blue-500/15">
          {/* Subtle circle overlay */}
          <div className="absolute top-[-50px] left-[-50px] w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col gap-3 text-right">
            <div className="p-3 bg-white/10 w-fit rounded-2xl mb-1 text-white">
              <MessageSquare size={24} />
            </div>
            <h3 className="text-base sm:text-lg font-black leading-tight">قناة التلغرام الرسمية 📢</h3>
            <p className="text-xs text-blue-100 leading-relaxed">
              انضم لأكثر من 5,000 طالب متقدم للحصول على الهياكل المحلولة، التجميعات الحصرية، النماذج المتوقعة، والتنبيهات المباشرة فور صدورها!
            </p>
          </div>

          <div className="flex flex-col gap-2 mt-6">
            <div className="text-center bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 text-[10px] font-bold tracking-wider font-mono">
              @Advvvv11
            </div>
            <a
              href="https://t.me/Advvvv11"
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 bg-white hover:bg-slate-100 text-blue-600 text-xs font-black rounded-xl text-center shadow-lg transition-all flex justify-center items-center gap-1.5 cursor-pointer"
            >
              <span>انضم الآن للقناة مجاناً</span>
              <ArrowLeft size={14} />
            </a>
          </div>
        </div>

      </section>

      {/* PDF View Modal */}
      {activePreview && (
        <PDFViewer
          filename={activePreview.filename}
          title={activePreview.title}
          onClose={() => setActivePreview(null)}
        />
      )}

    </div>
  );
}

// Simple Icon Helpers
function SparklesIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-sparkles"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5.5z" />
      <path d="m19 17 1 2.5 2.5.5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1z" />
    </svg>
  );
}
