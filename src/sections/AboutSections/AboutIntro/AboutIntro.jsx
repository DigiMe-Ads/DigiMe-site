import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useScrollReveal } from '../../../hooks/useScrollReveal'

// ── Features config — add icon image paths when ready ──
const FEATURES = [
  {
    title: 'Established for',
    body:  'Designed from day one to scale with you whether you are launching an MVP or expanding fast.',
    icon:  '/images/About/established.png',   
  },
  {
    title: 'Ingenuity',
    body:  'We solve complex problems with elegant solutions — no templates, no shortcuts.',
    icon:  '/images/About/inginuity.png',   
  },
  {
    title: 'Low-cost',
    body:  'Transparent, flexible pricing that scales with your project, not against your budget.',
    icon:  '/images/About/low-cost.png',   
  },
]

const STYLES = `
  @keyframes springFloat {
    0%, 100% { transform: translateY(0px)  rotate(0deg);  }
    50%       { transform: translateY(-14px) rotate(6deg); }
  }
  @keyframes videoTextFade {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  @media (max-width: 1200px) {
    .abt-intro-inner { padding-left: 120px !important; padding-right: 80px !important; }
  }
  @media (max-width: 992px) {
    .abt-intro-inner   { padding-left: 60px !important; padding-right: 60px !important; }
    .abt-intro-top     { flex-direction: column !important; }
    .abt-intro-heading { width: 100% !important; }
    .abt-intro-body    { width: 100% !important; padding-top: 0 !important; }
    .abt-spring        { display: none !important; }
    .abt-geo           { display: none !important; }
    .abt-features      { grid-template-columns: 1fr !important; }
  }
  @media (max-width: 768px) {
    .abt-intro-inner { padding-left: 24px !important; padding-right: 24px !important; }
    .abt-video-card  { height: 280px !important; }
  }
  @media (max-width: 480px) {
    .abt-intro-inner { padding-left: 16px !important; padding-right: 16px !important; }
  }
`

