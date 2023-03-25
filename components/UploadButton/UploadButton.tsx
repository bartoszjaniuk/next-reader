export const UploadButton = ({
  handleUploadFile,
}: {
  handleUploadFile: () => void;
}) => {
  return (
    <button
      onClick={handleUploadFile}
      className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded self-end"
    >
      Prześlij
    </button>
  );
};
