import { notFound } from "next/navigation";
import PageBody from "@/components/page/PageBody";
import ReportsPage from "@/components/reports/ReportsPage";
import ResearchPage from "@/components/research/ResearchPage";
import ContactPage from "@/components/contact/ContactPage";
import EventsPage from "@/components/events/EventsPage";
import PhotosPage from "@/components/photos/PhotosPage";
import SiteMapPage from "@/components/sitemap/SiteMapPage";
import YouthAdvisoryPage from "@/components/youth/YouthAdvisoryPage";
import NewsDetail from "@/components/news/NewsDetail";
import NewsListPage from "@/components/news/NewsListPage";
import EventDetailPage from "@/components/events/EventDetailPage";
import siteConfig from "@/../site.config.json";

export const dynamic = "force-static";

const hardcodedPages: Record<string, () => React.ReactElement> = {
  reports: () => <ReportsPage />,
  research: () => <ResearchPage />,
  contact: () => <ContactPage />,
  events: () => <EventsPage />,
  photos: () => <PhotosPage />,
  "youth-advisory": () => <YouthAdvisoryPage />,
  "site-map": () => <SiteMapPage />,
  news: () => <NewsListPage />,
};

export function generateStaticParams() {
  const params: { locale: string; slug: string[] }[] = [];
  const locale = "en";
  for (const page of siteConfig.pages) {
    if (page === "home") continue;
    params.push({ locale, slug: [page] });
  }
  return params;
}

export default async function CatchAllPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}) {
  const { slug } = await params;
  const slugPath = slug.join("/");

  if (!siteConfig.pages.includes(slugPath)) {
    notFound();
  }

  const hardcoded = hardcodedPages[slugPath];
  if (hardcoded) return hardcoded();

  if (slugPath.startsWith("event-")) {
    return <EventDetailPage slug={slugPath} />;
  }

  if (slugPath.startsWith("news-")) {
    return <NewsDetail slug={slugPath} />;
  }

  // PageBody loads the content client-side and 404s itself if neither the
  // CMS nor the static snapshot has this slug.
  return <PageBody slug={slugPath} />;
}
