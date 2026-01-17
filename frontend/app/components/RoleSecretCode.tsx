import React from "react";

function RoleSecretCode() {
  return (
    <div className="relative w-full max-w-xl">
      <div className="relative flex min-h-90 flex-col items-center justify-center rounded-xl border border-emerald-400/30 bg-emerald-950/60 px-10">
        
        <p className="mb-4 text-center text-[10px] tracking-[0.35em] text-emerald-400/80">SECRET WORD</p>

        <h2 className="text-center text-6xl font-bold italic tracking-widest text-white xl:text-7xl">BEACH</h2>

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
