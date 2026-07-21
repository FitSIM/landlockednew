"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import LuxuryHero from "@/components/luxury/LuxuryHero";
import { images } from "@/lib/images";
import { AnimatedText, staggerContainer, fadeInUp } from "@/components/motion/animations";
import { usePosts } from "@/lib/hooks/useCms";

const fallbackNewsLinks = [
  { label: "Худалдааны коридорын шинэчлэл", href: "/news-trade-corridor" },
  { label: "Венийн хөтөлбөрийн дунд хугацааны тайлан", href: "/news-vienna-midterm-report" },
  { label: "Логистикийн индекс 2024", href: "/news-logistics-index-2024" },
  { label: "Залуучуудын зөвлөлийн ээлжит хуралдаан", href: "/news-youth-board-meeting" },
  { label: "НҮБ-ын дэмжлэгтэй шинэ судалгааны төсөл", href: "/news-un-research-project" },
  { label: "Залуучуудын зөвлөлийн шинэ стратеги", href: "/news-youth-strategy-2025" },
  { label: "Олон улсын залуучуудын форум", href: "/news-youth-forum-geneva" },
  { label: "Залуу манлайлагчдын чуулган 2025", href: "/news-youth-leaders-congress-2025" },
];

const fallbackEventLinks = [
  { label: "Олон улсын форум 2025", href: "/event-llcd-forum-2025" },
  { label: "Худалдаа хөнгөвчлүүлэх семинар", href: "/event-trade-facilitation-seminar" },
  { label: "Залуучуудын лидершийн форум", href: "/event-youth-leadership-forum" },
  { label: "Логистикийн чадавх бэхжүүлэх сургалт", href: "/event-logistics-capacity-training" },
  { label: "Хөгжлийн түншлэлийн уулзалт", href: "/event-development-partnership-meeting" },
  { label: "Худалдааны саад бэрхшээлийн форум", href: "/event-trade-barriers-forum" },
  { label: "Дижитал трансформацийн вебинар", href: "/event-digital-transformation-webinar" },
];

export default function SiteMapPage() {
  const { posts: newsPosts } = usePosts("news");
  const { posts: eventPosts } = usePosts("event");

  const sitemap = useMemo(
    () => [
      {
        title: "Бидний тухай",
        links: [
          { label: "Товч түүх", href: "/about-brief-history" },
          { label: "Захиралын мэндчилгээ", href: "/about-executive-greeting" },
          { label: "Бидний зорилго", href: "/about-goals" },
          { label: "Олон талт хэлэлцээр", href: "/about-multilateral-agreement" },
        ],
      },
      {
        title: "LLDCs",
        links: [
          { label: "LLDCs Vienna", href: "/lldcs-vienna" },
          { label: "LLDCs Awaza", href: "/lldcs-awaza" },
          { label: "Priority 1", href: "/priority-1" },
          { label: "Priority 2", href: "/priority-2" },
          { label: "Priority 3", href: "/priority-3" },
          { label: "Priority 4", href: "/priority-4" },
          { label: "Priority 5", href: "/priority-5" },
        ],
      },
      {
        title: "Мэдлэг",
        links: [
          { label: "Судалгаа", href: "/research" },
          { label: "Тайлан", href: "/reports" },
          { label: "E-Library", href: "/e-library" },
        ],
      },
      {
        title: "Үйл ажиллагаа",
        links: [
          { label: "Арга хэмжээ", href: "/events" },
          { label: "Фото", href: "/photos" },
        ],
      },
      {
        title: "Хамтын ажиллагаа",
        links: [
          { label: "Дэмжлэг", href: "/support" },
          { label: "Хамтрагч байгууллагууд", href: "/partner-institutions" },
        ],
      },
      {
        title: "Залуучууд",
        links: [{ label: "Youth Advisory", href: "/youth-advisory" }],
      },
      {
        title: "Мэдээ",
        links: newsPosts.length
          ? newsPosts.map((p) => ({
              label: p.title || p.slug || "",
              href: `/${p.slug}`,
            }))
          : fallbackNewsLinks,
      },
      {
        title: "Арга хэмжээ",
        links: [
          { label: "Арга хэмжээний нүүр", href: "/events" },
          ...(eventPosts.length
            ? eventPosts.map((p) => ({
                label: p.title || p.slug || "",
                href: `/${p.slug}`,
              }))
            : fallbackEventLinks),
        ],
      },
      {
        title: "Холбоо барих",
        links: [
          { label: "Холбоо барих", href: "/contact" },
          { label: "Сайтын бүтэц", href: "/site-map" },
        ],
      },
    ],
    [newsPosts, eventPosts],
  );

  return (
    <div className="w-full">
      <LuxuryHero
        title="Сайтын бүтэц"
        eyebrow="Навигаци"
        body="Сайтын бүтэц болон бүх дэд хуудас."
        image={images.heroAbout}
        minHeight="70vh"
      />

      <div className="luxury-section">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 flex flex-col items-center gap-4 text-center">
            <AnimatedText className="text-3xl font-bold text-[#0F2447] md:text-4xl">
              Бүх хуудас
            </AnimatedText>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 w-16 origin-left rounded-full bg-gradient-to-r from-[#1E3A8A] to-[#06B6D4]"
            />
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {sitemap.map((section, idx) => (
              <motion.div
                key={section.title}
                variants={fadeInUp}
                whileHover={{
                  y: -10,
                  rotateX: 4,
                  rotateY: -2,
                  boxShadow: "0 30px 60px rgba(15,36,71,0.14)",
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformPerspective: 1000, transformStyle: "preserve-3d" }}
                className="group flex flex-col gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-7 shadow-[0_8px_30px_rgba(15,36,71,0.06)] transition-colors duration-300 hover:border-[#1E3A8A]/30"
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EFF6FF] text-sm font-bold text-[#1E3A8A] transition-colors duration-300 group-hover:bg-[#1E3A8A] group-hover:text-white"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </motion.div>
                  <div className="text-lg font-bold text-[#0F2447]">{section.title}</div>
                </div>
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex flex-col gap-2"
                >
                  {section.links.map((link, linkIdx) => (
                    <motion.div key={link.href} variants={fadeInUp}>
                      <Link
                        href={link.href}
                        className="group/link flex items-center gap-2 text-[15px] text-[#4B5563] transition-colors duration-300 hover:text-[#1E3A8A]"
                      >
                        <motion.span
                          className="h-1.5 w-1.5 rounded-full bg-[#9CA3AF]"
                          whileHover={{ scale: 1.5, backgroundColor: "#1E3A8A" }}
                        />
                        <span className="transition-transform duration-300 group-hover/link:translate-x-1">
                          {link.label}
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
