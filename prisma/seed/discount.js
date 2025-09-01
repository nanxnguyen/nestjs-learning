const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function generatePromotionCode(index) {
  return `CPM-${index.toString().padStart(6, '0')}`; // CPM-NUMBER++ với định dạng "CPM-000001"
}

function getRandomDiscount(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function main() {
  const productVariants = await prisma.productVariant.findMany();

  // Kiểm tra nếu có sản phẩm trong DB
  if (productVariants.length > 0) {
    let counter = 0;
    for (const variant of productVariants) {
      await prisma.promotion.create({
        data: {
          productVariantId: variant.id,
          discount: getRandomDiscount(10, 60),
          startDate: new Date('2024-09-01'),
          promotionCode: generatePromotionCode(counter), // Cập nhật promotionCode
          endDate: new Date('2024-12-30'),
          description: `Khuyến mãi đặc biệt cho sản phẩm`,
        },
      });
      counter++;
    }
  } else {
    console.log(
      'No products found in the database. Please seed product data first.',
    );
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
