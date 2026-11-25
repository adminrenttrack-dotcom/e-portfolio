"use client";

import { motion } from "framer-motion";
import { Feather } from "lucide-react";
import { reflectionEntries } from "@/src/data/portfolioData";
import { SectionHeader } from "./SectionHeader";

const tagStyles = {
  green: "bg-[#1E4D3B]/10 text-[#1E4D3B]",
  yellow: "bg-[#FBBF24]/25 text-[#92400E]",
  blue: "bg-[#38BDF8]/20 text-[#0369A1]",
  coral: "bg-[#FB7185]/20 text-[#BE123C]",
};

export function ReflectionSection() {
  return (
    <section
      id="reflection"
      className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8"
    >
      <SectionHeader
        number="08"
        eyebrow="Lined-Notebook Journal"
        title="Reflection and Insights"
        subtitle="Honest reflections on what this course taught me, how I have grown, and the faith and hard work carrying me toward my future classroom."
        accent="coral"
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {reflectionEntries.map((entry, idx) => (
          <motion.article
            key={entry.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: idx * 0.06 }}
            className="relative overflow-hidden rounded-3xl border-2 border-[#1E4D3B]/15 notebook-lined p-6 pl-10 sm:p-7 sm:pl-12 shadow-[0_10px_26px_rgba(30,77,59,0.07)] transition-shadow duration-200 hover:shadow-[0_16px_34px_rgba(30,77,59,0.13)]"
          >
            {/* Red Notebook Margin Line */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-0 bottom-0 left-7 sm:left-8 w-[2px] bg-[#FB7185]/45"
            />

            {/* Binder Hole Punches */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-8 bottom-8 left-2 flex flex-col justify-between"
            >
              <span className="h-3 w-3 rounded-full border border-[#1E4D3B]/20 bg-[#FFFDF7] shadow-inner" />
              <span className="h-3 w-3 rounded-full border border-[#1E4D3B]/20 bg-[#FFFDF7] shadow-inner" />
              <span className="h-3 w-3 rounded-full border border-[#1E4D3B]/20 bg-[#FFFDF7] shadow-inner" />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 font-heading text-xs font-bold uppercase tracking-wider text-[#1E4D3B]/65">
                <Feather className="h-3.5 w-3.5 text-[#FB7185]" />
                {entry.number}
              </span>
              <span
                className={`rounded-full px-3 py-0.5 text-[11px] font-bold ${tagStyles[entry.accent]}`}
              >
                {entry.tag}
              </span>
            </div>

            <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#1E4D3B] leading-snug">
              {entry.title}
            </h3>

            <div className="mt-4 space-y-3.5 text-sm sm:text-base leading-[1.95] text-[#1C2420]/85">
              {entry.content.map((para, pIdx) => (
                <p key={pIdx}>{para}</p>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
