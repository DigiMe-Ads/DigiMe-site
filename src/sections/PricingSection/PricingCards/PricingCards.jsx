import { useState, useEffect, useRef } from 'react'
import { useScrollReveal } from '../../../hooks/useScrollReveal'

const PLANS = [
  {
    name:     'Standard',
    price:    'LKR 95,000',
    period:   '/month',
    desc:     'Highly recommended for small teams who seek to upgrade their time',
    image:    '/images/About/features/brand-identity.png',  
    features: [
      '10 Posts (5 Reels & 5 Statis) ',
      'Management of 2 Advertising campaigns ',
      'Social Media Marketing Strategy',
      'Content Language – English & Sinhala',
      'Monthly Analysis Report',
    ],
    addedServices: [
      '6 Story Posts',
      'Monthly Facebook Cover Photo Update',
    ],
    elevated: false,
  },
  {
    name:     'Premium',
    price:    'LKR 110,000',
    period:   '/month',
    desc:     'Highly recommended for small teams who seek to upgrade their time',
    image:    '/images/About/features/digital-platform.png',  // '/images/pricing/gold-obj.png'
    features: [
      '12 Posts (6 Reels & 6 Statis)',
      'Management of 4 Advertising campaigns',
      'Social Media Marketing Strategy',
      'Content Language – English & Sinhala',
      'Monthly Analysis Report',
    ],
    addedServices: [
      '10 Story Posts',
      'Monthly Facebook Cover Photo Update',
    ],
    elevated: true,  // taller, pops above others
  },
  {
    name:     'Professional',
    price:    'LKR 125,000',
    period:   '/month',
    desc:     'Highly recommended for small teams who seek to upgrade their time',
    image:    '/images/About/features/web-design.png',  // '/images/pricing/platinum-obj.png'
    features: [
      '15 Posts (8 Reels & 7 Statis)',
      'Management of 6 Advertising campaigns',
      'Social Media Marketing Strategy',
      'Content Language – English & Sinhala',
      'Monthly Analysis Report',
    ],
    addedServices: [
      '15 Story Posts',
      'Monthly Facebook Cover Photo Update',
    ],
    elevated: false,
  },
]

const STYLES = `
  @keyframes pricingObjFloat {
    0%, 100% { transform: translateY(0px)    rotateY(0deg);   }
    33%       { transform: translateY(-10px)  rotateY(10deg);  }
    66%       { transform: translateY(-6px)   rotateY(-8deg);  }
  }
  @media (max-width: 992px) {
    .pricing-inner { padding-left: 60px !important; padding-right: 60px !important; }
    .pricing-grid  { flex-direction: column !important; align-items: center !important; }
    .pricing-card  { width: 100% !important; max-width: 420px !important; margin-top: 0 !important; }
  }
  @media (max-width: 768px) {
    .pricing-inner { padding-left: 24px !important; padding-right: 24px !important; }
  }
  @media (max-width: 480px) {
    .pricing-inner { padding-left: 16px !important; padding-right: 16px !important; }
  }
`

