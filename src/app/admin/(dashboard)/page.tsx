import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/db";
import { Package, Tags, MessageSquare, Image as ImageIcon, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const [
    totalProducts,
    totalCategories,
    totalInquiries,
    newInquiries,
    totalImages,
  ] = await Promise.all([
    prisma.product.count({ where: { isDeleted: false } }),
    prisma.category.count({ where: { isDeleted: false } }),
    prisma.inquiry.count(),
    prisma.inquiry.count({ where: { status: "NEW" } }),
    prisma.gallery.count(),
  ]);

  const stats = [
    {
      title: "Total Products",
      value: totalProducts,
      icon: Package,
      href: "/admin/products",
      description: "Manage your product catalog",
      color: "bg-blue-50 text-blue-600 border-blue-100",
    },
    {
      title: "Categories",
      value: totalCategories,
      icon: Tags,
      href: "/admin/categories",
      description: "Organize product collections",
      color: "bg-purple-50 text-purple-600 border-purple-100",
    },
    {
      title: "New Inquiries",
      value: newInquiries,
      icon: MessageSquare,
      href: "/admin/inquiries",
      description: `${totalInquiries} total messages`,
      color: "bg-orange-50 text-orange-600 border-orange-100",
      badge: newInquiries > 0 ? newInquiries : null,
    },
    {
      title: "Gallery Images",
      value: totalImages,
      icon: ImageIcon,
      href: "/admin/gallery",
      description: "Farm & product photos",
      color: "bg-green-50 text-green-600 border-green-100",
    },
  ];

  const quickLinks = [
    { title: "Add a New Product", href: "/admin/products/new", icon: Package },
    { title: "Add a Category", href: "/admin/categories", icon: Tags },
    { title: "Upload Gallery Photo", href: "/admin/gallery", icon: ImageIcon },
    { title: "View Customer Messages", href: "/admin/inquiries", icon: MessageSquare },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1 text-sm">Here is a snapshot of your AVP store.</p>
        </div>
        <div className="flex items-center gap-2 bg-[#0B4D2B]/5 border border-[#0B4D2B]/10 rounded-xl px-4 py-2">
          <TrendingUp className="h-4 w-4 text-[#0B4D2B]" />
          <span className="text-[#0B4D2B] text-sm font-semibold">Store Active</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer border-gray-100">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${stat.color}`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                  {stat.badge && (
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {stat.badge} new
                    </span>
                  )}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <p className="text-sm font-semibold text-gray-700">{stat.title}</p>
                <p className="text-xs text-gray-400 mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-base font-bold text-gray-700 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="group flex items-center justify-between gap-3 p-4 bg-white rounded-xl border border-gray-100 hover:border-[#0B4D2B]/30 hover:shadow-sm transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#0B4D2B]/5 flex items-center justify-center">
                  <link.icon className="h-4 w-4 text-[#0B4D2B]" />
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-[#0B4D2B] transition-colors">{link.title}</span>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-[#0B4D2B] group-hover:translate-x-0.5 transition-all" />
            </Link>
          ))}
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-gradient-to-r from-[#0B4D2B] to-[#1a6b3e] rounded-2xl p-6 text-white flex items-center justify-between">
        <div>
          <h3 className="font-bold text-lg mb-1">Ready to upload your products?</h3>
          <p className="text-white/70 text-sm">Start by adding categories first, then add products with images, pricing, and size variants.</p>
        </div>
        <Link
          href="/admin/categories"
          className="flex-shrink-0 bg-[#C9A227] hover:bg-[#b8911f] text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors"
        >
          Get Started →
        </Link>
      </div>
    </div>
  );
}
