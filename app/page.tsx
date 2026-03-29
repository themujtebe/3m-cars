import Link from "next/link";
import {
  BriefcaseBusiness,
  Car,
  MessageCircle,
  ShieldCheck,
  Users,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const stats = [
  {
    icon: Car,
    value: "+1000",
    label: "سيارة",
    highlighted: false,
  },
  {
    icon: Users,
    value: "+800",
    label: "عميل",
    highlighted: false,
  },
  {
    icon: BriefcaseBusiness,
    value: "+6",
    label: "سنوات خبرة",
    highlighted: false,
  },
  {
    icon: ShieldCheck,
    value: "100%",
    label: "رضا العملاء",
    highlighted: true,
  },
];

export default function HomePage() {
  const whatsappNumber = "97336414730";
  const whatsappText = encodeURIComponent(
    "السلام عليكم، حاب أبدأ البيع مع 3M Cars"
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappText}`;

  return (
    <main className="min-h-screen bg-black text-white">
      <Header />

      <section className="bg-gradient-to-b from-[#7b000b] via-[#2a0307] to-black">
        <div className="mx-auto flex min-h-[420px] max-w-7xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 sm:py-20 md:min-h-[520px]">
          <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
            تسوق سياراتك
            <br />
            بذكاء واحترافية
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/80 sm:text-base md:text-lg">
            منصة متكاملة لعرض السيارات بطريقة احترافية
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
            <Link
              href="/cars"
              className="inline-flex w-full justify-center rounded-full bg-red-600 px-8 py-3 text-sm font-bold text-white transition hover:bg-red-500 sm:w-auto"
            >
              تصفح السيارات
            </Link>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full justify-center rounded-full border border-white/20 px-8 py-3 text-sm font-bold text-white transition hover:border-white/40 hover:bg-white/5 sm:w-auto"
            >
              ابدأ البيع معنا
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 md:py-20">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className={`rounded-[24px] border px-6 py-8 text-center transition duration-300 hover:-translate-y-1 sm:py-10 ${
                  item.highlighted
                    ? "border-red-600 bg-gradient-to-b from-[#3a050a] to-[#120204] shadow-[0_0_0_1px_rgba(255,0,0,0.12)]"
                    : "border-white/10 bg-gradient-to-b from-[#0e0b0d] to-[#090909]"
                }`}
              >
                <Icon className="mx-auto mb-4 h-5 w-5 text-red-500 sm:mb-5" />
                <div className="text-4xl font-extrabold leading-none tracking-tight sm:text-5xl lg:text-6xl">
                  {item.value}
                </div>
                <div className="mt-3 text-sm text-white/70">{item.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
        <div className="rounded-[24px] border border-red-900/40 bg-gradient-to-b from-[#2b0005] to-[#150204] px-5 py-10 text-center shadow-[0_25px_80px_rgba(90,0,0,0.18)] sm:rounded-[30px] sm:px-8 sm:py-16">
          <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-red-500/30 bg-red-500/10">
            <MessageCircle className="h-5 w-5 text-red-500" />
          </div>

          <h2 className="text-2xl font-extrabold sm:text-3xl md:text-5xl">
            جاهز تبيع سيارتك معنا؟
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-white/70 sm:text-base sm:leading-8">
            نوفر لك تجربة سلسة لعرض سياراتك وتسويقها بشكل احترافي والوصول للعملاء
            المناسبين.
          </p>

          <div className="mt-8">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full justify-center rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white transition hover:border-white/40 hover:bg-white/5 sm:w-auto"
            >
              تواصل معنا
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}