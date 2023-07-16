import { ChangeEvent, MutableRefObject } from "react";

type DragAndDropZoneProps = {
  fileRef: MutableRefObject<HTMLInputElement | null>;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  errorMessage?: string;
  isPDFFormat?: boolean;
};

export const DragAndDropZone = ({
  handleFileChange,
  fileRef,
  label,
  errorMessage,
  isPDFFormat = true,
}: DragAndDropZoneProps) => {
  return (
    <>
      <div className="mb-6  w-full">
        {errorMessage && (
          <div className="w-full bg-red-600 text-white rounded-md p-4 mt-4 mb-4">
            {errorMessage}
          </div>
        )}
        <span className="block mb-2 text-md font-medium text-backgroundDark dark:text-layoutLight">
          {label}
        </span>

        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-layoutLight dark:hover:bg-bray-800 dark:bg-layoutDark hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              aria-hidden="true"
              className="w-10 h-10 mb-3 text-layoutDark dark:text-layoutLight"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            <p className="mb-2 text-sm text-backgroundDark dark:text-layoutLight">
              <span className="font-semibold">Przyciśnij aby wgrać plik</span>{" "}
              lub zaznacz i przeciągnij
            </p>
            <p className="text-xs text-backgroundDark dark:text-layoutLight">
              {isPDFFormat ? "plik PDF" : "pliki JPG, PNG"}
            </p>
          </div>
          <input
            ref={fileRef}
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>
    </>
  );
};
