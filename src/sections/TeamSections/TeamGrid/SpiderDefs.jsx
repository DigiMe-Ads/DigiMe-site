import { NODES, TIER_RADIUS } from './teamData'

/**
 * All reusable SVG <defs> for the spider web:
 * clip paths, radial gradients, filters.
 * Rendered once inside the <svg> element.
 */
export default function SpiderDefs() {
  return (
    <defs>
      {/* Per-node clip paths (normal + hovered size) */}
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

      {/* Center glow */}
      <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%"   stopColor="rgba(59,255,108,0.35)" />
        <stop offset="60%"  stopColor="rgba(59,255,108,0.08)" />
        <stop offset="100%" stopColor="rgba(59,255,108,0)"    />
      </radialGradient>

      {/* Silk gradient along strands */}
      <linearGradient id="silkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"   stopColor="rgba(59,255,108,0)" />
        <stop offset="50%"  stopColor="rgba(59,255,108,0.5)" />
        <stop offset="100%" stopColor="rgba(59,255,108,0)" />
      </linearGradient>

      {/* Node hover glow */}
      <filter id="node-glow" x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation="10" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* Silk strand glow */}
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
  )
}