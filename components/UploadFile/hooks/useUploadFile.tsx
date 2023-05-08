import { ChangeEvent, useRef, useState } from "react";
import {
  createBookAction,
  uploadFileAction,
} from "@/apiFunctions/uploadFile/uploadFile";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

export const useUploadFile = () => {
  const [file, setFile] = useState<File>();
  const {push} = useRouter();

  const fileRef = useRef<HTMLInputElement | null>(null);

  const {
    data,
    mutate: uploadFile,
    isLoading,
  } = useMutation({
    mutationFn: uploadFileAction,
    onSuccess: (data) => {
      if (!data.data.data) return;
      createBook({ payload: { ...data?.data?.data } });
      push('/materialy')
    },
  });

  const { mutate: createBook } = useMutation({
    mutationFn: createBookAction,
    onSuccess: (data) => {
      console.log({ data });
    },
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadFile = () => {
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
    isLoading,
  };
};
