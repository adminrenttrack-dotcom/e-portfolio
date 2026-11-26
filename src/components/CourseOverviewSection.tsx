"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpenCheck, ChevronDown } from "lucide-react";
import { courseOverviewData, studentProfile } from "@/src/data/portfolioData";
import { SectionHeader } from "./SectionHeader";
import { SmartImage } from "./SmartImage";

export function CourseOverviewSection() {
  const [openId, setOpenId] = useState<string>("");

  const togglePanel = (id: string) => {
    setOpenId((prev) => (prev === id ? "" : id));
  };

  return (
    <section
      id="course"
      className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8"
    >
      <SectionHeader
        number="06"
        eyebrow="Course Syllabus Binder"
        title="Course Overview"
        subtitle="An organized overview of our course framework, competencies, and modules guided by our course instructor."
        accent="green"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.45 }}
        className="overflow-hidden rounded-3xl border-2 border-[#1E4D3B]/18 bg-white shadow-[0_12px_30px_rgba(30,77,59,0.08)]"
      >
        {/* Syllabus Header Banner */}
        <div className="bg-[#1E4D3B] px-5 py-6 sm:px-8 text-[#FFFDF7]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3.5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FBBF24] text-[#1E4D3B] shadow-sm">
                <BookOpenCheck className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#FBBF24]">
                  {courseOverviewData.program}
                </p>
                <h3 className="mt-0.5 font-heading text-xl sm:text-2xl font-bold leading-snug text-white">
                  {courseOverviewData.courseTitle}
                </h3>
              </div>
            </div>

            <div className="inline-flex items-center gap-3 self-start sm:self-center rounded-2xl border border-white/20 bg-white/10 px-3.5 py-2 text-xs sm:text-sm">
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-[#FBBF24] bg-[#15382A]">
                <SmartImage
                  src={studentProfile.instructorImage}
                  alt={courseOverviewData.instructor}
                  fallbackLabel="Instructor"
                  variant="portrait"
                  compact
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <span>
                Course Instructor:{" "}
                <strong className="block sm:inline font-bold text-white">
                  {courseOverviewData.instructor}
                </strong>
              </span>
            </div>
          </div>
        </div>

        {/* Accordion Panels */}
        <div className="divide-y divide-[#1E4D3B]/10">
          {courseOverviewData.accordions.map((panel) => {
            const isOpen = openId === panel.id;
            return (
              <div key={panel.id}>
                <button
                  type="button"
                  onClick={() => togglePanel(panel.id)}
                  aria-expanded={isOpen}
                  className="flex w-full min-h-[64px] items-center justify-between gap-4 px-5 py-4 sm:px-8 sm:py-5 text-left transition-colors hover:bg-[#1E4D3B]/[0.03] active:bg-[#1E4D3B]/[0.06]"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-heading text-xs font-bold transition-colors ${
                        isOpen
                          ? "bg-[#1E4D3B] text-[#FBBF24]"
                          : "bg-[#1E4D3B]/10 text-[#1E4D3B]"
                      }`}
                    >
                      {panel.badge}
                    </span>
                    <div className="min-w-0">
                      <h4 className="font-heading text-base sm:text-lg font-bold text-[#1E4D3B]">
                        {panel.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#1C2420]/65 line-clamp-1">
                        {panel.summary}
                      </p>
                    </div>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-[#1E4D3B] transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-6 pt-1 sm:px-8 sm:pl-[4.75rem]">
                        <p className="mb-4 text-sm sm:text-base leading-relaxed text-[#1C2420]/85">
                          {panel.summary}
                        </p>
                        <ul className="space-y-2.5">
                          {panel.items.map((item, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2.5 rounded-xl bg-[#FFFDF7] border border-[#1E4D3B]/10 px-3.5 py-2.5 text-sm leading-relaxed text-[#1C2420]/85"
                            >
                              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#FBBF24]" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
