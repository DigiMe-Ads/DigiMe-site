import { useState, useEffect } from 'react'
import { useScrollReveal } from '../../../hooks/useScrollReveal'

const SERVICES = [
  {
    n:     '01',
    title: 'Social Media Management',
    image: '/images/Services/social-media.jpg',
    tags:  [
      ['Content Creation',     'Platform Strategy'],
      ['Community Management', 'Paid Social Ads'],
      ['Analytics & Reporting','Brand Voice'],
      ['Campaign Planning',    ''],
    ],
  },
  {
    n:     '02',
    title: 'Web Development & UX/UI Design',
    image: '/images/Services/services-mock-up.png',
    tags:  [
      ['Web Development',  'Mobile Apps'],
      ['React & Next.js',  'API Integration'],
      ['CMS & E-Commerce', 'DevOps'],
      ['QA Testing',       ''],
    ],
  },
  {
    n:     '03',
    title: 'Video Production',
    image: '/images/Services/services-mock-up.png',
    tags:  [
      ['Brand Films',   'Motion Graphics'],
      ['Social Content','3D Animation'],
      ['Storyboarding', 'Color Grading'],
      ['Sound Design',  ''],
    ],
  },
  {
    n:     '04',
    title: 'Search Engine Optimization (SEO)',
    image: '/images/Services/services-mock-up.png',
    tags:  [
      ['On-Page SEO',          'Technical SEO'],
      ['Content Strategy',     'Link Building'],
      ['Analytics & Reporting','Local SEO'],
      ['Keyword Research',     ''],
    ],
  },
  {
    n:     '05',
    title: 'Photography',
    image: '/images/Services/photography.png',
    tags:  [
      ['Product Photography', 'Brand Shoots'],
      ['Event Coverage',      'Portrait Sessions'],
      ['Photo Editing',       'Art Direction'],
      ['Content for Social',  ''],
    ],
  },
]

const STYLES = `
  @keyframes blobRotate {
    from { transform: rotate(0deg)   scale(1);    }
    50%  { transform: rotate(180deg) scale(1.06); }
    to   { transform: rotate(360deg) scale(1);    }
  }
  @keyframes imgReveal {
    from { opacity: 0; transform: scale(0.96) translateY(10px); }
    to   { opacity: 1; transform: scale(1)    translateY(0);    }
  }
  @keyframes tagsReveal {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0);   }
  }
  .svc-row-item {
    transition: color 0.25s ease, padding-left 0.25s ease;
  }
  .svc-row-item:hover .svc-row-title {
    color: #0f911e !important;
  }
  @media (max-width: 1200px) {
    .svc-card-inner { padding: 40px 40px !important; }
  }
  @media (max-width: 992px) {
    .svc-layout   { flex-direction: column !important; }
    .svc-left     { width: 100% !important; }
    .svc-right    { width: 100% !important; }
    .svc-card     { margin-left: 32px !important; margin-right: 32px !important; }
  }
  @media (max-width: 768px) {
    .svc-card         { margin-left: 16px !important; margin-right: 16px !important; }
    .svc-card-inner   { padding: 32px 24px !important; }
    .svc-tags-grid    { grid-template-columns: 1fr !important; }
  }
`

