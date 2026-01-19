import axios, { AxiosInstance } from "axios";

const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

class API {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({ baseURL: backendURL });
  }

  async createRoom(alias: string): Promise<{ success: boolean; inviteCode?: string; playerId?: string; error?: string }> {
    try {
      const res = await this.api.post("/api/room/create", { alias });
      const data = res.data;
      if (data.success === true) {
        return { success: true, inviteCode: data.inviteCode, playerId: data.playerId };
      } else {
        return { success: false, error: data.error || "Failed to create room" };
      }
    } catch (err: any) {
      console.error("Error creating room:", err);
      return {
        success: false,
        error: err.response?.data?.error || err.message || "Failed to create room",
      };
    }
  }

  async joinRoom(accessCode: string, alias: string): Promise<{ success: boolean; roomId?: string; playerId?: string; inviteCode?: string; error?: string }> {
    try {
      const res = await this.api.post("/api/room/join", { accessCode, alias });
      const data = res.data;
      if (data.success === true) {
        return {
          success: true,
          roomId: data.roomId,
          playerId: data.playerId,
          inviteCode: data.inviteCode,
        };
      } else {
        return { success: false, error: data.error || "Failed to join room" };
      }
    } catch (err: any) {
      console.error("Error joining room:", err);
      return {
        success: false,
        error: err.response?.data?.error || err.message || "Failed to join room",
      };
    }
  }
}

const api = new API();
export default api;
