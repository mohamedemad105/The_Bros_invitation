import { useState, useEffect, useRef } from "react";
import { WelcomeScreen } from "./components/invitation/WelcomeScreen";
import { InvitationHero } from "./components/invitation/InvitationHero";
import { Countdown } from "./components/invitation/Countdown";
import { EventDetails } from "./components/invitation/EventDetails";
import { SocialLinks } from "./components/invitation/SocialLinks";
import { InvitationFooter } from "./components/invitation/InvitationFooter";
import { MusicControl, type MusicControlHandle } from "./components/invitation/MusicControl";

type Phase = "welcome" | "transitioning" | "invitation";

export default function App() {
  const [phase, setPhase] = useState<Phase>("welcome");
  const [invitationVisible, setInvitationVisible] = useState(false);
  const musicControlRef = useRef<MusicControlHandle>(null);

  const handleYes = () => {
    setPhase("transitioning");
    musicControlRef.current?.play();

    // Let welcome fade out, then reveal invitation
    setTimeout(() => {
      setPhase("invitation");
      requestAnimationFrame(() => {
        setTimeout(() => setInvitationVisible(true), 50);
      });
      window.scrollTo({ top: 0 });
    }, 600);
  };

  // Prevent body scroll on welcome screen
  useEffect(() => {
    if (phase === "invitation") {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [phase]);

  return (
    <>
      {/* Welcome screen — fades out on YES */}
      <WelcomeScreen
        onYes={handleYes}
        visible={phase === "welcome" || phase === "transitioning"}
      />

      {/* Main invitation — fades in after YES */}
      {phase === "invitation" && (
        <main
          className="transition-opacity duration-700"
          style={{ opacity: invitationVisible ? 1 : 0 }}
          aria-label="The Bros Soft Opening Invitation"
        >
          <InvitationHero />

          {/* Divider accent */}
          <div
            className="h-1 w-full"
            style={{ backgroundColor: "#F47820" }}
            aria-hidden="true"
          />

          <Countdown />

          <div
            className="h-px mx-6 md:mx-12"
            style={{ backgroundColor: "rgba(27, 53, 204, 0.12)" }}
            aria-hidden="true"
          />

          <EventDetails />

          <div
            className="h-px mx-6 md:mx-12"
            style={{ backgroundColor: "rgba(27, 53, 204, 0.12)" }}
            aria-hidden="true"
          />

          <SocialLinks />

          <InvitationFooter />
        </main>
      )}

      {/* Floating music control — appears after YES */}
      <MusicControl ref={musicControlRef} />
    </>
  );
}
