import { useEffect, useRef, useState } from 'react'
import { useScrollReveal } from '../../../hooks/useScrollReveal'

// ── What flashes across the ticker ──
const TICKER_ITEMS = [
  { text: '150+ Projects Delivered', accent: false },
  { text: '★', accent: true,  small: true },
  { text: 'Social Media', accent: false },
  { text: '✦', accent: true,  small: true },
  { text: 'Photography', accent: false },
  { text: '●', accent: true,  small: true },
  { text: 'Videography', accent: false },
  { text: '✦', accent: true,  small: true },
  { text: 'Web Development', accent: true },
  { text: '★', accent: false, small: true },
  { text: '98% Client Satisfaction', accent: false },
  { text: '✦', accent: true,  small: true },
  { text: 'Brand Identity', accent: false },
  { text: '●', accent: true,  small: true },
  { text: 'UI / UX Design', accent: false },
  { text: '✦', accent: true,  small: true },
  { text: '12 Years Experience', accent: false },
  { text: '★', accent: true,  small: true },
]

const STATS = [
  { value: 150, suffix: '+', label: 'Projects' },
  { value: 98,  suffix: '%', label: 'Satisfaction' },
  { value: 12,  suffix: '+', label: 'Years' },
  { value: 40,  suffix: '+', label: 'Team Members' },
]

// The 4 capability pillars — the brand story
const PILLARS = [
  {
    num:   '01',
    title: 'Social Media',
    body:  'Strategy, content creation, community management — we grew brands before websites were part of the plan.',
    tag:   'Where we started',
    tagColor: 'rgba(255,255,255,0.15)',
  },
  {
    num:   '02',
    title: 'Photography & Video',
    body:  'Studio-quality visual storytelling. Product shoots, brand films, reels — content that stops the scroll.',
    tag:   'Our craft',
    tagColor: 'rgba(255,255,255,0.15)',
  },
  {
    num:   '03',
    title: 'Web Development',
    body:  'Now we build the stage too. Pixel-perfect, performance-first sites that are as sharp as the content on them.',
    tag:   'New capability',
    tagColor: 'rgba(59,255,108,0.2)',
    tagTextColor: '#3bff6c',
  },
  {
    num:   '04',
    title: 'Full-Stack Digital',
    body:  'Strategy → visuals → web → growth. One agency, zero handoffs, total ownership of your digital presence.',
    tag:   'The full picture',
    tagColor: 'rgba(59,255,108,0.08)',
    tagTextColor: '#3bff6c',
  },
]

const STYLES = `
  @keyframes tickerScroll {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  @keyframes counterUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes pillarsLineIn {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }
  @keyframes glowDrift {
    0%, 100% { transform: translate(-50%, -50%) scale(1);    opacity: 0.6; }
    50%       { transform: translate(-50%, -52%) scale(1.1); opacity: 0.9; }
  }
  .ticker-track { display: flex; width: max-content; }
  .ticker-track:hover { animation-play-state: paused !important; }
  .pillar-card {
    transition: background 0.35s ease, border-color 0.35s ease, transform 0.35s cubic-bezier(0.16,1,0.3,1);
  }
  .pillar-card:hover {
    background: #161616 !important;
    border-color: rgba(59,255,108,0.2) !important;
    transform: translateY(-6px) !important;
  }
  .pillar-card:hover .pillar-num { color: #3bff6c !important; }
  .pillar-card:hover .pillar-title { color: #ffffff !important; }

  @media (max-width: 1200px) {
    .stats-pillars-inner { padding-left: 120px !important; padding-right: 120px !important; }
  }
  @media (max-width: 992px) {
    .stats-pillars-inner { padding-left: 60px !important; padding-right: 60px !important; }
    .pillars-grid { grid-template-columns: repeat(2,1fr) !important; }
    .stats-row    { gap: 32px !important; }
  }
  @media (max-width: 768px) {
    .stats-pillars-inner { padding-left: 24px !important; padding-right: 24px !important; }
    .stats-row    { flex-wrap: wrap !important; gap: 24px !important; }
    .stat-item    { flex: 1 1 40% !important; }
  }
  @media (max-width: 600px) {
    .pillars-grid { grid-template-columns: 1fr !important; }
  }
  @media (max-width: 480px) {
    .stats-pillars-inner { padding-left: 16px !important; padding-right: 16px !important; }
  }
`

