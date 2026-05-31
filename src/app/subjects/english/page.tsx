"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import {
  BookOpen, Search, ArrowLeft, MessageSquare, Award, Play, Pause, RotateCcw,
  Volume2, HelpCircle, Check, X, Clock, RefreshCw, Send, Layers, Star,
  TrendingUp, Sparkles, User, AlertCircle, Bookmark, Compass, BookOpenCheck,
  ChevronRight, Mic, ShieldAlert, FileText, Edit3, Heart, Zap, Gamepad2, AwardIcon
} from "lucide-react";

import { VocabItem, GrammarRule, ReadingPassage, MazeQuestion, VOCABULARY_DATABASE, GRAMMAR_CENTER_DATABASE, READING_CENTER_DATABASE, MAZE_PRACTICE_DATABASE, EMSAT_GRAMMAR_PRACTICE, WRITING_TOPICS } from './data';

export default function EnglishGrade11AdvancedPage() {
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "vocab" | "grammar" | "reading" | "maze" | "emsat" | "listening_speaking" | "games" | "writing"
  >("dashboard");

  // Global State
  const [points, setPoints] = useState(150);
  const [streak, setStreak] = useState(4);
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>(["Beginner"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Audio System (Web Speech API)
  const [speaking, setSpeaking] = useState(false);
  const [ttsSpeed, setTtsSpeed] = useState(1.0);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const speak = (text: string) => {
    if (!synthRef.current) return;
    synthRef.current.cancel();

    if (speaking) {
      setSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = ttsSpeed;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    utteranceRef.current = utterance;
    setSpeaking(true);
    synthRef.current.speak(utterance);
  };

  const pauseSpeech = () => {
    if (synthRef.current) {
      if (synthRef.current.paused) {
        synthRef.current.resume();
        triggerToast("TTS Resumed");
      } else {
        synthRef.current.pause();
        triggerToast("TTS Paused");
      }
    }
  };

  const adjustSpeed = (speed: number) => {
    setTtsSpeed(speed);
    triggerToast(`TTS Speed: ${speed}x`);
  };

  // 1. Vocab States
  const [activeVocabIdx, setActiveVocabIdx] = useState(0);
  const [vocabAnswers, setVocabAnswers] = useState<Record<number, number>>({});

  const handleVocabAnswer = (vocabIdx: number, selectedOptIdx: number) => {
    const isCorrect = VOCABULARY_DATABASE[vocabIdx].correctIndex === selectedOptIdx;
    setVocabAnswers({ ...vocabAnswers, [vocabIdx]: selectedOptIdx });
    if (isCorrect) {
      setPoints((prev) => prev + 10);
      triggerToast("Correct Answer! +10 Points ⭐");
      if (!unlockedBadges.includes("Vocab Hero")) {
        setUnlockedBadges([...unlockedBadges, "Vocab Hero"]);
      }
    } else {
      triggerToast("Incorrect, try again!");
    }
  };

  // 2. Grammar States
  const [activeGrammarKey, setActiveGrammarKey] = useState("thirdConditional");
  const [grammarAnswers, setGrammarAnswers] = useState<Record<string, number>>({});

  const handleGrammarQuiz = (key: string, selectedIdx: number) => {
    const isCorrect = GRAMMAR_CENTER_DATABASE[key].examQuestions[0].ans === selectedIdx;
    setGrammarAnswers({ ...grammarAnswers, [key]: selectedIdx });
    if (isCorrect) {
      setPoints((prev) => prev + 15);
      triggerToast("Excellent! Correct Grammar Answer! +15 Points ⭐");
      if (!unlockedBadges.includes("Grammar Expert")) {
        setUnlockedBadges([...unlockedBadges, "Grammar Expert"]);
      }
    }
  };

  // 3. Reading States
  const [activeReadingIdx, setActiveReadingIdx] = useState(0);
  const [readingAnswers, setReadingAnswers] = useState<Record<string, number>>({});
  const [readingSubmitted, setReadingSubmitted] = useState<Record<string, boolean>>({});

  const submitReadingQuiz = (passageId: string, passage: ReadingPassage) => {
    let score = 0;
    passage.questions.forEach((q, i) => {
      if (readingAnswers[`${passageId}_${i}`] === q.ans) {
        score++;
      }
    });
    setReadingSubmitted({ ...readingSubmitted, [passageId]: true });
    setPoints((prev) => prev + score * 5);
    triggerToast(`Quiz Completed! Score: ${score}/10. +${score * 5} Points ⭐`);
    if (score === 10 && !unlockedBadges.includes("Reader Champion")) {
      setUnlockedBadges([...unlockedBadges, "Reader Champion"]);
    }
  };

  // 4. MAZE States
  const [mazeSelections, setMazeSelections] = useState<Record<string, number>>({});

  const handleMazeSubmit = (maze: MazeQuestion, selIdx: number) => {
    const isCorrect = maze.correctIndex === selIdx;
    setMazeSelections({ ...mazeSelections, [maze.id]: selIdx });
    if (isCorrect) {
      setPoints((prev) => prev + 20);
      triggerToast("MAZE Solved! +20 Points ⭐");
      if (!unlockedBadges.includes("MAZE Slayer")) {
        setUnlockedBadges([...unlockedBadges, "MAZE Slayer"]);
      }
    } else {
      triggerToast("Incorrect option. Try again!");
    }
  };

  // 5. EmSAT Simulator States
  const [emsatAnswers, setEmsatAnswers] = useState<Record<number, number>>({});
  const [emsatSubmitted, setEmsatSubmitted] = useState(false);
  const [emsatTimer, setEmsatTimer] = useState(60);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (activeTab === "emsat" && emsatTimer > 0 && !emsatSubmitted) {
      timer = setTimeout(() => setEmsatTimer((prev) => prev - 1), 1000);
    } else if (emsatTimer === 0 && !emsatSubmitted) {
      submitEmSAT();
    }
    return () => clearTimeout(timer);
  }, [emsatTimer, activeTab, emsatSubmitted]);

  const submitEmSAT = () => {
    let correct = 0;
    EMSAT_GRAMMAR_PRACTICE.forEach((q, i) => {
      if (emsatAnswers[i] === q.ans) correct++;
    });
    setEmsatSubmitted(true);
    setPoints((prev) => prev + correct * 10);
    triggerToast(`EmSAT Finished! Score: ${correct}/${EMSAT_GRAMMAR_PRACTICE.length}`);
  };

  // 6. Speaking Simulation
  const [speakingState, setSpeakingState] = useState<"idle" | "recording" | "analyzing" | "done">("idle");
  const [mockScore, setMockScore] = useState<number | null>(null);

  const startSpeakingChallenge = () => {
    setSpeakingState("recording");
    triggerToast("Microphone is recording user speech...");
    setTimeout(() => {
      setSpeakingState("analyzing");
      setTimeout(() => {
        const score = Math.floor(Math.random() * 15) + 85; // 85% to 100%
        setMockScore(score);
        setSpeakingState("done");
        setPoints((prev) => prev + 25);
        triggerToast(`Evaluation Complete: Match score: ${score}%! +25 Points`);
      }, 2000);
    }, 3000);
  };

  // 7. Word Match Game States
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const gameWords = useMemo(() => ["catch on", "sustainability", "coherent", "depletion", "precipitation", "innovation"], []);
  const gameMeanings = useMemo(() => [
    "to understand or become popular",
    "meeting present needs without harming the future",
    "logical, clear and consistent",
    "reduction or running out of resources",
    "rain or snow falling to the ground",
    "introducing new ideas or methods"
  ], []);

  const handleWordMatch = (val: string, isMeaning: boolean) => {
    if (!selectedWord) {
      setSelectedWord(val);
    } else {
      const idxWord = gameWords.indexOf(isMeaning ? val : selectedWord);
      const idxMeaning = gameMeanings.indexOf(isMeaning ? selectedWord : val);
      if (idxWord !== -1 && idxMeaning !== -1 && idxWord === idxMeaning) {
        setMatchedPairs([...matchedPairs, gameWords[idxWord]]);
        triggerToast("Correct Match! ⭐");
        setPoints((prev) => prev + 15);
      } else {
        triggerToast("Not a match. Try again!");
      }
      setSelectedWord(null);
    }
  };

  // Real-time Search Engine
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    const list: { type: string; title: string; desc: string; action: () => void }[] = [];

    // Search Vocabulary Database
    VOCABULARY_DATABASE.forEach((vocab) => {
      if (vocab.word.toLowerCase().includes(query) || vocab.arabic.includes(query)) {
        list.push({
          type: "Vocab Word",
          title: `${vocab.word} (${vocab.arabic})`,
          desc: vocab.meaning,
          action: () => { setActiveTab("vocab"); setSearchQuery(""); }
        });
      }
    });

    // Search Grammar Rules
    Object.entries(GRAMMAR_CENTER_DATABASE).forEach(([key, rule]) => {
      if (rule.title.toLowerCase().includes(query) || rule.explanation.toLowerCase().includes(query)) {
        list.push({
          type: "Grammar Rule",
          title: rule.title,
          desc: rule.explanation,
          action: () => { setActiveTab("grammar"); setActiveGrammarKey(key); setSearchQuery(""); }
        });
      }
    });

    // Search Reading passages
    READING_CENTER_DATABASE.forEach((passage) => {
      if (passage.title.toLowerCase().includes(query) || passage.story.toLowerCase().includes(query)) {
        list.push({
          type: "Reading Story",
          title: passage.title,
          desc: passage.summary,
          action: () => { setActiveTab("reading"); setActiveReadingIdx(READING_CENTER_DATABASE.indexOf(passage)); setSearchQuery(""); }
        });
      }
    });

    return list.slice(0, 5);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-blue-600 selection:text-white pb-16">
      
      {/* Top Banner and Navigation */}
      <header className="border-b border-slate-900 bg-slate-900/60 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-2.5 bg-slate-850 hover:bg-blue-600/10 text-slate-300 hover:text-blue-500 rounded-2xl transition-all"
            title="الرجوع للرئيسية"
          >
            <ArrowLeft size={18} />
          </Link>
          <div className="flex flex-col">
            <h1 className="text-lg font-black tracking-tight text-white flex items-center gap-1.5">
              <span>English Grade 11 Advanced</span>
              <Sparkles size={16} className="text-blue-400" />
            </h1>
            <p className="text-[10px] text-slate-400 font-bold">Interactive Learning & Exam Hub • © حمد العبدولي 2026</p>
          </div>
        </div>

        {/* Search Engine */}
        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 right-3 flex items-center text-slate-400 pointer-events-none">
            <Search size={14} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search words, rules, or passages..."
            className="w-full pl-4 pr-10 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-blue-500 text-white"
          />

          {/* Search Dropdown */}
          {searchQuery.trim() && (
            <div className="absolute right-0 top-full mt-2 w-full bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden z-50">
              {searchResults.length === 0 ? (
                <div className="p-3 text-xs text-slate-500 text-center">No matching results found.</div>
              ) : (
                <div className="flex flex-col divide-y divide-slate-800">
                  {searchResults.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={item.action}
                      className="px-4 py-2.5 hover:bg-slate-850 text-right w-full flex flex-col gap-1 transition-colors"
                    >
                      <div className="flex justify-between items-center text-[10px] font-black">
                        <span className="text-blue-400">{item.type}</span>
                        <ArrowLeft size={10} className="text-slate-400" />
                      </div>
                      <span className="text-xs font-bold text-white">{item.title}</span>
                      <span className="text-[9px] text-slate-400 line-clamp-1">{item.desc}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Global TTS Controls Panel */}
        <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 border border-slate-800 rounded-2xl shrink-0">
          <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
            <Volume2 size={12} className="text-blue-500" />
            <span>TTS:</span>
          </span>
          <button
            onClick={pauseSpeech}
            className="p-1 hover:bg-slate-850 rounded text-slate-400 hover:text-white"
            title="Play/Pause TTS"
          >
            <Pause size={10} />
          </button>
          <div className="h-3 w-[1px] bg-slate-850" />
          <button
            onClick={() => adjustSpeed(0.7)}
            className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${ttsSpeed === 0.7 ? "bg-blue-600 text-white" : "text-slate-500 hover:text-white"}`}
          >
            Slow
          </button>
          <button
            onClick={() => adjustSpeed(1.0)}
            className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${ttsSpeed === 1.0 ? "bg-blue-600 text-white" : "text-slate-500 hover:text-white"}`}
          >
            Normal
          </button>
          <button
            onClick={() => adjustSpeed(1.4)}
            className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${ttsSpeed === 1.4 ? "bg-blue-600 text-white" : "text-slate-500 hover:text-white"}`}
          >
            Fast
          </button>
        </div>
      </header>

      {/* Main Grid Content */}
      <main className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-1 flex flex-col gap-3">
          <div className="bg-slate-900 border border-slate-850 p-4 rounded-3xl flex flex-col gap-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Study Desk Navigation</span>
            
            {[
              { id: "dashboard", label: "Dashboard & Streak", icon: TrendingUp },
              { id: "vocab", label: "Vocabulary Hub", icon: BookOpen },
              { id: "grammar", label: "Grammar Center", icon: Layers },
              { id: "reading", label: "Reading Center", icon: BookOpenCheck },
              { id: "maze", label: "MAZE Center", icon: Clock },
              { id: "emsat", label: "EmSAT Simulator", icon: ShieldAlert },
              { id: "listening_speaking", label: "Listening & Speaking", icon: Mic },
              { id: "games", label: "Interactive Games", icon: Star },
              { id: "writing", label: "Writing Center", icon: Edit3 }
            ].map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full px-4 py-3 rounded-2xl text-xs font-bold text-right flex items-center justify-between transition-all cursor-pointer ${
                    active
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/10"
                      : "bg-slate-950 text-slate-400 hover:bg-slate-850 hover:text-slate-200 border border-transparent"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Icon size={14} className={active ? "text-white" : "text-blue-500"} />
                    <span>{tab.label}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Telegram Joining Callout */}
          <div className="bg-gradient-to-br from-blue-700 to-blue-500 rounded-3xl p-5 flex flex-col justify-between h-48 relative overflow-hidden shadow-lg shadow-blue-500/15">
            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-black text-white">Telegram Channel 📢</h3>
              <p className="text-[10px] text-blue-100 leading-relaxed mt-1">
                Join our official Telegram for exam coverages, PDFs, and solved papers.
              </p>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <span className="text-[9px] text-center bg-white/10 py-1 rounded font-mono border border-white/10">@Advvvv11</span>
              <a
                href="https://t.me/Advvvv11"
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 bg-white text-blue-600 hover:bg-slate-100 text-xs font-black rounded-xl text-center shadow-lg transition-colors"
              >
                Join Now Free
              </a>
            </div>
          </div>
        </aside>

        {/* Content Pane */}
        <section className="lg:col-span-3 flex flex-col gap-6">
          
          {/* Dashboard Module */}
          {activeTab === "dashboard" && (
            <div className="flex flex-col gap-6">
              
              <div className="bg-slate-900 border border-slate-850 rounded-3xl p-6 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex flex-col gap-2 text-right">
                  <span className="px-3 py-1 bg-blue-600/10 text-blue-400 border border-blue-600/10 rounded-full text-[10px] font-bold w-fit ml-auto">
                    Grade 11 Advanced • Study Desk
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">Welcome, English Champion! 🏆</h2>
                  <p className="text-xs text-slate-400 max-w-md">
                    Track your streak, complete daily vocabulary matching games, and solve EmSAT simulated tasks to hit your study goals.
                  </p>
                </div>

                <div className="flex gap-4 shrink-0">
                  <div className="bg-slate-950 border border-slate-850 px-4 py-3 rounded-2xl flex flex-col items-center justify-center text-center">
                    <span className="text-2xl">🔥</span>
                    <span className="text-lg font-black text-orange-500">{streak} Days</span>
                    <span className="text-[9px] text-slate-500 font-bold">Daily Streak</span>
                  </div>
                  <div className="bg-slate-950 border border-slate-850 px-4 py-3 rounded-2xl flex flex-col items-center justify-center text-center">
                    <span className="text-2xl">⭐</span>
                    <span className="text-lg font-black text-yellow-400">{points} Points</span>
                    <span className="text-[9px] text-slate-500 font-bold">Score Reward</span>
                  </div>
                </div>
              </div>

              {/* Achievements & Badges List */}
              <div className="bg-slate-900 border border-slate-850 rounded-3xl p-6">
                <h3 className="text-sm font-black text-white border-b border-slate-850 pb-3 mb-4">Unlocked Badges & Medals 🏅</h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { name: "Beginner", icon: "🌱", desc: "Started English platform review." },
                    { name: "Vocab Hero", icon: "📚", desc: "Answered vocabulary quiz correctly." },
                    { name: "Grammar Expert", icon: "⚖️", desc: "Passed a grammar check." },
                    { name: "MAZE Slayer", icon: "🧭", desc: "Solved a complex MAZE task." }
                  ].map((badge) => {
                    const unlocked = unlockedBadges.includes(badge.name);
                    return (
                      <div
                        key={badge.name}
                        className={`p-4 border rounded-2xl flex flex-col items-center text-center gap-1.5 transition-all ${
                          unlocked
                            ? "bg-slate-950 border-blue-500/30 text-white"
                            : "bg-slate-950/20 border-slate-900 text-slate-600"
                        }`}
                      >
                        <span className={`text-3xl ${unlocked ? "grayscale-0" : "grayscale"}`}>{badge.icon}</span>
                        <span className="text-xs font-black leading-none">{badge.name}</span>
                        <span className="text-[9px] text-slate-500 font-medium">{badge.desc}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {/* Vocabulary Hub Module */}
          {activeTab === "vocab" && (
            <div className="bg-slate-900 border border-slate-850 rounded-3xl p-6 flex flex-col gap-6">
              
              <div className="border-b border-slate-850 pb-4 flex justify-between items-center">
                <h3 className="text-sm font-black text-white">Vocabulary Hub 📚</h3>
                <span className="text-[10px] text-slate-400">Click speaker button for Text To Speech.</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Word List sidebar */}
                <div className="md:col-span-1 flex flex-col gap-2 max-h-[500px] overflow-y-auto pr-2">
                  {VOCABULARY_DATABASE.map((vocab, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveVocabIdx(idx);
                        speak(vocab.word);
                      }}
                      className={`p-3 rounded-xl border text-right flex items-center justify-between transition-all cursor-pointer ${
                        activeVocabIdx === idx
                          ? "bg-blue-600/10 border-blue-500 text-blue-400 font-bold"
                          : "bg-slate-950 border-slate-850 text-slate-400 hover:bg-slate-850"
                      }`}
                    >
                      <span className="text-xs font-bold font-mono">{vocab.word}</span>
                      <span className="text-[10px] text-slate-500">{vocab.arabic}</span>
                    </button>
                  ))}
                </div>

                {/* Vocabulary Card details */}
                <div className="md:col-span-2 bg-slate-950 border border-slate-850 rounded-3xl p-6 flex flex-col gap-4">
                  
                  {/* Word Header with TTS */}
                  <div className="flex justify-between items-center border-b border-slate-900 pb-3">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => speak(VOCABULARY_DATABASE[activeVocabIdx].word)}
                        className="p-2.5 bg-blue-600/10 hover:bg-blue-600 text-blue-500 hover:text-white rounded-xl transition-all"
                        title="Pronounce word"
                      >
                        <Volume2 size={16} />
                      </button>
                      <h4 className="text-lg font-black text-white font-mono">{VOCABULARY_DATABASE[activeVocabIdx].word}</h4>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-xs font-bold text-slate-500">{VOCABULARY_DATABASE[activeVocabIdx].arabic}</span>
                      <span className="text-[9px] text-blue-400 font-mono mt-0.5">{VOCABULARY_DATABASE[activeVocabIdx].partOfSpeech}</span>
                    </div>
                  </div>

                  {/* Body meanings */}
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] text-slate-500 font-bold uppercase">English Meaning:</span>
                    <p className="text-xs text-slate-350 leading-relaxed font-medium">
                      {VOCABULARY_DATABASE[activeVocabIdx].meaning}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Example Sentence:</span>
                    <div className="p-3 bg-slate-900/60 border border-slate-850 rounded-xl flex items-center justify-between gap-3">
                      <p className="text-xs font-mono text-emerald-400 italic">
                        "{VOCABULARY_DATABASE[activeVocabIdx].example}"
                      </p>
                      <button
                        onClick={() => speak(VOCABULARY_DATABASE[activeVocabIdx].example)}
                        className="p-1.5 bg-slate-950 hover:bg-blue-600/10 text-slate-400 hover:text-blue-500 rounded-lg"
                        title="Listen sentence"
                      >
                        <Volume2 size={12} />
                      </button>
                    </div>
                    <span className="text-[10px] text-slate-400 text-right pr-2">
                      {VOCABULARY_DATABASE[activeVocabIdx].translation}
                    </span>
                  </div>

                  {/* Synonyms & Antonyms */}
                  <div className="grid grid-cols-2 gap-4 border-t border-slate-900 pt-3">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] text-slate-500 font-bold">Synonyms:</span>
                      <div className="flex flex-wrap gap-1">
                        {VOCABULARY_DATABASE[activeVocabIdx].synonyms.map((syn, i) => (
                          <span key={i} className="text-[9px] bg-slate-900 border border-slate-850 px-2 py-0.5 rounded-lg text-slate-300">
                            {syn}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] text-slate-500 font-bold">Antonyms:</span>
                      <div className="flex flex-wrap gap-1">
                        {VOCABULARY_DATABASE[activeVocabIdx].antonyms.map((ant, i) => (
                          <span key={i} className="text-[9px] bg-slate-900 border border-slate-850 px-2 py-0.5 rounded-lg text-slate-300">
                            {ant}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Vocabulary card mini-quiz */}
                  <div className="border-t border-slate-900 pt-4 mt-2">
                    <span className="text-[10px] text-blue-400 font-black uppercase flex items-center gap-1">
                      <HelpCircle size={10} />
                      <span>Vocabulary Card Quiz:</span>
                    </span>
                    <p className="text-xs font-bold text-slate-300 mt-1 mb-2">Choose the correct meaning of this word:</p>
                    
                    <div className="flex flex-col gap-2">
                      {VOCABULARY_DATABASE[activeVocabIdx].options.map((opt, optIdx) => {
                        const answered = vocabAnswers[activeVocabIdx] !== undefined;
                        const isSelected = vocabAnswers[activeVocabIdx] === optIdx;
                        const isCorrect = VOCABULARY_DATABASE[activeVocabIdx].correctIndex === optIdx;
                        
                        return (
                          <button
                            key={optIdx}
                            disabled={answered}
                            onClick={() => handleVocabAnswer(activeVocabIdx, optIdx)}
                            className={`p-2.5 text-right text-xs rounded-xl border transition-all ${
                              answered
                                ? isCorrect
                                  ? "bg-emerald-600/10 border-emerald-500 text-emerald-500 font-bold"
                                  : isSelected
                                    ? "bg-red-600/10 border-red-500 text-red-500"
                                    : "bg-slate-950 border-slate-900 text-slate-600"
                                : "bg-slate-900 hover:bg-slate-850 border-slate-850 hover:border-slate-700 text-slate-300 cursor-pointer"
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* Grammar Center Module */}
          {activeTab === "grammar" && (
            <div className="bg-slate-900 border border-slate-850 rounded-3xl p-6 flex flex-col gap-6">
              
              {/* Tabs for grammar rules */}
              <div className="flex border-b border-slate-850 gap-2 overflow-x-auto pb-2">
                {Object.entries(GRAMMAR_CENTER_DATABASE).map(([key, rule]) => (
                  <button
                    key={key}
                    onClick={() => setActiveGrammarKey(key)}
                    className={`px-4 py-2 text-xs font-bold rounded-xl transition-all shrink-0 cursor-pointer ${
                      activeGrammarKey === key
                        ? "bg-blue-600 text-white"
                        : "bg-slate-950 text-slate-400 hover:bg-slate-850 hover:text-slate-200"
                    }`}
                  >
                    {rule.title}
                  </button>
                ))}
              </div>

              {/* Grammar Details Card */}
              {GRAMMAR_CENTER_DATABASE[activeGrammarKey] && (
                <div className="flex flex-col gap-6">
                  
                  {/* Title & Description */}
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-lg font-black text-white">{GRAMMAR_CENTER_DATABASE[activeGrammarKey].title}</h3>
                    <p className="text-xs text-slate-350 leading-relaxed font-medium">
                      {GRAMMAR_CENTER_DATABASE[activeGrammarKey].explanation}
                    </p>
                    <p className="text-xs text-slate-400 font-medium text-right pr-2">
                      {GRAMMAR_CENTER_DATABASE[activeGrammarKey].arabicExplanation}
                    </p>
                  </div>

                  {/* Formula Box */}
                  {GRAMMAR_CENTER_DATABASE[activeGrammarKey].formula && (
                    <div className="p-4 bg-slate-950 border border-slate-850 rounded-2xl flex flex-col gap-1">
                      <span className="text-[9px] text-slate-500 font-bold uppercase">Formula:</span>
                      <div className="bg-slate-900 px-3 py-2 border border-slate-850 text-xs font-bold font-mono text-emerald-400 rounded-xl text-center select-all">
                        {GRAMMAR_CENTER_DATABASE[activeGrammarKey].formula}
                      </div>
                    </div>
                  )}

                  {/* Timeline Box */}
                  {GRAMMAR_CENTER_DATABASE[activeGrammarKey].timeline && (
                    <div className="p-4 bg-slate-950 border border-slate-850 rounded-2xl flex flex-col gap-1">
                      <span className="text-[9px] text-slate-500 font-bold uppercase">Tense Timeline:</span>
                      <div className="bg-slate-900 px-3 py-2 border border-slate-850 text-xs font-bold font-mono text-blue-400 rounded-xl text-center select-all">
                        {GRAMMAR_CENTER_DATABASE[activeGrammarKey].timeline}
                      </div>
                    </div>
                  )}

                  {/* Interactive Examples */}
                  <div className="flex flex-col gap-3">
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Examples:</span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {GRAMMAR_CENTER_DATABASE[activeGrammarKey].examples.map((ex, i) => (
                        <div key={i} className="p-4 bg-slate-950 border border-slate-850 rounded-2xl flex flex-col gap-2">
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-xs font-mono font-bold text-white">{ex.original}</p>
                            <button
                              onClick={() => speak(ex.original)}
                              className="p-1 bg-slate-900 hover:bg-blue-600/10 text-slate-400 hover:text-blue-500 rounded-lg shrink-0"
                              title="Listen sentence"
                            >
                              <Volume2 size={12} />
                            </button>
                          </div>
                          <span className="text-[10px] text-slate-400 text-right">{ex.ar}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Common Mistakes */}
                  <div className="flex flex-col gap-3">
                    <span className="text-[10px] text-red-400 font-black uppercase">Common Mistakes to Avoid:</span>
                    <div className="flex flex-col gap-2">
                      {GRAMMAR_CENTER_DATABASE[activeGrammarKey].commonMistakes.map((m, i) => (
                        <div key={i} className="p-4 bg-red-950/10 border border-red-950/30 rounded-2xl flex flex-col gap-1.5 text-right">
                          <div className="flex justify-between items-center text-xs font-mono text-red-500">
                            <span>❌ {m.wrong}</span>
                          </div>
                          <div className="flex justify-between items-center text-xs font-mono text-emerald-500">
                            <span>✅ {m.right}</span>
                          </div>
                          <p className="text-[10px] text-slate-400 mt-1">{m.reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Practice Question */}
                  <div className="border-t border-slate-850 pt-6">
                    <span className="text-[10px] text-blue-400 font-black uppercase flex items-center gap-1">
                      <HelpCircle size={10} />
                      <span>Interactive Practice Question:</span>
                    </span>
                    <p className="text-xs font-bold text-white mt-1 mb-3">
                      {GRAMMAR_CENTER_DATABASE[activeGrammarKey].examQuestions[0].q}
                    </p>

                    <div className="flex flex-col gap-2">
                      {GRAMMAR_CENTER_DATABASE[activeGrammarKey].examQuestions[0].opts.map((opt, i) => {
                        const answered = grammarAnswers[activeGrammarKey] !== undefined;
                        const isSelected = grammarAnswers[activeGrammarKey] === i;
                        const isCorrect = GRAMMAR_CENTER_DATABASE[activeGrammarKey].examQuestions[0].ans === i;

                        return (
                          <button
                            key={i}
                            disabled={answered}
                            onClick={() => handleGrammarQuiz(activeGrammarKey, i)}
                            className={`p-3 text-right text-xs rounded-xl border transition-all ${
                              answered
                                ? isCorrect
                                  ? "bg-emerald-600/10 border-emerald-500 text-emerald-500 font-bold"
                                  : isSelected
                                    ? "bg-red-600/10 border-red-500 text-red-500"
                                    : "bg-slate-950 border-slate-900 text-slate-600"
                                : "bg-slate-950 hover:bg-slate-850 border-slate-850 hover:border-slate-700 text-slate-350 cursor-pointer"
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                </div>
              )}

            </div>
          )}

          {/* Reading Center Module */}
          {activeTab === "reading" && (
            <div className="bg-slate-900 border border-slate-850 rounded-3xl p-6 flex flex-col gap-6">
              
              {/* Tabs for Reading Passages */}
              <div className="flex border-b border-slate-850 gap-2 overflow-x-auto pb-2">
                {READING_CENTER_DATABASE.map((passage, idx) => (
                  <button
                    key={passage.id}
                    onClick={() => {
                      setActiveReadingIdx(idx);
                    }}
                    className={`px-4 py-2 text-xs font-bold rounded-xl transition-all shrink-0 cursor-pointer ${
                      activeReadingIdx === idx
                        ? "bg-blue-600 text-white"
                        : "bg-slate-950 text-slate-400 hover:bg-slate-850 hover:text-slate-200"
                    }`}
                  >
                    {passage.title}
                  </button>
                ))}
              </div>

              {/* Passage Details Display */}
              {READING_CENTER_DATABASE[activeReadingIdx] && (
                <div className="flex flex-col gap-6">
                  
                  {/* Story Header */}
                  <div className="flex justify-between items-center border-b border-slate-850 pb-3">
                    <h3 className="text-base font-black text-white">{READING_CENTER_DATABASE[activeReadingIdx].title}</h3>
                    
                    <button
                      onClick={() => speak(READING_CENTER_DATABASE[activeReadingIdx].story)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-black rounded-xl flex items-center gap-1.5"
                    >
                      <Volume2 size={12} />
                      <span>{speaking ? "Stop Listening" : "Listen Story"}</span>
                    </button>
                  </div>

                  {/* Paragraph by Paragraph Translation Tooltip */}
                  <div className="flex flex-col gap-4">
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Bilingual Interactive Reading:</span>
                    {READING_CENTER_DATABASE[activeReadingIdx].paragraphs.map((p, pIdx) => (
                      <div key={pIdx} className="p-4 bg-slate-950 border border-slate-850 rounded-2xl flex flex-col gap-2">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-xs text-slate-200 leading-relaxed font-serif">{p.en}</p>
                          <button
                            onClick={() => speak(p.en)}
                            className="p-1 bg-slate-900 hover:bg-blue-600/10 text-slate-400 hover:text-blue-500 rounded-lg shrink-0"
                          >
                            <Volume2 size={10} />
                          </button>
                        </div>
                        <p className="text-[10px] text-slate-400 text-right font-medium">{p.ar}</p>
                      </div>
                    ))}
                  </div>

                  {/* Summaries & Analyses */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 bg-slate-950 border border-slate-850 rounded-2xl flex flex-col gap-1.5">
                      <span className="text-[10px] text-blue-400 font-bold uppercase">Summary:</span>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        {READING_CENTER_DATABASE[activeReadingIdx].summary}
                      </p>
                    </div>
                    <div className="p-4 bg-slate-950 border border-slate-850 rounded-2xl flex flex-col gap-1.5">
                      <span className="text-[10px] text-blue-400 font-bold uppercase">Key Characters:</span>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        {READING_CENTER_DATABASE[activeReadingIdx].characters}
                      </p>
                    </div>
                    <div className="p-4 bg-slate-950 border border-slate-850 rounded-2xl flex flex-col gap-1.5">
                      <span className="text-[10px] text-blue-400 font-bold uppercase">Main Idea:</span>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        {READING_CENTER_DATABASE[activeReadingIdx].mainIdea}
                      </p>
                    </div>
                  </div>

                  {/* Key Expressions Translation Popup simulation */}
                  <div className="p-4 bg-slate-950 border border-slate-850 rounded-2xl flex flex-col gap-2">
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Important Expressions:</span>
                    <div className="flex flex-wrap gap-2">
                      {READING_CENTER_DATABASE[activeReadingIdx].expressions.map((exp, i) => (
                        <button
                          key={i}
                          onClick={() => triggerToast(`Translation: "${exp}"`)}
                          className="px-3 py-1.5 bg-slate-900 border border-slate-850 hover:border-blue-500/40 rounded-xl text-xs font-mono text-slate-300 transition-colors"
                        >
                          {exp}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Reading Quiz (10 Questions) */}
                  <div className="border-t border-slate-850 pt-6 mt-4">
                    <h4 className="text-sm font-black text-white mb-4">Reading Quiz (10 Questions)</h4>
                    
                    <div className="flex flex-col gap-6">
                      {READING_CENTER_DATABASE[activeReadingIdx].questions.map((q, qIdx) => {
                        const ansKey = `${READING_CENTER_DATABASE[activeReadingIdx].id}_${qIdx}`;
                        const selectedOpt = readingAnswers[ansKey];
                        const submitted = readingSubmitted[READING_CENTER_DATABASE[activeReadingIdx].id];

                        return (
                          <div key={qIdx} className="p-4 bg-slate-950 border border-slate-850 rounded-2xl flex flex-col gap-3">
                            <span className="text-[10px] font-bold text-slate-500">Question {qIdx + 1} of 10</span>
                            <p className="text-xs font-bold text-white leading-normal">{q.q}</p>

                            <div className="flex flex-col gap-2">
                              {q.opts.map((opt, optIdx) => {
                                const isSelected = selectedOpt === optIdx;
                                const isCorrect = q.ans === optIdx;

                                return (
                                  <button
                                    key={optIdx}
                                    disabled={submitted}
                                    onClick={() => setReadingAnswers({ ...readingAnswers, [ansKey]: optIdx })}
                                    className={`p-2.5 text-right text-xs rounded-xl border transition-all ${
                                      submitted
                                        ? isCorrect
                                          ? "bg-emerald-600/10 border-emerald-500 text-emerald-500 font-bold"
                                          : isSelected
                                            ? "bg-red-600/10 border-red-500 text-red-500"
                                            : "bg-slate-950 border-slate-900 text-slate-600"
                                        : isSelected
                                          ? "bg-blue-600/10 border-blue-500 text-blue-400 font-bold"
                                          : "bg-slate-900 hover:bg-slate-850 border-slate-850 text-slate-350 cursor-pointer"
                                    }`}
                                  >
                                    {opt}
                                  </button>
                                );
                              })}
                            </div>

                            {submitted && (
                              <div className="p-3 bg-slate-900 rounded-xl border border-slate-850 text-[10px] text-slate-400">
                                💡 <span className="font-bold text-emerald-500">Explanation:</span> {q.exp}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {!readingSubmitted[READING_CENTER_DATABASE[activeReadingIdx].id] && (
                      <button
                        onClick={() => submitReadingQuiz(READING_CENTER_DATABASE[activeReadingIdx].id, READING_CENTER_DATABASE[activeReadingIdx])}
                        className="mt-6 w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-black rounded-xl shadow-lg transition-colors"
                      >
                        Submit Answers & Calculate Score
                      </button>
                    )}

                  </div>

                </div>
              )}

            </div>
          )}

          {/* MAZE Center Module */}
          {activeTab === "maze" && (
            <div className="bg-slate-900 border border-slate-850 rounded-3xl p-6 flex flex-col gap-6">
              
              <div className="border-b border-slate-850 pb-4">
                <h3 className="text-sm font-black text-white">MAZE Practice Center 🧭</h3>
                <p className="text-[10px] text-slate-400">Complete standard exam-level MAZE paragraphs.</p>
              </div>

              <div className="flex flex-col gap-6">
                {MAZE_PRACTICE_DATABASE.map((maze, idx) => {
                  const selIdx = mazeSelections[maze.id];
                  const answered = selIdx !== undefined;
                  const scoreCorrect = maze.correctIndex === selIdx;

                  return (
                    <div key={maze.id} className="p-5 bg-slate-950 border border-slate-850 rounded-2xl flex flex-col gap-4">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] bg-blue-600/10 text-blue-400 px-2 py-0.5 rounded border border-blue-500/10 font-bold">
                          {maze.level} Level
                        </span>
                        <div className="flex items-center gap-1 text-[10px] text-slate-500">
                          <Clock size={12} />
                          <span>45s Timer</span>
                        </div>
                      </div>

                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-850 text-xs sm:text-sm font-mono leading-relaxed">
                        <span>{maze.textBefore}</span>
                        <span className="px-2 py-0.5 bg-blue-600 text-white font-bold rounded mx-1">
                          {answered ? maze.choices[selIdx] : " [ ? ] "}
                        </span>
                        <span>{maze.textAfter}</span>
                      </div>

                      {/* Choices Grid */}
                      <div className="grid grid-cols-2 gap-3 mt-2">
                        {maze.choices.map((choice, cIdx) => {
                          const isSelected = selIdx === cIdx;
                          const isCorrect = maze.correctIndex === cIdx;

                          return (
                            <button
                              key={cIdx}
                              disabled={answered}
                              onClick={() => handleMazeSubmit(maze, cIdx)}
                              className={`p-3 text-center text-xs font-mono rounded-xl border transition-all ${
                                answered
                                  ? isCorrect
                                    ? "bg-emerald-600/10 border-emerald-500 text-emerald-500 font-bold"
                                    : isSelected
                                      ? "bg-red-600/10 border-red-500 text-red-500"
                                      : "bg-slate-950 border-slate-900 text-slate-600"
                                  : "bg-slate-900 hover:bg-slate-850 border-slate-850 hover:border-slate-700 text-slate-300 cursor-pointer"
                              }`}
                            >
                              {choice}
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation box */}
                      {answered && (
                        <div className={`p-3.5 rounded-xl border text-[10px] leading-relaxed text-right ${
                          scoreCorrect
                            ? "bg-emerald-950/10 border-emerald-900/30 text-emerald-400"
                            : "bg-red-950/10 border-red-900/30 text-red-400"
                        }`}>
                          💡 <span className="font-bold">الشرح باللغة العربية:</span> {maze.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* EmSAT Simulator Module */}
          {activeTab === "emsat" && (
            <div className="bg-slate-900 border border-slate-850 rounded-3xl p-6 flex flex-col gap-6">
              
              <div className="border-b border-slate-850 pb-4">
                <h3 className="text-sm font-black text-white">EmSAT Grammar Simulator 📝</h3>
                <p className="text-[10px] text-slate-400">Specially focused on Relative Clauses and relative pronouns.</p>
              </div>

              {/* Timed Mode Countdown */}
              {!emsatSubmitted && (
                <div className="p-3 bg-red-950/20 border border-red-900/30 text-red-400 text-xs font-mono font-bold rounded-xl text-center flex items-center justify-center gap-1">
                  <Clock size={14} />
                  <span>Time Remaining: {emsatTimer} seconds</span>
                </div>
              )}

              {/* Questions list */}
              <div className="flex flex-col gap-6 mt-2">
                {EMSAT_GRAMMAR_PRACTICE.map((q, idx) => {
                  const selAns = emsatAnswers[idx];
                  
                  return (
                    <div key={idx} className="p-4 bg-slate-950 border border-slate-850 rounded-2xl flex flex-col gap-3">
                      <span className="text-[10px] text-slate-500 font-bold">Question #{idx + 1}</span>
                      <p className="text-xs font-bold text-white">{q.q}</p>
                      
                      <div className="grid grid-cols-2 gap-2">
                        {q.opts.map((opt, optIdx) => {
                          const isSelected = selAns === optIdx;
                          const isCorrect = q.ans === optIdx;

                          return (
                            <button
                              key={optIdx}
                              disabled={emsatSubmitted}
                              onClick={() => setEmsatAnswers({ ...emsatAnswers, [idx]: optIdx })}
                              className={`p-2.5 text-center text-xs font-mono rounded-xl border transition-all ${
                                emsatSubmitted
                                  ? isCorrect
                                    ? "bg-emerald-600/10 border-emerald-500 text-emerald-500 font-bold"
                                    : isSelected
                                      ? "bg-red-600/10 border-red-500 text-red-500"
                                      : "bg-slate-950 border-slate-900 text-slate-600"
                                  : isSelected
                                    ? "bg-blue-600/10 border-blue-500 text-blue-400 font-bold"
                                    : "bg-slate-900 hover:bg-slate-850 border-slate-850 text-slate-350 cursor-pointer"
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>

                      {emsatSubmitted && (
                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-850 text-[10px] text-slate-400 text-right">
                          💡 <span className="font-bold text-emerald-500">التوضيح:</span> {q.exp}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {!emsatSubmitted && (
                <button
                  onClick={submitEmSAT}
                  className="mt-4 w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-black rounded-xl shadow-lg transition-colors"
                >
                  Submit Simulator Exam
                </button>
              )}

            </div>
          )}

          {/* Listening & Speaking Module */}
          {activeTab === "listening_speaking" && (
            <div className="bg-slate-900 border border-slate-850 rounded-3xl p-6 flex flex-col gap-6">
              
              <div className="border-b border-slate-850 pb-4">
                <h3 className="text-sm font-black text-white">Listening & Speaking Hub 🎙️</h3>
                <p className="text-[10px] text-slate-400">Chapters 5 & 6 core vocabularies and voice evaluation practice.</p>
              </div>

              {/* Vocab details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="p-4 bg-slate-950 border border-slate-850 rounded-2xl flex flex-col gap-3">
                  <span className="text-[10px] text-blue-400 font-bold uppercase">Chapter 5 Listening Vocabs:</span>
                  <div className="flex flex-col gap-2">
                    {[
                      { word: "correlation", ar: "ارتباط / علاقة متبادلة", exp: "A mutual relationship or connection between two or more things." },
                      { word: "infrastructure", ar: "البنية التحتية", exp: "The basic physical and organizational structures needed for the operation of a society." }
                    ].map((item, idx) => (
                      <div key={idx} className="p-3 bg-slate-900 rounded-xl border border-slate-850 flex items-center justify-between gap-3 text-right">
                        <button
                          onClick={() => speak(`${item.word}, ${item.exp}`)}
                          className="p-2 bg-slate-950 hover:bg-blue-600/10 text-slate-400 hover:text-blue-500 rounded-lg"
                        >
                          <Volume2 size={12} />
                        </button>
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-white font-mono">{item.word}</span>
                          <span className="text-[9px] text-slate-400">{item.ar}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-slate-950 border border-slate-850 rounded-2xl flex flex-col gap-3">
                  <span className="text-[10px] text-blue-400 font-bold uppercase">Chapter 6 Speaking Vocabs:</span>
                  <div className="flex flex-col gap-2">
                    {[
                      { word: "sustainability", ar: "الاستدامة البيئية", exp: "Preserving climate and resource balance for the next generation." },
                      { word: "innovative", ar: "ابتكاري / إبداعي", exp: "Featuring new methods; advanced and original." }
                    ].map((item, idx) => (
                      <div key={idx} className="p-3 bg-slate-900 rounded-xl border border-slate-850 flex items-center justify-between gap-3 text-right">
                        <button
                          onClick={() => speak(`${item.word}, ${item.exp}`)}
                          className="p-2 bg-slate-950 hover:bg-blue-600/10 text-slate-400 hover:text-blue-500 rounded-lg"
                        >
                          <Volume2 size={12} />
                        </button>
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-white font-mono">{item.word}</span>
                          <span className="text-[9px] text-slate-400">{item.ar}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Speaking Simulator Tool */}
              <div className="p-5 bg-slate-950 border border-slate-850 rounded-3xl mt-4 flex flex-col items-center justify-center text-center gap-4">
                <span className="text-2xl">🎙️</span>
                <div className="flex flex-col">
                  <h4 className="text-xs font-black text-white">Interactive Speaking Practice</h4>
                  <p className="text-[10px] text-slate-400 max-w-sm mt-1">
                    Click record and read the following sentence aloud:
                  </p>
                  <p className="text-xs text-blue-400 font-mono font-bold italic mt-2">
                    "Cloud seeding is an innovative technique to increase precipitation."
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  {speakingState === "idle" && (
                    <button
                      onClick={startSpeakingChallenge}
                      className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white text-xs font-black rounded-xl shadow-lg transition-colors flex items-center gap-2"
                    >
                      <Mic size={14} />
                      <span>Record Voice</span>
                    </button>
                  )}

                  {speakingState === "recording" && (
                    <div className="flex items-center gap-2 text-red-500 animate-pulse text-xs font-bold">
                      <span className="w-2.5 h-2.5 bg-red-500 rounded-full" />
                      <span>Recording... (Speak Now)</span>
                    </div>
                  )}

                  {speakingState === "analyzing" && (
                    <div className="flex items-center gap-2 text-blue-400 animate-spin text-xs font-bold">
                      <RefreshCw size={14} />
                      <span>AI Evaluating Pronunciation...</span>
                    </div>
                  )}

                  {speakingState === "done" && (
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-xs font-bold text-emerald-400">
                        Match Score: <span className="font-extrabold">{mockScore}%</span>
                      </span>
                      <button
                        onClick={() => setSpeakingState("idle")}
                        className="px-4 py-2 bg-slate-900 border border-slate-850 hover:bg-slate-800 text-[10px] font-bold text-slate-300 rounded-lg"
                      >
                        Try Again
                      </button>
                    </div>
                  )}
                </div>
              </div>

            </div>
          )}

          {/* Interactive Games Module */}
          {activeTab === "games" && (
            <div className="bg-slate-900 border border-slate-850 rounded-3xl p-6 flex flex-col gap-6">
              
              <div className="border-b border-slate-850 pb-4">
                <h3 className="text-sm font-black text-white">Interactive Gamification Desk 🎮</h3>
                <p className="text-[10px] text-slate-400">Play games to build vocabulary recall and earn points.</p>
              </div>

              {/* Word Match Game */}
              <div className="p-5 bg-slate-950 border border-slate-850 rounded-2xl flex flex-col gap-4">
                <span className="text-[10px] text-blue-400 font-bold uppercase">Game 1: Word Match</span>
                <p className="text-xs text-slate-400 leading-normal">
                  Click a word from the left and its corresponding meaning from the right.
                </p>

                <div className="grid grid-cols-2 gap-4 mt-2">
                  {/* Left Column Words */}
                  <div className="flex flex-col gap-2">
                    {gameWords.map((word) => {
                      const matched = matchedPairs.includes(word);
                      const isSelected = selectedWord === word;
                      return (
                        <button
                          key={word}
                          disabled={matched}
                          onClick={() => handleWordMatch(word, false)}
                          className={`p-3 text-right text-xs font-mono rounded-xl border transition-all ${
                            matched
                              ? "bg-slate-900/10 border-slate-900 text-slate-600 line-through"
                              : isSelected
                                ? "bg-blue-600/10 border-blue-500 text-blue-400 font-bold"
                                : "bg-slate-900 hover:bg-slate-850 border-slate-850 text-slate-300 cursor-pointer"
                          }`}
                        >
                          {word}
                        </button>
                      );
                    })}
                  </div>

                  {/* Right Column Meanings */}
                  <div className="flex flex-col gap-2">
                    {gameMeanings.map((meaning) => {
                      const matchingWord = gameWords[gameMeanings.indexOf(meaning)];
                      const matched = matchedPairs.includes(matchingWord);
                      const isSelected = selectedWord === meaning;
                      return (
                        <button
                          key={meaning}
                          disabled={matched}
                          onClick={() => handleWordMatch(meaning, true)}
                          className={`p-3 text-right text-xs rounded-xl border transition-all ${
                            matched
                              ? "bg-slate-900/10 border-slate-900 text-slate-600 line-through"
                              : isSelected
                                ? "bg-blue-600/10 border-blue-500 text-blue-400 font-bold"
                                : "bg-slate-900 hover:bg-slate-850 border-slate-850 text-slate-355 cursor-pointer"
                          }`}
                        >
                          {meaning}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {matchedPairs.length === gameWords.length && (
                  <div className="p-4 bg-emerald-950/20 border border-emerald-900/30 text-emerald-400 text-xs font-bold rounded-xl text-center mt-4">
                    🎉 Excellent! You have successfully matched all words! +50 Extra Points awarded.
                  </div>
                )}
              </div>

            </div>
          )}

          {/* Writing Center Module */}
          {activeTab === "writing" && (
            <div className="bg-slate-900 border border-slate-850 rounded-3xl p-6 flex flex-col gap-6">
              
              <div className="border-b border-slate-850 pb-4">
                <h3 className="text-sm font-black text-white">Writing Center 📝</h3>
                <p className="text-[10px] text-slate-400">Review model answers and essay structures.</p>
              </div>

              <div className="flex flex-col gap-6">
                {WRITING_TOPICS.map((topic, idx) => (
                  <div key={idx} className="p-5 bg-slate-950 border border-slate-850 rounded-2xl flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] bg-blue-600/10 text-blue-400 px-2.5 py-0.5 rounded border border-blue-500/10 font-bold">
                        {topic.essayType}
                      </span>
                      <h4 className="text-xs font-bold text-white">{topic.topic}</h4>
                    </div>

                    <p className="text-xs font-bold text-slate-300 italic">"Prompt: {topic.prompt}"</p>

                    <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-850 flex flex-col gap-2">
                      <span className="text-[9px] text-slate-500 font-bold uppercase">Model Essay Answer:</span>
                      <p className="text-xs text-slate-400 leading-relaxed select-text">
                        {topic.modelAnswer}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="text-[9px] text-slate-500 font-bold uppercase mr-2 flex items-center">Vocabularies:</span>
                      {topic.vocab.map((v, i) => (
                        <span key={i} className="text-[9px] bg-slate-900 border border-slate-850 px-2 py-0.5 rounded-lg text-slate-350">
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

        </section>

      </main>

      {/* Footer Credits */}
      <footer className="border-t border-slate-900 mt-16 pt-8 text-center text-xs text-slate-500 flex flex-col items-center gap-2">
        <p>جميع الحقوق محفوظة © حمد العبدولي 2026</p>
        <div className="flex gap-4">
          <a
            href="https://t.me/Advvvv11"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline text-xs"
          >
            Official Telegram channel: @Advvvv11
          </a>
        </div>
      </footer>

      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3.5 bg-blue-600 text-white text-xs font-black rounded-2xl shadow-2xl animate-bounce flex items-center gap-2 border border-blue-500">
          <Check size={14} strokeWidth={4} />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}

