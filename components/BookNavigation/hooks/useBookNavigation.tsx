import { getBookSession } from "@/apiFunctions/readingSession/getBookSession";
import { updateSessionAction } from "@/apiFunctions/readingSession/updateSession";
import { Session } from "@/types/Session";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";

type UseBookNavigationProps = {
  session: Session;
  refetchBook: () => void;
};

export const useBookNavigation = ({
  session,
  refetchBook,
}: UseBookNavigationProps) => {
  const { data: userSession } = useSession();

  const { refetch } = useQuery(
    [`getBookSession_${session.book}`],
    () => getBookSession(userSession!, session.book),
    { enabled: !!userSession }
  );
  const [currentPage, setCurrentPage] = useState(session.currentPage);
  const [progress, setProgress] = useState(session.progress);

  const {
    isSuccess: isUpdatedSuccessfuly,
    mutate: updateSession,
    isLoading: isSessionUpdating,
  } = useMutation({
    mutationFn: updateSessionAction,
    onSuccess: () => {
      refetchBook();
    },
  });

  useEffect(() => {
    console.log("refetching");
    refetch();
  }, [currentPage, refetch]);

  const handleChangePage = (direction: "next" | "prev") => {
    if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
      return updateSession({
        bookId: session.book,
        payload: { currentPage: currentPage + 1 },
      });
    }
    if (currentPage <= 1) return;
    setCurrentPage((prev) => prev - 1);
    return updateSession({
      bookId: session.book,
      payload: { currentPage: currentPage - 1 },
    });
  };

  const calculateProgress = useCallback(
    (currentPage: number, totalPages: number) =>
      Math.floor((currentPage / totalPages) * 100),
    []
  );
  useEffect(() => {
    setProgress(calculateProgress(currentPage, session.totalPages));
  }, [calculateProgress, currentPage, session.totalPages]);

  return {
    currentPage,
    progress,
    handleChangePage,
    isSessionUpdating,
  };
};
