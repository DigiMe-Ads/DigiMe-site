import { useState, useEffect } from 'react'
import { useScrollReveal } from '../../../hooks/useScrollReveal'
import { TEAM, NODES, TEAM_STYLES } from './teamData'
import SpiderDefs from './SpiderDefs'
import SpiderWeb  from './SpiderWeb'
import TeamNode   from './TeamNode'
import MobileCard from './MobileCard'

export default function TeamGrid() {
  const sectionReveal = useScrollReveal({ threshold: 0.08 })
  const [hovered, setHovered] = useState(null)

  useEffect(() => {
    if (document.getElementById('team-web-styles')) return
    const styleEl = document.createElement('style')
    styleEl.id = 'team-web-styles'
    styleEl.textContent = TEAM_STYLES
    document.head.appendChild(styleEl)
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
      {/* Vignette overlay */}
      <div style={{
        position:      'absolute',
        inset:         0,
        pointerEvents: 'none',
        background:    'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)',
        zIndex:        0,
      }} />

      <div
        className="team-inner"
        style={{ paddingLeft: '80px', paddingRight: '80px', position: 'relative', zIndex: 1 }}
      >
        {/* Header */}
        <div
          ref={sectionReveal.ref}
          style={{
            textAlign:    'center',
            marginBottom: '40px',
            opacity:      sectionReveal.isVisible ? 1 : 0,
            transform:    sectionReveal.isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition:   'opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1)',
          }}
        />

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
            <SpiderDefs />
            <SpiderWeb hovered={hovered} />

            {NODES.map((node, i) => (
              <TeamNode
                key={i}
                node={node}
                index={i}
                hovered={hovered}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              />
            ))}
          </svg>
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