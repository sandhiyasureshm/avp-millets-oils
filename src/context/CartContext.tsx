"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string; // slug-size
  name: string;
  slug: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  addToCart: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCartOpen: () => void;
  setCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart from LocalStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("avp_cart");
      if (stored) {
        setCart(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to load cart from localStorage", error);
    }
    setIsInitialized(true);
  }, []);

  // Save cart to LocalStorage on changes
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem("avp_cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to save cart to localStorage", error);
    }
  }, [cart, isInitialized]);

  const addToCart = (newItem: Omit<CartItem, "quantity">, qty = 1) => {
    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex((item) => item.id === newItem.id);
      if (existingIdx > -1) {
        const updated = [...prevCart];
        updated[existingIdx].quantity = Math.min(updated[existingIdx].quantity + qty, 10);
        return updated;
      }
      return [...prevCart, { ...newItem, quantity: qty }];
    });
    setIsCartOpen(true); // Open the cart drawer automatically
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, qty: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, Math.min(qty, 10)) } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleCartOpen = () => {
    setIsCartOpen((prev) => !prev);
  };

  const setCartOpen = (open: boolean) => {
    setIsCartOpen(open);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleCartOpen,
        setCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
