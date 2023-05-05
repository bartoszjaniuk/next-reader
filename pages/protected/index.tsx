import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import withAuth from "@/hoc/withAuth";
import { UserFromSession } from "@/types/UserFromSession";

const ProtectedPage: NextPage<UserFromSession> = ({ user }) => {
  return <div>User: {user.email}</div>;
};

export const getServerSideProps: GetServerSideProps = withAuth((context: GetServerSidePropsContext) => {
  return {
    props: {},
  };
});

export default ProtectedPage;
