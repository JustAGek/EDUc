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
              <Accordion multiple defaultValue={course.modules.map((_, i) => `module-${i}`)}>
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
