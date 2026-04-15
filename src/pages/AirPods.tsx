import { useState } from "react";
import { FadeIn, ScaleIn, Parallax, GlowCard, PageHero, FeatureTile, SpecRow, FONT, DARK, WHITE_TEXT, BLUE, LIGHT_BG, CTALinks } from "../shared";
import { AirPodsSVG } from "../devices";
import { useTilt } from "../hooks";
import { CinematicText, MagneticButton, Marquee, ComparisonTable, BuyForm } from "../advanced";

const models = [
  { name: "AirPods Pro 2", price: "$249", desc: "Active Noise Cancellation. Adaptive Audio. Conversation-aware.", tag: "Pro" },
  { name: "AirPods 4", price: "$129", desc: "Iconic design, premium sound. Open-ear comfort all day.", tag: "" },
  { name: "AirPods 4 with ANC", price: "$179", desc: "Active Noise Cancellation in an open-ear design.", tag: "New" },
  { name: "AirPods Max", price: "$549", desc: "High-fidelity over-ear immersive listening experience.", tag: "Max" },
];

function SoundWave() {
  const bars = [18,30,45,55,65,55,45,60,50,35,50,65,55,40,25,40,55,48,32,20];
  return (
    <div style={{ display: "flex", gap: 3, alignItems: "center", height: 70, justifyContent: "center" }}>
      {bars.map((h, i) => (
        <div key={i} style={{
          width: 3.5, height: h, borderRadius: 2,
          background: `linear-gradient(180deg, rgba(41,151,255,${0.4 + h/120}), rgba(41,151,255,0.15))`,
          animation: `soundbar ${0.8 + (i % 5) * 0.15}s ease-in-out infinite alternate`,
          animationDelay: `${i * 0.05}s`,
        }} />
      ))}
    </div>
  );
}

