"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Send, MessageCircle, Mail, Globe, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setSuccess(true);
    setName("");
    setEmail("");
    setMessage("");

    setTimeout(() => {
      setSuccess(false);
    }, 5000);
  };

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      
      {/* Title */}
      <div className="text-center flex flex-col items-center gap-3">
        <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-2xl mb-2">
          <Mail size={32} />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
          اتصل بنا — تواصل مع إدارة <span className="text-emerald-500 font-mono">ADVVVV11</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
          لديك استفسار، اقتراح، أو ترغب في إرسال ملفات تعليمية وتجميعات لإضافتها على الموقع؟ نحن هنا لمساعدتك والاستماع إليك.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Contact Form */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 rounded-3xl p-6 text-right flex flex-col gap-4 shadow-sm">
          
          <h3 className="text-sm font-bold text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 mb-1">
            أرسل لنا رسالة مباشرة 📨
          </h3>

          {success && (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold rounded-2xl flex items-center gap-2.5 animate-fade-in">
              <CheckCircle2 size={18} />
              <span>تم إرسال رسالتك بنجاح! شكراً لك، سنقوم بالرد عليك عبر البريد الإلكتروني أو التلغرام قريباً.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col text-right">
                <label className="text-xs font-bold text-slate-400 mb-1">الاسم الكامل:</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="مثال: حمد العبدولي..."
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500 text-xs sm:text-sm dark:text-white"
                />
              </div>
              <div className="flex flex-col text-right">
                <label className="text-xs font-bold text-slate-400 mb-1">البريد الإلكتروني أو معرف التلغرام (اختياري):</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="مثال: hamad@example.com..."
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500 text-xs sm:text-sm dark:text-white"
                />
              </div>
            </div>

            <div className="flex flex-col text-right">
              <label className="text-xs font-bold text-slate-400 mb-1">تفاصيل الرسالة أو الاقتراح:</label>
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="اكتب اقتراحك أو تفاصيل الملفات التي ترغب بمشاركتها معنا..."
                rows={5}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500 text-xs sm:text-sm dark:text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex justify-center items-center gap-1.5 cursor-pointer mt-2"
            >
              <Send size={12} className="rotate-180" />
              <span>إرسال الرسالة الآن</span>
            </button>
          </form>
        </div>

        {/* Quick Contacts panel */}
        <div className="lg:col-span-1 flex flex-col gap-6 text-right">
          
          <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 rounded-3xl p-5 flex flex-col gap-4 shadow-sm">
            <h3 className="text-xs font-bold text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-2">
              قنوات الاتصال المباشرة
            </h3>

            <a
              href="https://t.me/Advvvv11"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-slate-50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-900 hover:border-blue-500/20 rounded-2xl flex items-center justify-between text-right gap-2 hover:bg-blue-500/5 transition-all group cursor-pointer"
            >
              <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">
                تواصل عبر التلغرام العام
              </span>
              <MessageCircle size={16} className="text-blue-500 group-hover:scale-105 transition-transform" />
            </a>

            <div className="p-3 bg-slate-50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-900 rounded-2xl flex items-center justify-between text-right gap-2">
              <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 font-mono">
                hamad@advvvv11.ae
              </span>
              <Mail size={16} className="text-emerald-500" />
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-900 rounded-2xl flex items-center justify-between text-right gap-2">
              <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">
                أبوظبي، دولة الإمارات العربية المتحدة
              </span>
              <Globe size={16} className="text-emerald-500" />
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
