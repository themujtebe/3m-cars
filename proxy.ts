import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, computeSessionToken } from "@/lib/adminAuth";

export async function proxy(req: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return NextResponse.next();

  const { pathname } = req.nextUrl;
  if (pathname === "/admin/login") return NextResponse.next();

  const cookie = req.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const expected = await computeSessionToken(adminPassword);

  if (cookie === expected) return NextResponse.next();

  const loginUrl = new URL("/admin/login", req.url);
  loginUrl.searchParams.set("from", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*"],
};
