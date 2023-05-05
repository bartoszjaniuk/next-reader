import React from "react";
import { ArrowIcon } from "../ArrowIcon/ArrowIcon";
import { ProgressBar } from "../Progressbar/ProgressBar";
import { Loader } from "../Loader/Loader";

type BookNavigationProps = {
  progress: number;
  currentPage: number;
  handleChangePage: (direction: "prev" | "next") => void;
  children: (pageNumber: number) => React.ReactNode;
  isSessionUpdating: boolean;
};

export const BookNavigation = ({
  currentPage,
  handleChangePage,
  progress,
  children,
  isSessionUpdating,
}: BookNavigationProps) => {
  return (
    <>
      <ProgressBar progressPercentage={progress} />
      {children(currentPage)}
      <div className="flex items-center mt-4">
        <ArrowIcon
          disabled={isSessionUpdating}
          onClick={() => handleChangePage("prev")}
          className="w-10 h-10 bg-gray-200 text-gray-900 border dark:bg-gray-700 dark:text-white dark:border-backgroundDark text-3xl rounded-full shadow-sm p-1 cursor-pointer"
        />

        {isSessionUpdating && (
          <span className="text-base px-8">
            <Loader />
          </span>
        )}
        {!isSessionUpdating && (
          <span className="text-base px-4">Strona {currentPage}</span>
        )}
        <ArrowIcon
          disabled={isSessionUpdating}
          onClick={() => handleChangePage("next")}
          className="w-10 h-10 disabled:bg-red-500 bg-gray-200 text-gray-900 border dark:bg-gray-700 dark:text-white dark:border-backgroundDark text-3xl rounded-full shadow-sm p-1 cursor-pointer rotate-180"
        />
      </div>
    </>
  );
};
