import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
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
    <html lang="ar" dir="rtl" className={tajawal.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=JSON.parse(localStorage.getItem('3mcars-theme')||'{}');if(t.state&&t.state.dark){document.documentElement.classList.add('dark')}}catch(e){}`,
          }}
        />
      </head>
      <body
        className="antialiased"
        style={{ fontFamily: "var(--font-tajawal), Tajawal, sans-serif" }}
      >
        <ThemeProvider />
        {children}
      </body>
    </html>
  );
}
