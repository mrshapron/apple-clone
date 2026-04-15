import { FadeIn, ScaleIn, Parallax, GlowCard, FONT, WHITE_TEXT, BLUE, LIGHT_BG, DARK, CTALinks } from "../shared";
import { IPhoneSVG, MacBookSVG, IPadSVG, WatchSVG, AirPodsSVG, VisionProSVG } from "../devices";
import { StarField, GradientMesh, CinematicText, MagneticButton, Marquee, ComparisonSlider, HorizontalShowcase } from "../advanced";

function DualCard({ bg, title, subtitle, learnTo, buyTo, visual }: {
  bg: string; title: string; subtitle: string; learnTo: string; buyTo?: string; visual: React.ReactNode;
}) {
  const dark = bg === "#000";
  return (
    <GlowCard glowColor={dark ? "rgba(41,151,255,0.08)" : "rgba(0,0,0,0.03)"} style={{
      flex: "1 1 calc(50% - 6px)", minWidth: 280, backgroundColor: bg,
      overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center",
      textAlign: "center", padding: "52px 30px 0",
    }}>
      <FadeIn>
        <h3 style={{ fontFamily: FONT, fontSize: "clamp(28px,4vw,40px)", fontWeight: 600, color: dark ? WHITE_TEXT : DARK, letterSpacing: "-0.015em", margin: 0 }}>{title}</h3>
      </FadeIn>
      <FadeIn delay={0.1}>
        <p style={{ fontSize: "clamp(14px,2vw,19px)", color: dark ? "#a1a1a6" : "#6e6e73", margin: "6px 0 0" }}>{subtitle}</p>
      </FadeIn>
      <FadeIn delay={0.16}>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 18 }}>
          <MagneticButton href={`#${learnTo}`} variant="ghost">Learn more</MagneticButton>
          {buyTo && <MagneticButton href={`#${buyTo}`} variant="primary" style={{ padding: "10px 22px", fontSize: 14 }}>Buy</MagneticButton>}
        </div>
      </FadeIn>
      <ScaleIn delay={0.25} style={{ marginTop: 30, display: "flex", justifyContent: "center" }}>{visual}</ScaleIn>
    </GlowCard>
  );
}

