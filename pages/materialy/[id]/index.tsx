import { getBook } from "@/api/book/getBook";
import { BookReader } from "@/components/BookReader/BookReader";
import withAuth from "@/hoc/withAuth";
import { Book } from "@/types/Book";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";

type MaterialPageParams = {
  id: string;
};

type MaterialPageProps = {
  book: Book;
};

const MaterialPage = ({
  book,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className="w-full lg:w-3/4 xl:w-1/2 flex flex-col items-center">
      <BookReader book={book} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<
  MaterialPageProps,
  MaterialPageParams
> = withAuth(async (context: GetServerSidePropsContext) => {
  if (!context.params) {
    return {
      props: {},
      notFound: true,
    };
  }
  const { id } = context.params;
  const res = await getBook(context, id as string);
  const book: Book = await res.data.data;
  return {
    props: {
      book,
    },
    revalidate: 10,
  };
});

export default MaterialPage;
