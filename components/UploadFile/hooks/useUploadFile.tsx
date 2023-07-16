import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { uploadFileAndSerialize } from "@/apiFunctions/book/uploadFileAndSerialize";
import { createBook as createBookMutation } from "@/apiFunctions/book/createBook";
import { uploadImageToCloudinary } from "@/apiFunctions/book/uploadImageToCloudinary";

type UseUploadFileProps = {
  step: number;
  prevStep: () => void;
  resetStep: () => void;
  nextStep: () => void;
};

export const useUploadFile = ({ resetStep, nextStep }: UseUploadFileProps) => {
  const { push } = useRouter();
  const [cloudinaryImageUrl, setCloudinaryImageUrl] = useState("");
  const [bookFile, setBookFile] = useState<File>();
  const [bookFileErrorMessage, setBookFileErrorMessage] = useState<
    string | undefined
  >(undefined);

  useEffect(() => {
    setTimeout(() => {
      setBookFileErrorMessage(undefined);
    }, 4000);
  }, [bookFileErrorMessage, setBookFileErrorMessage]);

  const bookFileRef = useRef<HTMLInputElement | null>(null);

  const {
    data,
    mutate: serializeAndUploadBook,
    isLoading,
  } = useMutation({
    mutationFn: uploadFileAndSerialize,
    onSuccess: (data) => {
      if (!data.data.data) return;
      createBook({
        payload: { ...data?.data?.data, imageUrl: cloudinaryImageUrl },
      });
      push("/materialy");
    },
  });

  const { mutate: createBook } = useMutation({
    mutationFn: createBookMutation,
    onSuccess: (data) => {
      console.log({ data });
    },
  });

  const { mutate: uploadImageMutation, isLoading: isImageLoading } =
    useMutation({
      mutationFn: uploadImageToCloudinary,
      onSuccess: (data) => {
        setCloudinaryImageUrl(data.data.url);
        nextStep();
      },
    });

  const handleBookFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];

    const maxSizeInBytes = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSizeInBytes) {
      return setBookFileErrorMessage(
        "Limit wielkości pliku został przekroczony. 🔥"
      );
    }

    const allowedTypes = ["application/pdf"];
    if (!allowedTypes.includes(file.type)) {
      return setBookFileErrorMessage(
        "Nieprawidłowy typ pliku. Tylko pliki PDF są dozwolone."
      );
    }

    if (e.target.files) {
      setBookFile(e.target.files[0]);
      setBookFileErrorMessage(undefined);
    }
  };

  const handleUploadFile = ({ image }: { image: File }) => {
    if (!bookFile) return;
    if (!cloudinaryImageUrl) return uploadImageMutation({ imageFile: image });

    nextStep();
  };

  const handleSerializeAndUploadBook = (bookName: string, fileToUpload: File) =>
    serializeAndUploadBook({ bookName, fileToUpload });

  const handleRemoveBookFile = () => {
    setBookFile(undefined);
    setBookFileErrorMessage(undefined);
    resetStep();
    if (!bookFileRef.current) return;
    bookFileRef.current.value = "";
  };

  return {
    data,
    isImageLoading,
    cloudinaryImageUrl,
    handleBookFileChange,
    handleUploadFile,
    handleSerializeAndUploadBook,
    handleRemoveBookFile,
    bookFile,
    bookFileRef,
    isLoading,
    bookFileErrorMessage,
  };
};
