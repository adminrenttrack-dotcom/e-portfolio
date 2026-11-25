"use client";

import { motion } from "framer-motion";
import {
  Compass,
  GraduationCap,
  Heart,
  Home,
  Sparkles,
  Target,
  User,
} from "lucide-react";
import { aboutData, studentProfile } from "@/src/data/portfolioData";
import { SectionHeader } from "./SectionHeader";

export function AboutSection() {
  return (
    <section
      id="about"
      className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8"
    >
      <SectionHeader
        number="03"
        eyebrow="Getting to Know Me"
        title="Introduction / About Me"
        subtitle="My background, educational journey, passions, aspirations, and guiding philosophy as a future elementary educator."
        accent="blue"
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Short Personal Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.45 }}
          className="lg:col-span-7 rounded-3xl border-2 border-[#1E4D3B]/12 bg-white p-6 sm:p-7 shadow-[0_8px_24px_rgba(30,77,59,0.06)] transition-shadow duration-200 hover:shadow-[0_14px_32px_rgba(30,77,59,0.11)]"
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#38BDF8]/20 text-[#0369A1]">
              <User className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold text-[#1E4D3B]">
                Short Personal Introduction
              </h3>
              <p className="text-xs font-medium text-[#1C2420]/60">
                {studentProfile.programBadge} • {studentProfile.universityShort}
              </p>
            </div>
          </div>

          <div className="space-y-3.5 text-sm sm:text-base leading-relaxed text-[#1C2420]/85">
            {aboutData.personalIntro.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-2.5 pt-4 border-t border-[#1E4D3B]/10">
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-[#FFFDF7] border border-[#1E4D3B]/15 px-3 py-1.5 text-xs font-semibold text-[#1E4D3B]">
              <Home className="h-3.5 w-3.5 text-[#FB7185]" />
              {studentProfile.address}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-[#FFFDF7] border border-[#1E4D3B]/15 px-3 py-1.5 text-xs font-semibold text-[#1E4D3B]">
              <GraduationCap className="h-3.5 w-3.5 text-[#FBBF24]" />
              {studentProfile.universityShort}
            </span>
          </div>
        </motion.div>

        {/* Educational Background (Vertical Timeline) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="lg:col-span-5 rounded-3xl border-2 border-[#1E4D3B]/12 bg-white p-6 sm:p-7 shadow-[0_8px_24px_rgba(30,77,59,0.06)]"
        >
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FBBF24]/25 text-[#92400E]">
              <GraduationCap className="h-5 w-5" />
            </div>
            <h3 className="font-heading text-xl font-bold text-[#1E4D3B]">
              Educational Background
            </h3>
          </div>

          <ol className="relative ml-3 border-l-2 border-dashed border-[#1E4D3B]/25 space-y-5">
            {aboutData.educationTimeline.map((edu, idx) => (
              <li key={idx} className="relative pl-6">
                <span
                  className={`absolute -left-[9px] top-1 flex h-4 w-4 items-center justify-center rounded-full ring-4 ring-white ${
                    idx === 0 ? "bg-[#1E4D3B]" : "bg-[#FBBF24]"
                  }`}
                />
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <span className="text-xs font-bold uppercase tracking-wide text-[#1E4D3B]">
                    {edu.level}
                  </span>
                  <span className="rounded-full bg-[#1E4D3B]/8 px-2.5 py-0.5 text-[11px] font-semibold text-[#1E4D3B]">
                    {edu.period}
                  </span>
                </div>
                <p className="mt-1 font-heading text-sm font-semibold text-[#1C2420]">
                  {edu.school}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[#1C2420]/70">
                  {edu.details}
                </p>
              </li>
            ))}
          </ol>
        </motion.div>

        {/* Personal Interests & Hobbies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.45 }}
          className="lg:col-span-6 rounded-3xl border-2 border-[#1E4D3B]/12 bg-white p-6 sm:p-7 shadow-[0_8px_24px_rgba(30,77,59,0.06)] transition-shadow duration-200 hover:shadow-[0_14px_32px_rgba(30,77,59,0.11)]"
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FB7185]/20 text-[#BE123C]">
              <Heart className="h-5 w-5" />
            </div>
            <h3 className="font-heading text-xl font-bold text-[#1E4D3B]">
              Personal Interests &amp; Hobbies
            </h3>
          </div>
          <ul className="space-y-2.5">
            {aboutData.interests.map((interest, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-sm sm:text-base text-[#1C2420]/85"
              >
                <Sparkles className="mt-1 h-4 w-4 shrink-0 text-[#FB7185]" />
                <span>{interest}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Goals & Aspirations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.45, delay: 0.06 }}
          className="lg:col-span-6 rounded-3xl border-2 border-[#1E4D3B]/12 bg-white p-6 sm:p-7 shadow-[0_8px_24px_rgba(30,77,59,0.06)] transition-shadow duration-200 hover:shadow-[0_14px_32px_rgba(30,77,59,0.11)]"
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1E4D3B]/12 text-[#1E4D3B]">
              <Target className="h-5 w-5" />
            </div>
            <h3 className="font-heading text-xl font-bold text-[#1E4D3B]">
              Goals &amp; Aspirations
            </h3>
          </div>
          <ul className="space-y-2.5">
            {aboutData.goals.map((goal, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-sm sm:text-base text-[#1C2420]/85"
              >
                <Compass className="mt-1 h-4 w-4 shrink-0 text-[#1E4D3B]" />
                <span>{goal}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Personal Philosophy in Education — Chalkboard Callout Box */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-12"
        >
          <div className="relative overflow-hidden rounded-3xl border-[6px] border-[#8C5A2B] chalkboard-surface p-6 sm:p-9 text-[#FFFDF7] shadow-[0_16px_38px_rgba(21,56,42,0.28)]">
            {/* Subtle Inner Chalk Border */}
            <div className="pointer-events-none absolute inset-3 rounded-2xl border border-dashed border-white/20" />

            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3.5 py-1 text-xs font-bold tracking-wider uppercase text-[#FBBF24]">
                Chalkboard Credo
              </span>
              <h3 className="mt-3 font-heading text-2xl sm:text-3xl font-bold text-white">
                {aboutData.philosophy.heading}
              </h3>
              <p className="mt-4 max-w-4xl font-hand text-xl sm:text-2xl lg:text-[1.7rem] leading-relaxed text-[#FFFDF7]/95">
                &ldquo;{aboutData.philosophy.quote}&rdquo;
              </p>

              <div className="mt-6 flex flex-wrap gap-2.5">
                {aboutData.philosophy.pillars.map((pillar, idx) => (
                  <span
                    key={idx}
                    className="rounded-xl border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-[#FFFDF7]"
                  >
                    ★ {pillar}
                  </span>
                ))}
              </div>
            </div>

            {/* Wooden Chalk Tray Accent */}
            <div
              aria-hidden="true"
              className="mt-6 flex items-center justify-end gap-2"
            >
              <span className="h-2 w-10 rounded-full bg-white/85 shadow-xs" />
              <span className="h-2 w-7 rounded-full bg-[#FBBF24]/90 shadow-xs" />
              <span className="h-3 w-12 rounded-sm bg-[#D97706]/85 border border-[#78350F]" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
