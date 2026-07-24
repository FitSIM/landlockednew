"use client";

import Link from "next/link";
import { usePosts, useSlotPosts, contentBlocks, summaryOf } from "@/lib/hooks/useCms";
import { CMS_CATEGORIES, HOME_NEWS_HEADING_TITLE } from "@/lib/cms-slots";
import type { Post } from "@/graphql/cms/queries";

function formatDate(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

function SmallCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/en/${post.slug}`}
      data-pencil-name="News Card"
      className="box-border [flex:1_1_0] [box-shadow:0px_2px_8px_0px_#00000008] flex flex-col gap-[10px] p-[16px] justify-start items-start bg-[#FFFFFF] rounded-[16px] h-full overflow-hidden cursor-pointer transition-shadow hover:shadow-[0_8px_30px_rgba(15,36,71,0.12)]"
    >
      <div
        data-pencil-name="News Thumb"
        className="box-border w-full h-[120px] shrink-0 bg-gradient-to-br from-[#1E3A8A] to-[#0F2447] bg-cover bg-center bg-no-repeat rounded-[12px]"
        style={post.images?.[0]?.url ? { backgroundImage: `url('${post.images[0].url}')` } : undefined}
      />
      <div
        data-pencil-name="News Tag"
        className="box-border w-fit h-[20px] shrink-0 flex flex-row gap-0 p-[3px_10px] justify-center items-center bg-[#1E3A8A] rounded-[10px]"
      >
        <div
          data-pencil-name="News Tag Label"
          className="text-[10px]/[normal] box-border text-[#FFFFFF] font-['Space_Grotesk',system-ui,sans-serif] font-semibold text-left [white-space:nowrap]"
        >
          Мэдээ
        </div>
      </div>
      <div
        data-pencil-name="News Card Title"
        className="text-[14px]/[normal] box-border w-full text-[#111827] font-['Space_Grotesk',system-ui,sans-serif] font-semibold text-left"
      >
        {post.title}
      </div>
      <div
        data-pencil-name="News Date"
        className="text-[12px]/[normal] box-border text-[#6B7280] font-['Space_Grotesk',system-ui,sans-serif] font-normal text-left [white-space:nowrap]"
      >
        {formatDate(post.publishedDate ?? post.createdAt)}
      </div>
      <div
        data-pencil-name="News Link"
        className="text-[12px]/[normal] box-border text-[#1E3A8A] font-['Space_Grotesk',system-ui,sans-serif] font-semibold text-left [white-space:nowrap] mt-auto"
      >
        Дэлгэрэнгүй →
      </div>
    </Link>
  );
}

export default function HomeNewsSection() {
  const { posts, loading } = usePosts("news");
  const { posts: homePosts } = useSlotPosts(CMS_CATEGORIES.home);
  // Heading text is the heading post's Content (simple paragraphs).
  const headingPost = homePosts.find(
    (p) => p.title === HOME_NEWS_HEADING_TITLE,
  );
  const heading = contentBlocks(headingPost?.content);

  if (loading || posts.length === 0) return null;

  const [featured, ...rest] = posts;
  const small = rest.slice(0, 4);

  return (
    <div className="pencil-page">
      <div
        data-pencil-name="News Section"
        className="box-border w-full h-fit shrink-0 flex flex-col gap-[32px] p-[80px_160px] justify-start items-center bg-[#FFFFFF]"
      >
      <div
        data-pencil-name="News Title"
        className="text-[36px]/[normal] box-border text-[#111827] font-['Space_Grotesk',system-ui,sans-serif] font-bold text-left [white-space:nowrap]"
      >
        {heading[0] || "Онцлох мэдээ"}
      </div>
      <div
        data-pencil-name="News Underline"
        className="box-border w-[60px] h-[4px] shrink-0 bg-[#1E3A8A] rounded-[2px]"
      />
      <Link
        href="/en/news"
        data-pencil-name="News Subtitle"
        className="box-border w-fit h-[40px] shrink-0 flex flex-row gap-0 p-[0px_24px] justify-center items-center bg-[#1E3A8A] rounded-[999px] text-[14px]/[normal] text-[#FFFFFF] font-['Space_Grotesk',system-ui,sans-serif] font-semibold text-left [white-space:nowrap] transition-colors hover:bg-[#0F2447]"
      >
        {heading[1] || "Бүх мэдээ"}
      </Link>

      <Link
        href={`/en/${featured.slug}`}
        data-pencil-name="Featured Wrap"
        className="box-border w-full h-fit shrink-0 [box-shadow:0px_2px_8px_0px_#00000008] flex flex-row gap-0 justify-start items-start bg-[#FFFFFF] rounded-[16px] cursor-pointer transition-shadow hover:shadow-[0_8px_30px_rgba(15,36,71,0.12)]"
      >
        <div
          data-pencil-name="Featured Image"
          className="box-border w-[520px] shrink-0 bg-gradient-to-br from-[#1E3A8A] to-[#0F2447] bg-cover bg-center bg-no-repeat rounded-[16px_0px_0px_16px] h-auto min-h-[280px]"
          style={featured.images?.[0]?.url ? { backgroundImage: `url('${featured.images[0].url}')` } : undefined}
        />
        <div
          data-pencil-name="Featured Text"
          className="box-border [flex:1_1_0] flex flex-col gap-[12px] p-[32px] justify-start items-start h-auto"
        >
          <div
            data-pencil-name="News Tag"
            className="box-border w-fit h-[24px] shrink-0 flex flex-row gap-0 p-[4px_12px] justify-center items-center bg-[#1E3A8A] rounded-[12px]"
          >
            <div
              data-pencil-name="News Tag Label"
              className="text-[12px]/[normal] box-border text-[#FFFFFF] font-['Space_Grotesk',system-ui,sans-serif] font-semibold text-left [white-space:nowrap]"
            >
              Мэдээ
            </div>
          </div>
          <div
            data-pencil-name="Featured Title"
            className="text-[22px]/[normal] box-border w-full text-[#111827] font-['Space_Grotesk',system-ui,sans-serif] font-bold text-left"
          >
            {featured.title}
          </div>
          <div
            data-pencil-name="Featured Body"
            className="text-[14px]/[22px] box-border w-full text-[#6B7280] font-['Space_Grotesk',system-ui,sans-serif] font-normal text-left"
          >
            {summaryOf(featured, 220)}
          </div>
          <div
            data-pencil-name="Featured Link"
            className="text-[13px]/[normal] box-border text-[#1E3A8A] font-['Space_Grotesk',system-ui,sans-serif] font-semibold text-left [white-space:nowrap]"
          >
            Дэлгэрэнгүй →
          </div>
        </div>
      </Link>

      <div
        data-pencil-name="Small News Cards"
        className="box-border w-full h-fit shrink-0 flex flex-row gap-[20px] justify-start items-stretch"
      >
        {small.map((post) => (
          <SmallCard key={post._id} post={post} />
        ))}
      </div>
    </div>
    </div>
  );
}
