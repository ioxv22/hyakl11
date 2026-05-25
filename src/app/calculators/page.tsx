"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Calculator, Award, Sparkles, AlertCircle, BookOpen, CheckCircle, RefreshCcw, Percent, BarChart3, TrendingUp, HelpCircle } from "lucide-react";
import confetti from "canvas-confetti";

// Subject Grade standards
interface SubjectGrade {
  name: string;
  grade: number;
  letter: string;
  points: number;
}

const SUBJECT_LIST = [
  "رياضيات",
  "اجتماعيات",
  "لغة إنجليزية",
  "لغة عربية",
  "كيمياء أو أحياء",
  "فيزياء",
  "تربية إسلامية"
];

// Grade Point Average Conversion
const getLetterAndPoints = (score: number) => {
  if (score >= 95) return { letter: "A+", points: 4.0 };
  if (score >= 90) return { letter: "A", points: 4.0 };
  if (score >= 85) return { letter: "B+", points: 3.5 };
  if (score >= 80) return { letter: "B", points: 3.0 };
  if (score >= 75) return { letter: "C+", points: 2.5 };
  if (score >= 70) return { letter: "C", points: 2.0 };
  if (score >= 65) return { letter: "D+", points: 1.5 };
  if (score >= 60) return { letter: "D", points: 1.0 };
  return { letter: "F", points: 0.0 };
};

const getScoreFromLetter = (letter: string) => {
  switch (letter) {
    case "A+": return 98;
    case "A": return 92;
    case "B+": return 87;
    case "B": return 82;
    case "C+": return 77;
    case "C": return 72;
    case "D+": return 67;
    case "D": return 62;
    default: return 50;
  }
};

