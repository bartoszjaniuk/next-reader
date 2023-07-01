import React from "react";

export const BookScreen = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative text-lg sm:w-full md:w-full lg:w-[700px] h-full md:h-[700px] max-h-[700px] overflow-y-scroll block px-4 md:p-6 md:pb-14 bg-white border border-gray-200  dark:bg-gray-800 dark:border-gray-700 text-justify">
      {children}
    </div>
  );
};
