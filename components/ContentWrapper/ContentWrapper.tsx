import React from "react";

export const ContentWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="p-7">{children}</div>;
};
