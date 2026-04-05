"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { LocaleSwitcher } from "./locale-switcher";
import type { Locale } from "@/lib/types";
import type { Dictionary } from "@/data/mock/dictionaries/en";

export function MobileNav({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="md:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-accent hover:text-accent-foreground">
        <Menu className="h-5 w-5" />
      </SheetTrigger>
      <SheetContent side={locale === "ar" ? "right" : "left"} className="w-72">
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <div className="flex flex-col gap-6 mt-8">
          <Logo locale={locale} />
          <nav className="flex flex-col gap-4">
            <Link
              href={`/${locale}`}
              onClick={() => setOpen(false)}
              className="text-lg font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              {dict.nav.home}
            </Link>
            <Link
              href={`/${locale}/catalog`}
              onClick={() => setOpen(false)}
              className="text-lg font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              {dict.nav.catalog}
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LocaleSwitcher locale={locale} dict={dict} />
          </div>
          <div className="flex flex-col gap-2">
            <Button variant="outline">{dict.nav.login}</Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">{dict.nav.subscribe}</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
