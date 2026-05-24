"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Heart, Award, Sparkles, MessageCircle } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      
      {/* Title section */}
      <div className="text-center flex flex-col items-center gap-3">
        <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-2xl mb-2">
          <BookOpen size={32} className="animate-pulse" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
          من نحن — أكاديمية <span className="text-emerald-500 font-mono">ADVVVV11</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
          نحن منصة تعليمية إلكترونية رائدة، تأسست بهدف تمكين ودعم طلاب الصف الحادي عشر المتقدم (ADV) في دولة الإمارات للوصول لأعلى مستويات التميز الأكاديمي.
        </p>
      </div>

      {/* Main card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-right">
        
        <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 rounded-3xl p-6 flex flex-col gap-3 relative overflow-hidden shadow-sm">
          <div className="p-2.5 bg-emerald-500/10 text-emerald-500 rounded-xl w-fit">
            <Award size={18} />
          </div>
          <h3 className="text-sm sm:text-base font-extrabold text-slate-800 dark:text-white">بوابة التفوق والدرجة الكاملة 🏆</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            نوفر محتوى مراجعة منسق بدقة فائقة ويطابق الهيكل الوزاري المعتمد لوزارة التربية والتعليم بدولة الإمارات. نهدف لتبسيط المفاهيم المعقدة في الرياضيات والفيزياء وباقي المواد لكي ينال طلابنا التفوق والدرجة الكاملة.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 rounded-3xl p-6 flex flex-col gap-3 relative overflow-hidden shadow-sm">
          <div className="p-2.5 bg-blue-500/10 text-blue-500 rounded-xl w-fit">
            <Sparkles size={18} />
          </div>
          <h3 className="text-sm sm:text-base font-extrabold text-slate-800 dark:text-white">الريادة والتقنيات التفاعلية ⚡</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            نحن لا نكتفي بعرض ملفات الـ PDF؛ بل نوفر محاكاة كاملة للاختبارات التفاعلية MCQ، وأدوات ذكية لتتبع تقدم الطلاب، وقارئ مستندات مدمج، مع إمكانية التقييم والتعليق والمشاركة النشطة لضمان بيئة تعليمية ذكية ومتفاعلة.
          </p>
        </div>

      </div>

      {/* Founder info card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 text-right flex flex-col md:flex-row items-center gap-6 shadow-sm">
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="w-1 h-5 bg-emerald-500 rounded-full" />
            <h3 className="text-base font-black text-slate-800 dark:text-white">المؤسس والمشرف العام</h3>
          </div>
          <h4 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">حمد العبدولي</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            تأسست هذه المنصة برعاية وإشراف شخصي من حمد العبدولي 2026، كإسهام حقيقي لتوفير الدعم لطلاب شعبة الحادي عشر المتقدم في الإمارات وتسهيل حصولهم على كافة المستندات وحلول الهياكل دون عناء أو تشتت.
          </p>
          <div className="flex gap-1 items-center text-[10px] text-slate-400 mt-2 font-bold leading-none">
            <Heart size={12} className="fill-red-500 text-red-500 animate-pulse" />
            <span>Made with dedication for UAE ADV Students</span>
          </div>
        </div>
      </div>

      {/* Button options */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-2">
        <Link
          href="/"
          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-2xl shadow-lg shadow-emerald-500/15 hover:shadow-emerald-500/25 transition-all text-center cursor-pointer flex justify-center items-center gap-1.5"
        >
          <span>تصفح المواد والمراجعات</span>
          <ArrowRight size={14} className="rotate-180" />
        </Link>
        <Link
          href="/telegram"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-2xl shadow-lg shadow-blue-500/15 hover:shadow-blue-500/25 transition-all text-center cursor-pointer flex justify-center items-center gap-1.5"
        >
          <MessageCircle size={14} />
          <span>انضم لقناتنا ع التلغرام</span>
        </Link>
      </div>

    </div>
  );
}
