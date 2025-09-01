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
  console.log('🇻🇳 Starting Vietnam Administrative Data Seeding...\n');

  const seedDir = path.join(__dirname);

  try {
    // Clear existing administrative data (optional)
    console.log('🧹 Clearing existing administrative data...');
    await prisma.wards.deleteMany({});
    await prisma.districts.deleteMany({});
    await prisma.provinces.deleteMany({});
    await prisma.administrativeUnits.deleteMany({});
    await prisma.administrativeRegions.deleteMany({});
    console.log('✅ Existing administrative data cleared\n');

    // Seed in dependency order
    await runSeedFile(
      path.join(seedDir, 'administrative-regions.js'),
      'Administrative Regions',
    );
    await runSeedFile(
      path.join(seedDir, 'administrative-units.js'),
      'Administrative Units',
    );
    await runSeedFile(
      path.join(seedDir, 'provinces.js'),
      'Provinces (63 provinces/cities)',
    );
    await runSeedFile(
      path.join(seedDir, 'districts.js'),
      'Districts (Sample from major cities)',
    );
    await runSeedFile(
      path.join(seedDir, 'wards.js'),
      'Wards (Sample from major districts)',
    );

    console.log(
      '\n🎉 Vietnam Administrative Data seeding completed successfully!',
    );
    console.log('📊 Data includes:');
    console.log('   • 8 Administrative Regions');
    console.log('   • 9 Administrative Units');
    console.log('   • 63 Provinces/Cities');
    console.log('   • Sample Districts from major cities');
    console.log('   • Sample Wards from major districts');
    console.log(
      '\n📚 You can view the data in Prisma Studio at http://localhost:5555',
    );
  } catch (error) {
    console.error('\n💥 Administrative data seeding failed:', error.message);
    process.exit(1);
  }
}

main()
  .catch((e) => {
    console.error('💥 Administrative seeding process failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('\n🔌 Database connection closed');
  });
