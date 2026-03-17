import { useRef, useEffect } from 'react';

interface Particle {
  x: number; y: number; vx: number; vy: number;
  size: number; color: string; life: number; decay: number;
}

export function useExplode() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.position = 'relative';

    const canvas = document.createElement('canvas');
    canvas.style.cssText = `position:absolute;top:-50px;left:-50px;width:calc(100% + 100px);height:calc(100% + 100px);pointer-events:none;z-index:999;`;
    el.appendChild(canvas);
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      const rect = el.getBoundingClientRect();
      canvas.width = rect.width + 100;
      canvas.height = rect.height + 100;
    };
    resize();

    let particles: Particle[] = [];
    let animId = 0;
    let hovered = false;
    const COLORS = ['#7c3aed', '#3b82f6', '#10b981', '#ff0055', '#00ffff'];

    const createParticles = () => {
      particles = Array.from({ length: 40 }, () => ({
        x: canvas.width / 2, y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 10, vy: (Math.random() - 0.5) * 10,
        size: Math.random() * 4 + 1,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        life: 1, decay: Math.random() * 0.02 + 0.02,
      }));
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let active = false;
      particles.forEach(p => {
        if (p.life <= 0) return;
        active = true;
        p.life -= p.decay; p.x += p.vx; p.y += p.vy;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      if (active) { animId = requestAnimationFrame(animate); }
      else if (hovered) { createParticles(); animId = requestAnimationFrame(animate); }
      else { ctx.clearRect(0, 0, canvas.width, canvas.height); }
    };

    const onEnter = () => { if (hovered) return; hovered = true; resize(); createParticles(); animate(); };
    const onLeave = () => { hovered = false; };

    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(animId);
      canvas.remove();
    };
  }, []);

  return ref;
}
