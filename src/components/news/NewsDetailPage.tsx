"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import LuxuryHero from "@/components/luxury/LuxuryHero";
import { AnimatedText, MagneticButton } from "@/components/motion/animations";
import { summaryOf } from "@/lib/hooks/useCms";
import type { Post } from "@/graphql/cms/queries";

function NewsCard({ news, idx = 0 }: { news: Post; idx?: number }) {
  const image = news.images?.[0]?.url || "/images/luxury/hero-home.jpg";
  const custom = (news.customFieldsData || {}) as Record<string, unknown>;
  const tag = String(custom.tag || "Мэдээ");
  const date = String(custom.date || "");
  return (
    <Link href={`/en/${news.slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: idx * 0.1 }}
        className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(15,36,71,0.08)] transition-all hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(15,36,71,0.12)]"
      >
        <div className="relative h-44 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: `url('${image}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F2447]/60 to-transparent" />
          <div className="absolute left-4 top-4 w-fit rounded-full bg-[#1E3A8A] px-3 py-1 text-xs font-semibold text-white">
            {tag}
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="text-xs font-semibold text-[#06B6D4]">{date}</div>
          <div className="text-lg font-bold text-[#0F2447] transition-colors group-hover:text-[#1E3A8A]">
            {news.title}
          </div>
          <div className="text-sm leading-relaxed text-[#6B7280] line-clamp-3">{summaryOf(news, 180)}</div>
          <div className="mt-auto pt-2 text-sm font-semibold text-[#1E3A8A]">Дэлгэрэнгүй →</div>
        </div>
      </motion.div>
    </Link>
  );
}

export default function NewsDetailPage({ post, otherPosts }: { post: Post; otherPosts: Post[] }) {
  const [showOthers, setShowOthers] = useState(false);
  const image = post.images?.[0]?.url || "/images/luxury/hero-home.jpg";
  const custom = (post.customFieldsData || {}) as Record<string, unknown>;
  const tag = String(custom.tag || "Мэдээ");
  const date = String(custom.date || "");

  return (
    <div className="w-full">
      <LuxuryHero title={post.title || ""} eyebrow={tag} image={image} minHeight="36vh" />

      <div className="luxury-section">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-[1fr_340px]">
          <motion.article
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-[#1E3A8A] px-3 py-1 text-xs font-semibold text-white">
                {tag}
              </span>
              <span className="text-sm text-[#6B7280]">{date}</span>
            </div>

            <AnimatedText className="text-2xl font-bold text-[#0F2447] md:text-3xl lg:text-4xl">
              {post.title}
            </AnimatedText>

            <div className="relative h-[300px] w-full overflow-hidden rounded-2xl lg:h-[420px]">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F2447]/50 to-transparent" />
            </div>

            <div
              className="text-[16px] leading-8 text-[#374151]"
              dangerouslySetInnerHTML={{ __html: post.content || "" }}
            />

            <div className="mt-2 flex flex-col gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-6">
              <div className="text-sm font-semibold uppercase tracking-wider text-[#6B7280]">Хуваалцах</div>
              <div className="flex flex-wrap gap-3">
                {["Facebook", "Twitter", "LinkedIn"].map((platform) => (
                  <button
                    key={platform}
                    className="rounded-full border border-[#E5E7EB] px-4 py-2 text-xs font-semibold text-[#6B7280] transition-colors hover:border-[#1E3A8A] hover:text-[#1E3A8A]"
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </div>
          </motion.article>

          <motion.aside
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col gap-8"
          >
            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6">
              <div className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#6B7280]">Холбоотой мэдээ</div>
              <div className="flex flex-col gap-4">
                {(custom.related as string[] | undefined)?.map((title) => {
                  const related = otherPosts.find((p) => p.title === title);
                  return (
                    <Link
                      key={title}
                      href={related?.slug ? `/en/${related.slug}` : "/en"}
                      className="group flex flex-col gap-1 border-b border-[#E5E7EB] pb-3 last:border-0"
                    >
                      <div className="text-sm font-semibold text-[#111827] transition-colors group-hover:text-[#1E3A8A]">
                        {title}
                      </div>
                      <div className="text-xs text-[#6B7280]">Дэлгэрэнгүй →</div>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-[#0F2447] p-6 text-white">
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/5" />
              <div className="relative z-10 flex flex-col gap-4">
                <div className="text-lg font-bold">Мэдээлэл авах</div>
                <div className="text-sm leading-6 text-white/70">
                  Шинэ мэдээ, тайлан, арга хэмжээний урилгыг имэйлээр хүлээн ав.
                </div>
                <MagneticButton className="w-fit rounded-full bg-white px-5 py-2.5 text-xs font-semibold text-[#0F2447]">
                  Бүртгүүлэх
                </MagneticButton>
              </div>
            </div>
          </motion.aside>
        </div>

        <div className="mx-auto mt-16 max-w-6xl">
          <AnimatePresence>
            {showOthers && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-10 overflow-hidden"
              >
                <div className="flex flex-col gap-3">
                  <AnimatedText className="text-2xl font-bold text-[#0F2447]">Бусад мэдээ</AnimatedText>
                  <motion.div
                    className="h-1 w-12 origin-left rounded-full bg-gradient-to-r from-[#1E3A8A] to-[#06B6D4]"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {otherPosts.map((item, idx) => (
                    <NewsCard key={item._id} news={item} idx={idx} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setShowOthers(!showOthers)}
              className="rounded-full border border-[#1E3A8A] px-8 py-3 text-sm font-semibold text-[#1E3A8A] transition-all hover:bg-[#1E3A8A] hover:text-white"
            >
              {showOthers ? "Хураах" : "Бусад мэдээ үзэх"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
