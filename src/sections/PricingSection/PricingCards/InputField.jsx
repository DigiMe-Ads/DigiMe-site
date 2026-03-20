// Reusable underline-style text input, matching the contact form aesthetic

export default function InputField({
  label,
  placeholder,
  value,
  onChange,
  focused,
  onFocus,
  onBlur,
  disabled,
  accentColor = 'rgba(59,255,108,0.55)', // green for social plans, violet for web dev
}) {
  return (
    <div>
      <label
        style={{
          display:       'block',
          fontFamily:    "'Plus Jakarta Sans', sans-serif",
          fontSize:      '13px',
          fontWeight:    500,
          color:         'rgba(255,255,255,0.55)',
          marginBottom:  '10px',
          letterSpacing: '0.01em',
        }}
      >
        {label}
      </label>
      <input
        className="plan-input"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled}
        style={{
          width:        '100%',
          background:   'transparent',
          border:       'none',
          borderBottom: `1px solid ${focused ? accentColor : 'rgba(255,255,255,0.12)'}`,
          borderRadius: 0,
          padding:      '8px 0',
          fontFamily:   "'Plus Jakarta Sans', sans-serif",
          fontSize:     '14px',
          color:        '#ffffff',
          transition:   'border-color 0.25s ease',
          display:      'block',
          boxSizing:    'border-box',
        }}
      />
    </div>
  )
}