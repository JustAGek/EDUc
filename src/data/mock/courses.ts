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
