"use server";

import { revalidatePath } from "next/cache";

function parseFeatures(raw: string): string[] {
  return raw.split("\n").map((f) => f.trim()).filter(Boolean);
}

export async function addPackage(
  _prev: { error: string } | { success: true } | null,
  formData: FormData,
): Promise<{ error: string } | { success: true }> {
  try {
    const { packagesDb } = await import("@/lib/local/packages");
    packagesDb.insert({
      name:        (formData.get("name")     as string).trim(),
      price:       Number(formData.get("price")),
      features:    parseFeatures(formData.get("features") as string),
      highlighted: formData.get("highlighted") === "true",
    });
    revalidatePath("/admin/packages");
    revalidatePath("/packages");
    return { success: true };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "حدث خطأ غير متوقع" };
  }
}

export async function updatePackage(
  _prev: { error: string } | { success: true } | null,
  formData: FormData,
): Promise<{ error: string } | { success: true }> {
  try {
    const { packagesDb } = await import("@/lib/local/packages");
    const id = formData.get("id") as string;
    const updated = packagesDb.update(id, {
      name:        (formData.get("name")     as string).trim(),
      price:       Number(formData.get("price")),
      features:    parseFeatures(formData.get("features") as string),
      highlighted: formData.get("highlighted") === "true",
    });
    if (!updated) return { error: "الباقة غير موجودة" };
    revalidatePath("/admin/packages");
    revalidatePath("/packages");
    return { success: true };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "حدث خطأ غير متوقع" };
  }
}

export async function deletePackage(formData: FormData) {
  const { packagesDb } = await import("@/lib/local/packages");
  packagesDb.delete(formData.get("id") as string);
  revalidatePath("/admin/packages");
  revalidatePath("/packages");
}
