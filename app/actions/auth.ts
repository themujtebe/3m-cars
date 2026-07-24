"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_USER, ADMIN_SESSION_COOKIE, computeSessionToken } from "@/lib/adminAuth";

export type LoginState = { error: string } | null;

export async function loginAdmin(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const redirectTo = String(formData.get("from") ?? "/admin");

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return { error: "لم يتم إعداد كلمة مرور الأدمن على الخادم." };
  }
  if (username !== ADMIN_USER || password !== adminPassword) {
    return { error: "اسم المستخدم أو كلمة المرور غير صحيحة." };
  }

  const token = await computeSessionToken(adminPassword);
  const store = await cookies();
  store.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect(redirectTo.startsWith("/admin") ? redirectTo : "/admin");
}

export async function logoutAdmin() {
  const store = await cookies();
  store.delete({ name: ADMIN_SESSION_COOKIE, path: "/admin" });
  redirect("/admin/login");
}
