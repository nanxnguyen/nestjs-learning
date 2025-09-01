const { PrismaClient } = require('@prisma/client');
const { v4: uuidv4 } = require('uuid');
const prisma = new PrismaClient();

async function main() {
  // Get available categories and suppliers
  const categories = await prisma.category.findMany();
  const suppliers = await prisma.supplier.findMany();
  
  console.log('Available categories:', categories.map(c => ({ id: c.id, name: c.name })));
  console.log('Available suppliers:', suppliers.map(s => ({ id: s.id, name: s.name })));

  // Map category names to IDs
  const categoryMap = {
    'Cá tươi sống': categories.find(c => c.name === 'Cá tươi sống')?.id,
    'Tôm': categories.find(c => c.name === 'Tôm')?.id,
    'Mực - Bạch tuột': categories.find(c => c.name === 'Mực - Bạch tuột')?.id,
    'Cua - Ghẹ': categories.find(c => c.name === 'Cua - Ghẹ')?.id,
    'Ngao - Sò - Ốc': categories.find(c => c.name === 'Ngao - Sò - Ốc')?.id,
  };

  const asiaSupplier = suppliers.find(s => s.name === 'ASIA')?.id;

  const products = [
    // Cá products
    {
      id: uuidv4(),
      origin: 'Nhật Bản',
      expirationDate: new Date('2024-12-31'),
      supplierId: asiaSupplier,
      categoryId: categoryMap['Cá tươi sống'],
      productCode: `PRD-${Date.now()}-CA-001`,
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
      supplierId: asiaSupplier,
      categoryId: categoryMap['Cá tươi sống'],
      productCode: `PRD-${Date.now()}-CA-002`,
      isFeatured: true,
      variants: {
        create: [
          { name: 'Khay 200g', price: 145000, stock: 100, unit: 'gram' },
          { name: 'Khay 300g', price: 215000, stock: 200, unit: 'gram' },
          { name: 'Size 1kg', price: 469000, stock: 50, unit: 'kg' },
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
            description: 'Cá đỏ Kinki – Hải sản tươi cao cấp, quý hiếm Nhật Bản',
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
      supplierId: asiaSupplier,
      categoryId: categoryMap['Cá tươi sống'],
      productCode: `PRD-${Date.now()}-CA-003`,
      isFeatured: true,
      variants: {
        create: [
          { name: 'Khay 200g', price: 145000, stock: 100, unit: 'gram' },
          { name: 'Khay 300g', price: 215000, stock: 200, unit: 'gram' },
          { name: 'Size 1kg', price: 469000, stock: 50, unit: 'kg' },
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
            description: 'Cá hồng mắt vàng Kinmedai – Biểu tượng may mắn Nhật Bản',
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
      supplierId: asiaSupplier,
      categoryId: categoryMap['Cá tươi sống'],
      productCode: `PRD-${Date.now()}-CA-004`,
      isFeatured: true,
      variants: {
        create: [
          { name: 'Khay 200g', price: 145000, stock: 100, unit: 'gram' },
          { name: 'Khay 300g', price: 215000, stock: 200, unit: 'gram' },
          { name: 'Size 1kg', price: 469000, stock: 50, unit: 'kg' },
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
      supplierId: asiaSupplier,
      categoryId: categoryMap['Cá tươi sống'],
      productCode: `PRD-${Date.now()}-CA-005`,
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
    // Tôm products
    {
      id: uuidv4(),
      origin: 'Canada',
      expirationDate: new Date('2024-12-31'),
      supplierId: asiaSupplier,
      categoryId: categoryMap['Tôm'],
      productCode: `PRD-${Date.now()}-TOM-001`,
      isFeatured: true,
      variants: {
        create: [
          { name: 'Con 500g', price: 745000, stock: 100, unit: 'gram' },
          { name: 'Con 600g', price: 350000, stock: 100, unit: 'gram' },
        ],
      },
      images: {
        create: [{ url: '/images/tom/tom-ngot-botan/tom-ngot-botan-ebi.jpg' }],
      },
      translations: {
        create: [
          {
            language: 'vn',
            name: 'Tôm ngọt Botan Ebi',
            description: 'Tôm ngọt Botan Ebi – Hải sản tươi ngon',
          },
          {
            language: 'en',
            name: 'Botan Ebi Shrimp',
            description: 'Botan Ebi Sweet Shrimp – Fresh and Delicious',
          },
          {
            language: 'jp',
            name: 'ボタンエビ',
            description: '新鮮でおいしいボタンエビ',
          },
        ],
      },
    },
    {
      id: uuidv4(),
      origin: 'Canada',
      expirationDate: new Date('2024-12-31'),
      supplierId: asiaSupplier,
      categoryId: categoryMap['Tôm'],
      productCode: `PRD-${Date.now()}-TOM-002`,
      isFeatured: true,
      variants: {
        create: [
          { name: 'Con 500g', price: 745000, stock: 100, unit: 'gram' },
          { name: 'Con 600g', price: 350000, stock: 100, unit: 'gram' },
        ],
      },
      images: {
        create: [
          { url: '/images/tom/tom-do-canada/22.-Tom-amaebi-768x563.jpg' },
        ],
      },
      translations: {
        create: [
          {
            language: 'vn',
            name: 'Tôm đỏ Canada',
            description: 'Tôm đỏ sashimi Canada tươi ngon',
          },
          {
            language: 'en',
            name: 'Red Shrimp Sashimi Canada',
            description: 'Fresh red shrimp sashimi from Canada',
          },
          {
            language: 'jp',
            name: 'カナダの赤エビ',
            description: 'カナダからの新鮮な赤エビの刺身',
          },
        ],
      },
    },
    // Mực - Bạch tuột products
    {
      id: uuidv4(),
      origin: 'Nhật Bản',
      expirationDate: new Date('2024-12-31'),
      supplierId: asiaSupplier,
      categoryId: categoryMap['Mực - Bạch tuột'],
      productCode: `PRD-${Date.now()}-MUC-001`,
      isFeatured: true,
      variants: {
        create: [
          { name: 'Khay 500g', price: 139000, stock: 100, unit: 'gram' },
          { name: 'Con 300-400g', price: 155000, stock: 100, unit: 'gram' },
        ],
      },
      images: {
        create: [
          { url: '/images/muc/23.-Bach-Tuoc-Nhat-768x537.jpg' },
        ],
      },
      translations: {
        create: [
          {
            language: 'vn',
            name: 'Bạch tuộc Nhật sashimi',
            description: 'Bạch tuộc Nhật sashimi ngon tuyệt',
          },
          {
            language: 'en',
            name: 'Japanese Sashimi Octopus',
            description: 'Delicious Japanese Sashimi Octopus',
          },
          {
            language: 'jp',
            name: '日本の刺身タコ',
            description: '美味しい日本の刺身タコ',
          },
        ],
      },
    },
    // Ngao - Sò - Ốc products
    {
      id: uuidv4(),
      origin: 'Canada',
      expirationDate: new Date('2024-12-31'),
      supplierId: asiaSupplier,
      categoryId: categoryMap['Ngao - Sò - Ốc'],
      productCode: `PRD-${Date.now()}-SO-001`,
      isFeatured: true,
      variants: {
        create: [
          {
            name: '500g (100 - 110 con/kg)',
            price: 175000,
            stock: 100,
            unit: 'gram',
          },
          {
            name: '1kg (100 - 110 con/kg)',
            price: 350000,
            stock: 100,
            unit: 'kg',
          },
        ],
      },
      images: {
        create: [{ url: '/images/so/so-do/24.-So-do.jpg' }],
      },
      translations: {
        create: [
          {
            language: 'vn',
            name: 'Sò đỏ Canada',
            description: 'Sò đỏ Canada – Tuyệt tác hương vị biển cả',
          },
          {
            language: 'en',
            name: 'Red Clam',
            description: 'Red Clam from Canada – A masterpiece of sea flavor',
          },
          {
            language: 'jp',
            name: '赤い貝',
            description: 'カナダからの赤い貝 – 海の味の傑作',
          },
        ],
      },
    },
    {
      id: uuidv4(),
      origin: 'Nhật Bản',
      expirationDate: new Date('2024-12-31'),
      supplierId: asiaSupplier,
      categoryId: categoryMap['Ngao - Sò - Ốc'],
      productCode: `PRD-${Date.now()}-SO-002`,
      isFeatured: true,
      variants: {
        create: [
          {
            name: '500g (100 - 110 con/kg)',
            price: 175000,
            stock: 100,
            unit: 'gram',
          },
          {
            name: '1kg (100 - 110 con/kg)',
            price: 350000,
            stock: 100,
            unit: 'kg',
          },
        ],
      },
      images: {
        create: [{ url: '/images/so/so-diep/21.-So-diep.jpg' }],
      },
      translations: {
        create: [
          {
            language: 'vn',
            name: 'Sò điệp Nhật',
            description: 'Sò điệp Nhật tươi ngon',
          },
          {
            language: 'en',
            name: 'Japanese Scallop',
            description: 'Fresh Japanese Scallop',
          },
          {
            language: 'jp',
            name: '日本のホタテ',
            description: '新鮮な日本のホタテ',
          },
        ],
      },
    },
    {
      id: uuidv4(),
      origin: 'Nhật Bản',
      expirationDate: new Date('2024-12-31'),
      supplierId: asiaSupplier,
      categoryId: categoryMap['Ngao - Sò - Ốc'],
      productCode: `PRD-${Date.now()}-HAU-001`,
      isFeatured: true,
      variants: {
        create: [
          { name: 'Túi 1kg', price: 199000, stock: 100, unit: 'kg' },
          { name: 'Túi 20 con', price: 100000, stock: 200, unit: 'piece' },
          { name: 'Túi 30 con', price: 150000, stock: 200, unit: 'piece' },
        ],
      },
      images: {
        create: [
          { url: '/images/hau/hau-hyogo/18.-Hau-Hyogo-1.jpg' },
        ],
      },
      translations: {
        create: [
          {
            language: 'vn',
            name: 'Hàu Hyogo',
            description: 'Hàu Hyogo tươi ngon từ Nhật Bản',
          },
          {
            language: 'en',
            name: 'Hyogo Oyster',
            description: 'Fresh Hyogo Oyster from Japan',
          },
          {
            language: 'jp',
            name: '兵庫のカキ',
            description: '日本からの新鮮な兵庫のカキ',
          },
        ],
      },
    },
    // Cua - Ghẹ products
    {
      id: uuidv4(),
      origin: 'Nhật Bản',
      expirationDate: new Date('2024-12-31'),
      supplierId: asiaSupplier,
      categoryId: categoryMap['Cua - Ghẹ'],
      productCode: `PRD-${Date.now()}-CUA-001`,
      isFeatured: true,
      variants: {
        create: [
          { name: 'Con 1 Kg', price: 1790000, stock: 100, unit: 'kg' },
          {
            name: '1 Con (1.2-1.5kg)',
            price: 2390000,
            stock: 50,
            unit: 'kg',
          },
        ],
      },
      images: {
        create: [{ url: '/images/cua/cua-long/kegani.jpg' }],
      },
      translations: {
        create: [
          {
            language: 'vn',
            name: 'Cua lông Kegani',
            description: 'Khám phá hương vị thuần khiết của cua lông Nhật',
          },
          {
            language: 'en',
            name: 'Kegani Crab',
            description: 'Discover the pure taste of Japanese Kegani crab',
          },
          {
            language: 'jp',
            name: '毛蟹',
            description: '日本の毛蟹の純粋な味を発見する',
          },
        ],
      },
    },
  ];

  console.log(`Creating ${products.length} products...`);

  for (const [index, product] of products.entries()) {
    try {
      // Add delay to ensure unique timestamps for productCode
      await new Promise(resolve => setTimeout(resolve, 10));
      
      const createdProduct = await prisma.product.create({
        data: product,
        include: {
          translations: true,
          variants: true,
          images: true,
        },
      });
      console.log(`✅ Created product ${index + 1}: ${createdProduct.translations[0]?.name || 'Unknown'}`);
    } catch (error) {
      console.error(`❌ Failed to create product ${index + 1}:`, error.message);
    }
  }

  console.log('✅ Complete product seeding finished.');
}

main()
  .catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