export default function StatsPillars() {
  const headReveal    = useScrollReveal({ threshold: 0.1 })
  const statsReveal   = useScrollReveal({ threshold: 0.1 })
  const pillarsReveal = useScrollReveal({ threshold: 0.06 })

  useEffect(() => {
    if (document.getElementById('stats-pillars-styles')) return
    const s = document.createElement('style')
    s.id = 'stats-pillars-styles'
    s.textContent = STYLES
    document.head.appendChild(s)
  }, [])

  return (
    <section
      id="stats-pillars"
      style={{
        position:   'relative',
        background: '#0a0a0a',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        overflow:   'hidden',
      }}
    >

      {/* ════════════════════════════════════════
          1. TICKER STRIP
      ════════════════════════════════════════ */}
      <div style={{
        borderTop:    '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding:      '18px 0',
        overflow:     'hidden',
        position:     'relative',
        background:   '#0d0d0d',
      }}>
        {/* Left fade */}
        <div style={{
          position:'absolute', top:0, left:0, width:'120px', height:'100%',
          background:'linear-gradient(to right, #0d0d0d, transparent)',
          zIndex:2, pointerEvents:'none',
        }} />
        {/* Right fade */}
        <div style={{
          position:'absolute', top:0, right:0, width:'120px', height:'100%',
          background:'linear-gradient(to left, #0d0d0d, transparent)',
          zIndex:2, pointerEvents:'none',
        }} />

        <div
          className="ticker-track"
          style={{ animation: 'tickerScroll 28s linear infinite' }}
        >
          {/* Double the items so the loop is seamless */}
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span
              key={i}
              style={{
                fontFamily:    "'Plus Jakarta Sans', sans-serif",
                fontSize:      item.small ? '10px' : '13px',
                fontWeight:    item.small ? 400 : 600,
                color:         item.accent ? '#3bff6c' : 'rgba(255,255,255,0.5)',
                letterSpacing: item.small ? '0' : '0.08em',
                textTransform: 'uppercase',
                whiteSpace:    'nowrap',
                padding:       '0 28px',
                lineHeight:    1,
              }}
            >
              {item.text}
            </span>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════
          2. BOLD STATEMENT + STATS ROW
      ════════════════════════════════════════ */}
      <div
        className="stats-pillars-inner"
        style={{
          paddingLeft:  '285px',
          paddingRight: '285px',
          paddingTop:   '100px',
          paddingBottom:'80px',
        }}
      >

        {/* Statement row */}
        <div
          ref={headReveal.ref}
          style={{
            display:      'flex',
            alignItems:   'flex-end',
            gap:          '60px',
            marginBottom: '80px',
            opacity:      headReveal.isVisible ? 1 : 0,
            transform:    headReveal.isVisible ? 'translateY(0)' : 'translateY(32px)',
            transition:   'opacity 0.9s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          {/* Big headline — left */}
          <div style={{ flex: 1 }}>
            <p style={{
              display:       'flex',
              alignItems:    'center',
              gap:           '8px',
              fontSize:      '11px',
              fontWeight:    600,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color:         'rgba(255,255,255,0.35)',
              marginBottom:  '20px',
            }}>
              <span style={{ color: '#3bff6c' }}>✦</span> What We Bring
            </p>

            <h2 style={{
              fontFamily:    "'Plus Jakarta Sans', sans-serif",
              fontSize:      'clamp(2.4rem, 4.5vw, 5rem)',
              fontWeight:    800,
              lineHeight:    1.05,
              letterSpacing: '-0.03em',
              color:         '#ffffff',
              margin:        0,
            }}>
              Not just a<br />
              website agency.{' '}
              <span style={{
                color:      '#3bff6c',
                fontStyle:  'italic',
                fontWeight: 400,
              }}>
                A full<br />digital operation.
              </span>
            </h2>
          </div>

          {/* Right: desc + stats */}
          <div style={{ width: '40%', flexShrink: 0 }}>
            <p style={{
              fontFamily:   "'Plus Jakarta Sans', sans-serif",
              fontSize:     '15px',
              lineHeight:   '26px',
              color:        'rgba(255,255,255,0.45)',
              marginBottom: '48px',
              maxWidth:     '40ch',
            }}>
              We started with content and grew into code.
              Most agencies do one or the other — we do the whole thing,
              under one roof, with one unified strategy.
            </p>

            {/* Stats row */}
            <div
              className="stats-row"
              ref={statsReveal.ref}
              style={{ display: 'flex', gap: '40px' }}
            >
              {STATS.map((stat, i) => (
                <CountStat
                  key={stat.label}
                  stat={stat}
                  index={i}
                  isVisible={statsReveal.isVisible}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════
            3. PILLARS GRID — the brand story
        ════════════════════════════════════════ */}
        <div
          ref={pillarsReveal.ref}
          className="pillars-grid"
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap:                 '12px',
            opacity:             pillarsReveal.isVisible ? 1 : 0,
            transform:           pillarsReveal.isVisible ? 'translateY(0)' : 'translateY(28px)',
            transition:          'opacity 0.8s ease 0.1s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s',
          }}
        >
          {PILLARS.map((pillar, i) => (
            <PillarCard key={pillar.num} pillar={pillar} index={i} />
          ))}
        </div>

      </div>

    </section>
  )
}

// ── Animated count-up number ──
function CountStat({ stat, index, isVisible }) {
  const [count,   setCount]   = useState(0)
  const [started, setStarted] = useState(false)
  const rafRef = useRef(null)

  useEffect(() => {
    if (!isVisible || started) return
    setStarted(true)
    const duration = 1600
    const delay    = index * 140
    const start    = performance.now() + delay
    const ease     = t => 1 - Math.pow(1 - t, 4)

    const tick = (now) => {
      if (now < start) { rafRef.current = requestAnimationFrame(tick); return }
      const p = Math.min((now - start) / duration, 1)
      setCount(Math.round(ease(p) * stat.value))
      if (p < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [isVisible])

  return (
    <div
      className="stat-item"
      style={{
        animation: isVisible
          ? `counterUp 0.6s ease ${index * 0.12}s both`
          : 'none',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '1px' }}>
        <span style={{
          fontFamily:    "'Plus Jakarta Sans', sans-serif",
          fontSize:      'clamp(1.8rem, 2.5vw, 2.8rem)',
          fontWeight:    800,
          color:         '#ffffff',
          letterSpacing: '-0.04em',
          lineHeight:    1,
          fontVariantNumeric: 'tabular-nums',
        }}>
          {count}
        </span>
        <span style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize:   '1.1rem',
          fontWeight: 700,
          color:      '#3bff6c',
        }}>
          {stat.suffix}
        </span>
      </div>
      <p style={{
        fontFamily:    "'Plus Jakarta Sans', sans-serif",
        fontSize:      '11px',
        fontWeight:    600,
        color:         'rgba(255,255,255,0.3)',
        margin:        '4px 0 0',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
      }}>
        {stat.label}
      </p>
    </div>
  )
}

// ── Individual pillar card ──
function PillarCard({ pillar, index }) {
  return (
    <div
      className="pillar-card"
      style={{
        background:    '#111111',
        border:        '1px solid rgba(255,255,255,0.07)',
        borderRadius:  '14px',
        padding:       '28px 24px 24px',
        cursor:        'default',
        // Stagger reveal via delay
        transitionDelay: `${index * 0.06}s`,
        position:      'relative',
        overflow:      'hidden',
      }}
    >
      {/* Top accent line */}
      <div style={{
        position:        'absolute',
        top:             0, left: 0, right: 0,
        height:          '2px',
        background:      pillar.tagTextColor
          ? `linear-gradient(90deg, #3bff6c, transparent)`
          : 'linear-gradient(90deg, rgba(255,255,255,0.15), transparent)',
        transformOrigin: 'left',
      }} />

      {/* Number */}
      <span
        className="pillar-num"
        style={{
          fontFamily:    "'Plus Jakarta Sans', sans-serif",
          fontSize:      '12px',
          fontWeight:    700,
          color:         pillar.tagTextColor || 'rgba(255,255,255,0.2)',
          letterSpacing: '0.1em',
          display:       'block',
          marginBottom:  '40px',
          transition:    'color 0.3s ease',
        }}
      >
        {pillar.num}
      </span>

      {/* Title */}
      <h3
        className="pillar-title"
        style={{
          fontFamily:   "'Plus Jakarta Sans', sans-serif",
          fontSize:     'clamp(1rem, 1.4vw, 1.2rem)',
          fontWeight:   700,
          color:        'rgba(255,255,255,0.8)',
          margin:       '0 0 12px',
          lineHeight:   1.2,
          transition:   'color 0.3s ease',
        }}
      >
        {pillar.title}
      </h3>

      {/* Body */}
      <p style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize:   '13px',
        lineHeight: '21px',
        color:      'rgba(255,255,255,0.35)',
        margin:     '0 0 20px',
      }}>
        {pillar.body}
      </p>

      {/* Tag pill */}
      <span style={{
        display:       'inline-block',
        fontFamily:    "'Plus Jakarta Sans', sans-serif",
        fontSize:      '10px',
        fontWeight:    600,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color:         pillar.tagTextColor || 'rgba(255,255,255,0.4)',
        background:    pillar.tagColor,
        borderRadius:  '100px',
        padding:       '4px 12px',
      }}>
        {pillar.tag}
      </span>
    </div>
  )
}