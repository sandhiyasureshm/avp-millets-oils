"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  Package,
  Tags,
  Image as ImageIcon,
  MessageSquare,
  Settings,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Categories", href: "/admin/categories", icon: Tags },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Gallery", href: "/admin/gallery", icon: ImageIcon },
  { name: "Inquiries", href: "/admin/inquiries", icon: MessageSquare },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#0B4D2B] flex flex-col h-full hidden md:flex shadow-2xl">
      {/* Logo Area */}
      <div className="h-20 flex items-center gap-3 px-6 border-b border-white/10">
        <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#C9A227]/50 flex-shrink-0">
          <Image src="/images/home/logo.jpeg" alt="AVP Logo" fill className="object-cover" />
        </div>
        <div>
          <h2 className="text-white font-bold text-sm leading-tight">AVP Oils & Millets</h2>
          <p className="text-[#C9A227] text-[10px] font-medium tracking-widest uppercase">Admin Panel</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
        <p className="text-white/30 text-[9px] font-bold tracking-[0.2em] uppercase px-3 mb-3">Main Menu</p>
        {navItems.map((item) => {
          const isActive = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-white/15 text-white shadow-sm border border-white/10"
                  : "text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className={`h-4 w-4 flex-shrink-0 ${isActive ? "text-[#C9A227]" : ""}`} />
                <span className="text-sm font-medium">{item.name}</span>
              </div>
              {isActive && <ChevronRight className="h-3 w-3 text-[#C9A227]" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-6 py-4 border-t border-white/10">
        <Link href="/" target="_blank" className="flex items-center gap-2 text-white/40 hover:text-white/70 text-xs transition-colors">
          <span>↗</span>
          View Live Website
        </Link>
      </div>
    </aside>
  );
}
