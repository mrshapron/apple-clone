import { useState } from "react";
import { FadeIn, ScaleIn, GlowCard, FONT, FONT_TEXT, BLUE, DARK, LIGHT_BG, WHITE_TEXT } from "../shared";
import { IPhoneSVG, MacBookSVG, IPadSVG, WatchSVG, AirPodsSVG, HomePodSVG } from "../devices";
import { useTilt } from "../hooks";
import { CinematicText, MagneticButton, Marquee } from "../advanced";

const categories = [
  { name: "Mac", price: "From $599", route: "/mac", Device: () => <MacBookSVG width={70} /> },
  { name: "iPhone", price: "From $599", route: "/iphone", Device: () => <IPhoneSVG width={32} /> },
  { name: "iPad", price: "From $349", route: "/ipad", Device: () => <IPadSVG width={40} /> },
  { name: "Apple Watch", price: "From $249", route: "/watch", Device: () => <WatchSVG width={32} /> },
  { name: "AirPods", price: "From $129", route: "/airpods", Device: () => <AirPodsSVG width={60} /> },
  { name: "HomePod", price: "From $99", route: "/tv-home", Device: () => <HomePodSVG width={36} /> },
];

const featured = [
  { title: "MacBook Air 15\"", subtitle: "The 15-inch laptop with the M4 chip.", price: "$1,299", color: "#1a1a2e", textColor: WHITE_TEXT, learnRoute: "/mac", buyRoute: "/mac", Device: () => <MacBookSVG width={260} color="#2c2c2e" /> },
  { title: "iPhone 17 Pro", subtitle: "The ultimate iPhone.", price: "$1,099", color: "#0f3460", textColor: WHITE_TEXT, learnRoute: "/iphone", buyRoute: "/buy-iphone", Device: () => <IPhoneSVG width={100} color="#a8a5a0" /> },
  { title: "iPad Air", subtitle: "Fresh Air.", price: "$599", color: "#fbfbfd", textColor: DARK, learnRoute: "/ipad", buyRoute: "/ipad", Device: () => <IPadSVG width={130} color="#5b8ec2" /> },
  { title: "Apple Watch Ultra 2", subtitle: "Next-level adventure.", price: "$799", color: "#2c2c2e", textColor: WHITE_TEXT, learnRoute: "/watch", buyRoute: "/watch", Device: () => <WatchSVG width={80} color="#a8a5a0" /> },
  { title: "AirPods Pro 2", subtitle: "Intelligent noise cancellation.", price: "$249", color: "#fbfbfd", textColor: DARK, learnRoute: "/airpods", buyRoute: "/airpods", Device: () => <AirPodsSVG width={140} /> },
  { title: "MacBook Pro", subtitle: "Mind-blowing. Head-turning.", price: "$1,599", color: "#1a1a2e", textColor: WHITE_TEXT, learnRoute: "/mac", buyRoute: "/mac", Device: () => <MacBookSVG width={260} color="#1e1e1e" /> },
];

