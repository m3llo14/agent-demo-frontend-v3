import apiClient from "@/lib/api-client";
import { Resource, ResourcesResponse, Expert, Room, RestaurantTable, Tour } from "@/types/resources";
import { IndustryType } from "@/types/industry";
import { MOCK_DELAYS } from "@/lib/constants";

/**
 * Resources Service
 * Feature-specific service - Multi-industry support için
 * Backend entegrasyonu için hazır - şu an mock data kullanıyor
 */
export const resourcesService = {
  /**
   * Tüm kaynakları getir (sektöre göre)
   * Backend entegrasyonu için hazır
   */
  async getAll(industryType: IndustryType): Promise<ResourcesResponse> {
    // TODO: Backend entegrasyonu aktif olduğunda bu kodu kullan
    // const endpoint = industryType === "hotel" ? "/rooms" : industryType === "cafe" || industryType === "restaurant" ? "/tables" : industryType === "travel_agency" ? "/tours" : "/experts";
    // return apiClient.get<ResourcesResponse>(endpoint);

    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        if (industryType === "hotel") {
          resolve({
            resources: [
              {
                id: "1",
                type: "room",
                roomNumber: "101",
                capacity: 2,
                floor: 1,
                roomType: "Standard",
                amenities: ["WiFi", "TV", "Minibar"],
                price: 500,
              },
              {
                id: "2",
                type: "room",
                roomNumber: "201",
                capacity: 4,
                floor: 2,
                roomType: "Suite",
                amenities: ["WiFi", "TV", "Minibar", "Jacuzzi"],
                price: 1200,
              },
            ] as Room[],
            total: 2,
          });
        } else if (industryType === "cafe" || industryType === "restaurant") {
          resolve({
            resources: [
              {
                id: "1",
                type: "table",
                tableNumber: "T-01",
                capacity: 4,
                location: "indoor",
                status: "available",
              },
              {
                id: "2",
                type: "table",
                tableNumber: "T-02",
                capacity: 2,
                location: "window",
                status: "occupied",
              },
              {
                id: "3",
                type: "table",
                tableNumber: "T-03",
                capacity: 6,
                location: "outdoor",
                status: "reserved",
              },
            ] as RestaurantTable[],
            total: 3,
          });
        } else if (industryType === "travel_agency") {
          resolve({
            resources: [
              {
                id: "1",
                type: "tour",
                tourName: "Kapadokya Balon Turu",
                destination: "Kapadokya, Türkiye",
                duration: 3,
                capacity: 20,
                price: 5000,
                status: "available",
                departureDate: "2025-06-15",
              },
              {
                id: "2",
                type: "tour",
                tourName: "Antalya Kıyı Turu",
                destination: "Antalya, Türkiye",
                duration: 5,
                capacity: 30,
                price: 7500,
                status: "full",
                departureDate: "2025-07-20",
              },
            ] as Tour[],
            total: 2,
          });
        } else {
          // Default: experts (beauty_salon, spa, fitness, clinic)
          resolve({
            resources: [
              {
                id: "1",
                type: "expert",
                name: "Alperen",
                surname: "Demirci",
                age: 25,
                gender: "Erkek",
                experience: 15,
              },
              {
                id: "2",
                type: "expert",
                name: "Büşra",
                surname: "Yılmaz",
                age: 25,
                gender: "Kadın",
                experience: 15,
              },
            ] as Expert[],
            total: 2,
          });
        }
      }, MOCK_DELAYS.MEDIUM);
    });
  },

  /**
   * Yeni kaynak oluştur
   * Backend entegrasyonu için hazır
   */
  async create(resource: Omit<Resource, "id">, industryType: IndustryType): Promise<Resource> {
    // TODO: Backend entegrasyonu aktif olduğunda bu kodu kullan
    // const endpoint = industryType === "hotel" ? "/rooms" : industryType === "cafe" || industryType === "restaurant" ? "/tables" : "/experts";
    // return apiClient.post<Resource>(endpoint, resource);

    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        const newResource = {
          ...resource,
          id: Date.now().toString(), // Mock ID
        } as Resource;
        resolve(newResource);
      }, MOCK_DELAYS.MEDIUM);
    });
  },

  /**
   * Kaynak güncelle
   * Backend entegrasyonu için hazır
   */
  async update(resource: Resource, industryType: IndustryType): Promise<Resource> {
    // TODO: Backend entegrasyonu aktif olduğunda bu kodu kullan
    // const endpoint = industryType === "hotel" ? "/rooms" : industryType === "cafe" || industryType === "restaurant" ? "/tables" : "/experts";
    // return apiClient.put<Resource>(`${endpoint}/${resource.id}`, resource);

    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(resource);
      }, MOCK_DELAYS.MEDIUM);
    });
  },

  /**
   * Kaynak sil
   * Backend entegrasyonu için hazır
   */
  async delete(resourceId: string, industryType: IndustryType): Promise<void> {
    // TODO: Backend entegrasyonu aktif olduğunda bu kodu kullan
    // const endpoint = industryType === "hotel" ? "/rooms" : industryType === "cafe" || industryType === "restaurant" ? "/tables" : "/experts";
    // return apiClient.delete(`${endpoint}/${resourceId}`);

    // Mock implementation
    return Promise.resolve();
  },
};

