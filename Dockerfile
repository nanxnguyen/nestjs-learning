# Dockerfile for NestJS + Prisma + PostgreSQL
# Multi-stage build for smaller final image

# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN yarn install --frozen-lockfile || npm install
COPY . .
# Generate Prisma client for Linux Alpine
RUN npx prisma generate
RUN yarn build || npm run build

# Stage 2: Production
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production

# Install production dependencies only
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN yarn install --frozen-lockfile --production || npm ci --only=production

# Copy built application
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Generate Prisma client in production stage
RUN npx prisma generate

EXPOSE 3332

# Create a startup script
RUN echo '#!/bin/sh\n\
echo "🚀 Starting Learn I Like API..."\n\
echo "📊 Running Prisma migrations..."\n\
npx prisma migrate deploy\n\
echo "🎯 Starting NestJS application..."\n\
node dist/main.js' > start.sh && chmod +x start.sh

CMD ["./start.sh"]

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3332/health || exit 1
