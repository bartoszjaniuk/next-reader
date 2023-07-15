import Image from "next/image";

type ImagePreviewProps = {
  previewUrl: string;
  label: string;
};

export const ImagePreview = ({ previewUrl, label }: ImagePreviewProps) => {
  return (
    <>
      <div className="w-full">
        <p className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
          {label}
        </p>
        <Image width={100} height={100} src={previewUrl} alt="image preview" />
      </div>
    </>
  );
};
