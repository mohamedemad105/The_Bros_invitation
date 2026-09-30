import { Logo } from "../brand/Logo";
import { eventConfig } from "../../config/event";

export function InvitationHero() {
  return (
    <section
      className="relative min-h-screen flex flex-col"
      aria-label="Invitation hero"
      style={{ backgroundColor: "#F5F2EC" }}
    >
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-6 md:px-12 pt-8 pb-4"
        style={{ borderBottom: "1px solid rgba(27, 53, 204, 0.10)" }}
      >
        <Logo
          image
          className="h-[102px] w-[140px] object-contain"
        />
        <span
          className="tracking-[0.25em] uppercase text-xs font-semibold"
          style={{ fontFamily: "'Montserrat', sans-serif", color: "#F47820" }}
        >
          Soft Opening
        </span>
      </div>

      {/* Main grid */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* Left — text column */}
        <div className="flex flex-col justify-center px-6 md:px-12 py-12 md:py-0 order-2 md:order-1">
          {/* Label */}
          <p
            className="mb-6 tracking-[0.2em] uppercase"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700,
              fontSize: "0.875rem",
              color: "#F47820",
            }}
          >
            You're Invited
          </p>

          {/* Big headline */}
          <h2
            className="leading-none tracking-tight mb-2"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(3rem, 10vw, 6.5rem)",
              color: "#1B35CC",
              letterSpacing: "-0.03em",
            }}
          >
            THE
          </h2>
          <h2
            className="leading-none tracking-tight mb-6"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(3rem, 10vw, 6.5rem)",
              color: "#1B35CC",
              letterSpacing: "-0.03em",
            }}
          >
            BROS
            <span style={{ color: "#F47820" }}> ✌️</span>
          </h2>

          {/* Thin rule */}
          <div
            className="w-16 h-px mb-6"
            style={{ backgroundColor: "#F47820" }}
            aria-hidden="true"
          />

          {/* Date */}
          <p
            className="mb-1"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
              fontSize: "1rem",
              color: "#1B35CC",
              opacity: 0.8,
            }}
          >
            {eventConfig.date}
          </p>
          <p
            className="mb-8"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.9rem",
              color: "#1B35CC",
              opacity: 0.5,
            }}
          >
            {eventConfig.time} · {eventConfig.location.city}
          </p>

          {/* Tagline pills */}
          <div className="flex flex-wrap gap-2">
            {["Coffee", "Food", "Desserts", "Moments"].map((item) => (
              <span
                key={item}
                className="px-3 py-1 text-xs tracking-[0.12em] uppercase"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 600,
                  border: "1px solid rgba(27, 53, 204, 0.25)",
                  color: "#1B35CC",
                  fontSize: "0.6rem",
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Right — image column */}
        <div
          className="relative overflow-hidden order-1 md:order-2"
          style={{ minHeight: "45vh", backgroundColor: "#D4CECC" }}
        >
          <img
            src={eventConfig.heroImage}
            alt="Premium iced coffee — The Bros Soft Opening"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
          {/* Blue overlay strip at bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1"
            style={{ backgroundColor: "#1B35CC" }}
            aria-hidden="true"
          />
          {/* Orange dot */}
          <div
            className="absolute top-6 right-6 w-3 h-3 rounded-full"
            style={{ backgroundColor: "#F47820" }}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Scroll hint */}
      <div className="flex justify-center py-6" aria-hidden="true">
        <div className="flex flex-col items-center gap-2 opacity-40">
          <span
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.55rem",
              letterSpacing: "0.2em",
              color: "#1B35CC",
              textTransform: "uppercase",
            }}
          >
            Scroll
          </span>
          <svg
            width="12"
            height="16"
            viewBox="0 0 12 20"
            fill="none"
            stroke="#1B35CC"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <path d="M6 2 L6 14 M2 10 L6 14 L10 10" />
          </svg>
        </div>
      </div>
    </section>
  );
}
