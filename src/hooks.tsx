import { useState, useEffect, useRef, useCallback } from "react";

// ─── Hash-based router with transitions ──────────────────────────────────
export function useRouter() {
  const [route, setRoute] = useState(window.location.hash.slice(1) || "/");
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const handler = () => {
      setTransitioning(true);
      setTimeout(() => {
        setRoute(window.location.hash.slice(1) || "/");
        window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
        setTransitioning(false);
      }, 250);
    };
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);
  return { route, transitioning };
}

// ─── Intersection Observer for scroll animations ─────────────────────────
export function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); obs.unobserve(el); } },
      { threshold: 0.08, ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, isVisible };
}

// ─── Scroll-based parallax ───────────────────────────────────────────────
export function useParallax(speed = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const h = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const viewCenter = window.innerHeight / 2;
      setOffset((center - viewCenter) * speed);
    };
    window.addEventListener("scroll", h, { passive: true });
    h();
    return () => window.removeEventListener("scroll", h);
  }, [speed]);

  return { ref, offset };
}

// ─── Animated counter ────────────────────────────────────────────────────
export function useCounter(end: number, duration = 1500) {
  const [value, setValue] = useState(0);
  const { ref, isVisible } = useInView();

  useEffect(() => {
    if (!isVisible) return;
    const start = 0;
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(Math.round(start + (end - start) * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isVisible, end, duration]);

  return { ref, value };
}

// ─── 3D tilt on hover ────────────────────────────────────────────────────
export function useTilt(maxTilt = 8) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setStyle({
      transform: `perspective(800px) rotateY(${x * maxTilt}deg) rotateX(${-y * maxTilt}deg) scale(1.02)`,
      transition: "transform 0.1s ease-out",
    });
  }, [maxTilt]);

  const onLeave = useCallback(() => {
    setStyle({ transform: "perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)", transition: "transform 0.5s ease-out" });
  }, []);

  return { ref, style, onMove, onLeave };
}

// ─── Mouse glow effect ──────────────────────────────────────────────────
export function useGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0, active: false });

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top, active: true });
  }, []);

  const onLeave = useCallback(() => setPos(p => ({ ...p, active: false })), []);

  return { ref, pos, onMove, onLeave };
}

// ─── Scroll progress (0-1) ──────────────────────────────────────────────
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const h = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return progress;
}
