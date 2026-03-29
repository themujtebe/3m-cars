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
        <div className="mx-auto flex min-h-[520px] max-w-7xl flex-col items-center justify-center px-6 text-center">
          <h1 className="text-5xl font-extrabold leading-[1.15] md:text-7xl">
            تسوق سياراتك
            <br />
            بذكاء واحترافية
          </h1>

          <p className="mt-6 text-base text-white/80 md:text-lg">
            منصة متكاملة لعرض السيارات بطريقة احترافية
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/cars"
              className="inline-flex rounded-full bg-red-600 px-8 py-3 text-sm font-bold text-white transition hover:bg-red-500"
            >
              تصفح السيارات
            </Link>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-full border border-white/20 px-8 py-3 text-sm font-bold text-white transition hover:border-white/40 hover:bg-white/5"
            >
              ابدأ البيع معنا
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className={`rounded-[24px] border px-6 py-10 text-center transition duration-300 hover:-translate-y-1 ${
                  item.highlighted
                    ? "border-red-600 bg-gradient-to-b from-[#3a050a] to-[#120204] shadow-[0_0_0_1px_rgba(255,0,0,0.12)]"
                    : "border-white/10 bg-gradient-to-b from-[#0e0b0d] to-[#090909]"
                }`}
              >
                <Icon className="mx-auto mb-5 h-5 w-5 text-red-500" />
                <div className="text-6xl font-extrabold leading-none tracking-tight">
                  {item.value}
                </div>
                <div className="mt-4 text-sm text-white/70">{item.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-5xl px-6 py-20 md:py-24">
        <div className="rounded-[30px] border border-red-900/40 bg-gradient-to-b from-[#2b0005] to-[#150204] px-8 py-16 text-center shadow-[0_25px_80px_rgba(90,0,0,0.18)]">
          <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-red-500/30 bg-red-500/10">
            <MessageCircle className="h-5 w-5 text-red-500" />
          </div>

          <h2 className="text-3xl font-extrabold md:text-5xl">
            جاهز تبيع سيارتك معنا؟
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-sm leading-8 text-white/70 md:text-base">
            نوفر لك تجربة سلسة لعرض سياراتك وتسويقها بشكل احترافي والوصول للعملاء
            المناسبين.
          </p>

          <div className="mt-8">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white transition hover:border-white/40 hover:bg-white/5"
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