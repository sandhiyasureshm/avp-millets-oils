import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const count = await prisma.admin.count();
  console.log("Admin count:", count);
}
main().catch(console.error).finally(() => prisma.$disconnect());
