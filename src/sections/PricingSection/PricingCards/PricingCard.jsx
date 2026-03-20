import { useState, useEffect, useRef } from 'react'

// SVG placeholder objects shown when no image is provided
const PLACEHOLDERS = [
  <svg key="a" width="100" height="100" viewBox="0 0 100 100" fill="none">
    {[8, 15, 22, 29, 36, 43, 48, 50].map((r, i) => (
      <ellipse key={i} cx="50" cy="50" rx={r} ry={r * 0.28}
        stroke="rgba(0,0,0,0.25)" strokeWidth="1.2" fill="none"
        transform={`rotate(${i * 12} 50 50)`}
      />
    ))}
    <circle cx="50" cy="50" r="48" stroke="rgba(0,0,0,0.12)" strokeWidth="1"/>
  </svg>,

  <svg key="b" width="100" height="100" viewBox="0 0 100 100" fill="none">
    {Array.from({ length: 10 }, (_, i) => {
      const a  = (i / 10) * Math.PI * 2
      const x2 = 50 + Math.cos(a) * 44
      const y2 = 50 + Math.sin(a) * 44
      return (
        <line key={i} x1="50" y1="50" x2={x2} y2={y2}
          stroke="rgba(0,0,0,0.35)" strokeWidth="4" strokeLinecap="round"
        />
      )
    })}
    <circle cx="50" cy="50" r="7" fill="rgba(0,0,0,0.4)"/>
  </svg>,

  <svg key="c" width="100" height="100" viewBox="0 0 100 100" fill="none">
    {[6, 12, 18, 24, 30, 36, 42, 46, 49].map((r, i) => (
      <ellipse key={i} cx="50" cy="50" rx={r} ry={r * 0.22}
        stroke="rgba(0,0,0,0.28)" strokeWidth="1.5" fill="none"
      />
    ))}
    <circle cx="50" cy="50" r="49" stroke="rgba(0,0,0,0.1)" strokeWidth="1"/>
  </svg>,
]

export default function PricingCard({ plan, index, delay, onChoose }) {
  const [btnHovered,  setBtnHovered]  = useState(false)
  const [cardHovered, setCardHovered] = useState(false)
  const imgRef = useRef(null)
  const rafRef = useRef(null)
  const rotRef = useRef({ x: 0, y: 0 })

  // Track mouse position for 3D tilt
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const dx   = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2)
    const dy   = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2)
    rotRef.current = { x: dy * -10, y: dx * 12 }
  }

  // rAF loop — smoothly lerps toward target rotation
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
          : `rotateX(${cx}deg) rotateY(${cy}deg) translateY(${Math.sin(Date.now() / 1400 + index) * 7}px)`
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [cardHovered, index])

  return (
    <div
      className="pricing-card"
      onMouseEnter={() => setCardHovered(true)}
      onMouseLeave={() => setCardHovered(false)}
      onMouseMove={handleMouseMove}
      style={{
        flex:          1,
        borderRadius:  '20px',
        overflow:      'hidden',
        background:    'linear-gradient(160deg, #3dca6a 0%, #22a84e 40%, #1a8a3e 100%)',
        padding:       '32px 28px 28px',
        display:       'flex',
        flexDirection: 'column',
        marginTop:     plan.elevated ? '-20px' : '0',
        marginBottom:  plan.elevated ? '-20px' : '0',
        paddingTop:    plan.elevated ? '44px'  : '32px',
        paddingBottom: plan.elevated ? '40px'  : '28px',
        boxShadow:     plan.elevated
          ? '0 32px 80px rgba(0,0,0,0.5)'
          : '0 16px 40px rgba(0,0,0,0.3)',
        transition:    'box-shadow 0.3s ease, transform 0.3s ease',
        transform:     cardHovered ? 'translateY(-4px)' : 'translateY(0)',
        cursor:        'default',
        perspective:   '600px',
        borderRight:   '1px solid rgba(255,255,255,0.1)',
        borderTop:     '1px solid rgba(255,255,255,0.15)',
        animationDelay:`${delay}ms`,
      }}
    >
      {/* ── Top row: name + price + 3D object ── */}
      <div style={{
        display:        'flex',
        justifyContent: 'space-between',
        alignItems:     'flex-start',
        marginBottom:   '4px',
      }}>
        <div>
          <h3 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize:   '20px',
            fontWeight: 700,
            color:      '#000000',
            margin:     '0 0 6px',
          }}>
            {plan.name}
          </h3>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            <span style={{
              fontFamily:    "'Plus Jakarta Sans', sans-serif",
              fontSize:      'clamp(2.4rem, 4vw, 3.2rem)',
              fontWeight:    800,
              color:         '#000000',
              letterSpacing: '-0.03em',
              lineHeight:    1,
            }}>
              {plan.price}
            </span>
            <span style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize:   '14px',
              fontWeight: 400,
              color:      'rgba(0,0,0,0.55)',
            }}>
              {plan.period}
            </span>
          </div>
        </div>

        {/* 3D floating object */}
        <div style={{
          width:          '70px',
          height:         '70px',
          flexShrink:     0,
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          perspective:    '800px',
          transformStyle: 'preserve-3d',
          marginTop:      '-8px',
          marginRight:    '2px',
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
              filter:         'drop-shadow(0 8px 16px rgba(0,0,0,0.3))',
            }}
          >
            {plan.image
              ? <img src={plan.image} alt={plan.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              : PLACEHOLDERS[index]
            }
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: 'rgba(0,0,0,0.15)', marginBottom: '20px' }} />

      {/* ── What you will get ── */}
      <p style={{
        fontFamily:    "'Plus Jakarta Sans', sans-serif",
        fontSize:      '13px',
        fontWeight:    700,
        color:         '#000000',
        margin:        '0 0 14px',
        letterSpacing: '0.01em',
      }}>
        What you will get:
      </p>

      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', flex: 1 }}>
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
            }} />
            {feat}
          </li>
        ))}
      </ul>

      {/* ── Value added services ── */}
      {plan.addedServices && (
        <div style={{ marginBottom: '28px' }}>
          <p style={{
            fontFamily:    "'Plus Jakarta Sans', sans-serif",
            fontSize:      '13px',
            fontWeight:    700,
            color:         '#000000',
            margin:        '0 0 14px',
            letterSpacing: '0.01em',
          }}>
            Value Added Services:
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
                }} />
                {svc}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ── Choose Plan button ── */}
      <button
        className="plan-choose-btn"
        onMouseEnter={() => setBtnHovered(true)}
        onMouseLeave={() => setBtnHovered(false)}
        onClick={onChoose}
        style={{
          width:          '100%',
          padding:        '16px',
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
          justifyContent: 'center',
          gap:            '8px',
        }}
      >
        Choose Plan
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="7" y1="17" x2="17" y2="7"/>
          <polyline points="7 7 17 7 17 17"/>
        </svg>
      </button>
    </div>
  )
}