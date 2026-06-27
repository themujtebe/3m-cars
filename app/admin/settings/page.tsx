const INPUT = [
  "w-full rounded-xl border border-black/[0.08] bg-[#f7f7f7] px-4 py-2.5",
  "text-[14px] text-[#111] outline-none placeholder:text-[#bbb]",
  "focus:border-[#a71225]/40 focus:bg-white transition-colors",
].join(" ");

const LABEL = "mb-1.5 block text-[11px] font-bold tracking-[1.5px] text-[#999] uppercase";

export default function AdminSettingsPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-5">

      <form className="space-y-4">

        {/* Contact settings */}
        <section className="rounded-2xl border border-black/[0.06] bg-white p-6">
          <h3
            className="mb-5 text-[16px] font-bold text-[#111]"
            style={{ fontFamily: "var(--font-tajawal)" }}
          >
            إعدادات التواصل
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className={LABEL} style={{ fontFamily: "var(--font-tajawal)" }}>رقم الهاتف</label>
              <input
                defaultValue="+973 36414730"
                className={INPUT}
                style={{ fontFamily: "var(--font-tajawal)" }}
                placeholder="رقم الهاتف"
              />
            </div>
            <div>
              <label className={LABEL} style={{ fontFamily: "var(--font-tajawal)" }}>رابط واتساب</label>
              <input
                defaultValue="https://wa.me/97336414730"
                className={INPUT}
                style={{ fontFamily: "var(--font-tajawal)" }}
                placeholder="رابط واتساب"
              />
            </div>
            <div className="md:col-span-2">
              <label className={LABEL} style={{ fontFamily: "var(--font-tajawal)" }}>رابط إنستغرام</label>
              <input
                defaultValue="https://instagram.com/3mcars.bh"
                className={INPUT}
                style={{ fontFamily: "var(--font-tajawal)" }}
                placeholder="رابط إنستغرام"
              />
            </div>
          </div>
        </section>

        {/* General text */}
        <section className="rounded-2xl border border-black/[0.06] bg-white p-6">
          <h3
            className="mb-5 text-[16px] font-bold text-[#111]"
            style={{ fontFamily: "var(--font-tajawal)" }}
          >
            النصوص العامة
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className={LABEL} style={{ fontFamily: "var(--font-tajawal)" }}>نص زر التواصل</label>
              <input
                defaultValue="تواصل معنا"
                className={INPUT}
                style={{ fontFamily: "var(--font-tajawal)" }}
              />
            </div>
            <div>
              <label className={LABEL} style={{ fontFamily: "var(--font-tajawal)" }}>نص زر الاتصال</label>
              <input
                defaultValue="اتصال مباشر"
                className={INPUT}
                style={{ fontFamily: "var(--font-tajawal)" }}
              />
            </div>
          </div>
        </section>

        {/* Actions */}
        <div>
          <button
            type="submit"
            className="rounded-full bg-[#111] px-8 py-3 text-[14px] font-bold text-white transition-colors hover:bg-[#a71225]"
            style={{ fontFamily: "var(--font-tajawal)" }}
          >
            حفظ الإعدادات
          </button>
        </div>
      </form>
    </div>
  );
}
