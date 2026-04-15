import { useState } from "react";
import { FadeIn, ScaleIn, FONT, BLUE, DARK, WHITE_TEXT, LIGHT_BG, ColorPicker } from "../shared";
import { IPhoneSVG } from "../devices";
import { useInView } from "../hooks";
import { BuyForm, ComparisonTable, CinematicText, MagneticButton } from "../advanced";

const IPHONE_17_COLORS = {
  pro: [
    { name: "Natural Titanium", hex: "#a8a5a0" },
    { name: "Desert Titanium", hex: "#c4a77d" },
    { name: "Black Titanium", hex: "#3b3b3d" },
    { name: "White Titanium", hex: "#e8e6e1" },
  ],
  air: [
    { name: "Midnight", hex: "#1d1d3b" },
    { name: "Starlight", hex: "#f0e6d3" },
    { name: "Green", hex: "#a8c9a5" },
    { name: "Blue", hex: "#7ba4c9" },
  ],
  standard: [
    { name: "Ultramarine", hex: "#3f51b5" },
    { name: "Teal", hex: "#2ca5a5" },
    { name: "Pink", hex: "#e8a0b5" },
    { name: "White", hex: "#f0efe6" },
    { name: "Black", hex: "#2c2c2e" },
  ],
  e: [
    { name: "Black", hex: "#2c2c2e" },
    { name: "White", hex: "#f0efe6" },
    { name: "Pink", hex: "#f4c2c2" },
  ],
};

