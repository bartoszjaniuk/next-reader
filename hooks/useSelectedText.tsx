import { CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import { debounce } from "lodash";

export const useSelectedText = () => {
  const parentRef = useRef(null);
  const [text, setText] = useState("");
  const [cords, setCords] = useState<DOMRect | undefined>(undefined);
  const [submittedText, setSubmittedText] = useState("");

  const handleChange = useCallback(() => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) {
      setText("");
      return;
    }

    setText(selection.toString());
    const cords = selection.getRangeAt(0).getBoundingClientRect();
    setCords(cords);
  }, []);

  const debouncedhandleChange = debounce(handleChange, 300);

  useEffect(() => {
    document.addEventListener("selectionchange", debouncedhandleChange);
    return () =>
      document.removeEventListener("selectionchange", debouncedhandleChange);
  }, [debouncedhandleChange]);

  const submit = () => {
    setSubmittedText(text);
  };
  const styles: CSSProperties = {
    position: "absolute",
    top: `${cords && cords.top - 35}px`,
    left: `${cords?.left}px`,
  };
  return { text, parentRef, styles, submit };
};
