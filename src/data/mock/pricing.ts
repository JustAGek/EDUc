import { PricingPlan } from "@/lib/types";

export const pricingPlans: PricingPlan[] = [
  {
    name: { en: "Free", ar: "مجاني" },
    price: "$0",
    period: { en: "forever", ar: "للأبد" },
    features: [
      { en: "Access to 3 free courses", ar: "الوصول إلى 3 دورات مجانية" },
      { en: "Basic course materials", ar: "مواد الدورة الأساسية" },
      { en: "Community forum access", ar: "الوصول إلى منتدى المجتمع" }
    ],
    highlighted: false,
    cta: { en: "Get Started", ar: "ابدأ الآن" }
  },
  {
    name: { en: "Pro Monthly", ar: "احترافي شهري" },
    price: "$19",
    period: { en: "/month", ar: "/شهر" },
    features: [
      { en: "Access to all courses", ar: "الوصول إلى جميع الدورات" },
      { en: "HD video quality", ar: "جودة فيديو عالية" },
      { en: "Downloadable resources", ar: "موارد قابلة للتحميل" },
      { en: "Certificate of completion", ar: "شهادة إتمام" },
      { en: "Priority support", ar: "دعم ذو أولوية" }
    ],
    highlighted: true,
    cta: { en: "Subscribe Now", ar: "اشترك الآن" }
  },
  {
    name: { en: "Lifetime", ar: "مدى الحياة" },
    price: "$199",
    period: { en: "one-time", ar: "دفعة واحدة" },
    features: [
      { en: "Everything in Pro", ar: "كل ما في الاحترافي" },
      { en: "Lifetime access", ar: "وصول مدى الحياة" },
      { en: "Future courses included", ar: "الدورات المستقبلية مشمولة" },
      { en: "1-on-1 mentorship session", ar: "جلسة إرشاد فردية" },
      { en: "Private Discord channel", ar: "قناة Discord خاصة" }
    ],
    highlighted: false,
    cta: { en: "Buy Lifetime", ar: "اشترِ مدى الحياة" }
  }
];
