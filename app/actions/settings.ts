"use server";

import { revalidatePath } from "next/cache";

export async function saveSettings(
  _prev: { error: string } | { success: true } | null,
  formData: FormData,
): Promise<{ error: string } | { success: true }> {
  try {
    const { writeSettings } = await import("@/lib/local/settings");
    writeSettings({
      phone:            (formData.get("phone")            as string).trim(),
      whatsapp:         (formData.get("whatsapp")         as string).trim(),
      instagram:        (formData.get("instagram")        as string).trim(),
      cta_contact_text: (formData.get("cta_contact_text") as string).trim(),
      cta_call_text:    (formData.get("cta_call_text")    as string).trim(),
    });
    revalidatePath("/admin/settings");
    revalidatePath("/");
    return { success: true };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "حدث خطأ غير متوقع" };
  }
}
