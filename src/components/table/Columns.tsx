"use client";

import { COLOR_EXTENTION_MAP } from "@/constant";
import { FileType } from "@/typing";
import { ColumnDef } from "@tanstack/react-table";
import { DownloadCloud, Eye } from "lucide-react";
import prettyBytes from "pretty-bytes";
import { FileIcon, defaultStyles } from "react-file-icon";

export const columns: ColumnDef<FileType>[] = [
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ renderValue, ...props }) => {
      const type = renderValue() as string;
      const extention: string = type.split("/")[1];
      return (
        <div className="w-10">
          <FileIcon
            extension={extention}
            labelColor={COLOR_EXTENTION_MAP[extention]}
            // @ts-ignore
            {...defaultStyles[extention]}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "fileName",
    header: "FileName",
  },
  {
    accessorKey: "timestamp",
    header: "Date Added",
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ renderValue, ...props }) => {
      return <span> {prettyBytes(renderValue() as number)} </span>;
    },
  },
  {
    accessorKey: "downloadURL",
    header: "DownloadURL",
    cell: ({ renderValue, ...props }) => {
      return (
        <div className=" flex items-center gap-4 ">
          <span>
            <DownloadCloud className="" />{" "}
          </span>
          <a href={renderValue() as string} target="_blank">
            <Eye />
          </a>
        </div>
      );
    },
  },
];
