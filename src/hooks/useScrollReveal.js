// Watches elements entering the viewport.
// Adds .is-visible to trigger CSS transitions.
// Works with both data-reveal and data-stagger attributes.

import { useEffect, useRef, useState } from 'react'

export function useScrollReveal({ threshold = 0.12, triggerOnce = true } = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (triggerOnce) observer.unobserve(el)
        } else if (!triggerOnce) {
          setIsVisible(false)
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, triggerOnce])

  return { ref, isVisible }
}