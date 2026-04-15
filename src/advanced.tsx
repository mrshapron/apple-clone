import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useInView } from "./hooks";
import { FONT, BLUE, DARK, WHITE_TEXT } from "./shared";

// ═══════════════════════════════════════════════════════════════════════════
// STARFIELD / PARTICLE CANVAS
// ═══════════════════════════════════════════════════════════════════════════
export function StarField({ color = "rgba(255,255,255,0.5)", count = 80, speed = 0.3, height = 500 }: {
  color?: string; count?: number; speed?: number; height?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let w = canvas.parentElement?.clientWidth || 800;
    let h = height;
    canvas.width = w; canvas.height = h;
    const stars = Array.from({ length: count }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      alpha: Math.random() * 0.5 + 0.2,
      pulse: Math.random() * Math.PI * 2,
    }));
    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      stars.forEach(s => {
        s.x += s.vx; s.y += s.vy;
        s.pulse += 0.02;
        if (s.x < 0) s.x = w; if (s.x > w) s.x = 0;
        if (s.y < 0) s.y = h; if (s.y > h) s.y = 0;
        const a = s.alpha * (0.6 + 0.4 * Math.sin(s.pulse));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = color.replace("0.5", String(a));
        ctx.fill();
      });
      // Draw connection lines between close stars
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.strokeStyle = color.replace("0.5", String(0.06 * (1 - dist / 100)));
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    const resize = () => { w = canvas.parentElement?.clientWidth || 800; canvas.width = w; canvas.height = h; };
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [color, count, speed, height]);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />;
}

// ═══════════════════════════════════════════════════════════════════════════
// ANIMATED GRADIENT MESH BACKGROUND
// ═══════════════════════════════════════════════════════════════════════════
export function GradientMesh({ colors = ["#533483", "#0f3460", "#1a1a2e", "#16213e"], style = {} }: {
  colors?: string[]; style?: React.CSSProperties;
}) {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", ...style }}>
      {colors.map((c, i) => (
        <div key={i} style={{
          position: "absolute",
          width: `${50 + Math.random() * 30}%`,
          height: `${50 + Math.random() * 30}%`,
          left: `${(i % 2) * 40 + Math.random() * 20}%`,
          top: `${Math.floor(i / 2) * 40 + Math.random() * 20}%`,
          background: `radial-gradient(circle, ${c}44, transparent 65%)`,
          borderRadius: "50%",
          animation: `mesh-float-${i % 4} ${12 + i * 3}s ease-in-out infinite`,
          filter: "blur(40px)",
        }} />
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// TYPEWRITER TEXT
// ═══════════════════════════════════════════════════════════════════════════
export function TypeWriter({ text, speed = 50, delay = 0, style = {}, onComplete }: {
  text: string; speed?: number; delay?: number; style?: React.CSSProperties; onComplete?: () => void;
}) {
  const [displayed, setDisplayed] = useState("");
  const { ref, isVisible } = useInView();
  const started = useRef(false);

  useEffect(() => {
    if (!isVisible || started.current) return;
    started.current = true;
    let i = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) { clearInterval(interval); onComplete?.(); }
      }, speed);
    }, delay);
    return () => clearTimeout(timer);
  }, [isVisible, text, speed, delay]);

  return <span ref={ref} style={style}>{displayed}<span style={{ animation: "blink 1s step-end infinite", opacity: displayed.length < text.length ? 1 : 0 }}>|</span></span>;
}

