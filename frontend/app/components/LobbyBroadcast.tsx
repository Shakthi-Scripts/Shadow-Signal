"use client";

import React, { useState } from "react";

export default function BroadcastInput() {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    console.log("Broadcast:", message);
    setMessage("");
  };

  return (
    <div className="w-ms mx-auto mt-6 mr-2 ml-2 max-w-6xl rounded-md border border-white/10 bg-black/20 p-3">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="BROADCAST..."
          className="flex-1 bg-transparent text-sm text-white placeholder-white/40 outline-none"
        />

        <button
          onClick={handleSend}
          className="rounded-md border border-white/20 px-3 py-1 text-xs text-white hover:bg-white/10"
        >
          ▶
        </button>
      </div>
    </div>
  );
}
