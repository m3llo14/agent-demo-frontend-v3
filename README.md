# Artific Agent - Frontend

Modern, ölçeklenebilir ve çok dilli bir güzellik merkezi yönetim sistemi. Next.js 16, React 19, TypeScript ve Material-UI ile geliştirilmiştir.

## 📋 İçindekiler

- [Genel Bakış](#genel-bakış)
- [Teknoloji Yığını](#teknoloji-yığını)
- [Proje Yapısı](#proje-yapısı)
- [Özellikler](#özellikler)
- [Kurulum](#kurulum)
- [Mimari ve Tasarım Prensipleri](#mimari-ve-tasarım-prensipleri)
- [Yeni Özellik Ekleme Rehberi](#yeni-özellik-ekleme-rehberi)
- [Backend Entegrasyonu](#backend-entegrasyonu)
- [Çoklu Dil Desteği](#çoklu-dil-desteği)
- [Tema Sistemi](#tema-sistemi)
- [Best Practices](#best-practices)

---

## 🎯 Genel Bakış

Bu proje, güzellik merkezleri için kapsamlı bir yönetim sistemi sağlar. Müşteri yönetimi, randevu takibi, uzman yönetimi ve dashboard istatistikleri gibi temel özellikleri içerir.

### Ana Özellikler

- ✅ **Çoklu Dil Desteği**: Türkçe ve İngilizce
- ✅ **Dark/Light Mode**: Kullanıcı tercihine göre tema değişimi
- ✅ **Responsive Tasarım**: Mobil ve desktop uyumlu
- ✅ **Type-Safe**: TypeScript ile tam tip güvenliği
- ✅ **Modüler Yapı**: DRY prensipleri ile temiz kod
- ✅ **Backend Hazır**: API entegrasyonu için hazır yapı

---

## 🛠 Teknoloji Yığını
- **Framework**: Next.js 16.1.1 (App Router)
- **UI Library**: React 19.2.3
- **Language**: TypeScript 5
- **Styling**: Material-UI v7, Tailwind CSS, Emotion
- **State Management**: React Context API
- **Internationalization**: Custom i18n solution

---

## 📁 Proje Yapısı

```
src/
├── app/                    # Next.js App Router sayfaları
│   ├── [locale]/          # Locale-based routing
│   │   ├── (auth)/        # Authentication sayfaları
│   │   ├── (client)/      # Merchant kullanıcı sayfaları
│   │   └── page.tsx
│   ├── admin/             # Admin sayfaları
│   └── layout.tsx         # Root layout
├── components/            # Yeniden kullanılabilir component'ler
│   ├── dashboard/
│   ├── layout/
│   └── ui/
├── contexts/              # React Context'ler
│   ├── AuthContext.tsx
│   └── LocaleContext.tsx
├── features/              # Feature-specific component'ler
│   ├── calendar/
│   ├── customers/
│   ├── dashboard/
│   └── experts/
├── hooks/                 # Custom React hooks
│   ├── use-auth.ts
│   ├── use-calendar.ts
│   ├── use-customers.ts
│   ├── use-dashboard-stats.ts
│   └── use-experts.ts
├── lib/                   # Utility fonksiyonları
│   ├── api-client.ts      # Merkezi API client
│   ├── i18n.ts            # Çeviri fonksiyonları
│   └── utils.ts
├── locales/               # Çeviri dosyaları
│   ├── en.ts
│   └── tr.ts
├── themes/                # Tema tanımları
│   ├── colors.ts
│   ├── spacing.ts
│   └── typography.ts
└── types/                 # TypeScript type tanımları
    ├── calendar.ts
    ├── customers.ts
    ├── dashboard.ts
    └── experts.ts
```

---

## ✨ Özellikler

### 1. Authentication (Kimlik Doğrulama)

**Dosya**: `src/contexts/AuthContext.tsx`, `src/app/[locale]/(auth)/login/page.tsx`

- Email/şifre ile giriş
- Role-based yönlendirme (Admin/Merchant)
- Token yönetimi (localStorage)
- Otomatik logout (401 hatası)

**Kullanım**:
```typescript
import { useAuth } from "@/contexts/AuthContext";

const { user, login, logout, isLoading } = useAuth();
```

### 2. Dashboard

**Dosya**: `src/app/[locale]/(client)/dashboard/page.tsx`

- İstatistik kartları (Toplam Randevu, Bekleyen Randevu, Müşteriler)
- Gerçek zamanlı veri gösterimi
- Loading ve error state yönetimi

**Hook**: `use-dashboard-stats.ts`

### 3. Müşteri Yönetimi (Customers)

**Dosya**: `src/app/[locale]/(client)/customers/page.tsx`

- Müşteri listesi görüntüleme
- Arama fonksiyonu
- Müşteri kartları ile detaylı bilgi
- Randevu geçmişi

**Component**: `CustomerCard.tsx`
**Hook**: `use-customers.ts`

### 4. Uzman Yönetimi (Experts)

**Dosya**: `src/app/[locale]/(client)/experts/page.tsx`

- Uzman listesi (tablo görünümü)
- CRUD işlemleri (Create, Read, Update, Delete)
- Form modal ile ekleme/düzenleme
- Validasyon

**Components**: `ExpertsTable.tsx`, `ExpertFormModal.tsx`
**Hook**: `use-experts.ts`

### 5. Takvim (Calendar)

**Dosya**: `src/app/[locale]/(client)/calendar/page.tsx`

- Aylık takvim görünümü
- Liste görünümü
- Durum filtreleme (Tümü, Beklemede, Onaylandı, İptal, Tamamlandı)
- Gün bazlı randevu görüntüleme (modal)
- Randevu detayları

**Components**: `CalendarView.tsx`, `AppointmentDayModal.tsx`
**Hook**: `use-calendar.ts`

### 6. Çoklu Dil Desteği (i18n)

**Dosyalar**: `src/locales/tr.ts`, `src/locales/en.ts`, `src/lib/i18n.ts`

- Türkçe ve İngilizce desteği
- URL-based locale routing (`/tr/...`, `/en/...`)
- Dinamik dil değiştirme

**Kullanım**:
```typescript
import { useLocale } from "@/contexts/LocaleContext";

const { t, locale, changeLocale } = useLocale();
const title = t("dashboard.title");
```

---

## 🚀 Kurulum

### Gereksinimler

- Node.js 18+ 
- npm/yarn/pnpm

### Adımlar

1. **Bağımlılıkları yükleyin**:
```bash
npm install
```

2. **Environment variables oluşturun** (opsiyonel - backend entegrasyonu için):
```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

3. **Development server'ı başlatın**:
```bash
npm run dev
```

4. **Tarayıcıda açın**:
```
http://localhost:3000
```

---

## 🏗 Mimari ve Tasarım Prensipleri

### 1. DRY (Don't Repeat Yourself)

- Ortak fonksiyonlar `lib/` klasöründe
- Yeniden kullanılabilir component'ler `components/` klasöründe
- Custom hooks ile logic tekrarı önlenir

### 2. Separation of Concerns

- **Pages**: Sadece sayfa yapısı ve routing
- **Features**: Feature-specific component'ler
- **Hooks**: Business logic
- **Types**: Type definitions
- **Contexts**: Global state

### 3. Component Hierarchy

```
Page Component
  └── Feature Component
      └── UI Components
          └── Layout Components
```

### 4. Data Flow

```
API Client → Hook → Component → UI
```

---

## 📚 Yeni Özellik Ekleme Rehberi

Bu rehber, Calendar özelliğini örnek alarak yeni bir feature ekleme sürecini adım adım açıklar.

### Örnek: Calendar Özelliği Ekleme

#### Adım 1: Type Definitions Oluştur

**Dosya**: `src/types/calendar.ts`

```typescript
export type AppointmentStatus = "pending" | "confirmed" | "cancelled" | "completed";

export interface CalendarAppointment {
  id: string;
  date: string; // ISO date string (YYYY-MM-DD)
  time: string; // HH:mm format
  customerId: string;
  customerFirstName: string;
  customerLastName: string;
  service: string;
  duration: number; // minutes
  staffId: string;
  staffName: string;
  price: number;
  status: AppointmentStatus;
}

export interface CalendarAppointmentsResponse {
  appointments: CalendarAppointment[];
  total: number;
}
```

**Önemli Notlar**:
- ✅ Interface'ler backend response'larına uygun olmalı
- ✅ Tüm alanlar için tip tanımları yapılmalı
- ✅ Optional alanlar `?` ile işaretlenmeli

#### Adım 2: Custom Hook Oluştur

**Dosya**: `src/hooks/use-calendar.ts`

```typescript
"use client";

import { useState, useEffect, useCallback } from "react";
import { CalendarAppointment, CalendarAppointmentsResponse, CalendarFilters } from "@/types/calendar";
import apiClient from "@/lib/api-client";

export function useCalendar() {
  const [appointments, setAppointments] = useState<CalendarAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<CalendarFilters>({ status: "all" });

  // Backend entegrasyonu için hazır fonksiyon
  const fetchAppointments = useCallback(async (filters: CalendarFilters) => {
    // TODO: Backend entegrasyonu aktif olduğunda bu kodu kullan
    /*
    const params = new URLSearchParams();
    if (filters.status && filters.status !== "all") {
      params.append("status", filters.status);
    }
    const queryString = params.toString();
    const endpoint = queryString ? `/appointments?${queryString}` : "/appointments";
    return apiClient.get<CalendarAppointmentsResponse>(endpoint);
    */

    // Mock data - Backend entegrasyonu sonrası kaldırılacak
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ appointments: [], total: 0 });
      }, 300);
    });
  }, []);

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchAppointments(filters);
        setAppointments(response.appointments);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load appointments");
      } finally {
        setLoading(false);
      }
    };
    loadAppointments();
  }, [filters, fetchAppointments]);

  return {
    appointments,
    loading,
    error,
    filters,
    updateFilters: (newFilters: Partial<CalendarFilters>) => {
      setFilters((prev) => ({ ...prev, ...newFilters }));
    },
  };
}
```

**Önemli Notlar**:
- ✅ Hook'lar `"use client"` direktifi ile başlamalı
- ✅ Backend entegrasyonu için TODO yorumları eklenmeli
- ✅ Error handling mutlaka yapılmalı
- ✅ Loading state yönetilmeli
- ✅ `useCallback` ile performans optimizasyonu

#### Adım 3: Feature Component'leri Oluştur

**Dosya**: `src/features/calendar/CalendarView.tsx`

```typescript
"use client";

import { useState } from "react";
import { Box, Typography, Tabs, Tab } from "@mui/material";
import { tokens } from "@/themes/colors";
import { useLocale } from "@/contexts/LocaleContext";
import { CalendarAppointment } from "@/types/calendar";

interface CalendarViewProps {
  appointments: CalendarAppointment[];
  loading: boolean;
  onFilterChange: (status: string) => void;
  currentFilter: string;
}

export default function CalendarView({
  appointments,
  loading,
  onFilterChange,
  currentFilter,
}: CalendarViewProps) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useLocale();

  // Component logic here...

  return (
    <Box sx={{ width: "100%" }}>
      {/* Component JSX */}
    </Box>
  );
}
```

**Önemli Notlar**:
- ✅ Component'ler `"use client"` ile başlamalı (client-side rendering için)
- ✅ Props interface'i tanımlanmalı
- ✅ Tema ve renkler `tokens()` fonksiyonu ile alınmalı
- ✅ Çeviriler `useLocale()` hook'u ile yapılmalı
- ✅ Responsive tasarım düşünülmeli

#### Adım 4: Locale Dosyalarını Güncelle

**Dosya**: `src/locales/tr.ts`

```typescript
export default {
  // ... existing translations
  calendar: {
    title: "Randevular",
    calendarView: "Takvim",
    listView: "Liste",
    filters: {
      all: "Tümü",
      pending: "Beklemede",
      confirmed: "Onaylandı",
      cancelled: "İptal Edildi",
      completed: "Tamamlandı",
    },
    // ... more translations
  },
};
```

**Dosya**: `src/locales/en.ts`

```typescript
export default {
  // ... existing translations
  calendar: {
    title: "Appointments",
    calendarView: "Calendar",
    listView: "List",
    filters: {
      all: "All",
      pending: "Pending",
      confirmed: "Confirmed",
      cancelled: "Cancelled",
      completed: "Completed",
    },
    // ... more translations
  },
};
```

**Önemli Notlar**:
- ✅ Her yeni özellik için hem TR hem EN çevirileri eklenmeli
- ✅ Çeviri key'leri hiyerarşik yapıda olmalı (örn: `calendar.filters.all`)
- ✅ Key isimleri açıklayıcı olmalı

#### Adım 5: Page Component Oluştur

**Dosya**: `src/app/[locale]/(client)/calendar/page.tsx`

```typescript
"use client";

