export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
        <h2 className="text-3xl font-black text-white">الإعدادات</h2>
        <p className="mt-2 text-sm leading-7 text-zinc-400">
          إعدادات التواصل والروابط العامة والنصوص الأساسية في الموقع.
        </p>
      </section>

      <form className="space-y-6">
        <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
          <h3 className="text-xl font-bold text-white">إعدادات التواصل</h3>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <input
              defaultValue="+973 0000 0000"
              className="rounded-2xl border border-white/10 bg-[#0a0a0a] px-4 py-3 text-sm text-white outline-none"
              placeholder="رقم الهاتف"
            />
            <input
              defaultValue="https://wa.me/97300000000"
              className="rounded-2xl border border-white/10 bg-[#0a0a0a] px-4 py-3 text-sm text-white outline-none"
              placeholder="رابط واتساب"
            />
            <input
              defaultValue="https://instagram.com/3mcars"
              className="rounded-2xl border border-white/10 bg-[#0a0a0a] px-4 py-3 text-sm text-white outline-none md:col-span-2"
              placeholder="رابط إنستغرام"
            />
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
          <h3 className="text-xl font-bold text-white">النصوص العامة</h3>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <input
              defaultValue="تواصل معنا"
              className="rounded-2xl border border-white/10 bg-[#0a0a0a] px-4 py-3 text-sm text-white outline-none"
              placeholder="نص زر التواصل"
            />
            <input
              defaultValue="اتصال مباشر"
              className="rounded-2xl border border-white/10 bg-[#0a0a0a] px-4 py-3 text-sm text-white outline-none"
              placeholder="نص زر الاتصال"
            />
          </div>
        </section>

        <button
          type="submit"
          className="rounded-2xl bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-500"
        >
          حفظ الإعدادات
        </button>
      </form>
    </div>
  );
}