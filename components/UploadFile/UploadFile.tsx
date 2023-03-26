import { useMutation } from "@tanstack/react-query";
import { Book } from "../Book/Book";
import { CustomTooltip } from "../CustomTooltip/CustomTooltip";
import { postTranslateText } from "@/api/translate/translate";
import { useUploadFile } from "./hooks/useUploadFile";
import { BookNavigation } from "../BookNavigation/BookNavigation";
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
  } = useUploadFile();

  const {
    data: translation,
    mutate: translateText,
    isLoading,
  } = useMutation({
    mutationFn: postTranslateText,
  });

  return (
    <div className="lg:w-3/4 xl:w-1/2 flex flex-col items-center">
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
              <UploadButton handleUploadFile={handleUploadFile} />
            </>
          )}
        </>
      )}

      {data && (
        <BookNavigation totalPages={data?.data.data.pages.length}>
          {(currentPage) => (
            <Book pageNumber={currentPage}>
              {data?.data.data.pages[currentPage].page.words.map((word, i) => (
                <CustomTooltip
                  onClick={() => {
                    if (translation?.data.text_lang === word.content) return;
                    translateText(word.content);
                  }}
                  isTranslationLoading={isLoading}
                  translation={translation?.data.translated_text}
                  key={i}
                  text="custom tooltip"
                  placement="top"
                >
                  <span className="hover:border-primary border-transparent border-b-2 rounded-b-lg pb-1">
                    {word.content + " "}
                  </span>
                </CustomTooltip>
              ))}
            </Book>
          )}
        </BookNavigation>
      )}
    </div>
  );
}
