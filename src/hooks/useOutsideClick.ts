import { useRef, useEffect } from 'react';

export function useOutsideClick(hadler: () => void, listenCapturing = true) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(event: globalThis.MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        hadler();
      }
    }
    document.addEventListener('click', handleClick, listenCapturing);

    return () => {
      document.removeEventListener('click', handleClick, listenCapturing);
    };
  }, [hadler, listenCapturing]);

  return ref;
}
