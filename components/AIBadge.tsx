"use client";

import { useState } from "react";
import type { Tone } from "@/lib/ipo";

interface AIBadgeProps {
  text: string;
  tone: Tone;
  detail: string;
}

function toneClasses(tone: Tone): string {
  if (tone === "sage") return "bg-sage-bg text-sage";
  if (tone === "clay") return "bg-clay-bg text-clay";
  return "bg-linen text-slate";
}

export default function AIBadge({ text, tone, detail }: AIBadgeProps) {
  const [pinned, setPinned] = useState(false);

  return (
    <span className="group relative inline-block">
      <button
        type="button"
        onClick={() => setPinned(!pinned)}
        aria-expanded={pinned}
        aria-label={pinned ? "AI 평가 상세 닫기" : "AI 평가 상세 보기"}
        className={`inline-flex cursor-help items-center gap-1.5 px-2 py-1 font-sans text-xs font-medium transition-opacity hover:opacity-80 ${toneClasses(tone)}`}
      >
        <span className="border-b border-dashed border-current">{text}</span>
        <span aria-hidden="true" className="text-[10px] opacity-60">ⓘ</span>
      </button>
      <span
        className={
          "absolute bottom-full right-0 z-20 mb-2 w-72 border border-ink bg-ivory p-3 font-sans text-xs leading-relaxed text-slate shadow-lg transition " +
          (pinned ? "visible opacity-100" : "invisible opacity-0 group-hover:visible group-hover:opacity-100")
        }
      >
        {detail}
      </span>
    </span>
  );
}