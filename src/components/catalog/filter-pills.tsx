"use client";

import { motion } from "framer-motion";
import type { Category, Difficulty } from "@/lib/types";
import type { Dictionary } from "@/data/mock/dictionaries/en";

interface FilterPillsProps {
  dict: Dictionary;
  selectedCategory: Category | null;
  selectedDifficulty: Difficulty | null;
  onCategoryChange: (category: Category | null) => void;
  onDifficultyChange: (difficulty: Difficulty | null) => void;
}

const categories: (Category | null)[] = [null, "web-dev", "data-science", "design"];
const difficulties: (Difficulty | null)[] = [null, "beginner", "intermediate", "advanced"];

export function FilterPills({
  dict,
  selectedCategory,
  selectedDifficulty,
  onCategoryChange,
  onDifficultyChange,
}: FilterPillsProps) {
  return (
    <div className="space-y-4">
      {/* Category pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          const label = cat ? dict.catalog.categories[cat] : dict.catalog.allCategories;
          return (
            <button
              key={cat ?? "all-cat"}
              onClick={() => onCategoryChange(cat)}
              className="relative px-4 py-2 rounded-full text-sm font-medium transition-colors"
            >
              {isActive && (
                <motion.div
                  layoutId="category-pill"
                  className="absolute inset-0 bg-indigo-600 rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span
                className={`relative z-10 ${
                  isActive ? "text-white" : "text-slate-600 dark:text-slate-400"
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Difficulty pills */}
      <div className="flex flex-wrap gap-2">
        {difficulties.map((diff) => {
          const isActive = selectedDifficulty === diff;
          const label = diff ? dict.catalog.difficulties[diff] : dict.catalog.allDifficulties;
          return (
            <button
              key={diff ?? "all-diff"}
              onClick={() => onDifficultyChange(diff)}
              className="relative px-4 py-2 rounded-full text-sm font-medium transition-colors"
            >
              {isActive && (
                <motion.div
                  layoutId="difficulty-pill"
                  className="absolute inset-0 bg-indigo-600 rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span
                className={`relative z-10 ${
                  isActive ? "text-white" : "text-slate-600 dark:text-slate-400"
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
