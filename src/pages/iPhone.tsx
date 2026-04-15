import { useState } from "react";
import { FadeIn, ScaleIn, Parallax, GlowCard, PageHero, FeatureTile, SpecRow, FONT, DARK, WHITE_TEXT, BLUE, LIGHT_BG, CTALinks, ColorPicker } from "../shared";
import { IPhoneSVG } from "../devices";
import { useTilt } from "../hooks";
import { StarField, GradientMesh, CinematicText, MagneticButton, ProductConfigurator, Marquee, ComparisonSlider, ComparisonTable, BuyForm } from "../advanced";

const iphones = [
  { name: "iPhone 16 Pro Max", price: "From $1,199", desc: "Our largest display. The thinnest borders ever.", sizes: '6.9"', colors: [{ name: "Desert Titanium", hex: "#b5a48c" }, { name: "Natural Titanium", hex: "#a8a5a0" }, { name: "White Titanium", hex: "#e8e6e1" }, { name: "Black Titanium", hex: "#3b3b3d" }] },
  { name: "iPhone 16 Pro", price: "From $999", desc: "Camera Control. A18 Pro chip. Titanium design.", sizes: '6.3"', colors: [{ name: "Desert Titanium", hex: "#b5a48c" }, { name: "Natural Titanium", hex: "#a8a5a0" }, { name: "White Titanium", hex: "#e8e6e1" }, { name: "Black Titanium", hex: "#3b3b3d" }] },
  { name: "iPhone 16", price: "From $799", desc: "A total powerhouse with Camera Control.", sizes: '6.1"', colors: [{ name: "Ultramarine", hex: "#3f51b5" }, { name: "Teal", hex: "#2ca5a5" }, { name: "Pink", hex: "#e8a0b5" }, { name: "White", hex: "#f0efe6" }, { name: "Black", hex: "#2c2c2e" }] },
  { name: "iPhone 16 Plus", price: "From $899", desc: "More screen. More battery. More wow.", sizes: '6.7"', colors: [{ name: "Ultramarine", hex: "#3f51b5" }, { name: "Teal", hex: "#2ca5a5" }, { name: "Pink", hex: "#e8a0b5" }, { name: "White", hex: "#f0efe6" }, { name: "Black", hex: "#2c2c2e" }] },
  { name: "iPhone SE", price: "From $429", desc: "All the essentials at an incredible price.", sizes: '4.7"', colors: [{ name: "Midnight", hex: "#1d1d3b" }, { name: "Starlight", hex: "#f0e6d3" }, { name: "Red", hex: "#c5322a" }] },
];

