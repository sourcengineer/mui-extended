import { useEffect, useState } from "react";

export const useScroller = () => {
  const [scrollTriggerCount, setScrollTriggerCount] = useState(0);

  const tryScrollToFirstError = () => {
    setScrollTriggerCount(scrollTriggerCount + 1);
  };

  const scrollToFirstErrorTop = () => {
    const firstErrorElement = document.querySelector("[error-anchor]");
    firstErrorElement?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    setTimeout(() => {
      scrollToFirstErrorTop();
    }, 0);
  }, [scrollTriggerCount]);

  return [tryScrollToFirstError, scrollToTop];
};
