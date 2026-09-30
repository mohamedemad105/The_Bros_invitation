import { useState, useRef, useCallback, useEffect } from "react";
import { Logo } from "../brand/Logo";
import { eventConfig } from "../../config/event";

interface WelcomeScreenProps {
  onYes: () => void;
  visible: boolean;
}

interface NoPosition {
  x: number;
  y: number;
}

export function WelcomeScreen({ onYes, visible }: WelcomeScreenProps) {
  const [noPosition, setNoPosition] = useState<NoPosition | null>(null);
  const [noEscapeCount, setNoEscapeCount] = useState(0);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  const getSafePosition = useCallback((): NoPosition => {
    const margin = 72;
    const btnW = 120;
    const btnH = 52;
    const maxX = window.innerWidth - btnW - margin;
    const maxY = window.innerHeight - btnH - margin;

    // Try a few candidates, pick one far from the current position
    const candidates: NoPosition[] = Array.from({ length: 8 }, () => ({
      x: margin + Math.random() * (maxX - margin),
      y: margin + Math.random() * (maxY - margin),
    }));

    if (!noPosition) return candidates[0];

    // Pick the one farthest from current position
    return candidates.reduce((best, c) => {
      const distC = Math.hypot(c.x - noPosition.x, c.y - noPosition.y);
      const distB = Math.hypot(best.x - noPosition.x, best.y - noPosition.y);
      return distC > distB ? c : best;
    });
  }, [noPosition]);

  const escapeNo = useCallback(() => {
    setNoPosition(getSafePosition());
    setNoEscapeCount((n) => n + 1);
  }, [getSafePosition]);

  // Move NO on keyboard focus too
  const handleNoFocus = useCallback(() => {
    escapeNo();
  }, [escapeNo]);

  // Clean up on unmount
  useEffect(() => {
    if (!visible) {
      setNoPosition(null);
      setNoEscapeCount(0);
    }
  }, [visible]);

  const noLabels = ["No", "Nope", "Maybe later", "Still no", "Not yet", "Come on...", "Really?"];
  const currentNoLabel = noLabels[Math.min(noEscapeCount, noLabels.length - 1)];

  return (
    <div
      className={`fixed inset-0 flex flex-col items-center justify-center transition-opacity duration-700 ${
        visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      style={{ backgroundColor: "#F5F2EC", zIndex: 50 }}
      aria-label="Welcome screen"
    >
      {/* Decorative background element */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute -bottom-32 -right-32 rounded-full opacity-[0.06]"
          style={{
            width: "60vw",
            height: "60vw",
            backgroundColor: "#1B35CC",
          }}
        />
        <div
          className="absolute -top-16 -left-16 rounded-full opacity-[0.04]"
          style={{
            width: "30vw",
            height: "30vw",
            backgroundColor: "#F47820",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center px-6 text-center max-w-lg w-full">
        {/* Logo */}
        <div className="mb-10">
          <Logo
            image
            className="h-[190px] w-[260px] object-contain"
          />
        </div>

        {/* Event label */}
        <p
          className="mb-4 tracking-[0.2em] uppercase text-sm font-bold"
          style={{ color: "#F47820", fontFamily: "'Montserrat', sans-serif" }}
        >
          {eventConfig.eventType} · {eventConfig.date}
        </p>

        {/* Main headline */}
        <h1
          className="mb-3 leading-none tracking-tight"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(2.8rem, 10vw, 5.5rem)",
            color: "#1B35CC",
            letterSpacing: "-0.02em",
          }}
        >
          You're
          <br />
          Invited.
        </h1>

        {/* Sub copy */}
        <p
          className="mb-12 text-base md:text-lg"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            color: "#1B35CC",
            opacity: 0.7,
            letterSpacing: "0.01em",
          }}
        >
          Come raise the first cup with us.
        </p>

        {/* CTA row */}
        <div className="relative flex items-center gap-4">
          {/* YES */}
          <button
            onClick={onYes}
            className="relative overflow-hidden rounded-none px-10 py-4 text-sm font-bold tracking-[0.15em] uppercase transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              backgroundColor: "#1B35CC",
              color: "#F5F2EC",
              minWidth: 120,
            }}
            aria-label="Yes, I'll be there"
          >
            <span className="relative z-10">Yes ✌️</span>
            {/* Hover fill effect */}
            <span
              className="absolute inset-0 transition-transform duration-300 origin-left scale-x-0 hover:scale-x-100"
              style={{ backgroundColor: "#F47820" }}
              aria-hidden="true"
            />
          </button>

          {/* NO — inline placeholder (keeps layout stable when NO is fixed) */}
          {!noPosition && (
            <button
              ref={noButtonRef}
              onMouseEnter={escapeNo}
              onTouchStart={escapeNo}
              onFocus={handleNoFocus}
              className="rounded-none px-8 py-4 text-sm font-bold tracking-[0.15em] uppercase border transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                borderColor: "#1B35CC",
                color: "#1B35CC",
                background: "transparent",
                minWidth: 120,
              }}
              aria-label="No, I can't make it"
            >
              {currentNoLabel}
            </button>
          )}
        </div>

        {/* Hint after first escape */}
        {noEscapeCount > 0 && (
          <p
            className="mt-6 text-xs opacity-50 transition-opacity duration-500"
            style={{ fontFamily: "'DM Sans', sans-serif", color: "#1B35CC" }}
          >
            {noEscapeCount > 3 ? "You know you want to. 😏" : "Hmm, that button seems shy."}
          </p>
        )}
      </div>

      {/* Floating NO button */}
      {noPosition && (
        <button
          ref={noButtonRef}
          onMouseEnter={escapeNo}
          onTouchStart={escapeNo}
          onFocus={handleNoFocus}
          className="fixed rounded-none px-8 py-4 text-sm font-bold tracking-[0.15em] uppercase border transition-all duration-300 ease-out hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            borderColor: "#1B35CC",
            color: "#1B35CC",
            background: "#F5F2EC",
            left: noPosition.x,
            top: noPosition.y,
            zIndex: 100,
            minWidth: 120,
            transform: "translate(0, 0)",
          }}
          aria-label="No, I can't make it"
        >
          {currentNoLabel}
        </button>
      )}
    </div>
  );
}
