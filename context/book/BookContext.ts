import { createContext } from 'react';

import { BookContextProps } from './BookContext.types';

export const BookContext = createContext<BookContextProps | undefined>(undefined);
