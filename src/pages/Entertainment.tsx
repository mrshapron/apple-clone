import { FadeIn, FONT, DARK, WHITE_TEXT, BLUE, LIGHT_BG } from "../shared";
import { CinematicText, MagneticButton, Marquee } from "../advanced";

const services = [
  { name: "Apple TV+", desc: "Award-winning original shows, films, and documentaries.", price: "$9.99/mo", color: "#000", accent: "#fff", icon: <svg width="44" height="44" viewBox="0 0 44 44" fill="none"><rect width="44" height="44" rx="10" fill="#000"/><text x="22" y="30" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="700" fontFamily="-apple-system">tv</text></svg> },
  { name: "Apple Music", desc: "Over 100 million songs. Zero ads. Spatial Audio with Dolby Atmos.", price: "$10.99/mo", color: "#fc3c44", accent: "#fff", icon: <svg width="44" height="44" viewBox="0 0 44 44" fill="none"><rect width="44" height="44" rx="10" fill="#fc3c44"/><text x="22" y="30" textAnchor="middle" fill="#fff" fontSize="22" fontWeight="700" fontFamily="-apple-system">♫</text></svg> },
  { name: "Apple Arcade", desc: "200+ incredibly fun games. No ads. No in-app purchases.", price: "$6.99/mo", color: "#147ce5", accent: "#fff", icon: <svg width="44" height="44" viewBox="0 0 44 44" fill="none"><rect width="44" height="44" rx="10" fill="#147ce5"/><text x="22" y="30" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="700" fontFamily="-apple-system">🎮</text></svg> },
  { name: "Apple News+", desc: "Hundreds of top magazines and leading newspapers.", price: "$12.99/mo", color: "#f55", accent: "#fff", icon: <svg width="44" height="44" viewBox="0 0 44 44" fill="none"><rect width="44" height="44" rx="10" fill="#f55"/><text x="22" y="30" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="700" fontFamily="-apple-system">N</text></svg> },
  { name: "Apple Fitness+", desc: "The ultimate fitness service powered by Apple Watch.", price: "$9.99/mo", color: "#a0e515", accent: "#000", icon: <svg width="44" height="44" viewBox="0 0 44 44" fill="none"><rect width="44" height="44" rx="10" fill="#a0e515"/><text x="22" y="30" textAnchor="middle" fill="#000" fontSize="20" fontWeight="700" fontFamily="-apple-system">F+</text></svg> },
  { name: "iCloud+", desc: "All your photos, files, and more — secure and available everywhere.", price: "From $0.99/mo", color: "#3693f5", accent: "#fff", icon: <svg width="44" height="44" viewBox="0 0 44 44" fill="none"><rect width="44" height="44" rx="10" fill="#3693f5"/><text x="22" y="30" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="700" fontFamily="-apple-system">☁</text></svg> },
];

