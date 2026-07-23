"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LuxuryHero from "@/components/luxury/LuxuryHero";
import Image from "@/components/common/Image";
import { images, documentCardImages } from "@/lib/images";
import { AnimatedText, MagneticButton } from "@/components/motion/animations";
import { useSlotPosts, contentBlocks } from "@/lib/hooks/useCms";
import { CMS_CATEGORIES } from "@/lib/cms-slots";

const filters = ["Бүх", "Арга хэмжээ", "Уулзалт", "Ажлын айлчлал", "Бага хурал"];

const fallbackFeatured = {
  title: "Далайд гарцгүй хөгжиж буй орнуудын олон улсын форум 2025",
  body: "Гишүүн орнуудын төрийн тэргүүнүүд, сайд нар, олон улсын байгууллагын төлөөлөгчид оролцож дэлхийн худалдаа, тээвэр, дэд бүтцийн хамтын ажиллагааны асуудлуудыг хэлэлцэв.",
  meta: "Улаанбаатар, Монгол Улс • 2025.09.15",
  image: images.heroPhotos,
};

const fallbackGallery = [
  { tag: "Арга хэмжээ", image: images.doc1, size: "tall" },
  { tag: "Уулзалт", image: images.doc2, size: "normal" },
  { tag: "Сургалт", image: images.doc3, size: "normal" },
  { tag: "Бага хурал", image: images.doc4, size: "wide" },
  { tag: "Ажлын айлчлал", image: images.doc5, size: "normal" },
  { tag: "Арга хэмжээ", image: images.doc6, size: "tall" },
  { tag: "Уулзалт", image: images.doc7, size: "wide" },
  { tag: "Сургалт", image: images.doc8, size: "normal" },
];

export default function PhotosPage() {
  const [activeFilter, setActiveFilter] = useState("Бүх");
  const [selected, setSelected] = useState<{ image: string; tag: string } | null>(null);
  const { posts: galleryPosts } = useSlotPosts(CMS_CATEGORIES.gallery);

  // Gallery comes live from the photos category. Content blocks per post:
  // [0]=tag, [1]=size, [2]=meta. Featured flag marks the photo story.
  const { featured, gallery } = useMemo(() => {
    const valid = galleryPosts.filter(
      (p) => contentBlocks(p.content).length >= 2,
    );
    if (!valid.length) {
      return { featured: fallbackFeatured, gallery: fallbackGallery };
    }
    const toItem = (p: (typeof valid)[number]) => {
      const b = contentBlocks(p.content);
      return {
        tag: b[0] || "",
        image: p.images?.[0]?.url || documentCardImages[0],
        size: b[1] || "normal",
      };
    };
    const featuredPost = valid.find((p) => p.featured) ?? valid[0];
    const fb = contentBlocks(featuredPost.content);
    return {
      featured: {
        title: featuredPost.title || "",
        body: (featuredPost.excerpt || "").trim(),
        meta: fb[2] || "",
        image: featuredPost.images?.[0]?.url || images.heroPhotos,
      },
      gallery: valid.filter((p) => p._id !== featuredPost._id).map(toItem),
    };
  }, [galleryPosts]);

  const filtered = activeFilter === "Бүх" ? gallery : gallery.filter((g) => g.tag === activeFilter);

  return (
    <div className="w-full">
      <LuxuryHero
        title="Зураг"
        eyebrow="Галерей"
        body="Далайд гарцгүй хөгжиж буй орнуудын арга хэмжээ, уулзалт, сургалт, ажлын айлчлалын зургийн цомог."
        image={images.heroPhotos}
        minHeight="70vh"
      />

      <div className="luxury-section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-wrap justify-center gap-3"
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
          <motion.div
            className="relative min-h-[360px] overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${featured.image}')` }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.8 }}
            />
          </motion.div>
          <div className="flex flex-col justify-center gap-5 p-10 lg:p-14">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="w-fit rounded-full bg-[#1E3A8A] px-3 py-1 text-xs font-semibold text-white"
            >
              Сарын шилдэг зураг
            </motion.div>
            <AnimatedText delay={0.1} className="text-2xl font-bold text-[#0F2447] md:text-3xl">
              {featured.title}
            </AnimatedText>
            <AnimatedText delay={0.2} className="text-[15px] leading-7 text-[#6B7280]">
              {featured.body}
            </AnimatedText>
            <AnimatedText delay={0.3} className="text-sm text-[#6B7280]">
              {featured.meta}
            </AnimatedText>
          </div>
        </motion.div>

        <section className="mt-16 flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <AnimatedText className="text-3xl font-bold text-[#0F2447]">Зургийн цомог</AnimatedText>
            <motion.div
              className="h-1 w-14 origin-left rounded-full bg-gradient-to-r from-[#1E3A8A] to-[#06B6D4]"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>

          <motion.div layout className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((item, idx) => (
                <motion.div
                  key={`${item.image}-${idx}`}
                  layout
                  initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                  transition={{ duration: 0.5, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => setSelected(item)}
                  whileHover={{ scale: 1.02 }}
                  className={`group relative mb-4 cursor-pointer overflow-hidden rounded-2xl break-inside-avoid ${
                    item.size === "tall"
                      ? "h-[420px]"
                      : item.size === "wide"
                      ? "h-[240px]"
                      : "h-[300px]"
                  }`}
                >
                  <motion.div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${item.image}')` }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.7 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F2447]/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute bottom-0 left-0 p-5 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4">
                    <div className="w-fit rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                      {item.tag}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative mt-16 min-h-[380px] overflow-hidden rounded-3xl"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${images.heroPhotos}')` }}
          />
          <div className="absolute inset-0 bg-[#0F2447]/90" />
          <div className="relative z-10 flex min-h-[380px] flex-col items-center justify-center gap-5 p-14 text-center">
            <AnimatedText className="text-2xl font-bold text-white md:text-3xl">Өөрийн зургаа хуваалцая</AnimatedText>
            <AnimatedText delay={0.2} className="max-w-xl text-white/75">
              Та далайд гарцгүй хөгжиж буй орнуудын талаарх арга хэмжээ, айлчлал, уулзалтын зургуудаа
              бидэнтэй хуваалцана уу.
            </AnimatedText>
            <MagneticButton className="mt-2 rounded-full border border-white/40 bg-white/10 px-7 py-3 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white hover:text-[#0F2447]">
              Зураг илгээх
            </MagneticButton>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F2447]/95 p-6 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 40 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative max-h-[85vh] max-w-5xl overflow-hidden rounded-2xl"
            >
              <Image
                src={selected.image}
                alt={selected.tag}
                width={1280}
                height={853}
                className="max-h-[85vh] w-auto object-contain"
              />
              <button
                onClick={() => setSelected(null)}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
