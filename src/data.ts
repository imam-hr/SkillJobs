export interface CourseModule {
  id: string;
  title: { bn: string; en: string };
  details?: { bn: string[]; en: string[] };
}

export interface Course {
  id: string;
  title: { bn: string; en: string };
  subtitle: { bn: string; en: string };
  description: { bn: string; en: string };
  duration: { bn: string; en: string };
  weeks: { bn: string; en: string };
  classesPerWeek: { bn: string; en: string };
  admissionFee: number;
  courseFee: number;
  totalFee: number;
  modules: CourseModule[];
  whatYouWillLearn: { bn: string[]; en: string[] };
  specialHighlights?: { bn: string[]; en: string[] };
  iconName: string;
  colorTheme: string; // e.g., emerald, amber, blue, rose
}

export const COURSES: Course[] = [
  {
    id: "parenting",
    title: {
      bn: "Diploma in Islamic Parenting",
      en: "Diploma in Islamic Parenting"
    },
    subtitle: {
      bn: "একটি আদর্শ ইসলামী পরিবার গঠনের পূর্ণাঙ্গ প্রশিক্ষণ",
      en: "Complete training on building an ideal Islamic family"
    },
    description: {
      bn: "বর্তমান যুগে সন্তান প্রতিপালন অভিভাবকদের জন্য একটি বড় চ্যালেঞ্জ। এই কোর্সে ইসলামের আলোকে সন্তান লালন-পালন, চরিত্র গঠন এবং পরিবারে দ্বীনি পরিবেশ তৈরির বাস্তবধর্মী নির্দেশনা প্রদান করা হবে।",
      en: "Raising children in the modern era is a major challenge for parents. This course provides practical guidance on child rearing, character building, and establishing a religious environment at home in the light of Islam."
    },
    duration: { bn: "৩ মাস", en: "3 Months" },
    weeks: { bn: "১২ সপ্তাহ", en: "12 Weeks" },
    classesPerWeek: { bn: "সপ্তাহে ১টি ক্লাস", en: "1 class per week" },
    admissionFee: 500,
    courseFee: 3000,
    totalFee: 3500,
    iconName: "Heart",
    colorTheme: "emerald",
    modules: [
      {
        id: "p-m1",
        title: { bn: "Module 01: ইসলামে পরিবার ব্যবস্থা", en: "Module 01: Family System in Islam" },
        details: {
          bn: ["পরিবার প্রতিষ্ঠার উদ্দেশ্য", "স্বামী-স্ত্রী ও সন্তানের দায়িত্ব"],
          en: ["Purpose of establishing a family", "Responsibilities of husband, wife, and children"]
        }
      },
      {
        id: "p-m2",
        title: { bn: "Module 02: সন্তানের অধিকার", en: "Module 02: Rights of Children" },
        details: {
          bn: ["জন্মের পূর্ব ও পরবর্তী অধিকার", "ইসলামী শিক্ষার গুরুত্ব"],
          en: ["Pre-birth and post-birth rights", "Importance of Islamic education"]
        }
      },
      {
        id: "p-m3",
        title: { bn: "Module 03: বয়সভিত্তিক সন্তান লালন-পালন", en: "Module 03: Age-based Child Rearing" },
        details: {
          bn: ["০-৭ বছর (স্নেহ ও খেলাধুলা)", "৭-১৪ বছর (শিক্ষা ও অনুশাসন)", "১৪-২১ বছর (বন্ধুত্ব ও পরামর্শ)"],
          en: ["0-7 Years (Affection & Play)", "7-14 Years (Education & Discipline)", "14-21 Years (Friendship & Consultation)"]
        }
      },
      {
        id: "p-m4",
        title: { bn: "Module 04: শিশুর চরিত্র গঠন", en: "Module 04: Child Character Building" },
        details: {
          bn: ["আদব-আখলাক শিক্ষা", "নেতৃত্ব ও দায়িত্ববোধ"],
          en: ["Manners & ethics training", "Leadership & sense of responsibility"]
        }
      },
      {
        id: "p-m5",
        title: { bn: "Module 05: ডিজিটাল যুগে সন্তান প্রতিপালন", en: "Module 05: Parenting in the Digital Age" },
        details: {
          bn: ["মোবাইল ও ইন্টারনেট ব্যবস্থাপনা", "সোশ্যাল মিডিয়া সচেতনতা"],
          en: ["Mobile and internet management", "Social media awareness"]
        }
      },
      {
        id: "p-m6",
        title: { bn: "Module 06: কিশোর-কিশোরীদের সমস্যা ও সমাধান", en: "Module 06: Teenagers' Problems & Solutions" }
      },
      {
        id: "p-m7",
        title: { bn: "Module 07: ইসলামিক শিক্ষা পরিবেশ তৈরি", en: "Module 07: Creating an Islamic Educational Environment" }
      },
      {
        id: "p-m8",
        title: { bn: "Module 08: রাসূল ﷺ-এর শিশু প্রতিপালন পদ্ধতি", en: "Module 08: Prophet ﷺ's Child Upbringing Methods" }
      },
      {
        id: "p-m9",
        title: { bn: "Module 09: শাস্তি ও পুরস্কারের নীতি", en: "Module 09: Principles of Punishment & Reward" }
      },
      {
        id: "p-m10",
        title: { bn: "Module 10: পরিবারে দ্বীনি পরিবেশ গঠন", en: "Module 10: Structuring a Religious Environment in Families" }
      },
      {
        id: "p-m11",
        title: { bn: "Module 11: বাস্তব কেস স্টাডি", en: "Module 11: Practical Case Studies" }
      },
      {
        id: "p-m12",
        title: { bn: "Module 12: ফাইনাল অ্যাসেসমেন্ট", en: "Module 12: Final Assessment" }
      }
    ],
    whatYouWillLearn: {
      bn: [
        "সন্তানের ইসলামী চরিত্র গঠন",
        "পরিবারে দ্বীনি পরিবেশ তৈরি",
        "ডিজিটাল যুগের চ্যালেঞ্জ মোকাবিলা",
        "বয়সভিত্তিক কার্যকর প্যারেন্টিং কৌশল"
      ],
      en: [
        "Islamic character building of children",
        "Creating a religious environment at home",
        "Overcoming challenges of the digital age",
        "Age-specific effective parenting strategies"
      ]
    }
  },
  {
    id: "business",
    title: {
      bn: "Diploma in Islamic Business & Entrepreneurship",
      en: "Diploma in Islamic Business & Entrepreneurship"
    },
    subtitle: {
      bn: "ইসলামী নীতিমালার আলোকে ব্যবসা ও উদ্যোক্তা উন্নয়ন",
      en: "Business & entrepreneurship development under Islamic principles"
    },
    description: {
      bn: "এই কোর্সটি ব্যবসায়ী, উদ্যোক্তা এবং নতুন ব্যবসা শুরু করতে আগ্রহীদের জন্য বিশেষভাবে তৈরি করা হয়েছে। আধুনিক ব্যবসার বিভিন্ন দিক ইসলামী শরিয়াহ মোতাবেক পরিচালনার চমৎকার কলাকৌশল এতে আলোচনা করা হবে।",
      en: "This course is specially designed for businessmen, entrepreneurs, and those interested in starting a new business. It discusses key techniques of managing modern business aspects according to Islamic Shariah."
    },
    duration: { bn: "৪ মাস", en: "4 Months" },
    weeks: { bn: "১৬ সপ্তাহ", en: "16 Weeks" },
    classesPerWeek: { bn: "সপ্তাহে ১টি ক্লাস", en: "1 class per week" },
    admissionFee: 500,
    courseFee: 4000,
    totalFee: 4500,
    iconName: "Briefcase",
    colorTheme: "amber",
    modules: [
      { id: "b-m1", title: { bn: "Module 01: ইসলামে ব্যবসার গুরুত্ব", en: "Module 01: Importance of Business in Islam" } },
      { id: "b-m2", title: { bn: "Module 02: হালাল ও হারাম ব্যবসা", en: "Module 02: Halal & Haram Businesses" } },
      { id: "b-m3", title: { bn: "Module 03: ব্যবসায় সততা ও আমানতদারিতা", en: "Module 03: Honesty & Integrity in Business" } },
      { id: "b-m4", title: { bn: "Module 04: চুক্তি (আকদ) ও ব্যবসায়িক লেনদেন", en: "Module 04: Contract (Aqd) & Business Transactions" } },
      { id: "b-m5", title: { bn: "Module 05: ইসলামিক মার্কেটিং নীতি", en: "Module 05: Islamic Marketing Principles" } },
      { id: "b-m6", title: { bn: "Module 06: অনলাইন ব্যবসা ও ই-কমার্স", en: "Module 06: Online Business & E-Commerce" } },
      { id: "b-m7", title: { bn: "Module 07: পার্টনারশিপ ও বিনিয়োগ", en: "Module 07: Partnership & Investment Models" } },
      { id: "b-m8", title: { bn: "Module 08: ইসলামিক উদ্যোক্তা উন্নয়ন", en: "Module 08: Islamic Entrepreneur Development" } },
      { id: "b-m9", title: { bn: "Module 09: গ্রাহকসেবা ও ব্র্যান্ডিং", en: "Module 09: Customer Service & Branding" } },
      { id: "b-m10", title: { bn: "Module 10: ব্যবসায় যাকাত", en: "Module 10: Zakat in Business" } },
      { id: "b-m11", title: { bn: "Module 11: ব্যবসায়িক কেস স্টাডি", en: "Module 11: Business Case Studies" } },
      { id: "b-m12", title: { bn: "Module 12: বিজনেস প্ল্যান ডেভেলপমেন্ট", en: "Module 12: Business Plan Development" } }
    ],
    specialHighlights: {
      bn: [
        "বাস্তব ব্যবসার उदाहरण",
        "উদ্যোক্তা প্রশিক্ষণ",
        "বিজনেস প্ল্যান তৈরি",
        "ইসলামিক ব্যবসায়িক নীতিমালা"
      ],
      en: [
        "Real business examples",
        "Entrepreneur training",
        "Business plan preparation",
        "Islamic business guidelines"
      ]
    },
    whatYouWillLearn: {
      bn: [
        "হালাল ব্যবসা পরিচালনা",
        "ইসলামিক উদ্যোক্তা হওয়ার কৌশল",
        "ব্যবসায়িক পরিকল্পনা তৈরি",
        "ইসলামিক অর্থনৈতিক নীতির বাস্তব প্রয়োগ"
      ],
      en: [
        "Managing halal business models",
        "Strategies to become an Islamic entrepreneur",
        "Preparing a solid business plan",
        "Practical application of Islamic economic policies"
      ]
    }
  },
  {
    id: "economics",
    title: {
      bn: "Diploma in Islamic Economics",
      en: "Diploma in Islamic Economics"
    },
    subtitle: {
      bn: "ইসলামী অর্থনীতির তাত্ত্বিক ও ব্যবহারিক শিক্ষা",
      en: "Theoretical & practical education on Islamic Economics"
    },
    description: {
      bn: "আধুনিক অর্থনৈতিক ব্যবস্থার বিকল্প হিসেবে ইসলামী অর্থনীতির মৌলিক নীতি, ইসলামিক ব্যাংকিং, যাকাত, ওয়াকফ ও ইসলামিক ফাইন্যান্স সম্পর্কে বিস্তারিত ধারণা প্রদান করা হবে।",
      en: "A detailed understanding of the basic principles of Islamic economics, Islamic banking, Zakat, Waqf, and Islamic finance as an alternative to the modern economic system will be provided."
    },
    duration: { bn: "৬ মাস", en: "6 Months" },
    weeks: { bn: "২৪ সপ্তাহ", en: "24 Weeks" },
    classesPerWeek: { bn: "সপ্তাহে ১টি ক্লাস", en: "1 class per week" },
    admissionFee: 1000,
    courseFee: 5000,
    totalFee: 6000,
    iconName: "TrendingUp",
    colorTheme: "cyan",
    modules: [
      { id: "e-m1", title: { bn: "Module 01: ইসলামী অর্থনীতির পরিচয়", en: "Module 01: Introduction to Islamic Economics" } },
      { id: "e-m2", title: { bn: "Module 02: সম্পদের ধারণা ও মালিকানা", en: "Module 02: Concept of Wealth & Ownership" } },
      { id: "e-m3", title: { bn: "Module 03: সুদ (রিবা) ও এর ক্ষতিকর প্রভাব", en: "Module 03: Usury (Riba) & its Harmful Effects" } },
      { id: "e-m4", title: { bn: "Module 04: যাকাত ব্যবস্থা", en: "Module 04: Zakat System" } },
      { id: "e-m5", title: { bn: "Module 05: ওয়াকফ ব্যবস্থা", en: "Module 05: Waqf Management" } },
      { id: "e-m6", title: { bn: "Module 06: ইসলামিক ব্যাংকিং", en: "Module 06: Islamic Banking" } },
      { id: "e-m7", title: { bn: "Module 07: তাকাফুল (Islamic Insurance)", en: "Module 07: Takaful (Islamic Insurance)" } },
      { id: "e-m8", title: { bn: "Module 08: ইসলামিক ফাইন্যান্স", en: "Module 08: Islamic Finance Basics" } },
      { id: "e-m9", title: { bn: "Module 09: ব্যবসায়িক নৈতিকতা", en: "Module 09: Business Ethics & Integrity" } },
      { id: "e-m10", title: { bn: "Module 10: আধুনিক অর্থনৈতিক চ্যালেঞ্জ", en: "Module 10: Modern Economic Challenges" } },
      { id: "e-m11", title: { bn: "Module 11: বাস্তব কেস স্টাডি", en: "Module 11: Real Case Studies" } },
      { id: "e-m12", title: { bn: "Module 12: গবেষণা ও প্রজেক্ট", en: "Module 12: Research & Project" } }
    ],
    whatYouWillLearn: {
      bn: [
        "ইসলামী অর্থনীতির মৌলিক ধারণা",
        "ইসলামিক ব্যাংকিং ও ফাইন্যান্স",
        "যাকাত ও ওয়াকফ ব্যবস্থাপনা",
        "রিবামুক্ত অর্থনৈতিক চিন্তা"
      ],
      en: [
        "Basic concepts of Islamic economics",
        "Islamic banking & corporate finance",
        "Zakat & Waqf administration",
        "Riba-free economic framework design"
      ]
    }
  },
  {
    id: "fiqh",
    title: {
      bn: "Diploma in Fiqh Studies",
      en: "Diploma in Fiqh Studies"
    },
    subtitle: {
      bn: "দৈনন্দিন জীবনের প্রয়োজনীয় ফিকহ শিক্ষা",
      en: "Essential Fiqh education for daily life"
    },
    description: {
      bn: "এই কোর্সে ইবাদত, পারিবারিক জীবন, লেনদেন ও সমসাময়িক বিভিন্ন মাসআলার উপর বিস্তারিত আলোচনা করা হবে। প্রতিটি মুসলিমের জন্য দৈনন্দিন জীবনে পালনীয় বিষয়গুলো জানা সহজ হবে।",
      en: "This course features detailed discussions on worship, family life, transactions, and various contemporary issues. It will be easy for every Muslim to learn the essential rulings for daily life."
    },
    duration: { bn: "৬ মাস", en: "6 Months" },
    weeks: { bn: "২৪ সপ্তাহ", en: "24 Weeks" },
    classesPerWeek: { bn: "সপ্তাহে ১টি ক্লাস", en: "1 class per week" },
    admissionFee: 1000,
    courseFee: 5000,
    totalFee: 6000,
    iconName: "BookOpen",
    colorTheme: "indigo",
    modules: [
      { id: "f-m1", title: { bn: "Module 01: ফিকহ পরিচিতি", en: "Module 01: Introduction to Fiqh" } },
      { id: "f-m2", title: { bn: "Module 02: তাহারাত (পবিত্রতা)", en: "Module 02: Taharah (Purification)" } },
      { id: "f-m3", title: { bn: "Module 03: সালাত (নামাজ)", en: "Module 03: Salah (Daily Prayers)" } },
      { id: "f-m4", title: { bn: "Module 04: সিয়াম (রোজা)", en: "Module 04: Sawm (Fasting)" } },
      { id: "f-m5", title: { bn: "Module 05: যাকাত", en: "Module 05: Zakat & Charity" } },
      { id: "f-m6", title: { bn: "Module 06: হজ ও উমরাহ", en: "Module 06: Hajj & Umrah" } },
      { id: "f-m7", title: { bn: "Module 07: মুয়ামালাত (লেনদেন)", en: "Module 07: Muamalat (Transactions)" } },
      { id: "f-m8", title: { bn: "Module 08: বিবাহ ও তালাক", en: "Module 08: Marriage & Divorce Rulings" } },
      { id: "f-m9", title: { bn: "Module 09: উত্তরাধিকার আইন", en: "Module 09: Islamic Inheritance Law (Faraid)" } },
      { id: "f-m10", title: { bn: "Module 10: সমসাময়িক মাসআলা", en: "Module 10: Contemporary Fiqh Issues" } },
      { id: "f-m11", title: { bn: "Module 11: ফতোয়া বোঝার পদ্ধতি", en: "Module 11: Methodology of Understanding Fatwas" } },
      { id: "f-m12", title: { bn: "Module 12: গবেষণা প্রকল্প", en: "Module 12: Research Project" } }
    ],
    whatYouWillLearn: {
      bn: [
        "দৈনন্দিন জীবনের প্রয়োজনীয় মাসআলা",
        "ইবাদতের সঠিক পদ্ধতি",
        "পারিবারিক ও সামাজিক ফিকহ",
        "সমসাময়িক ফিকহি সমস্যার সমাধান"
      ],
      en: [
        "Essential rulings of daily life",
        "Correct methods of worship",
        "Family and social Fiqh principles",
        "Solutions to modern Fiqh issues"
      ]
    }
  }
];

