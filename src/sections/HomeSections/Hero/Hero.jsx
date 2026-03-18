import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

const BRANDS = [
  { name: 'Houwzer',   logo: '/images/Howzer.png'    },
  { name: 'Contra',    logo: '/images/logo2.png'     },
  { name: 'Proline',   logo: '/images/proline.png'   },
  { name: 'logoipsum', logo: '/images/logoipsum.png' },
  { name: 'Loop',      logo: '/images/logo1.png'     },
]

const KEYFRAMES = `
  @keyframes glowPulse {
    0%, 100% { opacity: 0.55; transform: scale(1);    }
    50%       { opacity: 0.75; transform: scale(1.08); }
  }
  @keyframes spinText {
    from { transform: rotate(0deg);   }
    to   { transform: rotate(360deg); }
  }
  /* Responsive nav padding helper */
  @media (max-width: 1200px) {
    .hero-inner { padding-left: 120px !important; }
  }
  @media (max-width: 992px) {
    .hero-inner { padding-left: 60px !important; }
    .hero-trust-bar { margin-left: -60px !important; }
  }
  @media (max-width: 768px) {
    .hero-inner { padding-left: 24px !important; padding-right: 24px !important; }
    .hero-trust-bar { margin-left: -24px !important; margin-right: -24px !important; }
    .hero-trust-logos { overflow-x: auto; flex-wrap: nowrap; }
    .hero-h1 { font-size: 48px !important; line-height: 58px !important; }
    .hero-orbit { display: none !important; }
    .hero-trusted-label { min-width: 160px !important; padding: 20px !important; }
  }
  @media (max-width: 480px) {
    .hero-h1 { font-size: 36px !important; line-height: 44px !important; }
    .hero-inner { padding-left: 16px !important; padding-right: 16px !important; }
    .hero-trust-bar { margin-left: -16px !important; margin-right: -16px !important; }
  }
`

// Circular SVG text "MY PROJECTS" with arrow — matches the uploaded image exactly
function OrbitTextSVG() {
  return (
    <svg
      viewBox="0 0 200 200"
      width="100%"
      height="100%"
      style={{ overflow: 'visible' }}
      aria-hidden="true"
    >
      {/* Circular text path */}
      <defs>
        <path
          id="circle-path"
          d="M 100,100 m -72,0 a 72,72 0 1,1 144,0 a 72,72 0 1,1 -144,0"
        />
      </defs>

      {/* Rotating text group */}
      <g style={{ animation: 'spinText 14s linear infinite', transformOrigin: '100px 100px' }}>
        <text
          style={{
            fontSize:      '13.5px',
            fontFamily:    "'Plus Jakarta Sans', sans-serif",
            fontWeight:    500,
            fill:          'rgba(255,255,255,0.85)',
            letterSpacing: '4px',
          }}
        >
          <textPath href="#circle-path" startOffset="0%">
            S · T · O · R · Y · P · M · Y · P · R · O · J · E · C · T · S ·
          </textPath>
        </text>
      </g>

      {/* Two small bullet dots on the circle edge */}
      <circle cx="28"  cy="100" r="3" fill="rgba(255,255,255,0.6)" />
      <circle cx="100" cy="28"  r="3" fill="rgba(255,255,255,0.6)" />

      {/* Arrow in center */}
      <g transform="translate(100, 100)">
        {/* Arrow shaft */}
        <line
          x1="0" y1="-18"
          x2="0" y2="14"
          stroke="#34A853"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        {/* Arrow head */}
        <polyline
          points="-8,-4 0,14 8,-4"
          fill="none"
          stroke="#34A853"
          strokeWidth="1.8"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </g>
    </svg>
  )
}

