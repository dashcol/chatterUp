import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const url = process.env.MONGODB;

export const connectToMongoDb = async () => {
  try {
    await mongoose.connect(`mongodb://${url}/chatApp`);
    console.log("MongoDB connected using mongoose");
  } catch (error) {
    console.error(error);
  }
};
