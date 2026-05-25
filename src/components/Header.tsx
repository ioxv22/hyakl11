"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Moon, Sun, Menu, X, ShieldAlert, Award } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { NotificationBell } from "./NotificationBell";

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { studentName, theme, toggleTheme } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "الرئيسية", path: "/" },
    { name: "حاسبة الدرجات", path: "/calculators" },
    { name: "مرتب الوقت", path: "/study-timer" },
    { name: "من نحن", path: "/about" },
    { name: "قناة التلغرام", path: "/telegram" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/70 dark:bg-slate-950/70 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/60 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="p-2.5 bg-gradient-to-tr from-emerald-600 to-emerald-400 text-white rounded-xl shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
                <BookOpen size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400 font-mono">
                  ADVVVV11
                </span>
                <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 leading-none">
                  أكاديمية الحادي عشر متقدم
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/55 dark:bg-slate-900/40 p-1 border border-slate-200/20 dark:border-slate-800/40 rounded-full">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`px-5 py-2 text-xs font-bold rounded-full transition-all duration-300 ${
                    isActive
                      ? "bg-white dark:bg-slate-950 text-emerald-600 dark:text-emerald-400 shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* User Status & Control Panel */}
          <div className="hidden md:flex items-center gap-3">
            {/* Student Greeting */}
            {studentName && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/10 rounded-full animate-fade-in">
                <Award size={14} className="animate-bounce" />
                <span className="text-xs font-bold leading-none">طالب: {studentName}</span>
              </div>
            )}

            {/* Admin shortcut */}
            <Link
              href="/admin"
              className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 rounded-xl transition-all cursor-pointer"
              title="لوحة تحكم الأدمن"
            >
              <ShieldAlert size={18} />
            </Link>

            {/* Notifications Bell */}
            <NotificationBell />

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 rounded-xl transition-all cursor-pointer"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 md:hidden">
            <NotificationBell />
            <button
              onClick={toggleTheme}
              className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl cursor-pointer"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden w-full border-t border-slate-200/50 dark:border-slate-800/60 bg-white dark:bg-slate-950 p-4 flex flex-col gap-3 animate-slide-down">
          {studentName && (
            <div className="flex items-center gap-1.5 px-3 py-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl">
              <Award size={14} />
              <span className="text-xs font-bold">طالب: {studentName}</span>
            </div>
          )}
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 text-xs font-bold rounded-xl ${
                  pathname === link.path
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "text-slate-600 dark:text-slate-400"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-emerald-500 rounded-xl flex items-center gap-2"
            >
              <ShieldAlert size={14} />
              <span>لوحة تحكم الأدمن</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
