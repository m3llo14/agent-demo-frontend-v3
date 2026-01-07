import apiClient from "@/lib/api-client";
import { CompaniesData, CreateCompanyRequest, CreateCompanyResponse } from "@/types/companies";
import { Company, IndustryType } from "@/types/industry";
import { MOCK_DELAYS } from "@/lib/constants";

/**
 * Companies Service
 * Feature-specific service - Sadece admin companies modülü için
 * Backend entegrasyonu için hazır - şu an mock data kullanıyor
 */
export const companiesService = {
  /**
   * Tüm şirketleri getir (opsiyonel arama ile)
   * Backend entegrasyonu için hazır
   */
  async getAll(searchQuery?: string): Promise<CompaniesData> {
    // TODO: Backend entegrasyonu aktif olduğunda bu kodu kullan
    /*
    const endpoint = searchQuery
      ? `/admin/companies?search=${encodeURIComponent(searchQuery)}`
      : "/admin/companies";
    
    return apiClient.get<CompaniesData>(endpoint);
    */

    // Mock implementation
    const generateMockCompanies = (): Company[] => {
      const industries: IndustryType[] = [
        "beauty_salon",
        "hotel",
        "cafe",
        "restaurant",
        "spa",
        "fitness",
        "clinic",
        "travel_agency",
      ];

      return Array.from({ length: 20 }, (_, i) => ({
        id: `company-${i + 1}`,
        name: `Company ${i + 1}`,
        email: `company${i + 1}@example.com`,
        industry: industries[i % industries.length],
        createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
        status: i % 3 === 0 ? "active" : i % 3 === 1 ? "inactive" : "pending",
      }));
    };

    return new Promise((resolve) => {
      setTimeout(() => {
        const mockCompanies = generateMockCompanies();

        // Filter by search query if provided
        let filteredCompanies = mockCompanies;
        if (searchQuery && searchQuery.trim()) {
          const query = searchQuery.toLowerCase().trim();
          filteredCompanies = mockCompanies.filter(
            (company) =>
              company.name.toLowerCase().includes(query) ||
              company.email.toLowerCase().includes(query)
          );
        }

        resolve({
          companies: filteredCompanies,
          total: filteredCompanies.length,
        });
      }, MOCK_DELAYS.MEDIUM);
    });
  },

  /**
   * Yeni şirket oluştur
   * Backend entegrasyonu için hazır
   */
  async create(data: CreateCompanyRequest): Promise<CreateCompanyResponse> {
    // TODO: Backend entegrasyonu aktif olduğunda bu kodu kullan
    // return apiClient.post<CreateCompanyResponse>("/admin/companies", data);

    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        const newCompany: Company = {
          id: `company-${Date.now()}`,
          name: data.name,
          email: data.email,
          industry: data.industry as IndustryType,
          createdAt: new Date().toISOString(),
          status: "active",
        };

        resolve({
          company: newCompany,
        });
      }, MOCK_DELAYS.MEDIUM);
    });
  },

  /**
   * Şirket detaylarını getir
   * Backend entegrasyonu için hazır
   */
  async getById(id: string): Promise<CompanyDetail> {
    // TODO: Backend entegrasyonu aktif olduğunda bu kodu kullan
    // return apiClient.get<CompanyDetail>(`/admin/companies/${id}`);

    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id,
          name: "Sample Company",
          email: "sample@example.com",
          industry: "beauty_salon",
          createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
          status: "active",
          subscription: {
            id: "sub-1",
            plan: "Premium",
            status: "active",
            startDate: new Date(Date.now() - 86400000 * 10).toISOString(),
            endDate: new Date(Date.now() + 86400000 * 20).toISOString(),
          },
          admins: [
            {
              id: "admin-1",
              email: "admin1@example.com",
              createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
            },
          ],
        });
      }, MOCK_DELAYS.SHORT);
    });
  },

  /**
   * Şirkete abonelik ekle
   * Backend entegrasyonu için hazır
   */
  async addSubscription(companyId: string, data: AddSubscriptionRequest): Promise<Subscription> {
    // TODO: Backend entegrasyonu aktif olduğunda bu kodu kullan
    // return apiClient.post<Subscription>(`/admin/companies/${companyId}/subscriptions`, data);

    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: `sub-${Date.now()}`,
          plan: data.plan,
          status: "active",
          startDate: data.startDate,
          endDate: data.endDate,
        });
      }, MOCK_DELAYS.MEDIUM);
    });
  },

  /**
   * Şirkete admin ekle
   * Backend entegrasyonu için hazır
   */
  async addAdmin(companyId: string, data: AddAdminRequest): Promise<CompanyAdmin> {
    // TODO: Backend entegrasyonu aktif olduğunda bu kodu kullan
    // return apiClient.post<CompanyAdmin>(`/admin/companies/${companyId}/admins`, data);

    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: `admin-${Date.now()}`,
          email: data.email,
          createdAt: new Date().toISOString(),
        });
      }, MOCK_DELAYS.MEDIUM);
    });
  },
};

