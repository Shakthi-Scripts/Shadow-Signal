import express from "express";
import { roomRouter } from "./routes/room.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/room", roomRouter);

app.get("/", (req, res) => {
  res.send("Server is Healthy");
});

export default app;
