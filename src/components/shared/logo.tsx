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
