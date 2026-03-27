export default function StatCard({ card }) {
  return (
    <div style={{
      background:   'linear-gradient(135deg, rgba(59,255,108,0.1) 0%, rgba(59,255,108,0.03) 100%)',
      border:       '1px solid rgba(59,255,108,0.18)',
      borderRadius: '14px',
      padding:      '28px 22px',
      position:     'relative',
      overflow:     'hidden',
    }}>
      {/* Corner glow */}
      <div style={{
        position:      'absolute',
        top:           '-16px',
        right:         '-16px',
        width:         '70px',
        height:        '70px',
        borderRadius:  '50%',
        background:    'rgba(59,255,108,0.12)',
        filter:        'blur(18px)',
        pointerEvents: 'none',
      }}/>

      <div style={{
        fontFamily:    "'Plus Jakarta Sans', sans-serif",
        fontSize:      'clamp(2rem, 3.5vw, 3rem)',
        fontWeight:    900,
        color:         '#0f911e',
        letterSpacing: '-0.04em',
        lineHeight:    1,
        marginBottom:  '8px',
      }}>
        {card.value}
      </div>

      <div style={{
        fontFamily:   "'Plus Jakarta Sans', sans-serif",
        fontSize:     '13px',
        fontWeight:   600,
        color:        'rgba(255,255,255,0.7)',
        marginBottom: '3px',
      }}>
        {card.label}
      </div>

      <div style={{
        fontFamily:    "'Plus Jakarta Sans', sans-serif",
        fontSize:      '11px',
        color:         'rgba(255,255,255,0.28)',
        letterSpacing: '0.04em',
      }}>
        {card.sub}
      </div>
    </div>
  )
}