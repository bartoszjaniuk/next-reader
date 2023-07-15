import { SerializedBook } from "@/components/UploadFile/UploadFile.types";
import axios, { AxiosResponse } from "axios";
import { getSession } from "next-auth/react";

export const uploadFileAndSerialize = async ({
  fileToUpload,
  bookName,
}: {
  fileToUpload: File;
  bookName: string;
}): Promise<AxiosResponse<SerializedBook>> => {
  const session = await getSession();
  // @ts-ignore
  const token = session?.user?.token;
  const formData = new FormData();
  formData.append("file", fileToUpload);
  formData.append("bookName", bookName);

  return axios.post(`${process.env.BACKEND_API}/serialize`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};