export const METHODOLOGY = {
  platforms: ["Zoom", "Google Meet"],
  recordings: {
    bn: "প্রয়োজনে প্রতিটি ক্লাসের লাইভ রেকর্ডিং ও লেকচার শিট প্রদান করা হবে।",
    en: "Live recordings and lecture sheets of each class will be provided as needed."
  },
  evaluations: [
    {
      name: { bn: "উপস্থিতি (Attendance)", en: "Attendance" },
      percentage: 20
    },
    {
      name: { bn: "অ্যাসাইনমেন্ট (Assignment)", en: "Assignments" },
      percentage: 20
    },
    {
      name: { bn: "মিড টার্ম পরীক্ষা (Midterm Exam)", en: "Midterm Exam" },
      percentage: 20
    },
    {
      name: { bn: "ফাইনাল পরীক্ষা (Final Exam)", en: "Final Exam" },
      percentage: 40
    }
  ],
  certifications: [
    {
      title: { bn: "Participation Certificate", en: "Participation Certificate" },
      description: {
        bn: "কোর্সে সক্রিয় অংশগ্রহণের জন্য প্রদান করা হবে।",
        en: "Awarded for active participation throughout the course modules."
      }
    },
    {
      title: { bn: "Diploma Certificate", en: "Diploma Certificate" },
      description: {
        bn: "সবগুলো মডিউল ও পরীক্ষায় সফলভাবে উত্তীর্ণদের জন্য।",
        en: "Awarded to those who successfully pass all modules and exams."
      }
    },
    {
      title: { bn: "Excellence Award", en: "Excellence Award" },
      description: {
        bn: "সেরা ফলাফল এবং ক্লাসে বিশেষ পারফরম্যান্সের জন্য বিশেষ মেধা পুরস্কার।",
        en: "Special merit award for best academic results and overall class performance."
      }
    }
  ]
};

