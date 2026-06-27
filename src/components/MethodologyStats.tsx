import React, { useState } from "react";
import { 
  Video, 
  Award, 
  FileCheck,
  FileText,
  UserCheck,
  Sparkles
} from "lucide-react";
import { METHODOLOGY } from "../data";
import { useLanguage } from "../context/LanguageContext";

export default function MethodologyStats() {
  const [activeTab, setActiveTab] = useState<"grading" | "certification">("grading");
  const { t, translate } = useLanguage();

  return (
    <div className="w-full rounded-3xl glass-panel p-6 md:p-8 relative overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute top-0 right-0 w-[200px] h-[200px] rounded-full bg-emerald-500/5 blur-[80px] pointer-events-none"></div>

      {/* Head section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-white/10 mb-8 relative z-10">
        <div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-[#34d399] mb-2 border border-emerald-500/20">
            <Video className="w-3.5 h-3.5" />
            {t("methodologyBadge")}
          </span>
          <h3 className="text-xl md:text-2xl font-extrabold text-white">
            {t("methodologyTitle")}
          </h3>
          <p className="text-sm text-white/60 mt-1">
            {t("methodologyDesc")}
          </p>
        </div>

        {/* Toggle buttons */}
        <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => setActiveTab("grading")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "grading"
                ? "bg-emerald-500 text-white shadow"
                : "text-white/60 hover:text-white"
            }`}
          >
            {t("gradingTab")}
          </button>
          <button
            onClick={() => setActiveTab("certification")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "certification"
                ? "bg-emerald-500 text-white shadow"
                : "text-white/60 hover:text-white"
            }`}
          >
            {t("certificationTab")}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Left Column: Platform details & Lecture recordings information */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Video className="w-4 h-4 text-emerald-400" />
              {t("onlinePlatformTitle")}
            </h4>
            <p className="text-xs text-white/75 leading-relaxed">
              {t("onlinePlatformDesc")}
            </p>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center">
                <span className="text-xs font-bold text-white/90 mb-1">Zoom Meeting</span>
                <span className="text-[10px] text-emerald-400 font-semibold font-mono">{t("zoomSub")}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center">
                <span className="text-xs font-bold text-white/90 mb-1">Google Meet</span>
                <span className="text-[10px] text-cyan-400 font-semibold font-mono">{t("meetSub")}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-white/80 leading-normal flex items-start gap-2">
              <span className="text-emerald-400 text-base font-bold">✓</span>
              <span><strong>{t("recordingsLabel")}</strong> {translate(METHODOLOGY.recordings.bn, METHODOLOGY.recordings.en)}</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              "Knowledge • Skills • Values"
            </h4>
            <p className="text-xs text-white/75 leading-relaxed">
              {translate(
                "আমাদের স্লোগানের প্রতিটি কথা প্রতিটি মডিউলে প্রতিফলিত হয়। আমরা বিশ্বাস করি প্রকৃত জ্ঞান অর্জনের সাথে সাথে বাস্তবমুখী দক্ষতা ও মননশীল ইসলামী মূল্যবোধের বিকাশ অত্যন্ত প্রয়োজনীয়।",
                "Every word of our slogan is reflected in each and every module. We believe that along with acquiring true knowledge, developing practical skills and mindful Islamic values is absolutely necessary."
              )}
            </p>
          </div>
        </div>

        {/* Right Column: Dynamic toggling content */}
        <div className="lg:col-span-7">
          {activeTab === "grading" ? (
            /* Grading structures with gorgeous progress tracks */
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white/55 mb-2 font-mono">{t("gradingHeader")}</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {METHODOLOGY.evaluations.map((evalItem, idx) => {
                  // Determine icon/color
                  let icon = <UserCheck className="w-5 h-5 text-emerald-400" />;
                  let colorClass = "from-emerald-500 to-emerald-600";
                  let bgGlow = "bg-emerald-500/10";
                  
                  if (idx === 1) {
                    icon = <FileText className="w-5 h-5 text-teal-400" />;
                    colorClass = "from-teal-400 to-teal-500";
                    bgGlow = "bg-teal-500/10";
                  } else if (idx === 2) {
                    icon = <FileCheck className="w-5 h-5 text-cyan-400" />;
                    colorClass = "from-cyan-400 to-cyan-500";
                    bgGlow = "bg-cyan-500/10";
                  } else if (idx === 3) {
                    icon = <Award className="w-5 h-5 text-emerald-300" />;
                    colorClass = "from-emerald-400 to-[#34d399]";
                    bgGlow = "bg-emerald-500/15";
                  }

                  return (
                    <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4 hover:border-white/20 transition-all">
                      <div className={`p-3 rounded-xl ${bgGlow} shrink-0`}>
                        {icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline mb-1">
                          <h5 className="text-xs sm:text-sm font-bold text-white/90 truncate">{translate(evalItem.name.bn, evalItem.name.en)}</h5>
                          <span className="text-sm font-extrabold font-mono text-white">{evalItem.percentage}%</span>
                        </div>
                        {/* Progress bar percentage width */}
                        <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                          <div 
                            className={`h-full bg-gradient-to-r ${colorClass} rounded-full`}
                            style={{ width: `${evalItem.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-[11px] text-white/60 leading-relaxed font-mono">
                💡 <strong className="text-emerald-400">{t("examMethodLabel")}</strong> {t("examMethodDesc")}
              </div>
            </div>
          ) : (
            /* Certifications */
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white/55 mb-2 font-mono">{t("certsHeader")}</h4>
              
              <div className="space-y-3">
                {METHODOLOGY.certifications.map((cert, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all flex gap-3.5">
                    <span className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[#34d399] text-xs font-bold flex items-center justify-center shrink-0">
                      0{idx + 1}
                    </span>
                    <div>
                      <h5 className="text-sm font-bold text-white tracking-tight">{translate(cert.title.bn, cert.title.en)}</h5>
                      <p className="text-xs text-white/60 leading-normal mt-1">{translate(cert.description.bn, cert.description.en)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
