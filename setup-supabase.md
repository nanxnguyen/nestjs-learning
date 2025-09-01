# Setup Supabase Database (Free Alternative)

## 🎯 Quick Setup (5 phút)

### 1. Tạo Supabase Account

```bash
# Truy cập: https://supabase.com
# Đăng ký với nhutna0101@gmail.com
# Create new project
```

### 2. Create Project

```
Project Name: learn-i-like
Database Password: 123456
Region: Southeast Asia (Singapore) - gần VN nhất
```

### 3. Get Database URL

```bash
# Vào Supabase Dashboard > Settings > Database
# Copy "Connection string" và thay [YOUR-PASSWORD] bằng 123456

# Example:
DATABASE_URL="postgresql://postgres.xxx:123456@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres"
```

### 4. Update .env file

```env
# Replace với connection string từ Supabase
DATABASE_URL="postgresql://postgres.xxx:123456@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres"
```

### 5. Deploy Schema & Data

```bash
# Generate Prisma client
npx prisma generate

# Push schema to Supabase
npx prisma db push

# Import masterdata
npm run seed:admin

# Import business data
npm run seed
```

## ✅ Ưu điểm Supabase:

1. **FREE**: 500MB database, 2 projects
2. **No Billing Required**: Không cần thẻ tín dụng
3. **PostgreSQL**: 100% compatible với Prisma
4. **Dashboard**: Web UI để quản lý data
5. **Auto Backup**: Tự động backup
6. **Fast Setup**: 5 phút setup xong
7. **Auth & Storage**: Bonus features

## 🎯 Recommended Steps:

1. **Tạo Supabase account** tại supabase.com
2. **Create project** với password 123456
3. **Copy DATABASE_URL** từ Settings > Database
4. **Update .env** với connection string
5. **Deploy schema**: `npx prisma db push`
6. **Import data**: `npm run seed:admin && npm run seed`

## 📊 So sánh:

| Feature              | Google Cloud SQL | Supabase |
| -------------------- | ---------------- | -------- |
| **Setup Time**       | 30+ phút         | 5 phút   |
| **Cost**             | $9+/month        | Free     |
| **Billing Required** | Có               | Không    |
| **Dashboard**        | Basic            | Advanced |
| **Auth Built-in**    | Không            | Có       |
| **Backup**           | Manual setup     | Auto     |

**Recommendation**: Dùng Supabase cho development, sau này có thể migrate lên Google Cloud cho production.
