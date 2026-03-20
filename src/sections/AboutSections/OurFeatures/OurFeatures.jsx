import { useState, useEffect, useRef } from 'react'
import { useScrollReveal } from '../../../hooks/useScrollReveal'

const FEATURES = [
  {
    title:    'Brand Identity',
    subtitle: '2D & 3D Animation',
    body:     'We craft visual identities that stick logos, motion graphics, and animations that bring your brand to life across every screen.',
    image:    '/images/About/features/brand-identity.png',  
  },
  {
    title:    'Web Design',
    subtitle: 'Art Direction',
    body:     'Pixel-perfect designs with purpose. We build websites that don not just look stunning they guide your visitors toward action.',
    image:    '/images/About/features/web-design.png',  
  },
  {
    title:    'Digital Platform',
    subtitle: 'Product Development',
    body:     'From MVPs to full-scale platforms, we engineer fast, scalable digital products built to grow alongside your business.',
    image:    '/images/About/features/digital-platform.png',  
  },
]

const STYLES = `
  @keyframes featObjFloat {
    0%, 100% { transform: translateY(0px)   rotateY(0deg)   rotateX(0deg);   }
    25%       { transform: translateY(-8px)  rotateY(8deg)   rotateX(3deg);   }
    50%       { transform: translateY(-14px) rotateY(0deg)   rotateX(-4deg);  }
    75%       { transform: translateY(-6px)  rotateY(-8deg)  rotateX(2deg);   }
  }
  @keyframes featObjShadowPulse {
    0%, 100% { transform: scaleX(1);   opacity: 0.3; }
    50%       { transform: scaleX(0.7); opacity: 0.15; }
  }
  @media (max-width: 992px) {
    .feat-inner { padding-left: 60px !important; padding-right: 60px !important; }
    .feat-grid  { grid-template-columns: 1fr !important; }
    .feat-title { font-size: clamp(4rem, 12vw, 7rem) !important; }
  }
  @media (max-width: 768px) {
    .feat-inner { padding-left: 24px !important; padding-right: 24px !important; }
  }
  @media (max-width: 480px) {
    .feat-inner { padding-left: 16px !important; padding-right: 16px !important; }
  }
`

