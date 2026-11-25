"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, GraduationCap, Menu, X } from "lucide-react";
import { navSections, studentProfile } from "@/src/data/portfolioData";

const accentDot: Record<string, string> = {
  green: "bg-[#1E4D3B]",
  yellow: "bg-[#FBBF24]",
  blue: "bg-[#38BDF8]",
  coral: "bg-[#FB7185]",
};

export function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while mobile drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <>
      <header className="fixed top-3 left-0 right-0 z-40 mx-auto w-full px-3 sm:px-6 lg:px-8">
        <div
          className={`mx-auto max-w-6xl rounded-2xl border backdrop-blur-xl backdrop-saturate-150 transition-all duration-300 ${
            scrolled
              ? "border-white/75 bg-[#FFFDF7]/65 ring-1 ring-[#1E4D3B]/12 shadow-[0_12px_36px_rgba(30,77,59,0.15),inset_0_1px_0_rgba(255,255,255,0.85)]"
              : "border-white/60 bg-[#FFFDF7]/50 ring-1 ring-[#1E4D3B]/8 shadow-[0_8px_24px_rgba(30,77,59,0.08),inset_0_1px_0_rgba(255,255,255,0.75)]"
          }`}
        >
          <div className="flex h-14 md:h-16 items-center justify-between px-3 sm:px-5">
            {/* Brand / Student Badge */}
            <a
              href="#cover"
              className="flex items-center gap-2.5 min-w-0 group focus:outline-none"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#1E4D3B] text-[#FBBF24] shadow-sm transition-transform group-hover:scale-105">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="font-heading text-sm sm:text-base font-semibold leading-tight text-[#1E4D3B] truncate">
                  {studentProfile.shortName}
                </p>
                <p className="text-[11px] font-semibold tracking-wide text-[#1E4D3B]/70 truncate">
                  {studentProfile.programBadge}
                </p>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav
              aria-label="Primary sections"
              className="hidden lg:flex items-center gap-1"
            >
              {navSections
                .filter((section) => section.id !== "cover")
                .map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="rounded-xl px-3 py-2 text-xs font-semibold text-[#1E4D3B]/85 transition-colors hover:bg-white/65 hover:text-[#1E4D3B] hover:shadow-2xs"
                  >
                    {section.shortTitle}
                  </a>
                ))}
            </nav>

            {/* Mobile Hamburger Button (44x44px min touch target) */}
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={drawerOpen}
              className="lg:hidden flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-[#1E4D3B]/15 bg-[#1E4D3B]/5 text-[#1E4D3B] transition-colors active:scale-95 hover:bg-[#1E4D3B]/10"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Height Slide-Out Mobile Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 bg-[#15382A]/55 backdrop-blur-xs"
            />

            {/* Drawer Panel */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed right-0 top-0 bottom-0 flex w-[85vw] max-w-sm flex-col bg-[#FFFDF7] shadow-2xl border-l-4 border-[#1E4D3B]"
            >
              <div className="flex items-center justify-between border-b border-[#1E4D3B]/12 px-5 py-4 bg-[#1E4D3B] text-[#FFFDF7]">
                <div className="flex items-center gap-2.5">
                  <BookOpen className="h-5 w-5 text-[#FBBF24]" />
                  <div>
                    <p className="font-heading text-base font-semibold leading-tight">
                      Portfolio Sections
                    </p>
                    <p className="text-xs text-[#FFFDF7]/75">
                      {studentProfile.programBadge}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close navigation menu"
                  className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl bg-white/10 text-white active:scale-95 hover:bg-white/20"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav
                aria-label="Mobile sections"
                className="flex-1 overflow-y-auto px-4 py-4"
              >
                <ul className="space-y-1.5">
                  {navSections
                    .filter((section) => section.id !== "cover")
                    .map((section, idx) => (
                    <motion.li
                      key={section.id}
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.03 }}
                    >
                      <a
                        href={`#${section.id}`}
                        onClick={() => setDrawerOpen(false)}
                        className="flex items-center gap-3.5 rounded-2xl px-4 py-3.5 text-left transition-colors hover:bg-[#1E4D3B]/8 active:bg-[#1E4D3B]/15"
                      >
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white shadow-xs ${accentDot[section.accent]}`}
                        >
                          {section.number}
                        </span>
                        <div className="min-w-0">
                          <p className="font-heading text-sm font-semibold text-[#1E4D3B] truncate">
                            {section.title}
                          </p>
                          <p className="text-xs text-[#1C2420]/65 truncate">
                            {section.subtitle}
                          </p>
                        </div>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="border-t border-[#1E4D3B]/12 bg-[#1E4D3B]/5 px-5 py-3.5">
                <p className="text-xs font-semibold text-[#1E4D3B]">
                  {studentProfile.universityShort}
                </p>
                <p className="text-[11px] text-[#1C2420]/70">
                  Instructor: {studentProfile.instructor}
                </p>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
