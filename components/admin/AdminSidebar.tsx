"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CarFront,
  FolderKanban,
  Image as ImageIcon,
  LayoutDashboard,
  PlusSquare,
  Settings,
  ArrowUpRight,
} from "lucide-react";

const links = [
  { title: "لوحة التحكم",   href: "/admin",           icon: LayoutDashboard },
  { title: "إدارة السيارات", href: "/admin/cars",       icon: CarFront },
  { title: "إضافة سيارة",   href: "/admin/cars/new",   icon: PlusSquare },
  { title: "الباقات",        href: "/admin/packages",   icon: FolderKanban },
  { title: "الصور",          href: "/admin/media",      icon: ImageIcon },
  { title: "الإعدادات",     href: "/admin/settings",   icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-[260px] shrink-0 border-l border-black/[0.06] bg-white xl:flex xl:flex-col">
      <div className="sticky top-0 flex h-screen flex-col">

        {/* Logo */}
        <div className="border-b border-black/[0.06] px-6 py-5">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#111]">
              <span className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-tajawal)" }}>3M</span>
            </div>
            <div className="leading-none">
              <div className="text-[14px] font-bold text-[#111]" style={{ fontFamily: "var(--font-tajawal)" }}>CARS</div>
              <div className="text-[9px] font-bold tracking-[3px] text-[#a71225]" style={{ fontFamily: "var(--font-tajawal)" }}>ADMIN</div>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <p className="mb-2 px-3 text-[10px] font-bold tracking-[2px] text-[#bbb] uppercase" style={{ fontFamily: "var(--font-tajawal)" }}>
            MENU
          </p>
          <div className="flex flex-col gap-1">
            {links.map((link) => {
              const Icon = link.icon;
              const active =
                pathname === link.href ||
                (link.href !== "/admin" && pathname.startsWith(link.href));

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] font-medium transition-colors ${
                    active
                      ? "bg-[#a71225]/8 text-[#a71225]"
                      : "text-[#555] hover:bg-black/[0.04] hover:text-[#111]"
                  }`}
                  style={{ fontFamily: "var(--font-tajawal)" }}
                >
                  <Icon
                    size={17}
                    className={active ? "text-[#a71225]" : "text-[#999]"}
                  />
                  {link.title}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t border-black/[0.06] px-3 py-4">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between rounded-xl border border-black/[0.08] px-3 py-2.5 text-[13px] font-medium text-[#555] transition-colors hover:border-[#a71225]/30 hover:text-[#a71225]"
            style={{ fontFamily: "var(--font-tajawal)" }}
          >
            عرض الموقع
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </aside>
  );
}
