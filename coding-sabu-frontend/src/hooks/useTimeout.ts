import { useEffect, useRef, useLayoutEffect } from "react";

type Callback = () => void;

export default function useTimeout(callback: Callback, delay: number) {
  const savedCallback = useRef<Callback>(callback);

  useLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const id = setTimeout(() => savedCallback.current(), delay);

    return () => clearTimeout(id);
  }, [delay]);
}
