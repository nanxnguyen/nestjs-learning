const { PrismaClient } = require('@prisma/client');
const { execSync } = require('child_process');
const path = require('path');

const prisma = new PrismaClient();

async function runSeedFile(filePath, description) {
  console.log(`\n🌱 Seeding ${description}...`);
  try {
    execSync(`node ${filePath}`, { stdio: 'inherit' });
    console.log(`✅ ${description} seeded successfully`);
  } catch (error) {
    console.error(`❌ Error seeding ${description}:`, error.message);
    throw error;
  }
}

async function main() {
  console.log('🚀 Starting database seeding process...\n');

  const seedDir = path.join(__dirname, 'seed');

  try {
    // Clear existing data (optional - comment out if you want to keep existing data)
    console.log('🧹 Clearing existing data...');
    await prisma.promotion.deleteMany({});
    await prisma.review.deleteMany({});
    await prisma.bestSeller.deleteMany({});
    await prisma.productVariant.deleteMany({});
    await prisma.productTranslation.deleteMany({});
    await prisma.image.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.paymentMethod.deleteMany({});
    await prisma.supplier.deleteMany({});
    await prisma.category.deleteMany({});
    console.log('✅ Existing data cleared\n');

    // Seed in dependency order
    await runSeedFile(path.join(seedDir, 'categories.js'), 'Categories');
    await runSeedFile(path.join(seedDir, 'supplier.js'), 'Suppliers');
    await runSeedFile(path.join(seedDir, 'method.js'), 'Payment Methods');
    await runSeedFile(path.join(seedDir, 'product-complete.js'), 'Products');

    // Note: variant.js seems to add additional variants to existing products
    // await runSeedFile(path.join(seedDir, 'variant.js'), 'Additional Product Variants');

    await runSeedFile(
      path.join(seedDir, 'discount.js'),
      'Promotions & Discounts',
    );
    await runSeedFile(path.join(seedDir, 'review.js'), 'Reviews');
    await runSeedFile(path.join(seedDir, 'best-sale.js'), 'Best Sellers');

    console.log('\n🎉 All seed data imported successfully!');
    console.log(
      '📊 You can now view the data in Prisma Studio at http://localhost:5555',
    );
  } catch (error) {
    console.error('\n💥 Seeding failed:', error.message);
    process.exit(1);
  }
}

main()
  .catch((e) => {
    console.error('💥 Seeding process failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('\n🔌 Database connection closed');
  });
