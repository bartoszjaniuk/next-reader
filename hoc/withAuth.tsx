import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";

const withAuth = (getServerSideProps: (context: GetServerSidePropsContext)=> any) => {
  return async (context: GetServerSidePropsContext) => {
    const session = await getServerSession(
      context.req,
      context.res,
      authOptions
    );
    if (!session) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
    const getServerSidePropsData = await getServerSideProps(context);
    if(getServerSidePropsData?.props) {
      return {
        props: {
         ...getServerSidePropsData.props,
         user: session.user,
        }
       }
    }
    return {
     props: {
      user: session.user,
     }
    }   
  };
};

export default withAuth;
