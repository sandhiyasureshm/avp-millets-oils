import type { Metadata } from "next";
import { Libre_Caslon_Text, Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { ScrollToTop } from "@/components/public/layout/ScrollToTop";
import "./globals.css";

const libreCaslon = Libre_Caslon_Text({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AVP Oils & Millets | Pure Traditional Cold Pressed Oils",
  description: "100% Natural Wood Pressed Oils, Traditional Millets & Spices. Cold pressed, chemical-free, farm-fresh from Tiruvannamalai.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${libreCaslon.variable} ${plusJakarta.variable}`}>
      <body className="min-h-full flex flex-col antialiased" style={{ fontFamily: "var(--font-sans), sans-serif" }}>
        <ScrollToTop />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
