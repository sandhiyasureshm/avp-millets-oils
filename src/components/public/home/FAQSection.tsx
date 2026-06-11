"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What is Cold Pressed Oil?",
    a: "Cold pressed oil is extracted from seeds and nuts using a traditional wooden press (Chekku) at room temperature, without applying heat. This preserves all the natural nutrients, vitamins, and antioxidants that are typically destroyed by high-temperature commercial refining.",
  },
  {
    q: "Are there any preservatives or additives?",
    a: "Absolutely not. Our oils are 100% pure with zero chemicals, zero preservatives, and zero artificial flavoring. What you get is exactly what nature intended.",
  },
  {
    q: "What is the shelf life of your products?",
    a: "Our cold pressed oils have a shelf life of 3–6 months when stored in a cool, dry place away from direct sunlight. Millets and powders remain fresh for up to 6 months in an airtight container.",
  },
  {
    q: "How do I order? Do you deliver?",
    a: "You can order directly via WhatsApp by clicking any 'Order on WhatsApp' button on our website. We deliver across Tamil Nadu and can ship pan-India for bulk orders.",
  },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-[#F8F5EE] py-8 md:py-10 lg:py-12 transition-colors duration-1000">
      <div className="max-w-[800px] mx-auto px-6">
        <div className="text-center mb-16 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 text-[#C9A227] text-[10px] sm:text-xs font-semibold mb-6 tracking-[0.2em] uppercase">
            <span className="w-8 h-[1px] bg-[#C9A227]/50" />
            FREQUENTLY ASKED QUESTIONS
            <span className="w-8 h-[1px] bg-[#C9A227]/50" />
          </div>
          <h2
            className="text-4xl lg:text-5xl font-normal text-[#0B4D2B]"
            style={{ fontFamily: "var(--font-serif), serif" }}
          >
            Got Questions? <br className="sm:hidden" /><span className="italic">We Have Answers.</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-[#FDFBF7] backdrop-blur-sm rounded-[24px] border border-stone-200/50 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-8 py-6 text-left"
              >
                <span className="font-semibold text-[#0B4D2B] text-base tracking-wide">{faq.q}</span>
                <ChevronDown
                  className={`h-5 w-5 text-[#C9A227] flex-shrink-0 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  open === i ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-8 pb-6 text-[#4a524d] text-sm leading-relaxed border-t border-stone-200/50 pt-4 font-medium">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
