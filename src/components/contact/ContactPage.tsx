"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import LuxuryHero from "@/components/luxury/LuxuryHero";
import { images } from "@/lib/images";
import { AnimatedText, MagneticButton, ParallaxImage } from "@/components/motion/animations";
import { useSlotPosts, fieldsOf } from "@/lib/hooks/useCms";
import { CMS_CATEGORIES } from "@/lib/cms-slots";

const fallbackContactInfo = [
  { label: "Хаяг", value: "Улаанбаатар хот, Монгол Улс" },
  { label: "Утас", value: "+976-11-123456" },
  { label: "И-мэйл", value: "info@lldc.org" },
  { label: "Сошиал хуудас", value: "@LLDCResearch" },
];

const formFields = [
  { label: "Овог/Нэр", type: "text" },
  { label: "И-мэйл", type: "email" },
  { label: "Утас", type: "tel" },
];

export default function ContactPage() {
  const { posts: contactPosts } = useSlotPosts(CMS_CATEGORIES.contactInfo);

  // Contact details come live from the contact-info post's custom fields
  // (the v1 seed copy lost its fields, so pick the post that has them).
  const contactInfo = useMemo(() => {
    const post = contactPosts.find((p) => fieldsOf(p).address);
    const m = post ? fieldsOf(post) : null;
    if (!m) return fallbackContactInfo;
    return [
      { label: "Хаяг", value: m.address || "" },
      { label: "Утас", value: m.phone || "" },
      { label: "И-мэйл", value: m.email || "" },
      { label: "Сошиал хуудас", value: m.social || "" },
    ];
  }, [contactPosts]);
  return (
    <div className="w-full">
      <LuxuryHero
        title="Холбоо барих"
        eyebrow="Холбогдох"
        body="Манай багтай холбогдох, хамтын ажиллагаа, судалгааны санал хүлээн авах."
        image={images.heroContact}
        minHeight="70vh"
      />

      <div className="luxury-section">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-5 lg:col-span-5"
          >
            {contactInfo.map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8, boxShadow: "0 20px 50px rgba(15,36,71,0.14)" }}
                className="group relative flex flex-col gap-1 overflow-hidden rounded-2xl border-l-4 border-[#1E3A8A] bg-white p-6 shadow-[0_8px_30px_rgba(15,36,71,0.08)] transition-all duration-300"
              >
                <div className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">{item.label}</div>
                <div className="text-lg font-bold text-[#0F2447]">{item.value}</div>
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#1E3A8A] to-[#06B6D4]"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <motion.form
              className="flex flex-col gap-5 rounded-3xl border border-white/50 bg-gradient-to-br from-white to-[#f5f7fb] p-8 shadow-[0_20px_60px_rgba(15,36,71,0.1)] md:p-10"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <AnimatedText>
                <div className="text-2xl font-bold text-[#0F2447]">Бидэнд бичих</div>
              </AnimatedText>
              <motion.div
                className="h-1 w-12 origin-left rounded-full bg-gradient-to-r from-[#1E3A8A] to-[#06B6D4]"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />

              {formFields.map((field, idx) => (
                <motion.div
                  key={field.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + idx * 0.08 }}
                  className="flex flex-col gap-2"
                >
                  <label className="text-sm font-medium text-[#0F2447]">{field.label}</label>
                  <motion.input
                    type={field.type}
                    className="h-12 rounded-xl border border-[#E5E7EB] bg-white px-4 text-sm text-[#111827] outline-none transition-all duration-300 focus:border-[#1E3A8A]"
                    whileFocus={{ scale: 1.01, boxShadow: "0 0 0 3px rgba(30,58,138,0.12)" }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-col gap-2"
              >
                <label className="text-sm font-medium text-[#0F2447]">Мессеж</label>
                <motion.textarea
                  rows={5}
                  className="resize-none rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#111827] outline-none transition-all duration-300 focus:border-[#1E3A8A]"
                  whileFocus={{ scale: 1.01, boxShadow: "0 0 0 3px rgba(30,58,138,0.12)" }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>

              <MagneticButton className="mt-2 h-14 rounded-xl bg-gradient-to-r from-[#1E3A8A] to-[#0F2447] text-base font-semibold text-white shadow-lg">
                Илгээх
              </MagneticButton>
            </motion.form>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative mt-20 min-h-[420px] overflow-hidden rounded-3xl"
        >
          <ParallaxImage src={images.heroContact} alt="Холбоо барих" className="absolute inset-0" speed={0.4} />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F2447]/95 to-[#1E3A8A]/80" />
          <div className="relative z-10 flex min-h-[420px] flex-col items-center justify-center gap-5 p-12 text-center">
            <AnimatedText>
              <div className="text-2xl font-bold text-white md:text-3xl">Хамтран ажиллахыг хүсэж байна уу?</div>
            </AnimatedText>
            <AnimatedText delay={0.2}>
              <div className="max-w-2xl text-white/80">
                Бид тантай холбогдохыг хүлээж байна. Та доорх мэдээллийг бөглөх эсвэл шууд холбогдох
                боломжтой.
              </div>
            </AnimatedText>
            <MagneticButton className="mt-2 rounded-full border border-white/40 bg-white/10 px-8 py-3 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white hover:text-[#0F2447]">
              Бидэнтэй холбогдох
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
