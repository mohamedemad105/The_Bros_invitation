import { eventConfig } from "../../config/event";

function InstagramIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function SocialLinks() {
  return (
    <section
      className="py-20 px-6"
      aria-label="Social media links"
      style={{ backgroundColor: "#F5F2EC" }}
    >
      <div className="max-w-xl mx-auto flex flex-col items-center text-center">
        <p
          className="mb-3 tracking-[0.3em] uppercase"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 600,
            fontSize: "0.65rem",
            color: "#F47820",
          }}
        >
          Follow the Journey
        </p>

        <p
          className="mb-10 text-base"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            color: "#1B35CC",
            opacity: 0.6,
          }}
        >
          Stay in the loop before the big day.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          {/* Instagram */}
          <a
            href={eventConfig.social.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 px-8 py-5 border transition-all duration-200 hover:bg-[#1B35CC] hover:border-[#1B35CC] hover:text-[#F5F2EC] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 w-full sm:w-auto"
            style={{ borderColor: "#1B35CC", color: "#1B35CC" }}
            aria-label="Follow The Bros on Instagram"
          >
            <InstagramIcon />
            <div className="text-left">
              <p
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Instagram
              </p>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.82rem",
                  opacity: 0.7,
                }}
              >
                {eventConfig.social.instagram.handle}
              </p>
            </div>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-auto opacity-40 group-hover:opacity-100 transition-opacity"
              aria-hidden="true"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </a>

          {/* Facebook */}
          <a
            href={eventConfig.social.facebook.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 px-8 py-5 border transition-all duration-200 hover:bg-[#1B35CC] hover:border-[#1B35CC] hover:text-[#F5F2EC] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 w-full sm:w-auto"
            style={{ borderColor: "#1B35CC", color: "#1B35CC" }}
            aria-label="Follow The Bros on Facebook"
          >
            <FacebookIcon />
            <div className="text-left">
              <p
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Facebook
              </p>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.82rem",
                  opacity: 0.7,
                }}
              >
                {eventConfig.social.facebook.handle}
              </p>
            </div>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-auto opacity-40 group-hover:opacity-100 transition-opacity"
              aria-hidden="true"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
