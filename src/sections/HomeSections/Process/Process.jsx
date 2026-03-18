import { useState, useEffect } from 'react'
import { useScrollReveal } from '../../../hooks/useScrollReveal'

// ── Steps config — add icon image paths when ready ──
const STEPS = [
  {
    n:     '01',
    label: 'Step 01',
    title: 'Tailored Solutions',
    body:  'We analyze your brand needs and craft solutions designed to support your goals and audience.',
    icon:  '/images/Home/Process/tailored-solutions.png',   
  },
  {
    n:     '02',
    label: 'Step 02',
    title: 'Expert Team',
    body:  'Our skilled team combines creativity and strategy to deliver high quality digital experiences.',
    icon:  '/images/Home/Process/expert-team.png',
  },
  {
    n:     '03',
    label: 'Step 03',
    title: 'Driven Insights',
    body:  'We use research and data driven insights to guide decisions and improve campaign performance.',
    icon:  '/images/Home/Process/driven-insights.png',
  },
  {
    n:     '04',
    label: 'Step 04',
    title: 'Ongoing Support',
    body:  'After launch we monitor results, provide updates, and optimize strategies for continued growth.',
    icon:  '/images/Home/Process/on-going-support.png',
  },
]

const STYLES = `
  @media (max-width: 1200px) {
    .process-inner { padding-left: 120px !important; padding-right: 80px !important; }
  }
  @media (max-width: 992px) {
    .process-inner    { padding-left: 60px !important; padding-right: 60px !important; }
    .process-timeline { gap: 16px !important; }
    .process-cards    { grid-template-columns: repeat(2, 1fr) !important; }
  }
  @media (max-width: 768px) {
    .process-inner { padding-left: 24px !important; padding-right: 24px !important; }
  }
  @media (max-width: 480px) {
    .process-inner { padding-left: 16px !important; padding-right: 16px !important; }
    .process-cards { grid-template-columns: 1fr !important; }
  }
`

export default function Process() {
  const timeline = useScrollReveal({ threshold: 0.1 })
  const cards    = useScrollReveal({ threshold: 0.08 })

  useEffect(() => {
    if (document.getElementById('process-styles')) return
    const s = document.createElement('style')
    s.id = 'process-styles'
    s.textContent = STYLES
    document.head.appendChild(s)
  }, [])

  return (
    <section
      id="process"
      style={{
        position:      'relative',
        background:    'transparent',   // transparent — sits on shared bg
        paddingTop:    '120px',
        paddingBottom: '80px',
        fontFamily:    "'Plus Jakarta Sans', sans-serif",
        overflow:      'visible',
      }}
    >
      <div
        className="process-inner"
        style={{ paddingLeft: '285px', paddingRight: '285px' }}
      >

        {/* ── Step labels timeline ── */}
        <div
          ref={timeline.ref}
          className="process-timeline"
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap:                 '24px',
            marginBottom:        '24px',
            opacity:             timeline.isVisible ? 1 : 0,
            transform:           timeline.isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition:          'opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          {STEPS.map((s, i) => (
            <div key={s.n}>
              <p style={{
                fontFamily:    "'Plus Jakarta Sans', sans-serif",
                fontSize:      '13px',
                fontWeight:    500,
                color:         'rgba(255,255,255,0.45)',
                marginBottom:  '8px',
                letterSpacing: '0.02em',
              }}>
                {s.label}
              </p>
              {/* Dot */}
              <div style={{
                width:        '8px',
                height:       '8px',
                borderRadius: '50%',
                background:   '#0f911e',
              }} />
            </div>
          ))}
        </div>

        {/* ── Step cards ── */}
        <div
          ref={cards.ref}
          className="process-cards"
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap:                 '16px',
            opacity:             cards.isVisible ? 1 : 0,
            transform:           cards.isVisible ? 'translateY(0)' : 'translateY(28px)',
            transition:          'opacity 0.7s ease 0.1s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s',
          }}
        >
          {STEPS.map((step, i) => (
            <ProcessCard key={step.n} step={step} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}

function ProcessCard({ step, index }) {
  const [hovered, setHovered] = useState(false)

  // Fallback SVG icons — replaced by image when step.icon is set
  const ICONS = [
    // Clipboard
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="6" y="4" width="16" height="20" rx="2"/>
      <line x1="9" y1="10" x2="19" y2="10"/>
      <line x1="9" y1="14" x2="16" y2="14"/>
    </svg>,
    // Gear
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="14" cy="14" r="4"/>
      <path d="M14 4v3M14 21v3M4 14h3M21 14h3M6.34 6.34l2.12 2.12M19.54 19.54l2.12 2.12M6.34 21.66l2.12-2.12M19.54 8.46l2.12-2.12"/>
    </svg>,
    // Chart
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="4,20 10,12 15,16 22,8"/>
      <line x1="4" y1="24" x2="24" y2="24"/>
    </svg>,
    // Headset
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 14a8 8 0 0 1 16 0"/>
      <rect x="4" y="14" width="4" height="6" rx="1"/>
      <rect x="20" y="14" width="4" height="6" rx="1"/>
    </svg>,
  ]

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background:   hovered ? '#1a1a1a' : '#141414',
        border:       `1px solid ${hovered ? 'rgba(59,255,108,0.2)' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: '12px',
        padding:      '28px 24px',
        transition:   'background 0.3s ease, border-color 0.3s ease, transform 0.3s ease',
        transform:    hovered ? 'translateY(-4px)' : 'translateY(0)',
        cursor:       'default',
      }}
    >
      {/* Icon */}
      <div style={{
        width:          '52px',
        height:         '52px',
        borderRadius:   '10px',
        background:     'rgba(59,255,108,0.08)',
        border:         '1px solid rgba(59,255,108,0.15)',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        marginBottom:   '20px',
        color:          '#0f911e',
        overflow:       'hidden',
      }}>
        {step.icon ? (
          <img src={step.icon} alt={step.title} style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
        ) : (
          ICONS[index]
        )}
      </div>

      {/* Title */}
      <h4 style={{
        fontFamily:   "'Plus Jakarta Sans', sans-serif",
        fontSize:     '15px',
        fontWeight:   700,
        color:        '#ffffff',
        marginBottom: '10px',
        lineHeight:   1.3,
      }}>
        {step.title}
      </h4>

      {/* Body */}
      <p style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize:   '13px',
        lineHeight: '20px',
        color:      'rgba(255,255,255,0.4)',
        margin:     0,
      }}>
        {step.body}
      </p>
    </div>
  )
}