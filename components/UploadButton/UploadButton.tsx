import { Loader } from "../Loader/Loader";

export const UploadButton = ({
  handleUploadFile,
  uploadFileIsLoading,
}: {
  uploadFileIsLoading: boolean;
  handleUploadFile: () => void;
}) => {
  return (
    <button
      disabled={uploadFileIsLoading}
      onClick={handleUploadFile}
      className={`w-full bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded self-end ${
        uploadFileIsLoading ? "flex justify-center" : ""
      }`}
    >
      {uploadFileIsLoading && <Loader />}
      {!uploadFileIsLoading && "Prześlij"}
    </button>
  );
};
