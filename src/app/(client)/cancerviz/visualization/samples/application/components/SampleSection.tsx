"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/ui/shadcn/pagination";
import { useSample } from "../hooks/useSample";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/shadcn/card";
import { Skeleton } from "@/ui/shadcn/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/shadcn/table";
import { Badge } from "@/ui/shadcn/badge";
import { ScrollArea } from "@/ui/shadcn/scroll-area";
import { Database, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/ui/shadcn/tooltip";
import { useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/shadcn/select";


export const SampleSection = ({ filters }: { filters: { [key: string]: string } }) => {
  const {
    data,
    total,
    isLoading,
    error,
    totalPages,
    limit,
    offset,
    setOffset,
    setLimit,
    setFilters,
  } = useSample();
  const currentPage = offset / limit;

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      setFilters(filters);
    } else {
      setFilters({});
    }
  }, [filters, setFilters]);


  const handlePageChange = (newPage: number) => {
    setOffset(newPage * 20);
  };

  const handleLimitChange = (newLimit: string) => {
    const limitNumber = parseInt(newLimit);
    setLimit(limitNumber);
    // Resetear a la primera página cuando se cambia el límite
    setOffset(0);
  };

  const generatePaginationItems = () => {
    const items = [];
    const showAround = 2;

    items.push(
      <PaginationItem key="first">
        <PaginationLink
          onClick={() => handlePageChange(0)}
          isActive={currentPage === 0}
          aria-label="Go to first page"
          className="hover:bg-muted/50 transition-colors"
        >
          1
        </PaginationLink>
      </PaginationItem>
    );

    let startPage = Math.max(1, currentPage - showAround);
    let endPage = Math.min(totalPages - 2, currentPage + showAround);

    if (currentPage < showAround + 1) {
      endPage = Math.min(totalPages - 2, showAround * 2 + 1);
    }

    if (currentPage > totalPages - (showAround + 2)) {
      startPage = Math.max(1, totalPages - (showAround * 2 + 2));
    }

    if (startPage > 1) {
      items.push(
        <PaginationItem key="dots-1">
          <PaginationLink disabled className="cursor-default">
            ...
          </PaginationLink>
        </PaginationItem>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => handlePageChange(i)}
            isActive={currentPage === i}
            aria-label={`Go to page ${i + 1}`}
            className="hover:bg-muted/50 transition-colors"
          >
            {i + 1}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (endPage < totalPages - 2) {
      items.push(
        <PaginationItem key="dots-2">
          <PaginationLink disabled className="cursor-default">
            ...
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (totalPages > 1) {
      items.push(
        <PaginationItem key="last">
          <PaginationLink
            onClick={() => handlePageChange(totalPages - 1)}
            isActive={currentPage === totalPages - 1}
            aria-label={`Go to last page, page ${totalPages}`}
            className="hover:bg-muted/50 transition-colors"
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

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
      <div className="px-6 py-5 border-b border-border">
        <div className="text-xl sm:text-2xl font-bold flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5 text-primary/80" />
            <span>Sample Data</span>
          </div>
          {total && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Badge variant="secondary" className="ml-2">
                    Total: {total.toLocaleString()}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Total number of samples in database</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>
      <div className="w-full">
        <div className="overflow-x-auto">
          <Table className="w-full [&_tr:last-child]:border-0">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="bg-slate-50 font-medium text-slate-600 h-11">ID</TableHead>
                <TableHead className="bg-slate-50 font-medium text-slate-600 hidden sm:table-cell h-11">Project ID</TableHead>
                <TableHead className="bg-slate-50 font-medium text-slate-600 h-11">Cancer Type</TableHead>
                <TableHead className="bg-slate-50 font-medium text-slate-600 hidden sm:table-cell h-11">Data Source</TableHead>
                <TableHead className="bg-slate-50 font-medium text-slate-600 hidden md:table-cell h-11">Accession No.</TableHead>
                <TableHead className="bg-slate-50 font-medium text-slate-600 hidden sm:table-cell h-11">Country</TableHead>
                <TableHead className="bg-slate-50 font-medium text-slate-600 sm:table-cell h-11">Sample ID</TableHead>
                <TableHead className="bg-slate-50 font-medium text-slate-600 sm:table-cell md:table-cell h-11">Sample Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array(5).fill(0).map((_, idx) => (
                  <TableRow key={idx}>
                    {Array(8).fill(0).map((_, cellIdx) => (
                      <TableCell key={cellIdx} className="py-3 px-4">
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : data && data.length > 0 ? (
                data.map((sample) => (
                  <TableRow key={sample.id} className="hover:bg-slate-50/60 transition-colors">
                    <TableCell className="py-3 px-4">{sample.id}</TableCell>
                    <TableCell className="py-3 px-4 hidden sm:table-cell">{sample.projectId}</TableCell>
                    <TableCell className="py-3 px-4">{sample.cancerType}</TableCell>
                    <TableCell className="py-3 px-4 hidden sm:table-cell">{sample.dataSource}</TableCell>
                    <TableCell className="py-3 px-4 hidden md:table-cell">{sample.accessionNo}</TableCell>
                    <TableCell className="py-3 px-4 hidden sm:table-cell">{sample.country}</TableCell>
                    <TableCell className="py-3 px-4 sm:table-cell">{sample.sampleId}</TableCell>
                    <TableCell className="py-3 px-4 md:table-cell">{sample.sampleType}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={12} className="h-24 text-center text-slate-500">
                    No samples available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {totalPages && totalPages > 1 && (
          <div className="flex flex-col items-center justify-center px-6 py-4 gap-1 sm:flex-row border-t border-border bg-slate-50/50">
            <div className="flex items-center justify-between p-4 bg-white shadow-sm rounded-lg">
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
              <div className="text-sm font-medium text-slate-700">
                Page <span className="font-semibold">{currentPage + 1}</span> of{" "}
                <span className="font-semibold">{totalPages}</span>
              </div>
            </div>

            <Pagination>
              <PaginationContent className="flex flex-wrap justify-center sm:justify-start">
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={`${currentPage === 0
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer hover:bg-slate-100"
                      } transition-colors`}
                    aria-label="Go to previous page"
                  />
                </PaginationItem>

                {generatePaginationItems()}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(currentPage + 1)}
                    className={`${currentPage === totalPages - 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer hover:bg-slate-100"
                      } transition-colors`}
                    aria-label="Go to next page"
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
};

export default SampleSection;
