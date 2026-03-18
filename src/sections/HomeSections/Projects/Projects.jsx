import { useState, useEffect } from 'react'
import { useScrollReveal } from '../../../hooks/useScrollReveal'

const PROJECTS = [
  { name: 'NIDAHAS',      type: '2026',    image: '/images/Home/Projects/Nidahas.png' },
  { name: 'MAYS TABLE',         type: '2026',    image: '/images/Home/Projects/Mays-Table.png' },
  { name: 'MIRISSA', type: '2026',    image: '/images/Home/Projects/Mirissa.png' },
]

const BREAKPOINTS = `
  @media (max-width: 1200px) {
    .projects-wrap { padding-left: 120px !important; padding-right: 80px !important; }
  }
  @media (max-width: 992px) {
    .projects-wrap        { padding-left: 60px !important; padding-right: 60px !important; }
    .projects-row         { flex-direction: column !important; }
    .projects-col-left    { width: 100% !important; max-width: 100% !important; }
    .projects-col-right   { width: 100% !important; max-width: 100% !important; }
    .projects-sticky-left { position: static !important; padding-bottom: 2rem !important; }
    .projects-geo         { display: none !important; }
  }
  @media (max-width: 768px) {
    .projects-wrap { padding-left: 24px !important; padding-right: 24px !important; }
  }
  @media (max-width: 480px) {
    .projects-wrap { padding-left: 16px !important; padding-right: 16px !important; }
  }
`

export default function Projects() {
  const leftReveal = useScrollReveal({ threshold: 0.1 })
  const r0 = useScrollReveal({ threshold: 0.15 })
  const r1 = useScrollReveal({ threshold: 0.15 })
  const r2 = useScrollReveal({ threshold: 0.15 })
  const r3 = useScrollReveal({ threshold: 0.15 })
  const cardReveals = [r0, r1, r2, r3]

  useEffect(() => {
    if (document.getElementById('projects-bp')) return
    const s = document.createElement('style')
    s.id = 'projects-bp'
    s.textContent = BREAKPOINTS
    document.head.appendChild(s)
  }, [])

  return (
    <section
      id="projects"
      style={{
        background: '#0a0a0a',
        padding:    '100px 0',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        overflow:   'visible',   // ← must NOT be hidden — breaks sticky
      }}
    >
      <div
        className="projects-wrap"
        style={{ paddingLeft: '285px', paddingRight: '120px' }}
      >
        {/*
          ROW — mimics Bootstrap's .row behaviour.
          Key rules that make sticky work:
            - display: flex
            - align-items: stretch  (both cols same height = right col drives height)
            - overflow: visible     (hidden breaks sticky)
          The left col's INNER div gets position:sticky, not the col itself.
          The col just stretches to match the right col's height,
          giving the sticky element room to travel.
        */}
        <div
          className="projects-row"
          style={{
            display:    'flex',
            alignItems: 'stretch',   // ← cols match height, sticky has room to scroll
            gap:        '48px',
            overflow:   'visible',
          }}
        >

          {/* ── LEFT COL: ~33% width, no overflow ── */}
          <div
            className="projects-col-left"
            style={{
              width:    '33%',
              maxWidth: '300px',
              flexShrink: 0,
              overflow: 'visible',
            }}
          >
            {/*
              STICKY INNER — this is what actually sticks.
              top: 100px matches navbar height + breathing room.
              padding-bottom keeps content from touching the bottom edge.
            */}
            <div
              className="projects-sticky-left"
              ref={leftReveal.ref}
              style={{
                position:      'sticky',
                top:           '100px',
                paddingBottom: '3rem',
                opacity:       leftReveal.isVisible ? 1 : 0,
                transform:     leftReveal.isVisible ? 'translateX(0)' : 'translateX(-24px)',
                transition:    'opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1)',
              }}
            >
              {/* Eyebrow */}
              <p style={{
                display:       'flex',
                alignItems:    'center',
                gap:           '8px',
                fontSize:      '11px',
                fontWeight:    600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color:         'rgba(255,255,255,0.45)',
                marginBottom:  '12px',
              }}>
                <span style={{ color: '#0f911e', fontSize: '10px' }}>✦</span>
                Projects
              </p>

              {/* Heading */}
              <h2 style={{
                fontFamily:   "'Plus Jakarta Sans', sans-serif",
                fontSize:     'clamp(2rem, 3vw, 3rem)',
                fontWeight:   700,
                lineHeight:   1.1,
                color:        '#ffffff',
                marginBottom: '24px',
              }}>
                Our selected<br />
                <span style={{ color: '#0f911e' }}>projects</span>
              </h2>

              {/* Description */}
              <p style={{
                fontSize:     '14px',
                lineHeight:   1.7,
                color:        'rgba(255,255,255,0.4)',
                maxWidth:     '28ch',
                marginBottom: '28px',
              }}>
                A selection of our finest work across branding, development, and digital design.
              </p>

              {/* CTA */}
              <a
              href='/portfolio'
              rel="noopener noreferrer"
                style={{
                  display:      'inline-flex',
                  alignItems:   'center',
                  gap:          '8px',
                  background:   '#0f911e',
                  color:        '#0a0a0a',
                  fontFamily:   "'Plus Jakarta Sans', sans-serif",
                  fontSize:     '13px',
                  fontWeight:   600,
                  border:       'none',
                  borderRadius: '100px',
                  padding:      '10px 16px 10px 20px',
                  cursor:       'none',
                  marginBottom: '48px',
                  transition:   'background 0.25s ease, transform 0.25s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#5fff8a'
                  e.currentTarget.style.transform  = 'translateY(-2px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = '#0f911e'
                  e.currentTarget.style.transform  = 'translateY(0)'
                }}
              >
                All Projects
                <span style={{
                  width:          '28px',
                  height:         '28px',
                  background:     'rgba(0,0,0,0.18)',
                  borderRadius:   '50%',
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                }}>
                  <svg width="8" height="8" viewBox="0 0 8 8">
                    <circle cx="4" cy="4" r="4" fill="white" opacity=".5"/>
                    <circle cx="4" cy="4" r="1.5" fill="white"/>
                  </svg>
                </span>
              </a>

              {/* Geo image + glow */}
              <div
                className="projects-geo"
                style={{ position: 'relative', width: '160px' }}
              >
                <div style={{
                  position:      'absolute',
                  top:           '50%',
                  left:          '50%',
                  transform:     'translate(-50%, -50%)',
                  width:         '140px',
                  height:        '140px',
                  borderRadius:  '50%',
                  background:    'radial-gradient(ellipse at center, rgba(180,200,20,0.35) 0%, transparent 70%)',
                  filter:        'blur(22px)',
                  pointerEvents: 'none',
                  zIndex:        0,
                }} />
                <img
                  src="/images/Home/geo-shape.png"
                  alt=""
                  aria-hidden="true"
                  style={{
                    position:  'relative',
                    zIndex:    1,
                    width:     '100%',
                    height:    'auto',
                    display:   'block',
                    animation: 'geoFloat 6s ease-in-out infinite',
                  }}
                />
              </div>

            </div>
          </div>

          {/* ── RIGHT COL: takes remaining space, drives section height ── */}
          <div
            className="projects-col-right"
            style={{ flex: 1, minWidth: 0 }}
          >
            {PROJECTS.map((project, i) => {
              const { ref, isVisible } = cardReveals[i]
              return (
                <ProjectCard
                  key={project.name}
                  project={project}
                  revealRef={ref}
                  isVisible={isVisible}
                  delay={i * 80}
                  index={i}
                />
              )
            })}
          </div>

        </div>
      </div>

      <style>{`
        @keyframes geoFloat {
          0%, 100% { transform: translateY(0px)   rotate(0deg); }
          50%       { transform: translateY(-14px) rotate(6deg); }
        }
      `}</style>
    </section>
  )
}

