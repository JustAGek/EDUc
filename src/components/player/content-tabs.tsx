"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, BookOpen } from "lucide-react";
import { TranscriptViewer } from "./transcript-viewer";
import type { Course, Locale, TranscriptEntry } from "@/lib/types";
import type { Dictionary } from "@/data/mock/dictionaries/en";

interface ContentTabsProps {
  course: Course;
  locale: Locale;
  dict: Dictionary;
  transcript: TranscriptEntry[];
  currentTime: number;
}

type Tab = "overview" | "transcript";

export function ContentTabs({
  course,
  locale,
  dict,
  transcript,
  currentTime,
}: ContentTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const tabs: { id: Tab; label: string }[] = [
    { id: "overview", label: dict.player.overview },
    { id: "transcript", label: dict.player.transcript },
  ];

  return (
    <div className="glass rounded-2xl overflow-hidden">
      {/* Tab headers */}
      <div className="flex border-b border-slate-200 dark:border-slate-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="relative flex-1 py-4 text-sm font-medium text-center transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            <span className={activeTab === tab.id ? "text-indigo-600 dark:text-indigo-400" : "text-slate-600 dark:text-slate-400"}>
              {tab.label}
            </span>
            {activeTab === tab.id && (
              <motion.div
                layoutId="tab-underline"
                className="absolute bottom-0 inset-x-0 h-0.5 bg-indigo-600 dark:bg-indigo-400"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          {activeTab === "overview" ? (
            <div className="p-6 space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-3">{course.title[locale]}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {course.description[locale]}
                </p>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
                  <User className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{dict.player.instructor}</div>
                  <div className="font-medium">{course.instructor}</div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  {dict.player.whatYouLearn}
                </h4>
                <ul className="space-y-2">
                  {course.modules.map((module, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                      <span className="text-indigo-500 mt-1">&#x2022;</span>
                      <span>{module.title[locale]}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <TranscriptViewer entries={transcript} locale={locale} currentTime={currentTime} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
