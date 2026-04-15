import { useState } from "react";
import { FadeIn, ScaleIn, Parallax, GlowCard, PageHero, FeatureTile, SpecRow, FONT, DARK, WHITE_TEXT, BLUE, LIGHT_BG, CTALinks, ColorPicker } from "../shared";
import { MacBookSVG } from "../devices";
import { useTilt } from "../hooks";
import { StarField, CinematicText, MagneticButton, Marquee, ProductConfigurator, ComparisonSlider, ComparisonTable, BuyForm, scrollToBuyForm } from "../advanced";

const models = [
  { name: 'MacBook Air 13"', chip: "M4", price: "From $1,099", desc: "Strikingly thin and fast so every day flies by.", colors: [{ name: "Midnight", hex: "#1d1d3b" }, { name: "Starlight", hex: "#f0e6d3" }, { name: "Space Gray", hex: "#7d7e80" }, { name: "Silver", hex: "#e3e4e5" }] },
  { name: 'MacBook Air 15"', chip: "M4", price: "From $1,299", desc: "Impressively big. Impossibly thin.", colors: [{ name: "Midnight", hex: "#1d1d3b" }, { name: "Starlight", hex: "#f0e6d3" }, { name: "Space Gray", hex: "#7d7e80" }, { name: "Silver", hex: "#e3e4e5" }] },
  { name: 'MacBook Pro 14"', chip: "M4 Pro", price: "From $1,599", desc: "The most advanced Mac laptops for demanding workflows.", colors: [{ name: "Space Black", hex: "#1e1e1e" }, { name: "Silver", hex: "#e3e4e5" }] },
  { name: 'MacBook Pro 16"', chip: "M4 Max", price: "From $2,499", desc: "The most powerful MacBook Pro ever.", colors: [{ name: "Space Black", hex: "#1e1e1e" }, { name: "Silver", hex: "#e3e4e5" }] },
  { name: "iMac", chip: "M4", price: "From $1,299", desc: "A spectacular all-in-one desktop.", colors: [{ name: "Blue", hex: "#5b9bd5" }, { name: "Green", hex: "#78b472" }, { name: "Pink", hex: "#f0a0b5" }, { name: "Silver", hex: "#e3e4e5" }, { name: "Orange", hex: "#e8875b" }] },
  { name: "Mac mini", chip: "M4 / M4 Pro", price: "From $599", desc: "More muscle. More hustle.", colors: [{ name: "Silver", hex: "#e3e4e5" }] },
  { name: "Mac Studio", chip: "M4 Max / Ultra", price: "From $1,999", desc: "Supercharged for pros.", colors: [{ name: "Silver", hex: "#e3e4e5" }] },
  { name: "Mac Pro", chip: "M4 Ultra", price: "From $6,999", desc: "Built for the most demanding workflows.", colors: [{ name: "Silver", hex: "#e3e4e5" }] },
];

function MacModelCard({ model, index }: { model: typeof models[0]; index: number }) {
  const [ci, setCi] = useState(0);
  const { ref, style: tiltStyle, onMove, onLeave } = useTilt(5);
  return (
    <FadeIn delay={index * 0.06}>
      <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
        style={{
          minWidth: 280, flex: "1 1 280px", backgroundColor: "#fff", borderRadius: 22, padding: "32px 28px",
          display: "flex", flexDirection: "column", gap: 12, cursor: "pointer", ...tiltStyle,
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", padding: "10px 0" }}>
          <MacBookSVG width={220} color={model.colors[ci].hex} />
        </div>
        <ColorPicker colors={model.colors} selected={ci} onSelect={setCi} />
        <h3 style={{ fontFamily: FONT, fontSize: 22, fontWeight: 600, color: DARK, margin: 0 }}>{model.name}</h3>
        <p style={{ fontSize: 14, color: "#6e6e73", margin: 0, lineHeight: 1.4 }}>{model.desc}</p>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, backgroundColor: "rgba(0,0,0,0.04)", padding: "4px 12px", borderRadius: 20, alignSelf: "flex-start" }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: DARK }}>{model.chip}</span>
        </div>
        <p style={{ fontSize: 14, color: DARK, fontWeight: 500, margin: 0 }}>{model.price}</p>
        <div style={{ display: "flex", gap: 16, marginTop: 2 }}>
          <a href="#/mac" style={{ color: BLUE, fontSize: 14, textDecoration: "none" }}>Learn more &gt;</a>
          <a href="#/mac" onClick={(e) => { e.preventDefault(); scrollToBuyForm(); }} style={{ display: "inline-flex", alignItems: "center", backgroundColor: BLUE, color: "#fff", padding: "7px 16px", borderRadius: 20, fontSize: 13, fontWeight: 500, textDecoration: "none", cursor: "pointer" }}>Buy</a>
        </div>
      </div>
    </FadeIn>
  );
}

