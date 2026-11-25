"use client";

import { motion } from "framer-motion";
import {
  ArrowDown,
  BookMarked,
  GraduationCap,
  MapPin,
  Quote,
  Sparkles,
  UserCheck,
} from "lucide-react";
import { studentProfile } from "@/src/data/portfolioData";
import { SmartImage } from "./SmartImage";

export function HeroSection() {
  return (
    <section
      id="cover"
      className="relative flex min-h-dvh flex-col justify-center overflow-hidden px-4 pt-6 pb-14 sm:px-6 lg:px-8 lg:py-12"
    >
      {/* Floating Classroom SVG Doodles (safe low-opacity edge positions) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <motion.svg
          animate={{ y: [0, -10, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          viewBox="0 0 64 64"
          className="absolute top-6 left-2 sm:top-10 sm:left-8 h-9 w-9 sm:h-14 sm:w-14 text-[#FBBF24] opacity-25 sm:opacity-35"
          fill="currentColor"
        >
          <path d="M32 4l7.6 17.8L59 24.4 44.5 37l4.2 19L32 46.2 15.3 56l4.2-19L5 24.4l19.4-2.6L32 4z" />
        </motion.svg>

        <motion.svg
          animate={{ y: [0, -12, 0], x: [0, 6, 0] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
          viewBox="0 0 64 64"
          className="absolute top-8 right-2 sm:top-14 sm:right-12 h-10 w-10 sm:h-16 sm:w-16 text-[#38BDF8] opacity-25 sm:opacity-35"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M58 8L6 29l20 7 7 20L58 8z" />
          <path d="M26 36l32-28" />
        </motion.svg>

        <motion.svg
          animate={{ y: [0, 8, 0], rotate: [-12, -4, -12] }}
          transition={{ duration: 6.8, repeat: Infinity, ease: "easeInOut" }}
          viewBox="0 0 64 64"
          className="hidden sm:block absolute bottom-12 left-8 h-14 w-14 text-[#FB7185] opacity-30"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 52l6-18L44 8l12 12-26 26-18 6z" />
          <path d="M38 14l12 12" />
        </motion.svg>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {/* Student Cover & Personal Quote Stack */}
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          {/* NEMSU Student ID Card (Top on mobile, Right side on desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="order-1 lg:order-2 lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-[310px] sm:max-w-[335px] overflow-hidden rounded-[22px] bg-white shadow-[0_18px_42px_rgba(29,78,216,0.18),0_4px_12px_rgba(30,77,59,0.10)] border border-[#1D4ED8]/20 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_22px_48px_rgba(29,78,216,0.22),0_6px_16px_rgba(30,77,59,0.12)]">
              {/* Lanyard Slot Cutout */}
              <div
                aria-hidden="true"
                className="flex justify-center bg-[#2351A3] pt-2.5 pb-1"
              >
                <span className="h-2.5 w-14 rounded-full bg-[#FFFDF7]/90 shadow-inner ring-1 ring-black/15" />
              </div>

              {/* Top Royal Blue NEMSU Header Banner */}
              <div className="bg-[#2351A3] px-3 pt-1 pb-2.5 text-center text-white">
                <p className="font-heading text-[11px] sm:text-xs font-bold tracking-[0.06em] uppercase leading-tight">
                  NORTH EASTERN MINDANAO STATE UNIVERSITY
                </p>
              </div>

              {/* Upper Emblem + ID No. (Left) & Student Portrait (Right) */}
              <div className="grid grid-cols-12 items-center gap-3 px-4 pt-4 pb-3.5 bg-gradient-to-b from-white to-[#F8FAFC]">
                {/* Left: Circular University Seal + ID Number Box */}
                <div className="col-span-5 flex flex-col items-center justify-center gap-2.5">
                  <div className="relative flex h-20 w-20 sm:h-[86px] sm:w-[86px] items-center justify-center rounded-full border-[3px] border-[#2351A3] bg-white p-1 shadow-xs">
                    <div className="flex h-full w-full flex-col items-center justify-center rounded-full border border-dashed border-[#2351A3]/60 bg-[#EFF6FF] text-[#2351A3]">
                      <GraduationCap className="h-7 w-7 text-[#2351A3]" />
                      <span className="mt-0.5 text-[8px] font-extrabold tracking-widest uppercase">
                        NEMSU
                      </span>
                    </div>
                  </div>

                  {/* Student ID Number Box */}
                  <div className="w-full rounded-sm border border-[#1C2420]/25 bg-white px-2 py-1 text-center shadow-2xs">
                    <p className="font-mono text-xs sm:text-[13px] font-bold tracking-wider text-[#1C2420]">
                      25-00054
                    </p>
                  </div>
                </div>

                {/* Right: Romnick's Portrait */}
                <div className="col-span-7">
                  <div className="aspect-[4/4.6] w-full overflow-hidden rounded-lg border-2 border-[#2351A3]/15 bg-[#EFF6FF] shadow-xs">
                    <SmartImage
                      src={studentProfile.profileImage}
                      alt={`Student ID Portrait of ${studentProfile.name}`}
                      fallbackLabel={studentProfile.name}
                      variant="portrait"
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                </div>
              </div>

              {/* Full-Width Royal Blue Student Name Bar */}
              <div className="mx-3 rounded-sm bg-[#2351A3] px-3 py-1.5 text-center shadow-xs">
                <p className="font-heading text-sm sm:text-base font-bold tracking-wider uppercase text-white">
                  {studentProfile.name}
                </p>
              </div>

              {/* Student ID Details */}
              <div className="px-4 py-3.5 text-[11px] sm:text-xs text-[#1C2420] space-y-1.5 bg-gradient-to-b from-white via-[#F8FAFC] to-[#EFF6FF]/60">
                <div className="grid grid-cols-12 gap-1">
                  <span className="col-span-4 font-bold uppercase text-[#1C2420]/70">
                    Course:
                  </span>
                  <span className="col-span-8 font-bold text-[#1E4D3B]">
                    {studentProfile.programBadge}
                  </span>
                </div>
                <div className="grid grid-cols-12 gap-1">
                  <span className="col-span-4 font-bold uppercase text-[#1C2420]/70">
                    Campus:
                  </span>
                  <span className="col-span-8 font-medium">
                    Lianga Campus
                  </span>
                </div>
                <div className="grid grid-cols-12 gap-1">
                  <span className="col-span-4 font-bold uppercase text-[#1C2420]/70">
                    Instructor:
                  </span>
                  <span className="col-span-8 font-medium">
                    {studentProfile.instructor}
                  </span>
                </div>
                <div className="grid grid-cols-12 gap-1">
                  <span className="col-span-4 font-bold uppercase text-[#1C2420]/70">
                    Address:
                  </span>
                  <span className="col-span-8 font-medium leading-snug">
                    {studentProfile.address}
                  </span>
                </div>

                {/* Official Card Footer */}
                <div className="mt-3 pt-2.5 border-t border-[#2351A3]/15 text-center">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#2351A3]">
                    College of Teacher Education
                  </p>
                  <p className="text-[10px] font-medium text-[#1C2420]/60">
                    Student E-Portfolio ID • A.Y. 2025–2026
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Academic Details & Hero Quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15, ease: "easeOut" }}
            className="order-2 lg:order-1 lg:col-span-7 text-left"
          >
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1E4D3B] px-3.5 py-1.5 text-xs font-bold tracking-wide text-[#FFFDF7] shadow-xs">
                <Sparkles className="h-3.5 w-3.5 text-[#FBBF24]" />
                {studentProfile.programBadge}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1E4D3B]/20 bg-[#FBBF24]/25 px-3.5 py-1.5 text-xs font-bold text-[#1E4D3B]">
                <BookMarked className="h-3.5 w-3.5" />
                {studentProfile.academicTerm}
              </span>
            </div>

            <h1 className="font-heading text-3xl sm:text-5xl lg:text-[3.35rem] font-bold leading-[1.12] tracking-tight text-[#1E4D3B]">
              {studentProfile.name}
            </h1>
            <p className="mt-2 font-heading text-base sm:text-xl font-medium text-[#1C2420]/85">
              {studentProfile.program}
            </p>

            <div className="mt-4 flex flex-col sm:flex-row sm:flex-wrap gap-2.5 text-xs sm:text-sm text-[#1C2420]/80">
              <div className="inline-flex items-center gap-2 rounded-xl border border-[#1E4D3B]/15 bg-white/85 px-3.5 py-2 shadow-2xs">
                <MapPin className="h-4 w-4 shrink-0 text-[#FB7185]" />
                <span className="font-medium">{studentProfile.university}</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-xl border border-[#1E4D3B]/15 bg-white/85 px-3.5 py-2 shadow-2xs">
                <UserCheck className="h-4 w-4 shrink-0 text-[#1E4D3B]" />
                <span>
                  Instructor:{" "}
                  <strong className="font-semibold text-[#1E4D3B]">
                    {studentProfile.instructor}
                  </strong>
                </span>
              </div>
            </div>

            <div className="relative mt-6 rounded-2xl border-2 border-[#1E4D3B]/15 bg-white/90 p-5 sm:p-6 shadow-[0_8px_24px_rgba(30,77,59,0.07)]">
              <Quote className="mb-2 h-6 w-6 text-[#FBBF24]" />
              <blockquote className="text-sm sm:text-base leading-relaxed text-[#1C2420]/90 italic">
                &ldquo;{studentProfile.heroQuote}&rdquo;
              </blockquote>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <motion.a
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                href="#toc"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-[#1E4D3B] px-6 py-3 font-heading text-sm sm:text-base font-semibold text-[#FFFDF7] shadow-[0_6px_16px_rgba(30,77,59,0.28)] transition-colors hover:bg-[#15382A]"
              >
                Open Portfolio Index
                <ArrowDown className="h-4 w-4 text-[#FBBF24]" />
              </motion.a>
              <motion.a
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                href="#gallery"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl border-2 border-[#1E4D3B]/20 bg-[#FBBF24]/20 px-6 py-3 font-heading text-sm sm:text-base font-semibold text-[#1E4D3B] transition-colors hover:bg-[#FBBF24]/35"
              >
                View Photos &amp; Videos
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
