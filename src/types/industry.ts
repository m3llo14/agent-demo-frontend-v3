/**
 * Industry Type Definitions
 * Multi-industry support için sektör tipleri ve yapılandırmaları
 */

export type IndustryType = 
  | "beauty_salon" 
  | "hotel" 
  | "cafe" 
  | "restaurant" 
  | "spa" 
  | "fitness" 
  | "clinic";

export interface IndustryFeatures {
  experts: boolean;      // Güzellik salonu için true, otel için false
  rooms: boolean;        // Otel için true, güzellik salonu için false
  tables: boolean;       // Kafe/Restaurant için true
  appointments: boolean; // Genelde hepsi için true
  customers: boolean;    // Genelde hepsi için true
  services: boolean;     // Hizmet yönetimi
  staff: boolean;        // Personel yönetimi (experts'ın genel versiyonu)
}

export interface MenuItemConfig {
  key: string;
  labelKey: string;      // Translation key
  route: string;
  icon: string;          // Icon component name
  feature?: keyof IndustryFeatures; // Hangi feature'a bağlı
}

export interface FieldMappings {
  expert: string;        // Translation key: "fieldMappings.expert" | "fieldMappings.room" | etc.
  customer: string;      // Translation key: "fieldMappings.customer" | "fieldMappings.guest" | etc.
  appointment: string;   // Translation key: "fieldMappings.appointment" | "fieldMappings.reservation" | etc.
  service: string;       // Translation key: "fieldMappings.service" | "fieldMappings.roomType" | etc.
}

export interface IndustryConfig {
  type: IndustryType;
  name: string;          // "Beauty Salon", "Hotel", etc.
  features: IndustryFeatures;
  menuItems: MenuItemConfig[];
  fieldMappings: FieldMappings;
}

export interface Company {
  id: string;
  name: string;
  email: string;
  industry: IndustryType;
  // Backend'den gelecek diğer şirket bilgileri
  [key: string]: unknown;
}