export default function ServicesSection() {
  const [active,       setActive]       = useState(1)   // default to Development (index 1)
  const [imgKey,       setImgKey]       = useState(0)   // re-triggers image animation
  const [arrowHovered, setArrowHovered] = useState(false)
  const cardReveal = useScrollReveal({ threshold: 0.08 })

  useEffect(() => {
    if (document.getElementById('svc-section-styles')) return
    const s = document.createElement('style')
    s.id = 'svc-section-styles'
    s.textContent = STYLES
    document.head.appendChild(s)
  }, [])

  const handleSelect = (i) => {
    if (i === active) return
    setActive(i)
    setImgKey(k => k + 1)
  }

  const current = SERVICES[active]

  return (
    <section
      id="services-detail"
      style={{
        background:    '#0a0a0a',
        fontFamily:    "'Plus Jakarta Sans', sans-serif",
        padding:       '80px 0 100px',
        overflow:      'hidden',
      }}
    >
      {/* ── Rounded card ── */}
      <div
        className="svc-card"
        ref={cardReveal.ref}
        style={{
          marginLeft:   '60px',
          marginRight:  '60px',
          borderRadius: '20px',
          overflow:     'hidden',
          background:   '#111111',
          border:       '1px solid rgba(255,255,255,0.07)',
          position:     'relative',
          opacity:      cardReveal.isVisible ? 1 : 0,
          transform:    cardReveal.isVisible ? 'translateY(0)' : 'translateY(32px)',
          transition:   'opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <div
          className="svc-card-inner"
          style={{ padding: '56px 60px' }}
        >
          <div
            className="svc-layout"
            style={{ display: 'flex', gap: '60px', alignItems: 'flex-start' }}
          >

            {/* ══════════════════════════════
                LEFT PANEL
            ══════════════════════════════ */}
            <div
              className="svc-left"
              style={{ width: '45%', flexShrink: 0, position: 'relative' }}
            >

              {/* Iridescent blob — behind the list */}
              <div
                aria-hidden="true"
                style={{
                  position:      'absolute',
                  left:          '-10%',
                  top:           '20%',
                  transform:     'translateY(-50%)',
                  width:         'clamp(200px, 26vw, 440px)',
                  height:        'clamp(200px, 26vw, 540px)',
                  zIndex:        0,
                  pointerEvents: 'none',
                  animation:     'blobRotate 18s linear infinite',
                  filter:        'blur(2px)',
                }}
              >
                {/* Drop your blob image here — set src below */}
                <img
                  src="/images/Services/blob.png"
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'contain', opacity: 1 }}
                  onError={e => e.currentTarget.style.display = 'none'}
                />
              </div>

              {/* Content sits above blob */}
              <div style={{ position: 'relative', zIndex: 1 }}>

                {/* Eyebrow */}
                <p style={{
                  display:       'flex',
                  alignItems:    'center',
                  gap:           '8px',
                  fontSize:      '11px',
                  fontWeight:    600,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color:         'rgba(255,255,255,0.45)',
                  marginBottom:  '16px',
                }}>
                  <span style={{ color: '#0f911e', fontSize: '10px' }}>✦</span>
                  Services
                </p>

                {/* Heading */}
                <h2 style={{
                  fontFamily:   "'Plus Jakarta Sans', sans-serif",
                  fontSize:     'clamp(1.6rem, 2.4vw, 2.4rem)',
                  fontWeight:   700,
                  lineHeight:   1.2,
                  color:        '#ffffff',
                  marginBottom: '48px',
                  letterSpacing:'-0.01em',
                }}>
                  We Provide Digital<br />
                  Services<span style={{ color: '#0f911e' }}> for You</span>
                </h2>

                {/* Service rows */}
                <div>
                  {SERVICES.map((svc, i) => (
                    <ServiceRow
                      key={svc.n}
                      svc={svc}
                      index={i}
                      active={active === i}
                      onClick={() => handleSelect(i)}
                    />
                  ))}
                </div>

              </div>
            </div>

            {/* ══════════════════════════════
                RIGHT PANEL
            ══════════════════════════════ */}
            <div
              className="svc-right"
              style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}
            >

              {/* Desc + button */}
              <p style={{
                fontFamily:   "'Plus Jakarta Sans', sans-serif",
                fontSize:     '14px',
                lineHeight:   '22px',
                color:        'rgba(255,255,255,0.45)',
                margin:       '0 0 16px',
                maxWidth:     '50ch',
              }}>
                Every service we offer is built around one goal — growing your brand online, faster 
                and smarter.
              </p>

              {/* <button
                style={{
                  display:        'inline-flex',
                  alignItems:     'center',
                  gap:            '10px',
                  background:     '#0f911e',
                  color:          '#0a0a0a',
                  fontFamily:     "'Plus Jakarta Sans', sans-serif",
                  fontSize:       '13px',
                  fontWeight:     600,
                  border:         'none',
                  borderRadius:   '100px',
                  padding:        '10px 18px 10px 22px',
                  cursor:         'pointer',
                  width:          'fit-content',
                  marginBottom:   '24px',
                  transition:     'background 0.25s ease, transform 0.2s ease',
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
                All Services
                <span style={{
                  width:          '28px',
                  height:         '28px',
                  borderRadius:   '50%',
                  background:     'rgba(0,0,0,0.2)',
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  flexShrink:     0,
                }}>
                  <svg width="10" height="10" viewBox="0 0 10 10">
                    <circle cx="5" cy="5" r="5" fill="black" opacity="0.3"/>
                    <circle cx="5" cy="5" r="2" fill="black"/>
                  </svg>
                </span>
              </button> */}

              {/* Image + arrow button */}
              <div style={{ position: 'relative' }}>
                <div
                  key={imgKey}
                  style={{
                    borderRadius: '12px',
                    overflow:     'hidden',
                    aspectRatio:  '16 / 9',
                    background:   '#1a1a1a',
                    animation:    'imgReveal 0.5s cubic-bezier(0.16,1,0.3,1) forwards',
                  }}
                >
                  {current.image ? (
                    <img
                      src={current.image}
                      alt={current.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  ) : (
                    // Gradient placeholder
                    <div style={{
                      width:      '100%',
                      height:     '100%',
                      background: `linear-gradient(135deg,
                        hsl(${140 + active * 30}, 25%, 12%) 0%,
                        hsl(${140 + active * 30}, 20%, 8%)  100%)`,
                      display:        'flex',
                      alignItems:     'center',
                      justifyContent: 'center',
                    }}>
                      <span style={{
                        fontFamily:    "'Plus Jakarta Sans', sans-serif",
                        fontSize:      '13px',
                        color:         'rgba(255,255,255,0.15)',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                      }}>
                        {current.title}
                      </span>
                    </div>
                  )}
                </div>

                {/* Green arrow button — bottom right of image */}
                <button
                  onMouseEnter={() => setArrowHovered(true)}
                  onMouseLeave={() => setArrowHovered(false)}
                  style={{
                    position:       'absolute',
                    bottom:         0,
                    right:          0,
                    width:          '56px',
                    height:         '56px',
                    borderRadius:   '12px 0 12px 0',
                    background:     arrowHovered ? '#5fff8a' : '#0f911e',
                    border:         'none',
                    cursor:         'pointer',
                    display:        'flex',
                    alignItems:     'center',
                    justifyContent: 'center',
                    transition:     'background 0.25s ease, transform 0.25s ease',
                    transform:      arrowHovered ? 'scale(1.1)' : 'scale(1)',
                  }}
                  aria-label={`View ${current.title}`}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="7" y1="17" x2="17" y2="7"/>
                    <polyline points="7 7 17 7 17 17"/>
                  </svg>
                </button>
              </div>

              {/* Tags grid — animates on service change */}
              <div
                key={`tags-${imgKey}`}
                className="svc-tags-grid"
                style={{
                  display:             'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap:                 '4px 32px',
                  marginTop:           '4px',
                  animation:           'tagsReveal 0.4s ease 0.1s both',
                }}
              >
                {current.tags.map((row, ri) =>
                  row.map((tag, ti) =>
                    tag ? (
                      <span
                        key={`${ri}-${ti}`}
                        style={{
                          fontFamily:    "'Plus Jakarta Sans', sans-serif",
                          fontSize:      '12px',
                          fontWeight:    500,
                          color:         'rgba(255,255,255,0.4)',
                          padding:       '6px 0',
                          borderBottom:  '1px solid rgba(255,255,255,0.05)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                          transition:    'color 0.2s ease',
                          cursor:        'default',
                        }}
                        onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
                        onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
                      >
                        {tag}
                      </span>
                    ) : null
                  )
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ServiceRow({ svc, index, active, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="svc-row-item"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display:     'flex',
        alignItems:  'center',
        gap:         '20px',
        padding:     '18px 0',
        borderBottom:'1px solid rgba(255,255,255,0.06)',
        cursor:      'pointer',
        paddingLeft: hovered || active ? '8px' : '0',
        transition:  'padding-left 0.3s ease',
      }}
    >
      {/* Number */}
      <span style={{
        fontFamily:    "'Plus Jakarta Sans', sans-serif",
        fontSize:      '12px',
        fontWeight:    600,
        color:         active ? '#0f911e' : 'rgba(255,255,255,0.25)',
        letterSpacing: '0.05em',
        flexShrink:    0,
        transition:    'color 0.25s ease',
        minWidth:      '36px',
      }}>
        {`{0${svc.n}}`}
      </span>

      {/* Title */}
      <span
        className="svc-row-title"
        style={{
          fontFamily:    "'Plus Jakarta Sans', sans-serif",
          fontSize:      'clamp(1rem, 1.8vw, 1.4rem)',
          fontWeight:    active ? 700 : 500,
          color:         active
            ? '#0f911e'
            : hovered
              ? 'rgba(255,255,255,0.9)'
              : 'rgba(255,255,255,0.45)',
          transition:    'color 0.25s ease, font-weight 0.1s ease',
          letterSpacing: '-0.01em',
        }}
      >
        {svc.title}
      </span>

      {/* Active indicator line */}
      <div style={{
        flex:       1,
        height:     '1px',
        background: active ? '#0f911e' : 'transparent',
        opacity:    active ? 0.4 : 0,
        transition: 'opacity 0.3s ease',
      }} />

      {/* Arrow — shows on active or hover */}
      <svg
        width="14" height="14" viewBox="0 0 24 24"
        fill="none" stroke={active ? '#0f911e' : 'rgba(255,255,255,0.3)'}
        strokeWidth="2" strokeLinecap="round"
        style={{
          opacity:    active || hovered ? 1 : 0,
          transition: 'opacity 0.25s ease, stroke 0.25s ease',
          flexShrink: 0,
        }}
      >
        <line x1="7" y1="17" x2="17" y2="7"/>
        <polyline points="7 7 17 7 17 17"/>
      </svg>
    </div>
  )
}