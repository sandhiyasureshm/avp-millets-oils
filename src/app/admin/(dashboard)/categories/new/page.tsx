import { CategoryForm } from "@/components/admin/forms/CategoryForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewCategoryPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/categories"
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-gray-200 hover:border-[#0B4D2B]/30 hover:bg-[#0B4D2B]/5 transition-all shadow-sm"
        >
          <ArrowLeft className="h-4 w-4 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add New Category</h1>
          <p className="text-gray-500 mt-0.5 text-sm">Create a category to group your products (e.g. Oils, Millets, Powders)</p>
        </div>
      </div>

      {/* Tip Banner */}
      <div className="bg-[#0B4D2B]/5 border border-[#0B4D2B]/15 rounded-2xl p-4 flex items-start gap-3">
        <span className="text-xl mt-0.5">💡</span>
        <div className="text-sm text-[#0B4D2B]">
          <strong>Important:</strong> Always <strong>create categories first</strong>, then add products under them.
          Published categories appear as filter buttons on the public Products page.
        </div>
      </div>

      <CategoryForm />
    </div>
  );
}
