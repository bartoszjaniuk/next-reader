import { SerializedBook } from "@/components/UploadFile/UploadFile.types";
import axios, { AxiosResponse } from "axios";
export const uploadFileAction = (
  fileToUpload: File
): Promise<AxiosResponse<SerializedBook>> => {
  const formData = new FormData();
  formData.append("file", fileToUpload);
  return axios.post(
    "https://pdf-serializer.onrender.com/api/v1/serializer/serialize",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};
