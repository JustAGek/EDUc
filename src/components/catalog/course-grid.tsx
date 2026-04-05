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
