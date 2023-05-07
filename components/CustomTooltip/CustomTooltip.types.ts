import { PropsWithChildren } from "react";

export type CustomTooltipProps = {
  text:string;
  isTranslationLoading: boolean;
  translation: string | undefined;
  onClick: () => void;
} & PropsWithChildren;
