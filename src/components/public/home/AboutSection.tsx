import Image from "next/image";
import Link from "next/link";

export function AboutSection() {
  return (
    <section className="bg-[#F8F5EE] py-8 md:py-10 lg:py-12 relative overflow-hidden transition-colors duration-1000">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Images */}
          <div className="relative">
            <div className="relative h-[480px] rounded-[40px] overflow-hidden shadow-2xl border border-white/20">
              <Image
                src="/images/home/about-shop.png"
                alt="AVP Oils & Millets Shop – Tiruvannamalai"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-4 bg-[#FDFBF7]/95 backdrop-blur-md text-[#0B4D2B] text-center px-8 py-6 rounded-[24px] shadow-[0_15px_40px_rgb(0,0,0,0.08)] border border-white/60">
              <div className="text-4xl font-normal text-[#C9A227]" style={{ fontFamily: "var(--font-serif), serif" }}>10+</div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] mt-1 text-[#4a524d]">Years of Quality</div>
            </div>
          </div>

          {/* Right: Text */}
          <div className="lg:pl-8">
            <div className="inline-flex items-center gap-2 text-[#C9A227] text-[10px] sm:text-xs font-semibold mb-6 tracking-[0.2em] uppercase">
              <span className="w-8 h-[1px] bg-[#C9A227]/50" />
              OUR STORY
            </div>
            <h2
              className="text-4xl lg:text-5xl font-normal text-[#0B4D2B] leading-[1.1] mb-6"
              style={{ fontFamily: "var(--font-serif), serif" }}
            >
              From Tiruvannamalai <br />
              <span className="italic">With Love & Purity</span>
            </h2>
            <p className="text-[#4a524d] text-sm lg:text-base leading-relaxed mb-4 font-medium">
              Established in the sacred town of Tiruvannamalai, AVP Oils & Millets was founded
              with a simple mission: to bring the forgotten health benefits of wood-pressed oils to
              every Indian household.
            </p>
            <p className="text-[#4a524d] text-sm lg:text-base leading-relaxed mb-8 font-medium">
              Today, our legacy spans over 10 years, serving thousands of families who purchase
              our oils knowing they are preserving the authentic tradition of natural nutrition.
            </p>
            <ul className="space-y-4 mb-10">
              {["100% Quality Pressed", "Family-run business with values", "Direct from source to home"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-[#0B4D2B] text-sm font-semibold tracking-wide">
                  <span className="w-2 h-2 rounded-full bg-[#C9A227] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 border border-[#0B4D2B] bg-transparent text-[#0B4D2B] text-[13px] font-semibold tracking-widest uppercase px-8 py-4 rounded-full hover:bg-[#C9A227] hover:border-transparent hover:text-white hover:-translate-y-0.5 transition-all duration-300 shadow-sm hover:shadow-lg"
            >
              Read Our Full Story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
