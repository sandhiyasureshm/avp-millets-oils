import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { prisma } from "@/lib/db";

export async function Footer() {
  let whatsappNumber = "916369458303";
  let contactPhone = "+91 63694 58303";
  let contactEmail = "avpoilsmillets@gmail.com";
  let address = "Venkitampalayan Main Road, Adamanagalam Pudur, Tiruvannamalai – 606901";

  try {
    const settings = await prisma.homepageSetting.findMany();
    const settingsMap = Object.fromEntries(settings.map(s => [s.key, s.value]));
    if (settingsMap["WHATSAPP_NUMBER"]) whatsappNumber = settingsMap["WHATSAPP_NUMBER"];
    if (settingsMap["CONTACT_PHONE"]) contactPhone = settingsMap["CONTACT_PHONE"];
    if (settingsMap["CONTACT_EMAIL"]) contactEmail = settingsMap["CONTACT_EMAIL"];
    if (settingsMap["ADDRESS"]) address = settingsMap["ADDRESS"];
  } catch (error) {
    console.error("Failed to load settings in Footer:", error);
  }


  return (
    <footer className="bg-[#00210e] text-white">
      <div className="max-w-[1280px] mx-auto px-6 py-10 lg:py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <Image
            src="/images/home/logo.jpeg"
            alt="AVP Oils & Millets"
            width={80}
            height={80}
            className="rounded-full mb-4 border-2 border-[#fdce5f]/30"
          />
          <p className="text-[#76a382] text-sm leading-relaxed">
            Traditional goodness, natural wellness. Cold pressed oils and
            millets from Tiruvannamalai, Tamil Nadu.
          </p>
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 bg-[#fdce5f] text-[#00210e] text-sm font-bold px-4 py-2 rounded-lg hover:bg-[#eec052] transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            Order on WhatsApp
          </a>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-[#fdce5f] font-semibold text-sm uppercase tracking-widest mb-5">
            Shop
          </h3>
          <ul className="space-y-3">
            {["Cold Pressed Oils", "Traditional Millets", "Chilli Powder", "All Products"].map((item) => (
              <li key={item}>
                <Link href="/products" className="text-[#76a382] hover:text-white text-sm transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-[#fdce5f] font-semibold text-sm uppercase tracking-widest mb-5">
            Company
          </h3>
          <ul className="space-y-3">
            {[
              { name: "About Us", href: "/about" },
              { name: "Gallery", href: "/gallery" },
              { name: "Contact Us", href: "/contact" },
            ].map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="text-[#76a382] hover:text-white text-sm transition-colors">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-[#fdce5f] font-semibold text-sm uppercase tracking-widest mb-5">
            Contact
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-2 text-[#76a382] text-sm">
              <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-[#fdce5f]" />
              {address}
            </li>
            <li>
              <a href={`tel:${contactPhone.replace(/\s+/g, "")}`} className="flex items-center gap-2 text-[#76a382] hover:text-white text-sm transition-colors">
                <Phone className="h-4 w-4 text-[#fdce5f]" />
                {contactPhone}
              </a>
            </li>
            <li>
              <a href={`mailto:${contactEmail}`} className="flex items-center gap-2 text-[#76a382] hover:text-white text-sm transition-colors">
                <Mail className="h-4 w-4 text-[#fdce5f]" />
                {contactEmail}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 text-center py-5 text-[#76a382] text-xs tracking-wide">
        © {new Date().getFullYear()} AVP Oils & Millets, Tiruvannamalai. All rights reserved.
      </div>
    </footer>
  );
}