export default function Home() {
  return (
    <>
      {/* ── iPhone Hero with StarField ────────────── */}
      <section style={{ backgroundColor: "#000", paddingTop: 44, textAlign: "center", overflow: "hidden", position: "relative" }}>
        <GradientMesh colors={["#533483", "#0f3460", "#1a1a3e", "#16213e"]} />
        <div style={{ padding: "80px 20px 0", position: "relative", zIndex: 1 }}>
          <FadeIn>
            <h1 style={{ fontFamily: FONT, fontSize: "clamp(48px,9vw,96px)", fontWeight: 700, color: WHITE_TEXT, letterSpacing: "-0.035em", lineHeight: 1.02, margin: 0 }}>
              <CinematicText text="iPhone 16 Pro" stagger={0.1} />
            </h1>
          </FadeIn>
          <FadeIn delay={0.5}>
            <h2 style={{ fontFamily: FONT, fontSize: "clamp(22px,4vw,32px)", fontWeight: 400, color: "#a1a1a6", margin: "10px 0 0", letterSpacing: "0.02em" }}>Oh. So. Pro.</h2>
          </FadeIn>
          <FadeIn delay={0.7}>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 22 }}>
              <MagneticButton href="#/iphone" variant="ghost">Learn more</MagneticButton>
              <MagneticButton href="#/store" variant="primary">Buy</MagneticButton>
            </div>
          </FadeIn>
          <ScaleIn delay={0.9}>
            <div style={{ marginTop: 48, height: "clamp(400px,62vw,680px)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
              <StarField color="rgba(255,255,255,0.5)" count={60} speed={0.2} height={680} />
              {/* Animated glow rings */}
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 500, height: 500 }}>
                <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1px solid rgba(83,52,131,0.15)", animation: "ring-pulse 4s ease-in-out infinite" }} />
                <div style={{ position: "absolute", inset: 30, borderRadius: "50%", border: "1px solid rgba(15,52,96,0.12)", animation: "ring-pulse 4s ease-in-out infinite 0.5s" }} />
                <div style={{ position: "absolute", inset: 60, borderRadius: "50%", border: "1px solid rgba(41,151,255,0.08)", animation: "ring-pulse 4s ease-in-out infinite 1s" }} />
              </div>
              <Parallax speed={0.12}>
                <div className="phone-float">
                  <IPhoneSVG width={Math.min(250, window.innerWidth * 0.3)} color="#b5a48c" />
                </div>
              </Parallax>
            </div>
          </ScaleIn>
        </div>
      </section>

      {/* ── Marquee ────────────────────────────────── */}
      <Marquee dark items={["Apple Intelligence", "A18 Pro Chip", "48MP Camera System", "5x Optical Zoom", "Titanium Design", "Camera Control", "Action Button", "USB-C", "Spatial Video", "Always-On Display"]} speed={35} />

      {/* ── MacBook Air full-width ──────────────────── */}
      <section style={{ backgroundColor: LIGHT_BG, padding: "12px 12px 0" }}>
        <GlowCard glowColor="rgba(41,151,255,0.06)" style={{ backgroundColor: "#000", textAlign: "center", padding: "60px 30px 0", marginBottom: 12, overflow: "hidden", position: "relative" }}>
          <StarField color="rgba(255,255,255,0.3)" count={40} speed={0.15} height={500} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <FadeIn><h3 style={{ fontFamily: FONT, fontSize: "clamp(36px,6vw,64px)", fontWeight: 600, color: WHITE_TEXT, letterSpacing: "-0.03em", margin: 0 }}>
              <CinematicText text="MacBook Air" stagger={0.12} />
            </h3></FadeIn>
            <FadeIn delay={0.35}><p style={{ fontSize: "clamp(16px,2.5vw,24px)", color: "#a1a1a6", margin: "10px 0 0" }}>Lean. Mean. M4 machine.</p></FadeIn>
            <FadeIn delay={0.45}>
              <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 20 }}>
                <MagneticButton href="#/mac" variant="ghost">Learn more</MagneticButton>
                <MagneticButton href="#/store" variant="primary">Buy</MagneticButton>
              </div>
            </FadeIn>
            <ScaleIn delay={0.55}>
              <div style={{ marginTop: 48, height: "clamp(240px,34vw,440px)", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 20 }}>
                <Parallax speed={0.08}>
                  <div className="laptop-float">
                    <MacBookSVG width={Math.min(600, window.innerWidth * 0.6)} color="#2c2c2e" />
                  </div>
                </Parallax>
              </div>
            </ScaleIn>
          </div>
        </GlowCard>

        {/* ── Dual cards ───────────────────────────── */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <DualCard bg="#fbfbfd" title="iPad Pro" subtitle="Thinpossible." learnTo="/ipad" buyTo="/store"
            visual={<IPadSVG width={Math.min(220, window.innerWidth * 0.22)} color="#1e1e1e" />} />
          <DualCard bg="#000" title="Apple Watch" subtitle="The ultimate health companion." learnTo="/watch" buyTo="/store"
            visual={<WatchSVG width={Math.min(140, window.innerWidth * 0.15)} color="#2c2c2e" />} />
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 12 }}>
          <DualCard bg="#fbfbfd" title="AirPods Pro" subtitle="Adaptive Audio. Now playing." learnTo="/airpods" buyTo="/store"
            visual={<AirPodsSVG width={Math.min(220, window.innerWidth * 0.22)} />} />
          <DualCard bg="#000" title="Apple Vision Pro" subtitle="Welcome to spatial computing." learnTo="/tv-home"
            visual={<div style={{ padding: "20px 0" }}><VisionProSVG width={Math.min(300, window.innerWidth * 0.3)} /></div>} />
        </div>
      </section>

      {/* ── Horizontal Scroll Showcase ──────────────── */}
      <section style={{ backgroundColor: "#000", paddingTop: 60 }}>
        <FadeIn>
          <h2 style={{ fontFamily: FONT, fontSize: "clamp(28px,4.5vw,48px)", fontWeight: 700, color: WHITE_TEXT, letterSpacing: "-0.02em", textAlign: "center", margin: "0 0 6px", padding: "0 22px" }}>
            <CinematicText text="What makes Apple, Apple." />
          </h2>
          <p style={{ fontSize: "clamp(14px,2vw,19px)", color: "#a1a1a6", textAlign: "center", margin: "0 0 20px", padding: "0 22px" }}>The innovations that set us apart.</p>
        </FadeIn>
        <HorizontalShowcase height={420}>
          {[
            { title: "Apple Silicon", desc: "Custom chips designed for Mac deliver incredible performance and efficiency.", gradient: "linear-gradient(135deg, #1a1a3e, #0f3460)", icon: "⚡" },
            { title: "Privacy", desc: "Privacy is a fundamental human right. Every product we make reflects that.", gradient: "linear-gradient(135deg, #1a3e2e, #0f6030)", icon: "🔒" },
            { title: "Accessibility", desc: "Technology should be accessible to everyone. We design with that in mind.", gradient: "linear-gradient(135deg, #3e1a2e, #603050)", icon: "♿" },
            { title: "Environment", desc: "We're committed to making every product carbon neutral by 2030.", gradient: "linear-gradient(135deg, #1a3e1a, #306020)", icon: "🌍" },
            { title: "Services", desc: "A complete ecosystem of services that work seamlessly across all your devices.", gradient: "linear-gradient(135deg, #3e2e1a, #604020)", icon: "🎵" },
            { title: "Design", desc: "Beautiful, intuitive design that puts the experience first.", gradient: "linear-gradient(135deg, #2e1a3e, #502060)", icon: "✨" },
          ].map((card, i) => (
            <GlowCard key={card.title} glowColor="rgba(41,151,255,0.08)" style={{
              minWidth: 340, height: 340, borderRadius: 24, background: card.gradient,
              padding: "40px 32px", display: "flex", flexDirection: "column", justifyContent: "space-between",
              border: "1px solid rgba(255,255,255,0.06)", flexShrink: 0,
            }}>
              <span style={{ fontSize: 48 }}>{card.icon}</span>
              <div>
                <h3 style={{ fontFamily: FONT, fontSize: 26, fontWeight: 600, color: WHITE_TEXT, margin: "0 0 8px" }}>{card.title}</h3>
                <p style={{ fontSize: 15, color: "#a1a1a6", margin: 0, lineHeight: 1.5 }}>{card.desc}</p>
              </div>
            </GlowCard>
          ))}
        </HorizontalShowcase>
      </section>

      {/* ── Chip Comparison Slider ─────────────────── */}
      <section style={{ backgroundColor: "#000", padding: "0 22px 80px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <FadeIn>
            <h2 style={{ fontFamily: FONT, fontSize: "clamp(28px,4.5vw,48px)", fontWeight: 700, color: WHITE_TEXT, letterSpacing: "-0.02em", textAlign: "center", margin: "0 0 8px" }}>M4 vs. M3</h2>
            <p style={{ fontSize: "clamp(14px,2vw,19px)", color: "#a1a1a6", textAlign: "center", margin: "0 0 36px" }}>Slide to compare the performance leap.</p>
          </FadeIn>
          <ScaleIn>
            <ComparisonSlider leftLabel="M3 — Fast" rightLabel="M4 — Faster" leftColor="#1a1a2e" rightColor="#0f3460" height={260} />
          </ScaleIn>
        </div>
      </section>

      {/* ── TV+ Banner ─────────────────────────────── */}
      <section style={{ backgroundColor: LIGHT_BG, padding: "12px 12px 0" }}>
        <GlowCard glowColor="rgba(0,0,0,0.03)" style={{ backgroundColor: "#fbfbfd", textAlign: "center", padding: "60px 30px" }}>
          <FadeIn>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 12 }}>
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none"><rect width="44" height="44" rx="10" fill="#000"/><text x="22" y="30" textAnchor="middle" fill="#fff" fontSize="22" fontWeight="700" fontFamily="-apple-system">tv</text></svg>
              <span style={{ fontSize: 30, fontWeight: 600, color: DARK, fontFamily: FONT }}>+</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.08}><p style={{ fontSize: "clamp(20px,3.5vw,32px)", color: DARK, fontWeight: 600, margin: "0 0 6px", fontFamily: FONT }}>Get 3 months of Apple TV+ free</p></FadeIn>
          <FadeIn delay={0.14}><p style={{ fontSize: "clamp(14px,2vw,17px)", color: "#6e6e73", margin: "0 0 20px" }}>when you buy an Apple device.</p></FadeIn>
          <FadeIn delay={0.2}><MagneticButton href="#/entertainment" variant="ghost">Try it free</MagneticButton></FadeIn>
        </GlowCard>
      </section>
    </>
  );
}
