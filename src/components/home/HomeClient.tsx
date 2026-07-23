"use client";

import HomeHero from "@/components/home/HomeHero";
import HomeHistorySection from "@/components/home/HomeHistorySection";
import HomeNewsSection from "@/components/home/HomeNewsSection";
import HomeQuoteSection from "@/components/home/HomeQuoteSection";
import HomeYouthSection from "@/components/home/HomeYouthSection";
import HomeNewsletterSection from "@/components/home/HomeNewsletterSection";
import PageAnimator from "@/components/page/PageAnimator";
import Loader from "@/components/common/Loader";
import { usePageContent, useSlotPosts } from "@/lib/hooks/useCms";
import { CMS_CATEGORIES } from "@/lib/cms-slots";

export default function HomeClient() {
  // Homepage = composition of CMS section slots. Every section reads its
  // posts from the "Нүүр" category; the monolithic "home" page content /
  // static snapshot remains the fallback only when the category is empty.
  const { posts: homePosts, loading: homeLoading } = useSlotPosts(
    CMS_CATEGORIES.home,
  );
  const { html: fallbackHtml, loading: fallbackLoading } = usePageContent("home");

  if (homeLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (homePosts.length === 0) {
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

  return (
    <>
      <PageAnimator />
      <HomeHero />
      <HomeHistorySection />
      <HomeNewsSection />
      <HomeQuoteSection />
      <HomeYouthSection />
      <HomeNewsletterSection />
    </>
  );
}
