import { useEffect, useRef } from "react";

export default function BackgroundEffects() {
  const canvasRef = useRef<HTMLDivElement>(null);

  // Diagonal shining bars animation
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;

    let raf = 0;
    const start = Date.now();

    // Use sharper stops for thinner lines but ensure edges (0% and 100%) are transparent to avoid boxiness
    el.style.backgroundImage = `
      linear-gradient(45deg, transparent 0%, transparent 40%, hsl(var(--primary) / var(--bg-effect-low)) 47%, hsl(var(--primary) / var(--bg-effect-high)) 50%, hsl(var(--primary) / var(--bg-effect-low)) 53%, transparent 60%, transparent 100%),
      linear-gradient(-45deg, transparent 0%, transparent 42%, hsl(var(--primary) / var(--bg-effect-low-2)) 48%, hsl(var(--primary) / var(--bg-effect-high-2)) 50%, hsl(var(--primary) / var(--bg-effect-low-2)) 52%, transparent 58%, transparent 100%)
    `;
    el.style.backgroundSize = "400% 400%";

    const animate = () => {
      const elapsed = Date.now() - start;

      // Use sine and cosine for perfectly smooth, continuous oscillation (no violent resets)
      const p1 = 50 + Math.sin(elapsed * 0.0003) * 50;
      const p2 = 50 + Math.cos(elapsed * 0.0002) * 50;

      el.style.backgroundPosition = `${p1}% ${p2}%, ${100 - p2}% ${100 - p1}%`;

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}
