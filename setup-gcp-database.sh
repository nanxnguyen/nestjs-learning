#!/bin/bash

# Script to create PostgreSQL on Google Cloud SQL
# Usage: ./setup-gcp-database.sh

echo "🚀 Setting up PostgreSQL on Google Cloud SQL..."

# Configuration
PROJECT_ID="learn-i-like-db-2024"
INSTANCE_NAME="learn-i-like-postgres"
DATABASE_NAME="learn_i_like"
DB_PASSWORD="123456"
REGION="asia-southeast1"

# Set project
echo "📋 Setting project to $PROJECT_ID"
gcloud config set project $PROJECT_ID

# Enable required APIs
echo "🔧 Enabling Cloud SQL API..."
gcloud services enable sqladmin.googleapis.com

# Create Cloud SQL instance
echo "🏗️  Creating PostgreSQL instance: $INSTANCE_NAME"
gcloud sql instances create $INSTANCE_NAME \
  --database-version=POSTGRES_15 \
  --tier=db-f1-micro \
  --region=$REGION \
  --storage-type=SSD \
  --storage-size=10GB \
  --backup-start-time=02:00 \
  --availability-type=zonal \
  --no-assign-ip

# Set root password
echo "🔑 Setting postgres user password..."
gcloud sql users set-password postgres \
  --instance=$INSTANCE_NAME \
  --password=$DB_PASSWORD

# Create database
echo "📊 Creating database: $DATABASE_NAME"
gcloud sql databases create $DATABASE_NAME \
  --instance=$INSTANCE_NAME

# Get connection details
echo "📝 Getting connection information..."
INSTANCE_IP=$(gcloud sql instances describe $INSTANCE_NAME --format="value(ipAddresses[0].ipAddress)")
INSTANCE_CONNECTION_NAME=$(gcloud sql instances describe $INSTANCE_NAME --format="value(connectionName)")

echo "✅ Database setup completed!"
echo ""
echo "📋 Connection Details:"
echo "   Instance Name: $INSTANCE_NAME"
echo "   Database Name: $DATABASE_NAME"
echo "   IP Address: $INSTANCE_IP"
echo "   Connection Name: $INSTANCE_CONNECTION_NAME"
echo ""
echo "🔗 Database URL for .env:"
echo "   DATABASE_URL=\"postgresql://postgres:$DB_PASSWORD@$INSTANCE_IP:5432/$DATABASE_NAME\""
echo ""
echo "🔧 Next steps:"
echo "   1. Add your IP to authorized networks:"
echo "      gcloud sql instances patch $INSTANCE_NAME --authorized-networks=\$(curl -s ifconfig.me)/32"
echo ""
echo "   2. Update your .env file with the DATABASE_URL above"
echo ""
echo "   3. Test connection:"
echo "      npx prisma db push"
echo ""
echo "   4. Import data:"
echo "      npm run seed:admin && npm run seed"
