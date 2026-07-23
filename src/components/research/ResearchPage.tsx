"use client";

import { useMemo, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import LuxuryHero from "@/components/luxury/LuxuryHero";
import { images, documentCardImages } from "@/lib/images";
import { useSlotPosts, fieldsOf } from "@/lib/hooks/useCms";
import { CMS_CATEGORIES } from "@/lib/cms-slots";

const fallbackCategories = [
  { title: "Эрх зүйн хураангуй", count: "30 баримт бичиг", id: "legal", image: images.legal, body: "Олон улсын хэлэлцээр, гаалийн процедур, худалдааны коридорын эрх зүйн хураангуй." },
  { title: "Статистик тайлан", count: "25 баримт бичиг", id: "statistics", image: images.statistics, body: "Логистикийн индекс, худалдааны статистик, эдийн засгийн тойм, хөрөнгө оруулалтын мэдээ." },
  { title: "Хуралдааны тэмдэглэл", count: "18 баримт бичиг", id: "meetings", image: images.meetings, body: "Ерөнхий асуудлын зөвлөл, бодлогын хэлэлцүүлэг, түншлэлийн уулзалтын тэмдэглэлүүд." },
  { title: "Бодлогын баримт бичиг", count: "22 баримт бичиг", id: "policy", image: images.policy, body: "Венийн хөтөлбөр, дэд бүтцийн бодлого, ногоон хөрөнгө оруулалт, дижитал худалдаа." },
];

const fallbackCategoryDocuments = {
  legal: [
    { title: "Ерөнхий асуудлын зөвлөлийн 8 дугаар хурал", meta: "2024.09.30 • PDF • 890 KB" },
    { title: "Худалдааны коридорын эрх зүйн хураангуй", meta: "2024.08.15 • PDF • 1.2 MB" },
    { title: "ДХО-уудын олон улсын хэлэлцээрүүд", meta: "2024.07.22 • PDF • 2.1 MB" },
    { title: "Гаалийн процедурын хураангуй", meta: "2024.06.10 • PDF • 980 KB" },
  ],
  statistics: [
    { title: "Худалдааны коридор 2025", meta: "2025.01.15 • PDF • 4.5 MB" },
    { title: "Логистикийн индекс 2024", meta: "2024.12.01 • PDF • 3.2 MB" },
    { title: "ДХО-уудын эдийн засгийн тойм", meta: "2024.10.20 • PDF • 2.8 MB" },
    { title: "Хөрөнгө оруулалтын статистик 2024", meta: "2024.09.05 • PDF • 1.9 MB" },
  ],
  meetings: [
    { title: "Ерөнхий асуудлын зөвлөлийн 8 дугаар хурал", meta: "2024.09.30 • PDF • 890 KB" },
    { title: "Бодлогын хэлэлцүүлэг 2024", meta: "2024.08.18 • PDF • 750 KB" },
    { title: "Залуучуудын зөвлөлийн хуралдаан", meta: "2024.07.30 • PDF • 620 KB" },
    { title: "Хөгжлийн түншлэлийн уулзалт", meta: "2024.06.25 • PDF • 1.1 MB" },
  ],
  policy: [
    { title: "Венийн хөтөлбөрийн хэрэгжилтийн тайлан", meta: "2024.11.12 • PDF • 2.4 MB" },
    { title: "Дэд бүтцийн бодлогын баримт бичиг", meta: "2024.10.05 • PDF • 1.8 MB" },
    { title: "Ногоон хөрөнгө оруулалтын бодлого", meta: "2024.09.12 • PDF • 1.5 MB" },
    { title: "Дижитал худалдааны бодлогын хураангуй", meta: "2024.08.28 • PDF • 1.3 MB" },
  ],
};

const fallbackReports = [
  { title: "Худалдааны коридор 2025", body: "Гишүүн улсуудын худалдааны коридор, саад бэрхшээл, дэд бүтцийн хөрөнгө оруулалтын тойм.", image: images.doc1 },
  { title: "Логистикийн индекс 2024", body: "Далайд гарцгүй орнуудын логистикийн чадаввар, зардал, өрсөлдөх чадварын индекс.", image: images.doc2 },
  { title: "Хөрөнгө оруулалтын нөлөөллийн дүн шинжилгээ", body: "Бүс нутгийн хөрөнгө оруулалт, эдийн засгийн өсөлт, хөдөлмөрийн зах зээлд үзүүлэх нөлөө.", image: images.doc3 },
];

function getCategoryDocuments(
  source: Record<string, { title: string; meta: string }[]>,
  id: string,
) {
  return source[id] || [];
}

function SectionHeading({ title, body }: { title: string; body: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="flex w-full flex-col gap-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-3xl font-bold text-[#0F2447] md:text-4xl"
      >{title}</motion.div>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="h-1 w-16 origin-left rounded-full bg-gradient-to-r from-[#1E3A8A] to-[#06B6D4]"
      />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="max-w-2xl text-[15px] leading-7 text-[#6B7280]"
      >{body}</motion.div>
    </motion.div>
  );
}

function CategoryCard({ title, count, body, image, onClick, index }: any) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -12, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group relative flex min-h-[420px] flex-col justify-end overflow-hidden rounded-[20px] text-left shadow-[0_20px_50px_rgba(15,36,71,0.15)]"
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${image}')` }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F2447]/95 via-[#0F2447]/50 to-transparent transition-all duration-500 group-hover:from-[#0F2447] group-hover:via-[#0F2447]/65" />
      <div className="relative z-10 flex flex-col gap-2 p-7">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
          className="text-xs font-semibold uppercase tracking-[0.2em] text-[#06B6D4]"
        >{count}</motion.div>
        <div className="text-[22px] font-bold leading-tight text-white">{title}</div>
        <div className="text-[13px] leading-relaxed text-white/75">{body}</div>
        <motion.div
          className="mt-2 text-[13px] font-semibold uppercase tracking-wider text-white"
          whileHover={{ x: 8 }}
          transition={{ duration: 0.3 }}
        >Харах →</motion.div>
      </div>
    </motion.button>
  );
}

