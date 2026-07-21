"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { images } from "@/lib/images";
import { CP_POST_LIST } from "@/graphql/cms/queries";
import { useQuery } from "@apollo/client/react";
import type { CpPostListData } from "@/graphql/cms/queries";
import { CMS_CATEGORIES } from "@/lib/cms-slots";


const slides = [images.heroHome, images.heroAbout, images.heroEvents];

export default function HomeHero() {

   const { data } = useQuery<CpPostListData>(CP_POST_LIST, {
      variables: {
        categoryIds: [CMS_CATEGORIES.hero],
        status: "published",
        language: "en",
      },
    });
    const posts = data?.cpPostList?.posts || [];
  
  const [index, setIndex] = useState(0);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="relative flex min-h-[85vh] w-full shrink-0 flex-col items-center justify-center gap-6 overflow-hidden px-[6vw] py-20 md:min-h-[90vh] md:py-24"
    >
      <AnimatePresence mode="popLayout">
        {slides.map((slide, i) =>
          i === index ? (
            <motion.div
              key={slide}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `linear-gradient(180deg,rgba(15,36,71,0.4) 0%,rgba(15,36,71,0.7) 50%,rgba(15,36,71,0.95) 100%),url('${slide}')`,
              }}
            />
          ) : null
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, staggerChildren: 0.12, delayChildren: 0.3 }}
        className="relative z-10 flex flex-col items-center gap-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 40, letterSpacing: "0.4em" }}
          animate={{ opacity: 1, y: 0, letterSpacing: "0.25em" }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-sm font-semibold tracking-[0.25em] text-white/80"
        >
          ДАЛАЙД ГАРЦГҮЙ ХӨГЖИЖ БУЙ ОРНУУДЫН
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 80, filter: "blur(16px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.3, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[1000px] text-center text-[clamp(44px,6vw,84px)] font-bold leading-[1.05] text-white"
        >
          ОЛОН УЛСЫН СУДАЛГААНЫ ТӨВ
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="h-1 w-20 rounded-full bg-gradient-to-r from-white to-[#06B6D4]"
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="max-w-[760px] text-center text-base font-normal leading-7 text-white/80"
          dangerouslySetInnerHTML={{ __html: posts[0]?.content || "" }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.2 }}
        >
          <Link
            href="/about-brief-history"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-white px-10 py-4 text-sm font-semibold text-[#0F2447] shadow-[0_4px_20px_rgba(0,0,0,0.1)] transition-all duration-500 hover:shadow-[0_12px_40px_rgba(30,58,138,0.25)] hover:-translate-y-1"
          >
            <span className="relative z-10 transition-transform duration-300 group-hover:scale-105">Дэлгэрэнгүй</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.4 }}
          className="mt-6 flex w-full flex-row items-center justify-between"
        >
          <motion.button
            whileHover={{ scale: 1.15, x: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={prev}
            aria-label="Previous slide"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md transition-colors duration-300 hover:bg-white/25"
          >
            <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>

          <div className="flex flex-row items-center gap-3">
            {slides.map((_, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.2 }}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`hero-dot rounded-full transition-all duration-300 ${
                  i === index
                    ? "h-2.5 w-2.5 bg-white"
                    : "h-2 w-2 bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.15, x: 3 }}
            whileTap={{ scale: 0.95 }}
            onClick={next}
            aria-label="Next slide"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md transition-colors duration-300 hover:bg-white/25"
          >
            <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