export const ADVANTAGES = [
  {
    title: { bn: "অভিজ্ঞ ইসলামিক স্কলার ও প্রশিক্ষক", en: "Experienced Islamic Scholars & Trainers" },
    description: {
      bn: "দেশ ও বিদেশের খ্যাতনামা বিশ্ববিদ্যালয় থেকে ডিগ্রিধারী অভিজ্ঞ আলেম ও গবেষকদের সরাসরি তত্ত্বাবধানে ক্লাস।",
      en: "Classes under the direct supervision of experienced scholars and researchers with degrees from renowned global universities."
    }
  },
  {
    title: { bn: "অনলাইন লাইভ ক্লাস", en: "Live Online Classes" },
    description: {
      bn: "যেকোনো প্রান্ত থেকে ঘরে বসে অনলাইনের মাধ্যমে চমৎকার ইন্টারেক্টিভ লাইভ ক্লাসে অংশ নেওয়ার সুবিধা।",
      en: "The convenience of joining highly interactive live online classes from anywhere in the comfort of your home."
    }
  },
  {
    title: { bn: "আধুনিক ও প্র্যাকটিক্যাল কারিকুলাম", en: "Modern & Practical Curriculum" },
    description: {
      bn: "তাত্ত্বিক পড়াশোনার পাশাপাশি বাস্তব জীবন ও কর্মক্ষেত্রে ইসলামিক আইনের প্রায়োগিক শিক্ষা।",
      en: "Practical application of Islamic law in real life and workplace alongside theoretical studies."
    }
  },
  {
    title: { bn: "অ্যাসাইনমেন্ট ও মূল্যায়ন ব্যবস্থা", en: "Assignments & Evaluation System" },
    description: {
      bn: "শিক্ষার্থীদের নিয়মিত পড়াশোনা মূল্যায়নের জন্য কুইজ, অ্যাসাইনমেন্ট ও চমৎকার পরীক্ষা পদ্ধতি।",
      en: "Effective quizzes, regular assignments, and robust exam systems to assess students' progress."
    }
  },
  {
    title: { bn: "ডিজিটাল লাইফটাইম সার্টিফিকেট", en: "Verifiable Lifetime Digital Certificate" },
    description: {
      bn: "কোর্স সমাপ্তির পর দ্রুত শেয়ারযোগ্য ও যাচাইযোগ্য গ্লোবাল স্ট্যান্ডার্ড ডিজিটাল সার্টিফিকেট।",
      en: "Shareable and instantly verifiable global-standard digital certificate issued upon completion."
    }
  },
  {
    title: { bn: "ইসলামী জ্ঞান ও দক্ষতা উন্নয়নের সমন্বিত প্ল্যাটফর্ম", en: "Integrated Platform for Islamic Knowledge & Skill" },
    description: {
      bn: "একই ছাদের নিচে দ্বীনি জ্ঞান ও বাস্তবমুখী পেশাদার কর্মদক্ষতার চমৎকার মেলবন্ধন।",
      en: "The perfect blend of religious knowledge and practical professional skills all under one roof."
    }
  }
];

