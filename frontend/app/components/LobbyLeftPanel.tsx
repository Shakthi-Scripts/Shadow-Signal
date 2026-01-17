import React from "react";

type PlayerStatus = "READY" | "STANDBY" | "LINKED";

interface Player {
  id: number;
  name: string;
  status: PlayerStatus;
}

const players: Player[] = [
  { id: 1, name: "HOST_PRIME", status: "LINKED" },
  { id: 2, name: "CIPHER_X", status: "READY" },
  { id: 3, name: "NEON_GHOST", status: "READY" },
  { id: 4, name: "VOID_WALKER", status: "STANDBY" },
];

export default function LobbyLeftPanel() {
  return (
    <aside className="w-full max-w-sm border border-white/10 bg-black/20 p-4 mt-4 ml-2">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-white">PERSONNEL</h2>
        <p className="text-sm text-emerald-400">
          ACTIVE LINKS: {players.length} / 12
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {players.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>
    </aside>
  );
}

function PlayerCard({ player }: { player: Player }) {
  return (
    <div className="rounded-md border border-white/10 bg-black/30 p-3">
      <div className="text-sm font-semibold text-white">
        {player.name}
      </div>
      <div className="mt-1 text-xs text-emerald-400">
        {player.status}
      </div>
    </div>
  );
}
