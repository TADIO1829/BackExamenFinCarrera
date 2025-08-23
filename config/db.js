import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(" Si se conecto ");
  } catch (err) {
    console.error("Ta mal en algo:", err.message);
    process.exit(1);
  }
};
