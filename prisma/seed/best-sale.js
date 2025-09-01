const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  for (const product of products) {
    await prisma.bestSeller.create({
      data: {
        productId: product.id,
        salesCount: 250,
        name: 'Lên món đón trung thu - Mừng lễ trung thu 2024',
        period: 'Quý 2 năm 2024',
      },
    });
  }
}

main()
  .then(() => {
    console.log('Seeding completed.');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
