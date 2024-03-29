import { getPageByIdAction } from "@/apiFunctions/book/getBook";
import { BookReader } from "@/components/BookReader/BookReader";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const useMaterials = () => {
  const { query } = useRouter();
  const bookId = query.id;
  const { data: userSession } = useSession();

  const { data, refetch, isLoading } = useQuery([`book_${bookId}`], {
    enabled: !!bookId && !!userSession,
    queryFn: () => getPageByIdAction(userSession!, bookId as string),
    retry: 3,
  });

  return {
    book: data?.data.data,
    refetchBook: refetch,
    isBookLoading: isLoading,
  };
};

const MaterialPage = () => {
  const { book, refetchBook, isBookLoading } = useMaterials();

  return (
    <div
      data-testid="MaterialPage--Container"
      className="w-full h-full justify-center flex flex-col items-center py-6"
    >
      <BookReader
        book={book}
        isBookLoading={isBookLoading}
        refetchBook={refetchBook}
      />
    </div>
  );
};

export default MaterialPage;
