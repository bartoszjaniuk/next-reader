import axios, { AxiosResponse } from "axios";
import { Translation } from "./translate.types";
import { getRequestOptions } from "./translate.utils";


export const postTranslateText = async (
  wordToTranslate: string
): Promise<AxiosResponse<Translation>> => {
  return await axios.request(getRequestOptions(wordToTranslate));
};
