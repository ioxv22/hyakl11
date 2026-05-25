"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import confetti from "canvas-confetti";

interface Comment {
  id: string;
  studentName: string;
  text: string;
  rating: number;
  date: string;
}

interface AppContextType {
  studentName: string | null;
  setStudentName: (name: string | null) => void;
  progress: { [lessonId: string]: boolean };
  toggleProgress: (lessonId: string) => void;
  favorites: string[]; // paths of favorited files
  toggleFavorite: (path: string) => void;
  isFavorite: (path: string) => boolean;
  comments: { [key: string]: Comment[] };
  addComment: (key: string, text: string, rating: number) => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
  customFiles: any[];
  addCustomFile: (file: any) => void;
  triggerDownload: (filePath: string, fileName: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [studentName, setStudentNameState] = useState<string | null>(null);
  const [progress, setProgress] = useState<{ [lessonId: string]: boolean }>({});
  const [favorites, setFavorites] = useState<string[]>([]);
  const [comments, setComments] = useState<{ [key: string]: Comment[] }>({});
  const [customFiles, setCustomFiles] = useState<any[]>([]);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  // Secured download state
  const [downloadInfo, setDownloadInfo] = useState<{ filePath: string; fileName: string } | null>(null);
  const [downloadProgress, setDownloadProgress] = useState(0);

  useEffect(() => {
    // Load from LocalStorage
    const storedName = localStorage.getItem("adv_student_name");
    const storedProgress = localStorage.getItem("adv_progress");
    const storedFavorites = localStorage.getItem("adv_favorites");
    const storedComments = localStorage.getItem("adv_comments");
    const storedCustomFiles = localStorage.getItem("adv_custom_files");
    const storedTheme = localStorage.getItem("adv_theme");

    if (storedName) setStudentNameState(storedName);
    if (storedProgress) setProgress(JSON.parse(storedProgress));
    if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
    if (storedComments) setComments(JSON.parse(storedComments));
    if (storedCustomFiles) setCustomFiles(JSON.parse(storedCustomFiles));
    if (storedTheme) {
      setTheme(storedTheme as "light" | "dark");
    } else {
      setTheme("dark");
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme, mounted]);

  // Handle download progress simulation
  useEffect(() => {
    if (!downloadInfo) return;

    let timer: NodeJS.Timeout;
    if (downloadProgress < 100) {
      timer = setTimeout(() => {
        setDownloadProgress((prev) => Math.min(prev + 5, 100));
      }, 70); // total ~1.4 seconds
    } else {
      // Trigger actual download once complete
      const link = document.createElement("a");
      link.href = `/files/${downloadInfo.filePath}`;
      link.download = downloadInfo.filePath;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Trigger beautiful confetti celebration
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 },
      });

      // Clear state after brief success show
      timer = setTimeout(() => {
        setDownloadInfo(null);
        setDownloadProgress(0);
      }, 1200);
    }

    return () => clearTimeout(timer);
  }, [downloadInfo, downloadProgress]);

  const setStudentName = (name: string | null) => {
    setStudentNameState(name);
    if (name) {
      localStorage.setItem("adv_student_name", name);
    } else {
      localStorage.removeItem("adv_student_name");
    }
  };

  const toggleProgress = (lessonId: string) => {
    const newProgress = { ...progress, [lessonId]: !progress[lessonId] };
    setProgress(newProgress);
    localStorage.setItem("adv_progress", JSON.stringify(newProgress));
  };

  const toggleFavorite = (path: string) => {
    let newFavorites: string[];
    if (favorites.includes(path)) {
      newFavorites = favorites.filter((f) => f !== path);
    } else {
      newFavorites = [...favorites, path];
    }
    setFavorites(newFavorites);
    localStorage.setItem("adv_favorites", JSON.stringify(newFavorites));
  };

  const isFavorite = (path: string) => favorites.includes(path);

  const addComment = (key: string, text: string, rating: number) => {
    const newComment: Comment = {
      id: Math.random().toString(36).substr(2, 9),
      studentName: studentName || "طالب مجهول",
      text,
      rating,
      date: new Date().toLocaleDateString("ar-AE", { year: "numeric", month: "long", day: "numeric" }),
    };
    const keyComments = comments[key] || [];
    const newComments = { ...comments, [key]: [newComment, ...keyComments] };
    setComments(newComments);
    localStorage.setItem("adv_comments", JSON.stringify(newComments));
  };

  const addCustomFile = (file: any) => {
    const updated = [...customFiles, file];
    setCustomFiles(updated);
    localStorage.setItem("adv_custom_files", JSON.stringify(updated));
  };

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("adv_theme", nextTheme);
  };

  const triggerDownload = (filePath: string, fileName: string) => {
    // If it's a URL/External resource, open directly in a new tab instead of simulated download
    if (filePath.startsWith("http")) {
      window.open(filePath, "_blank");
      return;
    }
    setDownloadInfo({ filePath, fileName });
    setDownloadProgress(0);
  };

  return (
    <AppContext.Provider
      value={{
        studentName,
        setStudentName,
        progress,
        toggleProgress,
        favorites,
        toggleFavorite,
        isFavorite,
        comments,
        addComment,
        theme,
        toggleTheme,
        customFiles,
        addCustomFile,
        triggerDownload,
      }}
    >
      {mounted && children}

      {/* Global High-Wow-Factor Secured Download Modal Overlay */}
      {downloadInfo && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 transition-all duration-300">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center text-center">
            
            {/* Ambient Background Glows */}
            <div className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-[-50px] left-[-50px] w-40 h-40 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Icon */}
            <div className="p-4 bg-emerald-500/10 text-emerald-500 rounded-2xl mb-4 relative flex items-center justify-center">
              {downloadProgress < 100 ? (
                <>
                  <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin absolute" />
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500 animate-pulse"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                </>
              ) : (
                <div className="p-2.5 bg-emerald-500 text-slate-950 rounded-xl animate-bounce">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                </div>
              )}
            </div>

            <h3 className="text-base sm:text-lg font-black text-white mb-2 leading-tight select-none">
              {downloadProgress < 100 ? "جاري تحضير وتأمين الملف للتحميل..." : "تم تحضير وحفظ حقوق الملف بنجاح! 🎉"}
            </h3>

            {/* Copyright stamp panel */}
            <div className="w-full bg-slate-950 border border-slate-850 p-4 rounded-2xl mb-4 text-right flex flex-col gap-2 relative">
              {/* Security Shield Indicator */}
              <div className="flex items-center gap-1.5 text-[10px] font-extrabold text-emerald-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                <span>تطبيق بصمة الحقوق الرقمية للأكاديمية</span>
              </div>
              <p className="text-xs font-black text-slate-200 truncate select-all">
                {downloadInfo.fileName}
              </p>
              <p className="text-[10px] text-slate-400 leading-relaxed text-justify">
                حقوق هذا الملف التعليمي محفوظة بالكامل لـ <span className="text-emerald-500 font-bold">أكاديمية ADVVVV11</span> وقناة تلغرام الرسمية للطلاب <span className="text-emerald-500 font-mono font-bold select-all">@advuae11</span>. يُمنع منعاً باتاً نشر، أو بيع، أو إعادة استخدام هذا الملف تجارياً دون الحصول على موافقة مسبقة.
              </p>
            </div>

            {/* Progress indicator */}
            <div className="w-full flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-[10px] font-bold">
                <span className="text-slate-500">مستوى التأمين</span>
                <span className="text-emerald-400 font-mono">{downloadProgress}%</span>
              </div>
              <div className="w-full h-2 bg-slate-950 border border-slate-850 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-75"
                  style={{ width: `${downloadProgress}%` }}
                />
              </div>
            </div>

          </div>
        </div>
      )}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
