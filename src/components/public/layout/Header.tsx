import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";
import Image from "next/image";
import { prisma } from "@/lib/db";
import { CartButton } from "./CartButton";
import { MobileMenu } from "./MobileMenu";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact Us", href: "/contact" },
];

export async function Header() {
  let whatsappNumber = "916369458303";
  let contactPhone = "+91 63694 58303";

  try {
    const settings = await prisma.homepageSetting.findMany();
    const settingsMap = Object.fromEntries(settings.map(s => [s.key, s.value]));
    if (settingsMap["WHATSAPP_NUMBER"]) whatsappNumber = settingsMap["WHATSAPP_NUMBER"];
    if (settingsMap["CONTACT_PHONE"]) contactPhone = settingsMap["CONTACT_PHONE"];
  } catch (error) {
    console.error("Failed to load settings in Header:", error);
  }

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hi%20AVP%20Oils!%20I%20want%20to%20place%20an%20order.`;


  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-white/20 transition-all duration-300">
      {/* Announcement Bar */}
      <div className="bg-[#00210e] text-white">
        <div className="max-w-[1400px] mx-auto flex items-center justify-center h-[30px] lg:h-[36px] px-4 lg:px-8">
          <p className="text-[9px] sm:text-[10px] lg:text-[11px] tracking-[0.15em] font-semibold text-center whitespace-nowrap truncate">
            🌿 100% NATURAL &nbsp;|&nbsp; WOOD PRESSED OILS &nbsp;|&nbsp; DIRECT FROM FARM
          </p>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 h-[60px] lg:h-[80px] flex justify-between items-center">
        
        {/* Left: Mobile Menu & Logo */}
        <div className="flex items-center justify-start flex-1 gap-2 lg:gap-4">
          <div className="lg:hidden">
            <MobileMenu />
          </div>
          <Link href="/" className="flex-shrink-0 flex items-center">
            <Image
              src="/images/home/logo.jpeg"
              alt="AVP Oils & Millets"
              width={90}
              height={90}
              className="object-contain rounded-full w-[48px] h-[48px] lg:w-[64px] lg:h-[64px] shadow-sm border border-gray-100"
              priority
            />
          </Link>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden lg:flex flex-1 justify-center items-center gap-8 xl:gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[#00210e] text-[13px] font-bold tracking-[0.1em] uppercase hover:text-[#926F34] transition-colors relative group py-2 whitespace-nowrap"
            >
              {link.name}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#926F34] group-hover:w-full transition-all duration-300 ease-in-out" />
            </Link>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="flex-1 flex items-center justify-end gap-2 lg:gap-4">
          <CartButton />
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-[#00210e] text-white p-2.5 lg:px-5 lg:py-3 rounded-xl lg:rounded-full hover:bg-[#0c381f] transition-colors shadow-sm"
            aria-label="Order on WhatsApp"
          >
            <MessageCircle className="h-5 w-5 lg:h-4 lg:w-4 fill-white" />
            <span className="hidden lg:inline ml-2 text-[13px] font-bold tracking-wide">WhatsApp Order</span>
          </a>
        </div>
      </div>
    </header>
  );
}
