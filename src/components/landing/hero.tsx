"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/types";
import type { Dictionary } from "@/data/mock/dictionaries/en";

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center gradient-hero overflow-hidden">
      {/* Decorative blurred circles */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
        >
          {dict.hero.headline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="mt-6 text-lg sm:text-xl text-indigo-100 max-w-2xl mx-auto"
        >
          {dict.hero.subtext}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="mt-10"
        >
          <Link href={`/${locale}/catalog`}>
            <Button
              size="lg"
              className="bg-white text-indigo-700 hover:bg-indigo-50 font-semibold text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all group"
            >
              {dict.hero.cta}
              <ArrowRight className="ms-2 h-5 w-5 group-hover:translate-x-1 transition-transform rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
