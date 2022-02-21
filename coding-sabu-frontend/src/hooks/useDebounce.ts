import { useState } from 'react';

export default function useDebounce() {
  const [timerId, setTimerId] = useState<NodeJS.Timeout>();

  return (callback: () => void, delay: number = 500) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    const newTimerId = setTimeout(callback, delay);
    setTimerId(newTimerId);
  };
}
