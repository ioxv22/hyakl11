"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Users, Eye, TrendingUp, Clock, Globe, Activity, FileText, Plus, CheckCircle2, BarChart3, Monitor } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { SUBJECTS } from "@/data/mockData";

interface AnalyticsData {
  totalVisits: number;
  uniqueVisitors: number;
  todayVisits: number;
  topPages: { page: string; count: number }[];
  recentVisitors: { id: string; name: string; page: string; timestamp: string; userAgent: string }[];
  visitsByDay: { date: string; count: number }[];
  visitorsList: { name: string; visitCount: number; lastVisit: string }[];
}

// ─── Skeleton Loader ───────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-slate-900/80 border border-slate-800/80 rounded-3xl p-6 animate-pulse">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-11 h-11 bg-slate-800 rounded-2xl" />
        <div className="flex-1 space-y-2">
          <div className="h-3 bg-slate-800 rounded w-20" />
          <div className="h-6 bg-slate-800 rounded w-16" />
        </div>
      </div>
    </div>
  );
}

function SkeletonTable() {
  return (
    <div className="bg-slate-900/80 border border-slate-800/80 rounded-3xl p-6 animate-pulse space-y-4">
      <div className="h-4 bg-slate-800 rounded w-32" />
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex gap-4">
          <div className="h-3 bg-slate-800 rounded flex-1" />
          <div className="h-3 bg-slate-800 rounded w-12" />
          <div className="h-3 bg-slate-800 rounded w-24" />
        </div>
      ))}
    </div>
  );
}

// ─── Format Helpers ────────────────────────────────────────────────────────────
function formatTimeAgo(timestamp: string): string {
  const now = new Date();
  const date = new Date(timestamp);
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffSec < 60) return "الآن";
  if (diffMin < 60) return `منذ ${diffMin} دقيقة`;
  if (diffHr < 24) return `منذ ${diffHr} ساعة`;
  if (diffDay < 7) return `منذ ${diffDay} يوم`;
  return date.toLocaleDateString("ar-AE", { year: "numeric", month: "short", day: "numeric" });
}

