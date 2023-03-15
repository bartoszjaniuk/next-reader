import { useSelectedText } from "@/hooks/useSelectedText";

import { SelectTextWrapperProps } from "./SelectTextWrapper.types";

export const SelectTextWrapper = ({ children }: SelectTextWrapperProps) => {
  const { text, parentRef, styles } = useSelectedText();
  return (
    <div className="mt-10" style={{ position: "relative" }}>
      <div ref={parentRef}>{children}</div>
      {text && (
        <div style={styles}>
          <button
            type="button"
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:text-gray-900 dark:bg-white border dark:border-gray-300  dark:hover:bg-gray-100 dark:focus:ring-gray-200"
          >
            Light
          </button>
        </div>
      )}
    </div>
  );
};
