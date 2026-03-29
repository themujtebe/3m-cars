"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserCog } from "lucide-react";

export default function Header() {
  const pathname = usePathname();

  const navLinkClass = (href: string) => {
    const isActive = pathname === href;

    return isActive
      ? "rounded-full bg-red-600 px-3 py-2 text-white transition hover:bg-red-500"
      : "rounded-full px-3 py-2 text-white/80 transition hover:text-white";
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#5b0008]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="text-center text-2xl font-extrabold tracking-wide sm:text-3xl lg:text-right">
          3M CARS
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-2 text-sm font-medium lg:justify-start">
          <Link href="/" className={navLinkClass("/")}>
            الرئيسية
          </Link>

          <Link href="/cars" className={navLinkClass("/cars")}>
            السيارات
          </Link>

          <Link href="/packages" className={navLinkClass("/packages")}>
            الباقات
          </Link>

          <a
            href="https://wa.me/97336414730?text=السلام عليكم، حاب أستفسر عن خدماتكم"
            target="_blank"
            rel="noreferrer"
            className="rounded-full px-3 py-2 text-white/80 transition hover:text-white"
          >
            تواصل معنا
          </a>

          <Link
            href="/admin"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-white/30 hover:bg-white/5"
          >
            <UserCog className="h-4 w-4" />
          </Link>
        </nav>
      </div>
    </header>
  );
}