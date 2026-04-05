"use client";

import { motion } from "framer-motion";
import { BookOpen, Award, Clock } from "lucide-react";
import type { Dictionary } from "@/data/mock/dictionaries/en";

const icons = [BookOpen, Award, Clock];

export function FeaturesGrid({ dict }: { dict: Dictionary }) {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-center mb-16"
        >
          {dict.features.title}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {dict.features.items.map((item, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass rounded-2xl p-8 text-center hover:shadow-lg transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 mb-6">
                  <Icon className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
