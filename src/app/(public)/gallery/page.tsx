import { prisma } from "@/lib/db";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Gallery | AVP Oils & Millets",
  description: "Take a glimpse into our world. See our farm sourcing, traditional wood pressing process, and our store.",
};

const staticGallery = [
  {
    id: "1",
    imagePath: "/images/home/process-millet.png",
    caption: "Sun-drying fresh millets directly from the farms.",
    category: "FARM",
  },
  {
    id: "2",
    imagePath: "/images/home/process-machine.png",
    caption: "Traditional Vaagai Wood Chekku in action.",
    category: "PRODUCTION",
  },
  {
    id: "3",
    imagePath: "/images/home/about-shop.png",
    caption: "Our physical store in Tiruvannamalai.",
    category: "PRODUCT",
  },
  {
    id: "4",
    imagePath: "/images/home/process-chilli.png",
    caption: "Hand-selected chillies being naturally dried.",
    category: "FARM",
  },
  {
    id: "5",
    imagePath: "/images/home/coconut-oil.png",
    caption: "100% pure cold-pressed coconut oil.",
    category: "PRODUCT",
  },
];

const categories = [
  { name: "Farm & Sourcing", slug: "FARM" },
  { name: "Production Process", slug: "PRODUCTION" },
  { name: "Store & Products", slug: "PRODUCT" },
];

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function GalleryPage(props: Props) {
  const searchParams = await props.searchParams;
  const activeCategory = typeof searchParams.category === 'string' ? searchParams.category : null;

  // DB Fetching
  let dbImages: any[] = [];
  try {
    dbImages = await prisma.gallery.findMany({
      where: activeCategory ? { category: activeCategory } : undefined,
      orderBy: { sortOrder: "asc" },
    });
  } catch {}

  let displayImages = [];
  if (dbImages.length > 0) {
    displayImages = dbImages;
  } else {
    displayImages = staticGallery;
    if (activeCategory) {
      displayImages = displayImages.filter(img => img.category === activeCategory);
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F5EE]">
      {/* Hero Section */}
      <section className="pt-8 lg:pt-10 pb-12 lg:pb-16 bg-[#FAF8F3] border-b border-[#E9E4DF]">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 text-[#C9A227] text-[10px] sm:text-xs font-semibold mb-6 tracking-[0.2em] uppercase">
            <span className="w-8 h-[1px] bg-[#C9A227]/50" />
            OUR GALLERY
            <span className="w-8 h-[1px] bg-[#C9A227]/50" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-normal text-[#0B4D2B] mb-6" style={{ fontFamily: "var(--font-serif), serif" }}>
            A Glimpse Into Our World
          </h1>
          <p className="text-[#666666] text-lg max-w-2xl mx-auto font-medium">
            Explore our authentic process, from hand-picking raw ingredients at the farm to the final drop of pure, cold-pressed oil.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-6 bg-white border-b border-[#E9E4DF] shadow-sm relative z-20">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide items-center justify-start lg:justify-center pb-2 lg:pb-0">
            <Link
              href="/gallery"
              className={`flex-shrink-0 px-6 py-2.5 rounded-full text-[13px] font-semibold tracking-wide transition-all duration-300 ${!activeCategory ? "bg-[#0B4D2B] text-white shadow-md" : "border border-[#E9E4DF] bg-white text-[#666666] hover:border-[#0B4D2B] hover:text-[#0B4D2B]"}`}
            >
              All Images
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/gallery?category=${cat.slug}`}
                className={`flex-shrink-0 px-6 py-2.5 rounded-full text-[13px] font-semibold tracking-wide transition-all duration-300 ${activeCategory === cat.slug ? "bg-[#0B4D2B] text-white shadow-md" : "border border-[#E9E4DF] bg-white text-[#666666] hover:border-[#0B4D2B] hover:text-[#0B4D2B]"}`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="py-16 bg-[#F8F5EE]">
        <div className="max-w-[1280px] mx-auto px-6">
          {displayImages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayImages.map((img) => (
                <div
                  key={img.id}
                  className="group relative rounded-[24px] overflow-hidden bg-[#f4f4f4] aspect-[4/3] shadow-sm border border-white/60 hover:shadow-2xl transition-all duration-500 cursor-pointer"
                >
                  <Image
                    src={img.imagePath}
                    alt={img.caption || "AVP Oils & Millets"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B4D2B]/90 via-[#0B4D2B]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Caption */}
                  {img.caption && (
                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 z-10">
                      <p className="text-white text-sm font-medium leading-relaxed">
                        {img.caption}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
              <h3 className="text-2xl text-[#333333] font-medium mb-3">No images found</h3>
              <p className="text-[#666666] font-medium">We couldn't find any photos in this category.</p>
              <Link href="/gallery" className="inline-block mt-8 text-white bg-[#0B4D2B] px-8 py-3 rounded-full font-semibold hover:bg-[#04341B] transition-colors">
                View All Images
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
