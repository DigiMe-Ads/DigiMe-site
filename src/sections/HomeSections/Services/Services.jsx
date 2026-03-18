import { useState, useEffect, useRef } from 'react'
import { useScrollReveal } from '../../../hooks/useScrollReveal'
import { Link } from "react-router-dom";

const SERVICES = [
  { title: 'Social Media Management',          icon: '📊', image: "/images/Home/digital-marketing.jpg" },
  { title: 'Web Development & UI/UX Design',   icon: '🛡',  image: "/images/Home/web-design.jpg" },
  { title: 'Video Production',                 icon: '📋', image: "/images/Home/creative-design.jpg" },
  { title: 'Photography',                      icon: '🛡',  image: "/images/Home/web-design.jpg" },
  { title: 'Search Engine Optimization',       icon: '📊', image: "/images/Home/digital-marketing.jpg" },
]

const VISIBLE = 4
const TOTAL_SLIDES = SERVICES.length - VISIBLE + 1  // 2 positions (0 and 1)

const BREAKPOINTS = `
  @media (max-width: 1200px) {
    .services-inner { padding-left: 120px !important; padding-right: 120px !important; }
  }
  @media (max-width: 992px) {
    .services-inner  { padding-left: 60px !important; padding-right: 60px !important; }
    .services-header { flex-direction: column !important; align-items: flex-start !important; }
  }
  @media (max-width: 768px) {
    .services-inner { padding-left: 24px !important; padding-right: 24px !important; }
  }
  @media (max-width: 480px) {
    .services-inner { padding-left: 16px !important; padding-right: 16px !important; }
  }
`

export default function Services() {
  const header = useScrollReveal({ threshold: 0.1 })
  const cards  = useScrollReveal({ threshold: 0.05 })
  const [activeSlide, setActiveSlide] = useState(0)
  const intervalRef = useRef(null)

  const startAuto = () => {
    intervalRef.current = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % TOTAL_SLIDES)
    }, 3000)
  }

  const stopAuto = () => clearInterval(intervalRef.current)

  useEffect(() => {
    startAuto()
    return () => stopAuto()
  }, [])

  const goTo = (i) => {
    stopAuto()
    setActiveSlide(i)
    startAuto()
  }

  useEffect(() => {
    if (document.getElementById('services-bp')) return
    const s = document.createElement('style')
    s.id = 'services-bp'
    s.textContent = BREAKPOINTS
    document.head.appendChild(s)
  }, [])

  return (
    <section
      id="services"
      style={{
        background: '#111111',
        padding:    '80px 0 100px',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        overflow:   'visible',
      }}
    >
      <div
        className="services-inner"
        style={{ paddingLeft: '285px', paddingRight: '285px' }}
      >

        {/* Header row */}
        <div
          ref={header.ref}
          data-reveal
          className={`services-header ${header.isVisible ? 'is-visible' : ''}`}
          style={{
            display:        'flex',
            justifyContent: 'space-between',
            alignItems:     'flex-end',
            marginBottom:   '48px',
            gap:            '40px',
            flexWrap:       'wrap',
          }}
        >
          <div style={{ maxWidth: '480px' }}>
            <p style={{
              display:       'flex',
              alignItems:    'center',
              gap:           '8px',
              fontSize:      '11px',
              fontWeight:    600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color:         'rgba(255,255,255,0.5)',
              marginBottom:  '12px',
            }}>
              <span style={{ color: '#0f911e', fontSize: '10px' }}>✦</span>
              Services
            </p>
            <h2 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize:   'clamp(1.8rem, 3vw, 2.8rem)',
              fontWeight: 700,
              lineHeight: 1.2,
              color:      '#ffffff',
              margin:     0,
            }}>
              We Provide Digital
              <br />
              Services{' '}
              <span style={{
                display:       'inline-block',
                width:         '90px',
                height:        '38px',
                borderRadius:  '100px',
                overflow:      'hidden',
                verticalAlign: 'middle',
                background:    '#1a2a1a',
                border:        '1px solid rgba(255,255,255,0.1)',
                marginRight:   '8px',
              }} />
              <span style={{ color: '#0f911e' }}>for You</span>
            </h2>
          </div>

          <div style={{ maxWidth: '340px' }}>
            <p style={{
              fontSize:     '14px',
              lineHeight:   '22px',
              color:        'rgba(255,255,255,0.45)',
              marginBottom: '20px',
            }}>
              We provide creative digital solutions to help brands grow, engage audiences, and 
              build a strong online presence.
            </p>
            <button
              onClick={() => window.location.href = '/services'}
              style={{
                display:      'inline-flex',
                alignItems:   'center',
                gap:          '10px',
                background:   '#0f911e',
                color:        '#0a0a0a',
                fontFamily:   "'Plus Jakarta Sans', sans-serif",
                fontSize:     '13px',
                fontWeight:   600,
                border:       'none',
                borderRadius: '100px',
                padding:      '11px 18px 11px 22px',
                cursor:       'pointer',
                transition:   'background 0.25s ease, transform 0.25s ease',
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
                width:          '30px',
                height:         '30px',
                background:     'rgba(0,0,0,0.2)',
                borderRadius:   '50%',
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
              }}>
                <svg width="9" height="9" viewBox="0 0 9 9">
                  <circle cx="4.5" cy="4.5" r="4.5" fill="white" opacity="0.4"/>
                  <circle cx="4.5" cy="4.5" r="1.8" fill="white"/>
                </svg>
              </span>
            </button>
          </div>
        </div>

        {/* Slider */}
        <div style={{ overflow: 'hidden', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div
            ref={cards.ref}
            data-stagger
            className={cards.isVisible ? 'is-visible' : ''}
            style={{
              display:    'flex',
              transform:  `translateX(calc(-${activeSlide} * (100% / ${VISIBLE})))`,
              transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
              willChange: 'transform',
            }}
          >
            {SERVICES.map((service, i) => (
              <div
                key={i}
                style={{
                  flex:      `0 0 calc(100% / ${VISIBLE})`,
                  minWidth:  `calc(100% / ${VISIBLE})`,
                  borderRight: i === SERVICES.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.07)',
                  boxSizing: 'border-box',
                }}
              >
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </div>

        {/* Dot pagination — matches existing style exactly */}
        <div style={{
          display:        'flex',
          justifyContent: 'center',
          gap:            '8px',
          marginTop:      '28px',
        }}>
          {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
            <div
              key={i}
              onClick={() => goTo(i)}
              style={{
                width:        i === activeSlide ? '24px' : '8px',
                height:       '8px',
                borderRadius: '100px',
                background:   i === activeSlide ? '#0f911e' : 'rgba(255,255,255,0.2)',
                cursor:       'pointer',
                transition:   'width 0.4s cubic-bezier(0.16,1,0.3,1), background 0.3s ease',
              }}
            />
          ))}
        </div>

      </div>
    </section>
  )
}

