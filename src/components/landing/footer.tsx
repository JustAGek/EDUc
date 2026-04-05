import Link from "next/link";
import { GraduationCap, Mail, User } from "lucide-react";
import { LocaleSwitcher } from "@/components/shared/locale-switcher";
import type { Locale } from "@/lib/types";
import type { Dictionary } from "@/data/mock/dictionaries/en";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 font-bold text-xl mb-4">
              <GraduationCap className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
              <span>{dict.footer.brand}</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-4">{dict.footer.tagline}</p>
            <LocaleSwitcher locale={locale} dict={dict} />
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{dict.footer.quickLinks}</h3>
            <nav className="flex flex-col gap-3">
              <Link
                href={`/${locale}`}
                className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                {dict.nav.home}
              </Link>
              <Link
                href={`/${locale}/catalog`}
                className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                {dict.nav.catalog}
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{dict.footer.contact}</h3>
            <div className="flex flex-col gap-3 text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{dict.footer.instructor}: Abdulrahman Mahmoud</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>{dict.footer.supportEmail}: boodyaly18@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500 dark:text-slate-500">
          &copy; {new Date().getFullYear()} {dict.footer.brand}. {dict.footer.rights}
        </div>
      </div>
    </footer>
  );
}
