import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden px-6 py-32 text-center bg-gradient-to-b from-[#3b0008] via-[#1a0003] to-black"
    >
      {/* Glow effect خلفي */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-[-120px] h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-red-600/20 blur-3xl" />
      </div>

      {/* المحتوى */}
      <div className="relative z-10">
        <h2 className="mb-6 text-5xl font-extrabold leading-tight md:text-7xl">
          نسوق سيارتك <br /> بذكاء واحترافية
        </h2>

        <p className="mx-auto mb-10 max-w-2xl text-lg text-white/60">
          منصة متكاملة لتسويق السيارات في البحرين والخليج
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          
          {/* زر البيع */}
          <Link
            href="/#contact"
            className="rounded-full bg-red-600 px-7 py-3 font-medium transition hover:bg-red-700 shadow-lg shadow-red-600/20"
          >
            ابدأ البيع الآن
          </Link>

          {/* زر المعرض */}
          <Link
            href="/cars"
            className="rounded-full border border-white/20 px-7 py-3 font-medium transition hover:border-white/40 hover:bg-white/5"
          >
            تصفح المعرض
          </Link>

        </div>
      </div>
    </section>
  );
}