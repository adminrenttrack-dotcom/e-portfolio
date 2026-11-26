"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  ClipboardList,
  FileText,
  Sparkles,
  X,
} from "lucide-react";
import {
  activityCategories,
  learningActivities,
  type ActivityCategory,
  type LearningActivity,
} from "@/src/data/portfolioData";
import { SectionHeader } from "./SectionHeader";

export function ActivitiesSection() {
  const [activeCategory, setActiveCategory] = useState<ActivityCategory>("All");
  const [selectedActivity, setSelectedActivity] =
    useState<LearningActivity | null>(null);

  const filtered =
    activeCategory === "All"
      ? learningActivities
      : learningActivities.filter((a) => a.category === activeCategory);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedActivity(null);
    };
    if (selectedActivity) {
      window.addEventListener("keydown", onKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedActivity]);

  return (
    <section
      id="activities"
      className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8"
    >
      <SectionHeader
        number="07"
        eyebrow="Academic Outputs & Practicum"
        title="Learning Activities and Outputs"
        subtitle="Browse my BEEd coursework, lesson plans, instructional materials, and demonstration teaching entries below. Tap any row to view full output details."
        accent="yellow"
      />

      {/* Horizontal Scrollable Filter Pills */}
      <div className="mb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
        <div
          role="tablist"
          aria-label="Filter learning activities"
          className="w-full overflow-x-auto no-scrollbar touch-pan-x scroll-smooth pb-2"
        >
          <div className="flex w-max flex-nowrap items-center gap-2">
            {activityCategories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(category)}
                  className={`shrink-0 whitespace-nowrap min-h-[42px] rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 active:scale-95 ${
                    isActive
                      ? "bg-[#1E4D3B] text-[#FFFDF7] shadow-sm"
                      : "border border-[#1E4D3B]/15 bg-white/80 text-[#1E4D3B]/80 hover:bg-[#1E4D3B]/5"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Open, Non-Boxed Scrollable Academic Ledger List */}
      <div className="mb-2 flex items-center justify-between text-xs font-semibold text-[#1E4D3B]/65">
        <span>
          Showing {filtered.length}{" "}
          {filtered.length === 1 ? "output" : "outputs"}
        </span>
        <span>Scroll list to view all ↓</span>
      </div>

      <div
        key={activeCategory}
        className="max-h-[420px] sm:max-h-[460px] overflow-y-auto overscroll-contain pr-1 sm:pr-2 divide-y divide-[#1E4D3B]/15 border-t-2 border-b-2 border-[#1E4D3B]/20"
      >
        {filtered.map((activity, idx) => (
          <motion.button
            key={activity.id}
            type="button"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: idx * 0.03 }}
            onClick={() => setSelectedActivity(activity)}
            className="group flex w-full flex-col gap-3 py-5 sm:py-6 px-2 sm:px-3 text-left transition-colors hover:bg-[#1E4D3B]/[0.035] active:bg-[#1E4D3B]/[0.06] md:flex-row md:items-center md:justify-between md:gap-6"
          >
            {/* Left Number + Content */}
            <div className="flex items-start gap-4 min-w-0 flex-1">
              <span className="font-heading text-xl sm:text-2xl font-bold text-[#1E4D3B]/30 group-hover:text-[#FBBF24] transition-colors shrink-0 w-8">
                {String(idx + 1).padStart(2, "0")}
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="inline-flex items-center gap-1 font-bold text-[#92400E] bg-[#FBBF24]/25 rounded-md px-2 py-0.5">
                    <ClipboardList className="h-3.5 w-3.5" />
                    {activity.category}
                  </span>
                  <span className="font-semibold text-[#0284C7]">
                    {activity.module}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[#1C2420]/55">
                    <Calendar className="h-3 w-3" />
                    {activity.date}
                  </span>
                </div>

                <h3 className="mt-1.5 font-heading text-lg sm:text-xl font-bold text-[#1E4D3B] leading-snug group-hover:text-[#15382A]">
                  {activity.title}
                </h3>

                <p className="mt-1 max-w-3xl text-sm leading-relaxed text-[#1C2420]/75">
                  {activity.summary}
                </p>
              </div>
            </div>

            {/* Right Status & Action */}
            <div className="flex items-center justify-between pl-12 md:pl-0 md:flex-col md:items-end md:justify-center gap-2 shrink-0">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E4D3B]">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#1E4D3B]" />
                {activity.status}
              </span>
              <span className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#1E4D3B] group-hover:translate-x-0.5 transition-transform">
                Preview Details
                <ArrowRight className="h-4 w-4 text-[#FB7185]" />
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Output Detail Preview Modal */}
      <AnimatePresence>
        {selectedActivity && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedActivity(null)}
              className="fixed inset-0 bg-[#15382A]/65 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="activity-modal-title"
              className="relative z-10 max-h-[88dvh] w-full sm:max-w-xl overflow-y-auto rounded-t-3xl sm:rounded-3xl border-2 border-[#1E4D3B]/20 bg-[#FFFDF7] p-6 sm:p-7 shadow-2xl"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1E4D3B] px-3 py-1 text-xs font-bold text-[#FBBF24]">
                    <FileText className="h-3.5 w-3.5" />
                    {selectedActivity.category}
                  </span>
                  <h3
                    id="activity-modal-title"
                    className="mt-2.5 font-heading text-xl sm:text-2xl font-bold text-[#1E4D3B]"
                  >
                    {selectedActivity.title}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm font-semibold text-[#1C2420]/65">
                    {selectedActivity.module} • {selectedActivity.date}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedActivity(null)}
                  aria-label="Close activity preview"
                  className="flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-xl bg-[#1E4D3B]/10 text-[#1E4D3B] active:scale-95 hover:bg-[#1E4D3B]/20"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#1C2420]/85">
                {selectedActivity.summary}
              </p>

              <div className="mt-5 rounded-2xl border border-[#1E4D3B]/12 bg-white p-4">
                <p className="font-heading text-sm font-bold text-[#1E4D3B] mb-2.5">
                  Key Output Highlights
                </p>
                <ul className="space-y-2">
                  {selectedActivity.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-[#1C2420]/80"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#1E4D3B]" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 rounded-2xl border border-[#FBBF24]/50 bg-[#FEF3C7]/65 p-4">
                <p className="flex items-center gap-1.5 font-heading text-sm font-bold text-[#92400E]">
                  <Sparkles className="h-4 w-4" />
                  Personal Takeaway
                </p>
                <p className="mt-1.5 text-sm italic leading-relaxed text-[#1C2420]/85">
                  &ldquo;{selectedActivity.reflection}&rdquo;
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
