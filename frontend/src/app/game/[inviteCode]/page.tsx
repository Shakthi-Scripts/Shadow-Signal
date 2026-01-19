"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useGame } from "@/contexts/GameContext";
import { useSocketEvent } from "@/hooks/useSocket";
import api from "@/libs/api";
import { getSocket } from "@/libs/socket";
import LobbyNavBar from "@/components/LobbyNavBar";
import LobbyLeftPanel from "@/components/LobbyLeftPanel";
import SelectMissionPanel from "@/components/SelectMissionPanel";
import LobbySystemLog from "@/components/LobbySystemLog";
import LobbyBroadcast from "@/components/LobbyBroadcast";
import LobbyFooter from "@/components/LobbyFooter";
import RoleSecretCode from "@/components/RoleSecretCode";
import RoleCurrentAssignment from "@/components/RoleCurrentAssignment";
import RoleNavBar from "@/components/RoleNavBar";
import RoleMainText from "@/components/RoleMainText";
import RoleFooter from "@/components/RoleFooter";
import InGameNavBar from "@/components/InGameNavBar";
import InGameHeader from "@/components/InGameHeader";
import InGamePlayerGrid from "@/components/InGamePlayerGrid";
import InGameSecretCard from "@/components/InGameSecretCard";
import InGameTacticalFeed from "@/components/InGameTacticalFeed";
import InGameEndRound from "@/components/InGameEndRound";
import VotingNavBar from "@/components/VotingNavBar";
import VotingChat from "@/components/VotingChat";
import VotingCenter from "@/components/VotingCenter";
import VotingRightPanel from "@/components/VotingRightPanel";
import type { PublicGameState } from "@/types/game";

export type mode = "infiltrator" | "spy";
export type difficulty = "easy" | "hard";
export type roundTimerS = 60 | 90 | 120;
export type voteTimeS = 20 | 30 | 40;

export interface GameConfigType {
  mode: mode;
  roundTimerS: roundTimerS;
  difficulty: difficulty;
  voteTimeS: voteTimeS;
}

const defaultGameConfig: GameConfigType = {
  mode: "infiltrator",
  roundTimerS: 60,
  difficulty: "easy",
  voteTimeS: 30,
};

