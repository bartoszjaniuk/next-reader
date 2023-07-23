import axios, { AxiosResponse } from "axios";
import { SignInResponse } from "next-auth/react";

type RegisterCredentials = {
  email: string;
  password: string;
  confirmPassword: string;
};

export const customSignUp = async ({
  email,
  password,
  confirmPassword,
}: RegisterCredentials): Promise<AxiosResponse<SignInResponse, any>> => {
  return await axios.post(
    `${process.env.BACKEND_API}/auth/signUp`,
    {
      email,
      password,
      confirmPassword,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
