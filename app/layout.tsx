import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-tajawal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "3M Cars | منصة بيع السيارات في البحرين",
  description: "منصة متكاملة لعرض وبيع السيارات في البحرين — صور احترافية وتسويق فعّال",
  openGraph: {
    title: "3M Cars",
    description: "منصة بيع السيارات في البحرين",
    siteName: "3M Cars",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={tajawal.variable}>
      <body
        className="antialiased bg-white text-[#111]"
        style={{ fontFamily: "var(--font-tajawal), Tajawal, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
