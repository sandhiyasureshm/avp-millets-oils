import { prisma } from "@/lib/db";
import { ProductForm } from "@/components/admin/forms/ProductForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({
    where: { isDeleted: false },
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/products"
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-gray-200 hover:border-[#0B4D2B]/30 hover:bg-[#0B4D2B]/5 transition-all shadow-sm"
        >
          <ArrowLeft className="h-4 w-4 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
          <p className="text-gray-500 mt-0.5 text-sm">Fill in the details below to add a product to your store.</p>
        </div>
      </div>

      {/* Guide Banner */}
      <div className="bg-[#0B4D2B]/5 border border-[#0B4D2B]/15 rounded-2xl p-4 flex items-start gap-3">
        <span className="text-xl mt-0.5">📋</span>
        <div className="text-sm text-[#0B4D2B]">
          <strong>How to add a product:</strong>
          <ol className="mt-1.5 space-y-0.5 text-[#0B4D2B]/80 list-decimal list-inside">
            <li>Fill in the <strong>Product Name</strong> and select a <strong>Category</strong></li>
            <li>Add at least one <strong>Size Variant</strong> with its price (e.g. 500ml → ₹250)</li>
            <li>Upload a <strong>Primary Image</strong> — this is the main photo shown on the product card</li>
            <li>Set <strong>Status to Published</strong> to make it visible on the website</li>
            <li>Check <strong>Featured Product</strong> if you want it on the Homepage (max 3)</li>
          </ol>
        </div>
      </div>

      <ProductForm categories={categories} />
    </div>
  );
}
