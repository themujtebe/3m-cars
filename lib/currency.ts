export type CurrencyCode = "BHD" | "SAR" | "AED" | "KWD" | "OMR" | "QAR";

export const CURRENCIES: Record<CurrencyCode, { label: string; symbol: string; rate: number }> = {
  BHD: { label: "د.ب (BHD)", symbol: "د.ب", rate: 1 },
  SAR: { label: "ر.س (SAR)", symbol: "ر.س", rate: 10.0 },
  AED: { label: "د.إ (AED)", symbol: "د.إ", rate: 9.77 },
  KWD: { label: "د.ك (KWD)", symbol: "د.ك", rate: 0.82 },
  OMR: { label: "ر.ع (OMR)", symbol: "ر.ع", rate: 1.03 },
  QAR: { label: "ر.ق (QAR)", symbol: "ر.ق", rate: 9.7 },
};

export function convertPrice(priceBHD: number, to: CurrencyCode): string {
  const { rate, symbol } = CURRENCIES[to];
  const converted = priceBHD * rate;
  return `${converted.toLocaleString("ar-BH", { maximumFractionDigits: 0 })} ${symbol}`;
}
