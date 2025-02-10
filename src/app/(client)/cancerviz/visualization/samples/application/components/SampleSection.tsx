"use client";

import { Card, CardContent } from "@/ui/shadcn/card";
import { Badge } from "@/ui/shadcn/badge";
import { Database, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/ui/shadcn/tooltip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/shadcn/select";
import { usePagination } from "../../../application/hooks";
import { useSampleFilterData } from "../hooks";
import { SampleTable } from "./table/SampleTable";
import { PaginationControls } from "../../../application/components/pagination/PaginationControls";

export const SampleSection = ({ filters }: { filters: { [key: string]: string } }) => {
  const { currentPage, limit, offset , handlePageChange, handleLimitChange } = usePagination();

  const { data, total, isLoading, error, totalPages } = useSampleFilterData(filters, limit, offset);

  if (error) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="text-red-500 text-center flex items-center justify-center gap-2">
            <Info className="h-4 w-4" />
            <span>{error}</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full shadow-sm border border-border bg-white">
      <div className="px-6 py-5 border-b border-border flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5 text-primary/80" />
          <span className="text-xl sm:text-2xl font-bold">Sample Data</span>
        </div>
        {total && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Badge variant="secondary">Total: {total.toLocaleString()}</Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Total number of samples in database</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      <SampleTable data={data} isLoading={isLoading} />

      {totalPages > 1 && (
        <div className="flex flex-col items-center justify-center px-6 py-4 gap-1 sm:flex-row border-t border-border bg-slate-50/50">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-700">Show:</span>
            <Select value={limit.toString()} onValueChange={handleLimitChange}>
              <SelectTrigger className="w-24 border border-slate-300 rounded-md shadow-sm">
                <SelectValue placeholder="20" />
              </SelectTrigger>
              <SelectContent className="bg-white shadow-md rounded-md">
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <span className="text-sm font-medium text-slate-700">
            Page <strong>{currentPage + 1}</strong> of <strong>{totalPages}</strong>
          </span>
        </div>
      )}

      <PaginationControls currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};
