import type { GameState } from "../state/game.state.js";
import { transitionPhase, addSystemMessage, incrementRound } from "../state/state.transitions.js";
import { startTurn } from "./turn.manager.js";

/**
 * Process elimination after voting
 */
export function processElimination(state: GameState): void {
  if (state.phase !== "voting" || !state.votes || !state.votes.tally) {
    return;
  }

  const alivePlayers = getAlivePlayers(state);
  
  if (alivePlayers.length === 0) {
    return;
  }

  // Find player with most votes
  let maxVotes = -1;
  let eliminatedPlayerId: string | null = null;

  state.votes.tally.forEach((votes, playerId) => {
    const player = state.players.get(playerId);
    if (player && player.alive && votes > maxVotes) {
      maxVotes = votes;
      eliminatedPlayerId = playerId;
    }
  });

  // Handle tie - if multiple players have same max votes, eliminate randomly
  if (eliminatedPlayerId) {
    const tiedPlayers: string[] = [];
    state.votes.tally.forEach((votes, playerId) => {
      if (votes === maxVotes) {
        const player = state.players.get(playerId);
        if (player && player.alive) {
          tiedPlayers.push(playerId);
        }
      }
    });

    if (tiedPlayers.length > 1) {
      // Randomly select from tied players
      eliminatedPlayerId =
        tiedPlayers[Math.floor(Math.random() * tiedPlayers.length)] || null;
    }
  }

  if (!eliminatedPlayerId) {
    // No one was voted out (shouldn't happen, but handle gracefully)
    addSystemMessage(state, "No one was eliminated this round.");
    startNextRound(state);
    return;
  }

  // Eliminate the player
  const eliminatedPlayer = state.players.get(eliminatedPlayerId);
  if (!eliminatedPlayer) {
    return;
  }

  eliminatedPlayer.alive = false;

  // Record elimination
  if (!state.eliminatedPlayers) {
    state.eliminatedPlayers = {};
  }
  state.eliminatedPlayers[eliminatedPlayerId] = {
    playerId: eliminatedPlayerId,
    round: state.round,
    reason: "vote",
  };

  addSystemMessage(
    state,
    `${eliminatedPlayer.name} has been eliminated.`
  );

  // Check win conditions
  const winResult = checkWinConditions(state, eliminatedPlayerId);
  
  if (winResult.gameEnded) {
    transitionPhase(state, "ended", winResult.message);
  } else {
    // Start next round
    startNextRound(state);
  }
}

/**
 * Check win conditions after elimination
 */
function checkWinConditions(
  state: GameState,
  eliminatedPlayerId: string
): { gameEnded: boolean; message: string } {
  const alivePlayers = getAlivePlayers(state);

  // Get the eliminated player's role by checking their word
  const eliminatedPlayer = state.players.get(eliminatedPlayerId);
  if (!eliminatedPlayer) {
    return { gameEnded: false, message: "" };
  }

  // Determine role based on word assignment
  const isSpecialRole =
    eliminatedPlayer.secretWord === null ||
    (state.mode === "spy" &&
      Array.from(state.players.values()).some(
        (p) => p.alive && p.secretWord !== null && p.secretWord !== eliminatedPlayer.secretWord
      ));

  if (state.mode === "infiltrator") {
    // Infiltrator mode: Citizens win if infiltrator eliminated
    if (eliminatedPlayer.secretWord === null) {
      // Infiltrator was eliminated
      return {
        gameEnded: true,
        message: "Citizens win! The Infiltrator has been eliminated.",
      };
    }
  } else {
    // Spy mode: Agents win if spy eliminated
    // Check if eliminated player had different word (spy)
    const agentWord = Array.from(state.players.values()).find(
      (p) => p.alive && p.secretWord !== null
    )?.secretWord;

    if (eliminatedPlayer.secretWord !== agentWord) {
      // Spy was eliminated
      return {
        gameEnded: true,
        message: "Agents win! The Spy has been eliminated.",
      };
    }
  }

  // Check if special role wins (only 2 players left and special role is alive)
  if (alivePlayers.length === 2) {
    const specialRoleAlive = alivePlayers.some((p) => {
      if (state.mode === "infiltrator") {
        return p.secretWord === null; // Infiltrator
      } else {
        // Spy mode - check if spy is alive
        const agentWord = alivePlayers.find(
          (ap) => ap.secretWord !== null
        )?.secretWord;
        return p.secretWord !== agentWord && p.secretWord !== null;
      }
    });

    if (specialRoleAlive) {
      if (state.mode === "infiltrator") {
        return {
          gameEnded: true,
          message: "Infiltrator wins! Only 2 players remain.",
        };
      } else {
        return {
          gameEnded: true,
          message: "Spy wins! Only 2 players remain.",
        };
      }
    }
  }

  return { gameEnded: false, message: "" };
}

/**
 * Start next round
 */
function startNextRound(state: GameState): void {
  const alivePlayers = getAlivePlayers(state);

  if (alivePlayers.length < 3) {
    // Not enough players for another round
    transitionPhase(state, "ended", "Not enough players to continue.");
    return;
  }

  if (state.round >= state.maxRounds) {
    // Max rounds reached
    transitionPhase(state, "ended", "Maximum rounds reached.");
    return;
  }

  // Reset for next round
  state.votes = null;
  state.currentTurnIndex = 0;

  // Randomize speaking order for new round
  const alivePlayerIds = alivePlayers.map((p) => p.id);
  state.speakingOrder = shuffleArray([...alivePlayerIds]);

  incrementRound(state);
  transitionPhase(
    state,
    "playing",
    `Round ${state.round} begins.`
  );

  // Start first turn
  startTurn(state);
}

/**
 * Shuffle array using Fisher-Yates algorithm
 */
function shuffleArray<T>(array: readonly T[]): T[] {
  const shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = shuffled[i]!;
    shuffled[i] = shuffled[j]!;
    shuffled[j] = temp;
  }
  return shuffled;
}


/**
 * Get all alive players
 */
function getAlivePlayers(state: GameState) {
  return Array.from(state.players.values()).filter(
    (p) => p.alive && p.connected
  );
}
