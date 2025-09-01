const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const categories = [
    { name: 'Cá tươi sống', urlImage: '/icons/fish.png' },
    { name: 'Tôm', urlImage: '/icons/tom.png' },
    { name: 'Mực - Bạch tuột', urlImage: '/icons/muc.png' },
    { name: 'Cua - Ghẹ', urlImage: '/icons/cua.png' },
    { name: 'Ngao - Sò - Ốc', urlImage: '/icons/oc.png' },
    { name: 'Hải sản nhập khẩu', urlImage: '/icons/hai-san-nhap-khau.png' },
    { name: 'Bào ngư - vi cá', urlImage: '/icons/bao-ngu.png' },
    { name: 'Hải sản khô một nắng', urlImage: '/icons/kho-mot-nang.png' },
    { name: 'Thịt nhập khẩu', urlImage: '/icons/thit.png' },
  ];

  for (const category of categories) {
    await prisma.category.create({
      data: category,
    });
  }
  console.log('Seed ok@@');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
