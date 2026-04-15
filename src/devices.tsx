import React from "react";

// ═══════════════════════════════════════════════════════════════════════════
// Detailed SVG Product Illustrations
// ═══════════════════════════════════════════════════════════════════════════

// ─── iPhone ──────────────────────────────────────────────────────────────
export function IPhoneSVG({ color = "#2c2c2e", screenGradient, width = 220, className = "" }: {
  color?: string; screenGradient?: string; width?: number; className?: string;
}) {
  const h = width * 2.05;
  const r = width * 0.16;
  const bezel = width * 0.04;
  const notchW = width * 0.3;
  const notchH = width * 0.1;
  return (
    <svg width={width} height={h} viewBox={`0 0 ${width} ${h}`} className={className}>
      <defs>
        <linearGradient id="iphoneScreen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={screenGradient || "#1a1a3e"} />
          <stop offset="50%" stopColor={screenGradient ? "#0f3460" : "#0f3460"} />
          <stop offset="100%" stopColor="#533483" />
        </linearGradient>
        <linearGradient id="iphoneFrame" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor={color} stopOpacity="0.8" />
        </linearGradient>
        <filter id="phoneShadow"><feDropShadow dx="0" dy="8" stdDeviation="16" floodOpacity="0.4"/></filter>
        <linearGradient id="phoneShine" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0.12" />
          <stop offset="50%" stopColor="white" stopOpacity="0" />
          <stop offset="100%" stopColor="white" stopOpacity="0.06" />
        </linearGradient>
      </defs>
      {/* Body */}
      <rect x="0" y="0" width={width} height={h} rx={r} fill="url(#iphoneFrame)" filter="url(#phoneShadow)" />
      {/* Screen */}
      <rect x={bezel} y={bezel} width={width - bezel * 2} height={h - bezel * 2} rx={r - bezel} fill="url(#iphoneScreen)" />
      {/* Dynamic Island */}
      <rect x={(width - notchW) / 2} y={bezel + width * 0.04} width={notchW} height={notchH} rx={notchH / 2} fill="#000" />
      {/* Camera dot in island */}
      <circle cx={(width - notchW) / 2 + notchH / 2 + 2} cy={bezel + width * 0.04 + notchH / 2} r={notchH * 0.2} fill="#0a0a1a" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
      {/* Time text */}
      <text x={width * 0.17} y={bezel + width * 0.07 + notchH / 2} fill="rgba(255,255,255,0.6)" fontSize={width * 0.055} fontWeight="600" fontFamily="-apple-system">9:41</text>
      {/* Signal / battery icons top right */}
      <rect x={width * 0.72} y={bezel + width * 0.04 + notchH * 0.25} width={width * 0.12} height={notchH * 0.45} rx={2} fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      <rect x={width * 0.725} y={bezel + width * 0.04 + notchH * 0.3} width={width * 0.08} height={notchH * 0.35} rx={1} fill="rgba(255,255,255,0.4)" />
      {/* Screen content - app icons grid */}
      {[0,1,2,3].map(row => [0,1,2,3].map(col => {
        const iconSize = width * 0.12;
        const gap = (width - bezel * 2 - iconSize * 4) / 5;
        const ix = bezel + gap + col * (iconSize + gap);
        const iy = bezel + width * 0.28 + row * (iconSize + gap * 1.2);
        const colors = ["#5856d6","#ff9500","#34c759","#ff2d55","#007aff","#af52de","#ff3b30","#5ac8fa","#ffcc00","#30d158","#ff6482","#64d2ff","#bf5af2","#ff9f0a","#32d74b","#ff453a"];
        return <rect key={`${row}-${col}`} x={ix} y={iy} width={iconSize} height={iconSize} rx={iconSize * 0.22} fill={colors[row * 4 + col]} opacity="0.7" />;
      }))}
      {/* Dock */}
      <rect x={bezel + width * 0.04} y={h - bezel - width * 0.22} width={width - bezel * 2 - width * 0.08} height={width * 0.17} rx={width * 0.06} fill="rgba(255,255,255,0.06)" />
      {[0,1,2,3].map(i => {
        const dockColors = ["#34c759","#007aff","#ff9500","#5856d6"];
        const iconS = width * 0.1;
        const totalW = iconS * 4 + width * 0.06 * 3;
        const startX = (width - totalW) / 2;
        return <rect key={i} x={startX + i * (iconS + width * 0.06)} y={h - bezel - width * 0.19} width={iconS} height={iconS} rx={iconS * 0.22} fill={dockColors[i]} opacity="0.7" />;
      })}
      {/* Home indicator */}
      <rect x={(width - width * 0.3) / 2} y={h - bezel - width * 0.03} width={width * 0.3} height={3} rx={1.5} fill="rgba(255,255,255,0.3)" />
      {/* Shine overlay */}
      <rect x="0" y="0" width={width} height={h} rx={r} fill="url(#phoneShine)" />
    </svg>
  );
}

