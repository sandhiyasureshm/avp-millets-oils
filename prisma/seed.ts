import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

async function main() {
  console.log("Seeding database with Products & Categories...");

  // 1. Create Categories
  const categoriesData = [
    { name: "Wood Pressed Oils", description: "100% pure, natural, and cold-pressed oils.", image: "/images/home/hero-oils.png", sortOrder: 1 },
    { name: "Millets", description: "Healthy and organic millets straight from the farm.", image: "/images/home/product-millet.png", sortOrder: 2 },
    { name: "Spices & Powders", description: "Authentic, freshly ground spices and powders.", image: "/images/home/product-chilli.png", sortOrder: 3 },
  ];

  const categoryMap: Record<string, string> = {};

  for (const cat of categoriesData) {
    const slug = slugify(cat.name);
    const category = await prisma.category.upsert({
      where: { slug },
      update: {},
      create: {
        name: cat.name,
        slug: slug,
        description: cat.description,
        image: cat.image,
        sortOrder: cat.sortOrder,
        status: "Published",
      },
    });
    categoryMap[cat.name] = category.id;
    console.log(`Created category: ${cat.name}`);
  }

  // 2. Create Products
  const productsData = [
    {
      name: "Wood Pressed Groundnut Oil",
      categoryName: "Wood Pressed Oils",
      description: "Extracted using traditional wooden churners (Mara Chekku) at low temperatures to retain all natural nutrients, aroma, and flavor.",
      benefits: ["100% Natural & Unrefined", "Rich in Antioxidants", "Heart Healthy", "No Preservatives Added"],
      variants: [{ size: "500ml", price: 220 }, { size: "1 Litre", price: 420 }, { size: "5 Litres", price: 2000 }],
      images: { primaryImage: "/images/home/Groundnut-oil.png", gallery: [] },
      isFeatured: true,
      stockQuantity: 100,
    },
    {
      name: "Wood Pressed Gingelly Oil",
      categoryName: "Wood Pressed Oils",
      description: "Made from premium quality sesame seeds and palm jaggery. Perfect for cooking, oil pulling, and traditional uses.",
      benefits: ["Great for Skin & Hair", "High in Vitamin E", "Traditional Recipe", "Improves Digestion"],
      variants: [{ size: "500ml", price: 280 }, { size: "1 Litre", price: 540 }, { size: "5 Litres", price: 2600 }],
      images: { primaryImage: "/images/home/Gingelly-oil.png", gallery: [] },
      isFeatured: true,
      stockQuantity: 50,
    },
    {
      name: "Wood Pressed Coconut Oil",
      categoryName: "Wood Pressed Oils",
      description: "Pure, unroasted coconut oil made from sun-dried copras. Excellent for cooking, baking, hair, and skin care.",
      benefits: ["Nourishes Hair", "Boosts Immunity", "Natural Moisturizer", "Chemical Free"],
      variants: [{ size: "500ml", price: 240 }, { size: "1 Litre", price: 460 }, { size: "5 Litres", price: 2200 }],
      images: { primaryImage: "/images/home/coconut-oil.png", gallery: [] },
      isFeatured: true,
      stockQuantity: 80,
    },
    {
      name: "Pure Ragi Flour",
      categoryName: "Millets",
      description: "Freshly milled Ragi (Finger Millet) flour. A powerhouse of calcium and essential amino acids.",
      benefits: ["High in Calcium", "Gluten Free", "Helps in Weight Loss", "Good for Babies"],
      variants: [{ size: "500g", price: 60 }, { size: "1 Kg", price: 110 }],
      images: { primaryImage: "/images/home/product-ragi.png", gallery: [] },
      isFeatured: false,
      stockQuantity: 150,
    },
    {
      name: "Mixed Millet Grains",
      categoryName: "Millets",
      description: "A nutritious blend of unpolished foxtail, little, kodo, and barnyard millets.",
      benefits: ["Low GI Index", "Rich in Dietary Fiber", "Diabetic Friendly", "Organic"],
      variants: [{ size: "500g", price: 90 }, { size: "1 Kg", price: 170 }],
      images: { primaryImage: "/images/home/product-millet.png", gallery: [] },
      isFeatured: false,
      stockQuantity: 200,
    },
    {
      name: "Traditional Red Chilli Powder",
      categoryName: "Spices & Powders",
      description: "Ground from carefully selected, sun-dried red chillies to give your dishes the perfect vibrant color and authentic heat.",
      benefits: ["Vibrant Natural Color", "Authentic Heat", "No Artificial Colors", "Hygienically Ground"],
      variants: [{ size: "250g", price: 120 }, { size: "500g", price: 230 }],
      images: { primaryImage: "/images/home/product-chilli.png", gallery: [] },
      isFeatured: false,
      stockQuantity: 120,
    }
  ];

  for (const prod of productsData) {
    const slug = slugify(prod.name);
    await prisma.product.upsert({
      where: { slug },
      update: {},
      create: {
        name: prod.name,
        slug: slug,
        description: prod.description,
        categoryId: categoryMap[prod.categoryName],
        benefits: prod.benefits,
        variants: prod.variants,
        images: prod.images,
        isFeatured: prod.isFeatured,
        status: "Published",
        stockQuantity: prod.stockQuantity,
      },
    });
    console.log(`Created product: ${prod.name}`);
  }

  // 3. Keep the default settings and admin user seeding intact
  const adminEmail = "admin@avpoils.com";
  const existingAdmin = await prisma.admin.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("Admin@123", 10);
    await prisma.admin.create({
      data: { email: adminEmail, password: hashedPassword, name: "AVP Admin" },
    });
    console.log(`Created default admin: ${adminEmail}`);
  }

  const defaultSettings = [
    { key: "HERO_HEADLINE", value: "Pure Traditional Oils From Nature" },
    { key: "HERO_SUBHEADLINE", value: "Wood Pressed • Chemical Free • Farm Fresh" },
    { key: "WHATSAPP_NUMBER", value: "916369458303" },
    { key: "CONTACT_EMAIL", value: "contact@avpoils.com" },
    { key: "CONTACT_PHONE", value: "+91 63694 58303" },
    { key: "ADDRESS", value: "Venkitampalayan Main Road, Adamanagalam Pudur, Tiruvannamalai – 606901" },
  ];

  for (const setting of defaultSettings) {
    await prisma.homepageSetting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    });
  }

  console.log("Seeding finished successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
