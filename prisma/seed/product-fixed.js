const { PrismaClient } = require('@prisma/client');
const { v4: uuidv4 } = require('uuid');
const prisma = new PrismaClient();

async function main() {
  // First, let's check if categories exist
  const categories = await prisma.category.findMany();
  console.log(
    'Available categories:',
    categories.map((c) => ({ id: c.id, name: c.name })),
  );

  const products = [
    {
      id: uuidv4(),
      origin: 'Nhật Bản',
      expirationDate: new Date('2024-12-31'),
      supplierId: '8ad46788-202e-4826-b588-f749c3fc0d56', // ASIA
      categoryId: '31acfe58-ff0a-43b5-9160-771f30ae4957', // Cá tươi sống
      productCode: `PRD-${Date.now()}-1`,
      isFeatured: true,
      variants: {
        create: [
          { name: 'Khay 200g', price: 145000, stock: 100, unit: 'gram' },
          { name: 'Khay 300g', price: 215000, stock: 200, unit: 'gram' },
          { name: 'Size 1kg', price: 469000, stock: 50, unit: 'kg' },
          { name: 'Size 5.5kg', price: 2579000, stock: 50, unit: 'kg' },
          { name: 'Size 6kg', price: 2814000, stock: 50, unit: 'kg' },
        ],
      },
      images: {
        create: [{ url: '/images/ca/ca-cam/3.-Kanpachi.jpg' }],
      },
      translations: {
        create: [
          {
            language: 'vn',
            name: 'Cá Cam',
            description: 'Cá Cam Kanpachi Nhật Bản (Yellowtail Fillet)',
          },
          {
            language: 'en',
            name: 'Yellowtail Fillet',
            description: 'Japanese Yellowtail Kanpachi',
          },
          {
            language: 'jp',
            name: 'イエローテイルフィレ',
            description: '日本のカンパチ (Yellowtail)',
          },
        ],
      },
    },
    {
      id: uuidv4(),
      origin: 'Nhật Bản',
      expirationDate: new Date('2024-12-31'),
      supplierId: '8ad46788-202e-4826-b588-f749c3fc0d56', // ASIA
      categoryId: '31acfe58-ff0a-43b5-9160-771f30ae4957', // Cá tươi sống
      productCode: `PRD-${Date.now()}-2`,
      isFeatured: true,
      variants: {
        create: [
          { name: 'Khay 200g', price: 145000, stock: 100, unit: 'gram' },
          { name: 'Khay 300g', price: 215000, stock: 200, unit: 'gram' },
          { name: 'Size 1kg', price: 469000, stock: 50, unit: 'kg' },
          { name: 'Size 5.5kg', price: 2579000, stock: 50, unit: 'kg' },
          { name: 'Size 6kg', price: 2814000, stock: 50, unit: 'kg' },
        ],
      },
      images: {
        create: [{ url: '/images/ca/ca-do-kinki/10.-Kinki-768x512.jpg' }],
      },
      translations: {
        create: [
          {
            language: 'vn',
            name: 'Cá Đỏ Kinki',
            description:
              'Cá đỏ Kinki – Hải sản tươi cao cấp, quý hiếm Nhật Bản',
          },
          {
            language: 'en',
            name: 'Red Kinki Fish',
            description: 'Premium fresh Kinki fish from Japan',
          },
          {
            language: 'jp',
            name: 'キンキ',
            description: '日本の高級な新鮮なキンキ魚',
          },
        ],
      },
    },
    {
      id: uuidv4(),
      origin: 'Nhật Bản',
      expirationDate: new Date('2024-12-31'),
      supplierId: '8ad46788-202e-4826-b588-f749c3fc0d56', // ASIA
      categoryId: '31acfe58-ff0a-43b5-9160-771f30ae4957', // Cá tươi sống
      productCode: `PRD-${Date.now()}-3`,
      isFeatured: true,
      variants: {
        create: [
          { name: 'Khay 200g', price: 145000, stock: 100, unit: 'gram' },
          { name: 'Khay 300g', price: 215000, stock: 200, unit: 'gram' },
          { name: 'Size 1kg', price: 469000, stock: 50, unit: 'kg' },
          { name: 'Size 5.5kg', price: 2579000, stock: 50, unit: 'kg' },
          { name: 'Size 6kg', price: 2814000, stock: 50, unit: 'kg' },
        ],
      },
      images: {
        create: [{ url: '/images/ca/ca-hong-matvang/7.-Kinmedai-768x474.jpg' }],
      },
      translations: {
        create: [
          {
            language: 'vn',
            name: 'Cá Hồng Mắt Vàng',
            description:
              'Cá hồng mắt vàng Kinmedai – Biểu tượng may mắn Nhật Bản',
          },
          {
            language: 'en',
            name: 'Golden-eye Red Snapper',
            description: "Kinmedai – Japan's lucky fish",
          },
          { language: 'jp', name: '金目鯛', description: '日本の幸運の魚' },
        ],
      },
    },
    {
      id: uuidv4(),
      origin: 'Nhật Bản',
      expirationDate: new Date('2024-12-31'),
      supplierId: '8ad46788-202e-4826-b588-f749c3fc0d56', // ASIA
      categoryId: '31acfe58-ff0a-43b5-9160-771f30ae4957', // Cá tươi sống
      productCode: `PRD-${Date.now()}-4`,
      isFeatured: true,
      variants: {
        create: [
          { name: 'Khay 200g', price: 145000, stock: 100, unit: 'gram' },
          { name: 'Khay 300g', price: 215000, stock: 200, unit: 'gram' },
          { name: 'Size 1kg', price: 469000, stock: 50, unit: 'kg' },
          { name: 'Size 5.5kg', price: 2579000, stock: 50, unit: 'kg' },
          { name: 'Size 6kg', price: 2814000, stock: 50, unit: 'kg' },
        ],
      },
      images: {
        create: [{ url: '/images/ca/ca-kiem/5.-Mekajiki.jpg' }],
      },
      translations: {
        create: [
          {
            language: 'vn',
            name: 'Cá kiếm',
            description: 'Cá kiếm – Mekajiki',
          },
          {
            language: 'en',
            name: 'Swordfish',
            description: 'Swordfish – Mekajiki',
          },
          { language: 'jp', name: 'メカジキ', description: 'メカジキのフィレ' },
        ],
      },
    },
    {
      id: uuidv4(),
      origin: 'Nhật Bản',
      expirationDate: new Date('2024-12-31'),
      supplierId: '8ad46788-202e-4826-b588-f749c3fc0d56', // ASIA
      categoryId: '31acfe58-ff0a-43b5-9160-771f30ae4957', // Cá tươi sống
      productCode: `PRD-${Date.now()}-5`,
      isFeatured: true,
      variants: {
        create: [
          { name: 'Khay 200g', price: 145000, stock: 100, unit: 'gram' },
          { name: 'Khay 300g', price: 215000, stock: 200, unit: 'gram' },
          { name: 'Size 1kg', price: 469000, stock: 50, unit: 'kg' },
        ],
      },
      images: {
        create: [{ url: '/images/ca/ca-ngu-vay-xanh/5.-Maguro.jpg' }],
      },
      translations: {
        create: [
          {
            language: 'vn',
            name: 'Cá ngừ vây xanh',
            description: 'Cá ngừ vây xanh – Maguro',
          },
          {
            language: 'en',
            name: 'Bluefin Tuna',
            description: 'Bluefin Tuna – Maguro',
          },
          {
            language: 'jp',
            name: 'ブルーフィンツナ',
            description: 'ブルーフィンツナ – Maguro',
          },
        ],
      },
    },
  ];

  console.log(`Creating ${products.length} products...`);

  for (const [index, product] of products.entries()) {
    try {
      const createdProduct = await prisma.product.create({
        data: product,
        include: {
          translations: true,
          variants: true,
          images: true,
        },
      });
      console.log(
        `✅ Created product ${index + 1}: ${createdProduct.translations[0]?.name || 'Unknown'}`,
      );
    } catch (error) {
      console.error(`❌ Failed to create product ${index + 1}:`, error.message);
    }
  }

  console.log('✅ Product seeding completed.');
}

main()
  .catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
