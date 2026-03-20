import { useState, useEffect, useRef } from 'react'

// Indigo/violet palette constants — used consistently across card + modal
export const WEB_ACCENT       = '#818cf8'   // indigo-400
export const WEB_ACCENT_BRIGHT = '#a78bfa'  // violet-400
export const WEB_GRADIENT     = 'linear-gradient(160deg, #312e81 0%, #1e1b4b 45%, #0f0e2a 100%)'
export const WEB_GLOW         = 'rgba(99,102,241,0.18)'

// Decorative SVG: circuit-board-style grid
function CircuitSVG() {
  return (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
      {/* Outer ring */}
      <circle cx="50" cy="50" r="46" stroke="rgba(129,140,248,0.3)" strokeWidth="1"/>
      {/* Grid lines */}
      {[20, 35, 50, 65, 80].map((v, i) => (
        <g key={i}>
          <line x1={v} y1="10" x2={v} y2="90" stroke="rgba(129,140,248,0.15)" strokeWidth="0.8"/>
          <line x1="10" y1={v} x2="90" y2={v} stroke="rgba(129,140,248,0.15)" strokeWidth="0.8"/>
        </g>
      ))}
      {/* Corner nodes */}
      {[[20,20],[80,20],[20,80],[80,80],[50,50]].map(([cx,cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3.5" fill="rgba(129,140,248,0.5)"
          stroke="rgba(167,139,250,0.6)" strokeWidth="1"/>
      ))}
      {/* Connecting traces */}
      <path d="M20 20 L50 20 L50 50 L80 50" stroke="rgba(129,140,248,0.35)" strokeWidth="1.2" fill="none"/>
      <path d="M80 20 L80 50 L50 80" stroke="rgba(167,139,250,0.25)" strokeWidth="1" fill="none"/>
    </svg>
  )
}

export default function WebDevCard({ plan, index, onChoose }) {
  const [cardHovered, setCardHovered] = useState(false)
  const [btnHovered,  setBtnHovered]  = useState(false)
  const imgRef = useRef(null)
  const rafRef = useRef(null)
  const rotRef = useRef({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const dx   = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2)
    const dy   = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2)
    rotRef.current = { x: dy * -8, y: dx * 10 }
  }

  useEffect(() => {
    let cx = 0, cy = 0
    const tick = () => {
      if (cardHovered) {
        cx += (rotRef.current.x - cx) * 0.1
        cy += (rotRef.current.y - cy) * 0.1
      } else {
        cx += (0 - cx) * 0.06
        cy += (0 - cy) * 0.06
      }
      if (imgRef.current) {
        imgRef.current.style.transform = cardHovered
          ? `rotateX(${cx}deg) rotateY(${cy}deg) scale(1.08)`
          : `rotateX(${cx}deg) rotateY(${cy}deg) translateY(${Math.sin(Date.now() / 1600 + index) * 6}px)`
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [cardHovered, index])

  return (
    <div
      className="webdev-card"
      onMouseEnter={() => setCardHovered(true)}
      onMouseLeave={() => setCardHovered(false)}
      onMouseMove={handleMouseMove}
      style={{
        flex:          1,
        borderRadius:  '20px',
        overflow:      'hidden',
        background:    WEB_GRADIENT,
        padding:       '36px 32px 32px',
        display:       'flex',
        flexDirection: 'column',
        boxShadow:     cardHovered
          ? '0 32px 80px rgba(99,102,241,0.25), 0 0 0 1px rgba(129,140,248,0.2)'
          : '0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(129,140,248,0.1)',
        transition:    'box-shadow 0.35s ease, transform 0.35s ease',
        transform:     cardHovered ? 'translateY(-5px)' : 'translateY(0)',
        cursor:        'default',
        perspective:   '600px',
        position:      'relative',
      }}
    >
      {/* Subtle radial glow top-right */}
      <div aria-hidden="true" style={{
        position:      'absolute',
        top:           '-30px',
        right:         '-30px',
        width:         '200px',
        height:        '200px',
        borderRadius:  '50%',
        background:    'radial-gradient(ellipse, rgba(99,102,241,0.22) 0%, transparent 70%)',
        pointerEvents: 'none',
      }}/>

      {/* ── Top row: name + price + 3D object ── */}
      <div style={{
        display:        'flex',
        justifyContent: 'space-between',
        alignItems:     'flex-start',
        marginBottom:   '8px',
        position:       'relative',
        zIndex:         1,
      }}>
        <div>
          {/* One-time badge */}
          <span style={{
            display:       'inline-flex',
            alignItems:    'center',
            gap:           '5px',
            background:    'rgba(129,140,248,0.15)',
            border:        '1px solid rgba(129,140,248,0.3)',
            borderRadius:  '100px',
            padding:       '3px 10px',
            marginBottom:  '10px',
            fontFamily:    "'Plus Jakarta Sans', sans-serif",
            fontSize:      '10px',
            fontWeight:    700,
            color:         WEB_ACCENT_BRIGHT,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>
            <span style={{
              width:        '5px',
              height:       '5px',
              borderRadius: '50%',
              background:   WEB_ACCENT_BRIGHT,
            }}/>
            {plan.badge}
          </span>

          <h3 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize:   '22px',
            fontWeight: 700,
            color:      '#ffffff',
            margin:     '0 0 8px',
          }}>
            {plan.name}
          </h3>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            <span style={{
              fontFamily:    "'Plus Jakarta Sans', sans-serif",
              fontSize:      'clamp(2rem, 3.5vw, 2.8rem)',
              fontWeight:    800,
              color:         '#ffffff',
              letterSpacing: '-0.03em',
              lineHeight:    1,
            }}>
              {plan.price}
            </span>
            <span style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize:   '14px',
              fontWeight: 400,
              color:      'rgba(255,255,255,0.4)',
            }}>
              {plan.period}
            </span>
          </div>
        </div>

        {/* 3D object */}
        <div style={{
          width:          '80px',
          height:         '80px',
          flexShrink:     0,
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          perspective:    '800px',
          transformStyle: 'preserve-3d',
          marginTop:      '-4px',
        }}>
          <div
            ref={imgRef}
            style={{
              width:          '90px',
              height:         '90px',
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              transformStyle: 'preserve-3d',
              willChange:     'transform',
              filter:         'drop-shadow(0 6px 18px rgba(99,102,241,0.45))',
            }}
          >
            {plan.image
              ? <img src={plan.image} alt={plan.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }}/>
              : <CircuitSVG />
            }
          </div>
        </div>
      </div>

      {/* Tech stack pill */}
      <div style={{
        display:      'inline-flex',
        alignItems:   'center',
        gap:          '6px',
        background:   'rgba(255,255,255,0.05)',
        border:       '1px solid rgba(255,255,255,0.08)',
        borderRadius: '8px',
        padding:      '6px 12px',
        marginBottom: '20px',
        width:        'fit-content',
        position:     'relative',
        zIndex:       1,
      }}>
        {/* Code icon */}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
          stroke={WEB_ACCENT} strokeWidth="2" strokeLinecap="round">
          <polyline points="16 18 22 12 16 6"/>
          <polyline points="8 6 2 12 8 18"/>
        </svg>
        <span style={{
          fontFamily:    "'Plus Jakarta Sans', sans-serif",
          fontSize:      '11px',
          fontWeight:    600,
          color:         'rgba(255,255,255,0.5)',
          letterSpacing: '0.04em',
        }}>
          {plan.stack}
        </span>
      </div>

      {/* Divider */}
      <div style={{
        height:       '1px',
        background:   'rgba(129,140,248,0.15)',
        marginBottom: '20px',
        position:     'relative',
        zIndex:       1,
      }}/>

      {/* What's included */}
      <p style={{
        fontFamily:    "'Plus Jakarta Sans', sans-serif",
        fontSize:      '12px',
        fontWeight:    700,
        color:         WEB_ACCENT,
        margin:        '0 0 14px',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        position:      'relative',
        zIndex:        1,
      }}>
        What's included
      </p>

      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', flex: 1, position: 'relative', zIndex: 1 }}>
        {plan.features.map((feat) => (
          <li key={feat} style={{
            display:     'flex',
            alignItems:  'flex-start',
            gap:         '10px',
            fontFamily:  "'Plus Jakarta Sans', sans-serif",
            fontSize:    '13px',
            color:       'rgba(255,255,255,0.7)',
            marginBottom:'10px',
            lineHeight:  1.45,
          }}>
            {/* Violet check */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke={WEB_ACCENT} strokeWidth="2.5" strokeLinecap="round"
              style={{ flexShrink: 0, marginTop: '1px' }}>
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            {feat}
          </li>
        ))}
      </ul>

      {/* Value added */}
      {plan.addedServices && (
        <div style={{ marginBottom: '28px', position: 'relative', zIndex: 1 }}>
          <p style={{
            fontFamily:    "'Plus Jakarta Sans', sans-serif",
            fontSize:      '12px',
            fontWeight:    700,
            color:         WEB_ACCENT,
            margin:        '0 0 14px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}>
            Also included
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {plan.addedServices.map((svc) => (
              <li key={svc} style={{
                display:     'flex',
                alignItems:  'flex-start',
                gap:         '10px',
                fontFamily:  "'Plus Jakarta Sans', sans-serif",
                fontSize:    '13px',
                color:       'rgba(255,255,255,0.55)',
                marginBottom:'10px',
                lineHeight:  1.45,
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="rgba(167,139,250,0.6)" strokeWidth="2.5" strokeLinecap="round"
                  style={{ flexShrink: 0, marginTop: '1px' }}>
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                {svc}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ── Get Started button ── */}
      <button
        className="webdev-choose-btn"
        onMouseEnter={() => setBtnHovered(true)}
        onMouseLeave={() => setBtnHovered(false)}
        onClick={onChoose}
        style={{
          width:          '100%',
          padding:        '16px',
          borderRadius:   '100px',
          background:     btnHovered
            ? 'rgba(129,140,248,0.25)'
            : 'rgba(129,140,248,0.12)',
          border:         `1px solid ${btnHovered ? 'rgba(129,140,248,0.6)' : 'rgba(129,140,248,0.3)'}`,
          cursor:         'pointer',
          fontFamily:     "'Plus Jakarta Sans', sans-serif",
          fontSize:       '14px',
          fontWeight:     600,
          color:          '#ffffff',
          letterSpacing:  '0.01em',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          gap:            '8px',
          position:       'relative',
          zIndex:         1,
          transition:     'background 0.25s ease, border-color 0.25s ease, transform 0.2s ease',
        }}
      >
        Get Started
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="7" y1="17" x2="17" y2="7"/>
          <polyline points="7 7 17 7 17 17"/>
        </svg>
      </button>
    </div>
  )
}