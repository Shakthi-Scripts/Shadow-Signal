"use client";

import React from "react";
import { useGame } from "@/contexts/GameContext";
import type { message } from "@/types/game";

interface VotingChatProps {
  messages: message[];
  onSendMessage: () => void;
  message: string;
  setMessage: (msg: string) => void;
}

export default function VotingChat({
  messages,
  onSendMessage,
  message,
  setMessage,
}: VotingChatProps) {
  const { gameState } = useGame();

  const getPlayerName = (playerId: string) => {
    if (gameState?.players[playerId]) {
      return gameState.players[playerId].name;
    }
    return playerId.substring(0, 12);
  };
  const handleSend = () => {
    if (!message.trim()) return;
    onSendMessage();
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const chatMessages = messages.filter((m) => m.type === "chat");
  return (
    <aside className="flex w-full flex-col border-t border-white/10 px-4 py-6 lg:min-h-[calc(100vh-64px)] lg:w-80 lg:border-t-0 lg:border-r lg:px-6">
      <div>
        <p className="mb-4 text-xs tracking-widest text-emerald-400">
          ACCUSATION CHAT
        </p>

        <div className="space-y-4 text-sm leading-relaxed text-white/80 max-h-96 overflow-y-auto">
          {chatMessages.length === 0 ? (
            <p className="text-white/40">No messages yet.</p>
          ) : (
            chatMessages.map((msg) => (
              <p key={msg.id}>
                <span className="font-semibold text-emerald-400">
                  {getPlayerName(msg.from)}:
                </span>{" "}
                {msg.content}
              </p>
            ))
          )}
        </div>
      </div>

      <div className="mt-8 pt-6 lg:mt-auto lg:pt-10">
        <div className="flex items-center gap-2 rounded-md border border-emerald-500/40 bg-emerald-950/60 px-3 py-2">
          <input
            value={message}
            onChange={(e) => setMessage(e.currentTarget.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
            placeholder="SEND MESSAGE..."
            className="flex-1 bg-transparent text-sm text-white placeholder-white/40 outline-none"
          />
          <button onClick={handleSend} disabled={!message.trim()}>
            <span className="material-symbols-outlined text-sm text-white">
              send
            </span>
          </button>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-white/40">
          Select one player to <span className="italic">&quot;Flag as Anomaly&quot;</span>
          . If the majority agrees, their signal will be severed permanently.
        </p>
      </div>
    </aside>
  );
}
