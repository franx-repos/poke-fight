import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("Die Verbindung zur MongoDB ist fehlgeschlagen", error);
    process.exit(1);
  }
};

export default connectDB;