function ProjectCard({ project, revealRef, isVisible, delay, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      ref={revealRef}
      style={{
        background:    '#111111',
        border:        `1px solid ${hovered ? 'rgba(59,255,108,0.25)' : 'rgba(255,255,255,0.07)'}`,
        borderRadius:  '12px',
        overflow:      'hidden',
        marginBottom:  '24px',
        opacity:       isVisible ? 1 : 0,
        transform:     isVisible
          ? hovered ? 'translateY(-5px)' : 'translateY(0)'
          : 'translateY(32px)',
        transition:    `opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms,
                        border-color 0.35s ease`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Thumbnail */}
      <div style={{
        position:    'relative',
        width:       '100%',
        aspectRatio: '16 / 7',
        overflow:    'hidden',
      }}>
        {project.image ? (
          <img
            src={project.image}
            alt={project.name}
            style={{
              width:      '100%',
              height:     '100%',
              objectFit:  'cover',
              display:    'block',
              transform:  hovered ? 'scale(1.04)' : 'scale(1)',
              transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
            }}
          />
        ) : (
          <div style={{
            width:      '100%',
            height:     '100%',
            background: `linear-gradient(135deg,
              hsl(${120 + index * 40}, 15%, 12%) 0%,
              hsl(${120 + index * 40}, 10%, 8%)  100%)`,
            transform:  hovered ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
          }} />
        )}

        {/* Hover overlay */}
        <div style={{
          position:       'absolute',
          inset:          0,
          background:     'rgba(0,0,0,0.55)',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          opacity:        hovered ? 1 : 0,
          transition:     'opacity 0.35s ease',
        }}>
          <span style={{
            fontSize:      '0.85rem',
            fontWeight:    600,
            letterSpacing: '0.1em',
            color:         '#ffffff',
            border:        '1px solid rgba(255,255,255,0.3)',
            padding:       '10px 22px',
            borderRadius:  '100px',
            transform:     hovered ? 'translateY(0)' : 'translateY(10px)',
            transition:    'transform 0.35s cubic-bezier(0.16,1,0.3,1)',
            display:       'inline-block',
          }}>
            View Project ↗
          </span>
        </div>
      </div>

      {/* Meta */}
      <div style={{
        display:        'flex',
        justifyContent: 'space-between',
        alignItems:     'center',
        padding:        '1rem 1.5rem 1.2rem',
      }}>
        <div>
          <h3 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize:   '1.05rem',
            fontWeight: 600,
            color:      '#ffffff',
            margin:     '0 0 4px',
          }}>
            {project.name}
          </h3>
          <p style={{
            fontSize: '0.8rem',
            color:    'rgba(255,255,255,0.4)',
            margin:   0,
          }}>
            {project.type}
          </p>
        </div>

        <span style={{
          fontSize:   '1.2rem',
          color:      hovered ? '#0f911e' : 'rgba(255,255,255,0.4)',
          transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1), color 0.25s ease',
          transform:  hovered ? 'translateX(5px)' : 'translateX(0)',
          display:    'block',
        }}>
          →
        </span>
      </div>
    </div>
  )
}