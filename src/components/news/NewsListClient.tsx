"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import LuxuryHero from "@/components/luxury/LuxuryHero";
import { images } from "@/lib/images";
import { AnimatedText } from "@/components/motion/animations";
import { usePage, summaryOf } from "@/lib/hooks/useCms";
import type { Post } from "@/graphql/cms/queries";

export default function NewsListClient({ posts }: { posts: Post[] }) {
  const { page } = usePage("news");

  return (
    <div className="w-full">
      <LuxuryHero
        title={page?.name || "Мэдээ"}
        eyebrow={page?.description || "Шинэ мэдээ, мэдээлэл"}
        body={
          (page?.content || "").replace(/<[^>]+>/g, "").trim() ||
          "Далайд гарцгүй хөгжиж буй орнуудын олон улсын судалгааны төвийн хамгийн сүүлийн мэдээ, тайлан, бодлогын мэдээлэл."
        }
        image={images.heroHome}
        minHeight="50vh"
      />

      <div className="luxury-section">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col gap-3">
            <AnimatedText className="text-3xl font-bold text-[#0F2447]">Бүх мэдээ</AnimatedText>
            <motion.div
              className="h-1 w-12 origin-left rounded-full bg-gradient-to-r from-[#1E3A8A] to-[#06B6D4]"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((news, idx) => {
              const image = news.images?.[0]?.url || images.heroHome;
              const custom = (news.customFieldsData || {}) as Record<string, unknown>;
              const tag = String(custom.tag || "Мэдээ");
              const date = String(custom.date || "");
              return (
                <Link key={news._id} href={`/en/${news.slug}`}>
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
                      <div className="absolute left-4 top-4 w-fit rounded-full bg-[#1E3A8A] px-3 py-1 text-xs font-semibold text-white">{tag}</div>
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
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