export default function Mac() {
  return (
    <div style={{ backgroundColor: LIGHT_BG }}>
      <PageHero title="Mac" subtitle="If you can dream it, Mac can do it." cta={<CTALinks learnMore="/mac" buy="/mac" buyScrollsToForm />}
        gradient="linear-gradient(180deg, #0a0a14, #1a1a2e 40%, #0f3460 70%, #0a0a14)"
      >
        <div style={{ position: "relative" }}>
          <StarField color="rgba(255,255,255,0.4)" count={50} speed={0.15} height={600} />
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(41,151,255,0.08), transparent 70%)", animation: "pulse-glow 4s ease-in-out infinite" }} />
          <Parallax speed={0.1}>
            <div className="laptop-float">
              <MacBookSVG width={Math.min(560, window.innerWidth * 0.55)} color="#2c2c2e" />
            </div>
          </Parallax>
        </div>
      </PageHero>

      {/* Explore the lineup */}
      <section style={{ padding: "60px 22px 0", maxWidth: 980, margin: "0 auto" }}>
        <FadeIn>
          <h2 style={{ fontFamily: FONT, fontSize: "clamp(28px,4.5vw,48px)", fontWeight: 700, color: DARK, letterSpacing: "-0.02em", margin: "0 0 6px", textAlign: "center" }}>Explore the lineup.</h2>
          <p style={{ fontSize: "clamp(14px,2vw,19px)", color: "#6e6e73", textAlign: "center", margin: "0 0 40px" }}>Compare all Mac models and find the one that's right for you.</p>
        </FadeIn>
      </section>

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 22px 20px" }}>
        <div style={{ display: "flex", gap: 18, overflowX: "auto", paddingBottom: 24, scrollbarWidth: "none" }}>
          {models.map((m, i) => <MacModelCard key={m.name} model={m} index={i} />)}
        </div>
      </section>

      {/* Feature tiles */}
      <section style={{ display: "flex", flexWrap: "wrap", gap: 12, padding: "12px 12px 0" }}>
        <FeatureTile dark title="Apple Intelligence" description="AI that knows you, helps you, and protects your privacy. Available across all M-series Macs." large />
        <FeatureTile title="Performance" description="Up to 22 hours of battery life. Instant wake from sleep. Silent, fanless operation on MacBook Air." />
        <FeatureTile title="macOS" description="Powerful by design. Easy to use. macOS Sequoia makes your Mac more capable than ever." />
        <FeatureTile dark title="Continuity" description="Your Mac works seamlessly with your iPhone, iPad, and Apple Watch." />
        <FeatureTile title="Built to Last" description="Every Mac is made with recycled materials and designed to minimize environmental impact." />
      </section>

      <Marquee dark items={["Apple Silicon", "M4 Chip", "M4 Pro", "M4 Max", "M4 Ultra", "Thunderbolt", "Liquid Retina XDR", "MagSafe", "22hr Battery", "macOS Sequoia", "Apple Intelligence"]} speed={34} />

      <SpecRow dark items={[
        { label: "Battery life", value: "22hrs", numericValue: 22, suffix: "hrs" },
        { label: "Unified memory", value: "Up to 192GB", numericValue: 192, suffix: "GB" },
        { label: "CPU cores", value: "Up to 16", numericValue: 16, suffix: "" },
        { label: "GPU cores", value: "Up to 40", numericValue: 40, suffix: "" },
      ]} />

      {/* M4 vs M3 Comparison */}
      <section style={{ backgroundColor: "#000", padding: "70px 22px 80px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <FadeIn>
            <h2 style={{ fontFamily: FONT, fontSize: "clamp(28px,4.5vw,48px)", fontWeight: 700, color: WHITE_TEXT, letterSpacing: "-0.02em", textAlign: "center", margin: "0 0 8px" }}>
              <CinematicText text="M4 vs. M3" />
            </h2>
            <p style={{ fontSize: "clamp(14px,2vw,19px)", color: "#a1a1a6", textAlign: "center", margin: "0 0 36px" }}>Drag to compare the generational leap.</p>
          </FadeIn>
          <ScaleIn>
            <ComparisonSlider leftLabel="M3 — Fast" rightLabel="M4 — Blazing" leftColor="#1a1a2e" rightColor="#0f3460" height={240} />
          </ScaleIn>
        </div>
      </section>

      {/* Configure your Mac */}
      <section style={{ backgroundColor: LIGHT_BG }}>
        <FadeIn>
          <h2 style={{ fontFamily: FONT, fontSize: "clamp(28px,4.5vw,48px)", fontWeight: 700, color: DARK, letterSpacing: "-0.02em", textAlign: "center", padding: "60px 22px 0", margin: 0 }}>
            Configure your Mac.
          </h2>
          <p style={{ fontSize: "clamp(14px,2vw,19px)", color: "#6e6e73", textAlign: "center", margin: "6px 0 0" }}>Build the Mac that's perfect for you.</p>
        </FadeIn>
        <ProductConfigurator
          name="MacBook Air"
          basePrice={1099}
          DeviceComponent={() => <MacBookSVG width={220} color="#7d7e80" />}
          options={[
            { category: "Chip", choices: [
              { label: "M4 with 10-core GPU", price: 0, default: true },
              { label: "M4 with 10-core GPU, 24GB", price: 200 },
            ]},
            { category: "Memory", choices: [
              { label: "16GB", price: 0, default: true },
              { label: "24GB", price: 200 },
              { label: "32GB", price: 400 },
            ]},
            { category: "Storage", choices: [
              { label: "256GB SSD", price: 0, default: true },
              { label: "512GB SSD", price: 200 },
              { label: "1TB SSD", price: 400 },
              { label: "2TB SSD", price: 800 },
            ]},
          ]}
        />
      </section>

      {/* ── Comparison Table ──────────────────── */}
      <ComparisonTable
        title="Which Mac is right for you?"
        models={[
          {
            name: 'MacBook Air 13"', price: "From $1,099", isNew: true,
            image: <MacBookSVG width={160} color="#7d7e80" />,
            colors: [{ name: "Midnight", hex: "#1d1d3b" }, { name: "Starlight", hex: "#f0e6d3" }, { name: "Space Gray", hex: "#7d7e80" }, { name: "Silver", hex: "#e3e4e5" }],
            specs: { chip: "Apple M4", cpu: "10-core CPU", gpu: "10-core GPU", memory: "16GB – 32GB", storage: "256GB – 2TB", display: '13.6" Liquid Retina', battery: "Up to 18 hours", weight: "2.7 lb", ports: "2x Thunderbolt, MagSafe, Audio", touchId: true, magsafe: true, fanless: true },
            buyLink: "#/mac", learnLink: "#/mac",
          },
          {
            name: 'MacBook Air 15"', price: "From $1,299", isNew: true,
            image: <MacBookSVG width={180} color="#1d1d3b" />,
            colors: [{ name: "Midnight", hex: "#1d1d3b" }, { name: "Starlight", hex: "#f0e6d3" }, { name: "Space Gray", hex: "#7d7e80" }, { name: "Silver", hex: "#e3e4e5" }],
            specs: { chip: "Apple M4", cpu: "10-core CPU", gpu: "10-core GPU", memory: "16GB – 32GB", storage: "256GB – 2TB", display: '15.3" Liquid Retina', battery: "Up to 18 hours", weight: "3.3 lb", ports: "2x Thunderbolt, MagSafe, Audio", touchId: true, magsafe: true, fanless: true },
            buyLink: "#/mac", learnLink: "#/mac",
          },
          {
            name: 'MacBook Pro 14"', price: "From $1,599",
            image: <MacBookSVG width={160} color="#1e1e1e" />,
            colors: [{ name: "Space Black", hex: "#1e1e1e" }, { name: "Silver", hex: "#e3e4e5" }],
            specs: { chip: "Apple M4 Pro", cpu: "12-core CPU", gpu: "18-core GPU", memory: "24GB – 48GB", storage: "512GB – 4TB", display: '14.2" Liquid Retina XDR', battery: "Up to 24 hours", weight: "3.4 lb", ports: "3x Thunderbolt, HDMI, SD, MagSafe", touchId: true, magsafe: true, fanless: false },
            buyLink: "#/mac", learnLink: "#/mac",
          },
          {
            name: 'MacBook Pro 16"', price: "From $2,499",
            image: <MacBookSVG width={180} color="#1e1e1e" />,
            colors: [{ name: "Space Black", hex: "#1e1e1e" }, { name: "Silver", hex: "#e3e4e5" }],
            specs: { chip: "Apple M4 Max", cpu: "16-core CPU", gpu: "40-core GPU", memory: "48GB – 128GB", storage: "512GB – 8TB", display: '16.2" Liquid Retina XDR', battery: "Up to 24 hours", weight: "4.7 lb", ports: "3x Thunderbolt, HDMI, SD, MagSafe", touchId: true, magsafe: true, fanless: false },
            buyLink: "#/mac", learnLink: "#/mac",
          },
        ]}
        specLabels={[
          { key: "chip", label: "Chip" },
          { key: "cpu", label: "CPU" },
          { key: "gpu", label: "GPU" },
          { key: "memory", label: "Memory" },
          { key: "storage", label: "Storage" },
          { key: "display", label: "Display" },
          { key: "battery", label: "Battery" },
          { key: "weight", label: "Weight" },
          { key: "ports", label: "Ports" },
          { key: "touchId", label: "Touch ID" },
          { key: "magsafe", label: "MagSafe Charging" },
          { key: "fanless", label: "Fanless Design" },
        ]}
      />

      {/* ── Buy Form ─────────────────────────── */}
      <BuyForm
        productName="MacBook Air"
        basePrice={1099}
        DeviceImage={<MacBookSVG width={240} color="#7d7e80" />}
        steps={[
          {
            title: "Choose your model.",
            subtitle: "Pick the size that suits your workflow.",
            options: [
              { label: 'MacBook Air 13"', sublabel: '13.6-inch Liquid Retina display', price: "From $1,099", priceNum: 0 },
              { label: 'MacBook Air 15"', sublabel: '15.3-inch Liquid Retina display', price: "From $1,299", priceNum: 200 },
            ],
          },
          {
            title: "Pick your finish.",
            options: [
              { label: "Midnight", color: "#1d1d3b", price: "Included", priceNum: 0 },
              { label: "Starlight", color: "#f0e6d3", price: "Included", priceNum: 0 },
              { label: "Space Gray", color: "#7d7e80", price: "Included", priceNum: 0 },
              { label: "Silver", color: "#e3e4e5", price: "Included", priceNum: 0 },
            ],
          },
          {
            title: "Configure your chip.",
            subtitle: "Choose the processing power you need.",
            options: [
              { label: "M4 with 10-core GPU", sublabel: "16GB Unified Memory", price: "Included", priceNum: 0 },
              { label: "M4 with 10-core GPU", sublabel: "24GB Unified Memory", price: "+$200", priceNum: 200, tag: "Most popular" },
            ],
          },
          {
            title: "How much storage?",
            subtitle: "Choose the amount of storage that works best for you.",
            options: [
              { label: "256GB SSD", price: "Included", priceNum: 0 },
              { label: "512GB SSD", price: "+$200", priceNum: 200 },
              { label: "1TB SSD", price: "+$400", priceNum: 400 },
              { label: "2TB SSD", price: "+$800", priceNum: 800 },
            ],
          },
          {
            title: "Add AppleCare+ for Mac.",
            options: [
              { label: "No AppleCare+", price: "Included", priceNum: 0 },
              { label: "AppleCare+ for Mac", sublabel: "3 years of hardware coverage and technical support", price: "+$179", priceNum: 179 },
            ],
          },
        ]}
      />

      {/* Trade-in CTA */}
      <section style={{ textAlign: "center", padding: "70px 22px 80px", backgroundColor: LIGHT_BG }}>
        <FadeIn>
          <h2 style={{ fontFamily: FONT, fontSize: "clamp(28px,4.5vw,48px)", fontWeight: 700, color: DARK, letterSpacing: "-0.02em", margin: "0 0 10px" }}>Trade in your current Mac.</h2>
          <p style={{ fontSize: "clamp(14px,2vw,19px)", color: "#6e6e73", margin: "0 auto 24px", maxWidth: 500 }}>Get credit toward a new one. It's good for you and the planet.</p>
          <MagneticButton href="#/mac" variant="ghost">Get your estimate</MagneticButton>
        </FadeIn>
      </section>
    </div>
  );
}
