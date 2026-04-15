import { useRouter } from "./hooks";
import { Nav, Footer } from "./shared";
import { ScrollProgressRing } from "./advanced";
import Home from "./pages/Home";
import Store from "./pages/Store";
import Mac from "./pages/Mac";
import IPhone from "./pages/iPhone";
import IPad from "./pages/iPad";
import Watch from "./pages/Watch";
import AirPods from "./pages/AirPods";
import TVHome from "./pages/TVHome";
import Entertainment from "./pages/Entertainment";
import Accessories from "./pages/Accessories";
import Support from "./pages/Support";

function Router() {
  const { route, transitioning } = useRouter();

  const Page = (() => {
    switch (route) {
      case "/store": return Store;
      case "/mac": return Mac;
      case "/iphone": return IPhone;
      case "/ipad": return IPad;
      case "/watch": return Watch;
      case "/airpods": return AirPods;
      case "/tv-home": return TVHome;
      case "/entertainment": return Entertainment;
      case "/accessories": return Accessories;
      case "/support": return Support;
      default: return Home;
    }
  })();

  return (
    <div style={{
      opacity: transitioning ? 0 : 1,
      transform: transitioning ? "translateY(12px)" : "translateY(0)",
      transition: "opacity 0.3s ease, transform 0.3s ease",
    }}>
      <Page />
    </div>
  );
}

export default function App() {
  return (
    <div style={{
      fontFamily: "SF Pro Text, -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica, Arial, sans-serif",
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
    } as any}>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: #000; overflow-x: hidden; }

        /* ── Float animations ─────────────────────── */
        @keyframes shimmer {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-16px); }
        }
        .phone-float { animation: float 5s ease-in-out infinite; }
        .laptop-float { animation: float 6s ease-in-out infinite; }
        .ipad-float { animation: float 5.5s ease-in-out infinite; }
        .watch-float { animation: float 4.5s ease-in-out infinite; }
        .airpods-float { animation: float 5s ease-in-out infinite 0.5s; }
        .tv-float { animation: float 7s ease-in-out infinite; }

        /* ── Pulse glow ───────────────────────────── */
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; transform: translate(-50%,-50%) scale(0.9); }
          50% { opacity: 1; transform: translate(-50%,-50%) scale(1.1); }
        }

        /* ── Focus pulse (iPhone camera) ──────────── */
        @keyframes focus-pulse {
          0%, 100% { border-color: rgba(255,204,0,0.7); transform: scale(1); }
          50% { border-color: rgba(255,204,0,0.3); transform: scale(1.06); }
        }

        /* ── Sound bar animation ──────────────────── */
        @keyframes soundbar {
          0% { transform: scaleY(0.4); }
          100% { transform: scaleY(1); }
        }

        /* ── Activity ring draw ───────────────────── */
        @keyframes ring-draw {
          from { stroke-dashoffset: 600; opacity: 0.3; }
          to { stroke-dashoffset: 0; opacity: 1; }
        }

        /* ── Spinning gradient background ─────────── */
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* ── Siri glow ────────────────────────────── */
        @keyframes siri-pulse {
          0%, 100% { opacity: 0.2; transform: scaleX(0.8); }
          50% { opacity: 0.7; transform: scaleX(1.2); }
        }
        .siri-glow { animation: siri-pulse 2.5s ease-in-out infinite; }

        /* ── Watch ring rotation ──────────────────── */
        .watch-ring { animation: ring-draw 1.5s ease-out forwards; }

        /* ── Display rings ────────────────────────── */
        @keyframes display-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .display-ring { animation: display-rotate 30s linear infinite; transform-origin: 200px 150px; }
        .display-ring-2 { animation: display-rotate 45s linear infinite reverse; transform-origin: 200px 150px; }

        /* ── Nav animations ───────────────────────── */
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* ── Responsive nav ───────────────────────── */
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .nav-hamburger { display: block !important; }
        }
        @media (min-width: 769px) {
          .nav-mobile-menu { display: none !important; }
        }

        /* ── Selection ────────────────────────────── */
        ::selection { background: rgba(41,151,255,0.3); }

        /* ── Hide scrollbars ──────────────────────── */
        ::-webkit-scrollbar { height: 0; width: 0; }

        /* ── Input placeholders ───────────────────── */
        input::placeholder { color: rgba(255,255,255,0.35); }

        /* ── Smooth focus ─────────────────────────── */
        *:focus-visible { outline: 2px solid rgba(41,151,255,0.5); outline-offset: 2px; }
        button:focus-visible { outline: 2px solid rgba(41,151,255,0.5); outline-offset: 2px; }

        /* ── Gradient mesh floating ──────────────── */
        @keyframes mesh-float-0 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.05); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }
        @keyframes mesh-float-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-25px, 15px) scale(0.95); }
          66% { transform: translate(20px, -25px) scale(1.05); }
        }
        @keyframes mesh-float-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(15px, 25px) scale(1.03); }
          66% { transform: translate(-30px, -15px) scale(0.97); }
        }
        @keyframes mesh-float-3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-20px, -30px) scale(0.97); }
          66% { transform: translate(25px, 15px) scale(1.03); }
        }

        /* ── Typewriter blink cursor ─────────────── */
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        /* ── Ring pulse (hero glow rings) ────────── */
        @keyframes ring-pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.06); }
        }

        /* ── Ripple button expand ─────────────────── */
        @keyframes ripple-expand {
          0% { transform: scale(0); opacity: 1; }
          100% { transform: scale(6); opacity: 0; }
        }

        /* ── Marquee scroll ──────────────────────── */
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* ── Toast notification ───────────────────── */
        @keyframes toast-in {
          0% { opacity: 0; transform: translateX(-50%) translateY(20px); }
          100% { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
      <Nav />
      <Router />
      <Footer />
      <ScrollProgressRing />
    </div>
  );
}
