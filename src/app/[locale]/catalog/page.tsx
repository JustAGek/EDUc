import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/types";
import { PageTransition } from "@/components/shared/page-transition";
import { PricingSection } from "@/components/catalog/pricing-section";
import { CourseGrid } from "@/components/catalog/course-grid";
import { pricingPlans } from "@/data/mock/pricing";
import { courses } from "@/data/mock/courses";

export default async function CatalogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <PageTransition>
      <div className="pt-8">
        <PricingSection plans={pricingPlans} locale={locale as Locale} dict={dict} />
        <CourseGrid courses={courses} locale={locale as Locale} dict={dict} />
      </div>
    </PageTransition>
  );
}
