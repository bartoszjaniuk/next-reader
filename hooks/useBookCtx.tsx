import { BookContext } from '@/context/book/BookContext';
import { useContext } from 'react';

export const useBookCtx = () => {
  const context = useContext(BookContext);

  if (context === undefined) {
    throw new Error('useBookCtx must be used within an BookContextProvider');
  }

  return context;
};
