import Header from "@/components/Header";
import Footer from "@/components/Footer";

const packages = [
  {
    id: 1,
    name: "الباقة الاقتصادية",
    price: "10",
    currency: "دينار بحريني",
    description: "باقة مناسبة لعرض أساسي وواضح للسيارة.",
    features: [
      "تصوير (8) صور مع التعديل",
      "نشر الصور في حسابنا (بوست)",
    ],
    highlighted: false,
    badge: "",
  },
  {
    id: 2,
    name: "الباقة الكلاسيكية",
    price: "15",
    currency: "دينار بحريني",
    description: "الخيار الأنسب لعرض أقوى وجذب أكبر للعملاء.",
    features: [
      "تصوير (10) صور مع التعديل",
      "نشر الصور في حسابنا (بوست)",
      "سبونسر عبر الانستقرام لمدة يومين",
    ],
    highlighted: true,
    badge: "الأكثر طلبًا",
  },
  {
    id: 3,
    name: "الباقة الاحترافية",
    price: "20",
    currency: "دينار بحريني",
    description: "أفضل باقة لعرض سيارتك بشكل أقوى وأكثر احترافية.",
    features: [
      "تصوير (15) صورة مع التعديل",
      "نشر الصور في حسابنا (ستوري)",
      "نشر الصور في حسابنا (بوست)",
    ],
    highlighted: false,
    badge: "",
  },
];

export default function PackagesPage() {
  const whatsappNumber = "97336414730";

  return (
    <main className="min-h-screen bg-black text-white">
      <Header />

      <section className="bg-gradient-to-b from-[#7b000b] via-[#2a0307] to-black">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-20 md:py-24">
          <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
            اختر الباقة المناسبة لك!
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-sm leading-7 text-white/72 sm:text-base sm:leading-8 md:text-lg">
            استمتع بخدماتنا المتنوعة واختر الباقة التي تناسبك، ثم اضغط على زر
            الاستمرار للتحدث معنا مباشرة على مدار الساعة.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {packages.map((pkg) => {
            const whatsappText = encodeURIComponent(
              `السلام عليكم، أرغب في الاشتراك في ${pkg.name}`
            );
            const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappText}`;

            return (
              <div
                key={pkg.id}
                className={`relative rounded-[24px] border p-6 text-right transition duration-300 hover:-translate-y-1 sm:rounded-[28px] sm:p-8 ${
                  pkg.highlighted
                    ? "border-red-600 bg-gradient-to-b from-[#3a050a] to-[#120204] shadow-[0_0_0_1px_rgba(255,0,0,0.12)]"
                    : "border-white/10 bg-gradient-to-b from-[#0e0b0d] to-[#090909]"
                }`}
              >
                {pkg.badge ? (
                  <div className="absolute right-5 top-5 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white sm:right-6 sm:top-6">
                    {pkg.badge}
                  </div>
                ) : null}

                <div className="pt-8">
                  <h2 className="text-xl font-extrabold sm:text-2xl">
                    {pkg.name}
                  </h2>

                  <div className="mt-5">
                    <p className="text-4xl font-extrabold text-white sm:text-5xl">
                      {pkg.price}
                    </p>
                    <p className="mt-2 text-sm text-white/60">{pkg.currency}</p>
                  </div>

                  <p className="mt-6 text-sm leading-7 text-white/70">
                    {pkg.description}
                  </p>

                  <div className="mt-6 space-y-3 text-sm leading-7 text-white/80">
                    {pkg.features.map((feature, index) => (
                      <p key={index}>- {feature}</p>
                    ))}
                  </div>

                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    className={`mt-8 inline-flex w-full justify-center rounded-full px-6 py-3 text-sm font-bold transition sm:w-auto ${
                      pkg.highlighted
                        ? "bg-red-600 text-white hover:bg-red-500"
                        : "border border-white/20 text-white hover:border-white/40 hover:bg-white/5"
                    }`}
                  >
                    استمرار
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </main>
  );
}