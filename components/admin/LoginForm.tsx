"use client";

import { useActionState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Lock, User, Loader2, ArrowRight } from "lucide-react";
import { loginAdmin } from "@/app/actions/auth";

const INPUT = [
 "w-full rounded-xl border border-black/[0.08] bg-[#f7f7f7] px-4 py-3 pr-11",
 "text-[14px] text-[#111] outline-none placeholder:text-[#bbb]",
 "focus:border-[#a71225]/40 focus:bg-white transition-colors",
].join(" ");

export default function LoginForm({ redirectTo }: { redirectTo: string }) {
 const [state, action, isPending] = useActionState(loginAdmin, null);

 return (
 <div className="flex min-h-screen items-center justify-center bg-[#f7f7f7] px-6">
 <div className="w-full max-w-[400px]">
 <div className="mb-8 flex flex-col items-center text-center">
 <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-[14px] bg-[#a71225] p-2">
 <Image src="/Logo.png" alt="3M Cars" width={56} height={56} className="h-full w-full object-contain" priority />
 </div>
 <p className="mt-4 text-[11px] font-bold tracking-[3px] text-[#a71225] uppercase" style={{ fontFamily: "var(--font-tajawal)" }}>
 3M CARS ADMIN
 </p>
 <h1 className="mt-1 text-[22px] font-bold text-[#111]" style={{ fontFamily: "var(--font-tajawal)" }}>
 تسجيل الدخول للوحة التحكم
 </h1>
 </div>

 <form action={action} className="rounded-2xl border border-black/[0.06] bg-white p-6 shadow-sm">
 <input type="hidden" name="from" value={redirectTo} />

 {state?.error && (
 <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-[#a71225]" style={{ fontFamily: "var(--font-tajawal)" }}>
 ⚠️ {state.error}
 </div>
 )}

 <div className="space-y-4">
 <div>
 <label className="mb-1.5 block text-[11px] font-bold tracking-[1.5px] text-[#999] uppercase" style={{ fontFamily: "var(--font-tajawal)" }}>
 اسم المستخدم
 </label>
 <div className="relative">
 <User className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#bbb]" />
 <input
 name="username"
 type="text"
 required
 autoFocus
 autoComplete="username"
 placeholder="admin"
 className={INPUT}
 style={{ fontFamily: "var(--font-tajawal)" }}
 />
 </div>
 </div>

 <div>
 <label className="mb-1.5 block text-[11px] font-bold tracking-[1.5px] text-[#999] uppercase" style={{ fontFamily: "var(--font-tajawal)" }}>
 كلمة المرور
 </label>
 <div className="relative">
 <Lock className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#bbb]" />
 <input
 name="password"
 type="password"
 required
 autoComplete="current-password"
 placeholder="••••••••"
 className={INPUT}
 style={{ fontFamily: "var(--font-tajawal)" }}
 />
 </div>
 </div>
 </div>

 <button
 type="submit"
 disabled={isPending}
 className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#111] py-3 text-[14px] font-bold text-white transition-colors hover:bg-[#a71225] disabled:opacity-60"
 style={{ fontFamily: "var(--font-tajawal)" }}
 >
 {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
 {isPending ? "جارٍ الدخول..." : "دخول"}
 </button>
 </form>

 <Link
 href="/"
 className="mt-5 flex items-center justify-center gap-1.5 text-[13px] font-semibold text-[#777] transition-colors hover:text-[#111]"
 style={{ fontFamily: "var(--font-tajawal)" }}
 >
 العودة للموقع
 <ArrowRight className="h-3.5 w-3.5 rotate-180" />
 </Link>
 </div>
 </div>
 );
}
