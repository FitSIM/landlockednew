"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "./SearchBar";
import { useMenus } from "@/lib/hooks/useCms";

const defaultNav = [
  { label: "Home", url: "/" },
  { label: "About", url: "/about-brief-history" },
  { label: "LLDCs", url: "/lldcs-vienna" },
  { label: "Research", url: "/research" },
  { label: "Events", url: "/events" },
  { label: "Reports", url: "/reports" },
  { label: "Support", url: "/support" },
  { label: "E-Library", url: "/e-library" },
  { label: "Photos", url: "/photos" },
  { label: "Youth Advisory", url: "/youth-advisory" },
  { label: "Partners", url: "/partner-institutions" },
  { label: "Contact", url: "/contact" },
  { label: "Site Map", url: "/site-map" },
];

function isHomeItem(item: { label?: string; url?: string }) {
  const label = (item.label ?? "").toLowerCase().trim();
  const url = (item.url ?? "").trim();
  return (
    label === "home" ||
    label === "нүүр" ||
    label === "нүүр хуудас" ||
    url === "/" ||
    url === `/en` ||
    url === ""
  );
}

function formatNavLabel(label?: string) {
  if (!label) return "";
  return label.toUpperCase();
}

function MagneticLink({
  href,
  children,
  isActive,
  dark,
}: {
  href: string;
  children: React.ReactNode;
  isActive: boolean;
  dark: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0, 0)";
  };

  return (
    <Link
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative px-0.5 py-2 text-[12px] font-semibold tracking-[0.02em] whitespace-nowrap transition-colors duration-300 2xl:px-1 2xl:text-[13px] ${
        dark
          ? isActive
            ? "text-white"
            : "text-white/80 hover:text-white"
          : isActive
            ? "text-[#1E3A8A]"
            : "text-[#111827]/80 hover:text-[#1E3A8A]"
      }`}
      style={{ transition: "transform 0.2s cubic-bezier(0.22, 1, 0.36, 1)" }}
    >
      <span className="relative z-10">{children}</span>
      <span
        className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#06B6D4] to-[#1E3A8A] transition-all duration-300 ease-out ${
          isActive ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
    </Link>
  );
}

export default function Header({ locale }: { locale: string }) {
  const initialNav = useMenus("header");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const nav = useMemo(() => {
    if (!initialNav || initialNav.length < 2) return defaultNav;
    const seen = new Set<string>();
    const cmsItems = initialNav
      .slice()
      .sort((a, b) => ((a.order ?? 0) > (b.order ?? 0) ? 1 : -1))
      .filter((item) => !isHomeItem(item))
      .map((item) => ({
        label: item.label || "",
        url: item.url || "",
      }))
      .filter((item) => {
        const normalized = item.url.replace(new RegExp(`^/${locale}`), "") || "/";
        if (seen.has(normalized)) return false;
        seen.add(normalized);
        return true;
      });
    const hasYouth = cmsItems.some((item) => item.url === "/youth-advisory");
    const withoutYouth = cmsItems.filter((item) => item.url !== "/youth-advisory");
    const partnerIndex = withoutYouth.findIndex((item) => item.url === "/partner-institutions");
    const insertIndex = partnerIndex >= 0 ? partnerIndex : withoutYouth.length;
    const merged = hasYouth ? cmsItems : [
      ...withoutYouth.slice(0, insertIndex),
      { label: "Youth Advisory", url: "/youth-advisory" },
      ...withoutYouth.slice(insertIndex),
    ];
    const hasHome = merged.some((item) => item.url === "/" || item.url === `/${locale}` || item.url === "");
    return hasHome ? merged : [{ label: "HOME", url: "/" }, ...merged];
  }, [initialNav, locale]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`sticky top-0 z-50 h-[86px] w-full transition-all duration-500 ${
          scrolled
            ? "border-b border-white/10 bg-[#0F2447]/90 shadow-[0px_8px_40px_rgba(5,10,20,0.25)] backdrop-blur-xl"
            : "bg-white shadow-[0px_2px_8px_0px_#0000001A]"
        }`}
      >
        <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-6 lg:px-12"
        >
          <Link
            href={`/${locale}`}
            className={`group relative text-2xl font-bold whitespace-nowrap transition-colors duration-300 ${
              scrolled ? "text-white" : "text-[#1E3A8A]"
            }`}
          >
            <span className={`relative z-10 transition-all duration-300 ${scrolled ? "group-hover:text-white/80" : "group-hover:text-[#0F2447]"}`}>
              LLDC
            </span>
            <span className={`absolute -inset-2 -z-10 rounded-lg opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-30 ${scrolled ? "bg-white" : "bg-[#1E3A8A]"}`} />
          </Link>

          <nav className="hidden items-center gap-1 2xl:gap-2 xl:flex"
          >
            <AnimatePresence mode="popLayout">
              {nav.map((item, idx) => {
                const rawUrl = item.url || "/";
                const href =
                  rawUrl === "/" ? `/${locale}` : `/${locale}${rawUrl}`;
                const isActive =
                  href === `/${locale}`
                    ? pathname === href
                    : pathname === href || pathname.startsWith(`${href}/`);
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.4 + idx * 0.05,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <MagneticLink href={href} isActive={isActive} dark={scrolled}>
                      {formatNavLabel(item.label)}
                    </MagneticLink>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </nav>

          <div className="flex items-center gap-3"
          >
            <SearchBar dark={scrolled} />

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border transition-colors duration-300 xl:hidden ${
                scrolled ? "border-white/30 text-white" : "border-current text-[#111827]"
              }`}
              aria-label="Toggle menu"
            >
              <span
                className={`h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                  mobileOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                  mobileOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-[86px] z-40 border-b border-white/10 bg-[#0F2447]/95 p-6 shadow-2xl backdrop-blur-xl xl:hidden"
          >
            <nav className="flex flex-col gap-4"
            >
              {nav.map((item) => {
                const rawUrl = item.url || "/";
                const href =
                  rawUrl === "/" ? `/${locale}` : `/${locale}${rawUrl}`;
                const isActive = pathname === href || pathname.startsWith(`${href}/`);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={`text-sm font-semibold tracking-wide transition-colors ${
                      isActive
                        ? "text-white"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    {formatNavLabel(item.label)}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
