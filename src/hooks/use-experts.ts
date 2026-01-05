"use client";

import { useState, useEffect, useCallback } from "react";
import { Expert } from "@/types/experts";
import { expertsService } from "@/features/experts/services/experts.service";

export const useExperts = () => {
  const [data, setData] = useState<Expert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadExperts = async () => {
      try {
        setLoading(true);
        const response = await expertsService.getAll();
        setData(response.experts);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load experts"
        );
      } finally {
        setLoading(false);
      }
    };

    loadExperts();
  }, []);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await expertsService.getAll();
      setData(response.experts);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load experts");
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteExpert = async (expertId: string) => {
    try {
      await expertsService.delete(expertId);
      setData((prev) => prev.filter((expert) => expert.id !== expertId));
      return { success: true };
    } catch (err) {
      throw new Error(
        err instanceof Error ? err.message : "Failed to delete expert"
      );
    }
  };

  const updateExpert = async (expert: Expert) => {
    try {
      const updatedExpert = await expertsService.update(expert);
      setData((prev) =>
        prev.map((item) => (item.id === expert.id ? updatedExpert : item))
      );
      return { success: true, expert: updatedExpert };
    } catch (err) {
      throw new Error(
        err instanceof Error ? err.message : "Failed to update expert"
      );
    }
  };

  const createExpert = async (expert: Omit<Expert, "id">) => {
    try {
      const newExpert = await expertsService.create(expert);
      setData((prev) => [...prev, newExpert]);
      return { success: true, expert: newExpert };
    } catch (err) {
      throw new Error(
        err instanceof Error ? err.message : "Failed to create expert"
      );
    }
  };

  return { data, loading, error, refetch, deleteExpert, updateExpert, createExpert };
};

