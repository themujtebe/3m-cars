import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 text-center md:grid-cols-3 md:text-right">
          <div>
            <h3 className="text-xl font-extrabold">3M CARS</h3>
            <p className="mt-4 text-sm leading-7 text-white/60">
              منصة متكاملة لعرض السيارات بطريقة احترافية تساعدك
              <br />
              توصل للمشتري المناسب بسهولة.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">
              روابط سريعة
            </h4>

            <div className="flex flex-col gap-3 text-sm text-white/70">
              <Link href="/" className="transition hover:text-white">
                الرئيسية
              </Link>

              <Link href="/cars" className="transition hover:text-white">
                السيارات
              </Link>

              <Link href="/packages" className="transition hover:text-white">
                الباقات
              </Link>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">
              تواصل معنا الآن
            </h4>

            <div className="flex items-center justify-center gap-3 md:justify-start">
              <a
                href="https://wa.me/97336414730"
                target="_blank"
                rel="noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 transition hover:border-white/40 hover:bg-white/5"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
              </a>

              <a
                href="https://www.instagram.com/3mcars.bh/"
                target="_blank"
                rel="noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 transition hover:border-white/40 hover:bg-white/5"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37a4 4 0 1 1-3.37-3.37 4 4 0 0 1 3.37 3.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/40">
          © 2026 3M CARS. جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  );
}