function DocumentCard({ title, meta, image, index }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="group relative flex min-h-[260px] flex-col justify-end overflow-hidden rounded-[18px] shadow-[0_12px_40px_rgba(15,36,71,0.1)]"
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${image}')` }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F2447]/95 via-[#0F2447]/45 to-[#0F2447]/10 backdrop-blur-[2px] transition-all duration-500 group-hover:from-[#0F2447] group-hover:via-[#0F2447]/55" />
      <div className="relative z-10 flex flex-col gap-1 p-6">
        <div className="text-base font-bold text-white">{title}</div>
        <div className="text-xs text-white/65">{meta}</div>
        <motion.div
          className="mt-2 text-[13px] font-semibold text-white/90"
          whileHover={{ x: 8 }}
          transition={{ duration: 0.3 }}
        >Татах →</motion.div>
      </div>
    </motion.div>
  );
}

function ReportCard({ title, body, image, index }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -12, scale: 1.02 }}
      className="group relative flex min-h-[480px] flex-col justify-end overflow-hidden rounded-[24px] shadow-[0_20px_60px_rgba(15,36,71,0.15)]"
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${image}')` }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F2447]/95 via-[#0F2447]/35 to-transparent" />
      <div className="relative z-10 flex flex-col gap-3 p-8">
        <div className="text-[26px] font-bold leading-tight text-white">{title}</div>
        <div className="text-[14px] leading-relaxed text-white/75">{body}</div>
        <motion.div
          className="mt-2 text-[13px] font-semibold uppercase tracking-wider text-white"
          whileHover={{ x: 8 }}
          transition={{ duration: 0.3 }}
        >Унших →</motion.div>
      </div>
    </motion.div>
  );
}

