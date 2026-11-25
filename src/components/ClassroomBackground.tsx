"use client";

import { motion } from "framer-motion";

export function ClassroomBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden select-none"
    >
      {/* Soft Moving Watercolor Classroom Glows */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-[#FBBF24]/18 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -35, 0], y: [0, 25, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 -right-28 h-96 w-96 rounded-full bg-[#38BDF8]/16 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, 25, 0], y: [0, -20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 -left-24 h-80 w-80 rounded-full bg-[#FB7185]/14 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -25, 0], y: [0, -25, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-24 right-1/4 h-96 w-96 rounded-full bg-[#1E4D3B]/10 blur-3xl"
      />

      {/* GLIDING PAPER AIRPLANE 1 (Left -> Right across upper sky) */}
      <motion.svg
        initial={{ x: "-12vw", y: 0 }}
        animate={{
          x: ["-12vw", "112vw"],
          y: [0, -28, 12, -20, 0],
        }}
        transition={{
          x: { duration: 24, repeat: Infinity, ease: "linear" },
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
        viewBox="0 0 64 64"
        className="absolute top-[14%] left-0 h-10 w-10 sm:h-12 sm:w-12 text-[#38BDF8]/[0.28]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M58 10L6 29l20 7 7 20L58 10z" />
        <path d="M26 36l32-26" />
      </motion.svg>

      {/* GLIDING PAPER AIRPLANE 2 (Right -> Left across lower half) */}
      <motion.svg
        initial={{ x: "110vw", y: 0 }}
        animate={{
          x: ["110vw", "-15vw"],
          y: [0, 22, -14, 18, 0],
        }}
        transition={{
          x: { duration: 30, repeat: Infinity, ease: "linear", delay: 5 },
          y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
        }}
        viewBox="0 0 64 64"
        className="absolute top-[76%] left-0 h-9 w-9 sm:h-11 sm:w-11 text-[#FB7185]/[0.24] -scale-x-100"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M58 10L6 29l20 7 7 20L58 10z" />
        <path d="M26 36l32-26" />
      </motion.svg>

      {/* DRIFTING CLOUD (Science / Weather) */}
      <motion.svg
        animate={{ x: ["-10vw", "108vw"] }}
        transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
        viewBox="0 0 96 56"
        className="absolute top-[6%] left-0 h-10 w-16 sm:h-14 sm:w-24 text-[#38BDF8]/[0.18]"
        fill="currentColor"
      >
        <path d="M26 46h46a14 14 0 002-27.8A18 18 0 0039 14a14 14 0 00-13 32z" />
      </motion.svg>

      {/* 1. English: Floating "ABC" */}
      <motion.div
        animate={{ y: [0, -16, 0], x: [0, 8, 0], rotate: [-8, 2, -8] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] left-[3%] sm:left-[5%] font-heading text-2xl sm:text-4xl font-bold tracking-widest text-[#1E4D3B]/[0.15]"
      >
        ABC
      </motion.div>

      {/* 2. Filipino: "A • Ba • Ka • Da" */}
      <motion.div
        animate={{ y: [0, 14, 0], x: [0, -10, 0], rotate: [4, -4, 4] }}
        transition={{ duration: 8.8, repeat: Infinity, ease: "easeInOut" }}
        className="hidden sm:block absolute top-[17%] left-[22%] font-heading text-xl md:text-2xl font-bold text-[#0369A1]/[0.15]"
      >
        A • Ba • Ka • Da
      </motion.div>

      {/* 3. Math: Floating "1 + 2 = 3" */}
      <motion.div
        animate={{ y: [0, 16, 0], x: [0, -8, 0], rotate: [6, 14, 6] }}
        transition={{ duration: 8.2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] right-[3%] sm:right-[6%] font-heading text-xl sm:text-3xl font-bold text-[#FB7185]/[0.19]"
      >
        1 + 2 = 3
      </motion.div>

      {/* 4. Math: Floating "2 × 3 = 6" */}
      <motion.div
        animate={{ y: [0, -14, 0], rotate: [-6, 4, -6] }}
        transition={{ duration: 9.4, repeat: Infinity, ease: "easeInOut" }}
        className="hidden md:block absolute top-[58%] left-[12%] font-heading text-xl font-bold text-[#D97706]/[0.18]"
      >
        2 × 3 = 6
      </motion.div>

      {/* 5. Science: Rotating Atom SVG */}
      <motion.svg
        animate={{ y: [0, -14, 0], rotate: [0, 360] }}
        transition={{
          y: { duration: 6.5, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 36, repeat: Infinity, ease: "linear" },
        }}
        viewBox="0 0 64 64"
        className="absolute top-[34%] left-[2%] sm:left-[4%] h-12 w-12 sm:h-16 sm:w-16 text-[#38BDF8]/[0.22]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        <ellipse cx="32" cy="32" rx="26" ry="10" />
        <ellipse
          cx="32"
          cy="32"
          rx="26"
          ry="10"
          transform="rotate(60 32 32)"
        />
        <ellipse
          cx="32"
          cy="32"
          rx="26"
          ry="10"
          transform="rotate(120 32 32)"
        />
        <circle cx="32" cy="32" r="4" fill="currentColor" />
      </motion.svg>

      {/* 6. Science: Spinning Sun SVG */}
      <motion.svg
        animate={{ rotate: [0, 360], scale: [1, 1.08, 1] }}
        transition={{
          rotate: { duration: 40, repeat: Infinity, ease: "linear" },
          scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
        viewBox="0 0 64 64"
        className="hidden sm:block absolute top-[8%] right-[16%] h-12 w-12 text-[#FBBF24]/[0.28]"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      >
        <circle cx="32" cy="32" r="11" fill="currentColor" />
        <path d="M32 6v8M32 50v8M6 32h8M50 32h8M13.6 13.6l5.6 5.6M44.8 44.8l5.6 5.6M50.4 13.6l-5.6 5.6M19.2 44.8l-5.6 5.6" />
      </motion.svg>

      {/* 7. Classroom Apple SVG */}
      <motion.svg
        animate={{ y: [0, -12, 0], rotate: [-10, 8, -10] }}
        transition={{ duration: 6.8, repeat: Infinity, ease: "easeInOut" }}
        viewBox="0 0 64 64"
        className="absolute top-[46%] left-[3%] sm:left-[16%] h-10 w-10 sm:h-12 sm:w-12 text-[#FB7185]/[0.22]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M32 18c-8-4-18 2-18 14 0 12 8 22 14 22 2 0 3-1 4-1s2 1 4 1c6 0 14-10 14-22 0-12-10-18-18-14z" />
        <path d="M32 18c0-6 4-10 9-10" />
        <path d="M32 14c-3-4-7-5-10-4 1 4 4 6 10 4z" fill="currentColor" />
      </motion.svg>

      {/* 8. Science / Nature: Sprouting Plant Leaf SVG */}
      <motion.svg
        animate={{ y: [0, -10, 0], rotate: [-6, 6, -6] }}
        transition={{ duration: 7.4, repeat: Infinity, ease: "easeInOut" }}
        viewBox="0 0 64 64"
        className="hidden md:block absolute bottom-[26%] right-[24%] h-12 w-12 text-[#1E4D3B]/[0.16]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M32 54V26" />
        <path d="M32 34c-12 0-18-8-18-18 10 0 18 6 18 18z" />
        <path d="M32 28c12 0 18-8 18-18-10 0-18 6-18 18z" />
      </motion.svg>

      {/* 9. Math / Geometry: Set-Square Triangle SVG */}
      <motion.svg
        animate={{ y: [0, 14, 0], rotate: [10, -4, 10] }}
        transition={{ duration: 8.4, repeat: Infinity, ease: "easeInOut" }}
        viewBox="0 0 64 64"
        className="hidden sm:block absolute top-[31%] right-[13%] h-14 w-14 text-[#D97706]/[0.20]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 52L52 52L12 12Z" />
        <path d="M20 44L36 44L20 28Z" />
      </motion.svg>

      {/* 10. Reading / Literature: Open Storybook SVG */}
      <motion.svg
        animate={{ y: [0, 12, 0], rotate: [-5, 5, -5] }}
        transition={{ duration: 7.8, repeat: Infinity, ease: "easeInOut" }}
        viewBox="0 0 64 64"
        className="absolute top-[52%] right-[3%] sm:right-[5%] h-12 w-12 sm:h-16 sm:w-16 text-[#1E4D3B]/[0.16]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 16c8-3 16-3 24 2 8-5 16-5 24-2v34c-8-3-16-3-24 2-8-5-16-5-24-2V16z" />
        <path d="M32 18v34" />
      </motion.svg>

      {/* 11. Science: Magnifying Glass SVG */}
      <motion.svg
        animate={{ y: [0, -12, 0], x: [0, 8, 0], rotate: [8, -6, 8] }}
        transition={{ duration: 7.6, repeat: Infinity, ease: "easeInOut" }}
        viewBox="0 0 64 64"
        className="hidden lg:block absolute top-[62%] left-[24%] h-12 w-12 text-[#38BDF8]/[0.22]"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="28" cy="28" r="16" />
        <path d="M40 40l14 14" />
      </motion.svg>

      {/* 12. MAPEH (Music): Floating Music Notes SVG */}
      <motion.svg
        animate={{ y: [0, -18, 0], rotate: [-12, 8, -12] }}
        transition={{ duration: 6.4, repeat: Infinity, ease: "easeInOut" }}
        viewBox="0 0 64 64"
        className="absolute top-[68%] left-[3%] sm:left-[6%] h-11 w-11 sm:h-14 sm:w-14 text-[#FBBF24]/[0.28]"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 46V16l28-6v30" />
        <circle cx="16" cy="46" r="6" fill="currentColor" />
        <circle cx="44" cy="40" r="6" fill="currentColor" />
      </motion.svg>

      {/* 13. MAPEH (Arts): Paint Palette SVG */}
      <motion.svg
        animate={{ y: [0, 12, 0], rotate: [-8, 10, -8] }}
        transition={{ duration: 8.6, repeat: Infinity, ease: "easeInOut" }}
        viewBox="0 0 64 64"
        className="hidden md:block absolute top-[72%] right-[16%] h-14 w-14 text-[#FB7185]/[0.20]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M32 10c-13 0-22 9-22 21 0 10 8 18 18 18h4c3 0 5-2 5-5 0-2-1-3-1-5 0-3 2-5 5-5h4c6 0 10-4 10-10C55 16 45 10 32 10z" />
        <circle cx="22" cy="28" r="2.5" fill="currentColor" />
        <circle cx="30" cy="20" r="2.5" fill="currentColor" />
        <circle cx="40" cy="22" r="2.5" fill="currentColor" />
      </motion.svg>

      {/* 14. Araling Panlipunan / Geography: Classroom Globe SVG */}
      <motion.svg
        animate={{ y: [0, 14, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 8.8, repeat: Infinity, ease: "easeInOut" }}
        viewBox="0 0 64 64"
        className="absolute bottom-[9%] right-[3%] sm:right-[6%] h-12 w-12 sm:h-16 sm:w-16 text-[#38BDF8]/[0.22]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="32" cy="28" r="18" />
        <ellipse cx="32" cy="28" rx="8" ry="18" />
        <path d="M14 28h36" />
        <path d="M22 52h20" />
        <path d="M32 46v6" />
      </motion.svg>

      {/* 15. Mathematics: Arithmetic Operators */}
      <motion.div
        animate={{ y: [0, -12, 0], x: [0, 10, 0], rotate: [10, -2, 10] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[15%] left-[6%] sm:left-[12%] font-heading text-xl sm:text-2xl font-bold text-[#1E4D3B]/[0.14]"
      >
        ÷ × + −
      </motion.div>

      {/* 16. Values / ESP / Idea: Lightbulb SVG */}
      <motion.svg
        animate={{ y: [0, -11, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut" }}
        viewBox="0 0 64 64"
        className="hidden sm:block absolute bottom-[7%] left-[44%] h-12 w-12 text-[#FBBF24]/[0.28]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 40c-4-4-6-8-6-14a16 16 0 1132 0c0 6-2 10-6 14l-2 6H24l-2-6z" />
        <path d="M26 52h12" />
        <path d="M28 57h8" />
      </motion.svg>

      {/* 17. Classroom Writing: Moving Pencil SVG */}
      <motion.svg
        animate={{ y: [0, 14, 0], x: [0, -10, 0], rotate: [-15, 0, -15] }}
        transition={{ duration: 7.8, repeat: Infinity, ease: "easeInOut" }}
        viewBox="0 0 64 64"
        className="hidden lg:block absolute top-[24%] left-[48%] h-12 w-12 text-[#FB7185]/[0.18]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 52l6-18L44 8l12 12-26 26-18 6z" />
        <path d="M38 14l12 12" />
      </motion.svg>

      {/* 18. Twinkling Classroom Stars */}
      <motion.svg
        animate={{ scale: [0.9, 1.2, 0.9], rotate: [0, 20, 0] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
        viewBox="0 0 64 64"
        className="absolute top-[40%] right-[8%] h-9 w-9 sm:h-11 sm:w-11 text-[#FBBF24]/[0.28]"
        fill="currentColor"
      >
        <path d="M32 4l7.6 17.8L59 24.4 44.5 37l4.2 19L32 46.2 15.3 56l4.2-19L5 24.4l19.4-2.6L32 4z" />
      </motion.svg>

      <motion.svg
        animate={{ scale: [1.1, 0.85, 1.1], rotate: [0, -25, 0] }}
        transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
        viewBox="0 0 64 64"
        className="hidden sm:block absolute bottom-[34%] left-[34%] h-8 w-8 text-[#38BDF8]/[0.24]"
        fill="currentColor"
      >
        <path d="M32 4l7.6 17.8L59 24.4 44.5 37l4.2 19L32 46.2 15.3 56l4.2-19L5 24.4l19.4-2.6L32 4z" />
      </motion.svg>
    </div>
  );
}
