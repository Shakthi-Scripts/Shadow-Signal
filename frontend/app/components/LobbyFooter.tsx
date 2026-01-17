import React from "react";

export default function LobbyFooter() {
  return (
    <footer className="mt-6 border-t border-white/10 bg-black/20 px-6 py-3 text-xs text-white/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span>BUILD v0.0.1-FINAL</span>
          <span className="text-white/40">REGION: ASIA-EAST-1</span>
        </div>

        <div className="text-white/40">
          © 2026 SHADOW SIGNAL SECURITY COMMAND
        </div>
      </div>
    </footer>
  );
}
