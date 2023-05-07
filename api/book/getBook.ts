import { Book } from "@/types/Book";
import axios from "axios";
import { CtxOrReq } from "next-auth/client/_utils";
import { getSession } from "next-auth/react";
import { Session as UserSession } from "next-auth";
import { ApiResponseSingle } from "@/types/ApiResponseMany";


export const getBook = async (context: CtxOrReq, bookId: string) => {
  const session = await getSession(context);
  // @ts-ignore
  const { token, id } = session?.user;
  return axios.get(`${process.env.BACKEND_API}/book/${bookId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      user: id,
    },
  });
};


export const getBookAction = async (userSession: UserSession, bookId: string) => {
  // @ts-ignore
  const { token, id } = userSession.user;

  return axios.get<ApiResponseSingle<Book>>(`${process.env.BACKEND_API}/book/${bookId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      user: id,
    },
  });
};
