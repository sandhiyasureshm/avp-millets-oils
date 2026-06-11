import { MetadataRoute } from "next";
import { prisma } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://avpoils.com";

  // Fetch all active products
  let products: any[] = [];
  try {
    products = await prisma.product.findMany({
      where: { isDeleted: false, status: "Published" },
      select: { slug: true, updatedAt: true },
    });
  } catch (error) {
    console.error("Sitemap fetch products failed:", error);
  }

  // Fetch all active categories
  let categories: any[] = [];
  try {
    categories = await prisma.category.findMany({
      where: { isDeleted: false, status: "Published" },
      select: { slug: true, updatedAt: true },
    });
  } catch (error) {
    console.error("Sitemap fetch categories failed:", error);
  }

  const productEntries = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: product.updatedAt,
  }));

  const categoryEntries = categories.map((category) => ({
    url: `${baseUrl}/products?category=${category.slug}`,
    lastModified: category.updatedAt,
  }));

  const staticRoutes = ["", "/about", "/contact", "/gallery", "/products"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...categoryEntries, ...productEntries];
}
