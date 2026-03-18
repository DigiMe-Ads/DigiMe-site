// Returns 0→1 progress for a sticky scroll section.
// Outer section must have height > 100vh.

import { useRef, useState, useEffect } from 'react'

export function useStickyScroll() {
  const sectionRef = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let rafId

    const tick = () => {
      const el = sectionRef.current
      if (el) {
        const rect      = el.getBoundingClientRect()
        const scrollable = el.offsetHeight - window.innerHeight
        const raw        = -rect.top / scrollable
        setProgress(Math.min(Math.max(raw, 0), 1))
      }
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return { sectionRef, progress }
}