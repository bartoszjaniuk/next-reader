import { useUploadFile } from "./hooks/useUploadFile";
import { DragAndDropZone } from "../DragAndDropZone/DragAndDropZone";
import { Badge } from "../Badge/Badge";
import { UploadButton } from "../UploadButton/UploadButton";

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
      <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary self-start mb-8 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
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
    </div>
  );
}
