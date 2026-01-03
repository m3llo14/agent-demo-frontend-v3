# Backend Entegrasyonu Rehberi

## 📋 Genel Bakış

Bu projede backend entegrasyonu için **merkezi bir API client** kullanılmaktadır. Bu yaklaşım sayesinde:

- ✅ Token yönetimi otomatik yapılır
- ✅ Error handling merkezi olur
- ✅ Base URL environment variable'dan yönetilir
- ✅ DRY prensibi uygulanır (tekrar eden kod yok)

## 🚀 Kurulum

### 1. Environment Variables

Proje root'unda `.env.local` dosyası oluşturun:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

**Not:** Production için `.env.production` dosyası oluşturun ve production URL'ini ekleyin.

### 2. API Client Kullanımı

API client zaten oluşturulmuş durumda: `src/lib/api-client.ts`

Bu client otomatik olarak:
- Her istekte token ekler (localStorage'dan)
- 401 hatası durumunda login sayfasına yönlendirir
- Network hatalarını handle eder
- Error mesajlarını düzenler

## 📝 Hook'ları Güncelleme

### Örnek: use-customers.ts

**Önce (Mock Data):**
```typescript
const fetchCustomers = async (searchQuery?: string): Promise<CustomersData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ customers: [...], total: 2 });
    }, 500);
  });
};
```

**Sonra (Backend Entegrasyonu):**
```typescript
import apiClient from "@/lib/api-client";

const fetchCustomers = async (searchQuery?: string): Promise<CustomersData> => {
  const endpoint = searchQuery
    ? `/customers?search=${encodeURIComponent(searchQuery)}`
    : "/customers";
  
  return apiClient.get<CustomersData>(endpoint);
};
```

### Tüm Hook'lar İçin Aynı Pattern

1. **Import ekle:**
   ```typescript
   import apiClient from "@/lib/api-client";
   ```

2. **Mock data yerine API çağrısı:**
   ```typescript
   // GET request
   return apiClient.get<ResponseType>("/endpoint");
   
   // POST request
   return apiClient.post<ResponseType>("/endpoint", body);
   
   // PUT request
   return apiClient.put<ResponseType>("/endpoint", body);
   
   // DELETE request
   return apiClient.delete<ResponseType>("/endpoint");
   ```

## 🔐 Authentication (Token Yönetimi)

### AuthContext Güncellemesi

Backend'den token geldiğinde `AuthContext.tsx` dosyasını güncelleyin:

```typescript
const login = async (email: string, password: string) => {
  // Backend'e login isteği gönder
  const response = await apiClient.post<{ user: User, token: string }>(
    "/auth/login",
    { email, password },
    { requiresAuth: false } // Login endpoint'i auth gerektirmez
  );

  const userData = {
    email: response.user.email,
    role: response.user.role,
    token: response.token, // Token'ı sakla
  };

  setUser(userData);
  localStorage.setItem("user", JSON.stringify(userData));
  
  // Yönlendirme...
};
```

### Token Otomatik Ekleme

API client otomatik olarak localStorage'dan token'ı alır ve her istekte `Authorization: Bearer <token>` header'ına ekler.

## 📁 Güncellenecek Hook Dosyaları

1. ✅ `src/hooks/use-customers.ts`
2. ✅ `src/hooks/use-experts.ts`
3. ✅ `src/hooks/use-dashboard-stats.ts`
4. ⚠️ `src/contexts/AuthContext.tsx` (login fonksiyonu)

## 🔄 API Endpoint'leri (Backend ile Uyumlu Olmalı)

Backend'iniz şu endpoint'leri sağlamalı:

### Customers
- `GET /customers` - Tüm müşterileri listele
- `GET /customers?search=query` - Müşteri ara
- `GET /customers/:id` - Tek müşteri detayı

### Experts
- `GET /experts` - Tüm uzmanları listele
- `POST /experts` - Yeni uzman ekle
- `PUT /experts/:id` - Uzman güncelle
- `DELETE /experts/:id` - Uzman sil

### Dashboard
- `GET /dashboard/stats` - Dashboard istatistikleri

### Auth
- `POST /auth/login` - Login
- `POST /auth/logout` - Logout (opsiyonel)

## ⚠️ Önemli Notlar

1. **CORS:** Backend'iniz CORS ayarlarını frontend domain'inize izin verecek şekilde yapılandırın.

2. **Token Format:** Backend'iniz JWT token döndürüyorsa, `Authorization: Bearer <token>` formatını kullanın.

3. **Error Handling:** API client otomatik error handling yapar, ama hook'larda try-catch kullanmaya devam edin.

4. **Type Safety:** TypeScript type'larını backend response'larına göre güncelleyin (`src/types/` klasörü).

## 🧪 Test Etme

1. `.env.local` dosyasını oluşturun
2. Backend'inizi çalıştırın
3. Hook dosyalarını güncelleyin
4. Sayfaları test edin

## 📚 Örnek Dosyalar

- `src/hooks/use-customers.example.ts` - Örnek güncellenmiş hook
- `src/lib/api-client.ts` - Merkezi API client

