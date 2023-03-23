import { Placement } from "@popperjs/core";
import {
    PropsWithChildren,
  } from "react";


export type CustomTooltipProps = {
    text: string;
    placement: Placement;
    className?: string;
} & PropsWithChildren