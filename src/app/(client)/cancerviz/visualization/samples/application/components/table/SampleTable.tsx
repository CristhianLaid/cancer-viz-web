"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/shadcn/dropdown-menu";
import { Skeleton } from "@/ui/shadcn/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/shadcn/table";
import useAuthStore from "@/ui/store/authStore";
import { MoreVertical } from "lucide-react";

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
  onEditClick: (id: number) => void;
  onDeleteClick: (id: number) => void;
}

export const SampleTable = ({
  data,
  isLoading,
  onEditClick,
  onDeleteClick,
}: SampleTableProps) => {
  const { user } = useAuthStore();
  const isAdmin = user?.role === "admin";
  return (
    <div className="overflow-x-auto">
      <Table className="w-full [&_tr:last-child]:border-0">
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="bg-slate-50 font-medium text-slate-600 h-11">
              ID
            </TableHead>
            <TableHead className="bg-slate-50 font-medium text-slate-600 hidden sm:table-cell h-11">
              Project ID
            </TableHead>
            <TableHead className="bg-slate-50 font-medium text-slate-600 h-11">
              Cancer Type
            </TableHead>
            <TableHead className="bg-slate-50 font-medium text-slate-600 hidden sm:table-cell h-11">
              Data Source
            </TableHead>
            <TableHead className="bg-slate-50 font-medium text-slate-600 hidden md:table-cell h-11">
              Accession No.
            </TableHead>
            <TableHead className="bg-slate-50 font-medium text-slate-600 hidden sm:table-cell h-11">
              Country
            </TableHead>
            <TableHead className="bg-slate-50 font-medium text-slate-600 sm:table-cell h-11">
              Sample ID
            </TableHead>
            <TableHead className="bg-slate-50 font-medium text-slate-600 sm:table-cell md:table-cell h-11">
              Sample Type
            </TableHead>
            {isAdmin && (
              <TableHead className="bg-slate-50 font-medium text-slate-600 sm:table-cell md:table-cell h-11">
                Actions
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array(5)
              .fill(0)
              .map((_, idx) => (
                <TableRow key={idx}>
                  {Array(9)
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
              <TableRow
                key={sample.id}
                className="hover:bg-slate-50/60 transition-colors"
              >
                <TableCell className="py-3 px-4">{sample.id}</TableCell>
                <TableCell className="py-3 px-4 hidden sm:table-cell">
                  {sample.projectId}
                </TableCell>
                <TableCell className="py-3 px-4">{sample.cancerType}</TableCell>
                <TableCell className="py-3 px-4 hidden sm:table-cell">
                  {sample.dataSource}
                </TableCell>
                <TableCell className="py-3 px-4 hidden md:table-cell">
                  {sample.accessionNo}
                </TableCell>
                <TableCell className="py-3 px-4 hidden sm:table-cell">
                  {sample.country}
                </TableCell>
                <TableCell className="py-3 px-4 sm:table-cell">
                  {sample.sampleId}
                </TableCell>
                <TableCell className="py-3 px-4 md:table-cell">
                  {sample.sampleType}
                </TableCell>
                {isAdmin && (
                  <TableCell className="py-3 px-4 sm:table-cell md:table-cell">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreVertical className="h-5 w-5 cursor-pointer text-gray-600 hover:text-gray-800" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="bg-white shadow-md rounded-md border border-gray-300"
                      >
                        <DropdownMenuItem
                          onClick={() => onEditClick(sample.id)}
                          className="text-gray-700 hover:bg-gray-200"
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onDeleteClick(sample.id)}
                          className="text-red-600 hover:bg-gray-200"
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={9}
                className="h-24 text-center text-slate-500"
              >
                No samples available.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
