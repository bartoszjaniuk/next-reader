import { useRouter } from "next/router";
import { ContentWrapper } from "./ContentWrapper/ContentWrapper";
import { Header } from "./Header/Header";
import { Sidebar } from "./Sidebar/Sidebar";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const isWithoutLayout = router.pathname !== "/login";

  return (
    <div className="flex h-screen">
      <Header />
      {isWithoutLayout && <Sidebar />}
      {isWithoutLayout && <ContentWrapper>{children}</ContentWrapper>}
      {!isWithoutLayout && children}
    </div>
  );
};
