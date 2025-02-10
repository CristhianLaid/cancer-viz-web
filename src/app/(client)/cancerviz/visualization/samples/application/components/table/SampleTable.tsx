"use client";

import { Skeleton } from "@/ui/shadcn/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/shadcn/table";

interface Sample {
  id: number;
  projectId: string;
  cancerType: string;
  dataSource: string;
  accessionNo: string;
  country: string;
  sampleId: string;
  sampleType: string;
}

interface SampleTableProps {
  data: Sample[] | null;
  isLoading: boolean;
}

export const SampleTable = ({ data, isLoading }: SampleTableProps) => {
  return (
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
            Array(5)
              .fill(0)
              .map((_, idx) => (
                <TableRow key={idx}>
                  {Array(8)
                    .fill(0)
                    .map((_, cellIdx) => (
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
              <TableCell colSpan={8} className="h-24 text-center text-slate-500">
                No samples available.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
