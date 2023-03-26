import React from "react";

export const Book = ({ children }: { children: React.ReactNode }) => {
  return (
    <p className="relative text-lg w-full h-[700px] max-h-[700px] min-w-[500px] overflow-y-scroll block p-6 pb-14 bg-white border border-gray-200  dark:bg-gray-800 dark:border-gray-700">
      {children}
    </p>
  );
};
