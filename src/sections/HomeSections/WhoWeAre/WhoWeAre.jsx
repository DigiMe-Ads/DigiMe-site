import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

const SERVICES_LEFT  = [
  'Digital Marketing',
  'Social Media Marketing',
  'Content Marketing',
  'Email Marketing',
  'Branding and Creative',
]
const SERVICES_RIGHT = [
  'Analytics Data-Driven Insights',
  'E-Commerce Solutions',
  'Technology and Innovation',
  'Innovation & Marketing',
]

const KEYFRAMES = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  @keyframes wwaTiltFloat1 {
    0%, 100% { transform: rotate(-6deg) translateY(0px);  }
    50%       { transform: rotate(-8deg) translateY(-6px); }
  }
  @keyframes wwaTiltFloat2 {
    0%, 100% { transform: rotate(5deg)  translateY(0px);  }
    50%       { transform: rotate(7deg) translateY(-4px); }
  }

  /* ── TABLET (769–1024px): stack layout, keep torus, remove dot grid ── */
  @media (min-width: 769px) and (max-width: 1024px) {
    .wwa-panel      { margin-left: 32px !important; margin-right: 32px !important; background-image: none !important; }
    .wwa-inner      { padding-left: 40px !important; padding-right: 40px !important; }
    .wwa-layout     { flex-direction: column !important; gap: 48px !important; }
    .wwa-left       { width: 100% !important; }
    .wwa-services   { padding-top: 0 !important; }
  }

  /* ── MOBILE (≤768px): hide torus, VIEW MORE, dot grid; stack everything ── */
  @media (max-width: 768px) {
    .wwa-torus      { display: none !important; }
    .wwa-viewmore   { display: none !important; }
    .wwa-panel      {
      margin-left:      16px !important;
      margin-right:     16px !important;
      margin-top:       24px !important;
      border-radius:    16px !important;
      background-image: none !important;
    }
    .wwa-inner      {
      padding-left:   20px !important;
      padding-right:  20px !important;
      padding-top:    32px !important;
      padding-bottom: 32px !important;
    }
    .wwa-layout     { flex-direction: column !important; gap: 32px !important; }
    .wwa-left       { width: 100% !important; }
    .wwa-photo-stack { height: 280px !important; max-width: 100% !important; }
    .wwa-services   {
      padding-top:           0 !important;
      grid-template-columns: 1fr !important;
    }
    .wwa-svc-col-right { display: none !important; }
  }
