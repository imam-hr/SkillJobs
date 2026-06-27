import React from "react";
import { motion } from "motion/react";
import { Sparkles, Calendar, BookOpen, Users, Award } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface HeroSectionProps {
  onDiscover: () => void;
  onEnroll: () => void;
}

export default function HeroSection({ onDiscover, onEnroll }: HeroSectionProps) {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]"></div>
      
      {/* Subtle decorative green ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-emerald-600/10 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-emerald-800/15 blur-[120px] pointer-events-none"></div>
 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
        {/* Sparkle badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-white/5 text-emerald-300 border border-white/10 mb-8 backdrop-blur-sm shadow-inner"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#34d399] animate-pulse" />
          <span>{t("heroBadge")}</span>
        </motion.div>
 
        {/* Brand Main Heading */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-[#34d399] text-lg md:text-xl font-bold tracking-widest font-mono mb-2 uppercase"
        >
          SKILL JOBS ISLAMIC LEARNING ACADEMY
        </motion.h2>
 
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight max-w-4xl mx-auto mb-6"
        >
          {t("heroTitleStart")}{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-[#34d399] to-emerald-200">
            {t("heroTitleHighlight")}
          </span>
        </motion.h1>
 
        {/* Academy Mission Statement */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-white/85 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-10 font-light"
        >
          {t("heroDesc")}
        </motion.p>
 
        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <button
            onClick={onEnroll}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-base text-white bg-emerald-500 hover:bg-emerald-400 active:scale-98 transition-all shadow-[0_4px_14px_rgba(16,185,129,0.4)] cursor-pointer"
          >
            {t("heroEnrollBtn")}
          </button>
          
          <button
            onClick={onDiscover}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-base text-white bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-all cursor-pointer shadow-inner backdrop-blur-md"
          >
            {t("heroExploreBtn")}
          </button>
        </motion.div>
 
        {/* Trust Indicators / Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto p-6 glass-panel rounded-3xl"
        >
          <div className="flex flex-col items-center p-3 border-r border-white/10 last:border-0 md:border-r">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-2">
              <Calendar className="w-5 h-5" />
            </div>
            <span className="text-xl md:text-2xl font-bold text-white">{t("statWeeks")}</span>
            <span className="text-xs text-white/60 font-medium">{t("statWeeksDesc")}</span>
          </div>
 
          <div className="flex flex-col items-center p-3 border-r border-white/10 last:border-0 md:border-r">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-[#34d399] mb-2">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-xl md:text-2xl font-bold text-white">{t("statDiplomas")}</span>
            <span className="text-xs text-white/60 font-medium">{t("statDiplomasDesc")}</span>
          </div>
 
          <div className="flex flex-col items-center p-3 border-r border-white/10 last:border-0 md:border-r">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-300 mb-2">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-xl md:text-2xl font-bold text-white">{t("statLive")}</span>
            <span className="text-xs text-white/60 font-medium">{t("statLiveDesc")}</span>
          </div>
 
          <div className="flex flex-col items-center p-3 last:border-0">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-[#34d399] mb-2">
              <Award className="w-5 h-5" />
            </div>
            <span className="text-xl md:text-2xl font-bold text-white">{t("statCertificates")}</span>
            <span className="text-xs text-white/60 font-medium">{t("statCertificatesDesc")}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
