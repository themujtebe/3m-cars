"use client";

import { useCurrencyStore } from "@/stores/currency";
import { CURRENCIES } from "@/lib/currency";

interface Props {
  price: number;
  sold: boolean;
}

export default function CarPriceDisplay({ price, sold }: Props) {
  const { currency } = useCurrencyStore();
  const converted = (price * CURRENCIES[currency].rate).toLocaleString("en-US", { maximumFractionDigits: 0 });

  if (sold) return (
    <p className="mt-3 text-[18px] font-semibold text-[#999]" style={{ fontFamily: "var(--font-tajawal)" }}>
      مُباعة
    </p>
  );

  return (
    <div className="mt-3 flex items-baseline gap-1">
      <span className="text-[13px] text-[#aaa]" style={{ fontFamily: "var(--font-tajawal)" }}>
        {CURRENCIES[currency].symbol}
      </span>
      <span className="text-[32px] font-bold text-[#a71225]" style={{ fontFamily: "var(--font-tajawal)" }}>
        {converted}
      </span>
    </div>
  );
}
