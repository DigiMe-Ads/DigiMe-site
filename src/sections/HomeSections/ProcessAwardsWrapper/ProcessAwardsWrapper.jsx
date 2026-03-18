import Process from '../Process/Process'
import Awards  from '../Awards/Awards'

export default function ProcessAwardsWrapper() {
  return (
    <div style={{ position: 'relative', background: '#0a0a0a', overflow: 'hidden' }}>

      {/* Yellow streak image */}
      <img
        src="/images/Home/yellow-streak.png"
        alt=""
        aria-hidden="true"
        style={{
          position:      'absolute',
          top:           0,
          left:          0,
          width:         '100%',
          pointerEvents: 'none',
          zIndex:        0,
          opacity:       0.9,
        }}
      />

      {/* Glow — top right */}
      <div style={{
        position:      'absolute',
        top:           '5%',
        right:         0,
        width:         '35%',
        height:        '40%',
        background:    'radial-gradient(ellipse at right, rgba(200,220,0,0.18) 0%, transparent 70%)',
        filter:        'blur(40px)',
        pointerEvents: 'none',
        zIndex:        0,
      }} />

      {/* Glow — mid left */}
      <div style={{
        position:      'absolute',
        top:           '50%',
        left:          '-5%',
        width:         '30%',
        height:        '40%',
        background:    'radial-gradient(ellipse at left, rgba(180,200,0,0.12) 0%, transparent 70%)',
        filter:        'blur(50px)',
        pointerEvents: 'none',
        zIndex:        0,
      }} />

      {/* Geo shape — left side */}
      <div style={{
        position:      'absolute',
        left:          '-2%',
        top:           '50%',
        transform:     'translateY(-50%)',
        width:         'clamp(160px, 18vw, 280px)',
        height:        'clamp(160px, 18vw, 280px)',
        pointerEvents: 'none',
        zIndex:        1,
        opacity:       0.5,
      }}>
        <img
          src="/images/Home/geometry2.png"
          alt=""
          aria-hidden="true"
          style={{ width: '100%', height: 'auto' }}
        />
      </div>

      {/* Sections */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <Process />
        <Awards />
      </div>

    </div>
  )
}