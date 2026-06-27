import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  CheckCircle, 
  BookOpen, 
  Sparkles, 
  Check, 
  HelpCircle,
  TrendingUp,
  Flame
} from "lucide-react";
import { Course, COURSES } from "../data";
import { useLanguage } from "../context/LanguageContext";

interface ModuleInspectorProps {
  initialCourseId: string;
}

export default function ModuleInspector({ initialCourseId }: ModuleInspectorProps) {
  const [selectedCourseId, setSelectedCourseId] = useState<string>(initialCourseId);
  const [activeModuleIndex, setActiveModuleIndex] = useState<number>(0);
  const { t, translate } = useLanguage();
  
  // Track completed modules by course id
  const [completedModules, setCompletedModules] = useState<Record<string, number[]>>({
    parenting: [0, 1], // Pre-complete a couple of modules to show functionality
    business: [0],
    economics: [],
    fiqh: [0, 1, 2]
  });

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizChecked, setQuizChecked] = useState<Record<string, boolean>>({});

  const selectedCourse = COURSES.find(c => c.id === selectedCourseId) || COURSES[0];

  const handleToggleModule = (idx: number) => {
    const currentCompleted = completedModules[selectedCourseId] || [];
    let updated: number[];
    if (currentCompleted.includes(idx)) {
      updated = currentCompleted.filter(item => item !== idx);
    } else {
      updated = [...currentCompleted, idx];
    }
    setCompletedModules({
      ...completedModules,
      [selectedCourseId]: updated
    });
  };

  // Pre-configured fun interactive bilingual micro-quizzes for each course to highlight focus features
  const courseQuizzes: Record<string, { 
    question: { bn: string; en: string }; 
    options: { bn: string[]; en: string[] }; 
    correctIdx: number; 
    explanation: { bn: string; en: string }; 
  }> = {
    parenting: {
      question: {
        bn: "ইসলামী প্যারেন্টিং অনুযায়ী সন্তানের চরিত্রের বুনিয়াদ গড়ার সবচেয়ে গুরুত্বপূর্ণ বয়স কোনটি?",
        en: "According to Islamic parenting, what is the most critical age for forming a child's character?"
      },
      options: {
        bn: ["০ থেকে ৭ বছর বয়স", "৭ থেকে ১৪ বছর বয়স", "১৪ থেকে ২১ বছর বয়স", "২১ বছরের পর"],
        en: ["0 to 7 years", "7 to 14 years", "14 to 21 years", "After 21 years"]
      },
      correctIdx: 0,
      explanation: {
        bn: "ইসলামে প্রথম ৭ বছর শিশুকে স্নেহ, আদব ও খেলার ছলে চরিত্র শেখানোর নির্দেশ দেওয়া হয়েছে, যা বুনিয়াদ গঠনে প্রধান ভূমিকা রাখে।",
        en: "In Islam, parents are guided to teach manners and character to children during the first 7 years through affection and play, which forms the main foundation."
      }
    },
    business: {
      question: {
        bn: "ইসলামে ব্যবসায়িক চুক্তির প্রধান আবশ্যকতা (শর্ত) কোনটি?",
        en: "What is the primary condition for a business contract in Islam?"
      },
      options: {
        bn: ["উভয় পক্ষের স্পষ্ট সম্মতি (আকদ)", "অতিরিক্ত সুদের নিশ্চয়তা", "পরোক্ষ প্রতারণা", "অনির্দিষ্ট দাম"],
        en: ["Mutual clear consent of both parties (Aqd)", "Guarantee of extra interest", "Indirect deception", "Indefinite pricing"]
      },
      correctIdx: 0,
      explanation: {
        bn: "উভয় পক্ষের সন্তুষ্টি ও চুক্তির শর্তাবলি স্পষ্ট ও হালাল হওয়া ইসলামে ব্যবসার মূল ভিত্তি।",
        en: "Mutual satisfaction of both parties and clarity of halal contract conditions are the pillars of business in Islam."
      }
    },
    economics: {
      question: {
        bn: "ইসলামী অর্থনৈতিক ব্যবস্থায় সম্পদের মূল মালিক কে?",
        en: "Who is the absolute owner of wealth in the Islamic economic system?"
      },
      options: {
        bn: ["স্বয়ং মহান আল্লাহ", "রাষ্ট্রীয় সরকার", "ব্যক্তিগত উদ্যোক্তা", "সাধারণ জনগণ"],
        en: ["Almighty Allah Himself", "State Government", "Private Entrepreneur", "General Public"]
      },
      correctIdx: 0,
      explanation: {
        bn: "ইসলামী শরিয়াহ অনুযায়ী মহাবিশ্বের সব সম্পদের মূল মালিক আল্লাহ, মানুষ কেবল আমানতদার হিসেবে তা ভোগ করতে পারে।",
        en: "According to Islamic Shariah, the absolute owner of all wealth in the universe is Allah, and humans act as trustees."
      }
    },
    fiqh: {
      question: {
        bn: "দৈনন্দিন ইবাদতের ক্ষেত্রে ফিকহ শাস্ত্রের প্রধান উপকারিতা কী?",
        en: "What is the main benefit of studying Fiqh in daily acts of worship?"
      },
      options: {
        bn: ["ইবাদত সঠিক ও ত্রুটিমুক্ত নিয়মে সম্পাদন করা", "ইতিহাস জানা", "ভাষাগত জ্ঞান বৃদ্ধি", "অন্যদের তর্ক যুদ্ধে হারানো"],
        en: ["Performing worship in a correct, error-free manner", "Knowing history", "Improving language skills", "Winning arguments with others"]
      },
      correctIdx: 0,
      explanation: {
        bn: "ফিকহ আমাদের শেখায় কীভাবে কুরআন ও সুন্নাহ মোতাবেক ইবাদত তাহারাত থেকে শুরু করে সালাত পর্যন্ত নির্ভুলভাবে আদায় করতে হয়।",
        en: "Fiqh teaches us how to perform worship flawlessly according to the Quran and Sunnah, from purification (Taharah) to prayer (Salah)."
      }
    }
  };

  const activeQuiz = courseQuizzes[selectedCourseId];
  const activeQuizQuestion = translate(activeQuiz.question.bn, activeQuiz.question.en);
  const activeQuizOptions = translate(activeQuiz.options.bn, activeQuiz.options.en);
  const activeQuizExplanation = translate(activeQuiz.explanation.bn, activeQuiz.explanation.en);

  // Calculate stats
  const totalModulesCount = selectedCourse.modules.length;
  const completedCount = (completedModules[selectedCourseId] || []).length;
  const progressPercent = Math.round((completedCount / totalModulesCount) * 100);

  return (
    <div className="w-full rounded-3xl glass-panel p-6 md:p-8 relative overflow-hidden shadow-2xl">
      {/* Decorative vector grid backing */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none"></div>

      {/* Top section: Course tabs inside the workspace */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-white/10 mb-8 relative z-10">
        <div>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 mb-2 border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-spin" style={{ animationDuration: "12s" }} />
            {t("syllabusBadge")}
          </span>
          <h3 className="text-xl md:text-2xl font-extrabold text-white">
            {t("syllabusTrackerTitle2")}
          </h3>
          <p className="text-sm text-white/60 mt-1">
            {t("syllabusTrackerDesc2")}
          </p>
        </div>

        {/* Dropdown/Tabs selection */}
        <div className="w-full md:w-auto">
          <label className="block text-xs text-white/60 mb-1.5 font-bold uppercase tracking-wider font-mono">{t("changeCourse")}</label>
          <select
            value={selectedCourseId}
            onChange={(e) => {
              setSelectedCourseId(e.target.value);
              setActiveModuleIndex(0);
            }}
            className="w-full md:w-64 bg-[#064e3b] border border-white/10 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-400 cursor-pointer font-medium"
          >
            {COURSES.map((c) => (
              <option key={c.id} value={c.id}>
                {translate(c.title.bn, c.title.en)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Left column: 12 modular blocks in a beautiful grid representing the 12 modules */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="relative w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </div>
              <div>
                <div className="text-[11px] text-white/50 font-bold uppercase font-mono tracking-wider">{t("progressRate")}</div>
                <div className="text-sm font-semibold text-white">{progressPercent}% {t("completedText")} ({completedCount}/{totalModulesCount} {t("completedOf")})</div>
              </div>
            </div>
            
            <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
              <Flame className="w-4 h-4 text-orange-500 animate-bounce" />
              <span className="text-xs font-mono font-bold text-orange-400">{t("streakText")}: {completedCount * 3} XP</span>
            </div>
          </div>

          {/* Progress bar container */}
          <div className="w-full bg-white/5 rounded-full h-3.5 overflow-hidden border border-white/10">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ type: "spring", stiffness: 80, damping: 15 }}
              className="h-full bg-gradient-to-r from-emerald-500 via-[#34d399] to-emerald-300 rounded-full"
            />
          </div>

          {/* 12 Modular Grid Blocks */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {selectedCourse.modules.map((mod, idx) => {
              const isActive = idx === activeModuleIndex;
              const isCompleted = (completedModules[selectedCourseId] || []).includes(idx);
              const currentModTitle = translate(mod.title.bn, mod.title.en);
              
              return (
                <motion.div
                  key={mod.id}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveModuleIndex(idx)}
                  className={`relative p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                    isActive 
                      ? "bg-white/10 border-emerald-400/80 shadow-md shadow-emerald-500/5 ring-1 ring-emerald-400/20" 
                      : isCompleted 
                        ? "bg-white/3 border-emerald-500/20 hover:border-emerald-500/40" 
                        : "bg-white/5 border-white/10 hover:border-white/20"
                  }`}
                >
                  {/* Small tag index */}
                  <div className="flex justify-between items-start mb-2.5">
                    <span className="text-[10px] font-bold font-mono text-white/40">
                      {t("weekText")} {idx + 1}
                    </span>
                    
                    {/* Tick icon to mark completion status */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleModule(idx);
                      }}
                      className={`p-1 rounded-md transition-all ${
                        isCompleted 
                          ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30" 
                          : "bg-white/5 text-white/30 hover:text-white/60"
                      }`}
                      title={isCompleted ? t("completed") : t("incomplete")}
                    >
                      <Check className={`w-3.5 h-3.5 ${isCompleted ? "stroke-[3.5]" : "stroke-[2]"}`} />
                    </button>
                  </div>

                  {/* Module Title */}
                  <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-2 leading-tight">
                    {currentModTitle.replace(/Module \d+:\s*/, "")}
                  </h4>
                  
                  {/* Status Indicator */}
                  <div className="mt-2 flex items-center gap-1">
                    <div className={`w-1.5 h-1.5 rounded-full ${isCompleted ? "bg-emerald-500" : "bg-white/20"}`}></div>
                    <span className="text-[9px] text-white/60 font-medium">
                      {isCompleted ? t("completed") : t("incomplete")}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right column: Selected module's curriculum content & interactive quiz */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
          
          {/* Active Module Details */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModuleIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="bg-white/5 p-6 rounded-2xl border border-white/10 flex-1 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#34d399] bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                      {t("weekText")} {activeModuleIndex + 1} • {t("lectureSession")}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white mt-2 leading-snug">
                      {translate(selectedCourse.modules[activeModuleIndex]?.title.bn, selectedCourse.modules[activeModuleIndex]?.title.en)}
                    </h3>
                  </div>
                </div>

                {/* Module description subitems */}
                <div className="space-y-3.5 my-5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white/50 font-mono">{t("curriculumGoals")}</h4>
                  
                  {selectedCourse.modules[activeModuleIndex]?.details ? (
                    translate(selectedCourse.modules[activeModuleIndex].details!.bn, selectedCourse.modules[activeModuleIndex].details!.en).map((det, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                        <span className="w-5 h-5 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/20">
                          {dIdx + 1}
                        </span>
                        <p className="text-sm text-white/80 font-medium">
                          {det}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="space-y-2">
                      <p className="text-sm text-white/80 leading-relaxed">
                        {t("defaultModuleDetails")}
                      </p>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white/60 whitespace-pre-line leading-relaxed">
                        {t("defaultModuleBullets")}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Toggle complete inside detail block */}
              <div className="pt-4 border-t border-white/10 mt-auto">
                <button
                  onClick={() => handleToggleModule(activeModuleIndex)}
                  className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    (completedModules[selectedCourseId] || []).includes(activeModuleIndex)
                      ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25"
                      : "bg-white/5 text-white/80 border border-white/10 hover:bg-white/10"
                  }`}
                >
                  <CheckCircle className="w-4 h-4" />
                  {(completedModules[selectedCourseId] || []).includes(activeModuleIndex)
                    ? t("moduleCompletedBtn")
                    : t("moduleIncompleteBtn")}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Scholar Quiz Simulator (to increase study engagement) */}
          <div className="bg-white/3 p-5 rounded-2xl border border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <HelpCircle className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white">{t("quizTitle")}</h4>
            </div>

            <p className="text-xs text-white/80 mb-3 font-medium leading-relaxed">
              {activeQuizQuestion}
            </p>

            <div className="space-y-2 mb-3">
              {activeQuizOptions.map((opt, oIdx) => {
                const isSelected = quizAnswers[selectedCourseId] === oIdx;
                const isChecked = quizChecked[selectedCourseId];
                const isCorrect = oIdx === activeQuiz.correctIdx;

                let optClass = "bg-white/3 border-white/10 hover:bg-white/10 text-white/80";
                if (isChecked) {
                  if (isCorrect) {
                    optClass = "bg-emerald-500/20 border-emerald-500/60 text-emerald-300";
                  } else if (isSelected) {
                    optClass = "bg-rose-500/20 border-rose-500/60 text-rose-300";
                  }
                } else if (isSelected) {
                  optClass = "bg-emerald-500/10 border-emerald-500/50 text-[#34d399]";
                }

                return (
                  <button
                    key={oIdx}
                    disabled={isChecked}
                    onClick={() => {
                      setQuizAnswers({ ...quizAnswers, [selectedCourseId]: oIdx });
                      setQuizChecked({ ...quizChecked, [selectedCourseId]: false });
                    }}
                    className={`w-full text-left p-2.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-2 cursor-pointer ${optClass}`}
                  >
                    <span className="w-5 h-5 rounded-md bg-white/5 flex items-center justify-center font-mono font-bold text-[10px] text-white/40 border border-white/10">
                      {String.fromCharCode(65 + oIdx)}
                    </span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between items-center gap-2">
              {quizChecked[selectedCourseId] ? (
                <p className="text-[11px] text-white/60 leading-normal font-medium bg-white/5 p-2.5 rounded-xl border border-white/10 w-full">
                  💡 <strong className="text-[#34d399]">{t("quizExplanation")}</strong> {activeQuizExplanation}
                </p>
              ) : (
                <>
                  <span className="text-[10px] text-white/50 italic">{t("quizFooterText")}</span>
                  <button
                    disabled={quizAnswers[selectedCourseId] === undefined}
                    onClick={() => setQuizChecked({ ...quizChecked, [selectedCourseId]: true })}
                    className="px-3 py-1.5 rounded-lg text-[11px] font-bold bg-emerald-500 text-white hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-[0_4px_14px_rgba(16,185,129,0.3)] shrink-0"
                  >
                    {t("quizCheckBtn")}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
