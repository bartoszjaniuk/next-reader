import React from "react";

export const ContentWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div data-testid='ContentWrapper--Container' className="px-7 py-[5rem] w-full flex justify-center items-center">
      {children}
    </div>
  );
};
