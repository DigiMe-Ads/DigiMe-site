import { useState, useEffect } from 'react'
import { useScrollReveal } from '../../../hooks/useScrollReveal'

// ── Awards config ──
// bgImage: card background image path
// logo: award organisation logo image path (shown bottom-right of card)
// logoFallback: large letter shown if no logo image
const AWARDS = [
  {
    n:            '01',
    org:          'CSS Design Awards',
    title:        'Design of the year.',
    year:         '2018',
    bgImage:      'images/Home/Awards/cs-design-bg.png',  
    logo:         'images/Home/Awards/cs-design.png',   
    logoFallback: 'S',
    logoColor:    '#0f911e',
  },
  {
    n:            '02',
    org:          'Bēhance',
    title:        'Design of the year.',
    year:         '2023',
    bgImage:      'images/Home/Awards/behance-bg.png',
    logo:         'images/Home/Awards/behance.png',
    logoFallback: 'Bē',
    logoColor:    '#4a90d9',
  },
  {
    n:            '03',
    org:          'awwwards.',
    title:        'Design of the year.',
    year:         '2024',
    bgImage:      'images/Home/Awards/awards-bg.png',
    logo:         'images/Home/Awards/awards.png',
    logoFallback: 'a',
    logoColor:    'rgba(255,255,255,0.1)',
  },
]

const STYLES = `
  @media (max-width: 1200px) {
    .awards-inner { padding-left: 120px !important; padding-right: 80px !important; }
  }
  @media (max-width: 992px) {
    .awards-inner  { padding-left: 60px !important; padding-right: 60px !important; }
    .awards-layout { flex-direction: column !important; }
    .awards-left   { width: 100% !important; }
    .awards-right  { width: 100% !important; margin-top: 48px !important; }
  }
  @media (max-width: 768px) {
    .awards-inner { padding-left: 24px !important; padding-right: 24px !important; }
  }
  @media (max-width: 480px) {
    .awards-inner { padding-left: 16px !important; padding-right: 16px !important; }
  }
`

