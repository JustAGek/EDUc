"use client";

import { motion } from "framer-motion";
import { PricingCard } from "./pricing-card";
import type { PricingPlan, Locale } from "@/lib/types";
import type { Dictionary } from "@/data/mock/dictionaries/en";

export function PricingSection({
  plans,
  locale,
  dict,
}: {
  plans: PricingPlan[];
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <section className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-center mb-16"
        >
          {dict.catalog.pricing}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {plans.map((plan, index) => (
            <PricingCard
              key={plan.name.en}
              plan={plan}
              locale={locale}
              popularLabel={dict.catalog.mostPopular}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
