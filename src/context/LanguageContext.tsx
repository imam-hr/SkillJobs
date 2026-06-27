import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "bn" | "en";

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  translate: <T>(bn: T, en: T) => T;
}

const translations: Record<string, { bn: string; en: string }> = {
  // Navigation & Brand
  brandName: { bn: "Skill Jobs Islamic Learning Academy", en: "Skill Jobs Islamic Learning Academy" },
  slogan: { bn: "LEARNING FOR LIFE, GUIDED BY ISLAM", en: "LEARNING FOR LIFE, GUIDED BY ISLAM" },
  admissionOpen: { bn: "ভর্তি কার্যক্রম সক্রিয় ২০২৬", en: "Admission Open 2026" },
  navCourses: { bn: "কোর্সসমূহ", en: "Courses" },
  navWhyUs: { bn: "কেন আমরা?", en: "Why Us?" },
  navGrading: { bn: "মূল্যায়ন ও সার্টিফিকেট", en: "Grading & Certificates" },
  navPricing: { bn: "ফি কাঠামো", en: "Fees" },
  enrollNow: { bn: "ভর্তি হোন এখনই", en: "Enroll Now" },
  enrollBtn: { bn: "ভর্তি হোন", en: "Enroll Now" },

  // Hero Section
  heroBadge: { bn: "জ্ঞান • দক্ষতা • ইসলামী মূল্যবোধ", en: "Knowledge • Skills • Islamic Values" },
  heroTitleStart: { bn: "জ্ঞান, দক্ষতা ও ইসলামী মূল্যবোধের সমন্বয়ে", en: "A commitment to build the future with a blend of" },
  heroTitleHighlight: { bn: "ভবিষ্যৎ গড়ার অঙ্গীকার", en: "knowledge, skills, and Islamic values" },
  heroDesc: {
    bn: "আমাদের লক্ষ্য হলো কুরআন ও সুন্নাহর আলোকে ব্যক্তি, পরিবার, সমাজ ও ব্যবসায়িক জীবনের জন্য প্রয়োজনীয় ইসলামী জ্ঞান সহজ ও প্র্যাকটিক্যাল উপায়ে পৌঁছে দেওয়া। আমাদের ডিপ্লোমা কোর্সগুলো এমনভাবে তৈরি করা হয়েছে যাতে তাত্ত্বিক জ্ঞানের পাশাপাশি ইসলামের বাস্তবমুখী শিক্ষা অর্জন করতে পারেন।",
    en: "Our goal is to deliver essential Islamic knowledge for individual, family, social, and business life in an easy and practical way in the light of the Quran and Sunnah. Our diploma courses are designed so you can gain practical Islamic education alongside theoretical knowledge.",
  },
  heroEnrollBtn: { bn: "ভর্তি ফর্ম পূরণ করুন", en: "Fill Enrollment Form" },
  heroExploreBtn: { bn: "কোর্সগুলো এক্সপ্লোর করুন", en: "Explore Our Courses" },

  // Stats
  statWeeks: { bn: "১২+ সপ্তাহ", en: "12+ Weeks" },
  statWeeksDesc: { bn: "নিবিড় মডিউল প্রশিক্ষণ", en: "Intensive Module Training" },
  statDiplomas: { bn: "৪টি ডিপ্লোমা", en: "4 Diplomas" },
  statDiplomasDesc: { bn: "হালাল লাইফস্টাইল ও ক্যারিয়ার", en: "Halal Lifestyle & Career" },
  statLive: { bn: "১০০% লাইভ", en: "100% Live" },
  statLiveDesc: { bn: "Zoom ও Meet ইন্টারেক্টিভ ক্লাস", en: "Interactive Zoom & Meet Classes" },
  statCertificates: { bn: "৩টি সার্টিফিকেট", en: "3 Certificates" },
  statCertificatesDesc: { bn: "যোগ্যতা ও অংশগ্রহণ পুরস্কার", en: "Competence & Participation Awards" },

  // Course Grid
  catalogBadge: { bn: "আমাদের ৪টি প্রিমিয়াম ডিপ্লোমা কোর্স", en: "Our 4 Premium Diploma Courses" },
  catalogTitle: { bn: "অনлайн প্রফেশনাল কোর্স ক্যাটালগ", en: "Online Professional Course Catalog" },
  catalogDesc: {
    bn: "আপনার কাঙ্ক্ষিত কোর্সটি বেছে নিয়ে ভর্তি নিশ্চিত করুন। প্রতিটি মডিউল কুরআন ও সুন্নাহর আলোকে আধুনিক জীবনের সাথে খাপ খাইয়ে সাজানো হয়েছে।",
    en: "Choose your desired course and confirm admission. Each module is tailored to modern life in the light of the Quran and Sunnah.",
  },
  learnHeading: { bn: "কোর্স শেষে যা শিখবেন", en: "What you will learn" },
  moreAdvantages: { bn: "টি সুবিধা", en: "more advantages" },
  viewSyllabus: { bn: "সিলেবাস দেখুন", en: "View Syllabus" },

  // Interactive Syllabus
  syllabusBadge: { bn: "ইন্টারেক্টিভ লার্নিং ড্যাশবোর্ড", en: "Interactive Learning Dashboard" },
  syllabusTrackerTitle: { bn: "ইন্টারেক্টিভ সিলেবাস স্টাডি এরিয়া", en: "Interactive Syllabus Area" },
  syllabusTrackerDesc: {
    bn: "প্রতিটি কোর্সের ১২ সপ্তাহের বিশদ বিবরণী দেখতে সংশ্লিষ্ট কোর্সটি সিলেক্ট করুন। সপ্তাহগুলোতে ক্লিক করে আপনার সম্ভাব্য পাঠ্যক্রম পরখ করুন।",
    en: "Select a course to view its detailed 12-week syllabus. Click on the weeks to inspect your potential curriculum.",
  },
  syllabusTrackerTitle2: { bn: "মডিউল প্রগ্রেস ট্র্যাকার", en: "Module Progress Tracker" },
  syllabusTrackerDesc2: {
    bn: "মডিউলগুলোতে ক্লিক করে সম্পূর্ণ সিলেবাস যাচাই করুন ও অগ্রগতি ট্র্যাক করুন।",
    en: "Click on modules to review the complete syllabus and track your progress.",
  },
  changeCourse: { bn: "কোর্স পরিবর্তন করুন", en: "Change Course" },
  progressRate: { bn: "আপনার অগ্রগতির হার", en: "Your Progress Rate" },
  completedText: { bn: "সম্পন্ন হয়েছে", en: "completed" },
  completedOf: { bn: "টি", en: "of" },
  streakText: { bn: "STREAK", en: "STREAK" },
  weekText: { bn: "WEEK", en: "WEEK" },
  lectureSession: { bn: "লেকচার সেশন", en: "Lecture Session" },
  curriculumGoals: { bn: "পাঠ্যসূচী ও লক্ষ্য", en: "Curriculum & Goals" },
  moduleCompletedBtn: { bn: "এই মডিউলটি সম্পন্ন করেছেন (ক্লিক করুন বাতিল করতে)", en: "You completed this module (click to reset)" },
  moduleIncompleteBtn: { bn: "মডিউলটি সম্পন্ন হয়েছে চিহ্নিত করুন", en: "Mark this module as completed" },
  defaultModuleDetails: {
    bn: "এই মডিউলে প্রধানত সংশ্লিষ্ট বিষয়ে ইসলামী শরিয়াহর তাত্ত্বিক মূলনীতি ও সেগুলোর বাস্তব কেস স্টাডি বিশ্লেষণ করা হবে।",
    en: "This module mainly analyzes the theoretical principles of Islamic Shariah in the relevant fields and their practical case studies.",
  },
  defaultModuleBullets: {
    bn: "✓ নিয়মিত লাইভ সেশন ও প্রশ্নোত্তর পর্ব\n✓ ব্যক্তিগত মতামত বিনিময়ের বিশেষ সুযোগ\n✓ ডাউনলোডযোগ্য প্রিমিয়াম স্লাইড ও হ্যান্ডআউটস",
    en: "✓ Regular live sessions & Q&A\n✓ Special opportunities for personal feedback\n✓ Downloadable premium slides & handouts",
  },
  completed: { bn: "সম্পন্ন", en: "Completed" },
  incomplete: { bn: "অসম্পন্ন", en: "Incomplete" },

  // Instant Quiz
  quizTitle: { bn: "ইনস্ট্যান্ট স্কলার কুইজ টেস্ট", en: "Instant Scholar Quiz Test" },
  quizExplanation: { bn: "ব্যাখ্যা:", en: "Explanation:" },
  quizFooterText: { bn: "সবাঠিক উত্তর নির্বাচন করে চেক বাটনে চাপ দিন।", en: "Select the correct answer and click the check button." },
  quizCheckBtn: { bn: "উত্তর চেক করুন", en: "Check Answer" },

  // Why Us
  whyUsBadge: { bn: "কেন Skill Jobs Islamic Learning Academy?", en: "Why Choose Skill Jobs Islamic Learning Academy?" },
  whyUsTitle: { bn: "আমাদের বিশেষত্ব ও সুযোগ-সুবিধা", en: "Our Special Features & Benefits" },
  whyUsDesc: {
    bn: "আমরা আপনাকে শুধু একটি ডিগ্রি দেবো না, বরং ইসলামী মূল্যবোধের বাস্তব প্রায়োগিক অনুশীলনে সহায়তা করবো।",
    en: "We will not only give you a degree, but also assist you in the practical application of Islamic values.",
  },

  // Methodology & Grading
  methodologyBadge: { bn: "ক্লাস পরিচালনা ও মূল্যায়ন পদ্ধতি", en: "Class Management & Evaluation Method" },
  methodologyTitle: { bn: "শিক্ষাদান পদ্ধতি ও প্রশংসাপত্র", en: "Teaching Methodology & Certificates" },
  methodologyDesc: {
    bn: "আধুনিক প্রযুক্তির চমৎকার ব্যবহারের মাধ্যমে অনলাইন মূল্যায়ন ও সনদ প্রদান।",
    en: "Online evaluation and certificate issuance through the elegant use of modern technology.",
  },
  gradingTab: { bn: "মূল্যায়ন কাঠামো", en: "Evaluation Criteria" },
  certificationTab: { bn: "সনদপত্র (Certification)", en: "Certificates" },
  onlinePlatformTitle: { bn: "সরাসরি অনলাইন ক্লাস প্ল্যাটফর্ম", en: "Live Online Class Platform" },
  onlinePlatformDesc: {
    bn: "অনলাইনে ঘরে বসেই সরাসরি শিক্ষকদের সাথে ক্লাসে অংশ নিন। আমরা ক্লাসের জন্য সবচেয়ে নির্ভরযোগ্য দুটি মাধ্যম ব্যবহার করি:",
    en: "Attend classes live with teachers directly from the comfort of your home. We use the two most reliable media for classes:",
  },
  zoomSub: { bn: "লাইভ প্রশ্নোত্তর", en: "Live Q&A" },
  meetSub: { bn: "সহজ সংযোগ", en: "Easy Connection" },
  recordingsLabel: { bn: "ক্লাস রেকর্ডিং:", en: "Class Recordings:" },
  gradingHeader: { bn: "মূল্যায়ন পদ্ধতি ও শতাংশ হার", en: "Evaluation Method & Weightage" },
  examMethodLabel: { bn: "পরীক্ষা পদ্ধতি:", en: "Exam Method:" },
  examMethodDesc: {
    bn: "শিক্ষার্থীদের সশরীরে পরীক্ষা সেন্টারে যাওয়ার কোনো প্রয়োজন নেই। প্রতিটি মডিউল শেষে ও কুইজ সিস্টেমে অনলাইনেই মূল্যায়ন সম্পন্ন করা হবে।",
    en: "Students do not need to physically go to exam centers. Evaluation will be completed online after each module through quizzes and exams.",
  },
  certsHeader: { bn: "কোর্স শেষে প্রাপ্ত প্রশংসাপত্রসমূহ", en: "Certificates Awarded Upon Completion" },

  // Pricing Table
  pricingBadge: { bn: "সহজ ফি কাঠামো", en: "Simple Fee Structure" },
  pricingTitle: { bn: "কোর্স ফি ও ভর্তি তথ্য বিবরণী", en: "Course Fees & Admission Details" },
  pricingDesc: {
    bn: "স্বচ্ছ ও সহজ ফি পরিকাঠামো, যেখানে কোনো লুকানো খরচ বা অতিরিক্ত চার্জ নেই।",
    en: "Transparent and simple fee structure with no hidden charges or additional costs.",
  },
  thCourseName: { bn: "কোর্সের নাম (Course Name)", en: "Course Name" },
  thDuration: { bn: "মেয়াদ (Duration)", en: "Duration" },
  thAdmission: { bn: "ভর্তি ফি (Admission Fee)", en: "Admission Fee" },
  thCourseFee: { bn: "কোর্স ফি (Course Fee)", en: "Course Fee" },
  thTotal: { bn: "সর্বমোট (Total Cost)", en: "Total Cost" },
  thAction: { bn: "কার্যক্রম", en: "Action" },
  policyTitle: { bn: "ফি পরিশোধের নিয়মনীতি (Payment Policy)", en: "Payment Policy" },
  includedTitle: { bn: "কোর্স ফি এর সাথে যা যা অন্তর্ভুক্ত রয়েছে", en: "What's Included in the Course Fee" },

  // FAQs
  faqTitle: { bn: "সাধারণ জিজ্ঞাসা (FAQ)", en: "Frequently Asked Questions (FAQ)" },
  faqSubtitle: { bn: "ভর্তি সংক্রান্ত কিছু প্রয়োজনীয় প্রশ্নের উত্তর নিচে দেওয়া হলো।", en: "Answers to common questions regarding admission are provided below." },

  // Footer Contacts
  quickLinks: { bn: "গুরুত্বপূর্ণ লিংক", en: "Quick Links" },
  contactUs: { bn: "যোগাযোগ ও সহায়তা", en: "Contact & Support" },
  address: { bn: "মিরপুর ডিওএইচএস, রোড নং ১২, ঢাকা - ১২১৬", en: "Mirpur DOHS, Road 12, Dhaka - 1216" },
  copyright: { bn: "© ২০২৬ Skill Jobs Islamic Learning Academy. সর্বস্বত্ব সংরক্ষিত।", en: "© 2026 Skill Jobs Islamic Learning Academy. All rights reserved." },

  // Student Workspace
  workspaceTitle: { bn: "ACTIVE STUDENT WORKSPACE", en: "ACTIVE STUDENT WORKSPACE" },
  welcomeBack: { bn: "আস-সালামু আলাইকুম,", en: "As-salamu alaykum," },
  tabMyCourses: { bn: "আমার কোর্স", en: "My Courses" },
  tabLiveLink: { bn: "লাইভ লিংক ও ক্লাসরুম", en: "Live Link & Classroom" },
  tabSubmitHomework: { bn: "অ্যাসাইনমেন্ট সাবমিট", en: "Submit Assignment" },
  registeredMsg: { bn: "আপনার নিবন্ধিত কোর্স এবং বর্তমান সপ্তাহ পরিকল্পনা:", en: "Your registered courses and current week schedule:" },
  syllabusBtn: { bn: "সিলেবাস দেখুন", en: "View Syllabus" },
  durationLabel: { bn: "মেয়াদ:", en: "Duration:" },
  sessionLabel: { bn: "সেশন: সপ্তাহে ১টি", en: "Sessions: 1/week" },
  activeStatus: { bn: "Active (চলমান)", en: "Active" },
  livePortalTitle: { bn: "লাইভ ক্লাসরুম পোর্টাল (Zoom & Meet)", en: "Live Classroom Portal (Zoom & Meet)" },
  livePortalDesc: {
    bn: "আপনার ক্লাস যথাসময়ে অনুষ্ঠিত হবে। ক্লাস শুরু হওয়ার ৫ মিনিট পূর্বে নিচে দেওয়া 'সরাসরি ক্লাসে যোগ দিন' বাটনে চাপ দিয়ে সরাসরি অংশগ্রহণ করুন।",
    en: "Your class will held on schedule. Join the live class directly 5 minutes before class starts by clicking the join button below.",
  },
  scheduleLabel: { bn: "পরবর্তী ক্লাসের সময়সূচী:", en: "Next Class Schedule:" },
  scheduleTime: { bn: "প্রতি শুক্রবার রাত ৮:৩০ ঘটিকা", en: "Every Friday at 8:30 PM (BDT)" },
  scheduledTag: { bn: "Scheduled (পরিকল্পিত)", en: "Scheduled" },
  joinZoomBtn: { bn: "সরাসরি ক্লাসে যোগ দিন (Zoom Link)", en: "Join Live Class Directly (Zoom Link)" },
  downloadSheetsBtn: { bn: "লেকচার শিট ডাউনলোড", en: "Download Lecture Sheets" },
  announcementsTitle: { bn: "গুরুত্বপূর্ণ বিজ্ঞপ্তি", en: "Important Announcements" },
  announcement1: { bn: "ভর্তির তথ্যাদি ও পেমেন্ট রসিদ আপনার মেইলে পাঠানো হয়েছে।", en: "Admission details and payment receipt have been sent to your email." },
  announcement2: { bn: "ক্লাস শুরুর পূর্বে আপনাকে হোয়াটস্যাপ গ্রুপে যুক্ত করা হবে।", en: "You will be added to the WhatsApp group before classes start." },
  homeworkTitle: { bn: "চলতি মডিউল অ্যাসাইনমেন্ট সাবমিশন", en: "Current Module Assignment Submission" },
  homeworkDesc: {
    bn: "ক্লাসে প্রদত্ত বাড়ির কাজ বা কুইজ লিংকের অ্যাসাইনমেন্ট ফাইল গুগল ড্রাইভ লিংক আকারে নিচে সাবমিট করুন। সাবমিট করলে আপনি তাৎক্ষণিকভাবে +৫০ XP পাবেন!",
    en: "Submit your homework or quiz files as a Google Drive link below. Submit to instantly receive +50 XP!",
  },
  assignmentPlaceholder: { bn: "যেমন: https://docs.google.com/document/d/...", en: "e.g., https://docs.google.com/document/d/..." },
  submitBtn: { bn: "অ্যাসাইনমেন্ট সাবমিট করুন", en: "Submit Assignment" },
  driveLinkLabel: { bn: "গুগল ড্রাইভ অথবা ওয়ানড্রাইভ লিংক প্রদান করুন", en: "Provide Google Drive or OneDrive link" },
  assignmentSuccessTitle: { bn: "🎉 অ্যাসাইনমেন্ট সফলভাবে জমা হয়েছে!", en: "🎉 Assignment Submitted Successfully!" },
  assignmentSuccessDesc: {
    bn: "আপনার অ্যাকাউন্টে ৫০ এক্সপেরিয়েন্স পয়েন্ট (XP) যোগ হয়েছে। শিক্ষক এটি দ্রুত পর্যালোচনা করবেন।",
    en: "50 Experience Points (XP) have been added to your account. The teacher will review it soon.",
  },
  resetNotice: { bn: "ভর্তি বাতিল করতে বা নতুন অ্যাকাউন্ট খুলতে চান?", en: "Want to cancel admission or open a new account?" },
  resetBtn: { bn: "নিবন্ধন রিসেট করুন", en: "Reset Registration" },

  // Enrollment Portal Modal
  enrollmentHeader: { bn: "ভর্তি কার্যক্রম ২০২৬", en: "Admission Enrollment 2026" },
  step1Header: { bn: "ভর্তি ফরম ও হিসাব কাঠামো", en: "Admission Form & Fee Structure" },
  step2Header: { bn: "পেমেন্ট নির্দেশনা ও রসিদ", en: "Payment Guidelines & Receipt" },
  studentNameLabel: { bn: "আপনার নাম (পূর্ণাঙ্গ) *", en: "Your Full Name *" },
  studentNamePlaceholder: { bn: "যেমন: মুহাম্মদ রহমান", en: "e.g., Muhammad Rahman" },
  phoneLabel: { bn: "মোবাইল নম্বর *", en: "Mobile Number *" },
  phonePlaceholder: { bn: "যেমন: 017XXXXXXXX", en: "e.g., 017XXXXXXXX" },
  emailLabel: { bn: "ইমেইল ঠিকানা *", en: "Email Address *" },
  emailPlaceholder: { bn: "যেমন: mail@example.com", en: "e.g., mail@example.com" },
  selectCourseLabel: { bn: "আপনার কাঙ্খিত কোর্স নির্বাচন করুন (একাধিক করতে পারেন)", en: "Select Your Desired Course (Multiple selections allowed)" },
  feeCalcLabel: { bn: "ফি হিসাব বিবরণী", en: "Fee Structure Details" },
  totalAdmissionFeeLabel: { bn: "মোট ভর্তি ফি (Total Admission Fee):", en: "Total Admission Fee:" },
  totalTuitionFeeLabel: { bn: "মোট কোর্স ফি (Total Tuition Fee):", en: "Total Course Fee:" },
  totalPayableLabel: { bn: "সর্বমোট পরিশোধযোগ্য পরিমাণ (Total Due):", en: "Total Payable Due:" },
  nextPaymentStep: { bn: "পেমেন্ট ধাপে এগিয়ে যান", en: "Proceed to Payment" },
  paymentGuideTitle: { bn: "সহজ পেমেন্ট গাইডলাইন (সিমুলেশন)", en: "Simple Payment Guidelines (Simulation)" },
  paymentGuideDesc: {
    bn: "নিচের যেকোনো একটি মার্চেন্ট নম্বরে সর্বমোট টাকা সেন্ড মানি অথবা পেমেন্ট করুন। পেমেন্ট করা হয়ে গেলে ট্রানজেকশন আইডি টি নিচে প্রদান করে ভর্তি নিশ্চিত করুন।",
    en: "Send money or pay the grand total to any of the merchant numbers below. Once paid, enter your transaction ID to complete admission.",
  },
  bkashPersonal: { bn: "bKash Personal", en: "bKash Personal" },
  nagadPersonal: { bn: "Nagad Personal", en: "Nagad Personal" },
  bankTransfer: { bn: "Bank Transfer", en: "Bank Transfer" },
  copyNumberBtn: { bn: "নম্বর কপি", en: "Copy Number" },
  copiedText: { bn: "কপি হয়েছে", en: "Copied!" },
  officialStudentReceipt: { bn: "OFFICIAL STUDENT RECEIPT", en: "OFFICIAL STUDENT RECEIPT" },
  receiptStudentName: { bn: "শিক্ষার্থীর নাম (Student):", en: "Student Name:" },
  receiptPhone: { bn: "মোবাইল (Phone):", en: "Phone:" },
  receiptEmail: { bn: "ইমেইল (Email):", en: "Email:" },
  receiptDate: { bn: "তারিখ (Date):", en: "Date:" },
  receiptEnrolledCourses: { bn: "নিবন্ধিত কোর্সসমূহ (Enrolled Courses):", en: "Enrolled Courses:" },
  receiptGrandTotal: { bn: "সর্বমোট প্রদেয় (GRAND TOTAL):", en: "Grand Total Due:" },
  txnIdLabel: { bn: "পেমেন্ট ট্রানজেকশন আইডি (Transaction ID) *", en: "Payment Transaction ID (Transaction ID) *" },
  txnIdPlaceholder: { bn: "যেমন: BK9873420846 অথবা খালি রাখুন অটো-জেনারেটের জন্য", en: "e.g., BK9873420846 or leave blank for auto-generation" },
  txnIdDisclaimer: {
    bn: "* ট্রানজেকশন আইডি প্রদান করে 'ভর্তি সম্পন্ন করুন' বাটনে ক্লিক করলে আপনার ড্যাশবোর্ড তাৎক্ষণিকভাবে সক্রিয় হয়ে যাবে।",
    en: "* Clicking 'Complete Admission' with a transaction ID will instantly activate your personal student workspace.",
  },
  goBackBtn: { bn: "পিছনে যান", en: "Go Back" },
  completeEnrollmentBtn: { bn: "ভর্তি সম্পন্ন করুন", en: "Complete Admission" },
};

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("bn");

  // Load language from storage on mount if exists
  useEffect(() => {
    const savedLang = localStorage.getItem("islamic_academy_language") as Language;
    if (savedLang === "bn" || savedLang === "en") {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("islamic_academy_language", lang);
  };

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) {
      return key;
    }
    return translation[language];
  };

  const translate = <T,>(bn: T, en: T): T => {
    return language === "bn" ? bn : en;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
