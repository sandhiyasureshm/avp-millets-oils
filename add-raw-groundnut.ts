import { PrismaClient } from "@prisma/client";

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
  console.log("Adding Natural Raw category and Groundnuts product...");

  // 1. Create the Natural Raw Category
  const categoryName = "Natural Raw";
  const catSlug = slugify(categoryName);
  
  const category = await prisma.category.upsert({
    where: { slug: catSlug },
    update: {},
    create: {
      name: categoryName,
      slug: catSlug,
      description: "Farm-fresh, naturally grown raw products straight from our fields.",
      image: "/images/home/product-groundnut.png",
      sortOrder: 4,
      status: "Published",
    },
  });
  console.log(`Created/Verified category: ${category.name}`);

  // 2. Create the Raw Groundnut Product
  const productName = "Raw Groundnuts (Peanuts)";
  const prodSlug = slugify(productName);
  
  const product = await prisma.product.upsert({
    where: { slug: prodSlug },
    update: {},
    create: {
      name: productName,
      slug: prodSlug,
      description: "Premium quality, sun-dried raw groundnuts. Handpicked from our organic farms, perfect for snacking, cooking, or making peanut butter.",
      categoryId: category.id,
      benefits: ["High in Protein", "Heart Healthy Fats", "Rich in Folate", "Fresh from Farm"],
      variants: [
        { size: "500g", price: 80 },
        { size: "1 Kg", price: 150 },
        { size: "5 Kg", price: 700 }
      ],
      images: { primaryImage: "/images/home/product-groundnut.png", gallery: [] },
      isFeatured: false,
      status: "Published",
      stockQuantity: 200,
    },
  });
  console.log(`Created/Verified product: ${product.name}`);

  console.log("Done!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
