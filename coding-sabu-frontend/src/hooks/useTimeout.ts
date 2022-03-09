import { DependencyList, useEffect, useLayoutEffect, useRef } from 'react';

type Callback = () => void;

export default function useTimeout(callback: Callback, delay: number, deps: DependencyList) {
  useEffect(() => {
    const timer = setTimeout(callback, delay + 1000);
    return () => {
      clearTimeout(timer);
    };
  }, deps);
}
