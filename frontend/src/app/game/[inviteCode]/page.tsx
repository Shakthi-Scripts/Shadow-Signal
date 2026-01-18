"use client";

import { useParams } from "next/navigation";
import LobbyNavBar from "@/components/LobbyNavBar";
import LobbyLeftPanel from "@/components/LobbyLeftPanel";
import SelectMissionPanel from "@/components/SelectMissionPanel";
import LobbySystemLog from "@/components/LobbySystemLog";
import LobbyBroadcast from "@/components/LobbyBroadcast";
import LobbyFooter from "@/components/LobbyFooter";
import { useState } from "react";

export type mode = "infiltrator" | "spy";
export type difficulty = "easy" | "hard";
export type roundTimerS = 60 | 90 | 120;
export type voteTimeS = 20 | 30 | 40;

export interface GameStateType {
  mode: mode;
  roundTimerS: roundTimerS;
  difficulty: difficulty;
  voteTimeS: voteTimeS;
}

const defaultGameState: GameStateType = {
  mode: "infiltrator",
  roundTimerS: 60,
  difficulty: "easy",
  voteTimeS: 30,
};

export default function Home() {
  const { inviteCode } = useParams();
  const [gameState, setGameState] = useState<GameStateType>(defaultGameState);
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        Loading
      </div>
    );
  }
  return (
    <div className="flex min-h-screen flex-col bg-[rgb(15,21,23)]">
      <LobbyNavBar inviteCode={inviteCode as string} />

      <div className="flex flex-1 flex-col gap-4 px-4 lg:flex-row">
        <LobbyLeftPanel />
        <SelectMissionPanel gameState={gameState} setGameState={setGameState} />
        <LobbySystemLog />
      </div>

      <LobbyBroadcast />
      <LobbyFooter />
    </div>
  );
}
