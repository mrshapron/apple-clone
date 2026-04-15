import { useState } from "react";
import { FadeIn, ScaleIn, Parallax, PageHero, FeatureTile, SpecRow, FONT, DARK, WHITE_TEXT, BLUE, LIGHT_BG, CTALinks, ColorPicker } from "../shared";
import { WatchSVG } from "../devices";
import { useTilt } from "../hooks";
import { CinematicText, MagneticButton, Marquee, ComparisonTable, BuyForm, scrollToBuyForm } from "../advanced";

const watches = [
  { name: "Apple Watch Ultra 2", price: "From $799", desc: "The most rugged and capable Apple Watch.", colors: [{ name: "Natural Titanium", hex: "#a8a5a0" }, { name: "Black Titanium", hex: "#2c2c2e" }] },
  { name: "Apple Watch Series 10", price: "From $399", desc: "Thinner. Lighter. Tougher.", colors: [{ name: "Jet Black", hex: "#1a1a1a" }, { name: "Rose Gold", hex: "#d4a76a" }, { name: "Silver", hex: "#e3e4e5" }] },
  { name: "Apple Watch SE", price: "From $249", desc: "All the essentials. Light on price.", colors: [{ name: "Midnight", hex: "#1d1d3b" }, { name: "Starlight", hex: "#f0e6d3" }, { name: "Silver", hex: "#e3e4e5" }] },
];