function ProductCard({ item, index }: { item: typeof featured[0]; index: number }) {
  const { ref, style: tiltStyle, onMove, onLeave } = useTilt(6);
  return (
    <FadeIn delay={index * 0.07}>
      <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
        style={{
          minWidth: 360, borderRadius: 22, backgroundColor: item.color, padding: "36px 32px",
          display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 460,
          cursor: "pointer", overflow: "hidden", ...tiltStyle,
        }}
      >
        <div>
          <h3 style={{ fontFamily: FONT, fontSize: 26, fontWeight: 600, color: item.textColor, margin: "0 0 6px", letterSpacing: "-0.015em" }}>{item.title}</h3>
          <p style={{ fontSize: 15, color: item.textColor === WHITE_TEXT ? "#a1a1a6" : "#6e6e73", margin: 0 }}>{item.subtitle}</p>
        </div>
        <div style={{ display: "flex", justifyContent: "center", padding: "24px 0", flex: 1, alignItems: "center" }}>
          <item.Device />
        </div>
        <div>
          <p style={{ fontSize: 14, color: item.textColor, margin: "0 0 12px" }}>{item.price}</p>
          <div style={{ display: "flex", gap: 16 }}>
            <a href={`#${item.learnRoute}`} style={{ color: BLUE, fontSize: 14, textDecoration: "none" }}>Learn more &gt;</a>
            <a href={`#${item.buyRoute}`} style={{ display: "inline-flex", alignItems: "center", backgroundColor: BLUE, color: "#fff", padding: "7px 16px", borderRadius: 20, fontSize: 13, fontWeight: 500, textDecoration: "none" }}>Buy</a>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

export default function Store() {
  return (
    <div style={{ paddingTop: 44, backgroundColor: LIGHT_BG }}>
      {/* ── Greeting ─────────────────────────────── */}
      <section style={{ maxWidth: 980, margin: "0 auto", padding: "52px 22px 0" }}>
        <FadeIn>
          <p style={{ fontSize: 14, color: "#6e6e73", fontFamily: FONT_TEXT, margin: "0 0 4px" }}>Store</p>
          <h1 style={{ fontFamily: FONT, fontSize: "clamp(34px,5.5vw,52px)", fontWeight: 700, color: DARK, letterSpacing: "-0.03em", lineHeight: 1.08, margin: 0 }}>
            <CinematicText text="Store." /> <span style={{ color: "#6e6e73" }}>The best way to buy the products you love.</span>
          </h1>
        </FadeIn>
      </section>

      {/* ── Category Scroll ──────────────────────── */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 22px 0" }}>
        <FadeIn>
          <div style={{ display: "flex", gap: 16, overflowX: "auto", paddingBottom: 20, scrollbarWidth: "none" }}>
            {categories.map((cat) => (
              <a key={cat.name} href={`#${cat.route}`} style={{
                minWidth: 140, backgroundColor: "#fff", borderRadius: 22, padding: "28px 16px 20px", textAlign: "center",
                textDecoration: "none", transition: "box-shadow 0.4s, transform 0.4s", boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
              }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.1)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ height: 60, display: "flex", alignItems: "center", justifyContent: "center" }}><cat.Device /></div>
                <span style={{ fontSize: 13, fontWeight: 600, color: DARK }}>{cat.name}</span>
                <span style={{ fontSize: 12, color: "#6e6e73" }}>{cat.price}</span>
              </a>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── Featured Products ────────────────────── */}
      <section style={{ maxWidth: 980, margin: "0 auto", padding: "40px 22px 0" }}>
        <FadeIn>
          <h2 style={{ fontFamily: FONT, fontSize: "clamp(24px,4vw,36px)", fontWeight: 700, color: DARK, letterSpacing: "-0.02em", margin: "0 0 4px" }}>
            The latest. <span style={{ color: "#6e6e73" }}>Take a look at what's new right now.</span>
          </h2>
        </FadeIn>
      </section>

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 22px 0" }}>
        <div style={{ display: "flex", gap: 18, overflowX: "auto", paddingBottom: 24, scrollbarWidth: "none" }}>
          {featured.map((item, i) => <ProductCard key={item.title} item={item} index={i} />)}
        </div>
      </section>

      <Marquee items={["Free Delivery", "Apple Trade In", "Personalization", "Apple Card Monthly Installments", "Apple Specialist", "Today at Apple", "Order Tracking", "Apple Store App"]} speed={38} />

      {/* ── Help section ─────────────────────────── */}
      <section style={{ maxWidth: 980, margin: "0 auto", padding: "52px 22px" }}>
        <FadeIn>
          <h2 style={{ fontFamily: FONT, fontSize: "clamp(24px,4vw,36px)", fontWeight: 700, color: DARK, letterSpacing: "-0.02em", margin: "0 0 24px" }}>
            Help is here. <span style={{ color: "#6e6e73" }}>Whenever and however you need it.</span>
          </h2>
        </FadeIn>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {[
            { title: "Apple Specialist", desc: "Chat now or get a call from an expert.", icon: "💬" },
            { title: "Visit a Store", desc: "Find a store near you and get personalized help.", icon: "🏪" },
            { title: "Shopping experience", desc: "Explore financing, trade-in, and more.", icon: "🛍️" },
          ].map((h, i) => (
            <FadeIn key={h.title} delay={i * 0.1}>
              <GlowCard style={{
                flex: "1 1 280px", backgroundColor: "#fff", borderRadius: 22, padding: "32px 28px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)", cursor: "pointer", transition: "transform 0.4s, box-shadow 0.4s",
              }}>
                <div
                  onMouseEnter={e => { e.currentTarget.parentElement!.style.transform = "translateY(-4px)"; e.currentTarget.parentElement!.style.boxShadow = "0 8px 30px rgba(0,0,0,0.1)"; }}
                  onMouseLeave={e => { e.currentTarget.parentElement!.style.transform = "translateY(0)"; e.currentTarget.parentElement!.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)"; }}
                >
                  <span style={{ fontSize: 32, display: "block", marginBottom: 12 }}>{h.icon}</span>
                  <h3 style={{ fontFamily: FONT, fontSize: 20, fontWeight: 600, color: DARK, margin: "0 0 6px" }}>{h.title}</h3>
                  <p style={{ fontSize: 14, color: "#6e6e73", margin: 0, lineHeight: 1.5 }}>{h.desc}</p>
                  <div style={{ marginTop: 14 }}><MagneticButton href="#/support" variant="ghost" style={{ fontSize: 14 }}>Learn more</MagneticButton></div>
                </div>
              </GlowCard>
            </FadeIn>
          ))}
        </div>
      </section>
    </div>
  );
}