export default function AirPods() {
  const [audioMode, setAudioMode] = useState(2);

  return (
    <div style={{ backgroundColor: LIGHT_BG }}>
      <PageHero title="AirPods" subtitle="Intelligent sound that fits your life." dark={false}
        cta={<CTALinks learnMore="/airpods" buy="/store" />}
        gradient="linear-gradient(180deg, #f5f5f7, #e8e8ed 40%, #d2d2d7 70%, #e8e8ed)"
      >
        <Parallax speed={0.08}>
          <div className="airpods-float"><AirPodsSVG width={Math.min(240, window.innerWidth * 0.26)} /></div>
        </Parallax>
      </PageHero>

      {/* Adaptive Audio */}
      <section style={{ backgroundColor: "#000", textAlign: "center", padding: "90px 22px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 80%, rgba(41,151,255,0.06), transparent 50%)" }} />
        <FadeIn>
          <p style={{ fontSize: 15, color: BLUE, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", margin: "0 0 10px" }}>Adaptive Audio</p>
          <h2 style={{ fontFamily: FONT, fontSize: "clamp(32px,5.5vw,60px)", fontWeight: 700, color: WHITE_TEXT, letterSpacing: "-0.03em", margin: "0 0 16px" }}><CinematicText text="Sound that adapts to you." /></h2>
          <p style={{ fontSize: "clamp(14px,2vw,19px)", color: "#a1a1a6", margin: "0 auto", maxWidth: 600, lineHeight: 1.5 }}>Adaptive Audio dynamically blends Active Noise Cancellation and Transparency mode, tailoring the sound to your environment in real time.</p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div style={{ marginTop: 36, display: "flex", justifyContent: "center", gap: 12 }}>
            {["Noise Cancellation", "Transparency", "Adaptive"].map((m, i) => (
              <button key={m} onClick={() => setAudioMode(i)}
                style={{
                  padding: "12px 24px", borderRadius: 40, fontSize: 14, fontWeight: 500, cursor: "pointer",
                  border: "none", transition: "all 0.35s",
                  backgroundColor: audioMode === i ? BLUE : "rgba(255,255,255,0.06)",
                  color: audioMode === i ? "#fff" : "#a1a1a6",
                  transform: audioMode === i ? "scale(1.05)" : "scale(1)",
                }}
              >{m}</button>
            ))}
          </div>
        </FadeIn>
        <ScaleIn delay={0.3}>
          <div style={{ marginTop: 44, display: "flex", justifyContent: "center" }}>
            <div style={{ width: "clamp(240px,40vw,460px)", height: "clamp(130px,22vw,260px)", borderRadius: 24, background: `linear-gradient(135deg, rgba(41,151,255,${audioMode === 0 ? 0.25 : 0.1}), rgba(41,151,255,${audioMode === 2 ? 0.2 : 0.05}))`, display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.6s", border: "1px solid rgba(41,151,255,0.1)" }}>
              <SoundWave />
            </div>
          </div>
        </ScaleIn>
      </section>

      {/* Lineup */}
      <section style={{ padding: "60px 22px 0", maxWidth: 980, margin: "0 auto" }}>
        <FadeIn>
          <h2 style={{ fontFamily: FONT, fontSize: "clamp(28px,4.5vw,48px)", fontWeight: 700, color: DARK, letterSpacing: "-0.02em", textAlign: "center", margin: "0 0 40px" }}>Which AirPods are right for you?</h2>
        </FadeIn>
      </section>

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 22px 20px" }}>
        <div style={{ display: "flex", gap: 18, overflowX: "auto", paddingBottom: 24, scrollbarWidth: "none" }}>
          {models.map((m, i) => {
            const { ref, style: tiltStyle, onMove, onLeave } = useTilt(5);
            return (
              <FadeIn key={m.name} delay={i * 0.07}>
                <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
                  style={{
                    minWidth: 270, flex: "1 1 270px", backgroundColor: "#fff", borderRadius: 22, padding: "28px 24px",
                    display: "flex", flexDirection: "column", gap: 10, cursor: "pointer", minHeight: 380, ...tiltStyle,
                  }}
                >
                  {m.tag && (
                    <span style={{ alignSelf: "flex-start", fontSize: 11, fontWeight: 600, color: m.tag === "New" ? "#bf4800" : BLUE, backgroundColor: m.tag === "New" ? "rgba(191,72,0,0.06)" : "rgba(41,151,255,0.06)", padding: "4px 12px", borderRadius: 12 }}>{m.tag}</span>
                  )}
                  <div style={{ width: "100%", height: 160, borderRadius: 16, backgroundColor: LIGHT_BG, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {m.name.includes("Max") ? (
                      <svg width="80" height="80" viewBox="0 0 80 80">
                        <defs><radialGradient id="hpG" cx="0.35" cy="0.35"><stop offset="0%" stopColor="#f0f0f0"/><stop offset="100%" stopColor="#ccc"/></radialGradient></defs>
                        <circle cx="40" cy="40" r="34" fill="url(#hpG)" />
                        <circle cx="40" cy="40" r="24" fill="#e8e8ed" />
                        <rect x="6" y="36" width="8" height="8" rx="4" fill="#d2d2d7" />
                        <rect x="66" y="36" width="8" height="8" rx="4" fill="#d2d2d7" />
                      </svg>
                    ) : (
                      <AirPodsSVG width={140} />
                    )}
                  </div>
                  <h3 style={{ fontFamily: FONT, fontSize: 20, fontWeight: 600, color: DARK, margin: 0 }}>{m.name}</h3>
                  <p style={{ fontSize: 13, color: "#6e6e73", margin: 0, lineHeight: 1.4, flex: 1 }}>{m.desc}</p>
                  <p style={{ fontSize: 14, color: DARK, fontWeight: 500, margin: 0 }}>{m.price}</p>
                  <div style={{ display: "flex", gap: 14 }}>
                    <a href="#/airpods" style={{ color: BLUE, fontSize: 14, textDecoration: "none" }}>Learn more &gt;</a>
                    <a href="#/store" style={{ display: "inline-flex", backgroundColor: BLUE, color: "#fff", padding: "7px 16px", borderRadius: 20, fontSize: 13, fontWeight: 500, textDecoration: "none" }}>Buy</a>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      <section style={{ display: "flex", flexWrap: "wrap", gap: 12, padding: "12px 12px 0" }}>
        <FeatureTile dark large title="Hearing Health" description="A first-of-its-kind Hearing Aid feature, plus hearing protection and a clinical-grade Hearing Test." />
        <FeatureTile title="Personalized Spatial Audio" description="Immersive sound that surrounds you with Dolby Atmos in music and movies." />
        <FeatureTile title="H2 Chip" description="Custom Apple silicon powers advanced audio features with remarkable efficiency." />
      </section>

      <Marquee dark items={["Active Noise Cancellation", "Adaptive Audio", "Conversation Awareness", "Personalized Spatial Audio", "H2 Chip", "Hearing Aid", "Hearing Test", "USB-C Charging", "MagSafe", "IP54 Dust Resistance"]} speed={32} />

      <SpecRow dark items={[
        { label: "Listening time", value: "6hrs", numericValue: 6, suffix: "hrs" },
        { label: "With case", value: "30hrs", numericValue: 30, suffix: "hrs" },
        { label: "ANC improvement", value: "2x", numericValue: 2, suffix: "x" },
        { label: "Audio", value: "Lossless" },
      ]} />

      {/* ── Comparison Table ──────────────────── */}
      <ComparisonTable
        title="Which AirPods are right for you?"
        models={[
          {
            name: "AirPods Pro 2", price: "$249",
            image: <AirPodsSVG width={100} />,
            specs: { design: "In-ear with silicone tips", chip: "H2 chip", anc: true, transparency: true, adaptiveAudio: true, conversationAware: true, personalizedSpatial: true, hearingHealth: true, battery: "Up to 6 hours (30 with case)", chargingCase: "MagSafe, USB-C, Qi", waterResistance: "IP54", lossless: true },
          },
          {
            name: "AirPods 4 with ANC", price: "$179", isNew: true,
            image: <AirPodsSVG width={90} />,
            specs: { design: "Open-ear comfort", chip: "H2 chip", anc: true, transparency: true, adaptiveAudio: true, conversationAware: true, personalizedSpatial: true, hearingHealth: false, battery: "Up to 5 hours (30 with case)", chargingCase: "USB-C", waterResistance: "IP54", lossless: false },
          },
          {
            name: "AirPods 4", price: "$129",
            image: <AirPodsSVG width={85} />,
            specs: { design: "Open-ear comfort", chip: "H2 chip", anc: false, transparency: false, adaptiveAudio: false, conversationAware: false, personalizedSpatial: true, hearingHealth: false, battery: "Up to 5 hours (30 with case)", chargingCase: "USB-C", waterResistance: "IP54", lossless: false },
          },
          {
            name: "AirPods Max", price: "$549",
            image: <svg width="60" height="60" viewBox="0 0 80 80"><defs><radialGradient id="hpGC" cx="0.35" cy="0.35"><stop offset="0%" stopColor="#f0f0f0"/><stop offset="100%" stopColor="#ccc"/></radialGradient></defs><circle cx="40" cy="40" r="34" fill="url(#hpGC)" /><circle cx="40" cy="40" r="24" fill="#e8e8ed" /></svg>,
            specs: { design: "Over-ear cushions", chip: "H1 chip", anc: true, transparency: true, adaptiveAudio: false, conversationAware: false, personalizedSpatial: true, hearingHealth: false, battery: "Up to 20 hours", chargingCase: "Smart Case", waterResistance: "—", lossless: true },
          },
        ]}
        specLabels={[
          { key: "design", label: "Design" },
          { key: "chip", label: "Chip" },
          { key: "anc", label: "Active Noise Cancellation" },
          { key: "transparency", label: "Transparency Mode" },
          { key: "adaptiveAudio", label: "Adaptive Audio" },
          { key: "conversationAware", label: "Conversation Awareness" },
          { key: "personalizedSpatial", label: "Personalized Spatial Audio" },
          { key: "hearingHealth", label: "Hearing Health" },
          { key: "battery", label: "Battery Life" },
          { key: "chargingCase", label: "Charging" },
          { key: "waterResistance", label: "Water Resistance" },
          { key: "lossless", label: "Lossless Audio" },
        ]}
      />

      {/* ── Buy Form ─────────────────────────── */}
      <BuyForm
        productName="AirPods Pro 2"
        basePrice={249}
        DeviceImage={<AirPodsSVG width={180} />}
        steps={[
          {
            title: "Choose your AirPods.",
            options: [
              { label: "AirPods Pro 2", sublabel: "Active Noise Cancellation, Adaptive Audio, USB-C", price: "$249", priceNum: 0 },
              { label: "AirPods 4 with ANC", sublabel: "Open-ear with Active Noise Cancellation", price: "$179", priceNum: -70, tag: "New" },
              { label: "AirPods 4", sublabel: "Open-ear, iconic comfort", price: "$129", priceNum: -120 },
              { label: "AirPods Max", sublabel: "High-fidelity over-ear experience", price: "$549", priceNum: 300 },
            ],
          },
          {
            title: "Add engraving.",
            subtitle: "Make them uniquely yours — free.",
            options: [
              { label: "No engraving", price: "Included", priceNum: 0 },
              { label: "Add free engraving", sublabel: "Emoji, name, initials, or number on the case", price: "Free", priceNum: 0 },
            ],
          },
          {
            title: "Add AppleCare+.",
            options: [
              { label: "No AppleCare+", price: "Included", priceNum: 0 },
              { label: "AppleCare+ for Headphones", sublabel: "2 years of coverage for accidental damage", price: "+$29", priceNum: 29 },
            ],
          },
        ]}
      />
    </div>
  );
}
