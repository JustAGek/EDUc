"use client";

import { useRef, useEffect } from "react";
import type { TranscriptEntry, Locale } from "@/lib/types";

interface TranscriptViewerProps {
  entries: TranscriptEntry[];
  locale: Locale;
  currentTime: number;
}

function formatTimestamp(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function TranscriptViewer({ entries, locale, currentTime }: TranscriptViewerProps) {
  const activeRef = useRef<HTMLDivElement>(null);

  const activeIndex = entries.reduce((acc, entry, i) => {
    if (entry.time <= currentTime) return i;
    return acc;
  }, 0);

  useEffect(() => {
    activeRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [activeIndex]);

  return (
    <div className="max-h-80 overflow-y-auto space-y-3 p-4">
      {entries.map((entry, index) => {
        const isActive = index === activeIndex;
        return (
          <div
            key={index}
            ref={isActive ? activeRef : undefined}
            className={`flex gap-3 p-3 rounded-lg transition-colors ${
              isActive
                ? "bg-indigo-50 dark:bg-indigo-900/20 border-s-2 border-indigo-500"
                : ""
            }`}
          >
            <span className="text-xs text-slate-400 font-mono pt-0.5 shrink-0">
              {formatTimestamp(entry.time)}
            </span>
            <p className={`text-sm ${isActive ? "text-slate-900 dark:text-white font-medium" : "text-slate-600 dark:text-slate-400"}`}>
              {entry.text[locale]}
            </p>
          </div>
        );
      })}
    </div>
  );
}