export default function GamePage() {
  const { inviteCode } = useParams();
  const router = useRouter();
  const {
    socket,
    gameState,
    playerId,
    playerRole,
    playerWord,
    error,
    setError,
    connectSocket,
  } = useGame();

  const [loading, setLoading] = useState(true);
  const [gameConfig, setGameConfig] = useState<GameConfigType>(defaultGameConfig);
  const [showRoleReveal, setShowRoleReveal] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [selectedVoteTarget, setSelectedVoteTarget] = useState<string | null>(null);
  const [voteProgress, setVoteProgress] = useState({ votesCast: 0, totalPlayers: 0 });
  const [voteTally, setVoteTally] = useState<Record<string, number>>({});
  const [votesRevealed, setVotesRevealed] = useState<boolean>(false);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const joinRequestedRef = useRef(false);

  // Join room on mount
  useEffect(() => {
    const joinRoom = async () => {
      if (joinRequestedRef.current || hasJoined || !inviteCode) return;
      joinRequestedRef.current = true;

      try {
        setLoading(true);
        // For now, we'll use a stored alias or prompt for it
        // In a real app, you'd get this from localStorage or user input
        const storedAlias = localStorage.getItem("playerAlias") || `Player_${Math.random().toString(36).substr(2, 5)}`;
        const storedPlayerId = localStorage.getItem("playerId")
        
        
        if (storedAlias && storedPlayerId) {
          connectSocket(storedPlayerId);

          // Join room via socket
            const currentSocket = getSocket();
            if (currentSocket) {
              currentSocket.emit(
                "room:join",
                { inviteCode, alias: storedAlias, playerId: storedPlayerId },
                (response: { success: boolean; reason?: string }) => {
                if (response.success) {
                  setHasJoined(true);
                  setLoading(false);
                } else {
                  setError(response.reason || "Failed to join room");
                  setLoading(false);
                }
                }
              );
            } else {
              setError("Failed to establish socket connection");
              setLoading(false);
            }
        }
      } catch (err) {
        console.error("Error joining room:", err);
        const message = err instanceof Error ? err.message : "Failed to join room";
        setError(message);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    joinRoom();
    // We intentionally exclude socket/connectSocket from deps to avoid duplicate joins.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inviteCode, hasJoined, setError]);

  // Listen for role assignment
  useSocketEvent<{ role: "citizen" | "infiltrator" | "agent" | "spy"; word: string | null }>(
    "role:assigned",
    () => {
      setShowRoleReveal(true);
    },
    []
  );

  // Listen for game state updates
  useSocketEvent<PublicGameState>("room:state", (state) => {
    // Update game config if host
    if (state.phase === "lobby" && gameState?.phase !== "lobby") {
      // Reset role reveal when returning to lobby
      setShowRoleReveal(false);
    }
    if (state.phase === "voting") {
      setVotesRevealed(false);
    }
  }, [gameState]);

  // Listen for vote progress
  useSocketEvent<{ votesCast: number; totalPlayers: number }>(
    "vote:progress",
    (payload) => {
      setVoteProgress(payload);
    },
    []
  );

  // Listen for vote reveal
  useSocketEvent<{ tally: Record<string, number> }>(
    "vote:reveal",
    (payload) => {
      setVoteTally(payload.tally);
      setVotesRevealed(true);
    },
    []
  );

  // Handle game start
  const handleStartGame = () => {
    if (!socket) return;

    // Send game config with start event
    socket.emit("game:start", {
      mode: gameConfig.mode,
      difficulty: gameConfig.difficulty,
      roundTimerSeconds: gameConfig.roundTimerS,
      voteTimerSeconds: gameConfig.voteTimeS,
    });
  };

  // Handle turn end
  const handleEndTurn = () => {
    if (!socket) return;
    socket.emit("turn:end");
  };

  // Handle chat send
  const handleSendChat = () => {
    if (!socket || !chatMessage.trim()) return;
    socket.emit("chat:send", { content: chatMessage });
    setChatMessage("");
  };

  // Handle vote cast
  const handleCastVote = (targetId: string) => {
    if (!socket) return;
    setSelectedVoteTarget(targetId);
    socket.emit(
      "vote:cast",
      { targetId },
      (response: { success: boolean; reason?: string }) => {
        if (!response?.success) {
          setError(response?.reason || "Failed to cast vote");
      }
      }
    );
  };

  // Handle role reveal proceed
  const handleProceedFromRole = () => {
    setShowRoleReveal(false);
  };

  // Timer effect for turn countdown
  useEffect(() => {
    if (gameState?.phase === "playing" && gameState.turn) {
      timerIntervalRef.current = setInterval(() => {
        // Timer updates are handled by server, this is just for UI
      }, 1000);

      return () => {
        if (timerIntervalRef.current) {
          clearInterval(timerIntervalRef.current);
        }
      };
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    }
  }, [gameState?.phase, gameState?.turn]);

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[rgb(15,21,23)]">
        <div className="text-center">
          <div className="text-2xl font-bold text-white">Loading...</div>
          <div className="mt-4 text-sm text-white/60">Connecting to room...</div>
        </div>
      </div>
    );
  }

  if (error && !gameState) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[rgb(15,21,23)]">
        <div className="text-center">
          <div className="text-2xl font-bold text-red-500">Error</div>
          <div className="mt-4 text-sm text-white/60">{error}</div>
          <button
            onClick={() => router.push("/")}
            className="mt-6 rounded-md bg-emerald-500 px-6 py-3 text-sm font-semibold text-black"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  if (!gameState) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[rgb(15,21,23)]">
        <div className="text-center">
          <div className="text-2xl font-bold text-white">Waiting for game state...</div>
        </div>
      </div>
    );
  }

  // Render based on phase
  if (gameState.phase === "lobby") {
    return (
      <div className="flex min-h-screen flex-col bg-[rgb(15,21,23)]">
        <LobbyNavBar inviteCode={inviteCode as string} />
        <div className="flex flex-1 flex-col gap-4 px-4 lg:flex-row">
          <LobbyLeftPanel />
          <SelectMissionPanel
            gameConfig={gameConfig}
            setGameState={setGameConfig}
            onStartGame={handleStartGame}
            isHost={Boolean(
              gameState.hostPlayerId === playerId
            )}
          />
          <LobbySystemLog />
        </div>
        <LobbyBroadcast />
        <LobbyFooter />
      </div>
    );
  }

  if (gameState.phase === "playing") {
    // Show role reveal first if just assigned
    if (showRoleReveal && playerRole && playerWord !== undefined) {
      return (
        <div className="min-h-screen bg-[rgb(15,21,23)]">
          <RoleNavBar />
          <div className="flex pt-16">
            <RoleMainText />
          </div>
          <div className="mx-auto -mt-6 max-w-6xl px-6">
            <div className="flex flex-col gap-8 md:flex-row md:items-start">
              <RoleSecretCode
                word={playerWord || "NONE"}
                wordColor="#ffffff"
                secretWord={playerRole === "infiltrator" || playerRole === "spy" ? "SECRET ROLE" : "YOUR WORD"}
              />
              <div className="flex w-full max-w-md flex-col">
                <RoleCurrentAssignment
                  role={
                    playerRole === "infiltrator"
                      ? "INFILTRATOR"
                      : playerRole === "spy"
                      ? "SPY"
                      : playerRole === "citizen"
                      ? "CITIZEN"
                      : "AGENT"
                  }
                  roleColor={playerRole === "infiltrator" || playerRole === "spy" ? "#ef4444" : "#ffffff"}
                />
                <button
                  onClick={handleProceedFromRole}
                  className="mt-6 flex w-full items-center justify-center gap-3 rounded-md bg-emerald-400 py-4 text-lg font-bold tracking-widest text-white transition hover:bg-emerald-300"
                >
                  <span className="material-symbols-outlined text-white">play_arrow</span>
                  CONTINUE
                </button>
              </div>
            </div>
            <RoleFooter />
          </div>
        </div>
      );
    }

    // Speaking phase
    const currentPlayer = gameState.turn?.currentPlayerId
      ? gameState.players[gameState.turn.currentPlayerId]
      : null;
    const isMyTurn = gameState.turn?.currentPlayerId === playerId;
    const timeRemaining = gameState.turn
      ? Math.max(0, Math.floor((gameState.turn.endsAt - Date.now()) / 1000))
      : 0;

    return (
      <div className="flex min-h-screen flex-col bg-[rgb(15,21,23)]">
        <InGameNavBar />
        <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
          <main className="relative flex min-h-0 flex-1 flex-col">
            <InGameHeader
              round={gameState.round}
              timeRemaining={timeRemaining}
              currentPlayer={currentPlayer?.name || ""}
            />
            <div className="min-h-0 flex-1">
              <InGamePlayerGrid
                players={Object.values(gameState.players).filter((p) => p.alive)}
                currentPlayerId={gameState.turn?.currentPlayerId || null}
                playerId={playerId}
              />
            </div>
            <div className="mt-8 mb-6 flex flex-col items-center gap-4 px-6 lg:hidden">
              <InGameSecretCard
                word={playerWord || "NONE"}
                wordColor="#ffffff"
              />
              {isMyTurn && (
                <InGameEndRound onEndTurn={handleEndTurn} />
              )}
            </div>
            <div className="hidden items-end justify-between px-6 pb-6 lg:flex">
              <InGameSecretCard word={playerWord || "NONE"} wordColor="#ffffff" />
              {isMyTurn && <InGameEndRound onEndTurn={handleEndTurn} />}
            </div>
          </main>
          <InGameTacticalFeed
            messages={gameState.messages}
            onSendMessage={handleSendChat}
            message={chatMessage}
            setMessage={setChatMessage}
          />
        </div>
      </div>
    );
  }

  if (gameState.phase === "voting") {
    const alivePlayers = Object.values(gameState.players).filter((p) => p.alive);
    // Voting timer is managed server-side, we'll use a default for now
    const timeRemaining = 30; // This would come from gameState if we add it to PublicGameState

    return (
      <div className="min-h-screen bg-[rgb(15,21,23)]">
        <VotingNavBar />
        <div className="flex flex-col-reverse gap-8 lg:flex-row lg:gap-0">
          <VotingChat
            messages={gameState.messages}
            onSendMessage={handleSendChat}
            message={chatMessage}
            setMessage={setChatMessage}
          />
          <VotingCenter
            players={alivePlayers}
            timeRemaining={timeRemaining}
            onVote={handleCastVote}
            selectedTarget={selectedVoteTarget}
            playerId={playerId}
            votesRevealed={votesRevealed}
            voteTally={voteTally}
          />
          <VotingRightPanel
            votesCast={voteProgress.votesCast}
            totalPlayers={alivePlayers.length}
          />
        </div>
      </div>
    );
  }

  if (gameState.phase === "ended") {
    // Game end screen
    const winnerMessage = gameState.messages[gameState.messages.length - 1]?.content || "Game ended";
    
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[rgb(15,21,23)] px-4">
        <div className="max-w-2xl text-center">
          <h1 className="text-4xl font-bold text-white mb-4">GAME ENDED</h1>
          <p className="text-xl text-emerald-400 mb-8">{winnerMessage}</p>
          <button
            onClick={() => router.push("/")}
            className="rounded-md bg-emerald-500 px-8 py-4 text-lg font-semibold text-black transition hover:bg-emerald-400"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return null;
}
