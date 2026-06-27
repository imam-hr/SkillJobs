import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, Menu, X, Sparkles, GraduationCap } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface HeaderProps {
  onNavigate: (section: string) => void;
  onOpenEnroll: (courseId?: string) => void;
}

export default function Header({ onNavigate, onOpenEnroll }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: t("navCourses"), id: "courses" },
    { label: t("navWhyUs"), id: "why-us" },
    { label: t("navGrading"), id: "grading" },
    { label: t("navPricing"), id: "pricing" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass-panel border-t-0 border-l-0 border-r-0 rounded-none py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => {
              onNavigate("hero");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-emerald-500 shadow-md shadow-emerald-950/30">
              <GraduationCap className="w-6 h-6 text-white stroke-[2]" />
              <div className="absolute -inset-0.5 rounded-xl bg-emerald-400 opacity-20 blur-sm -z-10 animate-pulse"></div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-semibold tracking-wider text-emerald-400 font-mono uppercase">Skill Jobs</span>
                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  <Sparkles className="w-2 h-2 text-emerald-400 animate-spin" style={{ animationDuration: '6s' }} />
                  {t("admissionOpen").toUpperCase()}
                </span>
              </div>
              <h1 className="text-sm md:text-base font-bold text-white tracking-tight leading-none">
                Islamic Learning Academy
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="text-sm font-medium text-white/80 hover:text-emerald-400 transition-colors cursor-pointer relative py-1 group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </nav>

          {/* CTAs */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Language Switcher Toggle */}
            <div className="flex bg-white/5 border border-white/10 rounded-xl p-0.5 shadow-inner">
              <button
                onClick={() => setLanguage("bn")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  language === "bn"
                    ? "bg-emerald-500 text-white shadow-md shadow-emerald-950/30"
                    : "text-white/60 hover:text-white"
                }`}
              >
                বাংলা
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  language === "en"
                    ? "bg-emerald-500 text-white shadow-md shadow-emerald-950/30"
                    : "text-white/60 hover:text-white"
                }`}
              >
                EN
              </button>
            </div>

            <button
              onClick={() => onOpenEnroll()}
              className="relative px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-emerald-500 hover:bg-emerald-400 active:scale-98 transition-all shadow-[0_4px_14px_rgba(16,185,129,0.4)] cursor-pointer overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-white" />
                {t("enrollNow")}
              </span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000"></div>
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Mini Language Switcher for mobile-only */}
            <button
              onClick={() => setLanguage(language === "bn" ? "en" : "bn")}
              className="sm:hidden px-2.5 py-1 rounded-lg border border-white/10 bg-white/5 text-xs font-bold text-emerald-400 cursor-pointer"
            >
              {language === "bn" ? "EN" : "বাংলা"}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-white/80 hover:bg-white/5 hover:text-emerald-400 transition-all focus:outline-none cursor-pointer"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden glass-panel border-l-0 border-r-0 border-b-0 rounded-none overflow-hidden"
          >
            <div className="px-4 pt-3 pb-6 space-y-3">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setIsOpen(false);
                    onNavigate(item.id);
                  }}
                  className="block w-full text-left px-4 py-3 rounded-xl text-white/80 hover:bg-white/5 hover:text-emerald-400 transition-all text-sm font-medium"
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-3 border-t border-white/10 px-4 space-y-3">
                {/* Mobile Language Switcher */}
                <div className="flex bg-white/5 border border-white/10 rounded-xl p-1 justify-between items-center">
                  <span className="text-xs font-semibold text-white/60 pl-2">ভাষা / Language</span>
                  <div className="flex bg-white/5 border border-white/10 rounded-lg p-0.5">
                    <button
                      onClick={() => setLanguage("bn")}
                      className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                        language === "bn" ? "bg-emerald-500 text-white shadow" : "text-white/60"
                      }`}
                    >
                      বাংলা
                    </button>
                    <button
                      onClick={() => setLanguage("en")}
                      className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                        language === "en" ? "bg-emerald-500 text-white shadow" : "text-white/60"
                      }`}
                    >
                      EN
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenEnroll();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-white bg-emerald-500 hover:bg-emerald-400 active:scale-98 transition-all shadow-[0_4px_14px_rgba(16,185,129,0.4)]"
                >
                  <BookOpen className="w-4 h-4" />
                  {t("enrollNow")}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
