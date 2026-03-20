import { useState, useEffect, useRef } from 'react'
import { useScrollReveal } from '../../../hooks/useScrollReveal'

const TEAM = [
  { name: 'Andrew Abinash',      role: 'Director',                          image: '/images/Team/Andrew.png',      tier: 1 },
  { name: 'Romario De Silva',    role: 'Director',                          image: '/images/Team/Romario.png',     tier: 1 },
  { name: 'Nalaka Madhushanka',  role: 'Asst. Manager - Digital Marketing', image: '/images/Team/Nalaka.png',      tier: 2 },
  { name: 'Lakmal Udaya Kumara', role: 'Creative Designer',                 image: '/images/Team/udaya.png',       tier: 3 },
  { name: 'Thulakshan',          role: 'Video Editor',                      image: '/images/Team/Thulakshan.png',  tier: 3 },
  { name: 'Sachira Delankawala', role: 'Digital Marketing Executive',       image: '/images/Team/Sachira-1-1.png', tier: 3 },
  { name: 'Chanka Herath',       role: 'Web Developer',                     image: '/images/Team/Chanka.png',      tier: 3 },
]

const CX = 450
const CY = 330

const NODES = [
  // Directors — increase separation
{ ...TEAM[0], x: CX - 100, y: CY },
{ ...TEAM[1], x: CX + 100, y: CY },

// Outer ring — increase radius from 220 → 260
{ ...TEAM[2], x: CX + 260 * Math.cos(-90  * Math.PI/180), y: CY + 260 * Math.sin(-90  * Math.PI/180) },
{ ...TEAM[3], x: CX + 260 * Math.cos(-18  * Math.PI/180), y: CY + 260 * Math.sin(-18  * Math.PI/180) },
{ ...TEAM[4], x: CX + 260 * Math.cos(54   * Math.PI/180), y: CY + 260 * Math.sin(54   * Math.PI/180) },
{ ...TEAM[5], x: CX + 260 * Math.cos(126  * Math.PI/180), y: CY + 260 * Math.sin(126  * Math.PI/180) },
{ ...TEAM[6], x: CX + 260 * Math.cos(198  * Math.PI/180), y: CY + 260 * Math.sin(198  * Math.PI/180) },
]

const EDGES = [
  [0, 1],             // directors to each other
  [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], // Andrew to all outer
  [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], // Romario to all outer
  [2, 3], [3, 4], [4, 5], [5, 6], [6, 2], // outer ring perimeter
]

const TIER_RADIUS = { 1: 58, 2: 46, 3: 37 }
const TIER_COLOR  = { 1: '#0f911e', 2: '#3bff6c', 3: 'rgba(59,255,108,0.45)' }
const TIER_STROKE = { 1: 3.5, 2: 2.5, 3: 1.5 }

// Web center point (visual anchor of the whole web)
const WEB_CX = CX
const WEB_CY = CY

// Concentric web ring polygons — approximate the radii with 8-sided polygons
// Each ring is defined by its polygon points
function makeWebRing(cx, cy, rx, ry, sides = 10) {
  const pts = []
  for (let i = 0; i < sides; i++) {
    const angle = (Math.PI * 2 * i) / sides - Math.PI / 2
    pts.push(`${(cx + rx * Math.cos(angle)).toFixed(1)},${(cy + ry * Math.sin(angle)).toFixed(1)}`)
  }
  return pts.join(' ')
}

// Radial spokes from center to each node + slightly beyond
function makeSpokeEnd(cx, cy, nx, ny, extend = 1.08) {
  const dx = nx - cx
  const dy = ny - cy
  return { x: cx + dx * extend, y: cy + dy * extend }
}

// Dew drop positions along an edge
function dewDropsOnEdge(x1, y1, x2, y2, count = 3) {
  const drops = []
  for (let i = 1; i <= count; i++) {
    const t = i / (count + 1)
    drops.push({ x: x1 + (x2 - x1) * t, y: y1 + (y2 - y1) * t })
  }
  return drops
}

const WEB_RINGS = [
  makeWebRing(WEB_CX, WEB_CY, 95,  70,  9),
  makeWebRing(WEB_CX, WEB_CY, 185, 140, 9),
  makeWebRing(WEB_CX, WEB_CY, 278, 215, 9),
  makeWebRing(WEB_CX, WEB_CY, 370, 285, 9),
]

