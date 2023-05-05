import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { customSignIn } from "@/api/auth/postSignIn";
import axios, { AxiosResponse } from "axios";

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

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Password",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          const res = await customSignIn({
            email: credentials.email,
            password: credentials.password,
          });

          if (res.statusText === "OK") {
            return {
              token: res.data.token,
              id: res.data.data._id,
              email: res.data.data.email,
              avatarUrl: res.data.data.avatarUrl,
            };
          }

          return null;
        } catch (error) {
          if (!axios.isAxiosError(error))
            throw new Error("Wystąpił problem podczas łączenia z serwerem");

          if (error.response) throw new Error(error.response.data.message);
          throw new Error("Coś poszło nie tak...");
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.data = user;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token.data) {
        session.user = token.data;
      }
      return session;
    },
  },
  debug: true,
  pages: {
    signIn: "/login",
    // error: "/login",
  },
  secret: process.env.JWT_SECRET,
};

export default NextAuth(authOptions);
