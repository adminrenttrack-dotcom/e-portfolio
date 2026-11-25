import type { Metadata, Viewport } from "next";
import { Caveat, Fredoka, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Romnick P. Ramacula | Academic E-Portfolio (BEEd 2C)",
  description:
    "Academic E-Portfolio of Romnick P. Ramacula, Bachelor of Elementary Education (BEEd) – Section 2C at North Eastern Mindanao State University (NEMSU) – Lianga Campus. Course Instructor: Prof. Crispina B. Guillen.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1E4D3B",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fredoka.variable} ${plusJakartaSans.variable} ${caveat.variable} antialiased`}
    >
      <body className="min-h-dvh overflow-x-clip bg-[#FFFDF7] text-[#1C2420] selection:bg-[#FBBF24]/40 selection:text-[#1E4D3B]">
        {children}
      </body>
    </html>
  );
}
