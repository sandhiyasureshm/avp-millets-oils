import { prisma } from "@/lib/db";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProductCard } from "@/components/public/products/ProductCard";

export const metadata = {
  title: "Shop Premium Oils & Millets | AVP",
  description: "Browse our authentic range of cold-pressed oils, millets, and organic powders.",
};

const staticCategories = [
  { name: "Premium Oils", slug: "cold-pressed-oils" },
  { name: "Organic Millets", slug: "millets" },
  { name: "Pure Powders", slug: "powders" },
  { name: "Natural Grains", slug: "grains" },
  { name: "Premium Raw", slug: "raw" },
];

const staticProducts = [
  {
    name: "Wood Pressed Gingelly Oil",
    desc: "100% pure cold-pressed gingelly oil extracted using traditional Chekku.",
    image: "/images/home/Gingelly-oil.png",
    slug: "gingelly-oil",
    price: 420,
    tag: "NEW ARRIVAL",
    tagColor: "bg-[#04341B]",
    categorySlug: "cold-pressed-oils"
  },
  {
    name: "Wood Pressed Groundnut Oil",
    desc: "100% natural, unrefined groundnut oil extracted using traditional Chekku.",
    image: "/images/home/Groundnut-oil.png",
    slug: "groundnut-oil",
    price: 350,
    tag: "BEST SELLER",
    tagColor: "bg-[#7E6627]",
    categorySlug: "cold-pressed-oils"
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
  {
    name: "Raw Groundnut",
    desc: "Premium quality raw groundnuts sourced directly from trusted local farms.",
    image: "/images/home/product-groundnut.png",
    slug: "raw-groundnut",
    price: 150,
    categorySlug: "raw"
  },
  {
    name: "Premium Ragi",
    desc: "Traditionally processed finger millet, rich in calcium.",
    image: "/images/home/product-ragi.png",
    slug: "premium-ragi",
    price: 340,
    categorySlug: "millets"
  },
  {
    name: "Wood Pressed Coconut Oil",
    desc: "100% natural, unrefined coconut oil extracted using traditional Chekku.",
    image: "/images/home/coconut-oil.png",
    slug: "coconut-oil",
    price: 320,
    tag: "PURE",
    tagColor: "bg-[#04341B]",
    categorySlug: "cold-pressed-oils"
  },
  {
    name: "Traditional Chilli Powder",
    desc: "Hand-selected red chillies, sun-dried and ground to perfection.",
    image: "/images/home/product-chilli.png",
    slug: "chilli-powder",
    price: 180,
    categorySlug: "powders"
  },
];

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ProductsPage(props: Props) {
  const searchParams = await props.searchParams;
  const activeCategory = typeof searchParams.category === 'string' ? searchParams.category : null;

  // DB Fetching
  let dbCategories: { name: string, slug: string }[] = [];
  let dbProducts: any[] = [];
  
  try {
    const fetchedCats = await prisma.category.findMany({
      where: { isDeleted: false, status: "Published" },
      orderBy: { sortOrder: "asc" },
    });
    dbCategories = fetchedCats;
    
    dbProducts = await prisma.product.findMany({
      where: { 
        isDeleted: false, 
        status: "Published",
        ...(activeCategory ? { category: { slug: activeCategory } } : {})
      },
      include: { category: true },
    });
  } catch {}

  let categories = dbCategories.length > 0 ? dbCategories : staticCategories;
  
  let products = [];
  if (dbProducts.length > 0) {
    products = dbProducts.map(p => {
      const images = p.images as any;
      const variants = p.variants as any;
      return {
        name: p.name,
        desc: p.description?.substring(0, 80) + "..." || "Premium quality cold pressed product.",
        image: images?.primaryImage || staticProducts[0].image,
        slug: p.slug,
        price: variants?.[0]?.price || 0,
        tag: p.isFeatured ? "BEST SELLER" : undefined,
        tagColor: "bg-[#7E6627]",
        variants: Array.isArray(variants) ? variants : undefined,
      }
    });
  } else {
    products = staticProducts;
    if (activeCategory) {
      products = products.filter(p => p.categorySlug === activeCategory);
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F5EE]">
      {/* Header */}
      <section className="pt-2 sm:pt-4 lg:pt-6 pb-4 sm:pb-6 lg:pb-8 bg-[#FAF8F3] border-b border-[#E9E4DF]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Back to Home Button */}
          <div className="mb-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-[#0B4D2B] hover:text-[#C9A227] font-semibold text-xs sm:text-sm transition-colors group"
            >
              <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#0B4D2B]/10 group-hover:bg-[#C9A227]/20 flex items-center justify-center transition-colors">
                <ArrowLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </span>
              Back to Home
            </Link>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 text-[#C9A227] text-[10px] sm:text-xs font-semibold mb-2 tracking-[0.2em] uppercase">
              <span className="w-6 h-[1px] bg-[#C9A227]/50" />
              PURE & NATURAL
              <span className="w-6 h-[1px] bg-[#C9A227]/50" />
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-normal text-[#0B4D2B] mb-2 sm:mb-3" style={{ fontFamily: "var(--font-serif), serif" }}>
              Our Premium Catalog
            </h1>
            <p className="text-[#666666] text-sm sm:text-base lg:text-lg max-w-2xl mx-auto font-medium">
              Handpicked, cold-pressed, and traditionally processed to bring authentic health and flavor to your family.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-4 bg-white border-b border-[#E9E4DF] shadow-sm relative z-20">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide items-center justify-start lg:justify-center pb-2 lg:pb-0">
            <Link
              href="/products"
              className={`flex-shrink-0 px-6 py-2.5 rounded-full text-[13px] font-semibold tracking-wide transition-all duration-300 ${!activeCategory ? "bg-[#0B4D2B] text-white shadow-md" : "border border-[#E9E4DF] bg-white text-[#666666] hover:border-[#0B4D2B] hover:text-[#0B4D2B]"}`}
            >
              All Products
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/products?category=${cat.slug}`}
                className={`flex-shrink-0 px-6 py-2.5 rounded-full text-[13px] font-semibold tracking-wide transition-all duration-300 ${activeCategory === cat.slug ? "bg-[#0B4D2B] text-white shadow-md" : "border border-[#E9E4DF] bg-white text-[#666666] hover:border-[#0B4D2B] hover:text-[#0B4D2B]"}`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-6 sm:py-8 lg:py-10 bg-[#F8F5EE]">
        <div className="max-w-[1280px] mx-auto px-6">
          {products.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {products.map((product, i) => (
                <ProductCard key={i} product={product as any} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
              <h3 className="text-2xl text-[#333333] font-medium mb-3">No products found</h3>
              <p className="text-[#666666] font-medium">We couldn't find any products in this category.</p>
              <Link href="/products" className="inline-block mt-8 text-white bg-[#0B4D2B] px-8 py-3 rounded-full font-semibold hover:bg-[#04341B] transition-colors">
                View All Products
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
