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
