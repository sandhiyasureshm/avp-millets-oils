"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCategory, updateCategory } from "@/features/categories/actions";
import { toast } from "sonner";
import { UploadCloud, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function CategoryForm({ category }: { category?: any }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>(category?.image || "");
  const [isUploading, setIsUploading] = useState(false);

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("folder", "categories");
    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok) {
        setImageUrl(data.url);
        toast.success("Image uploaded!");
      } else {
        toast.error(data.error || "Upload failed");
      }
    } catch {
      toast.error("Upload failed");
    } finally {
      setIsUploading(false);
    }
  }

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    formData.append("image", imageUrl);
    const res = category
      ? await updateCategory(category.id, formData)
      : await createCategory(formData);
    setIsSubmitting(false);
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success(`Category ${category ? "updated" : "created"} successfully!`);
      router.push("/admin/categories");
    }
  }

  return (
    <form action={handleSubmit}>
      <div className="flex gap-6 items-start">

        {/* ── LEFT COLUMN (main fields) ── */}
        <div className="flex-1 min-w-0 space-y-5">

          {/* Basic Info */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <h2 className="font-semibold text-gray-800 text-sm">Category Information</h2>
              <p className="text-xs text-gray-400 mt-0.5">The name is required and the slug is auto-generated from it</p>
            </div>
            <div className="p-6 space-y-5">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Category Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  defaultValue={category?.name}
                  placeholder="e.g. Cold Pressed Oils"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0B4D2B]/20 focus:border-[#0B4D2B]/50 transition-all"
                />
                <p className="text-[11px] text-gray-400">
                  The URL slug will be auto-generated (e.g. "Cold Pressed Oils" → <code className="bg-gray-100 px-1 rounded">/cold-pressed-oils</code>)
                </p>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Description</label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  defaultValue={category?.description}
                  placeholder="Short description about this category shown on the products page..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0B4D2B]/20 focus:border-[#0B4D2B]/50 transition-all resize-none"
                />
              </div>

              {/* Sort Order */}
              <div className="space-y-1.5 max-w-xs">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Sort Order</label>
                <input
                  id="sortOrder"
                  name="sortOrder"
                  type="number"
                  defaultValue={category?.sortOrder || 0}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4D2B]/20 focus:border-[#0B4D2B]/50 transition-all"
                />
                <p className="text-[11px] text-gray-400">Lower number = appears first in the filter list</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT SIDEBAR ── */}
        <div className="w-80 flex-shrink-0 space-y-5">

          {/* Publish Panel */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50">
              <h2 className="font-semibold text-gray-800 text-sm">Publish Settings</h2>
            </div>
            <div className="p-5 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Status</label>
                <div className="relative">
                  <select
                    name="status"
                    defaultValue={category?.status || "Published"}
                    className="w-full appearance-none border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#0B4D2B]/20 focus:border-[#0B4D2B]/50 transition-all"
                  >
                    <option value="Published">✅ Published (Visible)</option>
                    <option value="Draft">📝 Draft (Hidden)</option>
                    <option value="Archived">🗃️ Archived</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
                <p className="text-[11px] text-gray-400">Published categories appear as filter buttons on the Products page</p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isUploading}
                className="w-full flex items-center justify-center gap-2 bg-[#0B4D2B] hover:bg-[#04341B] disabled:opacity-60 text-white font-semibold text-sm py-3 rounded-xl transition-all shadow-lg shadow-[#0B4D2B]/20 mt-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>{category ? "Update Category" : "Save Category →"}</>
                )}
              </button>
              <Link
                href="/admin/categories"
                className="block text-center text-xs text-gray-400 hover:text-gray-600 transition-colors"
              >
                ← Cancel, go back
              </Link>
            </div>
          </div>

          {/* Category Image */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50">
              <h2 className="font-semibold text-gray-800 text-sm">Category Image</h2>
              <p className="text-xs text-gray-400 mt-0.5">Shown on the Products page filter section</p>
            </div>
            <div className="p-5 space-y-3">
              {imageUrl ? (
                <div className="relative rounded-xl overflow-hidden border-2 border-[#0B4D2B]/20 aspect-square">
                  <Image src={imageUrl} alt="Category" fill className="object-cover" />
                  <button
                    type="button"
                    onClick={() => setImageUrl("")}
                    className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-50"
                  >
                    <X className="h-3.5 w-3.5 text-red-500" />
                  </button>
                </div>
              ) : (
                <label className={`flex flex-col items-center justify-center aspect-square border-2 border-dashed rounded-xl cursor-pointer transition-all ${
                  isUploading ? "opacity-50 cursor-not-allowed border-gray-200" : "border-gray-200 hover:border-[#0B4D2B]/40 hover:bg-[#0B4D2B]/2"
                }`}>
                  <UploadCloud className="h-8 w-8 text-gray-300 mb-2" />
                  <p className="text-xs font-medium text-gray-500">{isUploading ? "Uploading..." : "Click to upload"}</p>
                  <p className="text-[10px] text-gray-400 mt-1">JPG, PNG, WEBP · Max 5MB</p>
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    onChange={handleFileUpload}
                    disabled={isUploading}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
