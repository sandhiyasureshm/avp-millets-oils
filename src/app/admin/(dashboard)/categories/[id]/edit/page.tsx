import { prisma } from "@/lib/db";
import { CategoryForm } from "@/components/admin/forms/CategoryForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const category = await prisma.category.findUnique({ where: { id } });

  if (!category) notFound();

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
          <h1 className="text-2xl font-bold text-gray-900">Edit Category</h1>
          <p className="text-gray-500 mt-0.5 text-sm">Updating: <strong>{category.name}</strong></p>
        </div>
      </div>

      <CategoryForm category={category} />
    </div>
  );
}
