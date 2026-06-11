import Image from "next/image";

const steps = [
  {
    number: "01",
    title: "Raw Sourcing",
    desc: "We source the finest seeds and nuts directly from trusted farmers in Tamil Nadu.",
    image: "/images/home/process-millet.png",
  },
  {
    number: "02",
    title: "Wood Pressing",
    desc: "Using traditional wooden cold press (Chekku) machines at low temperature to preserve nutrients.",
    image: "/images/home/process-machine.png",
  },
  {
    number: "03",
    title: "Natural Bottling",
    desc: "Filtered naturally and bottled without heating or chemicals to lock in freshness.",
    image: "/images/home/coconut-oil.png",
  },
];

export function ProcessSection() {
  return (
    <section className="bg-[#0B4D2B] py-8 md:py-10 lg:py-12 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-[#C9A227] text-xs font-semibold tracking-widest uppercase mb-3">
            Our Traditional Cold Pressed Process
          </p>
          <h2
            className="text-3xl lg:text-4xl font-bold text-white max-w-2xl mx-auto leading-tight"
            style={{ fontFamily: "var(--font-serif), serif" }}
          >
            From Seed to Bottle — The Pure Way
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div
              key={i}
              className="relative group text-center"
            >
              {/* Number */}
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-[#C9A227] text-[#C9A227] font-bold text-lg mb-5">
                {step.number}
              </div>

              {/* Image */}
              <div className="relative h-48 rounded-2xl overflow-hidden mb-5 border border-white/10 shadow-lg">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-[#0B4D2B]/30 transition-opacity duration-500 group-hover:bg-[#0B4D2B]/10" />
              </div>

              <h3
                className="text-white font-bold text-xl mb-2"
                style={{ fontFamily: "var(--font-serif), serif" }}
              >
                {step.title}
              </h3>
              <p className="text-[#A3B8AD] text-sm leading-relaxed">{step.desc}</p>

              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-6 left-[calc(50%+40px)] right-[-50%] h-0.5 bg-[#C9A227]/20" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
