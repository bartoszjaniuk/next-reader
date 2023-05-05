import { getBooks } from "@/api/book/getBooks";
import withAuth from "@/hoc/withAuth";
import { Book } from "@/types/Book";
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Link from "next/link";

interface Props {
  books: Book[];
}



const MaterialsPage = ({books}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className="w-full h-full flex gap-4">
      {books.map((book) => {
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
              <p>Liczba stron: {book.numberOfPages}</p>
              <p>Stopień ukończenia: {Math.floor(book.session.progress)} %</p>
            </div>
            <div className="bg-[url('/sun-tornado-light.svg')] dark:bg-[url('/sun-tornado-dark.svg')] bg-cover rounded-b-lg"></div>
          </Link>
        );
      })}
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
