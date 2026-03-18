import { useState, useEffect } from 'react'
import { useScrollReveal } from '../../../hooks/useScrollReveal'

// ── Add/remove team members here ──
const TEAM = [
  { name: 'Andrew Abinash',     role: 'Director', image: '/images/Team/Andrew.png' },  // '/images/team/wade.jpg'
  { name: 'Romario De Silva', role: 'Director', image: '/images/Team/Romario.png' }, // '/images/team/leslie.jpg'
  { name: 'Sachira Delankawala',    role: 'Digital Marketing Executive', image: '/images/Team/Sachira-1-1.png' }, // '/images/team/eleanor.jpg'
  { name: 'Lakmal Udaya Kumara',     role: 'Creative Designer', image: '/images/Team/udaya.png' }, // '/images/team/charles.jpg'
  { name: 'Thulakshan', role: 'Video Editor', image: '/images/Team/Thulakshan.png' }, // '/images/team/charles.jpg'
]

const STYLES = `
  @media (max-width: 1200px) {
    .team-inner { padding-left: 120px !important; padding-right: 120px !important; }
  }
  @media (max-width: 992px) {
    .team-inner { padding-left: 60px !important; padding-right: 60px !important; }
    .team-grid  { grid-template-columns: repeat(2, 1fr) !important; }
  }
  @media (max-width: 768px) {
    .team-inner { padding-left: 24px !important; padding-right: 24px !important; }
  }
  @media (max-width: 480px) {
    .team-inner { padding-left: 16px !important; padding-right: 16px !important; }
    .team-grid  { grid-template-columns: 1fr !important; }
  }
`

export default function TeamGrid() {
  const gridReveal = useScrollReveal({ threshold: 0.06 })

  useEffect(() => {
    if (document.getElementById('team-styles')) return
    const s = document.createElement('style')
    s.id = 'team-styles'
    s.textContent = STYLES
    document.head.appendChild(s)
  }, [])

  return (
    <section
      id="team"
      style={{
        background:    '#0a0a0a',
        fontFamily:    "'Plus Jakarta Sans', sans-serif",
        paddingTop:    '80px',
        paddingBottom: '100px',
        overflow:      'hidden',
      }}
    >
      <div
        className="team-inner"
        style={{ paddingLeft: '285px', paddingRight: '285px' }}
      >
        <div
          ref={gridReveal.ref}
          className="team-grid"
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap:                 '20px',
            opacity:             gridReveal.isVisible ? 1 : 0,
            transform:           gridReveal.isVisible ? 'translateY(0)' : 'translateY(28px)',
            transition:          'opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          {TEAM.map((member, i) => (
            <TeamCard key={`${member.name}-${i}`} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TeamCard({ member, index }) {
  const [hovered, setHovered] = useState(false)

  // Stagger delay based on column position (0,1,2 → 0, 80, 160ms)
  const delay = (index % 3) * 80

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: '16px',
        overflow:     'hidden',
        background:   '#111111',
        border:       `1px solid ${hovered ? 'rgba(59,255,108,0.15)' : 'rgba(255,255,255,0.06)'}`,
        transition:   'transform 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.3s ease, box-shadow 0.35s ease',
        transform:    hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow:    hovered ? '0 20px 60px rgba(0,0,0,0.5)' : '0 4px 20px rgba(0,0,0,0.2)',
        cursor:       'default',
        animationDelay: `${delay}ms`,
      }}
    >
      {/* Photo area */}
      <div style={{
        position:   'relative',
        width:      '100%',
        aspectRatio:'3 / 4',
        overflow:   'hidden',
        background: '#1a1a1a',
      }}>
        {member.image ? (
          <img
            src={member.image}
            alt={member.name}
            style={{
              width:      '100%',
              height:     '100%',
              objectFit:  'cover',
              objectPosition: 'top center',
              display:    'block',
              transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
              transform:  hovered ? 'scale(1.04)' : 'scale(1)',
            }}
          />
        ) : (
          // Placeholder — dark gradient with subtle arrow watermark
          <div style={{
            width:      '100%',
            height:     '100%',
            background: 'linear-gradient(160deg, #1e1e1e 0%, #141414 100%)',
            display:    'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {/* Arrow watermark — matches the screenshot background pattern */}
            <svg
              width="80" height="80" viewBox="0 0 80 80" fill="none"
              style={{ opacity: 0.08 }}
            >
              <path d="M20 60 L40 10 L60 60" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <path d="M30 60 L40 35 L50 60" fill="white"/>
            </svg>
          </div>
        )}

        {/* Subtle gradient overlay at bottom of photo */}
        <div style={{
          position:   'absolute',
          bottom:     0,
          left:       0,
          right:      0,
          height:     '40%',
          background: 'linear-gradient(to top, rgba(10,10,10,0.6) 0%, transparent 100%)',
          pointerEvents: 'none',
        }} />

        {/* Green hover accent — top edge */}
        <div style={{
          position:   'absolute',
          top:        0,
          left:       0,
          right:      0,
          height:     '2px',
          background: '#0f911e',
          transform:  hovered ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1)',
        }} />
      </div>

      {/* Name + role */}
      <div style={{ padding: '18px 20px 20px' }}>
        <h4 style={{
          fontFamily:   "'Plus Jakarta Sans', sans-serif",
          fontSize:     '16px',
          fontWeight:   700,
          color:        '#ffffff',
          margin:       '0 0 4px',
          lineHeight:   1.3,
        }}>
          {member.name}
        </h4>
        <p style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize:   '12px',
          color:      'rgba(255,255,255,0.35)',
          margin:     0,
        }}>
          {member.role}
        </p>
      </div>
    </div>
  )
}