"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import LuxuryHero from "@/components/luxury/LuxuryHero";
import { AnimatedText, MagneticButton } from "@/components/motion/animations";
import type { Post } from "@/graphql/cms/queries";

export default function EventDetailClient({ event, allEvents }: { event: Post; allEvents: Post[] }) {
  const image = event.images?.[0]?.url || "/images/luxury/hero-events.jpg";
  const custom = (event.customFieldsData || {}) as Record<string, unknown>;
  const tag = String(custom.tag || "Арга хэмжээ");
  const date = String(custom.date || "");
  const location = String(custom.location || "");
  const schedule = (custom.schedule as string[] | undefined) || [];
  const related = (custom.related as string[] | undefined) || [];

  return (
    <div className="w-full">
      <LuxuryHero title={event.title || ""} eyebrow={tag} image={image} minHeight="40vh" />

      <div className="luxury-section">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-[1fr_340px]">
          <motion.article
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-[#1E3A8A] px-3 py-1 text-xs font-semibold text-white">{tag}</span>
              <span className="text-sm text-[#6B7280]">{date}</span>
              <span className="text-sm text-[#6B7280]">● {location}</span>
            </div>

            <AnimatedText className="text-2xl font-bold text-[#0F2447] md:text-3xl lg:text-4xl">
              {event.title}
            </AnimatedText>

            <div className="relative h-[260px] w-full overflow-hidden rounded-2xl lg:h-[360px]">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F2447]/50 to-transparent" />
            </div>

            <div
              className="text-[15px] leading-7 text-[#374151]"
              dangerouslySetInnerHTML={{ __html: event.content || "" }}
            />

            {schedule.length > 0 && (
              <div className="flex flex-col gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-6">
                <div className="text-sm font-semibold uppercase tracking-wider text-[#6B7280]">Хөтөлбөр</div>
                <ul className="flex flex-col gap-3 text-[15px] text-[#374151]">
                  {schedule.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1E3A8A]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-4 flex flex-col gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-6">
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
              <div className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#6B7280]">Холбоотой арга хэмжээ</div>
              <div className="flex flex-col gap-4">
                {related.map((title) => {
                  const related = allEvents.find((e) => e.title === title);
                  return (
                    <Link
                      key={title}
                      href={related?.slug ? `/en/${related.slug}` : "/en/events"}
                      className="group flex flex-col gap-1 border-b border-[#E5E7EB] pb-3 last:border-0"
                    >
                      <div className="text-sm font-semibold text-[#111827] transition-colors group-hover:text-[#1E3A8A]">{title}</div>
                      <div className="text-xs text-[#6B7280]">Дэлгэрэнгүй →</div>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-[#0F2447] p-6 text-white">
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/5" />
              <div className="relative z-10 flex flex-col gap-4">
                <div className="text-lg font-bold">Бүртгүүлэх</div>
                <div className="text-sm leading-6 text-white/70">Арга хэмжээнд оролцох бүртгэлээ өнөөдөр эхлүүлээрэй.</div>
                <MagneticButton className="w-fit rounded-full bg-white px-5 py-2.5 text-xs font-semibold text-[#0F2447]">Бүртгүүлэх</MagneticButton>
              </div>
            </div>
          </motion.aside>
        </div>

        <div className="mt-16 flex justify-center">
          <Link
            href="/en/events"
            className="rounded-full border border-[#1E3A8A] px-6 py-2.5 text-sm font-semibold text-[#1E3A8A] transition-all hover:bg-[#1E3A8A] hover:text-white"
          >
            Бусад арга хэмжээ үзэх
          </Link>
        </div>
      </div>
    </div>
  );
}
