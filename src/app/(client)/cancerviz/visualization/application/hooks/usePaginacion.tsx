"use client";

import { useSample } from "../../samples/application/hooks";

export const usePagination = () => {
  const {limit, offset, setLimit, setOffset} = useSample();

  const currentPage = Math.floor(offset / limit);

  const handlePageChange = (newPage: number) => {
    setOffset(newPage * limit);
  };

  const handleLimitChange = (newLimit: string) => {
    const limitNumber = parseInt(newLimit);
    setLimit(limitNumber);
    setOffset(0);
  };

  return {
    limit,
    offset: currentPage * limit,
    currentPage,
    setOffset,
    setLimit,
    handlePageChange,
    handleLimitChange,
  };
};
