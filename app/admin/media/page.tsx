const images = [
  "صورة رئيسية - Mercedes",
  "صورة جانبية - BMW",
  "صورة داخلية - Range Rover",
  "صورة خلفية - Lexus",
  "صورة رئيسية - Toyota",
  "صورة إضافية - Porsche",
];

const LABEL = "text-[11px] font-bold tracking-[1.5px] text-[#999] uppercase";

export default function AdminMediaPage() {
  return (
    <div className="space-y-5">

      {/* Header */}
      <div>
        <p className={LABEL} style={{ fontFamily: "var(--font-tajawal)" }}>إدارة الصور</p>
        <p className="mt-1 text-[13px] text-[#999]" style={{ fontFamily: "var(--font-tajawal)" }}>
          تنظيم صور السيارات وتحديد الصورة الرئيسية وحذف الصور غير المطلوبة
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {images.map((image) => (
          <div
            key={image}
            className="rounded-2xl border border-black/[0.06] bg-white p-4"
          >
            <div className="h-44 rounded-xl bg-[#f0f0f0]" />
            <h3
              className="mt-4 text-[14px] font-semibold text-[#111]"
              style={{ fontFamily: "var(--font-tajawal)" }}
            >
              {image}
            </h3>
            <p
              className="mt-1 text-[12px] text-[#999]"
              style={{ fontFamily: "var(--font-tajawal)" }}
            >
              مرتبطة بسيارة داخل النظام
            </p>

            <div className="mt-4 flex gap-2">
              <button
                type="button"
                className="rounded-lg border border-black/[0.08] px-3 py-2 text-[12px] font-medium text-[#555] transition-colors hover:border-black/20 hover:text-[#111]"
                style={{ fontFamily: "var(--font-tajawal)" }}
              >
                تعيين كرئيسية
              </button>
              <button
                type="button"
                className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-[12px] font-medium text-[#a71225] transition-colors hover:bg-red-100"
                style={{ fontFamily: "var(--font-tajawal)" }}
              >
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
