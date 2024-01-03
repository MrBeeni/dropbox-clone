"use client";

import { FileType } from "@/typing";
import React, { FC, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { DataTable } from "./Table";
import { columns } from "./Columns";
import { useUser } from "@clerk/nextjs";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppStore } from "@/store/store";

interface TableProps {
  skeletonFile: FileType[];
}
const TableWrapper: FC<TableProps> = ({ skeletonFile }) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [initilaFiles, setInitialFiles] = useState<FileType[]>([]);
  const [sort, setSort] = useState<"asc" | "desc">("asc");

  const [docResult, loading, error] = useCollection(
    user &&
      query(
        collection(db, "users", user.id, "files"),
        orderBy("timestamp", sort)
      )
  );
  useEffect(() => {
    if (!docResult) return;
    const files: FileType[] = docResult.docs.map((doc) => ({
      id: doc.id,
      fileName: doc.data().fileName || doc.id,
      fullName: doc.data().fullName,
      timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
      downloadURL: doc.data().downloadURL,
      type: doc.data().type,
      size: doc.data().size,
    }));
    setInitialFiles(files);
  }, [docResult]);
  if (docResult?.docs.length === undefined) {
    return (
      <div className="flex flex-col">
        <Button variant={"outline"} className="ml-auto h-10 w-36 mb-5">
          <Skeleton className="h-5 w-full" />
        </Button>
        <div className="border rounded-lg">
          <div className="border-b h-12"></div>
          {skeletonFile.map((file) => (
            <div
              key={file.id}
              className="flex items-center space-x-4 p-5 w-full"
            >
              <Skeleton className="h-12 w-12" />
              <Skeleton className="h-12 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col  pb-10">
      <Button
        onClick={() => setSort(sort == "asc" ? "desc" : "asc")}
        className="ml-auto mb-5"
      >
        Sort By {sort == "desc" ? "Newest" : "Oldest"}
      </Button>
      <DataTable columns={columns} data={initilaFiles} />
    </div>
  );
};

export default TableWrapper;
