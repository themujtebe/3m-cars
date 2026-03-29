"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserCog } from "lucide-react";

export default function Header() {
  const pathname = usePathname();

  const navLinkClass = (href: string) => {
    const isActive = pathname === href;

    return isActive
      ? "rounded-full bg-red-600 px-4 py-2 text-white transition hover:bg-red-500"
      : "transition hover:text-white";
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#5b0008]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <div className="text-3xl font-extrabold tracking-wide">
          3M CARS
        </div>

        {/* Nav */}
        <nav className="flex items-center gap-6 text-sm font-medium text-white/85">

          <Link href="/" className={navLinkClass("/")}>
            الرئيسية
          </Link>

          <Link href="/cars" className={navLinkClass("/cars")}>
            السيارات
          </Link>

          <Link href="/packages" className={navLinkClass("/packages")}>
            الباقات
          </Link>

          {/* 🔥 تم التعديل هنا */}
          <a
            href="https://wa.me/97336414730?text=السلام عليكم، حاب أستفسر عن خدماتكم"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-white"
          >
            تواصل معنا
          </a>

          {/* Admin Icon */}
          <Link
            href="/admin"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition hover:border-white/30 hover:bg-white/5"
          >
            <UserCog className="h-4 w-4" />
          </Link>

        </nav>
      </div>
    </header>
  );
}