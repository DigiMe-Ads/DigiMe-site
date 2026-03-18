import { useState, useEffect, useRef } from 'react'
import { useScrollReveal } from '../../../hooks/useScrollReveal'

const REVIEWS = [
  {
    name:   'Tina Brown',
    role:   'Designer',
    stars:  5,
    text:   'They took our vision and turned it into a stunning website that perfectly captures our brand. The process was seamless, and they kept us informed every step of turning the way',
    avatar: '/images/Home/Testimonials/person1.png',
  },
  {
    name:   'James Park',
    role:   'CEO',
    stars:  5,
    text:   'Exceptional team. The animations and overall experience they created for us blew our expectations completely out of the water.',
    avatar: '/images/Home/Testimonials/person2.jpg',
  },
  {
    name:   'Sara Miles',
    role:   'Product Lead',
    stars:  5,
    text:   'World-class work, outstanding communication, and delivery that was ahead of schedule. Highly recommend for any digital project.',
    avatar: '/images/Home/Testimonials/person3.png',
  },
]

const SCATTERED_PHOTOS = [
  { id: 1, top: '8%',  left: '8%',  width: '120px', image: '/images/Home/Testimonials/scattered1.jpg', rotate: '-4deg' },
  { id: 2, top: '42%', left: '4%',  width: '90px',  image: '/images/Home/Testimonials/scattered2.jpg', rotate: '3deg'  },
  { id: 3, top: '65%', left: '10%', width: '140px', image: '/images/Home/Testimonials/scattered3.jpg', rotate: '-2deg' },
  { id: 4, top: '5%',  right: '7%', width: '110px', image: '/images/Home/Testimonials/scattered1.jpg', rotate: '5deg'  },
  { id: 5, top: '52%', right: '4%', width: '120px', image: '/images/Home/Testimonials/scattered2.jpg', rotate: '-3deg' },
]

const KEYFRAMES = `
  @keyframes testiFloat {
    0%, 100% { transform: translateY(0px);  }
    50%       { transform: translateY(-10px); }
  }
  @keyframes testiQuoteFade {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  @keyframes testiStarPop {
    0%   { transform: scale(0.5); opacity: 0; }
    60%  { transform: scale(1.3); }
    100% { transform: scale(1);   opacity: 1; }
  }
  @keyframes testiPulseRing {
    0%, 100% { opacity: 0.03; transform: translate(-50%, -50%) scale(1);   }
    50%       { opacity: 0.07; transform: translate(-50%, -50%) scale(1.04); }
  }
  @keyframes testiGlow {
    0%, 100% { opacity: 0.18; }
    50%       { opacity: 0.28; }
  }
  @media (max-width: 992px) {
    .testi-scattered { display: none !important; }
    .testi-inner     { padding: 60px 40px !important; }
  }
  @media (max-width: 768px) {
    .testi-inner   { padding: 48px 24px !important; }
    .testi-heading { font-size: clamp(1.6rem, 5vw, 2.2rem) !important; }
  }
`

