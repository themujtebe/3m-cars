import Link from "next/link";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-[#f7f7f7] px-10 py-[100px] text-center">
      <h2
        className="font-bold uppercase leading-[1.0] text-[#111]"
        style={{
          fontFamily: "var(--font-tajawal)",
          fontSize: "clamp(40px, 6vw, 80px)",
          letterSpacing: "-1px",
        }}
      >
        هل أنت مستعد
        <br />
        لبيع سيارتك معنا؟
      </h2>

      <p
        className="mx-auto mt-6 max-w-md text-[15px] leading-[1.7] text-[#555]"
        style={{ fontFamily: "var(--font-tajawal)" }}
      >
        نتولى التصوير، التعديل، والنشر. أنت فقط تجلس وتنتظر المشتري.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
        <a
          href="https://wa.me/97336414730?text=السلام عليكم، أريد عرض سيارتي مع 3M Cars"
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-[#111] px-9 py-3.5 text-[14px] font-bold text-white transition-colors hover:bg-[#a71225]"
          style={{ fontFamily: "var(--font-tajawal)" }}
        >
          ابدأ الآن
        </a>
        <Link
          href="/packages"
          className="rounded-full border border-black/20 px-9 py-3.5 text-[14px] font-semibold text-[#111] transition-colors hover:border-black"
          style={{ fontFamily: "var(--font-tajawal)" }}
        >
          شاهد الباقات
        </Link>
      </div>
    </section>
  );
}
