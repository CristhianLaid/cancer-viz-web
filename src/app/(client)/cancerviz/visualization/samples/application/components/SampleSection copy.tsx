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

export const SampleSection = () => {
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
  } = useSample();
  const currentPage = offset / limit;

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
    <Card className="w-full">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-xl sm:text-2xl font-bold flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5 text-muted-foreground" />
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
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 sm:p-6">
        <ScrollArea className="rounded-md border bg-card">
          <div className="relative w-full overflow-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  {/* <TableHead className="font-semibold">ID</TableHead>
                  <TableHead className="font-semibold">Project ID</TableHead>
                  <TableHead className="font-semibold">Cancer Type</TableHead>
                  <TableHead className="font-semibold">Data Source</TableHead>
                  <TableHead className="font-semibold">Accession No.</TableHead>
                  <TableHead className="font-semibold">Country</TableHead>
                  <TableHead className="font-semibold">Sample ID</TableHead>
                  <TableHead className="font-semibold">Sample Type</TableHead>
                  <TableHead className="font-semibold">Age</TableHead>
                  <TableHead className="font-semibold">Survival (Months)</TableHead>
                  <TableHead className="font-semibold">Tumor Size</TableHead>
                  <TableHead className="font-semibold">Metastasis Count</TableHead> */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array(5)
                    .fill(0)
                    .map((_, idx) => (
                      <TableRow
                        key={idx}
                        className="hover:bg-muted/50 transition-colors"
                      >
                        {Array(12)
                          .fill(0)
                          .map((_, cellIdx) => (
                            <TableCell key={cellIdx} className="p-2 sm:p-4">
                              <Skeleton className="h-4 w-full" />
                            </TableCell>
                          ))}
                      </TableRow>
                    ))
                ) : data && data.length > 0 ? (
                  data.map((sample) => (
                    <TableRow
                      key={sample.id}
                      className="hover:bg-muted/50 transition-colors"
                    >
                      {/* <TableCell className="font-medium p-2 sm:p-4">{sample.id}</TableCell>
                      <TableCell className="p-2 sm:p-4">{sample.projectId}</TableCell>
                      <TableCell className="p-2 sm:p-4">{sample.cancerType}</TableCell>
                      <TableCell className="p-2 sm:p-4">{sample.dataSource}</TableCell>
                      <TableCell className="p-2 sm:p-4">{sample.accessionNo}</TableCell>
                      <TableCell className="p-2 sm:p-4">{sample.country}</TableCell>
                      <TableCell className="p-2 sm:p-4">{sample.sampleId}</TableCell>
                      <TableCell className="p-2 sm:p-4">{sample.sampleType}</TableCell>
                      <TableCell className="p-2 sm:p-4">{sample.age}</TableCell>
                      <TableCell className="p-2 sm:p-4">{sample.survivalMonths}</TableCell>
                      <TableCell className="p-2 sm:p-4">{sample.tumorSize}</TableCell>
                      <TableCell className="p-2 sm:p-4">{sample.metastasisCount}</TableCell> */}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={12} className="h-24 text-center">
                      No samples available.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </ScrollArea>

        {totalPages && totalPages > 1 && (
          <div className="flex flex-col items-center justify-center mt-4 gap-1 sm:flex-row">
            <div className="flex items-center space-x-2">
              <p className="text-sm text-muted-foreground">
                Page {currentPage + 1} of {totalPages}
              </p>
            </div>
            <Pagination>
              <PaginationContent className="flex flex-wrap justify-center sm:justify-start">
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={`${
                      currentPage === 0
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer hover:bg-muted/50"
                    } transition-colors`}
                    aria-label="Go to previous page"
                  />
                </PaginationItem>

                {generatePaginationItems()}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(currentPage + 1)}
                    className={`${
                      currentPage === totalPages - 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer hover:bg-muted/50"
                    } transition-colors`}
                    aria-label="Go to next page"
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SampleSection;
