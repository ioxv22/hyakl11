"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { BookOpen, Search, ArrowLeft, MessageSquare, Award, Play, Download, Star, Compass, CheckCircle, Sparkles, GraduationCap } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { SUBJECTS } from "@/data/mockData";
import { PDFViewer } from "@/components/PDFViewer";

export default function HomePage() {
  const { studentName, setStudentName, progress, favorites, triggerDownload } = useApp();
  const [nameInput, setNameInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activePreview, setActivePreview] = useState<{ filename: string; title: string } | null>(null);
  
  // Grade Selection State ('10' | '11' | null)
  const [selectedGrade, setSelectedGrade] = useState<"10" | "11" | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Initialize selected grade from localStorage on mount to prevent SSR mismatch
  useEffect(() => {
    const savedGrade = localStorage.getItem("adv_selected_grade") as "10" | "11" | null;
    if (savedGrade === "10" || savedGrade === "11") {
      setSelectedGrade(savedGrade);
    }
    setIsMounted(true);
  }, []);

  const handleSelectGrade = (grade: "10" | "11") => {
    setSelectedGrade(grade);
    localStorage.setItem("adv_selected_grade", grade);
  };

  const handleSwitchGrade = () => {
    setSelectedGrade(null);
    localStorage.removeItem("adv_selected_grade");
  };

  // Filter subjects based on selected grade
  const gradeSubjects = useMemo(() => {
    if (!selectedGrade) return [];
    if (selectedGrade === "10") {
      return SUBJECTS.filter((s) => s.grade === 10);
    } else {
      // Grade 11 subjects (either explicitly 11 or undefined)
      return SUBJECTS.filter((s) => s.grade !== 10);
    }
  }, [selectedGrade]);

  // Filter lessons based on search query (scoped to selected grade)
  const searchResults = useMemo(() => {
    if (!searchQuery.trim() || !selectedGrade) return [];
    
    const results: any[] = [];
    gradeSubjects.forEach((subject) => {
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
  }, [searchQuery, gradeSubjects, selectedGrade]);

  // Handle registration name save
  const handleRegisterName = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) return;
    setStudentName(nameInput.trim());
  };

  // Get total progress percentage across scoped lessons
  const totalStats = useMemo(() => {
    if (!selectedGrade) return { totalLessons: 0, completedLessons: 0, percent: 0, totalFiles: 0 };
    
    let totalLessonsCount = 0;
    let completedLessonsCount = 0;
    let totalFilesCount = 0;

    gradeSubjects.forEach((sub) => {
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
  }, [progress, gradeSubjects, selectedGrade]);

  // Render recent 4 files (scoped to selected grade)
  const recentFiles = useMemo(() => {
    if (!selectedGrade) return [];
    
    const files: any[] = [];
    gradeSubjects.forEach((sub) => {
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
  }, [gradeSubjects, selectedGrade]);

  // Subject Stats (Lessons completed / Total lessons)
  const getSubjectProgress = (subId: string) => {
    const subject = gradeSubjects.find((s) => s.id === subId);
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

  if (!isMounted) {
    return null; // Prevent hydration flash
  }

  // ─── Render 1: Grade Selection Screen (أعلى درجات الفخامة) ───────────────
  if (!selectedGrade) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center p-4 text-center select-none dir-rtl animate-fade-in relative">
        
        {/* Glow Effects */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl w-full flex flex-col items-center gap-4">
          
          <div className="p-3.5 bg-emerald-500/10 text-emerald-500 rounded-3xl mb-1 animate-pulse border border-emerald-500/20">
            <GraduationCap size={44} />
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            بوابة المراجعة الذكية للثانوي المتقدم 🎓
          </h1>
          <p className="text-xs sm:text-base text-slate-400 max-w-xl leading-relaxed mb-8">
            أكاديمية حمد العبدولي تقدم التغطية الكاملة لهياكل ومراجعات الفصل الثالث لعام 2026. اختر صفك الدراسي لتجربة الكويزات وحل الامتحانات التفاعلية.
          </p>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
            
            {/* Grade 10 Card */}
            <button
              onClick={() => handleSelectGrade("10")}
              className="group relative text-right p-6 bg-slate-900/80 border border-slate-800 rounded-3xl hover:border-emerald-500/40 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-emerald-950/20 transition-all duration-300 flex flex-col justify-between h-72 cursor-pointer overflow-hidden backdrop-blur-md"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 group-hover:scale-150 rounded-full blur-2xl transition-transform duration-500" />
              
              <div className="flex flex-col gap-4 relative z-10 w-full">
                <div className="flex justify-between items-center w-full">
                  <span className="text-3xl p-2.5 bg-slate-950 border border-slate-800 rounded-2xl group-hover:rotate-6 transition-transform">
                    ✍️
                  </span>
                  <span className="text-[10px] bg-emerald-500/15 text-emerald-400 font-extrabold px-3 py-1 rounded-full border border-emerald-500/10">
                    جديد بالكامل ✨
                  </span>
                </div>
                <div className="flex flex-col gap-1 mt-2">
                  <h3 className="text-lg font-black text-white group-hover:text-emerald-400 transition-colors">الصف العاشر المتقدم</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    منصة المراجعة المتكاملة للصف العاشر. تشمل مناهج ريفيل وانسباير المحدثة 2026.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 relative z-10 w-full mt-4">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
                  <span className="w-1.5 h-1.5 bg-slate-500 rounded-full" />
                  <span>المواد: رياضيات، فيزياء، كيمياء، إنجليزي، إسلامية، عربي</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
                  <span className="w-1.5 h-1.5 bg-slate-500 rounded-full" />
                  <span>ملازم، كويزات، وتلخيص كامل لرواية الشيخ والبحر</span>
                </div>
                
                <div className="flex items-center justify-between text-xs font-black text-emerald-400 mt-2">
                  <span>ابدأ الدراسة الآن</span>
                  <ArrowLeft size={14} className="group-hover:-translate-x-1.5 transition-transform" />
                </div>
              </div>
            </button>

            {/* Grade 11 Card */}
            <button
              onClick={() => handleSelectGrade("11")}
              className="group relative text-right p-6 bg-slate-900/80 border border-slate-800 rounded-3xl hover:border-blue-500/40 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-blue-950/20 transition-all duration-300 flex flex-col justify-between h-72 cursor-pointer overflow-hidden backdrop-blur-md"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 group-hover:scale-150 rounded-full blur-2xl transition-transform duration-500" />
              
              <div className="flex flex-col gap-4 relative z-10 w-full">
                <div className="flex justify-between items-center w-full">
                  <span className="text-3xl p-2.5 bg-slate-950 border border-slate-800 rounded-2xl group-hover:rotate-6 transition-transform">
                    🧬
                  </span>
                  <span className="text-[10px] bg-blue-500/15 text-blue-400 font-extrabold px-3 py-1 rounded-full border border-blue-500/10">
                    نشط ومعتمد 🚀
                  </span>
                </div>
                <div className="flex flex-col gap-1 mt-2">
                  <h3 className="text-lg font-black text-white group-hover:text-blue-400 transition-colors">الصف الحادي عشر المتقدم</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    منصة المراجعة المتكاملة لـ ADV 11. تشمل مناهج مسار انسباير ومسار بريدج.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 relative z-10 w-full mt-4">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
                  <span className="w-1.5 h-1.5 bg-slate-500 rounded-full" />
                  <span>المواد: رياضيات، فيزياء، كيمياء، إحياء، إنجليزي، إسلامية</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
                  <span className="w-1.5 h-1.5 bg-slate-500 rounded-full" />
                  <span>مختبر تفاعلي متقدم وكويزات بالذكاء الاصطناعي</span>
                </div>
                
                <div className="flex items-center justify-between text-xs font-black text-blue-400 mt-2">
                  <span>ابدأ الدراسة الآن</span>
                  <ArrowLeft size={14} className="group-hover:-translate-x-1.5 transition-transform" />
                </div>
              </div>
            </button>

          </div>

          <p className="text-[10px] text-slate-600 mt-12">
            جميع الحقوق محفوظة © حمد العبدولي 2026 • قناة التلغرام الرسمية @Advvvv11
          </p>
          
        </div>
      </div>
    );
  }

  // ─── Render 2: Grade Scoped Dashboard (العرض بعد الاختيار) ─────────────────
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
              أهلاً بك يا بطل! منصتك الأولى للمراجعات الذكية للصف {selectedGrade === "10" ? "العاشر" : "الحادي عشر"} المتقدم للفصل الدراسي الثالث بدولة الإمارات 🇦🇪
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
          <div className="flex-1 flex flex-col gap-3 text-right w-full">
            
            <div className="flex items-center justify-between w-full flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1.5 border border-emerald-500/10 rounded-full w-fit">
                <SparklesIcon />
                <span className="text-[10px] sm:text-xs font-bold leading-none">مرحباً بك في بوابتك للدرجات الكاملة 🎓</span>
              </div>
              
              {/* Switch Grade Action Button */}
              <button
                onClick={handleSwitchGrade}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700 hover:border-emerald-500/30 rounded-xl text-[10px] font-black text-slate-700 dark:text-slate-200 transition-all cursor-pointer transform hover:scale-[1.02]"
              >
                <GraduationCap size={12} className="text-emerald-500" />
                <span>تغيير الصف الدراسي (الصف {selectedGrade === "10" ? "العاشر" : "الحادي عشر"})</span>
              </button>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
              أهلاً بك يا <span className="text-emerald-500 underline decoration-wavy decoration-2 underline-offset-4">{studentName || "طالبنا المميز"}</span> 👋
            </h1>

            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
              أفضل منصة مراجعات للصف {selectedGrade === "10" ? "العاشر المتقدم" : "الحادي عشر المتقدم ADV"} — هياكل، مراجعات، أسئلة وزارية، ملفات شرح، وفيديوهات منظمة بالكامل حسب الدروس للفصل الثالث 2026.
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
                placeholder="ابحث عن درس أو قانون أو ملف (مثال: الغازات، كثيرات الحدود، الرواية)..."
                className="w-full pl-4 pr-12 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-2xl focus:outline-none focus:border-emerald-500 dark:text-white text-xs sm:text-sm"
              />

              {/* Search Suggestions Dropdown */}
              {searchQuery.trim() && (
                <div className="absolute right-0 top-full mt-2 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden z-20 animate-slide-down">
                  {searchResults.length === 0 ? (
                    <div className="p-4 text-xs text-slate-400 text-center">لا توجد نتائج مطابقة لبحثك في هذا الصف.</div>
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
            {/* AI and Telegram Quick Actions */}
            <div className="flex flex-wrap gap-2.5 mt-3 justify-end w-full max-w-lg">
              <Link
                href="/ai-quiz"
                className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white text-xs font-black rounded-xl shadow-md shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all cursor-pointer animate-pulse"
              >
                <Sparkles size={12} />
                <span>كويز الهيكل بالذكاء الاصطناعي 🧠✨</span>
              </Link>
              <Link
                href="/telegram"
                className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-black rounded-xl shadow-md transition-all cursor-pointer"
              >
                <span>قناة التلغرام 📢</span>
              </Link>
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

      {/* ─── Render Scoped Grade 10 Dashboard ────────────────────────────────── */}
      {selectedGrade === "10" && (
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">مواد الصف العاشر المتقدم</h2>
            </div>
            <span className="text-[10px] text-slate-400 font-bold">اضغط على المادة للبدء بالمراجعة الفورية</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gradeSubjects.map((sub) => {
              const percent = getSubjectProgress(sub.id);
              return (
                <Link
                  key={sub.id}
                  href={`/subjects/${sub.id}`}
                  className="group relative bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-5 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/20 dark:hover:shadow-black/20 hover:border-emerald-500/20 dark:hover:border-emerald-500/20 transition-all duration-300 flex flex-col justify-between h-44 cursor-pointer overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 group-hover:scale-150 rounded-full blur-2xl transition-transform duration-500" />
                  
                  <div className="flex items-start justify-between relative z-10">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl p-2 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/60 rounded-xl group-hover:scale-105 transition-transform duration-300">
                        {sub.emoji}
                      </span>
                      <div className="flex flex-col text-right">
                        <span className="text-sm sm:text-base font-extrabold text-slate-800 dark:text-white">{sub.name}</span>
                        <span className="text-[10px] text-slate-400 font-bold">الصف 10 ADV - الفصل 3</span>
                      </div>
                    </div>
                  </div>

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
      )}

      {/* ─── Render Scoped Grade 11 Dashboard ────────────────────────────────── */}
      {selectedGrade === "11" && (
        <>
          {/* Grid of Inspire Subjects */}
          <section className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">مواد مسار انسباير (Inspire)</h2>
              </div>
              <span className="text-[10px] text-slate-400 font-bold">اضغط على المادة للبدء بالمراجعة الفورية</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gradeSubjects.filter(s => s.track !== "bridge").map((sub) => {
                const percent = getSubjectProgress(sub.id);
                return (
                  <Link
                    key={sub.id}
                    href={`/subjects/${sub.id}`}
                    className="group relative bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-5 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/20 dark:hover:shadow-black/20 hover:border-emerald-500/20 dark:hover:border-emerald-500/20 transition-all duration-300 flex flex-col justify-between h-44 cursor-pointer overflow-hidden"
                  >
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

          {/* Grid of Bridge Subjects */}
          <section className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-6 bg-blue-500 rounded-full" />
                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">مواد مسار بريدج (Bridge)</h2>
              </div>
              <span className="text-[10px] text-slate-400 font-bold">منهج العلوم التكميلي</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gradeSubjects.filter(s => s.track === "bridge").map((sub) => {
                const percent = getSubjectProgress(sub.id);
                return (
                  <Link
                    key={sub.id}
                    href={`/subjects/${sub.id}`}
                    className="group relative bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-5 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/20 dark:hover:shadow-black/20 hover:border-blue-500/20 dark:hover:border-blue-500/20 transition-all duration-300 flex flex-col justify-between h-44 cursor-pointer overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 group-hover:scale-150 rounded-full blur-2xl transition-transform duration-500" />
                    
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

                    <div className="flex flex-col gap-1.5 relative z-10 w-full">
                      <div className="flex justify-between items-center text-[10px] font-bold">
                        <span className="text-slate-400">الإنجاز</span>
                        <span className="text-blue-500">{percent}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-950 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 transition-all duration-300"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        </>
      )}

      {/* Grid: Recent PDF Files & Telegram banner */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Added Files list */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 rounded-3xl p-6 flex flex-col">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">آخر الملفات المضافة حديثاً 📂</h3>
            <span className="text-[9px] font-bold text-slate-400">تحميل ومعاينة حقيقية</span>
          </div>

          <div className="flex flex-col gap-3">
            {recentFiles.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-8">لا توجد ملفات مضافة حديثاً لهذا الصف.</p>
            ) : (
              recentFiles.map((file, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-slate-50 dark:bg-slate-950/40 border border-slate-150 dark:border-slate-900 rounded-2xl flex items-center justify-between gap-3 text-right hover:border-emerald-500/10 dark:hover:border-emerald-500/10 transition-colors"
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
                    <button
                      onClick={() => triggerDownload(file.path, file.name)}
                      className="p-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Download size={12} />
                    </button>
                  </div>
                </div>
              ))
            )}
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
