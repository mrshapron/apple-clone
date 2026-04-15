import { useState, useEffect, useRef } from "react";
import { useInView, useCounter, useParallax, useGlow } from "./hooks";

// ─── Constants ───────────────────────────────────────────────────────────
export const FONT = "SF Pro Display, -apple-system, BlinkMacSystemFont, Helvetica Neue, sans-serif";
export const FONT_TEXT = "SF Pro Text, -apple-system, BlinkMacSystemFont, Helvetica Neue, sans-serif";
export const BLUE = "#2997ff";
export const GRAY = "#86868b";
export const DARK = "#1d1d1f";
export const LIGHT_BG = "#f5f5f7";
export const WHITE_TEXT = "#f5f5f7";

// ─── FadeIn with direction variants ──────────────────────────────────────
export function FadeIn({ children, delay = 0, className = "", style = {}, direction = "up", distance = 40 }: {
  children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties;
  direction?: "up" | "down" | "left" | "right" | "none"; distance?: number;
}) {
  const { ref, isVisible } = useInView();
  const transforms: Record<string, string> = {
    up: `translateY(${distance}px)`, down: `translateY(-${distance}px)`,
    left: `translateX(${distance}px)`, right: `translateX(-${distance}px)`,
    none: "scale(0.96)",
  };
  return (
    <div ref={ref} className={className} style={{
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0) translateX(0) scale(1)" : transforms[direction],
      transition: `opacity 0.9s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}s, transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}s`,
      willChange: "opacity, transform",
      ...style,
    }}>
      {children}
    </div>
  );
}

// ─── ScaleIn ─────────────────────────────────────────────────────────────
export function ScaleIn({ children, delay = 0, style = {} }: {
  children: React.ReactNode; delay?: number; style?: React.CSSProperties;
}) {
  const { ref, isVisible } = useInView();
  return (
    <div ref={ref} style={{
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "scale(1)" : "scale(0.88)",
      transition: `opacity 1s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}s, transform 1s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}s`,
      willChange: "opacity, transform", ...style,
    }}>
      {children}
    </div>
  );
}

// ─── Parallax wrapper ────────────────────────────────────────────────────
export function Parallax({ children, speed = 0.15, style = {} }: {
  children: React.ReactNode; speed?: number; style?: React.CSSProperties;
}) {
  const { ref, offset } = useParallax(speed);
  return (
    <div ref={ref} style={{ transform: `translateY(${offset}px)`, willChange: "transform", ...style }}>
      {children}
    </div>
  );
}

// ─── AnimatedCounter ─────────────────────────────────────────────────────
export function AnimatedCounter({ end, suffix = "", prefix = "", duration = 1500, style = {} }: {
  end: number; suffix?: string; prefix?: string; duration?: number; style?: React.CSSProperties;
}) {
  const { ref, value } = useCounter(end, duration);
  return <span ref={ref} style={style}>{prefix}{value}{suffix}</span>;
}

// ─── Glow card ───────────────────────────────────────────────────────────
export function GlowCard({ children, style = {}, glowColor = "rgba(41,151,255,0.15)" }: {
  children: React.ReactNode; style?: React.CSSProperties; glowColor?: string;
}) {
  const { ref, pos, onMove, onLeave } = useGlow();
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ position: "relative", overflow: "hidden", ...style }}>
      {pos.active && (
        <div style={{
          position: "absolute", top: pos.y - 120, left: pos.x - 120,
          width: 240, height: 240, borderRadius: "50%",
          background: `radial-gradient(circle, ${glowColor}, transparent 70%)`,
          pointerEvents: "none", zIndex: 0, transition: "opacity 0.3s",
        }} />
      )}
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}

// ─── Link component ──────────────────────────────────────────────────────
export function Link({ to, children, style: s, ...rest }: { to: string; children: React.ReactNode; style?: React.CSSProperties;[k:string]:any }) {
  return <a href={`#${to}`} style={{ color: BLUE, fontSize: 17, textDecoration: "none", ...s }} {...rest}>{children}</a>;
}

