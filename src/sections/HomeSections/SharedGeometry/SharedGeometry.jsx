import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const BREAKPOINTS = `
  @media (max-width: 992px) {
    .shared-geo-wrap { width: 220px !important; height: 220px !important; opacity: 0.5 !important; }
  }
  @media (max-width: 768px) {
    .shared-geo-wrap { display: none !important; }
  }
`

export default function SharedGeometry() {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!document.getElementById('shared-geo-bp')) {
      const s = document.createElement('style')
      s.id = 'shared-geo-bp'
      s.textContent = BREAKPOINTS
      document.head.appendChild(s)
    }

    const canvas = canvasRef.current
    if (!canvas) return

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(canvas.clientWidth, canvas.clientHeight)

    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100)
    camera.position.z = 4.5

    // ── Low-poly icosahedron — subdivision 0 = pure flat triangular faces ──
    // This matches the sharp gemstone shape in the screenshot exactly
    const geo = new THREE.IcosahedronGeometry(1.3, 0)

    // Faint filled mesh so faces are barely visible (dark green tint)
    const fillMat = new THREE.MeshBasicMaterial({
      color:       0x0d1a0d,
      transparent: true,
      opacity:     0.4,
      side:        THREE.FrontSide,
    })
    const fillMesh = new THREE.Mesh(geo, fillMat)
    scene.add(fillMesh)

    // Sharp bright edge lines — this is the main visual like the screenshot
    const edgeGeo = new THREE.EdgesGeometry(geo)
    const edgeMat = new THREE.LineBasicMaterial({
      color:       0x3a6e3a,   // medium green, matches the lines in image
      transparent: true,
      opacity:     0.85,
    })
    const edges = new THREE.LineSegments(edgeGeo, edgeMat)
    scene.add(edges)

    // Second slightly larger icosahedron edges — gives the layered outline look
    const outerEdgeGeo = new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.45, 0))
    const outerEdgeMat = new THREE.LineBasicMaterial({
      color:       0x1e3e1e,
      transparent: true,
      opacity:     0.3,
    })
    scene.add(new THREE.LineSegments(outerEdgeGeo, outerEdgeMat))

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

      // Slow gentle rotation — matches the static-ish look in screenshot
      fillMesh.rotation.y = t * 0.15
      fillMesh.rotation.x = t * 0.07
      edges.rotation.y    = t * 0.15
      edges.rotation.x    = t * 0.07

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
    // Wrapper handles positioning — canvas + glow are siblings inside
    <div
      className="shared-geo-wrap"
      aria-hidden="true"
      style={{
        position:      'absolute',
        right:         '-2%',
        top:           '57%',
        transform:     'translateY(-50%)',
        width:         'clamp(300px, 28vw, 460px)',
        height:        'clamp(300px, 28vw, 460px)',
        pointerEvents: 'none',
        zIndex:        2,
      }}
    >
      {/* ── Yellow-green glow behind the shape ── */}
      <div
        style={{
          position:     'absolute',
          inset:        '10%',
          borderRadius: '50%',
          background:   'radial-gradient(ellipse at center, rgba(180,200,20,0.28) 0%, rgba(100,140,10,0.12) 45%, transparent 72%)',
          filter:       'blur(18px)',
          zIndex:       0,
        }}
      />

      {/* ── Three.js canvas on top of glow ── */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset:    0,
          width:    '100%',
          height:   '100%',
          zIndex:   1,
        }}
      />
    </div>
  )
}