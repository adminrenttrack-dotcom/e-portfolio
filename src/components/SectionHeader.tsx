"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  number: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  accent?: "green" | "yellow" | "blue" | "coral";
}

const badgeStyles = {
  green: "bg-[#1E4D3B] text-[#FFFDF7]",
  yellow: "bg-[#FBBF24] text-[#1C2420]",
  blue: "bg-[#38BDF8] text-[#102A3A]",
  coral: "bg-[#FB7185] text-white",
};

export function SectionHeader({
  number,
  eyebrow,
  title,
  subtitle,
  accent = "green",
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="mb-8 sm:mb-10"
    >
      <div className="mb-2.5 flex flex-wrap items-center gap-2.5">
        <span
          className={`inline-flex items-center rounded-xl px-3 py-1 font-heading text-xs font-bold tracking-wider shadow-xs ${badgeStyles[accent]}`}
        >
          SECTION {number}
        </span>
        <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#1E4D3B]/70">
          {eyebrow}
        </span>
      </div>
      <h2 className="font-heading text-2xl sm:text-4xl font-bold tracking-tight text-[#1E4D3B]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 max-w-2xl text-sm sm:text-base leading-relaxed text-[#1C2420]/75">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
