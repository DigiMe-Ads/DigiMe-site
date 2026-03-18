import { useEffect, useRef, useState } from 'react'

// ── Each panel is a full-screen cinematic capability showcase ──
// Drop real images/videos into the `bg` field
const PANELS = [
  {
    index:    '01',
    category: 'Social Media',
    headline: ['Scroll-stopping', 'content that', 'builds empires.'],
    sub:      'Strategy · Content · Community · Growth',
    stat:     { n: '2.4M', label: 'Organic reach generated' },
    accent:   '#3bff6c',
    bg:       null,  // '/images/cinematic/social.jpg'
    // Gradient fallback per panel
    grad:     'radial-gradient(ellipse at 30% 60%, rgba(59,255,108,0.15) 0%, transparent 60%)',
    pattern:  'grid',
  },
  {
    index:    '02',
    category: 'Photography',
    headline: ['Every frame', 'a deliberate', 'decision.'],
    sub:      'Product · Brand · Editorial · Campaign',
    stat:     { n: '500+', label: 'Shoots delivered' },
    accent:   '#ffe566',
    bg:       null,  // '/images/cinematic/photo.jpg'
    grad:     'radial-gradient(ellipse at 70% 40%, rgba(255,229,102,0.12) 0%, transparent 60%)',
    pattern:  'dots',
  },
  {
    index:    '03',
    category: 'Videography',
    headline: ['Motion that', 'moves people', 'to act.'],
    sub:      'Brand Films · Reels · Motion Graphics · Ads',
    stat:     { n: '180+', label: 'Videos produced' },
    accent:   '#ff6b6b',
    bg:       null,  // '/images/cinematic/video.jpg'
    grad:     'radial-gradient(ellipse at 20% 70%, rgba(255,107,107,0.12) 0%, transparent 60%)',
    pattern:  'lines',
  },
  {
    index:    '04',
    category: 'Web Development',
    headline: ['Sites as bold', 'as the brands', 'behind them.'],
    sub:      'Design · Development · Performance · Launch',
    stat:     { n: 'New', label: 'Capability — built different' },
    accent:   '#3bff6c',
    bg:       null,  // '/images/cinematic/web.jpg'
    grad:     'radial-gradient(ellipse at 60% 30%, rgba(59,255,108,0.18) 0%, transparent 55%)',
    pattern:  'grid',
    isNew:    true,
  },
]

const STYLES = `
  @keyframes cinPanelIn {
    from { opacity: 0; transform: translateY(60px) skewY(2deg); }
    to   { opacity: 1; transform: translateY(0)     skewY(0deg); }
  }
  @keyframes cinLineExpand {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }
  @keyframes cinGlow {
    0%, 100% { opacity: 0.5; transform: scale(1); }
    50%       { opacity: 1;   transform: scale(1.08); }
  }
  @keyframes cinDotPulse {
    0%, 100% { opacity: 0.03; }
    50%       { opacity: 0.07; }
  }
  @keyframes cinProgress {
    from { width: 0%; }
    to   { width: 100%; }
  }
  @keyframes cinNewBadge {
    0%, 100% { transform: scale(1)   rotate(-2deg); }
    50%       { transform: scale(1.05) rotate(2deg);  }
  }
  .cin-panel-nav-dot {
    transition: width 0.3s ease, background 0.3s ease, opacity 0.3s ease;
  }
`