// ─── MacBook ─────────────────────────────────────────────────────────────
export function MacBookSVG({ color = "#2c2c2e", width = 500, className = "" }: {
  color?: string; width?: number; className?: string;
}) {
  const screenH = width * 0.56;
  const baseH = width * 0.028;
  const totalH = screenH + baseH + 8;
  const screenBezel = width * 0.025;
  return (
    <svg width={width} height={totalH} viewBox={`0 0 ${width} ${totalH}`} className={className}>
      <defs>
        <linearGradient id="macScreen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1a1a3e" />
          <stop offset="40%" stopColor="#0d1b2a" />
          <stop offset="100%" stopColor="#16213e" />
        </linearGradient>
        <linearGradient id="macLid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0.85" />
        </linearGradient>
        <filter id="macShadow"><feDropShadow dx="0" dy="6" stdDeviation="12" floodOpacity="0.35"/></filter>
        <linearGradient id="macShine" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0.08" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Lid */}
      <rect x={width * 0.08} y="0" width={width * 0.84} height={screenH} rx="10" fill="url(#macLid)" filter="url(#macShadow)" />
      {/* Screen area */}
      <rect x={width * 0.08 + screenBezel} y={screenBezel} width={width * 0.84 - screenBezel * 2} height={screenH - screenBezel * 2} rx="4" fill="url(#macScreen)" />
      {/* Camera notch */}
      <circle cx={width / 2} cy={screenBezel * 0.7 + 3} r="2.5" fill="#1a1a1a" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
      {/* Menu bar */}
      <rect x={width * 0.08 + screenBezel} y={screenBezel} width={width * 0.84 - screenBezel * 2} height={18} rx="4" fill="rgba(255,255,255,0.04)" />
      <circle cx={width * 0.08 + screenBezel + 12} cy={screenBezel + 9} r="3" fill="#ff5f57" />
      <circle cx={width * 0.08 + screenBezel + 24} cy={screenBezel + 9} r="3" fill="#febc2e" />
      <circle cx={width * 0.08 + screenBezel + 36} cy={screenBezel + 9} r="3" fill="#28c840" />
      {/* Desktop content - code editor look */}
      <rect x={width * 0.12} y={screenBezel + 28} width={width * 0.25} height={screenH - screenBezel * 2 - 38} rx="4" fill="rgba(255,255,255,0.03)" />
      {/* Sidebar file list */}
      {[0,1,2,3,4,5,6,7].map(i => (
        <rect key={i} x={width * 0.13} y={screenBezel + 40 + i * 16} width={width * 0.18} height={8} rx="2" fill={`rgba(255,255,255,${i === 2 ? 0.12 : 0.04})`} />
      ))}
      {/* Code lines */}
      {[0,1,2,3,4,5,6,7,8,9,10,11,12,13].map(i => {
        const lineW = [0.35, 0.45, 0.28, 0.52, 0.33, 0.4, 0.48, 0.2, 0.38, 0.5, 0.3, 0.42, 0.55, 0.25][i];
        const lineC = ["#af52de","#5ac8fa","#ff9500","#fff","#34c759","#5ac8fa","#fff","#ff9500","#34c759","#af52de","#fff","#5ac8fa","#ff9500","#34c759"][i];
        return <rect key={i} x={width * 0.39} y={screenBezel + 36 + i * 14} width={width * lineW * 0.5} height={6} rx="1.5" fill={lineC} opacity="0.25" />;
      })}
      {/* Base */}
      <rect x="0" y={screenH} width={width} height={baseH} rx="2" fill={`linear-gradient(${color}, ${color})`} />
      <rect x="0" y={screenH} width={width} height={baseH} rx="2" fill="url(#macLid)" />
      {/* Trackpad notch */}
      <rect x={(width - width * 0.12) / 2} y={screenH + baseH - 1} width={width * 0.12} height={3} rx="1.5" fill="rgba(255,255,255,0.08)" />
      {/* Shine */}
      <rect x={width * 0.08} y="0" width={width * 0.84} height={screenH} rx="10" fill="url(#macShine)" />
    </svg>
  );
}

