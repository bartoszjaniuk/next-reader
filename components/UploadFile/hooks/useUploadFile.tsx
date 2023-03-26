import { ChangeEvent, useRef, useState } from "react";
import { uploadFileAction } from "@/api/uploadFile/uploadFile";
import { useMutation } from "@tanstack/react-query";

export const useUploadFile = () => {
  const [file, setFile] = useState<File>();

  const fileRef = useRef<HTMLInputElement | null>(null);

  const { data, mutate: uploadFile } = useMutation({
    mutationFn: uploadFileAction,
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("e.target.files", e.target.files);
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadFile = () => {
    console.log({ file });
    if (!file) return;
    uploadFile(file);
  };

  const removeFile = () => {
    setFile(undefined);
    if (!fileRef.current) return;
    fileRef.current.value = "";
  };

  return {
    data,
    handleFileChange,
    handleUploadFile,
    removeFile,
    file,
    fileRef,
  };
};
