import { useState, useEffect, useRef, useCallback } from 'react'
import { useScrollReveal } from '../../../hooks/useScrollReveal'

const SERVICES = [
  {
    n:     '01',
    title: 'Social Media Management',
    image: '/images/Home/Content/Posts/Post 15.jpg',
    gallery: [
      '/images/Home/Content/Posts/Post 15.jpg',
      '/images/Home/Content/Posts/Delivery HOG Post.jpg',
      '/images/Home/Content/Posts/Pickme ad uber.3.jpg',
      '/images/Home/Content/Posts/Post 16.jpg',
      '/images/Home/Content/Posts/Post 18.jpg',
      '/images/Home/Content/Posts/Post 27.jpg',
      '/images/Home/Content/Posts/Post 29.jpg',
      '/images/Home/Content/Posts/Post 36.jpg',
      '/images/Home/Content/Posts/Post 60.jpg',
      '/images/Home/Content/Posts/Post 61.jpg',
      '/images/Home/Content/Posts/Post 62.jpg',
      '/images/Home/Content/Posts/Post 212.jpg',
      '/images/Home/Content/Posts/Post 233.jpg',
      '/images/Home/Content/Posts/Post 304.jpg',
      '/images/Home/Content/Posts/Post 306.jpg',
      '/images/Home/Content/Posts/Post 318.jpg',
    ],
    tags: [
      ['Content Creation',  'Community Management'],
      ['Campaign Planning', 'Analytics & Reporting'],
      ['Paid Media',        ''],
      ['Platform Strategy', ''],
    ],
  },
  {
    n:     '02',
    title: 'Web Development & UI/UX Design',
    image: '/images/Home/ui2.jpeg',
    gallery: [
      '/images/Home/ui2.jpeg',
    ],
    tags: [
      ['Web Development',  'Mobile Apps'],
      ['React & Next.js',  'API Integration'],
      ['CMS & E-Commerce', 'DevOps'],
      ['UI/UX Design',     'QA Testing'],
    ],
  },
  {
    n:     '03',
    title: 'Search Engine Optimization (SEO)',
    image: '/images/Services/social-media.jpg',
    gallery: [
      '/images/Services/social-media.jpg',
      '/images/Services/social-media.jpg',
      '/images/Services/social-media.jpg',
    ],
    tags: [
      ['On Page / Off Page SEO', 'Technical SEO'],
      ['Keyword Research',       'Analytics and Reporting'],
      ['Link Building',          ''],
      ['',                       ''],
    ],
  },
  {
    n:        '04',
    title:    'Video Production',
    isVideo:  true,
    image:    '/images/Home/Content/Reels/reel.mp4',
    gallery: [
      '/images/Home/Content/Reels/reel.mp4',
      '/images/Home/Content/Reels/final xz.mp4',
      '/images/Home/Content/Reels/Lavinia FInal.mp4',
      '/images/Home/Content/Reels/reel 2.mp4',
    ],
    tags: [
      ['Social Media Content', 'Motion Graphics'],
      ['Drone Shoots',         '3D Animation'],
      ['Podcasts',             'Corporate Video Shoots'],
    ],
  },
  {
    n:     '05',
    title: 'Photography',
    image: '/images/Services/photography.png',
    gallery: [
      '/images/Home/Projects/nidahas2.png',
      '/images/Home/Projects/mays2.png',
      '/images/Home/Projects/mirissa2.png',
    ],
    tags: [
      ['Social Media Content Shoots', 'Brand Shoots'],
      ['Product Photography',         'Portrait Sessions'],
      ['Event Coverage',              'Art Direction'],
      ['',                            ''],
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

  /* Lightbox */
  @keyframes lbBackdropIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes lbModalIn {
    from { opacity: 0; transform: scale(0.93) translateY(20px); }
    to   { opacity: 1; transform: scale(1)    translateY(0);    }
  }
  @keyframes lbMediaIn {
    from { opacity: 0; transform: scale(0.97); }
    to   { opacity: 1; transform: scale(1);    }
  }

  .svc-row-item {
    transition: color 0.25s ease, padding-left 0.25s ease;
  }
  .svc-row-item:hover .svc-row-title {
    color: #0f911e !important;
  }

  /* Preview hover */
  .svc-preview-wrap { cursor: pointer; position: relative; }
  .svc-preview-wrap:hover .svc-preview-overlay { opacity: 1 !important; }

  /* Lightbox arrow buttons — sit inside the media frame */
  .lb-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: rgba(0,0,0,0.55);
    border: 1px solid rgba(255,255,255,0.18);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
    z-index: 10;
    color: rgba(255,255,255,0.9);
    flex-shrink: 0;
    backdrop-filter: blur(6px);
  }
  .lb-arrow:hover {
    background: rgba(15,145,30,0.75);
    border-color: rgba(15,145,30,0.8);
    transform: translateY(-50%) scale(1.08);
  }
  .lb-arrow:disabled {
    opacity: 0.18;
    cursor: default;
    pointer-events: none;
  }
  /* Inside the frame with comfortable inset */
  .lb-arrow.prev { left: 14px; }
  .lb-arrow.next { right: 14px; }

  /* Thumbnail strip */
  .lb-thumb {
    border-radius: 6px;
    overflow: hidden;
    cursor: pointer;
    flex-shrink: 0;
    transition: border-color 0.2s ease, transform 0.2s ease, opacity 0.2s ease;
    background: #1a1a1a;
  }
  .lb-thumb:hover { opacity: 1 !important; transform: scale(1.06); }

  /* Dot */
  .lb-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    cursor: pointer;
    transition: background 0.2s ease, transform 0.2s ease;
  }
  .lb-dot:hover:not(.active) { background: rgba(255,255,255,0.5) !important; }

  @media (max-width: 1200px) {
    .svc-card-inner { padding: 40px 40px !important; }
  }
  @media (max-width: 992px) {
    .svc-layout     { flex-direction: column !important; }
    .svc-left       { width: 100% !important; }
    .svc-right      { width: 100% !important; }
    .svc-card       { margin-left: 32px !important; margin-right: 32px !important; }
    .lb-modal-inner { padding: 20px !important; }
    .lb-backdrop    { padding: 16px 16px !important; }
  }
  @media (max-width: 768px) {
    .svc-card        { margin-left: 16px !important; margin-right: 16px !important; }
    .svc-card-inner  { padding: 32px 24px !important; }
    .svc-tags-grid   { grid-template-columns: 1fr !important; }
    .lb-thumbstrip   { display: none !important; }
    .lb-backdrop     { padding: 12px 12px !important; align-items: flex-start !important; padding-top: 20px !important; }
    .lb-modal-inner  { padding: 18px 16px !important; max-height: calc(100vh - 40px) !important; border-radius: 16px !important; }
    .lb-arrow        { width: 44px !important; height: 44px !important; }
  }
`

// ── Lightbox ──────────────────────────────────────────────────────────────────
function Lightbox({ service, startIndex, onClose }) {
  const [index,   setIndex]   = useState(startIndex)
  const [animKey, setAnimKey] = useState(0)
  const videoRef = useRef(null)
  const items    = service.gallery
  const isVideo  = !!service.isVideo

  const go = useCallback((next) => {
    if (next < 0 || next >= items.length) return
    setAnimKey(k => k + 1)
    setIndex(next)
  }, [items.length])

  // Keyboard
  useEffect(() => {
    const fn = (e) => {
      if (e.key === 'ArrowRight') go(index + 1)
      if (e.key === 'ArrowLeft')  go(index - 1)
      if (e.key === 'Escape')     onClose()
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [index, go, onClose])

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Auto-play video on index change
  useEffect(() => {
    if (isVideo && videoRef.current) {
      videoRef.current.load()
      videoRef.current.play().catch(() => {})
    }
  }, [index, isVideo])

  // Touch swipe
  const touchX = useRef(null)
  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX }
  const onTouchEnd   = (e) => {
    if (touchX.current === null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    if (dx < -50) go(index + 1)
    if (dx >  50) go(index - 1)
    touchX.current = null
  }

  const src = items[index]

  return (
    // Backdrop
    <div
      className="lb-backdrop"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      style={{
        position:       'fixed',
        inset:          0,
        zIndex:         1000,
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        animation:      'lbBackdropIn 0.25s ease',
        fontFamily:     "'Plus Jakarta Sans', sans-serif",
        backdropFilter: 'blur(20px) brightness(0.35)',
        WebkitBackdropFilter: 'blur(20px) brightness(0.35)',
        background:     'rgba(0,0,0,0.6)',
        padding:        '24px 32px',
        boxSizing:      'border-box',
      }}
    >
      {/* Modal card */}
      <div
        className="lb-modal-inner"
        style={{
          position:     'relative',
          background:   'rgba(14,14,14,0.95)',
          border:       '1px solid rgba(255,255,255,0.08)',
          borderRadius: '20px',
          padding:      '28px',
          maxWidth:     isVideo ? '480px' : '820px',
          width:        '100%',
          boxShadow:    '0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)',
          animation:    'lbModalIn 0.3s cubic-bezier(0.16,1,0.3,1)',
          display:      'flex',
          flexDirection:'column',
          gap:          '16px',
          maxHeight:    'calc(100vh - 48px)',
          overflowY:    'auto',
        }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Header row */}
        <div style={{
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          flexShrink:     0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              fontSize:      '10px',
              fontWeight:    700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color:         '#0f911e',
            }}>
              {service.n}
            </span>
            <span style={{
              width:      '1px',
              height:     '12px',
              background: 'rgba(255,255,255,0.15)',
            }}/>
            <span style={{
              fontSize:   '13px',
              fontWeight: 600,
              color:      'rgba(255,255,255,0.7)',
            }}>
              {service.title}
            </span>
            <span style={{
              fontSize:      '11px',
              fontWeight:    500,
              color:         'rgba(255,255,255,0.2)',
              letterSpacing: '0.04em',
            }}>
              {index + 1} / {items.length}
            </span>
          </div>

          {/* Close */}
          <button
            onClick={onClose}
            style={{
              background:   'rgba(255,255,255,0.06)',
              border:       '1px solid rgba(255,255,255,0.1)',
              borderRadius: '50%',
              width:        '34px',
              height:       '34px',
              cursor:       'pointer',
              display:      'flex',
              alignItems:   'center',
              justifyContent:'center',
              color:        'rgba(255,255,255,0.6)',
              flexShrink:   0,
              transition:   'background 0.2s ease, color 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.12)'
              e.currentTarget.style.color = '#fff'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
              e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
            }}
            aria-label="Close"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Media wrapper — relative so arrows can anchor to it */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          {/* Left arrow */}
          <button
            className="lb-arrow prev"
            onClick={() => go(index - 1)}
            disabled={index === 0}
            aria-label="Previous"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>

          {/* Media frame */}
          <div
            key={animKey}
            style={{
              borderRadius: '12px',
              overflow:     'hidden',
              background:   '#111',
              animation:    'lbMediaIn 0.3s cubic-bezier(0.16,1,0.3,1)',
              aspectRatio:  isVideo ? '9/16' : 'auto',
              maxHeight:    isVideo ? '65vh' : 'none',
            }}
          >
            {isVideo ? (
              <video
                ref={videoRef}
                muted loop playsInline controls
                style={{
                  width:     '100%',
                  height:    '100%',
                  display:   'block',
                  objectFit: 'cover',
                }}
              >
                <source src={src} type="video/mp4" />
              </video>
            ) : (
              <img
                src={src}
                alt={`${service.title} ${index + 1}`}
                style={{
                  width:     '100%',
                  display:   'block',
                  maxHeight: '65vh',
                  objectFit: 'contain',
                  background:'#0e0e0e',
                }}
              />
            )}
          </div>

          {/* Right arrow */}
          <button
            className="lb-arrow next"
            onClick={() => go(index + 1)}
            disabled={index === items.length - 1}
            aria-label="Next"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>

        {/* Dot indicators */}
        <div style={{
          display:        'flex',
          justifyContent: 'center',
          alignItems:     'center',
          gap:            '6px',
          flexShrink:     0,
        }}>
          {items.map((_, i) => (
            <div
              key={i}
              className={`lb-dot${i === index ? ' active' : ''}`}
              onClick={() => { setAnimKey(k => k + 1); setIndex(i) }}
              style={{
                background: i === index ? '#0f911e' : 'rgba(255,255,255,0.2)',
                transform:  i === index ? 'scale(1.5)' : 'scale(1)',
              }}
            />
          ))}
        </div>

        {/* Thumbnail strip */}
        {items.length > 1 && (
          <div
            className="lb-thumbstrip"
            style={{
              display:    'flex',
              gap:        '8px',
              overflowX:  'auto',
              paddingBottom: '2px',
              flexShrink: 0,
            }}
          >
            {items.map((thumb, i) => (
              <div
                key={i}
                className="lb-thumb"
                onClick={() => { setAnimKey(k => k + 1); setIndex(i) }}
                style={{
                  width:   isVideo ? '48px' : '64px',
                  height:  isVideo ? '64px' : '48px',
                  border:  `2px solid ${i === index ? '#0f911e' : 'rgba(255,255,255,0.08)'}`,
                  opacity: i === index ? 1 : 0.55,
                }}
              >
                {isVideo ? (
                  <div style={{
                    width:          '100%',
                    height:         '100%',
                    background:     '#1c1c1c',
                    display:        'flex',
                    alignItems:     'center',
                    justifyContent: 'center',
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24"
                      fill={i === index ? '#0f911e' : 'rgba(255,255,255,0.35)'}>
                      <polygon points="5 3 19 12 5 21 5 3"/>
                    </svg>
                  </div>
                ) : (
                  <img
                    src={thumb}
                    alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function ServicesSection() {
  const [active,       setActive]       = useState(0)
  const [imgKey,       setImgKey]       = useState(0)
  const [arrowHovered, setArrowHovered] = useState(false)
  const [lightbox,     setLightbox]     = useState(null) // { service }
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

  const openLightbox = () => setLightbox({ service: SERVICES[active] })

  const current = SERVICES[active]

  return (
    <>
      {lightbox && (
        <Lightbox
          service={lightbox.service}
          startIndex={0}
          onClose={() => setLightbox(null)}
        />
      )}

      <section
        id="services-detail"
        style={{
          background: '#0a0a0a',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          padding:    '80px 0 100px',
          overflow:   'hidden',
        }}
      >
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
          <div className="svc-card-inner" style={{ padding: '56px 60px' }}>
            <div className="svc-layout" style={{ display: 'flex', gap: '60px', alignItems: 'flex-start' }}>

              {/* ══ LEFT PANEL ══ */}
              <div className="svc-left" style={{ width: '45%', flexShrink: 0, position: 'relative' }}>

                <div aria-hidden="true" style={{
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
                }}>
                  <img
                    src="/images/Services/blob.png"
                    alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'contain', opacity: 1 }}
                    onError={e => e.currentTarget.style.display = 'none'}
                  />
                </div>

                <div style={{ position: 'relative', zIndex: 1 }}>
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

                  <h2 style={{
                    fontFamily:    "'Plus Jakarta Sans', sans-serif",
                    fontSize:      'clamp(1.6rem, 2.4vw, 2.4rem)',
                    fontWeight:    700,
                    lineHeight:    1.2,
                    color:         '#ffffff',
                    marginBottom:  '48px',
                    letterSpacing: '-0.01em',
                  }}>
                    Smart Digital Solutions,<br />
                    Tailored<span style={{ color: '#0f911e' }}> for You</span>
                  </h2>

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

              {/* ══ RIGHT PANEL ══ */}
              <div className="svc-right" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>

                <p style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize:   '14px',
                  lineHeight: '22px',
                  color:      'rgba(255,255,255,0.45)',
                  margin:     '0 0 16px',
                  maxWidth:   '50ch',
                }}>
                  Every service we offer is built around one goal — growing your brand online, faster
                  and smarter.
                </p>

                {/* Clickable preview */}
                <div style={{ position: 'relative' }}>
                  <div
                    className="svc-preview-wrap"
                    onClick={openLightbox}
                    title={`View ${current.title} gallery`}
                  >
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
                      {current.isVideo ? (
                        <video
                          key={imgKey}
                          autoPlay muted loop playsInline
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        >
                          <source src={current.image} type="video/mp4" />
                        </video>
                      ) : (
                        <img
                          src={current.image}
                          alt={current.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                      )}
                    </div>

                    {/* Hover pill */}
                    <div
                      className="svc-preview-overlay"
                      style={{
                        position:       'absolute',
                        inset:          0,
                        borderRadius:   '12px',
                        background:     'rgba(0,0,0,0.35)',
                        display:        'flex',
                        alignItems:     'center',
                        justifyContent: 'center',
                        opacity:        0,
                        transition:     'opacity 0.25s ease',
                        backdropFilter: 'blur(2px)',
                      }}
                    >
                      <div style={{
                        display:        'flex',
                        alignItems:     'center',
                        gap:            '8px',
                        background:     'rgba(15,145,30,0.92)',
                        borderRadius:   '100px',
                        padding:        '10px 20px',
                        color:          '#0a0a0a',
                        fontFamily:     "'Plus Jakarta Sans', sans-serif",
                        fontSize:       '13px',
                        fontWeight:     700,
                        letterSpacing:  '0.03em',
                        boxShadow:      '0 8px 24px rgba(15,145,30,0.35)',
                      }}>
                        {current.isVideo ? (
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="5 3 19 12 5 21 5 3"/>
                          </svg>
                        ) : (
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <rect x="3" y="3" width="18" height="18" rx="2"/>
                            <circle cx="8.5" cy="8.5" r="1.5"/>
                            <polyline points="21 15 16 10 5 21"/>
                          </svg>
                        )}
                        {current.isVideo ? 'View Videos' : 'View Gallery'}
                        <span style={{
                          background:   'rgba(0,0,0,0.18)',
                          borderRadius: '100px',
                          padding:      '1px 7px',
                          fontSize:     '11px',
                        }}>
                          {current.gallery.length}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Green arrow button */}
                  <button
                    onMouseEnter={() => setArrowHovered(true)}
                    onMouseLeave={() => setArrowHovered(false)}
                    onClick={openLightbox}
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
                      zIndex:         2,
                    }}
                    aria-label={`View ${current.title} gallery`}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                      stroke="#0a0a0a" strokeWidth="2.5" strokeLinecap="round">
                      <line x1="7" y1="17" x2="17" y2="7"/>
                      <polyline points="7 7 17 7 17 17"/>
                    </svg>
                  </button>
                </div>

                {/* Tags grid */}
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
    </>
  )
}

// ── Service row ───────────────────────────────────────────────────────────────
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

      <div style={{
        flex:       1,
        height:     '1px',
        background: active ? '#0f911e' : 'transparent',
        opacity:    active ? 0.4 : 0,
        transition: 'opacity 0.3s ease',
      }} />

      <svg
        width="14" height="14" viewBox="0 0 24 24" fill="none"
        stroke={active ? '#0f911e' : 'rgba(255,255,255,0.3)'}
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