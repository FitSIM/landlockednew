"use client";

import { useSlotPosts, fieldsOf } from "@/lib/hooks/useCms";
import { CMS_CATEGORIES } from "@/lib/cms-slots";

// Homepage quote: the quote category's first post (content = quote text,
// custom field "attribution").
export default function HomeQuoteSection() {
  const { posts, loading } = useSlotPosts(CMS_CATEGORIES.quote);

  if (loading || posts.length === 0) return null;

  const post = posts[0];

  return (
    <div
      data-pencil-name="Quote"
      className="pencil-page box-border w-full h-fit shrink-0 flex flex-col gap-[16px] p-[80px_200px] justify-start items-center bg-[#1E3A8A]"
    >
      <div
        data-pencil-name="Quote Mark"
        className="text-[120px]/[normal] box-border opacity-[0.12] text-[#FFFFFF] font-['Space_Grotesk',system-ui,sans-serif] font-bold text-left [white-space:nowrap]"
      >
        “
      </div>
      <div
        data-pencil-name="Quote Text"
        className="text-[22px]/[35px] box-border w-[900px] text-[#FFFFFF] font-['Space_Grotesk',system-ui,sans-serif] font-normal text-center"
        dangerouslySetInnerHTML={{ __html: post.content || "" }}
      />
      <div
        data-pencil-name="Quote Attribution"
        className="text-[14px]/[normal] box-border text-[#DBEAFE] font-['Space_Grotesk',system-ui,sans-serif] font-normal text-left [white-space:nowrap]"
      >
        {fieldsOf(post).attribution}
      </div>
    </div>
  );
}
