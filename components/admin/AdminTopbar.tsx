"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Plus, ArrowRight, Home } from "lucide-react";

const titles: Record<string, string> = {
  "/admin":           "لوحة التحكم",
  "/admin/cars":      "إدارة السيارات",
  "/admin/cars/new":  "إضافة سيارة",
  "/admin/packages":  "الباقات",
  "/admin/media":     "الصور",
  "/admin/settings":  "الإعدادات",
};

function getTitle(pathname: string) {
  if (pathname.startsWith("/admin/cars/") && pathname.endsWith("/edit")) return "تعديل السيارة";
  return titles[pathname] || "لوحة التحكم";
}

const isDashboard = (pathname: string) => pathname === "/admin";

export default function AdminTopbar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className="sticky top-0 z-30 border-b border-black/[0.06] bg-white">
      <div className="flex items-center justify-between gap-4 px-6 py-4 xl:px-8">

        {/* Left: back + title */}
        <div className="flex items-center gap-3">
          {/* Back button — hidden on dashboard */}
          {!isDashboard(pathname) && (
            <button
              onClick={() => router.back()}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.08] text-[#555] transition-colors hover:border-black/20 hover:text-[#111]"
              title="رجوع"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          )}

          <div>
            <p
              className="text-[11px] font-bold tracking-[2px] text-[#a71225] uppercase"
              style={{ fontFamily: "var(--font-tajawal)" }}
            >
              3M CARS ADMIN
            </p>
            <h1
              className="mt-0.5 text-[20px] font-bold text-[#111]"
              style={{ fontFamily: "var(--font-tajawal)" }}
            >
              {getTitle(pathname)}
            </h1>
          </div>
        </div>

        {/* Right: home + add */}
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.08] text-[#555] transition-colors hover:border-black/20 hover:text-[#111]"
            title="الموقع الرئيسي"
          >
            <Home className="h-4 w-4" />
          </Link>

          <Link
            href="/admin/cars/new"
            className="flex items-center gap-2 rounded-full bg-[#111] px-5 py-2.5 text-[13px] font-bold text-white transition-colors hover:bg-[#a71225]"
            style={{ fontFamily: "var(--font-tajawal)" }}
          >
            <Plus size={15} />
            إضافة سيارة
          </Link>
        </div>
      </div>
    </header>
  );
}
