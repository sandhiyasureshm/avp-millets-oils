import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/public/products/ProductCard";

const staticProducts = [
  {
    name: "Wood Pressed Coconut Oil",
    desc: "100% natural, unrefined coconut oil extracted using traditional Chekku.",
    image: "/images/home/coconut-oil.png",
    slug: "coconut-oil",
    price: 320,
    tag: "BEST SELLER",
    tagColor: "bg-[#7E6627]",
    categorySlug: "cold-pressed-oils"
  },
  {
    name: "Traditional Chilli Powder",
    desc: "Hand-selected red chillies, sun-dried and ground to perfection.",
    image: "/images/home/product-chilli.png",
    slug: "chilli-powder",
    price: 180,
    tag: "NEW ARRIVAL",
    tagColor: "bg-[#04341B]",
    categorySlug: "powders"
  },
  {
    name: "Organic Millet",
    desc: "Healthy, naturally grown millets for a nutrient-rich daily diet.",
    image: "/images/home/product-millet.png",
    slug: "organic-millet",
    price: 280,
    tag: "TOP RATED",
    tagColor: "bg-[#7E6627]",
    categorySlug: "millets"
  },
];

export async function FeaturedProducts() {
  let products = staticProducts;
  try {
    const { prisma } = await import("@/lib/db");
    const dbProducts = await prisma.product.findMany({
      where: { isDeleted: false, isFeatured: true, status: "Published" },
      take: 3,
      include: { category: true },
    });
    if (dbProducts.length > 0) {
      products = dbProducts.map((p) => {
        const images = p.images as { primaryImage?: string };
        const variants = p.variants as { price?: number }[];
        return {
          name: p.name,
          desc: p.description?.substring(0, 80) + "..." || "Premium quality cold pressed product.",
          category: p.category.name,
          image: images?.primaryImage || staticProducts[0].image,
          slug: p.slug,
          price: variants?.[0]?.price || 0,
          tag: "BEST SELLER",
          tagColor: "bg-[#7E6627]",
          variants: Array.isArray(variants) ? (variants as any) : undefined,
        };
      });
    }
  } catch {}

  return (
    <section className="bg-[#F8F5EE] py-8 md:py-10 lg:py-12">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex items-end justify-between mb-16">
          <div>
            <h2
              className="text-[16px] lg:text-[18px] font-normal text-[#0B4D2B]"
              style={{ fontFamily: "var(--font-serif), serif" }}
            >
              Bestsellers
            </h2>
          </div>
          <Link
            href="/products"
            className="hidden md:block text-[#C9A227] text-[12px] font-medium tracking-[0.05em] uppercase border-b border-[#C9A227] pb-[6px] hover:text-[#0B4D2B] hover:border-[#0B4D2B] transition-colors"
          >
            EXPLORE ALL PRODUCTS
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, i) => (
            <ProductCard key={i} product={product as any} />
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/products" className="inline-flex items-center gap-1 text-[#0B4D2B] font-semibold text-sm">
            Explore All Products <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
