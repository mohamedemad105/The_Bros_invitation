import { useState, useEffect } from "react";
import { EVENT_DATE } from "../../config/event";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
}

function getTimeLeft(): TimeLeft {
  const diff = EVENT_DATE.getTime() - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
    expired: false,
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function CountUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="relative flex items-center justify-center"
        style={{
          width: "clamp(64px, 18vw, 100px)",
          height: "clamp(64px, 18vw, 100px)",
          backgroundColor: "#1B35CC",
        }}
      >
        <span
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(1.6rem, 6vw, 3rem)",
            color: "#F5F2EC",
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          {pad(value)}
        </span>
        {/* Orange corner accent */}
        <span
          className="absolute top-0 right-0 w-2 h-2"
          style={{ backgroundColor: "#F47820" }}
          aria-hidden="true"
        />
      </div>
      <span
        className="mt-2 tracking-[0.2em] uppercase"
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 600,
          fontSize: "0.6rem",
          color: "#1B35CC",
          opacity: 0.6,
        }}
      >
        {label}
      </span>
    </div>
  );
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (timeLeft.expired) {
    return (
      <section className="py-20 px-6 text-center" aria-label="Event countdown">
        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(2rem, 8vw, 4rem)",
            color: "#1B35CC",
            letterSpacing: "-0.02em",
          }}
        >
          Today is the day. ✌️
        </p>
        <p
          className="mt-3"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            color: "#1B35CC",
            opacity: 0.6,
          }}
        >
          See you there.
        </p>
      </section>
    );
  }

  return (
    <section
      className="py-20 px-6"
      aria-label="Event countdown"
      style={{ backgroundColor: "#F5F2EC" }}
    >
      <div className="max-w-2xl mx-auto flex flex-col items-center">
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
          Counting Down
        </p>

        {/* Units row */}
        <div className="flex items-end gap-3 md:gap-6">
          <CountUnit value={timeLeft.days} label="Days" />
          {/* Separator */}
          <span
            className="mb-8 font-black"
            style={{ color: "#F47820", fontSize: "1.8rem", lineHeight: 1 }}
            aria-hidden="true"
          >
            :
          </span>
          <CountUnit value={timeLeft.hours} label="Hours" />
          <span
            className="mb-8 font-black"
            style={{ color: "#F47820", fontSize: "1.8rem", lineHeight: 1 }}
            aria-hidden="true"
          >
            :
          </span>
          <CountUnit value={timeLeft.minutes} label="Minutes" />
          <span
            className="mb-8 font-black"
            style={{ color: "#F47820", fontSize: "1.8rem", lineHeight: 1 }}
            aria-hidden="true"
          >
            :
          </span>
          <CountUnit value={timeLeft.seconds} label="Seconds" />
        </div>
      </div>
    </section>
  );
}
