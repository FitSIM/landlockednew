"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import LuxuryHero from "@/components/luxury/LuxuryHero";
import LuxuryCard from "@/components/luxury/LuxuryCard";
import { images } from "@/lib/images";
import { AnimatedText, MagneticButton, ParallaxImage } from "@/components/motion/animations";
import type { Post } from "@/graphql/cms/queries";

const filters = ["Бүх", "Олон улсын форум", "Семинар", "Сургалт", "Онлайн"];

function getTag(event: Post & { custom?: Record<string, unknown> }) {
  return String(event.custom?.tag || "Арга хэмжээ");
}

function getDate(event: Post & { custom?: Record<string, unknown> }) {
  return String(event.custom?.date || "");
}

function getLocation(event: Post & { custom?: Record<string, unknown> }) {
  return String(event.custom?.location || "");
}

function getSchedule(event: Post & { custom?: Record<string, unknown> }) {
  return (event.custom?.schedule as string[] | undefined) || [];
}

function getImage(event: Post & { image?: string }) {
  return event.image || event.images?.[0]?.url || images.heroEvents;
}

function filterEvents(list: (Post & { custom?: Record<string, unknown>; image?: string })[], filter: string) {
  if (filter === "Бүх") return list;
  if (filter === "Онлайн") return list.filter((e) => getLocation(e) === "Онлайн");
  const map: Record<string, string> = {
    "Олон улсын форум": "Онцлох арга хэмжээ",
    Семинар: "Семинар",
    Сургалт: "Сургалт",
  };
  return list.filter((e) => getTag(e) === map[filter]);
}