function HeroCarousel() {
  const [slide, setSlide] = useState(0);
  const slides = [
    { bg: "linear-gradient(135deg, #c4a77d 0%, #8b6f47 50%, #3b3b3d 100%)", label: "Natural Titanium" },
    { bg: "linear-gradient(135deg, #1a1a3e 0%, #0f3460 50%, #533483 100%)", label: "Black Titanium" },
    { bg: "linear-gradient(135deg, #e8e6e1 0%, #c8c6c1 50%, #a8a5a0 100%)", label: "White Titanium" },
  ];

  return (
    <div style={{ position: "relative", overflow: "hidden", borderRadius: 24, maxWidth: 700, margin: "0 auto" }}>
      <div style={{
        display: "flex", transition: "transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)",
        transform: `translateX(-${slide * 100}%)`,
      }}>
        {slides.map((s, i) => (
          <div key={i} style={{
            minWidth: "100%", minHeight: 420, background: s.bg,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 40, padding: "40px 20px",
          }}>
            <div style={{ animation: "float 5s ease-in-out infinite", position: "relative" }}>
              <IPhoneSVG width={140} color={IPHONE_17_COLORS.pro[i]?.hex || "#a8a5a0"} />
            </div>
            <div style={{ animation: "float 5s ease-in-out infinite 0.3s", position: "relative" }}>
              <IPhoneSVG width={160} color={IPHONE_17_COLORS.pro[(i + 1) % IPHONE_17_COLORS.pro.length]?.hex || "#3b3b3d"} />
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => setSlide(s => Math.min(s + 1, slides.length - 1))}
        style={{
          position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)",
          width: 44, height: 44, borderRadius: "50%", border: "none",
          backgroundColor: "rgba(255,255,255,0.3)", backdropFilter: "blur(10px)",
          cursor: slide < slides.length - 1 ? "pointer" : "default",
          opacity: slide < slides.length - 1 ? 1 : 0.3,
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "opacity 0.3s",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round"><path d="M8 4l6 6-6 6"/></svg>
      </button>
      <button onClick={() => setSlide(s => Math.max(s - 1, 0))}
        style={{
          position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)",
          width: 44, height: 44, borderRadius: "50%", border: "none",
          backgroundColor: "rgba(255,255,255,0.3)", backdropFilter: "blur(10px)",
          cursor: slide > 0 ? "pointer" : "default",
          opacity: slide > 0 ? 1 : 0.3,
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "opacity 0.3s",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round"><path d="M12 4l-6 6 6 6"/></svg>
      </button>
      <div style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8 }}>
        {slides.map((_, i) => (
          <button key={i} onClick={() => setSlide(i)} style={{
            width: 8, height: 8, borderRadius: "50%", border: "none", padding: 0,
            backgroundColor: i === slide ? DARK : "rgba(0,0,0,0.2)",
            cursor: "pointer", transition: "all 0.3s",
          }} />
        ))}
      </div>
    </div>
  );
}

function ModelSelector({ selected, onSelect }: { selected: number; onSelect: (i: number) => void }) {
  const models = [
    { name: "iPhone 17 Pro", display: '6.3-inch display\u2070', price: "$1099", monthly: "$45.79/mo." },
    { name: "iPhone 17 Pro Max", display: '6.9-inch display\u2070', price: "$1199", monthly: "$49.95/mo." },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <h3 style={{ fontFamily: FONT, fontSize: 24, fontWeight: 600, color: DARK, margin: 0 }}>
        <span style={{ fontWeight: 700 }}>Model.</span>{" "}
        <span style={{ fontWeight: 400, color: "#6e6e73" }}>Which is best for you?</span>
      </h3>
      {models.map((m, i) => {
        const active = selected === i;
        return (
          <button key={i} onClick={() => onSelect(i)}
            style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "20px 24px", borderRadius: 14,
              border: active ? `2px solid ${BLUE}` : "2px solid #d2d2d7",
              backgroundColor: active ? "rgba(41,151,255,0.03)" : "#fff",
              cursor: "pointer", transition: "all 0.25s", textAlign: "left",
              fontFamily: FONT, width: "100%",
            }}
          >
            <div>
              <p style={{ fontSize: 17, fontWeight: active ? 600 : 400, color: DARK, margin: 0 }}>{m.name}</p>
              <p style={{ fontSize: 13, color: "#86868b", margin: "2px 0 0" }}>{m.display}</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: 14, color: DARK, margin: 0, fontWeight: 500 }}>From {m.price}</p>
              <p style={{ fontSize: 12, color: "#86868b", margin: "2px 0 0" }}>or {m.monthly}</p>
              <p style={{ fontSize: 12, color: "#86868b", margin: 0 }}>for 24 mo.*</p>
            </div>
          </button>
        );
      })}
      <button style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px 24px", borderRadius: 14, border: "2px solid #d2d2d7",
        backgroundColor: "#fff", cursor: "pointer", fontFamily: FONT, width: "100%",
        textAlign: "left",
      }}>
        <div>
          <p style={{ fontSize: 15, fontWeight: 600, color: DARK, margin: 0 }}>Need help choosing a model?</p>
          <p style={{ fontSize: 13, color: "#86868b", margin: "2px 0 0" }}>Explore the differences in screen size and battery life.</p>
        </div>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round">
          <circle cx="10" cy="10" r="8" />
          <path d="M10 6v4M10 13v1" />
        </svg>
      </button>
    </div>
  );
}

function TradeInBanner() {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
      padding: "16px 24px", borderRadius: 14, border: "1px solid #d2d2d7",
      backgroundColor: "#fff", marginBottom: 12,
    }}>
      <p style={{ fontSize: 14, color: DARK, margin: 0 }}>
        Get $35–$685 for your trade&#8209;in.*
      </p>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#86868b" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="10" cy="10" r="8" />
        <path d="M8 10l6-6M8 10h6M8 10v-6" />
      </svg>
    </div>
  );
}

function PaymentLink() {
  return (
    <a href="#/buy-iphone" style={{
      display: "flex", alignItems: "center", gap: 6, fontSize: 14, color: BLUE,
      textDecoration: "none", marginBottom: 20,
    }}>
      See how to pay monthly. <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke={BLUE} strokeWidth="1.5" strokeLinecap="round"><path d="M4 2l4 4-4 4"/></svg>
    </a>
  );
}

