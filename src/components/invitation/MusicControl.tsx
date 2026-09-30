import {
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
  useEffect,
} from "react";
import { eventConfig } from "../../config/event";

export interface MusicControlHandle {
  play: () => void;
}

export const MusicControl = forwardRef<MusicControlHandle>(
  function MusicControl(_props, ref) {
    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(false);
    const [visible, setVisible] = useState(false);

    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
      const audio = new Audio(eventConfig.audioSrc);

      audio.loop = true;
      audio.volume = 0.45;
      audio.preload = "auto";

      audioRef.current = audio;

      const handleEnded = () => setPlaying(false);
      const handlePause = () => setPlaying(false);
      const handlePlay = () => setPlaying(true);

      audio.addEventListener("ended", handleEnded);
      audio.addEventListener("pause", handlePause);
      audio.addEventListener("play", handlePlay);

      audio.load();

      return () => {
        audio.pause();
        audio.removeEventListener("ended", handleEnded);
        audio.removeEventListener("pause", handlePause);
        audio.removeEventListener("play", handlePlay);
        audioRef.current = null;
      };
    }, []);

    useImperativeHandle(ref, () => ({
      play() {
        const audio = audioRef.current;

        if (!audio) {
          console.error("Music audio is not initialized.");
          return;
        }

        setVisible(true);

        audio
          .play()
          .then(() => {
            setPlaying(true);
          })
          .catch((error) => {
            console.error("Music playback failed:", error);
            setPlaying(false);
          });
      },
    }));

    const toggle = () => {
      const audio = audioRef.current;

      if (!audio) return;

      if (playing) {
        audio.pause();
      } else {
        audio
          .play()
          .then(() => setPlaying(true))
          .catch((error) => {
            console.error("Music playback failed:", error);
          });
      }
    };

    const toggleMute = () => {
      const audio = audioRef.current;

      if (!audio) return;

      const newMuted = !muted;

      audio.muted = newMuted;
      setMuted(newMuted);
    };

    if (!visible) return null;

    return (
      <div
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2"
        role="region"
        aria-label="Music controls"
      >
        <button
          onClick={toggleMute}
          className="w-9 h-9 flex items-center justify-center border transition-all duration-200 hover:bg-[#1B35CC] hover:text-[#F5F2EC] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{
            borderColor: "#1B35CC",
            color: "#1B35CC",
            backgroundColor: "#F5F2EC",
          }}
          aria-label={muted ? "Unmute music" : "Mute music"}
          title={muted ? "Unmute" : "Mute"}
        >
          {muted ? (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          )}
        </button>

        <button
          onClick={toggle}
          className="w-9 h-9 flex items-center justify-center border transition-all duration-200 hover:bg-[#1B35CC] hover:text-[#F5F2EC] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{
            borderColor: "#1B35CC",
            color: "#1B35CC",
            backgroundColor: "#F5F2EC",
          }}
          aria-label={playing ? "Pause music" : "Play music"}
          title={playing ? "Pause" : "Play"}
        >
          {playing ? (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          )}
        </button>
      </div>
    );
  },
);