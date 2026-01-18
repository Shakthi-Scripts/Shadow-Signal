"use client";
import { Dispatch, SetStateAction } from "react";
import {
  difficulty,
  GameStateType,
  mode,
  roundTimerS,
  voteTimeS,
} from "../game/[inviteCode]/page";

type SelectMissionPanelProps = {
  gameState: GameStateType;
  setGameState: Dispatch<SetStateAction<GameStateType>>;
};

export default function SelectMissionPanel({
  gameState,
  setGameState,
}: SelectMissionPanelProps) {
  const handleSetMode = (mode: mode) =>
    setGameState((prev) => ({ ...prev, mode }));
  const handleSetDifficulty = (difficulty: difficulty) =>
    setGameState((prev) => ({ ...prev, difficulty }));
  const handleSetRoundTimer = (roundTimerS: roundTimerS) =>
    setGameState((prev) => ({ ...prev, roundTimerS }));
  const handleSetVoteTimer = (voteTimeS: voteTimeS) =>
    setGameState((prev) => ({ ...prev, voteTimeS }));

  return (
    <main className="mt-6 h-full w-full flex-1 overflow-y-auto bg-black/20 p-6 lg:w-[56%]">
      <header className="mb-6">
        <h1 className="text-xl font-semibold text-white">
          SELECT MISSION PROTOCOL
        </h1>
        <p className="mt-2 text-sm text-white/60">
          Choose how the signal transmission will operate.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div
          onClick={() => handleSetMode("infiltrator")}
          className={`cursor-pointer rounded-md border p-6 transition-all ${
            gameState.mode === "infiltrator"
              ? "border-emerald-400 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.25)]"
              : "border-white/10 bg-black/30 hover:border-white/30"
          }`}
        >
          <h3 className="mb-3 text-sm font-semibold text-white">
            INFILTRATOR MODE
          </h3>
          <ul className="space-y-1 text-xs text-white/70">
            <li>• Signal matching required</li>
            <li>• Hidden agents</li>
            <li>• High social deduction</li>
          </ul>
        </div>

        <div
          onClick={() => handleSetMode("spy")}
          className={`cursor-pointer rounded-md border p-6 transition-all ${
            gameState.mode === "spy"
              ? "border-emerald-400 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.25)]"
              : "border-white/10 bg-black/30 hover:border-white/30"
          }`}
        >
          <h3 className="mb-3 text-sm font-semibold text-white">SPY MODE</h3>
          <ul className="space-y-1 text-xs text-white/70">
            <li>• Identity deception focus</li>
            <li>• Double agent role</li>
            <li>• Psychological gameplay</li>
          </ul>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-6">
        <div>
          <p className="mb-2 text-xs text-white/60">ROUND TIMER</p>
          <div className="flex gap-2">
            <OptionButton
              label="60s"
              isActive={gameState.roundTimerS === 60}
              onClick={() => handleSetRoundTimer(60)}
            />
            <OptionButton
              label="90s"
              isActive={gameState.roundTimerS === 90}
              onClick={() => handleSetRoundTimer(90)}
            />
            <OptionButton
              label="120s"
              isActive={gameState.roundTimerS === 120}
              onClick={() => handleSetRoundTimer(120)}
            />
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs text-white/60">DIFFICULTY</p>
          <div className="flex gap-2">
            <OptionButton
              label="Easy"
              isActive={gameState.difficulty === "easy"}
              onClick={() => handleSetDifficulty("easy")}
            />
            <OptionButton
              label="Hard"
              isActive={gameState.difficulty === "hard"}
              onClick={() => handleSetDifficulty("hard")}
            />
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs text-white/60">VOTE TIMER</p>
          <div className="flex gap-2">
            <OptionButton
              label="20s"
              isActive={gameState.voteTimeS === 20}
              onClick={() => handleSetVoteTimer(20)}
            />
            <OptionButton
              label="30s"
              isActive={gameState.voteTimeS === 30}
              onClick={() => handleSetVoteTimer(30)}
            />
            <OptionButton
              label="40s"
              isActive={gameState.voteTimeS === 40}
              onClick={() => handleSetVoteTimer(40)}
            />
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-white">SYSTEM STATUS</p>
          <p className="text-xs text-emerald-400">Ready for signal launch</p>
        </div>

        <button className="rounded-md bg-emerald-500 px-6 py-3 text-sm font-semibold text-black">
          START GAME
        </button>
      </div>
    </main>
  );
}

function OptionButton({
  label,
  isActive,
  ...props
}: {
  label: string;
  isActive: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`cursor-pointer rounded-md border px-4 py-1.5 text-xs text-white transition-all ${
        isActive
          ? "border-emerald-400 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.25)]"
          : "border-white/10 bg-black/30 hover:border-white/30"
      }`}
      {...props}
    >
      {label}
    </button>
  );
}