function PhoneComparisonSection() {
  return (
    <ComparisonTable
      title="Which iPhone is right for you?"
      models={[
        {
          name: "iPhone 17 Pro", price: "From $1,099", isNew: true,
          image: <IPhoneSVG width={70} color="#a8a5a0" />,
          colors: IPHONE_17_COLORS.pro,
          specs: {
            display: '6.9" or 6.3"',
            displayType: "Super Retina XDR display\u00B2",
            chip: "A19 Pro",
            camera: "48MP Main | 48MP Ultra Wide | 12MP 5x Telephoto",
            battery: "Up to 33 hours",
            storage: "256GB – 1TB",
            proMotion: true,
            aod: true,
            dynamicIsland: true,
            actionButton: true,
            cameraControl: true,
            faceId: true,
            usbc: true,
            emergencySos: true,
            appleIntelligence: true,
          },
          buyLink: "#/buy-iphone", learnLink: "#/iphone",
        },
        {
          name: "iPhone Air", price: "From $999",
          image: <IPhoneSVG width={65} color="#1d1d3b" />,
          colors: IPHONE_17_COLORS.air,
          specs: {
            display: '6.5"',
            displayType: "Super Retina XDR display\u00B2",
            chip: "A19",
            camera: "48MP Main | 12MP Ultra Wide",
            battery: "Up to 26 hours",
            storage: "128GB – 512GB",
            proMotion: true,
            aod: true,
            dynamicIsland: true,
            actionButton: true,
            cameraControl: true,
            faceId: true,
            usbc: true,
            emergencySos: true,
            appleIntelligence: true,
          },
          buyLink: "#/buy-iphone", learnLink: "#/iphone",
        },
        {
          name: "iPhone 17", price: "From $799", isNew: true,
          image: <IPhoneSVG width={60} color="#3f51b5" />,
          colors: IPHONE_17_COLORS.standard,
          specs: {
            display: '6.3"',
            displayType: "Super Retina XDR display\u00B2",
            chip: "A19",
            camera: "48MP Main | 12MP Ultra Wide",
            battery: "Up to 26 hours",
            storage: "128GB – 512GB",
            proMotion: true,
            aod: true,
            dynamicIsland: true,
            actionButton: true,
            cameraControl: true,
            faceId: true,
            usbc: true,
            emergencySos: true,
            appleIntelligence: true,
          },
          buyLink: "#/buy-iphone", learnLink: "#/iphone",
        },
        {
          name: "iPhone 17e", price: "From $599",
          image: <IPhoneSVG width={55} color="#f4c2c2" />,
          colors: IPHONE_17_COLORS.e,
          specs: {
            display: '6.1"',
            displayType: "Super Retina XDR display\u00B2",
            chip: "A18",
            camera: "48MP Main",
            battery: "Up to 22 hours",
            storage: "128GB – 256GB",
            proMotion: false,
            aod: false,
            dynamicIsland: false,
            actionButton: false,
            cameraControl: false,
            faceId: true,
            usbc: true,
            emergencySos: true,
            appleIntelligence: true,
          },
          buyLink: "#/buy-iphone", learnLink: "#/iphone",
        },
      ]}
      specLabels={[
        { key: "display", label: "Display Size" },
        { key: "displayType", label: "Display" },
        { key: "proMotion", label: "ProMotion technology" },
        { key: "aod", label: "Always-On display" },
        { key: "dynamicIsland", label: "Dynamic Island" },
        { key: "chip", label: "Chip" },
        { key: "camera", label: "Camera" },
        { key: "battery", label: "Battery" },
        { key: "storage", label: "Storage" },
        { key: "cameraControl", label: "Camera Control" },
        { key: "actionButton", label: "Action Button" },
        { key: "faceId", label: "Face ID" },
        { key: "usbc", label: "USB-C" },
        { key: "appleIntelligence", label: "Apple Intelligence" },
        { key: "emergencySos", label: "Emergency SOS" },
      ]}
    />
  );
}

