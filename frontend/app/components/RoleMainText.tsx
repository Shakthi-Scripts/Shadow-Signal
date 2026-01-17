import React from "react";

function RoleMainText() {
  return (
    <div className="flex flex-1 -translate-y-12 flex-col items-center justify-center">
      <span className="mb-3 inline-flex items-center gap-1.5 rounded-md px-3 py-1 text-[9px] font-semibold tracking-widest text-emerald-400 sm:text-xs">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
        </span>
        IDENTITY ASSIGNED
      </span>

      <h1 className="text-center text-4xl font-bold tracking-wide text-white italic sm:text-5xl xl:text-6xl">
        DECRYPTION COMPLETE
      </h1>
    </div>
  );
}

export default RoleMainText;
