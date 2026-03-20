import { useState, useEffect } from 'react'
import InputField from './InputField'
import { WEB3FORMS_ACCESS_KEY } from './PricingData'
import { WEB_ACCENT, WEB_ACCENT_BRIGHT } from './WebdevCard'

export default function WebDevModal({ plan, onClose }) {
  const [form,     setForm]     = useState({ name: '', email: '', phone: '', message: '' })
  const [focused,  setFocused]  = useState(null)
  const [status,   setStatus]   = useState('idle') // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState('')

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Escape to close
  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose])

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim()) {
      setErrorMsg('Please fill in your name and email.')
      setStatus('error')
      setTimeout(() => { setStatus('idle'); setErrorMsg('') }, 3500)
      return
    }

    setStatus('sending')
    setErrorMsg('')

    const planSummary = [
      `Package: ${plan.name} — ${plan.price} ${plan.period}`,
      `Stack: ${plan.stack}`,
      '',
      "What's Included:",
      ...plan.features.map((f) => `  • ${f}`),
      '',
      'Also Included:',
      ...plan.addedServices.map((s) => `  • ${s}`),
    ].join('\n')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject:    `Web Dev Enquiry — ${plan.name} (${plan.price}) from ${form.name}`,
          name:       form.name,
          email:      form.email,
          phone:      form.phone || 'Not provided',
          package:    planSummary,
          message:    form.message || 'No additional message.',
        }),
      })

      const data = await res.json()

      if (data.success) {
        setStatus('sent')
        setTimeout(() => { setStatus('idle'); onClose() }, 2800)
      } else {
        setErrorMsg('Something went wrong. Please try again.')
        setStatus('error')
        setTimeout(() => { setStatus('idle'); setErrorMsg('') }, 3500)
      }
    } catch (err) {
      console.error('Web3Forms error:', err)
      setErrorMsg('Something went wrong. Please try again.')
      setStatus('error')
      setTimeout(() => { setStatus('idle'); setErrorMsg('') }, 3500)
    }
  }

  const btnLabel = {
    idle:    'Send Enquiry',
    sending: 'Sending…',
    sent:    '✓ Enquiry Sent!',
    error:   '✕ Try Again',
  }[status]

  const btnBg = {
    idle:    'rgba(99,102,241,0.9)',
    sending: 'rgba(99,102,241,0.4)',
    sent:    'rgba(34,197,94,0.85)',
    error:   '#dc2626',
  }[status]

  return (
    <div
      className="plan-modal-backdrop"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      style={{
        position:       'fixed',
        inset:          0,
        zIndex:         2000,
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        padding:        '24px 20px',
        boxSizing:      'border-box',
        backdropFilter: 'blur(18px) brightness(0.25)',
        WebkitBackdropFilter: 'blur(18px) brightness(0.25)',
        background:     'rgba(0,0,0,0.7)',
        animation:      'planModalBackdropIn 0.25s ease',
        fontFamily:     "'Plus Jakarta Sans', sans-serif",
      }}
    >
      <div
        className="plan-modal-inner"
        style={{
          position:      'relative',
          width:         '100%',
          maxWidth:      '680px',
          background:    '#0f0e2a',
          border:        '1px solid rgba(129,140,248,0.15)',
          borderRadius:  '20px',
          padding:       '36px 40px',
          boxShadow:     '0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(99,102,241,0.08)',
          animation:     'planModalIn 0.3s cubic-bezier(0.16,1,0.3,1)',
          maxHeight:     'calc(100vh - 48px)',
          overflowY:     'auto',
          boxSizing:     'border-box',
        }}
      >
        {/* Subtle corner glow */}
        <div aria-hidden="true" style={{
          position:      'absolute',
          top:           '-40px',
          right:         '-40px',
          width:         '220px',
          height:        '220px',
          borderRadius:  '50%',
          background:    'radial-gradient(ellipse, rgba(99,102,241,0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}/>

        {/* ── Header ── */}
        <div style={{
          display:        'flex',
          alignItems:     'flex-start',
          justifyContent: 'space-between',
          marginBottom:   '28px',
          gap:            '16px',
          position:       'relative',
          zIndex:         1,
        }}>
          <div>
            <p style={{
              display:       'flex',
              alignItems:    'center',
              gap:           '7px',
              fontSize:      '11px',
              fontWeight:    600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color:         'rgba(255,255,255,0.3)',
              margin:        '0 0 10px',
            }}>
              <span style={{ color: WEB_ACCENT }}>✦</span>
              Web Development Enquiry
            </p>
            <h3 style={{
              fontFamily:    "'Plus Jakarta Sans', sans-serif",
              fontSize:      'clamp(1.3rem, 2.2vw, 1.8rem)',
              fontWeight:    700,
              color:         '#ffffff',
              margin:        0,
              letterSpacing: '-0.02em',
              lineHeight:    1.2,
            }}>
              {plan.name}{' '}
              <span style={{ color: WEB_ACCENT_BRIGHT, fontWeight: 400, fontStyle: 'italic' }}>
                Package
              </span>
            </h3>
          </div>

          {/* Close */}
          <button
            onClick={onClose}
            style={{
              background:     'rgba(129,140,248,0.07)',
              border:         '1px solid rgba(129,140,248,0.15)',
              borderRadius:   '50%',
              width:          '36px',
              height:         '36px',
              flexShrink:     0,
              cursor:         'pointer',
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              color:          'rgba(255,255,255,0.5)',
              transition:     'background 0.2s ease, color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(129,140,248,0.18)'
              e.currentTarget.style.color = '#fff'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(129,140,248,0.07)'
              e.currentTarget.style.color = 'rgba(255,255,255,0.5)'
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

        {/* ── Package summary banner ── */}
        <div style={{
          background:     'rgba(99,102,241,0.08)',
          border:         '1px solid rgba(129,140,248,0.2)',
          borderRadius:   '12px',
          padding:        '16px 20px',
          marginBottom:   '24px',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          gap:            '12px',
          flexWrap:       'wrap',
          position:       'relative',
          zIndex:         1,
        }}>
          <div>
            <p style={{
              fontFamily:    "'Plus Jakarta Sans', sans-serif",
              fontSize:      '12px',
              fontWeight:    600,
              color:         WEB_ACCENT,
              margin:        '0 0 4px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}>
              Selected Package
            </p>
            <p style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize:   '15px',
              fontWeight: 700,
              color:      '#ffffff',
              margin:     '0 0 4px',
            }}>
              {plan.name}
            </p>
            {/* Stack */}
            <p style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize:   '11px',
              color:      'rgba(255,255,255,0.35)',
              margin:     0,
            }}>
              {plan.stack}
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{
              fontFamily:    "'Plus Jakarta Sans', sans-serif",
              fontSize:      'clamp(1.2rem, 2vw, 1.5rem)',
              fontWeight:    800,
              color:         WEB_ACCENT_BRIGHT,
              letterSpacing: '-0.02em',
              margin:        0,
              lineHeight:    1,
            }}>
              {plan.price}
            </p>
            <p style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize:   '12px',
              color:      'rgba(255,255,255,0.3)',
              margin:     '3px 0 0',
            }}>
              {plan.period}
            </p>
          </div>
        </div>

        {/* ── Feature chips ── */}
        <div style={{
          display:      'flex',
          gap:          '8px',
          flexWrap:     'wrap',
          marginBottom: '24px',
          position:     'relative',
          zIndex:       1,
        }}>
          {plan.features.slice(0, 3).map((f, i) => (
            <span key={i} style={{
              fontFamily:   "'Plus Jakarta Sans', sans-serif",
              fontSize:     '11px',
              fontWeight:   500,
              color:        'rgba(255,255,255,0.4)',
              background:   'rgba(255,255,255,0.04)',
              border:       '1px solid rgba(255,255,255,0.07)',
              borderRadius: '100px',
              padding:      '4px 12px',
            }}>
              {f}
            </span>
          ))}
          {plan.features.length > 3 && (
            <span style={{
              fontFamily:   "'Plus Jakarta Sans', sans-serif",
              fontSize:     '11px',
              fontWeight:   500,
              color:        WEB_ACCENT,
              background:   'rgba(99,102,241,0.08)',
              border:       `1px solid rgba(129,140,248,0.18)`,
              borderRadius: '100px',
              padding:      '4px 12px',
            }}>
              +{plan.features.length - 3} more
            </span>
          )}
        </div>

        {/* ── Divider ── */}
        <div style={{
          height:       '1px',
          background:   'rgba(129,140,248,0.1)',
          marginBottom: '28px',
          position:     'relative',
          zIndex:       1,
        }}/>

        {/* ── Form — violet-accented inputs ── */}
        <div
          className="plan-modal-grid"
          style={{
            display:             'grid',
            gridTemplateColumns: '1fr 1fr',
            gap:                 '28px 36px',
            position:            'relative',
            zIndex:              1,
          }}
        >
          {/* Reuse InputField but override focus colour via webdev-input class on textarea */}
          <InputField
            label="Full Name *"
            placeholder="Your Full Name"
            value={form.name}
            onChange={(v) => setForm((p) => ({ ...p, name: v }))}
            focused={focused === 'name'}
            onFocus={() => setFocused('name')}
            onBlur={() => setFocused(null)}
            disabled={status === 'sending'}
            accentColor="rgba(129,140,248,0.55)"
          />

          <InputField
            label="Email Address *"
            placeholder="your@email.com"
            value={form.email}
            onChange={(v) => setForm((p) => ({ ...p, email: v }))}
            focused={focused === 'email'}
            onFocus={() => setFocused('email')}
            onBlur={() => setFocused(null)}
            disabled={status === 'sending'}
            accentColor="rgba(129,140,248,0.55)"
          />

          <div style={{ gridColumn: '1 / -1' }}>
            <InputField
              label="Phone Number"
              placeholder="(+94) 7XX XXX XXX"
              value={form.phone}
              onChange={(v) => setForm((p) => ({ ...p, phone: v }))}
              focused={focused === 'phone'}
              onFocus={() => setFocused('phone')}
              onBlur={() => setFocused(null)}
              disabled={status === 'sending'}
              accentColor="rgba(129,140,248,0.55)"
            />
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{
              display:       'block',
              fontFamily:    "'Plus Jakarta Sans', sans-serif",
              fontSize:      '13px',
              fontWeight:    500,
              color:         'rgba(255,255,255,0.5)',
              marginBottom:  '10px',
              letterSpacing: '0.01em',
            }}>
              Additional Message
            </label>
            <textarea
              className="webdev-input"
              placeholder="Tell us about your project, goals, or any specific requirements…"
              rows={3}
              value={form.message}
              onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
              onFocus={() => setFocused('message')}
              onBlur={() => setFocused(null)}
              disabled={status === 'sending'}
              style={{
                width:        '100%',
                background:   'transparent',
                border:       'none',
                borderBottom: `1px solid ${focused === 'message' ? 'rgba(129,140,248,0.55)' : 'rgba(255,255,255,0.1)'}`,
                borderRadius: 0,
                padding:      '8px 0',
                fontFamily:   "'Plus Jakarta Sans', sans-serif",
                fontSize:     '14px',
                color:        '#ffffff',
                resize:       'none',
                transition:   'border-color 0.25s ease',
                display:      'block',
                boxSizing:    'border-box',
              }}
            />
          </div>

          {errorMsg && (
            <div style={{ gridColumn: '1 / -1', marginTop: '-8px' }}>
              <p style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize:   '13px',
                color:      '#f87171',
                margin:     0,
              }}>
                {errorMsg}
              </p>
            </div>
          )}

          <div style={{ gridColumn: '1 / -1', paddingTop: '8px' }}>
            <button
              onClick={handleSubmit}
              disabled={status === 'sending' || status === 'sent'}
              style={{
                display:      'inline-flex',
                alignItems:   'center',
                gap:          '10px',
                background:   btnBg,
                color:        '#ffffff',
                fontFamily:   "'Plus Jakarta Sans', sans-serif",
                fontSize:     '14px',
                fontWeight:   600,
                border:       'none',
                borderRadius: '100px',
                padding:      '13px 22px 13px 28px',
                cursor:       (status === 'sending' || status === 'sent') ? 'not-allowed' : 'pointer',
                transition:   'background 0.25s ease, transform 0.25s ease',
                opacity:      status === 'sending' ? 0.7 : 1,
                minWidth:     '180px',
              }}
              onMouseEnter={(e) => {
                if (status === 'idle') {
                  e.currentTarget.style.background = 'rgba(129,140,248,0.95)'
                  e.currentTarget.style.transform  = 'translateY(-2px)'
                }
              }}
              onMouseLeave={(e) => {
                if (status === 'idle') {
                  e.currentTarget.style.background = 'rgba(99,102,241,0.9)'
                  e.currentTarget.style.transform  = 'translateY(0)'
                }
              }}
            >
              {btnLabel}
              {status === 'idle' && (
                <span style={{
                  width:          '36px',
                  height:         '36px',
                  background:     'rgba(255,255,255,0.15)',
                  borderRadius:   '50%',
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  flexShrink:     0,
                }}>
                  <svg width="10" height="10" viewBox="0 0 10 10">
                    <circle cx="5" cy="5" r="5" fill="white" opacity="0.35"/>
                    <circle cx="5" cy="5" r="2" fill="white"/>
                  </svg>
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}