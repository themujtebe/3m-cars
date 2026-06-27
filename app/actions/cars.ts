"use server";

import { createAdminClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { CurrencyCode } from "@/lib/currency";

export async function addCar(formData: FormData) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    redirect("/admin/cars");
  }
  const supabase = await createAdminClient();

  const title_ar   = formData.get("title_ar") as string;
  const brand      = formData.get("brand") as string;
  const model      = formData.get("model") as string;
  const year       = Number(formData.get("year"));
  const mileage    = Number(formData.get("mileage"));
  const price      = Number(formData.get("price"));
  const currency   = (formData.get("currency") as CurrencyCode) || "BHD";
  const status     = (formData.get("status") as "available" | "sold") || "available";
  const featured   = formData.get("featured") === "true";
  const description_ar = formData.get("description_ar") as string;

  const imageFiles = formData.getAll("images") as File[];
  const imageUrls: string[] = [];

  for (const file of imageFiles) {
    if (file.size === 0) continue;
    const ext  = file.name.split(".").pop();
    const path = `cars/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from("car-images")
      .upload(path, file, { upsert: false });
    if (!uploadError) {
      const { data } = supabase.storage.from("car-images").getPublicUrl(path);
      imageUrls.push(data.publicUrl);
    }
  }

  const payload = {
    title_ar,
    title_en: null as null,
    brand,
    model,
    year,
    mileage,
    price,
    currency,
    status,
    featured,
    description_ar: (description_ar || null) as string | null,
    description_en: null as null,
    images: imageUrls,
    whatsapp_number: "97336414730",
  };

  const { error } = await supabase.from("cars").insert(payload as never);

  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/cars");
  redirect("/admin/cars");
}

export async function updateCarStatus(id: string, status: "available" | "sold") {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return;
  const supabase = await createAdminClient();
  await supabase.from("cars").update({ status } as never).eq("id", id);
  revalidatePath("/cars");
  revalidatePath("/");
}

export async function deleteCar(id: string) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    redirect("/admin/cars");
  }
  const supabase = await createAdminClient();
  const { data: carData } = await supabase.from("cars").select("images").eq("id", id).single();
  const car = carData as { images: string[] } | null;

  if (car?.images) {
    const paths = car.images.map((url: string) => url.split("/car-images/")[1]).filter(Boolean);
    if (paths.length > 0) {
      await supabase.storage.from("car-images").remove(paths);
    }
  }

  await supabase.from("cars").delete().eq("id", id);
  revalidatePath("/cars");
  revalidatePath("/");
  redirect("/admin/cars");
}
