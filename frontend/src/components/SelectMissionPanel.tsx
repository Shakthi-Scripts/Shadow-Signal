"use client";
import { Dispatch, SetStateAction } from "react";
import {
  difficulty,
  GameConfigType,
  maxRounds,
  mode,
  roundTimerS,
  voteTimeS,
} from "@/app/game/[inviteCode]/page";
import { useGame } from "@/contexts/GameContext";
import { cn } from "@/lib/utils";

type SelectMissionPanelProps = {
  gameConfig: GameConfigType;
  setGameState: Dispatch<SetStateAction<GameConfigType>>;
  onStartGame?: () => void;
  isHost?: boolean;
  onConfigUpdate?: (config: GameConfigType) => void;
};

export default function SelectMissionPanel({
  gameConfig,
  setGameState,
  onStartGame,
  isHost = false,
  onConfigUpdate,
}: SelectMissionPanelProps) {
  const handleSetMode = (mode: mode) => {
    const newConfig = { ...gameConfig, mode };
    setGameState(newConfig);
    if (isHost && onConfigUpdate) {
      onConfigUpdate(newConfig);
    }
  };
  const handleSetDifficulty = (difficulty: difficulty) => {
    const newConfig = { ...gameConfig, difficulty };
    setGameState(newConfig);
    if (isHost && onConfigUpdate) {
      onConfigUpdate(newConfig);
    }
  };
  const handleSetRoundTimer = (roundTimerS: roundTimerS) => {
    const newConfig = { ...gameConfig, roundTimerS };
    setGameState(newConfig);
    if (isHost && onConfigUpdate) {
      onConfigUpdate(newConfig);
    }
  };
  const handleSetVoteTimer = (voteTimeS: voteTimeS) => {
    const newConfig = { ...gameConfig, voteTimeS };
    setGameState(newConfig);
    if (isHost && onConfigUpdate) {
      onConfigUpdate(newConfig);
    }
  };
  const handleSetMaxRounds = (maxRounds: maxRounds) => {
    const newConfig = { ...gameConfig, maxRounds };
    setGameState(newConfig);
    if (isHost && onConfigUpdate) {
      onConfigUpdate(newConfig);
    }
  };
  const handleSetMaxPlayers = (maxPlayers: number) => {
    const newConfig = { ...gameConfig, maxPlayers };
    setGameState(newConfig);
    if (isHost && onConfigUpdate) {
      onConfigUpdate(newConfig);
    }
  };

  const { gameState } = useGame();
  const connectedPlayersCount = gameState
    ? Object.values(gameState.players).filter((p) => p.connected).length
    : 0;
  const maxPlayersExceeded = Boolean(
    gameState && connectedPlayersCount > gameConfig.maxPlayers,
  );

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
          onClick={isHost ? () => handleSetMode("infiltrator") : undefined}
          className={cn(
            "cursor-pointer rounded-md border p-6 transition-all",
            !isHost && "cursor-not-allowed border-white/10 bg-black/30",
            gameConfig.mode === "infiltrator"
              ? "border-emerald-400 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.25)]"
              : "border-white/10 bg-black/30 hover:border-white/30",
          )}
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
          onClick={isHost ? () => handleSetMode("spy") : undefined}
          className={cn(
            "cursor-pointer rounded-md border p-6 transition-all",
            !isHost && "cursor-not-allowed border-white/10 bg-black/30",
            gameConfig.mode === "spy"
              ? "border-emerald-400 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.25)]"
              : "border-white/10 bg-black/30 hover:border-white/30",
          )}
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
              isActive={gameConfig.roundTimerS === 60}
              onClick={() => handleSetRoundTimer(60)}
              disabled={!isHost}
            />
            <OptionButton
              label="90s"
              isActive={gameConfig.roundTimerS === 90}
              onClick={() => handleSetRoundTimer(90)}
              disabled={!isHost}
            />
            <OptionButton
              label="120s"
              isActive={gameConfig.roundTimerS === 120}
              onClick={() => handleSetRoundTimer(120)}
              disabled={!isHost}
            />
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs text-white/60">DIFFICULTY</p>
          <div className="flex gap-2">
            <OptionButton
              label="Easy"
              isActive={gameConfig.difficulty === "easy"}
              onClick={() => handleSetDifficulty("easy")}
              disabled={!isHost}
            />
            <OptionButton
              label="Hard"
              isActive={gameConfig.difficulty === "hard"}
              onClick={() => handleSetDifficulty("hard")}
              disabled={!isHost}
            />
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs text-white/60">VOTE TIMER</p>
          <div className="flex gap-2">
            <OptionButton
              label="20s"
              isActive={gameConfig.voteTimeS === 20}
              onClick={() => handleSetVoteTimer(20)}
              disabled={!isHost}
            />
            <OptionButton
              label="30s"
              isActive={gameConfig.voteTimeS === 30}
              onClick={() => handleSetVoteTimer(30)}
              disabled={!isHost}
            />
            <OptionButton
              label="40s"
              isActive={gameConfig.voteTimeS === 40}
              onClick={() => handleSetVoteTimer(40)}
              disabled={!isHost}
            />
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs text-white/60">MAX ROUNDS</p>
          <div className="flex flex-wrap gap-2">
            {[3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((rounds) => (
              <OptionButton
                key={rounds}
                label={rounds.toString()}
                isActive={gameConfig.maxRounds === rounds}
                onClick={() => handleSetMaxRounds(rounds as maxRounds)}
                disabled={!isHost}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs text-white/60">MAX PLAYERS</p>
          <select
            value={gameConfig.maxPlayers}
            onChange={(e) => handleSetMaxPlayers(Number(e.target.value))}
            disabled={!isHost}
            className={cn(
              "w-full rounded-md border px-4 py-1.5 text-xs text-white transition-all",
              !isHost && "cursor-not-allowed border-white/10 bg-black/30",
              isHost &&
                "cursor-pointer border-white/10 bg-black/30 hover:border-white/30 focus:border-emerald-400/60 focus:outline-none",
            )}
          >
            {Array.from({ length: 10 }, (_, i) => i + 3).map((num) => (
              <option key={num} value={num} className="bg-black/90">
                {num}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-white">SYSTEM STATUS</p>
          <p className="text-xs text-emerald-400">Ready for signal launch</p>
        </div>

        <div className="relative">
          <button
            onClick={onStartGame}
            disabled={
              !isHost ||
              !onStartGame ||
              (gameState?.players &&
                Object.keys(gameState.players).length < 3) ||
              maxPlayersExceeded
            }
            className={cn(
              "rounded-md bg-emerald-500 px-6 py-3 text-sm font-semibold text-black transition hover:bg-emerald-400",
              "disabled:cursor-not-allowed disabled:opacity-30",
            )}
            title={
              maxPlayersExceeded
                ? `Max players exceeded. Current players: ${connectedPlayersCount}, Max: ${gameConfig.maxPlayers}`
                : undefined
            }
          >
            START GAME
          </button>
          {maxPlayersExceeded && (
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 rounded-md bg-red-600 px-3 py-2 text-xs whitespace-nowrap text-white shadow-lg">
              Max players exceeded ({connectedPlayersCount}/
              {gameConfig.maxPlayers})
              <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-red-600"></div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function OptionButton({
  label,
  isActive,
  disabled,
  ...props
}: {
  label: string;
  isActive: boolean;
  disabled?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      disabled={disabled}
      className={cn(
        "cursor-pointer rounded-md border px-4 py-1.5 text-xs text-white transition-all",
        disabled && "cursor-not-allowed border-white/10 bg-black/30",
        isActive
          ? "border-emerald-400 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.25)]"
          : "border-white/10 bg-black/30 hover:border-white/30",
      )}
      {...props}
    >
      {label}
    </button>
  );
}