function ServiceCard({ service }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="services-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding:    '40px 24px 36px',
        textAlign:  'center',
        background: hovered ? '#161616' : '#111111',
        position:   'relative',
        overflow:   'hidden',
        transition: 'background 0.3s ease',
        height:     '100%',
      }}
    >
      {/* Top accent line on hover */}
      <div style={{
        position:        'absolute',
        top:             0, left: 0, right: 0,
        height:          '2px',
        background:      '#0f911e',
        transform:       hovered ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'left',
        transition:      'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
      }} />

      <div style={{ position: 'relative', width: '160px', margin: '0 auto 32px' }}>
        <div style={{
          width:        '160px',
          height:       '160px',
          borderRadius: '1000px',
          overflow:     'hidden',
          background:   '#1a2a1a',
          border:       '1px solid rgba(255,255,255,0.08)',
        }}>
          {service.image ? (
            <img
              src={service.image}
              alt={service.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
            />
          ) : (
            <div style={{ width: '100%', height: '100%', background: 'linear-gradient(160deg, #1d2d1d 0%, #0e150e 100%)' }} />
          )}
        </div>

        <div style={{
          position:       'absolute',
          bottom:         '-16px',
          left:           '50%',
          transform:      'translateX(-50%)',
          width:          '40px',
          height:         '40px',
          background:     '#181818',
          borderRadius:   '50%',
          border:         '2px solid #0a0a0a',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          fontSize:       '18px',
          zIndex:         2,
          boxShadow:      '0 0 0 3px #111111',
        }}>
          {service.icon}
        </div>
      </div>

      <h4 style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize:   '15px',
        fontWeight: 600,
        lineHeight: '22px',
        color:      '#ffffff',
        margin:     '16px 0 0',
        padding:    '0 8px',
      }}>
        {service.title}
      </h4>
    </div>
  )
}