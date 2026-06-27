import Link from "next/link";
import Image from "next/image";
import { CarFront, Eye, Star, XCircle, Plus, Settings, Image as ImageIcon } from "lucide-react";
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

export default async function AdminDashboardPage() {
  const cars = await getCars();

  const total     = cars.length;
  const available = cars.filter((c) => c.status === "available").length;
  const featured  = cars.filter((c) => c.featured).length;
  const sold      = cars.filter((c) => c.status === "sold").length;
  const latest    = cars.slice(0, 5);

  const stats = [
    { title: "إجمالي السيارات",   value: String(total),     icon: CarFront,  color: "#a71225" },
    { title: "السيارات المتاحة",  value: String(available), icon: Eye,       color: "#10b981" },
    { title: "السيارات المميزة",  value: String(featured),  icon: Star,      color: "#f59e0b" },
    { title: "المُباعة",           value: String(sold),      icon: XCircle,   color: "#6366f1" },
  ];

  const quickActions = [
    { title: "إضافة سيارة",    desc: "أضف سيارة جديدة مع الصور والتفاصيل.",      href: "/admin/cars/new",  icon: Plus },
    { title: "إدارة السيارات", desc: "عرض وتعديل وحذف السيارات المضافة.",         href: "/admin/cars",      icon: CarFront },
    { title: "إدارة الصور",    desc: "تنظيم صور السيارات وتحديد الرئيسية.",      href: "/admin/media",     icon: ImageIcon },
    { title: "الإعدادات",      desc: "التحكم ببيانات التواصل وإعدادات الموقع.", href: "/admin/settings",  icon: Settings },
  ];

  const statusStyle: Record<string, string> = {
    available: "bg-emerald-50 text-emerald-600 border border-emerald-200",
    sold:      "bg-red-50 text-[#a71225] border border-red-200",
  };

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

          {latest.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-[13px] text-[#bbb]" style={{ fontFamily: "var(--font-tajawal)" }}>لا توجد سيارات بعد</p>
              <Link
                href="/admin/cars/new"
                className="mt-3 text-[12px] font-bold text-[#a71225] hover:underline"
                style={{ fontFamily: "var(--font-tajawal)" }}
              >
                + أضف أول سيارة
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {latest.map((car) => (
                <Link
                  key={car.id}
                  href={`/admin/cars/${car.id}/edit`}
                  className="flex items-center gap-3 rounded-xl border border-black/[0.06] bg-[#f7f7f7] px-3 py-2.5 transition-colors hover:border-[#a71225]/20 hover:bg-white"
                >
                  {/* Thumbnail */}
                  <div className="relative h-10 w-14 shrink-0 overflow-hidden rounded-lg bg-[#e8e8e8]">
                    {car.images?.[0] ? (
                      <Image src={car.images[0]} alt={car.title_ar} fill className="object-cover" sizes="56px" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[9px] text-[#ccc]">لا صورة</div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-semibold text-[#111]" style={{ fontFamily: "var(--font-tajawal)" }}>
                      {car.title_ar}
                    </p>
                    <p className="text-[11px] text-[#999]" style={{ fontFamily: "var(--font-tajawal)" }}>
                      {car.year} · {car.price.toLocaleString("en-US")} {car.currency}
                    </p>
                  </div>

                  {/* Status */}
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${statusStyle[car.status] ?? ""}`}
                    style={{ fontFamily: "var(--font-tajawal)" }}
                  >
                    {car.status === "available" ? "متاحة" : "مُباعة"}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