function WatchCard({ watch, index }: { watch: typeof watches[0]; index: number }) {
  const [ci, setCi] = useState(0);
  const { ref, style: tiltStyle, onMove, onLeave } = useTilt(6);
  return (
    <FadeIn delay={index * 0.08}>
      <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
        style={{
          minWidth: 290, flex: "1 1 290px", backgroundColor: "#fff", borderRadius: 22, padding: "28px 24px",
          display: "flex", flexDirection: "column", gap: 10, cursor: "pointer", ...tiltStyle,
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", padding: "10px 0" }}>
          <WatchSVG width={120} color={watch.colors[ci].hex} />
        </div>
        <ColorPicker colors={watch.colors} selected={ci} onSelect={setCi} />
        <h3 style={{ fontFamily: FONT, fontSize: 20, fontWeight: 600, color: DARK, margin: 0 }}>{watch.name}</h3>
        <p style={{ fontSize: 13, color: "#6e6e73", margin: 0, lineHeight: 1.4 }}>{watch.desc}</p>
        <p style={{ fontSize: 13, color: DARK, fontWeight: 500, margin: 0 }}>{watch.price}</p>
        <div style={{ display: "flex", gap: 14, marginTop: 2 }}>
          <a href="#/watch" style={{ color: BLUE, fontSize: 14, textDecoration: "none" }}>Learn more &gt;</a>
          <a href="#/watch" onClick={(e) => { e.preventDefault(); scrollToBuyForm(); }} style={{ display: "inline-flex", backgroundColor: BLUE, color: "#fff", padding: "7px 16px", borderRadius: 20, fontSize: 13, fontWeight: 500, textDecoration: "none", cursor: "pointer" }}>Buy</a>
        </div>
      </div>
    </FadeIn>
  );
}

export default function Watch() {
  return (
    <div style={{ backgroundColor: LIGHT_BG }}>
      <PageHero title="Apple Watch" subtitle="The ultimate device for a healthy life." cta={<CTALinks learnMore="/watch" buy="/watch" buyScrollsToForm />}
        gradient="linear-gradient(180deg, #0a0a14, #1a1a2e 40%, #0a0a18 70%, #0a0a14)"
      >
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,55,95,0.1), transparent 60%)", animation: "pulse-glow 3s ease-in-out infinite" }} />
          <Parallax speed={0.08}>
            <div className="watch-float"><WatchSVG width={Math.min(170, window.innerWidth * 0.2)} color="#a8a5a0" /></div>
          </Parallax>
        </div>
      </PageHero>

      {/* Health Features */}
      <section style={{ backgroundColor: "#000", textAlign: "center", padding: "90px 22px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 80%, rgba(255,55,95,0.05), transparent 50%)" }} />
        <FadeIn>
          <p style={{ fontSize: 15, color: "#ff375f", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", margin: "0 0 10px" }}>Health</p>
          <h2 style={{ fontFamily: FONT, fontSize: "clamp(32px,5.5vw,60px)", fontWeight: 700, color: WHITE_TEXT, letterSpacing: "-0.03em", margin: "0 0 16px" }}><CinematicText text="Your health at a glance." /></h2>
          <p style={{ fontSize: "clamp(14px,2vw,19px)", color: "#a1a1a6", margin: "0 auto", maxWidth: 600, lineHeight: 1.5 }}>Advanced health sensors work together to give you insights and alerts that help you take better care of yourself.</p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div style={{ display: "flex", justifyContent: "center", gap: 48, marginTop: 56, flexWrap: "wrap" }}>
            {[
              { label: "Blood Oxygen", color: "#ff375f", icon: "❤️" },
              { label: "ECG", color: "#b4ff00", icon: "💚" },
              { label: "Temperature", color: "#00e0ff", icon: "🌡️" },
              { label: "Sleep", color: "#af52de", icon: "😴" },
            ].map((h, i) => (
              <FadeIn key={h.label} delay={0.2 + i * 0.08} direction="none">
                <div style={{ textAlign: "center", cursor: "pointer", transition: "transform 0.3s" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.12)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                >
                  <div style={{ width: 80, height: 80, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.04)", border: `2px solid ${h.color}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", fontSize: 32, boxShadow: `0 0 20px ${h.color}33` }}>
                    {h.icon}
                  </div>
                  <span style={{ fontSize: 14, color: "#a1a1a6" }}>{h.label}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>

        {/* Animated activity rings */}
        <ScaleIn delay={0.4}>
          <div style={{ marginTop: 60, display: "flex", justifyContent: "center" }}>
            <svg width="200" height="200" viewBox="0 0 200 200">
              {[
                { r: 80, color: "#ff375f", dash: "380 120", dur: "2s" },
                { r: 60, color: "#b4ff00", dash: "280 100", dur: "2.3s" },
                { r: 40, color: "#00e0ff", dash: "190 70", dur: "2.6s" },
              ].map((ring, i) => (
                <g key={i}>
                  <circle cx="100" cy="100" r={ring.r} fill="none" stroke={ring.color} strokeOpacity="0.15" strokeWidth="12" />
                  <circle cx="100" cy="100" r={ring.r} fill="none" stroke={ring.color} strokeWidth="12" strokeLinecap="round"
                    strokeDasharray={ring.dash} className={`activity-ring-${i}`}
                    style={{ transformOrigin: "100px 100px", animation: `ring-draw ${ring.dur} ease-out forwards` }}
                  />
                </g>
              ))}
            </svg>
          </div>
        </ScaleIn>
      </section>

      {/* Lineup */}
      <section style={{ padding: "60px 22px 0", maxWidth: 980, margin: "0 auto" }}>
        <FadeIn>
          <h2 style={{ fontFamily: FONT, fontSize: "clamp(28px,4.5vw,48px)", fontWeight: 700, color: DARK, letterSpacing: "-0.02em", textAlign: "center", margin: "0 0 6px" }}>Explore the lineup.</h2>
          <p style={{ fontSize: "clamp(14px,2vw,19px)", color: "#6e6e73", textAlign: "center", margin: "0 0 40px" }}>Find the right watch for you.</p>
        </FadeIn>
      </section>
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "0 22px 20px" }}>
        <div style={{ display: "flex", gap: 18, overflowX: "auto", paddingBottom: 24, scrollbarWidth: "none" }}>
          {watches.map((w, i) => <WatchCard key={w.name} watch={w} index={i} />)}
        </div>
      </section>

      <section style={{ display: "flex", flexWrap: "wrap", gap: 12, padding: "12px 12px 0" }}>
        <FeatureTile dark title="Fitness+" description="A fitness service powered by Apple Watch with world-class workouts and meditations." />
        <FeatureTile title="Bands" description="Express your style with a wide range of bands. Easily swap them in seconds." />
        <FeatureTile dark title="watchOS" description="More customizable watch faces, the Smart Stack, and redesigned apps." />
        <FeatureTile title="Safety" description="Crash Detection, Fall Detection, and Emergency SOS give you peace of mind." />
      </section>

      <Marquee dark items={["Blood Oxygen", "ECG", "Temperature Sensing", "Crash Detection", "Fall Detection", "Activity Rings", "Sleep Tracking", "Mindfulness", "Workout Detection", "Apple Pay"]} speed={30} />

      <SpecRow dark items={[
        { label: "Water resistance", value: "100m", numericValue: 100, suffix: "m" },
        { label: "Battery (hours)", value: "36hrs", numericValue: 36, suffix: "hrs" },
        { label: "Storage", value: "64GB", numericValue: 64, suffix: "GB" },
        { label: "Display", value: "Always-On" },
      ]} />

      {/* ── Comparison Table ──────────────────── */}
      <ComparisonTable
        title="Which Apple Watch is right for you?"
        models={[
          {
            name: "Apple Watch Ultra 2", price: "From $799",
            image: <WatchSVG width={90} color="#a8a5a0" />,
            colors: [{ name: "Natural Titanium", hex: "#a8a5a0" }, { name: "Black Titanium", hex: "#2c2c2e" }],
            specs: { caseSize: "49mm", caseMaterial: "Titanium", display: "Always-On Retina LTPO2 OLED", waterResistance: "100m / EN13319", battery: "Up to 36 hours (72 in low power)", gps: true, cellular: true, bloodOxygen: true, ecg: true, tempSensing: true, crashDetection: true, depthGauge: true, siren: true, actionButton: true },
            buyLink: "#/watch", learnLink: "#/watch",
          },
          {
            name: "Apple Watch Series 10", price: "From $399", isNew: true,
            image: <WatchSVG width={75} color="#1a1a1a" />,
            colors: [{ name: "Jet Black", hex: "#1a1a1a" }, { name: "Rose Gold", hex: "#d4a76a" }, { name: "Silver", hex: "#e3e4e5" }],
            specs: { caseSize: "42mm or 46mm", caseMaterial: "Aluminum or Titanium", display: "Always-On Retina LTPO3 OLED", waterResistance: "50m / WR50", battery: "Up to 18 hours (36 in low power)", gps: true, cellular: true, bloodOxygen: true, ecg: true, tempSensing: true, crashDetection: true, depthGauge: false, siren: false, actionButton: false },
            buyLink: "#/watch", learnLink: "#/watch",
          },
          {
            name: "Apple Watch SE", price: "From $249",
            image: <WatchSVG width={68} color="#f0e6d3" />,
            colors: [{ name: "Midnight", hex: "#1d1d3b" }, { name: "Starlight", hex: "#f0e6d3" }, { name: "Silver", hex: "#e3e4e5" }],
            specs: { caseSize: "40mm or 44mm", caseMaterial: "Aluminum", display: "Retina LTPO OLED", waterResistance: "50m / WR50", battery: "Up to 18 hours", gps: true, cellular: true, bloodOxygen: false, ecg: false, tempSensing: false, crashDetection: true, depthGauge: false, siren: false, actionButton: false },
            buyLink: "#/watch", learnLink: "#/watch",
          },
        ]}
        specLabels={[
          { key: "caseSize", label: "Case Size" },
          { key: "caseMaterial", label: "Case Material" },
          { key: "display", label: "Display" },
          { key: "waterResistance", label: "Water Resistance" },
          { key: "battery", label: "Battery" },
          { key: "bloodOxygen", label: "Blood Oxygen" },
          { key: "ecg", label: "ECG" },
          { key: "tempSensing", label: "Temperature Sensing" },
          { key: "crashDetection", label: "Crash Detection" },
          { key: "depthGauge", label: "Depth Gauge" },
          { key: "siren", label: "Siren" },
          { key: "actionButton", label: "Action Button" },
          { key: "cellular", label: "Cellular" },
        ]}
      />

      {/* ── Buy Form ─────────────────────────── */}
      <BuyForm
        productName="Apple Watch"
        basePrice={399}
        DeviceImage={<WatchSVG width={130} color="#1a1a1a" />}
        steps={[
          {
            title: "Choose your model.",
            options: [
              { label: "Apple Watch Series 10", sublabel: "The essential Apple Watch", price: "From $399", priceNum: 0 },
              { label: "Apple Watch Ultra 2", sublabel: "The most rugged and capable", price: "From $799", priceNum: 400 },
              { label: "Apple Watch SE", sublabel: "All the essentials", price: "From $249", priceNum: -150 },
            ],
          },
          {
            title: "Choose your case size.",
            options: [
              { label: "42mm", sublabel: "Fits most wrists", price: "Included", priceNum: 0 },
              { label: "46mm", sublabel: "Larger display", price: "+$30", priceNum: 30 },
            ],
          },
          {
            title: "Choose your case material.",
            options: [
              { label: "Aluminum", sublabel: "Light and durable", price: "Included", priceNum: 0 },
              { label: "Titanium", sublabel: "Premium and lightweight", price: "+$300", priceNum: 300, tag: "Premium" },
            ],
          },
          {
            title: "Pick your finish.",
            options: [
              { label: "Jet Black", color: "#1a1a1a", price: "Included", priceNum: 0 },
              { label: "Rose Gold", color: "#d4a76a", price: "Included", priceNum: 0 },
              { label: "Silver", color: "#e3e4e5", price: "Included", priceNum: 0 },
            ],
          },
          {
            title: "Choose your band.",
            subtitle: "You can always add more bands later.",
            options: [
              { label: "Sport Band", sublabel: "Comfortable fluoroelastomer", price: "Included", priceNum: 0 },
              { label: "Sport Loop", sublabel: "Lightweight and breathable", price: "Included", priceNum: 0 },
              { label: "Braided Solo Loop", sublabel: "Stretchable recycled yarn", price: "+$50", priceNum: 50 },
              { label: "Milanese Loop", sublabel: "Stainless steel mesh", price: "+$50", priceNum: 50, tag: "Popular" },
            ],
          },
          {
            title: "Add connectivity.",
            options: [
              { label: "GPS", sublabel: "Use with your iPhone nearby", price: "Included", priceNum: 0 },
              { label: "GPS + Cellular", sublabel: "Stay connected without your phone", price: "+$100", priceNum: 100 },
            ],
          },
        ]}
      />
    </div>
  );
}
