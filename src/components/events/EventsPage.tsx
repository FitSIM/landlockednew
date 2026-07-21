"use client";

import Loader from "@/components/common/Loader";
import { images } from "@/lib/images";
import { usePosts } from "@/lib/hooks/useCms";
import EventsClient from "./EventsClient";

export default function EventsPage() {
  const { posts, loading } = usePosts("event");

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  const events = posts.map((e) => ({
    ...e,
    image: e.images?.[0]?.url || images.heroEvents,
    custom: (e.customFieldsData || {}) as Record<string, unknown>,
  }));

  return <EventsClient events={events} />;
}
