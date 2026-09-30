import { Logo } from "../brand/Logo";
import { eventConfig } from "../../config/event";

export function InvitationFooter() {
  return (
    <footer
      className="py-16 px-6 flex flex-col items-center text-center"
      style={{ backgroundColor: "#1B35CC" }}
      aria-label="Footer"
    >
      <Logo size="lg" variant="white" showTagline={true} />

      <div
        className="mt-8 w-12 border-t"
        style={{ borderColor: "rgba(245, 242, 236, 0.25)" }}
        aria-hidden="true"
      />

      <p
        className="mt-6 text-sm"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          color: "rgba(245, 242, 236, 0.55)",
          letterSpacing: "0.04em",
        }}
      >
        {eventConfig.eventType} · {eventConfig.date}
      </p>

      <p
        className="mt-1 text-sm"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          color: "rgba(245, 242, 236, 0.35)",
        }}
      >
        {eventConfig.location.city}
      </p>

      <p
        className="mt-10 tracking-[0.2em] uppercase"
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 700,
          fontSize: "0.65rem",
          color: "#F47820",
        }}
      >
        Good Coffee. Better Moments. ✌️
      </p>
    </footer>
  );
}
