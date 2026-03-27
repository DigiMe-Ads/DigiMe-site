import { NODES, EDGES, WEB_RINGS, WEB_CX, WEB_CY, TIER_RADIUS, dewDropsOnEdge } from './teamData'

/**
 * Renders all background web geometry:
 * concentric rings → radial spokes → silk strands + dew drops → centre anchor
 */
export default function SpiderWeb({ hovered }) {
  return (
    <>
      {/* ── Concentric ring polygons ── */}
      {WEB_RINGS.map((pts, ri) => (
        <polygon
          key={ri}
          className="team-web-ring"
          points={pts}
          fill="none"
          stroke={hovered !== null ? 'rgba(59,255,108,0.18)' : 'rgba(59,255,108,0.09)'}
          strokeWidth={ri === 0 ? 1.5 : 1}
          strokeLinejoin="round"
          style={{
            animation:        `webRingPulse ${4 + ri * 1.2}s ease-in-out infinite`,
            animationDelay:   `${ri * 0.6}s`,
            strokeDasharray:  '4 7',
            strokeDashoffset: 0,
          }}
        />
      ))}

      {/* ── Radial spokes from centre to each node ── */}
      {NODES.map((node, i) => {
        const dx    = node.x - WEB_CX
        const dy    = node.y - WEB_CY
        const dist  = Math.sqrt(dx * dx + dy * dy)
        const rBase = TIER_RADIUS[node.tier]
        const stop  = (dist - rBase - 6) / dist
        const end   = { x: WEB_CX + dx * stop, y: WEB_CY + dy * stop }

        const isHovNode = hovered === i
        const isConnected = hovered !== null && EDGES.some(
          ([a, b]) => (a === hovered && b === i) || (b === hovered && a === i)
        )

        return (
          <line
            key={i}
            className="team-spoke"
            x1={WEB_CX} y1={WEB_CY}
            x2={end.x}  y2={end.y}
            stroke={
              isHovNode || isConnected
                ? (node.tier === 1 ? 'rgba(15,145,30,0.65)' : 'rgba(59,255,108,0.45)')
                : 'rgba(59,255,108,0.08)'
            }
            strokeWidth={isHovNode ? 1.5 : 0.8}
            strokeLinecap="round"
            style={{
              animation:      `spokePulse ${5 + i * 0.4}s ease-in-out infinite`,
              animationDelay: `${i * 0.22}s`,
            }}
          />
        )
      })}

      {/* ── Silk strands (graph edges) + dew drops ── */}
      {EDGES.map(([a, b], i) => {
        const na = NODES[a], nb = NODES[b]
        const hovActive   = hovered !== null && (hovered === a || hovered === b)
        const hovInactive = hovered !== null && !hovActive
        const isDir       = a <= 1 || b <= 1

        // Slight curve toward centre for organic feel
        const mx   = (na.x + nb.x) / 2
        const my   = (na.y + nb.y) / 2
        const pull = hovActive ? 0.06 : 0.04
        const cx   = mx + (WEB_CX - mx) * pull
        const cy   = my + (WEB_CY - my) * pull

        // Trim endpoints to circle edges
        const dxa = nb.x - na.x, dya = nb.y - na.y
        const da  = Math.sqrt(dxa * dxa + dya * dya)
        const ra  = TIER_RADIUS[na.tier] + 4
        const rb  = TIER_RADIUS[nb.tier] + 4
        const ax  = na.x + (dxa / da) * ra
        const ay  = na.y + (dya / da) * ra
        const bx  = nb.x - (dxa / da) * rb
        const by  = nb.y - (dya / da) * rb

        const edgePath  = `M ${ax},${ay} Q ${cx},${cy} ${bx},${by}`
        const fullPath  = `M ${na.x},${na.y} Q ${cx},${cy} ${nb.x},${nb.y}`
        const strandColor = hovActive
          ? (isDir ? '#0f911e' : '#3bff6c')
          : (isDir ? 'rgba(15,145,30,0.38)' : 'rgba(59,255,108,0.15)')

        return (
          <g key={i}>
            {/* Glow bloom on active strands */}
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
              d={fullPath}
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

            {/* Silk sheen highlight */}
            <path
              d={fullPath}
              fill="none"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth={0.5}
              strokeLinecap="round"
              opacity={hovInactive ? 0 : hovActive ? 0.7 : 0.3}
              style={{
                animation:      `silkShimmer ${4 + i * 0.3}s ease-in-out infinite`,
                animationDelay: `${i * 0.15 + 0.5}s`,
              }}
            />

            {/* Dew drops on inactive strands */}
            {!hovActive && !hovInactive && dewDropsOnEdge(na.x, na.y, nb.x, nb.y, 2).map((d, di) => (
              <circle
                key={di}
                className="dew-drop"
                cx={d.x} cy={d.y}
                r={1.4}
                fill={isDir ? 'rgba(15,145,30,0.7)' : 'rgba(59,255,108,0.55)'}
                style={{
                  animation:      di % 2 === 0
                    ? `dewFloat ${3 + i * 0.25 + di * 0.8}s ease-in-out infinite`
                    : `dewFloatAlt ${3.5 + i * 0.2 + di * 0.6}s ease-in-out infinite`,
                  animationDelay: `${(i + di) * 0.35}s`,
                }}
              />
            ))}
          </g>
        )
      })}

      {/* ── Centre anchor ── */}
      <ellipse cx={WEB_CX} cy={WEB_CY} rx={55} ry={40} fill="url(#centerGlow)" />
      <circle
        cx={WEB_CX} cy={WEB_CY} r={8}
        fill="none" stroke="rgba(59,255,108,0.5)"
        strokeWidth={1} strokeDasharray="2 4"
        style={{ animation: 'spinRing 8s linear infinite' }}
      />
      <circle
        cx={WEB_CX} cy={WEB_CY} r={4}
        fill="rgba(59,255,108,0.6)"
        style={{ animation: 'centerPulse 2.8s ease-in-out infinite' }}
      />
    </>
  )
}