export default function AboutIntro() {
  const geoRef      = useRef(null)
  const sectionRef  = useRef(null)
  const headReveal  = useScrollReveal({ threshold: 0.1 })
  const bodyReveal  = useScrollReveal({ threshold: 0.1 })
  const featReveal  = useScrollReveal({ threshold: 0.1 })
  const videoReveal = useScrollReveal({ threshold: 0.1 })
  const [videoHovered, setVideoHovered] = useState(false)

  useEffect(() => {
    if (document.getElementById('abt-intro-styles')) return
    const s = document.createElement('style')
    s.id = 'abt-intro-styles'
    s.textContent = STYLES
    document.head.appendChild(s)
  }, [])

  // ── Three.js dodecahedron — very faint wireframe ──
  useEffect(() => {
    const canvas = geoRef.current
    if (!canvas) return
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(canvas.clientWidth, canvas.clientHeight)

    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    camera.position.set(0, 0, 5)

    // Dodecahedron — 12 pentagonal faces, matches screenshot shape
    const geo  = new THREE.DodecahedronGeometry(1.6, 0)
    const mat  = new THREE.MeshBasicMaterial({
      color:       0xffffff,
      wireframe:   true,
      transparent: true,
      opacity:     0.07,   // very faint — doesn't overpower
    })
    const mesh = new THREE.Mesh(geo, mat)
    scene.add(mesh)

    const onResize = () => renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    window.addEventListener('resize', onResize)

    let raf
    const animate = () => {
      raf = requestAnimationFrame(animate)
      mesh.rotation.y += 0.003
      mesh.rotation.x += 0.001
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(raf)
      renderer.dispose()
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about-intro"
      style={{
        position:   'relative',
        background: '#0a0a0a',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        overflow:   'hidden',
      }}
    >

      {/* ── Geo canvas — left side, behind content ── */}
      <canvas
        ref={geoRef}
        className="abt-geo"
        aria-hidden="true"
        style={{
          position:      'absolute',
          left:          '-6%',
          top:           '50%',
          transform:     'translateY(-50%)',
          width:         'clamp(260px, 28vw, 420px)',
          height:        'clamp(260px, 28vw, 420px)',
          pointerEvents: 'none',
          zIndex:        0,
        }}
      />

      {/* ── Spring image — right side ── */}
      <div
        className="abt-spring"
        aria-hidden="true"
        style={{
          position:      'absolute',
          right:         '-2%',
          top:           '4%',
          width:         'clamp(140px, 16vw, 240px)',
          pointerEvents: 'none',
          zIndex:        2,
          animation:     'springFloat 9s ease-in-out infinite',
        }}
      >
        <img
          src="/images/About/spring.png"
          alt=""
          style={{ width: '100%', height: 'auto', display: 'block' }}
          onError={e => e.currentTarget.style.display = 'none'}
        />
      </div>

      {/* ── Main content ── */}
      <div
        className="abt-intro-inner"
        style={{
          position:      'relative',
          zIndex:        1,
          paddingLeft:   '285px',
          paddingRight:  '285px',
          paddingTop:    '80px',
          paddingBottom: '0',
        }}
      >

        {/* ── Top row: eyebrow+heading LEFT, body text RIGHT ── */}
        <div
          className="abt-intro-top"
          style={{ display: 'flex', gap: '60px', marginBottom: '48px' }}
        >

          {/* Left: eyebrow + heading */}
          <div
            className="abt-intro-heading"
            ref={headReveal.ref}
            style={{
              width:      '52%',
              flexShrink: 0,
              opacity:    headReveal.isVisible ? 1 : 0,
              transform:  headReveal.isVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            {/* Eyebrow */}
            <p style={{
              display:       'flex',
              alignItems:    'center',
              gap:           '8px',
              fontSize:      '11px',
              fontWeight:    600,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color:         'rgba(255,255,255,0.45)',
              marginBottom:  '20px',
            }}>
              <span style={{ color: '#0f911e', fontSize: '10px' }}>✦</span>
              Who We Are
            </p>

            {/* Heading */}
            <h2 style={{
              fontFamily:   "'Plus Jakarta Sans', sans-serif",
              fontSize:     'clamp(1.8rem, 2.8vw, 2.8rem)',
              fontWeight:   700,
              lineHeight:   1.2,
              color:        '#ffffff',
              margin:       0,
              letterSpacing:'-0.01em',
            }}>
              We are dedicated to creating high-tech web experiences that beautifully unite{' '}
              <span style={{ color: '#0f911e' }}>creativity and innovation</span>
            </h2>
          </div>

          {/* Right: body paragraph */}
          <div
            className="abt-intro-body"
            ref={bodyReveal.ref}
            style={{
              flex:       1,
              paddingTop: '52px',   // aligns roughly with heading start
              opacity:    bodyReveal.isVisible ? 1 : 0,
              transform:  bodyReveal.isVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.8s ease 0.1s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s',
            }}
          >
            <p style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize:   '14px',
              lineHeight: '24px',
              color:      'rgba(255,255,255,0.45)',
              margin:     0,
            }}>
              We partner with ambitious brands to design and build digital products that perform as 
              beautifully as they look. From concept to launch, our team brings together deep 
              technical expertise and sharp creative thinking — delivering experiences users 
              actually remember.
            </p>
          </div>
        </div>

        {/* ── Feature row ── */}
        <div
          ref={featReveal.ref}
          className="abt-features"
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap:                 '0',
            borderTop:           '1px solid rgba(255,255,255,0.07)',
            marginBottom:        '64px',
            opacity:             featReveal.isVisible ? 1 : 0,
            transform:           featReveal.isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition:          'opacity 0.7s ease 0.2s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s',
          }}
        >
          {FEATURES.map((feat, i) => (
            <FeatureCell key={feat.title} feat={feat} index={i} last={i === FEATURES.length - 1} />
          ))}
        </div>

      </div>

      {/* ── Video banner — full width within padding ── */}
      <div
        className="abt-intro-inner"
        style={{
          position:    'relative',
          zIndex:      1,
          paddingLeft: '285px',
          paddingRight:'285px',
          paddingBottom:'80px',
        }}
      >
        <div
          ref={videoReveal.ref}
          className="abt-video-card"
          onMouseEnter={() => setVideoHovered(true)}
          onMouseLeave={() => setVideoHovered(false)}
          style={{
            position:     'relative',
            height:       '360px',
            borderRadius: '16px',
            overflow:     'hidden',
            cursor:       'pointer',
            opacity:      videoReveal.isVisible ? 1 : 0,
            transform:    videoReveal.isVisible ? 'translateY(0)' : 'translateY(28px)',
            transition:   'opacity 0.8s ease 0.25s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.25s',
          }}
        >
          {/* Video thumbnail image */}
          <img
            src="/images/About/video.jpg"
            alt="Watch the video"
            style={{
              position:   'absolute',
              inset:      0,
              width:      '100%',
              height:     '100%',
              objectFit:  'cover',
              display:    'block',
              transition: 'transform 0.6s ease',
              transform:  videoHovered ? 'scale(1.04)' : 'scale(1)',
            }}
            onError={e => {
              e.currentTarget.style.display = 'none'
              e.currentTarget.nextSibling.style.display = 'block'
            }}
          />
          {/* Gradient fallback */}
          <div style={{
            display:    'none',
            position:   'absolute',
            inset:      0,
            background: 'linear-gradient(135deg, #1a2a1a 0%, #0a1a0a 100%)',
          }} />

          {/* Dark overlay */}
          <div style={{
            position:   'absolute',
            inset:      0,
            background: videoHovered
              ? 'rgba(0,0,0,0.35)'
              : 'rgba(0,0,0,0.45)',
            transition: 'background 0.3s ease',
            zIndex:     1,
          }} />

          {/* "Watch The Video" handwriting text */}
          <div style={{
            position:        'absolute',
            top:             '50%',
            left:            '50%',
            transform:       'translate(-50%, -50%)',
            zIndex:          2,
            textAlign:       'center',
            pointerEvents:   'none',
            animation:       'videoTextFade 0.6s ease forwards',
          }}>
            <p style={{
              fontFamily:    "'Dancing Script', cursive, 'Plus Jakarta Sans', sans-serif",
              fontSize:      'clamp(2rem, 4vw, 3.2rem)',
              fontWeight:    700,
              color:         'rgba(255,255,255,0.85)',
              margin:        0,
              letterSpacing: '0.02em',
              textShadow:    '0 2px 20px rgba(0,0,0,0.5)',
              whiteSpace:    'nowrap',
            }}>
              Watch The Video
            </p>
          </div>

          {/* Green circle play button — right side */}
          <div style={{
            position:       'absolute',
            right:          '5%',
            top:            '50%',
            transform:      `translateY(-50%) scale(${videoHovered ? 1.1 : 1})`,
            transition:     'transform 0.3s ease',
            zIndex:         2,
          }}>
            {/* Green blob behind play btn */}
            <div style={{
              position:      'absolute',
              top:           '50%',
              left:          '50%',
              transform:     'translate(-50%, -50%)',
              width:         '120px',
              height:        '120px',
              borderRadius:  '50%',
              background:    'rgba(59,255,108,0.25)',
              filter:        'blur(20px)',
              pointerEvents: 'none',
            }} />
            <button
              aria-label="Play video"
              style={{
                position:       'relative',
                width:          '56px',
                height:         '56px',
                borderRadius:   '50%',
                background:     '#0f911e',
                border:         'none',
                cursor:         'pointer',
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                transition:     'background 0.25s ease',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#0a0a0a">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Load Dancing Script for the handwriting look */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap"
      />
    </section>
  )
}

function FeatureCell({ feat, index, last }) {
  const [hovered, setHovered] = useState(false)

  // Fallback SVG icons
  const ICONS = [
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 0 1 4-4h4"/><circle cx="17" cy="17" r="4"/><path d="M13 17h8"/>
    </svg>,
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7z"/>
    </svg>,
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
    </svg>,
  ]

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display:      'flex',
        gap:          '16px',
        padding:      '32px 32px 32px 0',
        paddingRight: last ? 0 : '32px',
        borderRight:  last ? 'none' : '1px solid rgba(255,255,255,0.07)',
        marginLeft:   index === 0 ? 0 : '32px',
        transition:   'opacity 0.25s ease',
        opacity:      hovered ? 1 : 0.75,
        cursor:       'default',
      }}
    >
      {/* Icon badge */}
      <div style={{
        width:          '48px',
        height:         '48px',
        borderRadius:   '10px',
        background:     'rgba(59,255,108,0.07)',
        border:         '1px solid rgba(59,255,108,0.15)',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        flexShrink:     0,
        color:          '#0f911e',
        overflow:       'hidden',
        transition:     'background 0.25s ease',
        ...(hovered ? { background: 'rgba(59,255,108,0.14)' } : {}),
      }}>
        {feat.icon ? (
          <img
            src={feat.icon}
            alt={feat.title}
            style={{ width: '24px', height: '24px', objectFit: 'contain' }}
          />
        ) : ICONS[index]}
      </div>

      {/* Text */}
      <div>
        <h4 style={{
          fontFamily:   "'Plus Jakarta Sans', sans-serif",
          fontSize:     '15px',
          fontWeight:   700,
          color:        '#ffffff',
          margin:       '0 0 6px',
          lineHeight:   1.3,
        }}>
          {feat.title}
        </h4>
        <p style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize:   '13px',
          lineHeight: '20px',
          color:      'rgba(255,255,255,0.4)',
          margin:     0,
        }}>
          {feat.body}
        </p>
      </div>
    </div>
  )
}