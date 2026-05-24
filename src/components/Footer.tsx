"use client";

import React from "react";
import Link from "next/link";
import { MessageCircle, Heart, Shield } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white dark:bg-slate-950 border-t border-slate-200/50 dark:border-slate-800/60 py-8 mt-12 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-right gap-1">
            <span className="text-sm font-extrabold text-slate-800 dark:text-white font-mono tracking-wider">
              ADVVVV11
            </span>
            <p className="text-[10px] text-slate-400 dark:text-slate-500">
              المنصة الشاملة لمراجعات الحادي عشر المتقدم بدولة الإمارات 🇦🇪
            </p>
          </div>

          {/* Quick Footer Links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link href="/about" className="text-[11px] font-bold text-slate-500 dark:text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400">
              من نحن
            </Link>
            <Link href="https://t.me/Advvvv11" target="_blank" className="text-[11px] font-bold text-slate-500 dark:text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 flex items-center gap-1">
              <MessageCircle size={10} />
              <span>قناة التلغرام</span>
            </Link>
            <Link href="/contact" className="text-[11px] font-bold text-slate-500 dark:text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400">
              اتصل بنا
            </Link>
            <Link href="/privacy" className="text-[11px] font-bold text-slate-500 dark:text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 flex items-center gap-1">
              <Shield size={10} />
              <span>سياسة الخصوصية</span>
            </Link>
          </div>

          {/* Custom copyright & telegram join */}
          <div className="flex flex-col items-center md:items-end text-center md:text-left gap-1">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              حقوق النشر © <span className="text-emerald-500">حمد العبدولي 2026</span>
            </span>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-400 dark:text-slate-500">
              <Heart size={10} className="fill-red-500 text-red-500 animate-pulse" />
              <span>Made for ADV Students UAE 🇦🇪</span>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};
