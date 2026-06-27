import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  GraduationCap, 
  Sparkles, 
  BookOpen, 
  Calendar, 
  Award, 
  Video, 
  CheckCircle2, 
  ArrowRight, 
  HelpCircle,
  TrendingUp,
  User,
  Heart,
  Briefcase,
  FileText,
  Bookmark,
  CheckCircle,
  ExternalLink,
  Flame,
  ArrowUpRight,
  Info
} from "lucide-react";

import { COURSES, ADVANTAGES, PAYMENT_INFO, INCLUDED_SERVICES, Course } from "./data";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import CourseCard from "./components/CourseCard";
import ModuleInspector from "./components/ModuleInspector";
import MethodologyStats from "./components/MethodologyStats";
import EnrollmentPortal from "./components/EnrollmentPortal";
import Footer from "./components/Footer";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";

function MainAppContent() {
  const { t, translate } = useLanguage();
  const [activeCourseId, setActiveCourseId] = useState<string>("parenting");
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [enrollCourseId, setEnrollCourseId] = useState<string | undefined>(undefined);
  
  // Student registration states
  const [registeredStudent, setRegisteredStudent] = useState<any>(null);
  const [assignmentLink, setAssignmentLink] = useState("");
  const [assignmentSuccess, setAssignmentSuccess] = useState(false);
  const [activeStudentTab, setActiveStudentTab] = useState<"courses" | "schedule" | "homework">("courses");

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem("islamic_academy_student");
    if (saved) {
      try {
        setRegisteredStudent(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleOpenEnroll = (courseId?: string) => {
    setEnrollCourseId(courseId);
    setShowEnrollModal(true);
  };

  const handleEnrollSuccess = (data: { studentName: string; enrolledCourseIds: string[] }) => {
    const saved = localStorage.getItem("islamic_academy_student");
    if (saved) {
      setRegisteredStudent(JSON.parse(saved));
    }
    setShowEnrollModal(false);
    
    // Smooth scroll to Student Workspace area
    setTimeout(() => {
      document.getElementById("student-workspace")?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  const handleResetRegistration = () => {
    localStorage.removeItem("islamic_academy_student");
    setRegisteredStudent(null);
    setAssignmentLink("");
    setAssignmentSuccess(false);
  };

  const handleAssignmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (assignmentLink.trim()) {
      setAssignmentSuccess(true);
      // Update streak in storage
      if (registeredStudent) {
        const updated = { ...registeredStudent, xp: (registeredStudent.xp || 100) + 50 };
        localStorage.setItem("islamic_academy_student", JSON.stringify(updated));
        setRegisteredStudent(updated);
      }
      setTimeout(() => {
        setAssignmentSuccess(false);
        setAssignmentLink("");
      }, 4000);
    }
  };

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Bilingual FAQs
  const faqs = [
    {
      q: {
        bn: "ক্লাস মিস করলে কি কোনো রেকর্ডিং পাওয়া যাবে?",
        en: "Will there be any recordings if I miss a class?"
      },
      a: {
        bn: "হ্যাঁ, প্রতিটি ক্লাস শেষ হওয়ার ২৪ ঘণ্টার মধ্যে আমাদের প্রিমিয়াম স্টুডেন্ট পোর্টালে ক্লাস রেকর্ডিং ও লেকচার শিট আপলোড করে দেওয়া হবে, যা আপনি যেকোনো সময় দেখতে পারবেন।",
        en: "Yes, class recordings and lecture sheets will be uploaded to our premium student portal within 24 hours of each class, accessible anytime."
      }
    },
    {
      q: {
        bn: "কোর্স ফি কি কিস্তিতে দেওয়া সম্ভব?",
        en: "Can the course fee be paid in installments?"
      },
      a: {
        bn: "হ্যাঁ, ভর্তি ফি পরিশোধ সাপেক্ষে প্রতিটি কোর্সের নির্ধারিত ফি সহজ মাসিক কিস্তিতে পরিশোধের সুযোগ রয়েছে। বিস্তারিত জানতে আমাদের হেল্পলাইনে যোগাযোগ করতে পারেন।",
        en: "Yes, subject to paying the admission fee, course tuition fees can be paid in easy monthly installments. Contact our helpline for more details."
      }
    },
    {
      q: {
        bn: "সার্টিফিকেট কি আন্তর্জাতিকভাবে ব্যবহারযোগ্য?",
        en: "Is the certificate internationally recognizable?"
      },
      a: {
        bn: "আমাদের প্রতিটি ডিপ্লোমা সার্টিফিকেট গ্লোবাল স্ট্যান্ডার্ড এবং ডিজিটাল কপি আকারে যাচাইযোগ্য কিউআর কোডসহ প্রদান করা হবে, যা আপনি বিভিন্ন প্রফেশনাল ক্ষেত্রে এবং জীবনবৃত্তান্তে ব্যবহার করতে পারবেন।",
        en: "Every diploma certificate we issue is of global standards, provided digitally with a verifiable QR code, which you can use in various professional fields and resumes."
      }
    }
  ];

  return (
    <div className="bg-[#121110] text-stone-100 min-h-screen selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* Dynamic Sticky Header */}
      <Header 
        onNavigate={handleNavigate} 
        onOpenEnroll={() => handleOpenEnroll()} 
      />

      {/* Hero Entrance Banner */}
      <div id="hero">
        <HeroSection 
          onDiscover={() => handleNavigate("courses")} 
          onEnroll={() => handleOpenEnroll()} 
        />
      </div>

      <main className="pb-24">
        
        {/* SECTION 1: Personal Registered Student Corner Workspace (Saves state real-time) */}
        {registeredStudent && (
          <section id="student-workspace" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-20">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-stone-900 via-stone-950 to-stone-900 border border-emerald-500/30 rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-2xl"
            >
              {/* Green active ambient background overlay */}
              <div className="absolute top-0 right-0 w-[250px] h-[250px] rounded-full bg-emerald-500/5 blur-[100px] pointer-events-none"></div>
              
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-stone-800 relative z-10">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold font-mono text-emerald-400 uppercase tracking-widest bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
                        {t("workspaceTitle")}
                      </span>
                      <span className="inline-flex items-center gap-1 bg-amber-500/10 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        <Flame className="w-3 h-3 text-orange-500 animate-pulse" />
                        {registeredStudent.xp || 150} XP
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-black text-stone-100 mt-1">
                      {t("welcomeBack")} {registeredStudent.name}!
                    </h3>
                  </div>
                </div>

                {/* Switch Workspace Tabs */}
                <div className="flex bg-stone-950 p-1 rounded-xl border border-stone-850 w-full md:w-auto">
                  <button
                    onClick={() => setActiveStudentTab("courses")}
                    className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeStudentTab === "courses"
                        ? "bg-emerald-500 text-stone-950"
                        : "text-stone-400 hover:text-stone-200"
                    }`}
                  >
                    {t("tabMyCourses")}
                  </button>
                  <button
                    onClick={() => setActiveStudentTab("schedule")}
                    className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeStudentTab === "schedule"
                        ? "bg-emerald-500 text-stone-950"
                        : "text-stone-400 hover:text-stone-200"
                    }`}
                  >
                    {t("tabLiveLink")}
                  </button>
                  <button
                    onClick={() => setActiveStudentTab("homework")}
                    className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeStudentTab === "homework"
                        ? "bg-emerald-500 text-stone-950"
                        : "text-stone-400 hover:text-stone-200"
                    }`}
                  >
                    {t("tabSubmitHomework")}
                  </button>
                </div>
              </div>

              {/* Workspace Content Panels */}
              <div className="mt-8 relative z-10">
                {activeStudentTab === "courses" && (
                  <div className="space-y-6">
                    <p className="text-sm text-stone-300">
                      {t("registeredMsg")}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {registeredStudent.courses.map((courseId: string) => {
                        const course = COURSES.find(c => c.id === courseId);
                        if (!course) return null;
                        return (
                          <div key={courseId} className="p-4.5 rounded-2xl bg-stone-950/60 border border-stone-800 flex items-start justify-between gap-4">
                            <div>
                              <span className="text-[10px] font-bold text-amber-400 font-mono tracking-widest uppercase">
                                DIPLOMA PROGRAM
                              </span>
                              <h4 className="text-base font-bold text-stone-100 mt-0.5">
                                {translate(course.title.bn, course.title.en)}
                              </h4>
                              <p className="text-xs text-stone-400 italic mt-0.5">
                                {translate(course.subtitle.bn, course.subtitle.en)}
                              </p>
                              
                              <div className="mt-4 flex flex-wrap gap-2">
                                <span className="px-2 py-1 bg-stone-900 border border-stone-850 rounded text-[10px] font-semibold text-stone-300">
                                  {t("durationLabel")} {translate(course.duration.bn, course.duration.en)}
                                </span>
                                <span className="px-2 py-1 bg-stone-900 border border-stone-850 rounded text-[10px] font-semibold text-stone-300">
                                  {t("sessionLabel")}
                                </span>
                                <span className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded text-[10px] font-bold text-emerald-400">
                                  {t("activeStatus")}
                                </span>
                              </div>
                            </div>
                            
                            <button
                              onClick={() => {
                                  setActiveCourseId(courseId);
                                  handleNavigate("syllabus-tracker");
                              }}
                              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-stone-900 hover:bg-stone-850 border border-stone-800 text-amber-400 whitespace-nowrap cursor-pointer flex items-center gap-1 shrink-0"
                            >
                              {t("syllabusBtn")} <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {activeStudentTab === "schedule" && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-5 rounded-2xl bg-stone-950 border border-stone-850 space-y-3 col-span-2">
                      <h4 className="text-sm font-bold text-stone-100 flex items-center gap-2">
                        <Video className="w-4 h-4 text-emerald-400 animate-pulse" />
                        {t("livePortalTitle")}
                      </h4>
                      <p className="text-xs text-stone-400 leading-relaxed">
                        {t("livePortalDesc")}
                      </p>

                      <div className="p-3 bg-stone-900 rounded-xl border border-stone-800 text-xs text-stone-300 flex justify-between items-center">
                        <div>
                          <strong className="text-amber-400 block mb-0.5">{t("scheduleLabel")}</strong>
                          <span>{t("scheduleTime")}</span>
                        </div>
                        <span className="text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2 py-1 rounded">
                          {t("scheduledTag")}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-3 pt-2">
                        <a 
                          href="https://zoom.us" 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-stone-950 cursor-pointer"
                        >
                          {t("joinZoomBtn")}
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <a 
                          href="#materials" 
                          onClick={(e) => { 
                            e.preventDefault(); 
                            alert(translate(
                              "লেকচার শিট ড্রাইভ ফোল্ডারে এখনো কোনো ফাইল আপলোড করা হয়নি। ভর্তি নিশ্চিতকরণের পর ৩ কর্মদিবসের মধ্যে মেইলে ম্যাটেরিয়াল লিংক দেওয়া হবে।",
                              "No files have been uploaded to the Lecture Sheets folder yet. Material links will be sent to your email within 3 working days after admission confirmation."
                            )); 
                          }}
                          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-stone-900 border border-stone-800 hover:bg-stone-850 text-stone-200 cursor-pointer"
                        >
                          {t("downloadSheetsBtn")}
                        </a>
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-stone-950 border border-stone-850 space-y-3">
                      <h4 className="text-sm font-bold text-stone-100 flex items-center gap-2">
                        <Info className="w-4 h-4 text-amber-400" />
                        {t("announcementsTitle")}
                      </h4>
                      <ul className="text-xs text-stone-300 space-y-2.5 leading-relaxed">
                        <li className="flex gap-1.5 items-start">
                          <span className="text-emerald-500 font-bold shrink-0">•</span>
                          <span>{t("announcement1")}</span>
                        </li>
                        <li className="flex gap-1.5 items-start">
                          <span className="text-emerald-500 font-bold shrink-0">•</span>
                          <span>{t("announcement2")}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {activeStudentTab === "homework" && (
                  <div className="p-5 rounded-2xl bg-stone-950 border border-stone-850 max-w-xl">
                    <h4 className="text-sm font-bold text-stone-100 flex items-center gap-2 mb-2">
                      <FileText className="w-4 h-4 text-amber-400" />
                      {t("homeworkTitle")}
                    </h4>
                    <p className="text-xs text-stone-400 leading-relaxed mb-4">
                      {t("homeworkDesc")}
                    </p>

                    {assignmentSuccess ? (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 text-xs font-bold text-center space-y-1"
                      >
                        <p>{t("assignmentSuccessTitle")}</p>
                        <p className="text-[10px] text-stone-400 font-normal">{t("assignmentSuccessDesc")}</p>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleAssignmentSubmit} className="space-y-3">
                        <div>
                          <label className="block text-[10px] font-bold text-stone-400 mb-1 font-mono uppercase">
                            {t("driveLinkLabel")}
                          </label>
                          <input
                            type="url"
                            required
                            value={assignmentLink}
                            onChange={(e) => setAssignmentLink(e.target.value)}
                            placeholder={t("assignmentPlaceholder")}
                            className="w-full bg-stone-900 border border-stone-800 focus:border-emerald-500 focus:outline-none rounded-xl py-2.5 px-4 text-xs font-mono text-stone-200 transition-colors"
                          />
                        </div>
                        <button
                          type="submit"
                          className="px-4 py-2 rounded-xl text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 transition-all cursor-pointer"
                        >
                          {t("submitBtn")}
                        </button>
                      </form>
                    )}
                  </div>
                )}
              </div>

              {/* Reset Registration option */}
              <div className="mt-8 pt-4 border-t border-stone-850 flex justify-between items-center text-xs text-stone-500">
                <span>{t("resetNotice")}</span>
                <button
                  onClick={handleResetRegistration}
                  className="hover:text-rose-400 font-bold transition-colors cursor-pointer text-[11px] underline"
                >
                  {t("resetBtn")}
                </button>
              </div>
            </motion.div>
          </section>
        )}

        {/* SECTION 2: Course Catalog Grid */}
        <section id="courses" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-20">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 mb-3 border border-amber-500/20">
              <BookOpen className="w-3.5 h-3.5" />
              {t("catalogBadge")}
            </span>
            <h2 className="text-3xl font-extrabold text-stone-100 tracking-tight">
              {t("catalogTitle")}
            </h2>
            <p className="text-stone-400 text-sm md:text-base max-w-2xl mx-auto mt-2 leading-relaxed">
              {t("catalogDesc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {COURSES.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                isSelected={course.id === activeCourseId}
                onSelect={(id) => {
                  setActiveCourseId(id);
                  handleNavigate("syllabus-tracker");
                }}
                onEnroll={(id) => handleOpenEnroll(id)}
              />
            ))}
          </div>
        </section>

        {/* SECTION 3: 3D Interactive Module Syllabus Inspector */}
        <section id="syllabus-tracker" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-20">
          <div className="mb-8 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-extrabold text-stone-100">
              {t("syllabusTrackerTitle")}
            </h2>
            <p className="text-stone-400 text-sm mt-1 max-w-2xl">
              {t("syllabusTrackerDesc")}
            </p>
          </div>

          <ModuleInspector initialCourseId={activeCourseId} />
        </section>

        {/* SECTION 4: Why Choose Us Grid */}
        <section id="why-us" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-20">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 mb-3 border border-amber-500/20">
              <Award className="w-3.5 h-3.5" />
              {t("whyUsBadge")}
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-stone-100">
              {t("whyUsTitle")}
            </h2>
            <p className="text-stone-400 text-sm mt-2 max-w-xl mx-auto leading-relaxed">
              {t("whyUsDesc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ADVANTAGES.map((adv, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="p-5 rounded-2xl bg-stone-900 border border-stone-800/80 hover:border-amber-400/30 hover:shadow-lg transition-all"
              >
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-mono font-bold text-xs mb-4">
                  0{idx + 1}
                </div>
                <h4 className="text-sm font-bold text-stone-100 mb-2 leading-tight">
                  {translate(adv.title.bn, adv.title.en)}
                </h4>
                <p className="text-xs text-stone-400 leading-relaxed font-medium">
                  {translate(adv.description.bn, adv.description.en)}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SECTION 5: Methodology, Assessments, and Certification */}
        <section id="grading" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-20">
          <MethodologyStats />
        </section>

        {/* SECTION 6: Course Tuition Fee Structure Table */}
        <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-20">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 mb-3 border border-amber-500/20">
              <TrendingUp className="w-3.5 h-3.5" />
              {t("pricingBadge")}
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-stone-100">
              {t("pricingTitle")}
            </h2>
            <p className="text-stone-400 text-sm mt-2 max-w-xl mx-auto leading-relaxed">
              {t("pricingDesc")}
            </p>
          </div>

          {/* Pricing Table Desktop View */}
          <div className="overflow-hidden border border-stone-800 rounded-3xl bg-stone-900 shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-stone-950 text-stone-400 font-bold border-b border-stone-850">
                    <th className="p-4 sm:p-5">{t("thCourseName")}</th>
                    <th className="p-4 sm:p-5">{t("thDuration")}</th>
                    <th className="p-4 sm:p-5 text-right">{t("thAdmission")}</th>
                    <th className="p-4 sm:p-5 text-right">{t("thCourseFee")}</th>
                    <th className="p-4 sm:p-5 text-right text-amber-400">{t("thTotal")}</th>
                    <th className="p-4 sm:p-5 text-center">{t("thAction")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-850 text-stone-300 font-medium">
                  {COURSES.map((course) => (
                    <tr key={course.id} className="hover:bg-stone-950/40 transition-colors">
                      <td className="p-4 sm:p-5">
                        <div className="font-bold text-stone-100">
                          {translate(course.title.bn, course.title.en)}
                        </div>
                        <div className="text-[11px] text-amber-400 font-medium">
                          {translate(course.subtitle.bn, course.subtitle.en)}
                        </div>
                      </td>
                      <td className="p-4 sm:p-5 whitespace-nowrap">
                        <span className="px-2 py-1 bg-stone-950 border border-stone-850 rounded text-xs font-semibold">
                          {translate(course.duration.bn, course.duration.en)} ({translate(course.weeks.bn, course.weeks.en)})
                        </span>
                      </td>
                      <td className="p-4 sm:p-5 text-right font-mono">৳{course.admissionFee.toLocaleString()}</td>
                      <td className="p-4 sm:p-5 text-right font-mono">৳{course.courseFee.toLocaleString()}</td>
                      <td className="p-4 sm:p-5 text-right font-mono text-amber-400 font-extrabold text-base">
                        ৳{course.totalFee.toLocaleString()}
                      </td>
                      <td className="p-4 sm:p-5 text-center whitespace-nowrap">
                        <button
                          onClick={() => handleOpenEnroll(course.id)}
                          className="px-4 py-2 rounded-xl text-xs font-extrabold bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 hover:brightness-110 active:scale-98 transition-all cursor-pointer"
                        >
                          {t("enrollBtn")}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Included Services Panel */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 p-5 rounded-2xl bg-stone-950 border border-stone-850">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3 font-mono">
                {t("policyTitle")}
              </h4>
              <ul className="text-xs text-stone-300 space-y-2.5 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold shrink-0">✓</span>
                  <span>{translate(PAYMENT_INFO.oneTimeTitle.bn, PAYMENT_INFO.oneTimeTitle.en)}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold shrink-0">✓</span>
                  <span>{translate(PAYMENT_INFO.paymentMethod.bn, PAYMENT_INFO.paymentMethod.en)}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold shrink-0">✓</span>
                  <span>{translate(PAYMENT_INFO.confirmation.bn, PAYMENT_INFO.confirmation.en)}</span>
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-stone-950 border border-stone-850">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3 font-mono">
                {t("includedTitle")}
              </h4>
              <div className="space-y-2">
                {INCLUDED_SERVICES.map((serv, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-stone-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{translate(serv.bn, serv.en)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQs / Helpful Accordions */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-extrabold text-stone-100">{t("faqTitle")}</h2>
            <p className="text-xs text-stone-400 mt-1">{t("faqSubtitle")}</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-4.5 rounded-2xl bg-stone-900 border border-stone-850">
                <h4 className="text-xs sm:text-sm font-bold text-stone-100 mb-1.5 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  {translate(faq.q.bn, faq.q.en)}
                </h4>
                <p className="text-xs text-stone-400 leading-relaxed font-medium">
                  {translate(faq.a.bn, faq.a.en)}
                </p>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Elegant Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Checkout Enrollment Portal Modal Overlay */}
      <AnimatePresence>
        {showEnrollModal && (
          <EnrollmentPortal
            selectedCourseId={enrollCourseId}
            onClose={() => setShowEnrollModal(false)}
            onSuccess={handleEnrollSuccess}
          />
        )}
      </AnimatePresence>

    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainAppContent />
    </LanguageProvider>
  );
}
