"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { db } from "@/firebase";
import { useAppStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import toast from "react-hot-toast";

const RenameModel = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [
    fileId,
    setFileId,
    fileName,
    setFileName,
    isRenameModelOpen,
    setIsRenameModelOpen,
  ] = useAppStore((state) => [
    state.fileId,
    state.setFileId,
    state.fileName,
    state.setFileName,
    state.isRenameModelOpen,
    state.setIsRenameModelOpen,
  ]);

  const renameFile = async () => {
    if (loading) return;
    if (!user && !fileId) return;
    setLoading(true);
    toast.loading("Renaming...");

    try {
      //@ts-ignore
      await updateDoc(doc(db, "users", user?.id, "files", fileId), {
        fileName: input,
      });
      toast.success("Renaming Successful");
      setInput("");
      setLoading(false);
      setIsRenameModelOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog
      open={isRenameModelOpen}
      onOpenChange={(isOpen) => setIsRenameModelOpen(isOpen)}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Rename The File </DialogTitle>
        </DialogHeader>
        <Input
          id="rename"
          defaultValue={fileName}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          onKeyDownCapture={(e) => {
            if (e.key === "Enter") {
              renameFile();
            }
          }}
        />
        <div className="flex justify-end space-x-2 py-3">
          <Button
            size="sm"
            className="px-3 "
            variant="ghost"
            onClick={() => setIsRenameModelOpen(false)}
          >
            <span className="sr-only">Cancel</span>
            <span>Cancel</span>
          </Button>
          <Button
            type="submit"
            size="sm"
            className="px-3 "
            onClick={() => renameFile()}
          >
            <span className="sr-only">Rename</span>
            <span>Rename</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RenameModel;
