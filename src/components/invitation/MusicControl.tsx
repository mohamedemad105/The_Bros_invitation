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

export const MusicControl = forwardRef<MusicControlHandle>(function MusicControl(
  _props,
  ref,
) {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio();

    audio.src = eventConfig.audioSrc;
    audio.loop = true;
    audio.volume = 0.45;
    audio.preload = "auto";

    audio.addEventListener("canplay", () => {
      console.log("🎵 Audio can play:", audio.src);
    });

    audio.addEventListener("loadedmetadata", () => {
      console.log("🎵 Audio duration:", audio.duration);
    });

    audio.addEventListener("error", () => {
      console.error("🎵 Audio error:", audio.error);
      setError(
        audio.error
          ? `Audio error ${audio.error.code}: ${audio.error.message || "Unknown error"}`
          : "Unknown audio error",
      );
    });

    audioRef.current = audio;

    audio.load();

    return () => {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
      audioRef.current = null;
    };
  }, []);

  useImperativeHandle(ref, () => ({
    play() {
      const audio = audioRef.current;

      if (!audio) {
        console.error("🎵 Audio element does not exist");
        return;
      }

      console.log("🎵 Trying to play:", audio.src);

      setVisible(true);

      audio
        .play()
        .then(() => {
          console.log("🎵 PLAYING SUCCESSFULLY");
          setPlaying(true);
          setError(null);
        })
        .catch((err) => {
          console.error("🎵 PLAY FAILED:", err);
          setPlaying(false);
          setError(err?.message || "Playback failed");
        });
    },
  }));

  const toggle = () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio
        .play()
        .then(() => {
          setPlaying(true);
          setError(null);
        })
        .catch((err) => {
          console.error("🎵 PLAY FAILED:", err);
          setError(err?.message || "Playback failed");
        });
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;

    if (!audio) return;

    const nextMuted = !muted;

    audio.muted = nextMuted;
    setMuted(nextMuted);
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
        {muted ? "🔇" : "🔊"}
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
        {playing ? "❚❚" : "▶"}
      </button>

      {error && (
        <span className="text-xs text-red-600 bg-white px-2 py-1 border border-red-300">
          {error}
        </span>
      )}
    </div>
  );
});