`

const SVC_ITEM_BASE = {
  fontFamily:   "'Plus Jakarta Sans', sans-serif",
  fontSize:     'clamp(0.85rem, 1.1vw, 0.95rem)',
  fontWeight:   400,
  padding:      '18px 0',
  borderBottom: '1px solid rgba(255,255,255,0.07)',
  transition:   'color 0.25s ease, border-color 0.25s ease',
  cursor:       'default',
  display:      'flex',
  alignItems:   'center',
  gap:          '8px',
}

export default function WhoWeAre() {
  const torusRef   = useRef(null)
  const sectionRef = useRef(null)
  const vmRef      = useRef(null)
  const [hoveredLeft,  setHoveredLeft]  = useState(null)
  const [hoveredRight, setHoveredRight] = useState(null)

  // Inject keyframes + responsive rules once
  useEffect(() => {
    if (document.getElementById('wwa-kf')) return
    const s = document.createElement('style')
    s.id = 'wwa-kf'
    s.textContent = KEYFRAMES
    document.head.appendChild(s)
  }, [])

  // Three.js wireframe torus
  useEffect(() => {
    const canvas = torusRef.current
    if (!canvas) return
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    camera.position.set(0, 0, 5)
    const geo   = new THREE.TorusGeometry(1.35, 0.52, 20, 80)
    const mat   = new THREE.MeshBasicMaterial({ color: 0xd8b4fe, wireframe: true, transparent: true, opacity: 0.75 })
    const torus = new THREE.Mesh(geo, mat)
    torus.rotation.x = 0.5
    torus.rotation.z = 0.15
    scene.add(torus)
    const onResize = () => renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    window.addEventListener('resize', onResize)
    let raf
    const animate = () => {
      raf = requestAnimationFrame(animate)
      torus.rotation.y += 0.005
      renderer.render(scene, camera)
    }
    animate()
    return () => { cancelAnimationFrame(raf); renderer.dispose(); window.removeEventListener('resize', onResize) }
  }, [])

  // VIEW MORE parallax scroll
  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current
      const vm = vmRef.current
      if (!el || !vm) return
      const rect     = el.getBoundingClientRect()
      const progress = -rect.top / rect.height
      vm.style.transform = `translateX(${Math.max(-25, progress * -12)}vw)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="who-we-are"
      style={{
        position:   'relative',
        background: '#0a0a0a',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        overflow:   'hidden',
        minHeight:  '100vh',
      }}
    >

      {/* Giant VIEW MORE — hidden on mobile via .wwa-viewmore class */}
      <div
        ref={vmRef}
        aria-hidden="true"
        className="wwa-viewmore"
        style={{
          position:      'absolute',
          top:           '-10px',
          left:          0,
          zIndex:        5,
          fontFamily:    "'Plus Jakarta Sans', sans-serif",
          fontSize:      'clamp(5rem, 12vw, 10rem)',
          fontWeight:    800,
          letterSpacing: '-0.02em',
          lineHeight:    1,
          color:         'rgba(255,255,255,0.09)',
          whiteSpace:    'nowrap',
          pointerEvents: 'none',
          userSelect:    'none',
          willChange:    'transform',
          paddingLeft:   '40px',
        }}
      >
        VIEW{' '}
        <span style={{ color: 'rgba(59,255,108,0.75)' }}>MORE</span>
      </div>

      {/* Torus — hidden on mobile via .wwa-torus class */}
      <canvas
        ref={torusRef}
        aria-hidden="true"
        className="wwa-torus"
        style={{
          position:      'absolute',
          top:           0,
          right:         '2%',
          width:         'clamp(160px, 18vw, 280px)',
          height:        'clamp(160px, 18vw, 280px)',
          pointerEvents: 'none',
          zIndex:        10,
        }}
      />

      {/* Main content panel — dot grid hidden on mobile via .wwa-panel class */}
      <div
        className="wwa-panel"
        style={{
          position:        'relative',
          zIndex:          2,
          marginTop:       '100px',
          marginBottom:    '80px',
          marginLeft:      'clamp(24px, 18vw, 120px)',
          marginRight:     'clamp(24px, 8vw, 120px)',
          borderRadius:    '20px',
          background:      '#161a0d',
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)',
          backgroundSize:  '28px 28px',
          boxShadow:       '0 0 0 1px rgba(59,255,108,0.06)',
        }}
      >

        {/* Wavy ambient SVG lines */}
        <svg
          aria-hidden="true"
          viewBox="0 0 600 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position:      'absolute',
            bottom:        0,
            left:          0,
            width:         '55%',
            opacity:       0.18,
            pointerEvents: 'none',
            zIndex:        0,
            borderRadius:  '0 0 0 20px',
            overflow:      'hidden',
          }}
        >
          {[0,20,40,60,80,100,120,140,160,180,200].map((offset, i) => (
            <path
              key={i}
              d={`M-50 ${200 + offset} Q150 ${120 + offset} 300 ${200 + offset} T650 ${200 + offset}`}
              stroke="rgba(59,255,108,0.6)"
              strokeWidth="1"
              fill="none"
            />
          ))}
        </svg>

        {/* Inner content */}
        <div
          className="wwa-inner"
          style={{
            position:      'relative',
            zIndex:        1,
            paddingTop:    '64px',
            paddingBottom: '64px',
            paddingLeft:   'clamp(44px, 6vw, 84px)',
            paddingRight:  'clamp(24px, 4vw, 64px)',
            width:         '100%',
            boxSizing:     'border-box',
          }}
        >
          <div
            className="wwa-layout"
            style={{ display: 'flex', gap: '80px', alignItems: 'flex-start' }}
          >

            {/* ── LEFT ── */}
            <div className="wwa-left" style={{ width: '40%', flexShrink: 0 }}>

              <p style={{
                display:       'flex',
                alignItems:    'center',
                gap:           '8px',
                fontSize:      '11px',
                fontWeight:    600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color:         'rgba(255,255,255,0.45)',
                margin:        '0 0 12px 0',
              }}>
                <span style={{ color: '#0f911e', fontSize: '10px' }}>✦</span>
                Who We Are
              </p>

              <h2 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize:   'clamp(1.8rem, 2.5vw, 2.75rem)',
                fontWeight: 700,
                lineHeight: 1.2,
                color:      '#ffffff',
                margin:     '0 0 32px 0',
              }}>
                Where imagination<br />
                crosses{' '}
                <span style={{ color: '#0f911e' }}>the finish line</span>
              </h2>

              {/* Photo stack */}
              <div
                className="wwa-photo-stack"
                style={{ position: 'relative', height: '400px', width: '100%', maxWidth: '320px' }}
              >
                <div style={{
                  position:        'absolute',
                  inset:           0,
                  borderRadius:    '20px',
                  background:      'linear-gradient(135deg, #1a2e1a 0%, #0f1f0f 100%)',
                  border:          '1px solid rgba(59,255,108,0.15)',
                  animation:       'wwaTiltFloat1 7s ease-in-out infinite',
                  transformOrigin: 'bottom center',
                  zIndex:          1,
                }} />
                <div style={{
                  position:        'absolute',
                  inset:           0,
                  borderRadius:    '20px',
                  background:      'linear-gradient(135deg, #1f1a2e 0%, #120f1f 100%)',
                  border:          '1px solid rgba(168,85,247,0.15)',
                  animation:       'wwaTiltFloat2 8s ease-in-out infinite',
                  transformOrigin: 'bottom center',
                  zIndex:          2,
                }} />
                <div style={{
                  position:     'absolute',
                  inset:        '8px',
                  borderRadius: '16px',
                  overflow:     'hidden',
                  zIndex:       3,
                  boxShadow:    '0 20px 60px rgba(0,0,0,0.6)',
                  border:       '2px solid rgba(59,180,255,0.55)',
                }}>
                  <img
                    src="/images/Home/who-we-are.jpg"
                    alt="Our team"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    onError={e => {
                      e.currentTarget.style.display = 'none'
                      e.currentTarget.parentElement.innerHTML =
                        '<div style="width:100%;height:100%;background:linear-gradient(160deg,#1c2a1c,#151520,#1a1228);display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.15);font-size:13px;letter-spacing:0.1em;">team photo</div>'
                    }}
                  />
                </div>
              </div>

            </div>

            {/* ── RIGHT: services grid — right col hidden on mobile ── */}
            <div
              className="wwa-services"
              style={{
                flex:                1,
                paddingTop:          '174px',
                display:             'grid',
                gridTemplateColumns: '1fr 1fr',
                alignItems:          'start',
              }}
            >
              {/* LEFT service column — always visible */}
              <div>
                {SERVICES_LEFT.map((name, i) => (
                  <div
                    key={i}
                    onMouseEnter={() => setHoveredLeft(i)}
                    onMouseLeave={() => setHoveredLeft(null)}
                    style={{
                      ...SVC_ITEM_BASE,
                      fontWeight:          hoveredLeft === i ? 600 : 400,
                      color:               hoveredLeft === i ? '#ffffff' : 'rgba(255,255,255,0.55)',
                      textDecoration:      hoveredLeft === i ? 'underline' : 'none',
                      textDecorationColor: '#0f911e',
                      textUnderlineOffset: '5px',
                      borderBottomColor:   hoveredLeft === i ? 'rgba(59,255,108,0.2)' : 'rgba(255,255,255,0.07)',
                    }}
                  >
                    {hoveredLeft === i && (
                      <span style={{ color: '#0f911e', fontSize: '9px', flexShrink: 0 }}>✦</span>
                    )}
                    {name}
                  </div>
                ))}
              </div>

              {/* RIGHT service column — hidden on mobile via class */}
              <div className="wwa-svc-col-right">
                {SERVICES_RIGHT.map((name, i) => (
                  <div
                    key={i}
                    onMouseEnter={() => setHoveredRight(i)}
                    onMouseLeave={() => setHoveredRight(null)}
                    style={{
                      ...SVC_ITEM_BASE,
                      color:             hoveredRight === i ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.35)',
                      borderBottomColor: hoveredRight === i ? 'rgba(59,255,108,0.1)' : 'rgba(255,255,255,0.07)',
                    }}
                  >
                    {name}
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>
      </div>

    </section>
  )
}