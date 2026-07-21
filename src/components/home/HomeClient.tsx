"use client";

import HomeHero from "@/components/home/HomeHero";
import HomeNewsSection from "@/components/home/HomeNewsSection";
import HomeYouthSection from "@/components/home/HomeYouthSection";
import PageAnimator from "@/components/page/PageAnimator";
import Loader from "@/components/common/Loader";
import { usePageContent, useSlotPosts } from "@/lib/hooks/useCms";
import { CMS_CATEGORIES } from "@/lib/cms-slots";

function SectionBlob({ html }: { html: string }) {
  return (
    <div
      className="pencil-page w-full"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default function HomeClient() {
  // Homepage = composition of CMS section slots. The monolithic "home" page
  // content / static snapshot remains the fallback when the slot is empty.
  const { posts: sections, loading: sectionsLoading } = useSlotPosts(
    CMS_CATEGORIES.sectionHome,
  );
  const { html: fallbackHtml, loading: fallbackLoading } = usePageContent("home");

  if (sectionsLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (sections.length === 0) {
    return (
      <>
        <PageAnimator />
        <HomeHero />
        {fallbackLoading ? (
          <div className="flex min-h-[40vh] items-center justify-center">
            <Loader size="lg" />
          </div>
        ) : fallbackHtml ? (
          <div
            className="pencil-page w-full"
            dangerouslySetInnerHTML={{ __html: fallbackHtml }}
          />
        ) : null}
      </>
    );
  }

  // Section posts are identified by their title (seeded as "Нүүр — <name>").
  const byTitle = (needle: string) =>
    sections.find((p) => p.title?.includes(needle))?.content;

  return (
    <>
      <PageAnimator />
      <HomeHero />
      {byTitle("History Section") ? <SectionBlob html={byTitle("History Section")!} /> : null}
      <HomeNewsSection headingHtml={byTitle("Мэдээний толгой")} />
      {byTitle("Quote") ? <SectionBlob html={byTitle("Quote")!} /> : null}
      <HomeYouthSection headingHtml={byTitle("Залуучуудын толгой")} />
      {byTitle("Newsletter") ? <SectionBlob html={byTitle("Newsletter")!} /> : null}
    </>
  );
}
