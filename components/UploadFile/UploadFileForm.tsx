import React from "react";
import { UseFormRegister } from "react-hook-form";
import { UploadFileFormFieldValues } from "./UploadFileForm.types";
import { DragAndDropZone } from "../DragAndDropZone/DragAndDropZone";
import { ImagePreview } from "../ImagePreview/ImagePreview";

type UploadFileFormProps = {
  register: UseFormRegister<UploadFileFormFieldValues>;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imageFile: File | undefined;
  imageFileRef: React.MutableRefObject<HTMLInputElement | null>;
  previewUrl: any;
};

export const UploadFileForm = ({
  register,
  handleImageChange,
  imageFile,
  imageFileRef,
  previewUrl,
}: UploadFileFormProps) => {
  return (
    <form className="w-full">
      <div className="mb-6  w-full">
        <label
          htmlFor="bookName"
          className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
        >
          Nazwa pliku*
        </label>
        <input
          {...register("bookName")}
          type="text"
          id="bookName"
          className="bg-layoutLight border border-gray-200 text-gray-900 text-sm font-medium rounded-md block w-full p-4 dark:text-layoutLight dark:bg-layoutDark dark:border-gray-700"
        />
      </div>
      {!imageFile && (
        <DragAndDropZone
          fileRef={imageFileRef}
          handleFileChange={handleImageChange}
          label="Okładka"
        />
      )}
      {imageFile && previewUrl && (
        <ImagePreview
          previewUrl={previewUrl as string}
          label="Podgląd obrazka"
        />
      )}
    </form>
  );
};