// ─── CTA Links pair ──────────────────────────────────────────────────────
export function CTALinks({ learnMore, buy, dark = true, buyScrollsToForm = false }: { learnMore: string; buy?: string; dark?: boolean; buyScrollsToForm?: boolean }) {
  return (
    <div style={{ display: "flex", gap: 24, justifyContent: "center", marginTop: 18, flexWrap: "wrap" }}>
      <Link to={learnMore}>Learn more &gt;</Link>
      {buy && <a href={`#${buy}`} onClick={buyScrollsToForm ? (e) => {
        e.preventDefault();
        document.getElementById("buy-form")?.scrollIntoView({ behavior: "smooth" });
      } : undefined} style={{ display: "inline-flex", alignItems: "center", gap: 4, color: BLUE, backgroundColor: BLUE, color: "#fff", padding: "10px 22px", borderRadius: 40, fontSize: 15, fontWeight: 500, transition: "background-color 0.3s", textDecoration: "none", cursor: "pointer" } as any}>Buy</a>}
    </div>
  );
}

// ─── Section Hero (reusable) ─────────────────────────────────────────────
export function PageHero({ title, subtitle, dark = true, gradient, height, cta, children, overline }: {
  title: string; subtitle: string; dark?: boolean; gradient?: string; height?: string; cta?: React.ReactNode; children?: React.ReactNode; overline?: string;
}) {
  const bg = dark ? "#000" : LIGHT_BG;
  const textColor = dark ? WHITE_TEXT : DARK;
  const subColor = dark ? "#a1a1a6" : "#6e6e73";
  return (
    <section style={{ backgroundColor: bg, textAlign: "center", paddingTop: 44, overflow: "hidden" }}>
      <div style={{ padding: "70px 20px 0" }}>
        {overline && <FadeIn><p style={{ fontSize: 15, color: BLUE, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", margin: "0 0 8px" }}>{overline}</p></FadeIn>}
        <FadeIn><h1 style={{ fontFamily: FONT, fontSize: "clamp(44px,8vw,80px)", fontWeight: 700, color: textColor, letterSpacing: "-0.03em", lineHeight: 1.04, margin: 0 }}>{title}</h1></FadeIn>
        <FadeIn delay={0.12}><h2 style={{ fontFamily: FONT, fontSize: "clamp(20px,3.5vw,28px)", fontWeight: 400, color: subColor, margin: "8px 0 0", letterSpacing: "0.005em" }}>{subtitle}</h2></FadeIn>
        {cta && <FadeIn delay={0.22}>{cta}</FadeIn>}
        {children && (
          <ScaleIn delay={0.35}>
            <div style={{ marginTop: 44, background: gradient || "linear-gradient(180deg,#1a1a2e,#16213e 50%,#0f3460)", minHeight: height || "clamp(300px,45vw,520px)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
              {children}
            </div>
          </ScaleIn>
        )}
      </div>
    </section>
  );
}

// ─── Feature tile ────────────────────────────────────────────────────────
export function FeatureTile({ title, description, dark = false, icon, large = false }: {
  title: string; description: string; dark?: boolean; icon?: React.ReactNode; large?: boolean;
}) {
  return (
    <GlowCard
      glowColor={dark ? "rgba(41,151,255,0.1)" : "rgba(0,0,0,0.04)"}
      style={{
        flex: large ? "1 1 100%" : "1 1 calc(50% - 6px)", minWidth: 280,
        backgroundColor: dark ? "#000" : "#fbfbfd",
        padding: "60px 44px", textAlign: "center", borderRadius: 0,
      }}
    >
      <FadeIn>
        {icon && <div style={{ marginBottom: 24 }}>{icon}</div>}
        <h3 style={{ fontFamily: FONT, fontSize: large ? "clamp(28px,4.5vw,48px)" : "clamp(22px,3vw,32px)", fontWeight: 600, color: dark ? WHITE_TEXT : DARK, letterSpacing: "-0.015em", margin: 0 }}>{title}</h3>
        <p style={{ fontSize: "clamp(14px,1.8vw,19px)", color: dark ? "#a1a1a6" : "#6e6e73", margin: "12px auto 0", maxWidth: 520, lineHeight: 1.5 }}>{description}</p>
      </FadeIn>
    </GlowCard>
  );
}

// ─── Animated Spec Row ───────────────────────────────────────────────────
export function SpecRow({ items, dark = false }: { items: { label: string; value: string; numericValue?: number; suffix?: string; icon?: React.ReactNode }[]; dark?: boolean }) {
  return (
    <FadeIn>
      <div style={{
        display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 48,
        padding: "70px 20px", backgroundColor: dark ? "#000" : LIGHT_BG,
      }}>
        {items.map((item, i) => (
          <div key={item.label} style={{ textAlign: "center", minWidth: 130 }}>
            {item.icon && <div style={{ marginBottom: 10 }}>{item.icon}</div>}
            <div style={{ fontFamily: FONT, fontSize: "clamp(28px,4vw,52px)", fontWeight: 700, color: dark ? WHITE_TEXT : DARK, letterSpacing: "-0.025em" }}>
              {item.numericValue != null
                ? <AnimatedCounter end={item.numericValue} suffix={item.suffix || ""} duration={1200 + i * 200} />
                : item.value
              }
            </div>
            <div style={{ fontSize: 14, color: dark ? "#a1a1a6" : "#6e6e73", marginTop: 6 }}>{item.label}</div>
          </div>
        ))}
      </div>
    </FadeIn>
  );
}

// ─── Color picker ────────────────────────────────────────────────────────
export function ColorPicker({ colors, selected, onSelect }: { colors: { name: string; hex: string }[]; selected: number; onSelect: (i: number) => void }) {
  return (
    <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 14, alignItems: "center" }}>
      {colors.map((c, i) => (
        <button key={c.name} onClick={() => onSelect(i)} title={c.name}
          style={{
            width: 26, height: 26, borderRadius: "50%", backgroundColor: c.hex,
            border: i === selected ? `2px solid ${BLUE}` : "2px solid rgba(128,128,128,0.2)",
            cursor: "pointer", transition: "all 0.3s", padding: 0,
            boxShadow: i === selected ? `0 0 0 2px #fff, 0 0 0 4px ${BLUE}` : "none",
            transform: i === selected ? "scale(1.15)" : "scale(1)",
          }}
        />
      ))}
    </div>
  );
}

// ─── Mega-menu content per nav item ─────────────────────────────────────
interface MegaCol { title: string; links: { label: string; route: string; big?: boolean }[] }
const megaMenus: Record<string, MegaCol[]> = {
  Store: [
    { title: "Shop", links: [
      { label: "Shop the Latest", route: "/store", big: true }, { label: "Mac", route: "/mac", big: true }, { label: "iPhone", route: "/iphone", big: true },
      { label: "iPad", route: "/ipad", big: true }, { label: "Apple Watch", route: "/watch", big: true }, { label: "Accessories", route: "/accessories", big: true },
    ]},
    { title: "Quick Links", links: [
      { label: "Find a Store", route: "/support" }, { label: "Order Status", route: "/store" }, { label: "Apple Trade In", route: "/store" },
      { label: "Financing", route: "/store" }, { label: "Personal Setup", route: "/support" },
    ]},
    { title: "Shop Special Stores", links: [
      { label: "Education", route: "/store" }, { label: "Business", route: "/store" }, { label: "Government", route: "/store" },
      { label: "Certified Refurbished", route: "/store" }, { label: "Gift Cards", route: "/store" },
    ]},
  ],
  Mac: [
    { title: "Explore Mac", links: [
      { label: "Explore All Mac", route: "/mac", big: true }, { label: "MacBook Air", route: "/mac", big: true }, { label: "MacBook Pro", route: "/mac", big: true },
      { label: "iMac", route: "/mac", big: true }, { label: "Mac mini", route: "/mac", big: true }, { label: "Mac Studio", route: "/mac", big: true },
      { label: "Mac Pro", route: "/mac", big: true }, { label: "Compare", route: "/mac" },
    ]},
    { title: "Shop Mac", links: [
      { label: "Shop Mac", route: "/mac" }, { label: "Mac Accessories", route: "/accessories" }, { label: "Apple Trade In", route: "/store" },
      { label: "Financing", route: "/store" }, { label: "Personal Setup", route: "/support" },
    ]},
    { title: "More from Mac", links: [
      { label: "Mac Support", route: "/support" }, { label: "AppleCare+", route: "/support" }, { label: "macOS Sequoia", route: "/mac" },
      { label: "Apple Intelligence", route: "/mac" }, { label: "Apps by Apple", route: "/entertainment" }, { label: "Continuity", route: "/mac" },
      { label: "iCloud+", route: "/entertainment" }, { label: "Education", route: "/store" },
    ]},
  ],
  iPad: [
    { title: "Explore iPad", links: [
      { label: "Explore All iPad", route: "/ipad", big: true }, { label: "iPad Pro", route: "/ipad", big: true }, { label: "iPad Air", route: "/ipad", big: true },
      { label: "iPad", route: "/ipad", big: true }, { label: "iPad mini", route: "/ipad", big: true },
      { label: "Apple Pencil", route: "/ipad", big: true }, { label: "Keyboards", route: "/ipad", big: true }, { label: "Compare", route: "/ipad" },
    ]},
    { title: "Shop iPad", links: [
      { label: "Shop iPad", route: "/ipad" }, { label: "iPad Accessories", route: "/accessories" }, { label: "Apple Trade In", route: "/store" },
      { label: "Financing", route: "/store" }, { label: "Personal Setup", route: "/support" },
    ]},
    { title: "More from iPad", links: [
      { label: "iPad Support", route: "/support" }, { label: "AppleCare+", route: "/support" }, { label: "iPadOS 26", route: "/ipad" },
      { label: "Apple Intelligence", route: "/ipad" }, { label: "Apps by Apple", route: "/entertainment" },
      { label: "Apple Creator Studio", route: "/ipad" }, { label: "iCloud+", route: "/entertainment" }, { label: "Education", route: "/store" },
    ]},
  ],
  iPhone: [
    { title: "Explore iPhone", links: [
      { label: "Explore All iPhone", route: "/iphone", big: true }, { label: "iPhone 17 Pro", route: "/iphone", big: true }, { label: "iPhone Air", route: "/iphone", big: true },
      { label: "iPhone 17", route: "/iphone", big: true }, { label: "iPhone 17e", route: "/iphone", big: true }, { label: "Compare", route: "/iphone" },
    ]},
    { title: "Shop iPhone", links: [
      { label: "Shop iPhone", route: "/buy-iphone" }, { label: "iPhone Accessories", route: "/accessories" }, { label: "Apple Trade In", route: "/store" },
      { label: "Carrier Deals", route: "/buy-iphone" }, { label: "Financing", route: "/store" },
    ]},
    { title: "More from iPhone", links: [
      { label: "iPhone Support", route: "/support" }, { label: "AppleCare+", route: "/support" }, { label: "iOS 26", route: "/iphone" },
      { label: "Apple Intelligence", route: "/iphone" }, { label: "Apps by Apple", route: "/entertainment" },
      { label: "iCloud+", route: "/entertainment" }, { label: "Education", route: "/store" },
    ]},
  ],
  Watch: [
    { title: "Explore Watch", links: [
      { label: "Explore All Watch", route: "/watch", big: true }, { label: "Apple Watch Ultra 2", route: "/watch", big: true },
      { label: "Apple Watch Series 10", route: "/watch", big: true }, { label: "Apple Watch SE", route: "/watch", big: true },
      { label: "Apple Watch Nike", route: "/watch", big: true }, { label: "Compare", route: "/watch" },
    ]},
    { title: "Shop Watch", links: [
      { label: "Shop Watch", route: "/watch" }, { label: "Watch Bands", route: "/accessories" }, { label: "Watch Accessories", route: "/accessories" },
      { label: "Apple Trade In", route: "/store" }, { label: "Financing", route: "/store" },
    ]},
    { title: "More from Watch", links: [
      { label: "Watch Support", route: "/support" }, { label: "AppleCare+", route: "/support" }, { label: "watchOS 12", route: "/watch" },
      { label: "Apple Fitness+", route: "/entertainment" }, { label: "Health", route: "/watch" },
    ]},
  ],
  AirPods: [
    { title: "Explore AirPods", links: [
      { label: "Explore All AirPods", route: "/airpods", big: true }, { label: "AirPods Pro 2", route: "/airpods", big: true },
      { label: "AirPods 4", route: "/airpods", big: true }, { label: "AirPods Max", route: "/airpods", big: true }, { label: "Compare", route: "/airpods" },
    ]},
    { title: "Shop AirPods", links: [
      { label: "Shop AirPods", route: "/airpods" }, { label: "AirPods Accessories", route: "/accessories" },
    ]},
    { title: "More from AirPods", links: [
      { label: "AirPods Support", route: "/support" }, { label: "AppleCare+", route: "/support" },
      { label: "Hearing Health", route: "/airpods" }, { label: "Apple Music", route: "/entertainment" },
    ]},
  ],
  Entertainment: [
    { title: "Explore Entertainment", links: [
      { label: "Explore Entertainment", route: "/entertainment", big: true }, { label: "Apple One", route: "/entertainment", big: true },
      { label: "Apple TV+", route: "/entertainment", big: true }, { label: "Apple Music", route: "/entertainment", big: true },
      { label: "Apple Arcade", route: "/entertainment", big: true }, { label: "Apple Fitness+", route: "/entertainment", big: true },
    ]},
    { title: "More Services", links: [
      { label: "Apple News+", route: "/entertainment" }, { label: "Apple Podcasts", route: "/entertainment" },
      { label: "Apple Books", route: "/entertainment" }, { label: "App Store", route: "/entertainment" },
    ]},
    { title: "Support", links: [
      { label: "Apple TV+ Support", route: "/support" }, { label: "Apple Music Support", route: "/support" },
    ]},
  ],
  Support: [
    { title: "Explore Support", links: [
      { label: "iPhone", route: "/support", big: true }, { label: "Mac", route: "/support", big: true }, { label: "iPad", route: "/support", big: true },
      { label: "Watch", route: "/support", big: true }, { label: "AirPods", route: "/support", big: true }, { label: "Music", route: "/support", big: true },
      { label: "TV", route: "/support", big: true },
    ]},
    { title: "Get Help", links: [
      { label: "Community", route: "/support" }, { label: "Check Coverage", route: "/support" }, { label: "Repair", route: "/support" },
      { label: "Contact Us", route: "/support" },
    ]},
    { title: "Helpful Topics", links: [
      { label: "Get AppleCare+", route: "/support" }, { label: "Apple Account & Password", route: "/support" },
      { label: "Billing & Subscriptions", route: "/support" }, { label: "Accessibility", route: "/support" },
    ]},
  ],
};

function MegaMenuContent({ cols, visible }: { cols: MegaCol[]; visible: boolean }) {
  return (
    <div style={{
      position: "absolute", top: 0, left: 0, right: 0,
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : "translateY(-8px)",
      transition: "opacity 0.3s ease, transform 0.3s ease",
      pointerEvents: visible ? "auto" : "none",
    }}>
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "40px 44px 54px", display: "flex", gap: 56 }}>
        {cols.map((col) => (
          <div key={col.title} style={{ flex: "1 1 0" }}>
            <p style={{ fontSize: 12, color: "#86868b", fontWeight: 500, margin: "0 0 14px", letterSpacing: "0.04em" }}>{col.title}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {col.links.map((lnk) => (
                <a key={lnk.label} href={`#${lnk.route}`} style={{
                  color: WHITE_TEXT, fontSize: lnk.big ? 24 : 12, fontWeight: lnk.big ? 600 : 400,
                  textDecoration: "none", padding: lnk.big ? "3px 0" : "4px 0",
                  letterSpacing: lnk.big ? "-0.01em" : "0.01em",
                  transition: "color 0.2s",
                  display: "block",
                }}
                  onMouseEnter={e => e.currentTarget.style.color = BLUE}
                  onMouseLeave={e => e.currentTarget.style.color = WHITE_TEXT}
                >{lnk.label}</a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MegaMenuPanel({ activeMenu, onMouseEnter, onMouseLeave }: {
  activeMenu: string | null; onMouseEnter: () => void; onMouseLeave: () => void;
}) {
  const isOpen = activeMenu !== null;
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: "absolute", top: 44, left: 0, right: 0, zIndex: 999,
        overflow: "hidden",
        maxHeight: isOpen ? 500 : 0,
        transition: "max-height 0.45s cubic-bezier(0.4,0,0.2,1)",
        pointerEvents: isOpen ? "auto" : "none",
      }}
    >
      <div style={{
        backgroundColor: "rgba(29,29,31,0.98)",
        backdropFilter: "saturate(180%) blur(20px)",
        WebkitBackdropFilter: "saturate(180%) blur(20px)",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        position: "relative",
        minHeight: 300,
      } as any}>
        {Object.entries(megaMenus).map(([key, cols]) => (
          <MegaMenuContent key={key} cols={cols} visible={activeMenu === key} />
        ))}
      </div>
    </div>
  );
}

// ─── Navigation Bar ──────────────────────────────────────────────────────
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = (label: string) => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
    setActiveMenu(label);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 200);
  };
  const cancelClose = () => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
  };

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  useEffect(() => {
    const h = () => { setMenuOpen(false); setActiveMenu(null); };
    window.addEventListener("hashchange", h);
    return () => window.removeEventListener("hashchange", h);
  }, []);

  const links: [string, string][] = [
    ["Store", "/store"], ["Mac", "/mac"], ["iPad", "/ipad"], ["iPhone", "/iphone"],
    ["Watch", "/watch"], ["AirPods", "/airpods"], ["TV & Home", "/tv-home"],
    ["Entertainment", "/entertainment"], ["Accessories", "/accessories"], ["Support", "/support"],
  ];

  const menuKeys: Record<string, string> = {
    "Store": "Store", "Mac": "Mac", "iPad": "iPad", "iPhone": "iPhone",
    "Watch": "Watch", "AirPods": "AirPods", "Entertainment": "Entertainment", "Support": "Support",
  };

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, height: 44,
        backgroundColor: activeMenu ? "rgba(29,29,31,0.98)" : (scrolled ? "rgba(29,29,31,0.72)" : "rgba(29,29,31,0.92)"),
        backdropFilter: "saturate(180%) blur(20px)", WebkitBackdropFilter: "saturate(180%) blur(20px)",
        transition: "background-color 0.3s",
      }}
        onMouseLeave={scheduleClose}
      >
        <div style={{ maxWidth: 1024, margin: "0 auto", height: 44, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 22px" }}>
          <a href="#/" style={{ color: WHITE_TEXT, textDecoration: "none", display: "flex", alignItems: "center", transition: "opacity 0.3s" }}
            onMouseEnter={() => { scheduleClose(); }} onMouseLeave={() => {}}
          >
            <svg width="17" height="20" viewBox="0 0 17 20" fill="currentColor">
              <path d="M12.84 0c.07.63-.19 1.26-.53 1.72-.36.46-.95.82-1.52.77-.08-.6.22-1.23.55-1.62.37-.42.99-.73 1.5-.87zm.38 2.65c-.84-.05-1.56.48-1.96.48-.41 0-1.04-.46-1.71-.45-.88.01-1.69.51-2.14 1.3-.92 1.58-.24 3.92.65 5.21.44.63.96 1.34 1.64 1.32.66-.03.91-.43 1.71-.43.8 0 1.02.43 1.72.41.71-.01 1.16-.64 1.59-1.28.5-.73.71-1.44.72-1.48-.02-.01-1.38-.53-1.39-2.11-.01-1.32 1.08-1.95 1.13-1.98-.62-.91-1.58-1.01-1.92-1.03z"/>
            </svg>
          </a>
          <div style={{ display: "flex", gap: 24, alignItems: "center" }} className="nav-links-desktop">
            {links.map(([label, path]) => {
              const key = menuKeys[label];
              return (
                <a key={label} href={`#${path}`}
                  onMouseEnter={() => key ? openMenu(key) : scheduleClose()}
                  style={{
                    color: WHITE_TEXT, fontSize: 12, textDecoration: "none",
                    opacity: activeMenu === key ? 1 : 0.8,
                    transition: "opacity 0.3s", letterSpacing: "0.008em",
                  }}
                >{label}</a>
              );
            })}
          </div>
          <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
            <a href="#/support" onMouseEnter={scheduleClose} style={{ color: WHITE_TEXT, opacity: 0.8, transition: "opacity 0.3s" }}
              onMouseOver={e => e.currentTarget.style.opacity = "1"} onMouseOut={e => e.currentTarget.style.opacity = "0.8"}>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="6" cy="6" r="5.2"/><line x1="10" y1="10" x2="14" y2="14"/></svg>
            </a>
            <a href="#/store" onMouseEnter={scheduleClose} style={{ color: WHITE_TEXT, opacity: 0.8, transition: "opacity 0.3s" }}
              onMouseOver={e => e.currentTarget.style.opacity = "1"} onMouseOut={e => e.currentTarget.style.opacity = "0.8"}>
              <svg width="14" height="17" viewBox="0 0 14 17" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M1 4.5h12v11H1z"/><path d="M4.5 4.5V3a2.5 2.5 0 015 0v1.5"/></svg>
            </a>
            <button onClick={() => setMenuOpen(!menuOpen)} className="nav-hamburger" style={{ background: "none", border: "none", color: WHITE_TEXT, cursor: "pointer", display: "none", padding: 0 }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                {menuOpen ? <path d="M3.5 3.5l11 11M14.5 3.5l-11 11" stroke="currentColor" strokeWidth="1.5" fill="none"/> : <><rect y="3" width="18" height="1.2" rx="0.6"/><rect y="8.5" width="18" height="1.2" rx="0.6"/><rect y="14" width="18" height="1.2" rx="0.6"/></>}
              </svg>
            </button>
          </div>
        </div>

        {/* Mega-menu */}
        <MegaMenuPanel activeMenu={activeMenu} onMouseEnter={cancelClose} onMouseLeave={scheduleClose} />

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ backgroundColor: "rgba(29,29,31,0.98)", padding: "8px 22px 20px", animation: "slideDown 0.3s ease-out" }} className="nav-mobile-menu">
            {links.map(([label, path]) => (
              <a key={label} href={`#${path}`} style={{ display: "block", color: WHITE_TEXT, fontSize: 16, textDecoration: "none", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.06)", transition: "opacity 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.6"} onMouseLeave={e => e.currentTarget.style.opacity = "1"}
              >{label}</a>
            ))}
          </div>
        )}
      </nav>

      {/* Scrim overlay behind mega-menu */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 999,
        backgroundColor: "rgba(0,0,0,0.35)",
        backdropFilter: activeMenu ? "blur(20px)" : "blur(0px)",
        WebkitBackdropFilter: activeMenu ? "blur(20px)" : "blur(0px)",
        opacity: activeMenu ? 1 : 0,
        pointerEvents: activeMenu ? "auto" : "none",
        transition: "opacity 0.4s ease, backdrop-filter 0.4s ease, -webkit-backdrop-filter 0.4s ease",
      } as any} onClick={() => setActiveMenu(null)} />
    </>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────