function formatDate(timestamp: string): string {
  return new Date(timestamp).toLocaleDateString("ar-AE", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function parseBrowser(ua: string): string {
  if (!ua || ua === "unknown") return "غير معروف";
  if (ua.includes("Chrome") && !ua.includes("Edg")) return "Chrome";
  if (ua.includes("Edg")) return "Edge";
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Safari") && !ua.includes("Chrome")) return "Safari";
  if (ua.includes("Opera") || ua.includes("OPR")) return "Opera";
  return "متصفح آخر";
}

function formatDayLabel(dateStr: string): string {
  const d = new Date(dateStr);
  const days = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
  return days[d.getDay()];
}

// ─── Main Admin Dashboard ──────────────────────────────────────────────────────
export default function AdminPage() {
  const { customFiles, addCustomFile } = useApp();

  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [sortVisitorsAsc, setSortVisitorsAsc] = useState(false);

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState(false);

  // File upload form state
  const [subjectInput, setSubjectInput] = useState("math");
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState<"شرح" | "مراجعة" | "امتحان" | "هيكل">("مراجعة");
  const [filePath, setFilePath] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Fetch analytics data
  const fetchAnalytics = async () => {
    try {
      const res = await fetch("/api/analytics");
      if (res.ok) {
        const data = await res.json();
        setAnalytics(data);
      }
    } catch {
      // Silently fail
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchAnalytics();
      const interval = setInterval(fetchAnalytics, 30000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  // File upload handler
  const handleSubmitFile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileName.trim() || !filePath.trim()) return;

    const newFile = {
      name: fileName.trim(),
      type: fileType,
      path: filePath.trim(),
      views: 0,
      dateAdded: new Date().toISOString().split("T")[0],
      subjectId: subjectInput,
    };

    addCustomFile(newFile);
    setSuccessMsg("تم إضافة الملف بنجاح! سيظهر الآن في الصفحة الرئيسية وصفحة المادة.");
    setFileName("");
    setFilePath("");

    setTimeout(() => {
      setSuccessMsg("");
    }, 4000);
  };

  const subjectNames: { [key: string]: string } = {
    math: "الرياضيات",
    physics: "الفيزياء",
    islamic: "التربية الإسلامية",
    english: "اللغة الإنجليزية",
    biology: "الأحياء",
    chemistry: "الكيمياء",
  };

  // Sorted visitors list
  const sortedVisitors = analytics
    ? [...analytics.visitorsList].sort((a, b) =>
        sortVisitorsAsc ? a.visitCount - b.visitCount : b.visitCount - a.visitCount
      )
    : [];

  // Max visits for chart scaling
  const maxDayVisits = analytics ? Math.max(...analytics.visitsByDay.map((d) => d.count), 1) : 1;

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="bg-slate-900/80 border border-slate-800/80 rounded-3xl p-8 max-w-md w-full backdrop-blur-xl text-center shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none" />
          <div className="flex justify-center mb-6 relative z-10">
            <div className="p-4 bg-emerald-500/10 text-emerald-500 rounded-2xl">
              <ShieldCheck size={40} />
            </div>
          </div>
          <h2 className="text-xl font-black text-white mb-2 relative z-10">تسجيل الدخول للمشرف</h2>
          <p className="text-sm text-slate-400 mb-6 relative z-10">الرجاء إدخال كلمة المرور للوصول إلى لوحة التحكم</p>
          
          <form onSubmit={(e) => {
            e.preventDefault();
            if (passwordInput === "hamadk2010@@-") {
              setIsAuthenticated(true);
              setLoginError(false);
            } else {
              setLoginError(true);
            }
          }} className="flex flex-col gap-4 relative z-10">
            <input
              type="password"
              placeholder="كلمة المرور"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-center focus:outline-none focus:border-emerald-500 text-white transition-colors"
              autoFocus
            />
            {loginError && (
              <p className="text-xs text-red-400 font-bold">كلمة المرور غير صحيحة</p>
            )}
            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-emerald-900/20"
            >
              دخول
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* ─── Header ─────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-4 p-6 bg-gradient-to-l from-slate-900 via-slate-900 to-emerald-950/30 border border-slate-800/80 rounded-3xl text-right backdrop-blur-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none" />
        <Link
          href="/"
          className="p-2.5 bg-slate-800 hover:bg-emerald-500/10 text-slate-300 hover:text-emerald-400 rounded-2xl transition-all z-10"
        >
          <ArrowRight size={18} />
        </Link>
        <div className="flex items-center gap-3 z-10">
          <div className="p-2.5 bg-emerald-500/10 text-emerald-500 rounded-xl">
            <ShieldCheck size={22} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-base sm:text-lg font-black text-white">لوحة تحكم المشرف 🔐</h1>
            <p className="text-[10px] text-slate-500 mt-0.5">
              إحصائيات الزوار والتحليلات • تحديث تلقائي كل 30 ثانية
            </p>
          </div>
        </div>
        {!loading && (
          <div className="mr-auto z-10 flex items-center gap-1.5">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] text-emerald-400 font-bold">مباشر</span>
          </div>
        )}
      </div>

      {/* ─── Stats Cards ────────────────────────────────────────────────── */}
      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : analytics ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Visits */}
          <div className="group bg-slate-900/80 border border-slate-800/80 rounded-3xl p-5 backdrop-blur-xl hover:border-emerald-500/30 transition-all duration-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center gap-3 relative z-10">
              <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-2xl">
                <Eye size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">إجمالي الزيارات</span>
                <span className="text-2xl font-black text-white mt-0.5">{analytics.totalVisits.toLocaleString("ar-AE")}</span>
              </div>
            </div>
          </div>

          {/* Unique Visitors */}
          <div className="group bg-slate-900/80 border border-slate-800/80 rounded-3xl p-5 backdrop-blur-xl hover:border-blue-500/30 transition-all duration-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center gap-3 relative z-10">
              <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-2xl">
                <Users size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">زوار فريدين</span>
                <span className="text-2xl font-black text-white mt-0.5">{analytics.uniqueVisitors.toLocaleString("ar-AE")}</span>
              </div>
            </div>
          </div>

          {/* Today's Visits */}
          <div className="group bg-slate-900/80 border border-slate-800/80 rounded-3xl p-5 backdrop-blur-xl hover:border-amber-500/30 transition-all duration-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center gap-3 relative z-10">
              <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-2xl">
                <TrendingUp size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">زيارات اليوم</span>
                <span className="text-2xl font-black text-white mt-0.5">{analytics.todayVisits.toLocaleString("ar-AE")}</span>
              </div>
            </div>
          </div>

          {/* Total Pages */}
          <div className="group bg-slate-900/80 border border-slate-800/80 rounded-3xl p-5 backdrop-blur-xl hover:border-violet-500/30 transition-all duration-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center gap-3 relative z-10">
              <div className="p-2.5 bg-violet-500/10 text-violet-400 rounded-2xl">
                <Globe size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">صفحات مُتصفَّحة</span>
                <span className="text-2xl font-black text-white mt-0.5">{analytics.topPages.reduce((acc, p) => acc + p.count, 0).toLocaleString("ar-AE")}</span>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* ─── Chart + Top Pages Row ──────────────────────────────────────── */}
      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <SkeletonTable />
          <SkeletonTable />
        </div>
      ) : analytics ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Visit Chart (last 7 days) */}
          <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800/80 rounded-3xl p-6 backdrop-blur-xl">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-5">
              <div className="p-1.5 bg-emerald-500/10 text-emerald-500 rounded-lg">
                <BarChart3 size={16} />
              </div>
              <h3 className="text-sm font-bold text-white">الزيارات خلال آخر 7 أيام</h3>
            </div>

            <div className="flex items-end gap-3 h-48 px-2">
              {analytics.visitsByDay.map((day, i) => {
                const pct = maxDayVisits > 0 ? (day.count / maxDayVisits) * 100 : 0;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <span className="text-[10px] font-bold text-emerald-400">{day.count}</span>
                    <div className="w-full relative rounded-t-xl overflow-hidden" style={{ height: `${Math.max(pct, 4)}%` }}>
                      <div className="absolute inset-0 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-xl opacity-80 hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-[9px] text-slate-500 font-bold whitespace-nowrap">{formatDayLabel(day.date)}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top Pages */}
          <div className="lg:col-span-1 bg-slate-900/80 border border-slate-800/80 rounded-3xl p-6 backdrop-blur-xl">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-4">
              <div className="p-1.5 bg-violet-500/10 text-violet-500 rounded-lg">
                <FileText size={16} />
              </div>
              <h3 className="text-sm font-bold text-white">أكثر الصفحات زيارة</h3>
            </div>

            <div className="flex flex-col gap-2.5 max-h-[220px] overflow-y-auto custom-scrollbar">
              {analytics.topPages.length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-8">لا توجد بيانات حتى الآن</p>
              ) : (
                analytics.topPages.map((page, i) => {
                  const maxCount = analytics.topPages[0]?.count || 1;
                  const pct = (page.count / maxCount) * 100;
                  return (
                    <div key={i} className="relative">
                      <div
                        className="absolute inset-y-0 right-0 bg-emerald-500/5 rounded-lg"
                        style={{ width: `${pct}%` }}
                      />
                      <div className="relative flex items-center justify-between px-3 py-2">
                        <span className="text-xs text-emerald-400 font-bold">{page.count}</span>
                        <span className="text-[11px] text-slate-300 font-semibold truncate max-w-[160px]">{page.page}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      ) : null}

      {/* ─── Visitors Table ─────────────────────────────────────────────── */}
      {loading ? (
        <SkeletonTable />
      ) : analytics ? (
        <div className="bg-slate-900/80 border border-slate-800/80 rounded-3xl p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <button
              onClick={() => setSortVisitorsAsc(!sortVisitorsAsc)}
              className="text-[10px] text-emerald-400 hover:text-emerald-300 font-bold transition-colors cursor-pointer"
            >
              {sortVisitorsAsc ? "الأقل أولاً ↑" : "الأكثر أولاً ↓"}
            </button>
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-blue-500/10 text-blue-500 rounded-lg">
                <Users size={16} />
              </div>
              <h3 className="text-sm font-bold text-white">جدول الزوار</h3>
              <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full font-bold">{analytics.visitorsList.length}</span>
            </div>
          </div>

          {sortedVisitors.length === 0 ? (
            <p className="text-xs text-slate-500 text-center py-8">لا يوجد زوار مسجلين حتى الآن</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead>
                  <tr className="text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-800/50">
                    <th className="py-2 px-3">آخر زيارة</th>
                    <th className="py-2 px-3">عدد الزيارات</th>
                    <th className="py-2 px-3">الاسم</th>
                    <th className="py-2 px-3 w-8">#</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedVisitors.slice(0, 20).map((visitor, i) => (
                    <tr
                      key={visitor.name}
                      className="border-b border-slate-800/30 hover:bg-slate-800/30 transition-colors"
                    >
                      <td className="py-2.5 px-3 text-[11px] text-slate-500">{formatTimeAgo(visitor.lastVisit)}</td>
                      <td className="py-2.5 px-3">
                        <span className="text-xs font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-lg">
                          {visitor.visitCount}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-xs font-bold text-white">{visitor.name}</td>
                      <td className="py-2.5 px-3 text-[10px] text-slate-600 font-bold">{i + 1}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : null}

      {/* ─── Recent Activity Feed ───────────────────────────────────────── */}
      {loading ? (
        <SkeletonTable />
      ) : analytics ? (
        <div className="bg-slate-900/80 border border-slate-800/80 rounded-3xl p-6 backdrop-blur-xl">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-4">
            <div className="p-1.5 bg-amber-500/10 text-amber-500 rounded-lg">
              <Activity size={16} />
            </div>
            <h3 className="text-sm font-bold text-white">آخر النشاطات</h3>
            <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full font-bold">آخر 20</span>
          </div>

          {analytics.recentVisitors.length === 0 ? (
            <p className="text-xs text-slate-500 text-center py-8">لا توجد نشاطات مسجلة</p>
          ) : (
            <div className="flex flex-col gap-1.5 max-h-[400px] overflow-y-auto custom-scrollbar">
              {analytics.recentVisitors.map((visit) => (
                <div
                  key={visit.id}
                  className="flex items-center gap-3 p-3 bg-slate-950/40 border border-slate-800/30 rounded-2xl hover:bg-slate-800/20 transition-colors"
                >
                  {/* Dot */}
                  <div className="w-2 h-2 bg-emerald-500 rounded-full shrink-0" />

                  {/* Info */}
                  <div className="flex-1 flex flex-col gap-0.5 text-right min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-white truncate">{visit.name}</span>
                      <span className="text-[10px] text-slate-600">•</span>
                      <span className="text-[10px] text-slate-400 truncate">{visit.page}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Monitor size={10} className="text-slate-600 shrink-0" />
                      <span className="text-[9px] text-slate-600 truncate">{parseBrowser(visit.userAgent)}</span>
                    </div>
                  </div>

                  {/* Time */}
                  <div className="flex items-center gap-1 shrink-0">
                    <Clock size={10} className="text-slate-600" />
                    <span className="text-[10px] text-slate-500 font-semibold whitespace-nowrap">{formatTimeAgo(visit.timestamp)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : null}

      {/* ─── File Upload Form ───────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2">
          <div className="bg-slate-900/80 border border-slate-800/80 rounded-3xl p-6 text-right flex flex-col gap-4 backdrop-blur-xl">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <div className="p-1.5 bg-emerald-500/10 text-emerald-500 rounded-lg">
                <FileText size={16} />
              </div>
              <h3 className="text-sm font-bold text-white">إضافة ملف مراجعة أو هيكل جديد</h3>
            </div>

            {successMsg && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/10 text-emerald-400 text-xs font-bold rounded-xl flex items-center gap-2 animate-fade-in">
                <CheckCircle2 size={16} />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmitFile} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col text-right">
                  <label className="text-xs font-bold text-slate-400 mb-1">اختر المادة الدراسية:</label>
                  <select
                    value={subjectInput}
                    onChange={(e) => setSubjectInput(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500 text-xs sm:text-sm text-white"
                  >
                    <option value="math">الرياضيات 📐</option>
                    <option value="physics">الفيزياء ⚡</option>
                    <option value="islamic">التربية الإسلامية 🕌</option>
                    <option value="english">إنجليزي 🇬🇧</option>
                    <option value="biology">الأحياء 🧬</option>
                    <option value="chemistry">الكيمياء 🧪</option>
                  </select>
                </div>

                <div className="flex flex-col text-right">
                  <label className="text-xs font-bold text-slate-400 mb-1">تصنيف نوع الملف:</label>
                  <select
                    value={fileType}
                    onChange={(e) => setFileType(e.target.value as "شرح" | "مراجعة" | "امتحان" | "هيكل")}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500 text-xs sm:text-sm text-white"
                  >
                    <option value="هيكل">هيكل وزاري</option>
                    <option value="شرح">ملخص شرح</option>
                    <option value="مراجعة">كتيب مراجعة</option>
                    <option value="امتحان">امتحان سابق</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col text-right">
                <label className="text-xs font-bold text-slate-400 mb-1">اسم الملف التعليمي (العنوان المعروض للطلاب):</label>
                <input
                  type="text"
                  required
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="مثال: مراجعة نهائية شاملة للمتجهات الحادي عشر..."
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500 text-xs sm:text-sm text-white"
                />
              </div>

              <div className="flex flex-col text-right">
                <label className="text-xs font-bold text-slate-400 mb-1">اسم ملف الـ PDF (الاسم الدقيق للملف):</label>
                <input
                  type="text"
                  required
                  value={filePath}
                  onChange={(e) => setFilePath(e.target.value)}
                  placeholder="مثال: Rotational motion.pdf (يجب وضعه داخل مجلد public/files)"
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500 text-xs sm:text-sm text-white font-mono"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex justify-center items-center gap-1.5 cursor-pointer mt-2"
              >
                <Plus size={14} />
                <span>إضافة الملف للمنصة فوراً</span>
              </button>
            </form>
          </div>
        </div>

        {/* Info panel - Custom files */}
        <div className="lg:col-span-1">
          <div className="bg-slate-900/80 border border-slate-800/80 rounded-3xl p-5 text-right flex flex-col gap-4 backdrop-blur-xl">
            <h3 className="text-xs font-bold text-slate-400 border-b border-slate-800 pb-2 flex items-center gap-1.5">
              <FileText size={14} className="text-emerald-500" />
              <span>إحصائيات الملفات المضافة</span>
            </h3>

            <div className="flex justify-between items-center text-xs font-semibold py-1.5 border-b border-slate-900">
              <span className="text-slate-400">إجمالي الملفات المرفوعة</span>
              <span className="text-white font-bold">{customFiles.length} ملفات</span>
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <span className="text-[10px] font-bold text-slate-400">آخر الملفات المضافة بواسطة لوحة التحكم:</span>
              {customFiles.length === 0 ? (
                <span className="text-[10px] text-slate-400 text-center py-4 bg-slate-950/20 rounded-xl">
                  لم يتم إضافة أي ملفات بعد.
                </span>
              ) : (
                <div className="flex flex-col gap-1.5 max-h-[200px] overflow-y-auto custom-scrollbar">
                  {customFiles.map((file, idx) => (
                    <div
                      key={idx}
                      className="p-2 bg-slate-950/20 border border-slate-900 rounded-xl flex items-center justify-between text-right gap-2"
                    >
                      <div className="flex flex-col flex-1 gap-0.5">
                        <span className="text-[10px] font-bold text-white line-clamp-1">{file.name}</span>
                        <span className="text-[9px] text-slate-400">{subjectNames[file.subjectId]} • {file.type}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
