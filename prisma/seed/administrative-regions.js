const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🌍 Seeding Administrative Regions...');

  const regions = [
    {
      id: 1,
      name: 'Đông Bắc Bộ',
      codeName: 'dong_bac_bo',
    },
    {
      id: 2,
      name: 'Tây Bắc Bộ',
      codeName: 'tay_bac_bo',
    },
    {
      id: 3,
      name: 'Đồng bằng sông Hồng',
      codeName: 'dong_bang_song_hong',
    },
    {
      id: 4,
      name: 'Bắc Trung Bộ',
      codeName: 'bac_trung_bo',
    },
    {
      id: 5,
      name: 'Duyên hải Nam Trung Bộ',
      codeName: 'duyen_hai_nam_trung_bo',
    },
    {
      id: 6,
      name: 'Tây Nguyên',
      codeName: 'tay_nguyen',
    },
    {
      id: 7,
      name: 'Đông Nam Bộ',
      codeName: 'dong_nam_bo',
    },
    {
      id: 8,
      name: 'Đồng bằng sông Cửu Long',
      codeName: 'dong_bang_song_cuu_long',
    },
  ];

  for (const region of regions) {
    await prisma.administrativeRegions.upsert({
      where: { id: region.id },
      update: region,
      create: region,
    });
  }

  console.log(`✅ Created ${regions.length} administrative regions`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding administrative regions:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