export default function Entertainment() {
  return (
    <div style={{ backgroundColor: LIGHT_BG }}>
      {/* Hero */}
      <section style={{ backgroundColor: "#000", paddingTop: 44, textAlign: "center", overflow: "hidden" }}>
        <div style={{ padding: "70px 20px 80px" }}>
          <FadeIn><h1 style={{ fontFamily: FONT, fontSize: "clamp(40px,7vw,72px)", fontWeight: 700, color: WHITE_TEXT, letterSpacing: "-0.025em", lineHeight: 1.05, margin: 0 }}><CinematicText text="Entertainment" /></h1></FadeIn>
          <FadeIn delay={0.1}><h2 style={{ fontFamily: FONT, fontSize: "clamp(20px,3.5vw,28px)", fontWeight: 400, color: "#a1a1a6", margin: "8px 0 0" }}>Icons of icons. Now all in one place.</h2></FadeIn>
          <FadeIn delay={0.2}>
            <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 36, flexWrap: "wrap" }}>
              {services.slice(0, 4).map(s => (
                <div key={s.name} style={{ transition: "transform 0.3s", cursor: "pointer" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.15)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                >{s.icon}</div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Apple One bundle */}
      <section style={{ textAlign: "center", padding: "70px 22px", backgroundColor: "#161617" }}>
        <FadeIn>
          <h2 style={{ fontFamily: FONT, fontSize: "clamp(32px,5vw,56px)", fontWeight: 700, color: WHITE_TEXT, letterSpacing: "-0.025em", margin: "0 0 10px" }}>Apple One</h2>
          <p style={{ fontSize: "clamp(16px,2.5vw,22px)", color: "#a1a1a6", margin: "0 auto 8px", maxWidth: 600, lineHeight: 1.4 }}>Bundle your favorite Apple services and enjoy more for less.</p>
          <p style={{ fontSize: "clamp(14px,2vw,17px)", color: "#6e6e73", margin: "0 0 20px" }}>From $19.95/mo.</p>
          <MagneticButton href="#/entertainment" variant="ghost">Try it free</MagneticButton>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 40, flexWrap: "wrap" }}>
            {services.map(s => (
              <div key={s.name} style={{ transition: "transform 0.3s", cursor: "pointer" }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              >{s.icon}</div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* Services grid */}
      <section style={{ padding: "56px 22px 0", maxWidth: 980, margin: "0 auto" }}>
        <FadeIn>
          <h2 style={{ fontFamily: FONT, fontSize: "clamp(28px,4.5vw,48px)", fontWeight: 700, color: DARK, letterSpacing: "-0.02em", textAlign: "center", margin: "0 0 36px" }}>Explore all services.</h2>
        </FadeIn>
      </section>

      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "0 22px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
          {services.map((s, i) => (
            <FadeIn key={s.name} delay={i * 0.06}>
              <div style={{
                backgroundColor: "#fff", borderRadius: 20, padding: "32px 28px", minHeight: 240,
                display: "flex", flexDirection: "column", gap: 14,
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)", transition: "transform 0.35s, box-shadow 0.35s", cursor: "pointer",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)"; }}
              >
                {s.icon}
                <h3 style={{ fontFamily: FONT, fontSize: 24, fontWeight: 600, color: DARK, margin: 0 }}>{s.name}</h3>
                <p style={{ fontSize: 14, color: "#6e6e73", margin: 0, lineHeight: 1.5, flex: 1 }}>{s.desc}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 14, color: DARK, fontWeight: 500 }}>{s.price}</span>
                  <a href="#/entertainment" style={{ color: BLUE, fontSize: 14, textDecoration: "none" }}>Try it free &gt;</a>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <Marquee items={["Apple TV+", "Apple Music", "Apple Arcade", "Apple News+", "Apple Fitness+", "iCloud+", "Apple One", "Apple Podcasts", "Apple Books"]} speed={35} />

      {/* Apple TV+ spotlight */}
      <section style={{ backgroundColor: "#000", textAlign: "center", padding: "80px 22px" }}>
        <FadeIn>
          <h2 style={{ fontFamily: FONT, fontSize: "clamp(32px,5vw,56px)", fontWeight: 700, color: WHITE_TEXT, letterSpacing: "-0.025em", margin: "0 0 14px" }}>Original stories from the world's best storytellers.</h2>
          <p style={{ fontSize: "clamp(14px,2vw,19px)", color: "#a1a1a6", margin: "0 auto 30px", maxWidth: 600, lineHeight: 1.5 }}>Apple TV+ is home to award-winning Apple Originals — critically acclaimed series, films, and documentaries.</p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            {[
              { title: "Drama", gradient: "linear-gradient(135deg, #1a1a4e, #2a1a3e)" },
              { title: "Comedy", gradient: "linear-gradient(135deg, #1a3e2e, #1a4e1a)" },
              { title: "Thriller", gradient: "linear-gradient(135deg, #3e1a1a, #4e1a2a)" },
              { title: "Documentary", gradient: "linear-gradient(135deg, #1a2e3e, #1a3e4e)" },
            ].map(g => (
              <div key={g.title} style={{
                width: 180, height: 260, borderRadius: 14, background: g.gradient,
                display: "flex", alignItems: "flex-end", padding: 20, cursor: "pointer",
                border: "1px solid rgba(255,255,255,0.06)", transition: "transform 0.3s",
              }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              >
                <span style={{ fontSize: 16, fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>{g.title}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* Privacy note */}
      <section style={{ textAlign: "center", padding: "60px 22px 70px", backgroundColor: LIGHT_BG }}>
        <FadeIn>
          <h2 style={{ fontFamily: FONT, fontSize: "clamp(28px,4.5vw,48px)", fontWeight: 700, color: DARK, letterSpacing: "-0.02em", margin: "0 0 8px" }}>Privacy is built in.</h2>
          <p style={{ fontSize: "clamp(14px,2vw,19px)", color: "#6e6e73", margin: "0 auto 20px", maxWidth: 500, lineHeight: 1.5 }}>Every Apple service is designed from the ground up to protect your privacy and keep your personal information safe.</p>
          <MagneticButton href="#/support" variant="ghost">Learn more about Apple and privacy</MagneticButton>
        </FadeIn>
      </section>
    </div>
  );
}
