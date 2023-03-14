import { useSelectedText } from "@/hooks/useSelectedText";

import { SelectTextButton } from "../SelectTextButton/SelectTextButton";
import { SelectTextWrapperProps } from "./SelectTextWrapper.types";

export const SelectTextWrapper = ({ children }: SelectTextWrapperProps) => {
  const { text, parentRef, styles } = useSelectedText();
  return (
    <div className="mt-10" style={{ position: "relative" }}>
      <div ref={parentRef}>{children}</div>
      {text && (
        <div style={styles}>
          <SelectTextButton>
            <>Przetłumacz</>
          </SelectTextButton>
        </div>
      )}
    </div>
  );
};
