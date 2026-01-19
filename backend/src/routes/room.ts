import { Router } from "express";
import { v4 as uuidV4 } from "uuid";
import {
  createRoom,
  getRoomByInviteCode,
  getAllRooms,
} from "../game/rooms/room.manager.js";

const roomRouter = Router();

roomRouter.post("/create", (req, res) => {
  try {
    const { alias } = req.body;

    // Validate input
    if (!alias || typeof alias !== "string" || alias.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: "Alias is required and must be a non-empty string",
      });
    }

    if (alias.length > 20) {
      return res.status(400).json({
        success: false,
        error: "Alias must be 20 characters or less",
      });
    }

    const { inviteCode, playerId } = createRoom(alias.trim());

    res.json({
      success: true,
      inviteCode,
      playerId,
    });
  } catch (error: any) {
    console.error("Error creating room:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create room",
    });
  }
});

roomRouter.post("/join", (req, res) => {
  try {
    const { accessCode, alias } = req.body;

    // Validate input
    if (!accessCode || typeof accessCode !== "string") {
      return res.status(400).json({
        success: false,
        error: "Access code is required",
      });
    }

    if (!alias || typeof alias !== "string" || alias.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: "Alias is required and must be a non-empty string",
      });
    }

    if (alias.length > 20) {
      return res.status(400).json({
        success: false,
        error: "Alias must be 20 characters or less",
      });
    }

    // Lookup room by invite code
    const room = getRoomByInviteCode(accessCode.toUpperCase().trim());

    if (!room) {
      return res.status(404).json({
        success: false,
        error: "Room not found",
      });
    }

    // Check if game has started
    if (room.state.phase !== "lobby") {
      return res.status(400).json({
        success: false,
        error: "Game has already started",
      });
    }

    // Check if alias already exists (case-insensitive)
    const trimmedAlias = alias.trim();
    const aliasExists = Array.from(room.state.players.values()).some(
      (p) => p.name.trim().toLowerCase() === trimmedAlias.toLowerCase(),
    );
    if (aliasExists) {
      return res.status(400).json({
        success: false,
        error: "Alias already exists, join with another alias",
      });
    }

    // Check if room is full
    const alivePlayers = Array.from(room.state.players.values()).filter(
      (p) => p.alive && p.connected,
    );
    if (alivePlayers.length >= 12) {
      return res.status(400).json({
        success: false,
        error: "Room is full",
      });
    }

    // Generate playerId for this join request
    const playerId = uuidV4();

    res.json({
      success: true,
      roomId: room.id,
      playerId,
      inviteCode: room.state.inviteCode,
    });
  } catch (error: any) {
    console.error("Error joining room:", error);
    res.status(500).json({
      success: false,
      error: "Failed to join room",
    });
  }
});

roomRouter.get("/count", (req, res) => {
  try {
    const rooms = getAllRooms();
    const activeRoomsCount = rooms.length;

    res.json({
      success: true,
      count: activeRoomsCount,
    });
  } catch (error: any) {
    console.error("Error getting room count:", error);
    res.status(500).json({
      success: false,
      error: "Failed to get room count",
    });
  }
});

export { roomRouter };
