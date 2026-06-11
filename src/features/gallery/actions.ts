"use server";

import { prisma } from "@/lib/db";
import { getSession } from "@/features/auth/session";
import { revalidatePath } from "next/cache";

export async function createGalleryImage(formData: FormData) {
  const session = await getSession();
  if (!session) return { error: "Unauthorized" };

  const imagePath = formData.get("imagePath") as string;
  const caption = formData.get("caption") as string;
  const category = formData.get("category") as string;
  const sortOrder = parseInt(formData.get("sortOrder") as string) || 0;

  if (!imagePath) return { error: "Image is required" };

  try {
    await prisma.gallery.create({
      data: {
        imagePath,
        caption,
        category: category || "GENERAL",
        sortOrder,
      },
    });
    revalidatePath("/admin/gallery");
    return { success: true };
  } catch (error) {
    return { error: "Failed to upload gallery image" };
  }
}

export async function deleteGalleryImage(id: string) {
  const session = await getSession();
  if (!session) return { error: "Unauthorized" };

  try {
    await prisma.gallery.delete({
      where: { id },
    });
    revalidatePath("/admin/gallery");
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete gallery image" };
  }
}
