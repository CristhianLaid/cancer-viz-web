"use client";

import { useEffect } from "react";
import { useSample } from "./useSample";

export const useSampleFilterData = (filters: { [key: string]: string }, limit: number, offset: number) => {
  const { data, total, isLoading, error, totalPages, setFilters, setLimit, setOffset } = useSample();

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      setFilters(filters);
      setOffset(0);
    } else {
      setFilters({});
      setOffset(0);
    }

    setLimit(limit);
    setOffset(offset);
  }, [filters, setFilters, setLimit, setOffset, limit, offset]);

  return {
    data,
    total,
    isLoading,
    error,
    totalPages,
  };
};
