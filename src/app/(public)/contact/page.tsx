import { ContactForm } from "@/components/public/contact/ContactForm";
import { WhatsAppCTA } from "@/components/public/home/WhatsAppCTA";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { prisma } from "@/lib/db";

export const metadata = {
  title: "Contact Us | AVP Oils & Millets",
  description: "Get in touch with AVP Oils & Millets in Tiruvannamalai. We'd love to hear from you.",
};

export default async function ContactPage() {
  let contactPhone = "+91 63694 58303";
  let contactEmail = "support@avpoils.com";
  let address = "Venkitampalayan Main Road, Adamanagalam Pudur, Tiruvannamalai – 606901";

  try {
    const settings = await prisma.homepageSetting.findMany();
    const settingsMap = Object.fromEntries(settings.map(s => [s.key, s.value]));
    if (settingsMap["CONTACT_PHONE"]) contactPhone = settingsMap["CONTACT_PHONE"];
    if (settingsMap["CONTACT_EMAIL"]) contactEmail = settingsMap["CONTACT_EMAIL"];
    if (settingsMap["ADDRESS"]) address = settingsMap["ADDRESS"];
  } catch (error) {
    console.error("Failed to load settings in ContactPage:", error);
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "AVP Oils & Millets",
    "image": "https://avpoils.com/images/home/logo.jpeg",
    "telephone": contactPhone,
    "email": contactEmail,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": address,
      "addressLocality": "Tiruvannamalai",
      "addressRegion": "Tamil Nadu",
      "postalCode": "606901",
      "addressCountry": "IN"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:00",
        "closes": "20:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "10:00",
        "closes": "14:00"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-[#F8F5EE]">
      {/* Hero Section */}
      <section className="pt-8 lg:pt-10 pb-12 lg:pb-16 bg-[#FAF8F3] border-b border-[#E9E4DF]">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 text-[#C9A227] text-[10px] sm:text-xs font-semibold mb-6 tracking-[0.2em] uppercase">
            <span className="w-8 h-[1px] bg-[#C9A227]/50" />
            GET IN TOUCH
            <span className="w-8 h-[1px] bg-[#C9A227]/50" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-normal text-[#0B4D2B] mb-6" style={{ fontFamily: "var(--font-serif), serif" }}>
            We&apos;re Here To Help
          </h1>
          <p className="text-[#666666] text-lg max-w-2xl mx-auto font-medium">
            Have questions about our products or need help with an order? Drop us a message or visit our store in Tiruvannamalai.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Left: Contact Info */}
            <div>
              <h2 className="text-3xl lg:text-4xl font-normal text-[#0B4D2B] mb-8" style={{ fontFamily: "var(--font-serif), serif" }}>
                Contact Information
              </h2>
              
              <div className="space-y-8">
                {/* Address */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm border border-[#E9E4DF]">
                    <MapPin className="text-[#C9A227] w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[#0B4D2B] font-bold mb-1">Our Store</h4>
                    <p className="text-[#666666] leading-relaxed">
                      AVP Oils & Millets<br />
                      {address}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm border border-[#E9E4DF]">
                    <Phone className="text-[#C9A227] w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[#0B4D2B] font-bold mb-1">Phone / WhatsApp</h4>
                    <p className="text-[#666666] leading-relaxed">
                      {contactPhone}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm border border-[#E9E4DF]">
                    <Mail className="text-[#C9A227] w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[#0B4D2B] font-bold mb-1">Email Support</h4>
                    <p className="text-[#666666] leading-relaxed">
                      {contactEmail}
                    </p>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm border border-[#E9E4DF]">
                    <Clock className="text-[#C9A227] w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[#0B4D2B] font-bold mb-1">Working Hours</h4>
                    <p className="text-[#666666] leading-relaxed">
                      Mon - Sat: 9:00 AM - 8:00 PM<br />
                      Sunday: 10:00 AM - 2:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div>
              <ContactForm />
            </div>

          </div>
        </div>
      </section>

      {/* WhatsApp CTA Section */}
      <WhatsAppCTA />
    </div>
    </>
  );
}