export default function OurFeatures() {
  const titleReveal = useScrollReveal({ threshold: 0.1 })
  const gridReveal  = useScrollReveal({ threshold: 0.08 })

  useEffect(() => {
    if (document.getElementById('feat-styles')) return
    const s = document.createElement('style')
    s.id = 'feat-styles'
    s.textContent = STYLES
    document.head.appendChild(s)
  }, [])

  return (
    <section
      id="our-features"
      style={{
        position:   'relative',
        background: '#0a0a0a',
        overflow:   'hidden',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        paddingBottom: '0px',
      }}
    >

      {/* ── Big display title ── */}
      <div
        ref={titleReveal.ref}
        className="feat-inner"
        style={{
          paddingLeft:  '285px',
          paddingRight: '0',           // title bleeds to right edge
          paddingTop:   '60px',
          paddingBottom:'0px',
          position:     'relative',
          overflow:     'visible',
          opacity:      titleReveal.isVisible ? 1 : 0,
          transform:    titleReveal.isVisible ? 'translateY(0)' : 'translateY(24px)',
          transition:   'opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <h2
          className="feat-title"
          style={{
            fontFamily:    "'Plus Jakarta Sans', sans-serif",
            fontSize:      'clamp(5rem, 10vw, 10rem)',
            fontWeight:    800,
            lineHeight:    0.95,
            letterSpacing: '-0.03em',
            margin:        0,
            whiteSpace:    'nowrap',
          }}
        >
          {/* OUR — outline only */}
          <span style={{
            color:              'transparent',
            WebkitTextStroke:   '2px rgba(255,255,255,0.25)',
          }}>
            OUR{' '}
          </span>
          {/* FEATURES — solid green */}
          <span style={{ color: '#0f911e' }}>
            TEAM
          </span>
        </h2>
      </div>

      {/* ── Feature cards grid ── */}
      {/* <div
        ref={gridReveal.ref}
        className="feat-inner feat-grid"
        style={{
          paddingLeft:         '285px',
          paddingRight:        '285px',
          paddingTop:          '40px',
          display:             'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap:                 '2px',
          opacity:             gridReveal.isVisible ? 1 : 0,
          transform:           gridReveal.isVisible ? 'translateY(0)' : 'translateY(32px)',
          transition:          'opacity 0.8s ease 0.1s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s',
        }}
      >
        {FEATURES.map((feat, i) => (
          <FeatureCard key={feat.title} feat={feat} index={i} />
        ))}
      </div> */}

    </section>
  )
}

function FeatureCard({ feat, index }) {
  const [hovered, setHovered] = useState(false)
  const imgRef = useRef(null)
  const rafRef = useRef(null)
  const rotRef = useRef({ x: 0, y: 0 })

  // On hover — mouse-tracked 3D tilt for the object image
  const handleMouseMove = (e) => {
    const rect   = e.currentTarget.getBoundingClientRect()
    const cx     = rect.left + rect.width  / 2
    const cy     = rect.top  + rect.height / 2
    const dx     = (e.clientX - cx) / (rect.width  / 2)   // -1 to 1
    const dy     = (e.clientY - cy) / (rect.height / 2)

    rotRef.current = { x: dy * -12, y: dx * 14 }
  }

  useEffect(() => {
    if (!imgRef.current) return
    let currentX = 0
    let currentY = 0

    const tick = () => {
      if (!hovered) {
        // Drift back to neutral smoothly
        currentX += (0 - currentX) * 0.08
        currentY += (0 - currentY) * 0.08
      } else {
        currentX += (rotRef.current.x - currentX) * 0.1
        currentY += (rotRef.current.y - currentY) * 0.1
      }

      if (imgRef.current) {
        imgRef.current.style.transform = hovered
          ? `rotateX(${currentX}deg) rotateY(${currentY}deg) scale(1.06)`
          : `rotateX(${currentX}deg) rotateY(${currentY}deg) scale(1) translateY(${-8 + Math.sin(Date.now() / 1200) * 8}px)`
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [hovered])

  // Fallback placeholder shapes when no image provided
  const PLACEHOLDERS = [
    // Ridged sphere — concentric circles
    <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
      {[14,24,34,44,54,64,72,78,80].map((r, i) => (
        <ellipse key={i} cx="80" cy="80" rx={r} ry={r * 0.3}
          stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="none"
          transform={`rotate(${i * 10} 80 80)`}
        />
      ))}
      <circle cx="80" cy="80" r="78" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
    </svg>,
    // Spiky star burst
    <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i / 12) * Math.PI * 2
        const x2 = 80 + Math.cos(angle) * 72
        const y2 = 80 + Math.sin(angle) * 72
        return <line key={i} x1="80" y1="80" x2={x2} y2={y2}
          stroke="rgba(255,255,255,0.4)" strokeWidth="5" strokeLinecap="round"/>
      })}
      <circle cx="80" cy="80" r="10" fill="rgba(255,255,255,0.5)"/>
    </svg>,
    // Layered sphere rings
    <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
      {[10,20,30,38,46,54,60,66,70,74,78,80].map((r, i) => (
        <ellipse key={i} cx="80" cy="80" rx={r} ry={r * 0.25}
          stroke="rgba(255,255,255,0.25)" strokeWidth="2" fill="none"/>
      ))}
      <circle cx="80" cy="80" r="79" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
    </svg>,
  ]

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      style={{
        background:   hovered ? '#121212' : '#0e0e0e',
        border:       `1px solid ${hovered ? 'rgba(59,255,108,0.15)' : 'rgba(255,255,255,0.06)'}`,
        borderRadius: '16px',
        padding:      '36px 32px',
        display:      'flex',
        flexDirection:'column',
        alignItems:   'center',
        textAlign:    'center',
        transition:   'background 0.3s ease, border-color 0.3s ease',
        cursor:       'default',
        perspective:  '600px',
      }}
    >
      {/* Title + subtitle above the object */}
      <h3 style={{
        fontFamily:   "'Plus Jakarta Sans', sans-serif",
        fontSize:     '18px',
        fontWeight:   700,
        color:        '#ffffff',
        margin:       '0 0 6px',
      }}>
        {feat.title}
      </h3>
      <p style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize:   '13px',
        color:      'rgba(255,255,255,0.35)',
        margin:     '0 0 32px',
      }}>
        {feat.subtitle}
      </p>

      {/* 3D object — image with tilt animation or SVG fallback */}
      <div style={{
        position:        'relative',
        width:           '180px',
        height:          '180px',
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
        marginBottom:    '12px',
        perspective:     '600px',
        transformStyle:  'preserve-3d',
      }}>
        {/* Object */}
        <div
          ref={imgRef}
          style={{
            width:          '160px',
            height:         '160px',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            transformStyle: 'preserve-3d',
            transition:     hovered ? 'none' : 'transform 0.4s ease',
            animation:      hovered ? 'none' : `featObjFloat ${7 + index}s ease-in-out infinite`,
            animationDelay: `${index * 0.6}s`,
            filter:         `drop-shadow(0 ${hovered ? 24 : 16}px 32px rgba(0,0,0,0.8))`,
            willChange:     'transform',
          }}
        >
          {feat.image ? (
            <img
              src={feat.image}
              alt={feat.title}
              style={{
                width:     '100%',
                height:    '100%',
                objectFit: 'contain',
                display:   'block',
              }}
            />
          ) : (
            PLACEHOLDERS[index]
          )}
        </div>

        {/* Soft shadow below the object */}
        <div style={{
          position:      'absolute',
          bottom:        '-4px',
          left:          '50%',
          transform:     'translateX(-50%)',
          width:         '80px',
          height:        '12px',
          borderRadius:  '50%',
          background:    'rgba(0,0,0,0.6)',
          filter:        'blur(8px)',
          animation:     `featObjShadowPulse ${7 + index}s ease-in-out infinite`,
          animationDelay:`${index * 0.6}s`,
        }} />
      </div>

      {/* Divider */}
      <div style={{
        width:        '100%',
        height:       '1px',
        background:   'rgba(255,255,255,0.06)',
        margin:       '20px 0',
      }} />

      {/* Body text */}
      <p style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize:   '13px',
        lineHeight: '22px',
        color:      'rgba(255,255,255,0.4)',
        margin:     0,
        maxWidth:   '28ch',
        textAlign:  'center',
      }}>
        {feat.body}
      </p>
    </div>
  )
}