export default function BuyIPhone() {
  const [selectedModel, setSelectedModel] = useState(0);
  const [deviceColor, setDeviceColor] = useState("#a8a5a0");

  const basePrice = selectedModel === 0 ? 1099 : 1199;
  const modelName = selectedModel === 0 ? "iPhone 17 Pro" : "iPhone 17 Pro Max";

  return (
    <div style={{ backgroundColor: LIGHT_BG }}>
      {/* Hero Section */}
      <section style={{ padding: "88px 22px 0", maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <h1 style={{
            fontFamily: FONT, fontSize: "clamp(32px,5vw,48px)", fontWeight: 700,
            color: DARK, letterSpacing: "-0.025em", margin: "0 0 8px",
          }}>
            Buy {modelName}
          </h1>
          <p style={{ fontSize: 17, color: "#6e6e73", margin: "0 0 6px" }}>
            From ${basePrice.toLocaleString()} or ${(basePrice / 24).toFixed(2)}/mo. for 24 mo.*
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 32 }}>
            <span style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              width: 24, height: 24, borderRadius: "50%",
              background: "linear-gradient(135deg, #ff6b35, #f7c948, #34c759, #5ac8fa, #af52de, #ff2d55)",
            }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="#fff"><circle cx="6" cy="6" r="2.5"/></svg>
            </span>
            <span style={{ fontSize: 14, color: DARK }}>Apple Intelligence<sup style={{ fontSize: 9 }}>\u2020</sup></span>
            <a href="#/iphone" style={{ fontSize: 14, color: BLUE, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 3 }}>
              Learn more <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke={BLUE} strokeWidth="1.5" strokeLinecap="round"><circle cx="5" cy="5" r="4"/></svg>
            </a>
          </div>
        </FadeIn>

        <div style={{ display: "flex", gap: 48, flexWrap: "wrap", alignItems: "flex-start" }}>
          {/* Left: Carousel + Image */}
          <div style={{ flex: "1 1 400px", minWidth: 0 }}>
            <ScaleIn>
              <HeroCarousel />
            </ScaleIn>
          </div>

          {/* Right: Configuration Panel */}
          <div style={{ flex: "1 1 350px", maxWidth: 480 }}>
            <FadeIn delay={0.15}>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginBottom: 20 }}>
                <TradeInBanner />
              </div>
              <PaymentLink />
              <ModelSelector selected={selectedModel} onSelect={setSelectedModel} />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Full Buy Form */}
      <BuyForm
        productName={modelName}
        basePrice={basePrice}
        DeviceImage={<IPhoneSVG width={160} color={deviceColor} />}
        onColorChange={setDeviceColor}
        steps={[
          {
            title: "Pick your finish.",
            subtitle: "Choose a color you love.",
            options: IPHONE_17_COLORS.pro.map(c => ({
              label: c.name, color: c.hex, price: "Included", priceNum: 0,
            })),
          },
          {
            title: "How much storage do you need?",
            subtitle: "Photos, apps, and more — choose the right amount.",
            options: [
              { label: "256GB", sublabel: "Great for most people", price: "Included", priceNum: 0 },
              { label: "512GB", sublabel: "Plenty of space", price: "+$200", priceNum: 200 },
              { label: "1TB", sublabel: "For power users", price: "+$400", priceNum: 400 },
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
            title: "Do you want to trade in a smartphone?",
            subtitle: "Get credit toward your new iPhone.",
            options: [
              { label: "Select a smartphone", sublabel: "Answer a few questions to get your estimate.", price: "Up to $685", priceNum: 0 },
              { label: "No trade-in", sublabel: "I don't want to trade in.", price: "", priceNum: 0 },
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

      {/* Comparison */}
      <PhoneComparisonSection />

      {/* Bottom CTA */}
      <section style={{ textAlign: "center", padding: "70px 22px 90px", backgroundColor: LIGHT_BG }}>
        <FadeIn>
          <h2 style={{
            fontFamily: FONT, fontSize: "clamp(28px,4.5vw,48px)", fontWeight: 700,
            color: DARK, letterSpacing: "-0.02em", margin: "0 0 10px",
          }}>
            Still deciding?
          </h2>
          <p style={{
            fontSize: "clamp(14px,2vw,19px)", color: "#6e6e73",
            margin: "0 auto 24px", maxWidth: 500,
          }}>
            Explore all iPhone models to find the one that's perfect for you.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <MagneticButton href="#/iphone" variant="secondary">Explore all iPhone</MagneticButton>
            <MagneticButton href="#/buy-iphone" variant="ghost">Compare models</MagneticButton>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
