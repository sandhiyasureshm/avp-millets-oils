import Image from "next/image";

export const metadata = {
  title: "About Us | AVP Oils & Millets",
  description: "Learn about our heritage, our traditional cold-pressed process, and our commitment to pure, natural health.",
};

const steps = [
  {
    number: "01",
    title: "Sourcing",
    desc: "We partner with local farmers in Tamil Nadu to source the highest quality sun-dried seeds, nuts, and millets.",
    image: "/images/home/process-millet.png",
  },
  {
    number: "02",
    title: "Wood Pressing",
    desc: "Using the traditional Vaagai wood Chekku, we extract oils at room temperature to preserve every drop of nutrition.",
    image: "/images/home/process-machine.png",
  },
  {
    number: "03",
    title: "Natural Filtration",
    desc: "Our oils are naturally sun-filtered for days without any chemical refining or artificial bleaching.",
    image: "/images/home/coconut-oil.png",
  },
  {
    number: "04",
    title: "Purity Delivered",
    desc: "Bottled with care and delivered straight to your kitchen, ensuring maximum freshness and health benefits.",
    image: "/images/home/about-shop.png",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8F5EE]">
      {/* Hero Section */}
      <section className="pt-8 lg:pt-10 pb-16 lg:pb-20 bg-[#FAF8F3] border-b border-[#E9E4DF]">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 text-[#C9A227] text-[10px] sm:text-xs font-semibold mb-6 tracking-[0.2em] uppercase">
            <span className="w-8 h-[1px] bg-[#C9A227]/50" />
            OUR HERITAGE
            <span className="w-8 h-[1px] bg-[#C9A227]/50" />
          </div>
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-normal text-[#0B4D2B] mb-6 leading-tight" style={{ fontFamily: "var(--font-serif), serif" }}>
            The AVP Legacy: <br />
            <span className="italic text-[#C9A227]">Tradition In Every Drop</span>
          </h1>
          <p className="text-[#666666] text-lg max-w-2xl mx-auto font-medium">
            Rooted in Tiruvannamalai, we are on a mission to bring back the lost art of traditional cold-pressing to Indian households.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Images */}
            <div className="relative">
              <div className="relative h-[500px] rounded-[40px] overflow-hidden shadow-2xl border border-white/40">
                <Image
                  src="/images/home/about-shop.png"
                  alt="AVP Oils & Millets Shop – Tiruvannamalai"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-4 bg-[#FDFBF7]/95 backdrop-blur-md text-[#0B4D2B] text-center px-8 py-6 rounded-[24px] shadow-[0_15px_40px_rgb(0,0,0,0.08)] border border-white/60">
                <div className="text-4xl font-normal text-[#C9A227]" style={{ fontFamily: "var(--font-serif), serif" }}>10+</div>
                <div className="text-xs font-semibold uppercase tracking-[0.2em] mt-1 text-[#4a524d]">Years of Quality</div>
              </div>
            </div>

            {/* Right: Text */}
            <div className="lg:pl-8">
              <h2
                className="text-3xl lg:text-4xl font-normal text-[#0B4D2B] leading-[1.2] mb-6"
                style={{ fontFamily: "var(--font-serif), serif" }}
              >
                Our Journey from a Small Shop to a Trusted Brand
              </h2>
              <div className="space-y-6 text-[#4a524d] text-base leading-relaxed font-medium">
                <p>
                  A decade ago, we realized that the modern market was flooded with highly refined, chemical-laden oils that were slowly damaging the health of our communities. We decided it was time to step back into the past to secure our future.
                </p>
                <p>
                  AVP Oils & Millets was born out of a desire to revive the ancient &quot;Chekku&quot; (wood-pressing) technique. By using Vaagai wood, we ensure that the oil extraction process generates no heat, thereby preserving 100% of the natural nutrients, antioxidants, and original flavor of the seeds.
                </p>
                <p>
                  What started as a small local mill in Tiruvannamalai has now grown into a trusted health destination. We have expanded our pure offerings from just oils to a complete range of organic millets, pure spices, and natural powders, serving health-conscious families everywhere.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Process */}
      <section className="py-24 bg-[#0B4D2B] text-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2
              className="text-3xl lg:text-5xl font-normal text-white mb-6"
              style={{ fontFamily: "var(--font-serif), serif" }}
            >
              How We Make It
            </h2>
            <p className="text-[#A3B8AD] text-lg max-w-2xl mx-auto">
              Transparency is our core value. Here is exactly how our products travel from the farm to your table.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="text-center relative">
                <div className="relative h-48 w-full rounded-3xl overflow-hidden mb-6 border border-white/10 shadow-lg">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full border-2 border-[#C9A227] text-[#C9A227] font-bold text-sm mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-medium mb-3" style={{ fontFamily: "var(--font-serif), serif" }}>
                  {step.title}
                </h3>
                <p className="text-[#A3B8AD] text-sm leading-relaxed px-2">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
