import { useMutation } from "@tanstack/react-query";
import { Book } from "../Book/Book";
import { CustomTooltip } from "../CustomTooltip/CustomTooltip";
import { postTranslateText } from "@/api/translate/translate";
import { useUploadFile } from "./hooks/useUploadFile";
import { BookNavigation } from "../BookNavigation/BookNavigation";
import { DragAndDropZone } from "../DragAndDropZone/DragAndDropZone";
import { Badge } from "../Badge/Badge";
import { UploadButton } from "../UploadButton/UploadButton";
import { BookReader } from "../BookReader/BookReader";

export function UploadFile() {
  const {
    data,
    handleFileChange,
    handleUploadFile,
    removeFile,
    file,
    fileRef,
    isLoading: uploadFileIsLoading,
  } = useUploadFile();

  return (
    <div className="w-full lg:w-3/4 xl:w-1/2 flex flex-col items-center">
      <h1 className="self-start mb-8 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Dodaj plik
      </h1>
      {!data && (
        <>
          <DragAndDropZone
            handleFileChange={handleFileChange}
            fileRef={fileRef}
          />
          {file && (
            <>
              <Badge file={file} handleRemoveFile={removeFile} />
              <UploadButton
                handleUploadFile={handleUploadFile}
                uploadFileIsLoading={uploadFileIsLoading}
              />
            </>
          )}
        </>
      )}
      {data && <BookReader data={data} />}
    </div>
  );
}
