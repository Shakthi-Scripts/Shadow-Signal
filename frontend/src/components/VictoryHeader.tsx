import React from "react";

function VictoryHeader() {
  return (
    <div className="mt-6 flex flex-col items-center gap-4 pt-10">
      <span className="relative inline-flex items-center gap-1.5 rounded-md border border-emerald-500/40 bg-emerald-950/60 px-3 py-1 text-[10px] font-semibold tracking-widest text-emerald-400 sm:text-xs">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
        </span>
        PROTOCOL SUCCEEDED
      </span>

      <h1 className="text-center text-6xl font-bold italic text-emerald-400 sm:text-7xl xl:text-8xl [text-shadow:0_0_8px_rgba(0,209,174,0.8)]">
        SIGNAL SECURED
      </h1>
      <h3 className="text-white text-2xl">
        THE INFILTRATOR HAS BEEN NEUTRALIZED
      </h3>
    </div>
  );
}

export default VictoryHeader;
