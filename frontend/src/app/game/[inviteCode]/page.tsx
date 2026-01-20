"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useGame } from "@/contexts/GameContext";
import { useSocketEvent } from "@/hooks/useSocket";
import { getSocket } from "@/libs/socket";
import LobbyNavBar from "@/components/LobbyNavBar";
import LobbyLeftPanel from "@/components/LobbyLeftPanel";
import SelectMissionPanel from "@/components/SelectMissionPanel";
import LobbyLog from "@/components/LobbySystemLog";
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
export type maxRounds = 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface GameConfigType {
  mode: mode;
  roundTimerS: roundTimerS;
  difficulty: difficulty;
  voteTimeS: voteTimeS;
  maxRounds: maxRounds;
  maxPlayers: number;
}

const defaultGameConfig: GameConfigType = {
  mode: "infiltrator",
  roundTimerS: 60,
  difficulty: "easy",
  voteTimeS: 30,
  maxRounds: 6,
  maxPlayers: 12,
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
  const [gameConfig, setGameConfig] =
    useState<GameConfigType>(defaultGameConfig);
  const [showRoleReveal, setShowRoleReveal] = useState(false);
  const [showWordReveal, setShowWordReveal] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [selectedVoteTarget, setSelectedVoteTarget] = useState<string | null>(
    null,
  );
  const [voteProgress, setVoteProgress] = useState({
    votesCast: 0,
    totalPlayers: 0,
  });
  const [voteTally, setVoteTally] = useState<Record<string, number>>({});
  const [votesRevealed, setVotesRevealed] = useState<boolean>(false);
  const [voteSummary, setVoteSummary] = useState<Record<string, string> | null>(
    null,
  );
  const [showVoteSummaryScreen, setShowVoteSummaryScreen] =
    useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [isStartingGame, setIsStartingGame] = useState(false);
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
        const storedAlias =
          localStorage.getItem("playerAlias") ||
          `Player_${Math.random().toString(36).substr(2, 5)}`;
        const storedPlayerId = localStorage.getItem("playerId");

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
              },
            );
          } else {
            setError("Failed to establish socket connection");
            setLoading(false);
          }
        }
      } catch (err) {
        console.error("Error joining room:", err);
        const message =
          err instanceof Error ? err.message : "Failed to join room";
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
  useSocketEvent<{
    role: "citizen" | "infiltrator" | "agent" | "spy";
    word: string | null;
  }>(
    "role:assigned",
    () => {
      setShowRoleReveal(true);
      // After role reveal is dismissed, show word reveal for 5 seconds
    },
    [],
  );

  // Handle word reveal screen - show when phase is playing but no turn has started (5-second delay)
  useEffect(() => {
    if (
      gameState?.phase === "playing" &&
      gameState.turn === null &&
      playerWord &&
      !showRoleReveal
    ) {
      // Show word reveal during the 5-second delay before first turn starts
      setShowWordReveal(true);
      const timer = setTimeout(() => {
        setShowWordReveal(false);
      }, 5000);
      return () => clearTimeout(timer);
    } else if (gameState?.turn !== null) {
      // Turn has started, hide word reveal
      setShowWordReveal(false);
    }
  }, [showRoleReveal, gameState?.phase, gameState?.turn, playerWord]);

  // Listen for game state updates
  useSocketEvent<PublicGameState>(
    "room:state",
    (state) => {
      // Update game config from server state when in lobby
      if (state.phase === "lobby") {
        if (gameState?.phase !== "lobby") {
          // Reset role reveal when returning to lobby
          setShowRoleReveal(false);
        }
        // Sync config from server state (merge with existing to handle optional fields)
        setGameConfig((prev) => ({
          mode: state.mode ?? prev.mode,
          difficulty: state.difficulty ?? prev.difficulty,
          roundTimerS:
            (state.roundTimerSeconds as roundTimerS) ?? prev.roundTimerS,
          voteTimeS: (state.voteTimerSeconds as voteTimeS) ?? prev.voteTimeS,
          maxRounds: (state.maxRounds as maxRounds) ?? prev.maxRounds,
          maxPlayers: state.maxPlayers ?? prev.maxPlayers,
        }));
      }
      if (state.phase === "voting") {
        setVotesRevealed(false);
      }
    },
    [gameState],
  );

  // Listen for vote progress
  useSocketEvent<{ votesCast: number; totalPlayers: number }>(
    "vote:progress",
    (payload) => {
      setVoteProgress(payload);
    },
    [],
  );

  // Listen for vote reveal
  useSocketEvent<{ tally: Record<string, number>; byPlayer?: Record<string, string> }>(
    "vote:reveal",
    (payload) => {
      setVoteTally(payload.tally);
      setVotesRevealed(true);
      if (payload.byPlayer) {
        setVoteSummary(payload.byPlayer);
        setShowVoteSummaryScreen(true);
        // Hide summary after a short delay
        setTimeout(() => {
          setShowVoteSummaryScreen(false);
        }, 4000);
      }
    },
    [],
  );

  // Handle game start
  const handleStartGame = () => {
    if (!socket) return;

    setIsStartingGame(true);

    // Send game config with start event
    socket.emit("game:start", {
      mode: gameConfig.mode,
      difficulty: gameConfig.difficulty,
      roundTimerSeconds: gameConfig.roundTimerS,
      voteTimerSeconds: gameConfig.voteTimeS,
      maxRounds: gameConfig.maxRounds,
    });
  };

  // Clear starting state once server confirms game started
  useSocketEvent<PublicGameState>(
    "game:started",
    () => {
      setIsStartingGame(false);
    },
    [],
  );

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
    
    // Check if current player is eliminated
    const currentPlayer = gameState?.players[playerId || ""];
    if (currentPlayer && !currentPlayer.alive) {
      setError("Eliminated players cannot vote");
      return;
    }
    
    setSelectedVoteTarget(targetId);
    socket.emit(
      "vote:cast",
      { targetId },
      (response: { success: boolean; reason?: string }) => {
        if (!response?.success) {
          setError(response?.reason || "Failed to cast vote");
        }
      },
    );
  };

  // Handle role reveal proceed
  const handleProceedFromRole = () => {
    setShowRoleReveal(false);
  };

  // Timer effect for countdown - updates every second independently but syncs with server state
  useEffect(() => {
    // Clear any existing interval
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    // Calculate initial time remaining from server state
    if (gameState?.phase === "playing" && gameState.turn) {
      const initialTime = Math.max(
        0,
        Math.floor((gameState.turn.endsAt - Date.now()) / 1000),
      );
      setTimeRemaining(initialTime);

      // Set up interval to update every second
      timerIntervalRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          const newTime = Math.max(0, prev - 1);
          return newTime;
        });
      }, 1000);
    } else if (gameState?.phase === "voting" && gameState.votes) {
      const initialTime = Math.max(
        0,
        Math.floor((gameState.votes.endsAt - Date.now()) / 1000),
      );
      setTimeRemaining(initialTime);

      // Set up interval to update every second
      timerIntervalRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          const newTime = Math.max(0, prev - 1);
          return newTime;
        });
      }, 1000);
    } else {
      setTimeRemaining(0);
    }

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState?.phase, gameState?.turn?.endsAt, gameState?.votes?.endsAt]);

  // Sync timer with server state when it updates (to avoid drift)
  useEffect(() => {
    if (gameState?.phase === "playing" && gameState.turn) {
      const serverTime = Math.max(
        0,
        Math.floor((gameState.turn.endsAt - Date.now()) / 1000),
      );
      // Only sync if there's a significant difference (more than 1 second) to avoid jitter
      if (Math.abs(serverTime - timeRemaining) > 1) {
        setTimeRemaining(serverTime);
      }
    } else if (gameState?.phase === "voting" && gameState.votes) {
      const serverTime = Math.max(
        0,
        Math.floor((gameState.votes.endsAt - Date.now()) / 1000),
      );
      // Only sync if there's a significant difference (more than 1 second) to avoid jitter
      if (Math.abs(serverTime - timeRemaining) > 1) {
        setTimeRemaining(serverTime);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState?.turn?.endsAt, gameState?.votes?.endsAt, gameState?.phase]);

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[rgb(15,21,23)]">
        <div className="text-center">
          <div className="text-2xl font-bold text-white">Loading...</div>
          <div className="mt-4 text-sm text-white/60">
            Connecting to room...
          </div>
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
          <div className="text-2xl font-bold text-white">
            Intercepting Signal...
          </div>
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
            isStartingGame={isStartingGame}
            isHost={Boolean(gameState.hostPlayerId === playerId)}
            onConfigUpdate={(config) => {
              if (!socket) return;
              socket.emit("game:config:update", {
                mode: config.mode,
                difficulty: config.difficulty,
                roundTimerSeconds: config.roundTimerS,
                voteTimerSeconds: config.voteTimeS,
                maxRounds: config.maxRounds,
                maxPlayers: config.maxPlayers,
              });
            }}
          />
          <LobbyLog />
        </div>
        <LobbyBroadcast />
        <LobbyFooter />
      </div>
    );
  }

  if (gameState.phase === "playing") {
    const isInfiltrator = playerRole === "infiltrator";
    const infiltratorTip =
      "You are the Infiltrator. No secret word is assigned to you. Infer the hidden word from others’ hints and describe it intuitively without revealing you have no word.";
    const displayWord = isInfiltrator ? "NO WORD ASSIGNED" : playerWord || "NONE";
    // Show word reveal screen for 5 seconds after role reveal
    if (showWordReveal && playerWord && !isInfiltrator) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[rgb(15,21,23)] px-4">
          <div className="max-w-2xl text-center">
            <h1 className="mb-8 text-4xl font-bold tracking-widest text-white sm:text-5xl">
              YOUR WORD
            </h1>
            <div className="mb-8 rounded-lg border-2 border-emerald-400 bg-emerald-950/60 px-8 py-6">
              <p className="text-3xl font-bold tracking-widest text-emerald-400 sm:text-4xl">
                {playerWord}
              </p>
            </div>
            <p className="text-sm text-white/60">
              Game starting in a few seconds...
            </p>
          </div>
        </div>
      );
    }

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
              <div className="flex flex-1 flex-col gap-4">
                <RoleSecretCode
                  word={displayWord}
                  wordColor="#ffffff"
                  secretWord={
                    playerRole === "infiltrator" || playerRole === "spy"
                      ? "SECRET ROLE"
                      : "YOUR WORD"
                  }
                />
                {isInfiltrator && (
                  <p className="text-xs text-white/70">
                    {infiltratorTip}
                  </p>
                )}
              </div>
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
                  roleColor={
                    playerRole === "infiltrator" || playerRole === "spy"
                      ? "#ef4444"
                      : "#ffffff"
                  }
                />
                <button
                  onClick={handleProceedFromRole}
                  className="mt-6 flex w-full items-center justify-center gap-3 rounded-md bg-emerald-400 py-4 text-lg font-bold tracking-widest text-white transition hover:bg-emerald-300"
                >
                  <span className="material-symbols-outlined text-white">
                    play_arrow
                  </span>
                  CONTINUE
                </button>
              </div>
            </div>
            <RoleFooter />
          </div>
        </div>
      );
    }

    // Typing phase
    const currentPlayer = gameState.turn?.currentPlayerId
      ? gameState.players[gameState.turn.currentPlayerId]
      : null;
    const isMyTurn = gameState.turn?.currentPlayerId === playerId;

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
                players={Object.values(gameState.players).filter(
                  (p) => p.connected,
                )}
                currentPlayerId={gameState.turn?.currentPlayerId || null}
                playerId={playerId}
                eliminatedPlayers={gameState.eliminatedPlayers}
              />
            </div>
            <div className="mt-8 mb-6 flex flex-col items-center gap-4 px-6 lg:hidden">
              <InGameSecretCard
                word={displayWord}
                wordColor="#ffffff"
              />
              {isMyTurn && <InGameEndRound onEndTurn={handleEndTurn} />}
            </div>
            <div className="hidden items-end justify-between px-6 pb-6 lg:flex">
              <InGameSecretCard
                word={displayWord}
                wordColor="#ffffff"
              />
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
    const alivePlayers = Object.values(gameState.players).filter(
      (p) => p.alive,
    );
    const currentPlayer = gameState.players[playerId || ""];
    const currentPlayerAlive = currentPlayer?.alive ?? false;

    if (showVoteSummaryScreen && voteSummary) {
      const playersById = gameState.players;
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[rgb(15,21,23)] px-4">
          <div className="w-full max-w-2xl rounded-lg border border-emerald-500/30 bg-black/40 p-6">
            <h2 className="mb-4 text-center text-lg font-semibold tracking-[0.3em] text-white">
              VOTE SUMMARY
            </h2>
            <p className="mb-4 text-center text-xs text-white/60">
              Briefly showing who voted for whom before elimination.
            </p>
            <div className="max-h-64 space-y-2 overflow-y-auto text-sm text-white/80">
              {Object.entries(voteSummary).map(([voterId, targetId]) => {
                const voter = playersById[voterId];
                const target = playersById[targetId];
                return (
                  <div
                    key={`${voterId}-${targetId}-${Math.random()}`}
                    className="flex items-center justify-between rounded border border-white/10 bg-white/5 px-3 py-2"
                  >
                    <span className="truncate pr-2 text-xs font-semibold">
                      {voter?.name ?? "Unknown"}
                    </span>
                    <span className="text-[10px] tracking-widest text-white/40">
                      VOTED →
                    </span>
                    <span className="truncate pl-2 text-xs font-semibold text-emerald-300">
                      {target?.name ?? "Unknown"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }

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
            currentPlayerAlive={currentPlayerAlive}
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
    const winnerMessage =
      gameState.messages[gameState.messages.length - 1]?.content ||
      "Game ended";

    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[rgb(15,21,23)] px-4">
        <div className="max-w-2xl text-center">
          <h1 className="mb-4 text-4xl font-bold text-white">GAME ENDED</h1>
          <p className="mb-8 text-xl text-emerald-400">{winnerMessage}</p>
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
