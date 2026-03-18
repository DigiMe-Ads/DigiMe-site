// ─────────────────────────────────────────────
// ScrollReveal.jsx
// Wrap any element to get scroll-triggered animation.
//
// Props:
//   reveal   — "up" (default) | "left" | "right" | "scale"
//   stagger  — if true, applies data-stagger to children
//   delay    — extra CSS transition-delay in ms
//   as       — HTML tag to render (default: div)
// ─────────────────────────────────────────────
import { useScrollReveal } from '../../hooks/useScrollReveal'

export default function ScrollReveal({
  children,
  reveal   = 'up',
  stagger  = false,
  delay    = 0,
  as: Tag  = 'div',
  className = '',
  ...props
}) {
  const { ref, isVisible } = useScrollReveal()

  const dataAttr = stagger ? 'data-stagger' : `data-reveal${reveal !== 'up' ? `="${reveal}"` : ''}`

  return (
    <Tag
      ref={ref}
      className={`${className} ${isVisible ? 'is-visible' : ''}`}
      {...(stagger ? { 'data-stagger': '' } : { 'data-reveal': reveal === 'up' ? '' : reveal })}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined }}
      {...props}
    >
      {children}
    </Tag>
  )
}