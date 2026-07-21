"use client";

import { useEffect, useRef } from "react";

export default function PageAnimator() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const page = document.querySelector(".pencil-page");
    if (!page) return;

    // Add staggered reveal delays to direct children
    const children = Array.from(page.children).filter(
      (el) => el instanceof HTMLElement
    ) as HTMLElement[];

    children.forEach((child, index) => {
      child.style.transitionDelay = `${Math.min(index * 0.08, 0.5)}s`;
    });

    // Set up magnetic buttons
    const magneticElements = document.querySelectorAll(
      '.pencil-page [class*="rounded-[999px]"], .pencil-page [data-pencil-name="CTA"]'
    );

    const handleMouseMove = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      const rect = el.getBoundingClientRect();
      const mouseEvent = e as MouseEvent;
      const x = ((mouseEvent.clientX - rect.left) / rect.width) * 100;
      const y = ((mouseEvent.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--mouse-x", `${x}%`);
      el.style.setProperty("--mouse-y", `${y}%`);
    };

    magneticElements.forEach((el) => {
      el.addEventListener("mousemove", handleMouseMove);
    });

    // Set up reveal observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("reveal-hidden");
            entry.target.classList.add("reveal-visible");
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -80px 0px" }
    );

    page.classList.add("reveal-hidden");
    observerRef.current.observe(page);

    // Observe individual images for clip-path reveal
    const images = document.querySelectorAll(
      '.pencil-page [data-pencil-name*="Thumb"], .pencil-page [data-pencil-name*="Photo"], .pencil-page [data-pencil-name*="Featured Image"]'
    );

    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.clipPath = "inset(0 0 0 0)";
            imageObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
    );

    images.forEach((img) => {
      (img as HTMLElement).style.clipPath = "inset(0 100% 0 0)";
      imageObserver.observe(img);
    });

    return () => {
      observerRef.current?.disconnect();
      imageObserver.disconnect();
      magneticElements.forEach((el) => {
        el.removeEventListener("mousemove", handleMouseMove);
      });
    };
  }, []);

  return null;
}
