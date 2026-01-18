import { Router } from "express";

const roomRouter = Router();

roomRouter.post("/create", (req, res) => {
  const alias = req.body.alias;
  res.send({ success: true });
});

roomRouter.post("/join", (req, res) => {
  console.log(req.body);
  const data = req.body;
  const { accessCode, alias } = data;
  res.status(200);
  res.send({ success: true });
});

export { roomRouter };
