"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { db, storage } from "@/firebase";
import { useAppStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";
import toast from "react-hot-toast";

const DeleteModel = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [fileId, setFileId, isDeleteModelOpen, setIsDeleteModelOpen] =
    useAppStore((state) => [
      state.fileId,
      state.setFileId,
      state.isDeleteModelOpen,
      state.setIsDeleteModelOpen,
    ]);

  const deleteFile = async () => {
    if (loading) return;
    if (!user && !fileId) return;
    setLoading(true);
    toast.loading("Deleting...");
    const imageRef = ref(storage, `users/${user?.id}/files/${fileId}`);

    try {
      deleteObject(imageRef).then(() => {
        //@ts-ignore
        deleteDoc(doc(db, "users", user?.id, "files", fileId)).then(() => {
          setLoading(false);
          setFileId(null);
          toast.success("Deleting Successful");
          setIsDeleteModelOpen(false);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog
      open={isDeleteModelOpen}
      onOpenChange={(isOpen) => setIsDeleteModelOpen(isOpen)}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            file.
          </DialogDescription>
        </DialogHeader>
        <div className="flex space-x-2 py-3">
          <Button
            size="sm"
            className="px-3 flex-1"
            variant="ghost"
            onClick={() => setIsDeleteModelOpen(false)}
          >
            <span className="sr-only">Cancel</span>
            <span>Cancel</span>
          </Button>
          <Button
            // disabled={loading}

            type="submit"
            size="sm"
            className="px-3 flex-1"
            variant={"destructive"}
            onClick={() => deleteFile()}
          >
            <span className="sr-only">Delete</span>
            <span>Delete</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModel;
