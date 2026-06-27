"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";
import { useCurrencyStore } from "@/stores/currency";
import { CURRENCIES } from "@/lib/currency";
import type { Car } from "@/lib/supabase/types";
import type { CurrencyCode } from "@/lib/currency";

interface Props { car: Car }

export default function CarDetailClient({ car }: Props) {
  const { currency, setCurrency } = useCurrencyStore();
  const [copied, setCopied] = useState(false);

  const rate = CURRENCIES[currency].rate / CURRENCIES[car.currency as CurrencyCode].rate;
  const convertedPrice = (car.price * rate).toLocaleString("en-US", { maximumFractionDigits: 0 });
  const isSold = car.status === "sold";

  const waText = encodeURIComponent(`مرحبا، أريد الاستفسار عن ${car.title_ar}`);
  const waLink = `https://wa.me/${car.whatsapp_number}?text=${waText}`;

  function handleShare() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="space-y-4">

      {/* Title card */}
      <div className="rounded-2xl border border-black/[0.06] bg-white p-6 shadow-sm">
        {/* Badges */}
        <div className="mb-4 flex items-center gap-2">
          {car.featured && !isSold && (
            <span className="rounded-full bg-[#a71225] px-3 py-1 text-[11px] font-bold text-white" style={{ fontFamily: "var(--font-tajawal)" }}>
              مميزة ★
            </span>
          )}
          <span
            className={`rounded-full px-3 py-1 text-[11px] font-bold ${
              isSold
                ? "bg-[#111] text-white"
                : "bg-emerald-50 text-emerald-700 border border-emerald-200"
            }`}
            style={{ fontFamily: "var(--font-tajawal)" }}
          >
            {isSold ? "مُباعة" : "متاحة للبيع"}
          </span>
        </div>

        <h1 className="text-[28px] font-black leading-snug text-[#0a0a0a]" style={{ fontFamily: "var(--font-tajawal)" }}>
          {car.title_ar}
        </h1>

        <p className="mt-2 text-[14px] font-semibold text-[#777]" style={{ fontFamily: "var(--font-tajawal)" }}>
          {car.brand} · {car.model} · {car.year}
        </p>

        {/* Price */}
        <div className="mt-5 border-t border-black/[0.06] pt-5">
          {isSold ? (
            <p className="text-[22px] font-bold text-[#bbb]" style={{ fontFamily: "var(--font-tajawal)" }}>مُباعة</p>
          ) : (
            <>
              <p className="mb-1 text-[11px] font-bold tracking-[2px] text-[#bbb] uppercase">السعر</p>
              <div className="flex items-center gap-3">
                <span className="text-[38px] font-black leading-none text-[#a71225]" style={{ fontFamily: "var(--font-tajawal)" }}>
                  {convertedPrice}
                </span>
                <div className="flex flex-col items-start">
                  <span className="text-[20px] leading-none">{CURRENCIES[currency].flag}</span>
                  <span className="mt-0.5 text-[12px] font-bold text-[#999]">{currency}</span>
                </div>
              </div>
              {/* Currency switcher */}
              <div className="mt-4 flex flex-wrap gap-2">
                {(Object.keys(CURRENCIES) as CurrencyCode[]).map((c) => (
                  <button
                    key={c}
                    onClick={() => setCurrency(c)}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-bold transition-colors ${
                      currency === c
                        ? "bg-[#111] text-white"
                        : "bg-[#f5f5f5] text-[#666] hover:bg-[#eaeaea]"
                    }`}
                  >
                    <span>{CURRENCIES[c].flag}</span>
                    <span>{c}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Specs */}
      <div className="rounded-2xl border border-black/[0.06] bg-white p-6 shadow-sm">
        <p className="mb-4 text-[11px] font-bold tracking-[3px] text-[#a71225] uppercase">المواصفات</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "الماركة",      value: car.brand },
            { label: "الموديل",      value: car.model },
            { label: "سنة الصنع",   value: String(car.year) },
            { label: "الكيلومترات", value: `${(car.mileage ?? 0).toLocaleString("en-US")} كم` },
            { label: "العملة",       value: car.currency },
            { label: "الحالة",       value: isSold ? "مُباعة" : "متاحة" },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-xl bg-[#f7f7f7] px-4 py-3">
              <p className="text-[10px] font-bold tracking-[1.5px] text-[#aaa] uppercase" style={{ fontFamily: "var(--font-tajawal)" }}>
                {label}
              </p>
              <p className="mt-1 text-[14px] font-semibold text-[#111]" style={{ fontFamily: "var(--font-tajawal)" }}>
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="rounded-2xl border border-black/[0.06] bg-white p-6 shadow-sm space-y-3">
        {!isSold ? (
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3.5 text-[15px] font-bold text-white transition-colors hover:bg-[#1fba59]"
            style={{ fontFamily: "var(--font-tajawal)" }}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            تواصل مع البائع عبر واتساب
          </a>
        ) : (
          <div className="flex w-full items-center justify-center rounded-xl bg-[#f0f0f0] py-3.5 text-[15px] font-semibold text-[#bbb]" style={{ fontFamily: "var(--font-tajawal)" }}>
            هذه السيارة مُباعة
          </div>
        )}

        <button
          onClick={handleShare}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-black/[0.08] py-3 text-[14px] font-semibold text-[#555] transition-colors hover:border-black/20 hover:text-[#111]"
          style={{ fontFamily: "var(--font-tajawal)" }}
        >
          {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Share2 className="h-4 w-4" />}
          {copied ? "تم نسخ الرابط!" : "مشاركة السيارة"}
        </button>
      </div>
    </div>
  );
}
