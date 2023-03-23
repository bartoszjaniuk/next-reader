import { cloneElement, isValidElement, ReactElement, useState } from "react";
import ReactDOM from "react-dom";
import { usePopper } from "react-popper";
import { useComponentVisible } from "@/hooks/useComponentVisible";
import { CustomTooltipProps } from "./CustomTooltip.types";

export const CustomTooltip = ({
  children,
  text,
  placement,
  className,
}: CustomTooltipProps) => {
  const [popperReference, setPopperReference] = useState<HTMLDivElement | null>(
    null
  );
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);

  const { styles, attributes } = usePopper(popperReference, popperElement, {
    modifiers: [
      { name: "arrow", options: { element: arrowElement } },
      { name: "offset", options: { offset: [0, -70] } },
    ],
  });

  if (!isValidElement(children)) {
    console.warn("wrapped element is not a valid element");
    return null;
  }

  const childrenWithPopperProps = cloneElement(children as ReactElement, {
    ref: setPopperReference,
    onClick: () => setIsComponentVisible(true),
    "aria-describedby": "tooltip-message",
  });

  return (
    <>
      <div className="contents border hover:border-primary">
        {childrenWithPopperProps}
      </div>
      {ReactDOM.createPortal(
        <div
          role="tooltip"
          id="tooltip-message"
          style={styles.popper}
          className={`shadow-sm ${
            isComponentVisible ? `opacity-100` : `opacity-0`
          } ${
            isComponentVisible ? "visible" : "invisible"
          }  rounded-lg shadow-sm transition-all duration-300`}
          ref={setPopperElement}
          {...attributes.popper}
        >
          <div
            ref={ref}
            className={`px-3 z-20 grid place-items-center relative font-medium h-[30px]
            min-w-64 w-auto text-white bg-gray-900 rounded text-sm
           shadow-sm  tooltip dark:bg-gray-700 ${className}`}
          >
            <button
              className="bg-primary"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();
              }}
            >
              {text}
            </button>
          </div>
          <div
            ref={setArrowElement}
            data-popper-arrow
            className={`popper-arrow z-10 ${
              placement ?? "auto"
            } h-5 w-5 before:absolute before:inset-0  before:bg-gray-700`}
            style={styles.arrow}
          />
        </div>,
        document.getElementById("portal") as HTMLElement
      )}
    </>
  );
};
