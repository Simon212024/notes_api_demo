import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

/**
 * Establishes a connection to MongoDB
 */
const connectDatabase = async () => {
  try {
    console.log("🔄 Connecting to MongoDB...");

    // Ensure DB_URI exists
    if (!process.env.DB_URI) {
      throw new Error("Database URI is not defined in environment variables.");
    }

    // Connect to MongoDB
    await mongoose.connect(process.env.DB_URI);

    console.log("✅ MongoDB connected successfully!");

  } catch (error) {
    console.error("❌ Database connection failed:", error.message);

    // Stop application if database connection fails
    process.exit(1);
  }
};

export default connectDatabase;