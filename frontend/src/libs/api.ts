import axios, { AxiosInstance } from "axios";

const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;

class API {
  private api: AxiosInstance;

  constructor() {
    console.log(backendURL);
    this.api = axios.create({ baseURL: backendURL });
  }

  async createRoom() {
    try {
      const res = await this.api.post("/room/create");
      const data = res.data;
      if (data.success === true) {
        // join room
      } else {
        throw Error("Failed to Create room");
      }
    } catch (err) {
      console.error("Error :", err);
    }
  }

  async joinRoom(accessCode: string, alias: string) {
    try {
      const res = await this.api.post("/room/join", { accessCode, alias });
      const data = res.data;
      if (data.success === true) {
        // join room
      } else {
        throw Error("Failed to Join Room");
      }
    } catch (err) {
      console.error("Error :", err);
    }
  }
}

const api = new API();
export default api;
