import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";
import { getSession } from "@/features/auth/session";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(req: NextRequest) {
  try {
    // 1. Auth Check (Only admin can upload)
    const session = req.cookies.get("session")?.value;
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Parse FormData
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = formData.get("folder") as string || "general"; // 'products' or 'categories'

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // 3. Validate Type & Size
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Only images are allowed" }, { status: 400 });
    }
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File size exceeds 5MB limit" }, { status: 400 });
    }

    // 4. Read file buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 5. Optimize & Convert to WebP via Sharp
    const optimizedBuffer = await sharp(buffer)
      .resize({
        width: 1920,
        withoutEnlargement: true, // Don't enlarge if smaller than 1920
      })
      .webp({ quality: 80 })
      .toBuffer();

    // 6. Generate path and save
    const filename = `${uuidv4()}.webp`;
    const uploadDir = path.join(process.cwd(), "public", "uploads", folder);
    
    // Ensure directory exists
    await mkdir(uploadDir, { recursive: true });
    
    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, optimizedBuffer);

    // 7. Return the public URL
    const publicUrl = `/uploads/${folder}/${filename}`;

    return NextResponse.json({ url: publicUrl }, { status: 201 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
  }
}
