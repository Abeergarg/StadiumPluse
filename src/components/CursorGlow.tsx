'use client';
import { useEffect } from 'react';

export default function CursorGlow() {
  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    const el = document.createElement('div');
    el.id = 'cursor-glow';
    document.body.appendChild(el);

    let x = -999, y = -999, rafId: number;

    const onMove = (e: MouseEvent) => { x = e.clientX; y = e.clientY; };
    const loop = () => { el.style.left = `${x}px`; el.style.top = `${y}px`; rafId = requestAnimationFrame(loop); };

    window.addEventListener('mousemove', onMove, { passive: true });
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
      el.remove();
    };
  }, []);
  return null;
}
