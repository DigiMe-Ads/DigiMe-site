import { useScrollReveal } from '../../../hooks/useScrollReveal'
import { Link } from 'react-router-dom'

const MISSIONS = [
  {
    icon:  '🚀',
    title: 'Company Mission',
    body:  'To provide clients with measurable results, WOW factor, and a one-of-a-kind service. ',
  },
  {
    icon:  '🎯',
    title: 'Company Vision & Goals',
    body:  'To be one of the top ten providers of digital solutions in Sri Lanka. ',
  },
]

const BREAKPOINTS = `
  @media (max-width: 1200px) {
    .about-inner { margin-left: 120px !important; margin-right: 60px !important; }
    .about-us { padding:    50px 0px;}
  }
  @media (max-width: 992px) {
    .about-inner {
      margin-left: 60px !important;
      margin-right: 60px !important;
      grid-template-columns: 1fr !important;
    }
    .about-collage { max-width: 380px; margin: 0 auto; }
  }
  @media (max-width: 768px) {
    .about-inner {
      margin-left: 24px !important;
      margin-right: 24px !important;
      padding: 32px !important;
      gap: 32px !important;
    }
  }
  @media (max-width: 480px) {
    .about-inner {
      margin-left: 16px !important;
      margin-right: 16px !important;
      padding: 24px !important;
    }
    .about-missions { grid-template-columns: 1fr !important; }
  }
`

export default function About() {
  const section = useScrollReveal({ threshold: 0.1 })

  // Inject breakpoints once
  if (typeof document !== 'undefined' && !document.getElementById('about-bp')) {
    const s = document.createElement('style')
    s.id = 'about-bp'
    s.textContent = BREAKPOINTS
    document.head.appendChild(s)
  }

  return (
    <section
      id="about-us"
      className='about-us'
      style={{
        background: '#0a0a0a',
        padding:    '80px 0px',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        overflow:   'visible',
      }}
    >
      <div
        ref={section.ref}
        data-reveal
        className={`about-inner ${section.isVisible ? 'is-visible' : ''}`}
        style={{
          paddingLeft:          '285px',
          paddingRight:         '300px',
          borderRadius:        '12px',
          padding:             '48px',
          display:             'grid',
          gridTemplateColumns: '1fr 1.2fr',
          gap:                 '60px',
          alignItems:          'center',
          position:            'relative',
        }}
      >

        {/* Left: collage image */}
        <div className="about-collage">
          
            
              
              <img src="/images/Home/collaborating.png" alt="Team"
                   style={{ width:'70%', height:'70%', objectFit:'cover' }} />
           
          
        </div>

        {/* Right: text */}
        <div>
          <p
            style={{
              display:       'flex',
              alignItems:    'center',
              gap:           '8px',
              fontSize:      '11px',
              fontWeight:    600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color:         'rgba(255,255,255,0.5)',
              marginBottom:  '16px',
            }}
          >
            <span style={{ color: '', fontSize: '10px' }}>✦</span>
            Our Strategy
          </p>

          <h2
            style={{
              fontFamily:   "'Plus Jakarta Sans', sans-serif",
              fontSize:     'clamp(1.6rem, 2.8vw, 2.6rem)',
              fontWeight:   600,
              lineHeight:   1.2,
              color:        '#ffffff',
              marginBottom: '16px',
            }}
          >
            Redefining the World for{' '}
            <span style={{ color: '#0f911e' }}>a</span>
            <br />
            <span style={{ color: '#0f911e' }}>Better Tomorrow</span>
          </h2>

          <p
            style={{
              fontSize:     '14px',
              lineHeight:   '22px',
              color:        'rgba(255,255,255,0.45)',
              marginBottom: '32px',
              maxWidth:     '46ch',
            }}
          >
            Our work process begins with in-depth research to understand the current brand position. 
            We then align these insights with business goals to attract strong leads. Next, we create 
            targeted content to reach the right audience. Finally, we measure performance, evaluate 
            results, and follow up with clients to optimize campaign outcomes.
          </p>

          {/* Mission / Vision */}
          <div
            className="about-missions"
            style={{
              display:             'grid',
              gridTemplateColumns: '1fr 1fr',
              gap:                 '24px',
              marginBottom:        '32px',
            }}
          >
            {MISSIONS.map(m => (
              <div key={m.title}>
                <div
                  style={{
                    width:          '44px',
                    height:         '44px',
                    background:     '#0f911e',
                    borderRadius:   '50%',
                    display:        'flex',
                    alignItems:     'center',
                    justifyContent: 'center',
                    fontSize:       '18px',
                    marginBottom:   '12px',
                  }}
                >
                  {m.icon}
                </div>
                <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#fff', marginBottom: '8px' }}>
                  {m.title}
                </h4>
                <p style={{ fontSize: '13px', lineHeight: '20px', color: 'rgba(255,255,255,0.4)', margin: 0 }}>
                  {m.body}
                </p>
              </div>
            ))}
          </div>

          <Link
            to="/contact"
            style={{
              display:             'inline-flex',
              alignItems:          'center',
              gap:                 '6px',
              fontSize:            '14px',
              fontWeight:          600,
              color:               '#ffffff',
              textDecoration:      'underline',
              textUnderlineOffset: '4px',
              transition:          'color 0.25s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#0f911e'}
            onMouseLeave={e => e.currentTarget.style.color = '#ffffff'}
          >
            Contact With Us <span>↗</span>
          </Link>
        </div>

      </div>
    </section>
  )
}