# LMS Platform Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a front-end-only E-Learning/LMS platform with Next.js App Router, featuring a landing page, course catalog with pricing, and a video player dashboard — bilingual EN/AR with RTL support.

**Architecture:** Single Next.js 15 app with `[locale]` dynamic route segment for i18n. All data is mock/static. Components organized by page domain (landing, catalog, player) plus shared UI. Tailwind CSS v4 + Shadcn UI for styling, Framer Motion for animations.

**Tech Stack:** Next.js 15, React 19, Tailwind CSS 4, Shadcn UI, Framer Motion 12, ReactPlayer, Lucide React

---

## File Map

### Infrastructure
- Create: `src/lib/types.ts` — All TypeScript interfaces (Course, Module, Lesson, TranscriptEntry, PricingPlan, Locale)
- Create: `src/lib/utils.ts` — `cn()` helper using clsx + tailwind-merge
- Create: `src/lib/i18n.ts` — locale config, dictionary type, `getDictionary()` function
- Create: `src/data/mock/dictionaries/en.ts` — English UI strings
- Create: `src/data/mock/dictionaries/ar.ts` — Arabic UI strings
- Create: `src/data/mock/courses.ts` — 6 mock courses with modules, lessons, transcripts
- Create: `src/data/mock/pricing.ts` — 3 pricing plans (Free, Pro, Lifetime)
- Create: `src/hooks/use-locale.ts` — locale context hook (not needed as server component gets locale from params)

### Layouts & Providers
- Create: `src/app/layout.tsx` — Root layout: metadata only, no providers
- Create: `src/app/[locale]/layout.tsx` — Locale layout: dir, lang, fonts, ThemeProvider, Navbar, page transitions
- Create: `src/components/shared/theme-provider.tsx` — Dark/light mode provider with localStorage persistence
- Create: `src/app/globals.css` — Tailwind directives, CSS custom properties, glassmorphism utilities, gradient animation

### Shared Components
- Create: `src/components/shared/navbar.tsx` — Sticky glassmorphism navbar with hide-on-scroll
- Create: `src/components/shared/mobile-nav.tsx` — Mobile hamburger drawer using Shadcn Sheet
- Create: `src/components/shared/theme-toggle.tsx` — Sun/Moon toggle with rotation animation
- Create: `src/components/shared/locale-switcher.tsx` — EN/AR toggle that swaps route prefix
- Create: `src/components/shared/logo.tsx` — Brand logo/text component
- Create: `src/components/shared/page-transition.tsx` — Framer Motion AnimatePresence wrapper

### Landing Page
- Create: `src/app/[locale]/page.tsx` — Landing page composing Hero, Features, Carousel, Footer
- Create: `src/components/landing/hero.tsx` — Animated gradient hero with CTA
- Create: `src/components/landing/features-grid.tsx` — 3-column glassmorphism feature cards
- Create: `src/components/landing/course-carousel.tsx` — Horizontal scroll course cards
- Create: `src/components/landing/course-card.tsx` — Individual course card (reused in catalog)
- Create: `src/components/landing/footer.tsx` — 3-column footer with contact info

### Catalog Page
- Create: `src/app/[locale]/catalog/page.tsx` — Catalog page composing Pricing + Filters + Grid
- Create: `src/components/catalog/pricing-section.tsx` — 3 pricing cards container
- Create: `src/components/catalog/pricing-card.tsx` — Individual pricing tier card
- Create: `src/components/catalog/filter-pills.tsx` — Category + difficulty pill toggles
- Create: `src/components/catalog/course-grid.tsx` — Filtered responsive course grid

### Video Player Dashboard
- Create: `src/app/[locale]/course/[slug]/page.tsx` — Dashboard page composing Player + Sidebar + Tabs
- Create: `src/components/player/video-player.tsx` — ReactPlayer wrapper with custom controls
- Create: `src/components/player/control-bar.tsx` — Custom play/pause, volume, scrubber, speed, fullscreen
- Create: `src/components/player/course-sidebar.tsx` — Collapsible module list with progress
- Create: `src/components/player/content-tabs.tsx` — Overview + Transcript tabs below video
- Create: `src/components/player/transcript-viewer.tsx` — Timestamped transcript with auto-scroll

### Shadcn UI Components (installed via CLI)
- button, card, badge, progress, slider, accordion, tabs, sheet, dropdown-menu, toggle, separator

---

## Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `tailwind.config.ts`, `src/app/globals.css`, `src/lib/utils.ts`

- [ ] **Step 1: Create Next.js project**

```bash
cd "C:/Users/JustAGeek/Pictures/Project"
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --yes
```

Expected: Next.js project scaffolded with App Router in `src/` directory.

- [ ] **Step 2: Install additional dependencies**

```bash
npm install framer-motion react-player lucide-react class-variance-authority clsx tailwind-merge
```

Expected: All dependencies installed successfully.

- [ ] **Step 3: Initialize Shadcn UI**

```bash
npx shadcn@latest init -d
```

When prompted or via defaults: style=default, base color=slate, CSS variables=yes.

- [ ] **Step 4: Install Shadcn components**

```bash
npx shadcn@latest add button card badge progress slider accordion tabs sheet dropdown-menu toggle separator
```

Expected: Components added to `src/components/ui/`.

- [ ] **Step 5: Set up `cn()` utility**

Verify `src/lib/utils.ts` exists (Shadcn creates it). It should contain:

```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

If Shadcn already created this, no changes needed.

- [ ] **Step 6: Update globals.css with custom styles**

Replace `src/app/globals.css` with:

```css
@import "tailwindcss";

@custom-variant dark (&:is(.dark *));

@theme {
  --font-sans: "Inter", "Cairo", ui-sans-serif, system-ui, sans-serif;
  --color-glass-light: oklch(1 0 0 / 0.7);
  --color-glass-dark: oklch(0.279 0.041 260 / 0.5);
  --color-glass-border-light: oklch(1 0 0 / 0.2);
  --color-glass-border-dark: oklch(0.371 0.044 257.3 / 0.3);
}

@layer base {
  body {
    @apply bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-50 transition-colors duration-300;
  }
}

