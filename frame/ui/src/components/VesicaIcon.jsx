// Vesica Piscis — two equal circles, each center sitting on the other's
// circumference. The intersection (the lens / vesica) is the brand mark.
// Used consistently everywhere the Vesica appears: nav logo, HUD, mascot.
// Canonical proportions: r=16, centers 16 apart (cx 22 / 38), viewBox 60x40.
export default function VesicaIcon({
  className = "",
  style,
  circleClassName = "",
  fillClassName = "",
  strokeOpacity = 0.6,
  fillOpacity = 0.35,
}) {
  return (
    <svg viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
      <circle
        className={circleClassName}
        cx="22" cy="20" r="16"
        stroke={`rgba(232,103,58,${strokeOpacity})`}
        strokeWidth="1"
      />
      <circle
        className={circleClassName}
        cx="38" cy="20" r="16"
        stroke={`rgba(232,103,58,${strokeOpacity})`}
        strokeWidth="1"
      />
      <path
        className={fillClassName}
        d="M30 5.1 C23.5 9.2 19.5 14.3 19.5 20 C19.5 25.7 23.5 30.8 30 34.9 C36.5 30.8 40.5 25.7 40.5 20 C40.5 14.3 36.5 9.2 30 5.1Z"
        fill={`rgba(232,103,58,${fillOpacity})`}
      />
    </svg>
  );
}
