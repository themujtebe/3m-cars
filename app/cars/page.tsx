"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CarCard from "@/components/CarCard";
import type { Car } from "@/lib/supabase/types";
import { SlidersHorizontal, RotateCcw } from "lucide-react";

const MOCK_CARS: Car[] = [
  { id: "1", title_ar: "تويوتا كامري", title_en: "Toyota Camry", brand: "Toyota", model: "Camry", year: 2023, mileage: 15000, price: 4800, currency: "BHD", description_ar: null, description_en: null, status: "available", featured: true, images: ["https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&q=80"], whatsapp_number: "97336414730", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "2", title_ar: "BMW 5 Series", title_en: "BMW 5 Series", brand: "BMW", model: "5 Series", year: 2022, mileage: 28000, price: 9500, currency: "BHD", description_ar: null, description_en: null, status: "available", featured: false, images: ["https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80"], whatsapp_number: "97336414730", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "3", title_ar: "لكزس ES 350", title_en: "Lexus ES 350", brand: "Lexus", model: "ES 350", year: 2023, mileage: 8000, price: 12200, currency: "BHD", description_ar: null, description_en: null, status: "sold", featured: false, images: ["https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=80"], whatsapp_number: "97336414730", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "4", title_ar: "مرسيدس E-Class", title_en: "Mercedes E-Class", brand: "Mercedes", model: "E-Class", year: 2022, mileage: 22000, price: 13500, currency: "BHD", description_ar: null, description_en: null, status: "available", featured: false, images: ["https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80"], whatsapp_number: "97336414730", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "5", title_ar: "تويوتا لاند كروزر", title_en: "Toyota Land Cruiser", brand: "Toyota", model: "Land Cruiser", year: 2021, mileage: 48000, price: 15900, currency: "BHD", description_ar: null, description_en: null, status: "available", featured: false, images: ["https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80"], whatsapp_number: "97336414730", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "6", title_ar: "رنج روفر سبورت", title_en: "Range Rover Sport", brand: "Range Rover", model: "Sport", year: 2022, mileage: 29000, price: 18500, currency: "BHD", description_ar: null, description_en: null, status: "available", featured: false, images: ["https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80"], whatsapp_number: "97336414730", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "7", title_ar: "بورش كايين", title_en: "Porsche Cayenne", brand: "Porsche", model: "Cayenne", year: 2021, mileage: 34000, price: 22000, currency: "BHD", description_ar: null, description_en: null, status: "available", featured: true, images: ["https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80"], whatsapp_number: "97336414730", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "8", title_ar: "نيسان باترول", title_en: "Nissan Patrol", brand: "Nissan", model: "Patrol", year: 2020, mileage: 62000, price: 11800, currency: "BHD", description_ar: null, description_en: null, status: "available", featured: false, images: ["https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80"], whatsapp_number: "97336414730", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "9", title_ar: "مرسيدس GLE", title_en: "Mercedes GLE", brand: "Mercedes", model: "GLE", year: 2023, mileage: 9000, price: 28500, currency: "BHD", description_ar: null, description_en: null, status: "available", featured: false, images: ["https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80"], whatsapp_number: "97336414730", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
];

type SortOption = "newest" | "oldest" | "price-low" | "price-high";

const selectClass = "h-11 w-full rounded-xl border border-black/[0.08] bg-white px-4 text-right text-[14px] text-[#333] outline-none focus:border-[#a71225]/40 transition-colors appearance-none";

export default function CarsPage() {
  const [brand, setBrand] = useState("");
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [applied, setApplied] = useState({ brand: "", yearFrom: "", yearTo: "", sortBy: "newest" as SortOption });

  const brands = useMemo(() => Array.from(new Set(MOCK_CARS.map((c) => c.brand))).sort(), []);

  const filteredCars = useMemo(() => {
    let result = [...MOCK_CARS];
    if (applied.brand) result = result.filter((c) => c.brand === applied.brand);
    if (applied.yearFrom) result = result.filter((c) => c.year >= Number(applied.yearFrom));
    if (applied.yearTo) result = result.filter((c) => c.year <= Number(applied.yearTo));
    switch (applied.sortBy) {
      case "newest": result.sort((a, b) => b.year - a.year); break;
      case "oldest": result.sort((a, b) => a.year - b.year); break;
      case "price-low": result.sort((a, b) => a.price - b.price); break;
      case "price-high": result.sort((a, b) => b.price - a.price); break;
    }
    return result;
  }, [applied]);

  const handleSearch = () => setApplied({ brand, yearFrom, yearTo, sortBy });
  const handleReset = () => {
    setBrand(""); setYearFrom(""); setYearTo(""); setSortBy("newest");
    setApplied({ brand: "", yearFrom: "", yearTo: "", sortBy: "newest" });
  };

  return (
    <div className="min-h-screen bg-white text-[#111]">
      <Header />

      {/* Page header */}
      <section className="border-b border-black/[0.06] bg-[#f7f7f7] px-10 py-14">
        <p
          className="mb-2 text-[11px] font-bold tracking-[4px] text-[#a71225] uppercase"
          style={{ fontFamily: "var(--font-tajawal)" }}
        >
          OUR INVENTORY
        </p>
        <h1
          className="text-[42px] font-bold text-[#111]"
          style={{ fontFamily: "var(--font-tajawal)" }}
        >
          السيارات المتوفرة
        </h1>
        <p
          className="mt-2 text-[15px] text-[#777]"
          style={{ fontFamily: "var(--font-tajawal)" }}
        >
          تصفح مجموعتنا من السيارات المختارة بعناية
        </p>
      </section>

      {/* Filters */}
      <section className="border-b border-black/[0.06] bg-white px-10 py-6">
        <div className="flex flex-wrap items-end gap-4">
          {/* Brand */}
          <div className="flex-1 min-w-[160px]">
            <label className="mb-1.5 block text-[11px] font-bold tracking-[2px] text-[#999] uppercase" style={{ fontFamily: "var(--font-tajawal)" }}>
              BRAND
            </label>
            <select value={brand} onChange={(e) => setBrand(e.target.value)} className={selectClass} style={{ fontFamily: "var(--font-tajawal)" }}>
              <option value="">كل الماركات</option>
              {brands.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>

          {/* Year from */}
          <div className="flex-1 min-w-[120px]">
            <label className="mb-1.5 block text-[11px] font-bold tracking-[2px] text-[#999] uppercase" style={{ fontFamily: "var(--font-tajawal)" }}>
              FROM
            </label>
            <select value={yearFrom} onChange={(e) => setYearFrom(e.target.value)} className={selectClass} style={{ fontFamily: "var(--font-tajawal)" }}>
              <option value="">السنة</option>
              {[2024,2023,2022,2021,2020,2019,2018].map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>

          {/* Year to */}
          <div className="flex-1 min-w-[120px]">
            <label className="mb-1.5 block text-[11px] font-bold tracking-[2px] text-[#999] uppercase" style={{ fontFamily: "var(--font-tajawal)" }}>
              TO
            </label>
            <select value={yearTo} onChange={(e) => setYearTo(e.target.value)} className={selectClass} style={{ fontFamily: "var(--font-tajawal)" }}>
              <option value="">السنة</option>
              {[2024,2023,2022,2021,2020,2019,2018].map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>

          {/* Sort */}
          <div className="flex-1 min-w-[180px]">
            <label className="mb-1.5 block text-[11px] font-bold tracking-[2px] text-[#999] uppercase" style={{ fontFamily: "var(--font-tajawal)" }}>
              SORT
            </label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortOption)} className={selectClass} style={{ fontFamily: "var(--font-tajawal)" }}>
              <option value="newest">الأحدث أولاً</option>
              <option value="oldest">الأقدم أولاً</option>
              <option value="price-low">السعر: الأقل</option>
              <option value="price-high">السعر: الأعلى</option>
            </select>
          </div>

          {/* Actions */}
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
        <div className="mb-6 flex items-center justify-between">
          <p className="text-[13px] text-[#999]" style={{ fontFamily: "var(--font-tajawal)" }}>
            {filteredCars.length} سيارة
          </p>
        </div>

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

      <Footer />
    </div>
  );
}
