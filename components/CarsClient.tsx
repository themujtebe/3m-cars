"use client";

import { useMemo, useState } from "react";
import CarCard from "@/components/CarCard";
import type { Car } from "@/lib/supabase/types";
import { SlidersHorizontal, RotateCcw } from "lucide-react";

type SortOption = "newest" | "oldest" | "price-low" | "price-high";

const selectClass =
  "h-11 w-full rounded-xl border border-black/[0.08] bg-white px-4 text-right text-[14px] text-[#333] outline-none focus:border-[#a71225]/40 transition-colors appearance-none";

export default function CarsClient({ initialCars }: { initialCars: Car[] }) {
  const [brand, setBrand]     = useState("");
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo]   = useState("");
  const [sortBy, setSortBy]   = useState<SortOption>("newest");
  const [applied, setApplied] = useState({ brand: "", yearFrom: "", yearTo: "", sortBy: "newest" as SortOption });

  const brands = useMemo(() => Array.from(new Set(initialCars.map((c) => c.brand))).sort(), [initialCars]);

  const filteredCars = useMemo(() => {
    let result = [...initialCars];
    if (applied.brand)    result = result.filter((c) => c.brand === applied.brand);
    if (applied.yearFrom) result = result.filter((c) => c.year >= Number(applied.yearFrom));
    if (applied.yearTo)   result = result.filter((c) => c.year <= Number(applied.yearTo));
    switch (applied.sortBy) {
      case "newest":     result.sort((a, b) => b.year - a.year); break;
      case "oldest":     result.sort((a, b) => a.year - b.year); break;
      case "price-low":  result.sort((a, b) => a.price - b.price); break;
      case "price-high": result.sort((a, b) => b.price - a.price); break;
    }
    return result;
  }, [applied, initialCars]);

  const handleSearch = () => setApplied({ brand, yearFrom, yearTo, sortBy });
  const handleReset  = () => {
    setBrand(""); setYearFrom(""); setYearTo(""); setSortBy("newest");
    setApplied({ brand: "", yearFrom: "", yearTo: "", sortBy: "newest" });
  };

  return (
    <>
      {/* Page header */}
      <section className="border-b border-black/[0.06] bg-[#f7f7f7] px-10 py-14">
        <p className="mb-2 text-[11px] font-bold tracking-[4px] text-[#a71225]" style={{ fontFamily: "var(--font-tajawal)" }}>
          معرضنا
        </p>
        <h1 className="text-[42px] font-bold text-[#111]" style={{ fontFamily: "var(--font-tajawal)" }}>
          السيارات المتوفرة
        </h1>
        <p className="mt-2 text-[15px] text-[#777]" style={{ fontFamily: "var(--font-tajawal)" }}>
          تصفح مجموعتنا من السيارات المختارة بعناية
        </p>
      </section>

      {/* Filters */}
      <section className="border-b border-black/[0.06] bg-white px-10 py-6">
        <div className="flex flex-wrap items-end gap-4">
          <div className="flex-1 min-w-[160px]">
            <label className="mb-1.5 block text-[11px] font-bold tracking-[2px] text-[#999]" style={{ fontFamily: "var(--font-tajawal)" }}>
              الماركة
            </label>
            <select value={brand} onChange={(e) => setBrand(e.target.value)} className={selectClass} style={{ fontFamily: "var(--font-tajawal)" }}>
              <option value="">كل الماركات</option>
              {brands.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>

          <div className="flex-1 min-w-[120px]">
            <label className="mb-1.5 block text-[11px] font-bold tracking-[2px] text-[#999]" style={{ fontFamily: "var(--font-tajawal)" }}>
              من سنة
            </label>
            <select value={yearFrom} onChange={(e) => setYearFrom(e.target.value)} className={selectClass} style={{ fontFamily: "var(--font-tajawal)" }}>
              <option value="">السنة</option>
              {[2024,2023,2022,2021,2020,2019,2018].map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>

          <div className="flex-1 min-w-[120px]">
            <label className="mb-1.5 block text-[11px] font-bold tracking-[2px] text-[#999]" style={{ fontFamily: "var(--font-tajawal)" }}>
              إلى سنة
            </label>
            <select value={yearTo} onChange={(e) => setYearTo(e.target.value)} className={selectClass} style={{ fontFamily: "var(--font-tajawal)" }}>
              <option value="">السنة</option>
              {[2024,2023,2022,2021,2020,2019,2018].map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>

          <div className="flex-1 min-w-[180px]">
            <label className="mb-1.5 block text-[11px] font-bold tracking-[2px] text-[#999]" style={{ fontFamily: "var(--font-tajawal)" }}>
              الترتيب
            </label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortOption)} className={selectClass} style={{ fontFamily: "var(--font-tajawal)" }}>
              <option value="newest">الأحدث أولاً</option>
              <option value="oldest">الأقدم أولاً</option>
              <option value="price-low">السعر: الأقل</option>
              <option value="price-high">السعر: الأعلى</option>
            </select>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSearch}
              className="flex items-center gap-2 rounded-xl bg-[#111] px-6 py-2.5 text-[13px] font-bold text-white transition-colors hover:bg-[#a71225]"
              style={{ fontFamily: "var(--font-tajawal)" }}
            >
              <SlidersHorizontal className="h-4 w-4" />
              بحث
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 rounded-xl border border-black/[0.08] px-4 py-2.5 text-[13px] text-[#555] transition-colors hover:border-black/20"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="px-10 py-10">
        <p className="mb-6 text-[13px] text-[#999]" style={{ fontFamily: "var(--font-tajawal)" }}>
          {filteredCars.length} سيارة
        </p>

        {filteredCars.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredCars.map((car) => <CarCard key={car.id} car={car} />)}
          </div>
        ) : (
          <div className="rounded-2xl border border-black/[0.06] bg-[#f7f7f7] py-20 text-center">
            <p className="text-[15px] text-[#999]" style={{ fontFamily: "var(--font-tajawal)" }}>
              لا توجد سيارات مطابقة للفلاتر المختارة
            </p>
            <button onClick={handleReset} className="mt-4 text-[13px] text-[#a71225] underline" style={{ fontFamily: "var(--font-tajawal)" }}>
              إعادة الضبط
            </button>
          </div>
        )}
      </section>
    </>
  );
}
