import React from "react";

export default function FooterMeta() {
  return (
    <div className="mt-12 flex flex-wrap items-center justify-between gap-4 text-xs tracking-widest text-white/40">
      <div className="flex gap-6">
        <span className="cursor-pointer hover:text-white/70">
          TERMS OF ENGAGEMENT
        </span>
        <span className="cursor-pointer hover:text-white/70">
          PRIVACY CLOAK
        </span>
      </div>

      <span>© 2026 SHADOW_SIGNAL_LABS // v0.0.1</span>
    </div>
  );
}
