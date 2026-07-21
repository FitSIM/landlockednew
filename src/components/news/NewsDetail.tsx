"use client";

import { notFound } from "next/navigation";
import Loader from "@/components/common/Loader";
import { usePost, usePosts } from "@/lib/hooks/useCms";
import NewsDetailPage from "./NewsDetailPage";

export default function NewsDetail({ slug }: { slug: string }) {
  const { post, loading } = usePost(slug, "news");
  const { posts: allNews, loading: listLoading } = usePosts("news");

  if (loading || listLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (!post) notFound();

  const otherPosts = allNews.filter((p) => p.slug !== slug);

  return <NewsDetailPage post={post} otherPosts={otherPosts} />;
}
