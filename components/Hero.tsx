"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function Hero() {
  return (
    <section className="dm-spotlight relative min-h-[calc(100vh-72px)] overflow-hidden bg-white dark:bg-[#0a0a0b]">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1800&q=80"
          alt=""
          fill
          className="object-cover opacity-[0.08] dark:opacity-[0.12]"
          style={{
            maskImage: "linear-gradient(to right, transparent 0%, black 30%, black 70%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 30%, black 70%, transparent 100%)",
          }}
          priority
        />
      </div>

      <div className="relative z-10 flex min-h-[calc(100vh-72px)] flex-col justify-center px-10 pb-16 pt-16 max-w-[1400px] mx-auto">
        <p className="mb-6 text-[11px] font-bold tracking-[4px] text-[#a71225] uppercase" style={{ fontFamily: "var(--font-tajawal)" }}>
          وجهة عشاق السيارات في الخليج
        </p>

        <h1
          className="leading-[0.92] font-bold uppercase text-[#111] dark:text-[#f5f5f4]"
          style={{ fontFamily: "var(--font-tajawal)", fontSize: "clamp(52px, 8vw, 110px)", letterSpacing: "-1px" }}
        >
          <span className="dm-price text-[#a71225] dark:text-[#e8323f]">وجهتك</span> الأولى
          <br />
          للسيارات الرياضية
          <br />
          والكلاسيكية
        </h1>

        <p className="mt-8 max-w-[480px] leading-[1.7] text-[#555] dark:text-[#96969c]" style={{ fontFamily: "var(--font-tajawal)", fontSize: "16px" }}>
          اكتشف سيارات مميزة، أو اعرض سيارتك باحترافية لتصل إلى آلاف المهتمين في الخليج.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-6">
          <Link
            href="/cars"
            className="flex items-center gap-2 rounded-full bg-[#a71225] px-8 py-3.5 text-[14px] font-bold text-white transition-colors hover:bg-[#8a0e1d] dark:bg-[#e8323f] dark:hover:bg-[#ff4550] dark:shadow-[0_0_28px_rgba(232,50,63,0.35)]"
            style={{ fontFamily: "var(--font-tajawal)" }}
          >
            تصفح السيارات
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <Link
            href="/packages"
            className="group flex items-center gap-3 text-[14px] font-semibold text-[#111] transition-colors hover:text-[#a71225] dark:text-[#c9c9ce] dark:hover:text-[#a71225]"
            style={{ fontFamily: "var(--font-tajawal)" }}
          >
            اعرض معنا
            <span className="block h-[1px] w-10 bg-current transition-all duration-300 group-hover:w-16" />
          </Link>
        </div>

        <div className="absolute bottom-10 left-10 flex flex-col gap-1">
          <p className="text-[10px] font-bold tracking-[2px] text-[#999] dark:text-[#6b6b70]" style={{ fontFamily: "var(--font-tajawal)" }}>تأسست في البحرين</p>
          <p className="text-[10px] font-bold tracking-[2px] text-[#999] dark:text-[#6b6b70]" style={{ fontFamily: "var(--font-tajawal)" }}>شبكة عالمية</p>
        </div>
      </div>
    </section>
  );
}
