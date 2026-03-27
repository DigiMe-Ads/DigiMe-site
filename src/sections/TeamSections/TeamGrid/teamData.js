// ─── Team members ─────────────────────────────────────────────────────────────
export const TEAM = [
  { name: 'Andrew Abinash',      role: 'Director',                          image: '/images/Team/Andrew.png',      tier: 1 },
  { name: 'Romario De Silva',    role: 'Director',                          image: '/images/Team/Romario.png',     tier: 1 },
  { name: 'Nalaka Madhushanka',  role: 'Asst. Manager - Digital Marketing', image: '/images/Team/Nalaka.png',      tier: 2 },
  { name: 'Lakmal Udaya Kumara', role: 'Creative Designer',                 image: '/images/Team/udaya.png',       tier: 3 },
  { name: 'Thulakshan',          role: 'Video Editor',                      image: '/images/Team/Thulakshan.png',  tier: 3 },
  { name: 'Sachira Delankawala', role: 'Digital Marketing Executive',       image: '/images/Team/Sachira-1-1.png', tier: 3 },
  { name: 'Chanka Herath',       role: 'Web Developer',                     image: '/images/Team/Chanka.png',      tier: 3 },
]

// ─── SVG canvas centre ────────────────────────────────────────────────────────
export const CX = 450
export const CY = 330

// Web centre (visual anchor)
export const WEB_CX = CX
export const WEB_CY = CY

// ─── Node positions ───────────────────────────────────────────────────────────
export const NODES = [
  { ...TEAM[0], x: CX - 100, y: CY },
  { ...TEAM[1], x: CX + 100, y: CY },
  { ...TEAM[2], x: CX + 260 * Math.cos(-90  * Math.PI / 180), y: CY + 260 * Math.sin(-90  * Math.PI / 180) },
  { ...TEAM[3], x: CX + 260 * Math.cos(-18  * Math.PI / 180), y: CY + 260 * Math.sin(-18  * Math.PI / 180) },
  { ...TEAM[4], x: CX + 260 * Math.cos( 54  * Math.PI / 180), y: CY + 260 * Math.sin( 54  * Math.PI / 180) },
  { ...TEAM[5], x: CX + 260 * Math.cos(126  * Math.PI / 180), y: CY + 260 * Math.sin(126  * Math.PI / 180) },
  { ...TEAM[6], x: CX + 260 * Math.cos(198  * Math.PI / 180), y: CY + 260 * Math.sin(198  * Math.PI / 180) },
]

// ─── Graph edges ──────────────────────────────────────────────────────────────
export const EDGES = [
  [0, 1],
  [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
  [1, 2], [1, 3], [1, 4], [1, 5], [1, 6],
  [2, 3], [3, 4], [4, 5], [5, 6], [6, 2],
]

// ─── Node visual constants ────────────────────────────────────────────────────
export const TIER_RADIUS = { 1: 58, 2: 46, 3: 37 }
export const TIER_COLOR  = { 1: '#0f911e', 2: '#3bff6c', 3: 'rgba(59,255,108,0.45)' }
export const TIER_STROKE = { 1: 3.5, 2: 2.5, 3: 1.5 }

// ─── Geometry helpers ─────────────────────────────────────────────────────────

/** Build a regular n-sided polygon approximating a web ring */
export function makeWebRing(cx, cy, rx, ry, sides = 10) {
  const pts = []
  for (let i = 0; i < sides; i++) {
    const angle = (Math.PI * 2 * i) / sides - Math.PI / 2
    pts.push(`${(cx + rx * Math.cos(angle)).toFixed(1)},${(cy + ry * Math.sin(angle)).toFixed(1)}`)
  }
  return pts.join(' ')
}

/** Evenly-spaced dew drop positions along an edge */
export function dewDropsOnEdge(x1, y1, x2, y2, count = 3) {
  const drops = []
  for (let i = 1; i <= count; i++) {
    const t = i / (count + 1)
    drops.push({ x: x1 + (x2 - x1) * t, y: y1 + (y2 - y1) * t })
  }
  return drops
}

// ─── Pre-computed web rings ───────────────────────────────────────────────────
export const WEB_RINGS = [
  makeWebRing(WEB_CX, WEB_CY,  95,  70, 9),
  makeWebRing(WEB_CX, WEB_CY, 185, 140, 9),
  makeWebRing(WEB_CX, WEB_CY, 278, 215, 9),
  makeWebRing(WEB_CX, WEB_CY, 370, 285, 9),
]

// ─── Global styles ────────────────────────────────────────────────────────────
export const TEAM_STYLES = `
  @keyframes webPulse {
    0%,100% { opacity: 0.1; }
    50%      { opacity: 0.38; }
  }
  @keyframes webRingPulse {
    0%,100% { opacity: 0.07; }
    50%      { opacity: 0.22; }
  }
  @keyframes spokePulse {
    0%,100% { opacity: 0.05; }
    50%      { opacity: 0.18; }
  }
  @keyframes nodeIn {
    from { opacity: 0; transform: scale(0.35); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes tooltipIn {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes spinRing {
    from { stroke-dashoffset: 0; }
    to   { stroke-dashoffset: -200; }
  }
  @keyframes spinRingRev {
    from { stroke-dashoffset: 0; }
    to   { stroke-dashoffset: 200; }
  }
  @keyframes dewFloat {
    0%,100% { opacity: 0.55; transform: scale(1); }
    50%      { opacity: 0.85; transform: scale(1.35); }
  }
  @keyframes dewFloatAlt {
    0%,100% { opacity: 0.3; transform: scale(0.9); }
    50%      { opacity: 0.65; transform: scale(1.2); }
  }
  @keyframes centerPulse {
    0%,100% { r: 6; opacity: 0.5; }
    50%      { r: 9; opacity: 0.9; }
  }
  @keyframes silkShimmer {
    0%,100% { stroke-opacity: 0.12; }
    50%      { stroke-opacity: 0.32; }
  }

  .team-node-g  { cursor: pointer; }
  .team-edge    { transition: stroke 0.3s ease, stroke-width 0.3s ease, opacity 0.3s ease, stroke-dasharray 0.3s ease; }
  .team-web-ring { transition: opacity 0.4s ease, stroke 0.4s ease; }
  .team-spoke   { transition: opacity 0.4s ease, stroke 0.4s ease, stroke-width 0.3s ease; }
  .dew-drop     { transition: opacity 0.3s ease; }

  @media (max-width: 768px) {
    .spider-wrap { display: none !important; }
    .mobile-grid { display: grid !important; }
  }
  @media (min-width: 769px) {
    .mobile-grid { display: none !important; }
  }
  @media (max-width: 480px) {
    .team-inner  { padding-left: 16px !important; padding-right: 16px !important; }
    .mobile-grid { grid-template-columns: repeat(2,1fr) !important; }
  }
`