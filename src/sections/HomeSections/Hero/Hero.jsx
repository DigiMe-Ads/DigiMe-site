import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

const BRANDS = [
  { name: 'Deli',         logo: '/images/Home/Logos/deli.webp'                      },
  { name: 'Deltano',      logo: '/images/Home/Logos/DelTano.png'                    },
  { name: 'FIFE',         logo: '/images/Home/Logos/FIFE.png'                       },
  { name: 'HOG',          logo: '/images/Home/Logos/HOG-white.png'                   },
  { name: 'Lavinia',      logo: '/images/Home/Logos/Lavinia.png'                    },
  { name: 'MAYS',         logo: '/images/Home/Logos/mays.png'                       },
  { name: 'Nidahas',      logo: '/images/Home/Logos/NIDAHAS.png'                    },
  { name: 'Mirissa',      logo: '/images/Home/Logos/O Mirissa logo final.png'       },
  { name: 'SONO',         logo: '/images/Home/Logos/SONO.png'                       },
  { name: 'Square',       logo: '/images/Home/Logos/square_logo.png'                },
  { name: 'Square Space', logo: '/images/Home/Logos/The-Square-Space.webp'          },
  { name: 'Kickerz', logo: '/images/Home/Logos/kickerz.png'}
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
  @keyframes logoScroll {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
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
    .hero-h1 { font-size: 48px !important; line-height: 58px !important; }
    .hero-orbit { display: none !important; }
    .hero-trusted-label { min-width: 140px !important; padding: 16px 20px !important; font-size: 13px !important; }
    .hero-label-text { font-size: 13px !important; }
  }
  @media (max-width: 480px) {
    .hero-h1 { font-size: 36px !important; line-height: 44px !important; }
    .hero-inner { padding-left: 16px !important; padding-right: 16px !important; }
    .hero-trust-bar { margin-left: -16px !important; margin-right: -16px !important; }
    .hero-trusted-label { display: none !important; }
  }
`

function OrbitTextSVG() {
  return (
    <svg viewBox="0 0 200 200" width="100%" height="100%"
      style={{ overflow: 'visible' }} aria-hidden="true">
      <defs>
        <path id="circle-path"
          d="M 100,100 m -72,0 a 72,72 0 1,1 144,0 a 72,72 0 1,1 -144,0"/>
      </defs>
      <g style={{ animation: 'spinText 14s linear infinite', transformOrigin: '100px 100px' }}>
        <text style={{
          fontSize: '13.5px', fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 500, fill: 'rgba(255,255,255,0.85)', letterSpacing: '8.5px',
        }}>
          <textPath href="#circle-path" startOffset="0%">
            D · I · G · I · M · E · A · D · S 
          </textPath>
        </text>
      </g>
      <circle cx="28"  cy="100" r="3" fill="rgba(255,255,255,0.6)" />
      <circle cx="100" cy="28"  r="3" fill="rgba(255,255,255,0.6)" />
      <g transform="translate(100, 100)">
        <line x1="0" y1="-18" x2="0" y2="14"
          stroke="#34A853" strokeWidth="1.8" strokeLinecap="round"/>
        <polyline points="-8,-4 0,14 8,-4"
          fill="none" stroke="#34A853" strokeWidth="1.8"
          strokeLinejoin="round" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

export default function Hero() {
  const canvasRef  = useRef(null)
  const trackRef   = useRef(null)
  const [loaded, setLoaded] = useState(false)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (document.getElementById('hero-kf')) return
    const style = document.createElement('style')
    style.id = 'hero-kf'
    style.textContent = KEYFRAMES
    document.head.appendChild(style)
  }, [])

  // ── Three.js blobs ──
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
        const len = Math.sqrt(vx*vx + vy*vy + vz*vz)
        const nx = vx + (vx/len - vx) * INFLATE
        const ny = vy + (vy/len - vy) * INFLATE
        const nz = vz + (vz/len - vz) * INFLATE
        pos.setXYZ(i, nx, ny, nz)
        orig[i*3] = nx; orig[i*3+1] = ny; orig[i*3+2] = nz
      }
      pos.needsUpdate = true
      const mesh = new THREE.Mesh(geo,
        new THREE.MeshBasicMaterial({ color: 0x2a2a2a, wireframe: true }))
      mesh.position.set(x, y, z)
      mesh.scale.setScalar(scale)
      mesh.userData = { speed, phase: Math.random() * Math.PI * 2, origPositions: orig }
      scene.add(mesh)
      return mesh
    }

    const blobs = [
      makeBlob( 3.2, -0.1,  0,   1.55, 0.32),
      makeBlob(-3.6, -0.6, -0.5, 1.05, 0.48),
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
          const ox = orig[i*3], oy = orig[i*3+1], oz = orig[i*3+2]
          const len   = Math.sqrt(ox*ox + oy*oy + oz*oz)
          const noise =
            Math.sin(t*0.5 + ox*2.5 + blob.userData.phase) * 0.5 +
            Math.cos(t*0.4 + oy*2.0) * 0.5
          const d = 1 + noise * 0.04
          pos.setXYZ(i, ox*d, oy*d, oz*d)
        }
        pos.needsUpdate = true
        blob.geometry.computeVertexNormals()
      })
      renderer.render(scene, camera)
    }
    animate()
    setTimeout(() => setLoaded(true), 120)
    return () => { cancelAnimationFrame(raf); renderer.dispose(); window.removeEventListener('resize', onResize) }
  }, [])

  const handleReadMore = () => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })

  const fadeUp = (delay) => ({
    opacity:    loaded ? 1 : 0,
    transform:  loaded ? 'translateY(0)' : 'translateY(22px)',
    transition: `opacity 0.75s ease ${delay}s, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
  })

  // Double the brands for seamless loop
  const loopBrands = [...BRANDS, ...BRANDS]

  return (
    <section
      id="home"
      style={{
        position: 'relative', minHeight: '100vh',
        overflow: 'hidden', background: '#0a0a0a',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {/* Canvas */}
      <canvas ref={canvasRef} aria-hidden="true" style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0,
      }}/>

      {/* Glow */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '-8%', left: '-10%',
        width: '42%', height: '55%',
        background: 'radial-gradient(ellipse at center, rgba(217,231,23,0.55) 0%, rgba(24,27,10,0.25) 40%, transparent 72%)',
        pointerEvents: 'none', opacity: 0.1, zIndex: 0,
        animation: 'glowPulse 5s ease-in-out infinite', filter: 'blur(2px)',
      }}/>

      {/* Orbit */}
      <div className="hero-orbit" aria-hidden="true" style={{
        position: 'absolute', top: '50%', right: '22%',
        transform: 'translateY(-55%)',
        width: 'clamp(120px, 12vw, 170px)', height: 'clamp(120px, 12vw, 170px)',
        zIndex: 2, pointerEvents: 'none',
      }}>
        <OrbitTextSVG />
      </div>

      {/* Content */}
      <div className="hero-inner" style={{
        position: 'relative', zIndex: 1, paddingTop: '72px',
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between', paddingLeft: '285px', paddingRight: '0',
        overflow: 'visible',
      }}>

        {/* Main text */}
        <div className="d-flex align-items-center" style={{ flex: 1, padding: '40px 0 30px' }}>
          <div style={{ maxWidth: '645px' }}>

            <p style={{
              ...fadeUp(0.2),
              display: 'flex', alignItems: 'center', gap: '8px',
              fontSize: '13px', fontWeight: 500, letterSpacing: '0.22em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginBottom: '20px',
            }}>
              <span style={{ color: '#0f911e', fontSize: '12px' }}>✦</span>
              Stop  <span style={{ color: '#0f911e', fontWeight: 300 }}>Guessing,</span>
              Start  <span style={{ color: '#0f911e', fontWeight: 300 }}>Growing</span>
            </p>

            <h1 className="hero-h1" style={{
              ...fadeUp(0.35),
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '70px', fontWeight: 700, lineHeight: '80px',
              letterSpacing: '-0.01em', marginBottom: '24px', color: '#ffffff',
            }}>
              <span style={{ fontWeight: 700 }}>Growth </span> {' '}
              <span style={{ color: '#0f911e', fontWeight: 300 }}>starts with the right</span>
              {' '} <span style={{ fontWeight: 700 }}>Strategy.  </span>
              
              
              {/* <br/>
              <span style={{ fontWeight: 300 }}>Real business</span> <span style={{ color: '#0f911e', fontWeight: 700 }}>impact.   </span> */}
            </h1>

            <p style={{
              ...fadeUp(0.5),
              fontSize: '15px', fontWeight: 400, lineHeight: '26px',
              color: 'rgba(255,255,255,0.5)', maxWidth: '400px', marginBottom: '36px',
            }}>
              We are here to boost your digital game.
            </p>

            <div style={fadeUp(0.65)}>
              <button
                onClick={handleReadMore}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '10px',
                  background: '#0f911e', color: '#0a0a0a',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '14px', fontWeight: 600, border: 'none',
                  borderRadius: '100px', padding: '12px 20px 12px 26px',
                  cursor: 'none', transition: 'background 0.25s ease, transform 0.25s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.background='#5fff8a'; e.currentTarget.style.transform='translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.background='#0f911e'; e.currentTarget.style.transform='translateY(0)' }}
              >
                Read More
                <span style={{
                  width: '34px', height: '34px', background: 'rgba(0,0,0,0.22)',
                  borderRadius: '50%', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', flexShrink: 0,
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

        {/* ── Trust bar with logo carousel ── */}
        <div
          className="hero-trust-bar"
          style={{
            ...fadeUp(0.85),
            borderTop: '1px solid rgba(255,255,255,0.08)',
            display: 'flex', alignItems: 'stretch',
            marginLeft:  '-285px',   // ← breaks out left past the padding
    marginRight: '0', 
          }}
        >
          {/* Label */}
          <div
            className="hero-trusted-label"
            style={{
              padding: '28px 32px', flexShrink: 0,
              borderRight: '1px solid rgba(255,255,255,0.08)',
              minWidth: '200px', display: 'flex',
              flexDirection: 'column', justifyContent: 'center',
            }}
          >
            <p style={{
              fontSize: '11px', fontWeight: 600, letterSpacing: '0.18em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)',
              margin: '0 0 6px',
            }}>
              Proudly working with
            </p>
            <p className="hero-label-text" style={{
              fontSize: '15px', fontWeight: 700,
              lineHeight: '22px', color: '#fff', margin: 0,
            }}>
              Sri Lanka's{' '}
              <span style={{ color: '#0f911e' }}>finest</span>
              <br />brands
            </p>
          </div>

          {/* Carousel track */}
          <div style={{
            flex: 1, overflow: 'hidden', position: 'relative',
            display: 'flex', alignItems: 'center',
          }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Left fade */}
            <div style={{
              position: 'absolute', left: 0, top: 0, bottom: 0,
              width: '60px', zIndex: 2, pointerEvents: 'none',
              background: 'linear-gradient(to right, #0a0a0a, transparent)',
            }}/>
            {/* Right fade */}
            <div style={{
              position: 'absolute', right: 0, top: 0, bottom: 0,
              width: '60px', zIndex: 2, pointerEvents: 'none',
              background: 'linear-gradient(to left, #0a0a0a, transparent)',
            }}/>

            {/* Scrolling logos */}
            <div
              ref={trackRef}
              style={{
                display: 'flex', alignItems: 'center',
                width: 'max-content',
                animation: 'logoScroll 32s linear infinite',
                animationPlayState: paused ? 'paused' : 'running',
              }}
            >
              {loopBrands.map((brand, i) => (
                <div
                  key={`${brand.name}-${i}`}
                  style={{
                    padding: '0 36px',
                    borderRight: '1px solid rgba(255,255,255,0.06)',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center',
                    height: '80px', flexShrink: 0,
                  }}
                >
                  {brand.logo ? (
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      style={{
                        height: '56px',       // slightly larger
                        width: 'auto',
                        maxWidth: '110px',
                        objectFit: 'contain',
                        opacity: 0.8,
                        transition: 'opacity 0.25s ease',
                        // ← NO filter — keeps original colors
                      }}
                      onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                      onMouseLeave={e => e.currentTarget.style.opacity = '0.8'}
                    />
                  ) : (
                    <span style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: '15px', fontWeight: 600,
                      color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap',
                    }}>
                      {brand.name}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}