export default function Awards() {
  const leftReveal  = useScrollReveal({ threshold: 0.1 })
  const rightReveal = useScrollReveal({ threshold: 0.08 })

  useEffect(() => {
    if (document.getElementById('awards-styles')) return
    const s = document.createElement('style')
    s.id = 'awards-styles'
    s.textContent = STYLES
    document.head.appendChild(s)
  }, [])

  return (
    <section
      id="awards"
      style={{
        position:   'relative',
        background: 'transparent',   // sits on shared bg wrapper
        paddingTop: '80px',
        paddingBottom: '120px',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        overflow:   'visible',
      }}
    >
      <div
        className="awards-inner"
        style={{ paddingLeft: '285px', paddingRight: '285px' }}
      >
        <div
          className="awards-layout"
          style={{ display: 'flex', gap: '60px', alignItems: 'flex-start' }}
        >

          {/* ── LEFT ── */}
          <div
            className="awards-left"
            ref={leftReveal.ref}
            style={{
              width:      '320px',
              flexShrink: 0,
              opacity:    leftReveal.isVisible ? 1 : 0,
              transform:  leftReveal.isVisible ? 'translateX(0)' : 'translateX(-28px)',
              transition: 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1)',
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
              Awards
            </p>

            {/* Heading */}
            <h2 style={{
              fontFamily:   "'Plus Jakarta Sans', sans-serif",
              fontSize:     'clamp(2rem, 3vw, 2.8rem)',
              fontWeight:   700,
              lineHeight:   1.15,
              color:        '#ffffff',
              marginBottom: '16px',
            }}>
              Awards Of{' '}
              <span style={{ color: '#0f911e' }}>Our Team</span>
            </h2>

            {/* Subtitle */}
            <p style={{
              fontSize:     '14px',
              lineHeight:   '22px',
              color:        'rgba(255,255,255,0.4)',
              maxWidth:     '32ch',
              marginBottom: '24px',
            }}>
              Elevate your brand with the Agencyo Agency — everything from strategy to advertising & scale.
            </p>

            {/* More Awards link */}
            {/* <a
              href="#"
              style={{
                display:             'inline-flex',
                alignItems:          'center',
                gap:                 '6px',
                fontSize:            '14px',
                fontWeight:          600,
                color:               '#ffffff',
                textDecoration:      'underline',
                textUnderlineOffset: '4px',
                textDecorationColor: 'rgba(255,255,255,0.3)',
                transition:          'color 0.25s ease',
                marginBottom:        '48px',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#0f911e'}
              onMouseLeave={e => e.currentTarget.style.color = '#ffffff'}
            >
              More Awards ↗
            </a> */}

            {/* ── Fluid 3D object image ── */}
            {/*
              Drop your fluid 3D render at: public/images/awards/fluid-3d.png
              The image in the screenshot is a glossy iridescent fluid shape.
              Any similar abstract 3D render with transparent bg works great.
            */}
            <div style={{ position: 'relative', width: '220px' }}>
              {/* Subtle glow behind the object */}
              <div style={{
                position:      'absolute',
                top:           '50%',
                left:          '50%',
                transform:     'translate(-50%, -50%)',
                width:         '200px',
                height:        '200px',
                borderRadius:  '50%',
                background:    'radial-gradient(ellipse at center, rgba(100,120,255,0.2) 0%, transparent 70%)',
                filter:        'blur(24px)',
                pointerEvents: 'none',
                zIndex:        0,
              }} />
              <img
                src="/images/Home/awards-object.png"
                alt=""
                aria-hidden="true"
                style={{
                  position:  'relative',
                  zIndex:    1,
                  width:     '100%',
                  height:    'auto',
                  display:   'block',
                  // Gentle float animation
                  animation: 'awardsFloat 7s ease-in-out infinite',
                }}
                // Graceful fallback if image missing
                onError={e => e.currentTarget.style.display = 'none'}
              />
            </div>

          </div>

          {/* ── RIGHT: award cards ── */}
          <div
            className="awards-right"
            ref={rightReveal.ref}
            style={{
              flex:    1,
              display: 'flex',
              flexDirection: 'column',
              gap:     '16px',
              opacity:    rightReveal.isVisible ? 1 : 0,
              transform:  rightReveal.isVisible ? 'translateX(0)' : 'translateX(28px)',
              transition: 'opacity 0.7s ease 0.15s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.15s',
            }}
          >
            {AWARDS.map((award, i) => (
              <AwardCard key={award.n} award={award} delay={i * 80} />
            ))}
          </div>

        </div>
      </div>

      <style>{`
        @keyframes awardsFloat {
          0%, 100% { transform: translateY(0px)   rotate(0deg);  }
          50%       { transform: translateY(-14px) rotate(4deg);  }
        }
      `}</style>
    </section>
  )
}

function AwardCard({ award }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position:     'relative',
        borderRadius: '12px',
        overflow:     'hidden',
        border:       `1px solid ${hovered ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.07)'}`,
        transition:   'border-color 0.3s ease, transform 0.3s ease',
        transform:    hovered ? 'translateY(-4px)' : 'translateY(0)',
        cursor:       'default',
        minHeight:    '246.64px',
        display:      'flex',
        flexDirection: 'row',
        background:   '#0a0a0a',
      }}
    >

      {/* ── LEFT PANEL: just the number ── */}
      <div style={{
        width:          '180px',
        flexShrink:     0,
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        borderRight:    '1px solid rgba(255,255,255,0.07)',
        background:     '#0f0f0f',
        zIndex:         2,
      }}>
        <span style={{
          fontFamily:    "'Plus Jakarta Sans', sans-serif",
          fontSize:      '43px',
          fontWeight:    600,
          color:         'rgba(255,255,255,0.35)',
          letterSpacing: '0.05em',
        }}>
          {award.n}
        </span>
      </div>

      {/* ── RIGHT PANEL: bg image + content ── */}
      <div style={{ position: 'relative', flex: 1, overflow: 'hidden' }}>

        {/* Background image */}
        {award.bgImage && (
          <img
            src={award.bgImage}
            alt=""
            aria-hidden="true"
            style={{
              position:   'absolute',
              inset:      0,
              width:      '100%',
              height:     '100%',
              objectFit:  'cover',
              opacity:    hovered ? 0.35 : 0.25,
              filter:     'brightness(0.6)',
              transition: 'opacity 0.3s ease',
              zIndex:     0,
            }}
          />
        )}

        {/* Dark overlay */}
        <div style={{
          position:   'absolute',
          inset:      0,
          background: 'rgba(10,10,10,0.72)',
          zIndex:     1,
        }} />

        {/* Text content */}
        <div style={{
          position: 'relative',
          zIndex:   2,
          padding:  '28px 36px',
          height:   '100%',
          display:  'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '6px',
        }}>

          {/* Logo image or org name */}
          <div style={{ marginBottom: '10px' }}>
            {award.logo ? (
              <img
                src={award.logo}
                alt={award.org}
                style={{
                  height:  '33px',
                  width:   'auto',
                  filter:  'brightness(0) invert(1)',
                  display: 'block',
                }}
              />
            ) : (
              <p style={{
                fontFamily:    "'Plus Jakarta Sans', sans-serif",
                fontSize:      '32px',
                fontWeight:    600,
                color:         'rgba(255,255,255,0.6)',
                margin:        0,
                letterSpacing: '0.02em',
              }}>
                {award.org}
              </p>
            )}
          </div>

          {/* Title */}
          <h4 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize:   '32px',
            fontWeight: 700,
            color:      '#ffffff',
            margin:     '0 0 4px 0',
            lineHeight: 1.2,
          }}>
            {award.title}
          </h4>

          {/* Year */}
          <p style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize:   '20px',
            color:      'rgba(255,255,255,0.35)',
            margin:     0,
          }}>
            {award.year}
          </p>

        </div>

        {/* Large watermark — bgImage as bottom-right faded overlay */}
        {award.bgImage && (
          <img
            src={award.bgImage}
            alt=""
            aria-hidden="true"
            style={{
              position:      'absolute',
              right:         '-10px',
              bottom:        '-10px',
              width:         '146px',
              height:        '123px',
              objectFit:     'contain',
              objectPosition:'bottom right',
              transition:    'opacity 0.3s ease',
              pointerEvents: 'none',
              zIndex:        2,
            }}
          />
        )}

      </div>
    </div>
  )
}