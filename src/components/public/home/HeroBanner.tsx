import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/db";

export async function HeroBanner() {
  let headline = "Pure Oils\nRich In Tradition";
  let subheadline = "Experience the essence of purity with our wood-pressed oils.\nNaturally extracted, traditionally trusted, and delivered from\nour farm to your home.";

  try {
    const settings = await prisma.homepageSetting.findMany();
    const settingsMap = Object.fromEntries(settings.map(s => [s.key, s.value]));
    // Removed dynamic override to strictly enforce the requested words:
    // if (settingsMap["HERO_HEADLINE"]) headline = settingsMap["HERO_HEADLINE"];
    // if (settingsMap["HERO_SUBHEADLINE"]) subheadline = settingsMap["HERO_SUBHEADLINE"];
  } catch (error) {
    console.error("Failed to load settings in HeroBanner:", error);
  }

  // Parse headline to make the second line italic (if it has a newline)
  const headlineParts = headline.split("\n");

  return (
    <section className="bg-white relative overflow-hidden flex items-center w-full">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 pt-2 md:pt-4 lg:pt-12 pb-8 md:pb-14 lg:pb-16 flex flex-col lg:flex-row items-center gap-6 lg:gap-16 w-full">
        {/* Left: Text */}
        <div className="flex-1 text-center lg:text-left z-10 w-full flex flex-col items-center lg:items-start">
          <div className="inline-flex items-center gap-3 text-[#B08933] text-[9px] lg:text-[10px] font-bold mb-4 lg:mb-6 tracking-[0.2em] uppercase">
            <span className="w-8 lg:w-12 h-[1px] bg-[#B08933]" />
            SINCE 2014 • PURE • NATURAL
          </div>
          
          <h1
            className="text-[32px] min-[375px]:text-[36px] sm:text-[48px] lg:text-[72px] font-normal leading-[1.1] tracking-tight text-[#0B4D2B] mb-4 lg:mb-6"
            style={{ fontFamily: "var(--font-serif), serif" }}
          >
            {headlineParts.map((part, index) => (
              <span key={index} className={`block ${index === 1 ? "italic" : ""}`}>
                {part}
              </span>
            ))}
          </h1>
          
          <p className="text-[#6b7280] text-[13px] sm:text-[14px] lg:text-[15px] leading-[1.7] lg:leading-[1.8] mb-6 lg:mb-10 max-w-[500px] font-normal whitespace-pre-line text-center lg:text-left px-2 sm:px-0">
            {subheadline}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center lg:justify-start px-2 sm:px-0">
            <Link
              href="/products"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-[#926F34] text-white text-[11px] lg:text-[12px] font-bold tracking-[0.15em] uppercase px-6 h-[48px] lg:h-[52px] rounded-full hover:bg-[#785a00] transition-colors"
            >
              VIEW PRODUCTS
            </Link>
            <Link
              href="/about"
              className="w-full sm:w-auto inline-flex items-center justify-center border border-gray-300 bg-white text-gray-700 text-[11px] lg:text-[12px] font-bold tracking-[0.15em] uppercase px-6 h-[48px] lg:h-[52px] rounded-full hover:border-gray-500 hover:text-black transition-colors"
            >
              ABOUT OUR PROCESS
            </Link>
          </div>
        </div>

        {/* Right: Hero Image Container */}
        <div className="flex-1 flex justify-center lg:justify-end relative mt-6 lg:mt-0 w-full flex-col items-center">
          <div className="relative w-full max-w-[500px] lg:max-w-[650px] aspect-[4/3] bg-white rounded-3xl flex items-center justify-center z-10 shadow-[0_10px_40px_rgb(0,0,0,0.05)] border border-gray-50 lg:border-none">
            
            {/* Desktop Floating Badges (Hidden on mobile) */}
            <div className="hidden lg:flex absolute top-12 -left-12 bg-white rounded-xl px-4 py-3 shadow-[0_5px_15px_rgb(0,0,0,0.08)] items-center gap-2 z-30">
              <span className="text-lg">🌿</span>
              <span className="text-gray-800 text-[10px] font-bold uppercase tracking-wide">CHEMICAL FREE</span>
            </div>

            <div className="hidden lg:flex absolute -top-4 right-8 bg-white rounded-xl px-4 py-3 shadow-[0_5px_15px_rgb(0,0,0,0.08)] items-center gap-2 z-30">
              <span className="text-lg text-green-500">✅</span>
              <span className="text-gray-800 text-[10px] font-bold uppercase tracking-wide">100% ORGANIC</span>
            </div>

            <div className="hidden lg:flex absolute bottom-6 left-2 bg-white rounded-xl px-4 py-3 shadow-[0_5px_15px_rgb(0,0,0,0.08)] items-center gap-2 z-30">
              <span className="text-lg">🥜</span>
              <span className="text-gray-800 text-[10px] font-bold uppercase tracking-wide">WOOD PRESSED</span>
            </div>

            <div className="hidden lg:flex absolute -bottom-6 right-12 bg-white rounded-xl px-4 py-3 shadow-[0_5px_15px_rgb(0,0,0,0.08)] items-center gap-2 z-30">
              <span className="text-lg">🚜</span>
              <span className="text-gray-800 text-[10px] font-bold uppercase tracking-wide">FARM FRESH</span>
            </div>

            {/* Product Image */}
            <div className="absolute inset-0 z-20 flex items-center justify-center p-4 lg:p-8">
              <div className="relative w-full h-[90%] flex items-center justify-center">
                <Image
                  src="/images/home/hero-oils.png"
                  alt="Pure Traditional Oils"
                  fill
                  quality={100}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain drop-shadow-sm"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Mobile Trust Badges Grid (Hidden on desktop) */}
          <div className="lg:hidden grid grid-cols-2 gap-2.5 w-full max-w-[500px] mt-5 px-2">
            <div className="bg-white rounded-[14px] p-3 shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-1.5 hover:-translate-y-0.5 transition-transform">
              <span className="text-xl leading-none">🌿</span>
              <span className="text-gray-800 text-[9px] font-bold uppercase tracking-[0.1em] text-center">CHEMICAL FREE</span>
            </div>
            <div className="bg-white rounded-[14px] p-3 shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-1.5 hover:-translate-y-0.5 transition-transform">
              <span className="text-xl leading-none text-green-500">✅</span>
              <span className="text-gray-800 text-[9px] font-bold uppercase tracking-[0.1em] text-center">100% ORGANIC</span>
            </div>
            <div className="bg-white rounded-[14px] p-3 shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-1.5 hover:-translate-y-0.5 transition-transform">
              <span className="text-xl leading-none">🥜</span>
              <span className="text-gray-800 text-[9px] font-bold uppercase tracking-[0.1em] text-center">WOOD PRESSED</span>
            </div>
            <div className="bg-white rounded-[14px] p-3 shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-1.5 hover:-translate-y-0.5 transition-transform">
              <span className="text-xl leading-none">🚜</span>
              <span className="text-gray-800 text-[9px] font-bold uppercase tracking-[0.1em] text-center">FARM FRESH</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
