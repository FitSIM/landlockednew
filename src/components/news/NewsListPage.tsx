"use client";

import Loader from "@/components/common/Loader";
import { images } from "@/lib/images";
import { usePosts } from "@/lib/hooks/useCms";
import NewsListClient from "./NewsListClient";

export default function NewsListPage() {
  const { posts, loading } = usePosts("news");

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  const withImages = posts.map((p) => ({
    ...p,
    images: p.images?.length
      ? p.images
      : [{ url: images.heroHome, type: "image", name: p.title || "", size: 0 }],
  }));

  return <NewsListClient posts={withImages} />;
}
