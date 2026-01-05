import apiClient from "@/lib/api-client";
import { Customer, CustomersData } from "@/types/customers";
import { MOCK_DELAYS } from "@/lib/constants";

/**
 * Customers Service
 * Feature-specific service - Sadece customers modülü için
 * Backend entegrasyonu için hazır - şu an mock data kullanıyor
 */
export const customersService = {
  /**
   * Müşterileri getir (opsiyonel arama ile)
   * Backend entegrasyonu için hazır
   */
  async getAll(searchQuery?: string): Promise<CustomersData> {
    // TODO: Backend entegrasyonu aktif olduğunda bu kodu kullan
    /*
    const endpoint = searchQuery
      ? `/customers?search=${encodeURIComponent(searchQuery)}`
      : "/customers";
    
    return apiClient.get<CustomersData>(endpoint);
    */

    // Mock data generator - Backend entegrasyonu sonrası kaldırılacak
    const generateMockCustomers = (): Customer[] => {
      return [
        {
          id: "1",
          firstName: "Emre",
          lastName: "Akdeniz",
          phone: "05053951905",
          lastAppointment: null,
          callCount: 0,
          totalSpending: null,
          appointmentCount: 0,
          appointments: [],
        },
        {
          id: "2",
          firstName: "Ali",
          lastName: "Ata",
          phone: "05446222518",
          lastAppointment: "2025-08-07",
          callCount: 1,
          totalSpending: null,
          appointmentCount: 1,
          appointments: [
            {
              id: "app1",
              date: "2025-08-07",
              time: "14:30",
              service: "Saç Kesim",
              duration: 30,
              staff: "Büşra Yılmaz",
              price: 400,
              status: "pending",
            },
          ],
        },
      ];
    };

    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockCustomers = generateMockCustomers();

        // Filter by search query if provided
        let filteredCustomers = mockCustomers;
        if (searchQuery && searchQuery.trim()) {
          const query = searchQuery.toLowerCase().trim();
          filteredCustomers = mockCustomers.filter(
            (customer) =>
              customer.firstName.toLowerCase().includes(query) ||
              customer.lastName.toLowerCase().includes(query) ||
              `${customer.firstName} ${customer.lastName}`
                .toLowerCase()
                .includes(query)
          );
        }

        resolve({
          customers: filteredCustomers,
          total: filteredCustomers.length,
        });
      }, MOCK_DELAYS.LONG);
    });
  },
};

