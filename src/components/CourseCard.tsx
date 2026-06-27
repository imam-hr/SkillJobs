import React from "react";
import { motion } from "motion/react";
import { 
  Heart, 
  Briefcase, 
  TrendingUp, 
  BookOpen, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  CreditCard,
  BookOpenCheck
} from "lucide-react";
import { Course } from "../data";
import { useLanguage } from "../context/LanguageContext";

// Map icon string names to actual Lucide component objects
const iconMap: Record<string, React.ComponentType<any>> = {
  Heart: Heart,
  Briefcase: Briefcase,
  TrendingUp: TrendingUp,
  BookOpen: BookOpen,
};

interface CourseCardProps {
  course: Course;
  onSelect: (courseId: string) => void;
  onEnroll: (courseId: string) => void;
  isSelected: boolean;
}

export default function CourseCard({ course, onSelect, onEnroll, isSelected }: CourseCardProps) {
  const IconComponent = iconMap[course.iconName] || BookOpen;
  const { t, translate } = useLanguage();

  // Determine Tailwind theme classes based on course theme
  const getThemeClasses = () => {
    switch (course.colorTheme) {
      case "emerald":
        return {
          bg: "from-emerald-500/5 to-emerald-950/5 bg-white/3",
          border: "border-emerald-500/25 hover:border-emerald-400/40",
          text: "text-emerald-400",
          accentBg: "bg-emerald-500/10",
          glow: "group-hover:shadow-emerald-950/20",
          accentLine: "bg-emerald-500"
        };
      case "amber":
        return {
          bg: "from-teal-500/5 to-emerald-950/5 bg-white/3",
          border: "border-teal-500/25 hover:border-teal-400/40",
          text: "text-teal-400",
          accentBg: "bg-teal-500/10",
          glow: "group-hover:shadow-teal-950/20",
          accentLine: "bg-teal-500"
        };
      case "cyan":
        return {
          bg: "from-cyan-500/5 to-emerald-950/5 bg-white/3",
          border: "border-cyan-500/25 hover:border-cyan-400/40",
          text: "text-cyan-400",
          accentBg: "bg-cyan-500/10",
          glow: "group-hover:shadow-cyan-950/20",
          accentLine: "bg-cyan-500"
        };
      case "indigo":
      default:
        return {
          bg: "from-emerald-400/5 to-emerald-950/5 bg-white/3",
          border: "border-emerald-500/20 hover:border-emerald-400/30",
          text: "text-emerald-300",
          accentBg: "bg-emerald-500/10",
          glow: "group-hover:shadow-emerald-950/20",
          accentLine: "bg-[#34d399]"
        };
    }
  };

  const theme = getThemeClasses();
  const currentWhatYouLearn = translate(course.whatYouWillLearn.bn, course.whatYouWillLearn.en);

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`group relative flex flex-col justify-between rounded-3xl bg-gradient-to-br ${theme.bg} p-6 border ${
        isSelected ? "border-emerald-400 ring-1 ring-emerald-400/30 shadow-2xl scale-[1.01]" : theme.border
      } backdrop-blur-md shadow-lg transition-all duration-300 overflow-hidden h-full`}
    >
      {/* Accent strip on top */}
      <div className={`absolute top-0 left-0 right-0 h-1.5 ${theme.accentLine}`}></div>

      <div>
        {/* Header: Icon & Duration info */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className={`p-3 rounded-xl ${theme.accentBg} ${theme.text}`}>
            <IconComponent className="w-7 h-7" />
          </div>
          <div className="flex flex-col items-end text-xs font-medium text-white/60 font-mono space-y-1">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              {translate(course.duration.bn, course.duration.en)} ({translate(course.weeks.bn, course.weeks.en)})
            </span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              {translate(course.classesPerWeek.bn, course.classesPerWeek.en)}
            </span>
          </div>
        </div>

        {/* Course Title */}
        <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors mb-2 leading-tight">
          {translate(course.title.bn, course.title.en)}
        </h3>
        
        {/* Subtitle in current language */}
        <p className="text-sm font-semibold text-[#34d399] mb-3">
          {translate(course.subtitle.bn, course.subtitle.en)}
        </p>

        {/* Short description */}
        <p className="text-sm text-white/80 leading-relaxed mb-6 line-clamp-3">
          {translate(course.description.bn, course.description.en)}
        </p>

        {/* What you will learn section */}
        <div className="mb-6 space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white/50 mb-2 font-mono">{t("learnHeading")}</h4>
          {currentWhatYouLearn.slice(0, 3).map((learn, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-white/80">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>{learn}</span>
            </div>
          ))}
          {currentWhatYouLearn.length > 3 && (
            <p className="text-[11px] text-white/50 italic font-mono pl-6">
              +{currentWhatYouLearn.length - 3} {t("moreAdvantages")}
            </p>
          )}
        </div>
      </div>

      {/* Pricing and Action Footer */}
      <div className="mt-auto pt-4 border-t border-white/10">
        {/* Course Fee Structure */}
        <div className="mb-5 p-3 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex justify-between text-xs text-white/60 mb-1.5">
            <span>{t("thAdmission")}:</span>
            <span className="font-semibold text-white/80">৳{course.admissionFee.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-xs text-white/60 mb-2">
            <span>{t("thCourseFee")}:</span>
            <span className="font-semibold text-white/80">৳{course.courseFee.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center text-sm font-bold border-t border-white/10 pt-2 text-white/95">
            <span className="text-white/80 font-semibold">{t("thTotal")}:</span>
            <span className="text-emerald-400 font-mono text-base font-extrabold">৳{course.totalFee.toLocaleString()}</span>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onSelect(course.id)}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold text-emerald-400 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
          >
            <BookOpenCheck className="w-3.5 h-3.5 text-emerald-400" />
            {t("viewSyllabus")}
          </button>
          
          <button
            onClick={() => onEnroll(course.id)}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-500 hover:bg-emerald-400 active:scale-98 transition-all shadow-[0_4px_14px_rgba(16,185,129,0.3)] cursor-pointer"
          >
            <CreditCard className="w-3.5 h-3.5 text-white" />
            {t("enrollBtn")}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
