import Link from "next/link";
import { addCar } from "@/app/actions/cars";

const INPUT = [
  "w-full rounded-xl border border-black/[0.08] bg-[#f7f7f7] px-4 py-2.5",
  "text-[14px] text-[#111] outline-none placeholder:text-[#bbb]",
  "focus:border-[#a71225]/40 focus:bg-white transition-colors",
].join(" ");

const LABEL = "mb-1.5 block text-[11px] font-bold tracking-[1.5px] text-[#999] uppercase";

export default function AdminNewCarPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-5">

      <form action={addCar} className="space-y-4">

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
          <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-black/[0.10] bg-[#f7f7f7] px-6 py-10 text-center transition-colors hover:border-[#a71225]/30 hover:bg-white">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8 text-[#bbb]">
              <path d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            <div>
              <p className="text-[14px] font-semibold text-[#555]" style={{ fontFamily: "var(--font-tajawal)" }}>اضغط لرفع الصور</p>
              <p className="text-[12px] text-[#aaa]" style={{ fontFamily: "var(--font-tajawal)" }}>JPG, PNG, WebP — حتى ٨ صور</p>
            </div>
            <input name="images" type="file" multiple accept="image/jpeg,image/png,image/webp" className="sr-only" />
          </label>
        </section>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            type="submit"
            className="rounded-full bg-[#111] px-8 py-3 text-[14px] font-bold text-white transition-colors hover:bg-[#a71225]"
            style={{ fontFamily: "var(--font-tajawal)" }}
          >
            حفظ السيارة
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
    </div>
  );
}
