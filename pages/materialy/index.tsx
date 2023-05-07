import { getBooks } from "@/apiFunctions/book/getBooks";
import withAuth from "@/hoc/withAuth";
import { Book } from "@/types/Book";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import Link from "next/link";

interface Props {
  books: Book[];
}

const MaterialsPage = ({
  books,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div
      data-testid="MaterialsPage--Container"
      className="w-full h-full flex  flex-wrap gap-4"
    >
      {!!books.length &&
        books.map((book) => {
          return (
            <Link
              key={book._id}
              href={`/materialy/${book._id}`}
              className="max-w-xs w-[15rem] h-[17rem] grid grid-rows-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <h5 className="p-6 mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {book.title}
              </h5>
              <div className="row-span-2 p-6 font-normal text-gray-700 dark:text-gray-400">
                <div>Liczba stron: {book.numberOfPages}</div>
                <div>
                  Stopień ukończenia: {Math.floor(book.session.progress)} %
                </div>

                <div>Ilość zapisanych słów: {book.numberOfSavedWords || 0}</div>
              </div>
              <div className="bg-[url('/sun-tornado-light.svg')] dark:bg-[url('/sun-tornado-dark.svg')] bg-cover rounded-b-lg"></div>
            </Link>
          );
        })}
      {!books.length && <div>Brak materiałów</div>}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = withAuth(
  async (context: GetServerSidePropsContext) => {
    try {
      const res = await getBooks(context);
      if (res.data.data)
        return {
          props: {
            books: res.data.data,
          },
        };
    } catch (error) {
      console.log(error);
      // throw new Error(error.response.data.message)
    }
  }
);

export default MaterialsPage;
