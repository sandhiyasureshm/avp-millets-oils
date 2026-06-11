"use server";

import { prisma } from "@/lib/db";
import { getSession } from "@/features/auth/session";
import { revalidatePath } from "next/cache";

function slugify(text: string) {
  return text.toString().toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-");
}

export async function createProduct(data: any) {
  const session = await getSession();
  if (!session) return { error: "Unauthorized" };

  if (!data.name || !data.categoryId) {
    return { error: "Name and Category are required" };
  }

  const slug = slugify(data.name);

  try {
    const newProduct = await prisma.product.create({
      data: {
        name: data.name,
        slug,
        description: data.description || "",
        categoryId: data.categoryId,
        status: data.status,
        isFeatured: data.isFeatured,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        stockQuantity: parseInt(data.stockQuantity) || 0,
        sku: data.sku,
        benefits: data.benefits || [],
        variants: data.variants || [],
        images: data.images || { primaryImage: "", gallery: [] },
        createdBy: session.id,
      },
    });
    revalidatePath("/admin/products");
    return { success: true, id: newProduct.id };
  } catch (error) {
    console.error(error);
    return { error: "Failed to create product. Does this name already exist?" };
  }
}

export async function updateProduct(id: string, data: any) {
  const session = await getSession();
  if (!session) return { error: "Unauthorized" };

  if (!data.name || !data.categoryId) {
    return { error: "Name and Category are required" };
  }

  const slug = slugify(data.name);

  try {
    await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        slug,
        description: data.description || "",
        categoryId: data.categoryId,
        status: data.status,
        isFeatured: data.isFeatured,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        stockQuantity: parseInt(data.stockQuantity) || 0,
        sku: data.sku,
        benefits: data.benefits || [],
        variants: data.variants || [],
        images: data.images || { primaryImage: "", gallery: [] },
        updatedBy: session.id,
      },
    });
    revalidatePath("/admin/products");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Failed to update product." };
  }
}

export async function deleteProduct(id: string) {
  const session = await getSession();
  if (!session) return { error: "Unauthorized" };

  try {
    await prisma.product.update({
      where: { id },
      data: { isDeleted: true, updatedBy: session.id },
    });
    revalidatePath("/admin/products");
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete product." };
  }
}
