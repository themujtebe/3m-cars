"use client";

import { useRef, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle, Loader2, Plus, X } from "lucide-react";
import { updateCar, deleteCar } from "@/app/actions/cars";
import type { Car } from "@/lib/supabase/types";
import type { CurrencyCode } from "@/lib/currency";

const INPUT = [
  "w-full rounded-xl border border-black/[0.08] bg-[#f7f7f7] px-4 py-2.5",
  "text-[14px] text-[#111] outline-none placeholder:text-[#bbb]",
  "focus:border-[#a71225]/40 focus:bg-white transition-colors",
].join(" ");

const LABEL = "mb-1.5 block text-[11px] font-bold tracking-[1.5px] text-[#999] uppercase";

interface Props { car: Car }

export default function EditCarForm({ car }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [keptImages, setKeptImages] = useState<string[]>(car.images ?? []);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function handleNewImages(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    const remaining = 8 - keptImages.length - newFiles.length;
    const toAdd = files.slice(0, remaining);
    setNewFiles((prev) => [...prev, ...toAdd]);
    setNewPreviews((prev) => [...prev, ...toAdd.map((f) => URL.createObjectURL(f))]);
    e.target.value = "";
  }

  function removeKept(url: string) {
    setKeptImages((prev) => prev.filter((u) => u !== url));
  }

  function removeNew(index: number) {
    setNewPreviews((prev) => prev.filter((_, i) => i !== index));
    setNewFiles((prev) => prev.filter((_, i) => i !== index));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const data = new FormData(form);

    // Remove auto-collected file entries and add our managed files
    data.delete("new_images");
    for (const file of newFiles) {
      data.append("new_images", file);
    }
    // Replace keep_image with current state
    data.delete("keep_image_placeholder");
    for (const url of keptImages) {
      data.append("keep_image", url);
    }

    startTransition(async () => {
      const result = await updateCar(null, data);
      if ("success" in result) {
        setShowSuccess(true);
        setTimeout(() => router.push("/admin/cars"), 1800);
      } else {
        setError(result.error);
      }
    });
  }

  const totalImages = keptImages.length + newFiles.length;

  return (
    <>
      {/* Loading overlay */}
      {isPending && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4 rounded-2xl bg-white px-10 py-8 shadow-2xl">
            <Loader2 className="h-10 w-10 animate-spin text-[#a71225]" />
            <p className="text-[15px] font-semibold text-[#111]" style={{ fontFamily: "var(--font-tajawal)" }}>
              جارٍ حفظ التعديلات...
            </p>
            <p className="text-[13px] text-[#999]" style={{ fontFamily: "var(--font-tajawal)" }}>
              يرجى الانتظار
            </p>
          </div>
        </div>
      )}

      {/* Success popup */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4 rounded-2xl bg-white px-10 py-8 shadow-2xl">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
              <CheckCircle className="h-9 w-9 text-emerald-500" />
            </div>
            <p className="text-[17px] font-bold text-[#111]" style={{ fontFamily: "var(--font-tajawal)" }}>
              تم حفظ التعديلات بنجاح!
            </p>
            <p className="text-[13px] text-[#999]" style={{ fontFamily: "var(--font-tajawal)" }}>
              سيتم توجيهك لقائمة السيارات...
            </p>
          </div>
        </div>
      )}

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
        <input type="hidden" name="id" value={car.id} />

        {/* Error banner */}
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-[#a71225]" style={{ fontFamily: "var(--font-tajawal)" }}>
            ⚠️ {error}
          </div>
        )}

        {/* Basic info */}
        <section className="rounded-2xl border border-black/[0.06] bg-white p-6">
          <h3 className="mb-5 text-[16px] font-bold text-[#111]" style={{ fontFamily: "var(--font-tajawal)" }}>
            البيانات الأساسية
          </h3>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[
              { label: "اسم السيارة (عربي)*", name: "title_ar", value: car.title_ar,             type: "text"   },
              { label: "الماركة*",             name: "brand",    value: car.brand,                type: "text"   },
              { label: "الموديل*",             name: "model",    value: car.model,                type: "text"   },
              { label: "السنة*",               name: "year",     value: String(car.year),         type: "number" },
              { label: "الكيلومترات",          name: "mileage",  value: String(car.mileage ?? 0), type: "number" },
              { label: "السعر*",               name: "price",    value: String(car.price),        type: "number" },
            ].map((f) => (
              <div key={f.name}>
                <label className={LABEL} style={{ fontFamily: "var(--font-tajawal)" }}>{f.label}</label>
                <input
                  name={f.name}
                  type={f.type}
                  defaultValue={f.value}
                  required={f.label.endsWith("*")}
                  className={INPUT}
                  style={{ fontFamily: "var(--font-tajawal)" }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Settings */}
        <section className="rounded-2xl border border-black/[0.06] bg-white p-6">
          <h3 className="mb-5 text-[16px] font-bold text-[#111]" style={{ fontFamily: "var(--font-tajawal)" }}>
            الإعدادات
          </h3>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className={LABEL} style={{ fontFamily: "var(--font-tajawal)" }}>العملة</label>
              <select name="currency" defaultValue={car.currency} className={INPUT} style={{ fontFamily: "var(--font-tajawal)" }}>
                {(["BHD","SAR","AED","KWD","OMR","QAR"] as CurrencyCode[]).map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={LABEL} style={{ fontFamily: "var(--font-tajawal)" }}>الحالة</label>
              <select name="status" defaultValue={car.status} className={INPUT} style={{ fontFamily: "var(--font-tajawal)" }}>
                <option value="available">متاحة للبيع</option>
                <option value="sold">مُباعة</option>
              </select>
            </div>
            <div>
              <label className={LABEL} style={{ fontFamily: "var(--font-tajawal)" }}>سيارة مميزة؟</label>
              <select name="featured" defaultValue={String(car.featured)} className={INPUT} style={{ fontFamily: "var(--font-tajawal)" }}>
                <option value="false">لا</option>
                <option value="true">نعم</option>
              </select>
            </div>
          </div>
        </section>

        {/* Description */}
        <section className="rounded-2xl border border-black/[0.06] bg-white p-6">
          <h3 className="mb-5 text-[16px] font-bold text-[#111]" style={{ fontFamily: "var(--font-tajawal)" }}>الوصف</h3>
          <textarea
            name="description_ar"
            rows={4}
            defaultValue={car.description_ar ?? ""}
            className={INPUT}
            style={{ fontFamily: "var(--font-tajawal)", resize: "vertical" }}
          />
        </section>

        {/* Images */}
        <section className="rounded-2xl border border-black/[0.06] bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-[16px] font-bold text-[#111]" style={{ fontFamily: "var(--font-tajawal)" }}>الصور</h3>
            <span className="text-[12px] text-[#aaa]" style={{ fontFamily: "var(--font-tajawal)" }}>
              {totalImages} / ٨
            </span>
          </div>

          {totalImages === 0 ? (
            <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-black/[0.10] bg-[#f7f7f7] px-6 py-10 text-center transition-colors hover:border-[#a71225]/30 hover:bg-white">
              <Plus className="h-8 w-8 text-[#bbb]" />
              <p className="text-[14px] font-semibold text-[#555]" style={{ fontFamily: "var(--font-tajawal)" }}>اضغط لإضافة صور</p>
              <input ref={fileInputRef} type="file" multiple accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={handleNewImages} />
            </label>
          ) : (
            <div className="grid grid-cols-4 gap-3">
              {keptImages.map((url) => (
                <div key={url} className="relative aspect-square overflow-hidden rounded-xl bg-[#f0f0f0]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt="" className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeKept(url)}
                    className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}

              {newPreviews.map((url, i) => (
                <div key={url} className="relative aspect-square overflow-hidden rounded-xl bg-[#f0f0f0]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt="" className="h-full w-full object-cover" />
                  <div className="absolute bottom-0 inset-x-0 bg-emerald-500/80 py-0.5 text-center text-[10px] font-bold text-white" style={{ fontFamily: "var(--font-tajawal)" }}>
                    جديدة
                  </div>
                  <button
                    type="button"
                    onClick={() => removeNew(i)}
                    className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}

              {totalImages < 8 && (
                <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-black/[0.10] bg-[#f7f7f7] transition-colors hover:border-[#a71225]/30 hover:bg-white">
                  <Plus className="h-5 w-5 text-[#ccc]" />
                  <span className="text-[10px] text-[#bbb]" style={{ fontFamily: "var(--font-tajawal)" }}>إضافة</span>
                  <input type="file" multiple accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={handleNewImages} />
                </label>
              )}
            </div>
          )}
        </section>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={isPending}
            className="flex items-center gap-2 rounded-full bg-[#111] px-8 py-3 text-[14px] font-bold text-white transition-colors hover:bg-[#a71225] disabled:opacity-60"
            style={{ fontFamily: "var(--font-tajawal)" }}
          >
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            {isPending ? "جارٍ الحفظ..." : "حفظ التعديلات"}
          </button>

          <button
            type="button"
            onClick={() => {
              if (confirm("هل أنت متأكد من حذف هذه السيارة؟")) {
                startTransition(() => deleteCar(car.id));
              }
            }}
            className="rounded-full border border-red-200 bg-red-50 px-6 py-3 text-[14px] font-semibold text-[#a71225] transition-colors hover:bg-red-100"
            style={{ fontFamily: "var(--font-tajawal)" }}
          >
            حذف السيارة
          </button>

          <Link
            href="/admin/cars"
            className="rounded-full border border-black/[0.08] px-6 py-3 text-[14px] font-semibold text-[#555] transition-colors hover:border-black/20"
            style={{ fontFamily: "var(--font-tajawal)" }}
          >
            إلغاء
          </Link>
        </div>
      </form>
    </>
  );
}
