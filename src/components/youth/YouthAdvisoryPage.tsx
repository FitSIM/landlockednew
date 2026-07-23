"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import LuxuryHero from "@/components/luxury/LuxuryHero";
import { images, documentCardImages } from "@/lib/images";
import { AnimatedText, MagneticButton } from "@/components/motion/animations";
import { usePosts, useSlotPosts, contentBlocks } from "@/lib/hooks/useCms";
import { CMS_CATEGORIES } from "@/lib/cms-slots";

const fallbackUpdates = [
  {
    title: "Залуучуудын зөвлөлийн шинэ стратеги батлагдлаа",
    date: "2025.06.15",
    excerpt: "2025-2028 оны стратегийн төлөвлөгөө батлагдаж, залуучуудын оролцоог олон улсын бодлогод нэмэгдүүлэх зорилтууд тодорхой боллоо.",
    slug: "news-youth-strategy-2025",
  },
  {
    title: "Олон улсын залуучуудын форум Женевт амжилттай боллоо",
    date: "2025.05.20",
    excerpt: "Гишүүн орнуудын залуу манлайлагчид уулзаж, хамтын ажиллагаа, чадавхжуулалт, бодлогын санал хэлэлцлээ.",
    slug: "news-youth-forum-geneva",
  },
  {
    title: "Залуу манлайлагчдын чуулган 2025 бүртгэлээ эхлүүллээ",
    date: "2025.04.10",
    excerpt: "Улаанбаатар хотод зохион байгуулагдах чуулганд оролцох бүртгэл нээгдэж, хөтөлбөрийн дэлгэрэнгүй мэдээлэл гарлаа.",
    slug: "news-youth-leaders-congress-2025",
  },
];