export function Footer() {
  const linkRoutes: Record<string, string> = {
    "Store": "/store", "Mac": "/mac", "iPad": "/ipad", "iPhone": "/iphone",
    "Watch": "/watch", "AirPods": "/airpods", "TV & Home": "/tv-home",
    "AirTag": "/accessories", "Accessories": "/accessories", "Gift Cards": "/store",
    "Apple Music": "/entertainment", "Apple TV+": "/entertainment", "Apple Fitness+": "/entertainment",
    "Apple News+": "/entertainment", "Apple Arcade": "/entertainment", "iCloud": "/entertainment",
    "Apple One": "/entertainment", "Apple Card": "/store",
    "Find a Store": "/support", "Genius Bar": "/support", "Today at Apple": "/support",
    "Apple Camp": "/support", "Apple Store App": "/store", "Certified Refurbished": "/store",
    "Apple Trade In": "/store", "Financing": "/store", "Order Status": "/store",
    "Apple and Business": "/store", "Shop for Business": "/store",
    "Apple and Education": "/store", "Shop for K-12": "/store", "Shop for College": "/store",
    "Accessibility": "/support", "Environment": "/support", "Privacy": "/support",
    "Racial Equity and Justice": "/support", "Supply Chain": "/support",
    "Newsroom": "/support", "Apple Leadership": "/support", "Career Opportunities": "/support",
    "Investors": "/support", "Ethics & Compliance": "/support", "Events": "/support", "Contact Apple": "/support",
    "Privacy Policy": "/support", "Terms of Use": "/support", "Sales and Refunds": "/store",
    "Legal": "/support", "Site Map": "/support",
  };
  const columns = [
    { title: "Shop and Learn", links: ["Store", "Mac", "iPad", "iPhone", "Watch", "AirPods", "TV & Home", "AirTag", "Accessories", "Gift Cards"] },
    { title: "Services", links: ["Apple Music", "Apple TV+", "Apple Fitness+", "Apple News+", "Apple Arcade", "iCloud", "Apple One", "Apple Card"] },
    { title: "Apple Store", links: ["Find a Store", "Genius Bar", "Today at Apple", "Apple Camp", "Apple Store App", "Certified Refurbished", "Apple Trade In", "Financing", "Order Status"] },
    { title: "For Business", links: ["Apple and Business", "Shop for Business"] },
    { title: "For Education", links: ["Apple and Education", "Shop for K-12", "Shop for College"] },
    { title: "Apple Values", links: ["Accessibility", "Environment", "Privacy", "Racial Equity and Justice", "Supply Chain"] },
    { title: "About Apple", links: ["Newsroom", "Apple Leadership", "Career Opportunities", "Investors", "Ethics & Compliance", "Events", "Contact Apple"] },
  ];
  return (
    <footer style={{ backgroundColor: LIGHT_BG, padding: "0 22px" }}>
      <div style={{ maxWidth: 980, margin: "0 auto", paddingTop: 20 }}>
        <p style={{ fontSize: 12, color: "#6e6e73", lineHeight: 1.47, margin: "0 0 16px", paddingBottom: 16, borderBottom: "1px solid #d2d2d7" }}>
          1. Trade-in values will vary based on the condition, year, and configuration of your eligible trade-in device. Not all devices are eligible for credit.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0 40px", paddingBottom: 20, borderBottom: "1px solid #d2d2d7" }}>
          {columns.map(col => (
            <div key={col.title} style={{ minWidth: 120, flex: "1 1 auto", marginBottom: 20 }}>
              <h4 style={{ fontSize: 12, fontWeight: 600, color: DARK, margin: "0 0 8px" }}>{col.title}</h4>
              {col.links.map(l => (
                <a key={l} href={`#${linkRoutes[l] || "/store"}`} style={{ display: "block", fontSize: 12, color: "#424245", textDecoration: "none", lineHeight: 2.1, transition: "color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.color = DARK} onMouseLeave={e => e.currentTarget.style.color = "#424245"}
                >{l}</a>
              ))}
            </div>
          ))}
        </div>
        <div style={{ padding: "14px 0 20px", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
          <p style={{ fontSize: 12, color: "#6e6e73", margin: 0 }}>Copyright © 2026 Apple Inc. All rights reserved.</p>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {["Privacy Policy", "Terms of Use", "Sales and Refunds", "Legal", "Site Map"].map(l => (
              <a key={l} href={`#${linkRoutes[l] || "/support"}`} style={{ fontSize: 12, color: "#424245", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = DARK} onMouseLeave={e => e.currentTarget.style.color = "#424245"}
              >{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
