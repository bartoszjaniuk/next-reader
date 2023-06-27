import { postTranslateText } from "@/apiFunctions/translate/translate";
import { useMutation } from "@tanstack/react-query";
import { CustomTooltip } from "../CustomTooltip/CustomTooltip";
import { Book, Word } from "@/types/Book";
import { BookScreen } from "../BookScreen/BookScreen";
import { BookNavigationContainer } from "../BookNavigation/BookNavigationContainer";
import { postUpdateWord } from "@/apiFunctions/word/updateWord";
import { useState } from "react";
import { Loader } from "../Loader/Loader";
import { Font } from "@/utils/fonts";

type BookReaderProps = {
  book?: Book;
  isBookLoading: boolean;
  refetchBook: () => void;
};

export const BookReader = ({
  book,
  isBookLoading,
  refetchBook,
}: BookReaderProps) => {
  const [wordToTranslate, setWordToTranslate] = useState<Word | undefined>(
    undefined
  );
  const {
    data: translation,
    mutate: translateText,
    isLoading,
  } = useMutation({
    mutationFn: postTranslateText,
    onSuccess: (data) => {
      if (!wordToTranslate) return;
      updateWord({
        isTranslated: true,
        translation: data.data.translatedText,
        content: wordToTranslate.content,
        id: wordToTranslate._id,
      });
    },
  });

  const { mutate: updateWord, isLoading: isUpdating } = useMutation(
    postUpdateWord,
    {
      onSuccess: () => refetchBook(),
    }
  );

  return (
    <>
      {isBookLoading && <Loader size="12" />}
      {!isBookLoading && book && (
        <BookNavigationContainer
          refetchBook={refetchBook}
          session={book.session}
        >
          {(currentPage) => (
            <BookScreen>
              {book.pages[0].page.words.map((word, i) => (
                <>
                  {word.isTranslated && (
                    <CustomTooltip
                      onClick={() => null}
                      isTranslationLoading={false}
                      translation={word.translation}
                      text={word.content}
                      key={i}
                    >
                      <span className="text-primary pb-1">
                        {word.content + " "}
                      </span>
                    </CustomTooltip>
                  )}
                  {!word.isTranslated && (
                    <CustomTooltip
                      text={word.content}
                      onClick={() => {
                        setWordToTranslate(word);
                        translateText(word.content);
                      }}
                      isTranslationLoading={isLoading}
                      translation={translation?.data.translatedText}
                      key={i}
                    >
                      <span
                        className={`hover:border-primary border-transparent border-b-2 rounded-b-lg pb-1 ${Font.raleway.className}`}
                      >
                        {word.content + " "}
                      </span>
                    </CustomTooltip>
                  )}
                </>
              ))}
            </BookScreen>
          )}
        </BookNavigationContainer>
      )}
    </>
  );
};
