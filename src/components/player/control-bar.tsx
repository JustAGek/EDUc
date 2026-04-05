"use client";

import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface ControlBarProps {
  playing: boolean;
  muted: boolean;
  volume: number;
  played: number;
  loaded: number;
  duration: number;
  playbackRate: number;
  isFullscreen: boolean;
  onPlayPause: () => void;
  onMute: () => void;
  onVolumeChange: (value: number) => void;
  onSeek: (value: number) => void;
  onPlaybackRateChange: (rate: number) => void;
  onFullscreen: () => void;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

export function ControlBar({
  playing,
  muted,
  volume,
  played,
  loaded,
  duration,
  playbackRate,
  isFullscreen,
  onPlayPause,
  onMute,
  onVolumeChange,
  onSeek,
  onPlaybackRateChange,
  onFullscreen,
}: ControlBarProps) {
  return (
    <div className="absolute bottom-0 inset-x-0 bg-slate-900/80 backdrop-blur-sm rounded-b-xl px-4 py-3 flex flex-col gap-2">
      {/* Timeline scrubber */}
      <div className="relative w-full h-1 group">
        {/* Buffer indicator */}
        <div
          className="absolute inset-y-0 start-0 bg-slate-500/40 rounded-full"
          style={{ width: `${loaded * 100}%` }}
        />
        <Slider
          value={[played * 100]}
          max={100}
          step={0.1}
          onValueChange={(v) => onSeek((Array.isArray(v) ? v[0] : v) / 100)}
          className="absolute inset-0"
        />
      </div>

      {/* Controls row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onPlayPause} className="text-white hover:bg-white/10 h-8 w-8">
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>

          <div className="flex items-center gap-1 group/vol">
            <Button variant="ghost" size="icon" onClick={onMute} className="text-white hover:bg-white/10 h-8 w-8">
              {muted || volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <div className="w-0 overflow-hidden group-hover/vol:w-20 transition-all duration-200">
              <Slider
                value={[muted ? 0 : volume * 100]}
                max={100}
                step={1}
                onValueChange={(v) => onVolumeChange((Array.isArray(v) ? v[0] : v) / 100)}
              />
            </div>
          </div>

          <span className="text-white/80 text-xs ms-2">
            {formatTime(played * duration)} / {formatTime(duration)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger className="text-white hover:bg-white/10 text-xs h-8 px-2 rounded-md">
              {playbackRate}x
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {speeds.map((speed) => (
                <DropdownMenuItem key={speed} onClick={() => onPlaybackRateChange(speed)}>
                  {speed}x {speed === 1 && "(Normal)"}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" onClick={onFullscreen} className="text-white hover:bg-white/10 h-8 w-8">
            {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
}
