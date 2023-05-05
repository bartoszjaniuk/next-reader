import { Book } from "@/types/Book";
import axios from "axios";
import { CtxOrReq } from "next-auth/client/_utils";
import { getSession } from "next-auth/react";

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
