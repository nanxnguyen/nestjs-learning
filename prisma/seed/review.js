const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Mảng bình luận ngẫu nhiên
const comments = [
  'Sản phẩm rất tuyệt vời!',
  'Tôi rất hài lòng với sản phẩm này.',
  'Không tệ, nhưng có thể tốt hơn.',

  'Sản phẩm không đạt được mong đợi.',
  'Giá cả hợp lý, chất lượng tốt.',
  'Rất đáng mua, tôi sẽ mua lại.',
];

// Lấy bình luận ngẫu nhiên
function getRandomComment() {
  return comments[Math.floor(Math.random() * comments.length)];
}

async function main() {
  // 1. Lấy tất cả các `id` từ bảng `Product`
  const products = await prisma.product.findMany({
    select: {
      id: true,
    },
  });

  // 2. Duyệt qua từng `productId` và cập nhật comment
  for (const product of products) {
    const productId = product.id;

    // Kiểm tra nếu đã có review cho sản phẩm, sau đó cập nhật bình luận
    const existingReviews = await prisma.review.findMany({
      where: { productId: productId },
    });

    if (existingReviews.length > 0) {
      for (const review of existingReviews) {
        await prisma.review.update({
          where: { id: review.id },
          data: {
            comment: getRandomComment(),
          },
        });
      }
    } else {
      // Nếu chưa có review nào, tạo mới
      const reviewCount = Math.floor(Math.random() * 2) + 2; // Tạo 2 hoặc 3 bình luận ngẫu nhiên cho mỗi sản phẩm
      for (let i = 0; i < reviewCount; i++) {
        await prisma.review.create({
          data: {
            rating: Math.floor(Math.random() * 5) + 1, // Random rating từ 1-5
            comment: getRandomComment(),
            productId: productId, // Liên kết với bảng Product thông qua productId
          },
        });
      }
    }
  }
}

main()
  .then(() => {
    console.log('Update completed.');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
