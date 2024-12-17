const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Seed Users

}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
