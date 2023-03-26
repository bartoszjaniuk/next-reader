import React, { useState } from "react";
import { ArrowIcon } from "../ArrowIcon/ArrowIcon";
import { ProgressBar } from "../Progressbar/ProgressBar";

export const BookNavigation = ({
  children,
  totalPages,
}: {
  children: (pageNumber: number) => React.ReactNode;
  totalPages: number;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const handleNextPage = () => setCurrentPage((prevValue) => prevValue + 1);
  const handlePrevPage = () => {
    if (currentPage <= 1) return;
    setCurrentPage((prevValue) => prevValue - 1);
  };

  const progressPercentage = Math.ceil((currentPage / totalPages) * 100);

  return (
    <>
      <ProgressBar progressPercentage={progressPercentage} />
      {children(currentPage)}
      <div className="flex items-center mt-4">
        <ArrowIcon
          onClick={handlePrevPage}
          className="w-10 h-10 bg-gray-200 text-gray-900 border dark:bg-gray-700 dark:text-white dark:border-backgroundDark text-3xl rounded-full shadow-sm p-1 cursor-pointer"
        />
        <span className="text-base px-4">Strona {currentPage}</span>
        <ArrowIcon
          onClick={handleNextPage}
          className="w-10 h-10 bg-gray-200 text-gray-900 border dark:bg-gray-700 dark:text-white dark:border-backgroundDark text-3xl rounded-full shadow-sm p-1 cursor-pointer rotate-180"
        />
      </div>
    </>
  );
};
