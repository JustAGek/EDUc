"use client";

import { useState, useRef, useCallback, useEffect, SyntheticEvent } from "react";
import ReactPlayer from "react-player";
import { ControlBar } from "./control-bar";

interface VideoPlayerProps {
  url: string;
  onProgress?: (playedSeconds: number) => void;
}

export function VideoPlayer({ url, onProgress }: VideoPlayerProps) {
  const playerRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout>>(null);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [played, setPlayed] = useState(0);
  const [loaded, setLoaded] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const resetHideTimer = useCallback(() => {
    setShowControls(true);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    if (playing) {
      hideTimerRef.current = setTimeout(() => setShowControls(false), 3000);
    }
  }, [playing]);

  useEffect(() => {
    resetHideTimer();
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [playing, resetHideTimer]);

  const handleTimeUpdate = (e: SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (video.duration > 0) {
      const fraction = video.currentTime / video.duration;
      setPlayed(fraction);
      onProgress?.(video.currentTime);
    }
  };

  const handleProgress = (e: SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (video.buffered.length > 0) {
      setLoaded(video.buffered.end(video.buffered.length - 1) / video.duration);
    }
  };

  const handleDurationChange = (e: SyntheticEvent<HTMLVideoElement>) => {
    setDuration(e.currentTarget.duration);
  };

  const handleSeek = (fraction: number) => {
    setPlayed(fraction);
    if (playerRef.current) {
      playerRef.current.currentTime = fraction * duration;
    }
  };

  const handleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative bg-black rounded-xl overflow-hidden aspect-video group"
      onMouseMove={resetHideTimer}
      onMouseLeave={() => playing && setShowControls(false)}
    >
      <ReactPlayer
        ref={playerRef}
        src={url}
        width="100%"
        height="100%"
        playing={playing}
        muted={muted}
        volume={volume}
        playbackRate={playbackRate}
        onTimeUpdate={handleTimeUpdate}
        onProgress={handleProgress}
        onDurationChange={handleDurationChange}
        style={{ position: "absolute", top: 0, left: 0 }}
      />

      {/* Click to play/pause overlay */}
      <div
        className="absolute inset-0 z-10 cursor-pointer"
        onClick={() => setPlaying(!playing)}
      />

      {/* Control bar */}
      <div
        className={`absolute bottom-0 inset-x-0 z-20 transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <ControlBar
          playing={playing}
          muted={muted}
          volume={volume}
          played={played}
          loaded={loaded}
          duration={duration}
          playbackRate={playbackRate}
          isFullscreen={isFullscreen}
          onPlayPause={() => setPlaying(!playing)}
          onMute={() => setMuted(!muted)}
          onVolumeChange={setVolume}
          onSeek={handleSeek}
          onPlaybackRateChange={setPlaybackRate}
          onFullscreen={handleFullscreen}
        />
      </div>
    </div>
  );
}
