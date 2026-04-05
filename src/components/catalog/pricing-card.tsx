"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { PricingPlan, Locale } from "@/lib/types";

export function PricingCard({
  plan,
  locale,
  popularLabel,
  index,
}: {
  plan: PricingPlan;
  locale: Locale;
  popularLabel: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative glass rounded-2xl p-8 flex flex-col ${
        plan.highlighted
          ? "ring-2 ring-indigo-500 scale-105 shadow-xl shadow-indigo-500/10"
          : ""
      }`}
    >
      {plan.highlighted && (
        <Badge className="absolute -top-3 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 bg-indigo-600 text-white border-0 px-4 py-1">
          {popularLabel}
        </Badge>
      )}

      <h3 className="text-xl font-bold mb-2">{plan.name[locale]}</h3>
      <div className="mb-6">
        <span className="text-4xl font-bold">{plan.price}</span>
        <span className="text-slate-500 dark:text-slate-400 ms-1">{plan.period[locale]}</span>
      </div>

      <ul className="flex-1 space-y-3 mb-8">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2">
            <Check className="h-5 w-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
            <span className="text-slate-600 dark:text-slate-400">{feature[locale]}</span>
          </li>
        ))}
      </ul>

      <Button
        className={`w-full ${
          plan.highlighted
            ? "bg-indigo-600 hover:bg-indigo-700 text-white"
            : ""
        }`}
        variant={plan.highlighted ? "default" : "outline"}
        size="lg"
      >
        {plan.cta[locale]}
      </Button>
    </motion.div>
  );
}
