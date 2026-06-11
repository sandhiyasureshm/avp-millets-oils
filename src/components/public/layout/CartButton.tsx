"use client";

import { useCart } from "@/context/CartContext";
import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

export function CartButton() {
  const { toggleCartOpen, cart } = useCart();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="relative p-2.5 bg-gray-50 border border-gray-100 hover:bg-gray-100 rounded-xl transition-colors">
        <ShoppingBag className="w-5 h-5 text-[#00210e]" />
      </button>
    );
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <button
      onClick={toggleCartOpen}
      className="relative p-2.5 bg-gray-50 border border-gray-100 hover:bg-gray-100 rounded-xl transition-colors"
      aria-label="Toggle Shopping Cart"
    >
      <ShoppingBag className="w-5 h-5 text-[#00210e]" />
      {totalItems > 0 && (
        <span className="absolute -top-1.5 -right-1.5 bg-[#C9A227] text-[#00210e] text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm animate-pulse">
          {totalItems}
        </span>
      )}
    </button>
  );
}