function IPhoneCard({ phone, index }: { phone: typeof iphones[0]; index: number }) {
  const [ci, setCi] = useState(0);
  const { ref, style: tiltStyle, onMove, onLeave } = useTilt(6);
  return (
    <FadeIn delay={index * 0.06}>
      <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
        style={{
          minWidth: 270, flex: "1 1 270px", backgroundColor: "#fff", borderRadius: 22, padding: "28px 24px",
          display: "flex", flexDirection: "column", gap: 10, cursor: "pointer", ...tiltStyle,
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", padding: "10px 0" }}>
          <IPhoneSVG width={100} color={phone.colors[ci].hex} />
        </div>
        <ColorPicker colors={phone.colors} selected={ci} onSelect={setCi} />
        <h3 style={{ fontFamily: FONT, fontSize: 20, fontWeight: 600, color: DARK, margin: 0 }}>{phone.name}</h3>
        <p style={{ fontSize: 13, color: "#6e6e73", margin: 0, lineHeight: 1.4 }}>{phone.desc}</p>
        <p style={{ fontSize: 12, color: "#86868b", margin: 0 }}>{phone.sizes}</p>
        <p style={{ fontSize: 13, color: DARK, fontWeight: 500, margin: 0 }}>{phone.price}</p>
        <div style={{ display: "flex", gap: 14, marginTop: 2 }}>
          <a href="#/iphone" style={{ color: BLUE, fontSize: 14, textDecoration: "none" }}>Learn more &gt;</a>
          <a href="#/store" style={{ display: "inline-flex", alignItems: "center", backgroundColor: BLUE, color: "#fff", padding: "7px 16px", borderRadius: 20, fontSize: 13, fontWeight: 500, textDecoration: "none" }}>Buy</a>
        </div>
      </div>
    </FadeIn>
  );
}

export default function IPhone() {
  return (
    <div style={{ backgroundColor: LIGHT_BG }}>
      <PageHero title="iPhone 16 Pro" subtitle="Oh. So. Pro." cta={<CTALinks learnMore="/iphone" buy="/store" />}
        gradient="linear-gradient(180deg, #0a0a18 0%, #0f3460 30%, #533483 60%, #1a1a3e 85%, #0a0a18 100%)" height="clamp(380px,55vw,620px)"
      >
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(83,52,131,0.2), transparent 70%)", animation: "pulse-glow 4s ease-in-out infinite" }} />
          <Parallax speed={0.1}>
            <div className="phone-float">
              <IPhoneSVG width={Math.min(220, window.innerWidth * 0.25)} color="#b5a48c" />
            </div>
          </Parallax>
        </div>
      </PageHero>

      {/* Camera Control Feature */}
      <section style={{ backgroundColor: "#000", textAlign: "center", padding: "90px 22px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 80%, rgba(83,52,131,0.08), transparent 60%)" }} />
        <FadeIn>
          <p style={{ fontSize: 15, color: BLUE, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", margin: "0 0 10px" }}>Camera Control</p>
          <h2 style={{ fontFamily: FONT, fontSize: "clamp(32px,5.5vw,60px)", fontWeight: 700, color: WHITE_TEXT, letterSpacing: "-0.03em", margin: "0 0 16px" }}>Point. Click. Brilliant.</h2>
          <p style={{ fontSize: "clamp(14px,2vw,19px)", color: "#a1a1a6", margin: "0 auto", maxWidth: 600, lineHeight: 1.5 }}>Camera Control gives you an easier way to quickly access camera tools. Simply slide your finger to adjust camera functions like exposure or depth of field.</p>
        </FadeIn>
        <ScaleIn delay={0.2}>
          <div style={{ marginTop: 56, display: "flex", justifyContent: "center" }}>
            <div style={{ width: "clamp(300px,50vw,600px)", height: "clamp(180px,28vw,340px)", borderRadius: 24, background: "linear-gradient(135deg, #0f3460, #533483 50%, #1a1a3e)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
              {/* Viewfinder grid */}
              <div style={{ position: "absolute", inset: 20, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "1fr 1fr 1fr" }}>
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} style={{ border: "0.5px solid rgba(255,255,255,0.08)" }} />
                ))}
              </div>
              {/* Focus ring */}
              <div style={{ width: 90, height: 90, borderRadius: 4, border: "2px solid rgba(255,204,0,0.7)", position: "relative", animation: "focus-pulse 2s ease-in-out infinite" }}>
                <div style={{ position: "absolute", bottom: -24, left: "50%", transform: "translateX(-50%)", fontSize: 11, color: "rgba(255,204,0,0.8)", whiteSpace: "nowrap" }}>AE/AF LOCK</div>
              </div>
              {/* Controls bar */}
              <div style={{ position: "absolute", bottom: 16, left: 20, right: 20, height: 36, borderRadius: 18, backgroundColor: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "space-around", padding: "0 20px" }}>
                {["0.5x", "1x", "2x", "5x"].map((z, i) => (
                  <span key={z} style={{ fontSize: 12, color: i === 1 ? "#ffcc00" : "rgba(255,255,255,0.5)", fontWeight: i === 1 ? 700 : 400 }}>{z}</span>
                ))}
              </div>
            </div>
          </div>
        </ScaleIn>
      </section>

      {/* Lineup */}
      <section style={{ padding: "60px 22px 0", maxWidth: 980, margin: "0 auto" }}>
        <FadeIn>
          <h2 style={{ fontFamily: FONT, fontSize: "clamp(28px,4.5vw,48px)", fontWeight: 700, color: DARK, letterSpacing: "-0.02em", margin: "0 0 6px", textAlign: "center" }}>Explore the lineup.</h2>
          <p style={{ fontSize: "clamp(14px,2vw,19px)", color: "#6e6e73", textAlign: "center", margin: "0 0 40px" }}>Find the perfect iPhone for you.</p>
        </FadeIn>
      </section>

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 22px 20px" }}>
        <div style={{ display: "flex", gap: 18, overflowX: "auto", paddingBottom: 24, scrollbarWidth: "none" }}>
          {iphones.map((p, i) => <IPhoneCard key={p.name} phone={p} index={i} />)}
        </div>
      </section>

      <section style={{ display: "flex", flexWrap: "wrap", gap: 12, padding: "12px 12px 0" }}>
        <FeatureTile dark large title="A18 Pro chip" description="The fastest chip ever in a smartphone. Up to 2x faster GPU performance for console-quality gaming." />
        <FeatureTile title="48MP Camera" description="Shoot incredibly detailed photos with the most advanced camera system on iPhone." />
        <FeatureTile dark title="Titanium Design" description="Lightweight and durable, with a surgical-grade titanium band and the thinnest borders ever." />
      </section>

      {/* Marquee */}
      <Marquee dark items={["Camera Control", "A18 Pro", "48MP Fusion Camera", "5x Telephoto", "Titanium", "Action Button", "USB-C", "Spatial Video", "Ceramic Shield", "Always-On Display", "ProRes", "ProRAW"]} speed={32} />

      <SpecRow dark items={[
        { label: "Main camera", value: "48MP", numericValue: 48, suffix: "MP" },
        { label: "Optical zoom", value: "5x", numericValue: 5, suffix: "x" },
        { label: "Battery life (hrs)", value: "33hrs", numericValue: 33, suffix: "hrs" },
        { label: "Max storage", value: "1TB", numericValue: 1, suffix: "TB" },
      ]} />

      {/* A18 Pro vs A17 Pro comparison */}
      <section style={{ backgroundColor: "#000", padding: "70px 22px 80px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <FadeIn>
            <h2 style={{ fontFamily: FONT, fontSize: "clamp(28px,4.5vw,48px)", fontWeight: 700, color: WHITE_TEXT, letterSpacing: "-0.02em", textAlign: "center", margin: "0 0 8px" }}>
              <CinematicText text="A18 Pro vs. A17 Pro" />
            </h2>
            <p style={{ fontSize: "clamp(14px,2vw,19px)", color: "#a1a1a6", textAlign: "center", margin: "0 0 36px" }}>Drag to see the generational leap in performance.</p>
          </FadeIn>
          <ScaleIn>
            <ComparisonSlider leftLabel="A17 Pro — Powerful" rightLabel="A18 Pro — Extraordinary" leftColor="#1a1a2e" rightColor="#533483" height={240} />
          </ScaleIn>
        </div>
      </section>

      {/* Product Configurator */}
      <section style={{ backgroundColor: LIGHT_BG }}>
        <FadeIn>
          <h2 style={{ fontFamily: FONT, fontSize: "clamp(28px,4.5vw,48px)", fontWeight: 700, color: DARK, letterSpacing: "-0.02em", textAlign: "center", padding: "60px 22px 0", margin: 0 }}>
            Configure your iPhone.
          </h2>
          <p style={{ fontSize: "clamp(14px,2vw,19px)", color: "#6e6e73", textAlign: "center", margin: "6px 0 0" }}>Pick the model and options that are right for you.</p>
        </FadeIn>
        <ProductConfigurator
          name="iPhone 16 Pro"
          basePrice={999}
          DeviceComponent={() => <IPhoneSVG width={180} color="#b5a48c" />}
          options={[
            { category: "Display Size", choices: [
              { label: '6.3-inch — iPhone 16 Pro', price: 0, default: true },
              { label: '6.9-inch — iPhone 16 Pro Max', price: 200 },
            ]},
            { category: "Storage", choices: [
              { label: "128GB", price: 0, default: true },
              { label: "256GB", price: 100 },
              { label: "512GB", price: 300 },
              { label: "1TB", price: 500 },
            ]},
            { category: "AppleCare+", choices: [
              { label: "None", price: 0, default: true },
              { label: "AppleCare+ for iPhone", price: 199 },
              { label: "AppleCare+ with Theft and Loss", price: 269 },
            ]},
          ]}
        />
      </section>

      {/* ── Comparison Table ──────────────────── */}
      <ComparisonTable
        title="Which iPhone is right for you?"
        models={[
          {
            name: "iPhone 16 Pro Max", price: "From $1,199", isNew: true,
            image: <IPhoneSVG width={70} color="#b5a48c" />,
            colors: [{ name: "Desert Titanium", hex: "#b5a48c" }, { name: "Natural Titanium", hex: "#a8a5a0" }, { name: "White Titanium", hex: "#e8e6e1" }, { name: "Black Titanium", hex: "#3b3b3d" }],
            specs: { display: '6.9" Super Retina XDR', chip: "A18 Pro", camera: "48MP Main | 12MP Ultra Wide | 12MP 5x Telephoto", battery: "Up to 33 hours", storage: "256GB – 1TB", faceId: true, actionButton: true, cameraControl: true, usbc: true, dynamicIsland: true, aod: true, proMotion: true, emergencySos: true },
          },
          {
            name: "iPhone 16 Pro", price: "From $999", isNew: true,
            image: <IPhoneSVG width={62} color="#a8a5a0" />,
            colors: [{ name: "Desert Titanium", hex: "#b5a48c" }, { name: "Natural Titanium", hex: "#a8a5a0" }, { name: "White Titanium", hex: "#e8e6e1" }, { name: "Black Titanium", hex: "#3b3b3d" }],
            specs: { display: '6.3" Super Retina XDR', chip: "A18 Pro", camera: "48MP Main | 12MP Ultra Wide | 12MP 5x Telephoto", battery: "Up to 27 hours", storage: "128GB – 1TB", faceId: true, actionButton: true, cameraControl: true, usbc: true, dynamicIsland: true, aod: true, proMotion: true, emergencySos: true },
          },
          {
            name: "iPhone 16", price: "From $799",
            image: <IPhoneSVG width={58} color="#3f51b5" />,
            colors: [{ name: "Ultramarine", hex: "#3f51b5" }, { name: "Teal", hex: "#2ca5a5" }, { name: "Pink", hex: "#e8a0b5" }, { name: "White", hex: "#f0efe6" }, { name: "Black", hex: "#2c2c2e" }],
            specs: { display: '6.1" Super Retina XDR', chip: "A18", camera: "48MP Main | 12MP Ultra Wide", battery: "Up to 22 hours", storage: "128GB – 512GB", faceId: true, actionButton: true, cameraControl: true, usbc: true, dynamicIsland: true, aod: false, proMotion: false, emergencySos: true },
          },
          {
            name: "iPhone SE", price: "From $429",
            image: <IPhoneSVG width={54} color="#1d1d3b" />,
            colors: [{ name: "Midnight", hex: "#1d1d3b" }, { name: "Starlight", hex: "#f0e6d3" }, { name: "Red", hex: "#c5322a" }],
            specs: { display: '4.7" Retina HD', chip: "A15 Bionic", camera: "12MP Main", battery: "Up to 15 hours", storage: "64GB – 256GB", faceId: false, actionButton: false, cameraControl: false, usbc: false, dynamicIsland: false, aod: false, proMotion: false, emergencySos: true },
          },
        ]}
        specLabels={[
          { key: "display", label: "Display" },
          { key: "chip", label: "Chip" },
          { key: "camera", label: "Camera" },
          { key: "battery", label: "Battery" },
          { key: "storage", label: "Storage" },
          { key: "dynamicIsland", label: "Dynamic Island" },
          { key: "cameraControl", label: "Camera Control" },
          { key: "actionButton", label: "Action Button" },
          { key: "proMotion", label: "ProMotion" },
          { key: "aod", label: "Always-On Display" },
          { key: "faceId", label: "Face ID" },
          { key: "usbc", label: "USB-C" },
          { key: "emergencySos", label: "Emergency SOS" },
        ]}
      />

      {/* ── Buy Form ─────────────────────────── */}
      <BuyForm
        productName="iPhone 16 Pro"
        basePrice={999}
        DeviceImage={<IPhoneSVG width={160} color="#b5a48c" />}
        steps={[
          {
            title: "Choose your model.",
            subtitle: "Which size is right for you?",
            options: [
              { label: 'iPhone 16 Pro', sublabel: '6.3-inch display', price: "From $999", priceNum: 0 },
              { label: 'iPhone 16 Pro Max', sublabel: '6.9-inch display', price: "From $1,199", priceNum: 200 },
            ],
          },
          {
            title: "Pick your finish.",
            subtitle: "Choose a color you love.",
            options: [
              { label: "Desert Titanium", color: "#b5a48c", price: "Included", priceNum: 0 },
              { label: "Natural Titanium", color: "#a8a5a0", price: "Included", priceNum: 0 },
              { label: "White Titanium", color: "#e8e6e1", price: "Included", priceNum: 0 },
              { label: "Black Titanium", color: "#3b3b3d", price: "Included", priceNum: 0 },
            ],
          },
          {
            title: "How much storage do you need?",
            subtitle: "Photos, apps, and more — choose the right amount.",
            options: [
              { label: "128GB", sublabel: "Great for essentials", price: "Included", priceNum: 0 },
              { label: "256GB", sublabel: "Extra room to grow", price: "+$100", priceNum: 100 },
              { label: "512GB", sublabel: "Plenty of space", price: "+$300", priceNum: 300 },
              { label: "1TB", sublabel: "For power users", price: "+$500", priceNum: 500 },
            ],
          },
          {
            title: "Choose your connectivity.",
            options: [
              { label: "Connect to any carrier later", sublabel: "Unlocked. Activate with any carrier.", price: "Included", priceNum: 0 },
              { label: "Connect to a carrier now", sublabel: "Choose your carrier at checkout.", price: "Included", priceNum: 0 },
            ],
          },
          {
            title: "Add AppleCare+ coverage.",
            subtitle: "Protect your investment.",
            options: [
              { label: "No AppleCare+", price: "Included", priceNum: 0 },
              { label: "AppleCare+ for iPhone", sublabel: "Accidental damage protection, battery service", price: "+$199", priceNum: 199 },
              { label: "AppleCare+ with Theft and Loss", sublabel: "Includes theft and loss coverage", price: "+$269", priceNum: 269, tag: "Popular" },
            ],
          },
        ]}
      />

      <section style={{ textAlign: "center", padding: "70px 22px 80px", backgroundColor: LIGHT_BG }}>
        <FadeIn>
          <h2 style={{ fontFamily: FONT, fontSize: "clamp(28px,4.5vw,48px)", fontWeight: 700, color: DARK, letterSpacing: "-0.02em", margin: "0 0 10px" }}>Why switch to iPhone?</h2>
          <p style={{ fontSize: "clamp(14px,2vw,19px)", color: "#6e6e73", margin: "0 auto 24px", maxWidth: 500 }}>It's easy to switch. And there are even more reasons to love iPhone.</p>
          <MagneticButton href="#/iphone" variant="ghost">Learn more about switching</MagneticButton>
        </FadeIn>
      </section>
    </div>
  );
}
