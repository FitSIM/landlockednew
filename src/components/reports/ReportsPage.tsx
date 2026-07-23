"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LuxuryHero from "@/components/luxury/LuxuryHero";
import { images, reportCardImages } from "@/lib/images";
import { AnimatedText } from "@/components/motion/animations";
import { useSlotPosts, contentBlocks } from "@/lib/hooks/useCms";
import { CMS_CATEGORIES } from "@/lib/cms-slots";

const YEARS = Array.from({ length: 17 }, (_, i) => 2025 - i);

type ReportCardItem = {
  badge: string;
  title: string;
  body: string;
  image: string;
};

function YearCard({ item, offset }: { item: ReportCardItem; offset: number }) {
  const abs = Math.min(Math.abs(offset), 4);
  const scale = 1 - abs * 0.06;
  const opacity = abs > 2 ? Math.max(0.2, 1 - abs * 0.3) : 1;
  const translateX = offset * 320;
  const zIndex = 20 - abs * 5;

  return (
    <motion.div
      initial={false}
      animate={{ x: translateX, scale, opacity, zIndex }}
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
      className="absolute top-0 left-1/2 -translate-x-1/2 w-[280px]"
    >
      <motion.div
        whileHover={{ y: -8 }}
        className="group relative flex h-[420px] w-full flex-col justify-end overflow-hidden rounded-[20px] shadow-[0_20px_50px_rgba(15,36,71,0.25)]"
      >
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${item.image}')` }}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.7 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F2447]/95 via-[#0F2447]/40 to-transparent" />
        <div className="relative z-10 flex flex-col gap-3 p-6">
          <div className="w-fit rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md">
            {item.badge}
          </div>
          <div className="text-4xl font-bold text-white">{item.title}</div>
          <div className="text-sm leading-snug text-white/80">
            {item.body}
          </div>
          <motion.div
            className="mt-2 text-sm font-semibold text-white"
            whileHover={{ x: 6 }}
            transition={{ duration: 0.3 }}
          >
            Тайланг үзэх →
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ReportsPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef(0);
  const lastWheelTime = useRef(0);
  const { posts: reportPosts } = useSlotPosts(CMS_CATEGORIES.reports);

  // Carousel cards come from the "Тайлан" category; the generated year
  // archive remains as the fallback when it has no posts.
  const items: ReportCardItem[] = reportPosts.length
    ? reportPosts.map((p, i) => ({
        badge: "Архив",
        title: contentBlocks(p.content)[0] || p.title || "",
        body: contentBlocks(p.content)[1] || "",
        image: p.images?.[0]?.url || reportCardImages[i % reportCardImages.length],
      }))
    : YEARS.map((year) => ({
        badge: "Архив",
        title: String(year),
        body: `${year} оны тайлан, судалгаа, бодлогын баримт бичгүүд.`,
        image: reportCardImages[year % reportCardImages.length],
      }));

  const changeIndex = useCallback((delta: number) => {
    const now = Date.now();
    if (now - lastWheelTime.current < 320) return;
    lastWheelTime.current = now;
    setActiveIndex((prev) => Math.max(0, Math.min(prev + delta, items.length - 1)));
  }, [items.length]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      const absX = Math.abs(e.deltaX);
      const absY = Math.abs(e.deltaY);
      if (absX <= absY || absX < 6) return;
      e.preventDefault();
      changeIndex(e.deltaX > 0 ? 1 : -1);
    };
    const onTouchStart = (e: TouchEvent) => { touchStart.current = e.touches[0].clientX; };
    const onTouchEnd = (e: TouchEvent) => {
      const diff = touchStart.current - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) changeIndex(diff > 0 ? 1 : -1);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [changeIndex]);

  return (
    <div className="w-full">
      <LuxuryHero
        title="Тайлан"
        eyebrow="Архив"
        body="2009 оноос хойшхи далайд гарцгүй хөгжиж буй орнуудын олон улсын судалгааны төвийн жилийн тайлан, судалгаа, бодлогын баримт бичгүүд."
        image={images.heroReports}
        minHeight="75vh"
      />

      <div className="luxury-section">
        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <AnimatedText className="text-3xl font-bold text-[#0F2447]">Архив</AnimatedText>
            <motion.div
              className="h-1 w-12 origin-left rounded-full bg-gradient-to-r from-[#1E3A8A] to-[#06B6D4]"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-3xl"
          >
            <div className="text-[15px] leading-7 text-[#6B7280]">
              Олон улсын судалгааны төвийн архивт далайд гарцгүй хөгжиж буй орнуудын тогтвортой
              хөгжил, худалдаа, дэд бүтэц, хүний хөгжил, олон улсын хамтын ажиллагааны чиглэлээр
              хэвлэгдсэн жилийн тайлан, судалгаа, бодлогын хураангуй, статистик мэдээлэл багтсан.
            </div>
          </motion.div>
        </section>

        <section className="mt-20 flex flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-3">
            <AnimatedText className="text-2xl font-bold text-[#0F2447]">Жилийн тайлангууд</AnimatedText>
            <motion.div
              className="h-1 w-12 rounded-full bg-gradient-to-r from-[#1E3A8A] to-[#06B6D4]"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>

          <div
            ref={containerRef}
            className="relative h-[480px] w-full max-w-5xl select-none"
            style={{ perspective: 1200 }}
          >
            <AnimatePresence initial={false}>
              {items.map((item, index) => {
                const offset = index - activeIndex;
                if (Math.abs(offset) > 3) return null;
                return <YearCard key={item.title} item={item} offset={offset} />;
              })}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => changeIndex(-1)}
              disabled={activeIndex === 0}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#1E3A8A] text-[#1E3A8A] transition-colors hover:bg-[#1E3A8A] hover:text-white disabled:opacity-30"
              aria-label="Өмнөх"
            >
              ←
            </button>
            <div className="text-sm font-semibold text-[#0F2447]">
              {activeIndex + 1} / {items.length}
            </div>
            <button
              onClick={() => changeIndex(1)}
              disabled={activeIndex === items.length - 1}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#1E3A8A] text-[#1E3A8A] transition-colors hover:bg-[#1E3A8A] hover:text-white disabled:opacity-30"
              aria-label="Дараах"
            >
              →
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
