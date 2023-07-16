import { ChangeEvent, useEffect, useRef, useState } from "react";

export const useFile = () => {
  const [file, setFile] = useState<File>();
  const [previewUrl, setPreviewUrl] = useState<any>("");
  const [imageFileErrorMessage, setImageFileErrorMessage] = useState<
    string | undefined
  >(undefined);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];

    const maxSizeInBytes = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSizeInBytes) {
      return setImageFileErrorMessage(
        "Limit wielkości pliku został przekroczony. 🔥"
      );
    }

    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      return setImageFileErrorMessage(
        "Nieprawidłowy typ pliku. Tylko pliki graficzne są dozwolone."
      );
    }
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result);
    };

    setFile(file);
    reader.readAsDataURL(file);
  };

  const removeFile = () => {
    setFile(undefined);
    if (!fileRef.current) return;
    fileRef.current.value = "";
  };

  useEffect(() => {
    setTimeout(() => {
      setImageFileErrorMessage(undefined);
    }, 4000);
  }, [imageFileErrorMessage, setImageFileErrorMessage]);
  return {
    handleFileChange,
    removeFile,
    file,
    fileRef,
    previewUrl,
    imageFileErrorMessage,
  };
};
