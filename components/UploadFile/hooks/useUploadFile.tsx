import { ChangeEvent, useRef, useState } from "react";
import { uploadFileAction } from "@/api/uploadFile/uploadFile";
import { useMutation } from "@tanstack/react-query";

export const useUploadFile = () => {
  const [file, setFile] = useState<File>();

  const fileRef = useRef<HTMLInputElement | null>(null);

  const { data, mutate: uploadFile } = useMutation({
    mutationFn: uploadFileAction,
    onSuccess: () => {
      alert("Sukcess");
    },
    onError: (error) => {
      alert(`Error: ${error}`);
    },
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadFile = () => {
    console.log(file?.name, "file?.name");
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
