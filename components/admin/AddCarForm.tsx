"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle, Loader2, Upload, X } from "lucide-react";
import { addCar } from "@/app/actions/cars";

const INPUT = [
  "w-full rounded-xl border border-black/[0.08] bg-[#f7f7f7] px-4 py-2.5",
  "text-[14px] text-[#111] outline-none placeholder:text-[#bbb]",
  "focus:border-[#a71225]/40 focus:bg-white transition-colors",
].join(" ");

const LABEL = "mb-1.5 block text-[11px] font-bold tracking-[1.5px] text-[#999] uppercase";

export default function AddCarForm() {
  const router = useRouter();
  const [state, action, isPending] = useActionState(addCar, null);
  const [previews, setPreviews] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state && "success" in state) {
      setShowSuccess(true);
      const t = setTimeout(() => router.push("/admin/cars"), 1800);
      return () => clearTimeout(t);
    }
  }, [state, router]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    setPreviews(files.slice(0, 8).map((f) => URL.createObjectURL(f)));
  }

  function removePreview(index: number) {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <>
      {/* Loading overlay */}
      {isPending && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4 rounded-2xl bg-white px-10 py-8 shadow-2xl">
            <Loader2 className="h-10 w-10 animate-spin text-[#a71225]" />
            <p className="text-[15px] font-semibold text-[#111]" style={{ fontFamily: "var(--font-tajawal)" }}>
              جارٍ رفع السيارة...
            </p>
            <p className="text-[13px] text-[#999]" style={{ fontFamily: "var(--font-tajawal)" }}>
              يرجى الانتظار حتى يكتمل الرفع
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
              تمت إضافة السيارة بنجاح!
            </p>
            <p className="text-[13px] text-[#999]" style={{ fontFamily: "var(--font-tajawal)" }}>
              سيتم توجيهك لقائمة السيارات...
            </p>
          </div>
        </div>
      )}

      <form action={action} className="space-y-4">

        {/* Error banner */}
        {state && "error" in state && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-[#a71225]" style={{ fontFamily: "var(--font-tajawal)" }}>
            ⚠️ {state.error}
          </div>
        )}

        {/* Basic info */}
        <section className="rounded-2xl border border-black/[0.06] bg-white p-6">
          <h3 className="mb-5 text-[16px] font-bold text-[#111]" style={{ fontFamily: "var(--font-tajawal)" }}>
            البيانات الأساسية
          </h3>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[
              { label: "اسم السيارة (عربي)*", name: "title_ar", placeholder: "تويوتا كامري 2023", type: "text" },
              { label: "الماركة*",             name: "brand",    placeholder: "Toyota",           type: "text" },
              { label: "الموديل*",             name: "model",    placeholder: "Camry",            type: "text" },
              { label: "السنة*",               name: "year",     placeholder: "2023",             type: "number" },
              { label: "الكيلومترات",          name: "mileage",  placeholder: "15000",            type: "number" },
              { label: "السعر*",               name: "price",    placeholder: "4800",             type: "number" },
            ].map((f) => (
              <div key={f.name}>
                <label className={LABEL} style={{ fontFamily: "var(--font-tajawal)" }}>{f.label}</label>
                <input
                  name={f.name}
                  type={f.type}
                  required={f.label.endsWith("*")}
                  placeholder={f.placeholder}
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
              <select name="currency" defaultValue="BHD" className={INPUT} style={{ fontFamily: "var(--font-tajawal)" }}>
                <option value="BHD">دينار بحريني (BHD)</option>
                <option value="SAR">ريال سعودي (SAR)</option>
                <option value="AED">درهم إماراتي (AED)</option>
                <option value="KWD">دينار كويتي (KWD)</option>
                <option value="OMR">ريال عماني (OMR)</option>
                <option value="QAR">ريال قطري (QAR)</option>
              </select>
            </div>
            <div>
              <label className={LABEL} style={{ fontFamily: "var(--font-tajawal)" }}>الحالة</label>
              <select name="status" defaultValue="available" className={INPUT} style={{ fontFamily: "var(--font-tajawal)" }}>
                <option value="available">متاحة للبيع</option>
                <option value="sold">مُباعة</option>
              </select>
            </div>
            <div>
              <label className={LABEL} style={{ fontFamily: "var(--font-tajawal)" }}>سيارة مميزة؟</label>
              <select name="featured" defaultValue="false" className={INPUT} style={{ fontFamily: "var(--font-tajawal)" }}>
                <option value="false">لا</option>
                <option value="true">نعم</option>
              </select>
            </div>
          </div>
        </section>

        {/* Description */}
        <section className="rounded-2xl border border-black/[0.06] bg-white p-6">
          <h3 className="mb-5 text-[16px] font-bold text-[#111]" style={{ fontFamily: "var(--font-tajawal)" }}>
            الوصف
          </h3>
          <textarea
            name="description_ar"
            rows={4}
            placeholder="اكتب وصفاً مختصراً للسيارة — الحالة، الفحص، ملاحظات..."
            className={INPUT}
            style={{ fontFamily: "var(--font-tajawal)", resize: "vertical" }}
          />
        </section>

        {/* Images */}
        <section className="rounded-2xl border border-black/[0.06] bg-white p-6">
          <h3 className="mb-1 text-[16px] font-bold text-[#111]" style={{ fontFamily: "var(--font-tajawal)" }}>
            الصور
          </h3>
          <p className="mb-4 text-[13px] text-[#999]" style={{ fontFamily: "var(--font-tajawal)" }}>
            يمكن رفع حتى ٨ صور — JPG أو PNG أو WebP
          </p>

          {previews.length === 0 ? (
            <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-black/[0.10] bg-[#f7f7f7] px-6 py-10 text-center transition-colors hover:border-[#a71225]/30 hover:bg-white">
              <Upload className="h-8 w-8 text-[#bbb]" />
              <div>
                <p className="text-[14px] font-semibold text-[#555]" style={{ fontFamily: "var(--font-tajawal)" }}>اضغط لرفع الصور</p>
                <p className="text-[12px] text-[#aaa]" style={{ fontFamily: "var(--font-tajawal)" }}>JPG, PNG, WebP — حتى ٨ صور</p>
              </div>
              <input
                ref={fileInputRef}
                name="images"
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp"
                className="sr-only"
                onChange={handleFileChange}
              />
            </label>
          ) : (
            <div className="space-y-3">
              <div className="grid grid-cols-4 gap-3">
                {previews.map((url, i) => (
                  <div key={url} className="relative aspect-square overflow-hidden rounded-xl bg-[#f0f0f0]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} alt="" className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removePreview(i)}
                      className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
                {previews.length < 8 && (
                  <label className="flex aspect-square cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-black/[0.10] bg-[#f7f7f7] transition-colors hover:border-[#a71225]/30">
                    <Upload className="h-5 w-5 text-[#ccc]" />
                    <input
                      name="images"
                      type="file"
                      multiple
                      accept="image/jpeg,image/png,image/webp"
                      className="sr-only"
                      onChange={handleFileChange}
                    />
                  </label>
                )}
              </div>
              <p className="text-[12px] text-[#aaa]" style={{ fontFamily: "var(--font-tajawal)" }}>
                {previews.length} / ٨ صور محددة
              </p>
            </div>
          )}
        </section>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isPending}
            className="flex items-center gap-2 rounded-full bg-[#111] px-8 py-3 text-[14px] font-bold text-white transition-colors hover:bg-[#a71225] disabled:opacity-60"
            style={{ fontFamily: "var(--font-tajawal)" }}
          >
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            {isPending ? "جارٍ الرفع..." : "حفظ السيارة"}
          </button>
          <Link
            href="/admin/cars"
            className="rounded-full border border-black/[0.10] px-8 py-3 text-[14px] font-semibold text-[#555] transition-colors hover:border-black/20"
            style={{ fontFamily: "var(--font-tajawal)" }}
          >
            إلغاء
          </Link>
        </div>
      </form>
    </>
  );
}
