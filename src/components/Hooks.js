import { useEffect, useRef } from "react";

export const usePrev = value => {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef();

  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current;
};

export const useTitle = (title = "") => {
  document.title = `KM Store${title && " - " + title}`;
};

export const useEscape = fun => {
  useEffect(() => {
    window.addEventListener("keydown", ({ key }) => {
      if (key === "Escape" && isFunction(fun)) {
        fun();
      }
    });
  }, [fun]);
};

function isFunction(functionToCheck) {
  return (
    functionToCheck && {}.toString.call(functionToCheck) === "[object Function]"
  );
}
