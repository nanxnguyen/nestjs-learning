# 🐳 Docker Setup Guide

## 📦 Files đã tạo:

- `Dockerfile` - Build image cho NestJS app
- `docker-compose.yml` - Orchestration cho app + PostgreSQL  
- `.env.docker` - Environment variables cho Docker

## 🚀 Cách chạy với Docker:

### 1️⃣ **Với Docker Compose (Recommended)**
```bash
# Chạy cả app + PostgreSQL database
docker-compose up --build

# Chạy background
docker-compose up -d --build

# Stop services
docker-compose down

# Stop và xóa volumes
docker-compose down -v
```

### 2️⃣ **Với Docker standalone**
```bash
# Build image
docker build -t learn-i-like .

# Run với database external
docker run --env-file .env.docker -p 3332:3332 learn-i-like
```

### 3️⃣ **Development mode với Docker**
```bash
# Mount source code để auto-reload
docker run -it --rm \
  -v $(pwd):/app \
  -w /app \
  -p 3332:3332 \
  --env-file .env \
  node:20-alpine \
  sh -c "yarn install && yarn start:dev"
```

## 🎯 **Endpoints sau khi chạy:**

- **API**: http://localhost:3332
- **Swagger UI**: http://localhost:3332/api
- **Health Check**: http://localhost:3332/health
- **Database**: localhost:5433 (PostgreSQL)

## 🔧 **Environment Variables:**

### `.env.docker` (cho Docker):
```bash
DATABASE_URL="postgresql://postgres:123456@postgres:5432/learn_i_like"
PORT=3332
NODE_ENV=production
```

### `.env` (cho local development):
```bash
DATABASE_URL="postgresql://postgres:123456@localhost:5432/learn_i_like"  
PORT=3002
NODE_ENV=development
```

## 🛠️ **Troubleshooting:**

### **Lỗi Prisma binary target:**
```bash
# Đã fix trong schema.prisma với:
generator client {
  provider      = "prisma-client-js"
  binaryTargets = ["native", "linux-musl-arm64-openssl-3.0.x"]
}
```

### **Lỗi database connection:**
```bash
# Check PostgreSQL container
docker-compose logs postgres

# Check app container  
docker-compose logs app

# Restart services
docker-compose restart
```

### **Reset everything:**
```bash
# Stop và xóa tất cả
docker-compose down -v
docker system prune -f

# Start lại
docker-compose up --build
```

## 🔍 **Useful Commands:**

```bash
# View logs
docker-compose logs -f app
docker-compose logs -f postgres

# Exec vào container
docker-compose exec app sh
docker-compose exec postgres psql -U postgres -d learn_i_like

# View running containers
docker-compose ps

# Build lại chỉ app
docker-compose build app
```

## 📊 **Production Deployment:**

```bash
# Build production image
docker build -t learn-i-like:prod .

# Tag và push lên registry
docker tag learn-i-like:prod your-registry/learn-i-like:latest
docker push your-registry/learn-i-like:latest

# Deploy với external database
docker run -d \
  --name learn-i-like-prod \
  -p 3332:3332 \
  -e DATABASE_URL="postgresql://user:pass@prod-db:5432/db" \
  -e NODE_ENV=production \
  your-registry/learn-i-like:latest
```

## ✅ **Checklist khi deploy:**

- [ ] Update `.env.docker` với production values
- [ ] Setup production PostgreSQL database  
- [ ] Configure FPT API keys
- [ ] Setup reverse proxy (nginx) 
- [ ] Configure SSL certificates
- [ ] Setup monitoring & logging
- [ ] Backup strategy cho database
