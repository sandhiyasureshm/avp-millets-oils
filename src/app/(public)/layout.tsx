import { Header } from "@/components/public/layout/Header";
import { Footer } from "@/components/public/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "@/components/public/cart/CartDrawer";
import { prisma } from "@/lib/db";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let whatsappNumber = "916369458303";
  try {
    const setting = await prisma.homepageSetting.findUnique({
      where: { key: "WHATSAPP_NUMBER" },
    });
    if (setting?.value) whatsappNumber = setting.value;
  } catch (error) {
    console.error("Failed to load settings in layout:", error);
  }

  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen bg-[#fcf9f8]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer whatsappNumber={whatsappNumber} />
      </div>
    </CartProvider>
  );
}
