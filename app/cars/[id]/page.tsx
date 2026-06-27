import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageSlider from "@/components/ImageSlider";
import CarPriceDisplay from "@/components/CarPriceDisplay";
import type { Car } from "@/lib/supabase/types";
import { ArrowRight } from "lucide-react";
import ShareButton from "@/components/ShareButton";

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

  const isSold = car.status === "sold";
  const waText = encodeURIComponent(`مرحبا، أريد الاستفسار عن ${car.title_ar}`);
  const waLink = `https://wa.me/${car.whatsapp_number}?text=${waText}`;

  return (
    <div className="min-h-screen bg-white text-[#111]">
      <Header />

      <div className="px-10 py-8">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-[13px] text-[#999]" style={{ fontFamily: "var(--font-tajawal)" }}>
          <Link href="/" className="hover:text-[#111] transition-colors">الرئيسية</Link>
          <ArrowRight className="h-3.5 w-3.5 rotate-180" />
          <Link href="/cars" className="hover:text-[#111] transition-colors">السيارات</Link>
          <ArrowRight className="h-3.5 w-3.5 rotate-180" />
          <span className="text-[#111]">{car.title_ar}</span>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          {/* Images */}
          <div>
            <ImageSlider images={car.images} alt={car.title_ar} />
          </div>

          {/* Info panel */}
          <div>
            {isSold && (
              <div className="mb-4 flex items-center gap-2 rounded-xl border border-[#a71225]/20 bg-[#a71225]/5 px-4 py-3">
                <span className="text-xs font-bold text-[#a71225]" style={{ fontFamily: "var(--font-tajawal)" }}>SOLD</span>
                <span className="text-[13px] text-[#777]" style={{ fontFamily: "var(--font-tajawal)" }}>هذه السيارة مُباعة</span>
              </div>
            )}

            {car.featured && (
              <span className="mb-3 inline-block rounded-full bg-[#a71225] px-3 py-0.5 text-[10px] font-bold text-white" style={{ fontFamily: "var(--font-tajawal)" }}>
                مميزة
              </span>
            )}

            <h1 className="text-[28px] font-bold leading-snug text-[#111]" style={{ fontFamily: "var(--font-tajawal)" }}>
              {car.title_ar}
            </h1>

            <div className="mt-2">
              <CarPriceDisplay price={car.price} sold={isSold} />
            </div>

            {/* Specs */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                { label: "الماركة", value: car.brand },
                { label: "الموديل", value: car.model },
                { label: "السنة", value: car.year.toString() },
                { label: "الكيلومترات", value: `${car.mileage.toLocaleString("en-US")} كم` },
              ].map(({ label, value }) => (
                <div key={label} className="rounded-xl border border-black/[0.06] bg-[#f7f7f7] px-4 py-3">
                  <p className="text-[11px] font-bold tracking-[1px] text-[#999] uppercase" style={{ fontFamily: "var(--font-tajawal)" }}>{label}</p>
                  <p className="mt-1 text-[15px] font-semibold text-[#111]" style={{ fontFamily: "var(--font-tajawal)" }}>{value}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            {car.description_ar && (
              <div className="mt-6">
                <p className="mb-2 text-[11px] font-bold tracking-[2px] text-[#999] uppercase" style={{ fontFamily: "var(--font-tajawal)" }}>DETAILS</p>
                <p className="text-[15px] leading-[1.8] text-[#555]" style={{ fontFamily: "var(--font-tajawal)" }}>{car.description_ar}</p>
              </div>
            )}

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-3">
              {!isSold && (
                <a
                  href={waLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-[14px] font-bold text-white transition-colors hover:bg-[#1fba59]"
                  style={{ fontFamily: "var(--font-tajawal)" }}
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  تواصل مع البائع عبر واتساب
                </a>
              )}
              <ShareButton />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
