# Product Context: Learn-I-Like E-Commerce Platform

## Purpose

Learn-I-Like serves as a comprehensive e-commerce backend platform enabling businesses to manage their entire product catalog, process orders, and handle customer relationships through a modern, scalable API.

## Problems It Solves

1. **Product Management Complexity**: Handles multi-variant products with translations, categories, and pricing
2. **Order Processing**: Complete order lifecycle from creation to delivery with payment integration
3. **Inventory Control**: Real-time stock management across product variants
4. **Multi-role Access**: Different permission levels for admins, staff, and customers
5. **Geographic Complexity**: Vietnamese administrative regions for accurate shipping addresses
6. **Supplier Management**: Vendor relationships and product sourcing tracking

## How It Works

- **RESTful API Architecture**: Clean, documented endpoints for all operations
- **Database-First Design**: Comprehensive Prisma schema defining all business relationships
- **Role-Based Security**: Multiple user types with appropriate access controls
- **Validation Layer**: Robust input validation using DTOs and class validators
- **Response Standardization**: Consistent API responses with proper error handling

## User Experience Goals

- **Developer-Friendly**: Well-documented APIs with Swagger integration
- **Performance**: Efficient database queries and response caching strategies
- **Reliability**: Proper error handling and transaction management
- **Scalability**: Modular architecture supporting business growth
- **Maintainability**: Clean code structure with separation of concerns

## Key Features

- Product catalog with variants, images, and translations
- Order management with payment method integration
- User authentication and authorization
- Category-based product organization
- Supplier and vendor management
- Vietnamese administrative regions support
- File upload and asset management
