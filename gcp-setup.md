# Google Cloud PostgreSQL Setup Guide

## 🚀 Deploy PostgreSQL lên Google Cloud SQL

### 1. Prerequisites

```bash
# Install Google Cloud CLI
# macOS
brew install --cask google-cloud-sdk

# Hoặc download từ: https://cloud.google.com/sdk/docs/install
```

### 2. Setup Google Cloud Project

```bash
# Login to Google Cloud
gcloud auth login

# Create new project (optional)
gcloud projects create learn-i-like-db --name="Learn I Like Database"

# Set project
gcloud config set project learn-i-like-db

# Enable required APIs
gcloud services enable sqladmin.googleapis.com
gcloud services enable compute.googleapis.com
```

### 3. Create Cloud SQL PostgreSQL Instance

```bash
# Create PostgreSQL instance
gcloud sql instances create learn-i-like-postgres \
  --database-version=POSTGRES_15 \
  --tier=db-f1-micro \
  --region=asia-southeast1 \
  --storage-type=SSD \
  --storage-size=10GB \
  --storage-auto-increase \
  --backup-start-time=02:00 \
  --maintenance-window-day=SUN \
  --maintenance-window-hour=03 \
  --maintenance-release-channel=production

# Set root password
gcloud sql users set-password postgres \
  --instance=learn-i-like-postgres \
  --password=YOUR_SECURE_PASSWORD

# Create database
gcloud sql databases create learn_i_like \
  --instance=learn-i-like-postgres
```

### 4. Configure Network Access

```bash
# Allow your IP (for development)
# Get your IP
curl ifconfig.me

# Add your IP to authorized networks
gcloud sql instances patch learn-i-like-postgres \
  --authorized-networks=YOUR_IP_ADDRESS/32

# For production, use Cloud SQL Proxy or VPC
```

### 5. Get Connection Details

```bash
# Get instance connection name
gcloud sql instances describe learn-i-like-postgres \
  --format="value(connectionName)"

# Get public IP
gcloud sql instances describe learn-i-like-postgres \
  --format="value(ipAddresses[0].ipAddress)"
```

### 6. Update .env file

```env
# Replace with your actual values
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@YOUR_INSTANCE_IP:5432/learn_i_like"

# Alternative using connection name (more secure)
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@/learn_i_like?host=/cloudsql/PROJECT_ID:REGION:INSTANCE_NAME"
```

### 7. Deploy Database Schema

```bash
# Generate Prisma client
npx prisma generate

# Push schema to Cloud SQL
npx prisma db push

# Run seeds
npm run seed:admin
npm run seed
```

## 💰 Pricing Estimate

### Cloud SQL f1-micro (Development)

- **CPU**: 1 vCPU shared
- **RAM**: 0.6 GB
- **Storage**: 10 GB SSD
- **Cost**: ~$9/month
- **Free**: $300 credit cho new accounts

### Cloud SQL db-n1-standard-1 (Production)

- **CPU**: 1 vCPU
- **RAM**: 3.75 GB
- **Storage**: 10 GB SSD
- **Cost**: ~$45/month

## 🔒 Security Best Practices

### 1. Use Cloud SQL Proxy (Recommended)

```bash
# Download Cloud SQL Proxy
curl -o cloud_sql_proxy https://dl.google.com/cloudsql/cloud_sql_proxy.darwin.amd64

chmod +x cloud_sql_proxy

# Run proxy
./cloud_sql_proxy -instances=PROJECT_ID:REGION:INSTANCE_NAME=tcp:5432

# Connection string with proxy
DATABASE_URL="postgresql://postgres:PASSWORD@127.0.0.1:5432/learn_i_like"
```

### 2. Create Service Account

```bash
# Create service account
gcloud iam service-accounts create cloudsql-client \
  --display-name="Cloud SQL Client"

# Grant permissions
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="serviceAccount:cloudsql-client@PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/cloudsql.client"

# Create key
gcloud iam service-accounts keys create key.json \
  --iam-account=cloudsql-client@PROJECT_ID.iam.gserviceaccount.com

# Set environment variable
export GOOGLE_APPLICATION_CREDENTIALS="key.json"
```

## 🚀 Alternative: Google Cloud Run + Cloud SQL

### 1. Containerize your app

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npx prisma generate
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
```

### 2. Deploy to Cloud Run

```bash
# Build and deploy
gcloud run deploy learn-i-like-api \
  --source . \
  --platform managed \
  --region asia-southeast1 \
  --allow-unauthenticated \
  --add-cloudsql-instances PROJECT_ID:REGION:INSTANCE_NAME \
  --set-env-vars DATABASE_URL="postgresql://..." \
  --max-instances 10 \
  --memory 512Mi \
  --cpu 1
```

## 📊 Monitoring & Logs

### 1. Enable monitoring

```bash
# Enable Cloud Monitoring
gcloud services enable monitoring.googleapis.com

# View logs
gcloud logging read "resource.type=cloudsql_database"

# Monitor performance
gcloud sql operations list --instance=learn-i-like-postgres
```

### 2. Set up alerts

```bash
# CPU usage alert
gcloud alpha monitoring policies create \
  --policy-from-file=cpu-alert-policy.yaml
```

## 🔧 Maintenance Commands

```bash
# Backup database
gcloud sql backups create --instance=learn-i-like-postgres

# List backups
gcloud sql backups list --instance=learn-i-like-postgres

# Restore from backup
gcloud sql backups restore BACKUP_ID \
  --restore-instance=learn-i-like-postgres

# Scale instance
gcloud sql instances patch learn-i-like-postgres \
  --tier=db-n1-standard-1

# Update maintenance window
gcloud sql instances patch learn-i-like-postgres \
  --maintenance-window-day=SUN \
  --maintenance-window-hour=03
```

## ⚠️ Important Notes

1. **Free Tier**: Google Cloud cung cấp $300 credit cho 3 tháng đầu
2. **Region**: Chọn `asia-southeast1` (Singapore) để gần VN nhất
3. **Backup**: Auto backup được enable mặc định
4. **SSL**: Cloud SQL tự động enable SSL
5. **Scaling**: Có thể auto-scale storage và manual scale CPU/RAM

## 🎯 Quick Start Commands

```bash
# 1. Create instance
gcloud sql instances create learn-i-like-postgres \
  --database-version=POSTGRES_15 \
  --tier=db-f1-micro \
  --region=asia-southeast1

# 2. Set password
gcloud sql users set-password postgres \
  --instance=learn-i-like-postgres \
  --password=SecurePassword123

# 3. Create database
gcloud sql databases create learn_i_like \
  --instance=learn-i-like-postgres

# 4. Get IP and update .env
gcloud sql instances describe learn-i-like-postgres \
  --format="value(ipAddresses[0].ipAddress)"

# 5. Deploy schema
npx prisma db push

# 6. Run seeds
npm run seed:admin && npm run seed
```