export default function ResearchPage() {
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  // Research categories, documents and reports all live in the
  // "Судалгааны ангилал" category, distinguished by their custom fields.
  const { posts: researchPosts } = useSlotPosts(CMS_CATEGORIES.research);

  const categories = useMemo(() => {
    const valid = researchPosts.filter((p) => fieldsOf(p).count);
    if (!valid.length) return fallbackCategories;
    return valid.map((p) => {
      const m = fieldsOf(p);
      return {
        title: p.title || "",
        count: m.count || "",
        id: m.group || p._id,
        image: p.images?.[0]?.url || images.policy,
        body: (p.excerpt || (p.content ?? "").replace(/<[^>]+>/g, "")).trim(),
      };
    });
  }, [researchPosts]);

  const categoryDocuments = useMemo(() => {
    const valid = researchPosts.filter((p) => fieldsOf(p).fileType);
    if (!valid.length) return fallbackCategoryDocuments;
    const grouped: Record<string, { title: string; meta: string }[]> = {};
    for (const p of valid) {
      const m = fieldsOf(p);
      const group = m.group || "misc";
      (grouped[group] ??= []).push({
        title: p.title || "",
        meta: [m.date, m.fileType, m.fileSize].filter(Boolean).join(" • "),
      });
    }
    return grouped;
  }, [researchPosts]);

  const reports = useMemo(() => {
    const valid = researchPosts.filter((p) => fieldsOf(p).year);
    if (!valid.length) return fallbackReports;
    return valid.map((p) => ({
      title: p.title || "",
      body: (p.excerpt || (p.content ?? "").replace(/<[^>]+>/g, "")).trim(),
      image: p.images?.[0]?.url || images.doc1,
    }));
  }, [researchPosts]);

  function scrollTo(id: string) {
    const el = sectionRefs.current[id];
    if (el) {
      const offset = 90;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }

  return (
    <div className="w-full">
      <LuxuryHero
        title="Судалгаа"
        eyebrow="Мэдлэг, мэдээлэл, инсайт"
        body="Далайд гарцгүй хөгжиж буй орнуудын олон улсын судалгааны төвийн судалгаа, тайлан, бодлогын баримт бичгүүд."
        image={images.heroResearch}
        minHeight="75vh"
      />

      <div className="luxury-section">
        <section className="mb-24 flex flex-col gap-8">
          <SectionHeading
            title="Баримт бичгийн ангилал"
            body="Судалгаа, тайлан, хуралдааны болон бодлогын баримт бичгүүдийг ангиллаар нь хялбархан хайж, татаж аваарай."
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat, idx) => (
              <CategoryCard
                key={cat.id}
                title={cat.title}
                count={cat.count}
                body={cat.body}
                image={cat.image}
                index={idx}
                onClick={() => scrollTo(cat.id)}
              />
            ))}
          </div>
        </section>

        {categories.map((cat, catIdx) => (
          <section
            key={cat.id}
            ref={(el) => { sectionRefs.current[cat.id] = el; }}
            className="mb-24 flex flex-col gap-8"
          >
            {catIdx % 2 === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative overflow-hidden rounded-3xl"
              >
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${cat.image}')` }} />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0F2447]/95 via-[#0F2447]/80 to-[#0F2447]/40" />
                <div className="relative z-10 flex flex-col gap-4 p-10 md:p-14">
                  <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-xs font-semibold uppercase tracking-[0.2em] text-[#06B6D4]">{cat.count}</motion.div>
                  <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="text-3xl font-bold text-white md:text-4xl">{cat.title}</motion.h2>
                  <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="h-1 w-16 origin-left rounded-full bg-white" />
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="flex items-end justify-between border-b border-[#E5E7EB] pb-6"
              >
                <div className="flex flex-col gap-3">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1E3A8A]">{cat.count}</div>
                  <h2 className="text-3xl font-bold text-[#0F2447]">{cat.title}</h2>
                </div>
                <div className="h-1 w-16 rounded-full bg-gradient-to-r from-[#1E3A8A] to-[#06B6D4]" />
              </motion.div>
            )}

            {catIdx === 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {getCategoryDocuments(categoryDocuments, cat.id).map((doc, idx) => (
                  <DocumentCard key={idx} title={doc.title} meta={doc.meta} image={documentCardImages[idx % documentCardImages.length]} index={idx} />
                ))}
              </div>
            ) : catIdx === 1 ? (
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {getCategoryDocuments(categoryDocuments, cat.id).slice(0, 2).map((doc, idx) => (
                    <DocumentCard key={idx} title={doc.title} meta={doc.meta} image={documentCardImages[idx % documentCardImages.length]} index={idx} />
                  ))}
                </div>
                <div className="row-span-2">
                  {getCategoryDocuments(categoryDocuments, cat.id)[2] ? (
                    <DocumentCard title={getCategoryDocuments(categoryDocuments, cat.id)[2].title} meta={getCategoryDocuments(categoryDocuments, cat.id)[2].meta} image={documentCardImages[2]} index={2} />
                  ) : null}
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {getCategoryDocuments(categoryDocuments, cat.id).slice(3).map((doc, idx) => (
                    <DocumentCard key={idx + 3} title={doc.title} meta={doc.meta} image={documentCardImages[(idx + 3) % documentCardImages.length]} index={idx + 3} />
                  ))}
                </div>
              </div>
            ) : catIdx === 2 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                {getCategoryDocuments(categoryDocuments, cat.id).map((doc, idx) => (
                  <DocumentCard key={idx} title={doc.title} meta={doc.meta} image={documentCardImages[idx % documentCardImages.length]} index={idx} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {getCategoryDocuments(categoryDocuments, cat.id).map((doc, idx) => (
                  <DocumentCard key={idx} title={doc.title} meta={doc.meta} image={documentCardImages[idx % documentCardImages.length]} index={idx} />
                ))}
              </div>
            )}
          </section>
        ))}

        <section className="mb-24 flex flex-col gap-8">
          <SectionHeading
            title="Судалгааны тайлангууд"
            body="Хамгийн сүүлийн үеийн судалгаа, тойм, үнэлгээний тайлангуудаас сонгон уншиж, татаж аваарай."
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reports.map((report, idx) => (
              <ReportCard key={report.title} title={report.title} body={report.body} image={report.image} index={idx} />
            ))}
          </div>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl"
        >
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${images.heroResearch}')` }} />
          <div className="absolute inset-0 bg-[#0F2447]/90" />
          <div className="relative z-10 flex flex-col items-center gap-6 p-16 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="max-w-2xl text-3xl font-bold text-white md:text-4xl">Судалгааны хамтын ажиллагаанд нэгдээрэй</motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}
            >
              <Link href="/en/contact" className="inline-block rounded-full bg-white px-8 py-4 text-sm font-semibold text-[#0F2447] transition-all duration-300 hover:bg-[#EFF6FF] hover:shadow-xl"
              >Холбоо барих</Link>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
