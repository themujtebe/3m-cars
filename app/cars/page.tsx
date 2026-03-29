"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const cars = [
  {
    id: 1,
    brand: "Mercedes",
    model: "C-Class",
    title: "Mercedes C-Class",
    price: 8500,
    year: 2022,
    mileage: 42000,
    condition: "ممتازة",
    image:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    brand: "BMW",
    model: "5 Series",
    title: "BMW 5 Series",
    price: 11200,
    year: 2021,
    mileage: 38000,
    condition: "ممتازة",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    brand: "Toyota",
    model: "Land Cruiser",
    title: "Toyota Land Cruiser",
    price: 15900,
    year: 2020,
    mileage: 61000,
    condition: "ممتازة",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 4,
    brand: "Range Rover",
    model: "Sport",
    title: "Range Rover Sport",
    price: 18500,
    year: 2022,
    mileage: 29000,
    condition: "ممتازة",
    image:
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 5,
    brand: "Toyota",
    model: "Camry",
    title: "Toyota Camry",
    price: 6200,
    year: 2019,
    mileage: 89000,
    condition: "جيدة جدًا",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 6,
    brand: "Mercedes",
    model: "E-Class",
    title: "Mercedes E-Class",
    price: 13200,
    year: 2023,
    mileage: 18000,
    condition: "ممتازة",
    image:
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80",
  },
];

type SortOption =
  | "newest"
  | "oldest"
  | "price-low"
  | "price-high"
  | "mileage-low"
  | "mileage-high";

