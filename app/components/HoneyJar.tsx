"use client";

import { copy } from "../lib/copy";

export default function HoneyJar({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-3 rounded-full bg-honey-100 px-5 py-2 ring-1 ring-honey-200">
      <span className="text-2xl" aria-hidden>
        🍯
      </span>
      <div className="leading-tight">
        <div className="text-xs text-honey-700">{copy.honey.label}</div>
        <div className="text-lg font-bold text-comb tabular-nums">
          {count} <span className="text-sm font-normal">{copy.honey.unit}</span>
        </div>
      </div>
      <div className="ml-1 flex" aria-hidden>
        {Array.from({ length: Math.min(count, 8) }).map((_, i) => (
          <span key={i} className="-ml-1 text-lg animate-pop">
            🐝
          </span>
        ))}
      </div>
    </div>
  );
}
