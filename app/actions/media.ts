"use server";

import { revalidatePath } from "next/cache";

const useSupabase = () =>
  !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);

export async function setMainImageAction(formData: FormData) {
  const carId    = formData.get("carId")    as string;
  const imageUrl = formData.get("imageUrl") as string;

  if (useSupabase()) {
    const { createAdminClient } = await import("@/lib/supabase/server");
    const supabase = await createAdminClient();
    const { data } = await supabase.from("cars").select("images").eq("id", carId).single();
    const images = (data as { images: string[] } | null)?.images ?? [];
    const reordered = [imageUrl, ...images.filter((u) => u !== imageUrl)];
    await supabase.from("cars").update({ images: reordered } as never).eq("id", carId);
  } else {
    const { localDb } = await import("@/lib/local/db");
    const car = localDb.cars.getById(carId);
    if (!car) return;
    const reordered = [imageUrl, ...car.images.filter((u) => u !== imageUrl)];
    localDb.cars.update(carId, { images: reordered });
  }

  revalidatePath("/admin/media");
  revalidatePath("/admin/cars");
  revalidatePath(`/cars/${carId}`);
  revalidatePath("/");
}

export async function deleteCarImageAction(formData: FormData) {
  const carId    = formData.get("carId")    as string;
  const imageUrl = formData.get("imageUrl") as string;

  if (useSupabase()) {
    const { createAdminClient } = await import("@/lib/supabase/server");
    const supabase = await createAdminClient();
    const { data } = await supabase.from("cars").select("images").eq("id", carId).single();
    const images = ((data as { images: string[] } | null)?.images ?? []).filter((u) => u !== imageUrl);
    await supabase.from("cars").update({ images } as never).eq("id", carId);
    const storagePath = imageUrl.split("/car-images/")[1];
    if (storagePath) await supabase.storage.from("car-images").remove([storagePath]);
  } else {
    const { localDb }     = await import("@/lib/local/db");
    const { deleteImage } = await import("@/lib/local/storage");
    const car = localDb.cars.getById(carId);
    if (!car) return;
    localDb.cars.update(carId, { images: car.images.filter((u) => u !== imageUrl) });
    if (imageUrl.startsWith("/uploads/")) deleteImage(imageUrl);
  }

  revalidatePath("/admin/media");
  revalidatePath("/admin/cars");
  revalidatePath(`/cars/${carId}`);
  revalidatePath("/");
}
