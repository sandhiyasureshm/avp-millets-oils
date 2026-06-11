import { MessageCircle } from "lucide-react";
import { prisma } from "@/lib/db";

export async function WhatsAppCTA() {
  let whatsappNumber = "916369458303";

  try {
    const settings = await prisma.homepageSetting.findMany();
    const settingsMap = Object.fromEntries(settings.map(s => [s.key, s.value]));
    if (settingsMap["WHATSAPP_NUMBER"]) whatsappNumber = settingsMap["WHATSAPP_NUMBER"];
  } catch (error) {
    console.error("Failed to load settings in WhatsAppCTA:", error);
  }

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hi%20AVP%20Oils!%20I%20want%20to%20place%20an%20order.`;


  return (
    <section
      className="relative bg-[#0B4D2B] py-8 md:py-10 lg:py-12 overflow-hidden"
    >
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#C9A227]/5 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-[#C9A227]/5 -translate-x-1/2 translate-y-1/2" />

      <div className="relative max-w-[1280px] mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 text-[#C9A227] text-[10px] sm:text-xs font-semibold mb-6 tracking-[0.2em] uppercase">
          <span className="w-8 h-[1px] bg-[#C9A227]/50" />
          READY TO ORDER?
          <span className="w-8 h-[1px] bg-[#C9A227]/50" />
        </div>
        <h2
          className="text-4xl lg:text-5xl font-normal text-white mb-6 leading-tight"
          style={{ fontFamily: "var(--font-serif), serif" }}
        >
          Experience Tradition Delivered <br className="hidden sm:block" />
          <span className="italic text-[#C9A227]">to Your Doorstep</span>
        </h2>
        <p className="text-[#A3B8AD] text-sm lg:text-base mb-10 max-w-xl mx-auto font-medium leading-relaxed">
          Order now via WhatsApp for the freshest cold pressed oils and traditional millets.
          Same-day dispatch. Pan-India delivery available.
        </p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-[#C9A227] text-[#0B4D2B] font-bold text-base px-8 py-4 rounded-xl hover:bg-[#E5BE4A] transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
        >
          <MessageCircle className="h-5 w-5 fill-[#0B4D2B]" />
          Order on WhatsApp
        </a>
      </div>
    </section>
  );
}
