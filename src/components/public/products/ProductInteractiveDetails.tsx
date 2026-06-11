"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, CheckCircle, Truck, ShieldCheck, ArrowLeft, Plus, Minus } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface Variant {
  size: string;
  price: number;
}

interface ProductImages {
  primaryImage: string;
  gallery: string[];
}

interface ProductInteractiveDetailsProps {
  product: {
    slug: string;
    name: string;
    description: string;
    benefits: string[];
    variants: Variant[];
    images: ProductImages;
  };
  whatsappNumber: string;
}

export function ProductInteractiveDetails({
  product,
  whatsappNumber,
}: ProductInteractiveDetailsProps) {
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<Variant>(
    product.variants[0] || { size: "Standard", price: 0 }
  );
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(
    product.images.primaryImage || "/images/home/hero-oils.png"
  );

  const galleryImages = [
    product.images.primaryImage,
    ...(product.images.gallery || []),
  ].filter(Boolean);

  const handleQuantityChange = (type: "inc" | "dec") => {
    if (type === "dec" && quantity > 1) {
      setQuantity(quantity - 1);
    } else if (type === "inc" && quantity < 10) {
      setQuantity(quantity + 1);
    }
  };

  const totalPrice = selectedVariant.price * quantity;

  // Generate WhatsApp Order Link
  const orderMessage = `Hi AVP Oils & Millets! 🛒\n\nI would like to place an order for:\n\n*Product:* ${product.name}\n*Size/Variant:* ${selectedVariant.size}\n*Quantity:* ${quantity}\n*Total Price:* ₹${totalPrice}\n\nPlease confirm availability and delivery details.\n\nThank you!`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(orderMessage)}`;

  return (
    <div className="min-h-screen bg-[#F8F5EE] py-10">
      <div className="max-w-[1280px] mx-auto px-6">
        
        {/* Back Link */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-[#0B4D2B] hover:text-[#C9A227] font-semibold text-sm mb-8 transition-colors group"
        >
          <span className="w-8 h-8 rounded-full bg-[#0B4D2B]/10 group-hover:bg-[#C9A227]/20 flex items-center justify-center transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </span>
          Back to Catalog
        </Link>

        {/* Product Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white p-6 md:p-10 rounded-[32px] shadow-sm border border-gray-100">
          
          {/* Left Column: Gallery / Images (5 cols) */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="relative aspect-square w-full bg-[#FAF8F3] rounded-[24px] overflow-hidden border border-gray-100 shadow-inner">
              <Image
                src={activeImage}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover transition-all duration-300"
                priority
              />
            </div>
            
            {/* Gallery Thumbs */}
            {galleryImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto py-2">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-20 h-20 bg-[#FAF8F3] rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                      activeImage === img ? "border-[#0B4D2B]" : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} Thumbnail ${idx + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Content & Actions (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              {/* Product Title */}
              <h1
                className="text-3xl lg:text-4xl font-normal text-[#333333] mb-4"
                style={{ fontFamily: "var(--font-serif), serif" }}
              >
                {product.name}
              </h1>

              {/* Price Tag */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-bold text-[#0B4D2B]">
                  ₹{selectedVariant.price}
                </span>
                <span className="text-gray-400 text-sm">
                  per {selectedVariant.size}
                </span>
              </div>

              {/* Description */}
              <div className="border-t border-[#E9E4DF] pt-6 mb-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-3">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                  {product.description}
                </p>
              </div>

              {/* Benefits (if any) */}
              {product.benefits.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-3">
                    Key Benefits
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-[#C9A227] flex-shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {product.variants.length > 1 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-3">
                    Select Size
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {product.variants.map((v, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedVariant(v)}
                        className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide border-2 transition-all duration-200 ${
                          selectedVariant.size === v.size
                            ? "bg-[#0B4D2B] border-[#0B4D2B] text-white shadow-md"
                            : "bg-white border-[#E9E4DF] text-gray-600 hover:border-[#0B4D2B] hover:text-[#0B4D2B]"
                        }`}
                      >
                        {v.size} - ₹{v.price}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-3">
                  Quantity
                </h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-200 rounded-full px-2 py-1 bg-gray-50">
                    <button
                      onClick={() => handleQuantityChange("dec")}
                      className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-3 h-3 text-gray-600" />
                    </button>
                    <span className="w-8 text-center text-sm font-bold text-gray-800">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange("inc")}
                      className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                      disabled={quantity >= 10}
                    >
                      <Plus className="w-3 h-3 text-gray-600" />
                    </button>
                  </div>
                  <span className="text-xs text-gray-400">Limit: 10 units per order</span>
                </div>
              </div>
            </div>

            {/* Total & WhatsApp Order CTA */}
            <div className="border-t border-[#E9E4DF] pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div>
                <span className="text-xs text-gray-400 block mb-0.5">Estimated Total</span>
                <span className="text-3xl font-extrabold text-[#0B4D2B]">
                  ₹{totalPrice}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <button
                  onClick={() => {
                    addToCart(
                      {
                        id: `${product.slug}-${selectedVariant.size}`,
                        name: product.name,
                        slug: product.slug,
                        size: selectedVariant.size,
                        price: selectedVariant.price,
                        image: activeImage,
                      },
                      quantity
                    );
                  }}
                  className="inline-flex items-center justify-center border-2 border-[#0B4D2B] text-[#0B4D2B] hover:bg-[#0B4D2B] hover:text-white font-bold px-8 py-3.5 rounded-2xl transition-all hover:-translate-y-0.5 text-sm uppercase tracking-wider"
                >
                  Add to Cart
                </button>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-[#0B4D2B] hover:bg-[#07381E] text-white font-bold px-8 py-3.5 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 text-sm uppercase tracking-wider"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  Buy Now
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Dynamic Badges Block */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {[
            {
              icon: <Truck className="w-6 h-6 text-[#C9A227]" />,
              title: "Pan-India Shipping",
              desc: "Safe and fast delivery across India. Free delivery above ₹500.",
            },
            {
              icon: <CheckCircle className="w-6 h-6 text-[#C9A227]" />,
              title: "100% Organic & Raw",
              desc: "No additives, no preservatives, directly sourced from our fields.",
            },
            {
              icon: <ShieldCheck className="w-6 h-6 text-[#C9A227]" />,
              title: "Traditional Process",
              desc: "Extracted via wood-pressed churners under hygienic conditions.",
            },
          ].map((badge, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 flex gap-4 items-start shadow-sm">
              <div className="p-3 bg-[#FAF8F3] rounded-xl flex-shrink-0">
                {badge.icon}
              </div>
              <div>
                <h4 className="font-bold text-[#333333] mb-1 text-sm">{badge.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
