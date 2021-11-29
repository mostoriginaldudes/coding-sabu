import { RefObject } from 'react';
import useEventListener from './useEventListener';

type Handler = (event: MouseEvent) => void;

export default function useClickOutside<T extends HTMLElement = HTMLElement>(
  target: RefObject<T>,
  handler: Handler
) {
  useEventListener('click', (event: Event) => {
    if (target?.current?.contains(event.target as HTMLElement)) {
      return;
    }
    handler(event as MouseEvent);
  });
}
