import { ChangeEvent, useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export interface SerializedBook {
  data: Data;
  status: string;
}

export interface Data {
  numberOfPages: number;
  pages: PageElement[];
  title: string;
}

export interface PageElement {
  page: PagePage;
}

export interface PagePage {
  numberOfPage: number;
  words: Word[];
}

export interface Word {
  isTranslated: boolean;
  translation: string;
  content: string;
}

const uploadFileAction = (
  fileToUpload: File
): Promise<AxiosResponse<SerializedBook>> => {
  const formData = new FormData();
  formData.append("file", fileToUpload);
  return axios.post(
    "http://localhost:1337/api/v1/serializer/serialize",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export function UploadFile() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, mutate: uploadFile } = useMutation({
    mutationFn: uploadFileAction,
  });

  const [file, setFile] = useState<File>();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    if (!file) return;
    uploadFile(file);
  };

  const handleNextPage = () => setCurrentPage((prevValue) => prevValue + 1);
  const handlePrevPage = () => {
    if (currentPage <= 1) return;
    setCurrentPage((prevValue) => prevValue - 1);
  };

  return (
    <div>
      {data && (
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <h2>{currentPage}</h2>
          <button
            onClick={handlePrevPage}
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            Poprzednia strona
          </button>
          <button
            onClick={handleNextPage}
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            Następna strona
          </button>
        </div>
      )}
      {!data && (
        <>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 mb-3 text-gray-400"
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
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>
          {/* <input type="file" onChange={handleFileChange} />

          <div>{file && `${file.name} - ${file.type}`}</div>

          <button onClick={handleUploadClick}>Upload</button> */}
        </>
      )}

      <div className="bg-white w-96 text-cyan-700">
        {data?.data.data.pages[currentPage].page.words.map((word, i) => (
          <span key={i}>{word.content + " "}</span>
        ))}
      </div>
    </div>
  );
}
