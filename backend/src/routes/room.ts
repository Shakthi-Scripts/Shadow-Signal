import { Router } from "express";
import { v4 as uuidV4} from "uuid";

const roomRouter = Router();

const rooms = [];

roomRouter.post("/create", (req, res) => {
  const room = { id: uuidV4()}
  const length = rooms.push(room);
  res.send({ success: true, roomID: room.id });
});

roomRouter.post("/join", (req, res) => {
  console.log(req.body)
  const data = req.body;
  const { accessCode, alias } = data;
  res.status(200);
  res.send({ success: true });
});

export {roomRouter};