export const PAYMENT_INFO = {
  oneTimeTitle: {
    bn: "ভর্তি ফি এককালীন এবং অফেরতযোগ্য।",
    en: "Admission fee is one-time and non-refundable."
  },
  paymentMethod: {
    bn: "কোর্স ফি এককালীন অথবা নির্ধারিত সহজ কিস্তিতে পরিশোধ করা যাবে।",
    en: "Course fees can be paid in full or through designated flexible monthly installments."
  },
  confirmation: {
    bn: "ভর্তি নিশ্চিত হওয়ার পর শিক্ষার্থীকে হোয়াটসঅ্যাপ গ্রুপ, ক্লাস লিংক ও প্রয়োজনীয় স্টাডি ম্যাটেরিয়াল প্রদান করা হবে।",
    en: "Upon admission confirmation, students will be provided with WhatsApp group access, class links, and study materials."
  }
};

export const INCLUDED_SERVICES = [
  { bn: "লাইভ অনলাইন ক্লাস (Zoom/Meet)", en: "Live online classes (Zoom/Meet)" },
  { bn: "প্রয়োজনীয় প্রিমিয়াম স্টাডি ম্যাটেরিয়াল ও স্লাইড", en: "Premium study materials & lecture slides" },
  { bn: "অ্যাসাইনমেন্ট ও নিয়মিত ব্যক্তিগত মূল্যায়ন", en: "Assignments & periodic personalized evaluation" },
  { bn: "কোর্স সম্পন্নের প্রফেশনাল সার্টিফিকেট", en: "Professional certificate of course completion" },
  { bn: "বিশেষ মেধা পুরস্কার (যোগ্য শিক্ষার্থীদের জন্য)", en: "Special merit award (for high-performing students)" }
];
