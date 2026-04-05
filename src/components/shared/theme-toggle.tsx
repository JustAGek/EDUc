"use client";

import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/components/shared/theme-provider";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative"
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {theme === "light" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </motion.div>
    </Button>
  );
}
