/**
 * Merkezi API Client
 * Tüm API çağrıları bu client üzerinden yapılır.
 * Token yönetimi, error handling ve base URL burada yönetilir.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

interface RequestOptions extends RequestInit {
  requiresAuth?: boolean;
}

class ApiClient {
  private getAuthToken(): string | null {
    if (typeof window === "undefined") return null;
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const userData = JSON.parse(user);
        return userData.token || null;
      } catch {
        return null;
      }
    }
    return null;
  }

  private async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const { requiresAuth = true, ...fetchOptions } = options;

    // Headers hazırla
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(fetchOptions.headers as Record<string, string>),
    };

    // Auth token ekle (eğer gerekliyse)
    if (requiresAuth) {
      const token = this.getAuthToken();
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }

    // Full URL oluştur
    const url = endpoint.startsWith("http") ? endpoint : `${API_BASE_URL}${endpoint}`;

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        headers,
      });

      // Response'u parse et
      let data: T;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = (await response.text()) as unknown as T;
      }

      // Error handling
      if (!response.ok) {
        // 401 Unauthorized - Token geçersiz veya süresi dolmuş
        if (response.status === 401) {
          if (typeof window !== "undefined") {
            localStorage.removeItem("user");
            window.location.href = "/tr/login";
          }
          throw new Error("Unauthorized. Please login again.");
        }

        // 403 Forbidden
        if (response.status === 403) {
          throw new Error("You don't have permission to perform this action.");
        }

        // 404 Not Found
        if (response.status === 404) {
          throw new Error("Resource not found.");
        }

        // 500 Server Error
        if (response.status >= 500) {
          throw new Error("Server error. Please try again later.");
        }

        // Diğer hatalar
        const errorMessage =
          (data as any)?.message ||
          (data as any)?.error ||
          `Request failed with status ${response.status}`;
        throw new Error(errorMessage);
      }

      return data;
    } catch (error) {
      // Network error veya diğer hatalar
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        throw new Error("Network error. Please check your connection.");
      }
      throw error;
    }
  }

  // GET request
  async get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "GET",
    });
  }

  // POST request
  async post<T>(
    endpoint: string,
    body?: any,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  // PUT request
  async put<T>(
    endpoint: string,
    body?: any,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  // PATCH request
  async patch<T>(
    endpoint: string,
    body?: any,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  // DELETE request
  async delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "DELETE",
    });
  }
}

// Singleton instance
export const apiClient = new ApiClient();

// Export default olarak da kullanılabilir
export default apiClient;

