const { PrismaClient } = require('@prisma/client');
const { v4: uuidv4 } = require('uuid');
const prisma = new PrismaClient();

async function main() {
  const products = [
    {
      id: uuidv4(),
      quantityInStock: 150,
      origin: 'Nhật Bản',
      source: 'Imported',
      expirationDate: new Date('2024-12-31'),
      qualityStandard: 'Organic',
      supplierId: '0c3e0cec-c4d9-44fa-abb4-a3bade333f1e',
      categoryId: '7f147afc-002c-4c1d-9995-74842812852a',
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
      isFeatured: true,
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
      quantityInStock: 150,
      origin: 'Nhật Bản',
      source: 'Imported',
      expirationDate: new Date('2024-12-31'),
      qualityStandard: 'Organic',
      supplierId: '0c3e0cec-c4d9-44fa-abb4-a3bade333f1e',
      categoryId: '7f147afc-002c-4c1d-9995-74842812852a',
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
      isFeatured: true,
      translations: {
        create: [
          {
            language: 'vn',
            name: 'Cá Đỏ Kinki',
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
      quantityInStock: 150,
      origin: 'Nhật Bản',
      source: 'Imported',
      expirationDate: new Date('2024-12-31'),
      qualityStandard: 'Organic',
      supplierId: '0c3e0cec-c4d9-44fa-abb4-a3bade333f1e',
      categoryId: '7f147afc-002c-4c1d-9995-74842812852a',
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
      isFeatured: true,
      translations: {
        create: [
          {
            language: 'vn',
            name: 'Cá Hồng Mắt Vàng',
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

      quantityInStock: 150,
      origin: 'Nhật Bản',
      source: 'Imported',
      expirationDate: new Date('2024-12-31'),
      qualityStandard: 'Organic',
      supplierId: '0c3e0cec-c4d9-44fa-abb4-a3bade333f1e',
      categoryId: '7f147afc-002c-4c1d-9995-74842812852a',
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
      isFeatured: true,
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
    // Tiếp tục thêm các sản phẩm còn lại với cùng cấu trúc trên
    {
      id: uuidv4(),

      quantityInStock: 150,
      origin: 'Nhật Bản',
      source: 'Imported',
      expirationDate: new Date('2024-12-31'),
      qualityStandard: 'Organic',
      supplierId: '0c3e0cec-c4d9-44fa-abb4-a3bade333f1e',
      categoryId: '7f147afc-002c-4c1d-9995-74842812852a',
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
      isFeatured: true,
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
    {
      id: uuidv4(),

      quantityInStock: 150,
      origin: 'Nhật Bản',
      source: 'Imported',
      expirationDate: new Date('2024-12-31'),
      qualityStandard: 'Organic',
      supplierId: '0c3e0cec-c4d9-44fa-abb4-a3bade333f1e',
      categoryId: '7f147afc-002c-4c1d-9995-74842812852a',
      variants: {
        create: [
          { name: 'Khay 200g', price: 145000, stock: 100, unit: 'gram' },
          { name: 'Khay 300g', price: 215000, stock: 200, unit: 'gram' },
          { name: 'Size 1kg', price: 469000, stock: 50, unit: 'kg' },
        ],
      },
      images: {
        create: [{ url: '/images/ca/ca-thien-thanh/9.-Kuromutsu.jpg' }],
      },
      isFeatured: true,
      translations: {
        create: [
          {
            language: 'vn',
            name: 'Cá thiên thanh',
            description: 'Cá thiên thanh – Kuromutsu',
          },
          {
            language: 'en',
            name: 'Kuromutsu',
            description: 'Blue Fish – Kuromutsu',
          },
          {
            language: 'jp',
            name: 'クロムツ',
            description: 'クロムツ – 日本の魚',
          },
        ],
      },
    },
    {
      id: uuidv4(),

      quantityInStock: 150,
      origin: 'Canada',
      source: 'Imported',
      expirationDate: new Date('2024-12-31'),
      qualityStandard: 'Organic',
      supplierId: '0c3e0cec-c4d9-44fa-abb4-a3bade333f1e',
      categoryId: 'd12330a4-3408-4362-8c75-3c68611c9975',
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
      isFeatured: true,
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

      quantityInStock: 150,
      origin: 'Canada',
      source: 'Imported',
      expirationDate: new Date('2024-12-31'),
      qualityStandard: 'Organic',
      supplierId: '0c3e0cec-c4d9-44fa-abb4-a3bade333f1e',
      categoryId: '2be5685c-f544-499e-af59-a8d1000ebe3a',
      variants: {
        create: [
          { name: 'Con 500g', price: 745000, stock: 100, unit: 'gram' },
          { name: 'Con 600g', price: 350000, stock: 100, unit: 'gram' },
        ],
      },
      images: {
        create: [{ url: '/images/tom/tom-ngot-botan/tom-ngot-botan-ebi.jpg' }],
      },
      isFeatured: true,
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

      quantityInStock: 150,
      origin: 'Nhật Bản',
      source: 'Imported',
      expirationDate: new Date('2024-12-31'),
      qualityStandard: 'Organic',
      supplierId: '0c3e0cec-c4d9-44fa-abb4-a3bade333f1e',
      categoryId: 'd12330a4-3408-4362-8c75-3c68611c9975',
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
      isFeatured: true,
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
    // Thêm các sản phẩm còn lại vào danh sách `products`...

    {
      id: uuidv4(),

      quantityInStock: 150,
      origin: 'Nhật Bản',
      source: 'Imported',
      expirationDate: new Date('2024-12-31'),
      qualityStandard: 'Organic',
      supplierId: '0c3e0cec-c4d9-44fa-abb4-a3bade333f1e',
      categoryId: 'd12330a4-3408-4362-8c75-3c68611c9975',
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
          {
            url: '/images/hau/hau-hyogo/z4781424165334_2276d055e6a0d89a9aba29c2c4799066-750x800.jpg',
          },
        ],
      },
      isFeatured: true,
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

    {
      id: uuidv4(),

      quantityInStock: 150,
      origin: 'Nhật Bản',
      source: 'Imported',
      expirationDate: new Date('2024-12-31'),
      qualityStandard: 'Organic',
      supplierId: '0c3e0cec-c4d9-44fa-abb4-a3bade333f1e',
      categoryId: '01955ce4-aaa0-4b3a-831e-f33f819bf873',
      variants: {
        create: [
          { name: 'Khay 500g', price: 139000, stock: 100, unit: 'gram' },
          { name: 'Con 300-400g', price: 155000, stock: 100, unit: 'gram' },
        ],
      },
      images: {
        create: [
          { url: '/images/muc/23.-Bach-Tuoc-Nhat-768x537.jpg' },
          {
            url: '/images/muc/z4781440829814_e86bed8ceb2da42650e6a6ff9425c68a-768x768.jpg',
          },
        ],
      },
      isFeatured: true,
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

    {
      id: uuidv4(),

      quantityInStock: 150,
      origin: 'Canada',
      source: 'Imported',
      expirationDate: new Date('2024-12-31'),
      qualityStandard: 'Organic',
      supplierId: '0c3e0cec-c4d9-44fa-abb4-a3bade333f1e',
      categoryId: '2be5685c-f544-499e-af59-a8d1000ebe3a',
      variants: {
        create: [
          { name: 'Con 500g', price: 745000, stock: 100, unit: 'gram' },
          { name: 'Con 600g', price: 350000, stock: 100, unit: 'gram' },
        ],
      },
      images: {
        create: [
          { url: '/images/tom/tom-do-canada/22.-Tom-amaebi-768x563.jpg' },
          {
            url: '/images/tom/tom-do-canada/z4781428073464_203bd05da890c34ab507bc2a8711ca84-768x526.jpg',
          },
        ],
      },
      isFeatured: true,
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

    {
      id: uuidv4(),

      quantityInStock: 150,
      origin: 'Canada',
      source: 'Imported',
      expirationDate: new Date('2024-12-31'),
      qualityStandard: 'Organic',
      supplierId: '0c3e0cec-c4d9-44fa-abb4-a3bade333f1e',
      categoryId: 'd12330a4-3408-4362-8c75-3c68611c9975',
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
        create: [{ url: '/images/so/so-do/24.-So-do-768x536.jpg' }],
      },
      isFeatured: true,
      translations: {
        create: [
          {
            language: 'vn',
            name: 'Sò đỏ Canada',
            description: 'Sò đỏ Canada – Tuyệt tác hương vị biển cả',
          },
          {
            language: 'en',
            name: 'Canadian Red Clam',
            description: 'Masterpiece of sea flavor from Canada',
          },
          {
            language: 'jp',
            name: 'カナダの赤貝',
            description: 'カナダからの海の味の傑作',
          },
        ],
      },
    },

    // Tiếp tục thêm các sản phẩm khác tương tự...
    // Thêm các sản phẩm còn lại vào danh sách `products`...

    {
      id: uuidv4(),

      quantityInStock: 150,
      origin: 'Nhật Bản',
      source: 'Imported',
      expirationDate: new Date('2024-12-31'),
      qualityStandard: 'Organic',
      supplierId: '0c3e0cec-c4d9-44fa-abb4-a3bade333f1e',
      categoryId: 'd12330a4-3408-4362-8c75-3c68611c9975',
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
          {
            url: '/images/hau/hau-hyogo/z4781424165334_2276d055e6a0d89a9aba29c2c4799066-750x800.jpg',
          },
        ],
      },
      isFeatured: true,
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

    {
      id: uuidv4(),

      quantityInStock: 150,
      origin: 'Nhật Bản',
      source: 'Imported',
      expirationDate: new Date('2024-12-31'),
      qualityStandard: 'Organic',
      supplierId: '0c3e0cec-c4d9-44fa-abb4-a3bade333f1e',
      categoryId: '01955ce4-aaa0-4b3a-831e-f33f819bf873',
      variants: {
        create: [
          { name: 'Khay 500g', price: 139000, stock: 100, unit: 'gram' },
          { name: 'Con 300-400g', price: 155000, stock: 100, unit: 'gram' },
        ],
      },
      images: {
        create: [
          { url: '/images/muc/23.-Bach-Tuoc-Nhat-768x537.jpg' },
          {
            url: '/images/muc/z4781440829814_e86bed8ceb2da42650e6a6ff9425c68a-768x768.jpg',
          },
        ],
      },
      isFeatured: true,
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

    {
      id: uuidv4(),

      quantityInStock: 150,
      origin: 'Canada',
      source: 'Imported',
      expirationDate: new Date('2024-12-31'),
      qualityStandard: 'Organic',
      supplierId: '0c3e0cec-c4d9-44fa-abb4-a3bade333f1e',
      categoryId: '2be5685c-f544-499e-af59-a8d1000ebe3a',
      variants: {
        create: [
          { name: 'Con 500g', price: 745000, stock: 100, unit: 'gram' },
          { name: 'Con 600g', price: 350000, stock: 100, unit: 'gram' },
        ],
      },
      images: {
        create: [
          { url: '/images/tom/tom-do-canada/22.-Tom-amaebi-768x563.jpg' },
          {
            url: '/images/tom/tom-do-canada/z4781428073464_203bd05da890c34ab507bc2a8711ca84-768x526.jpg',
          },
        ],
      },
      isFeatured: true,
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

    {
      id: uuidv4(),

      quantityInStock: 150,
      origin: 'Canada',
      source: 'Imported',
      expirationDate: new Date('2024-12-31'),
      qualityStandard: 'Organic',
      supplierId: '0c3e0cec-c4d9-44fa-abb4-a3bade333f1e',
      categoryId: 'd12330a4-3408-4362-8c75-3c68611c9975',
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
        create: [{ url: '/images/so/so-do/24.-So-do-768x536.jpg' }],
      },
      isFeatured: true,
      translations: {
        create: [
          {
            language: 'vn',
            name: 'Sò đỏ Canada',
            description: 'Sò đỏ Canada – Tuyệt tác hương vị biển cả',
          },
          {
            language: 'en',
            name: 'Canadian Red Clam',
            description: 'Masterpiece of sea flavor from Canada',
          },
          {
            language: 'jp',
            name: 'カナダの赤貝',
            description: 'カナダからの海の味の傑作',
          },
        ],
      },
    },

    // Tiếp tục thêm các sản phẩm khác tương tự...
    {
      id: uuidv4(),

      quantityInStock: 150,
      origin: 'Nhật Bản',
      source: 'Imported',
      expirationDate: new Date('2024-12-31'),
      qualityStandard: 'Organic',
      supplierId: '0c3e0cec-c4d9-44fa-abb4-a3bade333f1e',
      categoryId: '6ed29158-0160-4dce-9031-bc3b9e1820a1',
      variants: {
        create: [
          { name: 'Con 1 Kg', price: 1790000, stock: 100, unit: 'gram' },
          {
            name: '1 Con (1.2-1.5kg)',
            price: 2390000,
            stock: 200,
            unit: 'gram',
          },
        ],
      },
      images: {
        create: [{ url: '/images/cua/cua-long/kegani.jpg' }],
      },
      isFeatured: true,
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

    {
      id: uuidv4(),

      quantityInStock: 150,
      origin: 'Nhật Bản',
      source: 'Imported',
      expirationDate: new Date('2024-12-31'),
      qualityStandard: 'Organic',
      supplierId: '0c3e0cec-c4d9-44fa-abb4-a3bade333f1e',
      categoryId: 'd12330a4-3408-4362-8c75-3c68611c9975',
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
        create: [{ url: '/images/oc/oc-xoan-nhatban/tsubugai.jpg' }],
      },
      isFeatured: true,
      translations: {
        create: [
          {
            language: 'vn',
            name: 'Ốc xoắn Nhật',
            description: 'Vua của các loài ốc Nhật Bản',
          },
          {
            language: 'en',
            name: 'Japanese Tsubugai',
            description: 'King of Japanese shellfish',
          },
          { language: 'jp', name: 'つぶ貝', description: '日本の貝の王様' },
        ],
      },
    },

    {
      id: uuidv4(),

      quantityInStock: 150,
      origin: 'Canada',
      source: 'Imported',
      expirationDate: new Date('2024-12-31'),
      qualityStandard: 'Organic',
      supplierId: '0c3e0cec-c4d9-44fa-abb4-a3bade333f1e',
      categoryId: 'd12330a4-3408-4362-8c75-3c68611c9975',
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
        create: [{ url: '/images/so/so-do/so-do-canada.jpg' }],
      },
      isFeatured: true,
      translations: {
        create: [
          {
            language: 'vn',
            name: 'Sò đỏ Canada',
            description: 'Tuyệt tác hương vị biển cả từ Canada',
          },
          {
            language: 'en',
            name: 'Canadian Red Clam',
            description: 'Masterpiece of sea flavor from Canada',
          },
          {
            language: 'jp',
            name: 'カナダの赤い貝',
            description: 'カナダからの海の味の傑作',
          },
        ],
      },
    },

    {
      id: uuidv4(),

      quantityInStock: 150,
      origin: 'Canada',
      source: 'Imported',
      expirationDate: new Date('2024-12-31'),
      qualityStandard: 'Organic',
      supplierId: '0c3e0cec-c4d9-44fa-abb4-a3bade333f1e',
      categoryId: '2be5685c-f544-499e-af59-a8d1000ebe3a',
      variants: {
        create: [
          { name: 'Con 500g', price: 745000, stock: 100, unit: 'gram' },
          { name: 'Con 600g', price: 350000, stock: 100, unit: 'gram' },
        ],
      },
      images: {
        create: [{ url: '/images/tom/tom-kuruma/kuruma-ebi.jpg' }],
      },
      isFeatured: true,
      translations: {
        create: [
          {
            language: 'vn',
            name: 'Tôm Kuruma Ebi',
            description: 'Tôm nhập khẩu từ Canada',
          },
          {
            language: 'en',
            name: 'Kuruma Shrimp',
            description: 'Imported shrimp from Canada',
          },
          {
            language: 'jp',
            name: '車エビ',
            description: 'カナダから輸入した車エビ',
          },
        ],
      },
    },

    // Tiếp tục thêm các sản phẩm khác nếu cần thiết.
    {
      id: uuidv4(),

      quantityInStock: 150,
      origin: 'Nhật Bản',
      source: 'Imported',
      expirationDate: new Date('2024-12-31'),
      qualityStandard: 'Organic',
      supplierId: '0c3e0cec-c4d9-44fa-abb4-a3bade333f1e',
      categoryId: 'd12330a4-3408-4362-8c75-3c68611c9975',
      variants: {
        create: [
          { name: 'Túi 1kg', price: 199000, stock: 100, unit: 'kg' },
          { name: 'Túi 20 con', price: 100000, stock: 200, unit: 'kg' },
        ],
      },
      images: {
        create: [{ url: '/images/hau/hau-miyagi/hau-miyagi-1.jpg' }],
      },
      isFeatured: true,
      translations: {
        create: [
          {
            language: 'vn',
            name: 'Hàu Miyagi',
            description: 'Hàu nhập khẩu từ Nhật Bản',
          },
          {
            language: 'en',
            name: 'Miyagi Oyster',
            description: 'Imported oyster from Japan',
          },
          {
            language: 'jp',
            name: 'ミヤギカキ',
            description: '日本から輸入された牡蠣',
          },
        ],
      },
    },

    {
      id: uuidv4(),

      quantityInStock: 150,
      origin: 'Nhật Bản',
      source: 'Imported',
      expirationDate: new Date('2024-12-31'),
      qualityStandard: 'Organic',
      supplierId: '0c3e0cec-c4d9-44fa-abb4-a3bade333f1e',
      categoryId: 'd12330a4-3408-4362-8c75-3c68611c9975',
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
        create: [{ url: '/images/so/so-diep/so-diep-nhat.jpg' }],
      },
      isFeatured: true,
      translations: {
        create: [
          {
            language: 'vn',
            name: 'Sò điệp Nhật',
            description: 'Sò điệp chất lượng từ Nhật Bản',
          },
          {
            language: 'en',
            name: 'Japanese Scallop',
            description: 'High-quality scallop from Japan',
          },
          {
            language: 'jp',
            name: '日本のホタテ',
            description: '高品質の日本産ホタテ',
          },
        ],
      },
    },

    {
      id: uuidv4(),

      quantityInStock: 150,
      origin: 'Canada',
      source: 'Imported',
      expirationDate: new Date('2024-12-31'),
      qualityStandard: 'Organic',
      supplierId: '0c3e0cec-c4d9-44fa-abb4-a3bade333f1e',
      categoryId: '2be5685c-f544-499e-af59-a8d1000ebe3a',
      variants: {
        create: [
          { name: 'Con 500g', price: 745000, stock: 100, unit: 'gram' },
          { name: 'Con 600g', price: 350000, stock: 100, unit: 'gram' },
        ],
      },
      images: {
        create: [{ url: '/images/tom/tom-ngot-botan/tom-ngot-botan.jpg' }],
      },
      isFeatured: true,
      translations: {
        create: [
          {
            language: 'vn',
            name: 'Tôm ngọt Botan',
            description: 'Tôm nhập khẩu từ Canada',
          },
          {
            language: 'en',
            name: 'Botan Sweet Shrimp',
            description: 'Imported shrimp from Canada',
          },
          {
            language: 'jp',
            name: 'ボタンエビ',
            description: 'カナダから輸入された甘エビ',
          },
        ],
      },
    },

    // Tiếp tục thêm các sản phẩm khác nếu cần thiết.
    {
      id: uuidv4(),

      quantityInStock: 150,
      origin: 'Nhật Bản',
      source: 'Imported',
      expirationDate: new Date('2024-12-31'),
      qualityStandard: 'Organic',
      supplierId: '0c3e0cec-c4d9-44fa-abb4-a3bade333f1e',
      categoryId: '7f147afc-002c-4c1d-9995-74842812852a',
      variants: {
        create: [
          { name: 'Khay 200g', price: 145000, stock: 100, unit: 'gram' },
          { name: 'Khay 300g', price: 215000, stock: 200, unit: 'gram' },
          { name: 'Size 1kg', price: 469000, stock: 50, unit: 'kg' },
        ],
      },
      images: {
        create: [{ url: '/images/ca/ca-ngu-vay-xanh/ca-ngu.jpg' }],
      },
      isFeatured: true,
      translations: {
        create: [
          {
            language: 'vn',
            name: 'Cá ngừ vây xanh',
            description: 'Cá ngừ tươi ngon từ Nhật Bản',
          },
          {
            language: 'en',
            name: 'Bluefin Tuna',
            description: 'Fresh tuna from Japan',
          },
          { language: 'jp', name: 'マグロ', description: '新鮮な日本のマグロ' },
        ],
      },
    },

    {
      id: uuidv4(),

      quantityInStock: 200,
      origin: 'Nhật Bản',
      source: 'Imported',
      expirationDate: new Date('2025-01-15'),
      qualityStandard: 'Premium',
      supplierId: '0c3e0cec-c4d9-44fa-abb4-a3bade333f1e',
      categoryId: 'd12330a4-3408-4362-8c75-3c68611c9975',
      variants: {
        create: [
          { name: '500g', price: 230000, stock: 80, unit: 'gram' },
          { name: '1kg', price: 450000, stock: 50, unit: 'kg' },
        ],
      },
      images: {
        create: [{ url: '/images/so/so-diep-hokkaido/so-diep.jpg' }],
      },
      isFeatured: false,
      translations: {
        create: [
          {
            language: 'vn',
            name: 'Sò điệp Hokkaido',
            description: 'Đặc sản sò điệp từ Hokkaido',
          },
          {
            language: 'en',
            name: 'Hokkaido Scallop',
            description: 'Special scallop from Hokkaido',
          },
          {
            language: 'jp',
            name: '北海道ホタテ',
            description: '北海道からの特製ホタテ',
          },
        ],
      },
    },

    // Tiếp tục thêm các sản phẩm khác nếu cần thiết.
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();
//
// const updateProductCodes = async () => {
//   const products = await prisma.product.findMany(); // Lấy tất cả các sản phẩm
//
//   for (const [index, product] of products.entries()) {
//     // Tạo giá trị productCode dựa trên chỉ số (index)
//     const newProductCode = `M-000${index + 1}`; // Thêm 1 vào index để bắt đầu từ 1 thay vì 0
//
//     // Cập nhật productCode cho từng bản ghi
//     await prisma.product.update({
//       where: {
//         id: product.id,
//       },
//       data: {
//         productCode: newProductCode,
//       },
//     });
//
//     console.log(
//       `Updated productCode for product with id: ${product.id} to ${newProductCode}`,
//     );
//   }
//
//   console.log('All product codes have been updated!');
// };
//
// updateProductCodes()
//   .catch((e) => {
//     console.error(e);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