const STYLES = `
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
  @keyframes dirGlow {
    0%,100% { opacity: 0.4; }
    50%      { opacity: 0.85; }
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
  @keyframes webBuild {
    from { stroke-dashoffset: 800; opacity: 0; }
    to   { stroke-dashoffset: 0;   opacity: 1; }
  }
  @keyframes ringBuild {
    from { stroke-dashoffset: 1200; opacity: 0; }
    to   { stroke-dashoffset: 0;    opacity: 1; }
  }

  .team-node-g {
    cursor: pointer;
  }
  .team-edge {
    transition: stroke 0.3s ease, stroke-width 0.3s ease, opacity 0.3s ease, stroke-dasharray 0.3s ease;
  }
  .team-web-ring {
    transition: opacity 0.4s ease, stroke 0.4s ease;
  }
  .team-spoke {
    transition: opacity 0.4s ease, stroke 0.4s ease, stroke-width 0.3s ease;
  }
  .dew-drop {
    transition: opacity 0.3s ease;
  }

  @media (max-width: 768px) {
    .spider-wrap  { display: none !important; }
    .mobile-grid  { display: grid !important; }
  }
  @media (min-width: 769px) {
    .mobile-grid  { display: none !important; }
  }
  @media (max-width: 480px) {
    .team-inner   { padding-left: 16px !important; padding-right: 16px !important; }
    .mobile-grid  { grid-template-columns: repeat(2,1fr) !important; }
  }
`

