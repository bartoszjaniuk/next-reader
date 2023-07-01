import React from "react";
import { UploadFileForm } from "./UploadFileForm";
import { useUploadFile } from "./hooks/useUploadFile";

const UploadFileContainer = () => {
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
    <UploadFileForm
      data={data}
      handleFileChange={handleFileChange}
      handleUploadFile={handleUploadFile}
      removeFile={removeFile}
      file={file}
      fileRef={fileRef}
      uploadFileIsLoading={uploadFileIsLoading}
    />
  );
};

export default UploadFileContainer;
