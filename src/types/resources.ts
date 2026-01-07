/**
 * Resource Type Definitions
 * Multi-industry support için farklı sektörlerdeki kaynak tipleri
 */

export type ResourceType = "expert" | "room" | "table" | "tour";

// Base interface
export interface BaseResource {
  id: string;
}

// Expert (Beauty Salon, Spa, Fitness, Clinic için)
export interface Expert extends BaseResource {
  type: "expert";
  name: string;
  surname: string;
  age: number;
  gender: "Kadın" | "Erkek";
  experience: number; // Yıl cinsinden
}

// Room (Hotel için)
export interface Room extends BaseResource {
  type: "room";
  roomNumber: string;
  capacity: number;
  floor: number;
  roomType: string;
  amenities: string[];
  price: number;
}

// RestaurantTable (Cafe, Restaurant için)
export interface RestaurantTable extends BaseResource {
  type: "table";
  tableNumber: string;
  capacity: number;
  location: "indoor" | "outdoor" | "window";
  status: "available" | "occupied" | "reserved";
}

// Tour (Travel Agency için)
export interface Tour extends BaseResource {
  type: "tour";
  tourName: string;
  destination: string;
  duration: number; // Gün cinsinden
  price: number;
  capacity: number;
  status: "available" | "full" | "cancelled";
  departureDate?: string; // ISO date string (YYYY-MM-DD)
}

// Union type - Tüm resource tipleri
export type Resource = Expert | Room | RestaurantTable | Tour;

// Response type
export interface ResourcesResponse {
  resources: Resource[];
  total: number;
}

