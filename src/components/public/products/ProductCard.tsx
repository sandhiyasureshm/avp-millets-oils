"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export interface ProductCardProps {
  product: {
    name: string;
    desc: string;
    image: string;
    slug: string;
    price: number;
    tag?: string;
    tagColor?: string;
    variants?: { size: string; price: number }[];
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const size = product.variants?.[0]?.size || "500ml";
    const price = product.variants?.[0]?.price || product.price;

    addToCart(
      {
        id: `${product.slug}-${size}`,
        name: product.name,
        slug: product.slug,
        size,
        price,
        image: product.image,
      },
      1
    );
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden group hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
      {/* Image Container */}
      <Link
        href={`/products/${product.slug}`}
        className="relative w-full bg-[#f4f4f4] overflow-hidden block"
        style={{ paddingBottom: "100%" /* 1:1 aspect ratio */ }}
      >
        <div className="absolute inset-0">
          {product.tag && (
            <span
              className={`absolute top-2 left-2 z-10 text-[9px] sm:text-[10px] font-bold px-2 py-1 text-white rounded-full tracking-wider uppercase ${product.tagColor}`}
            >
              {product.tag}
            </span>
          )}
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />

          {/* Quick Add Cart Button */}
          <button
            onClick={handleAddToCart}
            className="absolute bottom-2 right-2 w-9 h-9 sm:w-10 sm:h-10 bg-white text-[#0B4D2B] rounded-full flex items-center justify-center shadow-lg transition-all duration-300 z-20 hover:scale-110 hover:bg-[#0B4D2B] hover:text-white border border-gray-100"
            title="Add to Cart"
          >
            <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </Link>

      {/* Info Container */}
      <div className="p-3 sm:p-5 flex flex-col flex-1">
        {/* Name & Price */}
        <div className="mb-2">
          <Link
            href={`/products/${product.slug}`}
            className="block text-[#333333] hover:text-[#0B4D2B] font-semibold text-sm sm:text-base leading-tight transition-colors mb-1 line-clamp-2"
          >
            {product.name}
          </Link>
          <span className="text-[#9F7A25] font-bold text-sm sm:text-base">
            ₹{product.price}
          </span>
        </div>

        {/* Description — hidden on very small screens */}
        <p className="hidden sm:block text-[#666666] text-xs sm:text-sm leading-relaxed mb-4 flex-1 line-clamp-2">
          {product.desc}
        </p>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-auto">
          <Link
            href={`/products/${product.slug}`}
            className="flex-1 text-center border border-[#E9E4DF] text-[#666666] py-2 sm:py-3 rounded-full text-[10px] sm:text-xs font-semibold tracking-wider hover:border-[#0B4D2B] hover:text-[#0B4D2B] transition-colors duration-300 uppercase"
          >
            Details
          </Link>
          <button
            onClick={handleAddToCart}
            className="flex-1 text-center bg-[#0B4D2B] hover:bg-[#07381E] text-white py-2 sm:py-3 rounded-full text-[10px] sm:text-xs font-semibold tracking-wider transition-colors duration-300 uppercase"
          >
            Add Cart
          </button>
        </div>
      </div>
    </div>
  );
}
