"use client";

import React from "react";
import { MessageSquare, ArrowLeft, CheckCircle, Share2, Sparkles } from "lucide-react";

export default function TelegramPage() {
  return (
    <div className="flex flex-col gap-8 max-w-xl mx-auto py-8">
      
      {/* Telegram Joining Card */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-500 text-white border border-blue-500/10 rounded-3xl p-8 relative overflow-hidden shadow-2xl text-center flex flex-col items-center justify-center">
        
        {/* Glow backdrop */}
        <div className="absolute top-[-50px] left-[-50px] w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-50px] right-[-50px] w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="p-4 bg-white/10 text-white rounded-3xl mb-4 relative z-10 animate-bounce">
          <MessageSquare size={36} />
        </div>

        <h1 className="text-xl sm:text-2xl font-black mb-2 relative z-10 leading-tight">
          قناة التلغرام الرسمية 📢
        </h1>
        <p className="text-xs sm:text-sm text-blue-100 mb-6 leading-relaxed max-w-sm relative z-10">
          انضم فوراً إلى قناتنا الرسمية والمجتمعات الدراسية لتكون أول من يحصل على ملازم المراجعة والهياكل وحلول الامتحانات الوزارية!
        </p>

        {/* Status stats */}
        <div className="grid grid-cols-2 gap-4 w-full mb-6 relative z-10">
          <div className="bg-white/10 border border-white/10 p-3 rounded-2xl flex flex-col items-center">
            <span className="text-base sm:text-lg font-extrabold">+5,240</span>
            <span className="text-[9px] text-blue-200 font-bold">عضو نشط</span>
          </div>
          <div className="bg-white/10 border border-white/10 p-3 rounded-2xl flex flex-col items-center">
            <span className="text-base sm:text-lg font-extrabold">120+</span>
            <span className="text-[9px] text-blue-200 font-bold">ملف تعليمي مشترك</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full relative z-10">
          <a
            href="https://t.me/Advvvv11"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 bg-white hover:bg-slate-100 text-blue-600 text-xs sm:text-sm font-black rounded-2xl shadow-lg transition-all flex justify-center items-center gap-1.5 cursor-pointer"
          >
            <span>اضغط هنا للانضمام المباشر</span>
            <ArrowLeft size={16} />
          </a>
          <span className="text-[10px] text-blue-100 font-bold mt-1 tracking-wider font-mono">
            t.me/Advvvv11
          </span>
        </div>

      </div>

      {/* Why join card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 rounded-3xl p-6 text-right flex flex-col gap-4 shadow-sm">
        <h3 className="text-xs font-bold text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center gap-1.5 justify-start">
          <Sparkles size={14} className="text-emerald-500 animate-pulse" />
          <span>ماذا تقدم لك القناة؟</span>
        </h3>

        <div className="flex flex-col gap-3">
          {[
            "التنزيل الفوري لملفات الهياكل الوزارية المعتمدة لكل المواد.",
            "نماذج امتحانات وزارية سابقة محلولة بدقة متناهية.",
            "مجموعات نقاشية تفاعلية تمكن الطلاب من طرح الأسئلة وتبادل الحلول.",
            "فيديوهات شرح مركزة وقصيرة لتبسيط المفاهيم الصعبة ليلة الامتحان.",
            "تحديثات حية ومباشرة حول جداول الاختبارات وأي تعديلات وزارية."
          ].map((item, idx) => (
            <div key={idx} className="flex gap-2.5 items-start text-xs font-semibold">
              <CheckCircle size={14} className="text-emerald-500 mt-0.5 shrink-0" />
              <p className="text-slate-700 dark:text-slate-400 leading-normal">{item}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
