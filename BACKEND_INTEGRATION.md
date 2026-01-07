# Backend Entegrasyonu Rehberi

## 📋 Genel Bakış

Bu projede backend entegrasyonu için **Service Layer Architecture** kullanılmaktadır. Bu yaklaşım sayesinde:

- ✅ **Separation of Concerns**: API çağrıları hook'lardan ayrılmış, service layer'da toplanmış
- ✅ **DRY Prensibi**: Tekrar eden API çağrı kodları yok
- ✅ **Type Safety**: TypeScript ile tam tip güvenliği
- ✅ **Backend Ready**: Mock data'dan gerçek API'ye geçiş kolay
- ✅ **Multi-Industry Support**: Sektöre göre dinamik endpoint'ler
- ✅ **Merkezi API Client**: Token yönetimi, error handling otomatik

## 🏗 Mimari Yapı

### Service Layer Hierarchy

```
src/
├── services/                    # Global Services
│   └── auth.service.ts         # Authentication (birden fazla feature kullanır)
│
└── features/                    # Feature-Specific Services
    ├── calendar/
    │   └── services/
    │       └── appointments.service.ts
    ├── calls/
    │   └── services/
    │       └── calls.service.ts
    ├── charts/
    │   └── services/
    │       └── charts.service.ts
    ├── customers/
    │   └── services/
    │       └── customers.service.ts
    ├── dashboard/
    │   └── services/
    │       └── dashboard.service.ts
    ├── experts/
    │   └── services/
    │       ├── experts.service.ts      # Eski (backward compatibility)
    │       └── resources.service.ts    # Yeni (multi-industry support)
    └── notifications/
        └── services/
            └── notifications.service.ts
```

### Service Kategorileri

1. **Global Services** (`src/services/`):
   - Birden fazla feature tarafından kullanılan servisler
   - Örnek: `auth.service.ts`

2. **Feature-Specific Services** (`src/features/[feature]/services/`):
   - Sadece ilgili feature için kullanılan servisler
   - Her feature kendi service dosyasına sahip

## 🚀 Kurulum

### 1. Environment Variables

Proje root'unda `.env.local` dosyası oluşturun:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

**Not:** Production için `.env.production` dosyası oluşturun ve production URL'ini ekleyin.

### 2. API Client

API client zaten oluşturulmuş durumda: `src/lib/api-client.ts`

