import { Badge } from "@/components/Badge/Badge";
import { ImagePreview } from "@/components/ImagePreview/ImagePreview";
import React from "react";

type ThirdStepProps = {
  bookFile: File | undefined;
  onRemoveBookFile: () => void;
  bookName: string;
  cloudinaryImageUrl: string;
};

export const ThirdStep = ({
  bookFile,
  onRemoveBookFile,
  bookName,
  cloudinaryImageUrl,
}: ThirdStepProps) => {
  return (
    <>
      {bookFile && (
        <Badge
          label="Plik PDF"
          file={bookFile}
          onRemoveFile={onRemoveBookFile}
        />
      )}
      <div className="mb-6  w-full">
        <label
          htmlFor="bookName"
          className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
        >
          Nazwa pliku
        </label>
        <input
          disabled
          type="text"
          id="bookName"
          value={bookName}
          className="bg-layoutLight border border-gray-200 text-gray-900 text-sm font-medium rounded-md block w-full p-4 dark:text-layoutLight dark:bg-layoutDark dark:border-gray-700"
        />
      </div>
      <ImagePreview previewUrl={cloudinaryImageUrl} label="Podgląd obrazka" />
    </>
  );
};
