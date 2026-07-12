"use client";

import { useActionState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import { saveSettings } from "@/app/actions/settings";
import type { SiteSettings } from "@/lib/local/settings";

const INPUT = [
  "w-full rounded-xl border border-black/[0.08] bg-[#f7f7f7] px-4 py-2.5",
  "text-[14px] text-[#111] outline-none placeholder:text-[#bbb]",
  "focus:border-[#a71225]/40 focus:bg-white transition-colors",
  "dark:border-white/[0.08] dark:bg-[#28282d] dark:text-[#f5f5f4] dark:placeholder:text-[#6b6b70] dark:focus:border-[#e8323f]/50 dark:focus:bg-[#28282d]",
].join(" ");

const LABEL = "mb-1.5 block text-[11px] font-bold tracking-[1.5px] text-[#999] uppercase dark:text-[#6b6b70]";
const SECTION = "dm-panel rounded-2xl border border-black/[0.06] bg-white p-6 dark:bg-[#1e1e22] dark:border-white/[0.08]";

export default function SettingsForm({ settings }: { settings: SiteSettings }) {
  const [state, action, isPending] = useActionState(saveSettings, null);

  return (
    <form action={action} className="space-y-4">

      {state && "error" in state && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-[#a71225] dark:border-red-800 dark:bg-red-950 dark:text-red-400" style={{ fontFamily: "var(--font-tajawal)" }}>
          ⚠️ {state.error}
        </div>
      )}

      {state && "success" in state && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-[14px] text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-400" style={{ fontFamily: "var(--font-tajawal)" }}>
          <CheckCircle className="h-4 w-4 shrink-0" />
          تم حفظ الإعدادات بنجاح
        </div>
      )}

      {/* Contact */}
      <section className={SECTION}>
        <h3 className="mb-5 text-[16px] font-bold text-[#111] dark:text-[#f5f5f4]" style={{ fontFamily: "var(--font-tajawal)" }}>
          إعدادات التواصل
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className={LABEL} style={{ fontFamily: "var(--font-tajawal)" }}>رقم الهاتف</label>
            <input
              name="phone"
              defaultValue={settings.phone}
              className={INPUT}
              placeholder="+973 36414730"
              style={{ fontFamily: "var(--font-tajawal)" }}
            />
          </div>
          <div>
            <label className={LABEL} style={{ fontFamily: "var(--font-tajawal)" }}>رقم واتساب (بدون +)</label>
            <input
              name="whatsapp"
              defaultValue={settings.whatsapp}
              className={INPUT}
              placeholder="97336414730"
            />
          </div>
          <div className="md:col-span-2">
            <label className={LABEL} style={{ fontFamily: "var(--font-tajawal)" }}>رابط إنستغرام</label>
            <input
              name="instagram"
              defaultValue={settings.instagram}
              className={INPUT}
              placeholder="https://instagram.com/..."
            />
          </div>
        </div>
      </section>

      {/* General text */}
      <section className={SECTION}>
        <h3 className="mb-5 text-[16px] font-bold text-[#111] dark:text-[#f5f5f4]" style={{ fontFamily: "var(--font-tajawal)" }}>
          النصوص العامة
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className={LABEL} style={{ fontFamily: "var(--font-tajawal)" }}>نص زر التواصل</label>
            <input
              name="cta_contact_text"
              defaultValue={settings.cta_contact_text}
              className={INPUT}
              style={{ fontFamily: "var(--font-tajawal)" }}
            />
          </div>
          <div>
            <label className={LABEL} style={{ fontFamily: "var(--font-tajawal)" }}>نص زر الاتصال</label>
            <input
              name="cta_call_text"
              defaultValue={settings.cta_call_text}
              className={INPUT}
              style={{ fontFamily: "var(--font-tajawal)" }}
            />
          </div>
        </div>
      </section>

      <div>
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-2 rounded-full bg-[#111] px-8 py-3 text-[14px] font-bold text-white transition-colors hover:bg-[#a71225] disabled:opacity-60 dark:bg-[#f5f5f4] dark:text-[#17171a] dark:hover:bg-[#e8323f] dark:hover:text-white"
          style={{ fontFamily: "var(--font-tajawal)" }}
        >
          {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          {isPending ? "جارٍ الحفظ..." : "حفظ الإعدادات"}
        </button>
      </div>
    </form>
  );
}
