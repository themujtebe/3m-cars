"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCurrencyStore } from "@/stores/currency";
import { CURRENCIES } from "@/lib/currency";
import type { Car } from "@/lib/supabase/types";

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  const router = useRouter();
  const { currency } = useCurrencyStore();
  const rate = CURRENCIES[currency].rate / CURRENCIES[car.currency].rate;
  const convertedPrice = (car.price * rate).toLocaleString("en-US", { maximumFractionDigits: 0 });

  const isSold = car.status === "sold";
  const coverImage = car.images?.[0] ?? "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80";

  const handleWA = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(`https://wa.me/${car.whatsapp_number}?text=${encodeURIComponent(`مرحبا، أريد الاستفسار عن ${car.title_ar}`)}`, "_blank");
  };

  return (
    <div
      onClick={() => router.push(`/cars/${car.id}`)}
      className="group cursor-pointer rounded-2xl border border-black/[0.08] overflow-hidden bg-white transition-all duration-300 hover:border-[#a71225]/35 hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)] hover:-translate-y-[3px]"
    >
      {/* Image */}
      <div className="relative h-[200px] overflow-hidden bg-[#f0f0f0]">
        <Image
          src={coverImage}
          alt={car.title_ar}
          fill
          className={`object-cover transition-transform duration-500 group-hover:scale-105 ${isSold ? "grayscale" : ""}`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {car.featured && !isSold && (
          <span
            className="absolute right-3 top-3 rounded-full bg-[#a71225] px-3 py-0.5 text-[10px] font-bold text-white"
            style={{ fontFamily: "var(--font-tajawal)" }}
          >
            مميزة
          </span>
        )}
        {isSold && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/60">
            <span
              className="border-2 border-[#111] px-4 py-1 text-[22px] font-bold tracking-[4px] text-[#111]"
              style={{ fontFamily: "var(--font-tajawal)" }}
            >
              مُباع
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="px-5 py-4">
        <h3
          className="text-[16px] font-bold text-[#111] leading-snug"
          style={{ fontFamily: "var(--font-tajawal)" }}
        >
          {car.title_ar}
        </h3>

        <div
          className="mt-1.5 flex items-center gap-2 text-[13px] text-[#888]"
          style={{ fontFamily: "var(--font-tajawal)" }}
        >
          <span>{car.year}</span>
          <span className="h-1 w-1 rounded-full bg-[#ddd]" />
          <span>{car.mileage.toLocaleString("en-US")} كم</span>
        </div>

        <div className="my-4 h-px bg-[#f0f0f0]" />

        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] text-[#aaa]" style={{ fontFamily: "var(--font-tajawal)" }}>
              {CURRENCIES[currency].symbol}{" "}
            </span>
            <span
              className="text-[20px] font-bold text-[#a71225]"
              style={{ fontFamily: "var(--font-tajawal)" }}
            >
              {isSold ? "—" : convertedPrice}
            </span>
          </div>

          <button
            onClick={handleWA}
            className="rounded-lg border border-[#e0e0e0] px-3 py-1.5 text-[12px] font-semibold text-[#555] transition-all hover:border-[#25D366] hover:text-[#25D366]"
            style={{ fontFamily: "var(--font-tajawal)" }}
          >
            واتساب
          </button>
        </div>
      </div>
    </div>
  );
}
