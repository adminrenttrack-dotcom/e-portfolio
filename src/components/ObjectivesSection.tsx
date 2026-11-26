"use client";

import { motion } from "framer-motion";
import { Brain, CheckCircle2, Lightbulb, Wrench } from "lucide-react";
import { learningObjectives } from "@/src/data/portfolioData";
import { SectionHeader } from "./SectionHeader";

const noteTheme = {
  yellow: {
    bg: "bg-[#FEF3C7]",
    border: "border-[#FBBF24]/70",
    pin: "bg-[#FB7185]",
    iconBg: "bg-[#FBBF24]/35 text-[#78350F]",
    check: "text-[#B45309]",
  },
  blue: {
    bg: "bg-[#E0F2FE]",
    border: "border-[#38BDF8]/70",
    pin: "bg-[#1E4D3B]",
    iconBg: "bg-[#38BDF8]/30 text-[#075985]",
    check: "text-[#0284C7]",
  },
  coral: {
    bg: "bg-[#FFE4E6]",
    border: "border-[#FB7185]/65",
    pin: "bg-[#FBBF24]",
    iconBg: "bg-[#FB7185]/25 text-[#9F1239]",
    check: "text-[#E11D48]",
  },
};

const noteIcons = {
  learn: Lightbulb,
  skills: Wrench,
  knowledge: Brain,
};

export function ObjectivesSection() {
  return (
    <section
      id="objectives"
      className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8"
    >
      <SectionHeader
        number="05"
        eyebrow="Classroom Sticky Notes"
        title="Learning Objectives"
        subtitle="My personal learning targets for this course—pinned to remind me of the educator I am striving to become."
        accent="coral"
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 pt-2">
        {learningObjectives.map((obj, idx) => {
          const theme = noteTheme[obj.color];
          const Icon = noteIcons[obj.id as keyof typeof noteIcons] || Lightbulb;

          return (
            <motion.article
              key={obj.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className={`relative rounded-2xl border-2 ${theme.border} ${theme.bg} p-6 pt-8 shadow-[0_12px_26px_rgba(30,77,59,0.10)] transition-shadow duration-200 hover:shadow-[0_18px_34px_rgba(30,77,59,0.16)]`}
            >
              {/* Tactile Pushpin */}
              <div
                aria-hidden="true"
                className={`absolute -top-3 left-1/2 -translate-x-1/2 h-6 w-6 rounded-full ${theme.pin} shadow-md ring-2 ring-white/80 flex items-center justify-center`}
              >
                <span className="h-2 w-2 rounded-full bg-white/55" />
              </div>

              <div className="mb-4 flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${theme.iconBg}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-lg sm:text-xl font-bold text-[#1C2420] leading-tight">
                  {obj.title}
                </h3>
              </div>

              <ul className="space-y-3">
                {obj.points.map((point, pIdx) => (
                  <li
                    key={pIdx}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-[#1C2420]/85"
                  >
                    <CheckCircle2
                      className={`mt-0.5 h-4 w-4 shrink-0 ${theme.check}`}
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
