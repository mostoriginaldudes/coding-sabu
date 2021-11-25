import { useEffect, useRef } from 'react';

type EventName = keyof GlobalEventHandlersEventMap;
type Handler = (event: Event) => void;

export default function useEventListener<T extends HTMLElement>(
  eventName: EventName,
  handler: Handler,
  target?: T | Window
) {
  const savedCallback = useRef<Handler>(handler);
  const callback = (event: Event) => savedCallback.current(event);
  const elementToAdd = target || window;

  useEffect(() => {
    elementToAdd.addEventListener(eventName, callback);
    return () => elementToAdd.removeEventListener(eventName, callback);
  }, [eventName, elementToAdd]);
}
