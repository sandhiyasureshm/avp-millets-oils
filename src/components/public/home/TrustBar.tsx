import Image from "next/image";
import { ShieldCheck, Settings, Truck, BadgeCheck } from "lucide-react";

const trustItems = [
  {
    icon: ShieldCheck,
    title: "100% Natural",
    desc: "No preservatives or additives. Just pure essence extracted naturally.",
    image: "/images/home/trust_natural.png",
  },
  {
    icon: Settings,
    title: "Traditional Pressing",
    desc: "Cold-pressed in wooden mills to retain all vital nutrients and flavor.",
    image: "/images/home/trust_pressing.png",
  },
  {
    icon: Truck,
    title: "Farm Fresh",
    desc: "Directly from Tiruvannamalai farms to your doorstep with love.",
    image: "/images/home/trust_farm.png",
  },
  {
    icon: BadgeCheck,
    title: "10+ Years Legacy",
    desc: "A decade of trust built on authenticity and customer satisfaction.",
    image: "/images/home/trust_legacy_badge.png",
  },
];

export function TrustBar() {
  return (
    <section className="bg-[#F8F5EE] py-6 md:py-8 lg:py-10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2
            className="text-lg lg:text-xl font-bold text-[#0B4D2B] mb-4"
            style={{ fontFamily: "var(--font-serif), serif" }}
          >
            Why Choose AVP Oils & Millets
          </h2>
          <p className="text-[#4a524d] text-sm lg:text-[15px] leading-relaxed">
            For over a decade, we've remained steadfast in our commitment to traditional extraction 
            and uncompromising quality.
          </p>
        </div>

        {/* Cards Grid / Horizontal Scroll on Mobile */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide sm:overflow-visible sm:snap-none -mx-6 px-6 sm:mx-0 sm:px-0 pb-4 sm:pb-0">
          {trustItems.map((item, i) => {
            let bgClass = "bg-[#F8F5EE] border border-white/50 backdrop-blur-md";
            let textTitleClass = "text-[#0B4D2B]";
            let textDescClass = "text-[#5a605b]";
            let iconBgClass = "bg-white/60 shadow-sm border border-white/50";
            let iconColorClass = "text-[#0B4D2B]";

            // Card 1: Deep Forest Green
            if (i === 0) {
              bgClass = "bg-[#0B4D2B] border border-[#0F6037]";
              textTitleClass = "text-white";
              textDescClass = "text-[#A3B8AD]";
              iconBgClass = "bg-[#0F6037] shadow-inner border border-[#167846]";
              iconColorClass = "text-white";
            } 
            // Card 2: Ivory background, green icons
            else if (i === 1) {
              bgClass = "bg-[#FDFBF7] border border-white/80 backdrop-blur-md";
              iconBgClass = "bg-white shadow-sm border border-[#E9E4DF]/50";
              iconColorClass = "text-[#0B4D2B]";
            }
            // Card 3: Soft Cream background, gold accents
            else if (i === 2) {
              bgClass = "bg-[#F9F6F0] border border-white/60 backdrop-blur-md";
              iconBgClass = "bg-white shadow-sm border border-[#E9E4DF]/50";
              iconColorClass = "text-[#C9A227]";
              textTitleClass = "text-[#2d2211]";
            }
            // Card 4: Light gold-tinted background
            else if (i === 3) {
              bgClass = "bg-[#F5EEDC] border border-[#EBE1C7] backdrop-blur-md";
              iconBgClass = "bg-white/90 shadow-sm border border-[#EBE1C7]";
              iconColorClass = "text-[#C9A227]";
              textTitleClass = "text-[#2d2211]";
            }

            return (
              <div
                key={i}
                className={`${bgClass} flex-shrink-0 w-[82vw] sm:w-auto snap-center sm:snap-none rounded-[28px] overflow-hidden flex flex-col shadow-sm hover:shadow-[0_15px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 group`}
              >
                {/* Full-width Image Header */}
                <div className="relative w-full h-[140px] lg:h-[160px] flex-shrink-0 border-b border-black/5">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                </div>
                
                {/* Text Content */}
                <div className="p-5 lg:p-6 flex-grow flex flex-col justify-start">
                  <h3
                    className={`${textTitleClass} text-[19px] mb-2 font-medium`}
                    style={{ fontFamily: "var(--font-serif), serif" }}
                  >
                    {item.title}
                  </h3>
                  <p className={`${textDescClass} text-[13px] leading-relaxed`}>{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
