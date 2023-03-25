import React from "react";

export const Book = ({
  children,
  pageNumber,
}: {
  children: React.ReactNode;
  pageNumber: number;
}) => {
  return (
    <p className="relative text-lg w-2/3 min-h-[600px] max-h-[600px] min-w-[500px] overflow-y-scroll block p-6 pb-14 bg-white border border-gray-200  dark:bg-gray-800 dark:border-gray-700">
      {children}
    </p>
  );
};
