import { useRouter } from "next/router";
import { ContentWrapper } from "./ContentWrapper/ContentWrapper";
import { Header } from "./Header/Header";
import { Sidebar } from "./Sidebar/Sidebar";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const isWithoutLayout = router.pathname !== "/login";

  return (
    // <div className="flex h-screen">
    //   <Header />
    //   {isWithoutLayout && <Sidebar />}
    //   {isWithoutLayout && <ContentWrapper>{children}</ContentWrapper>}
    //   {!isWithoutLayout && children}
    // </div>

    <>
      {isWithoutLayout && (
        <div className="flex h-[88vh] md:h-screen">
          <Header />
          {isWithoutLayout && <Sidebar />}
          {isWithoutLayout && <ContentWrapper>{children}</ContentWrapper>}
          {!isWithoutLayout && children}
        </div>
      )}
      {!isWithoutLayout && (
        <div className="md:bg-backgroundLight md:dark:bg-backgroundDark  bg-layoutLight dark:bg-layoutDark">
          <Header />
          {children}
        </div>
      )}
    </>
  );
};
