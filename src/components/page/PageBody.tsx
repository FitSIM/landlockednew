"use client";

import { notFound } from "next/navigation";
import PageAnimator from "./PageAnimator";
import LuxuryHero from "@/components/luxury/LuxuryHero";
import LLDCHero from "@/components/luxury/LLDCHero";
import PriorityHero from "@/components/luxury/PriorityHero";
import Loader from "@/components/common/Loader";
import { getHeroImage } from "@/lib/images";
import { usePageContent, usePageName, useSectionHtml } from "@/lib/hooks/useCms";
import { CMS_CATEGORIES, PAGE_SECTION_SOURCE } from "@/lib/cms-slots";

const pageTitles: Record<string, { eyebrow?: string; body?: string }> = {
  "about-brief-history": {
    eyebrow: "Товч түүх",
    body: "Далайд гарцгүй хөгжиж буй орнуудын олон улсын судалгааны төвийн түүхэн замнал, үүсэл хөгжил, ололт амжилтууд.",
  },
  "about-executive-greeting": {
    eyebrow: "Мэндчилгээ",
  },
  "about-goals": {
    eyebrow: "Бид юуны төлөө ажилладаг вэ?",
  },
  "about-multilateral-agreement": {
    eyebrow: "Хамтын ажиллагааны хүрээ",
  },
  events: {
    eyebrow: "Арга хэмжээ",
    body: "Олон улсын судалгааны төвийн зохион байгуулж буй арга хэмжээ, хуралдаан, семинар, танилцуулга.",
  },
  support: {
    eyebrow: "Хамтрагчид",
  },
  "e-library": {
    eyebrow: "Мэдлэгийн сан",
  },
  photos: {
    eyebrow: "Галерей",
  },
  "partner-institutions": {
    eyebrow: "Түншлэл",
  },
  contact: {
    eyebrow: "Холбогдох",
    body: "Манай багтай холбогдох, хамтын ажиллагаа, судалгааны санал хүлээн авах.",
  },
  "site-map": {
    eyebrow: "Навигаци",
  },
};

function Body({ html, withHero }: { html: string; withHero: boolean }) {
  return (
    <div
      className={`pencil-page w-full ${withHero ? "pencil-page--with-injected-hero overflow-x-hidden" : ""}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default function PageBody({ slug }: { slug: string }) {
  // Ordered section posts (individually editable in erxes) are preferred;
  // the monolithic page content / static snapshot chain remains the fallback.
  const source = PAGE_SECTION_SOURCE[slug];
  const { html: sectionHtml, loading: sectionsLoading } = useSectionHtml(
    source
      ? { categoryId: CMS_CATEGORIES[source.categoryKey], titlePrefix: source.titlePrefix }
      : undefined,
  );
  const { html: pageHtml, loading: pageLoading } = usePageContent(slug);
  const pageName = usePageName(slug);

  const html = sectionHtml ?? pageHtml;
  const loading = sectionsLoading || (sectionHtml == null && pageLoading);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (!html) notFound();

  if (slug === "lldcs-vienna" || slug === "lldcs-awaza") {
    return (
      <>
        <PageAnimator />
        <LLDCHero active={slug === "lldcs-vienna" ? "vienna" : "awaza"} />
        <Body html={html} withHero />
      </>
    );
  }

  if (slug.startsWith("priority-")) {
    return (
      <>
        <PageAnimator />
        <PriorityHero slug={slug} />
        <Body html={html} withHero />
      </>
    );
  }

  // Title comes live from the CMS page name (usePageName falls back to the
  // static snapshot); eyebrow/body are decorative hero copy not stored in CMS.
  const meta = {
    title: pageName,
    eyebrow: pageTitles[slug]?.eyebrow,
    body: pageTitles[slug]?.body,
  };

  return (
    <>
      <PageAnimator />
      <LuxuryHero
        title={meta.title}
        eyebrow={meta.eyebrow}
        body={meta.body}
        image={getHeroImage(slug)}
        minHeight="70vh"
      />
      <Body html={html} withHero />
    </>
  );
}
