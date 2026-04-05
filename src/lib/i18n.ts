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
