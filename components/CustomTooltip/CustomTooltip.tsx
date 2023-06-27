import ReactDOM from "react-dom";
import { CustomTooltipProps } from "./CustomTooltip.types";
import { Loader } from "../Loader/Loader";
import { usePopperTooltip } from "react-popper-tooltip";

export const CustomTooltip = ({
  children,
  onClick,
  isTranslationLoading,
  translation,
  text,
}: CustomTooltipProps) => {
  const {
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip({
    closeOnOutsideClick: true,
    trigger: "click",
    interactive: true,
  });

  return (
    <>
      <div
        className="border-transparent hover:border-primary inline"
        onClick={onClick}
        role="button"
        ref={setTriggerRef}
      >
        {children}
      </div>
      {visible &&
        ReactDOM.createPortal(
          <div
            ref={setTooltipRef}
            {...getTooltipProps({ className: "tooltip-container" })}
          >
            {isTranslationLoading && <Loader />}
            {!isTranslationLoading && translation && (
              <div className="flex gap-2">{translation}</div>
            )}
            <div {...getArrowProps({ className: "tooltip-arrow" })} />
          </div>,
          document.body
        )}
    </>
  );
};
