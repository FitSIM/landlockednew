"use client";

import Link from "next/link";
import { useSlotPosts, fieldsOf } from "@/lib/hooks/useCms";
import { CMS_CATEGORIES } from "@/lib/cms-slots";
import type { Post } from "@/graphql/cms/queries";

const MAP_PIN_PATH =
  "M6.71973 0.60156q-0.81006 0.02734-1.56885 0.31446-0.75537 0.28711-1.41162 0.80664-0.19824 0.15381-0.48535 0.44775-0.28711 0.29395-0.44092 0.48877-0.42041 0.57422-0.67334 1.17578-0.24951 0.60156-0.34863 1.31592-0.04102 0.23926-0.03418 0.68017 0.00684 0.44092 0.03418 0.69385 0.14014 0.88184 0.56054 1.79102 0.50586 1.07666 1.44922 2.27637 0.94678 1.19629 2.19092 2.31738 0.22559 0.19482 0.32129 0.27343 0.09912 0.0752 0.19824 0.11622 0.22217 0.11279 0.48877 0.11279 0.2666 0 0.48877-0.11279 0.11279-0.04101 0.19482-0.10254 0.08545-0.06494 0.31104-0.25977 0.96387-0.86816 1.79101-1.83203 0.82715-0.96728 1.37403-1.86621 0.75537-1.27148 0.98437-2.42676 0.23242-1.15527-0.06152-2.29004-0.35205-1.35693-1.35693-2.36523-0.36572-0.37939-0.74512-0.64258-0.37598-0.2666-0.8374-0.46484-1.12109-0.51611-2.42334-0.44776z";

function stripHtml(html?: string) {
  return (html ?? "").replace(/<[^>]+>/g, "").trim();
}

function EventCard({ post }: { post: Post }) {
  const meta = fieldsOf(post);
  return (
    <div
      data-pencil-name={`Event Card ${post.title ?? ""}`}
      className="box-border [flex:1_1_0] [box-shadow:0px_8px_30px_0px_#1E3A8A14] flex flex-col gap-0 justify-start items-start bg-[#FFFFFF] rounded-[16px] h-full"
    >
      <div
        data-pencil-name="Photo"
        className="box-border w-full h-[120px] shrink-0 bg-gradient-to-br from-[#1E3A8A] to-[#0F2447] bg-cover bg-center bg-no-repeat rounded-[16px_16px_0px_0px]"
        style={post.images?.[0]?.url ? { backgroundImage: `url('${post.images[0].url}')` } : undefined}
      />
      <div
        data-pencil-name="Content"
        className="box-border w-full h-fit shrink-0 flex flex-col gap-[10px] p-[16px] justify-start items-start"
      >
        <div
          data-pencil-name="Date Badge"
          className="box-border w-fit h-fit shrink-0 flex flex-row gap-0 p-[6px_12px] justify-start items-start bg-[#1E3A8A] rounded-[999px]"
        >
          <div
            data-pencil-name="Date"
            className="text-[12px]/[normal] box-border text-[#FFFFFF] font-['Space_Grotesk',system-ui,sans-serif] font-bold text-left [white-space:nowrap]"
          >
            {meta.date}
          </div>
        </div>
        <div
          data-pencil-name="Title"
          className="text-[18px]/[23px] box-border w-full text-[#1E3A8A] font-['Space_Grotesk',system-ui,sans-serif] font-bold text-left"
        >
          {post.title}
        </div>
        <div
          data-pencil-name="Location"
          className="box-border w-fit h-fit shrink-0 flex flex-row gap-[6px] justify-start items-center"
        >
          <svg
            data-pencil-name="Icon"
            viewBox="0 0 14 14"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            className="box-border w-[14px] shrink-0 h-[14px]"
          >
            <path d={MAP_PIN_PATH} fill="#6B7280" />
          </svg>
          <div
            data-pencil-name="Text"
            className="text-[13px]/[normal] box-border text-[#6B7280] font-['Space_Grotesk',system-ui,sans-serif] font-normal text-left [white-space:nowrap]"
          >
            {meta.location}
          </div>
        </div>
        <div
          data-pencil-name="Desc"
          className="text-[13px]/[20px] box-border w-full text-[#6B7280] font-['Space_Grotesk',system-ui,sans-serif] font-normal text-left line-clamp-3"
        >
          {stripHtml(post.excerpt || post.content)}
        </div>
        <Link
          href="/en/youth-advisory"
          data-pencil-name="Link"
          className="text-[13px]/[normal] box-border text-[#1E3A8A] font-['Space_Grotesk',system-ui,sans-serif] font-semibold text-left [white-space:nowrap]"
        >
          Дэлгэрэнгүй →
        </Link>
      </div>
    </div>
  );
}

export default function HomeYouthSection({ headingHtml }: { headingHtml?: string }) {
  const { posts: allPosts, loading } = useSlotPosts(CMS_CATEGORIES.youthEvents);

  // v1 seed copies lost their custom fields; only posts with eventMeta count.
  const posts = allPosts.filter((p) => fieldsOf(p).date);

  if (loading || posts.length === 0) return null;

  const rows: Post[][] = [];
  for (let i = 0; i < posts.length; i += 4) rows.push(posts.slice(i, i + 4));

  return (
    <div
      data-pencil-name="Youth Section"
      className="pencil-page box-border w-full h-fit shrink-0 flex flex-col gap-[40px] p-[80px_160px] justify-start items-start bg-[#F5F5F5]"
    >
      {headingHtml ? (
        <div className="contents" dangerouslySetInnerHTML={{ __html: headingHtml }} />
      ) : null}
      {rows.map((row, i) => (
        <div
          key={i}
          data-pencil-name={`Events Grid ${i + 1}`}
          className="box-border w-full h-fit shrink-0 flex flex-row gap-[20px] justify-start items-stretch"
        >
          {row.map((post) => (
            <EventCard key={post._id} post={post} />
          ))}
        </div>
      ))}
    </div>
  );
}
