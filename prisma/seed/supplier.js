const { PrismaClient } = require('@prisma/client');
const { v4: uuidv4 } = require('uuid');

const prisma = new PrismaClient();

async function main() {
  const suppliers = [
    {
      id: uuidv4(),
      name: 'CÀ MAU',
      contact: 'VỰA CÀ MAU HẢI SẢN',
      email: 'haisancamau@gmail.com',
      address: '14 Cảng Trước Cà Mau, TP Cà MAU',
    },
    {
      id: uuidv4(),
      name: 'VŨNG TÀU',
      contact: 'VỰA HẢI SẢN VŨNG TÀU',
      email: 'haisanvungtau@gmail.com',
      address: '09 Bãi Thùy Vân, TP Vũng Tàu',
    },
    {
      id: uuidv4(),
      name: 'PHAN THIẾT',
      contact: 'VỰA HẢI SẢN PHAN THIẾT',
      email: 'tomphanthiet@.com',
      address: '01 chợ Phan Thiết',
    },
    {
      id: uuidv4(),
      name: 'ASIA',
      contact: 'THỊT NHẬP KHẨU ASIA',
      email: 'asia@gmail.com',
      address: '12 Cảng Cần Giờ, Huyện Cần Giờ, TP Hồ Chí Minh',
    },
    {
      id: uuidv4(),
      name: 'CẦN GIỜ',
      contact: 'VỰA HẢI SẢN CẦN GIỜ',
      email: 'cangbiencangio@gmail.com',
      address: '01 Cảng Cần Giờ, Huyện Cần Giờ, TP Hồ Chí Minh',
    },
    {
      id: uuidv4(),
      name: 'CHỢ ĐẦU MỐI',
      contact: 'VỰA HẢI SẢN CHỢ ĐẦU MỐI',
      email: 'chodaumoigovap@gmail.com',
      address: '12 Chợ Gò Vấp, Gò Vấp, TP Hồ Chí Minh',
    },
    {
      id: uuidv4(),
      name: 'CHỢ ĐẦU MỐI BÌNH ĐIỀN',
      contact: 'VỰA HẢI SẢN CHỢ ĐẦU MỐI BÌNH ĐIỀN',
      email: 'binhdien@gmail.com',
      address: '64 Chợ Bình Điền, Bình Chánh, TP Hồ Chí Minh',
    },
    {
      id: uuidv4(),
      name: 'CHỢ ĐẦU MỐI THỦ ĐỨC',
      contact: 'VỰA HẢI SẢN CHỢ ĐẦU MỐI THỦ ĐỨC',
      email: 'thuduc@gmail.com',
      address: '789 Chợ Thủ Đức, TP Thủ Đức, TP Hồ Chí Minh',
    },
  ];

  for (const supplier of suppliers) {
    await prisma.supplier.create({
      data: supplier,
    });
  }

  console.log('Seeding suppliers done!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
