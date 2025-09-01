const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function findProductAndAddVariants() {
  const categoryId = '7f147afc-002c-4c1d-9995-74842812852a'; // Category ID cụ thể

  // Bước 1: Tìm tất cả các sản phẩm có categoryId cụ thể
  const products = await prisma.product.findMany({
    where: {
      categories: {
        some: {
          id: categoryId,
        },
      },
    },
  });
  console.log('products found', products);
  // Kiểm tra xem có sản phẩm nào được tìm thấy không
  if (products.length === 0) {
    console.log('No products found for the given category.');
    return;
  }

  // Bước 2: Thêm các biến thể cho từng sản phẩm tìm được
  for (const product of products) {
    // Tạo thêm biến thể cho sản phẩm này
    await prisma.productVariant.createMany({
      data: [
        {
          name: 'Khay 200g',
          price: 145000,
          stock: 100,
          unit: 'gram',
          productId: product.id,
        },
        {
          name: 'Khay 300g',
          price: 215000,
          stock: 200,
          unit: 'gram',
          productId: product.id,
        },
        {
          name: 'Size 1kg',
          price: 469000,
          stock: 50,
          unit: 'kg',
          productId: product.id,
        },
        {
          name: 'Size 5.5kg',
          price: 2579000,
          stock: 50,
          unit: 'kg',
          productId: product.id,
        },
        {
          name: 'Size 6kg',
          price: 2814000,
          stock: 50,
          unit: 'kg',
          productId: product.id,
        },
      ],
    });
  }
}

findProductAndAddVariants()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
