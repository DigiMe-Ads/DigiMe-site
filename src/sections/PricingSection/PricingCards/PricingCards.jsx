import { useState, useEffect } from 'react'
import { useScrollReveal } from '../../../hooks/useScrollReveal'
import { PLANS, WEB_PLANS, PRICING_STYLES } from './PricingData'
import PricingCard from './PricingCard'
import PlanModal   from './Planmodal'
import WebDevCard  from './WebdevCard'
import WebDevModal from './WebdevModal'

export default function PricingCards() {
  const gridReveal   = useScrollReveal({ threshold: 0.08 })
  const webReveal    = useScrollReveal({ threshold: 0.08 })
  const [activePlan,    setActivePlan]    = useState(null) // social plan | null
  const [activeWebPlan, setActiveWebPlan] = useState(null) // web plan | null

  // Inject global styles once
  useEffect(() => {
    if (document.getElementById('pricing-styles')) return
    const s = document.createElement('style')
    s.id = 'pricing-styles'
    s.textContent = PRICING_STYLES
    document.head.appendChild(s)
  }, [])

  return (
    <>
      {/* Modals mount outside sections so they overlay everything */}
      {activePlan    && <PlanModal    plan={activePlan}    onClose={() => setActivePlan(null)}    />}
      {activeWebPlan && <WebDevModal  plan={activeWebPlan} onClose={() => setActiveWebPlan(null)} />}

      <section
        id="pricing"
        style={{
          background:    '#0a0a0a',
          fontFamily:    "'Plus Jakarta Sans', sans-serif",
          paddingTop:    '80px',
          paddingBottom: '100px',
          overflow:      'hidden',
        }}
      >
        <div
          className="pricing-inner"
          style={{ paddingLeft: '285px', paddingRight: '285px' }}
        >

          {/* ══════════════════════════════
              SOCIAL MEDIA PACKAGES
          ══════════════════════════════ */}
          <div style={{
            marginBottom:   '56px',
            display:        'flex',
            alignItems:     'flex-end',
            justifyContent: 'space-between',
            flexWrap:       'wrap',
            gap:            '16px',
          }}>
            <div>
              <p style={{
                display:       'flex',
                alignItems:    'center',
                gap:           '8px',
                fontSize:      '11px',
                fontWeight:    600,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color:         'rgba(255,255,255,0.35)',
                marginBottom:  '14px',
              }}>
                <span style={{ color: '#3bff6c' }}>✦</span> Pricing
              </p>
              <h2 style={{
                fontFamily:    "'Plus Jakarta Sans', sans-serif",
                fontSize:      'clamp(2rem, 3.5vw, 3.2rem)',
                fontWeight:    800,
                lineHeight:    1.1,
                letterSpacing: '-0.02em',
                color:         '#ffffff',
                margin:        0,
              }}>
                Social Media{' '}
                <span style={{ color: '#3bff6c', fontStyle: 'italic', fontWeight: 400 }}>
                  Packages
                </span>
              </h2>
            </div>
          </div>

          {/* Social media card grid */}
          <div
            ref={gridReveal.ref}
            className="pricing-grid"
            style={{
              display:    'flex',
              gap:        '20px',
              alignItems: 'stretch',
              opacity:    gridReveal.isVisible ? 1 : 0,
              transform:  gridReveal.isVisible ? 'translateY(0)' : 'translateY(32px)',
              transition: 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            {PLANS.map((plan, i) => (
              <PricingCard
                key={plan.name}
                plan={plan}
                index={i}
                delay={i * 80}
                onChoose={() => setActivePlan(plan)}
              />
            ))}
          </div>

          {/* ── Divider between sections ── */}
          <div style={{
            margin:     '80px 0 72px',
            height:     '1px',
            background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent)',
          }}/>

          {/* ══════════════════════════════
              WEB DEVELOPMENT PACKAGES
          ══════════════════════════════ */}
          <div style={{
            marginBottom: '56px',
            display:      'flex',
            alignItems:   'flex-end',
            justifyContent:'space-between',
            flexWrap:     'wrap',
            gap:          '16px',
          }}>
            <div>
              <p style={{
                display:       'flex',
                alignItems:    'center',
                gap:           '8px',
                fontSize:      '11px',
                fontWeight:    600,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color:         'rgba(255,255,255,0.35)',
                marginBottom:  '14px',
              }}>
                <span style={{ color: '#0f911e' }}>✦</span> Web Development
              </p>
              <h2 style={{
                fontFamily:    "'Plus Jakarta Sans', sans-serif",
                fontSize:      'clamp(2rem, 3.5vw, 3.2rem)',
                fontWeight:    800,
                lineHeight:    1.1,
                letterSpacing: '-0.02em',
                color:         '#ffffff',
                margin:        0,
              }}>
                Web Development{' '}
                <span style={{ color: '#0f911e', fontStyle: 'italic', fontWeight: 400 }}>
                  Packages
                </span>
              </h2>
            </div>

            {/* "More packages coming" pill */}
            <div style={{
              display:      'inline-flex',
              alignItems:   'center',
              gap:          '8px',
              background:   'rgba(15,145,30,0.07)',
              border:       '1px solid rgba(59,255,108,0.2)',
              borderRadius: '100px',
              padding:      '8px 16px',
              alignSelf:    'center',
            }}>
              <div style={{
                width:        '6px',
                height:       '6px',
                borderRadius: '50%',
                background:   '#0f911e',
              }}/>
              <span style={{
                fontFamily:    "'Plus Jakarta Sans', sans-serif",
                fontSize:      '12px',
                fontWeight:    600,
                color:         'rgba(59,255,108,0.8)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}>
                For custom requirements, please contact us.
              </span>
            </div>
          </div>

          {/* Web dev card grid — each card matches one social media card width (~33%) */}
          <div
            ref={webReveal.ref}
            className="webdev-grid"
            style={{
              display:   'flex',
              gap:       '20px',
              alignItems:'stretch',
              opacity:   webReveal.isVisible ? 1 : 0,
              transform: webReveal.isVisible ? 'translateY(0)' : 'translateY(32px)',
              transition:'opacity 0.8s ease 0.1s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s',
            }}
          >
            {WEB_PLANS.map((plan, i) => (
              <div key={plan.name} style={{ width: '100%' }}>
                <WebDevCard
                  plan={plan}
                  index={i}
                  onChoose={() => setActiveWebPlan(plan)}
                />
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  )
}