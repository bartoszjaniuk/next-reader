import { SubmitHandler } from "react-hook-form";
import { schema } from "./schema";
import { z } from "zod";

export type UploadFileFormFieldValues = z.infer<typeof schema>;

export type UploadFileFormProps = {
  onSubmit: SubmitHandler<UploadFileFormFieldValues>;
  isLoading: boolean;
  defaultValues?: UploadFileFormFieldValues;
};
