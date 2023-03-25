import { cloneElement, isValidElement, ReactElement, useState } from "react";
import ReactDOM from "react-dom";
import { usePopper } from "react-popper";
import { useComponentVisible } from "@/hooks/useComponentVisible";
import { CustomTooltipProps } from "./CustomTooltip.types";
import { Loader } from "../Loader/Loader";

export const SpeakerIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
      />
    </svg>
  );
};

export const CustomTooltip = ({
  children,
  text,
  placement,
  className,
  onClick,
  isTranslationLoading,
  translation,
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
      { name: "offset", options: { offset: [0, -110] } },
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
      <div onClick={onClick} className="contents border hover:border-primary">
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
            className={`px-3 z-20 relative font-medium h-[70px]
              min-w-[150px]  text-white bg-gray-900 rounded text-sm
              shadow-sm  tooltip dark:bg-gray-700 ${className} flex items-center justify-center gap-2`}
          >
            {isTranslationLoading && <Loader />}
            {!isTranslationLoading && (
              <>
                <SpeakerIcon />
                {translation && translation}
              </>
            )}
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
