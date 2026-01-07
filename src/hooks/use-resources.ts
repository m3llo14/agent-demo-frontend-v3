"use client";

import { useState, useEffect, useCallback } from "react";
import { Resource } from "@/types/resources";
import { resourcesService } from "@/features/experts/services/resources.service";
import { useCompany } from "@/contexts/CompanyContext";

export const useResources = () => {
  const { company } = useCompany();
  const [data, setData] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const industryType = company?.industry || "beauty_salon";

  useEffect(() => {
    const loadResources = async () => {
      try {
        setLoading(true);
        const response = await resourcesService.getAll(industryType);
        setData(response.resources);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load resources"
        );
      } finally {
        setLoading(false);
      }
    };

    loadResources();
  }, [industryType]);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await resourcesService.getAll(industryType);
      setData(response.resources);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load resources");
    } finally {
      setLoading(false);
    }
  }, [industryType]);

  const deleteResource = async (resourceId: string) => {
    try {
      await resourcesService.delete(resourceId, industryType);
      setData((prev) => prev.filter((resource) => resource.id !== resourceId));
      return { success: true };
    } catch (err) {
      throw new Error(
        err instanceof Error ? err.message : "Failed to delete resource"
      );
    }
  };

  const updateResource = async (resource: Resource) => {
    try {
      const updatedResource = await resourcesService.update(resource, industryType);
      setData((prev) =>
        prev.map((item) => (item.id === resource.id ? updatedResource : item))
      );
      return { success: true, resource: updatedResource };
    } catch (err) {
      throw new Error(
        err instanceof Error ? err.message : "Failed to update resource"
      );
    }
  };

  const createResource = async (resource: Omit<Resource, "id">) => {
    try {
      const newResource = await resourcesService.create(resource, industryType);
      setData((prev) => [...prev, newResource]);
      return { success: true, resource: newResource };
    } catch (err) {
      throw new Error(
        err instanceof Error ? err.message : "Failed to create resource"
      );
    }
  };

  return { data, loading, error, refetch, deleteResource, updateResource, createResource };
};

