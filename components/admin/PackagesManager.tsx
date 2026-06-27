"use client";

import { useActionState, useEffect, useState } from "react";
import { Check, Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { addPackage, updatePackage, deletePackage } from "@/app/actions/packages";
import type { Package } from "@/lib/local/packages";

const INPUT = [
  "w-full rounded-xl border border-black/[0.08] bg-[#f7f7f7] px-4 py-2.5",
  "text-[14px] text-[#111] outline-none placeholder:text-[#bbb]",
  "focus:border-[#a71225]/40 focus:bg-white transition-colors",
].join(" ");

const LABEL = "mb-1.5 block text-[11px] font-bold tracking-[1.5px] text-[#999] uppercase";

/* ── Reusable form (add + edit) ── */
function PackageForm({
  pkg,
  isEdit = false,
  onDone,
}: {
  pkg?: Package;
  isEdit?: boolean;
  onDone: () => void;
}) {
  const action = isEdit ? updatePackage : addPackage;
  const [state, formAction, isPending] = useActionState(action, null);

  useEffect(() => {
    if (state && "success" in state) onDone();
  }, [state, onDone]);

  return (
    <form
      action={formAction}
      className="space-y-4 rounded-2xl border border-[#a71225]/20 bg-white p-6"
    >
      {isEdit && <input type="hidden" name="id" value={pkg?.id} />}

      {state && "error" in state && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-[#a71225]" style={{ fontFamily: "var(--font-tajawal)" }}>
          ⚠️ {state.error}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={LABEL} style={{ fontFamily: "var(--font-tajawal)" }}>اسم الباقة</label>
          <input
            name="name"
            required
            defaultValue={pkg?.name}
            className={INPUT}
            placeholder="الاقتصادية"
            style={{ fontFamily: "var(--font-tajawal)" }}
          />
        </div>
        <div>
          <label className={LABEL} style={{ fontFamily: "var(--font-tajawal)" }}>السعر (د.ب)</label>
          <input
            name="price"
            type="number"
            min="0"
            step="0.5"
            required
            defaultValue={pkg?.price}
            className={INPUT}
            placeholder="10"
          />
        </div>
      </div>

      <div>
        <label className={LABEL} style={{ fontFamily: "var(--font-tajawal)" }}>
          المميزات <span className="normal-case font-normal text-[#bbb]">(كل سطر ميزة)</span>
        </label>
        <textarea
          name="features"
          rows={5}
          required
          defaultValue={pkg?.features.join("\n")}
          placeholder={"تصوير 8 صور احترافية\nتعديل الصور بالكامل\nنشر كـ Post في حسابنا"}
          className={INPUT}
          style={{ fontFamily: "var(--font-tajawal)", resize: "vertical" }}
        />
      </div>

      <div>
        <label className={LABEL} style={{ fontFamily: "var(--font-tajawal)" }}>باقة مميزة؟</label>
        <select
          name="highlighted"
          defaultValue={String(pkg?.highlighted ?? false)}
          className={INPUT}
          style={{ fontFamily: "var(--font-tajawal)" }}
        >
          <option value="false">لا</option>
          <option value="true">نعم — تظهر بإطار وظل مميز</option>
        </select>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-2 rounded-full bg-[#111] px-6 py-2.5 text-[13px] font-bold text-white transition-colors hover:bg-[#a71225] disabled:opacity-60"
          style={{ fontFamily: "var(--font-tajawal)" }}
        >
          {isPending && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
          {isPending ? "جارٍ الحفظ..." : isEdit ? "حفظ التعديلات" : "إضافة الباقة"}
        </button>
        <button
          type="button"
          onClick={onDone}
          className="rounded-full border border-black/[0.10] px-6 py-2.5 text-[13px] font-semibold text-[#555] transition-colors hover:border-black/20"
          style={{ fontFamily: "var(--font-tajawal)" }}
        >
          إلغاء
        </button>
      </div>
    </form>
  );
}

/* ── Main manager ── */
export default function PackagesManager({ packages }: { packages: Package[] }) {
  const [showAdd, setShowAdd]     = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-bold tracking-[3px] text-[#a71225] uppercase">الباقات</p>
          <p className="mt-1 text-[13px] text-[#999]" style={{ fontFamily: "var(--font-tajawal)" }}>
            أضف أو عدّل الباقات الخاصة بعرض السيارات
          </p>
        </div>
        {!showAdd && (
          <button
            onClick={() => { setShowAdd(true); setEditingId(null); }}
            className="flex items-center gap-2 rounded-full bg-[#111] px-5 py-2.5 text-[13px] font-bold text-white transition-colors hover:bg-[#a71225]"
            style={{ fontFamily: "var(--font-tajawal)" }}
          >
            <Plus className="h-4 w-4" />
            إضافة باقة
          </button>
        )}
      </div>

      {/* Add form */}
      {showAdd && (
        <PackageForm onDone={() => setShowAdd(false)} />
      )}

      {/* Cards */}
      {packages.length === 0 && !showAdd ? (
        <div className="rounded-2xl border border-black/[0.06] bg-white py-16 text-center">
          <p className="text-[14px] text-[#bbb]" style={{ fontFamily: "var(--font-tajawal)" }}>لا توجد باقات — أضف أول باقة</p>
        </div>
      ) : (
        <div className="grid gap-5 xl:grid-cols-3">
          {packages.map((pkg) =>
            editingId === pkg.id ? (
              <PackageForm
                key={pkg.id}
                pkg={pkg}
                isEdit
                onDone={() => setEditingId(null)}
              />
            ) : (
              <div
                key={pkg.id}
                className={`rounded-2xl border bg-white p-6 ${
                  pkg.highlighted
                    ? "border-[#a71225]/30 shadow-[0_4px_24px_rgba(167,18,37,0.08)]"
                    : "border-black/[0.06]"
                }`}
              >
                {pkg.highlighted && (
                  <span
                    className="mb-3 inline-flex items-center gap-1 rounded-full bg-[#a71225] px-2.5 py-0.5 text-[10px] font-bold text-white"
                    style={{ fontFamily: "var(--font-tajawal)" }}
                  >
                    <Check className="h-2.5 w-2.5" />
                    مميزة
                  </span>
                )}

                <h3 className="text-[18px] font-bold text-[#111]" style={{ fontFamily: "var(--font-tajawal)" }}>
                  الباقة {pkg.name}
                </h3>
                <p className="mt-2 text-[36px] font-bold text-[#a71225]" style={{ fontFamily: "var(--font-tajawal)" }}>
                  {pkg.price}
                  <span className="mr-1 text-[14px] font-normal text-[#999]">د.ب</span>
                </p>

                <div className="my-4 h-px bg-[#f0f0f0]" />

                <ul className="flex flex-col gap-3">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <span
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                        style={{ background: "rgba(167,18,37,0.08)" }}
                      >
                        <Check className="h-3 w-3 text-[#a71225]" />
                      </span>
                      <span className="text-[13px] text-[#555]" style={{ fontFamily: "var(--font-tajawal)" }}>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex gap-2">
                  <button
                    type="button"
                    onClick={() => { setEditingId(pkg.id); setShowAdd(false); }}
                    className="flex items-center gap-1.5 rounded-lg border border-black/[0.08] px-4 py-2 text-[12px] font-medium text-[#555] transition-colors hover:border-black/20 hover:text-[#111]"
                    style={{ fontFamily: "var(--font-tajawal)" }}
                  >
                    <Pencil className="h-3 w-3" />
                    تعديل
                  </button>
                  <form
                    action={deletePackage}
                    onSubmit={(e) => {
                      if (!confirm("هل أنت متأكد من حذف هذه الباقة؟")) e.preventDefault();
                    }}
                  >
                    <input type="hidden" name="id" value={pkg.id} />
                    <button
                      type="submit"
                      className="flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-[12px] font-medium text-[#a71225] transition-colors hover:bg-red-100"
                      style={{ fontFamily: "var(--font-tajawal)" }}
                    >
                      <Trash2 className="h-3 w-3" />
                      حذف
                    </button>
                  </form>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
