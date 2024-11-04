import express from "express";
import { Server } from "socket.io";
import cors from "cors";
import http from "http";
import { messageModel } from "./messageSchema.js";
import { timeStamp } from "console";

export const app = express();
app.use(cors());

export const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["POST", "GET"],
  },
});

io.on("connection", (socket) => {
  console.log("Connection made");

  socket.on("join", async (data) => {
    socket.emit("welcome_message", { text: `Welcome,${data.user}!` });

    const startTime = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const endTime = new Date();

    messageModel
      .find({ timeStamp: { $gte: startTime, $lte: endTime } })
      .sort({ timestamp: 1 })
      .then((messages) => {
        socket.emit("load_messages", messages);
      })
      .catch((error) => {
        console.error(error);
      });

    socket.on("send_message", async (data) => {
      const message = new messageModel({
        username: data.user,
        text: data.message,
      });
      try {
        await message.save();
        io.emit("receive_message", message);
      } catch (error) {
        console.error(error);
      }
    });
  });
});
