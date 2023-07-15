import { Book } from "@/types/Book";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type MaterialCardProps = {
  book: Book;
};

export const MaterialCard = ({ book }: MaterialCardProps) => {
  return (
    <Link
      key={book._id}
      href={`/materialy/${book._id}`}
      className="max-w-xs w-full sm:w-[16rem] h-[17rem] grid grid-rows-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <Image
        className="flex justify-self-center"
        src={`${book.imageUrl ? book.imageUrl : "/placeholder.svg"}`}
        width={100}
        height={100}
        alt="photo placeholder"
      />
      <h5 className="p-6 mb-2 text-2xl font-bold tracking-tight text-primary uppercase">
        {book.title}
      </h5>
      <div className="row-span-2 p-6 font-normal text-gray-700 dark:text-gray-400">
        <div>Liczba stron: {book.numberOfPages}</div>
        <div>Stopień ukończenia: {Math.floor(book.session.progress)} %</div>

        <div>Ilość zapisanych słów: {book.numberOfSavedWords || 0}</div>
      </div>
      <span className="border-b-4 border-primary"></span>
    </Link>
  );
};
