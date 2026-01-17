import React from "react";

export default function LobbyFooter() {
  return (
    <footer className="mt-6 border-t border-white/10 bg-black/20 px-4 py-3 text-xs text-white/60 sm:px-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span>BUILD v0.0.1-FINAL</span>
          <span className="text-white/40">REGION: ASIA-EAST-1</span>
        </div>

        <div className="text-left text-white/40 sm:text-right">
          © 2026 SHADOW SIGNAL SECURITY COMMAND
        </div>
      </div>
    </footer>
  );
}