export default function CinematicShowcase() {
  const [active,    setActive]    = useState(0)
  const [prev,      setPrev]      = useState(null)
  const [animKey,   setAnimKey]   = useState(0)
  const [progKey,   setProgKey]   = useState(0)
  const [autoplay,  setAutoplay]  = useState(true)
  const timerRef  = useRef(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    if (document.getElementById('cin-showcase-styles')) return
    const s = document.createElement('style')
    s.id = 'cin-showcase-styles'
    s.textContent = STYLES
    document.head.appendChild(s)
  }, [])

  // Autoplay — cycles every 4.5s
  useEffect(() => {
    if (!autoplay) return
    timerRef.current = setTimeout(() => {
      goTo((active + 1) % PANELS.length)
    }, 4500)
    return () => clearTimeout(timerRef.current)
  }, [active, autoplay])

  const goTo = (i) => {
    if (i === active) return
    clearTimeout(timerRef.current)
    setPrev(active)
    setActive(i)
    setAnimKey(k => k + 1)
    setProgKey(k => k + 1)
  }

  const panel   = PANELS[active]
  const accent  = panel.accent

  return (
    <section
      ref={sectionRef}
      id="cinematic-showcase"
      style={{
        position:   'relative',
        background: '#080808',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        overflow:   'hidden',
        height:     '100vh',
        minHeight:  '640px',
        maxHeight:  '900px',
        paddingBottom: '80px',
        marginBottom: '80px',
      }}
      onMouseEnter={() => setAutoplay(false)}
      onMouseLeave={() => setAutoplay(true)}
    >

      {/* ── Background image layer ── */}
      {PANELS.map((p, i) => (
        <div
          key={i}
          style={{
            position:   'absolute',
            inset:      0,
            zIndex:     0,
            opacity:    i === active ? 1 : 0,
            transition: 'opacity 0.9s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          {p.bg ? (
            <img src={p.bg} alt="" style={{
              width: '100%', height: '100%', objectFit: 'cover',
              transform: i === active ? 'scale(1.04)' : 'scale(1.08)',
              transition: 'transform 5s ease',
            }} />
          ) : (
            // Fallback — atmospheric dark gradient per panel
            <div style={{
              width: '100%', height: '100%',
              background: `#080808`,
            }} />
          )}
        </div>
      ))}

      {/* ── Accent glow ── */}
      <div
        key={`glow-${active}`}
        style={{
          position:      'absolute',
          inset:         0,
          background:    panel.grad,
          zIndex:        1,
          pointerEvents: 'none',
          animation:     'cinGlow 6s ease-in-out infinite',
          transition:    'background 1s ease',
        }}
      />

      {/* ── Dark overlay ── */}
      <div style={{
        position:   'absolute', inset: 0, zIndex: 2,
        background: 'linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.7) 100%)',
        pointerEvents: 'none',
      }} />

      {/* ── Background pattern (grid / dots / lines) ── */}
      <BgPattern key={active} pattern={panel.pattern} accent={accent} />

      {/* ══════════════════════════
          MAIN CONTENT
      ══════════════════════════ */}
      <div style={{
        position:   'relative',
        zIndex:     4,
        height:     '100%',
        display:    'flex',
        flexDirection: 'column',
        padding:    'clamp(80px,10vw,120px) clamp(24px,8vw,140px) 0',
      }}>

        {/* Top bar — index + category + nav dots */}
        <div style={{
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          marginBottom:   'auto',
        }}>
          {/* Index */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{
              fontFamily:    "'Plus Jakarta Sans', sans-serif",
              fontSize:      '11px',
              fontWeight:    700,
              letterSpacing: '0.3em',
              color:         accent,
              textTransform: 'uppercase',
            }}>
              {panel.index} / {String(PANELS.length).padStart(2,'0')}
            </span>
            <div style={{
              width: '40px', height: '1px',
              background: accent, opacity: 0.5,
            }} />
            <span style={{
              fontFamily:    "'Plus Jakarta Sans', sans-serif",
              fontSize:      '11px',
              fontWeight:    600,
              letterSpacing: '0.22em',
              color:         'rgba(255,255,255,0.4)',
              textTransform: 'uppercase',
            }}>
              {panel.category}
            </span>
          </div>

          {/* Nav dots */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {PANELS.map((_, i) => (
              <button
                key={i}
                className="cin-panel-nav-dot"
                onClick={() => goTo(i)}
                style={{
                  height:       '3px',
                  width:        i === active ? '32px' : '12px',
                  borderRadius: '100px',
                  background:   i === active ? accent : 'rgba(255,255,255,0.25)',
                  border:       'none',
                  cursor:       'pointer',
                  padding:      0,
                  opacity:      i === active ? 1 : 0.5,
                }}
              />
            ))}
          </div>
        </div>

        {/* ── Big headline — the centerpiece ── */}
        <div
          key={animKey}
          style={{
            flex:          1,
            display:       'flex',
            flexDirection: 'column',
            justifyContent:'center',
            paddingBottom: '10vh',
          }}
        >
          <h2
            style={{
              fontFamily:    "'Plus Jakarta Sans', sans-serif",
              fontSize:      'clamp(3rem, 8vw, 8.5rem)',
              fontWeight:    900,
              lineHeight:    0.95,
              letterSpacing: '-0.04em',
              color:         '#ffffff',
              margin:        '0 0 32px',
              maxWidth:      '14ch',
            }}
          >
            {panel.headline.map((line, li) => (
              <span
                key={li}
                style={{
                  display:   'block',
                  animation: `cinPanelIn 0.75s cubic-bezier(0.16,1,0.3,1) ${li * 0.1}s both`,
                  // Last line in accent color
                  color: li === panel.headline.length - 1 ? accent : '#ffffff',
                }}
              >
                {line}
              </span>
            ))}
          </h2>

          {/* Sub + stat row */}
          <div style={{
            display:    'flex',
            alignItems: 'flex-end',
            gap:        '60px',
            flexWrap:   'wrap',
            animation:  `cinPanelIn 0.7s ease 0.3s both`,
          }}>
            {/* Sub tags */}
            <div>
              <div style={{
                display:     'flex',
                gap:         '0',
                flexWrap:    'wrap',
                marginBottom:'20px',
              }}>
                {panel.sub.split(' · ').map((tag, ti) => (
                  <span key={ti} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{
                      fontFamily:    "'Plus Jakarta Sans', sans-serif",
                      fontSize:      '13px',
                      fontWeight:    600,
                      color:         'rgba(255,255,255,0.55)',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                    }}>
                      {tag}
                    </span>
                    {ti < panel.sub.split(' · ').length - 1 && (
                      <span style={{ color: accent, fontSize: '8px', marginRight: '10px' }}>●</span>
                    )}
                  </span>
                ))}
              </div>

              {/* Accent line */}
              <div style={{
                height:          '2px',
                width:           '200px',
                background:      `linear-gradient(90deg, ${accent}, transparent)`,
                transformOrigin: 'left',
                animation:       `cinLineExpand 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s both`,
              }} />
            </div>

            {/* Stat */}
            <div style={{ paddingBottom: '4px' }}>
              <div style={{
                fontFamily:    "'Plus Jakarta Sans', sans-serif",
                fontSize:      'clamp(2rem, 3.5vw, 3.5rem)',
                fontWeight:    800,
                color:         accent,
                lineHeight:    1,
                letterSpacing: '-0.03em',
                marginBottom:  '4px',
              }}>
                {panel.stat.n}
              </div>
              <div style={{
                fontFamily:    "'Plus Jakarta Sans', sans-serif",
                fontSize:      '12px',
                fontWeight:    500,
                color:         'rgba(255,255,255,0.35)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}>
                {panel.stat.label}
              </div>
            </div>

            {/* NEW badge — only on web dev panel */}
            {panel.isNew && (
              <div style={{
                fontFamily:    "'Plus Jakarta Sans', sans-serif",
                fontSize:      '11px',
                fontWeight:    800,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color:         '#0a0a0a',
                background:    '#3bff6c',
                borderRadius:  '6px',
                padding:       '6px 14px',
                animation:     'cinNewBadge 2.5s ease-in-out infinite',
                alignSelf:     'center',
              }}>
                Now Live ✦
              </div>
            )}
          </div>
        </div>

        {/* ── Bottom — panel switcher cards + progress ── */}
        <div style={{
          display:   'flex',
          gap:       '2px',
          alignItems:'stretch',
          marginTop: 'auto',
        }}>
          {PANELS.map((p, i) => (
            <PanelTab
              key={i}
              panel={p}
              index={i}
              active={active}
              progKey={progKey}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

      </div>
    </section>
  )
}

// ── Bottom tab for each panel ──
function PanelTab({ panel, index, active, progKey, onClick }) {
  const isActive = index === active

  return (
    <button
      onClick={onClick}
      style={{
        flex:          isActive ? 2 : 1,
        background:    isActive ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.3)',
        border:        'none',
        borderTop:     `2px solid ${isActive ? panel.accent : 'rgba(255,255,255,0.08)'}`,
        padding:       '20px 24px',
        cursor:        'pointer',
        textAlign:     'left',
        transition:    'flex 0.5s cubic-bezier(0.16,1,0.3,1), background 0.3s ease',
        position:      'relative',
        overflow:      'hidden',
        backdropFilter:'blur(8px)',
      }}
    >
      {/* Progress bar on active */}
      {isActive && (
        <div
          key={`prog-${progKey}`}
          style={{
            position:   'absolute',
            bottom:     0, left: 0,
            height:     '2px',
            background: panel.accent,
            animation:  'cinProgress 4.5s linear forwards',
            opacity:    0.6,
          }}
        />
      )}

      <div style={{
        fontFamily:    "'Plus Jakarta Sans', sans-serif",
        fontSize:      '10px',
        fontWeight:    700,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color:         isActive ? panel.accent : 'rgba(255,255,255,0.2)',
        marginBottom:  '6px',
        transition:    'color 0.3s ease',
      }}>
        {panel.index}
      </div>
      <div style={{
        fontFamily:  "'Plus Jakarta Sans', sans-serif",
        fontSize:    isActive ? '14px' : '12px',
        fontWeight:  isActive ? 700 : 500,
        color:       isActive ? '#ffffff' : 'rgba(255,255,255,0.35)',
        whiteSpace:  'nowrap',
        overflow:    'hidden',
        textOverflow:'ellipsis',
        transition:  'color 0.3s ease, font-size 0.3s ease',
      }}>
        {panel.category}
      </div>
    </button>
  )
}

// ── Atmospheric background pattern ──
function BgPattern({ pattern, accent }) {
  if (pattern === 'dots') return (
    <div style={{
      position:        'absolute', inset: 0, zIndex: 3,
      backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)`,
      backgroundSize:  '32px 32px',
      pointerEvents:   'none',
      animation:       'cinDotPulse 4s ease-in-out infinite',
    }} />
  )

  if (pattern === 'grid') return (
    <div style={{
      position:        'absolute', inset: 0, zIndex: 3,
      backgroundImage: `
        linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
      `,
      backgroundSize:  '60px 60px',
      pointerEvents:   'none',
    }} />
  )

  if (pattern === 'lines') return (
    <div style={{
      position:        'absolute', inset: 0, zIndex: 3,
      backgroundImage: `repeating-linear-gradient(
        -45deg,
        transparent,
        transparent 40px,
        rgba(255,255,255,0.015) 40px,
        rgba(255,255,255,0.015) 41px
      )`,
      pointerEvents: 'none',
    }} />
  )

  return null
}