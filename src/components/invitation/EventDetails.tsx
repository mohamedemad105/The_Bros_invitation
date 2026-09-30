import { eventConfig } from "../../config/event";

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6 py-5 border-b" style={{ borderColor: "rgba(27, 53, 204, 0.12)" }}>
      <span
        className="tracking-[0.2em] uppercase shrink-0"
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 600,
          fontSize: "0.6rem",
          color: "#F47820",
          minWidth: 80,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 500,
          fontSize: "1.05rem",
          color: "#1B35CC",
        }}
      >
        {value}
      </span>
    </div>
  );
}

export function EventDetails() {
  return (
    <section
      className="py-20 px-6"
      aria-label="Event details"
      style={{ backgroundColor: "#EDE9E0" }}
    >
      <div className="max-w-xl mx-auto">
        {/* Section label */}
        <p
          className="mb-10 tracking-[0.3em] uppercase"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 600,
            fontSize: "0.65rem",
            color: "#F47820",
          }}
        >
          Event Details
        </p>

        <div>
          <DetailRow label="Event" value={eventConfig.eventType} />
          <DetailRow label="Date" value={eventConfig.date} />
          <DetailRow label="Time" value={eventConfig.time} />
          <DetailRow label="Venue" value={eventConfig.location.name} />
          <DetailRow label="City" value={eventConfig.location.city} />
        </div>

        {/* Location CTA */}
        <div className="mt-10">
          <a
            href={eventConfig.location.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 text-sm font-bold tracking-[0.15em] uppercase transition-all duration-200 hover:gap-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              backgroundColor: "#1B35CC",
              color: "#F5F2EC",
            }}
            aria-label="Open location in Google Maps"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Open Location
          </a>
        </div>
      </div>
    </section>
  );
}
