"use client";

import { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { GalleryForm } from "@/components/admin/forms/GalleryForm";
import { Plus } from "lucide-react";

export function AddGallerySheet() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className={buttonVariants({ variant: "default" })}>
        <Plus className="mr-2 h-4 w-4" /> Add Image
      </SheetTrigger>
      <SheetContent className="sm:max-w-md overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle>Add to Gallery</SheetTitle>
        </SheetHeader>
        <GalleryForm
          onSuccess={() => {
            setOpen(false);
            window.location.reload();
          }}
        />
      </SheetContent>
    </Sheet>
  );
}
