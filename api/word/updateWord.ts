import axios from "axios";
import { ApiResponseSingle } from "@/types/ApiResponseMany";
import { Word } from "@/components/UploadFile/UploadFile.types";
import { getSession } from "next-auth/react";


type UpdateWordProps = {
    isTranslated: boolean;
    content: string;
    translation: string;  
    id: string;
}

export const postUpdateWord = async (payload: UpdateWordProps) => {
    const session = await getSession();
    // @ts-ignore
    const token = session?.user?.token;
    return axios.put<ApiResponseSingle<Word>>(`${process.env.BACKEND_API}/word`, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  };
