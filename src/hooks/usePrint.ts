import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const usePrint = () => {
  const printComponentRef = useRef(null);

  const print = useReactToPrint({
    pageStyle:
      "@page { size: auto; margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; padding: 40px !important; } }",
    content: () => printComponentRef.current,
  });

  return { printComponentRef, print };
};

export default usePrint;
