import { notFound } from "next/navigation";
import EditCarForm from "@/components/admin/EditCarForm";
import type { Car } from "@/lib/supabase/types";

async function getCar(id: string): Promise<Car | null> {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    try {
      const { createClient } = await import("@/lib/supabase/server");
      const supabase = await createClient();
      const { data } = await supabase.from("cars").select("*").eq("id", id).single();
      if (data) return data as Car;
    } catch {}
  }
  const { localDb } = await import("@/lib/local/db");
  return localDb.cars.getById(id);
}

export default async function AdminEditCarPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const car = await getCar(id);
  if (!car) notFound();

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <EditCarForm car={car} />
    </div>
  );
}
