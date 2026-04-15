import { useState } from "react";
import { FadeIn, ScaleIn, Parallax, PageHero, FeatureTile, SpecRow, FONT, DARK, WHITE_TEXT, BLUE, LIGHT_BG, CTALinks, ColorPicker } from "../shared";
import { IPadSVG } from "../devices";
import { useTilt } from "../hooks";
import { CinematicText, MagneticButton, Marquee, ProductConfigurator, ComparisonTable, BuyForm, scrollToBuyForm } from "../advanced";

const ipads = [
  { name: "iPad Pro", chip: "M4", price: "From $999", desc: "The ultimate iPad experience with the most advanced display.", colors: [{ name: "Space Black", hex: "#1e1e1e" }, { name: "Silver", hex: "#e3e4e5" }] },
  { name: "iPad Air", chip: "M3", price: "From $599", desc: "Serious performance in a thin, light design.", colors: [{ name: "Blue", hex: "#5b8ec2" }, { name: "Purple", hex: "#967bb6" }, { name: "Starlight", hex: "#f0e6d3" }, { name: "Space Gray", hex: "#7d7e80" }] },
  { name: "iPad", chip: "A16", price: "From $349", desc: "The colorful, all-screen iPad for everyday.", colors: [{ name: "Blue", hex: "#5b8ec2" }, { name: "Pink", hex: "#e8a0b5" }, { name: "Yellow", hex: "#e8d06c" }, { name: "Silver", hex: "#e3e4e5" }] },
  { name: "iPad mini", chip: "A17 Pro", price: "From $499", desc: "Supremely capable in an ultraportable design.", colors: [{ name: "Blue", hex: "#5b8ec2" }, { name: "Purple", hex: "#967bb6" }, { name: "Starlight", hex: "#f0e6d3" }, { name: "Space Gray", hex: "#7d7e80" }] },
];

function IPadCard({ ipad, index }: { ipad: typeof ipads[0]; index: number }) {
  const [ci, setCi] = useState(0);
  const { ref, style: tiltStyle, onMove, onLeave } = useTilt(5);
  return (
    <FadeIn delay={index * 0.06}>
      <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
        style={{
          minWidth: 280, flex: "1 1 280px", backgroundColor: "#fff", borderRadius: 22, padding: "28px 24px",
          display: "flex", flexDirection: "column", gap: 10, cursor: "pointer", ...tiltStyle,
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", padding: "10px 0" }}>
          <IPadSVG width={150} color={ipad.colors[ci].hex} />
        </div>
        <ColorPicker colors={ipad.colors} selected={ci} onSelect={setCi} />
        <h3 style={{ fontFamily: FONT, fontSize: 20, fontWeight: 600, color: DARK, margin: 0 }}>{ipad.name}</h3>
        <p style={{ fontSize: 13, color: "#6e6e73", margin: 0, lineHeight: 1.4 }}>{ipad.desc}</p>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, backgroundColor: "rgba(0,0,0,0.04)", padding: "4px 12px", borderRadius: 20, alignSelf: "flex-start" }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: DARK }}>{ipad.chip}</span>
        </div>
        <p style={{ fontSize: 13, color: DARK, fontWeight: 500, margin: 0 }}>{ipad.price}</p>
        <div style={{ display: "flex", gap: 14, marginTop: 2 }}>
          <a href="#/ipad" style={{ color: BLUE, fontSize: 14, textDecoration: "none" }}>Learn more &gt;</a>
          <a href="#/ipad" onClick={(e) => { e.preventDefault(); scrollToBuyForm(); }} style={{ display: "inline-flex", backgroundColor: BLUE, color: "#fff", padding: "7px 16px", borderRadius: 20, fontSize: 13, fontWeight: 500, textDecoration: "none", cursor: "pointer" }}>Buy</a>
        </div>
      </div>
    </FadeIn>
  );
}

