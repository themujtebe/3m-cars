const STATS = [
  {
    value: "100%",
    label: "Customer Satisfaction",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#a71225" strokeWidth="1.5" width="22" height="22">
        <path d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
    highlight: true,
  },
  {
    value: "6+",
    label: "Years of Experience",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#a71225" strokeWidth="1.5" width="22" height="22">
        <path d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0" />
      </svg>
    ),
  },
  {
    value: "800+",
    label: "Happy Clients",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#a71225" strokeWidth="1.5" width="22" height="22">
        <path d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
      </svg>
    ),
  },
  {
    value: "1000+",
    label: "Cars Sold",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#a71225" strokeWidth="1.5" width="22" height="22">
        <path d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
  },
];

export default function StatsSection() {
  return (
    <section className="bg-[#f7f7f7] px-10 py-[60px]">
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
        {STATS.map((stat, i) => (
          <div
            key={i}
            className="rounded-[20px] border bg-white p-8 text-center transition-all duration-300 hover:-translate-y-0.5"
            style={{
              borderColor: stat.highlight ? "rgba(167,18,37,0.3)" : "rgba(0,0,0,0.06)",
              boxShadow: stat.highlight ? "0 4px 24px rgba(167,18,37,0.08)" : undefined,
            }}
          >
            {/* Icon circle */}
            <div
              className="mx-auto mb-5 flex h-11 w-11 items-center justify-center rounded-full"
              style={{ background: "rgba(167,18,37,0.08)" }}
            >
              {stat.icon}
            </div>

            {/* Number */}
            <div
              className="text-[48px] font-bold leading-none text-[#111]"
              style={{ fontFamily: "var(--font-tajawal)", fontWeight: 900 }}
            >
              {stat.value}
            </div>

            {/* Label */}
            <p
              className="mt-3 text-[13px] text-[#777]"
              style={{ fontFamily: "var(--font-tajawal)" }}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
