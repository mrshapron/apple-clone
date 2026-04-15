import { FadeIn, ScaleIn, Parallax, GlowCard, PageHero, FeatureTile, SpecRow, FONT, DARK, WHITE_TEXT, BLUE, LIGHT_BG, CTALinks } from "../shared";
import { AppleTVSVG, HomePodSVG, VisionProSVG } from "../devices";
import { useTilt } from "../hooks";
import { CinematicText, MagneticButton, Marquee } from "../advanced";

const products = [
  { name: "Apple TV 4K", price: "From $129", desc: "Stream everything in stunning 4K HDR with Dolby Vision.", Device: () => <AppleTVSVG width={220} />, bg: "#1a1a1a" },
  { name: "HomePod", price: "$299", desc: "Room-filling sound with spatial audio and Siri.", Device: () => <HomePodSVG width={80} />, bg: "#2c2c2e" },
  { name: "HomePod mini", price: "$99", desc: "Rich 360-degree audio in a compact design.", Device: () => <HomePodSVG width={55} />, bg: "#3a3a3c" },
  { name: "Apple Vision Pro", price: "From $3,499", desc: "Apple's first spatial computer.", Device: () => <VisionProSVG width={200} />, bg: "#0a0a14" },
];

export default function TVHome() {
  return (
    <div style={{ backgroundColor: LIGHT_BG }}>
      <PageHero title="TV & Home" subtitle="Smart home essentials that work together." cta={<CTALinks learnMore="/tv-home" buy="/store" />} 
        gradient="linear-gradient(180deg, #0a0a14, #1a1a2e 40%, #16213e 70%, #0a0a14)"
      >
        <Parallax speed={0.08}>
          <div className="tv-float"><AppleTVSVG width={Math.min(440, window.innerWidth * 0.48)} /></div>
        </Parallax>
      </PageHero>

      {/* Smart Home ecosystem */}
      <section style={{ textAlign: "center", padding: "90px 22px", backgroundColor: LIGHT_BG }}>
        <FadeIn>
          <h2 style={{ fontFamily: FONT, fontSize: "clamp(32px,5.5vw,56px)", fontWeight: 700, color: DARK, letterSpacing: "-0.025em", margin: "0 0 12px" }}><CinematicText text="The Home app." /></h2>
          <p style={{ fontSize: "clamp(14px,2vw,19px)", color: "#6e6e73", margin: "0 auto 44px", maxWidth: 600, lineHeight: 1.5 }}>Control everything in your home from one place. Lights, locks, thermostats, cameras, and more.</p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div style={{ display: "flex", justifyContent: "center", gap: 28, flexWrap: "wrap" }}>
            {[
              { icon: "💡", label: "Lights", color: "#ffcc00" },
              { icon: "🔒", label: "Locks", color: "#ff9500" },
              { icon: "🌡️", label: "Climate", color: "#5ac8fa" },
              { icon: "📹", label: "Cameras", color: "#34c759" },
              { icon: "🔊", label: "Speakers", color: "#af52de" },
              { icon: "🏠", label: "Scenes", color: "#ff375f" },
            ].map((item, i) => (
              <FadeIn key={item.label} delay={0.2 + i * 0.06} direction="none">
                <div style={{ textAlign: "center", cursor: "pointer", transition: "transform 0.3s" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "translateY(-6px) scale(1.08)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "translateY(0) scale(1)"}
                >
                  <div style={{ width: 80, height: 80, borderRadius: 22, backgroundColor: "#fff", boxShadow: `0 4px 16px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.02)`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px", fontSize: 32, transition: "box-shadow 0.3s" }}>
                    {item.icon}
                  </div>
                  <span style={{ fontSize: 13, color: "#6e6e73", fontWeight: 500 }}>{item.label}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* Products grid */}
      <section style={{ padding: "0 22px", maxWidth: 980, margin: "0 auto" }}>
        <FadeIn><h2 style={{ fontFamily: FONT, fontSize: "clamp(28px,4.5vw,48px)", fontWeight: 700, color: DARK, letterSpacing: "-0.02em", textAlign: "center", margin: "0 0 40px" }}>Explore TV & Home.</h2></FadeIn>
      </section>
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 22px 20px" }}>
        <div style={{ display: "flex", gap: 18, overflowX: "auto", paddingBottom: 24, scrollbarWidth: "none" }}>
          {products.map((p, i) => {
            const { ref, style: tiltStyle, onMove, onLeave } = useTilt(5);
            return (
              <FadeIn key={p.name} delay={i * 0.07}>
                <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
                  style={{
                    minWidth: 290, flex: "1 1 290px", backgroundColor: p.bg, borderRadius: 22, padding: "36px 28px",
                    display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 380,
                    cursor: "pointer", ...tiltStyle,
                  }}
                >
                  <div>
                    <h3 style={{ fontFamily: FONT, fontSize: 24, fontWeight: 600, color: WHITE_TEXT, margin: "0 0 6px" }}>{p.name}</h3>
                    <p style={{ fontSize: 14, color: "#a1a1a6", margin: "0 0 4px", lineHeight: 1.45 }}>{p.desc}</p>
                    <p style={{ fontSize: 14, color: WHITE_TEXT, fontWeight: 500, margin: 0 }}>{p.price}</p>
                  </div>
                  <div style={{ display: "flex", justifyContent: "center", padding: "24px 0", flex: 1, alignItems: "center" }}>
                    <p.Device />
                  </div>
                  <div style={{ display: "flex", gap: 14 }}>
                    <a href="#/tv-home" style={{ color: BLUE, fontSize: 14, textDecoration: "none" }}>Learn more &gt;</a>
                    <a href="#/tv-home" style={{ display: "inline-flex", backgroundColor: BLUE, color: "#fff", padding: "7px 16px", borderRadius: 20, fontSize: 13, fontWeight: 500, textDecoration: "none" }}>Buy</a>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      <section style={{ display: "flex", flexWrap: "wrap", gap: 12, padding: "12px 12px 0" }}>
        <FeatureTile dark large title="Apple Vision Pro" description="Blends digital content with your physical space for immersive spatial computing experiences." />
        <FeatureTile title="Matter & Thread" description="Apple TV and HomePod work as home hubs, supporting Matter for seamless smart home integration." />
        <FeatureTile title="AirPlay" description="Stream audio and video wirelessly from your Apple devices to Apple TV, HomePod, or compatible speakers." />
      </section>

      <Marquee items={["Apple TV 4K", "HomePod", "HomePod mini", "Apple Vision Pro", "AirPlay", "Matter", "Thread", "Siri", "HomeKit", "Spatial Computing"]} speed={33} />

      <SpecRow items={[
        { label: "Apple TV 4K", value: "A15 Bionic" },
        { label: "HomePod", value: "S7 chip" },
        { label: "Smart assistant", value: "Hey Siri" },
        { label: "Smart home", value: "Matter" },
      ]} />
    </div>
  );
}