export default function CarsPage() {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  const [appliedBrand, setAppliedBrand] = useState("");
  const [appliedModel, setAppliedModel] = useState("");
  const [appliedYearFrom, setAppliedYearFrom] = useState("");
  const [appliedYearTo, setAppliedYearTo] = useState("");
  const [appliedSortBy, setAppliedSortBy] = useState<SortOption>("newest");

  const brands = useMemo(() => {
    return Array.from(new Set(cars.map((car) => car.brand)));
  }, []);

  const models = useMemo(() => {
    const filteredCars = brand ? cars.filter((car) => car.brand === brand) : cars;
    return Array.from(new Set(filteredCars.map((car) => car.model)));
  }, [brand]);

  const filteredCars = useMemo(() => {
    let result = [...cars];

    if (appliedBrand) {
      result = result.filter((car) => car.brand === appliedBrand);
    }

    if (appliedModel) {
      result = result.filter((car) => car.model === appliedModel);
    }

    if (appliedYearFrom) {
      result = result.filter((car) => car.year >= Number(appliedYearFrom));
    }

    if (appliedYearTo) {
      result = result.filter((car) => car.year <= Number(appliedYearTo));
    }

    switch (appliedSortBy) {
      case "newest":
        result.sort((a, b) => b.year - a.year);
        break;
      case "oldest":
        result.sort((a, b) => a.year - b.year);
        break;
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "mileage-low":
        result.sort((a, b) => a.mileage - b.mileage);
        break;
      case "mileage-high":
        result.sort((a, b) => b.mileage - a.mileage);
        break;
    }

    return result;
  }, [appliedBrand, appliedModel, appliedYearFrom, appliedYearTo, appliedSortBy]);

  const handleSearch = () => {
    setAppliedBrand(brand);
    setAppliedModel(model);
    setAppliedYearFrom(yearFrom);
    setAppliedYearTo(yearTo);
    setAppliedSortBy(sortBy);
  };

  const handleReset = () => {
    setBrand("");
    setModel("");
    setYearFrom("");
    setYearTo("");
    setSortBy("newest");

    setAppliedBrand("");
    setAppliedModel("");
    setAppliedYearFrom("");
    setAppliedYearTo("");
    setAppliedSortBy("newest");
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <Header />

      <section className="bg-gradient-to-b from-[#7b000b] via-[#2a0307] to-black">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-20 md:py-24">
          <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
            السيارات
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/70 sm:text-base sm:leading-8">
            تصفح السيارات المتوفرة لدينا بطريقة واضحة وسهلة.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="rounded-[24px] border border-white/10 bg-[#111111] p-4 shadow-[0_10px_40px_rgba(0,0,0,0.25)] sm:rounded-[28px] sm:p-5">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                نطاق السنة
              </label>
              <div className="grid grid-cols-[1fr_auto_1fr] gap-2">
                <select
                  value={yearFrom}
                  onChange={(e) => setYearFrom(e.target.value)}
                  className="h-11 rounded-xl border border-white/10 bg-white px-3 text-right text-black outline-none"
                >
                  <option value="">من</option>
                  {[2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017].map(
                    (year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    )
                  )}
                </select>

                <div className="flex items-center justify-center text-white/60">
                  -
                </div>

                <select
                  value={yearTo}
                  onChange={(e) => setYearTo(e.target.value)}
                  className="h-11 rounded-xl border border-white/10 bg-white px-3 text-right text-black outline-none"
                >
                  <option value="">إلى</option>
                  {[2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017].map(
                    (year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                العلامة التجارية
              </label>
              <select
                value={brand}
                onChange={(e) => {
                  setBrand(e.target.value);
                  setModel("");
                }}
                className="h-11 w-full rounded-xl border border-white/10 bg-white px-4 text-right text-black outline-none"
              >
                <option value="">كل العلامات التجارية</option>
                {brands.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                الموديل
              </label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="h-11 w-full rounded-xl border border-white/10 bg-white px-4 text-right text-black outline-none"
              >
                <option value="">كل الموديلات</option>
                {models.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                ترتيب حسب
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="h-11 w-full rounded-xl border border-white/10 bg-white px-4 text-right text-black outline-none"
              >
                <option value="newest">الأحدث أولاً</option>
                <option value="oldest">الأقدم أولاً</option>
                <option value="price-low">السعر: الأقل أولاً</option>
                <option value="price-high">السعر: الأعلى أولاً</option>
                <option value="mileage-low">الممشى: الأقل أولاً</option>
                <option value="mileage-high">الممشى: الأعلى أولاً</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
            <button
              onClick={handleSearch}
              className="w-full rounded-xl bg-red-600 px-8 py-3 text-sm font-bold text-white transition hover:bg-red-500 sm:w-auto"
            >
              انطلق في البحث
            </button>

            <button
              onClick={handleReset}
              className="w-full rounded-xl border border-white/20 px-6 py-3 text-sm font-bold text-white transition hover:border-white/40 hover:bg-white/5 sm:w-auto"
            >
              إعادة
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 sm:pb-16">
        <div className="mb-6 flex flex-col gap-2 text-center sm:flex-row sm:items-center sm:justify-between sm:text-right">
          <h2 className="text-2xl font-extrabold">السيارات المتوفرة</h2>
          <p className="text-sm text-white/60">{filteredCars.length} نتيجة</p>
        </div>

        {filteredCars.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {filteredCars.map((car) => (
              <div
                key={car.id}
                className="overflow-hidden rounded-[24px] border border-white/10 bg-[#0d0d0d] transition duration-300 hover:-translate-y-1 hover:border-red-500/40"
              >
                <img
                  src={car.image}
                  alt={car.title}
                  className="h-52 w-full object-cover sm:h-56"
                />

                <div className="p-5 text-right">
                  <h3 className="text-lg font-bold sm:text-xl">{car.title}</h3>

                  <p className="mt-2 text-base font-semibold text-red-500 sm:text-lg">
                    {car.price.toLocaleString()} د.ب
                  </p>

                  <div className="mt-4 space-y-2 text-sm leading-7 text-white/70">
                    <p>العلامة التجارية: {car.brand}</p>
                    <p>الموديل: {car.model}</p>
                    <p>السنة: {car.year}</p>
                    <p>الممشى: {car.mileage.toLocaleString()} كم</p>
                    <p>الحالة: {car.condition}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-[24px] border border-white/10 bg-[#0d0d0d] px-6 py-14 text-center text-white/70">
            لا توجد سيارات مطابقة للفلاتر المختارة.
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}