// ─── iPad ────────────────────────────────────────────────────────────────
export function IPadSVG({ color = "#7d7e80", width = 300, className = "" }: {
  color?: string; width?: number; className?: string;
}) {
  const h = width * 1.35;
  const bezel = width * 0.035;
  const r = width * 0.06;
  return (
    <svg width={width} height={h} viewBox={`0 0 ${width} ${h}`} className={className}>
      <defs>
        <linearGradient id="ipadScreen" x1="0" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor="#0d1b2a" />
          <stop offset="60%" stopColor="#16213e" />
          <stop offset="100%" stopColor="#1a1a3e" />
        </linearGradient>
        <linearGradient id="ipadFrame" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor={color} stopOpacity="0.85" />
        </linearGradient>
        <filter id="ipadShadow"><feDropShadow dx="0" dy="6" stdDeviation="14" floodOpacity="0.35"/></filter>
      </defs>
      <rect x="0" y="0" width={width} height={h} rx={r} fill="url(#ipadFrame)" filter="url(#ipadShadow)" />
      <rect x={bezel} y={bezel} width={width - bezel * 2} height={h - bezel * 2} rx={r - bezel} fill="url(#ipadScreen)" />
      {/* Camera */}
      <circle cx={width / 2} cy={bezel * 0.55 + 3} r="2" fill="#1a1a1a" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
      {/* Drawing app content */}
      <rect x={bezel + width * 0.05} y={bezel + h * 0.06} width={width * 0.55} height={h * 0.65} rx="6" fill="rgba(255,255,255,0.03)" />
      {/* Brush strokes */}
      <path d={`M${width * 0.15} ${h * 0.2} Q${width * 0.3} ${h * 0.15} ${width * 0.45} ${h * 0.25} T${width * 0.55} ${h * 0.35}`} fill="none" stroke="#ff9500" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
      <path d={`M${width * 0.12} ${h * 0.35} Q${width * 0.25} ${h * 0.3} ${width * 0.4} ${h * 0.4} T${width * 0.5} ${h * 0.48}`} fill="none" stroke="#5856d6" strokeWidth="4" strokeLinecap="round" opacity="0.4" />
      <path d={`M${width * 0.2} ${h * 0.5} Q${width * 0.35} ${h * 0.42} ${width * 0.5} ${h * 0.55}`} fill="none" stroke="#34c759" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
      {/* Toolbar right side */}
      <rect x={width * 0.68} y={bezel + h * 0.06} width={width * 0.22} height={h * 0.65} rx="6" fill="rgba(255,255,255,0.03)" />
      {[0,1,2,3,4,5].map(i => {
        const colors = ["#ff2d55","#ff9500","#ffcc00","#34c759","#5ac8fa","#af52de"];
        return <circle key={i} cx={width * 0.79} cy={bezel + h * 0.1 + i * (width * 0.06)} r={width * 0.02} fill={colors[i]} opacity="0.6" />;
      })}
      {/* Home indicator */}
      <rect x={(width - width * 0.25) / 2} y={h - bezel - width * 0.02} width={width * 0.25} height={3} rx="1.5" fill="rgba(255,255,255,0.25)" />
    </svg>
  );
}

