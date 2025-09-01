// const { PrismaClient } = require('@prisma/client');
// const { v4: uuidv4 } = require('uuid');
//
// const prisma = new PrismaClient();
//
// async function main() {
//   await prisma.paymentMethod.createMany({
//     data: [
//       {
//         id: uuidv4(), // Generate a UUID or let the database handle it
//         methodName: 'Thanh Toán Khi Nhận Hàng (COD)',
//         methodType: 'COD',
//         methodCode: 'COD',
//       },
//       {
//         id: uuidv4(),
//         methodName: 'Thanh Toán Chuyển Khoản',
//         methodType: 'Bank Transfer',
//         methodCode: 'BANK',
//       },
//       {
//         id: uuidv4(),
//         methodName: 'Ví ZaloPay',
//         methodType: 'E-wallet',
//         methodCode: 'EWALETZL',
//       },
//     ],
//   });
// }
//
// main()
//   .catch((e) => console.error(e))
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

// const { PrismaClient } = require('@prisma/client');
//
// const prisma = new PrismaClient();
//
// async function updatePaymentMethod() {
//   const methodCodeToUpdate = 'BANK'; // methodCode của phương thức thanh toán muốn cập nhật
//
//   // Thông tin paymentInfo mới
//   const newPaymentInfo = [
//     {
//       bankName: 'Ngân hàng Kỹ thương Techcombank',
//       bankNumber: '0838668683979',
//       bankBranch: 'CN Gò Vấp',
//       bankAccountHolderName: 'Marusei Shop',
//       paymentInfoCode: 'P001',
//     },
//     {
//       bankName: 'Ngân hàng Vietcombank',
//       bankNumber: '0525252',
//       bankBranch: 'CN Gò Vấp',
//       bankAccountHolderName: 'Marusei Shop',
//       paymentInfoCode: 'P002',
//     },
//   ];
//
//   try {
//     // Cập nhật thông tin paymentInfo cho phương thức thanh toán
//     const updatedPaymentMethod = await prisma.paymentMethod.update({
//       where: {
//         methodCode: methodCodeToUpdate, // Tìm phương thức thanh toán theo methodCode
//       },
//       data: {
//         paymentInfo: newPaymentInfo, // Cập nhật paymentInfo
//       },
//     });
//
//     console.log('Updated Payment Method:', updatedPaymentMethod);
//   } catch (error) {
//     console.error('Error updating payment method:', error);
//   } finally {
//     await prisma.$disconnect(); // Ngắt kết nối Prisma Client
//   }
// }
//
// // Gọi hàm để thực hiện cập nhật
// updatePaymentMethod();

const { PrismaClient } = require('@prisma/client');
const { v4: uuidv4 } = require('uuid');

const prisma = new PrismaClient();

async function main() {
  await prisma.paymentMethod.createMany({
    data: [
      {
        id: uuidv4(), // Generate a UUID or let the database handle it
        methodName: 'Thanh Toán Khi Nhận Hàng (COD)',
        methodType: 'COD',
        methodCode: 'COD',
      },
      {
        id: uuidv4(),
        methodName: 'Thanh Toán Chuyển Khoản',
        methodType: 'Bank Transfer',
        methodCode: 'BANK',
        paymentInfo: [
          {
            bankName: 'Ngân hàng Kỹ thương Techcombank',
            bankNumber: '0838668683979',
            bankBranch: 'CN Gò Vấp',
            bankAccountHolderName: 'Marusei Shop',
            paymentInfoCode: 'P001',
          },
          {
            bankName: 'Ngân hàng Vietcombank',
            bankNumber: '0525252',
            bankBranch: 'CN Gò Vấp',
            bankAccountHolderName: 'Marusei Shop',
            paymentInfoCode: 'P002',
          },
        ],
      },
      {
        id: uuidv4(),
        methodName: 'Ví ZaloPay',
        methodType: 'E-wallet',
        methodCode: 'EWALETZL',
      },
    ],
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
