"use client";

import Link from "next/link";
import { useSlotPosts } from "@/lib/hooks/useCms";
import { CMS_CATEGORIES } from "@/lib/cms-slots";

// Homepage "Бидний түүх" section: every post in the history category is a
// text block of the section (post title of the first = section title).
export default function HomeHistorySection() {
  const { posts, loading } = useSlotPosts(CMS_CATEGORIES.history);

  if (loading || posts.length === 0) return null;

  const [first, ...rest] = posts;

  return (
    <div
      data-pencil-name="History Section"
      className="pencil-page box-border w-full h-fit shrink-0 flex flex-col gap-[28px] p-[100px_160px] justify-start items-center bg-[#F5F5F5]"
    >
      <div
        data-pencil-name="History Title"
        className="text-[36px]/[normal] box-border text-[#111827] font-['Space_Grotesk',system-ui,sans-serif] font-bold text-left [white-space:nowrap]"
      >
        {first.title}
      </div>
      <div
        data-pencil-name="History Underline"
        className="box-border w-[60px] h-[4px] shrink-0 bg-[#1E3A8A] rounded-[2px]"
      />
      {[first, ...rest].map((post, i) => (
        <div
          key={post._id}
          data-pencil-name={`History P${i + 1}`}
          className="text-[15px]/[26px] box-border w-[800px] text-[#6B7280] font-['Space_Grotesk',system-ui,sans-serif] font-normal text-center"
          dangerouslySetInnerHTML={{ __html: post.content || "" }}
        />
      ))}
      <Link href="/about-brief-history" className="inline-block">
        <div
          data-pencil-name="History CTA"
          className="box-border w-fit h-[40px] shrink-0 flex flex-row gap-0 p-[0px_24px] justify-center items-center bg-[#1E3A8A] rounded-[999px]"
        >
          <div
            data-pencil-name="History CTA Label"
            className="text-[14px]/[normal] box-border text-[#FFFFFF] font-['Space_Grotesk',system-ui,sans-serif] font-semibold text-left [white-space:nowrap]"
          >
            Дэлгэрэнгүй
          </div>
        </div>
      </Link>
    </div>
  );
}
