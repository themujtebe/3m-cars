import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { Check } from "lucide-react";

export const metadata = { title: "الباقات | 3M Cars" };

const packages = [
  {
    id: 1,
    name: "الاقتصادية",
    nameEn: "ECONOMY",
    price: "10",
    features: [
      "تصوير 8 صور احترافية",
      "تعديل الصور بالكامل",
      "نشر كـ Post في حسابنا",
    ],
    highlighted: false,
    badge: "",
  },
  {
    id: 2,
    name: "الكلاسيكية",
    nameEn: "CLASSICA",
    price: "15",
    features: [
      "تصوير 10 صور احترافية",
      "تعديل الصور بالكامل",
      "نشر كـ Post في حسابنا",
      "سبونسر Instagram ليومين",
    ],
    highlighted: true,
    badge: "الأكثر طلبًا",
  },
  {
    id: 3,
    name: "الاحترافية",
    nameEn: "PRO",
    price: "20",
    features: [
      "تصوير 15 صورة احترافية",
      "تعديل الصور بالكامل",
      "نشر كـ Story في حسابنا",
      "نشر كـ Post في حسابنا",
      "أولوية في الظهور",
    ],
    highlighted: false,
    badge: "",
  },
];

const WA_NUMBER = "97336414730";

export default function PackagesPage() {
  return (
    <div className="min-h-screen bg-white text-[#111]">
      <Header />

      {/* Page header */}
      <section className="border-b border-black/[0.06] bg-[#f7f7f7] px-10 py-14 text-center">
        <p
          className="mb-2 text-[11px] font-bold tracking-[4px] text-[#a71225] uppercase"
          style={{ fontFamily: "var(--font-tajawal)" }}
        >
          باقات الخدمة
        </p>
        <h1
          className="text-[42px] font-bold text-[#111]"
          style={{ fontFamily: "var(--font-tajawal)" }}
        >
          اختر الباقة المناسبة
        </h1>
        <p
          className="mx-auto mt-3 max-w-lg text-[15px] leading-[1.8] text-[#777]"
          style={{ fontFamily: "var(--font-tajawal)" }}
        >
          نتكفل بالتصوير والتعديل والنشر — أنت فقط تستقبل المشترين
        </p>
      </section>

      {/* Packages grid */}
      <section className="px-10 py-16">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {packages.map((pkg) => {
            const waText = encodeURIComponent(`السلام عليكم، أرغب في الاشتراك في ${pkg.name}`);
            const waLink = `https://wa.me/${WA_NUMBER}?text=${waText}`;

            return (
              <div
                key={pkg.id}
                className={`relative rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1 ${
                  pkg.highlighted
                    ? "border-[#a71225]/30 shadow-[0_4px_32px_rgba(167,18,37,0.10)]"
                    : "border-black/[0.08] hover:border-black/[0.15]"
                }`}
              >
                {pkg.badge && (
                  <span
                    className="absolute -top-3 right-6 rounded-full bg-[#a71225] px-3 py-1 text-[10px] font-bold text-white"
                    style={{ fontFamily: "var(--font-tajawal)" }}
                  >
                    {pkg.badge}
                  </span>
                )}

                {/* Package name */}
                <p
                  className="text-[10px] font-bold tracking-[3px] text-[#999] uppercase"
                  style={{ fontFamily: "var(--font-tajawal)" }}
                >
                  {pkg.name}
                </p>
                <h2
                  className="mt-1 text-[22px] font-bold text-[#111]"
                  style={{ fontFamily: "var(--font-tajawal)" }}
                >
                  {pkg.name}
                </h2>

                {/* Price */}
                <div className="mt-6 flex items-end gap-2">
                  <span
                    className="text-[52px] font-bold leading-none text-[#111]"
                    style={{ fontFamily: "var(--font-tajawal)" }}
                  >
                    {pkg.price}
                  </span>
                  <span
                    className="mb-2 text-[14px] text-[#999]"
                    style={{ fontFamily: "var(--font-tajawal)" }}
                  >
                    دينار بحريني
                  </span>
                </div>

                <div className="my-6 h-px bg-[#f0f0f0]" />

                {/* Features */}
                <ul className="flex flex-col gap-3">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                        style={{ background: pkg.highlighted ? "rgba(167,18,37,0.1)" : "rgba(0,0,0,0.05)" }}
                      >
                        <Check className="h-3 w-3" style={{ color: pkg.highlighted ? "#a71225" : "#555" }} />
                      </span>
                      <span className="text-[14px] text-[#555]" style={{ fontFamily: "var(--font-tajawal)" }}>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href={waLink}
                  target="_blank"
                  rel="noreferrer"
                  className={`mt-8 flex w-full items-center justify-center rounded-full py-3 text-[14px] font-bold transition-colors ${
                    pkg.highlighted
                      ? "bg-[#a71225] text-white hover:bg-[#8a0e1d]"
                      : "border border-black/[0.12] text-[#111] hover:border-black/25 hover:bg-[#f7f7f7]"
                  }`}
                  style={{ fontFamily: "var(--font-tajawal)" }}
                >
                  ابدأ الآن
                </a>
              </div>
            );
          })}
        </div>
      </section>

      {/* Terms */}
      <section className="border-t border-black/[0.06] bg-[#f7f7f7] px-10 py-14">
        <div className="mx-auto max-w-3xl">
          <p
            className="mb-4 text-[11px] font-bold tracking-[3px] text-[#999] uppercase"
            style={{ fontFamily: "var(--font-tajawal)" }}
          >
            الشروط والأحكام
          </p>
          <h2
            className="mb-6 text-[22px] font-bold text-[#111]"
            style={{ fontFamily: "var(--font-tajawal)" }}
          >
            الشروط والأحكام
          </h2>
          <ul className="flex flex-col gap-3">
            {[
              "يُشترط حضور السيارة في الموقع المحدد لإتمام التصوير.",
              "الدفع يكون مسبقاً قبل بدء الجلسة.",
              "النشر يتم خلال 24-48 ساعة من يوم التصوير.",
              "لا يُسترد المبلغ بعد إتمام التصوير.",
              "السبونسر يبدأ من يوم النشر لمدة يومين متتاليين.",
            ].map((term, i) => (
              <li key={i} className="flex items-start gap-3 text-[14px] text-[#555]" style={{ fontFamily: "var(--font-tajawal)" }}>
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#a71225]" />
                {term}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
}
