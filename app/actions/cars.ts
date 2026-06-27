"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { CurrencyCode } from "@/lib/currency";

const useSupabase = () =>
  !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);

/* ───────────── ADD CAR ───────────── */
export async function addCar(
  _prev: { error: string } | { success: true } | null,
  formData: FormData,
): Promise<{ error: string } | { success: true }> {
  const title_ar       = formData.get("title_ar") as string;
  const brand          = formData.get("brand") as string;
  const model          = formData.get("model") as string;
  const year           = Number(formData.get("year"));
  const mileage        = Number(formData.get("mileage") || 0);
  const price          = Number(formData.get("price"));
  const currency       = (formData.get("currency") as CurrencyCode) || "BHD";
  const status         = (formData.get("status") as "available" | "sold") || "available";
  const featured       = formData.get("featured") === "true";
  const description_ar = (formData.get("description_ar") as string) || null;
  const imageFiles     = formData.getAll("images") as File[];

  try {
    if (useSupabase()) {
      const { createAdminClient } = await import("@/lib/supabase/server");
      const supabase = await createAdminClient();
      const imageUrls: string[] = [];

      for (const file of imageFiles) {
        if (file.size === 0) continue;
        const ext  = file.name.split(".").pop();
        const filePath = `cars/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { error } = await supabase.storage.from("car-images").upload(filePath, file, { upsert: false });
        if (!error) {
          const { data } = supabase.storage.from("car-images").getPublicUrl(filePath);
          imageUrls.push(data.publicUrl);
        }
      }

      const { error: insertError } = await supabase.from("cars").insert({
        title_ar, title_en: null, brand, model, year, mileage, price, currency,
        status, featured, description_ar, description_en: null,
        images: imageUrls, whatsapp_number: "97336414730",
      } as never);

      if (insertError) return { error: insertError.message };
    } else {
      const { localDb }    = await import("@/lib/local/db");
      const { saveImage }  = await import("@/lib/local/storage");
      const imageUrls: string[] = [];

      for (const file of imageFiles) {
        if (file.size === 0) continue;
        imageUrls.push(await saveImage(file));
      }

      localDb.cars.insert({
        title_ar, title_en: null, brand, model, year, mileage, price, currency,
        status, featured, description_ar, description_en: null,
        images: imageUrls, whatsapp_number: "97336414730",
      });
    }
  } catch (e) {
    return { error: e instanceof Error ? e.message : "حدث خطأ غير متوقع" };
  }

  revalidatePath("/");
  revalidatePath("/cars");
  revalidatePath("/admin/cars");
  return { success: true };
}

/* ───────────── UPDATE STATUS ───────────── */
export async function updateCarStatus(formData: FormData) {
  const id     = formData.get("id") as string;
  const status = formData.get("status") as "available" | "sold";

  if (useSupabase()) {
    const { createAdminClient } = await import("@/lib/supabase/server");
    const supabase = await createAdminClient();
    await supabase.from("cars").update({ status } as never).eq("id", id);
  } else {
    const { localDb } = await import("@/lib/local/db");
    localDb.cars.update(id, { status });
  }

  revalidatePath("/cars");
  revalidatePath("/admin/cars");
  revalidatePath("/");
}

/* ───────────── UPDATE CAR ───────────── */
export async function updateCar(
  _prev: { error: string } | { success: true } | null,
  formData: FormData,
): Promise<{ error: string } | { success: true }> {
  const id             = formData.get("id") as string;
  const title_ar       = formData.get("title_ar") as string;
  const brand          = formData.get("brand") as string;
  const model          = formData.get("model") as string;
  const year           = Number(formData.get("year"));
  const mileage        = Number(formData.get("mileage") || 0);
  const price          = Number(formData.get("price"));
  const currency       = (formData.get("currency") as CurrencyCode) || "BHD";
  const status         = (formData.get("status") as "available" | "sold") || "available";
  const featured       = formData.get("featured") === "true";
  const description_ar = (formData.get("description_ar") as string) || null;
  const keepImages     = formData.getAll("keep_image") as string[];
  const newImageFiles  = formData.getAll("new_images") as File[];

  try {
    if (useSupabase()) {
      const { createAdminClient } = await import("@/lib/supabase/server");
      const supabase = await createAdminClient();
      const imageUrls: string[] = [...keepImages];

      for (const file of newImageFiles) {
        if (file.size === 0) continue;
        const ext = file.name.split(".").pop();
        const filePath = `cars/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { error } = await supabase.storage.from("car-images").upload(filePath, file, { upsert: false });
        if (!error) {
          const { data } = supabase.storage.from("car-images").getPublicUrl(filePath);
          imageUrls.push(data.publicUrl);
        }
      }

      const { error: updateError } = await supabase.from("cars").update({
        title_ar, brand, model, year, mileage, price, currency,
        status, featured, description_ar, images: imageUrls,
      } as never).eq("id", id);

      if (updateError) return { error: updateError.message };
    } else {
      const { localDb }   = await import("@/lib/local/db");
      const { saveImage } = await import("@/lib/local/storage");
      const imageUrls: string[] = [...keepImages];

      for (const file of newImageFiles) {
        if (file.size === 0) continue;
        imageUrls.push(await saveImage(file));
      }

      const updated = localDb.cars.update(id, {
        title_ar, brand, model, year, mileage, price, currency,
        status, featured, description_ar, images: imageUrls,
      });
      if (!updated) return { error: "السيارة غير موجودة" };
    }
  } catch (e) {
    return { error: e instanceof Error ? e.message : "حدث خطأ غير متوقع" };
  }

  revalidatePath("/");
  revalidatePath("/cars");
  revalidatePath(`/cars/${id}`);
  revalidatePath("/admin/cars");
  return { success: true };
}

