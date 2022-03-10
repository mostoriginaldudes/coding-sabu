import { DependencyList, useEffect } from 'react';

type Callback = () => void;

export default function useTimeout(callback: Callback, delay: number, deps: DependencyList) {
  useEffect(() => {
    const timer = setTimeout(callback, delay - 100);
    return () => {
      clearTimeout(timer);
    };
  }, deps);
}
