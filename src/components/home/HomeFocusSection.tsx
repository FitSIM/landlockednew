"use client";

import { useSlotPosts } from "@/lib/hooks/useCms";
import { CMS_CATEGORIES } from "@/lib/cms-slots";
import type { Post } from "@/graphql/cms/queries";

function FeatureCard({ post, index }: { post: Post; index: number }) {
  return (
    <div
      data-pencil-name={`Feature Card ${index + 1}`}
      className="box-border [flex:1_1_0] flex flex-col gap-[12px] p-[24px] justify-start items-start bg-[#FFFFFF] rounded-[16px] min-h-[260px] h-full"
    >
      <div
        data-pencil-name="Top Accent"
        className="box-border w-full h-[4px] shrink-0 bg-[#1E3A8A] rounded-[2px]"
      />
      <div
        data-pencil-name="Icon Wrap"
        className="box-border w-[48px] h-[48px] shrink-0 flex flex-row gap-0 justify-center items-center bg-[#EFF6FF] rounded-[12px]"
      >
        <div
          data-pencil-name="Icon"
          className="box-border w-[24px] shrink-0 h-[24px] flex flex-row gap-0 justify-start items-start bg-[#1E3A8A] rounded-[4px]"
        />
      </div>
      <div
        data-pencil-name="Card Title"
        className="text-[18px]/[normal] box-border text-[#1E3A8A] font-['Space_Grotesk',system-ui,sans-serif] font-bold text-left [white-space:nowrap]"
      >
        {post.title}
      </div>
      <div
        data-pencil-name="Card Body"
        className="text-[14px]/[22px] box-border w-full text-[#6B7280] font-['Space_Grotesk',system-ui,sans-serif] font-normal text-left"
        dangerouslySetInnerHTML={{ __html: post.content || "" }}
      />
    </div>
  );
}

// Homepage focus-area cards: one post per card in the focus-areas category.
export default function HomeFocusSection() {
  const { posts, loading } = useSlotPosts(CMS_CATEGORIES.focusAreas);

  if (loading || posts.length === 0) return null;

  return (
    <div
      data-pencil-name="Feature Cards"
      className="pencil-page box-border w-full h-fit shrink-0 flex flex-row gap-[20px] p-[16px_0px_0px_0px] justify-start items-stretch bg-[#F5F5F5]"
    >
      {posts.map((post, i) => (
        <FeatureCard key={post._id} post={post} index={i} />
      ))}
    </div>
  );
}