// ─── Apple Watch ─────────────────────────────────────────────────────────
export function WatchSVG({ color = "#2c2c2e", width = 160, className = "" }: {
  color?: string; width?: number; className?: string;
}) {
  const h = width * 1.22;
  const caseR = width * 0.22;
  const bandW = width * 0.6;
  const bandH = width * 0.35;
  return (
    <svg width={width} height={h + bandH * 2} viewBox={`0 0 ${width} ${h + bandH * 2}`} className={className}>
      <defs>
        <linearGradient id="watchFace" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0a0a18" />
          <stop offset="100%" stopColor="#111128" />
        </linearGradient>
        <linearGradient id="watchCase" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0.8" />
        </linearGradient>
        <filter id="watchShadow"><feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.4"/></filter>
      </defs>
      {/* Top band */}
      <rect x={(width - bandW) / 2} y="0" width={bandW} height={bandH + caseR} rx={bandW * 0.1} fill={color} opacity="0.6" />
      {/* Bottom band */}
      <rect x={(width - bandW) / 2} y={bandH + h - caseR} width={bandW} height={bandH + caseR} rx={bandW * 0.1} fill={color} opacity="0.6" />
      {/* Case */}
      <rect x={(width - width * 0.82) / 2} y={bandH} width={width * 0.82} height={h} rx={caseR} fill="url(#watchCase)" filter="url(#watchShadow)" />
      {/* Screen */}
      <rect x={(width - width * 0.7) / 2} y={bandH + width * 0.08} width={width * 0.7} height={h - width * 0.16} rx={caseR - width * 0.04} fill="url(#watchFace)" />
      {/* Crown button */}
      <rect x={width * 0.88} y={bandH + h * 0.3} width={width * 0.06} height={h * 0.15} rx={width * 0.02} fill={color} stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
      {/* Side button */}
      <rect x={width * 0.88} y={bandH + h * 0.52} width={width * 0.05} height={h * 0.08} rx={width * 0.015} fill={color} stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
      {/* Activity Rings */}
      {[
        { r: width * 0.2, color: "#ff375f", dash: "82 30" },
        { r: width * 0.145, color: "#b4ff00", dash: "62 25" },
        { r: width * 0.09, color: "#00e0ff", dash: "38 20" },
      ].map((ring, i) => (
        <circle key={i} cx={width / 2} cy={bandH + h * 0.42} r={ring.r} fill="none"
          stroke={ring.color} strokeWidth={width * 0.04} strokeLinecap="round"
          strokeDasharray={ring.dash} opacity="0.9"
          className="watch-ring"
          style={{ transformOrigin: `${width / 2}px ${bandH + h * 0.42}px` }}
        />
      ))}
      {/* Time */}
      <text x={width / 2} y={bandH + h * 0.78} textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize={width * 0.1} fontWeight="300" fontFamily="-apple-system">9:41</text>
      {/* Complication dots */}
      <text x={width * 0.25} y={bandH + h * 0.86} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize={width * 0.06} fontFamily="-apple-system">72°</text>
      <text x={width * 0.75} y={bandH + h * 0.86} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize={width * 0.06} fontFamily="-apple-system">MON</text>
    </svg>
  );
}

