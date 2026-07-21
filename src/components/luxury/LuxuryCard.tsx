"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";

interface LuxuryCardProps {
  title: string;
  body?: string;
  eyebrow?: string;
  image: string;
  cta?: string;
  href?: string;
  onClick?: () => void;
  variant?: "default" | "glass" | "editorial";
  minHeight?: string;
  children?: ReactNode;
  index?: number;
}

export default function LuxuryCard({
  title,
  body,
  eyebrow,
  image,
  cta,
  href,
  onClick,
  variant = "default",
  minHeight = "380px",
  children,
  index = 0,
}: LuxuryCardProps) {
  const baseClass = `luxury-card luxury-card--${variant}`;

  const cardContent = (
    <>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${image}')`, zIndex: 0 }}
      />
      <div className="luxury-card__content">
        {eyebrow && <div className="luxury-card__eyebrow">{eyebrow}</div>}
        <div className="luxury-card__title">{title}</div>
        {body && <div className="luxury-card__body">{body}</div>}
        {cta && <div className="luxury-card__cta">{cta}</div>}
        {children}
      </div>
    </>
  );

  const sharedProps = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: {
      duration: 0.8,
      delay: index * 0.1,
      ease: "easeOut" as const,
    },
    whileHover: { y: -10 },
    className: baseClass,
    style: { minHeight },
  };

  if (href) {
    return (
      <Link href={href} className="block">
        <motion.div {...sharedProps} className={`${baseClass} block cursor-pointer`}>
          {cardContent}
        </motion.div>
      </Link>
    );
  }

  return (
    <motion.div
      {...sharedProps}
      onClick={onClick}
      style={{ minHeight, cursor: onClick ? "pointer" : "default" }}
    >
      {cardContent}
    </motion.div>
  );
}