export default function EventsClient({ events }: { events: (Post & { custom?: Record<string, unknown>; image?: string })[] }) {
  const [activeFilter, setActiveFilter] = useState("Бүх");

  const featured = events.find((e) => e.featured) || events[0];
  const upcoming = events.filter((e) => e.slug !== featured?.slug && new Date(getDate(e).split(" - ")[0].replace(/\./g, "-")) > new Date("2025-06-01"));
  const past = events.filter((e) => e.slug !== featured?.slug && !upcoming.includes(e));

  const filtered = filterEvents(upcoming, activeFilter);

  if (!featured) {
    return (
      <div className="luxury-section text-center">
        <div className="text-2xl font-bold text-[#0F2447]">Арга хэмжээ олдсонгүй</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <LuxuryHero
        title="Арга хэмжээ"
        eyebrow="Үйл явдал"
        body="Олон улсын хамтын ажиллагаа, мэдлэг солилцох, чадавх бэхжүүлэх чиглэлээр зохион байгуулагдах форум, семинар, уулзалт, сургалт."
        image={images.heroEvents}
        minHeight="70vh"
      />

      <div className="luxury-section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-wrap gap-3"
        >
          {filters.map((f) => (
            <motion.button
              key={f}
              onClick={() => setActiveFilter(f)}
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className={`rounded-full px-5 py-2 text-xs font-semibold transition-all duration-300 ${
                activeFilter === f
                  ? "bg-[#1E3A8A] text-white shadow-lg shadow-[#1E3A8A]/25"
                  : "border border-[#E5E7EB] bg-white text-[#6B7280] hover:border-[#1E3A8A] hover:text-[#1E3A8A]"
              }`}
            >
              {f}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="group mt-10 grid grid-cols-1 overflow-hidden rounded-3xl bg-white shadow-[0_20px_60px_rgba(15,36,71,0.12)] lg:grid-cols-2"
        >
          <ParallaxImage src={getImage(featured)} alt={featured.title || ""} className="min-h-[360px] w-full" speed={0.3} />
          <div className="flex flex-col justify-center gap-5 p-10 lg:p-14">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="w-fit rounded-full bg-[#1E3A8A] px-3 py-1 text-xs font-semibold text-white"
            >
              Онцлох арга хэмжээ
            </motion.div>
            <AnimatedText delay={0.1} className="text-2xl font-bold text-[#0F2447] md:text-3xl">
              {featured.title}
            </AnimatedText>
            <AnimatedText delay={0.2} className="text-[15px] leading-7 text-[#6B7280]">
              {featured.excerpt}
            </AnimatedText>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col gap-1 text-sm text-[#6B7280]"
            >
              <div className="flex items-center gap-2"><span className="text-[#1E3A8A]">●</span> {getLocation(featured)}</div>
              <div className="flex items-center gap-2"><span className="text-[#06B6D4]">●</span> {getDate(featured)}</div>
            </motion.div>
            <MagneticButton className="w-fit rounded-full bg-[#1E3A8A] px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:shadow-lg">
              <Link href={`/en/${featured.slug}`}>Дэлгэрэнгүй →</Link>
            </MagneticButton>
          </div>
        </motion.div>

        <section className="mt-20 flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <AnimatedText className="text-3xl font-bold text-[#0F2447]">Удахгүй болох арга хэмжээ</AnimatedText>
            <motion.div
              className="h-1 w-14 origin-left rounded-full bg-gradient-to-r from-[#1E3A8A] to-[#06B6D4]"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <AnimatedText delay={0.1} className="max-w-2xl text-[15px] leading-7 text-[#6B7280]">
              Олон улсын хамтын ажиллагаа, мэдлэг солилцох, чадавх бэхжүүлэх чиглэлээр зохион
              байгуулагдах форум, семинар, уулзалт, сургалт, вебинаруудад оролцож, далайд гарцгүй
              орнуудын хөгжлийн асуудлаар мэдлэгээ хуваалцаарай.
            </AnimatedText>
          </div>
          <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((event, idx) => (
                <motion.div
                  key={event._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  <LuxuryCard
                    title={event.title || ""}
                    body={`${event.excerpt || ""} \n\n${getLocation(event)}  •  ${getDate(event)}`}
                    eyebrow={getTag(event)}
                    image={getImage(event)}
                    minHeight="400px"
                    index={idx}
                    cta="Дэлгэрэнгүй →"
                    href={`/en/${event.slug}`}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        <section className="mt-20 flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <AnimatedText className="text-3xl font-bold text-[#0F2447]">Өнгөрсөн арга хэмжээ</AnimatedText>
            <motion.div
              className="h-1 w-14 origin-left rounded-full bg-gradient-to-r from-[#1E3A8A] to-[#06B6D4]"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>
          <div className="relative flex flex-col gap-6 pl-6 md:pl-10">
            <motion.div
              className="absolute left-[11px] top-0 h-full w-0.5 bg-gradient-to-b from-[#1E3A8A] via-[#06B6D4] to-transparent md:left-[15px]"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              style={{ originY: 0 }}
            />
            {past.map((item, idx) => (
              <Link key={item._id} href={`/en/${item.slug}`}>
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ x: 8, borderColor: "rgba(30,58,138,0.3)", boxShadow: "0 16px 40px rgba(15,36,71,0.1)" }}
                  className="group relative flex items-center gap-6 rounded-2xl border border-[#E5E7EB] bg-white p-5 transition-all duration-300"
                >
                  <div className="absolute -left-[31px] top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-[#1E3A8A] shadow-md md:-left-[43px] md:h-6 md:w-6">
                    <div className="h-1.5 w-1.5 rounded-full bg-white" />
                  </div>
                  <motion.div
                    className="h-20 w-20 shrink-0 rounded-xl bg-cover bg-center"
                    style={{ backgroundImage: `url('${getImage(item)}')` }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="flex flex-1 flex-col gap-1">
                    <div className="text-base font-bold text-[#0F2447]">{item.title}</div>
                    <div className="text-sm text-[#6B7280]">{getDate(item)}</div>
                  </div>
                  <div className="text-sm font-semibold text-[#1E3A8A] transition-transform duration-300 group-hover:translate-x-1">Дэлгэрэнгүй →</div>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
