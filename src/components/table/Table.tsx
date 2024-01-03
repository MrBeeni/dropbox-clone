"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";
import { FileType } from "@/typing";
import { useAppStore } from "@/store/store";
import DeleteModel from "../DeleteModel";
import RenameModel from "../RenameModel";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const [setFileId, setFileName, setIsDeleteModelOpen, setIsRenameModelOpen] =
    useAppStore((state) => [
      state.setFileId,

      state.setFileName,
      state.setIsDeleteModelOpen,
      state.setIsRenameModelOpen,
    ]);

  const openDeleteModel = (fileId: string) => {
    setFileId(fileId);
    setIsDeleteModelOpen(true);
  };
  const openRenameModel = (fileId: string, fileName: string) => {
    setFileId(fileId);
    setFileName(fileName);
    setIsRenameModelOpen(true);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {cell.column.id === "timestamp" ? (
                      <div className="flex flex-col">
                        <div className="text-sm">
                          {(cell.getValue() as Date).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-500">
                          {(cell.getValue() as Date).toLocaleTimeString()}
                        </div>
                      </div>
                    ) : cell.column.id === "fileName" ? (
                      <p className="flex items-center cursor-default">
                        {cell.getValue() as string}
                        <PencilIcon
                          onClick={() => {
                            openRenameModel(
                              (row.original as FileType).id,
                              (row.original as FileType).fileName
                            );
                          }}
                          size={15}
                          className="ml-2 cursor-pointer"
                        />
                      </p>
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </TableCell>
                ))}

                <TableCell key={(row.original as FileType).id}>
                  <Button
                    onClick={() => {
                      openDeleteModel((row.original as FileType).id);
                    }}
                    variant={"outline"}
                  >
                    <TrashIcon size={20} />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                You have no files
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {/* Model */}
      <DeleteModel />
      <RenameModel />
    </div>
  );
}