export default function GradeCalculatorsPage() {
  const [activeTab, setActiveTab] = useState<"detailed" | "gpa">("detailed");

  // Detailed Calculator states
  const [calcType, setCalcType] = useState<string>("subject_term");
  
  // States for Type 1: مادة واحدة - فصل واحد
  const [t1Term, setT1Term] = useState<number>(1); // 1, 2, 3
  const [t1Teacher, setT1Teacher] = useState<string>("");
  const [t1Exam, setT1Exam] = useState<string>("");

  // States for Type 2: مادة واحدة - سنوي
  const [t2Term1, setT2Term1] = useState<string>("");
  const [t2Term2, setT2Term2] = useState<string>("");
  const [t2Term3, setT2Term3] = useState<string>("");

  // States for Type 3: معدل فصل تفصيلي
  const [t3Term, setT3Term] = useState<number>(1);
  const [t3Grades, setT3Grades] = useState<Record<string, { teacher: string; exam: string }>>(
    SUBJECT_LIST.reduce((acc, sub) => ({ ...acc, [sub]: { teacher: "", exam: "" } }), {})
  );

  // States for Type 4: معدل فصل من الدرجات الجاهزة
  const [t4Grades, setT4Grades] = useState<Record<string, string>>(
    SUBJECT_LIST.reduce((acc, sub) => ({ ...acc, [sub]: "" }), {})
  );

  // States for Type 5: المعدل السنوي لمادة من درجات الفصول
  const [t5Term1, setT5Term1] = useState<string>("");
  const [t5Term2, setT5Term2] = useState<string>("");
  const [t5Term3, setT5Term3] = useState<string>("");

  // States for Type 6: من معدلات الفصول الثلاثة
  const [t6Term1, setT6Term1] = useState<string>("");
  const [t6Term2, setT6Term2] = useState<string>("");
  const [t6Term3, setT6Term3] = useState<string>("");

  // States for Type 7: المعدل السنوي الكامل (الجدول العملاق)
  const [t7Grades, setT7Grades] = useState<Record<string, { t1: string; t2: string; t3: string }>>(
    SUBJECT_LIST.reduce((acc, sub) => ({ ...acc, [sub]: { t1: "", t2: "", t3: "" } }), {})
  );

  // GPA Calculator states
  const [gpaInputs, setGpaInputs] = useState<Record<string, { type: "numeric" | "letter"; score: string; letter: string }>>(
    SUBJECT_LIST.reduce((acc, sub) => ({ ...acc, [sub]: { type: "numeric", score: "", letter: "A" } }), {})
  );

  const [detailedResult, setDetailedResult] = useState<any>(null);
  const [gpaResult, setGpaResult] = useState<any>(null);

  // Reset function for detailed
  const resetDetailed = () => {
    setT1Teacher(""); setT1Exam("");
    setT2Term1(""); setT2Term2(""); setT2Term3("");
    setT3Grades(SUBJECT_LIST.reduce((acc, sub) => ({ ...acc, [sub]: { teacher: "", exam: "" } }), {}));
    setT4Grades(SUBJECT_LIST.reduce((acc, sub) => ({ ...acc, [sub]: "" }), {}));
    setT5Term1(""); setT5Term2(""); setT5Term3("");
    setT6Term1(""); setT6Term2(""); setT6Term3("");
    setT7Grades(SUBJECT_LIST.reduce((acc, sub) => ({ ...acc, [sub]: { t1: "", t2: "", t3: "" } }), {}));
    setDetailedResult(null);
  };

  // Reset function for GPA
  const resetGPA = () => {
    setGpaInputs(SUBJECT_LIST.reduce((acc, sub) => ({ ...acc, [sub]: { type: "numeric", score: "", letter: "A" } }), {}));
    setGpaResult(null);
  };

  // 📝 1. مادة واحدة - فصل واحد
  const calculateSubjectTerm = () => {
    const teacher = parseFloat(t1Teacher);
    const exam = parseFloat(t1Exam);

    if (isNaN(teacher) || isNaN(exam) || teacher < 0 || teacher > 100 || exam < 0 || exam > 100) {
      alert("الرجاء إدخال درجات صحيحة بين 0 و 100");
      return;
    }

    let finalGrade = 0;
    let distributionText = "";

    if (t1Term === 1) {
      // T1: 10% Teacher + 30% Exam (Total 40% of year)
      // Out of 100: 25% Teacher + 75% Exam
      finalGrade = (teacher * 0.25) + (exam * 0.75);
      distributionText = "الفصل الأول (10% أعمال معلم + 30% امتحان وزاري)";
    } else if (t1Term === 2) {
      // T2: 10% Teacher + 10% Exam (Total 20% of year)
      // Out of 100: 50% Teacher + 50% Exam
      finalGrade = (teacher * 0.50) + (exam * 0.50);
      distributionText = "الفصل الثاني (10% أعمال معلم + 10% امتحان مدرسي)";
    } else {
      // T3: 10% Teacher + 30% Exam (Total 40% of year)
      // Out of 100: 25% Teacher + 75% Exam
      finalGrade = (teacher * 0.25) + (exam * 0.75);
      distributionText = "الفصل الثالث (10% أعمال معلم + 30% امتحان وزاري)";
    }

    const { letter, points } = getLetterAndPoints(finalGrade);
    
    setDetailedResult({
      type: "subject_term",
      finalGrade: finalGrade.toFixed(2),
      letter,
      points,
      distributionText,
      teacher,
      exam
    });
    
    confetti({ particleCount: 30, spread: 40 });
  };

  // 📊 2. مادة واحدة - سنوي
  const calculateSubjectAnnual = () => {
    const t1 = parseFloat(t2Term1);
    const t2 = parseFloat(t2Term2);
    const t3 = parseFloat(t2Term3);

    if (isNaN(t1) || isNaN(t2) || isNaN(t3) || t1 < 0 || t1 > 100 || t2 < 0 || t2 > 100 || t3 < 0 || t3 > 100) {
      alert("الرجاء إدخال درجات صحيحة بين 0 و 100 لجميع الفصول");
      return;
    }

    // Annual Grade = T1*0.4 + T2*0.2 + T3*0.4
    const annualGrade = (t1 * 0.40) + (t2 * 0.20) + (t3 * 0.40);
    const { letter, points } = getLetterAndPoints(annualGrade);

    setDetailedResult({
      type: "subject_annual",
      finalGrade: annualGrade.toFixed(2),
      letter,
      points,
      t1,
      t2,
      t3
    });

    confetti({ particleCount: 30, spread: 40 });
  };

  // 🎓 3. معدل فصل (تفصيلي)
  const calculateTermDetailed = () => {
    let totalGrade = 0;
    let count = 0;
    const subjectsCalculated: any[] = [];

    for (const sub of SUBJECT_LIST) {
      const g = t3Grades[sub];
      const teacher = parseFloat(g.teacher);
      const exam = parseFloat(g.exam);

      if (isNaN(teacher) || isNaN(exam)) continue;

      let subGrade = 0;
      if (t3Term === 1 || t3Term === 3) {
        subGrade = (teacher * 0.25) + (exam * 0.75);
      } else {
        subGrade = (teacher * 0.50) + (exam * 0.50);
      }

      totalGrade += subGrade;
      count++;
      subjectsCalculated.push({
        name: sub,
        grade: subGrade.toFixed(1),
        ...getLetterAndPoints(subGrade)
      });
    }

    if (count === 0) {
      alert("يرجى تعبئة درجات مادة واحدة على الأقل لإجراء الحساب!");
      return;
    }

    const termAverage = totalGrade / count;
    const { letter, points } = getLetterAndPoints(termAverage);

    setDetailedResult({
      type: "term_detailed",
      termAverage: termAverage.toFixed(2),
      letter,
      points,
      termName: t3Term === 1 ? "الفصل الأول" : t3Term === 2 ? "الفصل الثاني" : "الفصل الثالث",
      subjectsCalculated
    });

    confetti({ particleCount: 40, spread: 50 });
  };

  // 📋 4. معدل فصل (من الدرجات النهائية)
  const calculateTermFromGrades = () => {
    let total = 0;
    let count = 0;
    const subjects: any[] = [];

    for (const sub of SUBJECT_LIST) {
      const val = parseFloat(t4Grades[sub]);
      if (isNaN(val)) continue;

      total += val;
      count++;
      subjects.push({
        name: sub,
        grade: val,
        ...getLetterAndPoints(val)
      });
    }

    if (count === 0) {
      alert("يرجى تعبئة درجة مادة واحدة على الأقل!");
      return;
    }

    const average = total / count;
    const { letter, points } = getLetterAndPoints(average);

    setDetailedResult({
      type: "term_from_grades",
      average: average.toFixed(2),
      letter,
      points,
      subjects
    });

    confetti({ particleCount: 35, spread: 45 });
  };

  // 🏆 5. المعدل السنوي لمادة (من درجات الفصول الثلاثة)
  const calculateAnnualSubjectDetailed = () => {
    const t1 = parseFloat(t5Term1);
    const t2 = parseFloat(t5Term2);
    const t3 = parseFloat(t5Term3);

    if (isNaN(t1) || isNaN(t2) || isNaN(t3)) {
      alert("يرجى تعبئة درجات جميع الفصول!");
      return;
    }

    const finalAnnual = (t1 * 0.4) + (t2 * 0.2) + (t3 * 0.4);
    const { letter, points } = getLetterAndPoints(finalAnnual);

    setDetailedResult({
      type: "annual_subject_detailed",
      finalAnnual: finalAnnual.toFixed(2),
      letter,
      points,
      t1, t2, t3
    });

    confetti({ particleCount: 30, spread: 40 });
  };

  // ⭐ 6. من معدلات الفصول الثلاثة
  const calculateAnnualFromTerms = () => {
    const t1 = parseFloat(t6Term1);
    const t2 = parseFloat(t6Term2);
    const t3 = parseFloat(t6Term3);

    if (isNaN(t1) || isNaN(t2) || isNaN(t3)) {
      alert("يرجى إدخال معدلات الفصول الثلاثة المجهزة!");
      return;
    }

    const annualGPA = (t1 * 0.40) + (t2 * 0.20) + (t3 * 0.40);
    const { letter, points } = getLetterAndPoints(annualGPA);

    setDetailedResult({
      type: "annual_from_terms",
      annualGPA: annualGPA.toFixed(2),
      letter,
      points,
      t1, t2, t3
    });

    confetti({ particleCount: 40, spread: 50 });
  };

  // 🌟 7. المعدل السنوي الكامل (الشبكة العملاقة)
  const calculateFullAnnualSystem = () => {
    let totalT1 = 0, countT1 = 0;
    let totalT2 = 0, countT2 = 0;
    let totalT3 = 0, countT3 = 0;
    let totalAnnual = 0, countAnnual = 0;
    const subjectsReport: any[] = [];

    for (const sub of SUBJECT_LIST) {
      const g = t7Grades[sub];
      const t1 = parseFloat(g.t1);
      const t2 = parseFloat(g.t2);
      const t3 = parseFloat(g.t3);

      const hasT1 = !isNaN(t1);
      const hasT2 = !isNaN(t2);
      const hasT3 = !isNaN(t3);

      if (!hasT1 && !hasT2 && !hasT3) continue;

      if (hasT1) { totalT1 += t1; countT1++; }
      if (hasT2) { totalT2 += t2; countT2++; }
      if (hasT3) { totalT3 += t3; countT3++; }

      // Calculate annual score for this subject
      const activeT1 = hasT1 ? t1 : 0;
      const activeT2 = hasT2 ? t2 : 0;
      const activeT3 = hasT3 ? t3 : 0;

      // Weighted score
      const annualScore = (activeT1 * 0.4) + (activeT2 * 0.2) + (activeT3 * 0.4);
      totalAnnual += annualScore;
      countAnnual++;

      subjectsReport.push({
        name: sub,
        t1: hasT1 ? t1.toFixed(0) : "-",
        t2: hasT2 ? t2.toFixed(0) : "-",
        t3: hasT3 ? t3.toFixed(0) : "-",
        annual: annualScore.toFixed(1),
        ...getLetterAndPoints(annualScore)
      });
    }

    if (countAnnual === 0) {
      alert("الرجاء إدخال بعض الدرجات للبدء بالحساب!");
      return;
    }

    const t1Avg = countT1 > 0 ? (totalT1 / countT1).toFixed(2) : "-";
    const t2Avg = countT2 > 0 ? (totalT2 / countT2).toFixed(2) : "-";
    const t3Avg = countT3 > 0 ? (totalT3 / countT3).toFixed(2) : "-";
    const overallAnnualAvg = (totalAnnual / countAnnual);
    const { letter, points } = getLetterAndPoints(overallAnnualAvg);

    setDetailedResult({
      type: "full_annual_system",
      overallAnnualAvg: overallAnnualAvg.toFixed(2),
      letter,
      points,
      t1Avg,
      t2Avg,
      t3Avg,
      subjectsReport
    });

    confetti({ particleCount: 100, spread: 80 });
  };

  // 🎓 2. حاسبة التقديرات الحرفية والـ GPA
  const calculateGPA = () => {
    let totalPoints = 0;
    let totalScore = 0;
    let count = 0;
    const finalGrades: SubjectGrade[] = [];
    const lowGradesSubjects: string[] = [];

    for (const sub of SUBJECT_LIST) {
      const input = gpaInputs[sub];
      let score = 0;
      let letter = "";
      let points = 0;

      if (input.type === "numeric") {
        score = parseFloat(input.score);
        if (isNaN(score) || score < 0 || score > 100) continue;
        const res = getLetterAndPoints(score);
        letter = res.letter;
        points = res.points;
      } else {
        letter = input.letter;
        score = getScoreFromLetter(letter);
        const res = getLetterAndPoints(score);
        points = res.points;
      }

      totalPoints += points;
      totalScore += score;
      count++;

      finalGrades.push({
        name: sub,
        grade: score,
        letter,
        points
      });

      if (score < 80 || letter === "C+" || letter === "C" || letter === "D+" || letter === "D" || letter === "F") {
        lowGradesSubjects.push(sub);
      }
    }

    if (count === 0) {
      alert("الرجاء إدخال تقديرات أو درجات لمادة واحدة على الأقل!");
      return;
    }

    const gpa = totalPoints / count;
    const averageScore = totalScore / count;
    const finalRating = getLetterAndPoints(averageScore);

    // Custom study recommendations based on grades
    let recommendations: string[] = [];
    if (lowGradesSubjects.length > 0) {
      recommendations.push(`لديك بعض التحديات في مواد (${lowGradesSubjects.join("، ")}). ننصحك بتحميل تجميعات الهياكل المتاحة في الأكاديمية وحل الكويزات بانتظام.`);
      if (lowGradesSubjects.includes("رياضيات") || lowGradesSubjects.includes("فيزياء")) {
        recommendations.push("مادة الرياضيات والفيزياء تعتمدان بالكامل على فهم القوانين والتمارين العملية. راجع 'صندوق القوانين الفيزيائية والتفاضلية' في صفحة المادة بالأكاديمية.");
      }
      if (lowGradesSubjects.includes("لغة إنجليزية")) {
        recommendations.push("في اللغة الإنجليزية، احرص على مراجعة أزمنة القواعد وعلامات الترقيم التي ترد دوماً في امتحان الوزارة التكميلي.");
      }
      recommendations.push("استخدم 'مؤقت المذاكرة ومرتب الوقت' في الأكاديمية لجدولة 45 دقيقة دراسة يومية مخصصة لهذه المواد لرفع مستواك سريعا.");
    } else {
      recommendations.push("ما شاء الله! أداء أكاديمي أسطوري ودرجات ممتازة جداً.");
      recommendations.push("للحفاظ على هذا المستوى الباهر في الفصل الثالث، استمر بحل الكويزات التفاعلية بالذكاء الاصطناعي أسبوعياً ومراجعة الملفات المركزة.");
    }

    // Sort to find highest and lowest
    const sortedGrades = [...finalGrades].sort((a, b) => b.grade - a.grade);
    const highest = sortedGrades[0];
    const lowest = sortedGrades[sortedGrades.length - 1];

    setGpaResult({
      gpa: gpa.toFixed(2),
      averageScore: averageScore.toFixed(1),
      letter: finalRating.letter,
      highest,
      lowest,
      finalGrades,
      recommendations
    });

    confetti({ particleCount: 80, spread: 70 });
  };

  return (
    <div className="min-h-screen py-8 px-4 flex flex-col gap-6 max-w-4xl mx-auto text-right select-none">
      
      {/* Page Title Header */}
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
            <Calculator size={28} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">حاسبة درجات الأكاديمية الذكية 📊</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">احسب درجات الفصول، المعدل السنوي التراكمي، والتقديرات الحرفية بحقوق أكاديمية ADVVVV11.</p>
          </div>
        </div>
      </div>

      {/* Main Tabs Switcher */}
      <div className="flex border border-slate-200 dark:border-slate-800 p-1.5 bg-slate-50 dark:bg-slate-950 rounded-2xl gap-2 shadow-inner">
        <button
          onClick={() => { setActiveTab("detailed"); resetDetailed(); resetGPA(); }}
          className={`flex-1 py-3 text-xs sm:text-sm font-black rounded-xl transition-all flex justify-center items-center gap-2 cursor-pointer ${
            activeTab === "detailed"
              ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-md border border-slate-200/50 dark:border-slate-850"
              : "text-slate-500 dark:text-slate-400 hover:text-slate-850 dark:hover:text-white"
          }`}
        >
          <BarChart3 size={16} />
          <span>01. حاسبة الدرجات التفصيلية</span>
        </button>
        <button
          onClick={() => { setActiveTab("gpa"); resetDetailed(); resetGPA(); }}
          className={`flex-1 py-3 text-xs sm:text-sm font-black rounded-xl transition-all flex justify-center items-center gap-2 cursor-pointer ${
            activeTab === "gpa"
              ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-md border border-slate-200/50 dark:border-slate-850"
              : "text-slate-500 dark:text-slate-400 hover:text-slate-850 dark:hover:text-white"
          }`}
        >
          <Award size={16} />
          <span>02. حاسبة التقديرات الحرفية والـ GPA</span>
        </button>
      </div>

      {/* ─────────────────── TAB 1: DETAILED CALCULATOR ─────────────────── */}
      {activeTab === "detailed" && (
        <div className="flex flex-col gap-6 animate-fade-in">
          
          {/* Sub-selector for calculation type */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-3xl flex flex-col gap-3 shadow-sm">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400">اختر نوع العملية الحسابية التي تناسبك:</label>
            <select
              value={calcType}
              onChange={(e) => { setCalcType(e.target.value); setDetailedResult(null); }}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl focus:outline-none focus:border-emerald-500 dark:text-white text-xs font-bold"
            >
              <option value="subject_term">📝 مادة واحدة - فصل واحد (درجة معلّم وامتحان)</option>
              <option value="subject_annual">📊 مادة واحدة - سنوي (درجات الفصول الثلاثة)</option>
              <option value="term_detailed">🎓 معدل فصل (تفصيلي بالدرجات الفرعية لكل مادة)</option>
              <option value="term_from_grades">📋 معدل فصل (عندك الدرجات النهائية الجاهزة)</option>
              <option value="annual_subject_detailed">🏆 معدل سنوي لمادة (من الفصول الثلاثة بالتفصيل)</option>
              <option value="annual_from_terms">⭐ من معدلات الفصول الثلاثة الجاهزة</option>
              <option value="full_annual_system">🌟 المعدل السنوي الكامل (جدول متكامل لكافة المواد والفصول)</option>
            </select>
            
            <div className="text-[10px] text-amber-500 dark:text-amber-400 bg-amber-500/5 dark:bg-amber-500/10 p-3 rounded-xl border border-amber-500/10 flex items-start gap-2 leading-relaxed">
              <AlertCircle size={14} className="shrink-0 mt-0.5" />
              <span>
                <strong>توزيع الدرجات الوزارية المعتمد:</strong> الفصل الأول 40% (30% وزاري + 10% معلم) • الفصل الثاني 20% (10% امتحان + 10% معلم) • الفصل الثالث 40% (30% وزاري + 10% معلم).
              </span>
            </div>
          </div>

          {/* Form container */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm relative overflow-hidden">
            <div className="absolute top-[-100px] left-[-100px] w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

            {/* 1. مادة واحدة - فصل واحد */}
            {calcType === "subject_term" && (
              <div className="flex flex-col gap-4">
                <h3 className="text-sm font-black text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">مادة واحدة - فصل دراسي واحد</h3>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-400">الفصل الدراسي:</label>
                    <select
                      value={t1Term}
                      onChange={(e) => setT1Term(Number(e.target.value))}
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl focus:outline-none focus:border-emerald-500 text-xs text-white"
                    >
                      <option value={1}>الفصل الأول (40%)</option>
                      <option value={2}>الفصل الثاني (20%)</option>
                      <option value={3}>الفصل الثالث (40%)</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-400">درجة المعلم (أعمال السنة 0-100):</label>
                    <input
                      type="number"
                      value={t1Teacher}
                      onChange={(e) => setT1Teacher(e.target.value)}
                      placeholder="مثال: 95..."
                      className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl focus:outline-none focus:border-emerald-500 dark:text-white text-xs text-center font-bold"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-400">درجة الامتحان النهائي (0-100):</label>
                    <input
                      type="number"
                      value={t1Exam}
                      onChange={(e) => setT1Exam(e.target.value)}
                      placeholder="مثال: 88..."
                      className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl focus:outline-none focus:border-emerald-500 dark:text-white text-xs text-center font-bold"
                    />
                  </div>
                </div>

                <button
                  onClick={calculateSubjectTerm}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl shadow-lg transition-all cursor-pointer mt-2"
                >
                  احسب درجة المادة للفصل
                </button>
              </div>
            )}

            {/* 2. مادة واحدة - سنوي */}
            {calcType === "subject_annual" && (
              <div className="flex flex-col gap-4">
                <h3 className="text-sm font-black text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">الدرجة السنوية لمادة واحدة</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-400">درجة الفصل الأول (من 100):</label>
                    <input
                      type="number"
                      value={t2Term1}
                      onChange={(e) => setT2Term1(e.target.value)}
                      placeholder="مثال: 90"
                      className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl focus:outline-none text-xs text-center font-bold dark:text-white"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-400">درجة الفصل الثاني (من 100):</label>
                    <input
                      type="number"
                      value={t2Term2}
                      onChange={(e) => setT2Term2(e.target.value)}
                      placeholder="مثال: 85"
                      className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl focus:outline-none text-xs text-center font-bold dark:text-white"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-400">درجة الفصل الثالث (من 100):</label>
                    <input
                      type="number"
                      value={t2Term3}
                      onChange={(e) => setT2Term3(e.target.value)}
                      placeholder="مثال: 92"
                      className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl focus:outline-none text-xs text-center font-bold dark:text-white"
                    />
                  </div>
                </div>

                <button
                  onClick={calculateSubjectAnnual}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl shadow-lg transition-all cursor-pointer mt-2"
                >
                  احسب الدرجة السنوية للمادة
                </button>
              </div>
            )}

            {/* 3. معدل فصل تفصيلي */}
            {calcType === "term_detailed" && (
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
                  <select
                    value={t3Term}
                    onChange={(e) => setT3Term(Number(e.target.value))}
                    className="px-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl focus:outline-none text-xs font-bold dark:text-white"
                  >
                    <option value={1}>الفصل الأول (40% من السنوي)</option>
                    <option value={2}>الفصل الثاني (20% من السنوي)</option>
                    <option value={3}>الفصل الثالث (40% من السنوي)</option>
                  </select>
                  <h3 className="text-sm font-black text-slate-800 dark:text-white">معدل الفصل التفصيلي لجميع المواد</h3>
                </div>

                <div className="flex flex-col gap-3">
                  {SUBJECT_LIST.map((sub) => (
                    <div key={sub} className="grid grid-cols-12 gap-3 items-center bg-slate-50/50 dark:bg-slate-950/20 p-2.5 border border-slate-100 dark:border-slate-850 rounded-xl">
                      <div className="col-span-6 text-xs font-extrabold text-slate-700 dark:text-slate-350">{sub}</div>
                      <div className="col-span-3">
                        <input
                          type="number"
                          placeholder="المعلم"
                          value={t3Grades[sub].teacher}
                          onChange={(e) => setT3Grades({
                            ...t3Grades,
                            [sub]: { ...t3Grades[sub], teacher: e.target.value }
                          })}
                          className="w-full px-2 py-1.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg text-[10px] text-center font-bold dark:text-white focus:outline-none"
                        />
                      </div>
                      <div className="col-span-3">
                        <input
                          type="number"
                          placeholder="الامتحان"
                          value={t3Grades[sub].exam}
                          onChange={(e) => setT3Grades({
                            ...t3Grades,
                            [sub]: { ...t3Grades[sub], exam: e.target.value }
                          })}
                          className="w-full px-2 py-1.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg text-[10px] text-center font-bold dark:text-white focus:outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={calculateTermDetailed}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl shadow-lg transition-all cursor-pointer mt-2"
                >
                  احسب معدل الفصل التفصيلي
                </button>
              </div>
            )}

            {/* 4. معدل فصل من الدرجات الجاهزة */}
            {calcType === "term_from_grades" && (
              <div className="flex flex-col gap-4">
                <h3 className="text-sm font-black text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">حساب معدل الفصل من درجات المواد النهائية</h3>
                <div className="grid grid-cols-2 gap-3.5">
                  {SUBJECT_LIST.map((sub) => (
                    <div key={sub} className="flex justify-between items-center bg-slate-50 dark:bg-slate-950/20 p-2.5 border border-slate-100 dark:border-slate-850 rounded-xl">
                      <input
                        type="number"
                        placeholder="0 - 100"
                        value={t4Grades[sub]}
                        onChange={(e) => setT4Grades({ ...t4Grades, [sub]: e.target.value })}
                        className="w-20 px-2 py-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg text-[11px] text-center font-black dark:text-white focus:outline-none focus:border-emerald-500"
                      />
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{sub}:</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={calculateTermFromGrades}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl shadow-lg transition-all cursor-pointer mt-2"
                >
                  احسب معدل الفصل من الدرجات الجاهزة
                </button>
              </div>
            )}

            {/* 5. المعدل السنوي لمادة بالتفصيل */}
            {calcType === "annual_subject_detailed" && (
              <div className="flex flex-col gap-4">
                <h3 className="text-sm font-black text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">المعدل السنوي لمادة (من درجات الفصول)</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-slate-400">درجة الفصل الأول (من 100):</label>
                    <input
                      type="number"
                      value={t5Term1}
                      onChange={(e) => setT5Term1(e.target.value)}
                      placeholder="أدخل الدرجة"
                      className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl text-xs text-center font-bold dark:text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-slate-400">درجة الفصل الثاني (من 100):</label>
                    <input
                      type="number"
                      value={t5Term2}
                      onChange={(e) => setT5Term2(e.target.value)}
                      placeholder="أدخل الدرجة"
                      className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl text-xs text-center font-bold dark:text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-slate-400">درجة الفصل الثالث (من 100):</label>
                    <input
                      type="number"
                      value={t5Term3}
                      onChange={(e) => setT5Term3(e.target.value)}
                      placeholder="أدخل الدرجة"
                      className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl text-xs text-center font-bold dark:text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <button
                  onClick={calculateAnnualSubjectDetailed}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl shadow-lg transition-all cursor-pointer mt-2"
                >
                  احسب المعدل السنوي للمادة
                </button>
              </div>
            )}

            {/* 6. من معدلات الفصول الثلاثة الجاهزة */}
            {calcType === "annual_from_terms" && (
              <div className="flex flex-col gap-4">
                <h3 className="text-sm font-black text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">حساب المعدل السنوي التراكمي من معدلات الفصول</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-slate-400">معدل الفصل الأول (40%):</label>
                    <input
                      type="number"
                      value={t6Term1}
                      onChange={(e) => setT6Term1(e.target.value)}
                      placeholder="مثال: 91.5..."
                      className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl text-xs text-center font-bold dark:text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-slate-400">معدل الفصل الثاني (20%):</label>
                    <input
                      type="number"
                      value={t6Term2}
                      onChange={(e) => setT6Term2(e.target.value)}
                      placeholder="مثال: 88.3..."
                      className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl text-xs text-center font-bold dark:text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-slate-400">معدل الفصل الثالث (40%):</label>
                    <input
                      type="number"
                      value={t6Term3}
                      onChange={(e) => setT6Term3(e.target.value)}
                      placeholder="مثال: 94.2..."
                      className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl text-xs text-center font-bold dark:text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <button
                  onClick={calculateAnnualFromTerms}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl shadow-lg transition-all cursor-pointer mt-2"
                >
                  احسب المعدل السنوي التراكمي
                </button>
              </div>
            )}

            {/* 7. المعدل السنوي الكامل (الشبكة العملاقة) */}
            {calcType === "full_annual_system" && (
              <div className="flex flex-col gap-4 overflow-x-auto">
                <h3 className="text-sm font-black text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">المعدل السنوي العام الكامل لكافة المواد والفصول</h3>
                
                <table className="w-full text-right border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-extrabold">
                      <th className="py-2.5 pr-2">المادة</th>
                      <th className="py-2.5 text-center">الفصل الأول (40%)</th>
                      <th className="py-2.5 text-center">الفصل الثاني (20%)</th>
                      <th className="py-2.5 text-center">الفصل الثالث (40%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SUBJECT_LIST.map((sub) => (
                      <tr key={sub} className="border-b border-slate-100 dark:border-slate-900/50">
                        <td className="py-2.5 font-bold text-slate-700 dark:text-slate-350 pr-2">{sub}</td>
                        <td className="py-1">
                          <input
                            type="number"
                            placeholder="درجة ف1"
                            value={t7Grades[sub].t1}
                            onChange={(e) => setT7Grades({
                              ...t7Grades,
                              [sub]: { ...t7Grades[sub], t1: e.target.value }
                            })}
                            className="w-20 mx-auto px-2 py-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg text-[10px] text-center font-bold focus:outline-none dark:text-white"
                          />
                        </td>
                        <td className="py-1">
                          <input
                            type="number"
                            placeholder="درجة ف2"
                            value={t7Grades[sub].t2}
                            onChange={(e) => setT7Grades({
                              ...t7Grades,
                              [sub]: { ...t7Grades[sub], t2: e.target.value }
                            })}
                            className="w-20 mx-auto px-2 py-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg text-[10px] text-center font-bold focus:outline-none dark:text-white"
                          />
                        </td>
                        <td className="py-1">
                          <input
                            type="number"
                            placeholder="درجة ف3"
                            value={t7Grades[sub].t3}
                            onChange={(e) => setT7Grades({
                              ...t7Grades,
                              [sub]: { ...t7Grades[sub], t3: e.target.value }
                            })}
                            className="w-20 mx-auto px-2 py-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg text-[10px] text-center font-bold focus:outline-none dark:text-white"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <button
                  onClick={calculateFullAnnualSystem}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl shadow-lg transition-all cursor-pointer mt-2"
                >
                  احسب التقرير السنوي الكامل والمعدل التراكمي
                </button>
              </div>
            )}

          </div>

          {/* Detailed results widget */}
          {detailedResult && (
            <div className="bg-slate-900 border border-slate-850 rounded-3xl p-6 flex flex-col gap-5 text-right relative overflow-hidden shadow-xl animate-scale-in">
              <div className="absolute top-0 left-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <span className="text-[10px] text-slate-500 font-extrabold">مستند إلكتروني رسمي</span>
                <h4 className="text-xs font-black text-emerald-400">نتائج حساب الدرجات المعتمدة</h4>
              </div>

              {/* Subject term rating */}
              {detailedResult.type === "subject_term" && (
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center bg-slate-950 p-4 border border-slate-800/80 rounded-2xl">
                    <div className="flex flex-col items-center justify-center bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-2 rounded-xl">
                      <span className="text-base font-black font-mono">{detailedResult.finalGrade}</span>
                      <span className="text-[8px] font-bold">من 100</span>
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-[10px] text-slate-400 font-bold">{detailedResult.distributionText}</span>
                      <span className="text-sm font-black text-white mt-1">الدرجة النهائية المقدرة للمادة:</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-950/60 p-3 border border-slate-900 rounded-xl flex flex-col items-center">
                      <span className="text-xs text-slate-500 font-bold">التقدير الحرفي</span>
                      <span className="text-base font-black text-emerald-400 font-mono mt-0.5">{detailedResult.letter}</span>
                    </div>
                    <div className="bg-slate-950/60 p-3 border border-slate-900 rounded-xl flex flex-col items-center">
                      <span className="text-xs text-slate-500 font-bold">النقاط الفنية (GPA)</span>
                      <span className="text-base font-black text-emerald-400 font-mono mt-0.5">{detailedResult.points.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Subject annual rating */}
              {detailedResult.type === "subject_annual" && (
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center bg-slate-950 p-4 border border-slate-800 rounded-2xl">
                    <div className="flex flex-col items-center justify-center bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-2 rounded-xl">
                      <span className="text-base font-black font-mono">{detailedResult.finalGrade}</span>
                      <span className="text-[8px] font-bold">من 100</span>
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-[9px] text-slate-500 font-bold">الفصل الأول 40% • الثاني 20% • الثالث 40%</span>
                      <span className="text-sm font-black text-white mt-1">الدرجة النهائية السنوية المقدرة:</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2.5 text-center">
                    <div className="bg-slate-950 p-2.5 border border-slate-900 rounded-xl flex flex-col">
                      <span className="text-[8px] text-slate-500 font-bold">الفصل الأول</span>
                      <span className="text-xs font-black text-white font-mono mt-0.5">{detailedResult.t1}</span>
                    </div>
                    <div className="bg-slate-950 p-2.5 border border-slate-900 rounded-xl flex flex-col">
                      <span className="text-[8px] text-slate-500 font-bold">الفصل الثاني</span>
                      <span className="text-xs font-black text-white font-mono mt-0.5">{detailedResult.t2}</span>
                    </div>
                    <div className="bg-slate-950 p-2.5 border border-slate-900 rounded-xl flex flex-col">
                      <span className="text-[8px] text-slate-500 font-bold">الفصل الثالث</span>
                      <span className="text-xs font-black text-white font-mono mt-0.5">{detailedResult.t3}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Term detailed rating */}
              {detailedResult.type === "term_detailed" && (
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center bg-slate-950 p-4 border border-slate-800 rounded-2xl">
                    <div className="flex flex-col items-center justify-center bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-2 rounded-xl">
                      <span className="text-base font-black font-mono">{detailedResult.termAverage}</span>
                      <span className="text-[8px] font-bold">من 100</span>
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-[10px] text-slate-400 font-bold">تقدير الفصل: {detailedResult.letter} ({detailedResult.points.toFixed(2)} نقطة)</span>
                      <span className="text-sm font-black text-white mt-1">معدل {detailedResult.termName}:</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] text-slate-500 font-black">الدرجات التفصيلية للمواد:</span>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {detailedResult.subjectsCalculated.map((sub: any) => (
                        <div key={sub.name} className="flex justify-between items-center p-2 bg-slate-950 border border-slate-900 rounded-xl pr-3">
                          <span className="font-mono text-emerald-400 font-black">{sub.grade} ({sub.letter})</span>
                          <span className="font-bold text-slate-400">{sub.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Term from grades rating */}
              {detailedResult.type === "term_from_grades" && (
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center bg-slate-950 p-4 border border-slate-800 rounded-2xl">
                    <div className="flex flex-col items-center justify-center bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-2 rounded-xl">
                      <span className="text-base font-black font-mono">{detailedResult.average}</span>
                      <span className="text-[8px] font-bold">معدل الفصل</span>
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-[10px] text-slate-400 font-bold">التقدير الحرفي للفصل: {detailedResult.letter}</span>
                      <span className="text-sm font-black text-white mt-1">معدل الفصل الحالي:</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {detailedResult.subjects.map((sub: any) => (
                      <div key={sub.name} className="flex justify-between items-center p-2 bg-slate-950 border border-slate-900 rounded-xl pr-3">
                        <span className="font-mono text-emerald-400 font-bold">{sub.grade} ({sub.letter})</span>
                        <span className="font-bold text-slate-400">{sub.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Annual subject detailed */}
              {detailedResult.type === "annual_subject_detailed" && (
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center bg-slate-950 p-4 border border-slate-800 rounded-2xl">
                    <div className="flex flex-col items-center justify-center bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-2 rounded-xl">
                      <span className="text-base font-black font-mono">{detailedResult.finalAnnual}</span>
                      <span className="text-[8px] font-bold">من 100</span>
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-[10px] text-slate-400 font-bold">نقاط المادة: {detailedResult.points.toFixed(2)} • التقدير: {detailedResult.letter}</span>
                      <span className="text-sm font-black text-white mt-1">الدرجة السنوية للمادة:</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                    <div className="bg-slate-950 p-2 border border-slate-900 rounded-xl">
                      <span className="text-slate-500 font-bold block">الفصل الأول (40%)</span>
                      <span className="text-xs font-black font-mono text-white mt-0.5">{detailedResult.t1}</span>
                    </div>
                    <div className="bg-slate-950 p-2 border border-slate-900 rounded-xl">
                      <span className="text-slate-500 font-bold block">الفصل الثاني (20%)</span>
                      <span className="text-xs font-black font-mono text-white mt-0.5">{detailedResult.t2}</span>
                    </div>
                    <div className="bg-slate-950 p-2 border border-slate-900 rounded-xl">
                      <span className="text-slate-500 font-bold block">الفصل الثالث (40%)</span>
                      <span className="text-xs font-black font-mono text-white mt-0.5">{detailedResult.t3}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Annual from terms average */}
              {detailedResult.type === "annual_from_terms" && (
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center bg-slate-950 p-4 border border-slate-800 rounded-2xl">
                    <div className="flex flex-col items-center justify-center bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-2 rounded-xl">
                      <span className="text-base font-black font-mono">{detailedResult.annualGPA}</span>
                      <span className="text-[8px] font-bold">من 100</span>
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-[10px] text-slate-400 font-bold">التقدير السنوي التراكمي: {detailedResult.letter} ({detailedResult.points.toFixed(2)} نقطة)</span>
                      <span className="text-sm font-black text-white mt-1">المعدل السنوي التراكمي النهائي:</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                    <div className="bg-slate-950 p-2 border border-slate-900 rounded-xl">
                      <span className="text-slate-500 font-bold block">معدل الفصل 1 (40%)</span>
                      <span className="text-xs font-black font-mono text-white mt-0.5">{detailedResult.t1}</span>
                    </div>
                    <div className="bg-slate-950 p-2 border border-slate-900 rounded-xl">
                      <span className="text-slate-500 font-bold block">معدل الفصل 2 (20%)</span>
                      <span className="text-xs font-black font-mono text-white mt-0.5">{detailedResult.t2}</span>
                    </div>
                    <div className="bg-slate-950 p-2 border border-slate-900 rounded-xl">
                      <span className="text-slate-500 font-bold block">معدل الفصل 3 (40%)</span>
                      <span className="text-xs font-black font-mono text-white mt-0.5">{detailedResult.t3}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Full annual system average */}
              {detailedResult.type === "full_annual_system" && (
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center bg-slate-950 p-4 border border-slate-800 rounded-2xl">
                    <div className="flex flex-col items-center justify-center bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-2 rounded-xl">
                      <span className="text-base font-black font-mono">{detailedResult.overallAnnualAvg}</span>
                      <span className="text-[8px] font-bold">النسبة المئوية</span>
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-[10px] text-slate-400 font-bold">المعدل السنوي العام التراكمي: {detailedResult.letter} ({detailedResult.points.toFixed(2)} نقطة)</span>
                      <span className="text-sm font-black text-white mt-1">التقرير السنوي العام لكافة الفصول:</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5 text-center text-[10px]">
                    <div className="bg-slate-950 p-2 border border-slate-900 rounded-xl">
                      <span className="text-slate-500 font-bold block">معدل الفصل الأول</span>
                      <span className="text-xs font-black font-mono text-white mt-0.5">{detailedResult.t1Avg}</span>
                    </div>
                    <div className="bg-slate-950 p-2 border border-slate-900 rounded-xl">
                      <span className="text-slate-500 font-bold block">معدل الفصل الثاني</span>
                      <span className="text-xs font-black font-mono text-white mt-0.5">{detailedResult.t2Avg}</span>
                    </div>
                    <div className="bg-slate-950 p-2 border border-slate-900 rounded-xl">
                      <span className="text-slate-500 font-bold block">معدل الفصل الثالث</span>
                      <span className="text-xs font-black font-mono text-white mt-0.5">{detailedResult.t3Avg}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] text-slate-500 font-black">التقرير السنوي النهائي لجميع المواد:</span>
                    <div className="flex flex-col gap-1.5 text-[11px]">
                      {detailedResult.subjectsReport.map((sub: any) => (
                        <div key={sub.name} className="flex justify-between items-center p-2.5 bg-slate-950 border border-slate-900 rounded-xl pr-3">
                          <span className="font-mono text-emerald-400 font-black">السنوي: {sub.annual} ({sub.letter})</span>
                          <div className="flex items-center gap-3">
                            <span className="text-[9px] text-slate-500">ف1: {sub.t1} • ف2: {sub.t2} • ف3: {sub.t3}</span>
                            <span className="font-bold text-slate-350">{sub.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* copyright stamp */}
              <div className="flex justify-between items-center pt-3 border-t border-slate-800 text-[9px] text-slate-650 font-bold font-sans">
                <span>تليجرام: t.me/Advvvv11</span>
                <span>حقوق الطبع والنشر © أكاديمية ADVVVV11 للامتحانات الذكية والمراجعات 2026</span>
              </div>

            </div>
          )}

        </div>
      )}

      {/* ─────────────────── TAB 2: LETTER GRADE & GPA CALCULATOR ─────────────────── */}
      {activeTab === "gpa" && (
        <div className="flex flex-col gap-6 animate-fade-in">
          
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm relative overflow-hidden">
            <div className="absolute top-[-100px] left-[-100px] w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <h3 className="text-sm font-black text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2 mb-4">أدخل التقدير الحرفي أو الدرجة الرقمية لكل مادة أساسية</h3>

            <div className="flex flex-col gap-4">
              {SUBJECT_LIST.map((sub, idx) => (
                <div key={sub} className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-50 dark:bg-slate-950/20 p-4 border border-slate-200/50 dark:border-slate-850 rounded-2xl gap-3">
                  
                  {/* Inputs Section */}
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    {/* Toggle button */}
                    <button
                      onClick={() => setGpaInputs({
                        ...gpaInputs,
                        [sub]: {
                          ...gpaInputs[sub],
                          type: gpaInputs[sub].type === "numeric" ? "letter" : "numeric"
                        }
                      })}
                      className="px-2 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 text-slate-650 dark:text-slate-450 hover:text-emerald-500 rounded-lg text-[9px] font-black cursor-pointer select-none"
                    >
                      {gpaInputs[sub].type === "numeric" ? "تبديل لتقدير حرفي 🎓" : "تبديل لدرجة رقمية 📊"}
                    </button>

                    {gpaInputs[sub].type === "numeric" ? (
                      <input
                        type="number"
                        min={0}
                        max={100}
                        placeholder="الدرجة الرقمية (0-100)"
                        value={gpaInputs[sub].score}
                        onChange={(e) => setGpaInputs({
                          ...gpaInputs,
                          [sub]: { ...gpaInputs[sub], score: e.target.value }
                        })}
                        className="w-32 px-3 py-1.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl text-xs text-center font-bold focus:outline-none focus:border-emerald-500 dark:text-white"
                      />
                    ) : (
                      <select
                        value={gpaInputs[sub].letter}
                        onChange={(e) => setGpaInputs({
                          ...gpaInputs,
                          [sub]: { ...gpaInputs[sub], letter: e.target.value }
                        })}
                        className="w-32 px-3 py-1.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl text-xs text-center font-bold focus:outline-none focus:border-emerald-500 dark:text-white"
                      >
                        <option value="A+">A+ (95 - 100)</option>
                        <option value="A">A (90 - 94)</option>
                        <option value="B+">B+ (85 - 89)</option>
                        <option value="B">B (80 - 84)</option>
                        <option value="C+">C+ (75 - 79)</option>
                        <option value="C">C (70 - 74)</option>
                        <option value="D+">D+ (65 - 69)</option>
                        <option value="D">D (60 - 64)</option>
                        <option value="F">F (أقل من 60)</option>
                      </select>
                    )}
                  </div>

                  {/* Subject Name label */}
                  <div className="flex items-center gap-2.5 pr-1 self-end sm:self-auto">
                    <span className="text-xs font-black text-slate-700 dark:text-slate-350">{sub}</span>
                    <span className="w-5 h-5 flex items-center justify-center bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 text-slate-500 text-[10px] font-black rounded-lg font-mono">
                      {idx + 1}
                    </span>
                  </div>

                </div>
              ))}
            </div>

            <button
              onClick={calculateGPA}
              className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-black text-xs sm:text-sm rounded-2xl shadow-lg transition-all cursor-pointer mt-6 flex justify-center items-center gap-2"
            >
              <Sparkles size={16} className="animate-pulse" />
              <span>🎓 احسب المعدل النهائي والتوصيات</span>
            </button>

          </div>

          {/* GPA Result report */}
          {gpaResult && (
            <div className="bg-slate-900 border border-slate-850 rounded-3xl p-5 sm:p-6 flex flex-col gap-6 text-right relative overflow-hidden shadow-xl animate-scale-in">
              <div className="absolute top-0 left-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <span className="text-[9px] text-slate-550 font-bold">بوابة درجات الصف 11 متقدم</span>
                <h4 className="text-xs font-black text-emerald-400">تقرير التحليل الدراسي والمعدل التراكمي</h4>
              </div>

              {/* Circular gpa display */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
                
                {/* GPA score circle */}
                <div className="bg-slate-950 p-4 border border-slate-850 rounded-2xl flex flex-col items-center justify-center text-center gap-1">
                  <span className="text-[10px] text-slate-500 font-extrabold">المعدل التراكمي العام</span>
                  <span className="text-2xl font-black text-white font-mono leading-none mt-1">{gpaResult.gpa}</span>
                  <span className="text-[9px] text-slate-400 font-bold">من 4.0</span>
                </div>

                {/* average score percent */}
                <div className="bg-slate-950 p-4 border border-slate-850 rounded-2xl flex flex-col items-center justify-center text-center gap-1">
                  <span className="text-[10px] text-slate-500 font-extrabold">النسبة المئوية التقريبية</span>
                  <span className="text-2xl font-black text-emerald-400 font-mono leading-none mt-1">{gpaResult.averageScore}%</span>
                  <span className="text-[9px] text-slate-400 font-bold">التقدير الحرفي: {gpaResult.letter}</span>
                </div>

                {/* Highest / lowest subject */}
                <div className="bg-slate-950 p-4 border border-slate-850 rounded-2xl flex flex-col justify-center gap-1.5 text-xs text-right pr-4">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-emerald-400 font-black">({gpaResult.highest.letter})</span>
                    <span className="text-slate-450 font-bold">الأعلى: {gpaResult.highest.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-rose-400 font-black">({gpaResult.lowest.letter})</span>
                    <span className="text-slate-450 font-bold">الأدنى: {gpaResult.lowest.name}</span>
                  </div>
                </div>

              </div>

              {/* Subject Breakdown Table */}
              <div className="flex flex-col gap-2 bg-slate-950/60 p-4 border border-slate-900 rounded-2xl">
                <span className="text-[10px] text-slate-500 font-black">كشف التقديرات والدرجات الفنية لجميع المواد:</span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {gpaResult.finalGrades.map((sub: SubjectGrade) => (
                    <div key={sub.name} className="flex justify-between items-center p-2.5 bg-slate-950 border border-slate-900 rounded-xl pr-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-emerald-400 font-black">{sub.grade.toFixed(0)}%</span>
                        <span className="text-[10px] text-slate-500 font-bold">({sub.letter} • {sub.points.toFixed(2)} نقطة)</span>
                      </div>
                      <span className="font-bold text-slate-350">{sub.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Smart Recommendations */}
              <div className="bg-emerald-950/20 border border-emerald-950/40 p-4 rounded-2xl flex flex-col gap-2">
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-black">
                  <TrendingUp size={14} className="animate-pulse" />
                  <span>توصيات الذكاء الاصطناعي الأكاديمية المخصصة:</span>
                </div>
                <ul className="flex flex-col gap-1.5 text-xs text-slate-300 pr-1 leading-relaxed">
                  {gpaResult.recommendations.map((rec: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-1.5 justify-end">
                      <span>{rec}</span>
                      <span className="text-emerald-500 shrink-0 mt-1">•</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* footer rights */}
              <div className="flex justify-between items-center pt-3 border-t border-slate-800 text-[9px] text-slate-650 font-bold font-sans">
                <span>تليجرام الأكاديمية: @Advvvv11</span>
                <span>حقوق الطبع والنشر © أكاديمية ADVVVV11 للامتحانات الذكية والمراجعات 2026</span>
              </div>

            </div>
          )}

        </div>
      )}

      {/* FAQs details or helpful notes */}
      <section className="bg-slate-100 dark:bg-slate-950/40 border border-slate-200/50 dark:border-slate-850 p-5 rounded-3xl mt-2">
        <h3 className="text-xs font-black text-slate-800 dark:text-white mb-2 flex items-center gap-1 justify-end">
          <HelpCircle size={14} />
          <span>الأسئلة الشائعة حول احتساب الدرجات</span>
        </h3>
        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed text-justify">
          يتم احتساب النتيجة السنوية التراكمية بناءً على الأوزان النسبية الرسمية لوزارة التربية والتعليم بدولة الإمارات للصف الحادي عشر (الفصل الأول 40%، الفصل الثاني 20%، الفصل الثالث 40%). في حاسبة التقديرات الحرفية، إذا لم تتوفر لديك الدرجة الرقمية الدقيقة، يقوم التطبيق تلقائياً بالتحويل من التقدير الحرفي لدرجة افتراضية متوازنة لضمان احتساب دقيق ونقاط GPA تراكمية مطابقة للمعدلات الجامعية.
        </p>
      </section>

    </div>
  );
}