// ─── AirPods Pro ─────────────────────────────────────────────────────────
export function AirPodsSVG({ width = 280, className = "" }: { width?: number; className?: string }) {
  const h = width * 0.85;
  return (
    <svg width={width} height={h} viewBox={`0 0 ${width} ${h}`} className={className}>
      <defs>
        <filter id="podShadow"><feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.25"/></filter>
        <radialGradient id="podBody" cx="0.35" cy="0.35" r="0.7">
          <stop offset="0%" stopColor="#f8f8f8" />
          <stop offset="100%" stopColor="#d8d8d8" />
        </radialGradient>
        <linearGradient id="podStem" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f0f0f0" />
          <stop offset="100%" stopColor="#dcdcdc" />
        </linearGradient>
        <linearGradient id="caseBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f5f5f5" />
          <stop offset="100%" stopColor="#e0e0e0" />
        </linearGradient>
      </defs>
      {/* Case */}
      <rect x={width * 0.15} y={h * 0.05} width={width * 0.7} height={h * 0.85} rx={width * 0.14} fill="url(#caseBg)" filter="url(#podShadow)" />
      {/* Case seam */}
      <line x1={width * 0.2} y1={h * 0.42} x2={width * 0.8} y2={h * 0.42} stroke="rgba(0,0,0,0.06)" strokeWidth="1.5" />
      {/* Case hinge */}
      <rect x={width * 0.35} y={h * 0.03} width={width * 0.3} height={h * 0.04} rx="3" fill="rgba(0,0,0,0.04)" />
      {/* LED indicator */}
      <circle cx={width / 2} cy={h * 0.47} r="3" fill="#34c759" opacity="0.7" />
      {/* Left AirPod */}
      <ellipse cx={width * 0.36} cy={h * 0.24} rx={width * 0.09} ry={width * 0.085} fill="url(#podBody)" />
      <rect x={width * 0.34} y={h * 0.28} width={width * 0.04} height={h * 0.13} rx="4" fill="url(#podStem)" />
      {/* Left ear tip */}
      <ellipse cx={width * 0.36} cy={h * 0.2} rx={width * 0.05} ry={width * 0.04} fill="rgba(0,0,0,0.04)" />
      {/* Right AirPod */}
      <ellipse cx={width * 0.64} cy={h * 0.24} rx={width * 0.09} ry={width * 0.085} fill="url(#podBody)" />
      <rect x={width * 0.62} y={h * 0.28} width={width * 0.04} height={h * 0.13} rx="4" fill="url(#podStem)" />
      {/* Right ear tip */}
      <ellipse cx={width * 0.64} cy={h * 0.2} rx={width * 0.05} ry={width * 0.04} fill="rgba(0,0,0,0.04)" />
      {/* Case bottom shine */}
      <ellipse cx={width / 2} cy={h * 0.65} rx={width * 0.25} ry={h * 0.12} fill="rgba(255,255,255,0.15)" />
      {/* Lightning/USB-C port */}
      <rect x={(width - 14) / 2} y={h * 0.88} width="14" height="4" rx="2" fill="rgba(0,0,0,0.08)" />
    </svg>
  );
}

