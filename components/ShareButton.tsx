"use client";

import { Share2 } from "lucide-react";

export default function ShareButton() {
  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center justify-center gap-2 rounded-full border border-black/[0.12] px-6 py-3 text-[13px] text-[#555] transition-colors hover:border-black/25"
      style={{ fontFamily: "var(--font-tajawal)" }}
    >
      <Share2 className="h-4 w-4" />
      مشاركة السيارة
    </button>
  );
}
