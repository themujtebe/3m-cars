import type { ReactNode } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.18),transparent_28%)]" />
        <div className="absolute left-[-10%] top-[8%] h-[420px] w-[420px] rounded-full bg-red-700/10 blur-3xl" />
        <div className="absolute right-[-8%] top-[45%] h-[500px] w-[500px] rounded-full bg-red-600/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03),transparent_14%,transparent_86%,rgba(255,255,255,0.03))]" />
      </div>

      <div className="relative flex min-h-screen">
        <AdminSidebar />

        <div className="flex min-h-screen flex-1 flex-col">
          <AdminTopbar />

          <div className="flex-1 px-5 py-6 md:px-6 xl:px-8">{children}</div>
        </div>
      </div>
    </main>
  );
}