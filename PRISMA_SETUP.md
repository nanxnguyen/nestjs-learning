# 🚀 Hướng dẫn sử dụng Prisma với PostgreSQL

## 🎯 **Đã hoàn thành setup:**

### ✅ **1. Cài đặt Prisma**

```bash
yarn add prisma @prisma/client
```

### ✅ **2. Khởi tạo Prisma**

```bash
npx prisma init
```

### ✅ **3. Cấu hình Schema**

File: `prisma/schema.prisma`

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String
  phone     String?
  posts     Post[]   // One-to-many relation
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  @@map("users")
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  authorId  Int?     @map("author_id")
  author    User?    @relation(fields: [authorId], references: [id])
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  @@map("posts")
}
```

## 🔧 **Environment Setup**

### `.env` file:

```bash
DATABASE_URL="postgresql://postgres:123456@localhost:5432/learn_i_like"
PORT=3002
NODE_ENV=development
```

## 🏗️ **Architecture**

### **Prisma Service (`src/prisma/prisma.service.ts`)**

- Extends PrismaClient
- Handles connection lifecycle
- Provides health check methods
- Global service for entire app

### **Prisma Module (`src/prisma/prisma.module.ts`)**

- Global module
- Exports PrismaService
- Available throughout the app

## 🎮 **API Endpoints**

### **Health Check Endpoints:**

```bash
# Database health & info
GET http://localhost:3002/health

# Simple connection check
GET http://localhost:3002/db-check
```

### **CRUD Endpoints:**

```bash
# Get all users
GET http://localhost:3002/users

# Create user
POST http://localhost:3002/users
Content-Type: application/json
{
  "email": "test@example.com",
  "name": "Test User",
  "phone": "0123456789"
}

# Get all posts (with author info)
GET http://localhost:3002/posts
```

## 🛠️ **Prisma Commands**

### **Development Workflow:**

```bash
# 1. Modify schema in prisma/schema.prisma
# 2. Create and apply migration
npx prisma migrate dev --name feature_name

# 3. Generate client (auto-runs after migrate)
npx prisma generate

# 4. Reset database (careful!)
npx prisma migrate reset
```

### **Useful Commands:**

```bash
# Open Prisma Studio (GUI)
npx prisma studio

# View database
npx prisma db pull

# Deploy to production
npx prisma migrate deploy
```

## 💡 **Prisma vs TypeORM - So sánh thực tế**

### **📝 Viết queries:**

#### **Prisma:**

```typescript
// Type-safe, auto-complete
const users = await prisma.user.findMany({
  include: {
    posts: true,
  },
  where: {
    email: {
      contains: '@gmail.com',
    },
  },
});
```

#### **TypeORM (trước đây):**

```typescript
// Cần import repository, entity
const users = await this.userRepository.find({
  relations: ['posts'],
  where: {
    email: Like('%@gmail.com%'),
  },
});
```

### **🔧 Migration:**

#### **Prisma:**

```bash
# Tự động generate migration từ schema changes
npx prisma migrate dev --name add_user_table
```

#### **TypeORM:**

```bash
# Cần tạo migration file manually hoặc generate
npm run migration:generate
npm run migration:run
```

## 🎯 **Ưu điểm Prisma đã thấy:**

1. **🛡️ Type Safety cực tốt** - Auto-complete đầy đủ
2. **📱 Prisma Studio** - GUI tuyệt vời để manage data
3. **🔄 Auto Migration** - Từ schema changes
4. **📖 Readable Queries** - Dễ đọc, dễ hiểu
5. **🚀 Zero-config** - Ít setup hơn TypeORM

## 🧪 **Test Prisma:**

### **Khởi chạy app:**

```bash
yarn start:dev
```

### **Test endpoints:**

```bash
# Health check
curl http://localhost:3002/health

# Create user
curl -X POST http://localhost:3002/users \
  -H "Content-Type: application/json" \
  -d '{"email":"test@prisma.com","name":"Prisma User"}'

# Get users
curl http://localhost:3002/users
```

### **Mở Prisma Studio:**

```bash
npx prisma studio
# Truy cập: http://localhost:5555
```

## 🔮 **Next Steps:**

1. **Tạo DTOs** với class-validator
2. **Error handling** cho Prisma exceptions
3. **Pagination** cho large datasets
4. **Advanced relations** (many-to-many)
5. **Prisma middlewares** cho logging/metrics

---

## 🆚 **Kết luận so sánh:**

**Prisma thắng về:**

- Developer Experience
- Type Safety
- Modern tooling
- Ease of use

**TypeORM thắng về:**

- Flexibility với raw SQL
- Mature ecosystem
- Complex queries handling

**👉 Cho dự án của bạn: Prisma là lựa chọn tốt nếu ưu tiên DX và type safety!**

