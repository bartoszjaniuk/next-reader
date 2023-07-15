import { Badge } from "@/components/Badge/Badge";
import { UploadFileForm } from "@/components/UploadFile/UploadFileForm";
import { UploadFileFormFieldValues } from "@/components/UploadFile/UploadFileForm.types";
import React from "react";
import { UseFormRegister } from "react-hook-form";

type SecondStepProps = {
  bookFile: File | undefined;
  handleRemoveBookFile: () => void;
  register: UseFormRegister<UploadFileFormFieldValues>;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imageFile: File | undefined;
  imageFileRef: React.MutableRefObject<HTMLInputElement | null>;
  previewUrl: any;
};

export const SecondStep = ({
  bookFile,
  handleRemoveBookFile,
  imageFile,
  imageFileRef,
  onImageChange,
  previewUrl,
  register,
}: SecondStepProps) => {
  return (
    <>
      {bookFile && (
        <>
          <Badge
            label="Plik PDF"
            file={bookFile}
            onRemoveFile={handleRemoveBookFile}
          />
          <UploadFileForm
            register={register}
            handleImageChange={onImageChange}
            imageFile={imageFile}
            imageFileRef={imageFileRef}
            previewUrl={previewUrl}
          />
        </>
      )}
    </>
  );
};
