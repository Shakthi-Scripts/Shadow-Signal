import React from "react";
type InGameSecretCodeProps = {
  word: string;
  wordColor?: string;
};

export default function InGameSecretCard({
  word,
  wordColor = "#ffffff",
}: InGameSecretCodeProps) {
  return (
    <div className="w-full max-w-xs rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-4">
      <p className="text-xs tracking-widest text-emerald-400">
        CLASSIFIED INFO
      </p>

      <p className="mt-3 text-[11px] tracking-widest text-white/50">
        YOUR SECRET WORD
      </p>

      <div className="mt-2 flex items-center justify-between">
        <span
          className="text-lg font-bold tracking-widest"
          style={{
            color: wordColor,
            textShadow:
              "0 0 12px rgba(220,38,38,0.35), 0 0 24px rgba(220,38,38,0.15)",
          }}
        >
          {word}
        </span>
      </div>
    </div>
  );
}
