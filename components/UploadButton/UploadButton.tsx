import { Loader } from "../Loader/Loader";

type UploadButtonProps = {
  uploadFileIsLoading: boolean;
  isValid: boolean;
};

export const UploadButton = ({
  uploadFileIsLoading,
  isValid,
}: UploadButtonProps) => {
  const isDisabled = !isValid || uploadFileIsLoading;
  const disabledClasses =
    "text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center";

  const enabledClasses =
    "bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";

  return (
    <button
      type="submit"
      aria-disabled={isDisabled}
      disabled={isDisabled}
      className={`${isDisabled ? disabledClasses : enabledClasses} self-end ${
        uploadFileIsLoading ? "flex justify-center" : ""
      }`}
    >
      {uploadFileIsLoading && <Loader />}
      {!uploadFileIsLoading && "Prześlij"}
    </button>
  );
};