/* ───────────── DELETE CAR (FormData) ───────────── */
export async function deleteCarAction(formData: FormData) {
  const id = formData.get("id") as string;

  if (useSupabase()) {
    const { createAdminClient } = await import("@/lib/supabase/server");
    const supabase = await createAdminClient();
    const { data: carData } = await supabase.from("cars").select("images").eq("id", id).single();
    const car = carData as { images: string[] } | null;
    if (car?.images?.length) {
      const paths = car.images.map((u: string) => u.split("/car-images/")[1]).filter(Boolean);
      if (paths.length) await supabase.storage.from("car-images").remove(paths);
    }
    await supabase.from("cars").delete().eq("id", id);
  } else {
    const { localDb }     = await import("@/lib/local/db");
    const { deleteImage } = await import("@/lib/local/storage");
    const car = localDb.cars.getById(id);
    car?.images?.forEach((url) => { if (url.startsWith("/uploads/")) deleteImage(url); });
    localDb.cars.delete(id);
  }

  revalidatePath("/cars");
  revalidatePath("/admin/cars");
  revalidatePath("/");
  redirect("/admin/cars");
}

/* ───────────── DELETE CAR (string id) ───────────── */
export async function deleteCar(id: string) {
  if (useSupabase()) {
    const { createAdminClient } = await import("@/lib/supabase/server");
    const supabase = await createAdminClient();
    const { data: carData } = await supabase.from("cars").select("images").eq("id", id).single();
    const car = carData as { images: string[] } | null;
    if (car?.images?.length) {
      const paths = car.images.map((u: string) => u.split("/car-images/")[1]).filter(Boolean);
      if (paths.length) await supabase.storage.from("car-images").remove(paths);
    }
    await supabase.from("cars").delete().eq("id", id);
  } else {
    const { localDb }     = await import("@/lib/local/db");
    const { deleteImage } = await import("@/lib/local/storage");
    const car = localDb.cars.getById(id);
    car?.images?.forEach((url) => { if (url.startsWith("/uploads/")) deleteImage(url); });
    localDb.cars.delete(id);
  }

  revalidatePath("/cars");
  revalidatePath("/");
  redirect("/admin/cars");
}
