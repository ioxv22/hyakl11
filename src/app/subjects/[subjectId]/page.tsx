"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle,
  Play,
  FileText,
  HelpCircle,
  MessageSquare,
  Bookmark,
  ChevronLeft,
  Video,
  Award,
  BookMarked,
  Layers,
  Star,
  Check
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { SUBJECTS } from "@/data/mockData";
import { MCQQuiz } from "@/components/MCQQuiz";
import { Quiz } from "@/components/Quiz";
import { Flashcard } from "@/components/Flashcard";
import { CommentsSection } from "@/components/CommentsSection";
import { PDFViewer } from "@/components/PDFViewer";
import { PhysicsEquationBox } from "@/components/PhysicsEquationBox";

export default function SubjectPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const subjectId = params.subjectId as string;
  const initialLessonId = searchParams.get("lesson");

  const { progress, toggleProgress, favorites, toggleFavorite } = useApp();

  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"summary" | "formulas" | "files" | "mcq" | "revision" | "flashcards" | "comments">("files");
  const [activePreview, setActivePreview] = useState<{ filename: string; title: string } | null>(null);

  const [activeVideoIdx, setActiveVideoIdx] = useState<number>(0);
  const [isFullscreenVideo, setIsFullscreenVideo] = useState<boolean>(false);
  const [savedVideos, setSavedVideos] = useState<string[]>([]);
  const [videoToast, setVideoToast] = useState<string | null>(null);

  useEffect(() => {
    setActiveTab(subjectId === "math" ? "summary" : "files");
  }, [subjectId]);

  useEffect(() => {
    const saved = localStorage.getItem("adv_saved_videos");
    if (saved) setSavedVideos(JSON.parse(saved));
  }, []);

  useEffect(() => {
    setActiveVideoIdx(0);
  }, [activeLessonId]);

  const toggleSaveVideo = (vId: string) => {
    let updated: string[];
    let msg = "";
    if (savedVideos.includes(vId)) {
      updated = savedVideos.filter((id) => id !== vId);
      msg = "تم إزالة الفيديو من قائمة المراجعة لاحقاً.";
    } else {
      updated = [...savedVideos, vId];
      msg = "تم حفظ الفيديو للمراجعة لاحقاً! ⭐";
    }
    setSavedVideos(updated);
    localStorage.setItem("adv_saved_videos", JSON.stringify(updated));
    setVideoToast(msg);
    setTimeout(() => {
      setVideoToast(null);
    }, 3000);
  };

  // Fetch subject details
  const subject = useMemo(() => {
    return SUBJECTS.find((s) => s.id === subjectId);
  }, [subjectId]);

  // Flatten lessons list
  const allLessons = useMemo(() => {
    if (!subject) return [];
    const list: any[] = [];
    subject.chapters.forEach((chap) => {
      chap.lessons.forEach((les) => {
        list.push({ ...les, chapterId: chap.id, chapterTitle: chap.title });
      });
    });
    return list;
  }, [subject]);

  // Set initial active lesson
  useEffect(() => {
    if (allLessons.length > 0) {
      if (initialLessonId) {
        const found = allLessons.find((l) => l.id === initialLessonId);
        if (found) {
          setActiveLessonId(found.id);
          return;
        }
      }
      setActiveLessonId(allLessons[0].id);
    }
  }, [allLessons, initialLessonId]);

  if (!subject) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <ShieldAlertIcon />
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mt-4">المادة الدراسية غير موجودة</h2>
        <p className="text-xs text-slate-500 max-w-xs mt-2">يرجى العودة إلى الصفحة الرئيسية واختيار مادة صالحة.</p>
        <Link href="/" className="mt-6 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md transition-all">
          العودة للرئيسية
        </Link>
      </div>
    );
  }

  // Get active lesson details
  const activeLesson = allLessons.find((l) => l.id === activeLessonId);

  // Calculate subject progress percent
  const completedCount = allLessons.filter((l) => progress[l.id]).length;
  const progressPercent = allLessons.length > 0 ? Math.round((completedCount / allLessons.length) * 100) : 0;

  // Star Ratings Display helper
  const isFavorited = activeLesson?.pdfFile ? favorites.includes(activeLesson.pdfFile.path) : false;

  const isEnglish = subjectId === "english";

  return (
    <div className={`flex flex-col gap-6 ${isEnglish ? "font-sans text-left" : "font-cairo text-right"}`} dir={isEnglish ? "ltr" : "rtl"}>
      
      {/* Subject Header & Progress */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 rounded-3xl">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="p-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-emerald-500/10 dark:hover:bg-emerald-500/10 text-slate-700 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 rounded-2xl transition-all"
            title={isEnglish ? "Back to Home" : "الرجوع للرئيسية"}
          >
            {isEnglish ? <ArrowRight size={18} className="rotate-180" /> : <ArrowRight size={18} />}
          </Link>
          <div className={`flex flex-col ${isEnglish ? "text-left" : "text-right"}`}>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{subject.emoji}</span>
              <h1 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">{subject.name}</h1>
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
              {isEnglish ? "Grade 11 Advanced — Term 3 Review Hub" : "الصف الحادي عشر متقدم — مراجعة الفصل الثالث"}
            </p>
          </div>
        </div>

        {/* Progress Bar Widget */}
        <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-950/40 p-4 border border-slate-150 dark:border-slate-800 rounded-2xl w-full md:w-80">
          <div className="p-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl">
            <Award size={20} />
          </div>
          <div className={`flex-1 flex flex-col gap-1 ${isEnglish ? "text-left" : "text-right"}`}>
            <div className="flex justify-between items-center text-xs font-bold leading-none">
              <span className="text-slate-400">{isEnglish ? "Subject Progress" : "الإنجاز في المادة"}</span>
              <span className="text-emerald-500">{progressPercent}%</span>
            </div>
            <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-400 font-bold mt-0.5">
              {isEnglish 
                ? `Completed ${completedCount} of ${allLessons.length} lessons` 
                : `تم إنجاز ${completedCount} من ${allLessons.length} دروس`}
            </span>
          </div>
        </div>
      </div>

      {/* Main Study Desk Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Left Side (Sidebar on Desktop): Lesson list accordion */}
        <div className="lg:col-span-1 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 rounded-3xl p-5 flex flex-col gap-4 max-h-[80vh] overflow-y-auto">
          
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className={`text-xs font-bold text-slate-400 flex items-center gap-1.5 ${isEnglish ? "justify-start" : "justify-start"}`}>
              <Layers size={14} className="text-emerald-500" />
              <span>{isEnglish ? "Chapters & Lessons" : "أقسام المادة والدروس"}</span>
            </h3>
          </div>

          <div className={`flex flex-col gap-6 ${isEnglish ? "text-left" : "text-right"}`}>
            {subject.chapters.map((chap) => (
              <div key={chap.id} className="flex flex-col gap-2">
                {/* Chapter Title banner */}
                <h4 className={`text-[11px] font-black text-slate-500 dark:text-slate-400 leading-snug bg-slate-100/50 dark:bg-slate-950/40 px-3 py-1.5 rounded-lg ${isEnglish ? "border-l-2 border-emerald-500" : "border-r-2 border-emerald-500"}`}>
                  {chap.title}
                </h4>

                {/* Lessons belonging to chapter */}
                <div className="flex flex-col gap-1">
                  {chap.lessons.map((les) => {
                    const isCompleted = progress[les.id];
                    const isActive = activeLessonId === les.id;

                    return (
                      <div
                        key={les.id}
                        className={`group p-2.5 rounded-xl border flex items-center justify-between gap-2 transition-all cursor-pointer ${
                          isEnglish ? "flex-row text-left" : "flex-row-reverse text-right"
                        } ${
                          isActive
                            ? "bg-emerald-500/10 dark:bg-emerald-500/15 border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold"
                            : "bg-white dark:bg-slate-900 border-transparent hover:bg-slate-50 dark:hover:bg-slate-950/30 text-slate-600 dark:text-slate-400"
                        }`}
                      >
                        {/* Title click selection */}
                        <button
                          onClick={() => {
                            setActiveLessonId(les.id);
                            setActiveTab(subjectId === "math" ? "summary" : "files");
                          }}
                          className={`flex-1 flex items-center gap-2 text-xs font-bold cursor-pointer ${isEnglish ? "text-left flex-row" : "text-right flex-row-reverse"}`}
                        >
                          <ChevronLeft
                            size={12}
                            className={`transition-transform ${
                              isEnglish 
                                ? `rotate-180 group-hover:translate-x-0.5 ${isActive ? "text-emerald-500" : "text-slate-300 dark:text-slate-700"}` 
                                : `group-hover:-translate-x-0.5 ${isActive ? "text-emerald-500" : "text-slate-300 dark:text-slate-700"}`
                            }`}
                          />
                          <span className="line-clamp-1">{les.title}</span>
                        </button>

                        {/* Completion Checkbox */}
                        <button
                          onClick={() => toggleProgress(les.id)}
                          className={`p-1.5 rounded-lg border transition-all cursor-pointer flex items-center justify-center ${
                            isCompleted
                              ? "bg-emerald-500 border-emerald-500 text-white"
                              : "bg-slate-50 dark:bg-slate-950 border-slate-250 dark:border-slate-800 text-transparent hover:border-emerald-500/40"
                          }`}
                          title={isCompleted 
                            ? (isEnglish ? "Mark incomplete" : "تعليم كغير مكتمل") 
                            : (isEnglish ? "Mark complete" : "تعليم كمكتمل")}
                        >
                          <Check size={10} strokeWidth={4} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Chapter General Files Section if available (exams / structures) */}
          {subject.generalFiles && subject.generalFiles.length > 0 && (
            <div className="flex flex-col gap-2 border-t border-slate-100 dark:border-slate-800 pt-4">
              <h4 className="text-[11px] font-black text-slate-500 flex items-center gap-1">
                <BookMarked size={12} className="text-emerald-500" />
                <span>{isEnglish ? "Revision & Blueprint Files" : "ملفات المراجعة والهياكل العامة"}</span>
              </h4>
              <div className="flex flex-col gap-1.5">
                {subject.generalFiles.map((file, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 bg-slate-50 dark:bg-slate-950/20 border border-slate-150 dark:border-slate-800 rounded-xl flex items-center justify-between gap-2 hover:border-emerald-500/10 transition-colors ${
                      isEnglish ? "flex-row text-left" : "flex-row-reverse text-right"
                    }`}
                  >
                    <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 line-clamp-1 flex-1">
                      {file.name}
                    </span>
                    <div className="flex gap-1 shrink-0">
                      <button
                        onClick={() => setActivePreview({ filename: file.path, title: file.name })}
                        className="px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-750 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-[10px] font-bold cursor-pointer transition-all"
                        title={isEnglish ? "Preview" : "معاينة"}
                      >
                        {isEnglish ? "Preview" : "معاينة"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Side (Main Display Pane): Active lesson contents */}
        {activeLesson ? (
          <div className="lg:col-span-3 flex flex-col gap-6">
            
            {/* Academy Promo Banner for Chemistry */}
            {subjectId === "chemistry" && (
              <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-blue-500/10 border border-emerald-500/20 rounded-3xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 animate-pulse-slow">
                <div className="flex items-center gap-3 text-right">
                  <span className="p-3 bg-emerald-500/10 text-emerald-500 rounded-2xl text-xl">🌿</span>
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-slate-900 dark:text-white">شرح الكيمياء متوفر بالكامل على أكاديمية الحديقة!</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">سجل الآن وفعّل بطاقتك التعليمية لمشاهدة كافة الدروس والتلخيصات الحصرية.</span>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <a
                    href="https://www.youtube.com/watch?v=TdTQAx_K-kc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-[10px] font-black rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    فيديو تفعيل البطاقة 🎥
                  </a>
                  <a
                    href="https://www.thegardenacademy.net/Homepage"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-black rounded-xl shadow-md transition-colors"
                  >
                    زيارة الأكاديمية 🌿
                  </a>
                </div>
              </div>
            )}

            {/* Lesson Title & Video Bar */}
            <div className={`bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 rounded-3xl p-6 flex flex-col gap-4 ${isEnglish ? "text-left" : "text-right"}`}>
              <div className={`flex justify-between items-start gap-4 ${isEnglish ? "flex-row" : "flex-row-reverse"}`}>
                <div className="flex flex-col">
                  <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight">
                    {activeLesson.title}
                  </h2>
                  <p className="text-[10px] text-slate-400 font-bold mt-1">
                    {isEnglish ? "Grade 11 ADV Complete Curriculum" : "منهج الصف الحادي عشر ADV متكامل"}
                  </p>
                </div>

                {/* Bookmark/Favorite button */}
                {activeLesson.pdfFile && (
                  <button
                    onClick={() => toggleFavorite(activeLesson.pdfFile!.path)}
                    className={`p-2.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-center ${
                      isFavorited
                        ? "bg-amber-500 border-amber-500 text-white"
                        : "bg-slate-50 dark:bg-slate-950 border-slate-250 dark:border-slate-800 text-slate-400 hover:text-amber-500 hover:border-amber-500/30"
                    }`}
                    title={isFavorited 
                      ? (isEnglish ? "Remove from Favorites" : "إزالة من المفضلة") 
                      : (isEnglish ? "Add to Favorites" : "إضافة للمفضلة")}
                  >
                    <Bookmark size={16} className={isFavorited ? "fill-white" : ""} />
                  </button>
                )}
              </div>

              {/* YouTube Lectures Premium Tabbed Player */}
              {activeLesson.videoIds && activeLesson.videoIds.length > 0 && (
                <div className="flex flex-col gap-4 bg-slate-50 dark:bg-slate-950/40 p-5 border border-slate-150 dark:border-slate-800 rounded-3xl mt-2 relative overflow-hidden">
                  
                  {/* Video Toast */}
                  {videoToast && (
                    <div className={`absolute top-4 ${isEnglish ? "right-4" : "left-4"} z-20 px-4 py-2 bg-emerald-500 text-white text-xs font-black rounded-xl shadow-lg animate-bounce flex items-center gap-1.5`}>
                      <Check size={12} strokeWidth={4} />
                      <span>{videoToast}</span>
                    </div>
                  )}

                  {/* Header Title */}
                  <div className={`flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200/50 dark:border-slate-800/80 pb-3 mb-2 gap-2 ${isEnglish ? "flex-row text-left" : "flex-row-reverse text-right"}`}>
                    <div className={`flex items-center gap-2 text-xs font-black text-red-500 ${isEnglish ? "flex-row" : "flex-row-reverse"}`}>
                      <YoutubeIcon />
                      <span className="text-sm font-black">
                        {isEnglish 
                          ? "Lesson Explanation — YouTube 🎥" 
                          : (subjectId === "islamic" 
                              ? "شرح قناة نحو قمة المعرفة — YouTube 🎥" 
                              : (subjectId === "biology" 
                                  ? "شرح قناة BioScope — YouTube 🎥" 
                                  : (subjectId === "physics_bridge"
                                      ? "شرح أ. محمد شوقي — YouTube 🎥"
                                      : (subjectId === "biology_bridge"
                                          ? "شرح أستاذ أحياء وعلم بيئة — YouTube 🎥"
                                          : (subjectId === "chemistry_bridge" || subjectId === "chemistry"
                                              ? "شرح أ. محمد زيادة — YouTube 🎥"
                                              : "شرح أ. محمد زياد — YouTube 🎥")))))}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-bold">
                      {activeLesson.videoIds.length > 1 
                        ? (isEnglish ? `Multi-part Video (${activeLesson.videoIds.length} parts)` : `درس متعدد الأجزاء (${activeLesson.videoIds.length} أجزاء)`) 
                        : (isEnglish ? "Full Lesson Video" : "درس كامل")}
                    </span>
                  </div>

                  {/* Playlist Tabs bar (if multi-part) */}
                  {activeLesson.videoIds.length > 1 && (
                    <div className={`flex flex-wrap gap-2 mb-2 ${isEnglish ? "justify-start" : "justify-start"}`}>
                      {activeLesson.videoIds.map((vId: string, idx: number) => {
                        const isVideoActive = activeVideoIdx === idx;
                        const arabicOrdinals = ["الأول", "الثاني", "الثالث", "الرابع", "الخامس", "السادس", "السابع", "الثامن", "التاسع", "العاشر"];
                        const partName = arabicOrdinals[idx] || `الـ ${idx + 1}`;
                        return (
                          <button
                            key={idx}
                            onClick={() => setActiveVideoIdx(idx)}
                            className={`px-4 py-2 text-[10px] font-bold rounded-xl border transition-all cursor-pointer ${
                              isVideoActive
                                ? "bg-red-500 border-red-500 text-white shadow-md shadow-red-500/10"
                                : "bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50"
                            }`}
                          >
                            {isEnglish ? `Part ${idx + 1} 🎥` : `الجزء ${partName} 🎥`}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Active Iframe container */}
                  <div className="relative pt-[56.25%] w-full rounded-2xl overflow-hidden border border-slate-150 dark:border-slate-800 bg-black shadow-md">
                    <iframe
                      src={`https://www.youtube.com/embed/${activeLesson.videoIds[activeVideoIdx]}`}
                      className="absolute top-0 left-0 w-full h-full"
                      title={`${activeLesson.title} Part ${activeVideoIdx + 1}`}
                      allowFullScreen
                    />
                  </div>

                  {/* Video Actions Toolbar */}
                  <div className={`flex flex-wrap gap-3 mt-1 ${isEnglish ? "flex-row" : "flex-row"}`}>
                    
                    <button
                      onClick={() => setIsFullscreenVideo(true)}
                      className="flex-1 min-w-[120px] flex justify-center items-center gap-1.5 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm transition-all cursor-pointer"
                    >
                      <Maximize2Icon />
                      <span>{isEnglish ? "Fullscreen" : "مشاهدة كاملة"}</span>
                    </button>

                    <a
                      href={`https://www.youtube.com/watch?v=${activeLesson.videoIds[activeVideoIdx]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 min-w-[120px] flex justify-center items-center gap-1.5 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm transition-all cursor-pointer"
                    >
                      <ExternalLinkIcon />
                      <span>{isEnglish ? "YouTube" : "فتح في يوتيوب"}</span>
                    </a>

                    <button
                      onClick={() => toggleSaveVideo(activeLesson.videoIds[activeVideoIdx])}
                      className={`flex-1 min-w-[120px] flex justify-center items-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer border ${
                        savedVideos.includes(activeLesson.videoIds[activeVideoIdx])
                          ? "bg-emerald-500/10 border-emerald-500/15 text-emerald-500"
                          : "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white shadow-sm hover:bg-slate-200 dark:hover:bg-slate-700"
                      }`}
                    >
                      <Bookmark size={14} className={savedVideos.includes(activeLesson.videoIds[activeVideoIdx]) ? "fill-emerald-500" : ""} />
                      <span>
                        {savedVideos.includes(activeLesson.videoIds[activeVideoIdx])
                          ? (isEnglish ? "Saved for Review" : "محفوظ للمراجعة")
                          : (isEnglish ? "Save for Later" : "حفظ للمراجعة لاحقاً")}
                      </span>
                    </button>

                  </div>

                </div>
              )}
            </div>

            {/* Interactive Study Tabs Header */}
            <div className={`flex border-b border-slate-200 dark:border-slate-800 gap-1 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-1.5 rounded-2xl overflow-x-auto ${isEnglish ? "justify-start" : "justify-start"}`}>
              
              {subjectId === "math" && (
                <button
                  onClick={() => setActiveTab("summary")}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                    activeTab === "summary"
                      ? "bg-emerald-600 text-white"
                      : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-950"
                  }`}
                >
                  <BookOpen size={14} />
                  <span>{isEnglish ? "Summary" : "الشرح والتلخيص"}</span>
                </button>
              )}

              <button
                onClick={() => setActiveTab("files")}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "files"
                    ? "bg-emerald-600 text-white"
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-950"
                }`}
              >
                <FileText size={14} />
                <span>{isEnglish ? "Original PDFs" : "ملفات الـ PDF الأصلية"}</span>
              </button>

              {/* Formulas Tab (Only if lesson has formulas) */}
              {activeLesson?.formulas && activeLesson.formulas.length > 0 && (
                <button
                  onClick={() => setActiveTab("formulas")}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    activeTab === "formulas"
                      ? "bg-violet-500 text-white shadow-lg shadow-violet-500/30"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  <Layers size={16} />
                  <span>القوانين</span>
                </button>
              )}

              <button
                onClick={() => setActiveTab("mcq")}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "mcq"
                    ? "bg-emerald-600 text-white"
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-950"
                }`}
              >
                <HelpCircle size={14} />
                <span>{isEnglish ? "MCQ Quizzes" : "الاختبارات MCQ"}</span>
              </button>

              <button
                onClick={() => setActiveTab("revision")}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "revision"
                    ? "bg-emerald-600 text-white"
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-950"
                }`}
              >
                <Award size={14} />
                <span>{isEnglish ? "Key Questions" : "الأسئلة الهامة السريعة"}</span>
              </button>

              <button
                onClick={() => setActiveTab("flashcards")}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "flashcards"
                    ? "bg-emerald-600 text-white"
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-950"
                }`}
              >
                <Layers size={14} />
                <span>{isEnglish ? "Flashcards" : "البطاقات التعليمية (Flashcards)"}</span>
              </button>

              <button
                onClick={() => setActiveTab("comments")}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "comments"
                    ? "bg-emerald-600 text-white"
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-950"
                }`}
              >
                <MessageSquare size={14} />
                <span>{isEnglish ? "Comments" : "التعليقات والتقييمات"}</span>
              </button>

            </div>

            {/* Active Tab Panel Body */}
            <div className={`animate-fade-in ${isEnglish ? "text-left" : "text-right"}`}>
              
              {/* Tab 1: Detailed summaries, vocabularies, and formulas */}
              {activeTab === "summary" && (
                <div className="flex flex-col gap-6 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 rounded-3xl p-6">
                  
                  {/* Summary */}
                  <div className="flex flex-col gap-2">
                    <h3 className="text-sm font-black text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2 mb-1">
                      {isEnglish ? "Simplified Summary" : "ملخص شرح الدرس المبسط"}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                      {activeLesson.summary}
                    </p>
                  </div>

                  {/* Formulas (Calculations) if present */}
                  {activeLesson.formulas && activeLesson.formulas.length > 0 && (
                    <div className="flex flex-col gap-3">
                      <h3 className="text-sm font-black text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2 mb-1">
                        {isEnglish ? "Formulas & Calculations" : "جدول القوانين والحلول الرياضية (Formulas)"}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {activeLesson.formulas.map((form: any, idx: number) => (
                          <div
                            key={idx}
                            className="p-4 bg-slate-50 dark:bg-slate-950/40 border border-slate-150 dark:border-slate-800 rounded-2xl flex flex-col gap-1.5"
                          >
                            <span className="text-xs font-black text-slate-800 dark:text-white">{form.title}</span>
                            <div className="text-center bg-white dark:bg-slate-950 px-3 py-2 border border-slate-200/60 dark:border-slate-800/85 text-xs font-bold font-mono tracking-wider text-emerald-500 rounded-xl">
                              {form.expression}
                            </div>
                            <span className="text-[10px] text-slate-400 leading-relaxed">{form.explanation}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Vocabulary (English / translation terms) */}
                  {activeLesson.vocabulary && activeLesson.vocabulary.length > 0 && (
                    <div className="flex flex-col gap-3">
                      <h3 className="text-sm font-black text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2 mb-1">
                        {isEnglish ? "Vocabulary & Academic Terms" : "أهم المصطلحات والكلمات (Vocabulary)"}
                      </h3>
                      <div className="overflow-x-auto border border-slate-150 dark:border-slate-800 rounded-xl">
                        <table className={`w-full text-xs text-slate-600 dark:text-slate-400 ${isEnglish ? "text-left" : "text-right"}`}>
                          <thead className={`bg-slate-50 dark:bg-slate-950/40 font-bold text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-800 ${isEnglish ? "text-left" : "text-right"}`}>
                            <tr>
                              <th className="px-4 py-3">{isEnglish ? "Word" : "المصطلح بالإنجليزية"}</th>
                              <th className="px-4 py-3">{isEnglish ? "Translation / Meaning" : "الترجمة بالعربية"}</th>
                              <th className="px-4 py-3">{isEnglish ? "Definition / Context" : "الشرح والتعريف"}</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 dark:divide-slate-850">
                            {activeLesson.vocabulary.map((vocab: any, idx: number) => (
                              <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/10">
                                <td className="px-4 py-3 font-mono font-bold text-emerald-500">{vocab.word}</td>
                                <td className="px-4 py-3 font-bold text-slate-800 dark:text-slate-300">{vocab.translation}</td>
                                <td className="px-4 py-3 text-[10px] leading-relaxed">{vocab.explanation}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* Tab 2: PDFs previews and downloads */}
              {activeTab === "files" && (
                <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 rounded-3xl p-6 flex flex-col gap-6">
                  
                  <div className="border-b border-slate-100 dark:border-slate-800 pb-3 mb-1">
                    <h3 className="text-sm font-black text-slate-800 dark:text-white">
                      {isEnglish ? "Lesson Explanations & Exam Papers" : "ملفات الشرح والامتحانات الخاصة بالدرس"}
                    </h3>
                  </div>

                  <div className="flex flex-col gap-4">
                    {/* Primary Lesson PDF */}
                    {activeLesson.pdfFile ? (
                      <div className={`p-4 bg-slate-50 dark:bg-slate-950/40 border border-slate-150 dark:border-slate-800 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                        isEnglish ? "flex-row text-left" : "flex-row-reverse text-right"
                      }`}>
                        <div className={`flex items-center gap-3 ${isEnglish ? "flex-row text-left" : "flex-row-reverse text-right"}`}>
                          <span className="p-3 bg-red-500/10 text-red-500 rounded-xl">
                            <FileText size={20} />
                          </span>
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-slate-800 dark:text-white">{activeLesson.pdfFile.name}</span>
                            <span className="text-[9px] text-slate-400 font-bold mt-0.5">
                              {isEnglish 
                                ? `Real file size • ${activeLesson.pdfFile.views} views` 
                                : `حجم الملف حقيقي • ${activeLesson.pdfFile.views} مشاهدة`}
                            </span>
                          </div>
                        </div>
                        <div className={`flex gap-2 w-full md:w-auto ${isEnglish ? "flex-row" : "flex-row"}`}>
                          <button
                            onClick={() => setActivePreview({ filename: activeLesson.pdfFile!.path, title: activeLesson.pdfFile!.name })}
                            className="flex-1 md:flex-none px-4 py-2 border border-slate-250 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer bg-white dark:bg-slate-950"
                          >
                            {isEnglish ? "In-App Preview" : "معاينة مدمجة"}
                          </button>
                          <a
                            href={`/files/${activeLesson.pdfFile.path}`}
                            download={activeLesson.pdfFile.path}
                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer text-center"
                          >
                            {isEnglish ? "Download PDF" : "تحميل الملف"}
                          </a>
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400 text-center py-6 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                        {isEnglish 
                          ? "No primary PDF file available for this lesson currently." 
                          : "لا يوجد ملف PDF أساسي مدمج لهذا الدرس حالياً. يمكنك تصفح الشرح التفاعلي بالأعلى."}
                      </p>
                    )}

                    {/* Extra documents if available */}
                    {activeLesson.extraFiles && activeLesson.extraFiles.length > 0 && (
                      <div className="flex flex-col gap-3 mt-2">
                        <h4 className="text-xs font-black text-slate-500">
                          {isEnglish ? "Additional Files & Resources:" : "ملفات إضافية وتجميعات للدرس:"}
                        </h4>
                        {activeLesson.extraFiles.map((file: any, idx: number) => (
                          <div
                            key={idx}
                            className={`p-3 bg-slate-50/50 dark:bg-slate-950/20 border border-slate-150 dark:border-slate-800 rounded-xl flex items-center justify-between gap-4 text-xs font-semibold ${
                              isEnglish ? "flex-row text-left" : "flex-row-reverse text-right"
                            }`}
                          >
                            <span className="text-slate-700 dark:text-slate-300 line-clamp-1">{file.name}</span>
                            <div className="flex gap-2">
                              <button
                                onClick={() => setActivePreview({ filename: file.path, title: file.name })}
                                className="px-3 py-1 bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-emerald-500 rounded-lg text-[10px] font-bold cursor-pointer transition-all"
                              >
                                {isEnglish ? "Preview" : "معاينة"}
                              </button>
                              <a
                                href={`/files/${file.path}`}
                                download={file.path}
                                className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[10px] font-bold cursor-pointer text-center"
                              >
                                {isEnglish ? "Download" : "تحميل"}
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </div>
              )}

              {/* Formulas Tab */}
              {activeTab === "formulas" && (
                <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 rounded-3xl p-5 sm:p-8">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">المعادلات والقوانين الهامة</h3>
                  <PhysicsEquationBox formulas={activeLesson?.formulas || []} />
                </div>
              )}

              {/* Tab 3: Interactive MCQ Quiz */}
              {activeTab === "mcq" && (
                <Quiz questions={activeLesson.mcq || []} lessonId={activeLesson.id} />
              )}

              {/* Tab 4: Important Questions */}
              {activeTab === "revision" && (
                <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 rounded-3xl p-6 flex flex-col gap-6">
                  
                  <div className="border-b border-slate-100 dark:border-slate-800 pb-3 mb-1">
                    <h3 className="text-sm font-black text-slate-800 dark:text-white">
                      {isEnglish ? "Important Exam Questions (FAQ)" : "الأسئلة الوزارية الهامة المتكررة (Important Questions)"}
                    </h3>
                  </div>

                  {activeLesson.importantQuestions && activeLesson.importantQuestions.length > 0 ? (
                    <div className="flex flex-col gap-4">
                      {activeLesson.importantQuestions.map((q: any, idx: number) => (
                        <div
                          key={idx}
                          className="bg-slate-50 dark:bg-slate-950/40 border border-slate-150 dark:border-slate-800 rounded-2xl p-4 flex flex-col gap-3 text-right"
                        >
                          <div className={`flex items-start gap-2.5 ${isEnglish ? "flex-row text-left" : "flex-row-reverse text-right"}`}>
                            <span className="px-2 py-1 bg-emerald-500 text-white rounded-lg text-[10px] font-bold mt-0.5 shrink-0">
                              {isEnglish ? "Q" : "سؤال"}
                            </span>
                            <span className="text-xs font-black text-slate-900 dark:text-white">{q.question}</span>
                          </div>
                          
                          {/* Reveal Answer Section */}
                          <div className="border-t border-slate-200/40 dark:border-slate-800/60 pt-2">
                            <RevealAnswer answer={q.answer} isEnglish={subjectId !== "islamic"} />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 text-center py-6">
                      {isEnglish 
                        ? "No flashcard questions currently available. Please check the MCQs or PDF documents." 
                        : "لا توجد أسئلة سريعة مكتوبة حالياً. يمكنك مراجعة الـ MCQ والـ PDF المدمج للحصول على المزيد من الأسئلة."}
                    </p>
                  )}

                </div>
              )}

              {/* Tab: Flashcards */}
              {activeTab === "flashcards" && (
                <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 rounded-3xl p-6 flex flex-col gap-6">
                  <Flashcard items={[...(activeLesson.vocabulary || []), ...(activeLesson.importantQuestions || [])]} />
                </div>
              )}

              {/* Tab 5: Comments & Ratings */}
              {activeTab === "comments" && (
                <CommentsSection itemKey={activeLesson.id} />
              )}

            </div>

            {/* Big Complete Button */}
            <div className="mt-8 pt-6 border-t border-slate-200/50 dark:border-slate-800/80 flex justify-center">
              <button
                onClick={() => toggleProgress(activeLesson.id)}
                className={`px-8 py-4 rounded-2xl font-black text-sm flex items-center gap-3 transition-all shadow-lg cursor-pointer ${
                  progress[activeLesson.id]
                    ? "bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 border-2 border-emerald-500/30 hover:border-emerald-500/50 shadow-emerald-500/10"
                    : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20 hover:shadow-emerald-500/40"
                }`}
              >
                {progress[activeLesson.id] ? (
                  <>
                    <CheckCircle size={22} className="text-emerald-500" />
                    <span>{isEnglish ? "Lesson Completed" : "تم إنهاء محتوى هذا الدرس بنجاح"}</span>
                  </>
                ) : (
                  <>
                    <Check size={22} />
                    <span>{isEnglish ? "Mark Lesson as Complete" : "تحديد محتوى الدرس كـ 'مكتمل'"}</span>
                  </>
                )}
              </button>
            </div>

          </div>
        ) : (
          <div className="lg:col-span-3 text-center py-12 text-slate-400">
            {isEnglish ? "Loading lesson..." : "تحميل الدرس..."}
          </div>
        )}

      </div>

      {/* PDF View Modal Popup */}
      {activePreview && (
        <PDFViewer
          filename={activePreview.filename}
          title={activePreview.title}
          onClose={() => setActivePreview(null)}
        />
      )}

      {/* Fullscreen Video Modal Popup */}
      {isFullscreenVideo && activeLesson.videoIds && activeLesson.videoIds.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-fade-in">
          <div className="relative flex flex-col w-full h-[90vh] max-w-5xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
            {/* Header */}
            <div className={`flex items-center justify-between px-6 py-4 bg-slate-50 dark:bg-slate-950/40 border-b border-slate-100 dark:border-slate-800 ${isEnglish ? "flex-row text-left" : "flex-row-reverse text-right"}`}>
              <div className="flex flex-col">
                <span className="text-xs font-black text-red-500">
                  {isEnglish ? "Distraction-free Viewing 🎥" : "مشاهدة كاملة دون تشتيت 🎥"}
                </span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">{activeLesson.title}</h3>
              </div>
              <button
                onClick={() => setIsFullscreenVideo(false)}
                className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 bg-slate-100 dark:bg-slate-800 border border-slate-250 dark:border-slate-700 rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                {isEnglish ? "Close" : "إغلاق"}
              </button>
            </div>
            {/* Video Player */}
            <div className="flex-1 bg-black overflow-hidden relative">
              <iframe
                src={`https://www.youtube.com/embed/${activeLesson.videoIds[activeVideoIdx]}?autoplay=1`}
                className="w-full h-full border-0"
                title={activeLesson.title}
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// Interactive Reveal Answer Component
const RevealAnswer: React.FC<{ answer: string; isEnglish?: boolean }> = ({ answer, isEnglish = false }) => {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      {revealed ? (
        <div className={`p-3 bg-emerald-500/5 border border-emerald-500/10 text-emerald-800 dark:text-emerald-400 rounded-xl text-xs font-bold leading-relaxed animate-fade-in ${isEnglish ? "text-left" : "text-right"}`}>
          {answer}
        </div>
      ) : (
        <button
          onClick={() => setRevealed(true)}
          className={`px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold rounded-xl cursor-pointer transition-colors ${
            isEnglish ? "self-start" : "self-start"
          }`}
        >
          {isEnglish ? "Reveal Model Answer" : "إظهار الإجابة النموذجية"}
        </button>
      )}
    </div>
  );
};

// SVG Icon Helper
function ShieldAlertIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-red-500"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

// Inline Custom Youtube Icon Helper
const YoutubeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-red-500"
  >
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

// Inline Custom Maximize Icon Helper
const Maximize2Icon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15 3 21 3 21 9" />
    <polyline points="9 21 3 21 3 15" />
    <line x1="21" y1="3" x2="14" y2="10" />
    <line x1="3" y1="21" x2="10" y2="14" />
  </svg>
);

// Inline Custom External Link Icon Helper
const ExternalLinkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);
