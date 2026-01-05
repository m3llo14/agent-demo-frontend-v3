import apiClient from "@/lib/api-client";
import { Expert, ExpertsResponse } from "@/types/experts";
import { MOCK_DELAYS } from "@/lib/constants";

/**
 * Experts Service
 * Feature-specific service - Sadece experts modülü için
 * Backend entegrasyonu için hazır - şu an mock data kullanıyor
 */
export const expertsService = {
  /**
   * Tüm uzmanları getir
   * Backend entegrasyonu için hazır
   */
  async getAll(): Promise<ExpertsResponse> {
    // TODO: Backend entegrasyonu aktif olduğunda bu kodu kullan
    // return apiClient.get<ExpertsResponse>("/experts");

    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          experts: [
            {
              id: "1",
              name: "Alperen",
              surname: "Demirci",
              age: 25,
              gender: "Erkek",
              experience: 15,
            },
            {
              id: "2",
              name: "Büşra",
              surname: "Yılmaz",
              age: 25,
              gender: "Kadın",
              experience: 15,
            },
          ],
          total: 2,
        });
      }, MOCK_DELAYS.MEDIUM);
    });
  },

  /**
   * Yeni uzman oluştur
   * Backend entegrasyonu için hazır
   */
  async create(expert: Omit<Expert, "id">): Promise<Expert> {
    // TODO: Backend entegrasyonu aktif olduğunda bu kodu kullan
    // return apiClient.post<Expert>("/experts", expert);

    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        const newExpert: Expert = {
          ...expert,
          id: Date.now().toString(), // Mock ID
        };
        resolve(newExpert);
      }, MOCK_DELAYS.MEDIUM);
    });
  },

  /**
   * Uzman güncelle
   * Backend entegrasyonu için hazır
   */
  async update(expert: Expert): Promise<Expert> {
    // TODO: Backend entegrasyonu aktif olduğunda bu kodu kullan
    // return apiClient.put<Expert>(`/experts/${expert.id}`, expert);

    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(expert);
      }, MOCK_DELAYS.MEDIUM);
    });
  },

  /**
   * Uzman sil
   * Backend entegrasyonu için hazır
   */
  async delete(expertId: string): Promise<void> {
    // TODO: Backend entegrasyonu aktif olduğunda bu kodu kullan
    // return apiClient.delete(`/experts/${expertId}`);

    // Mock implementation
    return Promise.resolve();
  },
};

