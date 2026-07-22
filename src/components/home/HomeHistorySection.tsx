"use client";

import Link from "next/link";
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

// Homepage "Бидний түүх" + focus cards: posts in the history category are
// the section's text blocks, posts in focus-areas are the cards. Rendered
// inside the original single History Section wrapper.
export default function HomeHistorySection() {
  const { posts: historyPosts, loading: historyLoading } = useSlotPosts(
    CMS_CATEGORIES.history,
  );
  const { posts: focusPosts, loading: focusLoading } = useSlotPosts(
    CMS_CATEGORIES.focusAreas,
  );

  if (historyLoading || focusLoading) return null;
  if (historyPosts.length === 0 && focusPosts.length === 0) return null;

  const [first, ...rest] = historyPosts;

  return (
    <div className="pencil-page">
      <div
        data-pencil-name="History Section"
        className="box-border w-full h-fit shrink-0 flex flex-col gap-[28px] p-[100px_160px] justify-start items-center bg-[#F5F5F5]"
      >
        {first ? (
          <>
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
          </>
        ) : null}

        {focusPosts.length > 0 ? (
          <div
            data-pencil-name="Feature Cards"
            className="box-border w-full h-fit shrink-0 flex flex-row gap-[20px] p-[16px_0px_0px_0px] justify-start items-stretch"
          >
            {focusPosts.map((post, i) => (
              <FeatureCard key={post._id} post={post} index={i} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
