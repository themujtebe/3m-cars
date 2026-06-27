import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import CarCard from "@/components/CarCard";
import StatsSection from "@/components/StatsSection";
import CTASection from "@/components/CTASection";
import { createClient } from "@/lib/supabase/server";
import type { Car } from "@/lib/supabase/types";

const MOCK_CARS: Car[] = [
  {
    id: "1",
    title_ar: "تويوتا كامري",
    title_en: "Toyota Camry",
    brand: "Toyota",
    model: "Camry",
    year: 2023,
    mileage: 15000,
    price: 4800,
    currency: "BHD",
    description_ar: null,
    description_en: null,
    status: "available",
    featured: true,
    images: ["https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&q=80"],
    whatsapp_number: "97336414730",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    title_ar: "BMW 5 Series",
    title_en: "BMW 5 Series",
    brand: "BMW",
    model: "5 Series",
    year: 2022,
    mileage: 28000,
    price: 9500,
    currency: "BHD",
    description_ar: null,
    description_en: null,
    status: "available",
    featured: false,
    images: ["https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80"],
    whatsapp_number: "97336414730",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    title_ar: "لكزس ES 350",
    title_en: "Lexus ES 350",
    brand: "Lexus",
    model: "ES 350",
    year: 2023,
    mileage: 8000,
    price: 12200,
    currency: "BHD",
    description_ar: null,
    description_en: null,
    status: "sold",
    featured: false,
    images: ["https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=80"],
    whatsapp_number: "97336414730",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "4",
    title_ar: "مرسيدس E-Class",
    title_en: "Mercedes E-Class",
    brand: "Mercedes",
    model: "E-Class",
    year: 2022,
    mileage: 22000,
    price: 13500,
    currency: "BHD",
    description_ar: null,
    description_en: null,
    status: "available",
    featured: false,
    images: ["https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80"],
    whatsapp_number: "97336414730",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "5",
    title_ar: "تويوتا لاند كروزر",
    title_en: "Toyota Land Cruiser",
    brand: "Toyota",
    model: "Land Cruiser",
    year: 2021,
    mileage: 48000,
    price: 15900,
    currency: "BHD",
    description_ar: null,
    description_en: null,
    status: "available",
    featured: false,
    images: ["https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80"],
    whatsapp_number: "97336414730",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "6",
    title_ar: "رنج روفر سبورت",
    title_en: "Range Rover Sport",
    brand: "Range Rover",
    model: "Sport",
    year: 2022,
    mileage: 29000,
    price: 18500,
    currency: "BHD",
    description_ar: null,
    description_en: null,
    status: "available",
    featured: false,
    images: ["https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80"],
    whatsapp_number: "97336414730",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

async function getLatestCars(): Promise<Car[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("cars")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(6);
    if (data && data.length > 0) return data as Car[];
  } catch {}
  return MOCK_CARS;
}

export default async function HomePage() {
  const cars = await getLatestCars();

  return (
    <div className="min-h-screen bg-white text-[#111]">
      <Header />
      <Hero />
      <StatsSection />

      {/* Latest Cars */}
      <section className="bg-white px-10 py-[72px]">
        {/* Header row */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p
              className="mb-2 text-[11px] font-bold tracking-[3px] text-[#a71225] uppercase"
              style={{ fontFamily: "var(--font-tajawal)" }}
            >
              MODERN SELECTION
            </p>
            <h2
              className="text-[36px] font-bold text-[#111]"
              style={{ fontFamily: "var(--font-tajawal)" }}
            >
              أحدث السيارات
            </h2>
          </div>
          <Link
            href="/cars"
            className="text-[13px] font-bold tracking-[0.5px] text-[#111] uppercase transition-colors hover:text-[#a71225]"
            style={{ fontFamily: "var(--font-tajawal)" }}
          >
            VIEW ALL →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
}
