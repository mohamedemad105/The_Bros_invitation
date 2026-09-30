interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "blue" | "white" | "orange";
  showTagline?: boolean;
  className?: string;
}

const sizeMap = {
  sm: { hand: 28, brandHeight: 28 },
  md: { hand: 40, brandHeight: 40 },
  lg: { hand: 56, brandHeight: 56 },
  xl: { hand: 80, brandHeight: 80 },
};

export function Logo({
  size = "md",
  variant = "blue",
  showTagline = true,
  className = "",
}: LogoProps) {
  const { hand, brandHeight } = sizeMap[size];
  const color = variant === "white" ? "#FFFFFF" : variant === "orange" ? "#F47820" : "#1B35CC";
  const taglineColor = variant === "white" ? "rgba(255,255,255,0.7)" : "#1B35CC";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Peace hand icon */}
      <svg
        width={hand}
        height={hand}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Palm base */}
        <rect x="10" y="26" width="28" height="16" rx="6" fill={color} />
        {/* Index finger */}
        <rect x="18" y="8" width="7" height="22" rx="3.5" fill={color} />
        {/* Middle finger */}
        <rect x="27" y="6" width="7" height="24" rx="3.5" fill={color} />
        {/* Ring finger (folded) */}
        <rect x="9" y="20" width="7" height="12" rx="3.5" fill={color} />
        {/* Pinky (folded) */}
        <rect x="32" y="22" width="6" height="10" rx="3" fill={color} />
        {/* Thumb */}
        <rect x="7" y="28" width="8" height="6" rx="3" fill={color} />
      </svg>

      {/* Wordmark */}
      <div style={{ lineHeight: 1 }}>
        <div
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 900,
            color,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <span
            style={{
              fontSize: brandHeight * 0.3,
              letterSpacing: "0.05em",
              lineHeight: 1.1,
            }}
          >
            The
          </span>
          <span
            style={{
              fontSize: brandHeight * 0.52,
              letterSpacing: "-0.01em",
              lineHeight: 1,
            }}
          >
            Bros
          </span>
        </div>
        {showTagline && (
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
              fontSize: brandHeight * 0.2,
              color: taglineColor,
              letterSpacing: "0.04em",
              display: "block",
              marginTop: 2,
            }}
          >
            Coffee &amp; More
          </span>
        )}
      </div>
    </div>
  );
}
