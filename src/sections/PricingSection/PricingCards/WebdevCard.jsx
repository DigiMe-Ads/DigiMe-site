import { useState, useEffect, useRef } from 'react'

// Kept as named exports so WebDevModal can import them
export const WEB_ACCENT        = '#0f911e'
export const WEB_ACCENT_BRIGHT = '#3bff6c'
export const WEB_GRADIENT      = 'linear-gradient(160deg, #3dca6a 0%, #22a84e 40%, #1a8a3e 100%)'
export const WEB_GLOW          = 'rgba(15,145,30,0.18)'

// Decorative SVG: circuit-board-style grid
function CircuitSVG() {
  return (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="46" stroke="rgba(59,255,108,0.3)" strokeWidth="1"/>
      {[20, 35, 50, 65, 80].map((v, i) => (
        <g key={i}>
          <line x1={v} y1="10" x2={v} y2="90" stroke="rgba(59,255,108,0.1)" strokeWidth="0.8"/>
          <line x1="10" y1={v} x2="90" y2={v} stroke="rgba(59,255,108,0.1)" strokeWidth="0.8"/>
        </g>
      ))}
      {[[20,20],[80,20],[20,80],[80,80],[50,50]].map(([cx,cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3.5"
          fill="rgba(59,255,108,0.4)" stroke="rgba(15,145,30,0.6)" strokeWidth="1"/>
      ))}
      <path d="M20 20 L50 20 L50 50 L80 50" stroke="rgba(59,255,108,0.3)" strokeWidth="1.2" fill="none"/>
      <path d="M80 20 L80 50 L50 80"         stroke="rgba(15,145,30,0.2)"  strokeWidth="1"   fill="none"/>
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
        width:        '100%',
        borderRadius: '20px',
        overflow:     'hidden',
        background:   WEB_GRADIENT,
        padding:      '36px 40px',
        display:      'flex',
        flexDirection:'row',
        gap:          '48px',
        alignItems:   'stretch',
        boxShadow:    cardHovered
          ? '0 32px 80px rgba(0,0,0,0.5)'
          : '0 16px 40px rgba(0,0,0,0.3)',
        transition:   'box-shadow 0.3s ease, transform 0.35s ease',
        transform:    cardHovered ? 'translateY(-4px)' : 'translateY(0)',
        cursor:       'default',
        perspective:  '600px',
        position:     'relative',
        borderRight:  '1px solid rgba(255,255,255,0.1)',
        borderTop:    '1px solid rgba(255,255,255,0.15)',
      }}
    >
      {/* ══ LEFT: identity + 3D object ══ */}
      <div style={{
        flexShrink:     0,
        width:          '260px',
        display:        'flex',
        flexDirection:  'column',
        justifyContent: 'space-between',
        position:       'relative',
        zIndex:         1,
      }}>
        <div>
          {/* Badge */}
          {/* <span style={{
            display:       'inline-flex',
            alignItems:    'center',
            gap:           '5px',
            background:    'rgba(0,0,0,0.15)',
            border:        '1px solid rgba(0,0,0,0.2)',
            borderRadius:  '100px',
            padding:       '3px 10px',
            marginBottom:  '14px',
            fontFamily:    "'Plus Jakarta Sans', sans-serif",
            fontSize:      '10px',
            fontWeight:    700,
            color:         'rgba(0,0,0,0.7)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'rgba(0,0,0,0.5)' }}/>
            {plan.badge}
          </span> */}

          <h3 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize:   '22px',
            fontWeight: 700,
            color:      '#000000',
            margin:     '0 0 10px',
          }}>
            {plan.name}
          </h3>

          {/* Price */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '16px' }}>
            <span style={{
              fontFamily:    "'Plus Jakarta Sans', sans-serif",
              fontSize:      'clamp(1.8rem, 2.5vw, 2.4rem)',
              fontWeight:    800,
              color:         '#000000',
              letterSpacing: '-0.03em',
              lineHeight:    1,
            }}>
              {plan.price}
            </span>
            <span style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize:   '13px',
              color:      'rgba(0,0,0,0.55)',
            }}>
              {plan.period}
            </span>
          </div>

          {/* Stack pill */}
          <div style={{
            display:      'inline-flex',
            alignItems:   'center',
            gap:          '6px',
            background:   'rgba(0,0,0,0.12)',
            border:       '1px solid rgba(0,0,0,0.15)',
            borderRadius: '8px',
            padding:      '6px 12px',
            width:        'fit-content',
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="rgba(0,0,0,0.6)" strokeWidth="2" strokeLinecap="round">
              <polyline points="16 18 22 12 16 6"/>
              <polyline points="8 6 2 12 8 18"/>
            </svg>
            <span style={{
              fontFamily:    "'Plus Jakarta Sans', sans-serif",
              fontSize:      '11px',
              fontWeight:    600,
              color:         'rgba(0,0,0,0.6)',
              letterSpacing: '0.04em',
            }}>
              {plan.stack}
            </span>
          </div>
        </div>

        {/* 3D object — bottom of left panel */}
        <div style={{
          width:          '100px',
          height:         '100px',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          perspective:    '800px',
          transformStyle: 'preserve-3d',
          marginTop:      '24px',
        }}>
          <div
            ref={imgRef}
            style={{
              width:          '100px',
              height:         '100px',
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              transformStyle: 'preserve-3d',
              willChange:     'transform',
              filter:         'drop-shadow(0 8px 16px rgba(0,0,0,0.3))',
            }}
          >
            {plan.image
              ? <img src={plan.image} alt={plan.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }}/>
              : <CircuitSVG />
            }
          </div>
        </div>
      </div>

      {/* Vertical divider */}
      <div className="webdev-divider" style={{
        width:      '1px',
        background: 'rgba(0,0,0,0.15)',
        flexShrink: 0,
        alignSelf:  'stretch',
      }}/>

      {/* ══ RIGHT: features + button ══ */}
      <div style={{
        flex:           1,
        display:        'flex',
        flexDirection:  'column',
        justifyContent: 'space-between',
        position:       'relative',
        zIndex:         1,
        minWidth:       0,
      }}>
        {/* Two-column feature grid */}
        <div style={{
          display:             'grid',
          gridTemplateColumns: '1fr 1fr',
          gap:                 '0 32px',
          marginBottom:        '24px',
        }}>
          {/* What's included */}
          <div>
            <p style={{
              fontFamily:    "'Plus Jakarta Sans', sans-serif",
              fontSize:      '13px',
              fontWeight:    700,
              color:         '#000000',
              margin:        '0 0 12px',
              letterSpacing: '0.01em',
            }}>
              What's included
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {plan.features.map((feat) => (
                <li key={feat} style={{
                  display:     'flex',
                  alignItems:  'center',
                  gap:         '10px',
                  fontFamily:  "'Plus Jakarta Sans', sans-serif",
                  fontSize:    '13px',
                  color:       'rgba(0,0,0,0.75)',
                  marginBottom:'10px',
                  lineHeight:  1.4,
                }}>
                  <span style={{
                    width:        '6px',
                    height:       '6px',
                    borderRadius: '50%',
                    background:   'rgba(0,0,0,0.5)',
                    flexShrink:   0,
                  }}/>
                  {feat}
                </li>
              ))}
            </ul>
          </div>

          {/* Also included */}
          {plan.addedServices && (
            <div>
              <p style={{
                fontFamily:    "'Plus Jakarta Sans', sans-serif",
                fontSize:      '13px',
                fontWeight:    700,
                color:         '#000000',
                margin:        '0 0 12px',
                letterSpacing: '0.01em',
              }}>
                Also included
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {plan.addedServices.map((svc) => (
                  <li key={svc} style={{
                    display:     'flex',
                    alignItems:  'center',
                    gap:         '10px',
                    fontFamily:  "'Plus Jakarta Sans', sans-serif",
                    fontSize:    '13px',
                    color:       'rgba(0,0,0,0.75)',
                    marginBottom:'10px',
                    lineHeight:  1.4,
                  }}>
                    <span style={{
                      width:        '6px',
                      height:       '6px',
                      borderRadius: '50%',
                      background:   'rgba(0,0,0,0.5)',
                      flexShrink:   0,
                    }}/>
                    {svc}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Get Started button */}
        <button
          className="plan-choose-btn"
          onMouseEnter={() => setBtnHovered(true)}
          onMouseLeave={() => setBtnHovered(false)}
          onClick={onChoose}
          style={{
            alignSelf:      'flex-start',
            padding:        '14px 28px',
            borderRadius:   '100px',
            background:     btnHovered ? '#0a0a0a' : 'rgba(0,0,0,0.75)',
            border:         'none',
            cursor:         'pointer',
            fontFamily:     "'Plus Jakarta Sans', sans-serif",
            fontSize:       '14px',
            fontWeight:     600,
            color:          '#ffffff',
            letterSpacing:  '0.01em',
            display:        'flex',
            alignItems:     'center',
            gap:            '8px',
            transition:     'background 0.25s ease, transform 0.2s ease',
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
    </div>
  )
}