function formatUpdateDate(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

const updateSlides = [
  { image: images.heroEvents, alt: "Залуучуудын форум" },
  { image: documentCardImages[1], alt: "Манлайлагчдын чуулган" },
  { image: documentCardImages[2], alt: "Сургалт, семинар" },
];

type YouthEvent = {
  title: string;
  tag: string;
  body: string;
  location: string;
  date: string;
  image: string;
  fullInfo: string;
  outcomes: string[];
  speakers: string[];
  schedule: string[];
};

const fallbackYouthEvents: YouthEvent[] = [
  {
    title: "Залуу манлайлагчдын чуулган",
    tag: "Чуулган",
    body: "Инновац, залуучуудын оролцоо, хөгжлийн бодлого, уур амьсгалын дасан зохицолт, дижитал шилжилтийн чиглэлээр залуу манлайлагчдын чуулган болно.",
    location: "Улаанбаатар",
    date: "2024.12.15",
    image: documentCardImages[0],
    fullInfo: "Залуу манлайлагчдын чуулган нь далайд гарцгүй хөгжиж буй орнуудын залуучуудын оролцоо, манлайлал, инновацын чадавжийг дэмжих зорилготой. Чуулганд гишүүн улсуудын залуу манлайлагчид, бодлогын боловсруулагчид, олон улсын байгууллагын төлөөлөгчид оролцоно.",
    outcomes: [
      "50+ залуу манлайлагч оролцоно",
      "5 салбар хэлэлцүүлэг өрнөнө",
      "Улаанбаатарын залуучуудын тунхаглал батлагдана",
    ],
    speakers: ["Др. Баттулга - Манлайлалын эксперт", "Сара Жонсон - НҮБ-ын залуучуудын түншлэлийн зохицуулагч", "Алтангэрэл - Залуучуудын зөвлөлийн гишүүн"],
    schedule: [
      "09:00 - Бүртгэл",
      "10:00 - Нээлтийн хуралдаан",
      "13:00 - Салбар хэлэлцүүлэг",
      "16:00 - Дүгнэлт, тунхаглал",
    ],
  },
  {
    title: "Бодлогын хэлэлцүүлэг",
    tag: "Хэлэлцүүлэг",
    body: "Далайд гарцгүй орнуудын залуучуудын оролцоо, чадавхжуулалт, бодлогын судалгааны үр дүнг хэлэлцэнэ.",
    location: "Вена",
    date: "2025.02.20",
    image: documentCardImages[1],
    fullInfo: "Бодлогын хэлэлцүүлэг нь далайд гарцгүй хөгжиж буй орнуудын залуучуудын бодлогын оролцоог нэмэгдүүлэх, чадавхжуулах, олон улсын тавцанд дуу хоолойг тусгах зорилготой. Судалгааны үр дүнг танилцуулж, бодлогын зөвлөмж батлана.",
    outcomes: [
      "Залуучуудын бодлогын зөвлөмж батлагдана",
      "Олон улсын түншлэлийн гэрээнд тусгагдана",
      "Судалгааны тайлан нийтлэгдэнэ",
    ],
    speakers: ["Др. Мюллер - Венийн эдийн засгийн их сургууль", "Лхагва - Судалгааны хүрээлэнгийн захирал", "Энхболд - Залуучуудын бодлогын ажилтан"],
    schedule: [
      "10:00 - Судалгааны тойм",
      "12:00 - Хэлэлцүүлэг",
      "15:00 - Зөвлөмж боловсруулах",
    ],
  },
  {
    title: "Сургалт, семинар",
    tag: "Сургалт",
    body: "Манлайлал, чадавх бэхжүүлэх, олон улсын хамтын ажиллагаа, боловсрол, мэргэжлийн сургалтын чиглэлээр сургалт зохион байгуулна.",
    location: "Нью-Йорк",
    date: "2025.05.10",
    image: documentCardImages[2],
    fullInfo: "Сургалт, семинар нь залуу манлайлагчдын манлайлал, чадавхжуулалт, олон улсын хамтын ажиллагааны ур чадварыг хөгжүүлэхэд чиглэгдэнэ. Боловсрол, мэргэжлийн хөгжлийн чиглэлээр практик сургалт орно.",
    outcomes: [
      "100+ залуу манлайлагч сургалтанд хамрагдана",
      "Манлайлалын гарын авлага гаргана",
      "Салбарын менторын хөтөлбөр эхэлнэ",
    ],
    speakers: ["Др. Андерсон - Нью-Йоркийн их сургууль", "Болор - Манлайлалын сургагч", "Ганбат - Олон улсын хамтын ажиллагааны мэргэжилтэн"],
    schedule: [
      "09:00 - Нээлт",
      "10:30 - Манлайлалын сургалт",
      "14:00 - Хамтын ажиллагааны семинар",
    ],
  },
  {
    title: "Залуучуудын форум",
    tag: "Форум",
    body: "Залуу манлайлагчдын оролцоо, чадавхжуулалт, бодлогын судалгаа, сургалтын хөтөлбөрийн үр нөлөөг үнэлж, залуучуудын дуу хоолойг олон улсын хөгжлийн бодлогод тусгах.",
    location: "Аваза",
    date: "2025.08.22",
    image: documentCardImages[3],
    fullInfo: "Залуучуудын форум нь залуу манлайлагчдын оролцоо, чадавхжуулалт, бодлогын судалгаа, сургалтын хөтөлбөрийн үр нөлөөг үнэлэх, залуучуудын дуу хоолойг олон улсын хөгжлийн бодлогод тусгах зорилготой.",
    outcomes: [
      "200+ оролцогч уулзана",
      "Залуучуудын үр нөлөөний тайлан батлагдана",
      "Олон улсын хамтын ажиллагааны санал тавигдана",
    ],
    speakers: ["Др. Петров - Туркменистаны их сургууль", "Оюун - Залуучуудын зөвлөлийн дарга", "Хасан - Олон улсын хөгжлийн байгууллагын төлөөлөгч"],
    schedule: [
      "09:00 - Бүртгэл",
      "10:00 - Нээлтийн үйл ажиллагаа",
      "13:00 - Бодлогын хэлэлцүүлэг",
      "17:00 - Дүгнэлт",
    ],
  },
  {
    title: "Хөгжлийн түншлэлийн уулзалт",
    tag: "Уулзалт",
    body: "Инклюзив худалдаа, эдийн засгийн өсөлтийг тэгш хүртээх, эмэгтэйчүүд, залуучууд, хөдөөний иргэдийг худалдааны боломжоор хангах.",
    location: "Бангкок",
    date: "2025.11.05",
    image: documentCardImages[4],
    fullInfo: "Хөгжлийн түншлэлийн уулзалт нь инклюзив худалдаа, эдийн засгийн өсөлтийг тэгш хүртээх, эмэгтэйчүүд, залуучууд, хөдөөний иргэдийг худалдааны боломжоор хангах зорилготой. Түнш байгууллагуудын хамтын ажиллагааг бэхжүүлнэ.",
    outcomes: [
      "Түншлэлийн хөтөлбөрүүдэд санхүүжилт татна",
      "Жендерийн тэгш байдлын санал батлагдана",
      "Бүс нутгийн худалдааны коридорын төлөвлөгөө гаргана",
    ],
    speakers: ["Др. Суварн - Бангкокийн худалдааны институт", "Номин - Жендерийн тэгш байдлын мэргэжилтэн", "Төмөр - Хөгжлийн түншлэлийн зохицуулагч"],
    schedule: [
      "10:00 - Нээлт",
      "11:30 - Худалдааны боломж",
      "14:00 - Түншлэлийн хэлэлцээр",
    ],
  },
  {
    title: "Олон улсын залуучуудын форум",
    tag: "Форум",
    body: "Залуучуудын зөвлөлийн гишүүд олон улсын байгууллагуудтай уулзаж, хамтын ажиллагааны талаар хэлэлцэнэ.",
    location: "Женев",
    date: "2026.03.18",
    image: documentCardImages[5],
    fullInfo: "Олон улсын залуучуудын форум нь Залуучуудын зөвлөлийн гишүүд, олон улсын байгууллагуудын төлөөлөгчид уулзаж, хамтын ажиллагааны чиглэл, цаашдын төлөвлөгөө, санхүүжилтийн боломжуудыг хэлэлцэхэд чиглэгдэнэ.",
    outcomes: [
      "Олон улсын түншлэлийн хөтөлбөр батлагдана",
      "Залуучуудын зөвлөлийн 3 жилийн төлөвлөгөө батлагдана",
      "Санхүүжилтийн боломжууд тодорхой болно",
    ],
    speakers: ["Др. Мартин - Женевийн олон улсын харилцааны институт", "Сүхбаатар - Залуучуудын зөвлөлийн гишүүн", "Мария - Европын холбооны залуучуудын хөтөлбөрийн менежер"],
    schedule: [
      "09:00 - Бүртгэл",
      "10:00 - Нээлт",
      "13:00 - Олон улсын хамтын ажиллагаа",
      "16:00 - Дүгнэлт",
    ],
  },
];

function UpdateCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % updateSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#0F2447] shadow-[0_20px_60px_rgba(15,36,71,0.2)]"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${updateSlides[index].image}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F2447]/90 via-[#0F2447]/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <div className="text-xs font-semibold uppercase tracking-wider text-white/70">Онцлох</div>
            <div className="mt-1 text-lg font-bold">{updateSlides[index].alt}</div>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {updateSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all ${
              i === index ? "w-6 bg-white" : "w-2 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function EventModal({
  event,
  onClose,
}: {
  event: YouthEvent;
  onClose: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const originalTouchAction = document.body.style.touchAction;
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      document.body.style.touchAction = originalTouchAction;
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0F2447]/85 p-3 backdrop-blur-md"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[95vh] w-full max-w-5xl flex-col overflow-hidden rounded-[32px] bg-white shadow-[0_50px_120px_rgba(15,36,71,0.4)]"
      >
        <div className="relative h-40 w-full shrink-0 overflow-hidden md:h-52">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${event.image}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F2447]/95 via-[#0F2447]/50 to-transparent" />
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-[#0F2447] shadow-lg transition-all hover:scale-110 hover:bg-[#1E3A8A] hover:text-white"
            aria-label="Close"
          >
            ✕
          </button>
          <div className="absolute bottom-0 left-0 w-full p-6 text-white md:p-8">
            <div className="mb-2 w-fit rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
              {event.tag}
            </div>
            <h2 className="text-2xl font-bold leading-tight md:text-3xl">{event.title}</h2>
          </div>
        </div>

        <div
          ref={contentRef}
          className="flex-1 overflow-y-auto overscroll-contain p-6 md:p-8"
        >
          <div className="flex flex-wrap items-center gap-4 pb-5 text-sm font-medium text-[#6B7280]">
            <div className="flex items-center gap-2 rounded-full bg-[#EFF6FF] px-4 py-2 text-[#1E3A8A]">
              <span>●</span> {event.location}
            </div>
            <div className="flex items-center gap-2 rounded-full bg-[#F0FDFA] px-4 py-2 text-[#0D9488]">
              <span>●</span> {event.date}
            </div>
          </div>

          <div className="mb-7 text-[16px] leading-8 text-[#374151]">{event.fullInfo}</div>

          {event.outcomes && event.outcomes.length > 0 && (
            <div className="mb-7 rounded-2xl bg-gradient-to-br from-[#EFF6FF] to-white p-6">
              <div className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#1E3A8A]">
                Үр дүн, ололт
              </div>
              <ul className="flex flex-col gap-3">
                {event.outcomes.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[15px] text-[#374151]">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#06B6D4]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {event.speakers && event.speakers.length > 0 && (
            <div className="mb-7">
              <div className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#6B7280]">
                Илтгэгчид
              </div>
              <div className="flex flex-wrap gap-3">
                {event.speakers.map((speaker, idx) => (
                  <div
                    key={idx}
                    className="rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-medium text-[#374151] shadow-sm"
                  >
                    {speaker}
                  </div>
                ))}
              </div>
            </div>
          )}

          {event.schedule && event.schedule.length > 0 && (
            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
              <div className="mb-5 text-sm font-semibold uppercase tracking-wider text-[#1E3A8A]">
                Хөтөлбөр
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {event.schedule.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 rounded-xl bg-[#F8FAFC] p-4"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1E3A8A] text-xs font-bold text-white">
                      {idx + 1}
                    </div>
                    <div className="text-[15px] leading-6 text-[#374151]">{item}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-end">
            <button
              onClick={onClose}
              className="rounded-full bg-[#1E3A8A] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0F2447]"
            >
              Буцах
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function YouthAdvisoryPage() {
  const [selectedEvent, setSelectedEvent] = useState<YouthEvent | null>(null);
  const { posts: newsPosts } = usePosts("news");
  const { posts: youthEventPosts } = useSlotPosts(CMS_CATEGORIES.youth);

  // Youth events are the posts in the "Залуучуудын зөвлөл" category.
  // Content blocks: [0]=tag, [1]=date, [2]=location, [3]=body, [4]=fullInfo,
  // [5]=outcomes, [6]=speakers, [7]=schedule (list items one per line).
  const youthEvents = useMemo<YouthEvent[]>(() => {
    const valid = youthEventPosts.filter(
      (p) => contentBlocks(p.content).length >= 3,
    );
    if (!valid.length) return fallbackYouthEvents;
    const lines = (s?: string) => (s ? s.split("\n").filter(Boolean) : []);
    return valid.map((p) => {
      const b = contentBlocks(p.content);
      return {
        title: p.title || "",
        tag: b[0] || "",
        date: b[1] || "",
        location: b[2] || "",
        body: b[3] || (p.excerpt ?? ""),
        fullInfo: b[4] || "",
        outcomes: lines(b[5]),
        speakers: lines(b[6]),
        schedule: lines(b[7]),
        image: p.images?.[0]?.url || documentCardImages[0],
      };
    });
  }, [youthEventPosts]);

  // Youth news updates come live from erxes (news-youth-* posts); the
  // hardcoded list remains as the fallback when the CMS is unavailable.
  const latestUpdates = useMemo(() => {
    const youthNews = newsPosts.filter((p) => p.slug?.startsWith("news-youth"));
    if (!youthNews.length) return fallbackUpdates;
    return youthNews.slice(0, 3).map((p) => ({
      title: p.title || "",
      date: formatUpdateDate(p.publishedDate ?? p.createdAt),
      excerpt: p.excerpt || "",
      slug: p.slug || "",
    }));
  }, [newsPosts]);

  return (
    <div className="w-full">
      <LuxuryHero
        title="Youth Advisory"
        eyebrow="Залуучуудын зөвлөл"
        body="Залуучуудын оролцоо, чадавхжуулалт, манлайлалын хөтөлбөр, арга хэмжээ, чуулган, сургалт, төслүүд."
        image={images.heroEvents}
        minHeight="70vh"
      />

      <div className="luxury-section">
        {/* Latest Updates */}
        <section className="mt-20 flex flex-col gap-8"
        >
          <div className="flex items-end justify-between"
          >
            <div className="flex flex-col gap-3">
              <AnimatedText className="text-3xl font-bold text-[#0F2447]">Сүүлийн мэдээлэл</AnimatedText>
              <motion.div
                className="h-1 w-14 origin-left rounded-full bg-gradient-to-r from-[#1E3A8A] to-[#06B6D4]"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </div>
            <Link
              href="/en/events"
              className="rounded-full border border-[#1E3A8A] px-5 py-2 text-xs font-semibold text-[#1E3A8A] transition-all hover:bg-[#1E3A8A] hover:text-white"
            >
              Бүгдийг харах
            </Link>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2">
            <UpdateCarousel />
            <div className="flex flex-col justify-center gap-5">
              {latestUpdates.map((item, idx) => (
                <Link key={item.slug} href={`/en/${item.slug}`}>
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="group flex cursor-pointer flex-col gap-2 border-b border-[#E5E7EB] pb-5 last:border-0"
                  >
                    <div className="text-xs font-semibold text-[#06B6D4]">{item.date}</div>
                    <div className="text-lg font-bold text-[#0F2447] transition-colors group-hover:text-[#1E3A8A]">
                      {item.title}
                    </div>
                    <div className="text-sm leading-relaxed text-[#6B7280]">{item.excerpt}</div>
                    <div className="text-sm font-semibold text-[#1E3A8A]">Дэлгэрэнгүй →</div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Events */}
        <section className="mt-20 flex flex-col gap-6"
        >
          <div className="flex flex-col gap-3"
          >
            <AnimatedText className="text-3xl font-bold text-[#0F2447]">Арга хэмжээ</AnimatedText>
            <motion.div
              className="h-1 w-14 origin-left rounded-full bg-gradient-to-r from-[#1E3A8A] to-[#06B6D4]"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <AnimatedText delay={0.1} className="max-w-2xl text-[15px] leading-7 text-[#6B7280]"
            >
              Залуучуудын зөвлөлийн зохион байгуулж буй чуулган, форум, сургалт, уулзалтуудад оролцож,
              олон улсын хөгжлийн бодлогод залуучуудын дуу хоолойгоо нэмэрлээрэй.
            </AnimatedText>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {youthEvents.map((event, idx) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onClick={() => setSelectedEvent(event)}
                className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(15,36,71,0.08)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(15,36,71,0.12)]"
              >
                <div className="relative h-44 overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${event.image}')` }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.7 }}
                  />
                  <div className="absolute left-4 top-4 w-fit rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-[#1E3A8A] backdrop-blur-sm">
                    {event.tag}
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5"
                >
                  <div className="text-lg font-bold text-[#0F2447]">{event.title}</div>
                  <div className="text-sm leading-relaxed text-[#6B7280] line-clamp-3">{event.body}</div>
                  <div className="mt-auto flex flex-col gap-1 pt-3 text-sm text-[#6B7280]"
                  >
                    <div className="flex items-center gap-2"
                    >
                      <span className="text-[#1E3A8A]">●</span> {event.location}
                    </div>
                    <div className="flex items-center gap-2"
                    >
                      <span className="text-[#06B6D4]">●</span> {event.date}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <AnimatePresence>
            {selectedEvent && <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
          </AnimatePresence>
        </section>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mt-20 overflow-hidden rounded-3xl bg-[#0F2447]"
        >
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/5" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#1E3A8A]/20" />
          <div className="relative z-10 flex flex-col items-center justify-center gap-5 p-12 text-center"
          >
            <AnimatedText className="text-2xl font-bold text-white md:text-3xl"
            >
              Залуучуудын зөвлөлд нэгдээрэй
            </AnimatedText>
            <AnimatedText delay={0.1} className="max-w-2xl text-white/75"
            >
              Манлайлал, чадавхжуулалт, олон улсын хамтын ажиллагааны боломжуудыг ашиглаж, далайд
              гарцгүй хөгжиж буй орнуудын ирээдүйг бүтээхэд хамтран ажиллая.
            </AnimatedText>
            <MagneticButton className="mt-2 rounded-full bg-white px-8 py-3 text-sm font-semibold text-[#0F2447] shadow-lg transition-colors hover:bg-[#06B6D4] hover:text-white"
            >
              Холбогдох
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
