import express from "express";
import {createServer} from "node:http";
import { Server } from "socket.io";
import { roomRouter } from "./routes/room.ts"
import cors from "cors";

const PORT = 5000;

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(cors());
app.use("/room", roomRouter);

app.get("/", (req, res) => {
    res.send("Server is Healthy");
})

io.on('connection', (socket) => {
  console.log('a user connected');
});

app.listen(PORT, (error) => {
    console.log("Server is listening on", PORT)
    if(error) console.log("Error", error);
})