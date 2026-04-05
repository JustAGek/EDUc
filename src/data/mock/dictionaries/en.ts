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
    switchTo: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629",
  },
} as const;

export type Dictionary = typeof en;
export default en;
