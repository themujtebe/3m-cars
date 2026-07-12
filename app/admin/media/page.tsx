import Image from "next/image";
import Link from "next/link";
import { Star, Trash2 } from "lucide-react";
import { setMainImageAction, deleteCarImageAction } from "@/app/actions/media";
import type { Car } from "@/lib/supabase/types";

async function getCars(): Promise<Car[]> {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    try {
      const { createClient } = await import("@/lib/supabase/server");
      const supabase = await createClient();
      const { data } = await supabase.from("cars").select("*").order("created_at", { ascending: false });
      if (data) return data as Car[];
    } catch {}
  }
  const { localDb } = await import("@/lib/local/db");
  return localDb.cars.getAll();
}

export default async function AdminMediaPage() {
  const cars = await getCars();

  const allImages = cars.flatMap((car) =>
    (car.images ?? []).map((url, idx) => ({ car, url, isMain: idx === 0 }))
  );

  const carsWithImages = cars.filter((c) => (c.images?.length ?? 0) > 0).length;

  return (
    <div className="space-y-5">

      {/* Header */}
      <div>
        <p className="text-[11px] font-bold tracking-[3px] text-[#a71225] uppercase">MEDIA</p>
        <p className="mt-1 text-[13px] text-[#999] dark:text-[#6b6b70]" style={{ fontFamily: "var(--font-tajawal)" }}>
          {allImages.length} صورة من {carsWithImages} سيارة — الصورة الأولى تُعرض كالصورة الرئيسية في القائمة
        </p>
      </div>

      {allImages.length === 0 ? (
        <div className="rounded-2xl border border-black/[0.06] bg-white py-16 text-center dark:bg-[#1e1e22] dark:border-white/[0.08]">
          <p className="text-[14px] text-[#bbb] dark:text-[#4b4b50]" style={{ fontFamily: "var(--font-tajawal)" }}>
            لا توجد صور — أضف سيارات مع صور أولاً
          </p>
          <Link
            href="/admin/cars/new"
            className="mt-3 inline-block text-[13px] font-bold text-[#a71225] hover:underline dark:text-[#e8323f]"
            style={{ fontFamily: "var(--font-tajawal)" }}
          >
            + إضافة سيارة
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {allImages.map(({ car, url, isMain }) => (
            <div
              key={`${car.id}-${url}`}
              className={`dm-card rounded-2xl border bg-white p-4 dark:bg-[#1e1e22] ${
                isMain ? "border-[#a71225]/25 dark:border-[#e8323f]/35" : "border-black/[0.06] dark:border-white/[0.08]"
              }`}
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden rounded-xl bg-[#f0f0f0] dark:bg-[#28282d]">
                <Image
                  src={url}
                  alt={car.title_ar}
                  fill
                  className="object-cover"
                  sizes="(max-width:640px) 100vw, (max-width:1280px) 50vw, 33vw"
                />
                {isMain && (
                  <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-[#a71225] px-2.5 py-1 text-[10px] font-bold text-white dark:bg-[#e8323f]">
                    <Star className="h-2.5 w-2.5 fill-current" />
                    رئيسية
                  </span>
                )}
              </div>

              {/* Car info */}
              <div className="mt-3">
                <p className="text-[13px] font-semibold text-[#111] dark:text-[#f5f5f4]" style={{ fontFamily: "var(--font-tajawal)" }}>
                  {car.title_ar}
                </p>
                <p className="text-[11px] text-[#999] dark:text-[#6b6b70]" style={{ fontFamily: "var(--font-tajawal)" }}>
                  {car.brand} · {car.year}
                </p>
              </div>

              {/* Actions */}
              <div className="mt-3 flex gap-2">
                {!isMain && (
                  <form action={setMainImageAction}>
                    <input type="hidden" name="carId"    value={car.id} />
                    <input type="hidden" name="imageUrl" value={url} />
                    <button
                      type="submit"
                      className="rounded-lg border border-black/[0.08] px-3 py-2 text-[12px] font-medium text-[#555] transition-colors hover:border-[#a71225]/30 hover:text-[#a71225] dark:border-white/[0.08] dark:text-[#96969c] dark:hover:border-[#e8323f]/40 dark:hover:text-[#e8323f]"
                      style={{ fontFamily: "var(--font-tajawal)" }}
                    >
                      تعيين كرئيسية
                    </button>
                  </form>
                )}
                <form action={deleteCarImageAction}>
                  <input type="hidden" name="carId"    value={car.id} />
                  <input type="hidden" name="imageUrl" value={url} />
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-[12px] font-medium text-[#a71225] transition-colors hover:bg-red-100 dark:border-red-800 dark:bg-red-950 dark:text-red-400 dark:hover:bg-red-900"
                    style={{ fontFamily: "var(--font-tajawal)" }}
                  >
                    <Trash2 className="h-3 w-3" />
                    حذف
                  </button>
                </form>
                <Link
                  href={`/admin/cars/${car.id}/edit`}
                  className="mr-auto rounded-lg border border-black/[0.08] px-3 py-2 text-[12px] font-medium text-[#555] transition-colors hover:border-black/20 hover:text-[#111] dark:border-white/[0.08] dark:text-[#96969c] dark:hover:border-white/20 dark:hover:text-[#f5f5f4]"
                  style={{ fontFamily: "var(--font-tajawal)" }}
                >
                  تعديل السيارة
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