export default function TeamGrid() {
  const sectionReveal = useScrollReveal({ threshold: 0.08 })
  const [hovered, setHovered] = useState(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (document.getElementById('team-web-styles')) return
    const styleEl = document.createElement('style')
    styleEl.id = 'team-web-styles'
    styleEl.textContent = STYLES
    document.head.appendChild(styleEl)
    setTimeout(() => setMounted(true), 80)
  }, [])

  return (
    <section
      id="team"
      style={{
        background:    '#060608',
        fontFamily:    "'Plus Jakarta Sans', sans-serif",
        paddingTop:    '20px',
        paddingBottom: '120px',
        overflow:      'hidden',
        position:      'relative',
      }}
    >
      {/* Subtle vignette overlay */}
      <div style={{
        position:   'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)',
        zIndex:     0,
      }} />

      <div
        className="team-inner"
        style={{ paddingLeft: '80px', paddingRight: '80px', position: 'relative', zIndex: 1 }}
      >
        {/* ── Header ── */}
        <div
          ref={sectionReveal.ref}
          style={{
            textAlign:    'center',
            marginBottom: '40px',
            opacity:      sectionReveal.isVisible ? 1 : 0,
            transform:    sectionReveal.isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition:   'opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          {/* <p style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            fontSize: '11px', fontWeight: 600, letterSpacing: '0.22em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)',
            marginBottom: '14px',
          }}>
            <span style={{ color: '#3bff6c' }}>✦</span> The Team
          </p> */}
          {/* <h2 style={{
            fontFamily:    "'Plus Jakarta Sans', sans-serif",
            fontSize:      'clamp(2rem,3.5vw,3.2rem)',
            fontWeight:    800,
            lineHeight:    1.1,
            letterSpacing: '-0.02em',
            color:         '#ffffff',
            margin:        0,
          }}>
            The people behind<br />
            <span style={{ color: '#3bff6c', fontStyle: 'italic', fontWeight: 400 }}>
              the brand.
            </span>
          </h2> */}
        </div>

        {/* ── Desktop spider web ── */}
        <div
          className="spider-wrap"
          style={{
            position: 'relative',
            width:    '100%',
            maxWidth: '960px',
            margin:   '0 auto 40px',
          }}
        >
          <svg
            viewBox="0 0 900 650"
            preserveAspectRatio="xMidYMid meet"
            style={{ width: '100%', height: 'auto', overflow: 'visible', display: 'block' }}
          >
            <defs>
              {/* Clip paths */}
              {NODES.map((node, i) => {
                const rBase = TIER_RADIUS[node.tier]
                const rHov  = Math.round(rBase * 1.22)
                return (
                  <g key={i}>
                    <clipPath id={`clip-${i}`}>
                      <circle cx={node.x} cy={node.y} r={rBase} />
                    </clipPath>
                    <clipPath id={`clip-${i}-hov`}>
                      <circle cx={node.x} cy={node.y} r={rHov} />
                    </clipPath>
                  </g>
                )
              })}

              {/* Director ambient halo gradients */}
              {[0, 1].map(i => (
                <radialGradient key={i} id={`halo-${i}`} cx="50%" cy="50%" r="50%">
                  <stop offset="0%"   stopColor="rgba(15,145,30,0.22)" />
                  <stop offset="60%"  stopColor="rgba(15,145,30,0.07)" />
                  <stop offset="100%" stopColor="rgba(15,145,30,0)"    />
                </radialGradient>
              ))}

              {/* Center glow gradient */}
              <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%"   stopColor="rgba(59,255,108,0.35)" />
                <stop offset="60%"  stopColor="rgba(59,255,108,0.08)" />
                <stop offset="100%" stopColor="rgba(59,255,108,0)"    />
              </radialGradient>

              {/* Web silk gradient along strands */}
              <linearGradient id="silkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="rgba(59,255,108,0)" />
                <stop offset="50%"  stopColor="rgba(59,255,108,0.5)" />
                <stop offset="100%" stopColor="rgba(59,255,108,0)" />
              </linearGradient>

              {/* Node hover glow filter */}
              <filter id="node-glow" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="10" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Silk strand glow filter */}
              <filter id="silk-glow" x="-20%" y="-200%" width="140%" height="500%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Dew drop glow */}
              <filter id="dew-glow" x="-150%" y="-150%" width="400%" height="400%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* ══════════════════════════════════════
                WEB LAYER 1: Concentric ring polygons
            ══════════════════════════════════════ */}
            {WEB_RINGS.map((pts, ri) => (
              <polygon
                key={ri}
                className="team-web-ring"
                points={pts}
                fill="none"
                stroke={
                  hovered !== null
                    ? 'rgba(59,255,108,0.18)'
                    : 'rgba(59,255,108,0.09)'
                }
                strokeWidth={ri === 0 ? 1.5 : 1}
                strokeLinejoin="round"
                style={{
                  animation: `webRingPulse ${4 + ri * 1.2}s ease-in-out infinite`,
                  animationDelay: `${ri * 0.6}s`,
                  strokeDasharray: '4 7',
                  strokeDashoffset: 0,
                }}
              />
            ))}

            {/* ══════════════════════════════════════
                WEB LAYER 2: Radial spokes from center to nodes
            ══════════════════════════════════════ */}
            {NODES.map((node, i) => {
              const dx = node.x - WEB_CX
const dy = node.y - WEB_CY
const dist = Math.sqrt(dx * dx + dy * dy)
const rBase = TIER_RADIUS[node.tier]
const stopFraction = (dist - rBase - 6) / dist  // stops 6px before the circle edge
const end = { x: WEB_CX + dx * stopFraction, y: WEB_CY + dy * stopFraction }

              const isHovNode = hovered === i
              const isConnectedToHov = hovered !== null && EDGES.some(
                ([a, b]) => (a === hovered && b === i) || (b === hovered && a === i)
              )
              return (
                <line
                  key={i}
                  className="team-spoke"
                  x1={WEB_CX} y1={WEB_CY}
                  x2={end.x}  y2={end.y}
                  stroke={
                    isHovNode || isConnectedToHov
                      ? (node.tier === 1 ? 'rgba(15,145,30,0.65)' : 'rgba(59,255,108,0.45)')
                      : 'rgba(59,255,108,0.08)'
                  }
                  strokeWidth={isHovNode ? 1.5 : 0.8}
                  strokeLinecap="round"
                  style={{
                    animation: `spokePulse ${5 + i * 0.4}s ease-in-out infinite`,
                    animationDelay: `${i * 0.22}s`,
                  }}
                />
              )
            })}

            {/* ══════════════════════════════════════
                WEB LAYER 3: Silk strands (actual graph edges)
                — drawn as slightly curved paths for organic feel
            ══════════════════════════════════════ */}
            {EDGES.map(([a, b], i) => {
              const na = NODES[a], nb = NODES[b]
              const hovActive   = hovered !== null && (hovered === a || hovered === b)
              const hovInactive = hovered !== null && !hovActive
              const isDir       = a <= 1 || b <= 1

              // Slight curve — offset control point toward center
              const mx = (na.x + nb.x) / 2
              const my = (na.y + nb.y) / 2
              const pull = hovActive ? 0.06 : 0.04
              const cx  = mx + (WEB_CX - mx) * pull
              const cy  = my + (WEB_CY - my) * pull

              // Trim strand endpoints to circle edges
const dxa = nb.x - na.x, dya = nb.y - na.y
const da = Math.sqrt(dxa * dxa + dya * dya)
const ra = TIER_RADIUS[na.tier] + 4
const rb = TIER_RADIUS[nb.tier] + 4
const ax = na.x + (dxa / da) * ra
const ay = na.y + (dya / da) * ra
const bx = nb.x - (dxa / da) * rb
const by = nb.y - (dya / da) * rb
const edgePath = `M ${ax},${ay} Q ${cx},${cy} ${bx},${by}`

const strandColor = hovActive
  ? (isDir ? '#0f911e' : '#3bff6c')
  : (isDir ? 'rgba(15,145,30,0.38)' : 'rgba(59,255,108,0.15)')

return (
  <g key={i}>
    {hovActive && (
      <path
        d={edgePath}
                      fill="none"
                      stroke={isDir ? 'rgba(15,145,30,0.3)' : 'rgba(59,255,108,0.2)'}
                      strokeWidth={hovActive ? 8 : 4}
                      strokeLinecap="round"
                      filter="url(#silk-glow)"
                      opacity={0.6}
                    />
                  )}
                  {/* Main strand */}
                  <path
                    className="team-edge"
                    d={`M ${na.x},${na.y} Q ${cx},${cy} ${nb.x},${nb.y}`}
                    fill="none"
                    stroke={strandColor}
                    strokeWidth={hovActive ? (isDir ? 2.2 : 1.8) : (isDir ? 1.2 : 0.8)}
                    strokeDasharray={hovActive ? 'none' : '4 8'}
                    strokeLinecap="round"
                    opacity={hovInactive ? 0.05 : 1}
                    style={{
                      animation:      hovActive ? 'none' : `webPulse ${3.5 + i * 0.28}s ease-in-out infinite`,
                      animationDelay: `${i * 0.18}s`,
                    }}
                  />
                  {/* Thin highlight strand on top (silk sheen) */}
                  <path
                    d={`M ${na.x},${na.y} Q ${cx},${cy} ${nb.x},${nb.y}`}
                    fill="none"
                    stroke="rgba(255,255,255,0.12)"
                    strokeWidth={0.5}
                    strokeLinecap="round"
                    opacity={hovInactive ? 0 : hovActive ? 0.7 : 0.3}
                    style={{
                      animation: `silkShimmer ${4 + i * 0.3}s ease-in-out infinite`,
                      animationDelay: `${i * 0.15 + 0.5}s`,
                    }}
                  />
                  {/* Dew drops along inactive strands */}
                  {!hovActive && !hovInactive && dewDropsOnEdge(na.x, na.y, nb.x, nb.y, 2).map((d, di) => (
                    <circle
                      key={di}
                      className="dew-drop"
                      cx={d.x} cy={d.y}
                      r={1.4}
                      fill={isDir ? 'rgba(15,145,30,0.7)' : 'rgba(59,255,108,0.55)'}
                      style={{
                        animation: di % 2 === 0
                          ? `dewFloat ${3 + i * 0.25 + di * 0.8}s ease-in-out infinite`
                          : `dewFloatAlt ${3.5 + i * 0.2 + di * 0.6}s ease-in-out infinite`,
                        animationDelay: `${(i + di) * 0.35}s`,
                      }}
                    />
                  ))}
                </g>
              )
            })}

            {/* ══════════════════════════════════════
                CENTER ANCHOR — the web's origin point
            ══════════════════════════════════════ */}
            <ellipse
              cx={WEB_CX} cy={WEB_CY}
              rx={55} ry={40}
              fill="url(#centerGlow)"
            />
            <circle
              cx={WEB_CX} cy={WEB_CY}
              r={8}
              fill="none"
              stroke="rgba(59,255,108,0.5)"
              strokeWidth={1}
              strokeDasharray="2 4"
              style={{ animation: 'spinRing 8s linear infinite' }}
            />
            <circle
              cx={WEB_CX} cy={WEB_CY}
              r={4}
              fill="rgba(59,255,108,0.6)"
              style={{ animation: 'centerPulse 2.8s ease-in-out infinite' }}
            />

            {/* ══════════════════════════════════════
                NODES
            ══════════════════════════════════════ */}
            {NODES.map((node, i) => {
              const isHov  = hovered === i
              const isDir  = node.tier === 1
              const isMgmt = node.tier === 2
              const rBase  = TIER_RADIUS[node.tier]
              const r      = isHov ? Math.round(rBase * 1.22) : rBase
              const color  = TIER_COLOR[node.tier]
              const stroke = TIER_STROKE[node.tier]

              const nodeOpacity = hovered !== null && !isHov
                ? (EDGES.some(([a, b]) => (a === hovered && b === i) || (b === hovered && a === i)) ? 1 : 0.25)
                : 1

              return (
                <g
                  key={i}
                  className="team-node-g"
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    transformOrigin: `${node.x}px ${node.y}px`,
                    transition:      'opacity 0.35s ease',
                    opacity:         nodeOpacity,
                    animation:       `nodeIn 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s both`,
                    filter:          isHov ? 'drop-shadow(0 0 22px rgba(59,255,108,0.4))' : 'none',
                  }}
                >
                  {/* Director large ambient halo */}
                  {isDir && (
                    <ellipse
                      cx={node.x} cy={node.y}
                      rx={r + 45} ry={r + 35}
                      fill={`url(#halo-${i})`}
                    />
                  )}

                  {/* Outer silk web cocoon — irregular polygon approximating a web sac around node */}
                  <polygon
                    points={Array.from({ length: 8 }, (_, k) => {
                      const angle   = (Math.PI * 2 * k) / 8 - Math.PI / 2
                      const jitter  = isHov ? 1 : (1 + (((i * 7 + k * 3) % 9) - 4) * 0.04)
                      const rad     = (r + (isHov ? 18 : 14)) * jitter
                      return `${(node.x + rad * Math.cos(angle)).toFixed(1)},${(node.y + rad * Math.sin(angle)).toFixed(1)}`
                    }).join(' ')}
                    fill="none"
                    stroke={
                      isHov
                        ? (isDir ? 'rgba(15,145,30,0.6)' : isMgmt ? 'rgba(59,255,108,0.55)' : 'rgba(59,255,108,0.4)')
                        : (isDir ? 'rgba(15,145,30,0.25)' : 'rgba(59,255,108,0.1)')
                    }
                    strokeWidth={isHov ? 1.5 : 0.8}
                    strokeLinejoin="round"
                    strokeDasharray={isDir ? (isHov ? '3 5' : '2 7') : '1.5 8'}
                    style={{
                      animation: isDir
                        ? `spinRing ${isHov ? 4 : 15}s linear infinite`
                        : isHov ? 'spinRingRev 6s linear infinite' : 'none',
                    }}
                  />

                  {/* Inner spinning ring */}
                  <circle
                    cx={node.x} cy={node.y}
                    r={r + 9}
                    fill="none"
                    stroke={
                      isHov
                        ? (isDir ? 'rgba(15,145,30,0.85)' : isMgmt ? 'rgba(59,255,108,0.75)' : 'rgba(59,255,108,0.55)')
                        : (isDir ? 'rgba(15,145,30,0.4)' : 'rgba(59,255,108,0.1)')
                    }
                    strokeWidth={isHov ? (isDir ? 1.8 : 1.2) : (isDir ? 1.2 : 0.7)}
                    strokeDasharray={isDir ? '3 7' : '2 10'}
                    strokeLinecap="round"
                    style={{
                      animation: isDir
                        ? `spinRing ${isHov ? 3 : 12}s linear infinite`
                        : isHov ? 'spinRing 5s linear infinite' : 'none',
                    }}
                  />

                  {/* Outer tier colour ring */}
                  <circle
                    cx={node.x} cy={node.y}
                    r={isHov ? r + 6 : r + 4}
                    fill="none"
                    stroke={color}
                    strokeWidth={isHov ? stroke + 1.2 : stroke}
                    opacity={isHov ? 1 : (isDir ? 0.75 : 0.45)}
                    style={{ transition: 'r 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease, stroke-width 0.4s ease' }}
                  />

                  {/* Dark background circle */}
                  <circle cx={node.x} cy={node.y} r={r} fill="#080a08" />

                  {/* Radial silk pattern inside node bg (subtle) */}
                  {Array.from({ length: 6 }, (_, k) => {
                    const angle = (Math.PI * 2 * k) / 6
                    return (
                      <line
                        key={k}
                        x1={node.x} y1={node.y}
                        x2={node.x + r * Math.cos(angle)}
                        y2={node.y + r * Math.sin(angle)}
                        stroke={isDir ? 'rgba(15,145,30,0.08)' : 'rgba(59,255,108,0.05)'}
                        strokeWidth={0.5}
                        clipPath={`url(#clip-${i}${isHov ? '-hov' : ''})`}
                      />
                    )
                  })}

                  {/* Photo */}
                  <image
                    className="team-node-img"
                    href={node.image}
                    x={node.x - r} y={node.y - r}
                    width={r * 2}  height={r * 2}
                    clipPath={`url(#clip-${i}${isHov ? '-hov' : ''})`}
                    preserveAspectRatio="xMidYMid slice"
                    style={{
                      filter: isHov
                        ? 'brightness(1.05) grayscale(0%)'
                        : isDir
                          ? 'brightness(0.85) saturate(0.9)'
                          : 'grayscale(40%) brightness(0.72)',
                      transition: 'filter 0.4s ease',
                    }}
                  />

                  {/* Dim overlay */}
                  <circle
                    className="team-node-overlay"
                    cx={node.x} cy={node.y} r={r}
                    fill="rgba(0,0,0,0.28)"
                    clipPath={`url(#clip-${i}${isHov ? '-hov' : ''})`}
                    opacity={isHov ? 0 : 1}
                    style={{ transition: 'opacity 0.4s ease' }}
                  />

                  {/* Dew drops on the node ring (hover only) */}
                  {isHov && Array.from({ length: 5 }, (_, k) => {
                    const angle = (Math.PI * 2 * k) / 5 - Math.PI / 3
                    return (
                      <circle
                        key={k}
                        cx={node.x + (r + 5) * Math.cos(angle)}
                        cy={node.y + (r + 5) * Math.sin(angle)}
                        r={2.2}
                        fill={isDir ? 'rgba(15,145,30,0.9)' : 'rgba(59,255,108,0.8)'}
                        style={{ animation: `dewFloat ${1.5 + k * 0.3}s ease-in-out infinite`, animationDelay: `${k * 0.2}s` }}
                      />
                    )
                  })}

                  {/* Director badge */}
                  {isDir && (
                    <g>
                      <rect
                        x={node.x - 30} y={node.y - r - 24}
                        width={60}       height={18}
                        rx={9}
                        fill="#0a5c12"
                        stroke="rgba(15,145,30,0.8)"
                        strokeWidth={1}
                        opacity={0.95}
                      />
                      <text
                        x={node.x} y={node.y - r - 15}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill="#3bff6c"
                        fontSize="8.5"
                        fontWeight="700"
                        letterSpacing="0.1em"
                        fontFamily="'Plus Jakarta Sans', sans-serif"
                      >
                        DIRECTOR
                      </text>
                    </g>
                  )}

                  {/* First name label */}
                  <text
                    x={node.x} y={node.y + r + 18}
                    textAnchor="middle"
                    fill={isDir ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.38)'}
                    fontSize={isDir ? '13' : '11'}
                    fontWeight={isDir ? '600' : '400'}
                    fontFamily="'Plus Jakarta Sans', sans-serif"
                    style={{ opacity: isHov ? 0 : 1, transition: 'opacity 0.18s ease' }}
                  >
                    {node.name.split(' ')[0]}
                  </text>

                  {/* Hover tooltip */}
                  {isHov && (
                    <g style={{ animation: 'tooltipIn 0.22s ease both' }}>
                      {/* Tooltip connector line */}
                      <line
                        x1={node.x} y1={node.y + r + 5}
                        x2={node.x} y2={node.y + r + 12}
                        stroke={isDir ? 'rgba(15,145,30,0.6)' : 'rgba(59,255,108,0.4)'}
                        strokeWidth={1}
                        strokeDasharray="2 2"
                      />
                      <rect
                        x={node.x - 88} y={node.y + r + 12}
                        width={176}      height={56}
                        rx={9}
                        fill="rgba(6,8,6,0.97)"
                        stroke={isDir ? 'rgba(15,145,30,0.65)' : 'rgba(59,255,108,0.35)'}
                        strokeWidth={isDir ? 1.5 : 1}
                      />
                      {/* Top accent bar on tooltip */}
                      <rect
                        x={node.x - 88} y={node.y + r + 12}
                        width={176}      height={3}
                        rx={9}
                        fill={isDir ? '#0f911e' : 'rgba(59,255,108,0.5)'}
                        opacity={0.85}
                      />
                      <text
                        x={node.x} y={node.y + r + 34}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill="#ffffff"
                        fontSize="13"
                        fontWeight="700"
                        fontFamily="'Plus Jakarta Sans', sans-serif"
                      >
                        {node.name}
                      </text>
                      <text
                        x={node.x} y={node.y + r + 52}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill={isDir ? 'rgba(15,145,30,0.95)' : 'rgba(59,255,108,0.8)'}
                        fontSize="10"
                        fontWeight="400"
                        fontFamily="'Plus Jakarta Sans', sans-serif"
                      >
                        {node.role}
                      </text>
                    </g>
                  )}
                </g>
              )
            })}
          </svg>

          {/* ── Legend ── */}
          {/* <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', marginTop: '0px' }}>
            {[
              { color: '#0f911e',              shadow: '0 0 6px rgba(15,145,30,0.7)',  label: 'Directors'  },
              { color: '#3bff6c',              shadow: '0 0 5px rgba(59,255,108,0.6)', label: 'Management' },
              { color: 'rgba(59,255,108,0.4)', shadow: 'none',                         label: 'Team'       },
            ].map(t => (
              <div key={t.label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '6px', height: '6px', borderRadius: '50%',
                  background: t.color, boxShadow: t.shadow, flexShrink: 0,
                }} />
                <span style={{
                  fontFamily:    "'Plus Jakarta Sans', sans-serif",
                  fontSize:      '10.5px',
                  color:         'rgba(255,255,255,0.28)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}>
                  {t.label}
                </span>
              </div>
            ))}
          </div> */}
        </div>

        {/* ── Mobile card grid ── */}
        <div
          className="mobile-grid"
          style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}
        >
          {TEAM.map((member, i) => (
            <MobileCard key={i} member={member} />
          ))}
        </div>
      </div>
    </section>
  )
}

