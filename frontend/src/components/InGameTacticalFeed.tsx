"use client";
import React from "react";
import { useGame } from "@/contexts/GameContext";
import type { message } from "@/types/game";

interface InGameTacticalFeedProps {
  messages: message[];
  onSendMessage: () => void;
  message: string;
  setMessage: (msg: string) => void;
}

export default function InGameTacticalFeed({
  messages,
  onSendMessage,
  message,
  setMessage,
}: InGameTacticalFeedProps) {
  const { gameState, playerId } = useGame();

  // Check if chat is allowed
  const currentPlayer = gameState?.players[playerId || ""];
  const isAlive = currentPlayer?.alive ?? false;
  const isMyTurn =
    gameState?.phase === "playing" &&
    gameState?.turn?.currentPlayerId === playerId;
  const canChat = isAlive && isMyTurn;

  const handleSend = () => {
    if (message.trim().length === 0 || !canChat) return;
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

  const getPlayerName = (playerId: string) => {
    if (gameState?.players[playerId]) {
      return gameState.players[playerId].name;
    }
    return playerId.substring(0, 12);
  };

  return (
    <aside className="w-full border-t border-white/10 bg-[rgb(13,20,19)] lg:flex lg:min-h-0 lg:w-80 lg:flex-col lg:border-t-0 lg:border-l">
      <div className="shrink-0 border-b border-white/10 px-4 py-3">
        <p className="text-xs tracking-widest text-emerald-400">
          TACTICAL FEED
        </p>
      </div>

      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4 text-sm text-white/70">
        {messages.length === 0 ? (
          <p className="text-white/40">No messages yet.</p>
        ) : (
          messages.map((msg) => {
            if (msg.type === "system") {
              return (
                <p key={msg.id}>
                  <span className="mr-2 text-xs text-white/30">
                    {formatTime(msg.timestamp)}
                  </span>
                  <span className="text-emerald-400">SYSTEM:</span>{" "}
                  {msg.content}
                </p>
              );
            } else {
              return (
                <div key={msg.id} className="rounded-md bg-white/5 px-3 py-2">
                  <p className="text-xs tracking-widest text-white/40">
                    {getPlayerName(msg.from)}
                  </p>
                  <p className="text-white">{msg.content}</p>
                </div>
              );
            }
          })
        )}
      </div>

      <div className="shrink-0 border-t border-white/10 p-3">
        <div className="flex items-center gap-2 rounded-md border border-emerald-500/40 bg-emerald-950/60 px-3 py-2">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={
              canChat
                ? "SEND TRANSMISSION..."
                : isAlive
                  ? "Wait for your turn to chat..."
                  : "Eliminated players cannot chat"
            }
            disabled={!canChat}
            className="flex-1 bg-transparent text-sm text-white placeholder-white/40 outline-none disabled:cursor-not-allowed disabled:opacity-50"
          />
          <button onClick={handleSend} disabled={!canChat}>
            <span className="material-symbols-outlined text-sm text-white disabled:opacity-50">
              send
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
}