import { useState, useEffect } from "react";
import { Box, Alert } from "@mui/material";
import { useCalendar } from "@/hooks/use-calendar";
import CalendarView from "@/features/calendar/CalendarView";

export default function CalendarPage() {
  const { appointments, loading, error, filters, updateFilters } = useCalendar();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleFilterChange = (status: string) => {
    updateFilters({ status: status === "all" ? "all" : (status as any) });
  };

  if (!mounted) {
    return <Box sx={{ width: "100%" }} />;
  }

  if (error) {
    return (
      <Box p={2}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      <CalendarView
        appointments={appointments}
        loading={loading}
        onFilterChange={handleFilterChange}
        currentFilter={filters.status || "all"}
      />
    </Box>
  );
}
```

**Önemli Notlar**:
- ✅ Page component'ler `"use client"` ile başlamalı
- ✅ Hydration hatasını önlemek için `mounted` state kullanılmalı
- ✅ Error handling yapılmalı
- ✅ Loading state gösterilmeli

#### Adım 6: Sidebar'a Menü Ekle

**Dosya**: `src/components/layout/Sidebar.tsx`

```typescript
<Item
  title={t("sidebar.calendar")}
  to={`/${locale}/calendar`}
  icon={<CalendarTodayOutlinedIcon />}
  pathname={pathname}
/>
```

**Önemli Notlar**:
- ✅ Sidebar'da menü item'ı eklenmeli
- ✅ Icon Material-UI'dan import edilmeli
- ✅ Route locale ile başlamalı (`/${locale}/...`)

#### Adım 7: Backend Entegrasyonu (Opsiyonel)

Backend hazır olduğunda, hook'taki mock data kısmını kaldırıp API çağrılarını aktif edin:

```typescript
// use-calendar.ts içinde
const fetchAppointments = useCallback(async (filters: CalendarFilters) => {
  const params = new URLSearchParams();
  if (filters.status && filters.status !== "all") {
    params.append("status", filters.status);
  }
  const queryString = params.toString();
  const endpoint = queryString ? `/appointments?${queryString}` : "/appointments";
  
  return apiClient.get<CalendarAppointmentsResponse>(endpoint);
}, []);
```

---

## 🔌 Backend Entegrasyonu

### API Client

**Dosya**: `src/lib/api-client.ts`

Merkezi API client tüm HTTP isteklerini yönetir:

- ✅ Otomatik token ekleme
- ✅ 401 hatası durumunda logout
- ✅ Error handling
- ✅ Base URL environment variable'dan

**Kullanım**:
```typescript
import apiClient from "@/lib/api-client";

// GET request
const data = await apiClient.get<ResponseType>("/endpoint");

// POST request
const result = await apiClient.post<ResponseType>("/endpoint", body);

// PUT request
const updated = await apiClient.put<ResponseType>("/endpoint", body);

// DELETE request
await apiClient.delete("/endpoint");
```

### Environment Variables

`.env.local` dosyası oluşturun:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### Backend Entegrasyonu Adımları

1. **Hook'ta mock data'yı kaldırın**
2. **API endpoint'lerini ekleyin**
3. **Type'ları backend response'larına göre güncelleyin**
4. **Error handling'i test edin**

Detaylı bilgi için `BACKEND_INTEGRATION.md` dosyasına bakın.

---

## 🌍 Çoklu Dil Desteği

### Yeni Çeviri Ekleme

1. **`src/locales/tr.ts`** dosyasına Türkçe çeviri ekleyin
2. **`src/locales/en.ts`** dosyasına İngilizce çeviri ekleyin
3. **Component'te kullanın**:

```typescript
const { t } = useLocale();
const title = t("feature.section.title");
```

### Çeviri Key Yapısı

```typescript
{
  feature: {
    title: "Başlık",
    section: {
      subtitle: "Alt Başlık",
      button: "Buton"
    }
  }
}
```

**Kullanım**: `t("feature.section.button")`

---

## 🎨 Tema Sistemi

### Renkler

**Dosya**: `src/themes/colors.ts`

```typescript
import { tokens } from "@/themes/colors";

const colors = tokens(theme.palette.mode);
// colors.blueAccent[500]
// colors.grey[100]
// colors.primary[400]
```

### Dark/Light Mode

Tema otomatik olarak localStorage'dan okunur ve kullanıcı tercihine göre değişir.

### Tema Kullanımı

```typescript
const theme = useTheme();
const isLightMode = theme.palette.mode === "light";

sx={{
  backgroundColor: isLightMode ? "#ffffff" : colors.primary[400],
  color: isLightMode ? colors.grey[100] : colors.grey[100],
}}
```

---

## ✅ Best Practices

### 1. Component Yapısı

- ✅ Her component tek bir sorumluluğa sahip olmalı
- ✅ Props interface'leri tanımlanmalı
- ✅ Component'ler küçük ve odaklı olmalı

### 2. Hook Kullanımı

- ✅ Business logic hook'larda olmalı
- ✅ UI logic component'lerde olmalı
- ✅ Custom hook'lar `use-` prefix'i ile başlamalı

### 3. Type Safety

- ✅ Tüm props için type tanımları
- ✅ API response'lar için interface'ler
- ✅ `any` kullanımından kaçının

### 4. Error Handling

- ✅ Try-catch blokları kullanın
- ✅ User-friendly error mesajları
- ✅ Loading state gösterin

### 5. Performance

- ✅ `useCallback` ve `useMemo` kullanın
- ✅ Gereksiz re-render'ları önleyin
- ✅ Lazy loading düşünün

### 6. Code Organization

- ✅ Feature-based klasör yapısı
- ✅ İlgili dosyalar birlikte
- ✅ Açıklayıcı dosya isimleri

### 7. Accessibility

- ✅ Semantic HTML kullanın
- ✅ ARIA labels ekleyin
- ✅ Keyboard navigation desteği

---

## 📝 Checklist: Yeni Özellik Ekleme

Yeni bir özellik eklerken bu checklist'i takip edin:

- [ ] Type definitions oluşturuldu (`src/types/`)
- [ ] Custom hook oluşturuldu (`src/hooks/`)
- [ ] Feature component'leri oluşturuldu (`src/features/`)
- [ ] Locale dosyaları güncellendi (TR ve EN)
- [ ] Page component oluşturuldu (`src/app/[locale]/(client)/`)
- [ ] Sidebar'a menü eklendi (gerekirse)
- [ ] Backend entegrasyonu için TODO yorumları eklendi
- [ ] Error handling yapıldı
- [ ] Loading state eklendi
- [ ] Responsive tasarım kontrol edildi
- [ ] Dark/Light mode desteği eklendi
- [ ] TypeScript hataları kontrol edildi
- [ ] Linter hataları düzeltildi

---

## 🐛 Sorun Giderme

### Hydration Hatası

```typescript
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

if (!mounted) {
  return <Box />; // Empty render
}
```

### TypeScript Hataları

- Type tanımlarını kontrol edin
- `as` kullanımından kaçının, doğru type'ları kullanın
- Optional chaining (`?.`) kullanın

### Styling Sorunları

- Tema renklerini `tokens()` ile alın
- Light/Dark mode için conditional styling yapın
- Material-UI `sx` prop'unu kullanın

---

## 📚 Kaynaklar

- [Next.js Documentation](https://nextjs.org/docs)
- [Material-UI Documentation](https://mui.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Hooks](https://react.dev/reference/react)

---

## 🤝 Katkıda Bulunma

1. Yeni özellik eklerken bu README'deki rehberi takip edin
2. DRY prensiplerine uyun
3. Type safety'yi koruyun
4. Çevirileri her iki dil için de ekleyin
5. Code review yapın

---

## 📄 Lisans

Bu proje özel bir projedir.

---

**Son Güncelleme**: 2025