export default function PricingCards() {
  const gridReveal = useScrollReveal({ threshold: 0.08 })

  useEffect(() => {
    if (document.getElementById('pricing-styles')) return
    const s = document.createElement('style')
    s.id = 'pricing-styles'
    s.textContent = STYLES
    document.head.appendChild(s)
  }, [])

  return (
    <section
      id="pricing"
      style={{
        background:    '#0a0a0a',
        fontFamily:    "'Plus Jakarta Sans', sans-serif",
        paddingTop:    '80px',
        paddingBottom: '100px',
        overflow:      'hidden',
      }}
    >
      <div
        className="pricing-inner"
        style={{ paddingLeft: '285px', paddingRight: '285px' }}
      >

        {/* ── Section header ── */}
        <div style={{
          marginBottom: '56px',
          display:      'flex',
          alignItems:   'flex-end',
          justifyContent: 'space-between',
          flexWrap:     'wrap',
          gap:          '16px',
        }}>
          <div>
            <p style={{
              display:       'flex',
              alignItems:    'center',
              gap:           '8px',
              fontSize:      '11px',
              fontWeight:    600,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color:         'rgba(255,255,255,0.35)',
              marginBottom:  '14px',
            }}>
              <span style={{ color: '#3bff6c' }}>✦</span> Pricing
            </p>
            <h2 style={{
              fontFamily:    "'Plus Jakarta Sans', sans-serif",
              fontSize:      'clamp(2rem, 3.5vw, 3.2rem)',
              fontWeight:    800,
              lineHeight:    1.1,
              letterSpacing: '-0.02em',
              color:         '#ffffff',
              margin:        0,
            }}>
              Social Media{' '}
              <span style={{ color: '#3bff6c', fontStyle: 'italic', fontWeight: 400 }}>
                Packages
              </span>
            </h2>
          </div>

          {/* Right side tag — signals more packages coming */}
          {/* <div style={{
            display:      'inline-flex',
            alignItems:   'center',
            gap:          '8px',
            background:   'rgba(59,255,108,0.06)',
            border:       '1px solid rgba(59,255,108,0.15)',
            borderRadius: '100px',
            padding:      '8px 16px',
            alignSelf:    'center',
          }}>
            <div style={{
              width:        '6px',
              height:       '6px',
              borderRadius: '50%',
              background:   '#3bff6c',
            }}/>
            <span style={{
              fontFamily:    "'Plus Jakarta Sans', sans-serif",
              fontSize:      '12px',
              fontWeight:    600,
              color:         'rgba(59,255,108,0.8)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}>
              Web Dev packages coming soon
            </span>
          </div> */}
        </div>

        {/* ── Pricing grid ── */}
        <div
          ref={gridReveal.ref}
          className="pricing-grid"
          style={{
            display:    'flex',
            gap:        '20px',
            alignItems: 'stretch',
            opacity:    gridReveal.isVisible ? 1 : 0,
            transform:  gridReveal.isVisible ? 'translateY(0)' : 'translateY(32px)',
            transition: 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          {PLANS.map((plan, i) => (
            <PricingCard key={plan.name} plan={plan} index={i} delay={i * 80} />
          ))}
        </div>

      </div>
    </section>
  )
}

function PricingCard({ plan, index, delay }) {
  const [btnHovered, setBtnHovered] = useState(false)
  const imgRef = useRef(null)
  const rafRef = useRef(null)
  const rotRef = useRef({ x: 0, y: 0 })
  const [cardHovered, setCardHovered] = useState(false)

  // Mouse-tracked tilt on the 3D object
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const dx   = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2)
    const dy   = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2)
    rotRef.current = { x: dy * -10, y: dx * 12 }
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
          : `rotateX(${cx}deg) rotateY(${cy}deg) translateY(${Math.sin(Date.now() / 1400 + index) * 7}px)`
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [cardHovered])

  // SVG placeholder objects — same as OurFeatures
  const PLACEHOLDERS = [
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
      {[8,15,22,29,36,43,48,50].map((r, i) => (
        <ellipse key={i} cx="50" cy="50" rx={r} ry={r * 0.28}
          stroke="rgba(0,0,0,0.25)" strokeWidth="1.2" fill="none"
          transform={`rotate(${i * 12} 50 50)`}/>
      ))}
      <circle cx="50" cy="50" r="48" stroke="rgba(0,0,0,0.12)" strokeWidth="1"/>
    </svg>,
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
      {Array.from({ length: 10 }, (_, i) => {
        const a  = (i / 10) * Math.PI * 2
        const x2 = 50 + Math.cos(a) * 44
        const y2 = 50 + Math.sin(a) * 44
        return <line key={i} x1="50" y1="50" x2={x2} y2={y2}
          stroke="rgba(0,0,0,0.35)" strokeWidth="4" strokeLinecap="round"/>
      })}
      <circle cx="50" cy="50" r="7" fill="rgba(0,0,0,0.4)"/>
    </svg>,
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
      {[6,12,18,24,30,36,42,46,49].map((r, i) => (
        <ellipse key={i} cx="50" cy="50" rx={r} ry={r * 0.22}
          stroke="rgba(0,0,0,0.28)" strokeWidth="1.5" fill="none"/>
      ))}
      <circle cx="50" cy="50" r="49" stroke="rgba(0,0,0,0.1)" strokeWidth="1"/>
    </svg>,
  ]

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
        // Elevated middle card — pops up and is taller via extra padding
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
        // Subtle inner shadow on the right edge for depth
        borderRight:   '1px solid rgba(255,255,255,0.1)',
        borderTop:     '1px solid rgba(255,255,255,0.15)',
        animationDelay: `${delay}ms`,
      }}
    >

      {/* ── Top row: plan name + 3D object ── */}
      <div style={{
        display:        'flex',
        justifyContent: 'space-between',
        alignItems:     'flex-start',
        marginBottom:   '4px',
      }}>
        <div>
          <h3 style={{
            fontFamily:   "'Plus Jakarta Sans', sans-serif",
            fontSize:     '20px',
            fontWeight:   700,
            color:        '#000000',
            margin:       '0 0 6px',
          }}>
            {plan.name}
          </h3>

          {/* Price */}
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

        {/* 3D object — top right */}
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
            {plan.image ? (
              <img
                src={plan.image}
                alt={plan.name}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            ) : PLACEHOLDERS[index]}
          </div>
        </div>
      </div>

      {/* Description */}
      <p style={{
        fontFamily:   "'Plus Jakarta Sans', sans-serif",
        fontSize:     '13px',
        lineHeight:   '20px',
        color:        'rgba(0,0,0,0.6)',
        margin:       '12px 0 20px',
        maxWidth:     '34ch',
      }}>
        {plan.desc}
      </p>

      {/* Divider */}
      <div style={{
        height:       '1px',
        background:   'rgba(0,0,0,0.15)',
        marginBottom: '20px',
      }} />

      {/* What you will get */}
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

      {/* Feature list — grows to push button down */}
      <ul style={{
        listStyle: 'none',
        padding:   0,
        margin:    '0 0 28px',
        flex:      1,
      }}>
        {plan.features.map(feat => (
          <li
            key={feat}
            style={{
              display:     'flex',
              alignItems:  'center',
              gap:         '10px',
              fontFamily:  "'Plus Jakarta Sans', sans-serif",
              fontSize:    '13px',
              color:       'rgba(0,0,0,0.75)',
              marginBottom:'10px',
              lineHeight:  1.4,
            }}
          >
            {/* Green bullet dot */}
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

      {/* Added services */}
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
            Value Added services:
          </p>
          <ul style={{
            listStyle: 'none',
            padding:   0,
            margin:    0,
          }}>
            {plan.addedServices.map(svc => (
              <li
                key={svc}
                style={{
                  display:     'flex',
                  alignItems:  'center',
                  gap:         '10px',
                  fontFamily:  "'Plus Jakarta Sans', sans-serif",
                  fontSize:    '13px',
                  color:       'rgba(0,0,0,0.75)',
                  marginBottom:'10px',
                  lineHeight:  1.4,
                }}
              >
                {/* Green bullet dot */}
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

      {/* Choose Plan button — dark pill */}
      <button
        onMouseEnter={() => setBtnHovered(true)}
        onMouseLeave={() => setBtnHovered(false)}
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
          transition:     'background 0.25s ease, transform 0.2s ease',
          transform:      btnHovered ? 'scale(1.02)' : 'scale(1)',
          letterSpacing:  '0.01em',
        }}
      >
        Choose Plan
      </button>

    </div>
  )
}