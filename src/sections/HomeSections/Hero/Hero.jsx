import { useEffect, useState } from 'react'
import { HERO_KEYFRAMES } from './heroData'
import OrbitTextSVG  from './OrbitTextSVG'
import BrandCarousel from './BrandCarousel'

export default function Hero() {
  const [loaded, setLoaded] = useState(false)

  // Inject keyframes once
  useEffect(() => {
    if (document.getElementById('hero-kf')) return
    const style = document.createElement('style')
    style.id = 'hero-kf'
    style.textContent = HERO_KEYFRAMES
    document.head.appendChild(style)
  }, [])

  useEffect(() => {
    const id = setTimeout(() => setLoaded(true), 120)
    return () => clearTimeout(id)
  }, [])

  const handleReadMore = () => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })

  // Shared fade-up animation helper — passed down to BrandCarousel
  const fadeUp = (delay) => ({
    opacity:    loaded ? 1 : 0,
    transform:  loaded ? 'translateY(0)' : 'translateY(22px)',
    transition: `opacity 0.75s ease ${delay}s, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
  })

  return (
    <section
      id="home"
      style={{
        position:   'relative',
        minHeight:  '100vh',
        overflow:   'hidden',
        background: '#0a0a0a',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {/* ── Floating 3D-render objects ── */}
      {/* Large wireframe object — upper right */}
      <div
        className="hero-3d-obj"
        aria-hidden="true"
        style={{
          position:      'absolute',
          top:           '6%',
          right:         '4%',
          width:         'clamp(240px, 24vw, 420px)',
          zIndex:        0,
          pointerEvents: 'none',
          animation:     'obj3dFloatLarge 7s ease-in-out infinite',
        }}
      >
        <img
          src="/images/3d/hero-top-large.png"
          alt=""
          style={{
            width:  '100%',
            height: 'auto',
            display: 'block',
            opacity: 0.5,
            filter:  'drop-shadow(0 0 46px rgba(15,145,30,0.22))',
          }}
        />
      </div>

      {/* Small wireframe object — lower, layered behind text edge */}
      <div
        className="hero-3d-obj"
        aria-hidden="true"
        style={{
          position:      'absolute',
          bottom:        '14%',
          right:         '28%',
          width:         'clamp(130px, 13vw, 220px)',
          zIndex:        0,
          pointerEvents: 'none',
          animation:     'obj3dFloatSmall 8.5s ease-in-out infinite',
        }}
      >
        <img
          src="/images/3d/hero-bottom-small.png"
          alt=""
          style={{
            width:  '100%',
            height: 'auto',
            display: 'block',
            opacity: 0.4,
            filter:  'drop-shadow(0 0 32px rgba(15,145,30,0.2))',
          }}
        />
      </div>

      {/* Background glow */}
      <div aria-hidden="true" style={{
        position:      'absolute',
        top:           '-8%',
        left:          '-10%',
        width:         '42%',
        height:        '55%',
        background:    'radial-gradient(ellipse at center, rgba(217,231,23,0.55) 0%, rgba(24,27,10,0.25) 40%, transparent 72%)',
        pointerEvents: 'none',
        opacity:       0.1,
        zIndex:        0,
        animation:     'glowPulse 5s ease-in-out infinite',
        filter:        'blur(2px)',
      }}/>

      {/* Spinning orbit ring */}
      <div
        className="hero-orbit"
        aria-hidden="true"
        style={{
          position:      'absolute',
          top:           '50%',
          right:         '22%',
          transform:     'translateY(-55%)',
          width:         'clamp(120px, 12vw, 170px)',
          height:        'clamp(120px, 12vw, 170px)',
          zIndex:        2,
          pointerEvents: 'none',
        }}
      >
        <OrbitTextSVG />
      </div>

      {/* Main content */}
      <div
        className="hero-inner"
        style={{
          position:      'relative',
          zIndex:        1,
          paddingTop:    '72px',
          minHeight:     '100vh',
          display:       'flex',
          flexDirection: 'column',
          justifyContent:'space-between',
          paddingLeft:   '285px',
          paddingRight:  '0',
          overflow:      'visible',
        }}
      >
        {/* ── Hero text block ── */}
        <div
          className="d-flex align-items-center"
          style={{ flex: 1, padding: '40px 0 30px' }}
        >
          <div style={{ maxWidth: '645px' }}>

            <p style={{
              ...fadeUp(0.2),
              display:       'flex',
              alignItems:    'center',
              gap:           '8px',
              fontSize:      '13px',
              fontWeight:    500,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color:         'rgba(255,255,255,0.55)',
              marginBottom:  '20px',
            }}>
              <span style={{ color: '#0f911e', fontSize: '12px' }}>✦</span>
              Stop  <span style={{ color: '#0f911e', fontWeight: 300 }}>Guessing,</span>
              Start  <span style={{ color: '#0f911e', fontWeight: 300 }}>Growing</span>
            </p>

            <h1
              className="hero-h1"
              style={{
                ...fadeUp(0.35),
                fontFamily:    "'Plus Jakarta Sans', sans-serif",
                fontSize:      '70px',
                fontWeight:    700,
                lineHeight:    '80px',
                letterSpacing: '-0.01em',
                marginBottom:  '24px',
                color:         '#ffffff',
              }}
            >
              <span style={{ fontWeight: 700 }}>Growth </span>{' '}
              <span style={{ color: '#0f911e', fontWeight: 300 }}>starts with the right</span>
              {' '}<span style={{ fontWeight: 700 }}>Strategy.  </span>
            </h1>

            <p style={{
              ...fadeUp(0.5),
              fontSize:     '15px',
              fontWeight:   400,
              lineHeight:   '26px',
              color:        'rgba(255,255,255,0.5)',
              maxWidth:     '400px',
              marginBottom: '36px',
            }}>
              We are here to boost your digital game.
            </p>

            <div style={fadeUp(0.65)}>
              <button
                onClick={handleReadMore}
                style={{
                  display:      'inline-flex',
                  alignItems:   'center',
                  gap:          '10px',
                  background:   '#0f911e',
                  color:        '#0a0a0a',
                  fontFamily:   "'Plus Jakarta Sans', sans-serif",
                  fontSize:     '14px',
                  fontWeight:   600,
                  border:       'none',
                  borderRadius: '100px',
                  padding:      '12px 20px 12px 26px',
                  cursor:       'none',
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
                Read More
                <span style={{
                  width:          '34px',
                  height:         '34px',
                  background:     'rgba(0,0,0,0.22)',
                  borderRadius:   '50%',
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  flexShrink:     0,
                }}>
                  <svg width="10" height="10" viewBox="0 0 10 10">
                    <circle cx="5" cy="5" r="5" fill="white" opacity="0.4"/>
                    <circle cx="5" cy="5" r="2" fill="white"/>
                  </svg>
                </span>
              </button>
            </div>

          </div>
        </div>

        {/* ── Brand carousel trust bar ── */}
        <BrandCarousel fadeUp={fadeUp} />

      </div>
    </section>
  )
}