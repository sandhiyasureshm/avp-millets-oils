"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Menu, X, Home, Info, ShoppingBag, Image as ImageIcon, Phone } from "lucide-react";

const NAV_LINKS = [
  { name: "Home",       href: "/",        Icon: Home },
  { name: "About Us",  href: "/about",   Icon: Info },
  { name: "Products",  href: "/products",Icon: ShoppingBag },
  { name: "Gallery",   href: "/gallery", Icon: ImageIcon },
  { name: "Contact Us",href: "/contact", Icon: Phone },
];

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const close = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={toggle}
        className="lg:hidden p-2 -ml-2 text-[#00210e]"
        aria-label="Toggle menu"
      >
        <Menu size={24} />
      </button>

      {mounted && createPortal(
        <div
          className={`fixed inset-0 z-[99999] transition-all duration-300 ${
            isOpen ? "visible" : "invisible"
          }`}
        >
          {/* Dark Backdrop */}
          <div 
            className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={close}
          />
          
          {/* Drawer */}
          <div 
            className={`absolute top-0 left-0 h-full w-[260px] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {/* Header */}
            <div className="h-[60px] min-h-[60px] bg-[#00210e] flex items-center justify-between px-4">
              <div className="flex items-center gap-2">
                <span className="text-base">🌿</span>
                <div>
                  <p className="text-white font-bold text-xs tracking-widest leading-tight m-0">AVP OILS</p>
                  <p className="text-[#C9A227] text-[10px] tracking-wide leading-tight m-0">&amp; MILLETS</p>
                </div>
              </div>
              <button onClick={close} className="p-1 rounded-full bg-white/10 text-white hover:bg-white/20">
                <X size={20} />
              </button>
            </div>

            {/* Links */}
            <nav className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-2">
              {NAV_LINKS.map(({ name, href, Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={close}
                  className="flex items-center gap-4 px-3 py-3 rounded-xl text-[#1a1a1a] font-semibold transition-colors hover:bg-[#f0f7f3] hover:text-[#0B4D2B]"
                >
                  <span className="w-[36px] h-[36px] rounded-lg bg-[#0B4D2B]/10 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-[#0B4D2B]" />
                  </span>
                  {name}
                </Link>
              ))}
            </nav>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
