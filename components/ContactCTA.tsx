import { MessageCircle } from "lucide-react";

export default function ContactCTA() {
  return (
    <section id="contact" className="relative z-10 mx-auto max-w-5xl px-6 py-24 text-center">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 px-8 py-16 backdrop-blur-xl group">
        <div className="absolute inset-0 bg-red-600/10 opacity-40 blur-3xl" />
        <div className="absolute inset-0 bg-red-500/20 opacity-0 blur-2xl transition duration-500 group-hover:opacity-100" />
        <div className="relative z-10">
          <MessageCircle className="mx-auto mb-4 h-8 w-8 text-red-500" />
          <p className="mb-3 text-sm text-red-500">تواصل معنا</p>
          <h3 className="mb-6 text-3xl font-bold md:text-5xl">
            جاهز تبيع سيارتك معنا؟
          </h3>
          <p className="mx-auto mb-8 max-w-2xl text-white/60">
            تواصل معنا مباشرة عبر واتساب وسنساعدك في اختيار الباقة المناسبة
            وعرض سيارتك بأفضل شكل.
          </p>

          <div className="flex justify-center gap-4">
            <a
              href="https://wa.me/97336414730"
              target="_blank"
              className="rounded-full bg-red-600 px-6 py-3 font-medium transition hover:bg-red-700"
            >
              تواصل عبر واتساب
            </a>
            <a
              href="#packages"
              className="rounded-full border border-white/15 px-6 py-3 font-medium transition hover:border-white/40"
            >
              عرض الباقات
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}