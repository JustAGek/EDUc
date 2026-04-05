export interface Dictionary {
  nav: {
    home: string;
    catalog: string;
    login: string;
    subscribe: string;
  };
  hero: {
    headline: string;
    subtext: string;
    cta: string;
  };
  features: {
    title: string;
    items: { title: string; description: string }[];
  };
  carousel: {
    title: string;
    lessons: string;
  };
  footer: {
    brand: string;
    tagline: string;
    quickLinks: string;
    contact: string;
    instructor: string;
    supportEmail: string;
    rights: string;
  };
  catalog: {
    title: string;
    pricing: string;
    allCategories: string;
    allDifficulties: string;
    categories: {
      "web-dev": string;
      "data-science": string;
      design: string;
    };
    difficulties: {
      beginner: string;
      intermediate: string;
      advanced: string;
    };
    mostPopular: string;
    noCourses: string;
  };
  player: {
    modules: string;
    progress: string;
    overview: string;
    transcript: string;
    instructor: string;
    whatYouLearn: string;
    collapseMenu: string;
    expandMenu: string;
    speed: string;
  };
  theme: {
    light: string;
    dark: string;
  };
  locale: {
    switchTo: string;
  };
}

const en: Dictionary = {
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
};

export default en;
