import { useRef, useCallback } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!';

export function useDecode() {
  const ref = useRef<HTMLElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isHovered = useRef(false);
  // Cache original text on first hover so it's always correct
  const originalText = useRef<string>('');

  const onMouseEnter = useCallback(() => {
    if (isHovered.current) return;
    isHovered.current = true;
    const el = ref.current;
    if (!el) return;

    // Grab original text lazily on first hover
    if (!originalText.current) {
      originalText.current = el.innerText;
    }
    const text = originalText.current;
    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      el.innerText = text
        .split('')
        .map((letter, index) => {
          if (index < iteration) return text[index];
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join('');

      if (iteration >= text.length) {
        clearInterval(intervalRef.current!);
        el.innerText = text;
      }
      iteration += 1 / 3;
    }, 30);
  }, []);

  const onMouseLeave = useCallback(() => {
    isHovered.current = false;
  }, []);

  return { ref, onMouseEnter, onMouseLeave };
}
