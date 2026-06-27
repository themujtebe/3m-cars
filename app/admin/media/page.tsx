const images = [
  "صورة رئيسية - Mercedes",
  "صورة جانبية - BMW",
  "صورة داخلية - Range Rover",
  "صورة خلفية - Lexus",
  "صورة رئيسية - Toyota",
  "صورة إضافية - Porsche",
];

export default function AdminMediaPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
        <h2 className="text-3xl font-black text-white">إدارة الصور</h2>
        <p className="mt-2 text-sm leading-7 text-zinc-400">
          تنظيم صور السيارات، وتحديد الصورة الرئيسية، وحذف الصور غير المطلوبة.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {images.map((image) => (
          <div
            key={image}
            className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-4"
          >
            <div className="h-44 rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(120,0,0,0.18),rgba(15,15,15,0.8))]" />
            <h3 className="mt-4 text-sm font-semibold text-white">{image}</h3>
            <p className="mt-1 text-xs text-zinc-500">مرتبطة بسيارة داخل النظام</p>

            <div className="mt-4 flex gap-2">
              <button
                type="button"
                className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-white transition hover:border-red-500/25 hover:bg-white/[0.06]"
              >
                تعيين كرئيسية
              </button>

              <button
                type="button"
                className="rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs font-medium text-red-300 transition hover:bg-red-500/15"
              >
                حذف
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}