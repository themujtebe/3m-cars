"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  images: string[];
  alt: string;
}

export default function ImageSlider({ images, alt }: Props) {
  const [current, setCurrent] = useState(0);
  const total = images.length;

  const prev = () => setCurrent((p) => (p - 1 + total) % total);
  const next = () => setCurrent((p) => (p + 1) % total);

  if (total === 0) return (
    <div className="flex h-80 w-full items-center justify-center rounded-2xl bg-[#f7f7f7] text-[#bbb]" style={{ fontFamily: "var(--font-tajawal)" }}>
      لا توجد صور
    </div>
  );

  return (
    <div className="select-none">
      {/* Main image */}
      <div className="relative h-80 w-full overflow-hidden rounded-2xl bg-[#f0f0f0] sm:h-[420px]">
        <Image
          src={images[current]}
          alt={`${alt} ${current + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 60vw"
          priority
        />

        {total > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-[#111] shadow-md backdrop-blur-sm transition-all hover:bg-white"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <button
              onClick={next}
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-[#111] shadow-md backdrop-blur-sm transition-all hover:bg-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div
              className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/30 px-3 py-1 text-[12px] font-bold text-white backdrop-blur-sm"
              style={{ fontFamily: "var(--font-tajawal)" }}
            >
              {current + 1} / {total}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {total > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-xl transition-all ${
                i === current
                  ? "ring-2 ring-[#a71225] ring-offset-2"
                  : "opacity-50 hover:opacity-80"
              }`}
            >
              <Image src={img} alt={`thumb ${i + 1}`} fill className="object-cover" sizes="96px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
