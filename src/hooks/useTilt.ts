import { useRef, useCallback } from 'react';

// Replaces Angular's appTilt directive.
// Usage: const { ref, onMouseMove, onMouseLeave } = useTilt(15);
//        <div ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>

export function useTilt(tiltMax = 15) {
  const ref = useRef<HTMLElement>(null);

  const onMouseMove = useCallback((event: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    const tiltX = -(y / (rect.height / 2)) * tiltMax;
    const tiltY = (x / (rect.width / 2)) * tiltMax;
    el.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.05)`;
    el.style.setProperty('--glare-x', `${((event.clientX - rect.left) / rect.width) * 100}%`);
    el.style.setProperty('--glare-y', `${((event.clientY - rect.top) / rect.height) * 100}%`);
    const img = el.querySelector('.project-image img') as HTMLElement | null;
    if (img) {
      img.style.transform = `translate3d(${tiltY * -1.5}px, ${tiltX * 1.5}px, 50px) scale(1.1)`;
    }
  }, [tiltMax]);

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    el.style.setProperty('--glare-x', '50%');
    el.style.setProperty('--glare-y', '50%');
    const img = el.querySelector('.project-image img') as HTMLElement | null;
    if (img) img.style.transform = 'translate3d(0, 0, 0) scale(1)';
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
