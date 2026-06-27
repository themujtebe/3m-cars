import Link from "next/link";
import { Pencil, Plus, Trash2 } from "lucide-react";

const packages = [
  {
    name: "الباقة الأساسية",
    price: "25 د.ب",
    features: ["عرض سيارة واحدة", "وصف مختصر", "مدة محددة"],
  },
  {
    name: "الباقة المتقدمة",
    price: "50 د.ب",
    features: ["عرض سيارة واحدة", "صور أكثر", "ظهور أقوى"],
  },
  {
    name: "الباقة المميزة",
    price: "80 د.ب",
    features: ["سيارة مميزة", "أفضل ظهور", "تسويق أقوى"],
  },
];

export default function AdminPackagesPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-3xl font-black text-white">إدارة الباقات</h2>
            <p className="mt-2 text-sm leading-7 text-zinc-400">
              أضف أو عدّل الباقات الخاصة بعرض السيارات.
            </p>
          </div>

          <Link
            href="#"
            className="inline-flex items-center gap-2 rounded-2xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-500"
          >
            <Plus size={16} />
            إضافة باقة
          </Link>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        {packages.map((pkg) => (
          <div
            key={pkg.name}
            className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6"
          >
            <h3 className="text-2xl font-bold text-white">{pkg.name}</h3>
            <p className="mt-3 text-3xl font-black text-red-300">{pkg.price}</p>

            <div className="mt-5 space-y-3">
              {pkg.features.map((feature) => (
                <div
                  key={feature}
                  className="rounded-xl border border-white/10 bg-[#0a0a0a] px-4 py-3 text-sm text-zinc-300"
                >
                  {feature}
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-medium text-white transition hover:border-red-500/25 hover:bg-white/[0.06]"
              >
                <Pencil size={16} />
                تعديل
              </button>

              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-300 transition hover:bg-red-500/15"
              >
                <Trash2 size={16} />
                حذف
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}