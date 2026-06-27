import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#f0f0f0] px-10 pb-10 pt-[60px]">
      {/* Top grid */}
      <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">

        {/* Col 1 — Brand */}
        <div>
          <div className="flex items-center gap-3">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#111]"
              style={{ fontFamily: "var(--font-tajawal)" }}
            >
              <span className="text-sm font-bold text-white">3M</span>
            </div>
            <div className="leading-none">
              <div className="text-[15px] font-bold text-[#111]" style={{ fontFamily: "var(--font-tajawal)" }}>
                CARS
              </div>
              <div className="text-[9px] font-bold tracking-[3px] text-[#a71225]" style={{ fontFamily: "var(--font-tajawal)" }}>
                BOUTIQUE
              </div>
            </div>
          </div>

          <p
            className="mt-4 max-w-[260px] text-[13px] leading-[1.8] text-[#666]"
            style={{ fontFamily: "var(--font-tajawal)" }}
          >
            منصة متكاملة لعرض وبيع السيارات في البحرين بصور احترافية وتسويق فعّال يصل لأوسع شريحة من المشترين.
          </p>

          {/* Socials */}
          <div className="mt-5 flex gap-2.5">
            {[
              { icon: <InstagramIcon />, href: "https://instagram.com/3mcars.bh" },
              { icon: <TwitterIcon />, href: "#" },
              { icon: <FacebookIcon />, href: "#" },
            ].map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.15] text-[#555] transition-all hover:border-[#111] hover:text-[#111]"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Col 2 — Inventory */}
        <div>
          <h4
            className="mb-5 text-[10px] font-bold tracking-[3px] text-[#999] uppercase"
            style={{ fontFamily: "var(--font-tajawal)" }}
          >
            INVENTORY
          </h4>
          <ul className="flex flex-col gap-3">
            {["Digital Stock", "Porsche", "Mercedes AMG", "Rolls-Royce"].map((item) => (
              <li key={item}>
                <Link
                  href="/cars"
                  className="text-[13px] font-medium text-[#444] transition-colors hover:text-[#a71225]"
                  style={{ fontFamily: "var(--font-tajawal)" }}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 — Ecosystem */}
        <div>
          <h4
            className="mb-5 text-[10px] font-bold tracking-[3px] text-[#999] uppercase"
            style={{ fontFamily: "var(--font-tajawal)" }}
          >
            ECOSYSTEM
          </h4>
          <ul className="flex flex-col gap-3">
            {["Service Tiers", "Digital Concierge", "Tier Preservation", "Global Network"].map((item) => (
              <li key={item}>
                <Link
                  href="/packages"
                  className="text-[13px] font-medium text-[#444] transition-colors hover:text-[#a71225]"
                  style={{ fontFamily: "var(--font-tajawal)" }}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4 — Network */}
        <div>
          <h4
            className="mb-5 text-[10px] font-bold tracking-[3px] text-[#999] uppercase"
            style={{ fontFamily: "var(--font-tajawal)" }}
          >
            NETWORK
          </h4>
          <ul className="flex flex-col gap-4">
            {[
              { icon: <MapPin className="h-3.5 w-3.5" />, text: "Kingdom of Bahrain" },
              { icon: <Phone className="h-3.5 w-3.5" />, text: "+973 36414730", href: "tel:+97336414730" },
              { icon: <Mail className="h-3.5 w-3.5" />, text: "INFO@3MCARS.VIP", href: "mailto:INFO@3MCARS.VIP" },
            ].map((item, i) => (
              <li key={i}>
                <a
                  href={item.href ?? "#"}
                  className="flex items-center gap-3 text-[13px] font-medium text-[#444] transition-colors hover:text-[#a71225]"
                  style={{ fontFamily: "var(--font-tajawal)" }}
                >
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[#a71225]"
                    style={{ background: "rgba(167,18,37,0.08)" }}
                  >
                    {item.icon}
                  </span>
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-12 flex flex-col items-center justify-between gap-2 border-t border-black/[0.08] pt-6 sm:flex-row">
        <p className="text-[12px] text-[#aaa]" style={{ fontFamily: "var(--font-tajawal)" }}>
          © 3M Cars 2026. All rights reserved.
        </p>
        <div className="flex gap-4 text-[12px] text-[#aaa]" style={{ fontFamily: "var(--font-tajawal)" }}>
          <Link href="#" className="hover:text-[#555] transition-colors">Privacy Policy</Link>
          <span>|</span>
          <Link href="#" className="hover:text-[#555] transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
