"use client";

import { motion } from "framer-motion";

interface LuxuryHeroProps {
  title: string;
  eyebrow?: string;
  body?: string;
  image: string;
  minHeight?: string;
  align?: "left" | "center";
}

export default function LuxuryHero({
  title,
  eyebrow,
  body,
  image,
  minHeight = "70vh",
  align = "left",
}: LuxuryHeroProps) {
  return (
    <section className="luxury-hero" style={{ minHeight }}>
      <motion.div
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
        className="luxury-hero__bg"
        style={{ backgroundImage: `url('${image}')` }}
      />
      <div className="luxury-hero__overlay" />

      <div
        className="luxury-hero__content"
        style={{ alignItems: align === "center" ? "center" : "flex-start", textAlign: align }}
      >
        {eyebrow && (
          <motion.div
            initial={{ opacity: 0, y: 30, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, y: 0, letterSpacing: "0.22em" }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            className="luxury-hero__eyebrow"
          >
            {eyebrow}
          </motion.div>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 70, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.1, delay: 0.35, ease: "easeOut" }}
          className="luxury-hero__title"
        >
          {title}
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="luxury-hero__divider"
          style={{ transformOrigin: align === "center" ? "center" : "left" }}
        />
        {body && (
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.85 }}
            className="luxury-hero__body"
          >
            {body}
          </motion.p>
        )}
      </div>
    </section>
  );
}
