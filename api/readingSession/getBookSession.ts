import axios from "axios";
import { Session as UserSession } from "next-auth";

import { ApiResponseSingle } from "@/types/ApiResponseMany";
import { Session } from "@/types/Session";


export const getBookSession = async (userSession: UserSession, bookId: string) => {
  // @ts-ignore
  const { token, id } = userSession.user;
  return axios.get<ApiResponseSingle<Session>>(`${process.env.BACKEND_API}/book/${bookId}/session`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      user: id,
    },
  });
};
