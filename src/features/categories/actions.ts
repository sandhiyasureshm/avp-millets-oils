"use server";

import { prisma } from "@/lib/db";
import { getSession } from "@/features/auth/session";
import { revalidatePath } from "next/cache";

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")        
    .replace(/[^\w\-]+/g, "")    
    .replace(/\-\-+/g, "-");     
}

export async function createCategory(formData: FormData) {
  const session = await getSession();
  if (!session) return { error: "Unauthorized" };

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const image = formData.get("image") as string;
  const sortOrder = parseInt(formData.get("sortOrder") as string) || 0;
  const status = formData.get("status") as string;

  if (!name) return { error: "Name is required" };

  const slug = slugify(name);

  try {
    await prisma.category.create({
      data: {
        name,
        slug,
        description,
        image,
        sortOrder,
        status,
        createdBy: session.id,
      },
    });
    revalidatePath("/admin/categories");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Failed to create category. Does this name already exist?" };
  }
}

export async function updateCategory(id: string, formData: FormData) {
  const session = await getSession();
  if (!session) return { error: "Unauthorized" };

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const image = formData.get("image") as string;
  const sortOrder = parseInt(formData.get("sortOrder") as string) || 0;
  const status = formData.get("status") as string;

  if (!name) return { error: "Name is required" };

  const slug = slugify(name);

  try {
    await prisma.category.update({
      where: { id },
      data: {
        name,
        slug,
        description,
        image,
        sortOrder,
        status,
        updatedBy: session.id,
      },
    });
    revalidatePath("/admin/categories");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Failed to update category." };
  }
}

export async function deleteCategory(id: string) {
  const session = await getSession();
  if (!session) return { error: "Unauthorized" };

  try {
    // Soft delete
    await prisma.category.update({
      where: { id },
      data: { isDeleted: true, updatedBy: session.id },
    });
    revalidatePath("/admin/categories");
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete category." };
  }
}