// ─── Apple TV ────────────────────────────────────────────────────────────
export function AppleTVSVG({ width = 400, className = "" }: { width?: number; className?: string }) {
  const h = width * 0.6;
  const tvH = width * 0.48;
  return (
    <svg width={width} height={h} viewBox={`0 0 ${width} ${h}`} className={className}>
      <defs>
        <linearGradient id="tvScreen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0d1b2a" />
          <stop offset="50%" stopColor="#1a1a3e" />
          <stop offset="100%" stopColor="#16213e" />
        </linearGradient>
        <linearGradient id="tvBezel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2c2c2e" />
          <stop offset="100%" stopColor="#1a1a1a" />
        </linearGradient>
        <filter id="tvShadow"><feDropShadow dx="0" dy="6" stdDeviation="10" floodOpacity="0.35"/></filter>
      </defs>
      {/* TV frame */}
      <rect x={width * 0.02} y="0" width={width * 0.96} height={tvH} rx="8" fill="url(#tvBezel)" filter="url(#tvShadow)" />
      {/* Screen */}
      <rect x={width * 0.035} y="4" width={width * 0.93} height={tvH - 8} rx="4" fill="url(#tvScreen)" />
      {/* Content on screen - movie poster style */}
      <rect x={width * 0.06} y={tvH * 0.12} width={width * 0.3} height={tvH * 0.65} rx="6" fill="rgba(255,255,255,0.04)" />
      <rect x={width * 0.06} y={tvH * 0.12} width={width * 0.3} height={tvH * 0.65} rx="6" fill="linear-gradient(135deg, #533483, #0f3460)" opacity="0.3" />
      {/* Title text lines */}
      <rect x={width * 0.4} y={tvH * 0.2} width={width * 0.35} height="8" rx="2" fill="rgba(255,255,255,0.2)" />
      <rect x={width * 0.4} y={tvH * 0.2 + 16} width={width * 0.5} height="5" rx="1.5" fill="rgba(255,255,255,0.08)" />
      <rect x={width * 0.4} y={tvH * 0.2 + 28} width={width * 0.42} height="5" rx="1.5" fill="rgba(255,255,255,0.06)" />
      {/* Play button */}
      <circle cx={width * 0.44} cy={tvH * 0.55} r="14" fill="rgba(255,255,255,0.1)" />
      <polygon points={`${width * 0.435},${tvH * 0.535} ${width * 0.435},${tvH * 0.565} ${width * 0.455},${tvH * 0.55}`} fill="rgba(255,255,255,0.4)" />
      {/* Row of thumbnails */}
      {[0,1,2,3,4].map(i => (
        <rect key={i} x={width * 0.06 + i * (width * 0.17 + 8)} y={tvH * 0.82} width={width * 0.17} height={tvH * 0.12} rx="3" fill={`rgba(255,255,255,${0.03 + i * 0.01})`} />
      ))}
      {/* Stand */}
      <rect x={(width - width * 0.25) / 2} y={tvH} width={width * 0.25} height="4" rx="2" fill="#3a3a3c" />
      <rect x={(width - width * 0.35) / 2} y={tvH + 4} width={width * 0.35} height="6" rx="3" fill="#2c2c2e" />
    </svg>
  );
}

// ─── HomePod ─────────────────────────────────────────────────────────────
export function HomePodSVG({ width = 120, className = "" }: { width?: number; className?: string }) {
  const h = width * 1.3;
  return (
    <svg width={width} height={h} viewBox={`0 0 ${width} ${h}`} className={className}>
      <defs>
        <linearGradient id="hpBody" x1="0.3" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor="#3a3a3c" />
          <stop offset="50%" stopColor="#2c2c2e" />
          <stop offset="100%" stopColor="#1a1a1a" />
        </linearGradient>
        <radialGradient id="hpMesh" cx="0.5" cy="0.5" r="0.5">
          <stop offset="60%" stopColor="transparent" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.03)" />
        </radialGradient>
        <filter id="hpShadow"><feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.35"/></filter>
      </defs>
      {/* Body */}
      <ellipse cx={width / 2} cy={h * 0.85} rx={width * 0.42} ry={h * 0.14} fill="rgba(0,0,0,0.15)" />
      <path d={`M${width * 0.15},${h * 0.3} Q${width * 0.05},${h * 0.6} ${width * 0.15},${h * 0.85} Q${width * 0.3},${h * 0.95} ${width * 0.5},${h * 0.95} Q${width * 0.7},${h * 0.95} ${width * 0.85},${h * 0.85} Q${width * 0.95},${h * 0.6} ${width * 0.85},${h * 0.3} Q${width * 0.7},${h * 0.05} ${width * 0.5},${h * 0.05} Q${width * 0.3},${h * 0.05} ${width * 0.15},${h * 0.3}`} fill="url(#hpBody)" filter="url(#hpShadow)" />
      {/* Mesh texture lines */}
      {Array.from({ length: 12 }).map((_, i) => (
        <line key={i} x1={width * 0.2} y1={h * 0.2 + i * (h * 0.055)} x2={width * 0.8} y2={h * 0.2 + i * (h * 0.055)} stroke="rgba(255,255,255,0.025)" strokeWidth="0.8" />
      ))}
      {/* Top touchpad */}
      <ellipse cx={width / 2} cy={h * 0.12} rx={width * 0.22} ry={h * 0.06} fill="rgba(255,255,255,0.03)" />
      {/* Siri glow */}
      <ellipse cx={width / 2} cy={h * 0.12} rx={width * 0.1} ry={h * 0.025} fill="rgba(41,151,255,0.2)" className="siri-glow" />
    </svg>
  );
}

