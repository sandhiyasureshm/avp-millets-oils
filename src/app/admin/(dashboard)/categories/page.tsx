import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Pencil, Plus, Tags, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { deleteCategory } from "@/features/categories/actions";

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    where: { isDeleted: false },
    orderBy: { sortOrder: "asc" },
    include: {
      _count: { select: { products: { where: { isDeleted: false } } } },
    },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-500 mt-1 text-sm">Organize your product collections.</p>
        </div>
        <Link href="/admin/categories/new" className="inline-flex items-center gap-2 bg-[#0B4D2B] hover:bg-[#04341B] text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors">
          <Plus className="h-4 w-4" /> Add Category
        </Link>
      </div>

      {/* Tip Banner */}
      <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm text-amber-700 flex items-start gap-3">
        <span className="text-lg">💡</span>
        <div>
          <strong>Frontend Connection:</strong> Categories with <strong>Status: Published</strong> appear as filter
          buttons on the Products page and the Homepage category showcase. The <strong>Name</strong> and <strong>Slug</strong>{" "}
          are used for filtering — keep the slug simple (e.g., <code className="bg-amber-100 px-1 rounded">cold-pressed-oils</code>).
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Tags className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-gray-700 font-semibold mb-2">No categories yet</h3>
            <p className="text-gray-400 text-sm mb-4">Create a category first, then add products to it.</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4 w-16">Image</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Category Name</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Products</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Status</th>
                <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {categories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    {category.image ? (
                      <div className="relative h-12 w-12 rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                        <Image src={category.image} alt={category.name} fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#0B4D2B]/10 to-[#C9A227]/10 border border-gray-100 flex items-center justify-center">
                        <Tags className="h-5 w-5 text-[#0B4D2B]/40" />
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-800 text-sm">{category.name}</div>
                    <div className="text-xs text-gray-400 mt-0.5 font-mono">/{category.slug}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                      {category._count.products} product{category._count.products !== 1 ? "s" : ""}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${
                      category.status === "Published"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}>
                      {category.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/categories/${category.id}/edit`}
                        className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-blue-50 transition-colors"
                      >
                        <Pencil className="h-4 w-4 text-blue-500" />
                      </Link>
                      <form action={async () => {
                        "use server";
                        await deleteCategory(category.id);
                      }}>
                        <Button variant="ghost" size="icon" type="submit" className="hover:bg-red-50 rounded-xl">
                          <Trash2 className="h-4 w-4 text-red-400" />
                        </Button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
