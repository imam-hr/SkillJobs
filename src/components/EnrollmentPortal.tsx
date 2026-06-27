import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  CreditCard, 
  User, 
  Phone, 
  Mail, 
  CheckCircle, 
  Sparkles, 
  ArrowRight, 
  Receipt,
  AlertCircle,
  Copy,
  Check
} from "lucide-react";
import { Course, COURSES, PAYMENT_INFO } from "../data";
import { useLanguage } from "../context/LanguageContext";

interface EnrollmentPortalProps {
  onClose: () => void;
  selectedCourseId?: string;
  onSuccess: (data: { studentName: string; enrolledCourseIds: string[] }) => void;
}

export default function EnrollmentPortal({ onClose, selectedCourseId, onSuccess }: EnrollmentPortalProps) {
  const { t, translate } = useLanguage();

  // Input fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  
  // Selection
  const [selectedCourses, setSelectedCourses] = useState<string[]>(
    selectedCourseId ? [selectedCourseId] : [COURSES[0].id]
  );

  const [paymentMethod, setPaymentMethod] = useState<"bkash" | "nagad" | "bank">("bkash");
  const [paymentTxn, setPaymentTxn] = useState("");
  const [step, setStep] = useState<1 | 2>(1); // 1 = Registration form, 2 = Simulated Receipt
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const toggleCourseSelection = (courseId: string) => {
    if (selectedCourses.includes(courseId)) {
      if (selectedCourses.length > 1) {
        setSelectedCourses(selectedCourses.filter(id => id !== courseId));
      }
    } else {
      setSelectedCourses([...selectedCourses, courseId]);
    }
  };

  // Fee calculation
  const calculatedFees = selectedCourses.reduce(
    (acc, cId) => {
      const course = COURSES.find(c => c.id === cId);
      if (course) {
        acc.admission += course.admissionFee;
        acc.tuition += course.courseFee;
        acc.total += course.totalFee;
      }
      return acc;
    },
    { admission: 0, tuition: 0, total: 0 }
  );

  const handleCopyPaymentNo = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError(translate("আপনার নাম প্রদান করুন", "Please provide your full name"));
      return;
    }
    if (!phone.trim() || phone.length < 11) {
      setError(translate("সকিক ১১-ডিজিটের মোবাইল নম্বর প্রদান করুন", "Please provide a valid 11-digit mobile number"));
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setError(translate("সঠিক ইমেইল এড্রেস প্রদান করুন", "Please provide a valid email address"));
      return;
    }
    setError("");
    setStep(2); // Go to payment instruction/receipt page
  };

  const handleCompletePaymentSimulation = () => {
    // Save to local storage for persistent student dashboard state!
    const studentData = {
      name,
      phone,
      email,
      courses: selectedCourses,
      paymentMethod,
      txnId: paymentTxn || "TXN-" + Math.random().toString(36).substring(2, 9).toUpperCase(),
      date: new Date().toLocaleDateString(translate("bn-BD", "en-US")),
      fees: calculatedFees.total
    };

    localStorage.setItem("islamic_academy_student", JSON.stringify(studentData));
    
    // Fire callback to parent applet to refresh student view
    onSuccess({
      studentName: name,
      enrolledCourseIds: selectedCourses
    });
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/40 backdrop-blur-md overflow-y-auto cursor-pointer"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="relative glass-panel rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl my-8 cursor-default"
      >
        {/* Decorative Top header gradient bar */}
        <div className="h-2 bg-gradient-to-r from-emerald-500 via-emerald-400 to-[#34d399]"></div>

        {/* Modal Header */}
        <div className="relative p-5 sm:p-6 border-b border-white/10 pr-14 sm:pr-16">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              {t("enrollmentHeader")}
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">
              {step === 1 ? t("step1Header") : t("step2Header")}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 sm:top-6 sm:right-6 p-2 rounded-full bg-white/5 text-white/60 hover:text-white hover:bg-white/10 hover:scale-105 active:scale-95 transition-all border border-white/10 shadow-sm flex items-center justify-center cursor-pointer z-10"
            aria-label="Close"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {error && (
          <div className="px-6 pt-4">
            <div className="flex items-center gap-2 p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs font-semibold">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          </div>
        )}

        {step === 1 ? (
          /* Step 1: Input Registration Fields & Select Courses */
          <form onSubmit={handleRegisterSubmit} className="p-6 space-y-6">
            
            {/* User Info inputs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-white/60 mb-1.5 uppercase tracking-wider">
                  {t("studentNameLabel")}
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t("studentNamePlaceholder")}
                    className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-emerald-400 focus:outline-none rounded-xl py-2.5 pl-10 pr-4 text-sm text-white transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-white/60 mb-1.5 uppercase tracking-wider">
                  {t("phoneLabel")}
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="tel"
                    required
                    maxLength={11}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    placeholder={t("phonePlaceholder")}
                    className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-emerald-400 focus:outline-none rounded-xl py-2.5 pl-10 pr-4 text-sm text-white transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-white/60 mb-1.5 uppercase tracking-wider">
                  {t("emailLabel")}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("emailPlaceholder")}
                    className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-emerald-400 focus:outline-none rounded-xl py-2.5 pl-10 pr-4 text-sm text-white transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Course Selector Checklist */}
            <div>
              <label className="block text-xs font-bold text-white/60 mb-2.5 uppercase tracking-wider">
                {t("selectCourseLabel")}
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {COURSES.map((course) => {
                  const isChecked = selectedCourses.includes(course.id);
                  return (
                    <div
                      key={course.id}
                      onClick={() => toggleCourseSelection(course.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        isChecked
                          ? "bg-white/10 border-emerald-400 shadow-md"
                          : "bg-white/5 border-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${
                          isChecked ? "bg-emerald-500 border-emerald-500 text-white" : "border-white/20"
                        }`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3.5]" />}
                        </div>
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-white">
                            {translate(course.title.bn, course.title.en)}
                          </h4>
                          <p className="text-[10px] text-emerald-400 font-medium">
                            {translate(course.subtitle.bn, course.subtitle.en)}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-extrabold text-white">
                        ৳{course.totalFee.toLocaleString()}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Fee structure Calculation Details */}
            <div className="bg-white/5 rounded-2xl border border-white/10 p-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white/50 mb-3 font-mono">
                {t("feeCalcLabel")}
              </h4>
              
              <div className="space-y-2 text-xs md:text-sm text-white/80">
                <div className="flex justify-between">
                  <span>{t("totalAdmissionFeeLabel")}</span>
                  <span className="font-mono font-semibold">৳{calculatedFees.admission.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t("totalTuitionFeeLabel")}</span>
                  <span className="font-mono font-semibold">৳{calculatedFees.tuition.toLocaleString()}</span>
                </div>
                
                <div className="border-t border-white/10 pt-3 flex justify-between items-center text-white font-bold">
                  <span className="text-sm">{t("totalPayableLabel")}</span>
                  <span className="text-emerald-400 font-mono text-lg font-extrabold">
                    ৳{calculatedFees.total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Terms disclaimer */}
            <p className="text-[11px] text-white/40 leading-relaxed font-medium">
              * {translate(PAYMENT_INFO.oneTimeTitle.bn, PAYMENT_INFO.oneTimeTitle.en)} {translate(PAYMENT_INFO.paymentMethod.bn, PAYMENT_INFO.paymentMethod.en)}
            </p>

            {/* Action buttons (Cancel / Next) */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3.5 rounded-xl text-xs font-bold text-white/80 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-rose-400 hover:border-rose-500/30 transition-all cursor-pointer text-center"
              >
                {translate("বাতিল করুন", "Cancel")}
              </button>
              
              <button
                type="submit"
                className="flex-2 flex items-center justify-center gap-2 py-3.5 rounded-xl font-extrabold text-xs sm:text-sm text-white bg-gradient-to-r from-emerald-500 via-[#34d399] to-emerald-600 hover:brightness-110 transition-all cursor-pointer shadow-lg shadow-emerald-500/20"
              >
                {t("nextPaymentStep")}
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>

          </form>
        ) : (
          /* Step 2: Payment Gateway instructions & simulated print receipt */
          <div className="p-6 space-y-6">
            
            {/* Payment instructions */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-emerald-400" />
                {t("paymentGuideTitle")}
              </h4>
              <p className="text-xs text-white/80 leading-relaxed">
                {translate(
                  `নিচের যেকোনো একটি মার্চেন্ট নম্বরে সর্বমোট ৳${calculatedFees.total.toLocaleString()} টাকা সেন্ড মানি অথবা পেমেন্ট করুন। পেমেন্ট করা হয়ে গেলে ট্রানজেকশন আইডি টি নিচে প্রদান করে ভর্তি নিশ্চিত করুন।`,
                  `Please send a total of ৳${calculatedFees.total.toLocaleString()} to any of our merchant numbers below. Once paid, enter your Transaction ID to complete your admission.`
                )}
              </p>

              {/* Channel Selector */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("bkash")}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    paymentMethod === "bkash"
                      ? "bg-pink-500/20 border-pink-500/50 text-pink-400"
                      : "bg-white/5 border-white/10 text-white/60 hover:text-white"
                  }`}
                >
                  {t("bkashPersonal")}
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("nagad")}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    paymentMethod === "nagad"
                      ? "bg-orange-500/20 border-orange-500/50 text-orange-400"
                      : "bg-white/5 border-white/10 text-white/60 hover:text-white"
                  }`}
                >
                  {t("nagadPersonal")}
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("bank")}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    paymentMethod === "bank"
                      ? "bg-teal-500/20 border-teal-500/50 text-teal-400"
                      : "bg-white/5 border-white/10 text-white/60 hover:text-white"
                  }`}
                >
                  {t("bankTransfer")}
                </button>
              </div>

              {/* Dynamic Number details */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-white/45 font-mono font-bold block uppercase">
                    {paymentMethod === "bkash" ? "bKash" : paymentMethod === "nagad" ? "Nagad" : "Islamic Bank Ltd."}
                  </span>
                  <span className="text-sm font-bold font-mono text-white">
                    {paymentMethod === "bkash" ? "01755-123456" : paymentMethod === "nagad" ? "01988-654321" : "A/C: 2050-1456-987"}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyPaymentNo(paymentMethod === "bkash" ? "01755-123456" : paymentMethod === "nagad" ? "01988-654321" : "2050-1456-987")}
                  className="p-1.5 rounded-lg bg-white/5 text-white/60 hover:text-white transition-colors text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? t("copiedText") : t("copyNumberBtn")}
                </button>
              </div>
            </div>

            {/* Simulated Receipt Generator */}
            <div className="relative border border-emerald-500/20 rounded-2xl bg-white/5 p-5 shadow-inner overflow-hidden">
              {/* Receipt punch holes background decoration */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-[radial-gradient(circle,#052e16_3px,transparent_3px)] bg-[size:10px_10px] opacity-60"></div>
              
              <div className="flex items-center justify-between mb-4 mt-1 border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-emerald-400" />
                  <h4 className="text-xs font-mono font-extrabold text-white/80 uppercase tracking-widest">
                    {t("officialStudentReceipt")}
                  </h4>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono font-extrabold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  {translate("অনুমোদন অপেক্ষমাণ", "PENDING CONFIRMATION")}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-y-2.5 text-xs text-white/80 font-medium">
                <div>
                  <span className="text-white/45 block text-[10px] font-bold">{t("receiptStudentName")}</span>
                  <span className="text-white">{name}</span>
                </div>
                <div>
                  <span className="text-white/45 block text-[10px] font-bold">{t("receiptPhone")}</span>
                  <span className="text-white font-mono">{phone}</span>
                </div>
                <div>
                  <span className="text-white/45 block text-[10px] font-bold">{t("receiptEmail")}</span>
                  <span className="text-white font-mono">{email}</span>
                </div>
                <div>
                  <span className="text-white/45 block text-[10px] font-bold">{t("receiptDate")}</span>
                  <span className="text-white font-mono">
                    {new Date().toLocaleDateString(translate("bn-BD", "en-US"))}
                  </span>
                </div>

                <div className="col-span-2 pt-2 border-t border-white/10">
                  <span className="text-white/45 block text-[10px] font-bold mb-1">{t("receiptEnrolledCourses")}</span>
                  <div className="space-y-1.5">
                    {selectedCourses.map((cId) => {
                      const course = COURSES.find(c => c.id === cId);
                      return (
                        <div key={cId} className="flex justify-between items-center text-[11px] bg-white/5 p-2 rounded-lg border border-white/10">
                          <span className="text-white/80 font-bold">
                            {translate(course?.title.bn, course?.title.en)}
                          </span>
                          <span className="font-mono text-white">৳{course?.totalFee.toLocaleString()}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="col-span-2 pt-2.5 border-t border-white/10 flex justify-between items-center font-bold text-white">
                  <span>{t("receiptGrandTotal")}</span>
                  <span className="text-emerald-400 font-mono text-base">৳{calculatedFees.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Input Txn simulated */}
            <div>
              <label className="block text-xs font-bold text-white/60 mb-1.5 uppercase tracking-wider">
                {t("txnIdLabel")}
              </label>
              <input
                type="text"
                value={paymentTxn}
                onChange={(e) => setPaymentTxn(e.target.value)}
                placeholder={t("txnIdPlaceholder")}
                className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-emerald-400 focus:outline-none rounded-xl py-2.5 px-4 text-sm text-white font-mono placeholder:text-white/20 transition-colors"
              />
              <p className="text-[10px] text-white/45 mt-1.5 leading-normal">
                {t("txnIdDisclaimer")}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3.5 rounded-xl text-xs font-bold text-white/60 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-rose-400 hover:border-rose-500/30 transition-all cursor-pointer text-center"
              >
                {translate("বাতিল করুন", "Cancel")}
              </button>
              
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 py-3.5 rounded-xl text-xs font-bold text-white/80 bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer text-center"
              >
                {t("goBackBtn")}
              </button>
              
              <button
                type="button"
                onClick={handleCompletePaymentSimulation}
                className="flex-2 py-3.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-400 to-emerald-500 hover:brightness-110 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/10 text-center"
              >
                <CheckCircle className="w-4 h-4 text-white" />
                {t("completeEnrollmentBtn")}
              </button>
            </div>

          </div>
        )}
      </motion.div>
    </div>
  );
}