export default function Testimonials() {
  const [active, setActive]   = useState(0)
  const [animKey, setAnimKey] = useState(0)
  const section = useScrollReveal({ threshold: 0.1 })

  useEffect(() => {
    if (document.getElementById('testi-kf')) return
    const s = document.createElement('style')
    s.id = 'testi-kf'
    s.textContent = KEYFRAMES
    document.head.appendChild(s)
  }, [])

  const handleAvatar = (i) => {
    if (i === active) return
    setActive(i)
    setAnimKey(k => k + 1)
  }

  return (
    <section
      id="testimonials"
      style={{
        position:   'relative',
        background: '#0a0a0a',
        overflow:   'hidden',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >

      {/* ── Bottom-center green glow ── */}
      <div
        aria-hidden="true"
        style={{
          position:      'absolute',
          bottom:        '-10%',
          left:          '50%',
          transform:     'translateX(-50%)',
          width:         '600px',
          height:        '300px',
          borderRadius:  '50%',
          background:    'radial-gradient(ellipse at center, rgba(59,255,108,0.12) 0%, transparent 70%)',
          filter:        'blur(40px)',
          pointerEvents: 'none',
          zIndex:        1,
          animation:     'testiGlow 6s ease-in-out infinite',
        }}
      />

      {/* ── Concentric pulse rings behind content ── */}
      {[560, 440, 330].map((size, i) => (
        <div
          key={size}
          aria-hidden="true"
          style={{
            position:      'absolute',
            top:           '50%',
            left:          '50%',
            width:         `${size}px`,
            height:        `${size}px`,
            borderRadius:  '50%',
            border:        '1px solid rgba(255,255,255,0.045)',
            transform:     'translate(-50%, -50%)',
            animation:     `testiPulseRing ${7 + i * 1.5}s ease-in-out infinite`,
            animationDelay:`${i * 0.8}s`,
            pointerEvents: 'none',
            zIndex:        1,
          }}
        />
      ))}

      {/* ── Scattered photos ── */}
      {SCATTERED_PHOTOS.map((photo, idx) => (
        <div
          key={photo.id}
          className="testi-scattered"
          style={{
            position:       'absolute',
            top:            photo.top,
            left:           photo.left  || 'auto',
            right:          photo.right || 'auto',
            width:          photo.width,
            zIndex:         2,
            animation:      `testiFloat ${5.5 + idx * 0.7}s ease-in-out infinite`,
            animationDelay: `${idx * 0.5}s`,
          }}
        >
          <div style={{
            width:        '100%',
            aspectRatio:  '1 / 1',
            borderRadius: '14px',
            overflow:     'hidden',
            border:       '1px solid rgba(255,255,255,0.08)',
            boxShadow:    '0 8px 32px rgba(0,0,0,0.55)',
            transform:    `rotate(${photo.rotate})`,
          }}>
            {photo.image ? (
              <img
                src={photo.image}
                alt=""
                aria-hidden="true"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            ) : (
              <div style={{
                width:      '100%',
                height:     '100%',
                background: `linear-gradient(135deg, hsl(${100 + photo.id * 30}, 15%, 16%) 0%, hsl(${100 + photo.id * 30}, 10%, 10%) 100%)`,
              }} />
            )}
          </div>
        </div>
      ))}

      {/* ── Center content ── */}
      <div
        className="testi-inner"
        ref={section.ref}
        style={{
          position:   'relative',
          zIndex:     3,
          textAlign:  'center',
          padding:    '100px 285px',
          opacity:    section.isVisible ? 1 : 0,
          transform:  section.isVisible ? 'translateY(0)' : 'translateY(28px)',
          transition: 'opacity 0.9s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1)',
        }}
      >

        {/* Eyebrow */}
        <p style={{
          display:       'inline-flex',
          alignItems:    'center',
          gap:           '8px',
          fontSize:      '11px',
          fontWeight:    600,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color:         'rgba(255,255,255,0.45)',
          marginBottom:  '20px',
        }}>
          <span style={{ color: '#0f911e', fontSize: '10px' }}>✦</span>
          Testimonial
        </p>

        {/* Heading */}
        <h2
          className="testi-heading"
          style={{
            fontFamily:   "'Plus Jakarta Sans', sans-serif",
            fontSize:     'clamp(1.8rem, 3vw, 3rem)',
            fontWeight:   700,
            lineHeight:   1.2,
            color:        '#ffffff',
            marginBottom: '36px',
            margin:       '0 0 36px 0',
          }}
        >
          Hear what others say<br />
          about{' '}
          <span style={{
            color:      '#0f911e',
            fontStyle:  'italic',
            fontWeight: 400,
          }}>
            partnering with us
          </span>
        </h2>

        {/* Avatar switcher */}
        <div style={{
          display:        'flex',
          justifyContent: 'center',
          alignItems:     'center',
          gap:            '12px',
          marginBottom:   '40px',
        }}>
          {REVIEWS.map((r, i) => (
            <button
              key={r.name}
              onClick={() => handleAvatar(i)}
              aria-label={r.name}
              style={{
                width:        i === active ? '72px' : '56px',
                height:       i === active ? '72px' : '56px',
                borderRadius: '50%',
                padding:      0,
                border:       `2px solid ${i === active ? '#0f911e' : 'rgba(255,255,255,0.15)'}`,
                overflow:     'hidden',
                cursor:       'pointer',
                background:   'none',
                transition:   'border-color 0.3s ease, width 0.3s cubic-bezier(0.34,1.56,0.64,1), height 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                flexShrink:   0,
                boxShadow:    i === active ? '0 0 0 4px rgba(59,255,108,0.15)' : 'none',
              }}
            >
              {r.avatar ? (
                <img
                  src={r.avatar}
                  alt={r.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              ) : (
                <div style={{
                  width:          '100%',
                  height:         '100%',
                  background:     `hsl(${120 + i * 60}, 20%, 25%)`,
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  fontSize:       '18px',
                  color:          'rgba(255,255,255,0.6)',
                  fontWeight:     600,
                }}>
                  {r.name[0]}
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Large quote mark */}
        <div style={{
          fontSize:     '80px',
          lineHeight:   0.6,
          color:        'rgba(59,255,108,0.22)',
          fontFamily:   'Georgia, serif',
          marginBottom: '20px',
          userSelect:   'none',
        }}>
          "
        </div>

        {/* Quote text */}
        <p
          key={animKey}
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize:   'clamp(0.95rem, 1.4vw, 1.1rem)',
            fontStyle:  'italic',
            fontWeight: 400,
            lineHeight: 1.9,
            color:      'rgba(255,255,255,0.7)',
            maxWidth:   '580px',
            margin:     '0 auto 32px',
            animation:  'testiQuoteFade 0.5s ease forwards',
          }}
        >
          {REVIEWS[active].text}
        </p>

        {/* Stars — stagger pop-in on review change */}
        <div style={{
          display:        'flex',
          justifyContent: 'center',
          gap:            '5px',
          marginBottom:   '20px',
        }}>
          {[...Array(REVIEWS[active].stars)].map((_, i) => (
            <span
              key={`${animKey}-${i}`}
              style={{
                color:          '#0f911e',
                fontSize:       '22px',
                display:        'inline-block',
                animation:      'testiStarPop 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards',
                animationDelay: `${i * 60}ms`,
                opacity:        0,
              }}
            >
              ★
            </span>
          ))}
        </div>

        {/* Name */}
        <p style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize:   '15px',
          fontWeight: 600,
          color:      '#ffffff',
          margin:     '0 0 4px',
        }}>
          {REVIEWS[active].name}
        </p>

        {/* Role */}
        <p style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize:   '13px',
          color:      'rgba(255,255,255,0.35)',
          margin:     0,
        }}>
          {REVIEWS[active].role}
        </p>

      </div>
    </section>
  )
}