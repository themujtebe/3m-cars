import Link from "next/link";

const INPUT = [
  "w-full rounded-xl border border-black/[0.08] bg-[#f7f7f7] px-4 py-2.5",
  "text-[14px] text-[#111] outline-none placeholder:text-[#bbb]",
  "focus:border-[#a71225]/40 focus:bg-white transition-colors",
].join(" ");

const LABEL = "mb-1.5 block text-[11px] font-bold tracking-[1.5px] text-[#999] uppercase";

export default function AdminEditCarPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-4">

      <form className="space-y-4">

        {/* Basic info */}
        <section className="rounded-2xl border border-black/[0.06] bg-white p-6">
          <h3 className="mb-5 text-[16px] font-bold text-[#111]" style={{ fontFamily: "var(--font-tajawal)" }}>
            البيانات الأساسية
          </h3>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[
              { label: "اسم السيارة", value: "Mercedes C-Class" },
              { label: "الماركة",     value: "Mercedes" },
              { label: "الموديل",     value: "C-Class" },
              { label: "السنة",       value: "2022" },
              { label: "السعر",       value: "8500" },
              { label: "الكيلومترات", value: "42000" },
            ].map((f) => (
              <div key={f.label}>
                <label className={LABEL} style={{ fontFamily: "var(--font-tajawal)" }}>{f.label}</label>
                <input defaultValue={f.value} className={INPUT} style={{ fontFamily: "var(--font-tajawal)" }} />
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
              <label className={LABEL} style={{ fontFamily: "var(--font-tajawal)" }}>الحالة</label>
              <select className={INPUT} style={{ fontFamily: "var(--font-tajawal)" }}>
                <option>متاحة للبيع</option>
                <option>مُباعة</option>
              </select>
            </div>
            <div>
              <label className={LABEL} style={{ fontFamily: "var(--font-tajawal)" }}>مميزة؟</label>
              <select className={INPUT} style={{ fontFamily: "var(--font-tajawal)" }}>
                <option>نعم</option>
                <option>لا</option>
              </select>
            </div>
            <div>
              <label className={LABEL} style={{ fontFamily: "var(--font-tajawal)" }}>العملة</label>
              <select className={INPUT} style={{ fontFamily: "var(--font-tajawal)" }}>
                <option>BHD — دينار بحريني</option>
                <option>SAR — ريال سعودي</option>
                <option>AED — درهم إماراتي</option>
              </select>
            </div>
          </div>
        </section>

        {/* Description */}
        <section className="rounded-2xl border border-black/[0.06] bg-white p-6">
          <h3 className="mb-5 text-[16px] font-bold text-[#111]" style={{ fontFamily: "var(--font-tajawal)" }}>الوصف</h3>
          <textarea
            rows={4}
            defaultValue="سيارة نظيفة جداً بحالة ممتازة وجاهزة للاستخدام."
            className={INPUT}
            style={{ fontFamily: "var(--font-tajawal)", resize: "vertical" }}
          />
        </section>

        {/* Images */}
        <section className="rounded-2xl border border-black/[0.06] bg-white p-6">
          <h3 className="mb-5 text-[16px] font-bold text-[#111]" style={{ fontFamily: "var(--font-tajawal)" }}>الصور</h3>
          <div className="grid grid-cols-3 gap-3">
            {["صورة رئيسية", "صورة إضافية", "صورة إضافية"].map((label, i) => (
              <div key={i} className="flex h-24 items-center justify-center rounded-xl border-2 border-dashed border-black/[0.08] bg-[#f7f7f7] text-[12px] text-[#bbb]" style={{ fontFamily: "var(--font-tajawal)" }}>
                {label}
              </div>
            ))}
          </div>
          <label className="mt-3 flex cursor-pointer items-center gap-2 text-[13px] font-semibold text-[#a71225] hover:underline" style={{ fontFamily: "var(--font-tajawal)" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
              <path d="M12 4v16m8-8H4" />
            </svg>
            إضافة صور جديدة
            <input type="file" multiple accept="image/*" className="sr-only" />
          </label>
        </section>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            className="rounded-full bg-[#111] px-8 py-3 text-[14px] font-bold text-white transition-colors hover:bg-[#a71225]"
            style={{ fontFamily: "var(--font-tajawal)" }}
          >
            حفظ التعديلات
          </button>
          <button
            type="button"
            className="rounded-full border border-amber-200 bg-amber-50 px-6 py-3 text-[14px] font-semibold text-amber-700 transition-colors hover:bg-amber-100"
            style={{ fontFamily: "var(--font-tajawal)" }}
          >
            تعيين كمُباعة
          </button>
          <button
            type="button"
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
    </div>
  );
}
