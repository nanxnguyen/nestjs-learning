# Vietnam Administrative Data Seeds

Bộ seed data chính thức cho các đơn vị hành chính của Việt Nam, tương thích với chuẩn Bộ Nội vụ.

## 📁 Cấu trúc Files

### Administrative Data (Dữ liệu hành chính)

- `administrative-regions.js` - 8 vùng kinh tế
- `administrative-units.js` - 9 đơn vị hành chính
- `provinces.js` - 63 tỉnh/thành phố
- `districts.js` - Quận/huyện mẫu (các thành phố lớn)
- `wards.js` - Phường/xã mẫu

### Business Data (Dữ liệu kinh doanh)

- `categories.js` - Danh mục sản phẩm
- `supplier.js` - Nhà cung cấp
- `method.js` - Phương thức thanh toán
- `product-complete.js` - Sản phẩm với variants
- `discount.js` - Khuyến mãi
- `review.js` - Đánh giá sản phẩm
- `best-sale.js` - Sản phẩm bán chạy

### Master Seeds

- `vietnam-administrative.js` - Chạy tất cả administrative data
- `../seed.js` - Chạy tất cả business data

## 🚀 Cách sử dụng

### 1. Seed Administrative Data (Dữ liệu hành chính)

```bash
npm run seed:admin
```

Sẽ tạo:

- ✅ 8 vùng kinh tế (Đông Bắc Bộ, Tây Bắc Bộ, ...)
- ✅ 9 đơn vị hành chính (Thành phố TW, Tỉnh, Quận, Huyện, ...)
- ✅ 63 tỉnh/thành phố đầy đủ
- ✅ Sample districts từ TP.HCM, Hà Nội, Đà Nẵng, Cần Thơ
- ✅ Sample wards từ các quận trung tâm

### 2. Seed Business Data (Dữ liệu kinh doanh)

```bash
npm run seed
```

Sẽ tạo:

- ✅ Danh mục sản phẩm (Cá tươi, Tôm, Mực, ...)
- ✅ Nhà cung cấp (Cà Mau, Vũng Tàu, Phan Thiết, ...)
- ✅ Phương thức thanh toán (COD, Bank Transfer, ZaloPay)
- ✅ Sản phẩm với variants và hình ảnh
- ✅ Khuyến mãi và đánh giá

### 3. Seed All Data (Tất cả dữ liệu)

```bash
npm run seed:admin && npm run seed
```

## 📊 Cấu trúc Administrative Data

### Administrative Regions (8 vùng)

1. Đông Bắc Bộ
2. Tây Bắc Bộ
3. Đồng bằng sông Hồng
4. Bắc Trung Bộ
5. Duyên hải Nam Trung Bộ
6. Tây Nguyên
7. Đông Nam Bộ
8. Đồng bằng sông Cửu Long

### Administrative Units (9 loại)

1. Thành phố trực thuộc trung ương
2. Tỉnh
3. Thành phố thuộc tỉnh
4. Thị xã
5. Huyện
6. Quận
7. Phường
8. Thị trấn
9. Xã

### Provinces (63 tỉnh/thành)

Bao gồm tất cả 63 tỉnh/thành phố của Việt Nam với mã code chuẩn Bộ Nội vụ.

### Sample Districts & Wards

- **TP.HCM**: 22 quận/huyện + sample wards
- **Hà Nội**: 15 quận/huyện + sample wards
- **Đà Nẵng**: 8 quận/huyện
- **Cần Thơ**: 9 quận/huyện

## 🔗 Relationships

```
AdministrativeRegions (1) ←→ (n) Provinces
AdministrativeUnits (1) ←→ (n) Provinces
AdministrativeUnits (1) ←→ (n) Districts
AdministrativeUnits (1) ←→ (n) Wards
Provinces (1) ←→ (n) Districts
Districts (1) ←→ (n) Wards
```

## 🎯 Use Cases

### 1. Address Forms

```javascript
// Lấy tất cả tỉnh/thành
const provinces = await prisma.provinces.findMany();

// Lấy quận/huyện theo tỉnh
const districts = await prisma.districts.findMany({
  where: { provinceCode: '79' }, // TP.HCM
});

// Lấy phường/xã theo quận
const wards = await prisma.wards.findMany({
  where: { districtCode: '760' }, // Quận 1
});
```

### 2. Shipping Zones

```javascript
// Lấy tất cả địa chỉ theo vùng
const southernProvinces = await prisma.provinces.findMany({
  where: { administrative_region_id: 7 }, // Đông Nam Bộ
});
```

### 3. Statistics Reports

```javascript
// Thống kê theo vùng miền
const regionStats = await prisma.provinces.groupBy({
  by: ['administrative_region_id'],
  _count: true,
});
```

## 🔧 Customization

### Thêm Districts/Wards

Để thêm thêm districts/wards, chỉ cần thêm data vào file tương ứng:

```javascript
// districts.js
const newDistricts = [
  {
    code: 'NEW_CODE',
    name: 'Tên District',
    fullName: 'Tên đầy đủ',
    provinceCode: 'PROVINCE_CODE',
    administrative_unit_id: 5, // 5 = Huyện
  },
];
```

### Mở rộng Database

File seeds hỗ trợ upsert, có thể chạy nhiều lần an toàn:

```javascript
await prisma.provinces.upsert({
  where: { code: province.code },
  update: province,
  create: province,
});
```

## 📚 References

- [Danh sách đơn vị hành chính Việt Nam](https://danhmuchanhchinh.gso.gov.vn/)
- [Bộ Nội vụ - Đơn vị hành chính](https://www.moha.gov.vn/)
- [GSO Vietnam Administrative Units](https://www.gso.gov.vn/)

---

**Note**: Dữ liệu được cập nhật theo tiêu chuẩn của Bộ Nội vụ và Tổng cục Thống kê Việt Nam.
