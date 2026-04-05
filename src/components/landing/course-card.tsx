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
