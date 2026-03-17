import { useRef, useCallback } from 'react';

// Replaces Angular's appMagnetic directive.
// Usage: const { ref, onMouseMove, onMouseLeave } = useMagnetic(0.5);
//        <a ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>

export function useMagnetic(pull = 0.5) {
  const ref = useRef<HTMLElement>(null);

  const onMouseMove = useCallback((event: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * pull;
    const y = (event.clientY - rect.top - rect.height / 2) * pull;
    el.style.transform = `translate(${x}px, ${y}px)`;
  }, [pull]);

  const onMouseLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = 'translate(0px, 0px)';
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
