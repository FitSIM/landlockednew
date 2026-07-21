"use client";

import { notFound } from "next/navigation";
import Loader from "@/components/common/Loader";
import { usePost, usePosts } from "@/lib/hooks/useCms";
import EventDetailClient from "./EventDetailClient";

export default function EventDetailPage({ slug }: { slug: string }) {
  const { post: event, loading } = usePost(slug, "event");
  const { posts: allEvents, loading: listLoading } = usePosts("event");

  if (loading || listLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (!event) notFound();

  return <EventDetailClient event={event} allEvents={allEvents} />;
}
