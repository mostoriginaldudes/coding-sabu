import { useEffect, DependencyList } from 'react';

export default function useScrollLock(condition: boolean, deps: DependencyList) {
  useEffect(() => {
    if (condition) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [condition, deps]);
}
