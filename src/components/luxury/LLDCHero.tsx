"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { images } from "@/lib/images";

interface LLDCHeroProps {
  active: "vienna" | "awaza";
}

const content = {
  vienna: {
    eyebrow: "ВЕНИЙН ҮЙЛ АЖИЛЛАГААНЫ ХӨТӨЛБӨР",
    title: "LLDCs Vienna",
    subtitle: "Венийн үйл ажиллагааны хөтөлбөр 2014-2024",
  },
  awaza: {
    eyebrow: "АВАЗЫН ҮЙЛ АЖИЛЛАГААНЫ ХӨТӨЛБӨР",
    title: "Авазын үйл ажиллагааны хөтөлбөр",
    subtitle: "Далайд гарцгүй хөгжиж буй орнуудын 2024-2034 оны стратегийн хүрээ",
  },
};

export default function LLDCHero({ active }: LLDCHeroProps) {
  const c = content[active];

  return (
    <section className="luxury-hero" style={{ minHeight: "70vh" }}
    >
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="luxury-hero__bg"
        style={{ backgroundImage: `url('${images.heroAbout}')` }}
      />
      <div className="luxury-hero__overlay" />

      <div className="luxury-hero__content items-center text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="luxury-hero__eyebrow"
        >
          {c.eyebrow}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: "easeOut" }}
          className="luxury-hero__title"
        >
          {c.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="luxury-hero__body"
        >
          {c.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-4 flex flex-row gap-4"
        >
          <Link
            href="/en/lldcs-vienna"
            className={`rounded-full px-7 py-3 text-sm font-semibold transition-all duration-300 ${
              active === "vienna"
                ? "bg-white text-[#0F2447]"
                : "border border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
            }`}
          >
            Венийн хөтөлбөр
          </Link>
          <Link
            href="/en/lldcs-awaza"
            className={`rounded-full px-7 py-3 text-sm font-semibold transition-all duration-300 ${
              active === "awaza"
                ? "bg-white text-[#0F2447]"
                : "border border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
            }`}
          >
            Авазын хөтөлбөр
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
