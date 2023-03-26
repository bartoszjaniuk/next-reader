import { postTranslateText } from "@/api/translate/translate";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { Book } from "../Book/Book";
import { BookNavigation } from "../BookNavigation/BookNavigation";
import { CustomTooltip } from "../CustomTooltip/CustomTooltip";
import { SerializedBook } from "../UploadFile/UploadFile.types";

export const BookReader = ({
  data,
}: {
  data: AxiosResponse<SerializedBook, any> | undefined;
}) => {
  const {
    data: translation,
    mutate: translateText,
    isLoading,
  } = useMutation({
    mutationFn: postTranslateText,
  });
  return (
    <>
      {data && (
        <BookNavigation totalPages={data?.data.data.pages.length}>
          {(currentPage) => (
            <Book>
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
    </>
  );
};
