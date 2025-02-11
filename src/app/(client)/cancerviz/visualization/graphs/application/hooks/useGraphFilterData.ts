"use client";

import { useEffect } from "react";
import { useGraph } from "./useGraph";


export const useGraphFilterData = (filters: { [key: string]: string }) => {
  const { data, total, isLoading, error, setFilters } = useGraph();

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      setFilters(filters);
    } else {
      setFilters({});
    }

  }, [filters, setFilters]);

  return {
    data,
    total,
    isLoading,
    error
  };
};
