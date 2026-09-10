"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { DURATIONS, Phase } from "../lib/types";
import { copy } from "../lib/copy";

function format(seconds: number) {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

export default function Timer({ onFocusComplete }: { onFocusComplete: () => void }) {
  const [phase, setPhase] = useState<Phase>("focus");
  const [remaining, setRemaining] = useState(DURATIONS.focus);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = DURATIONS[phase];
  const progress = 1 - remaining / total;

  const stopTicking = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const switchPhase = useCallback((next: Phase) => {
    setPhase(next);
    setRemaining(DURATIONS[next]);
    setRunning(false);
  }, []);

  useEffect(() => {
    if (!running) {
      stopTicking();
      return;
    }
    intervalRef.current = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          if (phase === "focus") onFocusComplete();
          const next: Phase = phase === "focus" ? "break" : "focus";
          setPhase(next);
          setRunning(false);
          return DURATIONS[next];
        }
        return r - 1;
      });
    }, 1000);
    return stopTicking;
  }, [running, phase, onFocusComplete, stopTicking]);

  return (
    <section className="rounded-3xl bg-white/80 shadow-lg ring-1 ring-honey-200 p-8 flex flex-col items-center gap-6 backdrop-blur">
      <div className="flex gap-2">
        {(["focus", "break"] as Phase[]).map((p) => (
          <button
            key={p}
            onClick={() => switchPhase(p)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition ${
              phase === p
                ? "bg-honey-500 text-white shadow"
                : "bg-honey-100 text-honey-700 hover:bg-honey-200"
            }`}
          >
            {p === "focus" ? copy.timer.focusTab : copy.timer.breakTab}
          </button>
        ))}
      </div>

      <div className="relative w-56 h-56">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#fef3c7" strokeWidth="8" />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 45}
            strokeDashoffset={2 * Math.PI * 45 * (1 - progress)}
            className="transition-[stroke-dashoffset] duration-1000 ease-linear"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-bold tabular-nums text-comb">
            {format(remaining)}
          </span>
          <span className="mt-1 text-sm text-honey-700">
            {phase === "focus" ? copy.timer.focusLabel : copy.timer.breakLabel}
          </span>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setRunning((r) => !r)}
          className="px-8 py-2.5 rounded-full bg-honey-500 text-white font-semibold shadow hover:bg-honey-600 transition"
        >
          {running ? copy.timer.pause : copy.timer.start}
        </button>
        <button
          onClick={() => {
            setRunning(false);
            setRemaining(DURATIONS[phase]);
          }}
          className="px-6 py-2.5 rounded-full bg-honey-100 text-honey-700 font-semibold hover:bg-honey-200 transition"
        >
          {copy.timer.reset}
        </button>
      </div>
    </section>
  );
}