export default function IPad() {
  return (
    <div style={{ backgroundColor: LIGHT_BG }}>
      <PageHero title="iPad" subtitle="Touch, draw, and type on one magical device." dark={false} cta={<CTALinks learnMore="/ipad" buy="/ipad" buyScrollsToForm />}
        gradient="linear-gradient(180deg, #e8e8ed, #d2d2d7 40%, #c8c8cc 70%, #e8e8ed)"
      >
        <Parallax speed={0.1}>
          <div className="ipad-float"><IPadSVG width={Math.min(260, window.innerWidth * 0.28)} color="#1e1e1e" /></div>
        </Parallax>
      </PageHero>

      {/* Ultra Retina XDR */}
      <section style={{ backgroundColor: "#000", textAlign: "center", padding: "90px 22px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 70%, rgba(15,52,96,0.1), transparent 60%)" }} />
        <FadeIn>
          <p style={{ fontSize: 15, color: BLUE, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", margin: "0 0 10px" }}>Ultra Retina XDR</p>
          <h2 style={{ fontFamily: FONT, fontSize: "clamp(32px,5.5vw,60px)", fontWeight: 700, color: WHITE_TEXT, letterSpacing: "-0.03em", margin: "0 0 16px" }}><CinematicText text="A display beyond compare." /></h2>
          <p style={{ fontSize: "clamp(14px,2vw,19px)", color: "#a1a1a6", margin: "0 auto", maxWidth: 600, lineHeight: 1.5 }}>The most advanced display technology brings everything to life with extreme dynamic range, deep blacks, and incredible color accuracy.</p>
        </FadeIn>
        <ScaleIn delay={0.2}>
          <div style={{ marginTop: 56, display: "flex", justifyContent: "center" }}>
            <div style={{ width: "clamp(320px,55vw,700px)", aspectRatio: "4/3", borderRadius: 18, background: "linear-gradient(135deg, #0d1b2a 0%, #1a1a3e 30%, #0f3460 60%, #533483 100%)", border: "2px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
              {/* Abstract art content */}
              <svg width="100%" height="100%" viewBox="0 0 400 300" style={{ position: "absolute", inset: 0 }}>
                <circle cx="200" cy="150" r="80" fill="none" stroke="rgba(41,151,255,0.15)" strokeWidth="0.5" className="display-ring" />
                <circle cx="200" cy="150" r="120" fill="none" stroke="rgba(83,52,131,0.1)" strokeWidth="0.5" className="display-ring-2" />
                <circle cx="200" cy="150" r="40" fill="rgba(41,151,255,0.05)" />
                {/* Color dots */}
                <circle cx="160" cy="120" r="15" fill="rgba(255,55,95,0.2)" />
                <circle cx="240" cy="130" r="20" fill="rgba(41,151,255,0.15)" />
                <circle cx="190" cy="180" r="12" fill="rgba(52,199,89,0.15)" />
                <circle cx="230" cy="170" r="18" fill="rgba(175,82,222,0.15)" />
              </svg>
              <span style={{ fontSize: 16, color: "rgba(255,255,255,0.15)", fontWeight: 600, fontFamily: FONT, position: "relative", zIndex: 1, letterSpacing: "0.2em" }}>1000000:1 CONTRAST</span>
            </div>
          </div>
        </ScaleIn>
      </section>

      {/* Lineup */}
      <section style={{ padding: "60px 22px 0", maxWidth: 980, margin: "0 auto" }}>
        <FadeIn>
          <h2 style={{ fontFamily: FONT, fontSize: "clamp(28px,4.5vw,48px)", fontWeight: 700, color: DARK, letterSpacing: "-0.02em", textAlign: "center", margin: "0 0 6px" }}>Explore the lineup.</h2>
          <p style={{ fontSize: "clamp(14px,2vw,19px)", color: "#6e6e73", textAlign: "center", margin: "0 0 40px" }}>There's an iPad for everything you want to do.</p>
        </FadeIn>
      </section>

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 22px 20px" }}>
        <div style={{ display: "flex", gap: 18, overflowX: "auto", paddingBottom: 24, scrollbarWidth: "none" }}>
          {ipads.map((p, i) => <IPadCard key={p.name} ipad={p} index={i} />)}
        </div>
      </section>

      <section style={{ display: "flex", flexWrap: "wrap", gap: 12, padding: "12px 12px 0" }}>
        <FeatureTile dark large title="Apple Pencil Pro" description="Precision meets creativity. Hover, squeeze, and barrel roll for total artistic control." />
        <FeatureTile title="Magic Keyboard" description="A full-size keyboard with a built-in trackpad for laptop-level productivity." />
        <FeatureTile title="iPadOS" description="Designed for iPad with multitasking, Stage Manager, and desktop-class apps." />
      </section>

      <Marquee items={["Ultra Retina XDR", "M4 Chip", "Apple Pencil Pro", "Magic Keyboard", "Stage Manager", "iPadOS", "Center Stage", "Thunderbolt", "5G", "All-Day Battery"]} speed={36} />

      <SpecRow items={[
        { label: "Display", value: "Ultra Retina XDR" },
        { label: "Chip", value: "M4" },
        { label: "Thickness (mm)", value: "5.1mm", numericValue: 5, suffix: ".1mm" },
        { label: "Battery", value: "All-day" },
      ]} />

      {/* Configure iPad */}
      <section style={{ backgroundColor: LIGHT_BG }}>
        <FadeIn>
          <h2 style={{ fontFamily: FONT, fontSize: "clamp(28px,4.5vw,48px)", fontWeight: 700, color: DARK, letterSpacing: "-0.02em", textAlign: "center", padding: "60px 22px 0", margin: 0 }}>
            Configure your iPad.
          </h2>
          <p style={{ fontSize: "clamp(14px,2vw,19px)", color: "#6e6e73", textAlign: "center", margin: "6px 0 0" }}>Choose the specs that work for you.</p>
        </FadeIn>
        <ProductConfigurator
          name="iPad Pro"
          basePrice={999}
          DeviceComponent={() => <IPadSVG width={160} color="#1e1e1e" />}
          options={[
            { category: "Display Size", choices: [
              { label: '11-inch iPad Pro', price: 0, default: true },
              { label: '13-inch iPad Pro', price: 300 },
            ]},
            { category: "Storage", choices: [
              { label: "256GB", price: 0, default: true },
              { label: "512GB", price: 200 },
              { label: "1TB", price: 600 },
              { label: "2TB", price: 1000 },
            ]},
            { category: "Connectivity", choices: [
              { label: "Wi-Fi", price: 0, default: true },
              { label: "Wi-Fi + Cellular", price: 200 },
            ]},
          ]}
        />
      </section>

      {/* ── Comparison Table ──────────────────── */}
      <ComparisonTable
        title="Which iPad is right for you?"
        models={[
          {
            name: "iPad Pro", price: "From $999", isNew: true,
            image: <IPadSVG width={100} color="#1e1e1e" />,
            colors: [{ name: "Space Black", hex: "#1e1e1e" }, { name: "Silver", hex: "#e3e4e5" }],
            specs: { display: '11" or 13" Ultra Retina XDR', chip: "Apple M4", camera: "12MP Wide + 10MP Ultra Wide", frontCamera: "12MP TrueDepth (landscape)", connector: "USB-C / Thunderbolt", pencil: "Apple Pencil Pro", keyboard: "Magic Keyboard", faceId: true, proMotion: true, lidar: true },
            buyLink: "#/ipad", learnLink: "#/ipad",
          },
          {
            name: "iPad Air", price: "From $599",
            image: <IPadSVG width={90} color="#5b8ec2" />,
            colors: [{ name: "Blue", hex: "#5b8ec2" }, { name: "Purple", hex: "#967bb6" }, { name: "Starlight", hex: "#f0e6d3" }, { name: "Space Gray", hex: "#7d7e80" }],
            specs: { display: '11" or 13" Liquid Retina', chip: "Apple M3", camera: "12MP Wide", frontCamera: "12MP (landscape)", connector: "USB-C", pencil: "Apple Pencil Pro", keyboard: "Magic Keyboard", faceId: false, proMotion: false, lidar: false },
            buyLink: "#/ipad", learnLink: "#/ipad",
          },
          {
            name: "iPad", price: "From $349",
            image: <IPadSVG width={80} color="#e8d06c" />,
            colors: [{ name: "Blue", hex: "#5b8ec2" }, { name: "Pink", hex: "#e8a0b5" }, { name: "Yellow", hex: "#e8d06c" }, { name: "Silver", hex: "#e3e4e5" }],
            specs: { display: '10.9" Liquid Retina', chip: "A16 Bionic", camera: "12MP Wide", frontCamera: "12MP (landscape)", connector: "USB-C", pencil: "Apple Pencil (USB-C)", keyboard: "Magic Keyboard Folio", faceId: false, proMotion: false, lidar: false },
            buyLink: "#/ipad", learnLink: "#/ipad",
          },
          {
            name: "iPad mini", price: "From $499",
            image: <IPadSVG width={68} color="#967bb6" />,
            colors: [{ name: "Blue", hex: "#5b8ec2" }, { name: "Purple", hex: "#967bb6" }, { name: "Starlight", hex: "#f0e6d3" }, { name: "Space Gray", hex: "#7d7e80" }],
            specs: { display: '8.3" Liquid Retina', chip: "A17 Pro", camera: "12MP Wide", frontCamera: "12MP (landscape)", connector: "USB-C", pencil: "Apple Pencil Pro", keyboard: "Bluetooth keyboards", faceId: false, proMotion: false, lidar: false },
            buyLink: "#/ipad", learnLink: "#/ipad",
          },
        ]}
        specLabels={[
          { key: "display", label: "Display" },
          { key: "chip", label: "Chip" },
          { key: "camera", label: "Rear Camera" },
          { key: "frontCamera", label: "Front Camera" },
          { key: "connector", label: "Connector" },
          { key: "pencil", label: "Apple Pencil" },
          { key: "keyboard", label: "Keyboard" },
          { key: "faceId", label: "Face ID" },
          { key: "proMotion", label: "ProMotion" },
          { key: "lidar", label: "LiDAR Scanner" },
        ]}
      />

      {/* ── Buy Form ─────────────────────────── */}
      <BuyForm
        productName="iPad Pro"
        basePrice={999}
        DeviceImage={<IPadSVG width={160} color="#1e1e1e" />}
        steps={[
          {
            title: "Choose your display size.",
            options: [
              { label: '11-inch iPad Pro', sublabel: 'Compact yet powerful', price: "From $999", priceNum: 0 },
              { label: '13-inch iPad Pro', sublabel: 'Our largest iPad display', price: "From $1,299", priceNum: 300 },
            ],
          },
          {
            title: "Pick your finish.",
            options: [
              { label: "Space Black", color: "#1e1e1e", price: "Included", priceNum: 0 },
              { label: "Silver", color: "#e3e4e5", price: "Included", priceNum: 0 },
            ],
          },
          {
            title: "How much storage?",
            options: [
              { label: "256GB", price: "Included", priceNum: 0 },
              { label: "512GB", price: "+$200", priceNum: 200 },
              { label: "1TB", sublabel: "M4 with nano-texture display option", price: "+$600", priceNum: 600 },
              { label: "2TB", sublabel: "M4 with nano-texture display option", price: "+$1,000", priceNum: 1000 },
            ],
          },
          {
            title: "Choose connectivity.",
            options: [
              { label: "Wi-Fi", sublabel: "Connect via Wi-Fi", price: "Included", priceNum: 0 },
              { label: "Wi-Fi + Cellular", sublabel: "Connect on the go with 5G", price: "+$200", priceNum: 200 },
            ],
          },
          {
            title: "Add accessories.",
            subtitle: "Complete your setup.",
            options: [
              { label: "No accessories", price: "Included", priceNum: 0 },
              { label: "Apple Pencil Pro", sublabel: "Hover, squeeze, and barrel roll", price: "+$129", priceNum: 129 },
              { label: "Magic Keyboard", sublabel: "Full keyboard with trackpad", price: "+$299", priceNum: 299, tag: "Popular" },
            ],
          },
        ]}
      />

      <section style={{ textAlign: "center", padding: "70px 22px 80px", backgroundColor: LIGHT_BG }}>
        <FadeIn>
          <h2 style={{ fontFamily: FONT, fontSize: "clamp(28px,4.5vw,48px)", fontWeight: 700, color: DARK, letterSpacing: "-0.02em", margin: "0 0 10px" }}>Why iPad?</h2>
          <p style={{ fontSize: "clamp(14px,2vw,19px)", color: "#6e6e73", margin: "0 auto 24px", maxWidth: 500 }}>There are so many reasons to make iPad your next computer.</p>
          <MagneticButton href="#/ipad" variant="ghost">Learn more about iPad</MagneticButton>
        </FadeIn>
      </section>
    </div>
  );
}
