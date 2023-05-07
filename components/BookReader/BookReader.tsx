import { postTranslateText } from "@/api/translate/translate";
import { useMutation } from "@tanstack/react-query";
import { CustomTooltip } from "../CustomTooltip/CustomTooltip";
import { Book, Word } from "@/types/Book";
import { BookScreen } from "../BookScreen/BookScreen";
import { BookNavigationContainer } from "../BookNavigation/BookNavigationContainer";
import { postUpdateWord } from "@/api/word/updateWord";
import { useState } from "react";

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
        translation: data.data.translated_text,
        content: wordToTranslate.content,
        id: wordToTranslate._id,
      });
    },
  });

  const { mutate: updateWord, isLoading: isUpdating } = useMutation(postUpdateWord, {
    onSuccess: () => refetchBook(),
  });
  return (
    <>
      {isBookLoading && <div>Loading...</div>}
      {!isBookLoading && book && (
        <BookNavigationContainer session={book.session}>
          {(currentPage) => (
            <BookScreen>
              {book.pages[currentPage].page.words.map((word, i) => (
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
                        if (translation?.data.text_lang === word.content)
                          return;

                        if(isUpdating) return;
                        setWordToTranslate(word);
                        translateText(word.content);
                      }}
                      isTranslationLoading={isLoading}
                      translation={translation?.data.translated_text}
                      key={i}
                    >
                      <span className="hover:border-primary border-transparent border-b-2 rounded-b-lg pb-1">
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
