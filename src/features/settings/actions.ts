"use server";
import { prisma } from "@/lib/db";
import { getSession } from "@/features/auth/session";
import { revalidatePath } from "next/cache";

export async function updateSettings(formData: FormData) {
  const session = await getSession();
  if (!session) return { error: "Unauthorized" };

  const settings = [
    { key: "CONTACT_EMAIL", value: formData.get("CONTACT_EMAIL") as string },
    { key: "CONTACT_PHONE", value: formData.get("CONTACT_PHONE") as string },
    { key: "WHATSAPP_NUMBER", value: formData.get("WHATSAPP_NUMBER") as string },
    { key: "ADDRESS", value: formData.get("ADDRESS") as string },
  ];

  try {
    for (const setting of settings) {
      if (setting.value) {
        await prisma.homepageSetting.upsert({
          where: { key: setting.key },
          update: { value: setting.value },
          create: { key: setting.key, value: setting.value },
        });
      }
    }
    revalidatePath("/admin/settings");
    return { success: true };
  } catch (error) {
    return { error: "Failed to update settings" };
  }
}
