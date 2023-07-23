import { getBooks } from "@/apiFunctions/book/getBooks";
import { MaterialCard } from "@/components/MaterialCard/MaterialCard";
import withAuth from "@/hoc/withAuth";
import { Book } from "@/types/Book";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";

const MaterialsPage = ({
  books,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div
      data-testid="MaterialsPage--Container"
      className="w-full h-full flex flex-wrap gap-4 justify-center sm:justify-start pt-8 sm:pt-0"
    >
      {!!books.length &&
        books.map((book: Book) => {
          return <MaterialCard key={book._id} book={book} />;
        })}
      {!books.length && <div>Brak materiałów</div>}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = withAuth(
  async (context: GetServerSidePropsContext) => {
    try {
      const res = await getBooks(context);
      return {
        props: {
          books: res.data.data,
        },
      };
    } catch (error) {
      return { notFound: true };
    }
  }
);

export default MaterialsPage;
