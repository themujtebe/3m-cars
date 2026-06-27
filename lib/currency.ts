export type CurrencyCode = "BHD" | "SAR" | "AED" | "KWD" | "OMR" | "QAR";

export const CURRENCIES: Record<CurrencyCode, { label: string; symbol: string; rate: number; flag: string }> = {
  BHD: { label: "د.ب (BHD)", symbol: "د.ب", rate: 1,     flag: "🇧🇭" },
  SAR: { label: "ر.س (SAR)", symbol: "ر.س", rate: 10.0,  flag: "🇸🇦" },
  AED: { label: "د.إ (AED)", symbol: "د.إ", rate: 9.77,  flag: "🇦🇪" },
  KWD: { label: "د.ك (KWD)", symbol: "د.ك", rate: 0.82,  flag: "🇰🇼" },
  OMR: { label: "ر.ع (OMR)", symbol: "ر.ع", rate: 1.03,  flag: "🇴🇲" },
  QAR: { label: "ر.ق (QAR)", symbol: "ر.ق", rate: 9.7,   flag: "🇶🇦" },
};

export function convertPrice(priceBHD: number, to: CurrencyCode): string {
  const { rate, symbol } = CURRENCIES[to];
  const converted = priceBHD * rate;
  return `${converted.toLocaleString("ar-BH", { maximumFractionDigits: 0 })} ${symbol}`;
}
