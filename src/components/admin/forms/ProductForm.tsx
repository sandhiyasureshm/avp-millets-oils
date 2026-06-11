"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct, updateProduct } from "@/features/products/actions";
import { toast } from "sonner";
import { UploadCloud, X, Plus, Trash2, ChevronDown, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function ProductForm({ product, categories }: { product?: any; categories: any[] }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [categoryId, setCategoryId] = useState(product?.categoryId || "");
  const [status, setStatus] = useState(product?.status || "Published");
  const [isFeatured, setIsFeatured] = useState(product?.isFeatured || false);
  const [stockQuantity, setStockQuantity] = useState(product?.stockQuantity || 0);

  const [variants, setVariants] = useState<{ size: string; price: number }[]>(
    product?.variants?.length ? product.variants : [{ size: "", price: 0 }]
  );
  const [benefits, setBenefits] = useState<string[]>(
    product?.benefits?.length ? product.benefits : [""]
  );
  const [images, setImages] = useState<{ primaryImage: string; gallery: string[] }>(
    product?.images || { primaryImage: "", gallery: [] }
  );
  const [isUploading, setIsUploading] = useState(false);

  const handleAddVariant = () => setVariants([...variants, { size: "", price: 0 }]);
  const handleRemoveVariant = (i: number) => setVariants(variants.filter((_, idx) => idx !== i));
  const handleVariantChange = (i: number, field: "size" | "price", value: string | number) => {
    const v = [...variants]; v[i][field] = value as never; setVariants(v);
  };

  const handleAddBenefit = () => setBenefits([...benefits, ""]);
  const handleRemoveBenefit = (i: number) => setBenefits(benefits.filter((_, idx) => idx !== i));
  const handleBenefitChange = (i: number, value: string) => {
    const b = [...benefits]; b[i] = value; setBenefits(b);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: "primary" | "gallery") => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("folder", "products");
    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok) {
        if (type === "primary") setImages({ ...images, primaryImage: data.url });
        else setImages({ ...images, gallery: [...images.gallery, data.url] });
        toast.success("Image uploaded!");
      } else { toast.error(data.error || "Upload failed"); }
    } catch { toast.error("Upload failed"); }
    finally { setIsUploading(false); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryId) { toast.error("Please select a category"); return; }
    if (!name.trim()) { toast.error("Product name is required"); return; }
    const cleanVariants = variants.filter((v) => v.size.trim() !== "");
    const cleanBenefits = benefits.filter((b) => b.trim() !== "");
    setIsSubmitting(true);
    const data = { name, description, categoryId, status, isFeatured, stockQuantity, variants: cleanVariants, benefits: cleanBenefits, images };
    const res = product ? await updateProduct(product.id, data) : await createProduct(data);
    setIsSubmitting(false);
    if (res.error) { toast.error(res.error); }
    else {
      toast.success(`Product ${product ? "updated" : "created"} successfully!`);
      router.push("/admin/products");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Two-column layout */}
      <div className="flex gap-6 items-start">

        {/* ── LEFT COLUMN (main content) ── */}
        <div className="flex-1 min-w-0 space-y-5">

          {/* Basic Info */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <h2 className="font-semibold text-gray-800 text-sm">Basic Information</h2>
              <p className="text-xs text-gray-400 mt-0.5">The product name and category are required</p>
            </div>
            <div className="p-6 space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="e.g. Wood Pressed Coconut Oil"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0B4D2B]/20 focus:border-[#0B4D2B]/50 transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                      required
                      className="w-full appearance-none border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#0B4D2B]/20 focus:border-[#0B4D2B]/50 transition-all"
                    >
                      <option value="">Select a category...</option>
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>
                  {categories.length === 0 && (
                    <p className="text-xs text-amber-600 mt-1">
                      ⚠️ No categories yet.{" "}
                      <Link href="/admin/categories" className="underline font-medium">Create one first →</Link>
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  placeholder="Describe the product — its origin, traditional process, and health benefits..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0B4D2B]/20 focus:border-[#0B4D2B]/50 transition-all resize-none"
                />
              </div>
            </div>
          </div>

          {/* Pricing & Variants */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <div>
                <h2 className="font-semibold text-gray-800 text-sm">Pricing & Size Variants</h2>
                <p className="text-xs text-gray-400 mt-0.5">Add different sizes with their prices (e.g. 500ml → ₹250)</p>
              </div>
              <button
                type="button"
                onClick={handleAddVariant}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#0B4D2B] bg-[#0B4D2B]/8 hover:bg-[#0B4D2B]/15 px-3 py-2 rounded-lg transition-colors"
              >
                <Plus className="h-3.5 w-3.5" /> Add Size
              </button>
            </div>
            <div className="p-6 space-y-3">
              <div className="grid grid-cols-2 gap-3 mb-1">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-1">Size / Volume</p>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-1">Price (₹)</p>
              </div>
              {variants.map((variant, i) => (
                <div key={i} className="flex items-center gap-3">
                  <input
                    value={variant.size}
                    onChange={(e) => handleVariantChange(i, "size", e.target.value)}
                    placeholder="e.g. 500ml or 1 Litre"
                    className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4D2B]/20 focus:border-[#0B4D2B]/50 transition-all"
                  />
                  <input
                    type="number"
                    value={variant.price || ""}
                    onChange={(e) => handleVariantChange(i, "price", parseFloat(e.target.value) || 0)}
                    placeholder="250"
                    className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4D2B]/20 focus:border-[#0B4D2B]/50 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveVariant(i)}
                    className="w-9 h-9 flex items-center justify-center rounded-xl border border-red-100 text-red-400 hover:bg-red-50 hover:border-red-200 transition-all flex-shrink-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              {variants.length === 0 && (
                <div className="text-center py-6 text-sm text-gray-400 border border-dashed border-gray-200 rounded-xl">
                  No variants yet. Click "Add Size" to add pricing.
                </div>
              )}
            </div>
          </div>

          {/* Product Benefits */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <div>
                <h2 className="font-semibold text-gray-800 text-sm">Product Benefits</h2>
                <p className="text-xs text-gray-400 mt-0.5">Short bullet points shown on the product page</p>
              </div>
              <button
                type="button"
                onClick={handleAddBenefit}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#0B4D2B] bg-[#0B4D2B]/8 hover:bg-[#0B4D2B]/15 px-3 py-2 rounded-lg transition-colors"
              >
                <Plus className="h-3.5 w-3.5" /> Add Benefit
              </button>
            </div>
            <div className="p-6 space-y-3">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#0B4D2B]/10 flex items-center justify-center text-[10px] font-bold text-[#0B4D2B] flex-shrink-0">{i + 1}</span>
                  <input
                    value={benefit}
                    onChange={(e) => handleBenefitChange(i, e.target.value)}
                    placeholder={`e.g. ${["100% Natural & Chemical Free", "Cold Pressed Preserves Nutrients", "Rich in Antioxidants", "No Preservatives Added"][i % 4]}`}
                    className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4D2B]/20 focus:border-[#0B4D2B]/50 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveBenefit(i)}
                    className="w-9 h-9 flex items-center justify-center rounded-xl border border-red-100 text-red-400 hover:bg-red-50 transition-all flex-shrink-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              {benefits.length === 0 && (
                <div className="text-center py-6 text-sm text-gray-400 border border-dashed border-gray-200 rounded-xl">
                  No benefits added yet.
                </div>
              )}
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
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full appearance-none border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#0B4D2B]/20 focus:border-[#0B4D2B]/50 transition-all"
                  >
                    <option value="Published">✅ Published (Visible)</option>
                    <option value="Draft">📝 Draft (Hidden)</option>
                    <option value="Out Of Stock">❌ Out Of Stock</option>
                    <option value="Archived">🗃️ Archived</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Stock Quantity</label>
                <input
                  type="number"
                  min={0}
                  value={stockQuantity}
                  onChange={(e) => setStockQuantity(parseInt(e.target.value) || 0)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4D2B]/20 focus:border-[#0B4D2B]/50 transition-all"
                />
              </div>
              {/* Featured Toggle */}
              <button
                type="button"
                onClick={() => setIsFeatured(!isFeatured)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                  isFeatured
                    ? "bg-[#C9A227]/8 border-[#C9A227]/40"
                    : "bg-gray-50 border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className={`w-5 h-5 rounded-md flex items-center justify-center border-2 transition-all flex-shrink-0 ${
                  isFeatured ? "bg-[#C9A227] border-[#C9A227]" : "border-gray-300"
                }`}>
                  {isFeatured && <span className="text-white text-[10px] font-bold">✓</span>}
                </div>
                <div className="text-left">
                  <p className="text-xs font-semibold text-gray-700 flex items-center gap-1">
                    <Star className="h-3 w-3 text-[#C9A227]" /> Featured on Homepage
                  </p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Shows in the homepage bestsellers</p>
                </div>
              </button>

              {/* Save Button */}
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
                  <>{product ? "Update Product" : "Save & Publish →"}</>
                )}
              </button>
              <Link
                href="/admin/products"
                className="block text-center text-xs text-gray-400 hover:text-gray-600 transition-colors"
              >
                ← Cancel, go back
              </Link>
            </div>
          </div>

          {/* Primary Image */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50">
              <h2 className="font-semibold text-gray-800 text-sm">Primary Image <span className="text-red-500">*</span></h2>
              <p className="text-xs text-gray-400 mt-0.5">Main photo on the product card</p>
            </div>
            <div className="p-5 space-y-3">
              {images.primaryImage ? (
                <div className="relative rounded-xl overflow-hidden border-2 border-[#0B4D2B]/20 aspect-square">
                  <Image src={images.primaryImage} alt="Primary" fill className="object-cover" />
                  <button
                    type="button"
                    onClick={() => setImages({ ...images, primaryImage: "" })}
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
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "primary")} disabled={isUploading} className="hidden" />
                </label>
              )}
            </div>
          </div>

          {/* Gallery Images */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50">
              <h2 className="font-semibold text-gray-800 text-sm">Gallery Images</h2>
              <p className="text-xs text-gray-400 mt-0.5">Optional additional photos</p>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-3 gap-2">
                {images.gallery.map((img, i) => (
                  <div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200">
                    <Image src={img} alt="Gallery" fill className="object-cover" />
                    <button
                      type="button"
                      onClick={() => setImages({ ...images, gallery: images.gallery.filter((_, idx) => idx !== i) })}
                      className="absolute top-1 right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-md"
                    >
                      <X className="h-3 w-3 text-red-500" />
                    </button>
                  </div>
                ))}
                <label className={`aspect-square rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-[#0B4D2B]/30 hover:bg-[#0B4D2B]/2 transition-all ${isUploading ? "opacity-50" : ""}`}>
                  <Plus className="h-5 w-5 text-gray-300" />
                  <span className="text-[10px] text-gray-400 mt-1">Add</span>
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "gallery")} disabled={isUploading} className="hidden" />
                </label>
              </div>
            </div>
          </div>

        </div>
      </div>
    </form>
  );
}
