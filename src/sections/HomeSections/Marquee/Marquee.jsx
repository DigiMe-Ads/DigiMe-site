// Infinite scrolling marquee — the APPLICATION / WEB DESIGN / DEVELOPMENT ticker
import './Marquee.css'

const ITEMS = [
  { text: 'SOCIAL MEDIA MANAGEMENT', accent: false },
  { text: 'UI/UX DESIGN',  accent: true  },
  { text: 'WEB DEVELOPMENT', accent: false },
  { text: 'BRANDING',    accent: false },
  { text: 'STRATEGY',    accent: true  },
  { text: 'SEO', accent: false },
  { text: 'VIDEOGRAPHY',  accent: true  },
  { text: 'PHOTOGRAPHY', accent: false },
  // { text: 'BRANDING',    accent: false },
  // { text: 'STRATEGY',    accent: true  },
]

export default function Marquee() {
  return (
    <div className="marquee-section" aria-hidden="true">
      <div className="marquee-track">
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span key={i} className={`marquee-item ${item.accent ? 'marquee-item--accent' : ''}`}>
            <span className="marquee-dot">•</span>
            {item.text}
          </span>
        ))}
      </div>
    </div>
  )
}