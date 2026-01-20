import React from "react";

type RoleSecretCodeProps = {
  word: string;
  secretWord: string;
  wordColor?: string;
};

function RoleSecretCode({
  word,
  secretWord,
  wordColor = "#ffffff",
}: RoleSecretCodeProps) {
  return (
    <div className="relative w-full max-w-xl">
      <div className="relative flex min-h-90 flex-col items-center justify-center rounded-xl border border-emerald-400/30 bg-emerald-950/60 px-10">
        <p className="mb-4 text-center text-[10px] tracking-[0.35em] text-emerald-400/80">
          {secretWord}
        </p>

        <h2
          className="text-center text-6xl font-bold tracking-widest italic xl:text-7xl"
          style={{
            color: wordColor,
            textShadow:
              "0 0 12px rgba(220,38,38,0.35), 0 0 24px rgba(220,38,38,0.15)",
          }}
        >
          {word}
        </h2>

        <div className="mt-6 flex gap-3">
          <span className="h-1 w-12 rounded bg-emerald-400/70" />
          <span className="h-1 w-12 rounded bg-emerald-400/50" />
          <span className="h-1 w-12 rounded bg-emerald-400/30" />
        </div>
      </div>
    </div>
  );
}

export default RoleSecretCode;
