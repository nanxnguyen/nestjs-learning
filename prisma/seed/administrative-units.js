const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🏛️ Seeding Administrative Units...');

  const units = [
    {
      id: 1,
      fullName: 'Thành phố trực thuộc trung ương',
      shortName: 'Thành phố',
      codeName: 'thanh_pho_trung_uong',
    },
    {
      id: 2,
      fullName: 'Tỉnh',
      shortName: 'Tỉnh',
      codeName: 'tinh',
    },
    {
      id: 3,
      fullName: 'Thành phố thuộc tỉnh',
      shortName: 'Thành phố',
      codeName: 'thanh_pho_tinh',
    },
    {
      id: 4,
      fullName: 'Thị xã',
      shortName: 'Thị xã',
      codeName: 'thi_xa',
    },
    {
      id: 5,
      fullName: 'Huyện',
      shortName: 'Huyện',
      codeName: 'huyen',
    },
    {
      id: 6,
      fullName: 'Quận',
      shortName: 'Quận',
      codeName: 'quan',
    },
    {
      id: 7,
      fullName: 'Phường',
      shortName: 'Phường',
      codeName: 'phuong',
    },
    {
      id: 8,
      fullName: 'Thị trấn',
      shortName: 'Thị trấn',
      codeName: 'thi_tran',
    },
    {
      id: 9,
      fullName: 'Xã',
      shortName: 'Xã',
      codeName: 'xa',
    },
  ];

  for (const unit of units) {
    await prisma.administrativeUnits.upsert({
      where: { id: unit.id },
      update: unit,
      create: unit,
    });
  }

  console.log(`✅ Created ${units.length} administrative units`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding administrative units:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
