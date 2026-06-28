"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Moon, User, ChevronDown, Menu, X } from "lucide-react";
import { useCurrencyStore } from "@/stores/currency";
import { CURRENCIES, type CurrencyCode } from "@/lib/currency";

const NAV_LINKS = [
  { href: "/", label: "الرئيسية" },
  { href: "/cars", label: "السيارات" },
  { href: "/packages", label: "الباقات" },
  { href: "/contact", label: "تواصل معنا" },
];

export default function Header() {
  const pathname = usePathname();
  const { currency, setCurrency } = useCurrencyStore();
  const [currOpen, setCurrOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const currRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (currRef.current && !currRef.current.contains(e.target as Node))
        setCurrOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50 h-[72px] border-b border-black/[0.07] bg-white">
      {/* Main bar */}
      <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-5 sm:px-10">

        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-[10px] bg-[#a71225] p-1.5">
            <Image
              src="/Logo.png"
              alt="3M Cars"
              width={44}
              height={44}
              className="h-full w-full object-contain"
              priority
            />
          </div>
          <div className="leading-none">
            <div className="text-[15px] font-bold tracking-wide text-[#111]">
              3M CARS
            </div>
            <div className="text-[10px] font-semibold tracking-[2px] text-[#888]">
              3mcars.bh
            </div>
          </div>
        </Link>

        {/* Desktop nav (md+) */}
        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-[13px] font-semibold tracking-[1px] transition-colors ${
                isActive(href)
                  ? "rounded border border-[#a71225] px-2.5 py-1 text-[#a71225]"
                  : "text-[#111] hover:text-[#a71225]"
              }`}
              style={{ fontFamily: "var(--font-tajawal)" }}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Currency (sm+) */}
          <div ref={currRef} className="relative hidden sm:block">
            <button
              onClick={() => setCurrOpen(!currOpen)}
              className="flex items-center gap-1 text-[12px] font-semibold text-[#555] transition-colors hover:text-[#111]"
              style={{ fontFamily: "var(--font-tajawal)" }}
            >
              {CURRENCIES[currency].symbol}
              <ChevronDown className="h-3 w-3" />
            </button>
            {currOpen && (
              <div className="absolute left-0 top-full mt-2 w-40 rounded-xl border border-black/[0.08] bg-white shadow-xl">
                {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => (
                  <button
                    key={code}
                    onClick={() => {
                      setCurrency(code);
                      setCurrOpen(false);
                    }}
                    className={`block w-full px-4 py-2.5 text-right text-[13px] transition-colors hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl ${
                      currency === code
                        ? "font-bold text-[#a71225]"
                        : "text-[#444]"
                    }`}
                    style={{ fontFamily: "var(--font-tajawal)" }}
                  >
                    {CURRENCIES[code].label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Dark mode toggle */}
          <button className="flex h-9 w-9 items-center justify-center rounded-full border border-[#a71225]/30 text-[#a71225] transition-colors hover:border-[#a71225]">
            <Moon className="h-4 w-4" />
          </button>

          {/* Admin link (sm+) */}
          <Link
            href="/admin"
            className="hidden items-center gap-1.5 text-[13px] font-semibold text-[#111] transition-colors hover:text-[#a71225] sm:flex"
            style={{ fontFamily: "var(--font-tajawal)" }}
          >
            <User className="h-4 w-4" />
            البوابة
          </Link>

          {/* Hamburger — mobile only (below md) */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.12] text-[#111] transition-colors hover:border-black md:hidden"
            aria-label="القائمة"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <X className="h-[18px] w-[18px]" />
            ) : (
              <Menu className="h-[18px] w-[18px]" />
            )}
          </button>

          {/* WhatsApp CTA */}
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "97336414730"}?text=${encodeURIComponent("السلام عليكم")}`}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-[#111] px-5 py-2.5 text-[13px] font-bold text-white transition-colors hover:bg-[#a71225] sm:px-6"
            style={{ fontFamily: "var(--font-tajawal)" }}
          >
            تواصل
          </a>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="absolute inset-x-0 top-full border-b border-black/[0.07] bg-white shadow-lg md:hidden">
          <nav
            className="flex flex-col gap-0.5 px-4 py-3"
            style={{ fontFamily: "var(--font-tajawal)" }}
          >
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center rounded-xl px-4 py-3.5 text-[15px] font-semibold transition-colors ${
                  isActive(href)
                    ? "bg-[#a71225]/[0.06] text-[#a71225]"
                    : "text-[#111] active:bg-black/[0.03]"
                }`}
              >
                {label}
              </Link>
            ))}

            {/* Divider */}
            <div className="my-1.5 border-t border-black/[0.06]" />

            {/* Admin */}
            <Link
              href="/admin"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 rounded-xl px-4 py-3.5 text-[15px] font-semibold text-[#666] transition-colors active:bg-black/[0.03]"
            >
              <User className="h-4 w-4" />
              البوابة
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
