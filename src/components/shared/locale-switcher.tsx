"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";
import type { Locale } from "@/lib/types";
import type { Dictionary } from "@/data/mock/dictionaries/en";

export function LocaleSwitcher({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = () => {
    const newLocale = locale === "en" ? "ar" : "en";
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <Button variant="ghost" size="sm" onClick={switchLocale} className="gap-1.5">
      <Languages className="h-4 w-4" />
      <span>{dict.locale.switchTo}</span>
    </Button>
  );
}
