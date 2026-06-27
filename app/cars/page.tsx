import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CarsClient from "@/components/CarsClient";
import type { Car } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

async function getAllCars(): Promise<Car[]> {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    try {
      const { createClient } = await import("@/lib/supabase/server");
      const supabase = await createClient();
      const { data } = await supabase.from("cars").select("*").order("created_at", { ascending: false });
      if (data) return data as Car[];
    } catch {}
  }
  const { localDb } = await import("@/lib/local/db");
  return localDb.cars.getAll();
}

export default async function CarsPage() {
  const cars = await getAllCars();
  return (
    <div className="min-h-screen bg-white text-[#111]">
      <Header />
      <CarsClient initialCars={cars} />
      <Footer />
    </div>
  );
}
