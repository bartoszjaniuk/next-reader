import axios, { AxiosError, AxiosResponse } from "axios";

type LoginCredentials = {
  email: string;
  password: string;
};

interface SignInResponse {
  status: string;
  token: string;
  data: UserData;
}

interface UserData {
  _id: string;
  email: string;
  avatarUrl: string;
}

export const postSignIn = async ({ email, password }: LoginCredentials) => {
  try {
    const response = await axios.post(
      `${process.env.BACKEND_API}/auth/signIn`,
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data: SignInResponse = await response.data;

    if (response) {
      console.log({ response });
    } else {
      console.log("brak");
    }

    if (data) {
      console.log(data.token, 'data.token');
      return {
        token: data.token,
        ...{
          id: data.data._id,
          email: data.data.email,
          avatarUrl: data.data.avatarUrl,
        },
      };
    } else {
      return null;
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message: string }>;
      throw new Error(axiosError.response?.data.message);
    } else {
      console.error(error);
      throw new Error("Coś poszło nie tak...");
    }
  }
};
// : AxiosResponse<SignInResponse>
export const customSignIn = async ({ email, password }: LoginCredentials): Promise<AxiosResponse<SignInResponse, any>> => {
  return await axios.post(
    `${process.env.BACKEND_API}/auth/signIn`,
    {
      email,
      password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
