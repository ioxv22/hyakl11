"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

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
      }}
    >
      {mounted && children}
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
