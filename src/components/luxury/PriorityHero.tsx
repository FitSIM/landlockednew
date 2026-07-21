"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { images } from "@/lib/images";

const priorities = [
  { num: "01", slug: "priority-1", label: "Бүтцийн өөрчлөлт" },
  { num: "02", slug: "priority-2", label: "Худалдаа" },
  { num: "03", slug: "priority-3", label: "Транзит" },
  { num: "04", slug: "priority-4", label: "Уур амьсгал" },
  { num: "05", slug: "priority-5", label: "Хэрэгжилт" },
];

const titles: Record<string, { kicker: string; title: string }> = {
  "priority-1": {
    kicker: "ТЭРГҮҮЛЭХ ЧИГЛЭЛ 1",
    title: "Бүтцийн өөрчлөлт, шинжлэх ухаан, технологи, инноваци",
  },
  "priority-2": {
    kicker: "ТЭРГҮҮЛЭХ ЧИГЛЭЛ 2",
    title: "Олон улсын худалдаа, тээвэр, логистик",
  },
  "priority-3": {
    kicker: "ТЭРГҮҮЛЭХ ЧИГЛЭЛ 3",
    title: "Транзит дэд бүтэц, холболт, коридор",
  },
  "priority-4": {
    kicker: "ТЭРГҮҮЛЭХ ЧИГЛЭЛ 4",
    title: "Уур амьсгалын өөрчлөлт, тогтвортой хөгжил",
  },
  "priority-5": {
    kicker: "ТЭРГҮҮЛЭХ ЧИГЛЭЛ 5",
    title: "Хэрэгжилт, хяналт, түншлэл",
  },
};

export default function PriorityHero({ slug }: { slug: string }) {
  const active = titles[slug] || titles["priority-1"];
  const activeNum = priorities.find((p) => p.slug === slug)?.num || "01";

  return (
    <section className="luxury-hero" style={{ minHeight: "70vh" }}
    >
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="luxury-hero__bg"
        style={{ backgroundImage: `url('${images.heroReports}')` }}
      />
      <div className="luxury-hero__overlay" />

      <div className="luxury-hero__content items-center text-center"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex h-20 w-20 items-center justify-center rounded-full border border-white/30 bg-white/10 text-3xl font-bold text-white backdrop-blur-md"
        >
          {activeNum}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="luxury-hero__eyebrow"
        >
          {active.kicker}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="max-w-[900px] text-center text-[clamp(36px,5vw,64px)] font-bold leading-tight text-white"
        >
          {active.title}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-6 flex w-full max-w-4xl flex-row flex-wrap justify-center gap-3"
        >
          {priorities.map((p) => (
            <Link
              key={p.slug}
              href={`/en/${p.slug}`}
              className={`rounded-full px-5 py-2.5 text-xs font-semibold transition-all duration-300 ${
                p.slug === slug
                  ? "bg-white text-[#0F2447]"
                  : "border border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
              }`}
            >
              {p.num} {p.label}
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
