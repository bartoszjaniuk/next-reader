import { useRouter } from "next/router";
import { ContentWrapper } from "./ContentWrapper/ContentWrapper";
import { Header } from "./Header/Header";
import { Sidebar } from "./Sidebar/Sidebar";
import { useState } from "react";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const isWithoutLayout = router.pathname !== "/login";
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => setIsOpen((prev) => !prev);

  return (
    <>
      {isWithoutLayout && (
        <div className="flex pb-[100px] md:pb-0 h-full">
          <Header />
          {isWithoutLayout && (
            <Sidebar isOpen={isOpen} toggleIsOpen={toggleIsOpen} />
          )}
          {isWithoutLayout && (
            <ContentWrapper isOpen={isOpen}>{children}</ContentWrapper>
          )}
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
