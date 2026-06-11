import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { ProductInteractiveDetails } from "@/components/public/products/ProductInteractiveDetails";

type Props = {
  params: Promise<{ slug: string }>;
};

// Generate Dynamic SEO Metadata
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  try {
    const product = await prisma.product.findUnique({
      where: { slug, isDeleted: false, status: "Published" },
    });

    if (!product) {
      return {
        title: "Product Not Found | AVP Oils & Millets",
        description: "The requested product could not be found.",
      };
    }

    return {
      title: `${product.name} | AVP Oils & Millets`,
      description: product.metaDescription || product.description?.substring(0, 160) || `Buy premium cold pressed ${product.name} from Tiruvannamalai.`,
      openGraph: {
        title: `${product.name} | AVP Oils & Millets`,
        description: product.description?.substring(0, 160),
        type: "website",
      },
    };
  } catch (error) {
    return {
      title: "AVP Oils & Millets",
    };
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;

  // 1. Fetch Product
  const product = await prisma.product.findUnique({
    where: { slug, isDeleted: false, status: "Published" },
    include: { category: true },
  });

  if (!product) {
    notFound();
  }

  // 2. Fetch Settings
  let whatsappNumber = "916369458303";
  try {
    const setting = await prisma.homepageSetting.findUnique({
      where: { key: "WHATSAPP_NUMBER" },
    });
    if (setting?.value) whatsappNumber = setting.value;
  } catch (error) {
    console.error("Failed to load settings on detail page:", error);
  }

  // Clean data types for serialization/passing to client component
  const benefits = Array.isArray(product.benefits)
    ? (product.benefits as string[])
    : [];

  const variants = Array.isArray(product.variants)
    ? (product.variants as { size: string; price: number }[])
    : [];

  const rawImages = product.images as any;
  const images = {
    primaryImage: rawImages?.primaryImage || "/images/home/hero-oils.png",
    gallery: Array.isArray(rawImages?.gallery) ? (rawImages.gallery as string[]) : [],
  };

  const productData = {
    slug: product.slug,
    name: product.name,
    description: product.description || "",
    benefits,
    variants,
    images,
  };

  // Structured Data (JSON-LD Schema)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": images.primaryImage ? `https://avpoils.com${images.primaryImage}` : undefined,
    "description": product.description,
    "sku": product.sku || undefined,
    "offers": variants.length > 0 ? {
      "@type": "AggregateOffer",
      "priceCurrency": "INR",
      "lowPrice": Math.min(...variants.map(v => v.price)),
      "highPrice": Math.max(...variants.map(v => v.price)),
      "offerCount": variants.length,
      "price": variants[0]?.price,
      "availability": "https://schema.org/InStock"
    } : undefined
  };

  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Interactive Details Layout */}
      <ProductInteractiveDetails
        product={productData}
        whatsappNumber={whatsappNumber}
      />
    </>
  );
}
