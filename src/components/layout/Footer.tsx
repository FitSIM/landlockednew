"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLocale } from "next-intl";
import { staggerContainer, fadeInUp, lineReveal } from "@/components/motion/animations";
import { useMenus, useSlotPosts, fieldsOf } from "@/lib/hooks/useCms";
import { CMS_CATEGORIES } from "@/lib/cms-slots";

const footerLinks = [
  {
    title: "About",
    links: [
      { label: "Brief History", href: "/en/about-brief-history" },
      { label: "Executive Greeting", href: "/en/about-executive-greeting" },
      { label: "Goals", href: "/en/about-goals" },
      { label: "Multilateral Agreement", href: "/en/about-multilateral-agreement" },
    ],
  },
  {
    title: "LLDCs",
    links: [
      { label: "LLDCs Vienna", href: "/en/lldcs-vienna" },
      { label: "LLDCs Awaza", href: "/en/lldcs-awaza" },
      { label: "Priority 1", href: "/en/priority-1" },
      { label: "Priority 2", href: "/en/priority-2" },
      { label: "Priority 3", href: "/en/priority-3" },
    ],
  },
  {
    title: "Knowledge",
    links: [
      { label: "Research", href: "/en/research" },
      { label: "Reports", href: "/en/reports" },
      { label: "E-Library", href: "/en/e-library" },
    ],
  },
  {
    title: "Activities",
    links: [
      { label: "Events", href: "/en/events" },
      { label: "Photos", href: "/en/photos" },
      { label: "Youth Advisory", href: "/en/youth-advisory" },
      { label: "News", href: "/en/news" },
    ],
  },
  {
    title: "Cooperation",
    links: [
      { label: "Support", href: "/en/support" },
      { label: "Partner Institutions", href: "/en/partner-institutions" },
      { label: "Contact", href: "/en/contact" },
    ],
  },
];

const socials = [
  { label: "Facebook", href: "#" },
  { label: "X / Twitter", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "Instagram", href: "#" },
];

const legalLinks = [
  { label: "Terms", href: "/en/terms" },
  { label: "Privacy", href: "/en/privacy" },
  { label: "Site Map", href: "/en/site-map" },
];

function SocialIcon({ label }: { label: string }) {
  const icons: Record<string, string> = {
    Facebook:
      "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
    "X / Twitter":
      "M4 4l11.733 16h4.267l-11.733 -16z M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772",
    LinkedIn:
      "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
    YouTube:
      "M2 8a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z M10 15l5-3-5-3v6z",
    Instagram:
      "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z",
  };
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-label={label}
    >
      {label === "X / Twitter" ? (
        <path fill="currentColor" d={icons[label]} />
      ) : (
        <path fill="currentColor" d={icons[label]} />
      )}
    </svg>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
      <Link
        href={href}
        className="group relative inline-block text-[14px] text-white/65 transition-colors duration-300 hover:text-white"
      >
        <span className="relative z-10">{children}</span>
        <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-white transition-all duration-300 ease-out group-hover:w-full" />
      </Link>
    </motion.div>
  );
}

export default function Footer() {
  const locale = useLocale();
  const cmsMenu = useMenus("footer", locale);
  const { posts: contactPosts } = useSlotPosts(CMS_CATEGORIES.contactInfo);

  // Contact block + org description come live from the contact-info post
  // (the v1 seed copy lost its fields, so pick the post that has them).
  const contact = useMemo(() => {
    const post = contactPosts.find((p) => fieldsOf(p).address);
    const m = post ? fieldsOf(post) : null;
    return {
      description:
        m?.orgDescription ||
        "International Research Center of Landlocked Developing Countries. We work in policy research, knowledge hub, and international cooperation.",
      address: m?.address || "Ulaanbaatar, Mongolia",
      phone: m?.phone || "+976-11-123456",
      email: m?.email || "info@lldc.org",
    };
  }, [contactPosts]);

  // Link labels come live from the erxes footer menu (matched by URL); the
  // hardcoded groups remain as the fallback when the menu is unavailable.
  const groups = useMemo(() => {
    if (!cmsMenu || cmsMenu.length === 0) return footerLinks;
    const labelByUrl = new Map(
      cmsMenu.map((m) => [
        (m.url ?? "").replace(new RegExp(`^/${locale}`), "") || "/",
        m.label,
      ]),
    );
    return footerLinks.map((group) => ({
      ...group,
      links: group.links.map((link) => {
        const key = link.href.replace(new RegExp(`^/${locale}`), "") || "/";
        const cmsLabel = labelByUrl.get(key);
        return cmsLabel ? { ...link, label: cmsLabel } : link;
      }),
    }));
  }, [cmsMenu, locale]);

  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="w-full bg-gradient-to-b from-[#0F2447] to-[#05070a]"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 py-16 lg:px-12">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-12 lg:grid-cols-12"
        >
          <motion.div variants={fadeInUp} className="flex flex-col gap-6 lg:col-span-3">
            <motion.div
              className="text-3xl font-bold text-white"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              LLDC
            </motion.div>
            <div className="text-[14px] leading-[24px] text-white/55">
              {contact.description}
            </div>

            <div className="flex flex-col gap-3 text-[14px] text-white/55">
              <div>{contact.address}</div>
              <div>{contact.phone}</div>
              <div>{contact.email}</div>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-x-12 gap-y-10 sm:grid-cols-3 lg:col-span-9 lg:grid-cols-5">
            {groups.map((group) => (
              <div key={group.title} className="flex flex-col gap-5">
                <div className="text-xs font-semibold uppercase tracking-wider text-white/40">
                  {group.title}
                </div>
                <div className="flex flex-col gap-3.5">
                  {group.links.map((link) => (
                    <FooterLink key={link.href} href={link.href}>
                      {link.label}
                    </FooterLink>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          variants={lineReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="my-10 h-[1px] w-full origin-left bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center justify-between gap-6 text-[13px] text-white/40 md:flex-row"
        >
          <div className="flex items-center gap-4">
            <div>© 2026 LLDC. All rights reserved.</div>
            <div className="flex gap-2">
              {socials.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/60 transition-colors duration-300 hover:border-white/30 hover:bg-white/10 hover:text-white"
                  aria-label={social.label}
                >
                  <SocialIcon label={social.label} />
                </motion.a>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
