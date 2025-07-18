import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import methodOverride from "method-override";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { createServer } from "node:http";
import { client, connectRedis } from "./helper/connectRedis.js";

//Router
import adminRouter from "./routes/admin.js";
import userRouter from "./routes/user.js";
import medicineRouter from "./routes/medicine.js";
import pharmacistRouter from "./routes/pharmacist.js";

import Message from "./models/message.js";

let port = 3000;
const app = express();
connectRedis();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
};

const server = createServer(app);
const io = new Server(server, {
  cors: corsOptions,
});

app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

main()
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Medicine");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.get("/API/messages", async (req, res) => {
  const { from, to } = req.query;

  const messages = await Message.find({
    $or: [
      { from: from, to: to },
      { to: from, from: to },
    ],
  }).sort({ time: 1 });
  res.send(messages);
});

app.use("/API/admin", adminRouter);
app.use("/API/user", userRouter);
app.use("/API/medicine", medicineRouter);
app.use("/API/pharmacist", pharmacistRouter);

app.get("/API/signout", async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
  });

  res.send({ success: true, message: "Cookie Removed Successfully" });
});

app.get("/", (req, res) => {
  res.send(`Server is running at port ${port}`);
});

io.on("connection", async (socket) => {
  // console.log("User connected " + socket.id);

  socket.on("message", async ({ message, from, to }) => {
    const msg = new Message({ message, from, to });
    await msg.save();

    const socketId = await client.get(to);
    socket.to(socketId).emit("receive", message);
  });

  socket.on("save-id", async ({ mobile }) => {
    socket.mobile = mobile;
    await client.set(mobile, socket.id);
    io.emit("login", mobile);
  });

  socket.on("disconnect", async () => {
    if (socket.mobile) {
      await client.del(socket.mobile);
    }
  });
});

server.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
