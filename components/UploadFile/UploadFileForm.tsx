import React, { ChangeEvent } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { DragAndDropZone } from "../DragAndDropZone/DragAndDropZone";
import { Badge } from "../Badge/Badge";
import { UploadButton } from "../UploadButton/UploadButton";
import { AxiosResponse } from "axios";
import { SerializedBook } from "./UploadFile.types";
import { useForm } from "react-hook-form";
import { schema } from "./schema";
import { UploadFileFormFieldValues } from "./UploadFileForm.types";

type UploadFileFormProps = {
  data: AxiosResponse<SerializedBook, any> | undefined;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleUploadFile: (bookName: string) => void;
  removeFile: () => void;
  file: File | undefined;
  fileRef: React.MutableRefObject<HTMLInputElement | null>;
  uploadFileIsLoading: boolean;
};

export const UploadFileForm = ({
  data,
  file,
  fileRef,
  handleFileChange,
  handleUploadFile,
  removeFile,
  uploadFileIsLoading,
}: UploadFileFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<UploadFileFormFieldValues>({
    resolver: zodResolver(schema),
    reValidateMode: "onSubmit",
    mode: "all",
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    handleUploadFile(data.bookName);
  });
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
              <form className="w-full" onSubmit={onSubmit}>
                <div className="mb-6  w-full">
                  <label
                    htmlFor="bookName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nazwij plik
                  </label>
                  <input
                    {...register("bookName")}
                    type="text"
                    id="bookName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <UploadButton
                  isValid={isValid}
                  handleUploadFile={handleUploadFile}
                  uploadFileIsLoading={uploadFileIsLoading}
                />
              </form>
            </>
          )}
        </>
      )}
    </div>
  );
};
