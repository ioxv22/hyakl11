"use client";

import React, { useState, useEffect, useRef } from "react";
import { Bell, Sparkles } from "lucide-react";

interface Notification {
  id: string;
  title: string;
  body: string;
  time: string;
  unread: boolean;
}

export const NotificationBell: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial pre-loaded notifications
    setNotifications([
      {
        id: "1",
        title: "هيكل الرياضيات متوفر الآن 📐",
        body: "تم إضافة ملف هيكل الرياضيات الوزاري المعتمد للفصل الثالث للصف الحادي عشر متقدم.",
        time: "منذ ساعة",
        unread: true,
      },
      {
        id: "2",
        title: "ملزمة مراجعة الفيزياء للحركة الدورانية ⚡",
        body: "تم إدراج ملف Physics Made Easy وملف مراجعة الحركة الدورانية الفعلي.",
        time: "منذ 3 ساعات",
        unread: true,
      },
      {
        id: "3",
        title: "درس الإسلامية 39 جاهز 🕌",
        body: "تم دمج ملف الأمن المائي والغذائي في دولة الإمارات كشرح تفاعلي بالكامل.",
        time: "منذ يوم",
        unread: false,
      },
      {
        id: "4",
        title: "أهلاً بك في أكاديميتنا المتطورة! 🎉",
        body: "ADVVVV11 منصتك الجديدة للمراجعة الذكية والوصول لـ 100% في الامتحانات الوزارية.",
        time: "منذ يومين",
        unread: false,
      },
    ]);

    // Handle click outside to close
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) markAllRead();
        }}
        className="relative p-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 rounded-xl transition-all cursor-pointer flex items-center justify-center"
      >
        <Bell size={18} className={unreadCount > 0 ? "animate-swing" : ""} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-white dark:border-slate-800 animate-pulse" />
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 mt-2.5 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl shadow-2xl overflow-hidden z-50 animate-slide-down">
          
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-950/40 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-1.5">
              <Sparkles size={14} className="text-emerald-500" />
              <span className="text-xs font-bold text-slate-800 dark:text-white">الإشعارات والتحديثات</span>
            </div>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 text-[9px] font-bold text-white bg-emerald-500 rounded-full">
                {unreadCount} جديد
              </span>
            )}
          </div>

          {/* Notifications List */}
          <div className="flex flex-col max-h-[300px] overflow-y-auto">
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`p-3.5 border-b border-slate-100 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-950/20 transition-colors flex flex-col gap-1 ${
                  n.unread ? "bg-emerald-50/10 dark:bg-emerald-950/5" : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <h5 className={`text-xs text-slate-900 dark:text-white leading-tight ${n.unread ? "font-bold" : "font-semibold"}`}>
                    {n.title}
                  </h5>
                  <span className="text-[9px] text-slate-400 whitespace-nowrap">{n.time}</span>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal">
                  {n.body}
                </p>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="px-4 py-2 bg-slate-50 dark:bg-slate-950/40 border-t border-slate-100 dark:border-slate-800 text-center">
            <button
              onClick={() => setIsOpen(false)}
              className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
            >
              إغلاق القائمة
            </button>
          </div>

        </div>
      )}
    </div>
  );
};
