import {
  cloneElement,
  FC,
  isValidElement,
  PropsWithChildren,
  ReactElement,
  useState,
} from "react";
import ReactDOM from "react-dom";
import { Placement } from "@popperjs/core";
import { usePopper } from "react-popper";

interface Props extends PropsWithChildren {
  text: string;
  placement: Placement;
  className?: string;
}

export const CustomTooltip: FC<Props> = ({
  children,
  text,
  placement,
  className,
}) => {
  const [popperReference, setPopperReference] = useState<HTMLDivElement | null>(
    null
  );
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);

  const [isVisible, setIsVisible] = useState(false);

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
    onMouseEnter: () => setIsVisible(() => true),
    onMouseLeave: () => setIsVisible(() => false),
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
          className={`shadow-sm ${isVisible ? `opacity-100` : `opacity-0`} ${
            isVisible ? "visible" : "invisible"
          }  rounded-lg shadow-sm transition-all duration-300`}
          ref={setPopperElement}
          {...attributes.popper}
        >
          <div
            className={`px-3 z-20 grid place-items-center relative font-medium h-[30px]
            min-w-64 w-auto text-white bg-gray-900 rounded text-sm
           shadow-sm  tooltip dark:bg-gray-700 ${className}`}
          >
            <span>{text}</span>
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
