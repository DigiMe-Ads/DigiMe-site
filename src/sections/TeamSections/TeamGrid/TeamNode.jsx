import { EDGES, TIER_RADIUS, TIER_COLOR, TIER_STROKE } from './teamData'

/**
 * A single team member node in the spider web.
 * Handles its own visual state based on the global `hovered` index.
 */
export default function TeamNode({ node, index, hovered, onMouseEnter, onMouseLeave }) {
  const isHov  = hovered === index
  const isDir  = node.tier === 1
  const isMgmt = node.tier === 2
  const rBase  = TIER_RADIUS[node.tier]
  const r      = isHov ? Math.round(rBase * 1.22) : rBase
  const color  = TIER_COLOR[node.tier]
  const stroke = TIER_STROKE[node.tier]

  const nodeOpacity = hovered !== null && !isHov
    ? (EDGES.some(([a, b]) => (a === hovered && b === index) || (b === hovered && a === index)) ? 1 : 0.25)
    : 1

  return (
    <g
      className="team-node-g"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        transformOrigin: `${node.x}px ${node.y}px`,
        transition:      'opacity 0.35s ease',
        opacity:         nodeOpacity,
        animation:       `nodeIn 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.12}s both`,
        filter:          isHov ? 'drop-shadow(0 0 22px rgba(59,255,108,0.4))' : 'none',
      }}
    >
      {/* Director ambient halo */}
      {isDir && (
        <ellipse
          cx={node.x} cy={node.y}
          rx={r + 45} ry={r + 35}
          fill={`url(#halo-${index})`}
        />
      )}

      {/* Outer silk cocoon polygon */}
      <polygon
        points={Array.from({ length: 8 }, (_, k) => {
          const angle  = (Math.PI * 2 * k) / 8 - Math.PI / 2
          const jitter = isHov ? 1 : (1 + (((index * 7 + k * 3) % 9) - 4) * 0.04)
          const rad    = (r + (isHov ? 18 : 14)) * jitter
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
        cx={node.x} cy={node.y} r={r + 9}
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

      {/* Tier colour ring */}
      <circle
        cx={node.x} cy={node.y}
        r={isHov ? r + 6 : r + 4}
        fill="none"
        stroke={color}
        strokeWidth={isHov ? stroke + 1.2 : stroke}
        opacity={isHov ? 1 : (isDir ? 0.75 : 0.45)}
        style={{ transition: 'r 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease, stroke-width 0.4s ease' }}
      />

      {/* Dark background */}
      <circle cx={node.x} cy={node.y} r={r} fill="#080a08" />

      {/* Radial silk pattern inside node */}
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
            clipPath={`url(#clip-${index}${isHov ? '-hov' : ''})`}
          />
        )
      })}

      {/* Photo */}
      <image
        href={node.image}
        x={node.x - r} y={node.y - r}
        width={r * 2}  height={r * 2}
        clipPath={`url(#clip-${index}${isHov ? '-hov' : ''})`}
        preserveAspectRatio="xMidYMid slice"
        style={{
          filter:     isHov
            ? 'brightness(1.05) grayscale(0%)'
            : isDir
              ? 'brightness(0.85) saturate(0.9)'
              : 'grayscale(40%) brightness(0.72)',
          transition: 'filter 0.4s ease',
        }}
      />

      {/* Dim overlay */}
      <circle
        cx={node.x} cy={node.y} r={r}
        fill="rgba(0,0,0,0.28)"
        clipPath={`url(#clip-${index}${isHov ? '-hov' : ''})`}
        opacity={isHov ? 0 : 1}
        style={{ transition: 'opacity 0.4s ease' }}
      />

      {/* Dew drops on hover */}
      {isHov && Array.from({ length: 5 }, (_, k) => {
        const angle = (Math.PI * 2 * k) / 5 - Math.PI / 3
        return (
          <circle
            key={k}
            cx={node.x + (r + 5) * Math.cos(angle)}
            cy={node.y + (r + 5) * Math.sin(angle)}
            r={2.2}
            fill={isDir ? 'rgba(15,145,30,0.9)' : 'rgba(59,255,108,0.8)'}
            style={{
              animation:      `dewFloat ${1.5 + k * 0.3}s ease-in-out infinite`,
              animationDelay: `${k * 0.2}s`,
            }}
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
            textAnchor="middle" dominantBaseline="central"
            fill="#3bff6c" fontSize="8.5" fontWeight="700"
            letterSpacing="0.1em" fontFamily="'Plus Jakarta Sans', sans-serif"
          >
            DIRECTOR
          </text>
        </g>
      )}

      {/* First-name label (hidden on hover) */}
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
          <line
            x1={node.x} y1={node.y + r + 5}
            x2={node.x} y2={node.y + r + 12}
            stroke={isDir ? 'rgba(15,145,30,0.6)' : 'rgba(59,255,108,0.4)'}
            strokeWidth={1} strokeDasharray="2 2"
          />
          <rect
            x={node.x - 88} y={node.y + r + 12}
            width={176}      height={56}
            rx={9}
            fill="rgba(6,8,6,0.97)"
            stroke={isDir ? 'rgba(15,145,30,0.65)' : 'rgba(59,255,108,0.35)'}
            strokeWidth={isDir ? 1.5 : 1}
          />
          <rect
            x={node.x - 88} y={node.y + r + 12}
            width={176}      height={3}
            rx={9}
            fill={isDir ? '#0f911e' : 'rgba(59,255,108,0.5)'}
            opacity={0.85}
          />
          <text
            x={node.x} y={node.y + r + 34}
            textAnchor="middle" dominantBaseline="central"
            fill="#ffffff" fontSize="13" fontWeight="700"
            fontFamily="'Plus Jakarta Sans', sans-serif"
          >
            {node.name}
          </text>
          <text
            x={node.x} y={node.y + r + 52}
            textAnchor="middle" dominantBaseline="central"
            fill={isDir ? 'rgba(15,145,30,0.95)' : 'rgba(59,255,108,0.8)'}
            fontSize="10" fontWeight="400"
            fontFamily="'Plus Jakarta Sans', sans-serif"
          >
            {node.role}
          </text>
        </g>
      )}
    </g>
  )
}