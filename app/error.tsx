"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="mb-4 text-3xl font-bold">صار خطأ غير متوقع</h1>
        <p className="mb-6 text-white/60">{error.message}</p>
        <button
          onClick={() => reset()}
          className="rounded-full bg-red-600 px-6 py-3 hover:bg-red-700"
        >
          إعادة المحاولة
        </button>
      </div>
    </main>
  );
}