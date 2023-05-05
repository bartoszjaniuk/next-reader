import { Session } from "./Session";

export type Book = {
    _id: string;
    title: string;
    numberOfPages: number;
    user: string;
    pages: Page[];
    session: Session;
}

export type Page = {
    page: SinglePage;
    _id: string;
}

export type SinglePage = {
    numberOfPage: number;
    words: Word[];
}

export type Word = {
    _id: string;
    isTranslated: boolean;
    content: string;
    translation: string;
}


