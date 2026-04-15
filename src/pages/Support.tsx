import { useState } from "react";
import { FadeIn, FONT, FONT_TEXT, DARK, WHITE_TEXT, BLUE, LIGHT_BG } from "../shared";
import { CinematicText, TypeWriter } from "../advanced";

const devices = [
  { name: "iPhone", icon: "📱", route: "/iphone" },
  { name: "Mac", icon: "💻", route: "/mac" },
  { name: "iPad", icon: "📋", route: "/ipad" },
  { name: "Watch", icon: "⌚", route: "/watch" },
  { name: "AirPods", icon: "🎧", route: "/airpods" },
  { name: "Music", icon: "🎵", route: "/entertainment" },
  { name: "TV", icon: "📺", route: "/tv-home" },
];

const topics = [
  { title: "Forgot your Apple Account password?", desc: "Reset your password and regain access to your account.", icon: "🔑" },
  { title: "Repair & Physical Damage", desc: "Find out how to get your device repaired.", icon: "🔧" },
  { title: "Battery & Charging", desc: "Find help with battery replacement and charging issues.", icon: "🔋" },
  { title: "Update your device", desc: "Learn how to update to the latest software.", icon: "⬆️" },
  { title: "Accessibility", desc: "Discover built-in features that help everyone use Apple products.", icon: "♿" },
  { title: "Subscriptions & Billing", desc: "Manage your subscriptions, payments, and receipts.", icon: "💳" },
];

const articles = [
  "If your iPhone won't turn on or is frozen",
  "Get help with your iCloud storage",
  "Use Find My to locate a lost device",
  "Set up two-factor authentication",
  "Back up your iPhone with iCloud",
  "Connect AirPods to your devices",
];

export default function Support() {
  const [search, setSearch] = useState("");

  return (
    <div style={{ backgroundColor: LIGHT_BG, paddingTop: 44 }}>
      {/* Hero search */}
      <section style={{ backgroundColor: "#000", textAlign: "center", padding: "60px 22px 70px" }}>
        <FadeIn>
          <h1 style={{ fontFamily: FONT, fontSize: "clamp(36px,6vw,56px)", fontWeight: 700, color: WHITE_TEXT, letterSpacing: "-0.025em", margin: "0 0 20px" }}><CinematicText text="Apple Support" /></h1>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div style={{
            maxWidth: 560, margin: "0 auto", position: "relative",
          }}>
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search for topics, products, and more"
              style={{
                width: "100%", padding: "14px 20px 14px 48px", fontSize: 16,
                borderRadius: 12, border: "1px solid rgba(255,255,255,0.15)",
                backgroundColor: "rgba(255,255,255,0.08)", color: "#fff",
                outline: "none", fontFamily: FONT_TEXT, boxSizing: "border-box",
                transition: "border-color 0.3s, background-color 0.3s",
              }}
              onFocus={e => { e.currentTarget.style.borderColor = BLUE; e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.12)"; }}
              onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)"; }}
            />
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)" }}>
              <circle cx="7.5" cy="7.5" r="6"/><line x1="12" y1="12" x2="17" y2="17"/>
            </svg>
          </div>
        </FadeIn>
      </section>

      {/* Browse by product */}
      <section style={{ maxWidth: 980, margin: "0 auto", padding: "48px 22px 0" }}>
        <FadeIn>
          <h2 style={{ fontFamily: FONT, fontSize: "clamp(24px,4vw,36px)", fontWeight: 700, color: DARK, letterSpacing: "-0.02em", margin: "0 0 28px", textAlign: "center" }}>Browse by product.</h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            {devices.map(d => (
              <a key={d.name} href={`#${d.route}`} style={{
                width: 100, height: 100, borderRadius: 20, backgroundColor: "#fff",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)", display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: 6, textDecoration: "none",
                transition: "transform 0.3s, box-shadow 0.3s", cursor: "pointer",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.08)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)"; }}
              >
                <span style={{ fontSize: 30 }}>{d.icon}</span>
                <span style={{ fontSize: 12, fontWeight: 500, color: DARK }}>{d.name}</span>
              </a>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* Popular topics */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "56px 22px 0" }}>
        <FadeIn>
          <h2 style={{ fontFamily: FONT, fontSize: "clamp(24px,4vw,36px)", fontWeight: 700, color: DARK, letterSpacing: "-0.02em", margin: "0 0 28px", textAlign: "center" }}>Popular topics.</h2>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
          {topics.map((t, i) => (
            <FadeIn key={t.title} delay={i * 0.05}>
              <div style={{
                backgroundColor: "#fff", borderRadius: 20, padding: "28px 24px",
                display: "flex", gap: 16, alignItems: "flex-start",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)", transition: "transform 0.3s, box-shadow 0.3s", cursor: "pointer",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)"; }}
              >
                <span style={{ fontSize: 28, flexShrink: 0 }}>{t.icon}</span>
                <div>
                  <h3 style={{ fontFamily: FONT, fontSize: 16, fontWeight: 600, color: DARK, margin: "0 0 4px" }}>{t.title}</h3>
                  <p style={{ fontSize: 13, color: "#6e6e73", margin: 0, lineHeight: 1.45 }}>{t.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Helpful articles */}
      <section style={{ maxWidth: 980, margin: "0 auto", padding: "56px 22px 0" }}>
        <FadeIn>
          <h2 style={{ fontFamily: FONT, fontSize: "clamp(24px,4vw,36px)", fontWeight: 700, color: DARK, letterSpacing: "-0.02em", margin: "0 0 20px" }}>Helpful articles.</h2>
        </FadeIn>
        <div style={{ backgroundColor: "#fff", borderRadius: 20, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
          {articles.map((a, i) => (
            <FadeIn key={a} delay={i * 0.04}>
              <a href="#/support" style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "16px 24px", borderBottom: i < articles.length - 1 ? "1px solid #f0f0f0" : "none",
                textDecoration: "none", transition: "background-color 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = "#fafafa"}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
              >
                <span style={{ fontSize: 15, color: BLUE }}>{a}</span>
                <span style={{ fontSize: 18, color: "#c7c7cc" }}>&gt;</span>
              </a>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section style={{ textAlign: "center", padding: "56px 22px 70px" }}>
        <FadeIn>
          <h2 style={{ fontFamily: FONT, fontSize: "clamp(28px,4.5vw,48px)", fontWeight: 700, color: DARK, letterSpacing: "-0.02em", margin: "0 0 10px" }}>Get in touch.</h2>
          <p style={{ fontSize: "clamp(14px,2vw,19px)", color: "#6e6e73", margin: "0 auto 28px", maxWidth: 500, lineHeight: 1.5 }}>We're here to help. Talk to a Specialist or chat online for support.</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            {[
              { label: "Call Apple Support", desc: "1-800-275-2273", icon: "📞" },
              { label: "Chat with us", desc: "Available 24/7", icon: "💬" },
              { label: "Visit a Store", desc: "Find a location nearby", icon: "🏪" },
            ].map(c => (
              <div key={c.label} style={{
                backgroundColor: "#fff", borderRadius: 20, padding: "28px 24px", minWidth: 200,
                flex: "1 1 200px", maxWidth: 280, textAlign: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)", transition: "transform 0.3s", cursor: "pointer",
              }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              >
                <span style={{ fontSize: 32, display: "block", marginBottom: 10 }}>{c.icon}</span>
                <h3 style={{ fontFamily: FONT, fontSize: 17, fontWeight: 600, color: DARK, margin: "0 0 4px" }}>{c.label}</h3>
                <p style={{ fontSize: 13, color: "#6e6e73", margin: 0 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
