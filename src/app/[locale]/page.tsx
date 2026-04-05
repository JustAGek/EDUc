import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/types";
import { PageTransition } from "@/components/shared/page-transition";
import { Hero } from "@/components/landing/hero";
import { FeaturesGrid } from "@/components/landing/features-grid";
import { CourseCarousel } from "@/components/landing/course-carousel";
import { courses } from "@/data/mock/courses";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <PageTransition>
      <Hero locale={locale as Locale} dict={dict} />
      <FeaturesGrid dict={dict} />
      <CourseCarousel courses={courses} locale={locale as Locale} dict={dict} />
    </PageTransition>
  );
}