// ═══════════════════════════════════════════════════════════════════════════
// CINEMATIC TEXT REVEAL (word by word)
// ═══════════════════════════════════════════════════════════════════════════
export function CinematicText({ text, style = {}, stagger = 0.08 }: {
  text: string; style?: React.CSSProperties; stagger?: number;
}) {
  const { ref, isVisible } = useInView();
  const words = text.split(" ");
  return (
    <span ref={ref} style={{ display: "inline", ...style }}>
      {words.map((word, i) => (
        <span key={i} style={{
          display: "inline-block", marginRight: "0.3em",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0) rotateX(0deg)" : "translateY(20px) rotateX(40deg)",
          transition: `opacity 0.6s cubic-bezier(0.25,0.46,0.45,0.94) ${i * stagger}s, transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94) ${i * stagger}s`,
        }}>{word}</span>
      ))}
    </span>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MAGNETIC BUTTON
// ═══════════════════════════════════════════════════════════════════════════
export function MagneticButton({ children, href, variant = "primary", style: extraStyle = {} }: {
  children: React.ReactNode; href?: string; variant?: "primary" | "secondary" | "ghost"; style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
    setOffset({ x, y });
  }, []);

  const styles: Record<string, React.CSSProperties> = {
    primary: { backgroundColor: BLUE, color: "#fff", padding: "14px 30px", borderRadius: 40, fontSize: 16, fontWeight: 500 },
    secondary: { backgroundColor: "transparent", color: BLUE, padding: "14px 30px", borderRadius: 40, fontSize: 16, fontWeight: 500, border: `1.5px solid ${BLUE}` },
    ghost: { backgroundColor: "transparent", color: BLUE, padding: "8px 0", fontSize: 17, fontWeight: 400 },
  };

  return (
    <a ref={ref} href={href || "#"} onMouseMove={onMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => { setOffset({ x: 0, y: 0 }); setHovering(false); }}
      style={{
        display: "inline-flex", alignItems: "center", gap: 6, textDecoration: "none",
        transform: `translate(${offset.x}px, ${offset.y}px) scale(${hovering ? 1.05 : 1})`,
        transition: hovering ? "transform 0.15s ease-out" : "transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94)",
        cursor: "pointer", fontFamily: FONT,
        ...styles[variant], ...extraStyle,
      }}
    >
      {children}
      {variant === "ghost" && <span style={{ transition: "transform 0.3s", transform: hovering ? "translateX(4px)" : "translateX(0)" }}>&gt;</span>}
    </a>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SCROLL-LINKED PROGRESS RING
// ═══════════════════════════════════════════════════════════════════════════
export function ScrollProgressRing({ size = 50, strokeWidth = 3 }: { size?: number; strokeWidth?: number }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const h = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 999, opacity: progress > 0.02 ? 1 : 0, transition: "opacity 0.3s", cursor: "pointer" }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="rgba(29,29,31,0.7)" stroke="rgba(255,255,255,0.1)" strokeWidth={strokeWidth} style={{ backdropFilter: "blur(8px)" }} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={BLUE} strokeWidth={strokeWidth}
          strokeDasharray={circ} strokeDashoffset={circ * (1 - progress)} strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.1s" }} />
      </svg>
      <svg width="14" height="14" viewBox="0 0 14 14" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%) rotate(0deg)" }} fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
        <path d="M7 11V3M3 6l4-4 4 4" />
      </svg>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// HORIZONTAL SCROLL SHOWCASE
// ═══════════════════════════════════════════════════════════════════════════
export function HorizontalShowcase({ children, height = 500 }: { children: React.ReactNode; height?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollX, setScrollX] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const scroll = scrollRef.current;
    if (!container || !scroll) return;

    const h = () => {
      const rect = container.getBoundingClientRect();
      const sectionHeight = container.clientHeight;
      const scrollable = scroll.scrollWidth - window.innerWidth;
      if (rect.top < 0 && rect.bottom > window.innerHeight) {
        const progress = Math.min(1, Math.max(0, -rect.top / (sectionHeight - window.innerHeight)));
        setScrollX(-progress * scrollable);
      }
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div ref={containerRef} style={{ height: height * 2.5, position: "relative" }}>
      <div style={{ position: "sticky", top: 0, height: height, overflow: "hidden" }}>
        <div ref={scrollRef} style={{
          display: "flex", gap: 20, padding: "0 40px", alignItems: "center", height: "100%",
          transform: `translateX(${scrollX}px)`, transition: "transform 0.05s linear",
          willChange: "transform",
        }}>
          {children}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// PRODUCT CONFIGURATOR
// ═══════════════════════════════════════════════════════════════════════════
export function ProductConfigurator({ name, basePrice, options, DeviceComponent }: {
  name: string;
  basePrice: number;
  options: { category: string; choices: { label: string; price: number; default?: boolean }[] }[];
  DeviceComponent: React.ComponentType<{ color?: string }>;
}) {
  const [selections, setSelections] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    options.forEach(o => {
      const defaultIdx = o.choices.findIndex(c => c.default);
      initial[o.category] = defaultIdx >= 0 ? defaultIdx : 0;
    });
    return initial;
  });

  const totalPrice = basePrice + options.reduce((sum, o) => sum + o.choices[selections[o.category] || 0].price, 0);

  return (
    <div style={{ display: "flex", gap: 48, flexWrap: "wrap", justifyContent: "center", alignItems: "flex-start", padding: "60px 22px 80px", maxWidth: 1100, margin: "0 auto" }}>
      {/* Product preview */}
      <div style={{ flex: "1 1 340px", display: "flex", flexDirection: "column", alignItems: "center", position: "sticky", top: 80 }}>
        <div style={{ padding: 40, transition: "transform 0.5s", animation: "float 6s ease-in-out infinite" }}>
          <DeviceComponent />
        </div>
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <h3 style={{ fontFamily: FONT, fontSize: 28, fontWeight: 600, color: DARK, margin: "0 0 4px" }}>{name}</h3>
          <p style={{ fontFamily: FONT, fontSize: 24, fontWeight: 400, color: DARK, margin: "0 0 16px" }}>
            ${totalPrice.toLocaleString()}<span style={{ fontSize: 14, color: "#6e6e73" }}>.00</span>
          </p>
          <MagneticButton href="#/store" variant="primary">Add to Bag</MagneticButton>
        </div>
      </div>

      {/* Options */}
      <div style={{ flex: "1 1 400px", maxWidth: 500 }}>
        {options.map(o => (
          <div key={o.category} style={{ marginBottom: 32 }}>
            <h4 style={{ fontFamily: FONT, fontSize: 18, fontWeight: 600, color: DARK, margin: "0 0 14px" }}>{o.category}</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {o.choices.map((c, i) => {
                const selected = selections[o.category] === i;
                return (
                  <button key={c.label} onClick={() => setSelections(s => ({ ...s, [o.category]: i }))}
                    style={{
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      padding: "14px 18px", borderRadius: 14,
                      border: selected ? `2px solid ${BLUE}` : "2px solid #d2d2d7",
                      backgroundColor: selected ? "rgba(41,151,255,0.04)" : "#fff",
                      cursor: "pointer", transition: "all 0.25s", textAlign: "left",
                      fontFamily: FONT, fontSize: 15,
                    }}
                  >
                    <span style={{ color: DARK, fontWeight: selected ? 600 : 400 }}>{c.label}</span>
                    <span style={{ color: c.price > 0 ? "#6e6e73" : "#34c759", fontSize: 14, fontWeight: 500 }}>
                      {c.price > 0 ? `+$${c.price}` : "Included"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// RIPPLE BUTTON
// ═══════════════════════════════════════════════════════════════════════════
export function RippleButton({ children, onClick, style: extraStyle = {} }: {
  children: React.ReactNode; onClick?: () => void; style?: React.CSSProperties;
}) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples(r => [...r, { x, y, id }]);
    setTimeout(() => setRipples(r => r.filter(rr => rr.id !== id)), 600);
    onClick?.();
  };

  return (
    <button ref={btnRef} onClick={handleClick} style={{
      position: "relative", overflow: "hidden", border: "none", cursor: "pointer",
      backgroundColor: BLUE, color: "#fff", padding: "14px 30px", borderRadius: 40,
      fontSize: 16, fontWeight: 500, fontFamily: FONT, transition: "transform 0.2s",
      ...extraStyle,
    }}>
      {ripples.map(r => (
        <span key={r.id} style={{
          position: "absolute", left: r.x - 50, top: r.y - 50,
          width: 100, height: 100, borderRadius: "50%",
          backgroundColor: "rgba(255,255,255,0.3)",
          animation: "ripple-expand 0.6s ease-out forwards",
          pointerEvents: "none",
        }} />
      ))}
      <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
    </button>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MARQUEE SCROLL
// ═══════════════════════════════════════════════════════════════════════════
export function Marquee({ items, speed = 30, dark = false }: {
  items: string[]; speed?: number; dark?: boolean;
}) {
  const doubled = [...items, ...items];
  return (
    <div style={{ overflow: "hidden", whiteSpace: "nowrap", padding: "20px 0", backgroundColor: dark ? "#000" : "#f5f5f7" }}>
      <div style={{ display: "inline-flex", gap: 60, animation: `marquee ${speed}s linear infinite` }}>
        {doubled.map((item, i) => (
          <span key={i} style={{ fontSize: 14, color: dark ? "#a1a1a6" : "#6e6e73", fontWeight: 500, fontFamily: FONT, letterSpacing: "0.02em" }}>{item}</span>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// COMPARISON SLIDER
// ═══════════════════════════════════════════════════════════════════════════
export function ComparisonSlider({ leftLabel, rightLabel, leftColor = "#1a1a2e", rightColor = "#533483", height = 300 }: {
  leftLabel: string; rightLabel: string; leftColor?: string; rightColor?: string; height?: number;
}) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setPosition(x);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!dragging.current) return;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      updatePosition(clientX);
    };
    const onUp = () => { dragging.current = false; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("touchmove", onMove); window.removeEventListener("mouseup", onUp); window.removeEventListener("touchend", onUp); };
  }, [updatePosition]);

  return (
    <div ref={containerRef} style={{ position: "relative", height, borderRadius: 20, overflow: "hidden", cursor: "ew-resize", userSelect: "none" }}
      onMouseDown={(e) => { dragging.current = true; updatePosition(e.clientX); }}
      onTouchStart={(e) => { dragging.current = true; updatePosition(e.touches[0].clientX); }}
    >
      {/* Left side */}
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${leftColor}, ${leftColor}dd)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 24, fontWeight: 600, color: "rgba(255,255,255,0.7)", fontFamily: FONT }}>{leftLabel}</span>
      </div>
      {/* Right side (clipped) */}
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${rightColor}, ${rightColor}dd)`, clipPath: `inset(0 0 0 ${position}%)`, display: "flex", alignItems: "center", justifyContent: "center", transition: "clip-path 0.05s" }}>
        <span style={{ fontSize: 24, fontWeight: 600, color: "rgba(255,255,255,0.7)", fontFamily: FONT }}>{rightLabel}</span>
      </div>
      {/* Divider */}
      <div style={{ position: "absolute", left: `${position}%`, top: 0, bottom: 0, width: 3, backgroundColor: "#fff", transform: "translateX(-50%)", boxShadow: "0 0 10px rgba(0,0,0,0.3)", transition: "left 0.05s" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 36, height: 36, borderRadius: "50%", backgroundColor: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round"><path d="M5 3L2 8l3 5M11 3l3 5-3 5"/></svg>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// NOTIFICATION TOAST
// ═══════════════════════════════════════════════════════════════════════════
export function useToast() {
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: "", visible: false });
  const show = useCallback((message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 2500);
  }, []);
  const Toast = () => toast.visible ? (
    <div style={{
      position: "fixed", bottom: 80, left: "50%", transform: "translateX(-50%)",
      backgroundColor: "rgba(29,29,31,0.9)", color: "#fff", padding: "12px 24px",
      borderRadius: 14, fontSize: 14, fontWeight: 500, fontFamily: FONT,
      backdropFilter: "blur(12px)", boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
      animation: "toast-in 0.3s ease-out", zIndex: 2000,
    }}>{toast.message}</div>
  ) : null;
  return { show, Toast };
}

// ═══════════════════════════════════════════════════════════════════════════
// APPLE-STYLE COMPARISON TABLE
// ═══════════════════════════════════════════════════════════════════════════
export interface ComparisonModel {
  name: string;
  image: React.ReactNode;
  price: string;
  colors?: { name: string; hex: string }[];
  isNew?: boolean;
  specs: Record<string, string | boolean>;
  buyLink?: string;
  learnLink?: string;
}

export function ComparisonTable({ models, specLabels, title = "Compare models." }: {
  models: ComparisonModel[];
  specLabels: { key: string; label: string }[];
  title?: string;
}) {
  const [selectedColors, setSelectedColors] = useState<Record<number, number>>({});
  const { ref, isVisible } = useInView();

  return (
    <section ref={ref} style={{ backgroundColor: "#fff", padding: "80px 22px 90px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <h2 style={{
          fontFamily: FONT, fontSize: "clamp(32px,5vw,56px)", fontWeight: 700,
          color: DARK, letterSpacing: "-0.025em", textAlign: "center", margin: "0 0 60px",
        }}>
          <CinematicText text={title} />
        </h2>

        {/* Sticky header with product images and names */}
        <div style={{ overflowX: "auto", scrollbarWidth: "none" }}>
          <table style={{ width: "100%", minWidth: models.length * 220, borderCollapse: "collapse", tableLayout: "fixed" }}>
            <thead>
              <tr>
                {models.map((m, i) => (
                  <th key={m.name} style={{
                    verticalAlign: "bottom", textAlign: "center", padding: "0 12px 24px",
                    width: `${100 / models.length}%`,
                    borderBottom: "1px solid #d2d2d7",
                  }}>
                    <div style={{
                      opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(20px)",
                      transition: `all 0.6s ease ${i * 0.1}s`,
                    }}>
                      {m.isNew && (
                        <span style={{
                          display: "inline-block", fontSize: 12, fontWeight: 600, color: "#bf4800",
                          backgroundColor: "rgba(191,72,0,0.06)", padding: "3px 10px", borderRadius: 10,
                          marginBottom: 10,
                        }}>New</span>
                      )}
                      <div style={{ display: "flex", justifyContent: "center", marginBottom: 16, minHeight: 160, alignItems: "flex-end" }}>
                        {m.image}
                      </div>
                      {m.colors && m.colors.length > 1 && (
                        <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 12 }}>
                          {m.colors.map((c, ci) => (
                            <button key={c.name} onClick={() => setSelectedColors(s => ({ ...s, [i]: ci }))}
                              title={c.name}
                              style={{
                                width: 14, height: 14, borderRadius: "50%", border: (selectedColors[i] || 0) === ci ? `2px solid ${BLUE}` : "1.5px solid #d2d2d7",
                                backgroundColor: c.hex, cursor: "pointer", padding: 0,
                                transition: "border-color 0.2s",
                              }}
                            />
                          ))}
                        </div>
                      )}
                      <h3 style={{ fontFamily: FONT, fontSize: 22, fontWeight: 600, color: DARK, margin: "0 0 4px" }}>{m.name}</h3>
                      <p style={{ fontSize: 15, color: "#6e6e73", margin: "0 0 16px", fontWeight: 400 }}>{m.price}</p>
                      <a href={m.buyLink || "#/store"} style={{
                        display: "inline-flex", alignItems: "center", backgroundColor: BLUE, color: "#fff",
                        padding: "10px 24px", borderRadius: 22, fontSize: 15, fontWeight: 500,
                        textDecoration: "none", transition: "background-color 0.2s",
                      }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = "#0077ed"}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = BLUE}
                      >Buy</a>
                      <div style={{ marginTop: 10 }}>
                        <a href={m.learnLink || "#/store"} style={{ color: BLUE, fontSize: 14, textDecoration: "none" }}>Learn more &gt;</a>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {specLabels.map(({ key, label }, si) => (
                <tr key={key}>
                  {models.map((m, mi) => {
                    const val = m.specs[key];
                    return (
                      <td key={mi} style={{
                        textAlign: "center", padding: "18px 12px",
                        borderBottom: si < specLabels.length - 1 ? "1px solid #f0f0f0" : "none",
                        verticalAlign: "top",
                      }}>
                        {mi === 0 && (
                          <p style={{
                            fontSize: 11, fontWeight: 600, color: "#86868b", textTransform: "uppercase",
                            letterSpacing: "0.06em", margin: "0 0 6px",
                          }}>{label}</p>
                        )}
                        {mi > 0 && (
                          <p style={{
                            fontSize: 11, fontWeight: 600, color: "#86868b", textTransform: "uppercase",
                            letterSpacing: "0.06em", margin: "0 0 6px", opacity: 0, height: 0, overflow: "hidden",
                          }}>{label}</p>
                        )}
                        {typeof val === "boolean" ? (
                          val ? (
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                              <circle cx="9" cy="9" r="9" fill={BLUE} />
                              <path d="M5.5 9.5L7.5 11.5L12.5 6.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          ) : (
                            <span style={{ fontSize: 16, color: "#d2d2d7" }}>—</span>
                          )
                        ) : (
                          <p style={{ fontSize: 14, color: DARK, fontWeight: 400, margin: 0, lineHeight: 1.4 }}>{val || "—"}</p>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// APPLE-STYLE STEP-BY-STEP BUY FORM
// ═══════════════════════════════════════════════════════════════════════════
export interface BuyStep {
  title: string;
  subtitle?: string;
  options: {
    label: string;
    sublabel?: string;
    price?: string;
    priceNum?: number;
    image?: React.ReactNode;
    color?: string;
    tag?: string;
  }[];
}

export function BuyForm({ productName, steps, basePrice, DeviceImage, onColorChange }: {
  productName: string;
  steps: BuyStep[];
  basePrice: number;
  DeviceImage: React.ReactNode;
  onColorChange?: (color: string) => void;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<number[]>(steps.map(() => 0));
  const [showSummary, setShowSummary] = useState(false);
  const { show, Toast } = useToast();

  const totalPrice = basePrice + steps.reduce((sum, step, i) => sum + (step.options[selections[i]]?.priceNum || 0), 0);

  const selectOption = (stepIdx: number, optIdx: number) => {
    const next = [...selections];
    next[stepIdx] = optIdx;
    setSelections(next);
    // If this step has color options, notify parent
    const opt = steps[stepIdx].options[optIdx];
    if (opt.color && onColorChange) onColorChange(opt.color);
  };

  const goNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(c => c + 1);
    else setShowSummary(true);
  };
  const goBack = () => {
    if (showSummary) setShowSummary(false);
    else if (currentStep > 0) setCurrentStep(c => c - 1);
  };

  return (
    <section style={{ backgroundColor: "#f5f5f7", padding: "80px 22px 90px" }}>
      <Toast />
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <h2 style={{
          fontFamily: FONT, fontSize: "clamp(32px,5vw,52px)", fontWeight: 700,
          color: DARK, letterSpacing: "-0.025em", textAlign: "center", margin: "0 0 6px",
        }}>
          Buy {productName}
        </h2>
        <p style={{ fontSize: 17, color: "#6e6e73", textAlign: "center", margin: "0 0 40px" }}>
          From ${basePrice.toLocaleString()}.00
        </p>

        {/* Progress bar */}
        <div style={{ display: "flex", gap: 4, maxWidth: 500, margin: "0 auto 48px", padding: "0 20px" }}>
          {steps.map((s, i) => (
            <div key={i} style={{
              flex: 1, height: 3, borderRadius: 2,
              backgroundColor: i <= currentStep || showSummary ? BLUE : "#d2d2d7",
              transition: "background-color 0.4s",
            }} />
          ))}
        </div>

        <div style={{ display: "flex", gap: 48, flexWrap: "wrap", alignItems: "flex-start" }}>
          {/* Left: Device preview */}
          <div style={{
            flex: "1 1 300px", position: "sticky", top: 80,
            display: "flex", flexDirection: "column", alignItems: "center",
          }}>
            <div style={{ padding: 20, animation: "float 6s ease-in-out infinite" }}>
              {DeviceImage}
            </div>
            <div style={{
              marginTop: 20, backgroundColor: "#fff", borderRadius: 16, padding: "20px 28px",
              textAlign: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", width: "100%", maxWidth: 320,
            }}>
              <p style={{ fontFamily: FONT, fontSize: 14, color: "#86868b", margin: "0 0 4px" }}>Your {productName}</p>
              <p style={{ fontFamily: FONT, fontSize: 32, fontWeight: 600, color: DARK, margin: "0 0 2px" }}>
                ${totalPrice.toLocaleString()}<span style={{ fontSize: 16, fontWeight: 400, color: "#6e6e73" }}>.00</span>
              </p>
              <p style={{ fontSize: 13, color: "#6e6e73", margin: 0 }}>
                or ${Math.round(totalPrice / 24)}/mo. for 24 mo.*
              </p>
            </div>
          </div>

          {/* Right: Step form */}
          <div style={{ flex: "1 1 420px", minWidth: 0 }}>
            {!showSummary ? (
              <div key={currentStep} style={{ animation: "toast-in 0.3s ease-out" }}>
                <p style={{
                  fontSize: 12, fontWeight: 600, color: BLUE, textTransform: "uppercase",
                  letterSpacing: "0.08em", margin: "0 0 6px",
                }}>Step {currentStep + 1} of {steps.length}</p>
                <h3 style={{
                  fontFamily: FONT, fontSize: 28, fontWeight: 600, color: DARK,
                  margin: "0 0 4px", letterSpacing: "-0.015em",
                }}>{steps[currentStep].title}</h3>
                {steps[currentStep].subtitle && (
                  <p style={{ fontSize: 15, color: "#6e6e73", margin: "0 0 24px" }}>{steps[currentStep].subtitle}</p>
                )}

                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {steps[currentStep].options.map((opt, oi) => {
                    const selected = selections[currentStep] === oi;
                    return (
                      <button key={oi} onClick={() => selectOption(currentStep, oi)}
                        style={{
                          display: "flex", alignItems: "center", gap: 16, padding: "16px 20px",
                          borderRadius: 14, border: selected ? `2px solid ${BLUE}` : "2px solid #d2d2d7",
                          backgroundColor: selected ? "rgba(41,151,255,0.03)" : "#fff",
                          cursor: "pointer", transition: "all 0.2s", textAlign: "left",
                          fontFamily: FONT, width: "100%",
                        }}
                      >
                        {opt.color && (
                          <div style={{
                            width: 32, height: 32, borderRadius: "50%", backgroundColor: opt.color,
                            border: "2px solid rgba(0,0,0,0.08)", flexShrink: 0,
                          }} />
                        )}
                        {opt.image && <div style={{ flexShrink: 0 }}>{opt.image}</div>}
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <span style={{ fontSize: 16, fontWeight: selected ? 600 : 400, color: DARK }}>{opt.label}</span>
                            {opt.tag && (
                              <span style={{
                                fontSize: 10, fontWeight: 600, color: "#bf4800",
                                backgroundColor: "rgba(191,72,0,0.06)", padding: "2px 8px", borderRadius: 8,
                              }}>{opt.tag}</span>
                            )}
                          </div>
                          {opt.sublabel && <p style={{ fontSize: 13, color: "#86868b", margin: "2px 0 0" }}>{opt.sublabel}</p>}
                        </div>
                        <div style={{ textAlign: "right", flexShrink: 0 }}>
                          {opt.price && <span style={{ fontSize: 14, fontWeight: 500, color: opt.priceNum === 0 ? "#34c759" : "#6e6e73" }}>{opt.price}</span>}
                        </div>
                        {/* Radio indicator */}
                        <div style={{
                          width: 22, height: 22, borderRadius: "50%",
                          border: selected ? `6px solid ${BLUE}` : "2px solid #d2d2d7",
                          transition: "all 0.2s", flexShrink: 0,
                        }} />
                      </button>
                    );
                  })}
                </div>

                {/* Navigation */}
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32, gap: 12 }}>
                  <button onClick={goBack}
                    style={{
                      padding: "12px 28px", borderRadius: 22, fontSize: 15, fontWeight: 500,
                      border: "1.5px solid #d2d2d7", backgroundColor: "#fff", color: DARK,
                      cursor: currentStep === 0 ? "default" : "pointer", fontFamily: FONT,
                      opacity: currentStep === 0 ? 0.4 : 1, transition: "all 0.2s",
                    }}
                    disabled={currentStep === 0}
                  >Back</button>
                  <button onClick={goNext}
                    style={{
                      padding: "12px 32px", borderRadius: 22, fontSize: 15, fontWeight: 500,
                      border: "none", backgroundColor: BLUE, color: "#fff",
                      cursor: "pointer", fontFamily: FONT, transition: "all 0.2s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = "#0077ed"}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = BLUE}
                  >{currentStep === steps.length - 1 ? "Review" : "Continue"}</button>
                </div>
              </div>
            ) : (
              /* Summary */
              <div style={{ animation: "toast-in 0.3s ease-out" }}>
                <h3 style={{ fontFamily: FONT, fontSize: 28, fontWeight: 600, color: DARK, margin: "0 0 24px" }}>Your selections.</h3>
                <div style={{ backgroundColor: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                  {steps.map((step, si) => {
                    const opt = step.options[selections[si]];
                    return (
                      <div key={si} style={{
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                        padding: "16px 24px", borderBottom: si < steps.length - 1 ? "1px solid #f0f0f0" : "none",
                      }}>
                        <div>
                          <p style={{ fontSize: 12, color: "#86868b", margin: "0 0 2px", fontWeight: 500 }}>{step.title}</p>
                          <p style={{ fontSize: 15, color: DARK, margin: 0, fontWeight: 500 }}>{opt.label}</p>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          {opt.price && <span style={{ fontSize: 14, color: "#6e6e73" }}>{opt.price}</span>}
                          <button onClick={() => { setShowSummary(false); setCurrentStep(si); }}
                            style={{
                              fontSize: 13, color: BLUE, backgroundColor: "transparent", border: "none",
                              cursor: "pointer", fontFamily: FONT, fontWeight: 500,
                            }}
                          >Edit</button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div style={{
                  marginTop: 24, backgroundColor: "#fff", borderRadius: 16, padding: "24px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <span style={{ fontSize: 14, color: "#6e6e73" }}>One-time payment</span>
                    <span style={{ fontSize: 20, fontWeight: 600, color: DARK, fontFamily: FONT }}>${totalPrice.toLocaleString()}.00</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 8, borderTop: "1px solid #f0f0f0" }}>
                    <span style={{ fontSize: 14, color: "#6e6e73" }}>Monthly payment</span>
                    <span style={{ fontSize: 16, fontWeight: 500, color: DARK, fontFamily: FONT }}>${Math.round(totalPrice / 24)}/mo. for 24 mo.*</span>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
                  <button onClick={goBack}
                    style={{
                      flex: 1, padding: "14px 28px", borderRadius: 22, fontSize: 15, fontWeight: 500,
                      border: "1.5px solid #d2d2d7", backgroundColor: "#fff", color: DARK,
                      cursor: "pointer", fontFamily: FONT,
                    }}
                  >Back</button>
                  <button onClick={() => show(`${productName} added to bag!`)}
                    style={{
                      flex: 2, padding: "14px 32px", borderRadius: 22, fontSize: 16, fontWeight: 600,
                      border: "none", backgroundColor: BLUE, color: "#fff",
                      cursor: "pointer", fontFamily: FONT, transition: "all 0.2s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = "#0077ed"}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = BLUE}
                  >Add to Bag — ${totalPrice.toLocaleString()}.00</button>
                </div>
                <p style={{ fontSize: 12, color: "#86868b", textAlign: "center", marginTop: 16 }}>
                  *Pricing includes applicable sales tax. Monthly payment available with Apple Card.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
