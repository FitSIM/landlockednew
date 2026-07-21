"use client";

import HomeHero from "@/components/home/HomeHero";
import HomeHistorySection from "@/components/home/HomeHistorySection";
import HomeFocusSection from "@/components/home/HomeFocusSection";
import HomeNewsSection from "@/components/home/HomeNewsSection";
import HomeQuoteSection from "@/components/home/HomeQuoteSection";
import HomeYouthSection from "@/components/home/HomeYouthSection";
import HomeNewsletterSection from "@/components/home/HomeNewsletterSection";
import PageAnimator from "@/components/page/PageAnimator";
import Loader from "@/components/common/Loader";
import { usePageContent, useSlotPosts } from "@/lib/hooks/useCms";
import { CMS_CATEGORIES } from "@/lib/cms-slots";

export default function HomeClient() {
  // Homepage = composition of CMS section slots. Every section reads its own
  // category; the monolithic "home" page content / static snapshot remains
  // the fallback only when the slot mechanism has no posts at all.
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

  const newsHeading = sections.find((p) =>
    p.title?.includes("Мэдээний толгой"),
  )?.content;
  const youthHeading = sections.find((p) =>
    p.title?.includes("Залуучуудын толгой"),
  )?.content;

  return (
    <>
      <PageAnimator />
      <HomeHero />
      <div className="bg-[#F5F5F5]">
        <HomeHistorySection />
        <HomeFocusSection />
      </div>
      <HomeNewsSection headingHtml={newsHeading} />
      <HomeQuoteSection />
      <HomeYouthSection headingHtml={youthHeading} />
      <HomeNewsletterSection />
    </>
  );
}
