# Technical Context: Learn-I-Like

## Technology Stack

### Backend Framework

- **NestJS**: TypeScript-first Node.js framework providing modular architecture
- **Express**: Underlying HTTP server with middleware support
- **TypeScript**: Type-safe development with modern ES features

### Database & ORM

- **PostgreSQL**: Primary database for production
- **Prisma**: Type-safe ORM with schema-first approach
- **Database Features**: UUID primary keys, enum types, complex relationships

### Validation & Transformation

- **class-validator**: Decorator-based validation
- **class-transformer**: Object transformation and serialization
- **DTOs**: Data Transfer Objects for input validation

### Development Tools

- **Docker**: Containerization for consistent environments
- **Swagger/OpenAPI**: API documentation and testing
- **Jest**: Testing framework
- **ESLint + Prettier**: Code quality and formatting

### Dependencies

```json
{
  "@nestjs/common": "^11.0.1",
  "@nestjs/core": "^11.1.6",
  "@prisma/client": "^6.15.0",
  "class-validator": "^0.14.2",
  "swagger-ui-express": "^5.0.1"
}
```

## Development Setup

1. **Environment**: Node.js with TypeScript compilation
2. **Database**: PostgreSQL with Prisma migrations
3. **Scripts**: Build, dev server, testing, and seeding commands
4. **Docker**: Multi-stage builds with production optimization

## Technical Constraints

- **Database**: PostgreSQL-specific features and constraints
- **Node.js**: Runtime limitations and memory considerations
- **TypeScript**: Strict typing requirements
- **Docker**: Container resource limitations

## Tool Usage Patterns

- **Prisma Generate**: Type generation from schema
- **Migration Management**: Database versioning with Prisma
- **Seeding**: Automated data population for development
- **Environment Config**: NestJS config module for settings
