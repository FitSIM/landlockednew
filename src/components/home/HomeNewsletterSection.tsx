"use client";

import { useSlotPosts, fieldsOf } from "@/lib/hooks/useCms";
import { CMS_CATEGORIES, HOME_NEWSLETTER_TITLE } from "@/lib/cms-slots";

// Homepage newsletter block: the newsletter post in the home category
// (title = heading, content = description, custom field "benefits").
// The form itself is UI, not content.
export default function HomeNewsletterSection() {
  const { posts, loading } = useSlotPosts(CMS_CATEGORIES.home);

  if (loading) return null;

  const post = posts.find((p) => p.title === HOME_NEWSLETTER_TITLE);
  if (!post) return null;

  return (
    <div className="pencil-page">
      <div
        data-pencil-name="Newsletter"
        className="box-border w-full h-fit shrink-0 flex flex-col gap-[24px] p-[80px_160px] justify-start items-center bg-[#1E3A8A]"
      >
      <div
        data-pencil-name="Newsletter Card"
        className="box-border w-[720px] h-fit shrink-0 flex flex-col gap-[24px] p-[48px] justify-start items-center bg-[#FFFFFF15] rounded-[20px]"
      >
        <div
          data-pencil-name="Title"
          className="text-[32px]/[normal] box-border text-[#FFFFFF] font-['Space_Grotesk',system-ui,sans-serif] font-bold text-center [white-space:nowrap]"
        >
          {post.title}
        </div>
        <div
          data-pencil-name="Desc"
          className="text-[14px]/[normal] box-border w-[560px] text-[#DBEAFE] font-['Space_Grotesk',system-ui,sans-serif] font-normal text-center line-clamp-3"
          dangerouslySetInnerHTML={{ __html: post.content || "" }}
        />
        <div
          data-pencil-name="Form"
          className="box-border w-full h-fit shrink-0 flex flex-row gap-[12px] justify-start items-start"
        >
          <input
            data-pencil-name="Input"
            type="email"
            placeholder="И-мэйл хаяг"
            className="box-border [flex:1_1_0] h-[48px] bg-[#FFFFFF] rounded-[999px] px-6 text-[14px] text-[#111827] outline-none"
          />
          <button
            data-pencil-name="Submit"
            type="button"
            className="box-border w-[140px] shrink-0 h-[48px] flex flex-col gap-0 justify-center items-center bg-[#1E3A8A] rounded-[999px]"
          >
            <div
              data-pencil-name="Label"
              className="text-[14px]/[normal] box-border text-[#FFFFFF] font-['Space_Grotesk',system-ui,sans-serif] font-semibold text-left [white-space:nowrap]"
            >
              Бүртгүүлэх
            </div>
          </button>
        </div>
        <div
          data-pencil-name="Benefits"
          className="text-[13px]/[normal] box-border text-[#DBEAFE] font-['Space_Grotesk',system-ui,sans-serif] font-normal text-left [white-space:nowrap]"
        >
          {fieldsOf(post).benefits}
        </div>
      </div>
    </div>
    </div>
  );
}
