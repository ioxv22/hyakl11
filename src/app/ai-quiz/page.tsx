"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, HelpCircle, Brain, RefreshCcw, Award, Check, X, ShieldAlert, Timer, FileText, Image, Trash2, Loader2 } from "lucide-react";
import confetti from "canvas-confetti";


interface Question {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

// Helper to dynamically load external scripts from CDN
const loadScript = (src: string): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(false);
      return;
    }
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.head.appendChild(script);
  });
};


export default function AIQuizPage() {
  const [structureInput, setStructureInput] = useState("");
  const [subject, setSubject] = useState("english");
  const [numQuestions, setNumQuestions] = useState(10); // Default to 10
  const [difficulty, setDifficulty] = useState("متوسط");

  // File & Vision uploading states
  const [imageFile, setImageFile] = useState<string | null>(null); // base64 representation
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [parsingFile, setParsingFile] = useState(false);
  const [parseStatus, setParseStatus] = useState("");


  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [errorMsg, setErrorMsg] = useState("");

  // Quiz taking state
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Timer state
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [timerActive, setTimerActive] = useState(false);

  const loadingQuotes = [
    "يا هلا والله! عم نحلل بنود هيكل الوزارة المرفوع بدقة...",
    "عم نفحص لقطة الشاشة/الصورة المرفقة ونستخرج التكافؤات والرموز...",
    "عم نتصل بنماذج الذكاء الاصطناعي السحابية وبنولد الأسئلة...",
    "عم نصمم خيارات ممتازة ومحاكية للاختبار النهائي...",
    "عم نراجع التفاسير الكيميائية واللغوية والرياضية بالعربي عشانك...",
    "خلصنا تقريباً! عم نجهز قاعة الامتحانات التفاعلية الفخمة..."
  ];

  // Rotate loading steps
  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setLoadingStep(prev => (prev + 1) % loadingQuotes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [loading]);

  // Countdown timer
  useEffect(() => {
    if (!timerActive || timeLeft <= 0) {
      if (timeLeft === 0 && !quizFinished) {
        setQuizFinished(true);
      }
      return;
    }
    const timer = setTimeout(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, timerActive, quizFinished]);

  // File Upload handler (PDF, Word, Txt context reader)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type.startsWith("image/")) {
      setErrorMsg("رجاءً ارفع الصور في حقل لقطات الشاشة المخصص للرؤية البصرية.");
      return;
    }

    setParsingFile(true);
    setErrorMsg("");
    setParseStatus("جاري تهيئة الملف...");

    try {
      const fileName = file.name;
      const fileExtension = fileName.split(".").pop()?.toLowerCase();

      if (fileExtension === "pdf") {
        setParseStatus("جاري تحميل قارئ PDF الذكي...");
        const scriptLoaded = await loadScript("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js");
        if (!scriptLoaded || !(window as any).pdfjsLib) {
          throw new Error("فشل تحميل قارئ الـ PDF. يرجى التحقق من اتصالك بالإنترنت.");
        }

        // Configure PDF.js worker
        (window as any).pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

        setParseStatus("جاري قراءة مستند الـ PDF...");
        const arrayBuffer = await file.arrayBuffer();
        const loadingTask = (window as any).pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) });
        const pdf = await loadingTask.promise;
        
        let fullText = "";
        const maxPages = Math.min(pdf.numPages, 40); // safety cap at 40 pages to prevent token overflow
        
        for (let i = 1; i <= maxPages; i++) {
          setParseStatus(`جاري قراءة الصفحة ${i} من أصل ${pdf.numPages}...`);
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map((item: any) => item.str).join(" ");
          fullText += `[صفحة ${i}]:\n${pageText}\n\n`;
        }

        if (!fullText.trim()) {
          throw new Error("لم نتمكن من استخراج أي نصوص من ملف الـ PDF. قد يكون الملف ممسوحاً ضوئياً كصور.");
        }

        // Auto-detect subject from file name or content
        const detectAndSetSubject = (name: string, content: string) => {
          const textToSearch = (name + " " + content).toLowerCase();
          if (textToSearch.includes("كيمياء") || textToSearch.includes("chemistry") || textToSearch.includes("كربونات") || textToSearch.includes("عضوية") || textToSearch.includes("روابط") || textToSearch.includes("تفاعل") || textToSearch.includes("غاز") || textToSearch.includes("جدول دوري") || textToSearch.includes("عنصر") || textToSearch.includes("هيدروكربونات")) {
            setSubject("chemistry");
          } else if (textToSearch.includes("فيزياء") || textToSearch.includes("physics") || textToSearch.includes("قوة") || textToSearch.includes("حركة") || textToSearch.includes("تسارع") || textToSearch.includes("متجه") || textToSearch.includes("شغل") || textToSearch.includes("طاقة") || textToSearch.includes("سرعة") || textToSearch.includes("جسر")) {
            setSubject("physics");
          } else if (textToSearch.includes("أحياء") || textToSearch.includes("biology") || textToSearch.includes("خلية") || textToSearch.includes("مناعة") || textToSearch.includes("جسم") || textToSearch.includes("دم") || textToSearch.includes("مرض") || textToSearch.includes("تنفس") || textToSearch.includes("جراثيم")) {
            setSubject("biology");
          } else if (textToSearch.includes("رياضيات") || textToSearch.includes("math") || textToSearch.includes("تفاضل") || textToSearch.includes("تكامل") || textToSearch.includes("حساب") || textToSearch.includes("هندسة") || textToSearch.includes("مصفوفة") || textToSearch.includes("دالة") || textToSearch.includes("زاوية") || textToSearch.includes("ضرب")) {
            setSubject("math");
          } else if (textToSearch.includes("english") || textToSearch.includes("grammar") || textToSearch.includes("reading") || textToSearch.includes("writing")) {
            setSubject("english");
          }
        };

        const truncatedText = fullText.slice(0, 5000);
        setFileContent(truncatedText);
        setUploadedFileName(fileName);
        setStructureInput(prev => `${prev}\n\n[ملف PDF مرفق: ${fileName}]`);
        detectAndSetSubject(fileName, truncatedText);
        setParseStatus(`تمت قراءة ${pdf.numPages} صفحات وتحديد المادة بنجاح!`);
      } 
      else if (fileExtension === "docx") {
        setParseStatus("جاري تحميل قارئ مستندات Word...");
        const scriptLoaded = await loadScript("https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js");
        if (!scriptLoaded || !(window as any).mammoth) {
          throw new Error("فشل تحميل قارئ ملفات Word. يرجى التحقق من اتصالك بالإنترنت.");
        }

        setParseStatus("جاري قراءة ملف Word...");
        const arrayBuffer = await file.arrayBuffer();
        const result = await (window as any).mammoth.extractRawText({ arrayBuffer });
        const text = result.value;

        if (!text.trim()) {
          throw new Error("ملف الـ Word فارغ أو لا يحتوي على نصوص مقروءة.");
        }

        // Auto-detect subject from file name or content
        const detectAndSetSubject = (name: string, content: string) => {
          const textToSearch = (name + " " + content).toLowerCase();
          if (textToSearch.includes("كيمياء") || textToSearch.includes("chemistry") || textToSearch.includes("كربونات") || textToSearch.includes("عضوية") || textToSearch.includes("روابط") || textToSearch.includes("تفاعل") || textToSearch.includes("غاز") || textToSearch.includes("جدول دوري") || textToSearch.includes("عنصر") || textToSearch.includes("هيدروكربونات")) {
            setSubject("chemistry");
          } else if (textToSearch.includes("فيزياء") || textToSearch.includes("physics") || textToSearch.includes("قوة") || textToSearch.includes("حركة") || textToSearch.includes("تسارع") || textToSearch.includes("متجه") || textToSearch.includes("شغل") || textToSearch.includes("طاقة") || textToSearch.includes("سرعة") || textToSearch.includes("جسر")) {
            setSubject("physics");
          } else if (textToSearch.includes("أحياء") || textToSearch.includes("biology") || textToSearch.includes("خلية") || textToSearch.includes("مناعة") || textToSearch.includes("جسم") || textToSearch.includes("دم") || textToSearch.includes("مرض") || textToSearch.includes("تنفس") || textToSearch.includes("جراثيم")) {
            setSubject("biology");
          } else if (textToSearch.includes("رياضيات") || textToSearch.includes("math") || textToSearch.includes("تفاضل") || textToSearch.includes("تكامل") || textToSearch.includes("حساب") || textToSearch.includes("هندسة") || textToSearch.includes("مصفوفة") || textToSearch.includes("دالة") || textToSearch.includes("زاوية") || textToSearch.includes("ضرب")) {
            setSubject("math");
          } else if (textToSearch.includes("english") || textToSearch.includes("grammar") || textToSearch.includes("reading") || textToSearch.includes("writing")) {
            setSubject("english");
          }
        };

        const truncatedText = text.slice(0, 5000);
        setFileContent(truncatedText);
        setUploadedFileName(fileName);
        setStructureInput(prev => `${prev}\n\n[مستند Word مرفق: ${fileName}]`);
        detectAndSetSubject(fileName, truncatedText);
        setParseStatus("تمت قراءة ملف Word وتحديد المادة بنجاح!");
      } 
      else {
        // Handle normal txt/csv/json text files
        setParseStatus("جاري قراءة الملف النصي...");
        const reader = new FileReader();
        reader.onload = (event) => {
          const text = event.target?.result as string;
          if (text) {
            // Auto-detect subject from file name or content
            const detectAndSetSubject = (name: string, content: string) => {
              const textToSearch = (name + " " + content).toLowerCase();
              if (textToSearch.includes("كيمياء") || textToSearch.includes("chemistry") || textToSearch.includes("كربونات") || textToSearch.includes("عضوية") || textToSearch.includes("روابط") || textToSearch.includes("تفاعل") || textToSearch.includes("غاز") || textToSearch.includes("جدول دوري") || textToSearch.includes("عنصر") || textToSearch.includes("هيدروكربونات")) {
                setSubject("chemistry");
              } else if (textToSearch.includes("فيزياء") || textToSearch.includes("physics") || textToSearch.includes("قوة") || textToSearch.includes("حركة") || textToSearch.includes("تسارع") || textToSearch.includes("متجه") || textToSearch.includes("شغل") || textToSearch.includes("طاقة") || textToSearch.includes("سرعة") || textToSearch.includes("جسر")) {
                setSubject("physics");
              } else if (textToSearch.includes("أحياء") || textToSearch.includes("biology") || textToSearch.includes("خلية") || textToSearch.includes("مناعة") || textToSearch.includes("جسم") || textToSearch.includes("دم") || textToSearch.includes("مرض") || textToSearch.includes("تنفس") || textToSearch.includes("جراثيم")) {
                setSubject("biology");
              } else if (textToSearch.includes("رياضيات") || textToSearch.includes("math") || textToSearch.includes("تفاضل") || textToSearch.includes("تكامل") || textToSearch.includes("حساب") || textToSearch.includes("هندسة") || textToSearch.includes("مصفوفة") || textToSearch.includes("دالة") || textToSearch.includes("زاوية") || textToSearch.includes("ضرب")) {
                setSubject("math");
              } else if (textToSearch.includes("english") || textToSearch.includes("grammar") || textToSearch.includes("reading") || textToSearch.includes("writing")) {
                setSubject("english");
              }
            };

            const truncatedText = text.slice(0, 5000);
            setFileContent(truncatedText);
            setUploadedFileName(fileName);
            setStructureInput(prev => `${prev}\n\n[مستند نصي مرفق: ${fileName}]`);
            detectAndSetSubject(fileName, truncatedText);
            setParseStatus("تمت قراءة الملف النصي وتحديد المادة بنجاح!");
          } else {
            setErrorMsg("فشل قراءة الملف النصي.");
            setParsingFile(false);
          }
        };
        reader.readAsText(file);
        return; // return early as FileReader handles callback
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "حدث خطأ أثناء معالجة الملف.");
      setParseStatus("");
    } finally {
      const fileExtension = file.name.split(".").pop()?.toLowerCase();
      if (fileExtension === "pdf" || fileExtension === "docx") {
        setParsingFile(false);
      } else {
        setTimeout(() => setParsingFile(false), 500);
      }
    }
  };


  // Image Upload handler (Base64 conversion)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMsg("الرجاء اختيار صورة لقطة شاشة صالحة (PNG, JPG, JPEG).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (base64) {
        setImageFile(base64);
        setErrorMsg("");
      }
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImageFile(null);
  };

  const removeFile = () => {
    setFileContent(null);
    setUploadedFileName(null);
  };

  const handleGenerateQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!structureInput.trim() && !imageFile) {
      setErrorMsg("يرجى كتابة الهيكل، أو إرفاق ملف نصي، أو طرش لقطة شاشة للهيكل الدراسي للبدء.");
      return;
    }

    setLoading(true);
    setLoadingStep(0);
    setErrorMsg("");
    setQuizQuestions([]);

    try {
      const res = await fetch("/api/generate-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          structure: structureInput.trim(),
          subject,
          numQuestions,
          difficulty,
          image: imageFile,
          fileContent: fileContent
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setQuizQuestions(data);
          // Start quiz
          setCurrentIdx(0);
          setSelectedOption(null);
          setChecked(false);
          setScore(0);
          setQuizFinished(false);
          setTimeLeft(numQuestions * 120); // 2 minutes per question
          setTimerActive(true);
        } else {
          setErrorMsg("فشل توليد الاختبار. رجاءً تأكد من كتابة هيكل واضح أو إرفاق صورة واضحة وحاول مرة أخرى.");
        }
      } else {
        setErrorMsg("حدث خطأ أثناء التواصل مع خوادم الذكاء الاصطناعي. يرجى المحاولة لاحقاً.");
      }
    } catch {
      setErrorMsg("خطأ في الاتصال، يرجى التحقق من جودة الإنترنت.");
    } finally {
      setLoading(false);
    }
  };

  const handleOptionClick = (idx: number) => {
    if (checked) return;
    setSelectedOption(idx);
  };

  const handleCheck = () => {
    if (selectedOption === null || checked) return;
    setChecked(true);
    if (selectedOption === quizQuestions[currentIdx].answerIndex) {
      setScore(prev => prev + 1);
      // Nice pop confetti for correct answer
      confetti({
        particleCount: 40,
        spread: 40,
        origin: { y: 0.8 }
      });
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setChecked(false);
    if (currentIdx < quizQuestions.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setTimerActive(false);
      setQuizFinished(true);
      // Large confetti celebration on quiz completion
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.7 }
      });
    }
  };

  const handleRestart = () => {
    setQuizQuestions([]);
    setQuizFinished(false);
    setScore(0);
    setCurrentIdx(0);
    setStructureInput("");
    setImageFile(null);
    setFileContent(null);
    setUploadedFileName(null);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const activeQuestion = quizQuestions[currentIdx];

  return (
    <div className="min-h-[85vh] py-8 px-4 flex flex-col gap-6 max-w-3xl mx-auto text-right">
      
      {/* Back Button and Title */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-5">
        <Link
          href="/"
          className="p-2.5 bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-400 rounded-2xl transition-all flex items-center gap-1.5 text-xs font-bold"
        >
          <ArrowRight size={14} />
          <span>الرئيسية</span>
        </Link>
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-2xl animate-pulse">
            <Brain size={28} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl sm:text-2xl font-black text-white">صانع الاختبارات بالذكاء الاصطناعي 🧠✨</h1>
            <p className="text-xs text-slate-400 mt-1">طرش الهيكل، الصور، أو الملازم ووّلد فوراً كويز بالعدد والصعوبة المطلوبة!</p>
          </div>
        </div>
      </div>

      {/* ─── STATE 1: Form & Customizer ────────────────────────────────────────── */}
      {quizQuestions.length === 0 && !loading && (
        <form onSubmit={handleGenerateQuiz} className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 flex flex-col gap-6 relative overflow-hidden backdrop-blur-xl shadow-2xl">
          
          <div className="absolute top-[-100px] left-[-100px] w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

          {errorMsg && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold rounded-2xl flex items-center gap-2">
              <ShieldAlert size={16} />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Pasting Structure Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-extrabold text-slate-350 flex items-center gap-1 justify-start">
              <Sparkles size={12} className="text-emerald-500" />
              <span>اكتب أو الصق هيكل المادة أو المنهج الدراسي هنا:</span>
            </label>
            <textarea
              rows={5}
              value={structureInput}
              onChange={(e) => setStructureInput(e.target.value)}
              placeholder="اكتب هنا بنود الهيكل، أو دع الحقول المرفقة أدناه تقرأ الملفات والصور المرفقة نيابة عنك..."
              className="w-full p-4 bg-slate-950 border border-slate-800 focus:border-emerald-500 text-xs sm:text-sm text-white rounded-2xl focus:outline-none transition-all leading-relaxed placeholder:text-slate-650"
            />
          </div>

          {/* Multimodal Uploaders: Files and Images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* File Uploader (Advanced PDF/Word/Text Reader) */}
            <div className="bg-slate-950/60 border border-slate-850 p-4 rounded-2xl flex flex-col gap-2 relative">
              <span className="text-[10px] text-slate-500 font-extrabold block">قراءة ملفات المنهج والهيكل الذكية (PDF/Word/Txt):</span>
              {parsingFile ? (
                <div className="flex flex-col items-center justify-center gap-2 py-4 border border-dashed border-emerald-500/40 bg-emerald-950/10 rounded-xl animate-pulse">
                  <Loader2 size={18} className="text-emerald-500 animate-spin" />
                  <span className="text-[10px] text-emerald-400 font-extrabold">{parseStatus}</span>
                </div>
              ) : uploadedFileName ? (
                <div className="flex flex-col gap-1.5 p-2 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">
                  <div className="flex items-center justify-between">
                    <button type="button" onClick={removeFile} className="p-1 hover:text-red-500 transition-colors cursor-pointer" title="حذف الملف">
                      <Trash2 size={14} />
                    </button>
                    <span className="text-xs text-slate-300 font-bold truncate max-w-[180px]">{uploadedFileName}</span>
                  </div>
                  {parseStatus && (
                    <span className="text-[9px] text-emerald-400/90 font-bold text-right pr-1 leading-none">{parseStatus}</span>
                  )}
                </div>
              ) : (
                <label className="flex items-center justify-center gap-2 py-3 border border-dashed border-slate-800 hover:border-emerald-500/50 rounded-xl cursor-pointer text-slate-400 hover:text-emerald-400 transition-all text-xs font-bold">
                  <FileText size={16} />
                  <span>ارفق مستند PDF أو Word أو TXT 📄</span>
                  <input
                    type="file"
                    accept=".txt,.csv,.json,.pdf,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>


            {/* Vision Image Uploader (Base64 multi-modal screenshot reader) */}
            <div className="bg-slate-950/60 border border-slate-850 p-4 rounded-2xl flex flex-col gap-2 relative">
              <span className="text-[10px] text-slate-500 font-extrabold block">قراءة لقطة شاشة الهيكل بالـ AI Vision:</span>
              {imageFile ? (
                <div className="flex items-center justify-between p-2 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">
                  <button type="button" onClick={removeImage} className="p-1 hover:text-red-500 transition-colors">
                    <Trash2 size={14} />
                  </button>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-500 font-bold">(لقطة شاشة جاهزة)</span>
                    <img src={imageFile} alt="Syllabus screenshot" className="w-8 h-8 rounded-lg object-cover border border-slate-800" />
                  </div>
                </div>
              ) : (
                <label className="flex items-center justify-center gap-2 py-3 border border-dashed border-slate-800 hover:border-emerald-500/50 rounded-xl cursor-pointer text-slate-400 hover:text-emerald-400 transition-all text-xs font-bold">
                  <Image size={16} />
                  <span>ارفق لقطة شاشة للهيكل 📸</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Subject, Difficulty & Highly Flexible Question counts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-extrabold text-slate-400">المادة الدراسية الأساسية:</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500 text-xs text-white"
              >
                <option value="english">إنجليزي (English) 🇬🇧</option>
                <option value="math">الرياضيات (Math) 📐</option>
                <option value="physics">الفيزياء (Physics) ⚡</option>
                <option value="chemistry">الكيمياء (Chemistry) 🧪</option>
                <option value="biology">الأحياء (Biology) 🧬</option>
              </select>
            </div>

            {/* Slider + direct number input for arbitrary counts (up to 100 questions!) */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center text-xs font-extrabold text-slate-400 px-0.5">
                <span className="text-emerald-500 font-black font-mono">({numQuestions}) سؤال</span>
                <label>عدد الأسئلة المطلوبة:</label>
              </div>
              <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl">
                <input
                  type="number"
                  min={3}
                  max={100}
                  value={numQuestions}
                  onChange={(e) => setNumQuestions(Math.min(100, Math.max(3, Number(e.target.value))))}
                  className="w-12 bg-transparent text-center text-xs font-black text-white focus:outline-none font-mono"
                />
                <input
                  type="range"
                  min={3}
                  max={100}
                  value={numQuestions}
                  onChange={(e) => setNumQuestions(Number(e.target.value))}
                  className="flex-1 accent-emerald-500 h-1 cursor-pointer rounded-lg bg-slate-800"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-extrabold text-slate-400">مستوى الصعوبة المحاكي:</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500 text-xs text-white"
              >
                <option value="سهل">سهل (Easy)</option>
                <option value="متوسط">متوسط (Medium)</option>
                <option value="وزاري متقدم">وزاري متقدم (MOE Advanced)</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm rounded-2xl transition-all shadow-lg shadow-emerald-950/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles size={16} className="animate-pulse" />
            <span>توليد كويز محاكي بالذكاء الاصطناعي 🚀</span>
          </button>

        </form>
      )}

      {/* ─── STATE 2: AI Generating Loading screen ─────────────────────────────────── */}
      {loading && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 flex flex-col items-center justify-center text-center gap-6 shadow-2xl relative min-h-[300px]">
          
          {/* Animated Flask & Atoms */}
          <div className="relative w-20 h-20 flex items-center justify-center mb-2">
            <div className="absolute w-20 h-20 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
            <Brain size={40} className="text-emerald-500 animate-pulse" />
          </div>

          <h3 className="text-base sm:text-lg font-black text-white">جاري صياغة وتأمين الاختبار المحاكي... 🧠✨</h3>
          
          <div className="bg-slate-950 border border-slate-850 p-4 rounded-2xl w-full max-w-md animate-pulse">
            <p className="text-xs text-emerald-400 font-extrabold leading-relaxed">
              {loadingQuotes[loadingStep]}
            </p>
          </div>
          
          <span className="text-[10px] text-slate-500">يرجى الانتظار، تستغرق العملية حوالي 15-30 ثانية لتصميم اختبارات ذات معايير دقيقة.</span>

        </div>
      )}

      {/* ─── STATE 3: Interactive Exam taking Session ─────────────────────────────── */}
      {quizQuestions.length > 0 && !quizFinished && activeQuestion && (
        <div className="bg-slate-900 border border-slate-850 rounded-3xl p-5 sm:p-6 flex flex-col gap-6 shadow-2xl">
          
          {/* Timer and score top bar */}
          <div className="flex justify-between items-center border-b border-slate-800 pb-3.5">
            <div className="flex items-center gap-1.5 text-xs font-black text-amber-500">
              <Timer size={14} className="animate-pulse" />
              <span>الوقت المتبقي:</span>
              <span className="font-mono">{formatTime(timeLeft)}</span>
            </div>
            
            <div className="flex items-center gap-1 text-[10px] text-slate-400 font-extrabold bg-slate-950 px-3 py-1 rounded-xl border border-slate-850">
              <span>السؤال:</span>
              <span className="text-white font-mono font-black">{currentIdx + 1}</span>
              <span>من</span>
              <span className="text-white font-mono font-black">{quizQuestions.length}</span>
            </div>
          </div>

          {/* Question Text display */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] text-emerald-500 font-black">السؤال المحاكي للهيكل:</span>
            <h2 className="text-sm sm:text-base font-black text-white leading-relaxed text-justify bg-slate-950 p-5 border border-slate-850 rounded-2xl whitespace-pre-wrap select-text">
              {activeQuestion.question}
            </h2>
          </div>

          {/* Options List */}
          <div className="flex flex-col gap-3">
            {activeQuestion.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              let optStyle = "bg-slate-950 hover:bg-slate-900 border-slate-850 text-slate-300";

              if (isSelected && !checked) {
                optStyle = "bg-emerald-950/20 border-emerald-500 text-emerald-400 font-bold";
              }

              if (checked) {
                if (idx === activeQuestion.answerIndex) {
                  optStyle = "bg-emerald-950/30 border-emerald-500 text-emerald-400 font-bold";
                } else if (isSelected) {
                  optStyle = "bg-red-950/30 border-red-500 text-red-400 font-bold";
                } else {
                  optStyle = "bg-slate-950/30 border-slate-950 text-slate-700 opacity-40";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(idx)}
                  className={`w-full text-right p-4 border rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex justify-between items-center gap-4 ${optStyle}`}
                >
                  <div className="flex items-center justify-center shrink-0">
                    {checked && idx === activeQuestion.answerIndex && (
                      <div className="p-1 bg-emerald-500 text-slate-950 rounded-full">
                        <Check size={10} strokeWidth={4} />
                      </div>
                    )}
                    {checked && isSelected && idx !== activeQuestion.answerIndex && (
                      <div className="p-1 bg-red-500 text-white rounded-full">
                        <X size={10} strokeWidth={4} />
                      </div>
                    )}
                    {!checked && (
                      <div className={`w-3.5 h-3.5 border rounded-full ${isSelected ? "border-emerald-500 bg-emerald-500/20" : "border-slate-800"}`} />
                    )}
                  </div>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Action buttons footer */}
          <div className="flex justify-between items-center pt-4 border-t border-slate-800">
            {checked ? (
              <button
                onClick={handleNext}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                {currentIdx === quizQuestions.length - 1 ? "إنهاء وتقديم الاختبار" : "السؤال التالي"}
              </button>
            ) : (
              <button
                onClick={handleCheck}
                disabled={selectedOption === null}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all disabled:opacity-40 disabled:hover:bg-emerald-600 cursor-pointer"
              >
                تأكيد الإجابة
              </button>
            )}
            
            <span className="text-[10px] text-slate-500 font-extrabold">الدرجة الحالية: {score} / {quizQuestions.length}</span>
          </div>

          {/* Explanation Box */}
          {checked && (
            <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl text-right animate-fade-in">
              <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-black mb-1.5">
                <HelpCircle size={12} />
                <span>تفسير الحل العلمي والأكاديمي:</span>
              </div>
              <p className="text-[11px] text-slate-350 leading-relaxed">{activeQuestion.explanation}</p>
            </div>
          )}

        </div>
      )}

      {/* ─── STATE 4: Final Score & Evaluation ─────────────────────────────────── */}
      {quizFinished && (
        <div className="bg-slate-900 border border-slate-850 rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center text-center gap-6 shadow-2xl relative overflow-hidden animate-scale-in">
          
          <div className="absolute top-[-100px] left-[-100px] w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="p-4 bg-emerald-500/10 text-emerald-500 rounded-3xl animate-bounce">
            <Award size={48} />
          </div>

          <h2 className="text-lg sm:text-xl font-black text-white">تم إكمال الاختبار بنجاح يا بطل! 🎓🎉</h2>
          
          <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
            لقد أنهيت بنجاح محاكاة الكويز المولد بالذكاء الاصطناعي لهيكل مادتك. إليك نتائجك المسجلة:
          </p>

          <div className="grid grid-cols-2 gap-4 w-full max-w-sm my-2">
            <div className="p-4 bg-slate-950 border border-slate-850 rounded-2xl flex flex-col items-center gap-0.5">
              <span className="text-[10px] text-slate-500 font-bold">الدرجة المحققة</span>
              <span className="text-base sm:text-lg font-black text-white font-mono">{score} / {quizQuestions.length}</span>
            </div>
            <div className="p-4 bg-slate-950 border border-slate-850 rounded-2xl flex flex-col items-center gap-0.5">
              <span className="text-[10px] text-slate-500 font-bold">النسبة المئوية</span>
              <span className="text-base sm:text-lg font-black text-emerald-400 font-mono">{Math.round((score / quizQuestions.length) * 100)}%</span>
            </div>
          </div>

          <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl max-w-sm text-right">
            <span className="text-[10px] text-emerald-400 font-black">تقييم الأداء بالذكاء الاصطناعي:</span>
            <p className="text-[11px] text-slate-300 leading-relaxed mt-1">
              {score === quizQuestions.length
                ? "أداء خرافي أسطوري! إجابات مثالية تعكس استعداداً مطلقاً للامتحان الوزاري. استمر بهذا المستوى العالي يا بطل!"
                : score >= quizQuestions.length * 0.7
                ? "أداء ممتاز جداً! تمتلك فهماً متيناً لبنود الهيكل ومستعد بشكل كبير جداً للامتحان النهائي. راجع الأخطاء القليلة لتضمن الدرجة الكاملة!"
                : "أداء جيد، ولكن تحتاج لمراجعة بعض الدروس وملخصات الـ PDF المتاحة بالأكاديمية لتثبيت معلومات الهيكل أكثر وتجنب الأخطاء الوزارية."}
            </p>
          </div>

          <button
            onClick={handleRestart}
            className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-black rounded-2xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer mt-2"
          >
            <RefreshCcw size={14} />
            <span>توليد كويز جديد لهيكل آخر</span>
          </button>

        </div>
      )}

      {/* Footer Telegram Stamp */}
      <div className="text-center text-[10px] text-slate-600 flex justify-between items-center border-t border-slate-850 pt-4">
        <span>أكاديمية ADVVVV11 للامتحانات الذكية</span>
        <span className="font-semibold text-emerald-500">t.me/Advvvv11 • حمد العبدولي 2026</span>
      </div>

    </div>
  );
}
