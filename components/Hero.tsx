"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-72px)] overflow-hidden bg-white">

      {/* Background car — 10% opacity */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1800&q=80"
          alt=""
          fill
          className="object-cover opacity-[0.08]"
          style={{
            maskImage: "linear-gradient(to right, transparent 0%, black 30%, black 70%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 30%, black 70%, transparent 100%)",
          }}
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-[calc(100vh-72px)] flex-col justify-center px-10 pb-16 pt-16 max-w-[1400px] mx-auto">

        {/* Eyebrow */}
        <p
          className="mb-6 text-[11px] font-bold tracking-[4px] text-[#a71225] uppercase"
          style={{ fontFamily: "var(--font-tajawal)" }}
        >
          وجهة عشاق السيارات في الخليج
        </p>

        {/* H1 */}
        <h1
          className="leading-[0.92] font-bold uppercase text-[#111]"
          style={{
            fontFamily: "var(--font-tajawal)",
            fontSize: "clamp(52px, 8vw, 110px)",
            letterSpacing: "-1px",
          }}
        >
          <span className="text-[#a71225]">وجهتك</span> الأولى
          <br />
          لبيع وشراء السيارات
          <br />
          الرياضية والكلاسيكية
        </h1>

        {/* Sub */}
        <p
          className="mt-8 max-w-[480px] leading-[1.7] text-[#555]"
          style={{ fontFamily: "var(--font-tajawal)", fontSize: "16px" }}
        >
          تصفح مجموعة مختارة من السيارات الرياضية والكلاسيكية، أو اعرض سيارتك باحترافية من خلال منصة تجمع البائعين والمشترين من مختلف دول الخليج.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-wrap items-center gap-6">
          <Link
            href="/cars"
            className="flex items-center gap-2 rounded-full bg-[#a71225] px-8 py-3.5 text-[14px] font-bold text-white transition-colors hover:bg-[#8a0e1d]"
            style={{ fontFamily: "var(--font-tajawal)" }}
          >
            تصفح السيارات
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <Link
            href="/packages"
            className="group flex items-center gap-3 text-[14px] font-semibold text-[#111] transition-colors hover:text-[#a71225]"
            style={{ fontFamily: "var(--font-tajawal)" }}
          >
            اعرض معنا
            <span className="block h-[1px] w-10 bg-current transition-all duration-300 group-hover:w-16" />
          </Link>
        </div>

        {/* Bottom badges */}
        <div className="absolute bottom-10 left-10 flex flex-col gap-1">
          <p
            className="text-[10px] font-bold tracking-[2px] text-[#999]"
            style={{ fontFamily: "var(--font-tajawal)" }}
          >
            تأسست في البحرين
          </p>
          <p
            className="text-[10px] font-bold tracking-[2px] text-[#999]"
            style={{ fontFamily: "var(--font-tajawal)" }}
          >
            شبكة عالمية
          </p>
        </div>
      </div>
    </section>
  );
}
