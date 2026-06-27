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
      <div className="relative aspect-[4/5] overflow-hidden bg-[#f0f0f0]">
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
          className="text-[18px] font-bold text-[#111] leading-snug"
          style={{ fontFamily: "var(--font-tajawal)" }}
        >
          {car.title_ar}
        </h3>

        {/* Specs row */}
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-md bg-[#f0f0f0] px-2.5 py-1 text-[12px] font-semibold text-[#555]" style={{ fontFamily: "var(--font-tajawal)" }}>
            {car.year}
          </span>
          <span className="rounded-md bg-[#f0f0f0] px-2.5 py-1 text-[12px] font-semibold text-[#555]" style={{ fontFamily: "var(--font-tajawal)" }}>
            {car.mileage.toLocaleString("en-US")} كم
          </span>
          <span className="rounded-md bg-[#f0f0f0] px-2.5 py-1 text-[12px] font-semibold text-[#555]" style={{ fontFamily: "var(--font-tajawal)" }}>
            {car.brand}
          </span>
        </div>

        <div className="my-4 h-px bg-[#f0f0f0]" />

        <div className="flex items-center justify-between gap-3">
          {/* Price */}
          <div>
            <div className="mb-1 flex items-center gap-1.5">
              <span className="text-[16px] leading-none">{CURRENCIES[currency].flag}</span>
              <span className="text-[11px] font-bold text-[#aaa]">{currency}</span>
            </div>
            <span
              className="text-[26px] font-bold text-[#a71225]"
              style={{ fontFamily: "var(--font-tajawal)" }}
            >
              {isSold ? "—" : convertedPrice}
            </span>
          </div>

          {/* WhatsApp button */}
          {!isSold && (
            <button
              onClick={handleWA}
              className="flex items-center gap-1.5 rounded-xl bg-[#25D366] px-4 py-2.5 text-[13px] font-bold text-white transition-all hover:bg-[#1fba59] active:scale-95"
              style={{ fontFamily: "var(--font-tajawal)" }}
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              واتساب
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