function MobileCard({ member }) {
  const [hovered, setHovered] = useState(false)
  const isDir = member.tier === 1

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: '12px',
        overflow:     'hidden',
        background:   '#0d0d0d',
        border:       `1px solid ${hovered ? (isDir ? 'rgba(15,145,30,0.5)' : 'rgba(59,255,108,0.2)') : isDir ? 'rgba(15,145,30,0.25)' : 'rgba(255,255,255,0.05)'}`,
        transition:   'transform 0.3s ease, border-color 0.3s ease',
        transform:    hovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', background: '#111' }}>
        {member.image && (
          <img
            src={member.image}
            alt={member.name}
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              objectPosition: 'top center', display: 'block',
              transform:  hovered ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 0.5s ease',
            }}
          />
        )}
        <div style={{
          position:        'absolute', top: 0, left: 0, right: 0, height: '2px',
          background:      isDir ? '#0f911e' : '#3bff6c',
          transform:       hovered ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition:      'transform 0.35s ease',
        }} />
        {isDir && (
          <div style={{
            position:      'absolute', top: '8px', right: '8px',
            background:    '#0a5c12',
            border:        '1px solid rgba(15,145,30,0.7)',
            borderRadius:  '6px',
            padding:       '3px 7px',
            fontSize:      '8px',
            fontWeight:    700,
            letterSpacing: '0.1em',
            color:         '#3bff6c',
            fontFamily:    "'Plus Jakarta Sans', sans-serif",
          }}>
            DIRECTOR
          </div>
        )}
        <div style={{
          position:      'absolute', bottom: 0, left: 0, right: 0, height: '45%',
          background:    'linear-gradient(to top, rgba(0,0,0,0.75), transparent)',
          pointerEvents: 'none',
        }} />
      </div>
      <div style={{ padding: '10px 12px 12px' }}>
        <h4 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize:   isDir ? '14px' : '13px',
          fontWeight: 700,
          color:      '#ffffff',
          margin:     '0 0 3px',
          lineHeight: 1.3,
        }}>
          {member.name}
        </h4>
        <p style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize:   '10px',
          color:      isDir ? 'rgba(15,145,30,0.9)' : 'rgba(255,255,255,0.3)',
          margin:     0,
          lineHeight: 1.4,
        }}>
          {member.role}
        </p>
      </div>
    </div>
  )
}