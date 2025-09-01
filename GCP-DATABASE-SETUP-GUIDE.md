# 📋 Hướng dẫn tạo Database PostgreSQL trên Google Cloud & Đồng bộ dữ liệu

## 🎯 Tổng quan quy trình

**Setup Google Cloud** → **Tạo Database** → **Cấu hình kết nối** → **Đồng bộ dữ liệu**

---

## 🏗️ BƯỚC 1: Setup Google Cloud Project

### 1.1 Đăng nhập và chọn project

```bash
# Đăng nhập Google Cloud
gcloud auth login your-email@gmail.com

# Chọn project có billing enabled
gcloud config set project your-project-id

# Kiểm tra billing status
gcloud alpha billing projects describe your-project-id
```

### 1.2 Enable APIs cần thiết

```bash
# Enable Cloud SQL API
gcloud services enable sqladmin.googleapis.com
```

---

## 🗄️ BƯỚC 2: Tạo PostgreSQL Instance

### 2.1 Tạo Cloud SQL instance

```bash
gcloud sql instances create learn-i-like-postgres \
  --database-version=POSTGRES_15 \
  --tier=db-f1-micro \
  --region=asia-southeast1 \
  --storage-type=SSD \
  --storage-size=10GB \
  --backup-start-time=02:00 \
  --availability-type=zonal
```

**Kết quả**: Instance với IP public (ví dụ: `34.126.176.255`)

### 2.2 Set password cho user postgres

```bash
gcloud sql users set-password postgres \
  --instance=learn-i-like-postgres \
  --password=123456
```

### 2.3 Tạo database

```bash
gcloud sql databases create learn_i_like \
  --instance=learn-i-like-postgres
```

---

## 🔐 BƯỚC 3: Cấu hình kết nối

### 3.1 Lấy IP hiện tại

```bash
# Lấy IPv4 của máy local
curl -s ipv4.icanhazip.com
# Output: 113.172.200.25
```

### 3.2 Add IP vào authorized networks

```bash
gcloud sql instances patch learn-i-like-postgres \
  --authorized-networks=113.172.200.25/32
```

### 3.3 Tạo connection string

```bash
# Tạo file .env với DATABASE_URL
echo 'DATABASE_URL="postgresql://postgres:123456@34.126.176.255:5432/learn_i_like"' > .env
```

---

## 📊 BƯỚC 4: Đồng bộ dữ liệu từ Local lên Cloud

### 4.1 Generate Prisma Client

```bash
npx prisma generate
```

### 4.2 Deploy schema lên cloud database

```bash
npx prisma db push
```

**Kết quả**: Tất cả tables từ `schema.prisma` được tạo trên cloud

### 4.3 Import master data (Vietnam administrative)

```bash
npm run seed:admin
```

**Import**: 8 regions, 9 units, 63 provinces, 54 districts, 45 wards

### 4.4 Import business data

```bash
npm run seed
```

**Import**: Categories, suppliers, products, promotions, reviews, best sellers

### 4.5 Verify data với Prisma Studio

```bash
npx prisma studio
# Truy cập: http://localhost:5556
```

---

## 🎯 Kết quả cuối cùng

### ✅ Database Information

| Field                 | Value                                                           |
| --------------------- | --------------------------------------------------------------- |
| **Host**              | 34.126.176.255                                                  |
| **Port**              | 5432                                                            |
| **Database**          | learn_i_like                                                    |
| **User**              | postgres                                                        |
| **Password**          | 123456                                                          |
| **Connection String** | `postgresql://postgres:123456@34.126.176.255:5432/learn_i_like` |

### ✅ Data đã được import

- 🏛️ **8 Administrative Regions** (Miền Bắc, Miền Nam, etc.)
- 🏢 **9 Administrative Units** (Tỉnh, Thành phố, etc.)
- 🌍 **63 Provinces/Cities** (Toàn bộ tỉnh thành VN)
- 🏘️ **54 Districts** (Quận/huyện từ các thành phố lớn)
- 🏠 **45 Wards** (Phường/xã mẫu)
- 🐟 **9 Categories** (Cá tươi, tôm, mực, etc.)
- 🏪 **8 Suppliers** (Cà Mau, Vũng Tàu, etc.)
- 🛒 **12 Products** (Hải sản cao cấp)
- 💰 **Payment Methods, Promotions, Reviews**

---

## 🔧 Commands quản lý Database

### View instance details

```bash
gcloud sql instances describe learn-i-like-postgres
```

### Connect trực tiếp

```bash
gcloud sql connect learn-i-like-postgres --user=postgres --database=learn_i_like
```

### Add thêm IP authorized

```bash
gcloud sql instances patch learn-i-like-postgres \
  --authorized-networks=OLD_IP/32,NEW_IP/32
```

### Delete instance (nếu cần)

```bash
gcloud sql instances delete learn-i-like-postgres
```

---

## 💡 Tips & Best Practices

1. **Free Tier**: `db-f1-micro` là tier miễn phí
2. **Security**: Chỉ add IP cần thiết vào authorized networks
3. **Backup**: Tự động backup lúc 2:00 AM
4. **Region**: `asia-southeast1` gần VN nhất (Singapore)
5. **Cost**: Khoảng $9/tháng cho tier này
6. **SSL**: Mặc định enabled cho bảo mật

---

## 🚨 Troubleshooting

### Lỗi billing không enabled

```bash
# Kiểm tra billing
gcloud alpha billing projects describe PROJECT_ID

# Vào console để enable billing
https://console.cloud.google.com/billing/enable?project=PROJECT_ID
```

### Lỗi connection refused

```bash
# Kiểm tra IP đã được authorized chưa
gcloud sql instances describe learn-i-like-postgres

# Add IP hiện tại
gcloud sql instances patch learn-i-like-postgres \
  --authorized-networks=$(curl -s ipv4.icanhazip.com)/32
```

### Lỗi Prisma connection

```bash
# Kiểm tra DATABASE_URL trong .env
cat .env

# Test connection
npx prisma db push --preview-feature
```

---

## 📝 Script tự động

Tạo file `setup-gcp-db.sh`:

```bash
#!/bin/bash
PROJECT_ID="your-project-id"
INSTANCE_NAME="learn-i-like-postgres"
DB_NAME="learn_i_like"
DB_PASSWORD="123456"

# Set project
gcloud config set project $PROJECT_ID

# Enable API
gcloud services enable sqladmin.googleapis.com

# Create instance
gcloud sql instances create $INSTANCE_NAME \
  --database-version=POSTGRES_15 \
  --tier=db-f1-micro \
  --region=asia-southeast1 \
  --storage-type=SSD \
  --storage-size=10GB

# Set password
gcloud sql users set-password postgres \
  --instance=$INSTANCE_NAME \
  --password=$DB_PASSWORD

# Create database
gcloud sql databases create $DB_NAME \
  --instance=$INSTANCE_NAME

# Get IP and create .env
INSTANCE_IP=$(gcloud sql instances describe $INSTANCE_NAME --format="value(ipAddresses[0].ipAddress)")
echo "DATABASE_URL=\"postgresql://postgres:$DB_PASSWORD@$INSTANCE_IP:5432/$DB_NAME\"" > .env

echo "✅ Setup completed! DATABASE_URL created in .env"
```

Chạy script:

```bash
chmod +x setup-gcp-db.sh
./setup-gcp-db.sh
```

🎉 **Kết quả**: Database cloud hoàn chỉnh với connection string như yêu cầu và data đầy đủ!
