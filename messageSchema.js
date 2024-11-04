import { text } from "express";
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  username: String,
  text: String,
  profilePicture: {
    type: String,
    default: "/default-avatar.png",
  },
  timestamp: {
    type: Date,
    default: Date.now(),
  },
});

export const messageModel = mongoose.model("message", messageSchema);
