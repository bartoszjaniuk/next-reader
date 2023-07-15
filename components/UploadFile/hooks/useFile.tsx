import { ChangeEvent, useRef, useState } from "react";

export const useFile = () => {
  const [file, setFile] = useState<File>();
  const [previewUrl, setPreviewUrl] = useState<any>("");
  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result);
    };

    if (e.target.files) {
      setFile(e.target.files[0]);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setFile(undefined);
    if (!fileRef.current) return;
    fileRef.current.value = "";
  };

  return { handleFileChange, removeFile, file, fileRef, previewUrl };
};
