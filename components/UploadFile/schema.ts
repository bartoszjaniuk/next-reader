import { z } from "zod";

const MAX_CHARACTERS = 60;

export const schema = z.object({
  bookName: z
    .string()
    .trim()
    .min(1, {
      message: "Pole jest wymagane",
    })
    .max(MAX_CHARACTERS),
});
