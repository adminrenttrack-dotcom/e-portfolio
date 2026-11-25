"use client";

import { useState } from "react";
import { Camera, UserRound } from "lucide-react";

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
  variant?: "portrait" | "gallery";
  compact?: boolean;
}

export function SmartImage({
  src,
  alt,
  className = "",
  fallbackLabel,
  variant = "gallery",
  compact = false,
}: SmartImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const failed = failedSrc === src;

  if (failed) {
    if (compact) {
      return (
        <div
          role="img"
          aria-label={alt}
          className={`flex items-center justify-center bg-gradient-to-br from-[#1E4D3B] to-[#15382A] text-[#FBBF24] ${className}`}
        >
          <UserRound className="h-5 w-5" />
        </div>
      );
    }

    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center text-center p-5 select-none ${
          variant === "portrait"
            ? "bg-gradient-to-br from-[#1E4D3B] via-[#255F49] to-[#15382A] text-[#FFFDF7]"
            : "bg-gradient-to-br from-[#FEF3C7] via-[#FFFDF7] to-[#E0F2FE] text-[#1E4D3B]"
        } ${className}`}
      >
        <div
          className={`mb-3 flex h-14 w-14 items-center justify-center rounded-2xl shadow-sm ${
            variant === "portrait"
              ? "bg-[#FBBF24] text-[#1E4D3B]"
              : "bg-[#1E4D3B]/10 text-[#1E4D3B]"
          }`}
        >
          {variant === "portrait" ? (
            <UserRound className="h-7 w-7" />
          ) : (
            <Camera className="h-7 w-7" />
          )}
        </div>
        <p className="font-heading text-sm sm:text-base font-semibold leading-snug max-w-[20ch]">
          {fallbackLabel || alt}
        </p>
        <span
          className={`mt-2 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
            variant === "portrait"
              ? "bg-white/15 text-[#FFFDF7]/90"
              : "bg-[#1E4D3B]/10 text-[#1E4D3B]/80"
          }`}
        >
          public{src}
        </span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading={variant === "portrait" ? "eager" : "lazy"}
      onError={() => setFailedSrc(src)}
      className={className}
    />
  );
}
