import {
  BriefcaseBusiness,
  Camera,
  Megaphone,
  MessageCircle,
} from "lucide-react";

export default function WhyUs() {
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-6 py-24">
      <div className="mb-12 text-center">
        <p className="mb-3 text-sm text-red-500">لماذا 3M CARS</p>
        <h3 className="text-3xl font-bold md:text-5xl">لماذا يختارنا العملاء؟</h3>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl group">
          <div className="absolute inset-0 bg-red-600/10 opacity-40 blur-3xl" />
          <div className="absolute inset-0 bg-red-500/20 opacity-0 blur-2xl transition duration-500 group-hover:opacity-100" />
          <div className="relative z-10">
            <BriefcaseBusiness className="mb-4 h-7 w-7 text-red-500" />
            <h4 className="mb-3 text-xl font-semibold">خبرة قوية</h4>
            <p className="text-white/60">
              خبرة عملية في السوق البحريني والخليجي وفهم حقيقي لطريقة تسويق
              السيارات.
            </p>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl group">
          <div className="absolute inset-0 bg-red-600/10 opacity-40 blur-3xl" />
          <div className="absolute inset-0 bg-red-500/20 opacity-0 blur-2xl transition duration-500 group-hover:opacity-100" />
          <div className="relative z-10">
            <Camera className="mb-4 h-7 w-7 text-red-500" />
            <h4 className="mb-3 text-xl font-semibold">تصوير احترافي</h4>
            <p className="text-white/60">
              نبرز تفاصيل السيارة بأفضل شكل بصري لرفع قيمة العرض وجذب الانتباه.
            </p>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl group">
          <div className="absolute inset-0 bg-red-600/10 opacity-40 blur-3xl" />
          <div className="absolute inset-0 bg-red-500/20 opacity-0 blur-2xl transition duration-500 group-hover:opacity-100" />
          <div className="relative z-10">
            <Megaphone className="mb-4 h-7 w-7 text-red-500" />
            <h4 className="mb-3 text-xl font-semibold">تسويق ذكي</h4>
            <p className="text-white/60">
              نستخدم عرض وتسويق مدروس للوصول إلى المشتري المناسب بسرعة أكبر.
            </p>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl group">
          <div className="absolute inset-0 bg-red-600/10 opacity-40 blur-3xl" />
          <div className="absolute inset-0 bg-red-500/20 opacity-0 blur-2xl transition duration-500 group-hover:opacity-100" />
          <div className="relative z-10">
            <MessageCircle className="mb-4 h-7 w-7 text-red-500" />
            <h4 className="mb-3 text-xl font-semibold">خدمة عملاء</h4>
            <p className="text-white/60">
              تواصل سريع وواضح وتجربة منظمة من بداية عرض السيارة إلى إتمام
              العملية.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}