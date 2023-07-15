import { Book } from "@/components/UploadFile/UploadFile.types";
import axios from "axios";
import { getSession } from "next-auth/react";

export const createBook = async ({ payload }: { payload: Book }) => {
  const session = await getSession();
  // @ts-ignore
  const token = session?.user?.token;
  return axios.post(`${process.env.BACKEND_API}/book`, payload, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
