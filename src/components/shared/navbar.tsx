"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { LocaleSwitcher } from "./locale-switcher";
import { MobileNav } from "./mobile-nav";
import type { Locale } from "@/lib/types";
import type { Dictionary } from "@/data/mock/dictionaries/en";

export function Navbar({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY < 50) {
        setVisible(true);
      } else if (currentY > lastScrollY) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(currentY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="glass border-b border-slate-200/20 dark:border-slate-700/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Logo locale={locale} />
            <div className="hidden md:flex items-center gap-6">
              <Link
                href={`/${locale}`}
                className="text-sm font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                {dict.nav.home}
              </Link>
              <Link
                href={`/${locale}/catalog`}
                className="text-sm font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                {dict.nav.catalog}
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <LocaleSwitcher locale={locale} dict={dict} />
            <ThemeToggle />
            <Button variant="ghost" size="sm">{dict.nav.login}</Button>
            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">
              {dict.nav.subscribe}
            </Button>
          </div>

          <MobileNav locale={locale} dict={dict} />
        </div>
      </nav>
    </header>
  );
}
