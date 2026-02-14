import mongoose from "mongoose";
import dotenv from "dotenv";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("MONGO_URI FROM ENV =", process.env.MONGO_URI);
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
