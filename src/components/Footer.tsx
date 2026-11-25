"use client";

import { motion } from "framer-motion";
import { ArrowUp, GraduationCap, MapPin, UserCheck } from "lucide-react";
import { studentProfile } from "@/src/data/portfolioData";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="mt-10 border-t-4 border-[#FBBF24] bg-[#1E4D3B] text-[#FFFDF7]">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FBBF24] text-[#1E4D3B]">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <p className="font-heading text-lg font-bold leading-tight text-white">
                  {studentProfile.name}
                </p>
                <p className="text-xs font-semibold text-[#FBBF24]">
                  {studentProfile.program} • {studentProfile.section}
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-1.5 text-xs sm:text-sm text-[#FFFDF7]/80">
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-[#FBBF24]" />
                {studentProfile.university}
              </p>
              <p className="flex items-center gap-2">
                <UserCheck className="h-4 w-4 shrink-0 text-[#38BDF8]" />
                Submitted to: {studentProfile.instructor}
              </p>
            </div>
          </div>

          <motion.button
            type="button"
            onClick={scrollToTop}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex min-h-[48px] items-center justify-center gap-2 self-start sm:self-center rounded-2xl bg-[#FBBF24] px-6 py-3 font-heading text-sm font-bold text-[#1C2420] shadow-md transition-colors hover:bg-[#F59E0B]"
          >
            Back to Top
            <ArrowUp className="h-4 w-4" />
          </motion.button>
        </div>

        <div className="mt-8 border-t border-white/15 pt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-xs text-[#FFFDF7]/65">
          <p>{studentProfile.academicTerm}</p>
          <p>Current Address: {studentProfile.address}</p>
        </div>
      </div>
    </footer>
  );
}
