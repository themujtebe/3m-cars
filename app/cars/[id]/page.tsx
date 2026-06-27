import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageSlider from "@/components/ImageSlider";
import CarDetailClient from "@/components/CarDetailClient";
import type { Car } from "@/lib/supabase/types";
import { ArrowRight } from "lucide-react";

async function getCar(id: string): Promise<Car | null> {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    try {
      const { createClient } = await import("@/lib/supabase/server");
      const supabase = await createClient();
      const { data } = await supabase.from("cars").select("*").eq("id", id).single();
      if (data) return data as Car;
    } catch {}
  }
  const { localDb } = await import("@/lib/local/db");
  return localDb.cars.getById(id);
}

export default async function CarDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const car = await getCar(id);
  if (!car) notFound();

  return (
    <div className="min-h-screen bg-[#f7f7f7] text-[#111]">
      <Header />

      <div className="mx-auto max-w-6xl px-6 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-[13px] text-[#999]" style={{ fontFamily: "var(--font-tajawal)" }}>
          <Link href="/" className="hover:text-[#111] transition-colors">الرئيسية</Link>
          <ArrowRight className="h-3.5 w-3.5 rotate-180" />
          <Link href="/cars" className="hover:text-[#111] transition-colors">السيارات</Link>
          <ArrowRight className="h-3.5 w-3.5 rotate-180" />
          <span className="text-[#111] font-medium">{car.title_ar}</span>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          {/* Left: Images + Description */}
          <div className="space-y-5">
            {/* Image slider */}
            <div className="rounded-2xl overflow-hidden bg-white shadow-sm">
              <ImageSlider images={car.images ?? []} alt={car.title_ar} />
            </div>

            {/* Description */}
            {car.description_ar && (
              <div className="rounded-2xl border border-black/[0.06] bg-white p-6 shadow-sm">
                <p className="mb-3 text-[11px] font-bold tracking-[3px] text-[#a71225] uppercase">التفاصيل</p>
                <p className="text-[15px] leading-[2] text-[#555]" style={{ fontFamily: "var(--font-tajawal)" }}>
                  {car.description_ar}
                </p>
              </div>
            )}
          </div>

          {/* Right: Info panel — client component for currency + actions */}
          <CarDetailClient car={car} />
        </div>
      </div>

      <Footer />
    </div>
  );
}