export default function Hero() {
  const canvasRef = useRef(null)
  const [loaded, setLoaded] = useState(false)

  // Inject keyframes once
  useEffect(() => {
    if (document.getElementById('hero-kf')) return
    const style = document.createElement('style')
    style.id = 'hero-kf'
    style.textContent = KEYFRAMES
    document.head.appendChild(style)
  }, [])

  // ── Three.js rounded-cube blobs ──
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(canvas.clientWidth, canvas.clientHeight)

    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 100)
    camera.position.z = 5

    const makeBlob = (x, y, z, scale, speed) => {
      const geo     = new THREE.BoxGeometry(1, 1, 1, 14, 14, 14)
      const pos     = geo.attributes.position
      const orig    = new Float32Array(pos.array.length)
      const INFLATE = 0.82

      for (let i = 0; i < pos.count; i++) {
        const vx = pos.getX(i), vy = pos.getY(i), vz = pos.getZ(i)
        const len = Math.sqrt(vx * vx + vy * vy + vz * vz)
        const nx  = vx + (vx / len - vx) * INFLATE
        const ny  = vy + (vy / len - vy) * INFLATE
        const nz  = vz + (vz / len - vz) * INFLATE
        pos.setXYZ(i, nx, ny, nz)
        orig[i * 3] = nx; orig[i * 3 + 1] = ny; orig[i * 3 + 2] = nz
      }
      pos.needsUpdate = true

      const mesh = new THREE.Mesh(
        geo,
        new THREE.MeshBasicMaterial({ color: 0x2a2a2a, wireframe: true })
      )
      mesh.position.set(x, y, z)
      mesh.scale.setScalar(scale)
      mesh.userData = { speed, phase: Math.random() * Math.PI * 2, origPositions: orig }
      scene.add(mesh)
      return mesh
    }

    const blobs = [
      makeBlob( 3.2, -0.1,  0,    1.55, 0.32),
      makeBlob(-3.6, -0.6, -0.5,  1.05, 0.48),
    ]

    const onResize = () => {
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    }
    window.addEventListener('resize', onResize)

    let raf
    const clock = new THREE.Clock()

    const animate = () => {
      raf = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      blobs.forEach(blob => {
        blob.rotation.x = t * blob.userData.speed * 0.25
        blob.rotation.y = t * blob.userData.speed * 0.4
        blob.rotation.z = t * blob.userData.speed * 0.1

        const pos  = blob.geometry.attributes.position
        const orig = blob.userData.origPositions

        for (let i = 0; i < pos.count; i++) {
          const ox = orig[i * 3], oy = orig[i * 3 + 1], oz = orig[i * 3 + 2]
          const len   = Math.sqrt(ox * ox + oy * oy + oz * oz)
          const noise =
            Math.sin(t * 0.5 + ox * 2.5 + blob.userData.phase) * 0.5 +
            Math.cos(t * 0.4 + oy * 2.0) * 0.5
          const d = 1 + noise * 0.04
          pos.setXYZ(i, ox * d, oy * d, oz * d)
        }
        pos.needsUpdate = true
        blob.geometry.computeVertexNormals()
      })

      renderer.render(scene, camera)
    }

    animate()
    setTimeout(() => setLoaded(true), 120)

    return () => {
      cancelAnimationFrame(raf)
      renderer.dispose()
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const handleReadMore = () => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })

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

      {/* ── Three.js canvas ── */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position:      'absolute',
          inset:         0,
          width:         '100%',
          height:        '100%',
          pointerEvents: 'none',
          zIndex:        0,
        }}
      />

      {/* ── Green glow top-left ── */}
      <div
        aria-hidden="true"
        style={{
          position:      'absolute',
          top:           '-8%',
          left:          '-10%',
          width:         '42%',
          height:        '55%',
          background:    'radial-gradient(ellipse at center, rgba(217, 231, 23, 0.55) 0%, rgba(24, 27, 10, 0.25) 40%, transparent 72%)',
          pointerEvents: 'none',
          opacity:       0.1,
          zIndex:        0,
          animation:     'glowPulse 5s ease-in-out infinite',
          filter:        'blur(2px)',
        }}
      />

      {/* ── Orbit text circle — positioned over right blob area ── */}
      <div
        className="hero-orbit"
        aria-hidden="true"
        style={{
          position:  'absolute',
          // Sits roughly centre-right, in front of the right blob
          top:       '50%',
          right:     '22%',
          transform: 'translateY(-55%)',
          width:     'clamp(120px, 12vw, 170px)',
          height:    'clamp(120px, 12vw, 170px)',
          zIndex:    2,
          pointerEvents: 'none',
        }}
      >
        <OrbitTextSVG />
      </div>

      {/* ── Content wrapper with 285px left padding ── */}
      <div
        className="hero-inner"
        style={{
          position:       'relative',
          zIndex:         1,
          paddingTop:     '72px',
          minHeight:      '100vh',
          display:        'flex',
          flexDirection:  'column',
          justifyContent: 'space-between',
          paddingLeft:    '285px',
          paddingRight:   '0',
        }}
      >

        {/* ── Main text block ── */}
        <div
          className="d-flex align-items-center"
          style={{ flex: 1, padding: '40px 0 30px' }}
        >
          <div style={{ maxWidth: '645px' }}>

            {/* Eyebrow */}
            <p
              style={{
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
              }}
            >
              <span style={{ color: '#b5cc22', fontSize: '12px' }}>✦</span>
              Engineering a Better
            </p>

            {/* H1 */}
            <h1
              className="hero-h1"
              style={{
                ...fadeUp(0.35),
                fontFamily:    "'Plus Jakarta Sans', sans-serif",
                fontSize:      '80px',
                fontWeight:    700,
                lineHeight:    '96px',
                letterSpacing: '-0.01em',
                marginBottom:  '24px',
                color:         '#ffffff',
              }}
            >
              Innovating{' '}
              <span style={{ color: '#0f911e', fontWeight: 300 }}>for a</span>
              <br />
              <span style={{ color: '#0f911e', fontWeight: 300 }}>Better</span>
              {' '}Future
            </h1>

            {/* Sub */}
            <p
              style={{
                ...fadeUp(0.5),
                fontSize:     '15px',
                fontWeight:   400,
                lineHeight:   '26px',
                color:        'rgba(255,255,255,0.5)',
                maxWidth:     '400px',
                marginBottom: '36px',
              }}
            >
              We are here to boost your digital game.
            </p>

            {/* CTA button */}
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
                <span
                  style={{
                    width:          '34px',
                    height:         '34px',
                    background:     'rgba(0,0,0,0.22)',
                    borderRadius:   '50%',
                    display:        'flex',
                    alignItems:     'center',
                    justifyContent: 'center',
                    flexShrink:     0,
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 10 10">
                    <circle cx="5" cy="5" r="5" fill="white" opacity="0.4"/>
                    <circle cx="5" cy="5" r="2" fill="white"/>
                  </svg>
                </span>
              </button>
            </div>

          </div>
        </div>

        {/* ── Trusted by bar ── */}
        {/*
          Breaks out of the 285px padding with negative left margin
          so the bar spans the full page width
        */}
        <div
          className="hero-trust-bar"
          style={{
            ...fadeUp(0.85),
            borderTop:   '1px solid rgba(255,255,255,0.08)',
            display:     'flex',
            alignItems:  'stretch',
          }}
        >

          {/* Label cell */}
          <div
            className="hero-trusted-label"
            style={{
              padding:     '28px 40px',
              borderRight: '1px solid rgba(255,255,255,0.08)',
              minWidth:    '220px',
              flexShrink:  0,
              display:     'flex',
              alignItems:  'center',
            }}
          >
            <p style={{ fontSize: '15px', fontWeight: 600, lineHeight: '22px', color: '#fff', margin: 0 }}>
              Trusted by{' '}
              <span style={{ color: '#0f911e' }}>25k+</span>
              <br />businesses
            </p>
          </div>

          {/* Brand logos row */}
          <div
            className="hero-trust-logos d-flex align-items-center"
            style={{ flex: 1 }}
          >
            {BRANDS.map((brand, i) => (
              <div
                key={brand.name}
                style={{
                  padding:        '0 40px',
                  borderRight:    i < BRANDS.length - 1
                    ? '1px solid rgba(255,255,255,0.08)'
                    : 'none',
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  height:         '100%',
                  minHeight:      '80px',
                  flexShrink:     0,
                }}
              >
                {brand.logo ? (
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    style={{
                      height:     '24px',
                      width:      'auto',
                      opacity:    0.65,
                      filter:     'brightness(0) invert(1)',
                      transition: 'opacity 0.25s ease',
                    }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '0.65'}
                  />
                ) : (
                  <span
                    style={{
                      fontFamily:    "'Plus Jakarta Sans', sans-serif",
                      fontSize:      '15px',
                      fontWeight:    600,
                      letterSpacing: '0.02em',
                      color:         'rgba(255,255,255,0.5)',
                      whiteSpace:    'nowrap',
                      transition:    'color 0.25s ease',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.9)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
                  >
                    {brand.name}
                  </span>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}