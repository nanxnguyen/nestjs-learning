# System Patterns: Learn-I-Like Architecture

## Overall Architecture

- **Modular Design**: Feature-based modules (Category, Users, Products, E-contract)
- **Dependency Injection**: NestJS IoC container managing service dependencies
- **Database Layer**: Prisma ORM providing type-safe database access
- **Response Pattern**: Standardized API responses through CustomResponse class

## Key Design Patterns

### Module Structure

```
src/
├── category/           # Category management module
├── users/             # User management module
├── econtract/         # Contract management module
├── prisma/            # Database service module
├── config/            # Configuration and interceptors
└── constants/         # Shared constants and types
```

### Service Layer Pattern

- Services contain business logic
- Controllers handle HTTP requests/responses
- DTOs validate input data
- Prisma service provides data access

### Database Relationships

- **One-to-Many**: Category → Products, Supplier → Products
- **Many-to-Many**: Product ↔ Categories, Product ↔ Taxes
- **Polymorphic**: User/Staff authentication types
- **Hierarchical**: Administrative regions (Province → District → Ward)

### Response Standardization

```typescript
class CustomResponse {
  data: any;
  statusCode: HttpResultCode;
  message: string | null;
}
```

## Critical Implementation Paths

### Category Management Flow

1. Request validation through DTOs
2. Business logic in CategoryService
3. Database operations via Prisma
4. Standardized response formatting

### Data Integrity

- UUID primary keys across all entities
- Soft deletes using `isArchived` flags
- Cascade deletes for dependent entities
- Unique constraints on business-critical fields

### Error Handling

- Custom exceptions through CustomResponse
- HTTP status code mapping
- Centralized error response format

## Component Relationships

- **PrismaService**: Central data access layer
- **CategoryService**: Business logic for category operations
- **CategoryController**: HTTP endpoint handling
- **DTOs**: Input validation and transformation
- **Response Interceptors**: Output formatting
