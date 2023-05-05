import { UploadFile } from "@/components/UploadFile/UploadFile";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Inter } from "next/font/google";
import withAuth from "@/hoc/withAuth";
import { UserFromSession } from "@/types/UserFromSession";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ user }: UserFromSession) {
  return <div>Witaj, {user.email}</div>;
}

export const getServerSideProps: GetServerSideProps = withAuth(
  (context: GetServerSidePropsContext) => {
    return {
      props: {},
    };
  }
);
