import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Trash2, CheckCircle, XCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { deleteCar, updateCarStatus } from "@/app/actions/cars";
import type { Car } from "@/lib/supabase/types";

const MOCK: Car[] = [
  {
    id: "1", title_ar: "تويوتا كامري 2023", title_en: null, brand: "Toyota", model: "Camry",
    year: 2023, mileage: 15000, price: 4800, currency: "BHD", description_ar: null,
    description_en: null, status: "available", featured: true,
    images: ["https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=400&q=60"],
    whatsapp_number: "97336414730", created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
  },
  {
    id: "2", title_ar: "BMW 5 Series", title_en: null, brand: "BMW", model: "5 Series",
    year: 2022, mileage: 28000, price: 9500, currency: "BHD", description_ar: null,
    description_en: null, status: "sold", featured: false,
    images: ["https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=400&q=60"],
    whatsapp_number: "97336414730", created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
  },
];

async function getCars(): Promise<Car[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("cars").select("*").order("created_at", { ascending: false });
    if (data && data.length > 0) return data as Car[];
  } catch {}
  return MOCK;
}

export default async function AdminCarsPage() {
  const cars = await getCars();
  const available = cars.filter((c) => c.status === "available").length;
  const sold = cars.filter((c) => c.status === "sold").length;

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[13px] text-[#999]" style={{ fontFamily: "var(--font-tajawal)" }}>
            {cars.length} سيارة — {available} متاحة · {sold} مُباعة
          </p>
        </div>
        <Link
          href="/admin/cars/new"
          className="flex items-center gap-2 rounded-full bg-[#111] px-5 py-2.5 text-[13px] font-bold text-white transition-colors hover:bg-[#a71225]"
          style={{ fontFamily: "var(--font-tajawal)" }}
        >
          <Plus className="h-4 w-4" />
          إضافة سيارة
        </Link>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-black/[0.06] bg-white overflow-hidden">
        {cars.length === 0 ? (
          <div className="py-16 text-center text-[14px] text-[#bbb]" style={{ fontFamily: "var(--font-tajawal)" }}>
            لا توجد سيارات — أضف أول سيارة
          </div>
        ) : (
          <div className="divide-y divide-black/[0.05]">
            {cars.map((car) => (
              <div key={car.id} className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-[#f7f7f7]">

                {/* Image */}
                <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-xl bg-[#f0f0f0]">
                  {car.images?.[0] ? (
                    <Image src={car.images[0]} alt={car.title_ar} fill className="object-cover" sizes="80px" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-[11px] text-[#ccc]">لا صورة</div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="truncate text-[15px] font-semibold text-[#111]" style={{ fontFamily: "var(--font-tajawal)" }}>
                    {car.title_ar}
                  </p>
                  <p className="text-[12px] text-[#999]" style={{ fontFamily: "var(--font-tajawal)" }}>
                    {car.year} · {car.mileage.toLocaleString("en-US")} KM · {car.price.toLocaleString("en-US")} {car.currency}
                  </p>
                </div>

                {/* Status badge */}
                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-bold ${
                    car.status === "available"
                      ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                      : "bg-red-50 text-[#a71225] border border-red-200"
                  }`}
                  style={{ fontFamily: "var(--font-tajawal)" }}
                >
                  {car.status === "available" ? "متاحة" : "مُباعة"}
                </span>

                {/* Actions */}
                <div className="flex shrink-0 items-center gap-2">
                  <Link
                    href={`/cars/${car.id}`}
                    target="_blank"
                    className="rounded-lg border border-black/[0.08] px-3 py-1.5 text-[12px] font-medium text-[#555] transition-colors hover:border-black/20 hover:text-[#111]"
                    style={{ fontFamily: "var(--font-tajawal)" }}
                  >
                    عرض
                  </Link>
                  <Link
                    href={`/admin/cars/${car.id}/edit`}
                    className="flex items-center gap-1.5 rounded-lg border border-black/[0.08] px-3 py-1.5 text-[12px] font-medium text-[#555] transition-colors hover:border-black/20 hover:text-[#111]"
                    style={{ fontFamily: "var(--font-tajawal)" }}
                  >
                    <Pencil className="h-3 w-3" />
                    تعديل
                  </Link>
                  <form action={updateCarStatus}>
                    <input type="hidden" name="id" value={car.id} />
                    <input type="hidden" name="status" value={car.status === "available" ? "sold" : "available"} />
                    <button
                      type="submit"
                      className="flex items-center gap-1.5 rounded-lg border border-black/[0.08] px-3 py-1.5 text-[12px] font-medium text-[#555] transition-colors hover:border-black/20 hover:text-[#111]"
                      style={{ fontFamily: "var(--font-tajawal)" }}
                    >
                      {car.status === "available"
                        ? <><XCircle className="h-3 w-3" />تعيين مباعة</>
                        : <><CheckCircle className="h-3 w-3" />تعيين متاحة</>
                      }
                    </button>
                  </form>
                  <form action={deleteCarAction}>
                    <input type="hidden" name="id" value={car.id} />
                    <button
                      type="submit"
                      className="flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-[12px] font-medium text-[#a71225] transition-colors hover:bg-red-100"
                      style={{ fontFamily: "var(--font-tajawal)" }}
                    >
                      <Trash2 className="h-3 w-3" />
                      حذف
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
