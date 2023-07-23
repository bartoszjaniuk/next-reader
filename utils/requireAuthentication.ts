import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";

// THIS IS ALTERNATIVE FOR HOC
export const requireAuthentication = async (
  context: GetServerSidePropsContext,
  cb: any
) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return cb({ user: session.user });
};
