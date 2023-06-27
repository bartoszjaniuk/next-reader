import React from "react";
import { BookNavigation } from "./BookNavigation";
import { Session } from "@/types/Session";
import { useBookNavigation } from "./hooks/useBookNavigation";

type BookNavigationContainerProps = {
  session: Session;
  children: (pageNumber: number) => React.ReactNode;
  refetchBook: () => void;
};

export const BookNavigationContainer = ({
  session,
  children,
  refetchBook,
}: BookNavigationContainerProps) => {
  const { currentPage, handleChangePage, progress, isSessionUpdating } =
    useBookNavigation({ session, refetchBook });

  return (
    <BookNavigation
      currentPage={currentPage}
      handleChangePage={handleChangePage}
      progress={progress}
      isSessionUpdating={isSessionUpdating}
    >
      {children}
    </BookNavigation>
  );
};
