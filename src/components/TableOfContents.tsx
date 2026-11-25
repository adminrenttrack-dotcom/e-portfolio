"use client";

import { motion } from "framer-motion";
import { navSections } from "@/src/data/portfolioData";
import { SectionHeader } from "./SectionHeader";

const numberColors = {
  green: "text-[#1E4D3B]",
  yellow: "text-[#B45309]",
  blue: "text-[#0369A1]",
  coral: "text-[#BE123C]",
};

export function TableOfContents() {
  return (
    <section
      id="toc"
      className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8"
    >
      <SectionHeader
        number="02"
        eyebrow="Classroom Index"
        title="Table of Contents"
        subtitle="Select any section below to jump straight to that chapter of my Academic E-Portfolio."
        accent="yellow"
      />

      {/* Open, Non-Boxed Book-Style Table of Contents */}
      <nav
        aria-label="Portfolio table of contents"
        className="grid grid-cols-1 gap-x-10 lg:grid-cols-2 border-t-2 border-b-2 border-[#1E4D3B]/20"
      >
        {navSections.map((item, idx) => (
          <motion.a
            key={item.id}
            href={`#${item.id}`}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.3, delay: idx * 0.03 }}
            className="group flex items-baseline gap-3.5 border-b border-[#1E4D3B]/12 py-4 px-2 transition-colors hover:bg-[#1E4D3B]/[0.04] active:bg-[#1E4D3B]/[0.08] last:border-b-0 lg:[&:nth-last-child(2)]:border-b-0"
          >
            <span
              className={`font-heading text-lg sm:text-xl font-bold shrink-0 w-8 ${numberColors[item.accent]}`}
            >
              {item.number}
            </span>

            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-2">
                <h3 className="font-heading text-base sm:text-lg font-bold text-[#1E4D3B] group-hover:text-[#15382A] transition-colors">
                  {item.title}
                </h3>
                <span
                  aria-hidden="true"
                  className="hidden sm:block flex-1 border-b border-dotted border-[#1E4D3B]/25 mb-1"
                />
              </div>
              <p className="mt-0.5 text-xs sm:text-sm text-[#1C2420]/70 leading-relaxed">
                {item.subtitle}
              </p>
            </div>
          </motion.a>
        ))}
      </nav>
    </section>
  );
}
