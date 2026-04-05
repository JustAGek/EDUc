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
