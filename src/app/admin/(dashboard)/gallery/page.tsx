import { prisma } from "@/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { deleteGalleryImage } from "@/features/gallery/actions";
import { AddGallerySheet } from "@/components/admin/gallery/GallerySheet";

export default async function GalleryPage() {
  const images = await prisma.gallery.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gallery</h1>
          <p className="text-gray-500 mt-2">Manage photos of your farm, production, and products.</p>
        </div>
        <AddGallerySheet />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img) => (
          <Card key={img.id} className="overflow-hidden group relative">
            <div className="relative aspect-square">
              <Image src={img.imagePath} alt={img.caption || "Gallery"} fill className="object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                <div className="flex justify-end">
                  <form
                    action={async () => {
                      "use server";
                      await deleteGalleryImage(img.id);
                    }}
                  >
                    <Button variant="destructive" size="icon" className="h-8 w-8">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
                {img.caption && (
                  <p className="text-white text-sm font-medium truncate">{img.caption}</p>
                )}
              </div>
            </div>
          </Card>
        ))}
        {images.length === 0 && (
          <div className="col-span-full py-12 text-center text-muted-foreground border rounded-lg border-dashed">
            No gallery images found. Upload some to showcase your work.
          </div>
        )}
      </div>
    </div>
  );
}