// ─── Vision Pro ──────────────────────────────────────────────────────────
export function VisionProSVG({ width = 360, className = "" }: { width?: number; className?: string }) {
  const h = width * 0.45;
  return (
    <svg width={width} height={h} viewBox={`0 0 ${width} ${h}`} className={className}>
      <defs>
        <linearGradient id="vpBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e0e0e0" />
          <stop offset="50%" stopColor="#c8c8ca" />
          <stop offset="100%" stopColor="#b0b0b2" />
        </linearGradient>
        <linearGradient id="vpGlass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1a1a2e" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#16213e" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#0a0a18" stopOpacity="0.9" />
        </linearGradient>
        <filter id="vpShadow"><feDropShadow dx="0" dy="6" stdDeviation="10" floodOpacity="0.3"/></filter>
        <linearGradient id="vpShine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="30%" stopColor="white" stopOpacity="0.15" />
          <stop offset="70%" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Main body */}
      <path d={`M${width * 0.08},${h * 0.55} Q${width * 0.08},${h * 0.15} ${width * 0.25},${h * 0.1} L${width * 0.75},${h * 0.1} Q${width * 0.92},${h * 0.15} ${width * 0.92},${h * 0.55} Q${width * 0.92},${h * 0.85} ${width * 0.75},${h * 0.9} L${width * 0.25},${h * 0.9} Q${width * 0.08},${h * 0.85} ${width * 0.08},${h * 0.55}`} fill="url(#vpBody)" filter="url(#vpShadow)" />
      {/* Glass front */}
      <path d={`M${width * 0.1},${h * 0.5} Q${width * 0.1},${h * 0.2} ${width * 0.26},${h * 0.15} L${width * 0.74},${h * 0.15} Q${width * 0.9},${h * 0.2} ${width * 0.9},${h * 0.5} Q${width * 0.9},${h * 0.8} ${width * 0.74},${h * 0.85} L${width * 0.26},${h * 0.85} Q${width * 0.1},${h * 0.8} ${width * 0.1},${h * 0.5}`} fill="url(#vpGlass)" />
      {/* Light seal cushion hints */}
      <path d={`M${width * 0.06},${h * 0.5} Q${width * 0.04},${h * 0.35} ${width * 0.08},${h * 0.25}`} fill="none" stroke="rgba(180,180,180,0.3)" strokeWidth="4" strokeLinecap="round" />
      <path d={`M${width * 0.94},${h * 0.5} Q${width * 0.96},${h * 0.35} ${width * 0.92},${h * 0.25}`} fill="none" stroke="rgba(180,180,180,0.3)" strokeWidth="4" strokeLinecap="round" />
      {/* Strap hints */}
      <rect x={width * 0.01} y={h * 0.35} width={width * 0.05} height={h * 0.3} rx="6" fill="rgba(200,200,200,0.3)" />
      <rect x={width * 0.94} y={h * 0.35} width={width * 0.05} height={h * 0.3} rx="6" fill="rgba(200,200,200,0.3)" />
      {/* Digital Crown */}
      <circle cx={width * 0.95} cy={h * 0.3} r="5" fill="#b0b0b2" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      {/* Shine band */}
      <rect x={width * 0.1} y={h * 0.46} width={width * 0.8} height="1.5" fill="url(#vpShine)" rx="0.75" />
    </svg>
  );
}
