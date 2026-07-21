"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@apollo/client/react";
import { CP_PAGES } from "@/graphql/cms/queries";
import type { CpPagesData } from "@/graphql/cms/queries";

const fallbackPages = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about-brief-history" },
  { label: "Executive Greeting", path: "/about-executive-greeting" },
  { label: "Goals", path: "/about-goals" },
  { label: "Multilateral Agreement", path: "/about-multilateral-agreement" },
  { label: "LLDCs Vienna", path: "/lldcs-vienna" },
  { label: "LLDCs Awaza", path: "/lldcs-awaza" },
  { label: "Priority 1", path: "/priority-1" },
  { label: "Priority 2", path: "/priority-2" },
  { label: "Priority 3", path: "/priority-3" },
  { label: "Priority 4", path: "/priority-4" },
  { label: "Priority 5", path: "/priority-5" },
  { label: "Events", path: "/events" },
  { label: "Research", path: "/research" },
  { label: "Reports", path: "/reports" },
  { label: "Support", path: "/support" },
  { label: "E-Library", path: "/e-library" },
  { label: "Photos", path: "/photos" },
  { label: "Partner Institutions", path: "/partner-institutions" },
  { label: "Contact", path: "/contact" },
  { label: "Site Map", path: "/site-map" },
];

export default function SearchBar({ dark = false }: { dark?: boolean }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const { data } = useQuery<CpPagesData>(CP_PAGES, {
    variables: { language: "en" },
  });

  // Live page list from erxes; falls back to the static list when the CMS
  // is unreachable or has no pages.
  const pages = useMemo(() => {
    const cmsPages = data?.cpPages;
    if (!cmsPages || cmsPages.length === 0) return fallbackPages;
    return cmsPages
      .filter((p) => p.slug)
      .map((p) => {
        const slug = (p.slug ?? "").replace(/_\d+$/, "");
        return { label: p.name || slug, path: slug === "home" ? "/" : `/${slug}` };
      });
  }, [data]);

  const filtered = query.trim()
    ? pages.filter((p) => p.label.toLowerCase().includes(query.toLowerCase()))
    : [];

  function go(path: string) {
    router.push(path);
    setQuery("");
    setOpen(false);
    setFocused(false);
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative"
    >
      <motion.div
        animate={{
          width: focused ? 260 : 200,
          boxShadow: focused
            ? "0 0 0 2px rgba(30, 58, 138, 0.25), 0 8px 30px rgba(15, 36, 71, 0.15)"
            : "0 0 0 0px rgba(30, 58, 138, 0)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className={`flex h-10 items-center rounded-full border px-4 backdrop-blur-md transition-colors duration-300 ${
          dark
            ? "border-white/20 bg-white/10 text-white"
            : "border-gray-200 bg-white/80 text-[#111827]"
        }`}
      >
        <svg
          className={`mr-2 h-4 w-4 shrink-0 ${dark ? "text-white/60" : "text-gray-400"}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => {
            setFocused(true);
            if (query.trim()) setOpen(true);
          }}
          onBlur={() => {
            setFocused(false);
          }}
          placeholder="Search pages..."
          className={`h-full w-full bg-transparent text-[13px] outline-none placeholder:transition-colors ${
            dark
              ? "text-white placeholder:text-white/50"
              : "text-[#111827] placeholder:text-gray-400"
          }`}
        />
      </motion.div>

      <AnimatePresence>
        {open && filtered.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-12 z-50 w-72 overflow-hidden rounded-2xl border border-white/10 bg-[#0F2447]/95 py-2 shadow-[0_20px_50px_rgba(5,10,20,0.35)] backdrop-blur-xl"
          >
            {filtered.map((p, idx) => (
              <motion.button
                key={p.path}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.03 }}
                onClick={() => go(p.path)}
                className="group relative w-full px-4 py-2.5 text-left text-[13px] text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                <span className="relative z-10">{p.label}</span>
                <span className="absolute inset-y-0 left-0 w-[3px] scale-y-0 bg-gradient-to-b from-[#1E3A8A] to-[#06B6D4] transition-transform duration-200 group-hover:scale-y-100" />
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
