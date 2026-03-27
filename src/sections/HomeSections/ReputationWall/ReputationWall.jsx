import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useScrollReveal } from '../../../hooks/useScrollReveal'
import { CARDS, FLOAT_ANIMS, FLOAT_DURS, CONTENT_WALL_STYLES } from './contentWallData'
import ReelCard from './ReelCard'
import PostCard from './PostCard'
import StatCard from './StatCard'

export default function ContentWall() {
  const headReveal = useScrollReveal({ threshold: 0.1 })
  const gridReveal = useScrollReveal({ threshold: 0.04 })
  const torusRef   = useRef(null)
  const sectionRef = useRef(null)
  const vmRef      = useRef(null)

  // Inject styles once
  useEffect(() => {
    if (document.getElementById('content-wall-styles')) return
    const s = document.createElement('style')
    s.id = 'content-wall-styles'
    s.textContent = CONTENT_WALL_STYLES
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
    const mat   = new THREE.MeshBasicMaterial({ color: 0x0f911e, wireframe: true, transparent: true, opacity: 0.75 })
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
    return () => {
      cancelAnimationFrame(raf)
      renderer.dispose()
      window.removeEventListener('resize', onResize)
    }
  }, [])

  // VIEW MORE parallax on scroll
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

  const cols = [0, 1, 2, 3].map(c => CARDS.filter(card => card.col === c))

  return (
    <section
      id="content-wall"
      ref={sectionRef}
      style={{
        position:   'relative',
        background: '#080808',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        overflow:   'hidden',
      }}
    >
      {/* Ambient glows */}
      <div aria-hidden="true" style={{
        position:      'absolute',
        top:           '25%',
        left:          '10%',
        width:         '500px',
        height:        '500px',
        borderRadius:  '50%',
        background:    'radial-gradient(ellipse, rgba(59,255,108,0.05) 0%, transparent 70%)',
        filter:        'blur(60px)',
        pointerEvents: 'none',
        zIndex:        0,
        animation:     'wallGlow 9s ease-in-out infinite',
      }}/>
      <div aria-hidden="true" style={{
        position:      'absolute',
        bottom:        '15%',
        right:         '8%',
        width:         '380px',
        height:        '380px',
        borderRadius:  '50%',
        background:    'radial-gradient(ellipse, rgba(168,85,247,0.05) 0%, transparent 70%)',
        filter:        'blur(60px)',
        pointerEvents: 'none',
        zIndex:        0,
        animation:     'wallGlow 11s ease-in-out infinite 3s',
      }}/>

      {/* VIEW MORE parallax text */}
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
        OUR{' '}
        <span style={{ color: 'rgba(59,255,108,0.75)' }}>WORK</span>
      </div>

      {/* Torus canvas */}
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

      {/* ── Header ── */}
      <div
        className="wall-inner wall-header-pad"
        ref={headReveal.ref}
        style={{
          paddingTop:    '150px',
          paddingBottom: '56px',
          position:      'relative',
          zIndex:        2,
          opacity:       headReveal.isVisible ? 1 : 0,
          transform:     headReveal.isVisible ? 'translateY(0)' : 'translateY(24px)',
          transition:    'opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <h2 style={{
          fontFamily:    "'Plus Jakarta Sans', sans-serif",
          fontSize:      'clamp(2rem, 4.5vw, 5rem)',
          fontWeight:    800,
          lineHeight:    1.0,
          letterSpacing: '-0.035em',
          color:         '#ffffff',
          margin:        0,
        }}>
          The work<br/>
          speaks{' '}
          <span style={{ color: '#0f911e', fontStyle: 'italic', fontWeight: 400 }}>
            for itself.
          </span>
        </h2>
      </div>

      {/* ── Masonry grid ── */}
      <div
        className="wall-inner"
        ref={gridReveal.ref}
        style={{
          paddingBottom: '0',
          position:      'relative',
          zIndex:        2,
        }}
      >
        <div
          className="wall-grid"
          style={{
            display:    'grid',
            gap:        '10px',
            alignItems: 'start',
          }}
        >
          {cols.map((colCards, colIdx) => (
            <div
              key={colIdx}
              className={`wall-col-${colIdx}${colIdx % 2 === 1 ? ' wall-col-offset' : ''}`}
              style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
            >
              {colCards.map((card, ci) => (
                <div
                  key={ci}
                  className="wall-card"
                  style={{
                    animationName:           gridReveal.isVisible ? `wallCardIn, ${FLOAT_ANIMS[colIdx]}` : 'none',
                    animationDuration:       `0.7s, ${FLOAT_DURS[colIdx]}s`,
                    animationDelay:          `${card.delay}s, ${card.delay + 0.7}s`,
                    animationTimingFunction: 'cubic-bezier(0.16,1,0.3,1), ease-in-out',
                    animationFillMode:       'both, none',
                    animationIterationCount: '1, infinite',
                    position:               'relative',
                  }}
                >
                  {card.type === 'reel' && <ReelCard card={card} />}
                  {card.type === 'post' && <PostCard card={card} />}
                  {card.type === 'stat' && <StatCard card={card} />}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div style={{
        height:        '120px',
        marginTop:     '-120px',
        background:    'linear-gradient(to bottom, transparent, #0a0a0a)',
        position:      'relative',
        zIndex:        3,
        pointerEvents: 'none',
      }}/>
    </section>
  )
}