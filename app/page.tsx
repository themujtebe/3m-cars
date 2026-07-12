import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import CarCard from "@/components/CarCard";
import StatsSection from "@/components/StatsSection";
import CTASection from "@/components/CTASection";
import type { Car } from "@/lib/supabase/types";

async function getLatestCars(): Promise<Car[]> {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    try {
      const { createClient } = await import("@/lib/supabase/server");
      const supabase = await createClient();
      const { data } = await supabase.from("cars").select("*").order("created_at", { ascending: false }).limit(6);
      if (data) return data as Car[];
    } catch {}
  }
  const { localDb } = await import("@/lib/local/db");
  return localDb.cars.getAll().slice(0, 6);
}

export default async function HomePage() {
  const cars = await getLatestCars();

  return (
    <div className="min-h-screen bg-white dark:bg-[#17171a]">
      <Header />
      <Hero />
      <StatsSection />

      <section className="bg-white dark:bg-[#17171a] px-5 py-14 sm:px-10 sm:py-[72px]">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="mb-2 text-[11px] font-bold tracking-[3px] text-[#a71225] uppercase" style={{ fontFamily: "var(--font-tajawal)" }}>اختيارات مميزة</p>
            <h2 className="text-[28px] font-bold text-[#111] dark:text-[#f5f5f4] sm:text-[36px]" style={{ fontFamily: "var(--font-tajawal)" }}>أحدث السيارات</h2>
          </div>
          <Link href="/cars" className="shrink-0 text-[13px] font-bold tracking-[0.5px] text-[#111] uppercase transition-colors hover:text-[#a71225] dark:text-[#c9c9ce] dark:hover:text-[#a71225]" style={{ fontFamily: "var(--font-tajawal)" }}>
            عرض الكل ←
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cars.map((car) => <CarCard key={car.id} car={car} />)}
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
}
