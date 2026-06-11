import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Package } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { deleteProduct } from "@/features/products/actions";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    where: { isDeleted: false },
    orderBy: { createdAt: "desc" },
    include: { category: true },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-500 mt-1 text-sm">Manage your oils, millets, and powders.</p>
        </div>
        <Link href="/admin/products/new" className="inline-flex items-center gap-2 bg-[#0B4D2B] hover:bg-[#04341B] text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors">
          <Plus className="h-4 w-4" /> Add Product
        </Link>
      </div>

      {/* Tip Banner */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-700 flex items-start gap-3">
        <span className="text-lg">💡</span>
        <div>
          <strong>Frontend Connection:</strong> Products with <strong>Status: Published</strong> appear on the public site.
          Tick <strong>"Featured Product"</strong> to show a product on the Homepage bestsellers section (max 3 shown).
          The <strong>Primary Image</strong> is what customers see on the product card.
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Package className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-gray-700 font-semibold mb-2">No products yet</h3>
            <p className="text-gray-400 text-sm mb-6">Add your first product to start selling.</p>
            <Button asChild className="bg-[#0B4D2B] hover:bg-[#04341B] rounded-xl">
              <Link href="/admin/products/new"><Plus className="h-4 w-4 mr-2" /> Add First Product</Link>
            </Button>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4 w-16">Image</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Product Name</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Category</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Stock</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Status</th>
                <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map((product) => {
                const images = product.images as any;
                const variants = (product.variants as any[]) || [];
                return (
                  <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      {images?.primaryImage ? (
                        <div className="relative h-12 w-12 rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                          <Image src={images.primaryImage} alt={product.name} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="h-12 w-12 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center">
                          <Package className="h-5 w-5 text-gray-300" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-gray-800 text-sm">{product.name}</span>
                        {product.isFeatured && (
                          <span className="text-[10px] font-bold bg-[#C9A227]/10 text-[#7E6627] border border-[#C9A227]/20 px-2 py-0.5 rounded-full">
                            ⭐ Featured
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">
                        {variants.length} size variant{variants.length !== 1 ? "s" : ""}
                        {variants.length > 0 && ` · From ₹${Math.min(...variants.map((v: any) => v.price || 0))}`}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                        {product.category.name}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {product.stockQuantity > 0 ? (
                        <span className="text-green-700 font-semibold text-sm bg-green-50 px-3 py-1 rounded-full">
                          {product.stockQuantity} in stock
                        </span>
                      ) : (
                        <span className="text-red-600 font-semibold text-sm bg-red-50 px-3 py-1 rounded-full">
                          Out of stock
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${
                        product.status === "Published"
                          ? "bg-green-100 text-green-700"
                          : product.status === "Draft"
                          ? "bg-gray-100 text-gray-600"
                          : "bg-red-100 text-red-600"
                      }`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-blue-50 transition-colors"
                        >
                          <Pencil className="h-4 w-4 text-blue-500" />
                        </Link>
                        <form action={async () => {
                          "use server";
                          await deleteProduct(product.id);
                        }}>
                          <Button variant="ghost" size="icon" type="submit" className="hover:bg-red-50 rounded-xl">
                            <Trash2 className="h-4 w-4 text-red-400" />
                          </Button>
                        </form>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