Bu client otomatik olarak:
- Her istekte token ekler (localStorage'dan)
- 401 hatası durumunda login sayfasına yönlendirir
- Network hatalarını handle eder
- Error mesajlarını düzenler

## 📝 Service Dosyalarını Güncelleme

### Örnek: customers.service.ts

**Şu An (Mock Data):**
```typescript
async getAll(searchQuery?: string): Promise<CustomersData> {
  // TODO: Backend entegrasyonu aktif olduğunda bu kodu kullan
  // const endpoint = searchQuery
  //   ? `/customers?search=${encodeURIComponent(searchQuery)}`
  //   : "/customers";
  // return apiClient.get<CustomersData>(endpoint);

  // Mock implementation
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ customers: [...], total: 2 });
    }, 500);
  });
}
```

**Backend Entegrasyonu Sonrası:**
```typescript
async getAll(searchQuery?: string): Promise<CustomersData> {
  const endpoint = searchQuery
    ? `/customers?search=${encodeURIComponent(searchQuery)}`
    : "/customers";
  
  return apiClient.get<CustomersData>(endpoint);
}
```

### Tüm Service Dosyaları İçin Aynı Pattern

1. **TODO yorumlarını kaldırın**
2. **Mock implementation'ı silin**
3. **API çağrısını aktif edin**

```typescript
// GET request
return apiClient.get<ResponseType>("/endpoint");

// POST request
return apiClient.post<ResponseType>("/endpoint", body);

// PUT request
return apiClient.put<ResponseType>("/endpoint", body);

// DELETE request
return apiClient.delete("/endpoint");
```

## 🔐 Authentication Service

### Auth Service Güncellemesi

`src/services/auth.service.ts` dosyasında:

**Login Response:**
```typescript
export interface LoginResponse {
  user: {
    email: string;
    role: "admin" | "merchant";
    token: string;
  };
  company: Company;  // Şirket bilgisi (sektör dahil)
}
```

**Backend Entegrasyonu:**
```typescript
async login(credentials: LoginRequest): Promise<LoginResponse> {
  return apiClient.post<LoginResponse>("/auth/login", credentials);
}
```

**Önemli:** Backend'iniz login response'unda `company` objesi döndürmelidir:
```json
{
  "user": {
    "email": "hotel@example.com",
    "role": "merchant",
    "token": "jwt-token-here"
  },
  "company": {
    "id": "company-123",
    "name": "Grand Hotel",
    "email": "hotel@example.com",
    "industry": "hotel"  // "beauty_salon" | "hotel" | "cafe" | "restaurant" | "spa" | "fitness" | "clinic"
  }
}
```

## 🏢 Multi-Industry Support

### Resources Service (Multi-Industry)

`src/features/experts/services/resources.service.ts` sektöre göre farklı endpoint'ler kullanır:

```typescript
async getAll(industryType: IndustryType): Promise<ResourcesResponse> {
  // Sektöre göre endpoint belirleme
  const endpoint = 
    industryType === "hotel" 
      ? "/rooms" 
      : industryType === "cafe" || industryType === "restaurant"
      ? "/tables"
      : "/experts";
  
  return apiClient.get<ResourcesResponse>(endpoint);
}
```

**Backend Endpoint'leri:**
- Hotel: `GET /rooms` → Room[] döndürmeli
- Cafe/Restaurant: `GET /tables` → Table[] döndürmeli
- Beauty Salon/Spa/Fitness/Clinic: `GET /experts` → Expert[] döndürmeli

### Company Context

Backend'den gelen company bilgisi otomatik olarak `CompanyContext`'e kaydedilir ve tüm uygulama genelinde kullanılabilir.

## 📁 Güncellenecek Service Dosyaları

### Global Services
1. ✅ `src/services/auth.service.ts`

### Feature-Specific Services
1. ✅ `src/features/calendar/services/appointments.service.ts`
2. ✅ `src/features/calls/services/calls.service.ts`
3. ✅ `src/features/charts/services/charts.service.ts`
4. ✅ `src/features/customers/services/customers.service.ts`
5. ✅ `src/features/dashboard/services/dashboard.service.ts`
6. ✅ `src/features/experts/services/resources.service.ts` (Multi-industry)
7. ✅ `src/features/notifications/services/notifications.service.ts`

## 🔄 API Endpoint'leri (Backend ile Uyumlu Olmalı)

Backend'iniz şu endpoint'leri sağlamalı:

### Authentication
- `POST /auth/login` - Login (user + company döndürmeli)
- `POST /auth/logout` - Logout (opsiyonel)
- `GET /auth/me` - Mevcut kullanıcı bilgisi (user + company)

### Customers
- `GET /customers` - Tüm müşterileri listele
- `GET /customers?search=query` - Müşteri ara
- `GET /customers/:id` - Tek müşteri detayı

### Resources (Multi-Industry)
- `GET /experts` - Uzmanları listele (Beauty Salon, Spa, Fitness, Clinic)
- `POST /experts` - Yeni uzman ekle
- `PUT /experts/:id` - Uzman güncelle
- `DELETE /experts/:id` - Uzman sil

- `GET /rooms` - Odaları listele (Hotel)
- `POST /rooms` - Yeni oda ekle
- `PUT /rooms/:id` - Oda güncelle
- `DELETE /rooms/:id` - Oda sil

- `GET /tables` - Masaları listele (Cafe, Restaurant)
- `POST /tables` - Yeni masa ekle
- `PUT /tables/:id` - Masa güncelle
- `DELETE /tables/:id` - Masa sil

### Appointments
- `GET /appointments` - Randevuları listele
- `GET /appointments?date=YYYY-MM-DD` - Tarihe göre filtrele
- `GET /appointments?status=pending` - Duruma göre filtrele
- `POST /appointments` - Yeni randevu oluştur
- `PUT /appointments/:id` - Randevu güncelle
- `DELETE /appointments/:id` - Randevu sil

### Calls
- `GET /calls` - Arama kayıtlarını listele
- `GET /calls?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD` - Tarih aralığına göre filtrele
- `GET /calls/:id` - Arama detayı

### Dashboard
- `GET /dashboard/stats` - Dashboard istatistikleri

### Charts
- `GET /charts/monthly-appointments` - Aylık randevu verileri

### Notifications
- `GET /notifications` - Bildirimleri listele
- `DELETE /notifications/:id` - Bildirim sil
- `PUT /notifications/:id/read` - Bildirimi okundu olarak işaretle

## 🏢 Multi-Industry Data Structures

### Room (Hotel)
```typescript
{
  id: string;
  type: "room";
  roomNumber: string;
  capacity: number;
  floor: number;
  roomType: string;
  amenities: string[];
  price: number;
}
```

### Table (Cafe/Restaurant)
```typescript
{
  id: string;
  type: "table";
  tableNumber: string;
  capacity: number;
  location: "indoor" | "outdoor" | "window";
  status: "available" | "occupied" | "reserved";
}
```

### Expert (Beauty Salon/Spa/Fitness/Clinic)
```typescript
{
  id: string;
  type: "expert";
  name: string;
  surname: string;
  age: number;
  gender: "Kadın" | "Erkek";
  experience: number;
}
```

## ⚠️ Önemli Notlar

1. **CORS:** Backend'iniz CORS ayarlarını frontend domain'inize izin verecek şekilde yapılandırın.

2. **Token Format:** Backend'iniz JWT token döndürüyorsa, `Authorization: Bearer <token>` formatını kullanın. API client otomatik olarak ekler.

3. **Error Handling:** Service layer'da try-catch kullanmaya gerek yok, API client otomatik handle eder. Hook'larda error state yönetimi yapılır.

4. **Type Safety:** TypeScript type'larını backend response'larına göre güncelleyin (`src/types/` klasörü).

5. **Company Context:** Login sonrası company bilgisi otomatik olarak `CompanyContext`'e kaydedilir. Tüm service'ler bu bilgiyi kullanabilir.

6. **Industry-Based Endpoints:** Resources service sektöre göre farklı endpoint'ler kullanır. Backend'iniz bu endpoint'leri sağlamalıdır.

## 🔄 Migration Checklist

Backend entegrasyonu için yapılacaklar:

- [ ] `.env.local` dosyası oluşturuldu
- [ ] `src/services/auth.service.ts` - Login endpoint'i aktif edildi
- [ ] `src/features/calendar/services/appointments.service.ts` - Mock data kaldırıldı
- [ ] `src/features/calls/services/calls.service.ts` - Mock data kaldırıldı
- [ ] `src/features/charts/services/charts.service.ts` - Mock data kaldırıldı
- [ ] `src/features/customers/services/customers.service.ts` - Mock data kaldırıldı
- [ ] `src/features/dashboard/services/dashboard.service.ts` - Mock data kaldırıldı
- [ ] `src/features/experts/services/resources.service.ts` - Mock data kaldırıldı
- [ ] `src/features/notifications/services/notifications.service.ts` - Mock data kaldırıldı
- [ ] Backend endpoint'leri test edildi
- [ ] CORS ayarları yapılandırıldı
- [ ] Token formatı doğrulandı
- [ ] Error handling test edildi

## 🧪 Test Etme

1. `.env.local` dosyasını oluşturun
2. Backend'inizi çalıştırın
3. Service dosyalarındaki TODO yorumlarını kaldırın ve mock implementation'ları silin
4. API çağrılarını aktif edin
5. Sayfaları test edin
6. Multi-industry support'u test edin (farklı sektörlerle login)

## 📚 Örnek Dosyalar

- `src/services/auth.service.ts` - Global service örneği
- `src/features/customers/services/customers.service.ts` - Feature-specific service örneği
- `src/features/experts/services/resources.service.ts` - Multi-industry service örneği
- `src/lib/api-client.ts` - Merkezi API client

## 🎯 Best Practices

1. **Service Layer'da Business Logic Yok**: Service'ler sadece API çağrıları yapar, business logic hook'larda veya component'lerde olmalı.

2. **Type Safety**: Her service method'u için TypeScript type'ları tanımlanmalı.

3. **Error Handling**: Service layer'da try-catch kullanmayın, API client otomatik handle eder. Hook'larda error state yönetimi yapın.

4. **Mock Data**: Backend entegrasyonu sonrası tüm mock data'ları kaldırın.

5. **Constants**: Mock delay'ler ve diğer sabitler `src/lib/constants.ts` dosyasında merkezi olarak tutulmalı.
