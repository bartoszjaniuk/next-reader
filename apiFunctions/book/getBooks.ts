import { ApiResponseMany } from "@/types/ApiResponseMany";
import { Book } from "@/types/Book";
import axios from "axios";
import { CtxOrReq } from "next-auth/client/_utils";
import { getSession } from "next-auth/react";

export const getBooks = async (context: CtxOrReq) => {
  const session = await getSession(context);
  // @ts-ignore
  const { token, id } = session?.user;
  return axios.get<ApiResponseMany<Book[]>>(`${process.env.BACKEND_API}/book`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      user: id,
    },
  });
};
