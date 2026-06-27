import React from "react";
import { GraduationCap, Mail, MapPin, Phone, Shield } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface FooterProps {
  onNavigate: (section: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const { t, translate } = useLanguage();

  return (
    <footer className="glass-panel border-l-0 border-r-0 border-b-0 rounded-none text-white/80 pt-16 pb-8 relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute inset-0 opacity-[0.01] pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Brand details */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-md">
                <GraduationCap className="w-5.5 h-5.5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-extrabold text-base tracking-tight leading-none">
                  {t("brandName")}
                </h3>
                <p className="text-[11px] text-[#34d399] font-mono font-bold tracking-wider mt-1">
                  {t("slogan")}
                </p>
              </div>
            </div>

            <p className="text-xs text-white/60 leading-relaxed max-w-sm font-medium">
              {translate(
                "কুরআন ও সুন্নাহর সঠিক আলোতে ব্যক্তি, পরিবার, সমাজ ও ব্যবসায়িক জীবনকে সমৃদ্ধ করার অঙ্গীকার। জ্ঞান, দক্ষতা ও দ্বীনি মূল্যবোধের এক চমৎকার সমন্বয়।",
                "A commitment to enrich individual, family, social, and business life in the true light of Quran and Sunnah. A beautiful combination of knowledge, skills, and religious values."
              )}
            </p>

            <div className="flex items-center gap-2 text-white/60 text-xs font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{t("admissionOpen")}</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">{t("quickLinks")}</h4>
            <ul className="space-y-2.5 text-xs text-white/60 font-medium">
              <li>
                <button onClick={() => onNavigate("courses")} className="hover:text-emerald-400 transition-colors cursor-pointer text-left">
                  {t("navCourses")}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("why-us")} className="hover:text-emerald-400 transition-colors cursor-pointer text-left">
                  {t("navWhyUs")}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("grading")} className="hover:text-emerald-400 transition-colors cursor-pointer text-left">
                  {t("navGrading")}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("pricing")} className="hover:text-emerald-400 transition-colors cursor-pointer text-left">
                  {t("navPricing")}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contacts */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">{t("contactUs")}</h4>
            <ul className="space-y-3 text-xs text-white/60 font-medium">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="font-mono text-white/90 font-bold">01755-123456</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="font-mono text-white/90">support@skilljobsacademy.com</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{t("address")}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/45 font-medium">
          <p>{t("copyright")}</p>
          <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-white/40 bg-white/5 px-3 py-1 rounded-lg border border-white/10">
            <Shield className="w-3.5 h-3.5" />
            <span>{t("slogan")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
