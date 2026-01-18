import { io } from "../server.js";
import { onConnection } from "./connection.js";

io.on("connection", onConnection);
