import { Badge } from "@/components/Badge/Badge";
import { DragAndDropZone } from "@/components/DragAndDropZone/DragAndDropZone";
import React from "react";

type FirstStepProps = {
  bookFile: File | undefined;
  bookFileRef: React.MutableRefObject<HTMLInputElement | null>;
  onBookFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveBookFile: () => void;
  errorMessage?: string;
};

export const FirstStep = ({
  bookFile,
  bookFileRef,
  onBookFileChange,
  onRemoveBookFile,
  errorMessage,
}: FirstStepProps) => {
  return (
    <>
      {!bookFile && (
        <DragAndDropZone
          label="Plik PDF"
          handleFileChange={onBookFileChange}
          fileRef={bookFileRef}
          errorMessage={errorMessage}
        />
      )}
      {bookFile && (
        <Badge
          label="Plik PDF"
          file={bookFile}
          onRemoveFile={onRemoveBookFile}
        />
      )}
    </>
  );
};
