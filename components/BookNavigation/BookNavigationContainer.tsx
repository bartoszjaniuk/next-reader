import React from 'react'
import { BookNavigation } from './BookNavigation'
import { Session } from '@/types/Session';
import { useBookNavigation } from './hooks/useBookNavigation';

type BookNavigationContainerProps = {
  session: Session;
  children: (pageNumber: number) => React.ReactNode;
};


export const BookNavigationContainer = ({session, children} : BookNavigationContainerProps) => {
  const {currentPage, handleChangePage, progress, isSessionUpdating} = useBookNavigation({session});
  
  return <BookNavigation currentPage={currentPage} handleChangePage={handleChangePage} progress={progress} isSessionUpdating={isSessionUpdating}>{children}</BookNavigation>
}
