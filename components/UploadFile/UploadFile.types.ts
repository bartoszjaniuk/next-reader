export type SerializedBook = {
  data: Book;
  status: string;
};

export type Book = {
  numberOfPages: number;
  pages: PageElement[];
  title: string;
};

export type PageElement = {
  page: PagePage;
};

export type PagePage = {
  numberOfPage: number;
  words: Word[];
};

export type Word = {
  isTranslated: boolean;
  translation: string;
  content: string;
};
