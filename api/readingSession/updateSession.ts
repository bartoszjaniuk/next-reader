import { ApiResponseSingle } from "@/types/ApiResponseMany";
import { Session } from "@/types/Session";
import axios from "axios";
import { getSession } from "next-auth/react";

type UpdateSessionRequest = {
    payload: {
        currentPage: number;
        numberOfSavedWords?: number;
    }
    bookId: string;
}

export const updateSessionAction = async ({bookId, payload}: UpdateSessionRequest) => {
  const session = await getSession();
  // @ts-ignore
  const token = session?.user?.token;
  return axios.put<ApiResponseSingle<Session>>(`${process.env.BACKEND_API}/book/${bookId}/session`, payload, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
