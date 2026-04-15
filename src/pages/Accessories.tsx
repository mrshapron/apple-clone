import { useState } from "react";
import { FadeIn, FONT, DARK, WHITE_TEXT, BLUE, LIGHT_BG } from "../shared";
import { CinematicText, MagneticButton } from "../advanced";

const categories = ["All", "Mac", "iPhone", "iPad", "Apple Watch", "AirPods"];

const items = [
  { name: "MagSafe Charger", category: "iPhone", price: "$39", desc: "Perfectly aligned wireless charging.", bg: "#f5f5f7" },
  { name: "Magic Keyboard with Touch ID", category: "Mac", price: "$199", desc: "Wireless. Rechargeable. With Touch ID.", bg: "#f5f5f7" },
  { name: "Apple Pencil Pro", category: "iPad", price: "$129", desc: "Pixel-perfect precision and creative new tools.", bg: "#f5f5f7" },
  { name: "AirTag 4 Pack", category: "iPhone", price: "$99", desc: "Keep track of and find your items.", bg: "#f5f5f7" },
  { name: "Sport Band", category: "Apple Watch", price: "$49", desc: "Comfortable and durable for everyday wear.", bg: "#f5f5f7" },
  { name: "Magic Mouse", category: "Mac", price: "$79", desc: "Multi-Touch surface for intuitive gesture controls.", bg: "#f5f5f7" },
  { name: "USB-C to Lightning Cable", category: "iPhone", price: "$19", desc: "1m braided cable for charging and syncing.", bg: "#f5f5f7" },
  { name: "Smart Folio for iPad Air", category: "iPad", price: "$79", desc: "Thin, lightweight protection that wakes iPad on open.", bg: "#f5f5f7" },
  { name: "iPhone 16 Pro Silicone Case", category: "iPhone", price: "$49", desc: "Smooth silicone with a soft-touch finish.", bg: "#f5f5f7" },
  { name: "AirPods Pro Ear Tips", category: "AirPods", price: "$7.95", desc: "Extra-small, small, medium, and large sizes.", bg: "#f5f5f7" },
  { name: "Magic Trackpad", category: "Mac", price: "$129", desc: "A large, edge-to-edge glass Multi-Touch surface.", bg: "#f5f5f7" },
  { name: "Braided Solo Loop", category: "Apple Watch", price: "$99", desc: "Stretchable, comfortable, and swim-proof.", bg: "#f5f5f7" },
];

export default function Accessories() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? items : items.filter(i => i.category === active);

  return (
    <div style={{ backgroundColor: LIGHT_BG, paddingTop: 44 }}>
      {/* Header */}
      <section style={{ maxWidth: 980, margin: "0 auto", padding: "48px 22px 0" }}>
        <FadeIn>
          <h1 style={{ fontFamily: FONT, fontSize: "clamp(32px,5vw,48px)", fontWeight: 700, color: DARK, letterSpacing: "-0.025em", lineHeight: 1.1, margin: 0 }}>
            <CinematicText text="Accessories." /> <span style={{ color: "#6e6e73" }}>Find the perfect complement to your favorite device.</span>
          </h1>
        </FadeIn>
      </section>

      {/* Filter pills */}
      <section style={{ maxWidth: 980, margin: "0 auto", padding: "28px 22px 0" }}>
        <FadeIn>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {categories.map(c => (
              <button key={c} onClick={() => setActive(c)}
                style={{
                  padding: "8px 20px", borderRadius: 40, fontSize: 14, fontWeight: 500, cursor: "pointer",
                  border: "none", transition: "all 0.25s",
                  backgroundColor: active === c ? DARK : "#fff",
                  color: active === c ? "#fff" : DARK,
                  boxShadow: active === c ? "none" : "0 1px 4px rgba(0,0,0,0.06)",
                }}
              >{c}</button>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* Grid */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 22px 60px" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16,
        }}>
          {filtered.map((item, i) => (
            <FadeIn key={item.name + active} delay={i * 0.04}>
              <div style={{
                backgroundColor: "#fff", borderRadius: 20, padding: "24px 20px",
                display: "flex", flexDirection: "column", gap: 10, minHeight: 280,
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)", transition: "transform 0.35s, box-shadow 0.35s", cursor: "pointer",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.03)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)"; }}
              >
                <span style={{ fontSize: 11, color: "#6e6e73", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>{item.category}</span>
                <div style={{ width: "100%", height: 120, borderRadius: 12, backgroundColor: LIGHT_BG, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, backgroundColor: "#e8e8ed" }} />
                </div>
                <h3 style={{ fontFamily: FONT, fontSize: 16, fontWeight: 600, color: DARK, margin: 0 }}>{item.name}</h3>
                <p style={{ fontSize: 13, color: "#6e6e73", margin: 0, lineHeight: 1.4, flex: 1 }}>{item.desc}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 14, color: DARK, fontWeight: 500 }}>{item.price}</span>
                  <a href="#/store" style={{ color: BLUE, fontSize: 13, textDecoration: "none" }}>Buy &gt;</a>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Shop by device */}
      <section style={{ backgroundColor: "#000", textAlign: "center", padding: "70px 22px" }}>
        <FadeIn>
          <h2 style={{ fontFamily: FONT, fontSize: "clamp(28px,4.5vw,48px)", fontWeight: 700, color: WHITE_TEXT, letterSpacing: "-0.02em", margin: "0 0 10px" }}>Shop by device.</h2>
          <p style={{ fontSize: "clamp(14px,2vw,19px)", color: "#a1a1a6", margin: "0 auto 40px", maxWidth: 500 }}>Find accessories made specifically for your Apple device.</p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
            {["Mac", "iPhone", "iPad", "Watch", "AirPods"].map(d => (
              <a key={d} href={`#/${d.toLowerCase()}`} style={{
                width: 140, height: 140, borderRadius: 20,
                backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8,
                textDecoration: "none", transition: "background-color 0.3s, transform 0.3s", cursor: "pointer",
              }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.transform = "scale(1.05)"; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)"; e.currentTarget.style.transform = "scale(1)"; }}
              >
                <span style={{ fontSize: 30 }}>{d === "Mac" ? "💻" : d === "iPhone" ? "📱" : d === "iPad" ? "📋" : d === "Watch" ? "⌚" : "🎧"}</span>
                <span style={{ fontSize: 14, color: WHITE_TEXT, fontWeight: 500 }}>{d}</span>
              </a>
            ))}
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
