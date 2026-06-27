import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white text-[#111]">
      <Header />
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-10 text-center">
        <p
          className="text-[80px] font-bold leading-none text-[#f0f0f0]"
          style={{ fontFamily: "var(--font-tajawal)" }}
        >
          404
        </p>
        <h1
          className="mt-4 text-[28px] font-bold text-[#111]"
          style={{ fontFamily: "var(--font-tajawal)" }}
        >
          الصفحة غير موجودة
        </h1>
        <p
          className="mt-3 text-[15px] text-[#777]"
          style={{ fontFamily: "var(--font-tajawal)" }}
        >
          الرابط الذي طلبته غير موجود أو تم نقله.
        </p>
        <Link
          href="/"
          className="mt-8 rounded-full bg-[#111] px-8 py-3 text-[14px] font-bold text-white transition-colors hover:bg-[#a71225]"
          style={{ fontFamily: "var(--font-tajawal)" }}
        >
          العودة للرئيسية
        </Link>
      </div>
      <Footer />
    </div>
  );
}
