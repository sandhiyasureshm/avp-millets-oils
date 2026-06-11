"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, Plus, Minus, MessageCircle, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

interface CartDrawerProps {
  whatsappNumber: string;
}

export function CartDrawer({ whatsappNumber }: CartDrawerProps) {
  const { cart, isCartOpen, removeFromCart, updateQuantity, toggleCartOpen, clearCart } = useCart();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Generate compiled WhatsApp order text
  const generateWhatsAppUrl = () => {
    let orderText = `Hi AVP Oils & Millets! 🛒\n\nI'd like to place an order for the following items:\n\n`;
    
    cart.forEach((item, idx) => {
      orderText += `${idx + 1}. *${item.name}* (${item.size}) x ${item.quantity} - ₹${item.price * item.quantity}\n`;
    });

    orderText += `\n*Total:* ₹${totalPrice}\n\nPlease confirm availability and let me know the payment/delivery details.\n\nThank you!`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(orderText)}`;
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={toggleCartOpen}
      />

      {/* Slide-over Container */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full animate-slide-in">
          {/* Header */}
          <div className="px-6 py-5 bg-[#FAF8F3] border-b border-[#E9E4DF] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#0B4D2B]" />
              <h2 className="text-lg font-bold text-[#333333]">Shopping Cart ({totalItems})</h2>
            </div>
            <button
              onClick={toggleCartOpen}
              className="p-1 hover:bg-gray-200 rounded-full transition-colors text-gray-500 hover:text-gray-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items (Scrollable) */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-16 h-16 bg-[#FAF8F3] rounded-full flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-[#333333] mb-1">Your cart is empty</h3>
                <p className="text-gray-500 text-sm mb-6 max-w-[240px]">
                  Add some organic, cold pressed oils and fresh millets to start!
                </p>
                <button
                  onClick={toggleCartOpen}
                  className="bg-[#0B4D2B] text-white font-semibold text-xs tracking-wider uppercase px-6 py-3 rounded-full hover:bg-[#C9A227] transition-all"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 pb-6 border-b border-gray-100 last:border-0 last:pb-0"
                >
                  {/* Image */}
                  <div className="relative w-20 h-20 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <Link
                          href={`/products/${item.slug}`}
                          onClick={toggleCartOpen}
                          className="font-bold text-[#333333] text-sm hover:text-[#0B4D2B] transition-colors leading-tight"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="text-xs text-gray-500 block mt-1">Size: {item.size}</span>
                    </div>

                    {/* Quantity & Subtotal */}
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center border border-gray-200 rounded-full bg-gray-50 p-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-200 rounded-full transition-colors text-gray-600 disabled:opacity-40"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-200 rounded-full transition-colors text-gray-600 disabled:opacity-40"
                          disabled={item.quantity >= 10}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-sm font-extrabold text-[#0B4D2B]">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer (Total & Checkout) */}
          {cart.length > 0 && (
            <div className="p-6 bg-[#FAF8F3] border-t border-[#E9E4DF] space-y-4">
              <div className="flex justify-between items-center text-base text-[#333333]">
                <span className="font-medium">Subtotal</span>
                <span className="font-extrabold text-xl text-[#0B4D2B]">₹{totalPrice}</span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={clearCart}
                  className="px-4 py-3.5 border border-gray-300 rounded-xl text-xs font-semibold text-gray-600 bg-white hover:bg-gray-50 transition-colors uppercase tracking-wider"
                >
                  Clear
                </button>
                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#0B4D2B] hover:bg-[#07381E] text-white font-bold py-3.5 rounded-xl shadow-md transition-colors uppercase tracking-wider text-xs"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  Order on WhatsApp
                </a>
              </div>
              
              <p className="text-[10px] text-center text-gray-400 leading-normal">
                Delivery and custom shipping charges will be discussed and calculated directly in the WhatsApp chat.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
