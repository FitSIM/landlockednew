"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation, Variants } from "framer-motion";

function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  const variants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
        delay,
      },
    },
  };

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={variants} className={className}>
      {children}
    </motion.div>
  );
}

function StaggerContainer({
  children,
  className = "",
  stagger = 0.1,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let lenis: any;
    import("lenis").then((LenisMod) => {
      const Lenis = LenisMod.default;
      lenis = new Lenis({
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 2,
        wheelMultiplier: 1,
      });

      let currentVelocity = 0;
      function raf(time: number) {
        lenis.raf(time);
        currentVelocity = lenis.velocity || 0;
        const skew = Math.max(-2, Math.min(2, currentVelocity * 0.02));
        document.body.style.setProperty("--scroll-skew", `${skew}deg`);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    });

    return () => {
      if (lenis) lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

export { AnimatedSection, StaggerContainer, StaggerItem };
