import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MessageCircle, Globe, Phone } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const metadata = { title: "تواصل معنا | 3M Cars" };

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

interface ContactItem {
  Icon: LucideIcon | typeof InstagramIcon;
  label: string;
  value: string;
  href: string;
  color: string;
}

const CONTACTS: ContactItem[] = [
  { Icon: MessageCircle, label: "واتساب",   value: "+973 36414730", href: "https://wa.me/97336414730?text=السلام عليكم", color: "#25D366" },
  { Icon: InstagramIcon, label: "إنستغرام", value: "@3mcars.bh",   href: "https://instagram.com/3mcars.bh",             color: "#E1306C" },
  { Icon: Globe,         label: "الموقع",   value: "3mcars.bh",    href: "https://3mcars.bh",                           color: "#a71225" },
  { Icon: Phone,         label: "هاتف",     value: "+973 36414730", href: "tel:+97336414730",                           color: "#a71225" },
];

export default function ContactPage() {
  const waLink = "https://wa.me/97336414730?text=السلام عليكم، حاب أستفسر عن خدماتكم";

  return (
    <div className="min-h-screen bg-white text-[#111]">
      <Header />

      {/* Page header */}
      <section className="border-b border-black/[0.06] bg-[#f7f7f7] px-10 py-14 text-center">
        <p
          className="mb-2 text-[11px] font-bold tracking-[4px] text-[#a71225] uppercase"
          style={{ fontFamily: "var(--font-tajawal)" }}
        >
          GET IN TOUCH
        </p>
        <h1
          className="text-[42px] font-bold text-[#111]"
          style={{ fontFamily: "var(--font-tajawal)" }}
        >
          تواصل معنا
        </h1>
        <p
          className="mx-auto mt-3 max-w-md text-[15px] leading-[1.8] text-[#777]"
          style={{ fontFamily: "var(--font-tajawal)" }}
        >
          سواء كنت تبحث عن سيارة أو تريد عرض سيارتك — نحن هنا دائماً
        </p>
      </section>

      {/* Contact cards */}
      <section className="px-10 py-16">
        <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
          {CONTACTS.map(({ Icon, label, value, href, color }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-black/[0.08] bg-white p-5 transition-all duration-300 hover:border-black/[0.16] hover:-translate-y-0.5 hover:shadow-md"
            >
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors"
                style={{ background: `${color}12`, border: `1px solid ${color}25` }}
              >
                <Icon className="h-5 w-5" style={{ color }} />
              </div>
              <div>
                <p
                  className="text-[11px] font-bold tracking-[1.5px] text-[#999] uppercase"
                  style={{ fontFamily: "var(--font-tajawal)" }}
                >
                  {label}
                </p>
                <p
                  className="mt-0.5 text-[15px] font-semibold text-[#111]"
                  style={{ fontFamily: "var(--font-tajawal)" }}
                >
                  {value}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-[#a71225]/15 bg-[#a71225]/[0.03] px-8 py-10 text-center">
          <p
            className="mb-1 text-[11px] font-bold tracking-[3px] text-[#a71225] uppercase"
            style={{ fontFamily: "var(--font-tajawal)" }}
          >
            DIRECT LINE
          </p>
          <h2
            className="text-[24px] font-bold text-[#111]"
            style={{ fontFamily: "var(--font-tajawal)" }}
          >
            تحدث معنا الآن على واتساب
          </h2>
          <p
            className="mt-2 text-[14px] text-[#777]"
            style={{ fontFamily: "var(--font-tajawal)" }}
          >
            متاحون طوال الأسبوع للرد على استفساراتك
          </p>
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-8 py-3.5 text-[14px] font-bold text-white transition-colors hover:bg-[#1fba59]"
            style={{ fontFamily: "var(--font-tajawal)" }}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            ابدأ المحادثة
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
