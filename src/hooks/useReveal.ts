import { useEffect, useRef } from 'react';

// Replaces Angular's appReveal directive.
// Adds 'reveal-text-visible' class when element scrolls into view.
// Usage: const ref = useReveal();  <h1 ref={ref} className="reveal-text-hidden">

export function useReveal() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add('reveal-text-hidden');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('reveal-text-visible');
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
