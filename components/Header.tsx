"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Moon, User, ChevronDown } from "lucide-react";
import { useCurrencyStore } from "@/stores/currency";
import { CURRENCIES, type CurrencyCode } from "@/lib/currency";

export default function Header() {
  const pathname = usePathname();
  const { currency, setCurrency } = useCurrencyStore();
  const [currOpen, setCurrOpen] = useState(false);
  const currRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (currRef.current && !currRef.current.contains(e.target as Node)) setCurrOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50 h-[72px] border-b border-black/[0.07] bg-white">
      <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-10">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#111]"
            style={{ fontFamily: "var(--font-tajawal)" }}
          >
            <span className="text-sm font-bold text-white">3M</span>
          </div>
          <div className="leading-none">
            <div className="text-[15px] font-bold text-[#111]" style={{ fontFamily: "var(--font-tajawal)" }}>
              CARS
            </div>
            <div className="text-[9px] font-bold tracking-[3px] text-[#a71225]" style={{ fontFamily: "var(--font-tajawal)" }}>
              BOUTIQUE
            </div>
          </div>
        </Link>

        {/* Nav links — center */}
        <nav className="hidden items-center gap-7 md:flex">
          {[
            { href: "/", label: "HOME" },
            { href: "/cars", label: "CARS" },
            { href: "/packages", label: "PACKAGES" },
            { href: "/contact", label: "CONTACT" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-[13px] font-semibold tracking-[1px] transition-colors ${
                isActive(href)
                  ? "rounded border border-[#a71225] px-2.5 py-1 text-[#a71225]"
                  : "text-[#111] hover:text-[#a71225]"
              }`}
              style={{ fontFamily: "var(--font-tajawal)", textTransform: "uppercase" }}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-4">
          {/* Currency */}
          <div ref={currRef} className="relative hidden sm:block">
            <button
              onClick={() => setCurrOpen(!currOpen)}
              className="flex items-center gap-1 text-[12px] font-semibold text-[#555] hover:text-[#111] transition-colors"
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
                    onClick={() => { setCurrency(code); setCurrOpen(false); }}
                    className={`block w-full px-4 py-2.5 text-right text-[13px] transition-colors hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl ${
                      currency === code ? "font-bold text-[#a71225]" : "text-[#444]"
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
          <button className="flex h-9 w-9 items-center justify-center rounded-full border border-[#a71225]/30 text-[#a71225] hover:border-[#a71225] transition-colors">
            <Moon className="h-4 w-4" />
          </button>

          {/* Portal */}
          <Link
            href="/admin"
            className="hidden items-center gap-1.5 text-[13px] font-semibold text-[#111] hover:text-[#a71225] transition-colors sm:flex"
            style={{ fontFamily: "var(--font-tajawal)" }}
          >
            <User className="h-4 w-4" />
            PORTAL
          </Link>

          {/* Inquire CTA */}
          <a
            href="https://wa.me/97336414730?text=السلام عليكم"
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-[#111] px-6 py-2.5 text-[13px] font-bold text-white transition-colors hover:bg-[#a71225]"
            style={{ fontFamily: "var(--font-tajawal)" }}
          >
            تواصل
          </a>
        </div>
      </div>
    </header>
  );
}
