import Dropzone from "@/components/Dropzone";
import TableWrapper from "@/components/table/TableWrapper";
import { db } from "@/firebase";
import { FileType } from "@/typing";
import { auth } from "@clerk/nextjs";
import { collection, getDocs } from "firebase/firestore";
import React from "react";

const Page = async () => {
  const { userId } = auth();

  const docResult = await getDocs(collection(db, "users", userId!, "files"));

  const skeletonFile: FileType[] = docResult.docs.map((doc) => ({
    id: doc.id,
    fileName: doc.data().fileName || doc.id,
    fullName: doc.data().fullName,
    timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
    downloadURL: doc.data().downloadURL,
    type: doc.data().type,
    size: doc.data().size,
  }));

  return (
    <section className="px-5 md:px-10 ">
      <Dropzone />
      <section>
        <h2 className="">All files</h2>
        <TableWrapper skeletonFile={skeletonFile} />
      </section>
    </section>
  );
};

export default Page;
