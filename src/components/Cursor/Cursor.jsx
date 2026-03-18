import { useEffect, useRef, useState } from 'react'
import './Cursor.css'

export default function Cursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const pos     = useRef({ x: -100, y: -100 })
  const ring    = useRef({ x: -100, y: -100 })
  const [hover, setHover] = useState(false)

  useEffect(() => {
    const onMove = (e) => { pos.current = { x: e.clientX, y: e.clientY } }

    const onOver = (e) => {
      setHover(!!e.target.closest('a,button,[role="button"]'))
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)

    let raf
    const tick = () => {
      ring.current.x = lerp(ring.current.x, pos.current.x, 0.12)
      ring.current.y = lerp(ring.current.y, pos.current.y, 0.12)

      if (dotRef.current)
        dotRef.current.style.transform = `translate(${pos.current.x}px,${pos.current.y}px)`
      if (ringRef.current)
        ringRef.current.style.transform = `translate(${ring.current.x}px,${ring.current.y}px)`

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(raf)
    }
  }, [])

  const lerp = (a, b, t) => a + (b - a) * t

  return (
    <div className={`cursor-wrap ${hover ? 'hovered' : ''}`} aria-hidden="true">
      <div ref={dotRef}  className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </div>
  )
}