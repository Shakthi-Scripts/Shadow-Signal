"use client";

import React, { useState } from "react";
import { useGame } from "@/contexts/GameContext";
import type { PublicPlayer } from "@/types/game";
import { getSocket } from "@/libs/socket";

export default function LobbyLeftPanel() {
  const { gameState, playerId, socket } = useGame();
  const [confirmTransfer, setConfirmTransfer] = useState<{
    playerId: string;
    playerName: string;
  } | null>(null);

  if (!gameState) {
    return (
      <aside className="mt-6 h-full w-full min-w-60 overflow-y-auto border-r border-white/10 bg-black/20 p-4 lg:w-[22%]">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-white">PERSONNEL</h2>
          <p className="text-sm text-emerald-400">Loading...</p>
        </div>
      </aside>
    );
  }

  const players = Object.values(gameState.players).filter((p) => p.connected);
  const alivePlayers = players.filter((p) => p.alive);
  const maxPlayers = gameState.maxPlayers || 12;
  const isHost = gameState.hostPlayerId === playerId;

  const handleTransferHost = (
    targetPlayerId: string,
    targetPlayerName: string,
  ) => {
    setConfirmTransfer({
      playerId: targetPlayerId,
      playerName: targetPlayerName,
    });
  };

  const confirmTransferHost = () => {
    if (!confirmTransfer || !socket) return;

    const currentSocket = getSocket();
    if (currentSocket) {
      currentSocket.emit(
        "room:transfer-host",
        { newHostId: confirmTransfer.playerId },
        (response: { success: boolean; reason?: string }) => {
          if (!response.success) {
            alert(response.reason || "Failed to transfer host");
          }
          setConfirmTransfer(null);
        },
      );
    }
  };

  const cancelTransferHost = () => {
    setConfirmTransfer(null);
  };

  return (
    <>
      <aside className="mt-6 h-full w-full min-w-60 overflow-y-auto border-r border-white/10 bg-black/20 p-4 lg:w-[22%]">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-white">PERSONNEL</h2>
          <p className="text-sm text-emerald-400">
            ACTIVE LINKS: {players.length} / {maxPlayers}
          </p>
        </div>

        <div className="space-y-3">
          {players.map((player) => (
            <div
              key={player.id}
              className={`flex items-center justify-between rounded-md border border-white/10 bg-black/30 p-3 ${
                !player.alive ? "opacity-50" : ""
              }`}
            >
              <div className="flex-1">
                <div className="text-sm font-semibold text-white">
                  {player.name}
                </div>
                <div className="mt-1 text-xs text-emerald-400">
                  {player.connected
                    ? player.alive
                      ? "CONNECTED"
                      : "ELIMINATED"
                    : "DISCONNECTED"}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {player.id === gameState.hostPlayerId && (
                  <div className="text-xs font-semibold text-emerald-400">
                    Host
                  </div>
                )}
                {isHost &&
                  player.id !== gameState.hostPlayerId &&
                  player.connected &&
                  player.alive && (
                    <button
                      onClick={() => handleTransferHost(player.id, player.name)}
                      className="rounded-md border border-emerald-400/50 bg-emerald-500/10 px-2 py-1 text-xs text-emerald-400 transition hover:border-emerald-400 hover:bg-emerald-500/20"
                      title="Transfer host to this player"
                    >
                      Make Host
                    </button>
                  )}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Confirmation Popup */}
      {confirmTransfer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="relative rounded-xl border border-emerald-400/60 bg-emerald-950/95 p-6 shadow-xl backdrop-blur-lg">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-white">
                Transfer Host Privileges
              </h3>
              <p className="mt-2 text-sm text-white/70">
                Are you sure you want to transfer host privileges to{" "}
                <span className="font-semibold text-emerald-400">
                  {confirmTransfer.playerName}
                </span>
                ?
              </p>
              <p className="mt-2 text-xs text-white/50">
                They will be able to control game settings and start the game.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={confirmTransferHost}
                className="flex-1 rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-emerald-400"
              >
                Confirm
              </button>
              <button
                onClick={cancelTransferHost}
                className="flex-1 rounded-md border border-white/20 bg-black/30 px-4 py-2 text-sm font-semibold text-white transition hover:bg-black/50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