@layer utilities {
  .glass {
    @apply bg-[var(--color-glass-light)] dark:bg-[var(--color-glass-dark)] backdrop-blur-md border border-[var(--color-glass-border-light)] dark:border-[var(--color-glass-border-dark)];
  }

  .gradient-hero {
    background: linear-gradient(135deg, #312e81, #4f46e5, #6366f1, #7c3aed);
    background-size: 300% 300%;
    animation: gradient-shift 8s ease infinite;
  }

  @keyframes gradient-shift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
}
```

- [ ] **Step 7: Verify dev server runs**

```bash
npm run dev
```

Expected: Server starts on `http://localhost:3000` without errors.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js project with Tailwind, Shadcn UI, and dependencies"
```

---

## Task 2: TypeScript Types & Mock Data

**Files:**
- Create: `src/lib/types.ts`
- Create: `src/data/mock/courses.ts`
- Create: `src/data/mock/pricing.ts`

- [ ] **Step 1: Create type definitions**

Create `src/lib/types.ts`:

```typescript
export type Locale = "en" | "ar";

export interface LocalizedString {
  en: string;
  ar: string;
}

export type Category = "web-dev" | "data-science" | "design";
export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface TranscriptEntry {
  time: number;
  text: LocalizedString;
}

export interface Lesson {
  id: string;
  title: LocalizedString;
  videoUrl: string;
  duration: string;
  completed: boolean;
  transcript: TranscriptEntry[];
}

export interface Module {
  title: LocalizedString;
  lessons: Lesson[];
}

export interface Course {
  slug: string;
  title: LocalizedString;
  description: LocalizedString;
  thumbnail: string;
  instructor: string;
  category: Category;
  difficulty: Difficulty;
  duration: string;
  lessonCount: number;
  modules: Module[];
}

export interface PricingPlan {
  name: LocalizedString;
  price: string;
  period: LocalizedString;
  features: LocalizedString[];
  highlighted: boolean;
  cta: LocalizedString;
}
```

- [ ] **Step 2: Create mock courses data**

Create `src/data/mock/courses.ts`:

```typescript
import { Course } from "@/lib/types";

export const courses: Course[] = [
  {
    slug: "nextjs-masterclass",
    title: { en: "Next.js Masterclass", ar: "دورة Next.js المتقدمة" },
    description: {
      en: "Build production-ready applications with Next.js 15, App Router, Server Components, and modern React patterns.",
      ar: "بناء تطبيقات جاهزة للإنتاج باستخدام Next.js 15 و App Router و Server Components وأنماط React الحديثة."
    },
    thumbnail: "https://placehold.co/400x225/4f46e5/ffffff?text=Next.js",
    instructor: "Abdulrahman Mahmoud",
    category: "web-dev",
    difficulty: "advanced",
    duration: "12h 30m",
    lessonCount: 24,
    modules: [
      {
        title: { en: "Getting Started", ar: "البداية" },
        lessons: [
          {
            id: "njs-1-1",
            title: { en: "Introduction to Next.js 15", ar: "مقدمة في Next.js 15" },
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            duration: "15:30",
            completed: true,
            transcript: [
              { time: 0, text: { en: "Welcome to the Next.js Masterclass.", ar: "مرحبًا بكم في دورة Next.js المتقدمة." } },
              { time: 5, text: { en: "In this course, we'll build production-ready apps.", ar: "في هذه الدورة، سنبني تطبيقات جاهزة للإنتاج." } },
              { time: 12, text: { en: "Let's start with the fundamentals.", ar: "لنبدأ بالأساسيات." } },
              { time: 20, text: { en: "Next.js is a React framework for the web.", ar: "Next.js هو إطار عمل React للويب." } },
              { time: 30, text: { en: "It provides server-side rendering out of the box.", ar: "يوفر عرضًا من جانب الخادم بشكل افتراضي." } }
            ]
          },
          {
            id: "njs-1-2",
            title: { en: "Project Setup & Configuration", ar: "إعداد وتكوين المشروع" },
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            duration: "22:15",
            completed: true,
            transcript: [
              { time: 0, text: { en: "Let's set up our project.", ar: "لنقم بإعداد مشروعنا." } },
              { time: 8, text: { en: "We'll use TypeScript and Tailwind CSS.", ar: "سنستخدم TypeScript و Tailwind CSS." } }
            ]
          },
          {
            id: "njs-1-3",
            title: { en: "Understanding the App Router", ar: "فهم App Router" },
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            duration: "18:45",
            completed: false,
            transcript: [
              { time: 0, text: { en: "The App Router is the future of Next.js.", ar: "App Router هو مستقبل Next.js." } },
              { time: 10, text: { en: "It uses React Server Components by default.", ar: "يستخدم مكونات خادم React بشكل افتراضي." } }
            ]
          }
        ]
      },
      {
        title: { en: "Advanced Patterns", ar: "الأنماط المتقدمة" },
        lessons: [
          {
            id: "njs-2-1",
            title: { en: "Server Components Deep Dive", ar: "الغوص في مكونات الخادم" },
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            duration: "25:00",
            completed: false,
            transcript: [
              { time: 0, text: { en: "Server Components change how we think about React.", ar: "مكونات الخادم تغير طريقة تفكيرنا في React." } }
            ]
          },
          {
            id: "njs-2-2",
            title: { en: "Data Fetching Strategies", ar: "استراتيجيات جلب البيانات" },
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
            duration: "20:10",
            completed: false,
            transcript: [
              { time: 0, text: { en: "Let's explore data fetching in Next.js.", ar: "لنستكشف جلب البيانات في Next.js." } }
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "react-fundamentals",
    title: { en: "React Fundamentals", ar: "أساسيات React" },
    description: {
      en: "Master React from scratch — components, hooks, state management, and best practices for building modern UIs.",
      ar: "إتقان React من الصفر — المكونات، الخطافات، إدارة الحالة، وأفضل الممارسات لبناء واجهات حديثة."
    },
    thumbnail: "https://placehold.co/400x225/06b6d4/ffffff?text=React",
    instructor: "Abdulrahman Mahmoud",
    category: "web-dev",
    difficulty: "beginner",
    duration: "8h 15m",
    lessonCount: 18,
    modules: [
      {
        title: { en: "React Basics", ar: "أساسيات React" },
        lessons: [
          {
            id: "rf-1-1",
            title: { en: "What is React?", ar: "ما هو React؟" },
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            duration: "10:00",
            completed: false,
            transcript: [
              { time: 0, text: { en: "React is a JavaScript library for building UIs.", ar: "React هي مكتبة JavaScript لبناء واجهات المستخدم." } }
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "python-data-science",
    title: { en: "Python for Data Science", ar: "بايثون لعلم البيانات" },
    description: {
      en: "Learn Python, pandas, NumPy, and data visualization for real-world data analysis projects.",
      ar: "تعلم بايثون و pandas و NumPy وتصور البيانات لمشاريع تحليل البيانات الواقعية."
    },
    thumbnail: "https://placehold.co/400x225/16a34a/ffffff?text=Python",
    instructor: "Abdulrahman Mahmoud",
    category: "data-science",
    difficulty: "beginner",
    duration: "10h 45m",
    lessonCount: 22,
    modules: [
      {
        title: { en: "Python Essentials", ar: "أساسيات بايثون" },
        lessons: [
          {
            id: "pds-1-1",
            title: { en: "Setting Up Python", ar: "إعداد بايثون" },
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            duration: "12:00",
            completed: false,
            transcript: [
              { time: 0, text: { en: "Let's install Python and set up our environment.", ar: "لنقم بتثبيت بايثون وإعداد بيئتنا." } }
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "machine-learning-intro",
    title: { en: "Intro to Machine Learning", ar: "مقدمة في تعلم الآلة" },
    description: {
      en: "Understand ML fundamentals — supervised learning, neural networks, and model evaluation with hands-on projects.",
      ar: "فهم أساسيات تعلم الآلة — التعلم الموجه، الشبكات العصبية، وتقييم النماذج مع مشاريع عملية."
    },
    thumbnail: "https://placehold.co/400x225/8b5cf6/ffffff?text=ML",
    instructor: "Abdulrahman Mahmoud",
    category: "data-science",
    difficulty: "intermediate",
    duration: "14h 20m",
    lessonCount: 28,
    modules: [
      {
        title: { en: "ML Foundations", ar: "أسس تعلم الآلة" },
        lessons: [
          {
            id: "ml-1-1",
            title: { en: "What is Machine Learning?", ar: "ما هو تعلم الآلة؟" },
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            duration: "14:30",
            completed: false,
            transcript: [
              { time: 0, text: { en: "Machine learning is a subset of AI.", ar: "تعلم الآلة هو فرع من الذكاء الاصطناعي." } }
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "ui-ux-design",
    title: { en: "UI/UX Design Principles", ar: "مبادئ تصميم UI/UX" },
    description: {
      en: "Learn design thinking, wireframing, prototyping, and user research to create delightful digital experiences.",
      ar: "تعلم التفكير التصميمي، الإطارات السلكية، النماذج الأولية، وبحث المستخدم لإنشاء تجارب رقمية مميزة."
    },
    thumbnail: "https://placehold.co/400x225/ec4899/ffffff?text=Design",
    instructor: "Abdulrahman Mahmoud",
    category: "design",
    difficulty: "beginner",
    duration: "6h 50m",
    lessonCount: 15,
    modules: [
      {
        title: { en: "Design Fundamentals", ar: "أساسيات التصميم" },
        lessons: [
          {
            id: "uid-1-1",
            title: { en: "Introduction to UX Design", ar: "مقدمة في تصميم تجربة المستخدم" },
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            duration: "11:20",
            completed: false,
            transcript: [
              { time: 0, text: { en: "UX design is about creating meaningful experiences.", ar: "تصميم تجربة المستخدم يتعلق بإنشاء تجارب ذات معنى." } }
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "figma-advanced",
    title: { en: "Advanced Figma Techniques", ar: "تقنيات Figma المتقدمة" },
    description: {
      en: "Master auto-layout, components, variants, and design systems in Figma for professional-grade workflows.",
      ar: "إتقان التخطيط التلقائي، المكونات، المتغيرات، وأنظمة التصميم في Figma لسير العمل الاحترافي."
    },
    thumbnail: "https://placehold.co/400x225/f59e0b/ffffff?text=Figma",
    instructor: "Abdulrahman Mahmoud",
    category: "design",
    difficulty: "advanced",
    duration: "9h 10m",
    lessonCount: 20,
    modules: [
      {
        title: { en: "Figma Power Features", ar: "ميزات Figma المتقدمة" },
        lessons: [
          {
            id: "fa-1-1",
            title: { en: "Auto Layout Mastery", ar: "إتقان التخطيط التلقائي" },
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
            duration: "16:45",
            completed: false,
            transcript: [
              { time: 0, text: { en: "Auto layout is Figma's most powerful feature.", ar: "التخطيط التلقائي هو أقوى ميزة في Figma." } }
            ]
          }
        ]
      }
    ]
  }
];

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}
```

- [ ] **Step 3: Create mock pricing data**

Create `src/data/mock/pricing.ts`:

```typescript
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
```

- [ ] **Step 4: Commit**

```bash
git add src/lib/types.ts src/data/mock/courses.ts src/data/mock/pricing.ts
git commit -m "feat: add TypeScript types and mock data for courses and pricing"
```

---

## Task 3: i18n System & Dictionaries

**Files:**
- Create: `src/lib/i18n.ts`
- Create: `src/data/mock/dictionaries/en.ts`
- Create: `src/data/mock/dictionaries/ar.ts`

- [ ] **Step 1: Create English dictionary**

Create `src/data/mock/dictionaries/en.ts`:

```typescript
const en = {
  nav: {
    home: "Home",
    catalog: "Catalog",
    login: "Log In",
    subscribe: "Subscribe",
  },
  hero: {
    headline: "Master New Skills, Transform Your Future",
    subtext: "Join thousands of learners in our expert-led courses. Learn at your own pace with hands-on projects.",
    cta: "Start Learning",
  },
  features: {
    title: "Why Learn With Us",
    items: [
      { title: "Expert Instructors", description: "Learn from industry professionals with real-world experience." },
      { title: "Flexible Learning", description: "Study at your own pace, anytime, anywhere, on any device." },
      { title: "Certificates", description: "Earn recognized certificates to showcase your achievements." },
    ],
  },
  carousel: {
    title: "Popular Courses",
    lessons: "lessons",
  },
  footer: {
    brand: "LearnHub",
    tagline: "Empowering learners worldwide.",
    quickLinks: "Quick Links",
    contact: "Contact",
    instructor: "Instructor",
    supportEmail: "Support Email",
    rights: "All rights reserved.",
  },
  catalog: {
    title: "Explore Our Courses",
    pricing: "Choose Your Plan",
    allCategories: "All",
    allDifficulties: "All",
    categories: {
      "web-dev": "Web Dev",
      "data-science": "Data Science",
      design: "Design",
    },
    difficulties: {
      beginner: "Beginner",
      intermediate: "Intermediate",
      advanced: "Advanced",
    },
    mostPopular: "Most Popular",
    noCourses: "No courses match your filters.",
  },
  player: {
    modules: "Modules",
    progress: "Progress",
    overview: "Overview",
    transcript: "Transcript",
    instructor: "Instructor",
    whatYouLearn: "What You'll Learn",
    collapseMenu: "Collapse menu",
    expandMenu: "Expand menu",
    speed: "Speed",
  },
  theme: {
    light: "Light mode",
    dark: "Dark mode",
  },
  locale: {
    switchTo: "العربية",
  },
} as const;

export type Dictionary = typeof en;
export default en;
```

- [ ] **Step 2: Create Arabic dictionary**

Create `src/data/mock/dictionaries/ar.ts`:

```typescript
import type { Dictionary } from "./en";

const ar: Dictionary = {
  nav: {
    home: "الرئيسية",
    catalog: "الدورات",
    login: "تسجيل الدخول",
    subscribe: "اشتراك",
  },
  hero: {
    headline: "أتقن مهارات جديدة، غيّر مستقبلك",
    subtext: "انضم إلى آلاف المتعلمين في دوراتنا بقيادة خبراء. تعلم بالسرعة التي تناسبك مع مشاريع عملية.",
    cta: "ابدأ التعلم",
  },
  features: {
    title: "لماذا تتعلم معنا",
    items: [
      { title: "مدربون خبراء", description: "تعلم من محترفين في الصناعة ذوي خبرة واقعية." },
      { title: "تعلم مرن", description: "ادرس بالسرعة التي تناسبك، في أي وقت، في أي مكان، على أي جهاز." },
      { title: "شهادات", description: "احصل على شهادات معترف بها لعرض إنجازاتك." },
    ],
  },
  carousel: {
    title: "الدورات الشائعة",
    lessons: "درس",
  },
  footer: {
    brand: "LearnHub",
    tagline: "تمكين المتعلمين حول العالم.",
    quickLinks: "روابط سريعة",
    contact: "تواصل معنا",
    instructor: "المدرب",
    supportEmail: "البريد الإلكتروني للدعم",
    rights: "جميع الحقوق محفوظة.",
  },
  catalog: {
    title: "استكشف دوراتنا",
    pricing: "اختر خطتك",
    allCategories: "الكل",
    allDifficulties: "الكل",
    categories: {
      "web-dev": "تطوير الويب",
      "data-science": "علم البيانات",
      design: "التصميم",
    },
    difficulties: {
      beginner: "مبتدئ",
      intermediate: "متوسط",
      advanced: "متقدم",
    },
    mostPopular: "الأكثر شعبية",
    noCourses: "لا توجد دورات تطابق معاييرك.",
  },
  player: {
    modules: "الوحدات",
    progress: "التقدم",
    overview: "نظرة عامة",
    transcript: "النص",
    instructor: "المدرب",
    whatYouLearn: "ماذا ستتعلم",
    collapseMenu: "طي القائمة",
    expandMenu: "توسيع القائمة",
    speed: "السرعة",
  },
  theme: {
    light: "الوضع الفاتح",
    dark: "الوضع الداكن",
  },
  locale: {
    switchTo: "English",
  },
} as const;

export default ar;
```

- [ ] **Step 3: Create i18n utility**

Create `src/lib/i18n.ts`:

```typescript
import type { Locale } from "./types";
import type { Dictionary } from "@/data/mock/dictionaries/en";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("@/data/mock/dictionaries/en").then((m) => m.default),
  ar: () => import("@/data/mock/dictionaries/ar").then((m) => m.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}

export const locales: Locale[] = ["en", "ar"];
export const defaultLocale: Locale = "en";

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export function getDirection(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}
```

- [ ] **Step 4: Commit**

```bash
git add src/lib/i18n.ts src/data/mock/dictionaries/
git commit -m "feat: add i18n system with English and Arabic dictionaries"
```

---

## Task 4: Root Layout, Locale Layout & Theme Provider

**Files:**
- Modify: `src/app/layout.tsx`
- Create: `src/app/[locale]/layout.tsx`
- Create: `src/components/shared/theme-provider.tsx`
- Create: `src/components/shared/page-transition.tsx`

- [ ] **Step 1: Create ThemeProvider**

Create `src/components/shared/theme-provider.tsx`:

```tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored) {
      setTheme(stored);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

- [ ] **Step 2: Create PageTransition wrapper**

Create `src/components/shared/page-transition.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 3: Update root layout**

Replace `src/app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LearnHub — E-Learning Platform",
  description: "Master new skills with expert-led courses. Learn web development, data science, and design.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
```

- [ ] **Step 4: Create locale layout**

Create `src/app/[locale]/layout.tsx`:

```tsx
import { Inter, Cairo } from "next/font/google";
import { notFound } from "next/navigation";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { Navbar } from "@/components/shared/navbar";
import { isValidLocale, getDictionary, getDirection } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cairo = Cairo({ subsets: ["arabic"], variable: "--font-cairo" });

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dict = await getDictionary(locale as Locale);
  const dir = getDirection(locale as Locale);
  const fontClass = locale === "ar" ? cairo.variable : inter.variable;

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body className={`${inter.variable} ${cairo.variable} font-sans antialiased`}>
        <ThemeProvider>
          <Navbar locale={locale as Locale} dict={dict} />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 5: Create a temporary landing page placeholder**

Create `src/app/[locale]/page.tsx`:

```tsx
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/types";
import { PageTransition } from "@/components/shared/page-transition";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <PageTransition>
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold">{dict.hero.headline}</h1>
      </div>
    </PageTransition>
  );
}
```

- [ ] **Step 6: Add redirect from root to default locale**

Create `src/app/page.tsx`:

```tsx
import { redirect } from "next/navigation";
import { defaultLocale } from "@/lib/i18n";

export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
```

- [ ] **Step 7: Commit**

```bash
git add src/app/ src/components/shared/theme-provider.tsx src/components/shared/page-transition.tsx
git commit -m "feat: add root layout, locale layout with i18n/RTL, theme provider, and page transitions"
```

---

## Task 5: Navbar & Shared Components

**Files:**
- Create: `src/components/shared/navbar.tsx`
- Create: `src/components/shared/mobile-nav.tsx`
- Create: `src/components/shared/theme-toggle.tsx`
- Create: `src/components/shared/locale-switcher.tsx`
- Create: `src/components/shared/logo.tsx`

- [ ] **Step 1: Create Logo component**

Create `src/components/shared/logo.tsx`:

```tsx
import Link from "next/link";
import { GraduationCap } from "lucide-react";
import type { Locale } from "@/lib/types";

export function Logo({ locale }: { locale: Locale }) {
  return (
    <Link href={`/${locale}`} className="flex items-center gap-2 font-bold text-xl">
      <GraduationCap className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
      <span>LearnHub</span>
    </Link>
  );
}
```

- [ ] **Step 2: Create ThemeToggle component**

Create `src/components/shared/theme-toggle.tsx`:

```tsx
"use client";

import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/components/shared/theme-provider";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative"
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {theme === "light" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </motion.div>
    </Button>
  );
}
```

- [ ] **Step 3: Create LocaleSwitcher component**

Create `src/components/shared/locale-switcher.tsx`:

```tsx
"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";
import type { Locale } from "@/lib/types";
import type { Dictionary } from "@/data/mock/dictionaries/en";

export function LocaleSwitcher({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = () => {
    const newLocale = locale === "en" ? "ar" : "en";
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <Button variant="ghost" size="sm" onClick={switchLocale} className="gap-1.5">
      <Languages className="h-4 w-4" />
      <span>{dict.locale.switchTo}</span>
    </Button>
  );
}
```

- [ ] **Step 4: Create MobileNav component**

Create `src/components/shared/mobile-nav.tsx`:

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { LocaleSwitcher } from "./locale-switcher";
import type { Locale } from "@/lib/types";
import type { Dictionary } from "@/data/mock/dictionaries/en";

export function MobileNav({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side={locale === "ar" ? "right" : "left"} className="w-72">
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <div className="flex flex-col gap-6 mt-8">
          <Logo locale={locale} />
          <nav className="flex flex-col gap-4">
            <Link
              href={`/${locale}`}
              onClick={() => setOpen(false)}
              className="text-lg font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              {dict.nav.home}
            </Link>
            <Link
              href={`/${locale}/catalog`}
              onClick={() => setOpen(false)}
              className="text-lg font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              {dict.nav.catalog}
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LocaleSwitcher locale={locale} dict={dict} />
          </div>
          <div className="flex flex-col gap-2">
            <Button variant="outline">{dict.nav.login}</Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">{dict.nav.subscribe}</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
```

- [ ] **Step 5: Create Navbar component**

Create `src/components/shared/navbar.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { LocaleSwitcher } from "./locale-switcher";
import { MobileNav } from "./mobile-nav";
import type { Locale } from "@/lib/types";
import type { Dictionary } from "@/data/mock/dictionaries/en";

export function Navbar({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY < 50) {
        setVisible(true);
      } else if (currentY > lastScrollY) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(currentY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="glass border-b border-slate-200/20 dark:border-slate-700/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Logo locale={locale} />
            <div className="hidden md:flex items-center gap-6">
              <Link
                href={`/${locale}`}
                className="text-sm font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                {dict.nav.home}
              </Link>
              <Link
                href={`/${locale}/catalog`}
                className="text-sm font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                {dict.nav.catalog}
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <LocaleSwitcher locale={locale} dict={dict} />
            <ThemeToggle />
            <Button variant="ghost" size="sm">{dict.nav.login}</Button>
            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">
              {dict.nav.subscribe}
            </Button>
          </div>

          <MobileNav locale={locale} dict={dict} />
        </div>
      </nav>
    </header>
  );
}
```

- [ ] **Step 6: Verify dev server runs without errors**

```bash
npm run dev
```

Expected: Server starts, visiting `http://localhost:3000` redirects to `/en`, shows headline with navbar.

- [ ] **Step 7: Commit**

```bash
git add src/components/shared/
git commit -m "feat: add navbar with theme toggle, locale switcher, mobile nav, and logo"
```

---

## Task 6: Landing Page — Hero Section

**Files:**
- Create: `src/components/landing/hero.tsx`
- Modify: `src/app/[locale]/page.tsx`

- [ ] **Step 1: Create Hero component**

Create `src/components/landing/hero.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/types";
import type { Dictionary } from "@/data/mock/dictionaries/en";

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center gradient-hero overflow-hidden">
      {/* Decorative blurred circles */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
        >
          {dict.hero.headline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="mt-6 text-lg sm:text-xl text-indigo-100 max-w-2xl mx-auto"
        >
          {dict.hero.subtext}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="mt-10"
        >
          <Link href={`/${locale}/catalog`}>
            <Button
              size="lg"
              className="bg-white text-indigo-700 hover:bg-indigo-50 font-semibold text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all group"
            >
              {dict.hero.cta}
              <ArrowRight className="ms-2 h-5 w-5 group-hover:translate-x-1 transition-transform rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Update landing page to use Hero**

Replace `src/app/[locale]/page.tsx` with:

```tsx
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/types";
import { PageTransition } from "@/components/shared/page-transition";
import { Hero } from "@/components/landing/hero";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <PageTransition>
      <Hero locale={locale as Locale} dict={dict} />
    </PageTransition>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/landing/hero.tsx src/app/\[locale\]/page.tsx
git commit -m "feat: add hero section with animated gradient and CTA"
```

---

## Task 7: Landing Page — Features Grid

**Files:**
- Create: `src/components/landing/features-grid.tsx`
- Modify: `src/app/[locale]/page.tsx`

- [ ] **Step 1: Create FeaturesGrid component**

Create `src/components/landing/features-grid.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { BookOpen, Award, Clock } from "lucide-react";
import type { Dictionary } from "@/data/mock/dictionaries/en";

const icons = [BookOpen, Award, Clock];

export function FeaturesGrid({ dict }: { dict: Dictionary }) {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-center mb-16"
        >
          {dict.features.title}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {dict.features.items.map((item, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass rounded-2xl p-8 text-center hover:shadow-lg transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 mb-6">
                  <Icon className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add FeaturesGrid to landing page**

Update `src/app/[locale]/page.tsx` — add import and insert `<FeaturesGrid dict={dict} />` after `<Hero />`:

```tsx
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/types";
import { PageTransition } from "@/components/shared/page-transition";
import { Hero } from "@/components/landing/hero";
import { FeaturesGrid } from "@/components/landing/features-grid";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <PageTransition>
      <Hero locale={locale as Locale} dict={dict} />
      <FeaturesGrid dict={dict} />
    </PageTransition>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/landing/features-grid.tsx src/app/\[locale\]/page.tsx
git commit -m "feat: add features grid section with glassmorphism cards"
```

---

## Task 8: Landing Page — Course Carousel & Course Card

**Files:**
- Create: `src/components/landing/course-card.tsx`
- Create: `src/components/landing/course-carousel.tsx`
- Modify: `src/app/[locale]/page.tsx`

- [ ] **Step 1: Create CourseCard component**

Create `src/components/landing/course-card.tsx`:

```tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Course, Locale } from "@/lib/types";

const difficultyColors: Record<string, string> = {
  beginner: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400",
  intermediate: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400",
  advanced: "bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-400",
};

export function CourseCard({
  course,
  locale,
  lessonsLabel,
}: {
  course: Course;
  locale: Locale;
  lessonsLabel: string;
}) {
  return (
    <Link href={`/${locale}/course/${course.slug}`}>
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="glass rounded-2xl overflow-hidden cursor-pointer group min-w-[300px] sm:min-w-[320px]"
      >
        <div className="relative overflow-hidden">
          <img
            src={course.thumbnail}
            alt={course.title[locale]}
            className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <Badge
            className={`absolute top-3 end-3 ${difficultyColors[course.difficulty]} border-0 text-xs font-medium`}
          >
            {course.difficulty}
          </Badge>
        </div>
        <div className="p-5">
          <h3 className="font-semibold text-lg mb-2 line-clamp-1">{course.title[locale]}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">{course.instructor}</p>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              {course.lessonCount} {lessonsLabel}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {course.duration}
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
```

- [ ] **Step 2: Create CourseCarousel component**

Create `src/components/landing/course-carousel.tsx`:

```tsx
"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CourseCard } from "./course-card";
import type { Course, Locale } from "@/lib/types";
import type { Dictionary } from "@/data/mock/dictionaries/en";

export function CourseCarousel({
  courses,
  locale,
  dict,
}: {
  courses: Course[];
  locale: Locale;
  dict: Dictionary;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 340;
    const dir = locale === "ar" ? -1 : 1;
    const scrollAmount = direction === "left" ? -amount * dir : amount * dir;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold"
          >
            {dict.carousel.title}
          </motion.h2>
          <div className="hidden sm:flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => scroll("left")} className="rounded-full">
              <ChevronLeft className="h-5 w-5 rtl:rotate-180" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => scroll("right")} className="rounded-full">
              <ChevronRight className="h-5 w-5 rtl:rotate-180" />
            </Button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {courses.map((course) => (
            <div key={course.slug} className="snap-start shrink-0">
              <CourseCard course={course} locale={locale} lessonsLabel={dict.carousel.lessons} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Add CourseCarousel to landing page**

Update `src/app/[locale]/page.tsx`:

```tsx
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/types";
import { PageTransition } from "@/components/shared/page-transition";
import { Hero } from "@/components/landing/hero";
import { FeaturesGrid } from "@/components/landing/features-grid";
import { CourseCarousel } from "@/components/landing/course-carousel";
import { courses } from "@/data/mock/courses";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <PageTransition>
      <Hero locale={locale as Locale} dict={dict} />
      <FeaturesGrid dict={dict} />
      <CourseCarousel courses={courses} locale={locale as Locale} dict={dict} />
    </PageTransition>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/landing/course-card.tsx src/components/landing/course-carousel.tsx src/app/\[locale\]/page.tsx
git commit -m "feat: add course carousel with hover-scaling cards and scroll navigation"
```

---

## Task 9: Landing Page — Footer

**Files:**
- Create: `src/components/landing/footer.tsx`
- Modify: `src/app/[locale]/layout.tsx`

- [ ] **Step 1: Create Footer component**

Create `src/components/landing/footer.tsx`:

```tsx
import Link from "next/link";
import { GraduationCap, Mail, User } from "lucide-react";
import { LocaleSwitcher } from "@/components/shared/locale-switcher";
import type { Locale } from "@/lib/types";
import type { Dictionary } from "@/data/mock/dictionaries/en";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 font-bold text-xl mb-4">
              <GraduationCap className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
              <span>{dict.footer.brand}</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-4">{dict.footer.tagline}</p>
            <LocaleSwitcher locale={locale} dict={dict} />
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{dict.footer.quickLinks}</h3>
            <nav className="flex flex-col gap-3">
              <Link
                href={`/${locale}`}
                className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                {dict.nav.home}
              </Link>
              <Link
                href={`/${locale}/catalog`}
                className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                {dict.nav.catalog}
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{dict.footer.contact}</h3>
            <div className="flex flex-col gap-3 text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{dict.footer.instructor}: Abdulrahman Mahmoud</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>{dict.footer.supportEmail}: boodyaly18@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500 dark:text-slate-500">
          &copy; {new Date().getFullYear()} {dict.footer.brand}. {dict.footer.rights}
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Add Footer to locale layout**

Update `src/app/[locale]/layout.tsx` — add import for Footer and insert `<Footer locale={locale as Locale} dict={dict} />` after `<main>`:

In the return JSX, replace `<main>{children}</main>` with:

```tsx
<main className="pt-16">{children}</main>
<Footer locale={locale as Locale} dict={dict} />
```

Add the import at the top:

```tsx
import { Footer } from "@/components/landing/footer";
```

- [ ] **Step 3: Commit**

```bash
git add src/components/landing/footer.tsx src/app/\[locale\]/layout.tsx
git commit -m "feat: add footer with instructor contact info and locale switcher"
```

---

## Task 10: Catalog Page — Pricing Section

**Files:**
- Create: `src/components/catalog/pricing-card.tsx`
- Create: `src/components/catalog/pricing-section.tsx`
- Create: `src/app/[locale]/catalog/page.tsx`

- [ ] **Step 1: Create PricingCard component**

Create `src/components/catalog/pricing-card.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { PricingPlan, Locale } from "@/lib/types";

export function PricingCard({
  plan,
  locale,
  popularLabel,
  index,
}: {
  plan: PricingPlan;
  locale: Locale;
  popularLabel: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative glass rounded-2xl p-8 flex flex-col ${
        plan.highlighted
          ? "ring-2 ring-indigo-500 scale-105 shadow-xl shadow-indigo-500/10"
          : ""
      }`}
    >
      {plan.highlighted && (
        <Badge className="absolute -top-3 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 bg-indigo-600 text-white border-0 px-4 py-1">
          {popularLabel}
        </Badge>
      )}

      <h3 className="text-xl font-bold mb-2">{plan.name[locale]}</h3>
      <div className="mb-6">
        <span className="text-4xl font-bold">{plan.price}</span>
        <span className="text-slate-500 dark:text-slate-400 ms-1">{plan.period[locale]}</span>
      </div>

      <ul className="flex-1 space-y-3 mb-8">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2">
            <Check className="h-5 w-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
            <span className="text-slate-600 dark:text-slate-400">{feature[locale]}</span>
          </li>
        ))}
      </ul>

      <Button
        className={`w-full ${
          plan.highlighted
            ? "bg-indigo-600 hover:bg-indigo-700 text-white"
            : ""
        }`}
        variant={plan.highlighted ? "default" : "outline"}
        size="lg"
      >
        {plan.cta[locale]}
      </Button>
    </motion.div>
  );
}
```

- [ ] **Step 2: Create PricingSection component**

Create `src/components/catalog/pricing-section.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { PricingCard } from "./pricing-card";
import type { PricingPlan, Locale } from "@/lib/types";
import type { Dictionary } from "@/data/mock/dictionaries/en";

export function PricingSection({
  plans,
  locale,
  dict,
}: {
  plans: PricingPlan[];
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <section className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-center mb-16"
        >
          {dict.catalog.pricing}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {plans.map((plan, index) => (
            <PricingCard
              key={plan.name.en}
              plan={plan}
              locale={locale}
              popularLabel={dict.catalog.mostPopular}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create catalog page**

Create `src/app/[locale]/catalog/page.tsx`:

```tsx
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/types";
import { PageTransition } from "@/components/shared/page-transition";
import { PricingSection } from "@/components/catalog/pricing-section";
import { pricingPlans } from "@/data/mock/pricing";

export default async function CatalogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <PageTransition>
      <div className="pt-8">
        <PricingSection plans={pricingPlans} locale={locale as Locale} dict={dict} />
      </div>
    </PageTransition>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/catalog/ src/app/\[locale\]/catalog/
git commit -m "feat: add pricing section with highlighted Pro plan"
```

---

## Task 11: Catalog Page — Filter Pills & Course Grid

**Files:**
- Create: `src/components/catalog/filter-pills.tsx`
- Create: `src/components/catalog/course-grid.tsx`
- Modify: `src/app/[locale]/catalog/page.tsx`

- [ ] **Step 1: Create FilterPills component**

Create `src/components/catalog/filter-pills.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import type { Category, Difficulty } from "@/lib/types";
import type { Dictionary } from "@/data/mock/dictionaries/en";

interface FilterPillsProps {
  dict: Dictionary;
  selectedCategory: Category | null;
  selectedDifficulty: Difficulty | null;
  onCategoryChange: (category: Category | null) => void;
  onDifficultyChange: (difficulty: Difficulty | null) => void;
}

const categories: (Category | null)[] = [null, "web-dev", "data-science", "design"];
const difficulties: (Difficulty | null)[] = [null, "beginner", "intermediate", "advanced"];

export function FilterPills({
  dict,
  selectedCategory,
  selectedDifficulty,
  onCategoryChange,
  onDifficultyChange,
}: FilterPillsProps) {
  return (
    <div className="space-y-4">
      {/* Category pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          const label = cat ? dict.catalog.categories[cat] : dict.catalog.allCategories;
          return (
            <button
              key={cat ?? "all-cat"}
              onClick={() => onCategoryChange(cat)}
              className="relative px-4 py-2 rounded-full text-sm font-medium transition-colors"
            >
              {isActive && (
                <motion.div
                  layoutId="category-pill"
                  className="absolute inset-0 bg-indigo-600 rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span
                className={`relative z-10 ${
                  isActive ? "text-white" : "text-slate-600 dark:text-slate-400"
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Difficulty pills */}
      <div className="flex flex-wrap gap-2">
        {difficulties.map((diff) => {
          const isActive = selectedDifficulty === diff;
          const label = diff ? dict.catalog.difficulties[diff] : dict.catalog.allDifficulties;
          return (
            <button
              key={diff ?? "all-diff"}
              onClick={() => onDifficultyChange(diff)}
              className="relative px-4 py-2 rounded-full text-sm font-medium transition-colors"
            >
              {isActive && (
                <motion.div
                  layoutId="difficulty-pill"
                  className="absolute inset-0 bg-indigo-600 rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span
                className={`relative z-10 ${
                  isActive ? "text-white" : "text-slate-600 dark:text-slate-400"
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create CourseGrid component**

Create `src/components/catalog/course-grid.tsx`:

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CourseCard } from "@/components/landing/course-card";
import { FilterPills } from "./filter-pills";
import type { Course, Category, Difficulty, Locale } from "@/lib/types";
import type { Dictionary } from "@/data/mock/dictionaries/en";

export function CourseGrid({
  courses,
  locale,
  dict,
}: {
  courses: Course[];
  locale: Locale;
  dict: Dictionary;
}) {
  const [category, setCategory] = useState<Category | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);

  const filtered = courses.filter((course) => {
    if (category && course.category !== category) return false;
    if (difficulty && course.difficulty !== difficulty) return false;
    return true;
  });

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-center mb-12"
        >
          {dict.catalog.title}
        </motion.h2>

        <div className="flex justify-center mb-12">
          <FilterPills
            dict={dict}
            selectedCategory={category}
            selectedDifficulty={difficulty}
            onCategoryChange={setCategory}
            onDifficultyChange={setDifficulty}
          />
        </div>

        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key={`${category}-${difficulty}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filtered.map((course) => (
                <CourseCard
                  key={course.slug}
                  course={course}
                  locale={locale}
                  lessonsLabel={dict.carousel.lessons}
                />
              ))}
            </motion.div>
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-slate-500 dark:text-slate-400 py-12"
            >
              {dict.catalog.noCourses}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Update catalog page to include course grid**

Replace `src/app/[locale]/catalog/page.tsx` with:

```tsx
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/types";
import { PageTransition } from "@/components/shared/page-transition";
import { PricingSection } from "@/components/catalog/pricing-section";
import { CourseGrid } from "@/components/catalog/course-grid";
import { pricingPlans } from "@/data/mock/pricing";
import { courses } from "@/data/mock/courses";

export default async function CatalogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <PageTransition>
      <div className="pt-8">
        <PricingSection plans={pricingPlans} locale={locale as Locale} dict={dict} />
        <CourseGrid courses={courses} locale={locale as Locale} dict={dict} />
      </div>
    </PageTransition>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/catalog/filter-pills.tsx src/components/catalog/course-grid.tsx src/app/\[locale\]/catalog/page.tsx
git commit -m "feat: add course filtering with animated pills and responsive grid"
```

---

## Task 12: Video Player — Custom Player & Control Bar

**Files:**
- Create: `src/components/player/video-player.tsx`
- Create: `src/components/player/control-bar.tsx`

- [ ] **Step 1: Create ControlBar component**

Create `src/components/player/control-bar.tsx`:

```tsx
"use client";

import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/data/mock/dictionaries/en";

interface ControlBarProps {
  playing: boolean;
  muted: boolean;
  volume: number;
  played: number;
  loaded: number;
  duration: number;
  playbackRate: number;
  isFullscreen: boolean;
  dict: Dictionary;
  onPlayPause: () => void;
  onMute: () => void;
  onVolumeChange: (value: number) => void;
  onSeek: (value: number) => void;
  onPlaybackRateChange: (rate: number) => void;
  onFullscreen: () => void;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

export function ControlBar({
  playing,
  muted,
  volume,
  played,
  loaded,
  duration,
  playbackRate,
  isFullscreen,
  dict,
  onPlayPause,
  onMute,
  onVolumeChange,
  onSeek,
  onPlaybackRateChange,
  onFullscreen,
}: ControlBarProps) {
  return (
    <div className="absolute bottom-0 inset-x-0 bg-slate-900/80 backdrop-blur-sm rounded-b-xl px-4 py-3 flex flex-col gap-2">
      {/* Timeline scrubber */}
      <div className="relative w-full h-1 group">
        {/* Buffer indicator */}
        <div
          className="absolute inset-y-0 start-0 bg-slate-500/40 rounded-full"
          style={{ width: `${loaded * 100}%` }}
        />
        <Slider
          value={[played * 100]}
          max={100}
          step={0.1}
          onValueChange={([val]) => onSeek(val / 100)}
          className="absolute inset-0"
        />
      </div>

      {/* Controls row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onPlayPause} className="text-white hover:bg-white/10 h-8 w-8">
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>

          <div className="flex items-center gap-1 group/vol">
            <Button variant="ghost" size="icon" onClick={onMute} className="text-white hover:bg-white/10 h-8 w-8">
              {muted || volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <div className="w-0 overflow-hidden group-hover/vol:w-20 transition-all duration-200">
              <Slider
                value={[muted ? 0 : volume * 100]}
                max={100}
                step={1}
                onValueChange={([val]) => onVolumeChange(val / 100)}
              />
            </div>
          </div>

          <span className="text-white/80 text-xs ms-2">
            {formatTime(played * duration)} / {formatTime(duration)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 text-xs h-8 px-2">
                {playbackRate}x
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {speeds.map((speed) => (
                <DropdownMenuItem key={speed} onClick={() => onPlaybackRateChange(speed)}>
                  {speed}x {speed === 1 && "(Normal)"}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" onClick={onFullscreen} className="text-white hover:bg-white/10 h-8 w-8">
            {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create VideoPlayer component**

Create `src/components/player/video-player.tsx`:

```tsx
"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import ReactPlayer from "react-player";
import { ControlBar } from "./control-bar";
import type { Dictionary } from "@/data/mock/dictionaries/en";

interface VideoPlayerProps {
  url: string;
  dict: Dictionary;
  onProgress?: (playedSeconds: number) => void;
}

export function VideoPlayer({ url, dict, onProgress }: VideoPlayerProps) {
  const playerRef = useRef<ReactPlayer>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout>>(null);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [played, setPlayed] = useState(0);
  const [loaded, setLoaded] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const resetHideTimer = useCallback(() => {
    setShowControls(true);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    if (playing) {
      hideTimerRef.current = setTimeout(() => setShowControls(false), 3000);
    }
  }, [playing]);

  useEffect(() => {
    resetHideTimer();
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [playing, resetHideTimer]);

  const handleSeek = (fraction: number) => {
    setPlayed(fraction);
    playerRef.current?.seekTo(fraction, "fraction");
  };

  const handleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative bg-black rounded-xl overflow-hidden aspect-video group"
      onMouseMove={resetHideTimer}
      onMouseLeave={() => playing && setShowControls(false)}
    >
      <ReactPlayer
        ref={playerRef}
        url={url}
        width="100%"
        height="100%"
        playing={playing}
        muted={muted}
        volume={volume}
        playbackRate={playbackRate}
        onProgress={({ played, loaded, playedSeconds }) => {
          setPlayed(played);
          setLoaded(loaded);
          onProgress?.(playedSeconds);
        }}
        onDuration={setDuration}
        style={{ position: "absolute", top: 0, left: 0 }}
      />

      {/* Click to play/pause overlay */}
      <div
        className="absolute inset-0 z-10 cursor-pointer"
        onClick={() => setPlaying(!playing)}
      />

      {/* Control bar */}
      <div
        className={`absolute bottom-0 inset-x-0 z-20 transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <ControlBar
          playing={playing}
          muted={muted}
          volume={volume}
          played={played}
          loaded={loaded}
          duration={duration}
          playbackRate={playbackRate}
          isFullscreen={isFullscreen}
          dict={dict}
          onPlayPause={() => setPlaying(!playing)}
          onMute={() => setMuted(!muted)}
          onVolumeChange={setVolume}
          onSeek={handleSeek}
          onPlaybackRateChange={setPlaybackRate}
          onFullscreen={handleFullscreen}
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/player/video-player.tsx src/components/player/control-bar.tsx
git commit -m "feat: add custom video player with control bar, auto-hide, and fullscreen"
```

---

## Task 13: Video Player — Course Sidebar

**Files:**
- Create: `src/components/player/course-sidebar.tsx`

- [ ] **Step 1: Create CourseSidebar component**

Create `src/components/player/course-sidebar.tsx`:

```tsx
"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Check, PlayCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Course, Locale } from "@/lib/types";
import type { Dictionary } from "@/data/mock/dictionaries/en";

interface CourseSidebarProps {
  course: Course;
  locale: Locale;
  dict: Dictionary;
  activeLessonId: string;
  onLessonSelect: (lessonId: string) => void;
}

export function CourseSidebar({
  course,
  locale,
  dict,
  activeLessonId,
  onLessonSelect,
}: CourseSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedLessons = course.modules.reduce(
    (acc, m) => acc + m.lessons.filter((l) => l.completed).length,
    0
  );
  const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <div className="relative flex">
      {/* Collapse toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -start-4 top-4 z-10 h-8 w-8 rounded-full glass"
        aria-label={collapsed ? dict.player.expandMenu : dict.player.collapseMenu}
      >
        {collapsed ? (
          <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
        ) : (
          <ChevronRight className="h-4 w-4 rtl:rotate-180" />
        )}
      </Button>

      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 320, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-s border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 h-full"
          >
            <div className="w-[320px] p-6">
              <h2 className="font-bold text-lg mb-2 line-clamp-2">{course.title[locale]}</h2>

              {/* Progress */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mb-2">
                  <span>{dict.player.progress}</span>
                  <span>{progressPercent}%</span>
                </div>
                <Progress value={progressPercent} className="h-2" />
              </div>

              {/* Module accordion */}
              <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">
                {dict.player.modules}
              </div>
              <Accordion type="multiple" defaultValue={course.modules.map((_, i) => `module-${i}`)}>
                {course.modules.map((module, moduleIndex) => (
                  <AccordionItem key={moduleIndex} value={`module-${moduleIndex}`}>
                    <AccordionTrigger className="text-sm font-semibold hover:no-underline">
                      {module.title[locale]}
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-1">
                        {module.lessons.map((lesson) => {
                          const isActive = lesson.id === activeLessonId;
                          return (
                            <li key={lesson.id}>
                              <button
                                onClick={() => onLessonSelect(lesson.id)}
                                className={`w-full text-start flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                                  isActive
                                    ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-medium"
                                    : "hover:bg-slate-100 dark:hover:bg-slate-800"
                                }`}
                              >
                                {lesson.completed ? (
                                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                                ) : (
                                  <PlayCircle className={`h-4 w-4 shrink-0 ${isActive ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400"}`} />
                                )}
                                <span className="flex-1 line-clamp-1">{lesson.title[locale]}</span>
                                <span className="text-xs text-slate-400">{lesson.duration}</span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/player/course-sidebar.tsx
git commit -m "feat: add collapsible course sidebar with module accordion and progress"
```

---

## Task 14: Video Player — Content Tabs (Overview & Transcript)

**Files:**
- Create: `src/components/player/content-tabs.tsx`
- Create: `src/components/player/transcript-viewer.tsx`

- [ ] **Step 1: Create TranscriptViewer component**

Create `src/components/player/transcript-viewer.tsx`:

```tsx
"use client";

import { useRef, useEffect } from "react";
import type { TranscriptEntry, Locale } from "@/lib/types";

interface TranscriptViewerProps {
  entries: TranscriptEntry[];
  locale: Locale;
  currentTime: number;
}

function formatTimestamp(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function TranscriptViewer({ entries, locale, currentTime }: TranscriptViewerProps) {
  const activeRef = useRef<HTMLDivElement>(null);

  const activeIndex = entries.reduce((acc, entry, i) => {
    if (entry.time <= currentTime) return i;
    return acc;
  }, 0);

  useEffect(() => {
    activeRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [activeIndex]);

  return (
    <div className="max-h-80 overflow-y-auto space-y-3 p-4">
      {entries.map((entry, index) => {
        const isActive = index === activeIndex;
        return (
          <div
            key={index}
            ref={isActive ? activeRef : undefined}
            className={`flex gap-3 p-3 rounded-lg transition-colors ${
              isActive
                ? "bg-indigo-50 dark:bg-indigo-900/20 border-s-2 border-indigo-500"
                : ""
            }`}
          >
            <span className="text-xs text-slate-400 font-mono pt-0.5 shrink-0">
              {formatTimestamp(entry.time)}
            </span>
            <p className={`text-sm ${isActive ? "text-slate-900 dark:text-white font-medium" : "text-slate-600 dark:text-slate-400"}`}>
              {entry.text[locale]}
            </p>
          </div>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 2: Create ContentTabs component**

Create `src/components/player/content-tabs.tsx`:

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, BookOpen } from "lucide-react";
import { TranscriptViewer } from "./transcript-viewer";
import type { Course, Locale, TranscriptEntry } from "@/lib/types";
import type { Dictionary } from "@/data/mock/dictionaries/en";

interface ContentTabsProps {
  course: Course;
  locale: Locale;
  dict: Dictionary;
  transcript: TranscriptEntry[];
  currentTime: number;
}

type Tab = "overview" | "transcript";

export function ContentTabs({
  course,
  locale,
  dict,
  transcript,
  currentTime,
}: ContentTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const tabs: { id: Tab; label: string }[] = [
    { id: "overview", label: dict.player.overview },
    { id: "transcript", label: dict.player.transcript },
  ];

  return (
    <div className="glass rounded-2xl overflow-hidden">
      {/* Tab headers */}
      <div className="flex border-b border-slate-200 dark:border-slate-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="relative flex-1 py-4 text-sm font-medium text-center transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            <span className={activeTab === tab.id ? "text-indigo-600 dark:text-indigo-400" : "text-slate-600 dark:text-slate-400"}>
              {tab.label}
            </span>
            {activeTab === tab.id && (
              <motion.div
                layoutId="tab-underline"
                className="absolute bottom-0 inset-x-0 h-0.5 bg-indigo-600 dark:bg-indigo-400"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          {activeTab === "overview" ? (
            <div className="p-6 space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-3">{course.title[locale]}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {course.description[locale]}
                </p>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
                  <User className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{dict.player.instructor}</div>
                  <div className="font-medium">{course.instructor}</div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  {dict.player.whatYouLearn}
                </h4>
                <ul className="space-y-2">
                  {course.modules.map((module, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                      <span className="text-indigo-500 mt-1">&#x2022;</span>
                      <span>{module.title[locale]}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <TranscriptViewer entries={transcript} locale={locale} currentTime={currentTime} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/player/content-tabs.tsx src/components/player/transcript-viewer.tsx
git commit -m "feat: add content tabs with overview and auto-scrolling transcript"
```

---

## Task 15: Video Player — Course Dashboard Page

**Files:**
- Create: `src/app/[locale]/course/[slug]/page.tsx`

- [ ] **Step 1: Create the course dashboard page**

Create `src/app/[locale]/course/[slug]/page.tsx`:

```tsx
"use client";

import { useState, useMemo, use } from "react";
import { notFound } from "next/navigation";
import { getCourseBySlug } from "@/data/mock/courses";
import { VideoPlayer } from "@/components/player/video-player";
import { CourseSidebar } from "@/components/player/course-sidebar";
import { ContentTabs } from "@/components/player/content-tabs";
import { PageTransition } from "@/components/shared/page-transition";
import type { Locale, Lesson } from "@/lib/types";
import type { Dictionary } from "@/data/mock/dictionaries/en";

// Client component needs to import dict synchronously for simplicity
import en from "@/data/mock/dictionaries/en";
import ar from "@/data/mock/dictionaries/ar";

const dicts: Record<string, Dictionary> = { en, ar };

export default function CoursePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = use(params);
  const course = getCourseBySlug(slug);
  const dict = dicts[locale] ?? dicts.en;

  if (!course) {
    notFound();
  }

  const allLessons = useMemo(
    () => course.modules.flatMap((m) => m.lessons),
    [course]
  );

  const [activeLessonId, setActiveLessonId] = useState(allLessons[0]?.id ?? "");
  const [currentTime, setCurrentTime] = useState(0);

  const activeLesson: Lesson | undefined = allLessons.find((l) => l.id === activeLessonId);

  if (!activeLesson) {
    notFound();
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-slate-950">
        <div className="max-w-[1600px] mx-auto">
          {/* Theater layout */}
          <div className="flex flex-col lg:flex-row">
            {/* Video area */}
            <div className="flex-1 p-4 lg:p-6">
              <VideoPlayer
                url={activeLesson.videoUrl}
                dict={dict}
                onProgress={(playedSeconds) => setCurrentTime(playedSeconds)}
              />

              {/* Tabs below video */}
              <div className="mt-6">
                <ContentTabs
                  course={course}
                  locale={locale as Locale}
                  dict={dict}
                  transcript={activeLesson.transcript}
                  currentTime={currentTime}
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:overflow-y-auto">
              <CourseSidebar
                course={course}
                locale={locale as Locale}
                dict={dict}
                activeLessonId={activeLessonId}
                onLessonSelect={(id) => {
                  setActiveLessonId(id);
                  setCurrentTime(0);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
```

- [ ] **Step 2: Verify the full flow**

```bash
npm run dev
```

Test manually:
1. Visit `http://localhost:3000` — should redirect to `/en`
2. Landing page: hero, features, carousel all render
3. Click a course card → navigates to `/en/course/<slug>`
4. Video player renders with controls
5. Sidebar shows modules and lessons
6. Click a different lesson → video URL changes
7. Tabs switch between Overview and Transcript
8. Navigate to `/en/catalog` — pricing cards and filterable grid
9. Toggle theme (dark/light)
10. Switch locale to Arabic — RTL layout, Arabic text
11. Test on narrow viewport — mobile nav drawer, responsive grids

- [ ] **Step 3: Commit**

```bash
git add src/app/\[locale\]/course/
git commit -m "feat: add course dashboard with theater layout, player, sidebar, and tabs"
```

---

## Task 16: Polish & Final Touches

**Files:**
- Modify: `src/app/globals.css` (if needed for scrollbar hide)
- Modify: `next.config.ts` (image domains if needed)

- [ ] **Step 1: Add scrollbar-hide utility to globals.css**

Append to `src/app/globals.css` inside the `@layer utilities` block:

```css
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
```

- [ ] **Step 2: Update next.config.ts for external images**

Update `next.config.ts` to allow placeholder images:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
};

export default nextConfig;
```

Note: Since we use `<img>` tags (not `next/image`) in CourseCard, this may not be strictly necessary, but it's good practice for future use.

- [ ] **Step 3: Run build to verify no errors**

```bash
npm run build
```

Expected: Build completes successfully with no type errors or build failures.

- [ ] **Step 4: Fix any build errors found in Step 3**

Address any TypeScript or build errors. Common issues:
- Missing `"use client"` directives on components using hooks/motion
- Import path mismatches
- Type mismatches between components

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "feat: polish — scrollbar hide utility, image config, build verification"
```

---

## Summary

| Task | Description | Files |
|------|-------------|-------|
| 1 | Project scaffolding | package.json, globals.css, shadcn setup |
| 2 | Types & mock data | types.ts, courses.ts, pricing.ts |
| 3 | i18n system | i18n.ts, en.ts, ar.ts |
| 4 | Layouts & providers | root layout, locale layout, theme provider, page transition |
| 5 | Navbar & shared | navbar, mobile nav, theme toggle, locale switcher, logo |
| 6 | Hero section | hero.tsx, landing page |
| 7 | Features grid | features-grid.tsx |
| 8 | Course carousel | course-card.tsx, course-carousel.tsx |
| 9 | Footer | footer.tsx, add to locale layout |
| 10 | Pricing section | pricing-card.tsx, pricing-section.tsx, catalog page |
| 11 | Filter pills & grid | filter-pills.tsx, course-grid.tsx |
| 12 | Video player & controls | video-player.tsx, control-bar.tsx |
| 13 | Course sidebar | course-sidebar.tsx |
| 14 | Content tabs | content-tabs.tsx, transcript-viewer.tsx |
| 15 | Course dashboard page | course/[slug]/page.tsx |
| 16 | Polish & build verify | globals.css, next.config.ts |
