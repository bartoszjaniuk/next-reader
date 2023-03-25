import { Placement } from "@popperjs/core";
import { PropsWithChildren } from "react";

export type CustomTooltipProps = {
  text: string;
  isTranslationLoading: boolean;
  translation: string | undefined;
  placement: Placement;
  className?: string;
  onClick: () => void;
} & PropsWithChildren;
