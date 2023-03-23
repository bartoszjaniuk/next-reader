import { useEffect, useRef, useState } from "react";

export const useComponentVisible =(initialIsVisible: boolean) =>{
    const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
    const ref = useRef<HTMLDivElement>(null);
  
    const handleClickOutside = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target as Element)) {
        setIsComponentVisible(false);
      }
    };
  
    useEffect(() => {
      document.addEventListener("click", handleClickOutside, true);
      return () => {
        document.removeEventListener("click", handleClickOutside, true);
      };
    }, []);
  
    return { ref, isComponentVisible, setIsComponentVisible };
  }