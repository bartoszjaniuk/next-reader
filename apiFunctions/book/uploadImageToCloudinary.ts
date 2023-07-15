import { cloudinaryApiUrl } from "@/consts/cloudinaryApiUrl.consts";
import { CloudinaryResponse } from "@/types/CloudinaryResponse";
import axios from "axios";

export const uploadImageToCloudinary = async ({
  imageFile,
}: {
  imageFile: File;
}) => {
  const formData = new FormData();
  const presetKey = process.env.UPLOAD_PRESET_NAME as string;
  formData.append("file", imageFile);
  formData.append("upload_preset", presetKey);
  return axios.post<CloudinaryResponse>(cloudinaryApiUrl, formData);
};
