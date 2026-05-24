"use client";

import React from "react";
import { Shield, Sparkles, CheckCircle } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="flex flex-col gap-8 max-w-3xl mx-auto py-6">
      
      {/* Title */}
      <div className="text-center flex flex-col items-center gap-3">
        <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-2xl mb-2">
          <Shield size={32} />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
          سياسة الخصوصية — أكاديمية <span className="text-emerald-500 font-mono">ADVVVV11</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
          تلتزم منصتنا بأقصى معايير حماية البيانات والخصوصية لطلابنا في دولة الإمارات العربية المتحدة. يرجى قراءة السياسة الموضحة أدناه.
        </p>
      </div>

      {/* Content */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 text-right flex flex-col gap-6 shadow-sm">
        
        <div className="flex flex-col gap-2">
          <h3 className="text-sm sm:text-base font-black text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center gap-1.5 justify-start">
            <Sparkles size={14} className="text-emerald-500" />
            <span>جمع البيانات واستخدامها</span>
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
            نحن لا نقوم بجمع أي بيانات شخصية حساسة للطلاب. الاسم الذي تدخله عند دخول الأكاديمية يتم حفظه بالكامل محلياً على متصفحك الشخصي عبر ميزة (LocalStorage) لغرض ترحيبي وتتبع تقدمك في المذاكرة والإنهاء فقط، ولا نرسله لأي خوادم خارجية.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-sm sm:text-base font-black text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center gap-1.5 justify-start">
            <Sparkles size={14} className="text-emerald-500" />
            <span>نظام التعليقات والتقييم</span>
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
            التعليقات والتقييمات التي تتركها على الدروس وملفات الـ PDF تحفظ أيضاً محلياً على جهازك لتوفير تجربة تعليمية سلسة، وفي حال تفعيل الربط السحابي (Supabase/Firebase) لاحقاً، يتم تخزين التعليقات باسمك المستعار لتظهر لزملائك الطلاب بهدف تيسير التعلم التعاوني.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-sm sm:text-base font-black text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center gap-1.5 justify-start">
            <Sparkles size={14} className="text-emerald-500" />
            <span>أمن وحماية البيانات</span>
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
            نحن نطبق مجموعة متنوعة من الإجراءات الأمنية للحفاظ على سلامة معلوماتك عندما تتصفح المنصة. يتم تصفح الموقع بالكامل عبر بروتوكول HTTPS المشفر والآمن لضمان عدم إمكانية التنصت أو سرقة أي بيانات.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-sm sm:text-base font-black text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center gap-1.5 justify-start">
            <Sparkles size={14} className="text-emerald-500" />
            <span>تحديثات سياسة الخصوصية</span>
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
            قد نقوم بتحديث سياسة الخصوصية الخاصة بنا من وقت لآخر لمواكبة التحديثات التقنية أو التنظيمية. ننصحك بزيارة هذه الصفحة بانتظام لمعرفة أي تغييرات جديدة.
          </p>
        </div>

      </div>

    </div>
  );
}
