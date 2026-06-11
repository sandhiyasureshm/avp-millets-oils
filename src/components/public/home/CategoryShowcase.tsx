import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

// Static fallback categories matching the design
const staticCategories = [
  { name: "Premium Oils", image: "/images/home/coconut-oil.png", slug: "cold-pressed-oils" },
  { name: "Organic Millets", image: "/images/home/product-millet.png", slug: "millets" },
  { name: "Pure Powders", image: "/images/home/process-chilli.png", slug: "powders" },
  { name: "Natural Grains", image: "/images/home/product-groundnut.png", slug: "grains" },
  { name: "Premium Raw", image: "/images/home/process-millet.png", slug: "raw" },
];

export async function CategoryShowcase() {
  // Try to fetch from DB, fall back to static
  let categories = staticCategories;
  try {
    const { prisma } = await import("@/lib/db");
    const dbCategories = await prisma.category.findMany({
      where: { isDeleted: false, status: "Published" },
      orderBy: { sortOrder: "asc" },
      take: 6,
    });
    if (dbCategories.length > 0) {
      categories = dbCategories.map((c) => ({
        name: c.name,
        image: c.image || staticCategories[0].image,
        slug: c.slug,
      }));
    }
  } catch {}

  return (
    <section className="bg-white py-8 md:py-10 lg:py-12">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex items-end justify-between mb-14">
          <div>
            <h2
              className="text-[18px] lg:text-[20px] font-normal text-[#0B4D2B] mb-1"
              style={{ fontFamily: "var(--font-serif), serif" }}
            >
              Our Premium Categories
            </h2>
            <p className="text-[#6b7280] text-[13px] font-light">
              Sourced from the finest local harvest.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button className="w-10 h-10 rounded-full border border-[#d1d5db] flex items-center justify-center text-[#1b1b1c] hover:bg-[#f3f4f6] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button className="w-10 h-10 rounded-full border border-[#d1d5db] flex items-center justify-center text-[#1b1b1c] hover:bg-[#f3f4f6] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
        </div>

        <div className="flex gap-6 lg:justify-between overflow-x-auto pb-10 snap-x snap-mandatory lg:overflow-visible lg:pb-0 scrollbar-hide w-full">
          {categories.map((cat, i) => (
            <Link
              key={i}
              href={`/products?category=${cat.slug}`}
              className="flex-shrink-0 snap-start flex flex-col items-center gap-6 group w-[200px] lg:w-auto"
            >
              <div className="w-[180px] h-[180px] lg:w-[240px] lg:h-[240px] rounded-full overflow-hidden bg-white transition-all duration-300 flex items-center justify-center border-[1.5px] border-transparent group-hover:border-[#C9A227] p-1.5 shadow-[0_10px_30px_rgb(0,0,0,0.03)] group-hover:shadow-[0_15px_40px_rgb(201,162,39,0.15)] group-hover:-translate-y-1">
                <div className="w-full h-full rounded-full overflow-hidden relative bg-white">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 768px) 180px, 240px"
                    className="object-contain lg:object-cover w-full h-full"
                  />
                </div>
              </div>
              <span
                className="text-[16px] text-[#0B4D2B] text-center group-hover:text-[#C9A227] transition-colors duration-300 font-medium"
                style={{ fontFamily: "var(--font-serif), serif" }}
              >
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
