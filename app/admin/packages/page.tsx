import Link from "next/link";
import { Pencil, Plus, Trash2, Check } from "lucide-react";

const packages = [
  {
    name: "الاقتصادية",
    price: "10",
    features: ["تصوير 8 صور احترافية", "تعديل الصور بالكامل", "نشر كـ Post في حسابنا"],
  },
  {
    name: "الكلاسيكية",
    price: "15",
    features: ["تصوير 10 صور احترافية", "تعديل الصور بالكامل", "نشر كـ Post في حسابنا", "سبونسر Instagram ليومين"],
    highlighted: true,
  },
  {
    name: "الاحترافية",
    price: "20",
    features: ["تصوير 15 صورة احترافية", "تعديل الصور بالكامل", "نشر كـ Story وPost", "أولوية في الظهور"],
  },
];

const LABEL = "text-[11px] font-bold tracking-[1.5px] text-[#999] uppercase";

export default function AdminPackagesPage() {
  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className={LABEL} style={{ fontFamily: "var(--font-tajawal)" }}>الباقات</p>
          <p className="mt-1 text-[13px] text-[#999]" style={{ fontFamily: "var(--font-tajawal)" }}>
            أضف أو عدّل الباقات الخاصة بعرض السيارات
          </p>
        </div>
        <Link
          href="#"
          className="flex items-center gap-2 rounded-full bg-[#111] px-5 py-2.5 text-[13px] font-bold text-white transition-colors hover:bg-[#a71225]"
          style={{ fontFamily: "var(--font-tajawal)" }}
        >
          <Plus className="h-4 w-4" />
          إضافة باقة
        </Link>
      </div>

      {/* Cards */}
      <div className="grid gap-5 xl:grid-cols-3">
        {packages.map((pkg) => (
          <div
            key={pkg.name}
            className={`rounded-2xl border p-6 ${
              pkg.highlighted
                ? "border-[#a71225]/30 shadow-[0_4px_24px_rgba(167,18,37,0.08)]"
                : "border-black/[0.06]"
            } bg-white`}
          >
            <h3
              className="text-[18px] font-bold text-[#111]"
              style={{ fontFamily: "var(--font-tajawal)" }}
            >
              الباقة {pkg.name}
            </h3>
            <p
              className="mt-2 text-[36px] font-bold text-[#a71225]"
              style={{ fontFamily: "var(--font-tajawal)" }}
            >
              {pkg.price}
              <span className="mr-1 text-[14px] font-normal text-[#999]">د.ب</span>
            </p>

            <div className="my-4 h-px bg-[#f0f0f0]" />

            <ul className="flex flex-col gap-3">
              {pkg.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5">
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                    style={{ background: "rgba(167,18,37,0.08)" }}
                  >
                    <Check className="h-3 w-3 text-[#a71225]" />
                  </span>
                  <span className="text-[13px] text-[#555]" style={{ fontFamily: "var(--font-tajawal)" }}>{f}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex gap-2">
              <button
                type="button"
                className="flex items-center gap-1.5 rounded-lg border border-black/[0.08] px-4 py-2 text-[12px] font-medium text-[#555] transition-colors hover:border-black/20 hover:text-[#111]"
                style={{ fontFamily: "var(--font-tajawal)" }}
              >
                <Pencil className="h-3 w-3" />
                تعديل
              </button>
              <button
                type="button"
                className="flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-[12px] font-medium text-[#a71225] transition-colors hover:bg-red-100"
                style={{ fontFamily: "var(--font-tajawal)" }}
              >
                <Trash2 className="h-3 w-3" />
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
