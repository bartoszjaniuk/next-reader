import { postTranslateText } from "@/api/translate/translate";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CustomTooltip } from "../CustomTooltip/CustomTooltip";
import { Book, Word } from "@/types/Book";
import { BookScreen } from "../BookScreen/BookScreen";
import { BookNavigationContainer } from "../BookNavigation/BookNavigationContainer";
import { postUpdateWord } from "@/api/word/updateWord";
import { useState } from "react";

type BookReaderProps = {
  book: Book;
};

export const BookReader = ({ book }: BookReaderProps) => {
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

  const { mutate: updateWord } = useMutation(postUpdateWord);
  return (
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
                  key={i}
                  text="custom tooltip"
                  placement="top"
                >
                  <span className="text-primary pb-1">
                    {word.content + " "}
                  </span>
                </CustomTooltip>
              )}
              {!word.isTranslated && (
                <CustomTooltip
                  onClick={() => {
                    if (translation?.data.text_lang === word.content) return;
                    setWordToTranslate(word);
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
              )}
            </>
          ))}
        </BookScreen>
      )}
    </BookNavigationContainer>
  );
};
