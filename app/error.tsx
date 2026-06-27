"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6">
      <div className="text-center">
        <p className="text-[11px] font-bold tracking-[4px] text-[#a71225]" style={{ fontFamily: "var(--font-tajawal)" }}>
          خطأ غير متوقع
        </p>
        <h1 className="mt-3 text-[32px] font-bold text-[#111]" style={{ fontFamily: "var(--font-tajawal)" }}>
          حدث خطأ ما
        </h1>
        <p className="mt-3 text-[15px] text-[#777]" style={{ fontFamily: "var(--font-tajawal)" }}>
          {error.message}
        </p>
        <button
          onClick={() => reset()}
          className="mt-8 rounded-full bg-[#111] px-8 py-3 text-[14px] font-bold text-white transition-colors hover:bg-[#a71225]"
          style={{ fontFamily: "var(--font-tajawal)" }}
        >
          إعادة المحاولة
        </button>
      </div>
    </main>
  );
}
