"use client";

import { useState, useEffect } from "react";
import { Expert, ExpertsResponse } from "@/types/experts";

// TODO: API endpoint'i eklendiğinde bu fonksiyon gerçek API çağrısı yapacak
const fetchExperts = async (): Promise<ExpertsResponse> => {
  // Simüle edilmiş API çağrısı
  // Gerçek implementasyonda: return await fetch('/api/experts').then(res => res.json());
  
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
    }, 300);
  });
};

export const useExperts = () => {
  const [data, setData] = useState<Expert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadExperts = async () => {
      try {
        setLoading(true);
        const response = await fetchExperts();
        setData(response.experts);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load experts");
      } finally {
        setLoading(false);
      }
    };

    loadExperts();
  }, []);

  const refetch = async () => {
    try {
      setLoading(true);
      const response = await fetchExperts();
      setData(response.experts);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load experts");
    } finally {
      setLoading(false);
    }
  };

  // TODO: Database entegrasyonu ile gerçek API çağrısı yapılacak
  const deleteExpert = async (expertId: string) => {
    try {
      // Gerçek implementasyonda: await fetch(`/api/experts/${expertId}`, { method: 'DELETE' });
      // Şu an mock data için local state'ten siliniyor
      setData((prev) => prev.filter((expert) => expert.id !== expertId));
      return { success: true };
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Failed to delete expert");
    }
  };

  // TODO: Database entegrasyonu ile gerçek API çağrısı yapılacak
  const updateExpert = async (expert: Expert) => {
    try {
      // Gerçek implementasyonda: await fetch(`/api/experts/${expert.id}`, { method: 'PUT', body: JSON.stringify(expert) });
      // Şu an mock data için local state güncelleniyor
      setData((prev) =>
        prev.map((item) => (item.id === expert.id ? expert : item))
      );
      return { success: true, expert };
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Failed to update expert");
    }
  };

  // TODO: Database entegrasyonu ile gerçek API çağrısı yapılacak
  const createExpert = async (expert: Omit<Expert, "id">) => {
    try {
      // Gerçek implementasyonda: await fetch('/api/experts', { method: 'POST', body: JSON.stringify(expert) });
      // Şu an mock data için local state'e ekleniyor
      const newExpert: Expert = {
        ...expert,
        id: Date.now().toString(), // Mock ID
      };
      setData((prev) => [...prev, newExpert]);
      return { success: true, expert: newExpert };
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Failed to create expert");
    }
  };

  return { data, loading, error, refetch, deleteExpert, updateExpert, createExpert };
};

