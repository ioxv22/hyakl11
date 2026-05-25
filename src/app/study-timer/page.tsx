"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Timer, Play, Pause, RotateCcw, Plus, Trash2, CheckCircle2, Award, Sparkles, PlusCircle, BookOpen, BarChart2, Flame, Clock } from "lucide-react";
import confetti from "canvas-confetti";

interface StudyTask {
  id: string;
  title: string;
  subject: string;
  duration: number; // in minutes
  completed: boolean;
}

const SUBJECTS_EMOJIS: Record<string, string> = {
  "رياضيات": "📐",
  "اجتماعيات": "📊",
  "لغة إنجليزية": "🇬🇧",
  "لغة عربية": "📝",
  "كيمياء أو أحياء": "🧪",
  "فيزياء": "⚡",
  "تربية إسلامية": "🕌",
  "أخرى": "🎯"
};

export default function StudyTimerPage() {
  // Timer States
  const [timerMode, setTimerMode] = useState<"study" | "shortBreak" | "longBreak">("study");
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60); // 25 minutes default
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [totalStudyMinutes, setTotalStudyMinutes] = useState<number>(0);
  const [subjectStats, setSubjectStats] = useState<Record<string, number>>({
    "رياضيات": 0,
    "اجتماعيات": 0,
    "لغة إنجليزية": 0,
    "لغة عربية": 0,
    "كيمياء أو أحياء": 0,
    "فيزياء": 0,
    "تربية إسلامية": 0,
    "أخرى": 0
  });

  // Scheduler / Tasks States
  const [tasks, setTasks] = useState<StudyTask[]>([
    { id: "1", title: "مراجعة الضرب النقطي في الرياضيات", subject: "رياضيات", duration: 25, completed: false },
    { id: "2", title: "دراسة وحدة المناعة والإنترفيرون في الأحياء", subject: "كيمياء أو أحياء", duration: 30, completed: false },
    { id: "3", title: "حل كويز الفيزياء الذكي بالهيكل", subject: "فيزياء", duration: 25, completed: false }
  ]);
  
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [newTaskSubject, setNewTaskSubject] = useState<string>("رياضيات");
  const [newTaskDuration, setNewTaskDuration] = useState<number>(25);

  const [activeSubject, setActiveSubject] = useState<string>("رياضيات");

  // Timer Ref
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Audio simulation state (for focus audio)
  const [musicActive, setMusicActive] = useState<boolean>(false);

  // Initial duration maps
  const getModeDuration = (mode: typeof timerMode) => {
    switch (mode) {
      case "study": return 25 * 60;
      case "shortBreak": return 5 * 60;
      case "longBreak": return 15 * 60;
    }
  };

  // Switch modes
  const handleModeChange = (mode: typeof timerMode) => {
    setIsRunning(false);
    setTimerMode(mode);
    setTimeLeft(getModeDuration(mode));
  };

  // Timer Countdown Effect
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Timer Finished!
            setIsRunning(false);
            if (timerRef.current) clearInterval(timerRef.current);
            
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  // Handle Session completion
  const handleTimerComplete = () => {
    confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    
    if (timerMode === "study") {
      const addedMinutes = Math.round(getModeDuration("study") / 60);
      setTotalStudyMinutes((prev) => prev + addedMinutes);
      setSubjectStats((prev) => ({
        ...prev,
        [activeSubject]: (prev[activeSubject] || 0) + addedMinutes
      }));
      alert(`🎉 كفو يا بطل! أنهيت جلسة مذاكرة ${activeSubject} بنجاح. خذلك استراحة قصيرة الآن!`);
      setTimerMode("shortBreak");
      setTimeLeft(getModeDuration("shortBreak"));
    } else {
      alert("🧘 انتهت الاستراحة. حان الوقت للعودة إلى المذاكرة والتركيز بنشاط!");
      setTimerMode("study");
      setTimeLeft(getModeDuration("study"));
    }
  };

  // Reset Timer
  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(getModeDuration(timerMode));
  };

  // Add a Task to Schedule
  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: StudyTask = {
      id: Date.now().toString(),
      title: newTaskTitle.trim(),
      subject: newTaskSubject,
      duration: newTaskDuration,
      completed: false
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
    confetti({ particleCount: 20, spread: 30 });
  };

  // Delete Task
  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // Toggle Task Completion
  const toggleTaskCompletion = (id: string) => {
    setTasks(
      tasks.map((t) => {
        if (t.id === id) {
          const updated = !t.completed;
          if (updated) {
            confetti({ particleCount: 30, spread: 40 });
            // Add to stats when checked
            setTotalStudyMinutes((prev) => prev + t.duration);
            setSubjectStats((prev) => ({
              ...prev,
              [t.subject]: (prev[t.subject] || 0) + t.duration
            }));
          }
          return { ...t, completed: updated };
        }
        return t;
      })
    );
  };

  // Run Task in Timer
  const loadTaskToTimer = (task: StudyTask) => {
    setIsRunning(false);
    setTimerMode("study");
    setActiveSubject(task.subject);
    setTimeLeft(task.duration * 60);
    setIsRunning(true);
    alert(`⚡ تم شحن المؤقت بمهمة (${task.title}) بمدة ${task.duration} دقيقة! ابدأ المذاكرة الآن.`);
  };

  // Formatter
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Progress percentage
  const progressPercent = useMemo(() => {
    const max = getModeDuration(timerMode);
    return ((max - timeLeft) / max) * 100;
  }, [timeLeft, timerMode]);

  return (
    <div className="min-h-screen py-8 px-4 flex flex-col gap-6 max-w-4xl mx-auto text-right select-none">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-5">
        <Link
          href="/"
          className="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-emerald-500 rounded-2xl transition-all flex items-center gap-1.5 text-xs font-bold shadow-sm"
        >
          <ArrowRight size={14} />
          <span>الرئيسية</span>
        </Link>
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-2xl animate-pulse">
            <Timer size={28} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">مرتب الوقت ومؤقت المذاكرة الذكي ⏱️✨</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">نظم جدولك اليومي، وركز بدراستك مستخدماً مؤقت بومودورو مع حساب إحصائيات إنجازك.</p>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Column: Pomodoro Focus Dial Widget (Span 5) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm flex flex-col items-center justify-between gap-6 relative overflow-hidden min-h-[420px]">
          
          <div className="absolute top-[-50px] right-[-50px] w-36 h-36 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Mode Switcher pills */}
          <div className="flex bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200/50 dark:border-slate-850 gap-1.5 w-full">
            <button
              onClick={() => handleModeChange("study")}
              className={`flex-1 py-2 text-[10px] sm:text-xs font-black rounded-lg transition-all cursor-pointer ${
                timerMode === "study"
                  ? "bg-emerald-600 text-white shadow-md"
                  : "text-slate-500 hover:text-slate-850 dark:hover:text-white"
              }`}
            >
              📚 تركيز ومذاكرة
            </button>
            <button
              onClick={() => handleModeChange("shortBreak")}
              className={`flex-1 py-2 text-[10px] sm:text-xs font-black rounded-lg transition-all cursor-pointer ${
                timerMode === "shortBreak"
                  ? "bg-emerald-600 text-white shadow-md"
                  : "text-slate-500 hover:text-slate-850 dark:hover:text-white"
              }`}
            >
              🧘 استراحة قصيرة
            </button>
            <button
              onClick={() => handleModeChange("longBreak")}
              className={`flex-1 py-2 text-[10px] sm:text-xs font-black rounded-lg transition-all cursor-pointer ${
                timerMode === "longBreak"
                  ? "bg-emerald-600 text-white shadow-md"
                  : "text-slate-500 hover:text-slate-850 dark:hover:text-white"
              }`}
            >
              🌴 استراحة طويلة
            </button>
          </div>

          {/* Circle dial container */}
          <div className="relative w-44 h-44 flex items-center justify-center">
            
            {/* SVG Ring Progress */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="88"
                cy="88"
                r="78"
                strokeWidth="6"
                stroke="currentColor"
                fill="transparent"
                className="text-slate-100 dark:text-slate-850"
              />
              <circle
                cx="88"
                cy="88"
                r="78"
                strokeWidth="6"
                strokeDasharray={2 * Math.PI * 78}
                strokeDashoffset={2 * Math.PI * 78 * (1 - progressPercent / 100)}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                className="text-emerald-500 transition-all duration-300"
              />
            </svg>

            {/* Time numbers */}
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-black text-slate-900 dark:text-white font-mono tracking-wider">
                {formatTime(timeLeft)}
              </span>
              <span className="text-[9px] text-slate-400 font-extrabold mt-1 bg-slate-50 dark:bg-slate-950 px-2 py-0.5 border border-slate-200/50 dark:border-slate-850 rounded-full">
                {timerMode === "study" ? `المادة: ${activeSubject}` : "وقت استرخاء"}
              </span>
            </div>

          </div>

          {/* Controls bar */}
          <div className="flex items-center gap-3 w-full justify-center">
            <button
              onClick={handleReset}
              className="p-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-950 dark:hover:bg-slate-850 text-slate-550 dark:text-slate-350 rounded-2xl transition-all cursor-pointer border border-slate-200/20 dark:border-slate-850 shadow-sm"
              title="إعادة تعيين الوقت"
            >
              <RotateCcw size={16} />
            </button>
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-2xl shadow-lg shadow-emerald-600/10 hover:shadow-emerald-500/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              {isRunning ? (
                <>
                  <Pause size={14} fill="white" />
                  <span>إيقاف مؤقت</span>
                </>
              ) : (
                <>
                  <Play size={14} fill="white" />
                  <span>ابدأ التركيز</span>
                </>
              )}
            </button>
          </div>

          {/* Subject active focus dropdown (only visible in study mode) */}
          {timerMode === "study" && (
            <div className="flex flex-col gap-1 w-full text-right">
              <label className="text-[9px] font-bold text-slate-400 pr-1">حدد المادة التي تدرسها حالياً لتسجيل إحصائياتها:</label>
              <select
                value={activeSubject}
                onChange={(e) => setActiveSubject(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl text-[10px] font-bold dark:text-white focus:outline-none"
              >
                {Object.keys(SUBJECTS_EMOJIS).filter(k => k !== "أخرى").map((sub) => (
                  <option key={sub} value={sub}>{SUBJECTS_EMOJIS[sub]} {sub}</option>
                ))}
                <option value="أخرى">🎯 أخرى</option>
              </select>
            </div>
          )}

        </div>

        {/* Right Column: Scheduler Tasks Planner & stats (Span 7) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Daily Study Planner Container */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm flex flex-col gap-4 relative overflow-hidden">
            <div className="absolute top-[-100px] left-[-100px] w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2 mb-1">
              <span className="text-[10px] text-slate-550 font-bold">رتب وجدول جلساتك</span>
              <h3 className="text-sm font-black text-slate-800 dark:text-white">جدول خطة المذاكرة اليومية للمواد</h3>
            </div>

            {/* Tasks list */}
            <div className="flex flex-col gap-2 max-h-[220px] overflow-y-auto pr-1">
              {tasks.length === 0 ? (
                <div className="py-6 text-center text-xs text-slate-400 font-bold bg-slate-50 dark:bg-slate-950/20 border border-slate-200/50 dark:border-slate-850 rounded-2xl">
                  لا توجد مهام دراسية مجدولة لليوم. أضف درساً بالأسفل للبدء!
                </div>
              ) : (
                tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`p-3 border rounded-xl flex items-center justify-between gap-3 text-right transition-all ${
                      task.completed
                        ? "bg-slate-50/50 dark:bg-slate-950/20 border-slate-200/40 dark:border-slate-850 opacity-55"
                        : "bg-white dark:bg-slate-950 border-slate-100 dark:border-slate-850 hover:border-emerald-500/20"
                    }`}
                  >
                    {/* Run in timer, complete & delete actions */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="p-1.5 hover:text-red-500 text-slate-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors cursor-pointer"
                        title="حذف المهمة"
                      >
                        <Trash2 size={12} />
                      </button>
                      
                      {!task.completed && (
                        <button
                          onClick={() => loadTaskToTimer(task)}
                          className="px-2.5 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/10 hover:bg-emerald-600 hover:text-white rounded-lg text-[9px] font-black transition-all cursor-pointer flex items-center gap-1"
                        >
                          <Play size={8} fill="currentColor" />
                          <span>ابدأ الدراسة</span>
                        </button>
                      )}

                      <button
                        onClick={() => toggleTaskCompletion(task.id)}
                        className={`p-1 rounded-lg transition-colors cursor-pointer ${
                          task.completed
                            ? "text-emerald-500 bg-emerald-500/10"
                            : "text-slate-350 hover:text-emerald-500 hover:bg-slate-100 dark:hover:bg-slate-900"
                        }`}
                        title={task.completed ? "تراجع عن الإنجاز" : "تعليم كمكتمل"}
                      >
                        <CheckCircle2 size={16} />
                      </button>
                    </div>

                    {/* Task Label */}
                    <div className="flex-1 flex flex-col gap-0.5 select-text">
                      <span className={`text-xs font-black text-slate-800 dark:text-white ${task.completed ? "line-through text-slate-500" : ""}`}>
                        {task.title}
                      </span>
                      <div className="flex items-center gap-2 text-[9px] text-slate-400 pr-1">
                        <span className="font-bold text-slate-500">{SUBJECTS_EMOJIS[task.subject]} {task.subject}</span>
                        <span>•</span>
                        <span className="font-mono">{task.duration} دقيقة</span>
                      </div>
                    </div>

                  </div>
                ))
              )}
            </div>

            {/* Quick Task Adder Form */}
            <form onSubmit={addTask} className="grid grid-cols-12 gap-2 bg-slate-50 dark:bg-slate-950 p-3 border border-slate-200/50 dark:border-slate-850 rounded-2xl mt-1.5">
              <div className="col-span-12 sm:col-span-5 text-right flex flex-col gap-1">
                <label className="text-[8px] font-bold text-slate-400 pr-1">اسم الدرس أو المهمة:</label>
                <input
                  type="text"
                  required
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="مثال: مراجعة قوانين نيوتن..."
                  className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-lg text-[10px] text-right focus:outline-none dark:text-white"
                />
              </div>
              <div className="col-span-6 sm:col-span-3 text-right flex flex-col gap-1">
                <label className="text-[8px] font-bold text-slate-400 pr-1">المادة الدراسية:</label>
                <select
                  value={newTaskSubject}
                  onChange={(e) => setNewTaskSubject(e.target.value)}
                  className="w-full px-2 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-lg text-[10px] font-bold dark:text-white focus:outline-none"
                >
                  {Object.keys(SUBJECTS_EMOJIS).map((sub) => (
                    <option key={sub} value={sub}>{SUBJECTS_EMOJIS[sub]} {sub}</option>
                  ))}
                </select>
              </div>
              <div className="col-span-4 sm:col-span-2 text-right flex flex-col gap-1">
                <label className="text-[8px] font-bold text-slate-400 pr-1">المدة (د):</label>
                <input
                  type="number"
                  min={5}
                  max={120}
                  value={newTaskDuration}
                  onChange={(e) => setNewTaskDuration(Math.max(5, Math.min(120, Number(e.target.value))))}
                  className="w-full px-2 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-lg text-[10px] text-center font-mono focus:outline-none dark:text-white"
                />
              </div>
              <div className="col-span-2 sm:col-span-2 flex items-end justify-center">
                <button
                  type="submit"
                  className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-[10px] rounded-lg shadow-md transition-all cursor-pointer flex justify-center items-center gap-1.5 h-[28px]"
                >
                  <PlusCircle size={12} />
                  <span className="hidden sm:inline">أضف</span>
                </button>
              </div>
            </form>

          </div>

          {/* Quick Study stats dashboard and details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Total progress stats card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-3xl shadow-sm flex flex-col justify-between h-40 relative overflow-hidden">
              <div className="flex justify-between items-center">
                <Flame className="text-amber-500 animate-pulse" size={20} />
                <span className="text-[10px] text-slate-500 font-extrabold">مجموع الدقائق المنجزة اليوم</span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-3xl font-black text-slate-900 dark:text-white font-mono">{totalStudyMinutes}</span>
                <span className="text-[10px] text-slate-400 font-bold mt-1">دقيقة مذاكرة حقيقية مسجلة</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-950 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 transition-all duration-500"
                  style={{ width: `${Math.min(totalStudyMinutes, 180) / 1.8}%` }}
                />
              </div>
            </div>

            {/* Breakdown stats cards */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-3xl shadow-sm flex flex-col justify-between h-40 overflow-hidden text-right">
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-1.5">
                <BarChart2 className="text-emerald-500" size={16} />
                <span className="text-[10px] text-slate-500 font-extrabold">معدل مذاكرة المواد اليوم</span>
              </div>
              <div className="flex flex-col gap-1 overflow-y-auto max-h-[85px] text-[10px] pr-0.5">
                {Object.keys(subjectStats).map((sub) => {
                  const minutes = subjectStats[sub];
                  if (minutes === 0) return null;
                  return (
                    <div key={sub} className="flex justify-between items-center border-b border-slate-100/50 dark:border-slate-900/50 py-0.5">
                      <span className="font-mono text-emerald-500 font-extrabold">{minutes} د</span>
                      <span className="font-bold text-slate-400">{SUBJECTS_EMOJIS[sub]} {sub}</span>
                    </div>
                  );
                })}
                {Object.values(subjectStats).reduce((a, b) => a + b, 0) === 0 && (
                  <div className="text-center text-slate-400 py-3 font-semibold">ابدأ في دراسة بعض الدروس لترى إحصائياتك هنا!</div>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* FAQs or helpful notes */}
      <section className="bg-slate-100 dark:bg-slate-950/40 border border-slate-200/50 dark:border-slate-850 p-5 rounded-3xl">
        <h3 className="text-xs font-black text-slate-800 dark:text-white mb-2 flex items-center gap-1 justify-end">
          <Clock size={14} />
          <span>فوائد استخدام مرتب ومؤقت الوقت الدراسي</span>
        </h3>
        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed text-justify">
          تعتمد طريقة بومودورو (Pomodoro Technique) على تقسيم وقت الدراسة إلى فترات زمنية محددة مدتها 25 دقيقة تفصلها استراحات قصيرة. هذه الطريقة تساعد طلاب المسار المتقدم على مكافحة التشتت والملل، وتثبيت المعلومات العلمية الصعبة (مثل التفاضل والمتجهات ووحدة المناعة) في الذاكرة طويلة المدى، خاصة عند المراجعة المكثفة لهياكل وزارة التربية والتعليم قبل الامتحانات النهائية.
        </p>
      </section>

      {/* rights copyrights */}
      <div className="text-center text-[10px] text-slate-600 flex justify-between items-center border-t border-slate-200 dark:border-slate-850 pt-4 mt-2">
        <span>تليجرام: t.me/Advvvv11</span>
        <span className="font-semibold text-emerald-500">أكاديمية ADVVVV11 للامتحانات الذكية والمراجعات 2026 • حمد العبدولي</span>
      </div>

    </div>
  );
}
