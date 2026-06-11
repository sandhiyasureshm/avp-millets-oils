"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createGalleryImage } from "@/features/gallery/actions";
import { toast } from "sonner";

export function GalleryForm({ onSuccess }: { onSuccess: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "gallery");

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
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
    if (!imageUrl) {
      toast.error("Please upload an image first");
      return;
    }
    
    setIsSubmitting(true);
    formData.append("imagePath", imageUrl);
    const res = await createGalleryImage(formData);
    setIsSubmitting(false);

    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success("Added to gallery!");
      onSuccess();
    }
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Upload Image</Label>
        <Input type="file" accept="image/*" onChange={handleFileUpload} disabled={isUploading} />
        {imageUrl && <p className="text-xs text-green-600 mt-1">Image ready: {imageUrl}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="caption">Caption (Optional)</Label>
        <Input id="caption" name="caption" placeholder="Farm view..." />
      </div>
      <div className="space-y-2">
        <Label htmlFor="category">Category Type</Label>
        <Input id="category" name="category" placeholder="e.g. FARM, PROCESS" defaultValue="GENERAL" />
      </div>
      <Button type="submit" disabled={isSubmitting || isUploading || !imageUrl} className="w-full">
        {isSubmitting ? "Saving..." : "Add to Gallery"}
      </Button>
    </form>
  );
}
