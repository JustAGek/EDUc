import { Inter, Cairo } from "next/font/google";
import { notFound } from "next/navigation";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/landing/footer";
import { isValidLocale, getDictionary, getDirection } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cairo = Cairo({ subsets: ["arabic"], variable: "--font-cairo" });

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dict = await getDictionary(locale as Locale);
  const dir = getDirection(locale as Locale);

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body className={`${inter.variable} ${cairo.variable} font-sans antialiased`}>
        <ThemeProvider>
          <Navbar locale={locale as Locale} dict={dict} />
          <main className="pt-16">{children}</main>
          <Footer locale={locale as Locale} dict={dict} />
        </ThemeProvider>
      </body>
    </html>
  );
}
