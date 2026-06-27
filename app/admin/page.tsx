import Link from "next/link";
import { CarFront, Eye, Star, FolderKanban, Plus, Settings, Image as ImageIcon } from "lucide-react";

const stats = [
  { title: "إجمالي السيارات",   value: "24", icon: CarFront,      color: "#a71225" },
  { title: "السيارات المتاحة",  value: "18", icon: Eye,           color: "#10b981" },
  { title: "السيارات المميزة",  value: "6",  icon: Star,          color: "#f59e0b" },
  { title: "المسودات",          value: "4",  icon: FolderKanban,  color: "#6366f1" },
];

const quickActions = [
  { title: "إضافة سيارة",    desc: "أضف سيارة جديدة مع الصور والتفاصيل.",      href: "/admin/cars/new",  icon: Plus },
  { title: "إدارة السيارات", desc: "عرض وتعديل وحذف السيارات المضافة.",         href: "/admin/cars",      icon: CarFront },
  { title: "إدارة الصور",    desc: "تنظيم صور السيارات وتحديد الرئيسية.",      href: "/admin/media",     icon: ImageIcon },
  { title: "الإعدادات",      desc: "التحكم ببيانات التواصل وإعدادات الموقع.", href: "/admin/settings",  icon: Settings },
];

const latestCars = [
  { title: "Mercedes C-Class", price: "8,500 د.ب", year: "2022", status: "متاحة" },
  { title: "BMW 5 Series",     price: "10,200 د.ب", year: "2021", status: "مُباعة" },
  { title: "Range Rover Evoque", price: "15,900 د.ب", year: "2023", status: "متاحة" },
  { title: "Lexus IS",         price: "7,800 د.ب",  year: "2020", status: "مُباعة" },
];

const statusStyle: Record<string, string> = {
  متاحة:  "bg-emerald-50 text-emerald-600 border border-emerald-200",
  مُباعة: "bg-red-50 text-[#a71225] border border-red-200",
};

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">

      {/* Welcome banner */}
      <div className="rounded-2xl border border-black/[0.06] bg-white p-6 md:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[11px] font-bold tracking-[3px] text-[#a71225] uppercase" style={{ fontFamily: "var(--font-tajawal)" }}>
              DASHBOARD
            </p>
            <h2 className="mt-1 text-[28px] font-bold text-[#111]" style={{ fontFamily: "var(--font-tajawal)" }}>
              إدارة الموقع من مكان واحد
            </h2>
            <p className="mt-2 max-w-lg text-[14px] leading-[1.8] text-[#777]" style={{ fontFamily: "var(--font-tajawal)" }}>
              تحكم بالسيارات والباقات والصور والإعدادات بسهولة ويسر.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/admin/cars/new"
              className="flex items-center gap-2 rounded-full bg-[#111] px-6 py-2.5 text-[13px] font-bold text-white transition-colors hover:bg-[#a71225]"
              style={{ fontFamily: "var(--font-tajawal)" }}
            >
              <Plus size={15} />
              إضافة سيارة
            </Link>
            <Link
              href="/admin/cars"
              className="flex items-center gap-2 rounded-full border border-black/[0.10] px-6 py-2.5 text-[13px] font-semibold text-[#555] transition-colors hover:border-black/20"
              style={{ fontFamily: "var(--font-tajawal)" }}
            >
              <CarFront size={15} />
              إدارة السيارات
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.title} className="rounded-2xl border border-black/[0.06] bg-white p-5">
              <div className="mb-4 flex items-start justify-between">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: `${s.color}12` }}
                >
                  <Icon size={18} style={{ color: s.color }} />
                </div>
              </div>
              <p className="text-[13px] text-[#777]" style={{ fontFamily: "var(--font-tajawal)" }}>{s.title}</p>
              <p className="mt-1 text-[36px] font-bold text-[#111]" style={{ fontFamily: "var(--font-tajawal)" }}>{s.value}</p>
            </div>
          );
        })}
      </div>

      {/* Quick actions + latest cars */}
      <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">

        {/* Quick actions */}
        <div className="rounded-2xl border border-black/[0.06] bg-white p-6">
          <h3 className="mb-1 text-[17px] font-bold text-[#111]" style={{ fontFamily: "var(--font-tajawal)" }}>إجراءات سريعة</h3>
          <p className="mb-5 text-[13px] text-[#999]" style={{ fontFamily: "var(--font-tajawal)" }}>اختصارات للوصول السريع</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {quickActions.map((a) => {
              const Icon = a.icon;
              return (
                <Link
                  key={a.title}
                  href={a.href}
                  className="group rounded-xl border border-black/[0.06] bg-[#f7f7f7] p-4 transition-all hover:border-[#a71225]/25 hover:bg-white hover:shadow-sm"
                >
                  <div
                    className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg"
                    style={{ background: "rgba(167,18,37,0.08)" }}
                  >
                    <Icon size={16} className="text-[#a71225]" />
                  </div>
                  <p className="text-[14px] font-bold text-[#111] transition-colors group-hover:text-[#a71225]" style={{ fontFamily: "var(--font-tajawal)" }}>{a.title}</p>
                  <p className="mt-1 text-[12px] text-[#888]" style={{ fontFamily: "var(--font-tajawal)" }}>{a.desc}</p>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Latest cars */}
        <div className="rounded-2xl border border-black/[0.06] bg-white p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-[17px] font-bold text-[#111]" style={{ fontFamily: "var(--font-tajawal)" }}>آخر السيارات</h3>
              <p className="text-[13px] text-[#999]" style={{ fontFamily: "var(--font-tajawal)" }}>آخر السيارات المضافة</p>
            </div>
            <Link href="/admin/cars" className="text-[12px] font-bold text-[#a71225] hover:underline" style={{ fontFamily: "var(--font-tajawal)" }}>
              عرض الكل
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            {latestCars.map((car) => (
              <div key={car.title} className="flex items-center justify-between rounded-xl border border-black/[0.06] bg-[#f7f7f7] px-4 py-3">
                <div>
                  <p className="text-[14px] font-semibold text-[#111]" style={{ fontFamily: "var(--font-tajawal)" }}>{car.title}</p>
                  <p className="text-[12px] text-[#999]" style={{ fontFamily: "var(--font-tajawal)" }}>{car.year} · {car.price}</p>
                </div>
                <span className={`rounded-full px-3 py-0.5 text-[11px] font-bold ${statusStyle[car.status] ?? ""}`} style={{ fontFamily: "var(--font-tajawal)" }}>
                  {car.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
