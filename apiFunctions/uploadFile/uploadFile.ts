import { Book, SerializedBook } from "@/components/UploadFile/UploadFile.types";
import axios, { AxiosResponse } from "axios";
import { getSession } from "next-auth/react";

export const uploadFileAction = async (
  fileToUpload: File
): Promise<AxiosResponse<SerializedBook>> => {
  const session = await getSession();
  // @ts-ignore
  const token = session?.user?.token;
  const formData = new FormData();
  formData.append("file", fileToUpload);
  // TODO: CHANGE REQUEST INTO ENV
  return axios.post(
    // `https://pdf-serializer-api.onrender.com/api/v1/serialize`,
    `${process.env.BACKEND_API}/serialize`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const createBookAction = async ({ payload }: { payload: Book }) => {
  const session = await getSession();
  // @ts-ignore
  const token = session?.user?.token;
  return axios.post(
    // `https://pdf-serializer-api.onrender.com/api/v1/book`,
    `${process.env.BACKEND_API}/book`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
