const stats = [
  { value: "1000+", label: "Happy Customers" },
  { value: "20+", label: "Organic Products" },
  { value: "10+", label: "Years of Tradition" },
];

const reviews = [
  {
    name: "Manonmani R.",
    review: "The groundnut oil from AVP is pure gold! I switched from commercial brands and the difference in taste is night and day. Highly recommended!",
    rating: 5,
  },
  {
    name: "Suresh Kumar",
    review: "I purchased AVP oils for my family and they absolutely love it. The quality is outstanding and customer service is excellent. Will always come back!",
    rating: 5,
  },
  {
    name: "Ananya Sharma",
    review: "Authentic, customer service and on-time delivery makes this brand exceptional. The coconut oil fragrance itself tells you it's pure.",
    rating: 5,
  },
];

export function StatsAndReviews() {
  return (
    <>
      {/* Stats Bar */}
      <section className="bg-gradient-to-r from-[#F8F5EE] to-[#C9A227]/10 py-6 md:py-8 lg:py-10 border-y border-[#C9A227]/20">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-center">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <div
                  className="text-5xl lg:text-6xl font-normal text-[#0B4D2B] mb-3 drop-shadow-sm"
                  style={{ fontFamily: "var(--font-serif), serif" }}
                >
                  {stat.value}
                </div>
                <div className="text-[#C9A227] text-xs font-bold uppercase tracking-[0.2em]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-[#F8F5EE] py-8 md:py-10 lg:py-12 transition-colors duration-1000">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-16 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 text-[#C9A227] text-[10px] sm:text-xs font-semibold mb-6 tracking-[0.2em] uppercase">
              <span className="w-8 h-[1px] bg-[#C9A227]/50" />
              WHAT OUR FAMILIES SAY
              <span className="w-8 h-[1px] bg-[#C9A227]/50" />
            </div>
            <h2
              className="text-4xl lg:text-5xl font-normal text-[#0B4D2B]"
              style={{ fontFamily: "var(--font-serif), serif" }}
            >
              Trusted by <span className="italic">1000+ Happy Customers</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, i) => (
              <div
                key={i}
                className="bg-[#FDFBF7] backdrop-blur-sm rounded-[32px] border border-white/60 p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
              >
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <span key={j} className="text-[#C9A227] text-xl drop-shadow-sm">★</span>
                  ))}
                </div>
                <p className="text-[#4a524d] text-base leading-relaxed mb-8 italic font-medium">
                  "{review.review}"
                </p>
                <div className="flex items-center gap-4 pt-6 border-t border-[#EBE1C7]/50">
                  <div className="w-10 h-10 rounded-full bg-[#0B4D2B]/5 border border-[#0B4D2B]/10 flex items-center justify-center text-[#C9A227] font-bold text-sm shadow-inner">
                    {review.name[0]}
                  </div>
                  <span className="font-semibold text-[#0B4D2B] text-sm tracking-wide">{review.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
